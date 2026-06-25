import {
  CreditTransactionType,
  prisma,
} from "@viewcap/database";

export async function refundRenderCredits(
  userId: string,
  amount: number,
  renderJobId: string,
) {
  if (amount <= 0) return;

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
    const newBalance = user.creditBalance + amount;
    await tx.user.update({
      where: { id: userId },
      data: { creditBalance: newBalance },
    });
    await tx.creditLedger.create({
      data: {
        userId,
        amount,
        balanceAfter: newBalance,
        type: CreditTransactionType.RENDER_REFUND,
        description: "렌더링 실패 자동 환급",
        renderJobId,
      },
    });
  });
}
