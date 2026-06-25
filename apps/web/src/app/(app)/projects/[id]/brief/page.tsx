import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { ProjectBriefForm } from "@/components/project/project-brief-form";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProjectBriefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });
  if (!project) redirect("/dashboard");

  return (
    <AppShell>
      <h1 className="mb-6 text-3xl font-bold">편집 브리프 입력</h1>
      <ProjectBriefForm projectId={id} initialTitle={project.title} />
    </AppShell>
  );
}
