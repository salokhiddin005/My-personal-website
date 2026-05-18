import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDE_NAMES = ["HOME", "ABOUT", "EXPERIENCE", "SKILLS", "PROJECTS", "BLOG", "EDUCATION", "CONTACT"];

const SlideAnnouncement = () => {
  const [name, setName] = useState<string | null>(null);
  const prevIdx = useRef(-1);

  useEffect(() => {
    const container = document.getElementById("page-scroll-container");
    if (!container) return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
      let idx = 0;
      let minDist = Infinity;
      slides.forEach((el, i) => {
        const dist = Math.abs(el.offsetTop - container.scrollTop);
        if (dist < minDist) { minDist = dist; idx = i; }
      });
      if (idx !== prevIdx.current) {
        prevIdx.current = idx;
        clearTimeout(timeout);
        setName(SLIDE_NAMES[idx] ?? null);
        timeout = setTimeout(() => setName(null), 900);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {name && (
        <motion.div
          key={name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
        >
          <span className="font-display font-black uppercase select-none text-foreground/[0.04] dark:text-foreground/[0.05]"
            style={{ fontSize: "clamp(4rem, 15vw, 14rem)", lineHeight: 1 }}>
            {name}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideAnnouncement;
