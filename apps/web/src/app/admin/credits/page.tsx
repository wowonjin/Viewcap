import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCreditsPage() {
  const ledger = await prisma.creditLedger.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { email: true } } },
  });

  const totals = await prisma.user.aggregate({ _sum: { creditBalance: true }, _count: true });

  return (
    <AdminShell active="/admin/credits">
      <h1 className="mb-2 text-2xl font-bold">크레딧 관리</h1>
      <p className="mb-6 text-slate-400">
        전체 사용자 {totals._count}명 · 잔액 합계 {(totals._sum.creditBalance ?? 0).toLocaleString()} 크레딧
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">시간</TableHead>
              <TableHead className="text-slate-400">User</TableHead>
              <TableHead className="text-slate-400">Type</TableHead>
              <TableHead className="text-slate-400">Amount</TableHead>
              <TableHead className="text-slate-400">Balance</TableHead>
              <TableHead className="text-slate-400">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ledger.map((row) => (
              <TableRow key={row.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-slate-400 text-xs">{row.createdAt.toLocaleString("ko-KR")}</TableCell>
                <TableCell className="text-white">
                  <Link href={`/admin/users/${row.userId}`} className="hover:text-blue-400 hover:underline">
                    {row.user.email}
                  </Link>
                </TableCell>
                <TableCell className="text-slate-300">{row.type}</TableCell>
                <TableCell className={row.amount > 0 ? "text-emerald-400" : "text-red-400"}>{row.amount}</TableCell>
                <TableCell className="text-slate-300">{row.balanceAfter}</TableCell>
                <TableCell className="max-w-xs truncate text-slate-400">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
