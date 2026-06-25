"use client";

import { motion } from "framer-motion";
import { Check, Clock3, Film, Loader2, Play, Sparkles, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

const steps = ["원본 분석", "후킹 구간 선택", "자막 정리", "세로형 컷 생성"];

export function HeroDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((current) => (current + 1) % steps.length), 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-w-0 max-w-full">
      <div className="absolute -inset-2 rounded-xl bg-primary/10 blur-2xl" />
      <div className="glass-card relative max-w-full overflow-hidden rounded-lg">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5c84b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#66d19e]" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">ViewCap Studio</span>
          </div>
          <span className="hidden rounded-md border border-primary/25 bg-primary/[0.12] px-2.5 py-1 text-xs font-semibold text-primary sm:inline-flex">
            Draft ready
          </span>
        </div>

        <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0 p-4">
            <div className="grid min-w-0 gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
              <div className="space-y-2">
                {["Lecture.mov", "Interview.mp4", "Product-demo.mov"].map((asset, index) => (
                  <div
                    key={asset}
                    className={`rounded-lg border p-3 ${index === 0 ? "border-primary/35 bg-primary/10" : "border-white/10 bg-white/5"}`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <Film className="h-3.5 w-3.5 text-primary" />
                      {asset}
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${68 - index * 18}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#121417]">
                <div className="relative aspect-video bg-[linear-gradient(135deg,#242a30,#111315_50%,#2c2119)]">
                  <div className="absolute inset-4 rounded-md border border-white/[0.12] bg-black/[0.18]" />
                  <div className="absolute left-5 top-5 rounded-md bg-black/45 px-2 py-1 text-xs text-white/80">
                    원본 18:42
                  </div>
                  <motion.div
                    className="absolute bottom-5 left-5 right-5 rounded-md bg-black/64 px-3 py-2 text-center text-sm font-semibold"
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {["이 장면을 35초 훅으로 사용", "침묵 구간 제거", "핵심 문장 강조", "쇼츠 비율로 재구성"][step]}
                  </motion.div>
                  <button
                    type="button"
                    aria-label="미리보기 재생"
                    className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                </div>

                <div className="space-y-2 border-t border-white/10 p-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Timeline</span>
                    <span>00:00 - 00:42</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {[58, 42, 76, 36, 70, 48, 62, 44].map((height, index) => (
                      <div key={index} className="flex h-10 items-end rounded bg-white/5 px-1">
                        <span className="w-full rounded-sm bg-primary/70" style={{ height: `${height}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["Hook score", "92", "text-primary"],
                ["Caption lines", "18", "text-[var(--accent-green)]"],
                ["Export ratio", "9:16", "text-[var(--accent-blue)]"],
              ].map(([label, value, color]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className={`mt-1 text-xl font-bold ${color}`}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/[0.24] p-4 lg:border-l lg:border-t-0">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              AI 작업 큐
            </div>
            <div className="space-y-3">
              {steps.map((label, index) => {
                const done = index < step;
                const active = index === step;
                return (
                  <div key={label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.08]">
                      {done ? (
                        <Check className="h-4 w-4 text-[var(--accent-green)]" />
                      ) : active ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <Clock3 className="h-4 w-4 text-muted-foreground" />
                      )}
                    </span>
                    <span className={active || done ? "text-sm font-medium" : "text-sm text-muted-foreground"}>{label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Wand2 className="h-4 w-4" />
                명령어
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">“인트로는 짧게, 자막은 크게, 마지막에 CTA 넣어줘.”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
