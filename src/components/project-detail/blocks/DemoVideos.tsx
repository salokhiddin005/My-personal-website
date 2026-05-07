import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

export interface DemoVideoItem {
  src: string;
  title: string;
  description: string;
  tags: string[];
}

/* Browser chrome wrapper reused by both players */
function BrowserChrome({ title, domain = "safesite.ai", children }: { title: string; domain?: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/60 sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60 sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-green-500/60 sm:h-2.5 sm:w-2.5" />
        </div>
        <div className="ml-2 flex-1 border border-border bg-background/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:px-3 sm:py-1 sm:text-xs">
          <span className="hidden sm:inline">{domain} / inference / {title.toLowerCase().replace(/\s+/g, "-")}</span>
          <span className="sm:hidden">{domain}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/* Hero video — full native controls for seeking, volume, fullscreen */
function HeroVideoPlayer({ src, title, domain }: { src: string; title: string; domain?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <BrowserChrome title={title} domain={domain}>
        <div className="aspect-video bg-black">
          {isVisible ? (
            <video
              src={src}
              className="h-full w-full object-contain"
              playsInline
              preload="metadata"
              controls
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
      </BrowserChrome>
    </div>
  );
}

/* Feature demo — simple play/pause overlay, no seek bar needed */
function DemoVideoPlayer({ src, title, domain }: { src: string; title: string; domain?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div ref={containerRef}>
      <BrowserChrome title={title} domain={domain}>
        <div className="group relative aspect-video bg-black">
          {isVisible ? (
            <video
              ref={videoRef}
              src={src}
              className="h-full w-full object-contain"
              loop
              muted
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <div className="h-full w-full" />
          )}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center transition-opacity"
            style={{ opacity: isPlaying ? 0 : 1 }}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-sm transition-transform hover:scale-110 sm:h-16 sm:w-16">
              {isPlaying ? (
                <Pause className="h-5 w-5 sm:h-7 sm:w-7" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 sm:ml-1 sm:h-7 sm:w-7" />
              )}
            </div>
          </button>
        </div>
      </BrowserChrome>
    </div>
  );
}

interface DemoVideosProps {
  demos: DemoVideoItem[];
  heroVideoSrc?: string;
  domain?: string;
  heading?: string | false;
}

const DemoVideos = ({ demos, heroVideoSrc, domain, heading = "Live Demos" }: DemoVideosProps) => (
  <section className="px-4 py-12 sm:px-6 md:py-24">
    <div className="mx-auto max-w-6xl">
      {heading !== false && (
        <ScrollReveal>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {heading}
          </h3>
          <div className="gold-divider mb-8 sm:mb-12" />
        </ScrollReveal>
      )}

      {/* Hero demo — full player with seek, volume, fullscreen */}
      {heroVideoSrc && (
        <ScrollReveal>
          <div className="mb-12 sm:mb-16">
            <HeroVideoPlayer src={heroVideoSrc} title="Full Demo" domain={domain} />
          </div>
        </ScrollReveal>
      )}

      {/* Feature demos — simple play/pause */}
      <div className="space-y-10 sm:space-y-16">
        {demos.map((demo, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <ScrollReveal key={demo.title} delay={i * 0.05}>
              <div className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${isReversed ? "lg:[direction:rtl]" : ""}`}>
                <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                  <DemoVideoPlayer src={demo.src} title={demo.title} domain={domain} />
                </div>

                <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                  <span className="mb-2 inline-block border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary sm:text-xs">
                    Demo {i + 1}
                  </span>
                  <h4 className="mt-3 font-display text-lg font-bold italic text-foreground sm:text-xl">
                    {demo.title}
                  </h4>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {demo.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block border border-border bg-card/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default DemoVideos;
