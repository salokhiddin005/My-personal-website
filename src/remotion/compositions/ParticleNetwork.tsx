import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const GOLD = "hsl(var(--gold))";
const GOLD_DIM = "hsl(var(--gold-dim))";
const CONNECTION_DISTANCE = 150;
const ACCENT_INDICES = new Set([0, 12, 27]);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  delay: number;
  depth: number;
  isAccent: boolean;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = seededRandom(i * 3 + 7);
    const isAccent = ACCENT_INDICES.has(i);
    const depthSizeFactor = 0.5 + depth * 0.5;
    const depthVelocityFactor = 0.3 + depth * 0.7;
    return {
      x: seededRandom(i * 3 + 1) * width,
      y: seededRandom(i * 3 + 2) * height,
      vx: (seededRandom(i * 3 + 3) - 0.5) * 0.6 * depthVelocityFactor,
      vy: (seededRandom(i * 3 + 4) - 0.5) * 0.6 * depthVelocityFactor,
      size: (2 + seededRandom(i * 3 + 5) * 3) * depthSizeFactor,
      delay: seededRandom(i * 3 + 6) * 30,
      depth,
      isAccent,
    };
  });
}

export const ParticleNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const particles = generateParticles(35, width, height);

  const globalOpacity = interpolate(frame, [0, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const getPosition = (p: Particle, f: number) => {
    const t = f * 0.5;
    let x = p.x + p.vx * t;
    let y = p.y + p.vy * t;
    x = ((x % width) + width) % width;
    y = ((y % height) + height) % height;
    return { x, y };
  };

  const positions = particles.map((p) => getPosition(p, frame));

  // Build connections
  const connections: { x1: number; y1: number; x2: number; y2: number; dist: number }[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DISTANCE) {
        connections.push({
          x1: positions[i].x,
          y1: positions[i].y,
          x2: positions[j].x,
          y2: positions[j].y,
          dist,
        });
      }
    }
  }

  return (
    <AbsoluteFill style={{ opacity: globalOpacity }}>
      <svg width={width} height={height}>
        {/* Glow filters */}
        <defs>
          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="accentGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((c, i) => {
          const lineOpacity = interpolate(
            c.dist,
            [0, CONNECTION_DISTANCE],
            [0.2, 0],
            { extrapolateRight: "clamp" }
          );
          return (
            <line
              key={`c-${i}`}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke={GOLD_DIM}
              strokeWidth={0.8}
              opacity={lineOpacity}
              filter="url(#lineGlow)"
            />
          );
        })}

        {/* Particles */}
        {particles.map((p, i) => {
          const pos = positions[i];

          const baseOpacity = p.isAccent
            ? 0.85
            : interpolate(p.depth, [0, 1], [0.3, 0.7]);

          const particleOpacity = interpolate(
            frame,
            [p.delay, p.delay + fps * 0.8],
            [0, baseOpacity],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const pulseRange = p.isAccent
            ? 0.5
            : interpolate(p.depth, [0, 1], [0.15, 0.4]);

          const pulse = interpolate(
            (frame + p.delay * 3) % (fps * 2),
            [0, fps, fps * 2],
            [1, 1 + pulseRange, 1],
          );

          const displaySize = p.isAccent ? p.size * 1.6 * pulse : p.size * pulse;
          const filterAttr = p.isAccent ? "url(#accentGlow)" : "url(#particleGlow)";

          return (
            <circle
              key={`p-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={displaySize}
              fill={GOLD}
              opacity={particleOpacity}
              filter={filterAttr}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
