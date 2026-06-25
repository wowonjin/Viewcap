import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();

  await prisma.userOnboarding.upsert({
    where: { userId: user.id },
    update: {
      role: body.role,
      useCase: body.useCase,
      stylePreference: body.stylePreference,
      completedAt: new Date(),
    },
    create: {
      userId: user.id,
      role: body.role,
      useCase: body.useCase,
      stylePreference: body.stylePreference,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
