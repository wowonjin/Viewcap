"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreditAdjustForm({ userId, email }: { userId: string; email: string }) {
  const [amount, setAmount] = useState("100");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    const res = await fetch("/api/admin/overview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "credit-adjust",
        userId,
        amount: Number(amount),
        reason,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`완료: ${data.creditBalance} 크레딧`);
    } else {
      setMessage("실패");
    }
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="text-sm font-medium">{email}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Input
          className="w-28 bg-slate-800 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          className="flex-1 bg-slate-800 text-white"
          placeholder="사유"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button size="sm" onClick={submit}>
          크레딧 조정
        </Button>
      </div>
      {message && <p className="mt-2 text-xs text-blue-400">{message}</p>}
    </div>
  );
}

export function RetryJobButton({ jobId }: { jobId: string }) {
  const [msg, setMsg] = useState("");
  async function retry() {
    const res = await fetch("/api/admin/render-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    setMsg(res.ok ? "재시도 큐 등록됨" : "실패");
  }
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" onClick={retry}>
        재시도
      </Button>
      {msg && <span className="text-xs text-blue-400">{msg}</span>}
    </div>
  );
}
