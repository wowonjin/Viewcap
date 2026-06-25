import { z } from "zod";

export const aspectRatioSchema = z.enum(["9:16", "16:9", "1:1"]);
export type AspectRatio = z.infer<typeof aspectRatioSchema>;

export const assetKindSchema = z.enum(["video", "audio", "image", "subtitle"]);
export type AssetKind = z.infer<typeof assetKindSchema>;

export const assetSchema = z.object({
  id: z.string(),
  kind: assetKindSchema,
  originalUrl: z.string(),
  proxyUrl: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  durationMs: z.number().optional(),
  fps: z.number().optional(),
  fileName: z.string().optional(),
});

export type Asset = z.infer<typeof assetSchema>;

export const wordSchema = z.object({
  startMs: z.number(),
  endMs: z.number(),
  text: z.string(),
});

export const transcriptSegmentSchema = z.object({
  startMs: z.number(),
  endMs: z.number(),
  text: z.string(),
  words: z.array(wordSchema).optional(),
  speaker: z.string().optional(),
  confidence: z.number().optional(),
});

export type TranscriptSegment = z.infer<typeof transcriptSegmentSchema>;

export const scenePurposeSchema = z.enum([
  "hook",
  "explain",
  "demo",
  "cutaway",
  "cta",
]);

export const transitionSchema = z.enum(["cut", "fade", "wipe"]);

export const videoLayerSchema = z.object({
  type: z.literal("video"),
  assetId: z.string(),
  srcStartMs: z.number(),
  srcEndMs: z.number(),
  speed: z.number().optional(),
  crop: z
    .object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() })
    .optional(),
  transform: z
    .object({ x: z.number(), y: z.number(), scale: z.number() })
    .optional(),
  effect: z.enum(["none", "zoom-in", "zoom-out", "blur-bg"]).optional(),
});

export const captionLayerSchema = z.object({
  type: z.literal("caption"),
  text: z.string(),
  startMs: z.number(),
  endMs: z.number(),
  style: z.enum(["minimal", "bold", "highlight", "education"]),
  fontSize: z.number().optional(),
  emphasis: z.array(z.string()).optional(),
});

export const textLayerSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  transform: z
    .object({ x: z.number(), y: z.number(), scale: z.number() })
    .optional(),
  themeToken: z.string().optional(),
});

export const audioLayerSchema = z.object({
  type: z.literal("audio"),
  assetId: z.string(),
  startMs: z.number(),
  endMs: z.number(),
  volume: z.number().optional(),
  ducking: z.boolean().optional(),
});

export const layerSchema = z.discriminatedUnion("type", [
  videoLayerSchema,
  captionLayerSchema,
  textLayerSchema,
  audioLayerSchema,
]);

export type Layer = z.infer<typeof layerSchema>;

export const sceneSchema = z.object({
  id: z.string(),
  startMs: z.number(),
  durationMs: z.number(),
  purpose: scenePurposeSchema,
  layers: z.array(layerSchema),
  transitionIn: transitionSchema.optional(),
  transitionOut: transitionSchema.optional(),
});

export type Scene = z.infer<typeof sceneSchema>;

export const videoProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  aspectRatio: aspectRatioSchema,
  stylePreset: z.string(),
  assets: z.array(assetSchema),
  transcript: z.array(transcriptSegmentSchema),
  timeline: z.array(sceneSchema),
  version: z.number(),
});

export type VideoProject = z.infer<typeof videoProjectSchema>;

export const editPatchSchema = z.object({
  action: z.literal("patch_timeline"),
  reason: z.string(),
  patches: z.array(
    z.object({
      op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
      path: z.string(),
      value: z.unknown().optional(),
      from: z.string().optional(),
    }),
  ),
});

export type EditPatch = z.infer<typeof editPatchSchema>;

export function getProjectDurationMs(project: VideoProject): number {
  if (project.timeline.length === 0) return 0;
  const last = project.timeline[project.timeline.length - 1];
  return last.startMs + last.durationMs;
}

export function getTotalDurationFrames(project: VideoProject, fps = 30): number {
  return Math.ceil(getProjectDurationMs(project) / (1000 / fps));
}
