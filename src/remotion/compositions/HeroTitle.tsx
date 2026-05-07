import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const ROLE_TEXT = "AI / ML Engineer & Developer";
const CHAR_FRAMES = 3;

const stats = [
  { end: 5, suffix: "+", label: "AI Projects" },
  { end: 15, suffix: "+", label: "Technologies" },
  { end: 2, suffix: "+", label: "Years in AI" },
  { end: 3, suffix: "+", label: "Apps Deployed" },
];

export const HeroTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Responsive breakpoints
  const isMobile = width < 768;
  const isShortMobile = isMobile && height < 700;
  const isTablet = width >= 768 && width < 1024;
  const nameFontSize = isMobile ? 40 : isTablet ? 56 : 72;
  const statsFontSize = isMobile ? 24 : isTablet ? 30 : 36;
  const statsGap = isMobile ? 16 : isTablet ? 32 : 48;
  const taglineFontSize = isMobile ? 16 : isTablet ? 18 : 20;
  const taglineMaxWidth = isMobile ? width * 0.85 : isTablet ? 450 : 550;

  // Role typewriter (starts at 0.5s)
  const roleStart = Math.round(fps * 0.5);
  const roleFrame = Math.max(0, frame - roleStart);
  const typedChars = Math.min(
    ROLE_TEXT.length,
    Math.floor(roleFrame / CHAR_FRAMES)
  );
  const typedText = ROLE_TEXT.slice(0, typedChars);
  const cursorOpacity = interpolate(
    frame % Math.round(fps * 0.6),
    [0, Math.round(fps * 0.3), Math.round(fps * 0.6)],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const showCursor = frame >= roleStart;

  // Name reveal (starts at 1.2s)
  const nameDelay = Math.round(fps * 1.2);
  const nameSpring = spring({
    frame: frame - nameDelay,
    fps,
    config: { damping: 200, stiffness: 80 },
  });
  const nameOpacity = interpolate(nameSpring, [0, 1], [0, 1]);
  const nameY = interpolate(nameSpring, [0, 1], [40, 0]);

  // "G'opirjonov" gold accent (starts at 1.6s)
  const lastNameDelay = Math.round(fps * 1.6);
  const lastNameSpring = spring({
    frame: frame - lastNameDelay,
    fps,
    config: { damping: 200, stiffness: 80 },
  });
  const lastNameOpacity = interpolate(lastNameSpring, [0, 1], [0, 1]);
  const lastNameY = interpolate(lastNameSpring, [0, 1], [30, 0]);

  // Tagline (starts at 2.2s)
  const taglineDelay = Math.round(fps * 2.2);
  const taglineSpring = spring({
    frame: frame - taglineDelay,
    fps,
    config: { damping: 200 },
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [25, 0]);

  // Stats (start at 3s)
  const statsDelay = Math.round(fps * 3);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: isMobile ? 64 : 0,
        bottom: isMobile ? 220 : 180,
        height: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Role typewriter */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "hsl(var(--gold))",
            height: 20,
          }}
        >
          <span>{typedText}</span>
          {showCursor && (
            <span style={{ opacity: cursorOpacity, marginLeft: 1 }}>▌</span>
          )}
        </div>

        {/* First name */}
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: nameFontSize,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "hsl(var(--foreground))",
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
          }}
        >
          Saloxiddin
        </div>

        {/* Last name (gold) */}
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: nameFontSize,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "hsl(var(--gold))",
            opacity: lastNameOpacity,
            transform: `translateY(${lastNameY}px)`,
          }}
        >
          G'opirjonov
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: taglineFontSize,
            color: "hsl(var(--muted-foreground))",
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            maxWidth: taglineMaxWidth,
            textAlign: "center",
            lineHeight: 1.6,
            marginTop: isShortMobile ? 8 : 16,
          }}
        >
          Building AI-powered applications and intelligent systems —
          from conversational chatbots to RAG-based knowledge engines.
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: statsGap,
            marginTop: isShortMobile ? 8 : isMobile ? 16 : 32,
          }}
        >
          {stats.map((stat, i) => {
            const itemDelay = statsDelay + i * Math.round(fps * 0.15);

            const entrance = spring({
              frame: frame - itemDelay,
              fps,
              config: { damping: 200, stiffness: 100 },
            });

            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const y = interpolate(entrance, [0, 1], [30, 0]);

            const countDuration = fps * 1.2;
            const countFrame = Math.max(0, frame - itemDelay);
            const countProgress = interpolate(
              countFrame,
              [0, countDuration],
              [0, 1],
              {
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
              }
            );
            const rawValue = Math.floor(countProgress * stat.end);
            const displayValue = rawValue;

            return (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  opacity,
                  transform: `translateY(${y}px)`,
                  width: isMobile ? "40%" : "auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: statsFontSize,
                    fontWeight: 700,
                    color: "hsl(var(--gold))",
                  }}
                >
                  {displayValue}
                  {stat.suffix}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: "hsl(25, 12%, 60%)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
