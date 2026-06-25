import { prisma, ProjectStatus } from "@viewcap/database";
import { createMockEdl } from "@viewcap/edl";
import type { Job } from "bullmq";
import OpenAI from "openai";
import { transcribeFromUrl } from "../lib/transcription.js";

export function createAnalyzeProcessor() {
  return async (job: Job<{ assetId: string; projectId: string }>) => {
    const { assetId, projectId } = job.data;

    const [project, asset] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.asset.findUnique({ where: { id: assetId } }),
    ]);

    if (!project || !asset) throw new Error("Project or asset not found");

    const transcript = await transcribeFromUrl(asset.proxyUrl ?? asset.originalUrl);

    let edl = createMockEdl({
      projectId,
      title: project.title,
      description: project.description ?? "",
      stylePreset: project.stylePreset ?? "lecture-shorts",
      asset: {
        id: asset.id,
        originalUrl: asset.originalUrl,
        proxyUrl: asset.proxyUrl ?? undefined,
        durationMs: asset.durationMs ?? 15000,
        fileName: asset.fileName,
      },
      transcript,
    });

    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You refine video EDL JSON for short-form education content. Return valid JSON only.",
            },
            {
              role: "user",
              content: `Title: ${project.title}\nDescription: ${project.description}\nStyle: ${project.stylePreset}\nTranscript: ${JSON.stringify(transcript)}`,
            },
          ],
          response_format: { type: "json_object" },
        });
        const content = completion.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content) as { timeline?: typeof edl.timeline };
          if (parsed.timeline?.length) {
            edl = { ...edl, timeline: parsed.timeline, version: edl.version + 1 };
          }
        }
      } catch {
        // keep mock EDL
      }
    }

    const latest = await prisma.projectTimeline.findFirst({
      where: { projectId },
      orderBy: { version: "desc" },
    });
    const version = (latest?.version ?? 0) + 1;

    await prisma.$transaction([
      prisma.projectTimeline.updateMany({
        where: { projectId, isActive: true },
        data: { isActive: false },
      }),
      prisma.projectTimeline.create({
        data: {
          projectId,
          version,
          edl: edl as object,
          isActive: true,
        },
      }),
      prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.READY_TO_PREVIEW },
      }),
    ]);

    return { version };
  };
}
