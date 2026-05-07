import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ParticleNetwork } from "./ParticleNetwork";
import { HeroTitle } from "./HeroTitle";

export const HeroAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Gradient meshes that fade in
  const gradientOpacity = interpolate(frame, [0, fps * 2], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Corner brackets
  const bracketSpring = interpolate(
    frame,
    [fps * 0.3, fps * 1.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Breathing center light — 240-frame (8s) sine cycle
  const breathe = Math.sin((frame / 240) * Math.PI * 2);
  const breatheOpacity = interpolate(breathe, [-1, 1], [0.06, 0.14]);

  // Drifting orb offsets
  const orb1X = Math.cos((frame / 360) * Math.PI * 2) * 30;
  const orb1Y = Math.sin((frame / 360) * Math.PI * 2) * 20;
  const orb2X = Math.cos((frame / 480) * Math.PI * 2 + Math.PI) * 25;
  const orb2Y = Math.sin((frame / 480) * Math.PI * 2 + Math.PI) * 35;

  // Noise grain seed — cycle through 4 seeds for flicker
  const grainSeed = frame % 4;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "hsl(var(--background))",
        overflow: "hidden",
      }}
    >
      {/* Grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            "linear-gradient(hsl(var(--gold) / 0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, hsl(var(--gold) / 0.04) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
          opacity: interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Radial vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, hsl(var(--background) / 0.8) 100%)",
        }}
      />

      {/* Breathing center light */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          width: Math.min(800, width * 0.9),
          height: Math.min(600, width * 0.7),
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--gold) / 0.25) 0%, transparent 70%)",
          opacity: breatheOpacity * gradientOpacity,
        }}
      />

      {/* Gradient orb 1 — drifting */}
      <div
        style={{
          position: "absolute",
          left: `calc(10% + ${orb1X}px)`,
          top: `calc(15% + ${orb1Y}px)`,
          width: Math.min(500, width * 0.6),
          height: Math.min(500, width * 0.6),
          borderRadius: "50%",
          background: "hsl(var(--gold) / 0.10)",
          filter: "blur(120px)",
          opacity: gradientOpacity,
        }}
      />
      {/* Gradient orb 2 — drifting counter-direction */}
      <div
        style={{
          position: "absolute",
          right: `calc(10% + ${orb2X}px)`,
          bottom: `calc(10% + ${orb2Y}px)`,
          width: Math.min(400, width * 0.5),
          height: Math.min(400, width * 0.5),
          borderRadius: "50%",
          background: "hsla(22, 53%, 50%, 0.08)",
          filter: "blur(100px)",
          opacity: gradientOpacity,
        }}
      />

      {/* Particle network */}
      <ParticleNetwork />

      {/* Noise grain overlay */}
      <AbsoluteFill
        style={{
          opacity: 0.06,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      >
        <svg width={width} height={height}>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={3}
              seed={grainSeed}
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>

      {/* Corner brackets */}
      <div
        style={{
          position: "absolute",
          left: width < 768 ? 16 : 32,
          top: width < 768 ? 16 : 32,
          width: width < 768 ? 40 : 64,
          height: width < 768 ? 40 : 64,
          borderLeft: "2px solid hsl(var(--gold) / 0.2)",
          borderTop: "2px solid hsl(var(--gold) / 0.2)",
          opacity: bracketSpring,
          transform: `scale(${interpolate(bracketSpring, [0, 1], [0.5, 1])})`,
          transformOrigin: "top left",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: width < 768 ? 16 : 32,
          bottom: width < 768 ? 16 : 32,
          width: width < 768 ? 40 : 64,
          height: width < 768 ? 40 : 64,
          borderRight: "2px solid hsl(var(--gold) / 0.2)",
          borderBottom: "2px solid hsl(var(--gold) / 0.2)",
          opacity: bracketSpring,
          transform: `scale(${interpolate(bracketSpring, [0, 1], [0.5, 1])})`,
          transformOrigin: "bottom right",
        }}
      />

      {/* Title + Typewriter */}
      <HeroTitle />

    </AbsoluteFill>
  );
};
