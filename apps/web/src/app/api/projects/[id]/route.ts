import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: {
      assets: true,
      timelines: { where: { isActive: true }, take: 1 },
      renderJobs: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id } = await params;
  const body = await request.json();

  const project = await prisma.project.updateMany({
    where: { id, userId: user.id },
    data: {
      title: body.title,
      description: body.description,
      stylePreset: body.stylePreset,
      status: body.status,
    },
  });
  if (project.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await prisma.project.findUnique({ where: { id } });
  return NextResponse.json({ project: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id } = await params;
  await prisma.project.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}
