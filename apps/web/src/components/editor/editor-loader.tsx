"use client";

import { useEffect, useState } from "react";
import type { VideoProject } from "@viewcap/edl";
import { EditorWorkspace } from "@/components/editor/editor-workspace";
import { StatusBadge } from "@/components/ui/badge";

export function EditorLoader({ projectId }: { projectId: string }) {
  const [edl, setEdl] = useState<VideoProject | null>(null);
  const [status, setStatus] = useState("LOADING");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      setStatus(data.project.status);
      setTitle(data.project.title);
      const timeline = data.project.timelines?.[0];
      if (timeline?.edl) {
        setEdl(timeline.edl as VideoProject);
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [projectId]);

  if (!edl) {
    return (
      <div className="rounded-3xl border border-border bg-white p-12 text-center">
        <StatusBadge status={status.toLowerCase()} />
        <h2 className="mt-4 text-xl font-semibold">{title || "프로젝트"}</h2>
        <p className="mt-2 text-muted-foreground">AI가 영상을 분석하고 편집안을 생성 중입니다...</p>
      </div>
    );
  }

  return <EditorWorkspace projectId={projectId} initialEdl={edl} />;
}
