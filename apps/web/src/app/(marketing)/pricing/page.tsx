import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/marketing/motion";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { formatKrw } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary">Pricing</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">미리보고 필요한 만큼 렌더링하세요.</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              초안 검토는 빠르게, 고화질 MP4 렌더링은 플랜 크레딧으로 처리합니다.
            </p>
          </div>
        </FadeIn>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={cn(
                  "glass-card flex h-full flex-col rounded-lg p-6",
                  plan.slug === "pro" && "border-primary/40 bg-primary/[0.08]",
                )}
              >
                {plan.slug === "pro" && (
                  <div className="mb-4 inline-flex w-fit rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                    추천
                  </div>
                )}
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                <div className="mt-6 text-3xl font-bold">
                  {plan.priceKrw === 0 ? "무료" : formatKrw(plan.priceKrw)}
                  {plan.priceKrw > 0 && <span className="text-base font-normal text-muted-foreground">/월</span>}
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                  {[
                    `월 ${plan.monthlyCredits.toLocaleString()} 크레딧`,
                    `최대 ${plan.maxUploadMinutes}분 업로드`,
                    `${plan.maxResolution} 렌더링`,
                    plan.watermark ? "워터마크 포함" : "워터마크 없음",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant={plan.slug === "pro" ? "default" : "outline"} asChild>
                  <Link href={`/signup?plan=${plan.slug}`}>{plan.priceKrw === 0 ? "무료로 시작" : "시작하기"}</Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </MarketingLayout>
  );
}
