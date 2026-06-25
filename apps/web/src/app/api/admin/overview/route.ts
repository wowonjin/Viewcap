import { NextResponse } from "next/server";
import { getOrCreateAdminUser, writeAuditLog } from "@/lib/admin";
import { requireAdmin } from "@/lib/auth";
import { grantCredits, deductCredits } from "@/lib/credits";
import { prisma } from "@/lib/db";
import { CreditTransactionType } from "@viewcap/database";

export async function GET() {
  await requireAdmin();
  const [users, projects, payments, renderJobs, tickets] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.payment.count({ where: { status: "PAID" } }),
    prisma.renderJob.count(),
    prisma.supportTicket.count({ where: { status: "OPEN" } }),
  ]);
  const failedJobs = await prisma.renderJob.count({ where: { status: "FAILED" } });
  const failureRate = renderJobs > 0 ? (failedJobs / renderJobs) * 100 : 0;

  return NextResponse.json({
    metrics: {
      users,
      projects,
      payments,
      renderJobs,
      openTickets: tickets,
      failureRate: Math.round(failureRate * 10) / 10,
    },
  });
}

export async function POST(request: Request) {
  const { user, admin } = await requireAdmin();
  const adminUser = admin ?? (await getOrCreateAdminUser(user.email));
  const body = await request.json();

  if (body.action === "credit-adjust") {
    const targetUser = await prisma.user.findUnique({ where: { id: body.userId } });
    if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const before = { creditBalance: targetUser.creditBalance };
    if (body.amount > 0) {
      await grantCredits({
        userId: body.userId,
        amount: body.amount,
        type: CreditTransactionType.ADMIN_GRANT,
        description: body.reason ?? "관리자 수동 지급",
      });
    } else {
      await deductCredits({
        userId: body.userId,
        amount: Math.abs(body.amount),
        type: CreditTransactionType.ADMIN_DEDUCT,
        description: body.reason ?? "관리자 수동 차감",
      });
    }
    const afterUser = await prisma.user.findUnique({ where: { id: body.userId } });
    await writeAuditLog({
      actorAdminId: adminUser.id,
      actorRole: adminUser.role,
      action: "CREDIT_ADJUST",
      targetType: "User",
      targetId: body.userId,
      before,
      after: { creditBalance: afterUser?.creditBalance },
      reason: body.reason,
    });
    return NextResponse.json({ ok: true, creditBalance: afterUser?.creditBalance });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
