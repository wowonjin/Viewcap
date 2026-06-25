import type { VideoProject } from "@viewcap/edl";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { deductCredits, estimateRenderCredits } from "@/lib/credits";
import { prisma } from "@/lib/db";
import { enqueueRender } from "@/lib/queue";
import { CreditTransactionType, RenderJobStatus } from "@viewcap/database";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id: projectId } = await params;
  const { resolution = "1080p" } = await request.json();

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
    include: {
      assets: true,
      timelines: { where: { isActive: true }, take: 1 },
      renderJobs: {
        where: { status: RenderJobStatus.COMPLETED },
      },
    },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!project.timelines[0]) {
    return NextResponse.json({ error: "No timeline ready" }, { status: 400 });
  }

  const edl = project.timelines[0].edl as VideoProject;
  const durationMs =
    project.assets[0]?.durationMs ??
    edl.assets[0]?.durationMs ??
    60000;

  let costCredits = estimateRenderCredits(durationMs, resolution);
  const completedRenders = project.renderJobs.length;
  if (completedRenders >= 1) {
    costCredits = Math.ceil(costCredits * 0.5);
  }

  try {
    await deductCredits({
      userId: user.id,
      amount: costCredits,
      type: CreditTransactionType.RENDER_DEDUCT,
      description: `${resolution} 최종 렌더링`,
      projectId,
    });
  } catch {
    return NextResponse.json({ error: "INSUFFICIENT_CREDITS" }, { status: 402 });
  }

  const renderJob = await prisma.renderJob.create({
    data: {
      projectId,
      userId: user.id,
      status: RenderJobStatus.QUEUED,
      resolution,
      costCredits,
    },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: { status: "RENDERING" },
  });

  try {
    await enqueueRender({ renderJobId: renderJob.id });
  } catch {
    const { processRenderSync } = await import("@/lib/render-sync");
    await processRenderSync(renderJob.id);
    const completed = await prisma.renderJob.findUnique({ where: { id: renderJob.id } });
    return NextResponse.json({ renderJob: completed, mode: "sync_fallback" });
  }

  return NextResponse.json({ renderJob });
}
