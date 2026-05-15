import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionTitleProps {
  overline: string;
  title: string;
  id?: string;
}

const SectionTitle = ({ overline, title, id }: SectionTitleProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); else setVisible(false); },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} className="mb-12 scroll-mt-20 md:mb-16">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
        <span className="mr-2 opacity-50">//</span>
        {overline}
      </p>
      <h2 ref={ref} className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl overflow-hidden">
        <span className="inline-flex flex-wrap gap-x-[0.25em]">
          {title.split(" ").map((word, wi) => (
            <span key={wi} className="overflow-hidden inline-block">
              <AnimatePresence>
                {visible && (
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: wi * 0.1,
                    }}
                  >
                    {word}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          ))}
        </span>
      </h2>
      <div className="mt-3 h-px w-12 bg-primary/50" />
    </div>
  );
};

export default SectionTitle;
