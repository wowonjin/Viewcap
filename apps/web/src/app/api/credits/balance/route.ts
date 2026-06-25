import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await requireUser();
  const balance = user.creditBalance;
  const ledger = await prisma.creditLedger.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json({ balance, ledger });
}
