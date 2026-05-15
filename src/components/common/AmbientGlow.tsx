import { useEffect, useRef } from "react";

const AmbientGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-[2] hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: "580px",
        height: "580px",
        background: "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
        filter: "blur(48px)",
        transition: "left 0.45s ease-out, top 0.45s ease-out",
      }}
    />
  );
};

export default AmbientGlow;
