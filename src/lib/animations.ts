import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  staggerContainerSlow: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  },
  slideFromLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
  },
};
