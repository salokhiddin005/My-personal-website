import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import Tag from "@/components/common/Tag";

const Education = () => {
  const { t } = useTranslation("education");

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline={t("overline")} title={t("title")} id="education" />

        <div className="grid gap-8 md:grid-cols-2">
          {/* University */}
          <ScrollReveal>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">{t("university.name")}</h3>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {t("university.period")}
              </p>
            </div>
          </ScrollReveal>

          {/* Capstone */}
          <ScrollReveal delay={0.15}>
            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
                {t("capstone.label")}
              </p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                {t("capstone.title")}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                {t("capstone.description")}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Computer Vision", "TypeScript", "YOLOv8", "Vercel"].map((tag) => (
                  <Tag key={tag} variant="gold">{tag}</Tag>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Education;
