import { applyPatch, type Operation } from "fast-json-patch";
import type { EditPatch, VideoProject } from "./types";
import { videoProjectSchema } from "./types";

type PatchOp = EditPatch["patches"][number];

function compactPatches(items: Array<PatchOp | null>): PatchOp[] {
  return items.filter((item): item is PatchOp => item !== null);
}

export function applyEditPatch(
  project: VideoProject,
  patch: EditPatch,
): VideoProject {
  const cloned = structuredClone(project) as unknown as Record<string, unknown>;
  const result = applyPatch(
    cloned,
    patch.patches as Operation[],
    true,
    false,
  ).newDocument;
  result.version = (project.version ?? 0) + 1;
  return videoProjectSchema.parse(result);
}

export function createMockEdl(params: {
  projectId: string;
  title: string;
  description: string;
  stylePreset: string;
  asset: {
    id: string;
    originalUrl: string;
    proxyUrl?: string;
    durationMs: number;
    fileName?: string;
  };
  transcript?: Array<{ startMs: number; endMs: number; text: string }>;
}): VideoProject {
  const transcript =
    params.transcript ??
    [
      { startMs: 0, endMs: 3000, text: "안녕하세요, 오늘 강의를 시작하겠습니다." },
      { startMs: 3000, endMs: 7000, text: "핵심 개념을 빠르게 정리해 드릴게요." },
      { startMs: 7000, endMs: 12000, text: "이 부분이 시험에 자주 나옵니다." },
      { startMs: 12000, endMs: 15000, text: "다음 영상에서 이어서 설명하겠습니다." },
    ];

  const sceneDuration = Math.min(params.asset.durationMs, 15000);
  const hookDuration = Math.min(3000, sceneDuration);

  return {
    id: params.projectId,
    title: params.title,
    description: params.description,
    aspectRatio: "9:16",
    stylePreset: params.stylePreset,
    version: 1,
    assets: [
      {
        id: params.asset.id,
        kind: "video",
        originalUrl: params.asset.originalUrl,
        proxyUrl: params.asset.proxyUrl,
        durationMs: params.asset.durationMs,
        fileName: params.asset.fileName,
      },
    ],
    transcript,
    timeline: [
      {
        id: "scene-hook",
        startMs: 0,
        durationMs: hookDuration,
        purpose: "hook",
        transitionIn: "cut",
        transitionOut: "fade",
        layers: [
          {
            type: "video",
            assetId: params.asset.id,
            srcStartMs: 0,
            srcEndMs: hookDuration,
            effect: "zoom-in",
          },
          {
            type: "caption",
            text: transcript[0]?.text ?? params.title,
            startMs: 0,
            endMs: hookDuration,
            style: params.stylePreset.includes("reels") ? "bold" : "education",
            fontSize: 48,
          },
        ],
      },
      {
        id: "scene-main",
        startMs: hookDuration,
        durationMs: Math.max(sceneDuration - hookDuration, 1000),
        purpose: "explain",
        transitionIn: "fade",
        layers: [
          {
            type: "video",
            assetId: params.asset.id,
            srcStartMs: hookDuration,
            srcEndMs: sceneDuration,
            effect: "none",
          },
          ...(transcript[1]
            ? [
                {
                  type: "caption" as const,
                  text: transcript[1].text,
                  startMs: 0,
                  endMs: Math.max(sceneDuration - hookDuration, 1000),
                  style: "education" as const,
                  fontSize: 40,
                },
              ]
            : []),
        ],
      },
    ],
  };
}

const COMMAND_PATTERNS: Array<{
  pattern: RegExp;
  apply: (project: VideoProject) => EditPatch;
}> = [
  {
    pattern: /자막.*크|크게|font.*big|subtitle.*big/i,
    apply: (project) => ({
      action: "patch_timeline",
      reason: "자막 크기 증가",
      patches: compactPatches(
        project.timeline.flatMap((scene, i) =>
          scene.layers.map((layer, j) =>
            layer.type === "caption"
              ? {
                  op: "replace" as const,
                  path: `/timeline/${i}/layers/${j}/fontSize`,
                  value: (layer.fontSize ?? 40) + 12,
                }
              : null,
          ),
        ),
      ),
    }),
  },
  {
    pattern: /빠르|speed|tempo|템포/i,
    apply: (project) => ({
      action: "patch_timeline",
      reason: "재생 속도 증가",
      patches: compactPatches(
        project.timeline.flatMap((scene, i) =>
          scene.layers.map((layer, j) =>
            layer.type === "video"
              ? {
                  op: "replace" as const,
                  path: `/timeline/${i}/layers/${j}/speed`,
                  value: 1.25,
                }
              : null,
          ),
        ),
      ),
    }),
  },
  {
    pattern: /인트로.*삭제|intro.*remove|시작.*삭제/i,
    apply: (project) => {
      const hookIndex = project.timeline.findIndex((s) => s.purpose === "hook");
      if (hookIndex === -1) {
        return { action: "patch_timeline", reason: "인트로 없음", patches: [] };
      }
      const hookDuration = project.timeline[hookIndex].durationMs;
      return {
        action: "patch_timeline",
        reason: "인트로 장면 삭제",
        patches: [
          { op: "remove", path: `/timeline/${hookIndex}` },
          ...project.timeline
            .slice(hookIndex + 1)
            .map((scene, offset) => ({
              op: "replace" as const,
              path: `/timeline/${hookIndex + offset}/startMs`,
              value: Math.max(0, scene.startMs - hookDuration),
            })),
        ],
      };
    },
  },
  {
    pattern: /bgm.*줄|음악.*줄|volume.*down|소리.*줄/i,
    apply: (project) => ({
      action: "patch_timeline",
      reason: "BGM 볼륨 감소",
      patches: compactPatches(
        project.timeline.flatMap((scene, i) =>
          scene.layers.map((layer, j) =>
            layer.type === "audio"
              ? {
                  op: "replace" as const,
                  path: `/timeline/${i}/layers/${j}/volume`,
                  value: Math.max(0.1, (layer.volume ?? 1) * 0.5),
                }
              : null,
          ),
        ),
      ),
    }),
  },
];

export function parseNaturalLanguageCommand(
  command: string,
  project: VideoProject,
): EditPatch | null {
  for (const { pattern, apply } of COMMAND_PATTERNS) {
    if (pattern.test(command)) {
      return apply(project);
    }
  }
  return null;
}
