import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { projects, projectCategories, type Project } from "./projects.data";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/carousel";

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/projects/${project.id}`}
    className="group flex h-full w-full flex-col overflow-hidden border border-border bg-card text-left transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
  >
    {/* Image Header */}
    <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-transparent">
          <Code className="h-10 w-10 text-primary/40" />
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
        <div className="translate-y-4 flex items-center gap-2 border border-primary/20 bg-background/80 px-5 py-3 transition-transform duration-500 group-hover:translate-y-0">
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            View Case Study
          </span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Floating Tag */}
      <div className="absolute left-4 top-4 z-10">
        <span className="inline-block border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur-md">
          {project.category[0]}
        </span>
      </div>
    </div>

    {/* Content Body */}
    <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
      <h3 className="font-display text-2xl font-bold leading-tight italic text-foreground transition-colors group-hover:text-primary line-clamp-2">
        {project.title}
      </h3>

      <p className="mt-4 mb-6 flex-1 font-body text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {project.oneLiner}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 2).map((t) => (
            <span key={t} className="font-mono text-[10px] uppercase tracking-tighter text-muted-foreground">
              #{t}
            </span>
          ))}
        </div>

        {/* Primary Stat */}
        {project.stats[0] && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
            {project.stats[0]}
          </span>
        )}
      </div>
    </div>
  </Link>
);

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const isNarrow = useMediaQuery(640);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  }, [filter, carouselApi]);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline="Projects" title="What I've Built" />

        {/* Filter tabs */}
        <ScrollReveal className="mb-16">
          <div className="flex flex-wrap gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-2 sm:px-5 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
                  filter === cat
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        {isNarrow ? (
          <Carousel setApi={setCarouselApi}>
            <CarouselContent>
              {filtered.map((project) => (
                <CarouselItem key={project.id}>
                  <ProjectCard project={project} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
