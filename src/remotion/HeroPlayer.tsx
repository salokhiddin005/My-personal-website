import { Player } from "@remotion/player";
import { HeroAnimation } from "./compositions/HeroAnimation";
import { useEffect, useRef, useState } from "react";
import type { PlayerRef } from "@remotion/player";

const FPS = 30;
const DURATION_SECONDS = 10;

export const HeroPlayer: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <Player
        ref={playerRef}
        component={HeroAnimation}
        compositionWidth={dimensions.width}
        compositionHeight={dimensions.height}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        loop
        autoPlay
        style={{
          width: "100%",
          height: "100%",
        }}
        controls={false}
        showPosterWhenPaused={false}
        clickToPlay={false}
      />
    </div>
  );
};
