"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCredits, formatKrw } from "@/lib/utils";

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => {
      requestPayment: (method: string, options: Record<string, unknown>) => Promise<void>;
    };
  }
}

export function BillingClient() {
  const searchParams = useSearchParams();
  const [balance, setBalance] = useState(0);
  const [plans, setPlans] = useState<Array<{ slug: string; name: string; priceKrw: number; monthlyCredits: number }>>([]);
  const [message, setMessage] = useState(searchParams.get("success") ? "결제가 완료되었습니다." : "");

  useEffect(() => {
    fetch("/api/credits/balance").then((r) => r.json()).then((d) => setBalance(d.balance));
    fetch("/api/billing/plans").then((r) => r.json()).then((d) => setPlans(d.plans.filter((p: { slug: string }) => p.slug !== "free")));
  }, []);

  async function checkout(planSlug: string) {
    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planSlug }),
    });
    const data = await res.json();

    if (process.env.NODE_ENV === "development" || !window.TossPayments) {
      await fetch(`/api/billing/webhook?orderId=${data.orderId}&paymentKey=test_payment_key_${Date.now()}&amount=${data.amount}`);
      setMessage(`${planSlug} 플랜 결제가 완료되었습니다 (개발 모드)`);
      const bal = await fetch("/api/credits/balance").then((r) => r.json());
      setBalance(bal.balance);
      return;
    }

    const toss = window.TossPayments(data.clientKey);
    await toss.requestPayment("카드", {
      amount: data.amount,
      orderId: data.orderId,
      orderName: data.orderName,
      customerEmail: data.customerEmail,
      successUrl: data.successUrl,
      failUrl: data.failUrl,
    });
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>크레딧 잔액</CardTitle>
          <CardDescription>{formatCredits(balance)}</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.slug}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{formatKrw(plan.priceKrw)}/월 · {plan.monthlyCredits.toLocaleString()} 크레딧</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => checkout(plan.slug)} className="w-full">
                구독하기
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button variant="outline" asChild>
        <Link href="/dashboard">대시보드로</Link>
      </Button>
    </div>
  );
}
