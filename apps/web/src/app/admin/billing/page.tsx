import { AdminShell } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";
import { formatKrw } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBillingPage() {
  const [payments, webhooks, ledger] = await Promise.all([
    prisma.payment.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.paymentWebhookEvent.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.creditLedger.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { user: { select: { email: true } } },
    }),
  ]);

  return (
    <AdminShell active="/admin/billing">
      <h1 className="mb-6 text-2xl font-bold">Billing & Credits</h1>

      <h2 className="mb-3 text-lg font-semibold">결제 내역</h2>
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">Order</TableHead>
              <TableHead className="text-slate-400">Amount</TableHead>
              <TableHead className="text-slate-400">Credits</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">{p.providerOrderId ?? p.id.slice(0, 8)}</TableCell>
                <TableCell className="text-slate-300">{formatKrw(p.amountKrw)}</TableCell>
                <TableCell className="text-slate-300">{p.creditsGranted}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mb-3 text-lg font-semibold">Credit Ledger</h2>
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">User</TableHead>
              <TableHead className="text-slate-400">Type</TableHead>
              <TableHead className="text-slate-400">Amount</TableHead>
              <TableHead className="text-slate-400">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ledger.map((row) => (
              <TableRow key={row.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">{row.user.email}</TableCell>
                <TableCell className="text-slate-300">{row.type}</TableCell>
                <TableCell className="text-slate-300">{row.amount}</TableCell>
                <TableCell className="text-slate-300">{row.balanceAfter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mb-3 text-lg font-semibold">Webhook Logs</h2>
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">Event</TableHead>
              <TableHead className="text-slate-400">Processed</TableHead>
              <TableHead className="text-slate-400">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((w) => (
              <TableRow key={w.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">{w.eventType}</TableCell>
                <TableCell className="text-slate-300">{w.processed ? "Yes" : "No"}</TableCell>
                <TableCell className="text-slate-300">{w.createdAt.toISOString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
