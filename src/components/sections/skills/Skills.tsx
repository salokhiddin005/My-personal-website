import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/common/SectionTitle";
import { motion } from "framer-motion";
import { variants } from "@/lib/animations";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";

const skillCategories = [
  {
    titleKey: "categories.aiLlms",
    skills: [
      { name: "OpenAI API", level: 92 },
      { name: "RAG Systems", level: 88 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Hugging Face", level: 82 },
      { name: "Embedding Models", level: 84 },
    ],
  },
  {
    titleKey: "categories.machineLearning",
    skills: [
      { name: "scikit-learn", level: 90 },
      { name: "PyTorch", level: 80 },
      { name: "TensorFlow", level: 72 },
      { name: "Text Classification", level: 88 },
      { name: "Feature Engineering", level: 82 },
    ],
  },
  {
    titleKey: "categories.deepLearning",
    skills: [
      { name: "YOLOv8", level: 92 },
      { name: "CNN Architectures", level: 84 },
      { name: "Transfer Learning", level: 86 },
      { name: "Transformer Models", level: 78 },
      { name: "Data Augmentation", level: 80 },
    ],
  },
  {
    titleKey: "categories.dataDatabases",
    skills: [
      { name: "Python / Pandas", level: 94 },
      { name: "PostgreSQL", level: 85 },
      { name: "pgvector", level: 80 },
      { name: "SQL", level: 88 },
      { name: "NumPy", level: 90 },
    ],
  },
  {
    titleKey: "categories.toolsDevops",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 78 },
      { name: "FastAPI", level: 88 },
      { name: "GitHub Actions", level: 75 },
      { name: "Jupyter Notebook", level: 92 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setFilled(true), delay); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
        <span className="font-mono text-[11px] text-primary">{filled ? `${level}%` : "0%"}</span>
      </div>
      <div className="h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: filled ? `${level}%` : "0%",
            transition: "width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
            boxShadow: filled ? "0 0 8px 1px hsl(var(--primary) / 0.5)" : "none",
          }}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ cat }: { cat: (typeof skillCategories)[number] }) => {
  const { t } = useTranslation("skills");
  return (
    <div className="group h-full border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
        <span className="mr-1.5 opacity-50">&gt;</span>
        {t(cat.titleKey)}
      </h3>
      <div className="space-y-3">
        {cat.skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 80} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const { t } = useTranslation("skills");
  const isNarrow = useMediaQuery(640);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline={t("overline")} title={t("title")} id="skills" />

        {isNarrow ? (
          <ScrollReveal>
            <Carousel opts={{ align: "start" }}>
              <CarouselContent className="-ml-3">
                {skillCategories.map((cat) => (
                  <CarouselItem key={cat.titleKey} className="basis-[85%] pl-3">
                    <SkillCard cat={cat} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
          </ScrollReveal>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={variants.staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skillCategories.map((cat) => (
              <motion.div key={cat.titleKey} variants={variants.fadeUp}>
                <SkillCard cat={cat} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
