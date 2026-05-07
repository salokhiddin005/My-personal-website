import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/components/sections/projects/projects.data";

interface ProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

const ProjectNavigation = ({ prev, next }: ProjectNavigationProps) => {
  const navigate = useNavigate();

  const goToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
  <section className="border-t border-border px-4 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
      {/* Previous */}
      <div className="flex-1">
        {prev && (
          <Link
            to={`/projects/${prev.id}`}
            className="group flex h-full flex-col items-start gap-2 border border-border p-4 transition-colors hover:border-primary/30 sm:p-6"
          >
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary">
              <ArrowLeft className="h-3 w-3" />
              Previous
            </span>
            <span className="font-display text-sm font-bold italic text-foreground line-clamp-1 sm:text-base">
              {prev.title}
            </span>
          </Link>
        )}
      </div>

      {/* Back to all */}
      <div className="flex items-center justify-center">
        <a
          href="/#projects"
          onClick={goToProjects}
          className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          All Projects
        </a>
      </div>

      {/* Next */}
      <div className="flex-1">
        {next && (
          <Link
            to={`/projects/${next.id}`}
            className="group flex h-full flex-col items-end gap-2 border border-border p-4 text-right transition-colors hover:border-primary/30 sm:p-6"
          >
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary">
              Next
              <ArrowRight className="h-3 w-3" />
            </span>
            <span className="font-display text-sm font-bold italic text-foreground line-clamp-1 sm:text-base">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  </section>
  );
};

export default ProjectNavigation;
