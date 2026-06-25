import { AdminShell } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  const tickets = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: { select: { email: true, name: true } } },
  });

  return (
    <AdminShell active="/admin/support">
      <h1 className="mb-6 text-2xl font-bold">Support Console</h1>
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">User</TableHead>
              <TableHead className="text-slate-400">Subject</TableHead>
              <TableHead className="text-slate-400">Category</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">{ticket.user.email}</TableCell>
                <TableCell className="text-slate-300">{ticket.subject}</TableCell>
                <TableCell className="text-slate-300">{ticket.category}</TableCell>
                <TableCell><StatusBadge status={ticket.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {tickets.length === 0 && (
        <p className="mt-4 text-slate-400">등록된 문의가 없습니다.</p>
      )}
    </AdminShell>
  );
}
