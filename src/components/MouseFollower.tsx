import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MouseFollowerProps {
  size?: number;           // diameter in px
  imgSrc: string;
  skewAmount?: number;     // px of skew max (e.g. 10)
  blurIntensity?: number;  // px blur (e.g. 4)
  glowColor?: string;      // e.g. "rgba(255,255,255,0.6)"
  stiffness?: number;
  damping?: number;
  zIndex?: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({
  size = 80,
  imgSrc,
  skewAmount = 0,
  blurIntensity = 0,
  glowColor = "",
  stiffness = 170,
  damping = 26,
}) => {
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { stiffness, damping };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // We'll calculate skew transform based on velocity
  const skewX = useMotionValue(0);
  const skewY = useMotionValue(0);
  const skewConfig = { stiffness: stiffness * 0.8, damping: damping * 0.8 };
  const springSkewX = useSpring(skewX, skewConfig);
  const springSkewY = useSpring(skewY, skewConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = e.clientX - size / 2;
      const targetY = e.clientY - size / 2;
      mouseX.set(targetX);
      mouseY.set(targetY);

      // Determine skew based on distance from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      skewX.set(offsetY * skewAmount * -1);
      skewY.set(offsetX * skewAmount);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, skewX, skewY, size, skewAmount]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        rotateX: springSkewX,
        rotateY: springSkewY,
        ...(glowColor
          ? { boxShadow: `0 0 ${size * 0.5}px ${glowColor}` }
          : {}),
        ...(blurIntensity
          ? { backdropFilter: `blur(${blurIntensity}px)` }
          : {}),
      }}
      className={`fixed top-0 left-0 pointer-events-none rounded-full overflow-hidden z-0`}
    >
      <img
        src={imgSrc}
        alt="follower"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default MouseFollower;
