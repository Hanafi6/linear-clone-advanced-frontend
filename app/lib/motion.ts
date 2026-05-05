import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

export const hoverCard = {
  whileHover: { y: -2, scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { type: "spring", stiffness: 420, damping: 28 },
} as const;

export const hoverIcon = {
  whileHover: { rotate: 8, scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 520, damping: 26 },
} as const;

