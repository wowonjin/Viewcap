import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const ticket = await prisma.supportTicket.create({
    data: {
      userId: user.id,
      subject: body.subject,
      message: body.message,
      category: body.category ?? "OTHER",
    },
  });
  return NextResponse.json({ ticket });
}
