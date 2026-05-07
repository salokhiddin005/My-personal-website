import ScrollReveal from "@/components/common/ScrollReveal";
import type { ProjectMetric } from "@/components/sections/projects/projects.data";

interface MetricsGridProps {
  metrics: ProjectMetric[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => (
  <section className="px-4 py-12 sm:px-6 md:py-24">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Results & Impact
        </h3>
        <div className="gold-divider mb-8 sm:mb-12" />
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center justify-center border border-border bg-card/50 p-4 text-center backdrop-blur-sm transition-colors hover:border-primary/30 sm:p-8">
              <span className="block font-display text-2xl font-bold text-primary sm:text-4xl">
                {metric.value}
              </span>
              <span className="mt-2 block font-body text-xs font-semibold text-foreground sm:text-sm">
                {metric.label}
              </span>
              {metric.context && (
                <span className="mt-1 hidden text-xs text-muted-foreground sm:block">
                  {metric.context}
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default MetricsGrid;
