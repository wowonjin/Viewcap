import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { enqueueRender } from "@/lib/queue";
import { RenderJobStatus } from "@viewcap/database";

export async function GET() {
  await requireAdmin();
  const jobs = await prisma.renderJob.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      project: { select: { title: true, id: true } },
    },
  });
  return NextResponse.json({ jobs });
}

export async function POST(request: Request) {
  await requireAdmin();
  const { jobId } = await request.json();
  const job = await prisma.renderJob.findUnique({ where: { id: jobId } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.renderJob.update({
    where: { id: jobId },
    data: {
      status: RenderJobStatus.QUEUED,
      retryCount: { increment: 1 },
      errorCode: null,
      errorMessage: null,
    },
  });
  await enqueueRender({ renderJobId: jobId });
  return NextResponse.json({ ok: true });
}
