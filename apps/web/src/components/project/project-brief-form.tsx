"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProjectBriefForm({ projectId, initialTitle }: { projectId: string; initialTitle: string }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState("");
  const [stylePreset, setStylePreset] = useState("lecture-shorts");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const uploadMetaRes = await fetch(`/api/projects/${projectId}/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type || "video/mp4",
        sizeBytes: file.size,
        title,
        description,
        stylePreset,
      }),
    });
    if (!uploadMetaRes.ok) {
      setProgress("업로드 준비 실패");
      setLoading(false);
      return;
    }
    const { uploadUrl, assetId } = await uploadMetaRes.json();

    setProgress("영상 업로드 중...");
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type || "video/mp4" },
    });

    setProgress("AI 분석 시작...");
    const analyzeRes = await fetch(`/api/projects/${projectId}/upload`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetId }),
    });

    if (!analyzeRes.ok) {
      setProgress("크레딧이 부족하거나 분석 시작에 실패했습니다.");
      setLoading(false);
      return;
    }

    router.push(`/projects/${projectId}/editor`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>편집 브리프</CardTitle>
        <CardDescription>AI에게 전달할 정보와 원본 영상을 입력하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">영상 제목</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">영상 설명 / 목적</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="예: 수능 물리 전기장 핵심 3분 요약 쇼츠" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">편집 스타일</Label>
            <select id="style" className="h-11 w-full rounded-2xl border border-input px-4" value={stylePreset} onChange={(e) => setStylePreset(e.target.value)}>
              <option value="lecture-shorts">깔끔한 강의 쇼츠</option>
              <option value="reels-fast">릴스형 빠른 편집</option>
              <option value="minimal-clean">토스형 미니멀</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">원본 영상</Label>
            <Input id="file" type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
          </div>
          {progress && <p className="text-sm text-primary">{progress}</p>}
          <div className="flex gap-3">
            <Button type="submit" disabled={loading || !file}>{loading ? "처리 중..." : "AI 편집 시작"}</Button>
            <Button variant="outline" asChild><Link href="/dashboard">취소</Link></Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
