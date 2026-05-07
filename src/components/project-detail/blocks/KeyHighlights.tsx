import ScrollReveal from "@/components/common/ScrollReveal";
import type { ProjectHighlight } from "@/components/sections/projects/projects.data";

interface KeyHighlightsProps {
  highlights: ProjectHighlight[];
}

const KeyHighlights = ({ highlights }: KeyHighlightsProps) => (
  <section className="px-4 py-12 sm:px-6 md:py-24">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Key Highlights
        </h3>
        <div className="gold-divider mb-8 sm:mb-12" />
      </ScrollReveal>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {highlights.map((h, i) => (
          <ScrollReveal key={h.title} delay={i * 0.1}>
            <div className="h-full border border-border bg-card/50 p-5 backdrop-blur-sm transition-colors hover:border-primary/30 sm:p-8">
              <h4 className="mb-2 font-display text-base font-bold italic text-foreground sm:mb-3 sm:text-lg">
                {h.title}
              </h4>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {h.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default KeyHighlights;
