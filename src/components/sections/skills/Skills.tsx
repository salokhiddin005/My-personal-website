import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/common/SectionTitle";
import { motion } from "framer-motion";
import { variants } from "@/lib/animations";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

const skillCategories = [
  {
    title: "AI & LLMs",
    items: ["OpenAI API", "RAG", "Prompt Engineering", "Hugging Face Transformers", "BERT Fine-Tuning", "Embedding Models"],
  },
  {
    title: "Machine Learning",
    items: ["scikit-learn", "PyTorch", "TensorFlow", "Text Classification", "Regression", "Clustering", "Feature Engineering"],
  },
  {
    title: "Web Development",
    items: ["React", "TypeScript", "JavaScript", "Node.js", "FastAPI", "REST API", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Data & Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "pgvector", "Pandas", "NumPy", "SQL"],
  },
  {
    title: "Tools & DevOps",
    items: ["Python", "Docker", "Git", "GitHub Actions", "VS Code", "Jupyter Notebook"],
  },
];

const SkillCard = ({ cat }: { cat: (typeof skillCategories)[number] }) => (
  <div className="group h-full border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
    <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
      <span className="mr-1.5 opacity-50">&gt;</span>
      {cat.title}
    </h3>
    <div className="flex flex-wrap gap-1.5">
      {cat.items.map((item) => (
        <span
          key={item}
          className="border border-border bg-surface px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground sm:px-2.5 sm:py-1.5 sm:text-xs"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const isNarrow = useMediaQuery(640);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline="Skills" title="Tech Stack & Tools" id="skills" />

        {isNarrow ? (
          <ScrollReveal>
            <Carousel opts={{ align: "start" }}>
              <CarouselContent className="-ml-3">
                {skillCategories.map((cat) => (
                  <CarouselItem key={cat.title} className="basis-[85%] pl-3">
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
              <motion.div key={cat.title} variants={variants.fadeUp}>
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
