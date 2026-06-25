"use client";

import { ChevronDown, Lock, MessageSquare, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/seo/site-config";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion";

export function BeforeAfterSection() {
  const [slider, setSlider] = useState(54);

  useEffect(() => {
    const timer = setInterval(() => setSlider((value) => (value >= 78 ? 28 : value + 0.7)), 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">Before / After</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            원본 영상이 어떤 편집본으로 바뀌는지 먼저 보여줍니다.
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="glass-card mt-10 overflow-hidden rounded-lg">
            <div className="relative aspect-[16/9] min-h-[360px] overflow-hidden bg-[#15181c]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-2xl">
                  <div className="mb-4 text-sm font-semibold text-muted-foreground">Before: 18분 원본 강의</div>
                  <div className="rounded-lg border border-white/10 bg-black/[0.24] p-5">
                    <div className="aspect-video rounded-md bg-[linear-gradient(135deg,#232830,#111315)]" />
                    <div className="mt-4 grid grid-cols-5 gap-1">
                      {[35, 72, 18, 56, 42].map((width, index) => (
                        <div key={index} className="h-2 rounded bg-white/10">
                          <div className="h-full rounded bg-white/[0.24]" style={{ width: `${width}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center bg-[#0d0f11] p-8"
                style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
              >
                <div className="flex w-full max-w-3xl items-center justify-center gap-8">
                  <div className="aspect-[9/16] h-[310px] overflow-hidden rounded-lg border border-primary/35 bg-[linear-gradient(160deg,#1f2328,#211a12)]">
                    <div className="flex h-full flex-col justify-end p-4">
                      <div className="rounded-md bg-black/[0.68] px-3 py-2 text-center text-sm font-bold">
                        핵심 개념은 이 한 문장입니다
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="hidden max-w-xs md:block">
                    <div className="text-sm font-semibold text-primary">After: 42초 쇼츠 초안</div>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <li>핵심 장면 3개 자동 선택</li>
                      <li>자막과 강조 문구 적용</li>
                      <li>9:16 비율 미리보기 생성</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 w-px bg-primary" style={{ left: `${slider}%` }}>
                <div className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-[#0d0f11] text-xs font-bold text-primary">
                  ↔
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function NaturalLanguageSection() {
  const commands = ["자막을 더 크게", "인트로 줄이기", "템포 빠르게", "마지막에 CTA"];
  const responses = [
    "자막 크기를 키우고 하단 여백을 조정했습니다.",
    "앞부분 침묵과 준비 멘트를 제거했습니다.",
    "불필요한 공백을 줄이고 컷 간격을 정리했습니다.",
    "마지막 3초에 CTA 문구를 추가했습니다.",
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((index) => (index + 1) % commands.length), 2400);
    return () => clearInterval(timer);
  }, [commands.length]);

  return (
    <section className="relative py-20 lg:py-24">
      <div className="section-divider absolute left-0 right-0 top-0" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">말로 수정</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">복잡한 편집 지시를 자연어로 남기세요.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            결과가 마음에 들지 않는 부분은 버튼을 찾기보다 말로 요청하세요. 자막, 길이, 속도, 강조 방식 수정에 적합합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {commands.map((command, index) => (
              <button
                key={command}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition",
                  active === index
                    ? "border-primary/35 bg-primary/[0.12] text-primary"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/[0.08]",
                )}
              >
                {command}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="glass-card rounded-lg p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="h-4 w-4 text-primary" />
              편집 명령
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm">“{commands[active]} 적용해줘.”</div>
              <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{responses[active]}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function TrustSection() {
  const items = [
    { icon: Sparkles, title: "무료 미리보기", desc: "결과를 먼저 확인한 뒤 렌더링 여부를 결정합니다." },
    { icon: Shield, title: "크레딧 기준 명확", desc: "고화질 렌더링과 추가 처리에 사용량이 반영됩니다." },
    { icon: Lock, title: "업로드 보호", desc: "프로젝트 파일은 계정 권한 안에서만 접근합니다." },
    { icon: MessageSquare, title: "수정 흐름 지원", desc: "자연어 요청으로 초안을 빠르게 다듬을 수 있습니다." },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">신뢰 요소</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">결제보다 검토가 먼저입니다.</h2>
        </FadeIn>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="glass-card h-full rounded-lg p-5">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-24">
      <div className="section-divider mb-20" />
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold md:text-4xl">자주 묻는 질문</h2>
        </FadeIn>
        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => (
            <FadeIn key={item.question} delay={index * 0.04}>
              <div className="glass-card overflow-hidden rounded-lg">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium transition hover:bg-white/5"
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  {item.question}
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-primary transition", open === index && "rotate-180")} />
                </button>
                <div className={cn("overflow-hidden transition-all", open === index ? "max-h-52 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t border-white/10 px-5 pb-5 pt-3 text-sm leading-6 text-muted-foreground">{item.answer}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingPreviewSection() {
  const plans = [
    { name: "Free", price: "무료", credits: "테스트 크레딧" },
    { name: "Starter", price: "19,900원", credits: "월 1,000 크레딧" },
    { name: "Pro", price: "49,000원", credits: "월 3,000 크레딧", highlight: true },
    { name: "Studio", price: "99,000원", credits: "월 8,000 크레딧" },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">요금</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">미리보고 필요한 만큼 렌더링하세요.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">무료 미리보기 후, 고화질 렌더링에 크레딧을 사용합니다.</p>
        </FadeIn>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={cn("glass-card h-full rounded-lg p-5 text-left", plan.highlight && "border-primary/40 bg-primary/[0.08]")}>
                {plan.highlight && <div className="mb-3 inline-flex rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">추천</div>}
                <div className="font-semibold">{plan.name}</div>
                <div className="mt-3 text-2xl font-bold">{plan.price}</div>
                <div className="mt-1 text-sm text-muted-foreground">{plan.credits}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <FadeIn delay={0.16}>
          <Button className="mt-10" size="lg" asChild>
            <Link href="/pricing">요금 자세히 보기</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
