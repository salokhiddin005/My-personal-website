import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, type TFunction } from "react-i18next";
import { Star, GitFork, ExternalLink, Code, Play, Image, X } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

// Direct image URLs for repos without video demos
const demoImages: Record<string, string> = {
  "House-price-prediction":    "https://raw.githubusercontent.com/salokhiddin005/House-price-prediction/main/demo_output.png",
  "employment-classification": "https://raw.githubusercontent.com/salokhiddin005/employment-classification/main/demo_dashboard.png",
};

// Values are YouTube video IDs (the part after ?v= in the YouTube URL)
const demoVideos: Record<string, string> = {
  "Fight_detection":      "3d-h8dMxd-g",
  "nail-size-detection":  "JoRsSS1znkw",
  "Smart-Gym-Monitoring": "Bom7KjaYd4c",
  "IV-drip-drop-counter": "WnNCydph5-k",
  "Bizness-Hisobchi":     "Ael89xyljLo",
  "Theater-CV":           "67LpXc9h3U8",
  "Password-Manager":     "ZefUlDRZEV0",
  "Catching_Game_":       "mmdZWo2aztE",
};

const projectLinks: Record<string, { label?: string; labelKey?: string; url: string }> = {
  "Bizness-Hisobchi":    { label: "@business_ledger_bot", url: "https://t.me/business_ledger_bot" },
  "nail-size-detection": { labelKey: "links.liveDemo", url: "https://nail-size-detection-y5ms.vercel.app" },
  "Text-To-Speech":      { labelKey: "links.liveDemoHf", url: "https://huggingface.co/spaces/saloxiddin005/tts-demo" },
  "Password-Manager":    { labelKey: "links.liveApp", url: "https://password-manager-puce-rho.vercel.app/" },
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

const getDisplayName = (t: TFunction<"projects">, name: string) =>
  t(`displayNames.${name}`, { defaultValue: name.replace(/-|_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) });

const VideoModal = ({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) => {
  const { t } = useTranslation("projects");
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
            {getDisplayName(t, title)}
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
  const { t } = useTranslation("projects");
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
            {getDisplayName(t, title)}
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
  const { t } = useTranslation("projects");
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(900px) rotateX(${-x * 14}deg) rotateY(${y * 14}deg)`;
      cardRef.current.style.transition = "transform 0.08s ease-out";
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.boxShadow = `0 0 22px 2px ${langColor}44, 0 0 50px 6px ${langColor}18`;
      cardRef.current.style.borderColor = `${langColor}70`;
      cardRef.current.style.transition = "box-shadow 0.3s ease-out, border-color 0.3s ease-out";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      cardRef.current.style.boxShadow = "";
      cardRef.current.style.borderColor = "";
      cardRef.current.style.transition = "transform 0.45s ease-out, box-shadow 0.45s ease-out, border-color 0.45s ease-out";
    }
  };
  const langColor = repo.language ? (languageColors[repo.language] ?? "#6366f1") : "#6366f1";
  const hasVideo = !!demoVideos[repo.name];
  const hasImage = !!demoImages[repo.name];
  const hasDemo = hasVideo || hasImage;

  const thumbnail = hasVideo
    ? `https://img.youtube.com/vi/${demoVideos[repo.name]}/hqdefault.jpg`
    : hasImage
    ? demoImages[repo.name]
    : null;

  const link = projectLinks[repo.name];

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="group flex h-full w-full flex-col overflow-hidden border border-border bg-card transition-all duration-500">
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
            <span className="font-mono text-xs uppercase tracking-wider text-primary">{t("viewOnGithub")}</span>
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
          {getDisplayName(t, repo.name)}
        </h3>

        <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {t(`descriptions.${repo.name}`, { defaultValue: t("noDescription") })}
        </p>

        {link && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 mb-4 inline-block font-mono text-xs text-primary hover:underline"
          >
            {link.label ?? t(link.labelKey!)}
          </a>
        )}

        <div className="mt-auto border-t border-border pt-6 flex flex-col gap-4">
          {hasDemo && (
            <button
              onClick={hasVideo ? onWatchDemo : onViewPreview}
              className="flex items-center justify-center gap-2 border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {hasVideo ? <Play className="h-3 w-3" /> : <Image className="h-3 w-3" />}
              {hasVideo ? t("watchDemo") : t("viewPreview")}
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

const repos: GitHubRepo[] = [
  { id: 1201128514, name: "Fight_detection", html_url: "https://github.com/salokhiddin005/Fight_detection", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1218642007, name: "Theater-CV", html_url: "https://github.com/salokhiddin005/Theater-CV", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1211307048, name: "nail-size-detection", html_url: "https://github.com/salokhiddin005/nail-size-detection", language: "TypeScript", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1220842292, name: "IV-drip-drop-counter", html_url: "https://github.com/salokhiddin005/IV-drip-drop-counter", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1223624774, name: "Smart-Gym-Monitoring", html_url: "https://github.com/salokhiddin005/Smart-Gym-Monitoring", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1221642157, name: "Password-Manager", html_url: "https://github.com/salokhiddin005/Password-Manager", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1226340429, name: "Text-To-Speech", html_url: "https://github.com/salokhiddin005/Text-To-Speech", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1221582841, name: "Bizness-Hisobchi", html_url: "https://github.com/salokhiddin005/Bizness-Hisobchi", language: "Python", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1165411911, name: "employment-classification", html_url: "https://github.com/salokhiddin005/employment-classification", language: "Jupyter Notebook", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
  { id: 1165413179, name: "House-price-prediction", html_url: "https://github.com/salokhiddin005/House-price-prediction", language: "Jupyter Notebook", stargazers_count: 0, forks_count: 0, topics: [], fork: false },
];

const Projects = () => {
  const { t } = useTranslation("projects");
  const [filter, setFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [activeImage, setActiveImage] = useState<{ imageUrl: string; title: string } | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridMouseMove = (e: React.MouseEvent) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const isLoading = false;
  const isError = false;

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
        <SectionTitle overline={t("overline")} title={t("title")} />

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
                  {lang === "All" ? t("filterAll") : lang}
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
            {t("loadError")}
          </p>
        )}

        {/* Cards grid */}
        {!isLoading && !isError && (
          <div
            ref={gridRef}
            className="relative"
            onMouseMove={handleGridMouseMove}
            onMouseLeave={() => setSpotlight(s => ({ ...s, active: false }))}
          >
            <div
              className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-lg"
              style={{
                opacity: spotlight.active ? 1 : 0,
                background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, hsl(var(--primary) / 0.07), transparent 50%)`,
              }}
            />
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
          </div>
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
