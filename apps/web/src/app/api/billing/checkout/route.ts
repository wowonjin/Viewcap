import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { createCheckoutPayment } from "@/lib/billing";

export async function POST(request: Request) {
  const user = await requireUser();
  const { planSlug } = await request.json();

  if (!planSlug || planSlug === "free") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const orderId = `order_${randomUUID().replace(/-/g, "").slice(0, 20)}`;
  const payment = await createCheckoutPayment({
    userId: user.id,
    planSlug,
    orderId,
  });

  return NextResponse.json({
    orderId,
    paymentId: payment.id,
    amount: payment.amountKrw,
    orderName: `${planSlug} plan subscription`,
    customerEmail: user.email,
    clientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing/success?orderId=${orderId}`,
    failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing/fail?orderId=${orderId}`,
  });
}
