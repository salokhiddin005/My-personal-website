import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-none-desktop");
    };
  }, []);

  return (
    <>
      {/* Main dot — snaps instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[99998] hidden md:block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ transition: "left 0.04s linear, top 0.04s linear" }}
      />
      {/* Trailing ring — lags behind for the glow trail effect */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[99997] hidden md:block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 shadow-[0_0_12px_2px] shadow-primary/20"
        style={{ transition: "left 0.18s ease-out, top 0.18s ease-out" }}
      />
    </>
  );
};

export default CustomCursor;
