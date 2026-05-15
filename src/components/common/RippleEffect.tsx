import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const RippleEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let counter = 0;
    const handleClick = (e: MouseEvent) => {
      const id = counter++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none fixed z-[99990] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 animate-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
};

export default RippleEffect;
