import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Innovation", "Precision", "Fluidity", "Architecture", "Studio"];

const PreLoader = ({ finishLoading }: { finishLoading: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        finishLoading();
      }, 1000);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1200 : 180); // Slightly adjusted timing for better rhythm

    return () => clearTimeout(timeout);
  }, [index, finishLoading]);

  // Framer Motion variants for the staggered stairs - High-End "Liquid" easing
  const stairVariants = {
    initial: {
      top: 0,
    },
    exit: (i: number) => ({
      top: "100vh",
      transition: {
        duration: 0.9,
        delay: 0.05 * i, // Reduced for a more fluid "wave" effect
        ease: [0.76, 0, 0.24, 1] // The Boutique Studio standard ease
      }
    })
  };

  return (
    <motion.div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* 1. The Word Cycling Display */}
      <AnimatePresence mode="wait">
        <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.4, ease: "easeInOut" }}
           className="fixed inset-0 z-[110] flex items-center justify-center text-white pointer-events-none"
        >
           <div className="flex items-center">
             <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-6 block animate-pulse"></span>
             <h2 className="headline-lg text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.4em] font-light">
                {words[index]}
             </h2>
           </div>
        </motion.div>
      </AnimatePresence>

      {/* 2. The Combined Stairs Background */}
      <div className="flex w-screen h-screen">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={stairVariants as any}
            initial="initial"
            exit="exit"
            custom={i}
            className="h-full w-1/5 bg-[var(--surface-container-highest)] relative will-change-transform"
          />
        ))}
      </div>
    </motion.div>
  );
};


export default PreLoader;
