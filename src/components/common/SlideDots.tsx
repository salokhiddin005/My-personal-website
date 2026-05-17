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

  const dots = Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
    <button
      key={i}
      onClick={() => goTo(i)}
      aria-label={`Go to slide ${i + 1}`}
      className={`rounded-full transition-all duration-300 ${
        i === active
          ? "bg-primary shadow-[0_0_8px_2px] shadow-primary/50 lg:h-3 lg:w-3 h-2.5 w-2.5"
          : "bg-muted-foreground/25 hover:bg-primary/50 lg:h-2 lg:w-2 h-2 w-2"
      }`}
    />
  ));

  return (
    <>
      {/* Desktop: vertical on the right */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2.5">
        {dots}
      </div>

      {/* Mobile: horizontal at the bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex lg:hidden flex-row gap-2.5">
        {dots}
      </div>
    </>
  );
};

export default SlideDots;
