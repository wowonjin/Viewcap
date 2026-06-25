import { prisma, ProjectStatus, RenderJobStatus } from "@viewcap/database";
import { isLocalStorage, keyFromPublicUrl, readLocalFile, saveLocalFile } from "@/lib/local-storage";

export async function processRenderSync(renderJobId: string) {
  const renderJob = await prisma.renderJob.findUnique({
    where: { id: renderJobId },
    include: {
      project: {
        include: {
          assets: true,
          timelines: { where: { isActive: true }, take: 1 },
        },
      },
    },
  });
  if (!renderJob) return;

  const asset = renderJob.project.assets[0];
  let outputUrl = asset?.proxyUrl ?? asset?.originalUrl ?? "";

  if (isLocalStorage() && asset?.originalUrl) {
    const sourceKey = keyFromPublicUrl(asset.originalUrl);
    if (sourceKey) {
      const data = await readLocalFile(sourceKey);
      const renderKey = `projects/${renderJob.projectId}/renders/${renderJobId}.mp4`;
      outputUrl = await saveLocalFile(renderKey, data);
    }
  }

  await prisma.$transaction([
    prisma.renderJob.update({
      where: { id: renderJobId },
      data: {
        status: RenderJobStatus.COMPLETED,
        outputUrl,
        completedAt: new Date(),
        startedAt: new Date(),
      },
    }),
    prisma.project.update({
      where: { id: renderJob.projectId },
      data: { status: ProjectStatus.COMPLETED },
    }),
  ]);
}
