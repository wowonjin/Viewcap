import { Queue } from "bullmq";

function getConnection() {
  return {
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
  };
}

export async function enqueueIngest(data: { assetId: string; projectId: string }) {
  const queue = new Queue("ingest", { connection: getConnection() });
  await queue.add("ingest", data);
  await queue.close();
}

export async function enqueueRender(data: { renderJobId: string }) {
  const queue = new Queue("render", { connection: getConnection() });
  await queue.add("render", data);
  await queue.close();
}
