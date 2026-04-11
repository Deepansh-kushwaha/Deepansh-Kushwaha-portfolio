import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface StatItemProps {
  label: string;
  value: string;
  icon: string;
  suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon, suffix = "+" }) => {
  const numericValue = parseInt(value);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8 } 
      }}
      onViewportEnter={() => {
        if (!hasAnimated) {
          motionValue.set(numericValue);
          setHasAnimated(true);
        }
      }}
      viewport={{ once: true }}
      className="group relative p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 glass soft-shadow overflow-hidden transition-all duration-500 hover:border-[var(--primary)]/30"
    >
      {/* Background Micro-Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 blur-3xl group-hover:bg-[var(--primary)]/10 transition-colors" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface-container-highest)] flex items-center justify-center text-3xl text-[var(--primary)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <i className={icon}></i>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <motion.span className="display-lg text-6xl text-[var(--primary)]">
              {displayValue}
            </motion.span>
            <span className="display-sm text-[var(--primary)]/60">{suffix}</span>
          </div>
          <span className="label-md opacity-40 uppercase tracking-[0.2em] text-[10px] font-bold mt-2">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const statsList = [
    { label: 'Studio Projects', value: '25', icon: 'ri-command-line' },
    { label: 'Creative Years', value: '03', icon: 'ri-time-line' },
    { label: 'Happy Partners', value: '12', icon: 'ri-shake-hands-line' },
    { label: 'Design Awards', value: '04', icon: 'ri-trophy-line' },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-[var(--surface)]">
      {/* Section Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary-container)_0%,transparent_70%)] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <header className="mb-20 text-center">
          <p className="label-md text-[var(--primary)] mb-4 tracking-widest">THE REACH</p>
          <h2 className="display-md max-w-xl mx-auto">IMPACT MEASURED IN <span className="text-[var(--primary)]">RESULTS</span></h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsList.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

