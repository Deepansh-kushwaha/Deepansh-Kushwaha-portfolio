import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const words = ["Studio", "Motion", "Architecture", "Precision", "Fluidity"];

const PreLoader = ({ finishLoading }: { finishLoading: () => void }) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    if (index === words.length - 1) {
      setTimeout(() => {
        finishLoading();
      }, 1000);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);

    return () => clearTimeout(timeout);
  }, [index, finishLoading]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve: any = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ top: 0 }}
      exit={{ top: "-100vh" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--surface-container-highest)]"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center absolute z-20 text-white headline-lg text-4xl md:text-6xl uppercase tracking-[0.2em]"
          >
            <span className="w-4 h-4 rounded-full bg-white mr-6 block animate-pulse"></span>
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-[var(--surface-container-highest)]">
            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};


export default PreLoader;
