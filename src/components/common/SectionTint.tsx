import { useEffect, useState } from "react";

const TINTS = [
  "transparent",
  "hsl(260 60% 50% / 0.025)",
  "hsl(240 60% 50% / 0.025)",
  "hsl(193 100% 50% / 0.03)",
  "hsl(210 80% 50% / 0.025)",
  "hsl(280 60% 55% / 0.025)",
  "hsl(170 80% 40% / 0.025)",
  "hsl(150 60% 45% / 0.025)",
];

const SectionTint = () => {
  const [tint, setTint] = useState("transparent");

  useEffect(() => {
    const container = document.getElementById("page-scroll-container");
    if (!container) return;
    const update = () => {
      const idx = Math.round(container.scrollLeft / container.clientWidth);
      setTint(TINTS[idx] ?? "transparent");
    };
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[3]"
      style={{ background: tint, transition: "background 0.8s ease" }}
    />
  );
};

export default SectionTint;
