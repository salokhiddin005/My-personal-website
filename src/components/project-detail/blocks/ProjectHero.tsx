import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectHeroProps {
  title: string;
  oneLiner: string;
  categories: string[];
  image?: string;
  role?: string;
  team?: string;
  scale?: string;
}

const ProjectHero = ({ title, oneLiner, categories, image, role, team, scale }: ProjectHeroProps) => {
  const navigate = useNavigate();

  const goToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const meta = [
    role && { label: "Role", value: role },
    team && { label: "Team", value: team },
    scale && { label: "Scale", value: scale },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section className="relative flex min-h-[50vh] items-end overflow-hidden sm:min-h-[60vh]">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 pt-24 sm:px-6 sm:pb-12 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back link */}
          <a
            href="/#projects"
            onClick={goToProjects}
            className="mb-6 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </a>

          {/* Categories */}
          <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
            {categories.map((c) => (
              <span
                key={c}
                className="inline-block border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-primary backdrop-blur-md sm:px-3"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl font-bold leading-tight italic text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {/* One-liner */}
          <p className="mt-3 max-w-3xl font-body text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-xl">
            {oneLiner}
          </p>

          {/* Meta badges */}
          {meta.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="border border-border bg-card/50 px-3 py-2 backdrop-blur-sm sm:px-4"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                    {m.label}
                  </span>
                  <span className="font-body text-sm font-semibold text-foreground">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHero;
