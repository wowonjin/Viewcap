"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewProjectForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title || "새 프로젝트" }),
    });
    const { project } = await res.json();
    router.push(`/projects/${project.id}/brief`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>새 영상 만들기</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">프로젝트 제목</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 수능 물리 쇼츠" required />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "생성 중..." : "다음: 편집 브리프 입력"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">취소</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
