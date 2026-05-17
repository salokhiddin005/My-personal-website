import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-6 lg:pt-0">
      {/* Tech grid */}
      <div className="absolute inset-0 tech-grid" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative z-10 w-full max-w-5xl">
        <div ref={parallaxRef} style={{ transition: "transform 0.12s ease-out" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12"
          >
            {/* Profile photo */}
            <motion.div
              className="flex flex-col items-center gap-3 lg:pt-10 lg:shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <div className="relative">
                <div className="h-44 w-44 overflow-hidden rounded-full border-2 border-primary/40 ring-4 ring-primary/10 lg:h-52 lg:w-52">
                  <img
                    src="/profile.jpeg"
                    alt="Saloxiddin G'opirjonov"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="absolute bottom-2 right-2 flex h-4 w-4 rounded-full bg-primary ring-2 ring-background" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                available_for_work
              </p>
            </motion.div>

            {/* Terminal card + Status bar */}
            <div className="w-full lg:flex-1">
              {/* Terminal window */}
              <div className="border border-border bg-card/80 backdrop-blur-md">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 border-b border-border bg-card px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 font-mono text-[10px] text-muted-foreground">
                    ~/portfolio/saloxiddin — bash
                  </span>
                </div>

                {/* Terminal body */}
                <div className="space-y-5 p-6 sm:p-8">
                  {/* whoami */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="font-mono text-sm text-muted-foreground">
                      <span className="text-primary">❯</span> whoami
                    </p>
                    <div className="mt-3 pl-1">
                      <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                        Saloxiddin
                        <br />
                        <span className="text-primary">G'opirjonov</span>
                      </h1>
                      <p className="mt-2 font-mono text-sm text-muted-foreground">
                        <span className="text-primary/50">// </span>
                        AI / ML Engineer · Uzbekistan
                      </p>
                    </div>
                  </motion.div>

                  {/* description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    <p className="pl-1 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      Building intelligent systems with LLMs, RAG pipelines,
                      <br className="hidden sm:block" />
                      {" "}and AI-powered web applications.
                    </p>
                  </motion.div>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="font-mono text-sm text-muted-foreground">
                      <span className="text-primary">❯</span>{" "}
                      <span className="animate-blink text-primary">█</span>
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#projects"
                        className="animate-cyan-pulse inline-flex items-center justify-center bg-primary px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        ./view_projects
                      </a>
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center border border-primary/40 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
                      >
                        ./contact_me
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between border border-t-0 border-border/60 bg-primary/5 px-4 py-2">
                <span className="font-mono text-[10px] text-muted-foreground">
                  status: available_for_work
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  ONLINE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
