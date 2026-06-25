import { prisma, ProjectStatus } from "@viewcap/database";
import { createMockEdl } from "@viewcap/edl";
import { keyFromPublicUrl, readLocalFile, saveLocalFile } from "@/lib/local-storage";
import { transcribeFromUrl } from "@/lib/transcription";

export async function processAnalyzeSync(assetId: string, projectId: string) {
  const [project, asset] = await Promise.all([
    prisma.project.findUnique({ where: { id: projectId } }),
    prisma.asset.findUnique({ where: { id: assetId } }),
  ]);
  if (!project || !asset) return;

  if (!asset.proxyUrl) {
    let proxyUrl = asset.originalUrl;
    const sourceKey = keyFromPublicUrl(asset.originalUrl);
    if (sourceKey) {
      try {
        const data = await readLocalFile(sourceKey);
        const proxyKey = `projects/${projectId}/proxy/${asset.id}.mp4`;
        proxyUrl = await saveLocalFile(proxyKey, data);
      } catch {
        proxyUrl = asset.originalUrl;
      }
    }
    await prisma.asset.update({
      where: { id: assetId },
      data: {
        proxyUrl,
        durationMs: asset.durationMs ?? 15000,
      },
    });
  }

  const updatedAsset = await prisma.asset.findUniqueOrThrow({ where: { id: assetId } });
  const transcript = await transcribeFromUrl(updatedAsset.proxyUrl ?? updatedAsset.originalUrl);
  const edl = createMockEdl({
    projectId,
    title: project.title,
    description: project.description ?? "",
    stylePreset: project.stylePreset ?? "lecture-shorts",
    asset: {
      id: updatedAsset.id,
      originalUrl: updatedAsset.originalUrl,
      proxyUrl: updatedAsset.proxyUrl ?? undefined,
      durationMs: updatedAsset.durationMs ?? 15000,
      fileName: updatedAsset.fileName,
    },
    transcript,
  });

  const latest = await prisma.projectTimeline.findFirst({
    where: { projectId },
    orderBy: { version: "desc" },
  });
  const version = (latest?.version ?? 0) + 1;

  await prisma.$transaction([
    prisma.projectTimeline.updateMany({
      where: { projectId, isActive: true },
      data: { isActive: false },
    }),
    prisma.projectTimeline.create({
      data: {
        projectId,
        version,
        edl: edl as object,
        isActive: true,
      },
    }),
    prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.READY_TO_PREVIEW },
    }),
  ]);
}
