import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

const GITHUB_USERNAME = "salokhiddin005";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
};

const RepoCard = ({ repo }: { repo: GitHubRepo }) => {
  const langColor = repo.language
    ? (languageColors[repo.language] ?? "#6366f1")
    : "#6366f1";

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col overflow-hidden border border-border bg-card text-left transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Image Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-transparent">
          <Code className="h-10 w-10 text-primary/40" />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
          <div className="translate-y-4 flex items-center gap-2 border border-primary/20 bg-background/80 px-5 py-3 transition-transform duration-500 group-hover:translate-y-0">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">
              View on GitHub
            </span>
            <ExternalLink className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Language Tag */}
        {repo.language && (
          <div className="absolute left-4 top-4 z-10">
            <span
              className="inline-block border px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md"
              style={{
                borderColor: `${langColor}40`,
                color: langColor,
                backgroundColor: `${langColor}18`,
              }}
            >
              {repo.language}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold leading-tight italic text-foreground transition-colors group-hover:text-primary line-clamp-2">
          {repo.name.replace(/-/g, " ")}
        </h3>

        <p className="mt-4 mb-6 flex-1 font-body text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {repo.description ?? "No description provided."}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {repo.topics.slice(0, 2).map((topic) => (
              <span
                key={topic}
                className="font-mono text-[10px] uppercase tracking-tighter text-muted-foreground"
              >
                #{topic}
              </span>
            ))}
          </div>

          {/* Stars & Forks */}
          <div className="flex items-center gap-3">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                <Star className="h-3 w-3" />
                {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <GitFork className="h-3 w-3" />
                {repo.forks_count}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const isNarrow = useMediaQuery(640);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const {
    data: repos = [],
    isLoading,
    isError,
  } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: async () => {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
      );
      if (!res.ok) throw new Error("Failed to fetch repos");
      const data: GitHubRepo[] = await res.json();
      return data.filter((r) => !r.fork);
    },
    staleTime: 1000 * 60 * 5,
  });

  const languages = [
    "All",
    ...Array.from(
      new Set(repos.map((r) => r.language).filter(Boolean))
    ) as string[],
  ];

  const filtered =
    filter === "All" ? repos : repos.filter((r) => r.language === filter);

  useEffect(() => {
    if (carouselApi) carouselApi.scrollTo(0);
  }, [filter, carouselApi]);

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle overline="Projects" title="What I've Built" />

        {/* Filter tabs */}
        {!isLoading && !isError && (
          <ScrollReveal className="mb-16">
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilter(lang)}
                  className={`px-3 py-2 sm:px-5 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
                    filter === lang
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse border border-border bg-muted/30"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center font-mono text-sm text-muted-foreground">
            Could not load repositories. Please try again later.
          </p>
        )}

        {/* Cards */}
        {!isLoading && !isError && (
          isNarrow ? (
            <Carousel setApi={setCarouselApi}>
              <CarouselContent>
                {filtered.map((repo) => (
                  <CarouselItem key={repo.id}>
                    <RepoCard repo={repo} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <RepoCard repo={repo} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;
