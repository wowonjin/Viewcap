import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: {
      renderJobs: {
        where: { status: "COMPLETED" },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!project) redirect("/dashboard");
  const renderJob = project.renderJobs[0];

  return (
    <AppShell>
      <Card>
        <CardHeader>
          <CardTitle>{project.title} — 결과물</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderJob?.outputUrl ? (
            <>
              <video
                controls
                className="mx-auto max-h-[640px] rounded-3xl"
                src={renderJob.outputUrl}
              />
              <Button asChild>
                <a href={renderJob.outputUrl} download>
                  MP4 다운로드
                </a>
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground">
              렌더링 결과가 아직 없습니다. 에디터에서 렌더링을 시작해 주세요.
            </p>
          )}
          <Button variant="outline" asChild>
            <Link href={`/projects/${id}/editor`}>에디터로 돌아가기</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
