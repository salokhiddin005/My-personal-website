import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Code, Play, Image, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";

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

const displayNames: Record<string, string> = {
  "Bizness-Hisobchi": "Cashflow Telegram Bot",
};

// Direct image URLs for repos without video demos
const demoImages: Record<string, string> = {
  "House-price-prediction":    "https://raw.githubusercontent.com/salokhiddin005/House-price-prediction/main/demo_output.png",
  "employment-classification": "https://raw.githubusercontent.com/salokhiddin005/employment-classification/main/demo_dashboard.png",
};

// Values are YouTube video IDs (the part after ?v= in the YouTube URL)
const demoVideos: Record<string, string> = {
  "PPE-Detection":        "vCaNWC7eRH8",
  "Fight_detection":      "3d-h8dMxd-g",
  "nail-size-detection":  "JoRsSS1znkw",
  "Smart-Gym-Monitoring": "Bom7KjaYd4c",
  "IV-drip-drop-counter": "WnNCydph5-k",
  "Bizness-Hisobchi":     "Ael89xyljLo",
  "Theater-CV":           "67LpXc9h3U8",
  "Catching_Game_":       "mmdZWo2aztE",
};

const projectLinks: Record<string, { label: string; url: string }> = {
  "Bizness-Hisobchi":    { label: "@business_ledger_bot", url: "https://t.me/business_ledger_bot" },
  "nail-size-detection": { label: "Live Demo ↗", url: "https://nail-size-detection-y5ms.vercel.app" },
};

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

const VideoModal = ({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl border border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {displayNames[title] ?? title.replace(/-|_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const ImageModal = ({ imageUrl, title, onClose }: { imageUrl: string; title: string; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl border border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {displayNames[title] ?? title.replace(/-|_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="bg-black flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[75vh] w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const RepoCard = ({
  repo,
  onWatchDemo,
  onViewPreview,
}: {
  repo: GitHubRepo;
  onWatchDemo?: () => void;
  onViewPreview?: () => void;
}) => {
  const [imgError, setImgError] = useState(false);
  const langColor = repo.language ? (languageColors[repo.language] ?? "#6366f1") : "#6366f1";
  const hasVideo = !!demoVideos[repo.name];
  const hasImage = !!demoImages[repo.name];
  const hasDemo = hasVideo || hasImage;

  const thumbnail = hasVideo
    ? `https://img.youtube.com/vi/${demoVideos[repo.name]}/hqdefault.jpg`
    : hasImage
    ? demoImages[repo.name]
    : null;

  return (
    <div className="group flex h-full w-full flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* Image Header */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video w-full overflow-hidden bg-muted/30 block"
      >
        {thumbnail && !imgError ? (
          <img
            src={thumbnail}
            alt={repo.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-transparent">
            <Code className="h-10 w-10 text-primary/40" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
          <div className="translate-y-4 flex items-center gap-2 border border-primary/20 bg-background/80 px-5 py-3 transition-transform duration-500 group-hover:translate-y-0">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">View on GitHub</span>
            <ExternalLink className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Language Tag */}
        {repo.language && (
          <div className="absolute left-4 top-4 z-10">
            <span
              className="inline-block border px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md"
              style={{ borderColor: `${langColor}40`, color: langColor, backgroundColor: `${langColor}18` }}
            >
              {repo.language}
            </span>
          </div>
        )}
      </a>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold leading-tight italic text-foreground line-clamp-2">
          {displayNames[repo.name] ?? repo.name.replace(/-|_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h3>

        <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {repo.description ?? "No description provided."}
        </p>

        {projectLinks[repo.name] && (
          <a
            href={projectLinks[repo.name].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 mb-4 inline-block font-mono text-xs text-primary hover:underline"
          >
            {projectLinks[repo.name].label}
          </a>
        )}

        <div className="mt-auto border-t border-border pt-6 flex flex-col gap-4">
          {hasDemo && (
            <button
              onClick={hasVideo ? onWatchDemo : onViewPreview}
              className="flex items-center justify-center gap-2 border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {hasVideo ? <Play className="h-3 w-3" /> : <Image className="h-3 w-3" />}
              {hasVideo ? "Watch Demo" : "View Preview"}
            </button>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {repo.topics.slice(0, 2).map((topic) => (
                <span key={topic} className="font-mono text-[10px] uppercase tracking-tighter text-muted-foreground">
                  #{topic}
                </span>
              ))}
            </div>
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
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [activeImage, setActiveImage] = useState<{ imageUrl: string; title: string } | null>(null);

  const { data: repos = [], isLoading, isError } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error("Failed to fetch repos");
      const data: GitHubRepo[] = await res.json();
      const excluded = new Set(["Catching_game", "Face-recognition-project", "My-personal-website", "Attendance-tracking-project"]);
      return data.filter((r) => !r.fork && !excluded.has(r.name));
    },
    staleTime: 1000 * 60 * 5,
  });

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]];
  const filtered = filter === "All" ? repos : repos.filter((r) => r.language === filter);


  const getHandlers = (repo: GitHubRepo) => ({
    onWatchDemo: demoVideos[repo.name]
      ? () => setActiveVideo({ videoId: demoVideos[repo.name], title: repo.name })
      : undefined,
    onViewPreview: demoImages[repo.name]
      ? () => setActiveImage({ imageUrl: demoImages[repo.name], title: repo.name })
      : undefined,
  });

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
              <div key={i} className="h-72 animate-pulse border border-border bg-muted/30" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center font-mono text-sm text-muted-foreground">
            Could not load repositories. Please try again later.
          </p>
        )}

        {/* Cards grid */}
        {!isLoading && !isError && (
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
                  <RepoCard repo={repo} {...getHandlers(repo)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {activeVideo && (
        <VideoModal videoId={activeVideo.videoId} title={activeVideo.title} onClose={() => setActiveVideo(null)} />
      )}
      {activeImage && (
        <ImageModal imageUrl={activeImage.imageUrl} title={activeImage.title} onClose={() => setActiveImage(null)} />
      )}
    </section>
  );
};

export default Projects;
