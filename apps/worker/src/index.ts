import "dotenv/config";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { createIngestProcessor } from "./processors/ingest.js";
import { createAnalyzeProcessor } from "./processors/analyze.js";
import { createRenderProcessor } from "./processors/render.js";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

console.log("[worker] Starting ViewCap workers...");

const ingestWorker = new Worker("ingest", createIngestProcessor(), {
  connection,
  concurrency: 2,
});

const analyzeWorker = new Worker("analyze", createAnalyzeProcessor(), {
  connection,
  concurrency: 2,
});

const renderWorker = new Worker("render", createRenderProcessor(), {
  connection,
  concurrency: 1,
});

for (const worker of [ingestWorker, analyzeWorker, renderWorker]) {
  worker.on("completed", (job) => {
    console.log(`[worker] ${worker.name} completed job ${job.id}`);
  });
  worker.on("failed", (job, err) => {
    console.error(`[worker] ${worker.name} failed job ${job?.id}:`, err.message);
  });
}

process.on("SIGINT", async () => {
  await Promise.all([
    ingestWorker.close(),
    analyzeWorker.close(),
    renderWorker.close(),
  ]);
  await connection.quit();
  process.exit(0);
});
