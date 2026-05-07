import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface SectionTitleProps {
  overline: string;
  title: string;
  id?: string;
}

const SectionTitle = ({ overline, title, id }: SectionTitleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [20, -20]
  );

  return (
    <div ref={ref} id={id} className="mb-12 scroll-mt-24 md:mb-16">
      <ScrollReveal>
        <motion.div style={{ y }}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {overline}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <div className="gold-divider mt-4" />
        </motion.div>
      </ScrollReveal>
    </div>
  );
};

export default SectionTitle;
