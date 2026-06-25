import {
  CreditTransactionType,
  prisma,
} from "@viewcap/database";

export const CREDIT_RATES = {
  SIGNUP_BONUS: 300,
  ANALYSIS: 30,
  RENDER_720P_PER_MIN: 100,
  RENDER_1080P_PER_MIN: 180,
  RERENDER_DISCOUNT: 0.5,
} as const;

export function estimateRenderCredits(durationMs: number, resolution: string) {
  const minutes = Math.max(durationMs / 60000, 0.1);
  const perMin =
    resolution === "720p"
      ? CREDIT_RATES.RENDER_720P_PER_MIN
      : CREDIT_RATES.RENDER_1080P_PER_MIN;
  return Math.ceil(minutes * perMin);
}

export async function grantSignupBonus(userId: string) {
  const existing = await prisma.creditLedger.findFirst({
    where: { userId, type: CreditTransactionType.SIGNUP_BONUS },
  });
  if (existing) return;

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: { creditBalance: { increment: CREDIT_RATES.SIGNUP_BONUS } },
    });
    await tx.creditLedger.create({
      data: {
        userId,
        amount: CREDIT_RATES.SIGNUP_BONUS,
        balanceAfter: user.creditBalance,
        type: CreditTransactionType.SIGNUP_BONUS,
        description: "가입 보너스 크레딧",
      },
    });
  });
}

export async function deductCredits(params: {
  userId: string;
  amount: number;
  type: CreditTransactionType;
  description: string;
  projectId?: string;
  renderJobId?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: params.userId } });
    if (user.creditBalance < params.amount) {
      throw new Error("INSUFFICIENT_CREDITS");
    }
    const updated = await tx.user.update({
      where: { id: params.userId },
      data: { creditBalance: { decrement: params.amount } },
    });
    await tx.creditLedger.create({
      data: {
        userId: params.userId,
        amount: -params.amount,
        balanceAfter: updated.creditBalance,
        type: params.type,
        description: params.description,
        projectId: params.projectId,
        renderJobId: params.renderJobId,
      },
    });
    return updated.creditBalance;
  });
}

export async function grantCredits(params: {
  userId: string;
  amount: number;
  type: CreditTransactionType;
  description: string;
  paymentId?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: params.userId },
      data: { creditBalance: { increment: params.amount } },
    });
    await tx.creditLedger.create({
      data: {
        userId: params.userId,
        amount: params.amount,
        balanceAfter: updated.creditBalance,
        type: params.type,
        description: params.description,
        paymentId: params.paymentId,
      },
    });
    return updated.creditBalance;
  });
}

export async function refundRenderCredits(
  userId: string,
  amount: number,
  renderJobId: string,
) {
  if (amount <= 0) return;
  await grantCredits({
    userId,
    amount,
    type: CreditTransactionType.RENDER_REFUND,
    description: `렌더링 실패 자동 환급 (${renderJobId})`,
  });
}
