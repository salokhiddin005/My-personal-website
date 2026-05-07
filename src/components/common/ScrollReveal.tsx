import { motion } from "framer-motion";
import { variants } from "@/lib/animations";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
}

const ScrollReveal = ({ children, className = "", variant = "fadeUp", delay = 0 }: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={{
      hidden: variants[variant].hidden,
      visible: {
        ...variants[variant].visible,
        transition: {
          ...(variants[variant].visible as any).transition,
          delay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
