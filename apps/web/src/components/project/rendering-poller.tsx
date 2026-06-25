"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/badge";

export function RenderingPoller({ projectId }: { projectId: string }) {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const router = useRouter();
  const [job, setJob] = useState<{ status: string; errorMessage?: string } | null>(null);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!jobId) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/render/jobs/${jobId}`);
      const data = await res.json();
      setJob(data.job);
      if (data.job.status === "PROCESSING") setProgress(60);
      if (data.job.status === "COMPLETED") {
        setProgress(100);
        router.push(`/projects/${projectId}/result`);
      }
      if (data.job.status === "FAILED") setProgress(100);
    }, 2000);
    return () => clearInterval(interval);
  }, [jobId, projectId, router]);

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-border bg-white p-8 text-center">
      <StatusBadge status={job?.status ?? "queued"} />
      <h2 className="mt-4 text-2xl font-bold">렌더링 진행 중</h2>
      <p className="mt-2 text-muted-foreground">고화질 MP4를 생성하고 있습니다</p>
      <Progress value={progress} className="mt-6" />
      {job?.status === "FAILED" && (
        <p className="mt-4 text-sm text-destructive">
          {job.errorMessage ?? "렌더링 실패 — 크레딧이 환급됩니다."}
        </p>
      )}
      <Button className="mt-6" variant="outline" asChild>
        <Link href={`/projects/${projectId}/editor`}>에디터로 돌아가기</Link>
      </Button>
    </div>
  );
}
