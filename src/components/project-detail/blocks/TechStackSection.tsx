import ScrollReveal from "@/components/common/ScrollReveal";
import Tag from "@/components/common/Tag";

interface TechStackSectionProps {
  tech: string[];
}

const TechStackSection = ({ tech }: TechStackSectionProps) => (
  <section className="px-4 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Tech Stack
        </h3>
        <div className="gold-divider mb-6 sm:mb-8" />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <Tag key={t} variant="gold">{t}</Tag>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TechStackSection;
