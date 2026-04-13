import React, { useEffect, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

const MouseFollower: React.FC = () => {
  // We'll use 5 points for the liquid trail - Hooks must be at top level
  const p0x = useMotionValue(0); const p0y = useMotionValue(0);
  const p1x = useMotionValue(0); const p1y = useMotionValue(0);
  const p2x = useMotionValue(0); const p2y = useMotionValue(0);
  const p3x = useMotionValue(0); const p3y = useMotionValue(0);
  const p4x = useMotionValue(0); const p4y = useMotionValue(0);

  const points = useMemo(() => [
    { x: p0x, y: p0y }, { x: p1x, y: p1y }, 
    { x: p2x, y: p2y }, { x: p3x, y: p3y }, 
    { x: p4x, y: p4y }
  ], [p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y]);

  const s0x = useSpring(p0x, { stiffness: 150, damping: 25 });
  const s0y = useSpring(p0y, { stiffness: 150, damping: 25 });
  const s1x = useSpring(p1x, { stiffness: 130, damping: 27 });
  const s1y = useSpring(p1y, { stiffness: 130, damping: 27 });
  const s2x = useSpring(p2x, { stiffness: 110, damping: 29 });
  const s2y = useSpring(p2y, { stiffness: 110, damping: 29 });
  const s3x = useSpring(p3x, { stiffness: 90, damping: 31 });
  const s3y = useSpring(p3y, { stiffness: 90, damping: 31 });
  const s4x = useSpring(p4x, { stiffness: 70, damping: 33 });
  const s4y = useSpring(p4y, { stiffness: 70, damping: 33 });

  const springs = [
    { x: s0x, y: s0y }, { x: s1x, y: s1y },
    { x: s2x, y: s2y }, { x: s3x, y: s3y },
    { x: s4x, y: s4y }
  ];

  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    if (isHovered) triggerHaptic('light');
  }, [isHovered]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      points.forEach((p) => {
        p.x.set(e.clientX);
        p.y.set(e.clientY);
      });

      // Simple hover detection
      const target = e.target as HTMLElement;
      const isOverInteractive = target?.closest('a, button, [role="button"], input, textarea');
      setIsHovered(!!isOverInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [points]);

  return (
    <>
      {/* SVG Gooey Filter - The secret for "Fluidity" */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="fixed inset-0 pointer-events-none z-[9999]" 
      >
        {/* The "Precision" Pointer - Zero Lag */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? 'var(--on-surface)' : 'var(--primary)',
          }}
          transition={{ duration: 0.2 }}
          style={{
            x: p0x,
            y: p0y,
            translateX: '-50%',
            translateY: '-50%',
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: '1.5px solid white', // Contrast ring
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
          className="absolute top-0 left-0 z-10"
        />

        {/* The "Liquid" Trail - Smaller & Elegant */}
        <div style={{ filter: 'url(#liquid-goo)' }} className="w-full h-full">
          {springs.map((s, i) => (
            <motion.div
              key={i}
              animate={{
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.3 : 1,
              }}
              style={{
                x: s.x,
                y: s.y,
                translateX: '-50%',
                translateY: '-50%',
                width: 32 - i * 4,
                height: 32 - i * 4,
                // DESIGN.md: Frosted Glass effect
                background: i === 0 
                  ? 'rgba(184, 20, 0, 0.2)'  
                  : 'rgba(184, 20, 0, 0.1)', 
                backdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '50%',
              }}
              className="absolute top-0 left-0"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MouseFollower;




