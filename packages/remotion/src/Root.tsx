import React from "react";
import { Composition } from "remotion";
import { createMockEdl } from "@viewcap/edl";
import {
  COMPOSITION_ID,
  DEFAULT_FPS,
  VideoComposition,
  getCompositionConfig,
} from "./VideoComposition";

const defaultEdl = createMockEdl({
  projectId: "preview",
  title: "ViewCap Preview",
  description: "Preview",
  stylePreset: "lecture-shorts",
  asset: {
    id: "asset-1",
    originalUrl: "",
    durationMs: 15000,
  },
});

const config = getCompositionConfig(defaultEdl);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMPOSITION_ID}
        component={VideoComposition}
        durationInFrames={config.durationInFrames}
        fps={DEFAULT_FPS}
        width={config.width}
        height={config.height}
        defaultProps={{ edl: defaultEdl }}
      />
    </>
  );
};

export * from "./VideoComposition";
