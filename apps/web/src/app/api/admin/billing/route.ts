import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  await requireAdmin();
  const [payments, webhooks, ledger] = await Promise.all([
    prisma.payment.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.paymentWebhookEvent.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.creditLedger.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);
  return NextResponse.json({ payments, webhooks, ledger });
}
