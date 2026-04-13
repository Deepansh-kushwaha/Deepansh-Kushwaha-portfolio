import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Magnetic from "../../components/Magnetic";
import { Link } from "react-router";
import { getIKUrl, getIKPlaceholder } from "../../utils/imageKit";

const categories = ["All", "Interaction", "Engineering", "Creative 3D", "Identity"];

interface Work {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  client: string;
  stack: string[];
  platform: string;
  features: string[];
}

const works: Work[] = [
  {
    id: 1,
    title: "Ethereal Luminaire",
    category: "Identity",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp",
    description: "Bespoke digital storefront and visual identity for a premium jewelry maison, focusing on light-refraction and high-end minimalism.",
    year: "2024",
    client: "Luminescence / Paris",
    stack: ["Next.js", "Stripe", "Framer Motion", "ImageKit"],
    platform: "E-Commerce / Desktop & Mobile",
    features: ["Real-time Checkout", "3D Product Previews", "Dynamic Inventory", "Custom Haptics"]
  },
  {
    id: 2,
    title: "Skyward Estates",
    category: "Engineering",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp",
    description: "Architecting a high-performance real estate portal with real-time architectural visualization and fluid property transitions.",
    year: "2024",
    client: "Skyward / Dubai",
    stack: ["React", "Three.js", "Firebase", "GSAP"],
    platform: "Architectural Platform / WebGL",
    features: ["3D Virtual Tours", "Interactive Map Deck", "Property AI Search", "CRM Integration"]
  },
  {
    id: 3,
    title: "Aurora Glass UI",
    category: "Interaction",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp",
    description: "Experimenting with advanced glassmorphism and light-based interaction patterns for future-facing digital operating systems.",
    year: "2023",
    client: "Nebula Tech",
    stack: ["React", "Tailwind CSS", "GLSL", "Framer"],
    platform: "Digital OS / Browser",
    features: ["Glassmorphic Shaders", "Fluid OS Navigation", "Light-Tracking UI", "Gesture Support"]
  },
  {
    id: 4,
    title: "Kinetic Flow",
    category: "Creative 3D",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp",
    description: "Fluid dynamic simulations and motion studies crafted for interactive brand experiences that demand attention.",
    year: "2024",
    client: "Studio Artery",
    stack: ["Blender", "React Three Fiber", "Canon.js"],
    platform: "Motion Gallery / Immersive",
    features: ["Physics Simulation", "Procedural Motion", "Real-time Reflections", "Audio Sync"]
  },
  {
    id: 5,
    title: "Aetherial Forms",
    category: "Creative 3D",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp?updatedAt=1776085229057",
    description: "An exploration into procedural geometry and abstract 3D sculptures for high-concept digital interventions.",
    year: "2024",
    client: "Deepansh Lab",
    stack: ["Three.js", "Shader Material", "Post-Processing"],
    platform: "Digital Art / Art Stationary",
    features: ["Abstract Geometry", "Dynamic Lighting", "NFT Integration", "4K Export"]
  }
];

