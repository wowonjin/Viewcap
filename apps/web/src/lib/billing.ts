import { CreditTransactionType, prisma } from "@viewcap/database";

export async function createCheckoutPayment(params: {
  userId: string;
  planSlug: string;
  orderId: string;
}) {
  const plan = await prisma.plan.findUniqueOrThrow({
    where: { slug: params.planSlug },
  });
  return prisma.payment.create({
    data: {
      userId: params.userId,
      planId: plan.id,
      amountKrw: plan.priceKrw,
      providerOrderId: params.orderId,
      creditsGranted: plan.monthlyCredits,
      status: "PENDING",
      metadata: { planSlug: plan.slug },
    },
  });
}

export async function completePayment(params: {
  orderId: string;
  paymentKey: string;
}) {
  const payment = await prisma.payment.findUnique({
    where: { providerOrderId: params.orderId },
  });
  if (!payment || payment.status === "PAID") return payment;

  const plan = payment.planId
    ? await prisma.plan.findUnique({ where: { id: payment.planId } })
    : null;

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "PAID",
        providerPaymentKey: params.paymentKey,
        paidAt: new Date(),
      },
    });

    const user = await tx.user.update({
      where: { id: payment.userId },
      data: {
        creditBalance: { increment: payment.creditsGranted },
        planId: plan?.id ?? undefined,
      },
    });

    await tx.creditLedger.create({
      data: {
        userId: payment.userId,
        amount: payment.creditsGranted,
        balanceAfter: user.creditBalance,
        type: CreditTransactionType.PURCHASE,
        description: `${plan?.name ?? "플랜"} 결제 크레딧 지급`,
        paymentId: payment.id,
      },
    });

    if (plan) {
      const now = new Date();
      const end = new Date(now);
      end.setMonth(end.getMonth() + 1);
      await tx.subscription.create({
        data: {
          userId: payment.userId,
          planId: plan.id,
          status: "ACTIVE",
          currentPeriodStart: now,
          currentPeriodEnd: end,
        },
      });
    }
  });

  return prisma.payment.findUnique({ where: { id: payment.id } });
}

export async function recordWebhookEvent(payload: object, eventType: string) {
  return prisma.paymentWebhookEvent.create({
    data: {
      provider: "tosspayments",
      eventType,
      payload: payload as object,
      processed: false,
    },
  });
}
