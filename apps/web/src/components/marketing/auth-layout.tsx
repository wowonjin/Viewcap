"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { MarketingBackground } from "./marketing-background";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <MarketingBackground />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/30">
            <Zap className="h-4 w-4 text-indigo-400" />
          </div>
          <span className="text-xl font-bold">
            View<span className="gradient-text">Cap</span>
          </span>
        </Link>

        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          가입 시 300 크레딧 무료 · 미리보기 무료
        </p>
      </div>
    </div>
  );
}
