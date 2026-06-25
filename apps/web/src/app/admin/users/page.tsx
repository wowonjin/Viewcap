import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { CreditAdjustForm } from "@/components/admin/admin-actions";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";
import { formatCredits } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { plan: true, _count: { select: { projects: true } } },
  });

  return (
    <AdminShell active="/admin/users">
      <h1 className="mb-6 text-2xl font-bold">사용자 관리</h1>
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">Email</TableHead>
              <TableHead className="text-slate-400">Plan</TableHead>
              <TableHead className="text-slate-400">Credits</TableHead>
              <TableHead className="text-slate-400">Projects</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">
                  <Link href={`/admin/users/${user.id}`} className="hover:text-blue-400 hover:underline">
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell className="text-slate-300">{user.plan?.name ?? "Free"}</TableCell>
                <TableCell className="text-slate-300">{formatCredits(user.creditBalance)}</TableCell>
                <TableCell className="text-slate-300">{user._count.projects}</TableCell>
                <TableCell><StatusBadge status={user.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">크레딧 수동 조정</h2>
        {users.slice(0, 5).map((user) => (
          <CreditAdjustForm key={user.id} userId={user.id} email={user.email} />
        ))}
      </div>
    </AdminShell>
  );
}
