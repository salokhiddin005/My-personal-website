import { useState } from "react";
import ScrollReveal from "@/components/common/ScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";

export interface MetricChart {
  src: string;
  title: string;
  description: string;
}

interface EvaluationMetricsProps {
  charts: MetricChart[];
}

const EvaluationMetrics = ({ charts }: EvaluationMetricsProps) => {
  const [selectedChart, setSelectedChart] = useState<MetricChart | null>(null);

  if (charts.length === 0) return null;

  return (
    <>
      <section className="px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Model Evaluation
            </h3>
            <div className="gold-divider mb-8 sm:mb-12" />
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {charts.map((chart) => (
                <button
                  key={chart.title}
                  onClick={() => setSelectedChart(chart)}
                  className="group flex h-full w-full cursor-zoom-in flex-col overflow-hidden border border-border bg-card/50 transition-all hover:border-primary/30"
                >
                  {/* Chart image */}
                  <div className="relative flex-1 bg-white p-2 sm:p-3">
                    <img
                      src={chart.src}
                      alt={chart.title}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full border border-primary/20 bg-background/80 p-3 backdrop-blur-sm">
                        <Maximize2 className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="p-3 text-left sm:p-4">
                    <h4 className="font-display text-sm font-bold text-foreground sm:text-base">
                      {chart.title}
                    </h4>
                    <p className="mt-1 font-body text-xs text-muted-foreground sm:text-sm">
                      {chart.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedChart} onOpenChange={() => setSelectedChart(null)}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-auto border-border bg-white p-3 sm:p-6">
          <DialogTitle className="sr-only">
            {selectedChart?.title}
          </DialogTitle>
          {selectedChart && (
            <div>
              <img
                src={selectedChart.src}
                alt={selectedChart.title}
                className="w-full object-contain"
              />
              <div className="mt-3 border-t border-border pt-3">
                <h4 className="font-display text-base font-bold text-slate-900">
                  {selectedChart.title}
                </h4>
                <p className="mt-1 font-body text-sm text-slate-600">
                  {selectedChart.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EvaluationMetrics;
