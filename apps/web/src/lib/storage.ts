import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  getLocalPublicUrl,
  isLocalStorage,
  saveLocalFile,
} from "./local-storage";

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

export function getPublicUrl(key: string) {
  if (isLocalStorage()) return getLocalPublicUrl(key);
  const bucket = process.env.S3_BUCKET ?? "viewcap";
  const endpoint = process.env.S3_ENDPOINT ?? "http://localhost:9000";
  return `${endpoint}/${bucket}/${key}`;
}

export async function createUploadUrl(key: string, contentType: string) {
  if (isLocalStorage()) {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    return {
      uploadUrl: `${base}/api/files/upload?key=${encodeURIComponent(key)}`,
      publicUrl: getLocalPublicUrl(key),
      local: true,
      contentType,
    };
  }

  const bucket = process.env.S3_BUCKET ?? "viewcap";
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(getS3(), command, { expiresIn: 3600 });
  return { uploadUrl, publicUrl: getPublicUrl(key), local: false };
}

export async function uploadBuffer(
  key: string,
  body: Buffer,
  contentType: string,
) {
  if (isLocalStorage()) {
    return saveLocalFile(key, body);
  }
  const bucket = process.env.S3_BUCKET ?? "viewcap";
  await getS3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return getPublicUrl(key);
}
