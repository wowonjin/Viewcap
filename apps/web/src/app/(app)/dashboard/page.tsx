import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    include: { renderJobs: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  return (
    <AppShell active="/dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            프로젝트 <span className="gradient-text">대시보드</span>
          </h1>
          <p className="mt-2 text-muted-foreground">AI 편집 프로젝트를 관리하세요</p>
        </div>
        <Button asChild className="glow-btn bg-indigo-600 hover:bg-indigo-500">
          <Link href="/projects/new">+ 새 영상 만들기</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        {projects.length === 0 ? (
          <div className="glass-card rounded-3xl py-16 text-center">
            <p className="text-muted-foreground">아직 프로젝트가 없습니다.</p>
            <Button className="mt-4 glow-btn bg-indigo-600 hover:bg-indigo-500" asChild>
              <Link href="/projects/new">첫 영상 만들기</Link>
            </Button>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="glass-card glass-card-hover rounded-3xl p-6">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="mt-4 flex gap-3">
                <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-500">
                  <Link href={`/projects/${project.id}/editor`}>에디터</Link>
                </Button>
                {project.status === "COMPLETED" && (
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/projects/${project.id}/result`}>결과물</Link>
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
