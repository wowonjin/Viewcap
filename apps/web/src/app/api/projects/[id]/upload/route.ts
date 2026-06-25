import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { deductCredits, CREDIT_RATES } from "@/lib/credits";
import { prisma } from "@/lib/db";
import { enqueueIngest } from "@/lib/queue";
import { createUploadUrl } from "@/lib/storage";
import { CreditTransactionType } from "@viewcap/database";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id: projectId } = await params;
  const body = await request.json();

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const key = `projects/${projectId}/original/${Date.now()}-${body.fileName}`;
  const { uploadUrl, publicUrl } = await createUploadUrl(key, body.contentType);

  const asset = await prisma.asset.create({
    data: {
      projectId,
      fileName: body.fileName,
      mimeType: body.contentType,
      sizeBytes: BigInt(body.sizeBytes ?? 0),
      originalUrl: publicUrl,
      type: "VIDEO",
    },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      title: body.title ?? project.title,
      description: body.description ?? project.description,
      stylePreset: body.stylePreset ?? project.stylePreset,
      status: "UPLOADING",
    },
  });

  return NextResponse.json({ uploadUrl, assetId: asset.id, publicUrl });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id: projectId } = await params;
  const { assetId } = await request.json();

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await deductCredits({
      userId: user.id,
      amount: CREDIT_RATES.ANALYSIS,
      type: CreditTransactionType.ANALYSIS_DEDUCT,
      description: "AI 영상 분석",
      projectId,
    });
  } catch {
    return NextResponse.json({ error: "INSUFFICIENT_CREDITS" }, { status: 402 });
  }

  try {
    await enqueueIngest({ assetId, projectId });
  } catch {
    const { processAnalyzeSync } = await import("@/lib/analyze-sync");
    await prisma.project.update({
      where: { id: projectId },
      data: { status: "ANALYZING" },
    });
    await processAnalyzeSync(assetId, projectId);
  }

  return NextResponse.json({ ok: true, status: "ANALYZING" });
}
