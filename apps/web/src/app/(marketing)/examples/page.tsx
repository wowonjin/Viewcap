import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/marketing/motion";
import { Button } from "@/components/ui/button";

const examples = [
  { title: "강의 쇼츠", desc: "18분 강의에서 42초 핵심 개념 클립" },
  { title: "인터뷰 릴스", desc: "질문과 답변의 좋은 문장만 짧게 구성" },
  { title: "제품 데모", desc: "기능 설명 영상을 모바일 홍보 클립으로 변환" },
];

export default function ExamplesPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">Examples</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">결과물이 먼저 보이는 예시</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            ViewCap이 만드는 초안은 검토와 수정이 쉬운 형태로 시작합니다.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {examples.map((example, index) => (
            <StaggerItem key={example.title}>
              <div className="glass-card glass-card-hover group overflow-hidden rounded-lg">
                <div className="relative aspect-[9/14] bg-[linear-gradient(160deg,#1c2026,#272014_58%,#0f1012)] p-5">
                  <div className="absolute inset-5 rounded-lg border border-white/10 bg-black/20" />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="w-fit rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      0{index + 1}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold">{example.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-white/65">{example.desc}</p>
                      <div className="mt-4 rounded-md bg-black/65 px-3 py-2 text-center text-sm font-semibold">
                        자막 · 컷 편집 · 9:16
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn delay={0.16}>
          <div className="mt-12">
            <Button size="lg" asChild>
              <Link href="/signup?next=/projects/new">
                내 영상으로 만들기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </MarketingLayout>
  );
}
