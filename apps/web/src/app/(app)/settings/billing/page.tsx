import { Suspense } from "react";
import Script from "next/script";
import { AppShell } from "@/components/app/app-shell";
import { BillingClient } from "@/components/billing/billing-client";

export default function BillingPage() {
  return (
    <AppShell active="/settings/billing">
      <Script src="https://js.tosspayments.com/v1/payment" strategy="lazyOnload" />
      <h1 className="mb-6 text-3xl font-bold">결제 / 크레딧</h1>
      <Suspense>
        <BillingClient />
      </Suspense>
    </AppShell>
  );
}
