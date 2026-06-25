import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { RetryJobButton } from "@/components/admin/admin-actions";
import { StatusBadge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminRenderJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;

  const job = await prisma.renderJob.findUnique({
    where: { id },
    include: {
      project: { include: { user: { select: { email: true } } } },
    },
  });
  if (!job) redirect("/admin/render-jobs");

  return (
    <AdminShell active="/admin/render-jobs">
      <h1 className="mb-2 text-2xl font-bold">Render Job</h1>
      <p className="mb-6 font-mono text-sm text-slate-400">{job.id}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-700 bg-slate-900 text-white">
          <CardHeader><CardTitle className="text-base">상태</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <StatusBadge status={job.status} />
            <p className="text-sm text-slate-300">프로젝트: {job.project.title}</p>
            <p className="text-sm text-slate-300">사용자: {job.project.user.email}</p>
            <p className="text-sm text-slate-300">해상도: {job.resolution}</p>
            <p className="text-sm text-slate-300">크레딧: {job.costCredits}</p>
            <p className="text-sm text-slate-300">재시도: {job.retryCount}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-700 bg-slate-900 text-white">
          <CardHeader><CardTitle className="text-base">오류 / 출력</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {job.errorCode && <p className="text-red-400">{job.errorCode}: {job.errorMessage}</p>}
            {job.outputUrl ? (
              <a href={job.outputUrl} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
                출력물 보기
              </a>
            ) : (
              <p className="text-slate-400">출력물 없음</p>
            )}
            <RetryJobButton jobId={job.id} />
          </CardContent>
        </Card>
      </div>

      <Link href="/admin/render-jobs" className="mt-6 inline-block text-sm text-blue-400 hover:underline">
        ← 작업 목록
      </Link>
    </AdminShell>
  );
}
