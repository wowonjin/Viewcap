import { applyEditPatch, parseNaturalLanguageCommand } from "@viewcap/edl";
import type { VideoProject } from "@viewcap/edl";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id: projectId } = await params;
  const { command } = await request.json();

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
    include: { timelines: { where: { isActive: true }, take: 1 } },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const timeline = project.timelines[0];
  if (!timeline) return NextResponse.json({ error: "No timeline" }, { status: 400 });

  const edl = timeline.edl as VideoProject;
  const patch = parseNaturalLanguageCommand(command, edl);
  if (!patch || patch.patches.length === 0) {
    return NextResponse.json({ error: "Command not understood" }, { status: 400 });
  }

  const updated = applyEditPatch(edl, patch);
  const version = timeline.version + 1;

  await prisma.$transaction([
    prisma.projectTimeline.updateMany({
      where: { projectId, isActive: true },
      data: { isActive: false },
    }),
    prisma.projectTimeline.create({
      data: {
        projectId,
        version,
        edl: updated as object,
        isActive: true,
      },
    }),
  ]);

  return NextResponse.json({ edl: updated, patch });
}
