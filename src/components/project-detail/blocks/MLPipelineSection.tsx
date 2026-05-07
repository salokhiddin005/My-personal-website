import ScrollReveal from "@/components/common/ScrollReveal";

interface MLPipelineProps {
  title: string;
  description: string;
  features?: { name: string; description: string }[];
  evaluationMetrics?: { name: string; value: string; description: string }[];
  steps?: { title: string; description: string }[];
}

const MLPipelineSection = ({ title, description, features, evaluationMetrics, steps }: MLPipelineProps) => (
  <section className="px-6 py-16 md:py-24">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <ScrollReveal>
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          ML Pipeline
        </h3>
        <div className="gold-divider mb-4" />
        <h4 className="font-display text-xl font-bold italic text-foreground sm:text-2xl">
          {title}
        </h4>
        <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      </ScrollReveal>

      {/* Pipeline Steps */}
      {steps && steps.length > 0 && (
        <div className="mt-12">
          <ScrollReveal>
            <h5 className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Pipeline Stages
            </h5>
          </ScrollReveal>
          <div className="relative space-y-0">
            {/* Vertical connector line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border sm:left-[19px]" />

            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <div className="relative flex gap-4 py-4 sm:gap-6">
                  {/* Step number circle */}
                  <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center border border-primary/30 bg-card font-mono text-xs font-bold text-primary sm:h-10 sm:w-10 sm:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h6 className="font-display text-base font-bold text-foreground sm:text-lg">
                      {step.title}
                    </h6>
                    <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Clustering Features */}
      {features && features.length > 0 && (
        <div className="mt-12">
          <ScrollReveal>
            <h5 className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Clustering Features
            </h5>
          </ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 0.05}>
                <div className="border border-border bg-card/50 p-4 transition-colors hover:border-primary/30">
                  <code className="font-mono text-xs font-bold text-primary">{f.name}</code>
                  <p className="mt-1 font-body text-xs text-muted-foreground">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation Metrics */}
      {evaluationMetrics && evaluationMetrics.length > 0 && (
        <div className="mt-12">
          <ScrollReveal>
            <h5 className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Evaluation Metrics
            </h5>
          </ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationMetrics.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.05}>
                <div className="border border-border bg-card/50 p-5 transition-colors hover:border-primary/30">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-body text-sm font-medium text-foreground">{m.name}</span>
                    <span className="font-mono text-lg font-bold text-primary">{m.value}</span>
                  </div>
                  <p className="mt-2 font-body text-xs text-muted-foreground">{m.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default MLPipelineSection;
