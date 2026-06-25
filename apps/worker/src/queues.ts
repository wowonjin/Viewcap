import { Queue } from "bullmq";
import IORedis from "ioredis";

let connection: IORedis | null = null;

function getConnection() {
  if (!connection) {
    connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      maxRetriesPerRequest: null,
    });
  }
  return connection;
}

export function getIngestQueue() {
  return new Queue("ingest", { connection: getConnection() });
}

export function getAnalyzeQueue() {
  return new Queue("analyze", { connection: getConnection() });
}

export function getRenderQueue() {
  return new Queue("render", { connection: getConnection() });
}
