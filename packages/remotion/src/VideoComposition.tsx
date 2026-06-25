import type { VideoProject } from "@viewcap/edl";
import { getTotalDurationFrames } from "@viewcap/edl";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const COMPOSITION_ID = "ViewCapMain";
export const DEFAULT_FPS = 30;

export type CompositionProps = {
  edl: VideoProject;
};

function CaptionOverlay({
  text,
  style,
  fontSize = 40,
}: {
  text: string;
  style: string;
  fontSize?: number;
}) {
  const styleMap: Record<string, React.CSSProperties> = {
    minimal: {
      color: "#fff",
      background: "rgba(0,0,0,0.45)",
      fontWeight: 500,
    },
    bold: {
      color: "#FFE066",
      background: "rgba(0,0,0,0.7)",
      fontWeight: 800,
      textTransform: "uppercase" as const,
    },
    highlight: {
      color: "#fff",
      background: "linear-gradient(90deg, #2563FF, #7C3AED)",
      fontWeight: 700,
    },
    education: {
      color: "#fff",
      background: "rgba(37, 99, 255, 0.85)",
      fontWeight: 600,
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 40,
        right: 40,
        padding: "16px 24px",
        borderRadius: 16,
        fontSize,
        textAlign: "center",
        lineHeight: 1.4,
        ...styleMap[style],
      }}
    >
      {text}
    </div>
  );
}

function SceneRenderer({
  sceneIndex,
  edl,
}: {
  sceneIndex: number;
  edl: VideoProject;
}) {
  const scene = edl.timeline[sceneIndex];
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneStartFrame = Math.round((scene.startMs / 1000) * fps);
  const localFrame = frame - sceneStartFrame;
  const progress = localFrame / Math.max(1, Math.round((scene.durationMs / 1000) * fps));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {scene.layers.map((layer, i) => {
        if (layer.type === "video") {
          const asset = edl.assets.find((a) => a.id === layer.assetId);
          const src = asset?.proxyUrl ?? asset?.originalUrl ?? "";
          const scale =
            layer.effect === "zoom-in"
              ? 1 + progress * 0.15
              : layer.effect === "zoom-out"
                ? 1.15 - progress * 0.15
                : 1;

          return (
            <AbsoluteFill
              key={`${scene.id}-video-${i}`}
              style={{ transform: `scale(${scale})`, overflow: "hidden" }}
            >
              {src ? (
                <OffthreadVideo
                  src={src}
                  startFrom={Math.round((layer.srcStartMs / 1000) * fps)}
                  endAt={Math.round((layer.srcEndMs / 1000) * fps)}
                  playbackRate={layer.speed ?? 1}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 32,
                  }}
                >
                  Preview
                </div>
              )}
            </AbsoluteFill>
          );
        }

        if (layer.type === "caption") {
          return (
            <CaptionOverlay
              key={`${scene.id}-caption-${i}`}
              text={layer.text}
              style={layer.style}
              fontSize={layer.fontSize}
            />
          );
        }

        if (layer.type === "audio") {
          const asset = edl.assets.find((a) => a.id === layer.assetId);
          const src = asset?.originalUrl;
          if (!src) return null;
          return (
            <Audio
              key={`${scene.id}-audio-${i}`}
              src={src}
              volume={layer.volume ?? 1}
            />
          );
        }

        return null;
      })}
    </AbsoluteFill>
  );
}

export function VideoComposition({ edl }: CompositionProps) {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {edl.timeline.map((scene, index) => {
        const from = Math.round((scene.startMs / 1000) * fps);
        const durationInFrames = Math.max(
          1,
          Math.round((scene.durationMs / 1000) * fps),
        );

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <SceneRenderer sceneIndex={index} edl={edl} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}

export function getCompositionConfig(edl: VideoProject) {
  return {
    id: COMPOSITION_ID,
    durationInFrames: Math.max(getTotalDurationFrames(edl, DEFAULT_FPS), 30),
    fps: DEFAULT_FPS,
    width: edl.aspectRatio === "9:16" ? 1080 : 1920,
    height: edl.aspectRatio === "9:16" ? 1920 : 1080,
  };
}
