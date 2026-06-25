import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await requireUser();
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      renderJobs: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { assets: true } },
    },
  });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const project = await prisma.project.create({
    data: {
      userId: user.id,
      title: body.title ?? "새 프로젝트",
      description: body.description,
      stylePreset: body.stylePreset ?? "lecture-shorts",
      aspectRatio: body.aspectRatio ?? "9:16",
      status: "DRAFT",
    },
  });
  return NextResponse.json({ project });
}
