import ScrollReveal from "@/components/common/ScrollReveal";

interface ProblemSolutionProps {
  problem: string;
  solution: string;
}

const ProblemSolution = ({ problem, solution }: ProblemSolutionProps) => (
  <section className="px-4 py-12 sm:px-6 md:py-24">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <ScrollReveal>
          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              The Problem
            </h3>
            <div className="gold-divider mb-4 sm:mb-6" />
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {problem}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              The Solution
            </h3>
            <div className="gold-divider mb-4 sm:mb-6" />
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {solution}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default ProblemSolution;
