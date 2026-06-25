import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  await requireAdmin();
  const tickets = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { email: true, name: true } } },
  });
  return NextResponse.json({ tickets });
}

export async function PATCH(request: Request) {
  await requireAdmin();
  const { ticketId, status, adminNote } = await request.json();
  const ticket = await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status, adminNote },
  });
  return NextResponse.json({ ticket });
}
