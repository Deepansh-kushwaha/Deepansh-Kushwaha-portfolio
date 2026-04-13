import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Magnetic from "./Magnetic";

const categories = [
  {
    title: "Intelligence & Logic",
    skills: ["React 19", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    description: "Architecting the cerebral core of digital products with cutting-edge frameworks.",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Fluidity & Motion",
    skills: ["GSAP", "Framer Motion", "Three.js", "GLSL Shaders", "R3F"],
    description: "Breathing life into static interfaces through hardware-accelerated choreography.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Environment & Scale",
    skills: ["AWS", "Docker", "PostgreSQL", "Redis", "Vercel"],
    description: "Ensuring uncompromising stability and global reach for every digital symphony.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Design & Soul",
    skills: ["Figma", "Interaction Design", "Typography", "Editorial Layouts"],
    description: "Curation and aesthetics derived from the North Star of the 'Fluid Sommelier'.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-64 bg-[var(--surface)] text-[var(--on-surface)] relative overflow-hidden">
      {/* Dynamic Background Image Reveal */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 blur-2xl transition-all duration-1000">
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.img
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={categories[hoveredIndex].image}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <header className="mb-32 reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-xl">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[0.5em] uppercase">Capabilities</p>
            <h2 className="display-lg text-6xl md:text-[8vw] leading-[0.85] uppercase">
              Technical <br/>
              <span className="text-[var(--primary)] text-outline-primary">Toolkit</span>
            </h2>
          </div>
          <div className="max-w-xs md:text-right hidden md:block">
            <p className="body-lg opacity-40 italic">
              "The instruments of our digital orchestration, selected for precision and emotional resonance."
            </p>
          </div>
        </header>

        <div className="space-y-0 mt-32">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative py-16 md:py-24 border-b border-[var(--on-surface)]/5 flex flex-col lg:flex-row lg:items-center gap-12 cursor-pointer"
            >
              {/* index number */}
              <div className="flex-shrink-0">
                <span className="display-lg text-4xl md:text-6xl opacity-10 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all duration-500 font-light">
                  0{i + 1}
                </span>
              </div>

              {/* Title and Description */}
              <div className="flex-1 max-w-2xl">
                <h3 className="headline-lg text-3xl md:text-5xl tracking-normal mb-6 group-hover:translate-x-4 transition-transform duration-700 ease-[0.76,0,0.24,1]">
                  {cat.title}
                </h3>
                <p className="body-lg opacity-40 group-hover:opacity-80 transition-opacity duration-700 max-w-md">
                  {cat.description}
                </p>
              </div>

              {/* Skills Tags with Magnetic effect */}
              <div className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
                {cat.skills.map((skill, skIndex) => (
                  <Magnetic key={skIndex} strength={0.2}>
                    <span 
                      className="label-md px-8 py-3 rounded-full glass border border-[var(--on-surface)]/10 text-sm opacity-60 group-hover:opacity-100 group-hover:border-[var(--primary)]/30 group-hover:bg-[var(--primary)]/5 transition-all duration-500"
                    >
                      {skill}
                    </span>
                  </Magnetic>
                ))}
              </div>

              {/* Floating Image Preview on Desktop */}
              <motion.div 
                className="absolute right-[20%] top-1/2 -translate-y-1/2 w-64 aspect-[3/4] rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 hidden lg:block z-50 soft-shadow"
                initial={{ scale: 0.8, rotate: -10, x: 50 }}
                whileHover={{ scale: 1, rotate: 5, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ 
                  transform: `scale(${hoveredIndex === i ? 1 : 0.8}) rotate(${hoveredIndex === i ? 5 : -10}deg)`,
                  opacity: hoveredIndex === i ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
                }}
              >
                <img src={cat.image} className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
