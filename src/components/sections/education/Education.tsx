import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Tag from "@/components/common/Tag";

const Education = () => (
  <section className="px-6 py-16 md:py-24">
    <div className="mx-auto max-w-6xl">
      <SectionTitle overline="Education" title="Academic Background" id="education" />

      <div className="grid gap-8 md:grid-cols-2">
        {/* University */}
        <ScrollReveal>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">Tashkent University of Information Technologies</h3>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              2023 – Present · Tashkent, Uzbekistan
            </p>
          </div>
        </ScrollReveal>

        {/* Capstone */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-lg border border-primary/20 bg-card p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
              Capstone Project
            </p>
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
              Nail Size Detection
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              Computer vision system that detects and measures nail sizes in real time —
              combining object detection with precise dimensional analysis for industrial
              quality control applications.
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              2024 – Present · Capstone Project
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Computer Vision", "TypeScript", "YOLOv8", "Vercel"].map((t) => (
                <Tag key={t} variant="gold">{t}</Tag>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default Education;
