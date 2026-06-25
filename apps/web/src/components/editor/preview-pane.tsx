"use client";

import { Player } from "@remotion/player";
import type { VideoProject } from "@viewcap/edl";
import { getCompositionConfig, VideoComposition } from "@viewcap/remotion";

export function PreviewPane({ edl }: { edl: VideoProject }) {
  const config = getCompositionConfig(edl);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-black">
      <Player
        component={VideoComposition}
        inputProps={{ edl }}
        durationInFrames={config.durationInFrames}
        compositionWidth={config.width}
        compositionHeight={config.height}
        fps={config.fps}
        controls
        style={{ width: "100%", aspectRatio: "9 / 16", maxHeight: 640 }}
      />
    </div>
  );
}
