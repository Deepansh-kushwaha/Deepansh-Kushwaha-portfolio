import { motion } from "framer-motion";
import type { ReactNode } from "react";

const animations = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
