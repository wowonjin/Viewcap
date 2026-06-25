"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/marketing/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [email, setEmail] = useState("demo@viewcap.local");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("로그인에 실패했습니다.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <AuthLayout title="로그인" subtitle="ViewCap 계정으로 로그인하세요">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" className="w-full glow-btn bg-indigo-600 hover:bg-indigo-500" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-indigo-400 hover:underline">
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}
