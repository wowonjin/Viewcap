"use client";

import { useState } from "react";
import type { VideoProject } from "@viewcap/edl";
import { Button } from "@/components/ui/button";
import { PreviewPane } from "./preview-pane";

const SUGGESTIONS = ["자막 크게", "더 빠르게", "인트로 삭제", "BGM 줄이기"];

export function EditorWorkspace({
  projectId,
  initialEdl,
}: {
  projectId: string;
  initialEdl: VideoProject;
}) {
  const [edl, setEdl] = useState(initialEdl);
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendCommand(text: string) {
    setLoading(true);
    setMessage("");
    const res = await fetch(`/api/projects/${projectId}/edit-command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: text }),
    });
    setLoading(false);
    if (!res.ok) {
      setMessage("명령을 이해하지 못했습니다.");
      return;
    }
    const data = await res.json();
    setEdl(data.edl);
    setMessage(data.patch.reason);
    setCommand("");
  }

  async function startRender() {
    setLoading(true);
    const res = await fetch(`/api/projects/${projectId}/render`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolution: "1080p" }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error === "INSUFFICIENT_CREDITS" ? "크레딧이 부족합니다." : "렌더링 요청 실패");
      return;
    }
    const data = await res.json();
    window.location.href = `/projects/${projectId}/rendering?jobId=${data.renderJob.id}`;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-border bg-white p-5">
          <h3 className="font-semibold">자연어 편집</h3>
          <p className="mt-1 text-sm text-muted-foreground">말로 편집 명령을 내려보세요</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendCommand(s)}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                disabled={loading}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              className="h-11 flex-1 rounded-2xl border border-input px-4 text-sm"
              placeholder="예: 자막 크게"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && command && sendCommand(command)}
            />
            <Button onClick={() => command && sendCommand(command)} disabled={loading}>
              적용
            </Button>
          </div>
          {message && <p className="mt-3 text-sm text-primary">{message}</p>}
        </div>
        <Button size="lg" className="w-full" onClick={startRender} disabled={loading}>
          최종 MP4 렌더링
        </Button>
      </div>
      <PreviewPane edl={edl} />
    </div>
  );
}
