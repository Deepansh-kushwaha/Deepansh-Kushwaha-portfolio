import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseFollower: React.FC = () => {
  // We'll use 5 points for the liquid trail
  const points = Array.from({ length: 5 }, () => ({
    x: useMotionValue(0),
    y: useMotionValue(0),
  }));

  const springs = points.map((p, i) => ({
    x: useSpring(p.x, { stiffness: 150 - i * 20, damping: 25 + i * 2 }),
    y: useSpring(p.y, { stiffness: 150 - i * 20, damping: 25 + i * 2 }),
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      points.forEach((p) => {
        p.x.set(e.clientX);
        p.y.set(e.clientY);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        style={{ filter: 'url(#liquid-goo)' }}
      >
        {springs.map((s, i) => (
          <motion.div
            key={i}
            style={{
              x: s.x,
              y: s.y,
              translateX: '-50%',
              translateY: '-50%',
              width: 100 - i * 10,
              height: 100 - i * 10,
              // DESIGN.md: Frosted Glass effect
              background: i === 0 
                ? 'rgba(184, 20, 0, 0.08)'  // Subtle Primary Tint for the lead
                : 'rgba(250, 249, 251, 0.1)', // Surface translucent
              backdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: '50%',
            }}
            className="absolute top-0 left-0"
          />
        ))}
      </div>
    </>
  );
};

export default MouseFollower;




