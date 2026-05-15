import { useEffect, useState } from "react";

const TOTAL_SLIDES = 8;

const SlideDots = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = document.getElementById("page-scroll-container");
    if (!container) return;
    const update = () => {
      setActive(Math.round(container.scrollLeft / container.clientWidth));
    };
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, []);

  const goTo = (i: number) => {
    const container = document.getElementById("page-scroll-container");
    container?.scrollTo({ left: i * container.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2.5">
      {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? "h-3 w-3 bg-primary shadow-[0_0_8px_2px] shadow-primary/50"
              : "h-2 w-2 bg-muted-foreground/25 hover:bg-primary/50"
          }`}
        />
      ))}
    </div>
  );
};

export default SlideDots;
