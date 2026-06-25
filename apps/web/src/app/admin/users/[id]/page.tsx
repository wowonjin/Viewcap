import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { CreditAdjustForm } from "@/components/admin/admin-actions";
import { StatusBadge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCredits, formatKrw } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;

  const target = await prisma.user.findUnique({
    where: { id },
    include: {
      plan: true,
      onboarding: true,
      projects: { orderBy: { updatedAt: "desc" }, take: 10 },
      creditLedger: { orderBy: { createdAt: "desc" }, take: 15 },
      payments: { orderBy: { createdAt: "desc" }, take: 10 },
      supportTickets: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });
  if (!target) redirect("/admin/users");

  return (
    <AdminShell active="/admin/users">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{target.email}</h1>
          <p className="text-slate-400">{target.name ?? "이름 없음"} · {formatCredits(target.creditBalance)}</p>
        </div>
        <StatusBadge status={target.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-700 bg-slate-900 text-white">
          <CardHeader><CardTitle className="text-base">프로필</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <p>플랜: {target.plan?.name ?? "Free"}</p>
            <p>역할: {target.onboarding?.role ?? "-"}</p>
            <p>용도: {target.onboarding?.useCase ?? "-"}</p>
            <p>가입: {target.createdAt.toLocaleDateString("ko-KR")}</p>
          </CardContent>
        </Card>
        <CreditAdjustForm userId={target.id} email={target.email} />
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">프로젝트</h2>
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">제목</TableHead>
              <TableHead className="text-slate-400">상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {target.projects.map((p) => (
              <TableRow key={p.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">{p.title}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mb-3 text-lg font-semibold">크레딧 Ledger</h2>
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">Type</TableHead>
              <TableHead className="text-slate-400">Amount</TableHead>
              <TableHead className="text-slate-400">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {target.creditLedger.map((row) => (
              <TableRow key={row.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-slate-300">{row.type}</TableCell>
                <TableCell className="text-slate-300">{row.amount}</TableCell>
                <TableCell className="text-slate-300">{row.balanceAfter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mb-3 text-lg font-semibold">결제</h2>
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableBody>
            {target.payments.map((p) => (
              <TableRow key={p.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">{formatKrw(p.amountKrw)}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Link href="/admin/users" className="mt-6 inline-block text-sm text-blue-400 hover:underline">
        ← 사용자 목록
      </Link>
    </AdminShell>
  );
}