function Catalogue() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Work | null>(null);

  const filteredWorks = useMemo(() => {
    return works.filter(work => activeFilter === "All" || work.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <main className="bg-[var(--surface)] min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="container-editorial">
        {/* Header - Editorial Asymmetry */}
        <header className="mb-24 md:mb-40 grid grid-cols-1 lg:grid-cols-12 items-end gap-12 md:gap-24">
          <div className="lg:col-span-8 reveal text-center md:text-left">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[1em]">The Archive / 24</p>
            <h1 className="display-lg">
              CATALOGUE <br />
              <span className="text-outline-primary italic">OF WORKS</span>
            </h1>
          </div>
          <div className="lg:col-span-4 reveal stagger-1 opacity-40 text-center lg:text-right">
            <p className="body-lg italic leading-relaxed max-w-sm mx-auto lg:ml-auto">
              "A visual symphony of digital architectural interventions, curated with a sommelier’s precision for the discerning brand."
            </p>
          </div>
        </header>

        {/* Filter System - Organic Tags */}
        <section className="mb-20 flex flex-wrap gap-4 reveal stagger-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`label-md px-10 py-4 rounded-full transition-all duration-500 active:scale-95 ${
                activeFilter === cat
                  ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20"
                  : "tonal-card text-[var(--on-surface)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* The Grid - Vertically Staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-32 items-start">
          {filteredWorks.map((work, index) => (
            <motion.div
              layout
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                delay: (index % 3) * 0.15, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`flex flex-col ${
                index % 3 === 1 ? "lg:mt-32" : 
                index % 3 === 2 ? "lg:mt-64" : ""
              }`}
            >
              {/* Image Container with Tonal Shadow Fallback */}
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[3rem] tonal-card soft-shadow">
                <motion.img
                  layoutId={`image-${work.id}`}
                  src={getIKUrl(work.image, { width: 800, quality: 90 })}
                  alt={work.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${getIKPlaceholder(work.image)})`,
                    backgroundSize: 'cover'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--on-surface)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Magnetic Interaction Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100">
                  <Magnetic strength={0.4}>
                    <button 
                       onClick={() => setSelectedProject(work)}
                       className="glass px-12 py-5 rounded-full label-md text-white border border-white/10 uppercase font-black"
                    >
                      View Project
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* Text Meta Content */}
              <div className="mt-12 px-2">
                <div className="flex justify-between items-center mb-6">
                  <span className="label-md text-[var(--primary)]">{work.category}</span>
                  <span className="label-md opacity-20">{work.year}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="headline-lg text-3xl md:text-4xl tracking-tighter leading-[0.9] uppercase">{work.title}</h3>
                  <div className="flex items-center gap-4 opacity-40">
                    <span className="w-8 h-[1px] bg-current"></span>
                    <p className="label-md lowercase tracking-widest">{work.client}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
            >
               {/* Backdrop */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setSelectedProject(null)}
                 className="absolute inset-0 bg-[var(--on-surface)]/95 backdrop-blur-3xl cursor-pointer"
               />               {/* Modal Content */}
                <motion.div 
                  layoutId={`image-${selectedProject.id}`}
                  className="relative w-full max-w-7xl h-[90vh] md:h-[85vh] bg-[var(--surface)] rounded-[4rem] overflow-x-hidden overflow-y-hidden flex flex-col md:flex-row soft-shadow border-none"
                >
                  {/* Close Button - Tonal Layering */}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-10 right-10 w-16 h-16 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all z-50 group"
                  >
                    <i className="ri-close-line text-3xl transition-transform group-hover:rotate-90"></i>
                  </button>

                  {/* Left Side: Editorial Image */}
                  <div className="w-full md:w-[40%] h-[40vh] md:h-full overflow-hidden flex-shrink-0">
                     <img 
                       src={getIKUrl(selectedProject.image, { width: 1200, quality: 90 })} 
                       alt={selectedProject.title}
                       className="w-full h-full object-cover"
                     />
                  </div>

                  {/* Right Side: Architectural Storytelling */}
                  <div className="w-full md:w-[60%] flex-1 relative bg-[var(--surface)] h-full overflow-hidden">
                     <div data-lenis-prevent className="absolute top-12 bottom-12 left-0 right-10 p-8 md:px-32 md:py-12 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar-inset">
                        {/* Background Watermark Title - Reduced prominence */}
                        <h2 className="absolute top-0 right-[-10%] text-[18vw] font-black text-[var(--on-surface)] opacity-[0.02] leading-none pointer-events-none uppercase tracking-tighter select-none z-0">
                           {selectedProject.title.split(' ')[0]}
                        </h2>

                        <div className="relative z-10 flex flex-col min-h-full">
                           <header className="mb-24">
                              <div className="flex items-center gap-6 mb-8 reveal">
                                 <span className="w-12 h-[1px] bg-[var(--primary)] opacity-40"></span>
                                 <p className="label-md text-[var(--primary)] tracking-[0.5em] uppercase">Project Detail / {selectedProject.category}</p>
                              </div>
                              
                              <h3 className="display-lg text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter mb-20 reveal stagger-1">
                                 {selectedProject.title}
                              </h3>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 border-b border-[var(--on-surface)]/5 pb-20 reveal stagger-2">
                                 <div>
                                    <p className="label-md opacity-30 mb-4 uppercase tracking-[0.3em]">Year of Creation</p>
                                    <p className="body-lg text-3xl font-light">{selectedProject.year}</p>
                                 </div>
                                 <div>
                                    <p className="label-md opacity-30 mb-4 uppercase tracking-[0.3em]">Project Client</p>
                                    <p className="body-lg text-3xl font-light">{selectedProject.client}</p>
                                 </div>
                              </div>
                           </header>

                           <div className="space-y-24 flex-grow reveal stagger-3">
                              <blockquote className="body-lg text-2xl md:text-4xl opacity-70 leading-relaxed italic pr-12 border-l-4 border-[var(--primary)]/10 pl-8 py-2">
                                 "{selectedProject.description}"
                              </blockquote>

                              {/* Technical Specifications - Expanded Grid */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-16">
                                 <section className="space-y-8">
                                    <h4 className="label-md text-[var(--primary)] mb-4 tracking-[0.4em] uppercase opacity-40">Section / Platform</h4>
                                    <p className="headline-lg text-4xl tracking-tight leading-tight">{selectedProject.platform}</p>
                                 </section>

                                 <section className="space-y-8">
                                    <h4 className="label-md text-[var(--primary)] mb-4 tracking-[0.4em] uppercase opacity-40">Section / Tech Stack</h4>
                                    <div className="flex flex-wrap gap-4">
                                       {selectedProject.stack?.map((tech: string) => (
                                         <span key={tech} className="label-md px-8 py-3 rounded-full bg-[var(--surface-container-low)] text-[var(--on-surface)] uppercase text-[10px] tracking-[0.2em] border border-[var(--on-surface)]/5 hover:border-[var(--primary)]/20 transition-colors">
                                           {tech}
                                         </span>
                                       ))}
                                    </div>
                                 </section>

                                 <section className="lg:col-span-2 space-y-12 pt-12">
                                    <h4 className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase opacity-40 text-center md:text-left">Project Capabilities</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                                       {selectedProject.features?.map((feature: string) => (
                                         <li key={feature} className="body-lg text-xl md:text-2xl opacity-60 flex items-start gap-6 group py-4 border-b border-[var(--on-surface)]/5 hover:border-[var(--primary)]/30 transition-all">
                                           <span className="label-md text-[var(--primary)] opacity-40 pt-1 group-hover:opacity-100 transition-opacity">/ 0{selectedProject.features.indexOf(feature) + 1}</span>
                                           <span className="transition-transform group-hover:translate-x-3">{feature}</span>
                                         </li>
                                       ))}
                                    </ul>
                                 </section>
                              </div>
                           </div>

                           <footer className="mt-40 pt-16 flex flex-col lg:flex-row items-center justify-between gap-12 border-t border-[var(--on-surface)]/5 reveal">
                              <div className="flex flex-col gap-2 text-center lg:text-left">
                                 <p className="label-md opacity-30 uppercase tracking-widest">Interested in similar results?</p>
                                 <p className="body-lg italic">"A digital Intervention for the modern brand."</p>
                              </div>
                              
                              <div className="flex items-center gap-12">
                                 <Magnetic strength={0.25}>
                                   <button className="btn-primary px-24 py-12 text-2xl w-full sm:w-auto shadow-2xl shadow-red-900/10">
                                     Launch Exp. <i className="ri-arrow-right-up-line ml-3"></i>
                                   </button>
                                 </Magnetic>
                                 <button 
                                   onClick={() => setSelectedProject(null)}
                                   className="label-md uppercase opacity-40 hover:opacity-100 tracking-[0.4em] transition-all hover:text-[var(--primary)] hidden sm:block"
                                 >
                                   [ Back ]
                                 </button>
                              </div>
                           </footer>
                        </div>
                     </div>
                  </div>
                </motion.div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action - Tonal Depth */}
        <section className="mt-64 section-padding bg-[var(--surface-container-low)] rounded-[5rem] overflow-hidden relative group">
          <div className="absolute inset-0 dot-grid-svg opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
            <p className="label-md text-[var(--primary)] mb-12 tracking-[1.5em] uppercase reveal">Composer's Note</p>
            <h2 className="display-lg mb-20 reveal stagger-1">
              Architecture <br /> for the <span className="text-outline-primary italic">Immersed.</span>
            </h2>
            <Magnetic strength={0.25}>
              <Link to="/contact" className="btn-primary px-24 py-10 text-2xl group shadow-2xl shadow-red-900/10">
                Initiate Project <i className="ri-arrow-right-line ml-4 transition-transform group-hover:translate-x-3"></i>
              </Link>
            </Magnetic>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Catalogue;
