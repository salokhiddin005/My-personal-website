import ScrollReveal from "@/components/common/ScrollReveal";
import { ExternalLink, Github, PlayCircle } from "lucide-react";

interface ProjectLinksProps {
  links: { label: string; url: string }[];
}

const ProjectLinks = ({ links }: ProjectLinksProps) => {
  if (links.length === 0) return null;

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Links
          </h3>
          <div className="gold-divider mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {links.map((link, i) => {
              const isGithub = link.url.includes("github.com");
              const isDemo = link.label.toLowerCase().includes("demo");

              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-primary/25 bg-primary/10 px-6 py-3 font-body text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {isGithub ? <Github className="h-4 w-4" /> : isDemo ? <PlayCircle className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  {link.label}
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectLinks;
