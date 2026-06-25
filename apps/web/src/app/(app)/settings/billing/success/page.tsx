import { Suspense } from "react";
import { AppShell } from "@/components/app/app-shell";
import { BillingClient } from "@/components/billing/billing-client";

export default function BillingSuccessPage() {
  return (
    <AppShell active="/settings/billing">
      <Suspense>
        <BillingClient />
      </Suspense>
    </AppShell>
  );
}
