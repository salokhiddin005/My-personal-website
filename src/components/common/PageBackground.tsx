import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 35;
const CONNECTION_DISTANCE = 150;
const ACCENT_INDICES = new Set([0, 12, 27]);
const FPS = 30;
const FRAME_INTERVAL = 1000 / FPS;
const SCROLL_IDLE_MS = 500;
const SCROLL_ALPHA_MIN = 0.05;
const LERP_SPEED_OUT = 0.03; // fade-out speed (~1s)
const LERP_SPEED_IN = 0.08;  // fade-in speed (~0.4s)

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  delay: number;
  depth: number;
  isAccent: boolean;
}

function generateParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = seededRandom(i * 3 + 7);
    const depthSize = 0.5 + depth * 0.5;
    const depthVel = 0.3 + depth * 0.7;
    return {
      x: seededRandom(i * 3 + 1) * w,
      y: seededRandom(i * 3 + 2) * h,
      vx: (seededRandom(i * 3 + 3) - 0.5) * 0.6 * depthVel,
      vy: (seededRandom(i * 3 + 4) - 0.5) * 0.6 * depthVel,
      size: (2 + seededRandom(i * 3 + 5) * 3) * depthSize,
      delay: seededRandom(i * 3 + 6) * 30,
      depth,
      isAccent: ACCENT_INDICES.has(i),
    };
  });
}

const PageBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const scrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles = generateParticles(PARTICLE_COUNT, w, h);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = generateParticles(PARTICLE_COUNT, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      lastScrollTimeRef.current = performance.now();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame = 0;
    let lastTime = 0;
    let scrollAlpha = 1;

    const getColors = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        gold: `hsl(${s.getPropertyValue("--gold").trim()})`,
        goldDim: `hsl(${s.getPropertyValue("--gold-dim").trim()})`,
      };
    };

    const draw = (ts: number) => {
      if (ts - lastTime < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = ts;

      // Scroll-aware fade: dim particles when user stops scrolling to read
      const scrollY = scrollYRef.current;
      const isInHero = scrollY < h * 0.6;
      const isIdle = ts - lastScrollTimeRef.current > SCROLL_IDLE_MS;
      const targetAlpha = (isInHero || !isIdle) ? 1 : SCROLL_ALPHA_MIN;
      const lerpSpeed = targetAlpha > scrollAlpha ? LERP_SPEED_IN : LERP_SPEED_OUT;
      scrollAlpha += (targetAlpha - scrollAlpha) * lerpSpeed;

      const colors = getColors();
      ctx.clearRect(0, 0, w, h);

      // Global fade-in over 1.5s (45 frames), multiplied by scroll-aware alpha
      const globalAlpha = Math.min(frame / 45, 1) * scrollAlpha;

      // Compute positions
      const scrollOffset = reducedMotion ? 0 : scrollY;
      const positions = particles.map((p) => {
        const t = frame * 0.5;
        const parallaxOffset = scrollOffset * (0.02 + p.depth * 0.08);
        return {
          x: ((p.x + p.vx * t) % w + w) % w,
          y: ((p.y + p.vy * t + parallaxOffset) % h + h) % h,
        };
      });

      // Draw connections
      ctx.strokeStyle = colors.goldDim;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.globalAlpha = globalAlpha * 0.2 * (1 - dist / CONNECTION_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = colors.gold;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pos = positions[i];

        const baseOpacity = p.isAccent ? 0.85 : 0.3 + p.depth * 0.4;
        const fadeIn = Math.min(Math.max((frame - p.delay) / 24, 0), 1);

        // Triangle-wave pulse (2s = 60 frames, matching Remotion)
        const pulseRange = p.isAccent ? 0.5 : 0.15 + p.depth * 0.25;
        const cyc = ((frame + p.delay * 3) % 60) / 30; // 0→2
        const pulse = 1 + pulseRange * (cyc <= 1 ? cyc : 2 - cyc);

        const radius = (p.isAccent ? p.size * 1.6 : p.size) * pulse;

        // Outer glow circle
        ctx.globalAlpha = globalAlpha * baseOpacity * fadeIn * 0.3;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + (p.isAccent ? 5 : 3), 0, Math.PI * 2);
        ctx.fill();

        // Main particle
        ctx.globalAlpha = globalAlpha * baseOpacity * fadeIn;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) frame++;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="page-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="page-bg__canvas" />
      <div className="page-bg__glow" />
      <div className="page-bg__orbs" />
    </div>
  );
};

export default PageBackground;
