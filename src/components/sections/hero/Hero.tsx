import { lazy, Suspense } from "react";
import { motion, type Easing } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroPlayer = lazy(() =>
  import("@/remotion/HeroPlayer").then((m) => ({ default: m.HeroPlayer }))
);

const ease: Easing = [0.25, 0.1, 0.25, 1];

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Remotion animated background — covers the entire hero */}
      <Suspense fallback={<div className="hero-grid absolute inset-0 bg-background" />}>
        <HeroPlayer />
      </Suspense>

      {/* Interactive overlay — CTAs only (text/stats rendered by Remotion) */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-end px-6 pb-28 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4, ease }}
          className="pointer-events-auto flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0"
        >
          <a
            href="#projects"
            className="animate-gold-pulse w-full sm:w-auto text-center rounded-lg bg-primary px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-light"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center rounded-lg border border-primary/40 px-8 py-4 sm:py-3 font-body text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="animate-float absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;
