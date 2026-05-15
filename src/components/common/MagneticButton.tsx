import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticButton = ({ children, strength = 0.35, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: dx * strength, y: dy * strength });
    setActive(true);
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: active ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
