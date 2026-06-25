import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HowItWorks } from "@/components/marketing/sections";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FadeIn } from "@/components/marketing/motion";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "작동 방식 | ViewCap",
  description: "ViewCap AI 영상 편집은 업로드, AI 초안 생성, 검토 후 렌더링의 3단계로 진행됩니다.",
};

export default function HowItWorksPage() {
  return (
    <MarketingLayout>
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "작동 방식", href: "/how-it-works" }]} />
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">How it works</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">영상 업로드부터 렌더링까지 단순하게</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            긴 원본을 올리고 편집 방향을 적으면, ViewCap이 검토 가능한 초안을 먼저 만듭니다.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/signup?next=/projects/new">
              지금 시작
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
      <HowItWorks />
    </MarketingLayout>
  );
}
