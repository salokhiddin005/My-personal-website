import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Tag from "@/components/common/Tag";
import { experienceMeta } from "./experience.data";

interface ExperienceItem {
  company?: string;
  role: string;
  period?: string;
  location?: string;
  achievements: string[];
}

const Experience = () => {
  const { t } = useTranslation("experience");
  const items = t("items", { returnObjects: true }) as ExperienceItem[];
  const experiences = items.map((item, i) => ({ ...item, ...experienceMeta[i] }));

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle overline={t("overline")} title={t("title")} id="experience" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent md:left-1/2 md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal
                key={exp.company ?? i}
                variant={i % 2 === 0 ? "slideFromLeft" : "slideFromRight"}
                delay={i * 0.1}
              >
                <div
                  className={`relative flex flex-col md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2 md:block" />

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div
                    className={`w-full rounded-lg border border-border border-l-2 border-l-primary/30 md:border-l md:border-l-border bg-card p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:w-1/2 ${
                      i % 2 === 0 ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    {exp.company && (
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base sm:text-lg font-bold text-foreground">{exp.company}</h3>
                      </div>
                    )}
                    <p className="font-body text-sm font-semibold text-primary">{exp.role}</p>
                    {(exp.period || exp.location) && (
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {[exp.period, exp.location].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {exp.email && (
                      <a
                        href={`mailto:${exp.email}`}
                        className="mt-1 inline-block font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {exp.email}
                      </a>
                    )}

                    <ul className="mt-4 space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex gap-2 font-body text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <Tag key={t} variant="gold">{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
