"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/marketing/auth-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const roles = ["강사 / 학원", "1인 크리에이터", "마케터", "기타"];
const useCases = ["강의 쇼츠", "SNS 릴스", "제품 소개", "문제 해설"];
const styles = ["lecture-shorts", "reels-fast", "minimal-clean"];

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-3 text-sm transition-all duration-200",
        selected
          ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          : "border-white/10 bg-white/4 text-muted-foreground hover:border-white/20",
      )}
    >
      {children}
    </button>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState(roles[0]);
  const [useCase, setUseCase] = useState(useCases[0]);
  const [stylePreference, setStylePreference] = useState(styles[0]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, useCase, stylePreference }),
    });
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthLayout title="환영합니다!" subtitle="맞춤 편집 경험을 위해 몇 가지만 알려주세요">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>직업 / 역할</Label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <OptionButton key={r} selected={role === r} onClick={() => setRole(r)}>
                {r}
              </OptionButton>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>주요 사용 목적</Label>
          <div className="grid grid-cols-2 gap-2">
            {useCases.map((u) => (
              <OptionButton key={u} selected={useCase === u} onClick={() => setUseCase(u)}>
                {u}
              </OptionButton>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>선호 스타일</Label>
          <select
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-foreground focus:border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={stylePreference}
            onChange={(e) => setStylePreference(e.target.value)}
          >
            <option value="lecture-shorts">깔끔한 강의 쇼츠</option>
            <option value="reels-fast">릴스형 빠른 편집</option>
            <option value="minimal-clean">토스형 미니멀</option>
          </select>
        </div>
        <Button type="submit" className="w-full glow-btn bg-indigo-600 hover:bg-indigo-500" disabled={loading}>
          {loading ? "저장 중..." : "대시보드로 이동"}
        </Button>
      </form>
    </AuthLayout>
  );
}
