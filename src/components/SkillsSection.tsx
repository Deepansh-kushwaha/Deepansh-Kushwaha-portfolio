import { motion } from "framer-motion";


const categories = [
  {
    title: "Intelligence & Logic",
    skills: ["React 19", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    description: "Architecting the cerebral core of digital products with cutting-edge frameworks."
  },
  {
    title: "Fluidity & Motion",
    skills: ["GSAP", "Framer Motion", "Three.js", "GLSL Shaders", "R3F"],
    description: "Breathing life into static interfaces through hardware-accelerated choreography."
  },
  {
    title: "Environment & Scale",
    skills: ["AWS", "Docker", "PostgreSQL", "Redis", "Vercel"],
    description: "Ensuring uncompromising stability and global reach for every digital symphony."
  },
  {
    title: "Design & Soul",
    skills: ["Figma", "Interaction Design", "Typography", "Editorial Layouts"],
    description: "Curation and aesthetics derived from the North Star of the 'Fluid Sommelier'."
  }
];

export default function SkillsSection() {
  return (
    <section className="py-24 md:py-40 bg-[var(--surface)] text-[var(--on-surface)]">
      <div className="container mx-auto px-6 md:px-24">
        <header className="mb-24 md:mb-32 reveal">
          <p className="label-md text-[var(--primary)] mb-6">Capabilities</p>
          <h2 className="display-lg text-4xl md:text-6xl max-w-4xl">Technical <br/>Toolkit</h2>
        </header>

        <div className="space-y-0">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group py-12 md:py-16 border-b border-[var(--on-surface)]/5 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-[var(--surface-container-low)] transition-all px-0 md:hover:px-12 rounded-3xl"
            >
              <div className="max-w-md">
                <p className="label-md opacity-40 mb-4">0{i + 1} // {cat.title}</p>
                <h3 className="headline-lg text-2xl md:text-3xl tracking-normal group-hover:text-[var(--primary)] transition-colors duration-500">
                  {cat.description}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 max-w-xl lg:justify-end">
                {cat.skills.map((skill, skIndex) => (
                  <span 
                    key={skIndex} 
                    className="label-md px-6 py-2 rounded-full glass border border-[var(--on-surface)]/10 opacity-60 group-hover:opacity-100 group-hover:border-[var(--primary)]/20 transition-all duration-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


