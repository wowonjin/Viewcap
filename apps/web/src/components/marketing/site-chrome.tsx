"use client";

import { Menu, PlaySquare, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/how-it-works", label: "작동 방식" },
  { href: "/ai-video-editor", label: "AI 편집기" },
  { href: "/ai-shorts-editor", label: "쇼츠" },
  { href: "/pricing", label: "요금" },
];

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition duration-200",
        scrolled ? "border-b border-white/10 bg-[#08090b]/[0.86] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.08]">
            <PlaySquare className="h-4 w-4 text-primary" />
          </span>
          <span className="text-lg font-bold">ViewCap</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link href="/signup?next=/projects/new">무료로 시작</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground hover:bg-white/[0.06] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#08090b]/[0.96] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-white/10 pt-4">
              <Button variant="ghost" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/signup?next=/projects/new">무료로 시작</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function MarketingFooter() {
  const columns = [
    {
      title: "제품",
      links: [
        ["/ai-video-editor", "AI 영상 편집"],
        ["/ai-shorts-editor", "AI 쇼츠 편집"],
        ["/ai-lecture-video-editor", "강의 영상 편집"],
        ["/ai-subtitle-generator", "AI 자막 생성"],
      ],
    },
    {
      title: "자료",
      links: [
        ["/how-it-works", "작동 방식"],
        ["/examples", "예시 결과"],
        ["/compare/capcut-ai-alternative", "CapCut 대안"],
        ["/compare/vrew-alternative", "Vrew 대안"],
      ],
    },
    {
      title: "정책",
      links: [
        ["/legal/terms", "이용약관"],
        ["/legal/privacy", "개인정보처리방침"],
        ["/legal/refund", "환불 정책"],
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.08]">
              <PlaySquare className="h-4 w-4 text-primary" />
            </span>
            <span className="font-bold">ViewCap</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            긴 영상을 짧고 선명한 숏폼 편집본으로 바꾸는 브라우저 기반 AI 영상 편집기.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {column.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-foreground">바로 시작</h4>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            샘플 프로젝트로 미리보고, 마음에 들 때 렌더링하세요.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/signup?next=/projects/new">영상 업로드</Link>
          </Button>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ViewCap. All rights reserved.
      </div>
    </footer>
  );
}
