import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CircleProps {
  size: number;
  top?: string;
  left?: string;
  img: string;
}

const circles: CircleProps[] = [
  { size: 180, top: "15%", left: "50%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { size: 180, top: "50%", left: "90%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { size: 180, top: "50%", left: "10%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { size: 140, top: "20%", left: "70%", img: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { size: 140, top: "20%", left: "30%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { size: 110, top: "35%", left: "80%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { size: 110, top: "35%", left: "20%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { size: 110, top: "65%", left: "30%", img: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
  { size: 210, top: "75%", left: "50%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { size: 110, top: "65%", left: "70%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { size: 90, top: "50%", left: "60%", img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
  { size: 90, top: "50%", left: "40%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { size: 220, top: "10%", left: "10%", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { size: 220, top: "10%", left: "90%", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

function MagneticCircle({ size, img, top, left }: CircleProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = circleRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.3);
    y.set(offsetY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={circleRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top,
        left,
        translateX: springX,
        translateY: springY,
      }}
      className="absolute hidden md:flex rounded-full p-6 glass soft-shadow -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={img} alt="skill" className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" />
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 bg-[var(--surface-container-low)]">
      <div className="absolute inset-0 dot-grid-svg opacity-30" />
      
      <div className="relative z-10 text-center mb-12 md:mb-20 px-6 reveal stagger-1">
        <p className="label-md text-[var(--primary)] mb-2">Capabilities</p>
        <h2 className="headline-lg text-[var(--on-surface)]">Technical Toolkit</h2>
      </div>

      {/* Desktop Cloud View */}
      <div className="hidden md:flex relative w-full h-[600px] justify-center items-center">
        {circles.map((circle, index) => (
          <MagneticCircle key={index} {...circle} />
        ))}
      </div>

      {/* Mobile Grid View */}
      <div className="flex md:hidden flex-wrap justify-center gap-6 px-10 relative z-10">
        {circles.map((circle, index) => (
          <div 
            key={index} 
            className="w-20 h-20 rounded-2xl glass soft-shadow p-4 flex items-center justify-center"
          >
            <img src={circle.img} alt="skill" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}

