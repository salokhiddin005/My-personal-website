import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("page-scroll-container");
    if (!container) return;

    const update = () => {
      const max = container.scrollWidth - container.clientWidth;
      if (max <= 0) return;
      setProgress(container.scrollLeft / max);
    };

    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/20">
      <div
        className="h-full bg-primary shadow-[0_0_10px_1px] shadow-primary/60 transition-all duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
