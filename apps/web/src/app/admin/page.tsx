import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [users, projects, payments, renderJobs, failedJobs, openTickets] =
    await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.payment.count({ where: { status: "PAID" } }),
      prisma.renderJob.count(),
      prisma.renderJob.count({ where: { status: "FAILED" } }),
      prisma.supportTicket.count({ where: { status: "OPEN" } }),
    ]);

  const failureRate = renderJobs > 0 ? ((failedJobs / renderJobs) * 100).toFixed(1) : "0";

  const cards = [
    { label: "가입자", value: users },
    { label: "프로젝트", value: projects },
    { label: "결제 완료", value: payments },
    { label: "렌더 작업", value: renderJobs },
    { label: "실패율", value: `${failureRate}%` },
    { label: "미처리 문의", value: openTickets },
  ];

  return (
    <AdminShell active="/admin">
      <h1 className="mb-6 text-2xl font-bold">운영 Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className="border-slate-700 bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-sm text-slate-400">{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
