import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { RetryJobButton } from "@/components/admin/admin-actions";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminRenderJobsPage() {
  const jobs = await prisma.renderJob.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { project: { select: { title: true } } },
  });

  return (
    <AdminShell active="/admin/render-jobs">
      <h1 className="mb-6 text-2xl font-bold">렌더링 작업</h1>
      <div className="overflow-hidden rounded-xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-900">
              <TableHead className="text-slate-400">Project</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Credits</TableHead>
              <TableHead className="text-slate-400">Error</TableHead>
              <TableHead className="text-slate-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="border-slate-700 hover:bg-slate-900">
                <TableCell className="text-white">
                  <Link href={`/admin/render-jobs/${job.id}`} className="hover:text-blue-400 hover:underline">
                    {job.project.title}
                  </Link>
                </TableCell>
                <TableCell><StatusBadge status={job.status} /></TableCell>
                <TableCell className="text-slate-300">{job.costCredits}</TableCell>
                <TableCell className="max-w-xs truncate text-slate-400">{job.errorMessage ?? "-"}</TableCell>
                <TableCell><RetryJobButton jobId={job.id} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
