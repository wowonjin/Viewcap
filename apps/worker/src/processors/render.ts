import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  renderMedia,
  selectComposition,
} from "@remotion/renderer";
import { prisma, ProjectStatus, RenderJobStatus } from "@viewcap/database";
import type { VideoProject } from "@viewcap/edl";
import { COMPOSITION_ID } from "@viewcap/remotion";
import type { Job } from "bullmq";
import { uploadFileToS3 } from "../lib/storage.js";
import { refundRenderCredits } from "../lib/credits.js";

export function createRenderProcessor() {
  return async (job: Job<{ renderJobId: string }>) => {
    const { renderJobId } = job.data;
    const renderJob = await prisma.renderJob.findUnique({
      where: { id: renderJobId },
      include: {
        project: {
          include: {
            timelines: { where: { isActive: true }, take: 1 },
          },
        },
      },
    });

    if (!renderJob) throw new Error(`Render job not found: ${renderJobId}`);

    await prisma.renderJob.update({
      where: { id: renderJobId },
      data: { status: RenderJobStatus.PROCESSING, startedAt: new Date() },
    });

    await prisma.project.update({
      where: { id: renderJob.projectId },
      data: { status: ProjectStatus.RENDERING },
    });

    try {
      const timeline = renderJob.project.timelines[0];
      if (!timeline) throw new Error("No active timeline");

      const edl = timeline.edl as VideoProject;
      const tmpDir = join(process.cwd(), "tmp", "render", renderJobId);
      await mkdir(tmpDir, { recursive: true });
      const outputPath = join(tmpDir, "output.mp4");

      const entry = join(process.cwd(), "../../packages/remotion/src/Root.tsx");
      const serveUrl = await bundle({
        entryPoint: entry,
        webpackOverride: (config) => config,
      });

      const inputProps = { edl };
      const comps = await getCompositions(serveUrl, { inputProps });
      const composition = selectComposition(comps, COMPOSITION_ID);

      await renderMedia({
        composition,
        serveUrl,
        codec: "h264",
        outputLocation: outputPath,
        inputProps,
      });

      const outputBuffer = await readFile(outputPath);
      const outputKey = `projects/${renderJob.projectId}/renders/${renderJobId}.mp4`;
      const outputUrl = await uploadFileToS3(outputKey, outputBuffer, "video/mp4");

      await prisma.$transaction([
        prisma.renderJob.update({
          where: { id: renderJobId },
          data: {
            status: RenderJobStatus.COMPLETED,
            outputUrl,
            completedAt: new Date(),
          },
        }),
        prisma.project.update({
          where: { id: renderJob.projectId },
          data: { status: ProjectStatus.COMPLETED },
        }),
      ]);

      return { outputUrl };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Render failed";
      await prisma.renderJob.update({
        where: { id: renderJobId },
        data: {
          status: RenderJobStatus.FAILED,
          errorCode: "RENDER_FAILED",
          errorMessage: message,
          completedAt: new Date(),
        },
      });
      await prisma.project.update({
        where: { id: renderJob.projectId },
        data: { status: ProjectStatus.FAILED },
      });
      await refundRenderCredits(renderJob.userId, renderJob.costCredits, renderJobId);
      throw error;
    }
  };
}
