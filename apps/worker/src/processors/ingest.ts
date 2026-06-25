import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { prisma, ProjectStatus } from "@viewcap/database";
import type { Job } from "bullmq";
import { getAnalyzeQueue } from "../queues.js";

const execFileAsync = promisify(execFile);

function getS3() {
  return new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION ?? "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? "minioadmin",
      secretAccessKey: process.env.S3_SECRET_KEY ?? "minioadmin",
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  });
}

function parseS3Url(url: string): { bucket: string; key: string } | null {
  try {
    const endpoint = process.env.S3_ENDPOINT ?? "";
    if (url.startsWith("s3://")) {
      const [, , bucket, ...rest] = url.split("/");
      return { bucket, key: rest.join("/") };
    }
    const u = new URL(url);
    if (endpoint && u.origin === new URL(endpoint).origin) {
      const parts = u.pathname.split("/").filter(Boolean);
      return { bucket: parts[0], key: parts.slice(1).join("/") };
    }
  } catch {
    return null;
  }
  return null;
}

async function downloadFromS3(url: string, destPath: string) {
  const parsed = parseS3Url(url);
  if (!parsed) throw new Error(`Invalid S3 URL: ${url}`);
  const s3 = getS3();
  const res = await s3.send(
    new GetObjectCommand({ Bucket: parsed.bucket, Key: parsed.key }),
  );
  const bytes = await res.Body?.transformToByteArray();
  if (!bytes) throw new Error("Empty S3 object");
  await writeFile(destPath, Buffer.from(bytes));
}

async function uploadToS3(key: string, body: Buffer, contentType: string) {
  const bucket = process.env.S3_BUCKET ?? "viewcap";
  const s3 = getS3();
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  const endpoint = process.env.S3_ENDPOINT ?? "http://localhost:9000";
  return `${endpoint}/${bucket}/${key}`;
}

async function probeVideo(filePath: string) {
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      filePath,
    ]);
    const data = JSON.parse(stdout) as {
      format?: { duration?: string };
      streams?: Array<{
        codec_type?: string;
        width?: number;
        height?: number;
        r_frame_rate?: string;
      }>;
    };
    const videoStream = data.streams?.find((s) => s.codec_type === "video");
    const durationMs = Math.round(
      parseFloat(data.format?.duration ?? "15") * 1000,
    );
    let fps = 30;
    if (videoStream?.r_frame_rate) {
      const [num, den] = videoStream.r_frame_rate.split("/").map(Number);
      if (den) fps = num / den;
    }
    return {
      durationMs,
      width: videoStream?.width,
      height: videoStream?.height,
      fps,
    };
  } catch {
    return { durationMs: 15000, width: 1920, height: 1080, fps: 30 };
  }
}

async function createProxy(inputPath: string, outputPath: string) {
  try {
    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      inputPath,
      "-vf",
      "scale=720:-2",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "26",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      outputPath,
    ]);
    return true;
  } catch {
    const input = await readFile(inputPath);
    await writeFile(outputPath, input);
    return false;
  }
}

export function createIngestProcessor() {
  return async (job: Job<{ assetId: string; projectId: string }>) => {
    const { assetId, projectId } = job.data;
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) throw new Error(`Asset not found: ${assetId}`);

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.ANALYZING },
    });

    const tmpDir = join(process.cwd(), "tmp", projectId);
    await mkdir(tmpDir, { recursive: true });
    const inputPath = join(tmpDir, asset.fileName);
    const proxyPath = join(tmpDir, `proxy-${asset.fileName}.mp4`);

    await downloadFromS3(asset.originalUrl, inputPath);
    await createProxy(inputPath, proxyPath);

    const meta = await probeVideo(proxyPath);
    const proxyKey = `projects/${projectId}/proxy/${asset.id}.mp4`;
    const proxyBuffer = await readFile(proxyPath);
    const proxyUrl = await uploadToS3(proxyKey, proxyBuffer, "video/mp4");

    await prisma.asset.update({
      where: { id: assetId },
      data: {
        proxyUrl,
        durationMs: meta.durationMs,
        width: meta.width,
        height: meta.height,
        fps: meta.fps,
      },
    });

    await getAnalyzeQueue().add("analyze", { assetId, projectId });

    return { proxyUrl, ...meta };
  };
}
