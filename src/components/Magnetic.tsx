import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  strength?: number; // how much the element moves toward the cursor
  children: React.ReactNode;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Motion values for x & y movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring for smooth animation
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const element = wrapperRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={wrapperRef}
      style={{ x: springX, y: springY }}
      className="inline-block cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
