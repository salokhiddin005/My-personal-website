import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  overline: string;
  title: string;
  id?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*<>";

const useScramble = (target: string) => {
  const [text, setText] = useState(target);
  const ref = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const runScramble = () => {
      let iter = 0;
      const total = target.replace(/ /g, "").length * 4;
      const tick = () => {
        setText(
          target.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < iter / 4) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        iter++;
        if (iter <= total) { timer.current = setTimeout(tick, 28); }
        else setText(target);
      };
      tick();
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runScramble(); },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (timer.current) clearTimeout(timer.current); };
  }, [target]);

  return { text, ref };
};

const SectionTitle = ({ overline, title, id }: SectionTitleProps) => {
  const { text, ref } = useScramble(title);

  return (
    <div id={id} className="mb-12 scroll-mt-20 md:mb-16">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
        <span className="mr-2 opacity-50">//</span>
        {overline}
      </p>
      <h2 ref={ref} className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
        {text}
      </h2>
      <div className="mt-3 h-px w-12 bg-primary/50" />
    </div>
  );
};

export default SectionTitle;
