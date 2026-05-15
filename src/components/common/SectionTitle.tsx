import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  overline: string;
  title: string;
  id?: string;
}

const useTypewriter = (target: string) => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      setText("");
      setDone(false);
      let i = 0;
      const tick = () => {
        i++;
        setText(target.slice(0, i));
        if (i < target.length) { timer.current = setTimeout(tick, 38); }
        else setDone(true);
      };
      timer.current = setTimeout(tick, 120);
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) run(); },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (timer.current) clearTimeout(timer.current); };
  }, [target]);

  return { text, done, ref };
};

const SectionTitle = ({ overline, title, id }: SectionTitleProps) => {
  const { text, done, ref } = useTypewriter(title);

  return (
    <div id={id} className="mb-12 scroll-mt-20 md:mb-16">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
        <span className="mr-2 opacity-50">//</span>
        {overline}
      </p>
      <h2 ref={ref} className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
        {text}
        {!done && <span className="animate-blink text-primary">|</span>}
      </h2>
      <div className="mt-3 h-px w-12 bg-primary/50" />
    </div>
  );
};

export default SectionTitle;
