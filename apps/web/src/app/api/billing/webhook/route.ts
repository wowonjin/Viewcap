import { NextRequest, NextResponse } from "next/server";
import { completePayment, recordWebhookEvent } from "@/lib/billing";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  await recordWebhookEvent(body, body.eventType ?? "payment.confirm");

  if (body.orderId && body.paymentKey) {
    await completePayment({
      orderId: body.orderId,
      paymentKey: body.paymentKey,
    });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId");
  const paymentKey = request.nextUrl.searchParams.get("paymentKey");
  const amount = request.nextUrl.searchParams.get("amount");

  if (!orderId || !paymentKey) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (secretKey && secretKey.startsWith("test_sk_")) {
    await completePayment({ orderId, paymentKey });
    return NextResponse.json({ ok: true, mode: "test_bypass" });
  }

  if (!secretKey) {
    await completePayment({ orderId, paymentKey });
    return NextResponse.json({ ok: true, mode: "dev_bypass" });
  }

  try {
    const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      await prisma.payment.updateMany({
        where: { providerOrderId: orderId },
        data: { status: "FAILED", metadata: data as object },
      });
      return NextResponse.json({ error: data.message ?? "Payment failed" }, { status: 400 });
    }

    await completePayment({ orderId, paymentKey });
    await recordWebhookEvent(data, "payment.confirmed");
    return NextResponse.json({ ok: true, payment: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Confirm failed" },
      { status: 500 },
    );
  }
}
