import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FadeIn } from "@/components/marketing/motion";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vrew AI 대안 | ViewCap",
  description: "자막 중심 편집에서 더 나아가 쇼츠 초안과 컷 구성을 자동화하는 Vrew 대안입니다.",
};

const bullets = [
  "자막 생성과 컷 편집 초안을 함께 구성",
  "긴 영상에서 쓸 만한 9:16 클립 추천",
  "브라우저에서 미리보고 자연어로 수정",
];

export default function CompareVrewPage() {
  return (
    <MarketingLayout>
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "Vrew 대안", href: "/compare/vrew-alternative" }]} />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">Compare</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">Vrew보다 숏폼 초안에 집중한 AI 편집</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            ViewCap은 자막만 만드는 흐름이 아니라, 업로드한 영상을 숏폼 초안으로 재구성하고 검토할 수 있게 설계했습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <ul className="mt-8 space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="glass-card flex items-center gap-3 rounded-lg p-4 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                {bullet}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/signup?next=/projects/new">
              ViewCap 무료 체험
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </MarketingLayout>
  );
}
