import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

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

export async function uploadFileToS3(
  key: string,
  body: Buffer,
  contentType: string,
) {
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
