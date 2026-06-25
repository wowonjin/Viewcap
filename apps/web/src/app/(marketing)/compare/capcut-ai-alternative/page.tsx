import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FadeIn } from "@/components/marketing/motion";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CapCut AI 대안 | ViewCap",
  description: "직접 편집 도구를 다루기보다 AI 초안을 먼저 검토하고 싶은 팀을 위한 CapCut 대안입니다.",
};

const rows = [
  { feature: "편집 방식", capcut: "직접 편집 중심", viewcap: "AI 초안 생성 후 검토" },
  { feature: "긴 영상 처리", capcut: "수동 컷 선택", viewcap: "핵심 구간 추천" },
  { feature: "강의/교육 콘텐츠", capcut: "일반 편집", viewcap: "강의 요약 흐름 지원" },
  { feature: "브라우저 워크플로우", capcut: "도구 중심", viewcap: "업로드, 검토, 렌더링" },
];

export default function CompareCapcutPage() {
  return (
    <MarketingLayout>
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "CapCut 대안", href: "/compare/capcut-ai-alternative" }]} />
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">Compare</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">CapCut보다 자동화된 AI 편집 흐름</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            ViewCap은 직접 타임라인을 만지는 편집기라기보다, 긴 영상에서 쓸 만한 숏폼 초안을 먼저 만들어 주는 워크플로우에 가깝습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="glass-card mt-10 overflow-hidden rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left font-semibold text-muted-foreground">항목</th>
                  <th className="px-5 py-4 text-left font-semibold text-muted-foreground">CapCut</th>
                  <th className="px-5 py-4 text-left font-semibold text-primary">ViewCap</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/10 last:border-0">
                    <td className="px-5 py-4 font-medium">{row.feature}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.capcut}</td>
                    <td className="px-5 py-4 font-medium text-primary">{row.viewcap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
