import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
  const baseClass = "relative overflow-hidden bg-[var(--surface-container-highest)]/20";
  const roundedClass = variant === 'circle' ? 'rounded-full' : 'rounded-[1rem]';
  
  return (
    <div className={`${baseClass} ${roundedClass} ${className}`}>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--on-surface)]/5 to-transparent"
      />
    </div>
  );
};

export const HeroSkeleton = () => (
  <div className="container-editorial min-h-screen flex flex-col justify-center pt-24">
    <Skeleton className="h-6 w-48 mb-12" />
    <Skeleton className="h-[18rem] md:h-[22rem] w-full mb-16" /> {/* Updated height to match multi-line display text */}
    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
      <Skeleton className="h-24 w-full md:w-1/3" />
      <Skeleton className="h-16 w-48 rounded-full" />
    </div>
  </div>
);

export const BentoSkeleton = () => (
  <div className="w-full h-[80vh] md:h-[100vh] bg-[var(--surface-container-low)] rounded-[3rem] md:rounded-[5rem] overflow-hidden flex items-center justify-center">
    <Skeleton className="w-[80%] h-[60%] opacity-20" />
  </div>
);

export const SectionSkeleton = ({ height = "h-96" }: { height?: string }) => (
  <div className={`container-editorial py-24 md:py-40`}>
    <Skeleton className={`${height} w-full rounded-[3rem] md:rounded-[5rem]`} />
  </div>
);

export const CatalogueSkeleton = () => (
  <div className="container-editorial pt-40 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`flex flex-col gap-6 ${
          i % 3 === 1 ? "lg:mt-32" : 
          i % 3 === 2 ? "lg:mt-64" : ""
        }`}>
          <Skeleton className="aspect-[3/4] rounded-[3rem]" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full opacity-40" />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
