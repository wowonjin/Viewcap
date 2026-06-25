"use client";

import { ArrowRight, CheckCircle2, Clock, Film, MessageSquareText, Scissors, Upload, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn, StaggerGroup, StaggerItem } from "./motion";
import { HeroDemo } from "./hero-demo";

const trustLogos = ["온라인 강의", "크리에이터", "마케팅 팀", "교육 스타트업", "브랜드 콘텐츠", "1인 사업자"];

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-5 pb-12 pt-12 lg:px-6 lg:pb-20 lg:pt-16">
      <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
        <FadeIn className="w-full min-w-0 max-w-[350px] sm:max-w-full lg:w-auto">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.07] px-3 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-green)]" />
            긴 영상을 바로 쓸 수 있는 숏폼 편집본으로
          </div>
          <h1 className="mt-6 max-w-full text-4xl font-bold leading-[1.05] md:text-6xl lg:text-[4rem]">
            영상 편집은
            <span className="block">ViewCap에 맡기고</span>
            <span className="block accent-text">결과만 확인하세요.</span>
          </h1>
          <p className="mt-6 max-w-full break-words text-lg leading-8 text-muted-foreground lg:max-w-xl">
            ViewCap은 원본 영상을 분석해 핵심 장면, 세로형 컷, 자막, 강조 요소를 먼저 구성합니다.
            복잡한 타임라인을 만지기 전에 완성도 있는 초안을 확인하세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/signup?next=/projects/new">
                영상 업로드
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/examples">예시 보기</Link>
            </Button>
          </div>
          <div className="mt-7 grid max-w-xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            {["무료 미리보기", "브라우저 편집", "9:16 렌더링"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" />
                {item}
              </span>
            ))}
          </div>
        </FadeIn>

        <ScaleIn delay={0.12} className="w-full min-w-0 max-w-[350px] sm:max-w-full lg:w-auto">
          <HeroDemo />
        </ScaleIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-14 overflow-hidden border-y border-white/10 py-4">
          <div className="flex animate-marquee shrink-0 gap-3 whitespace-nowrap">
            {[...trustLogos, ...trustLogos, ...trustLogos].map((logo, index) => (
              <span key={`${logo}-${index}`} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export function StatsBar() {
  const stats = [
    { value: "3단계", label: "업로드, 검토, 렌더링" },
    { value: "9:16", label: "쇼츠와 릴스 비율" },
    { value: "AI", label: "핵심 구간 추천" },
    { value: "MP4", label: "브라우저 export" },
  ];

  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-8">
      <StaggerGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

export function PainPointSection() {
  const items = [
    {
      icon: Clock,
      title: "편집 시간이 너무 길 때",
      desc: "긴 원본에서 쓸 만한 장면을 찾는 과정부터 줄입니다.",
      tone: "text-[var(--accent-coral)]",
    },
    {
      icon: Scissors,
      title: "타임라인 작업이 부담될 때",
      desc: "컷, 자막, 비율 변환까지 초안을 먼저 만들어 검토 중심으로 진행합니다.",
      tone: "text-primary",
    },
    {
      icon: MessageSquareText,
      title: "수정 요청이 자주 바뀔 때",
      desc: "자연어 명령으로 자막 크기, 인트로 길이, 강조 방식을 빠르게 조정합니다.",
      tone: "text-[var(--accent-blue)]",
    },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">왜 ViewCap인가</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            영상 편집의 병목은 기술보다 반복 작업입니다.
          </h2>
        </FadeIn>
        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="glass-card glass-card-hover h-full rounded-lg p-6">
                <item.icon className={`h-6 w-6 ${item.tone}`} />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "원본과 목표를 입력",
      desc: "영상, 제목, 용도, 원하는 톤을 입력합니다.",
    },
    {
      icon: Wand2,
      title: "AI 초안 생성",
      desc: "핵심 장면, 자막, 세로형 컷, 강조 요소를 구성합니다.",
    },
    {
      icon: CheckCircle2,
      title: "검토 후 렌더링",
      desc: "마음에 드는 초안을 MP4로 렌더링합니다.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 lg:py-24">
      <div className="section-divider absolute left-0 right-0 top-0" />
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">작동 방식</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">초안까지 오래 걸리지 않습니다.</h2>
        </FadeIn>
        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="glass-card h-full rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <step.icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function UseCaseSection() {
  const cases = [
    { title: "강의 요약", desc: "긴 강의에서 핵심 설명만 짧은 클립으로 정리" },
    { title: "인터뷰 릴스", desc: "답변의 좋은 문장을 찾아 자막 중심으로 편집" },
    { title: "제품 데모", desc: "기능 설명을 쇼츠 형식의 소개 영상으로 변환" },
    { title: "문제 풀이", desc: "해설 흐름을 끊기지 않게 짧은 교육 영상으로 구성" },
  ];

  return (
    <section id="use-cases" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">활용 사례</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">콘텐츠 유형에 맞춰 편집 흐름을 바꿉니다.</h2>
        </FadeIn>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item) => (
            <StaggerItem key={item.title}>
              <div className="glass-card glass-card-hover h-full rounded-lg p-5">
                <Film className="h-5 w-5 text-primary" />
                <h3 className="mt-5 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function StylePresetGallery() {
  const presets = ["강의형 자막", "리뷰형 컷 편집", "미니멀 브랜딩", "제품 소개", "인터뷰 클립", "뉴스 요약"];

  return (
    <section className="py-20 lg:py-24">
      <div className="section-divider mb-20" />
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-sm font-semibold text-primary">스타일 프리셋</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">브랜드에 맞는 형식을 빠르게 고르세요.</h2>
        </FadeIn>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {presets.map((preset, index) => (
            <StaggerItem key={preset}>
              <div className="glass-card glass-card-hover overflow-hidden rounded-lg">
                <div className="aspect-[16/9] bg-[linear-gradient(135deg,#171a1f,#29231a_52%,#101113)] p-4">
                  <div className="h-full rounded-md border border-white/10 bg-black/20 p-3">
                    <div className="h-2 w-20 rounded bg-primary/80" />
                    <div className="mt-auto flex h-full items-end">
                      <div className="w-full rounded-md bg-black/55 px-3 py-2 text-sm font-semibold">{preset}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="font-semibold">{preset}</span>
                  <span className="text-sm text-muted-foreground">{index + 1}번</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-6 py-20">
      <FadeIn>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#111316]">
          <div className="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">원본 영상을 올리고 첫 초안을 확인하세요.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                편집 방향을 짧게 적으면 ViewCap이 핵심 컷, 자막, 세로형 구성을 먼저 만듭니다.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/signup?next=/projects/new">
                시작하기
                <Zap className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
