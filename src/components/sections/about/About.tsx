import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Counter from "@/components/common/Counter";

const About = () => {
  const { t } = useTranslation("about");

  const quickFacts = [
    t("quickFacts.location", { returnObjects: true }) as { label: string; value: string },
    t("quickFacts.education", { returnObjects: true }) as { label: string; value: string },
    t("quickFacts.focus", { returnObjects: true }) as { label: string; value: string },
    t("quickFacts.languages", { returnObjects: true }) as { label: string; value: string },
  ];

  const stats = [
    { end: 11, suffix: "+", label: t("stats.aiProjects") },
    { end: 5, suffix: "+", label: t("stats.cvSystems") },
    { end: 3, suffix: "", label: t("stats.industries") },
    { end: 2, suffix: "", label: t("stats.languagesSpoken") },
  ];

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline={t("overline")} title={t("title")} id="about" />

        <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-6">
          {/* Profile photo */}
          <ScrollReveal className="flex justify-center md:col-span-1 md:justify-start md:pt-2">
            <div className="relative">
              <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-primary/40 ring-4 ring-primary/10">
                <img
                  src="/profile.jpeg"
                  alt="Saloxiddin G'opirjonov"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
            </div>
          </ScrollReveal>

          {/* Prose */}
          <div className="space-y-5 md:col-span-3">
            <ScrollReveal>
              <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
                {t("paragraphs.p1")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
                {t("paragraphs.p2")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
                {t("paragraphs.p3")}
              </p>
            </ScrollReveal>
          </div>

          {/* Quick Facts Card */}
          <ScrollReveal className="md:col-span-2" delay={0.2}>
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6 transition-colors hover:border-primary/30">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">{t("quickFacts.title")}</h3>
              <div className="space-y-4">
                {quickFacts.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">{item.label}</p>
                    <p className="mt-1 font-body text-sm text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Animated stats */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-border pt-10">
            {stats.map(({ end, suffix, label }) => (
              <div key={label} className="text-center">
                <Counter end={end} suffix={suffix} />
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
