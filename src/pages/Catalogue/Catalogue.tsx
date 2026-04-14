import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Magnetic from "../../components/Magnetic";
import { Link } from "react-router";
import { getIKUrl, getIKPlaceholder } from "../../utils/imageKit";

const categories = ["All", "Web Development", "Social Media", "Meta Ads"];

interface Work {
  id: number;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  impact: string;
  year: string;
  client: string;
  stack: string[];
  platform: string;
  features: string[];
}

const works: Work[] = [
  {
    id: 1,
    title: "Lumina Jewelry Store",
    category: "Web Development",
    tag: "E-Commerce Build",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp",
    description: "Architecting a high-converting digital storefront for a premium jewelry maison with fluid animations and seamless checkout.",
    impact: "250% Increase in Mobile Conversion",
    year: "2024",
    client: "Luminescence / Paris",
    stack: ["Next.js", "Stripe", "Framer Motion", "ImageKit"],
    platform: "E-Commerce / Desktop & Mobile",
    features: ["Real-time Checkout", "3D Product Previews", "Dynamic Inventory", "Custom Haptics"]
  },
  {
    id: 2,
    title: "Skyward Property Portal",
    category: "Web Development",
    tag: "Performance Platform",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp",
    description: "A high-performance real estate portal with real-time property visualization and fluid architectural transitions.",
    impact: "40% Higher Lead Retention",
    year: "2024",
    client: "Skyward / Dubai",
    stack: ["React", "Three.js", "Firebase", "GSAP"],
    platform: "Architectural Platform / WebGL",
    features: ["3D Virtual Tours", "Interactive Map Deck", "Property AI Search", "CRM Integration"]
  },
  {
    id: 3,
    title: "Pulse Social Strategy",
    category: "Social Media",
    tag: "Organic Growth",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp",
    description: "Developing a visual-heavy social strategy that redefined the brand presence across Instagram and TikTok.",
    impact: "+1.2M Organic Reach in 3 Months",
    year: "2023",
    client: "Nebula Tech",
    stack: ["React", "Tailwind CSS", "GLSL", "Framer"],
    platform: "Digital OS / Browser",
    features: ["Glassmorphic Shaders", "Fluid OS Navigation", "Light-Tracking UI", "Gesture Support"]
  },
  {
    id: 4,
    title: "Aura Brand Scaling",
    category: "Meta Ads",
    tag: "Paid Acquisition",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp",
    description: "Data-driven Meta ad campaigns optimized for high-ticket service acquisition and brand authority.",
    impact: "4.2x ROAS across Q4 Campaign",
    year: "2024",
    client: "Studio Artery",
    stack: ["Blender", "React Three Fiber", "Canon.js"],
    platform: "Motion Gallery / Immersive",
    features: ["Physics Simulation", "Procedural Motion", "Real-time Reflections", "Audio Sync"]
  },
  {
    id: 5,
    title: "Vortex Content System",
    category: "Social Media",
    tag: "Engagement Design",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp?updatedAt=1776085229057",
    description: "Transforming brand identity into a library of high-performance social content and short-form video assets.",
    impact: "85% Audience Sentiment Score",
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
    <main className="bg-[var(--surface)] min-h-screen pt-32 md:pt-40 pb-32 overflow-hidden">
      <div className="container-editorial px-4 md:px-0">
        {/* Header - Editorial Asymmetry */}
        <header className="mb-20 md:mb-40 grid grid-cols-1 lg:grid-cols-12 items-end gap-10 md:gap-24">
          <div className="lg:col-span-8 reveal">
            <p className="label-md text-[var(--primary)] mb-6 tracking-[0.8em] uppercase text-xs md:text-base">The Solution Archive</p>
            <h1 className="display-lg leading-[0.85] text-5xl md:text-[9vw] uppercase font-black italic">
              ENGINEERED <br />
              <span className="text-outline-primary whitespace-nowrap">SUCCESS.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 reveal stagger-1 opacity-60">
            <p className="body-lg italic leading-relaxed max-w-sm ml-auto text-right text-sm md:text-lg">
              "We don’t just build digital interfaces; we architect conversions. Every project is a data-driven intervention designed for growth."
            </p>
          </div>
        </header>

        {/* Filter System - Animated Tags */}
        <section className="mb-24 flex flex-wrap gap-3 reveal stagger-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); triggerHaptic('light'); }}
              className={`label-md px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-500 relative group overflow-hidden text-[10px] md:text-xs tracking-widest font-bold ${
                activeFilter === cat
                  ? "bg-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/30"
                  : "bg-[var(--surface-container-high)] text-[var(--on-surface)]/60 hover:text-[var(--on-surface)]"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeFilter !== cat && (
                <div className="absolute inset-0 bg-[var(--primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
              )}
            </button>
          ))}
        </section>

        {/* The Grid - Vertically Staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 md:gap-y-32 items-start">
          {filteredWorks.map((work, index) => (
            <React.Fragment key={work.id}>
              {/* Mid-Page CTA Insert */}
              {index === 3 && activeFilter === "All" && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 py-32 md:py-48 px-8 md:px-20 bg-[var(--surface-container-low)] rounded-[4rem] my-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-[0.03] blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="text-center md:text-left">
                      <p className="label-md text-[var(--primary)] mb-4 tracking-[0.5em] uppercase">Partnership</p>
                      <h2 className="display-lg text-4xl md:text-6xl italic font-black uppercase tracking-tighter leading-none">WANT RESULTS <br /> <span className="text-outline-dark">LIKE THESE?</span></h2>
                    </div>
                    <Magnetic strength={0.2}>
                      <Link to="/contact" className="btn-primary py-6 px-12 md:px-16 text-xl md:text-2xl whitespace-nowrap group">
                        START A PROJECT <i className="ri-arrow-right-line ml-4 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              )}

              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 1.2, 
                  delay: (index % 3) * 0.15, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`flex flex-col group ${
                  index % 3 === 1 ? "lg:mt-32" : 
                  index % 3 === 2 ? "lg:mt-64" : ""
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-[var(--surface-container-high)] soft-shadow transition-transform duration-700 hover:scale-[1.02]">
                  <motion.img
                    layoutId={`image-${work.id}`}
                    src={getIKUrl(work.image, { width: 800, quality: 90 })}
                    alt={work.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${getIKPlaceholder(work.image)})`,
                      backgroundSize: 'cover'
                    }}
                  />
                  
                  {/* Detailed Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px] p-10 md:p-14 flex flex-col justify-end">
                    <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-700 flex flex-col gap-6">
                      <div className="space-y-4">
                        <p className="label-md text-white/50 uppercase tracking-widest text-[8px] md:text-[10px]">{work.tag}</p>
                        <h4 className="text-white text-2xl md:text-4xl font-black uppercase italic leading-none">{work.title}</h4>
                        <p className="body-lg text-white/70 text-sm md:text-lg italic line-clamp-2 md:line-clamp-none">"{work.description}"</p>
                      </div>
                      
                      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                        <div className="w-10 h-10 rounded-full border border-[var(--primary)] flex items-center justify-center text-[var(--primary)] shrink-0">
                          <i className="ri-line-chart-line text-sm" />
                        </div>
                        <p className="text-white font-bold text-xs md:text-sm tracking-tight uppercase">{work.impact}</p>
                      </div>

                      <button 
                         onClick={() => { setSelectedProject(work); triggerHaptic('medium'); }}
                         className="btn-primary py-4 uppercase text-xs tracking-[0.2em] mt-2 font-black italic"
                      >
                        ANALYZE BRIEF <i className="ri-zoom-in-line ml-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visible Info Segment */}
                <div className="mt-8 px-2">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                      <span className="label-md text-[var(--primary)] font-black text-[10px] tracking-[0.3em] uppercase">{work.category}</span>
                    </div>
                    <span className="label-md opacity-20 text-[10px] tracking-widest italic">{work.tag}</span>
                  </div>
                  <h3 className="headline-lg text-3xl md:text-5xl tracking-tighter leading-[0.8] uppercase font-black">{work.title}</h3>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-12 pointer-events-auto"
            >
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setSelectedProject(null)}
                 className="absolute inset-0 bg-white/95 backdrop-blur-3xl cursor-pointer"
               />

                <motion.div 
                  layoutId={`image-${selectedProject.id}`}
                  className="relative w-full max-w-7xl h-full md:h-[85vh] bg-[var(--surface)] md:rounded-[4rem] overflow-x-hidden overflow-y-auto md:overflow-y-hidden flex flex-col md:flex-row shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-none"
                >
                  {/* Close Button */}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="fixed md:absolute top-10 right-10 w-16 h-16 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all z-[100] group"
                  >
                    <i className="ri-close-line text-3xl transition-transform group-hover:rotate-90"></i>
                  </button>

                  <div className="w-full md:w-[45%] h-[50vh] md:h-full overflow-hidden flex-shrink-0">
                     <img 
                       src={getIKUrl(selectedProject.image, { width: 1200, quality: 90 })} 
                       alt={selectedProject.title}
                       className="w-full h-full object-cover"
                     />
                  </div>

                  <div className="w-full md:w-[55%] flex-1 relative bg-[var(--surface)] h-full overflow-hidden">
                     <div data-lenis-prevent className="absolute inset-0 p-8 md:px-24 md:py-20 md:pr-10 overflow-y-auto scroll-smooth custom-scrollbar-inset">
                        <div className="relative z-10 flex flex-col min-h-full">
                           <header className="mb-20">
                              <div className="flex items-center gap-6 mb-8">
                                 <span className="w-12 h-[1px] bg-[var(--primary)] opacity-40"></span>
                                 <p className="label-md text-[var(--primary)] tracking-[0.5em] uppercase text-xs">{selectedProject.category} / 0{selectedProject.id}</p>
                              </div>
                              
                              <h3 className="display-lg text-6xl md:text-8xl uppercase leading-[0.8] tracking-tighter mb-16 font-black italic">
                                 {selectedProject.title}
                              </h3>

                              <div className="flex flex-col gap-4 border-b border-[var(--on-surface)]/5 pb-16">
                                 <p className="label-md text-[var(--primary)] font-black uppercase tracking-[0.3em] text-sm">Key Impact Metric</p>
                                 <p className="display-lg text-4xl md:text-5xl uppercase font-black text-outline-dark">{selectedProject.impact}</p>
                              </div>
                           </header>

                           <div className="space-y-16 flex-grow">
                              <p className="body-lg text-2xl md:text-3xl opacity-80 leading-normal pr-12 font-light italic">
                                 "{selectedProject.description}"
                              </p>

                              <div className="grid grid-cols-1 gap-12 pt-10">
                                 <section className="space-y-6">
                                    <h4 className="label-md text-[var(--primary)] uppercase opacity-40 tracking-widest text-xs">Section / Project Goal</h4>
                                    <p className="headline-lg text-3xl tracking-tight leading-tight uppercase font-black">{selectedProject.tag}</p>
                                 </section>

                                 <section className="space-y-10">
                                    <h4 className="label-md text-[var(--primary)] uppercase opacity-40 tracking-widest text-xs">Section / Capabilities</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                       {selectedProject.features?.map((feature: string, i: number) => (
                                         <li key={feature} className="body-lg text-lg md:text-xl opacity-60 flex items-start gap-4 py-3 border-b border-[var(--on-surface)]/5">
                                           <span className="label-md text-[var(--primary)] opacity-40 font-bold">/ 0{i + 1}</span>
                                           <span>{feature}</span>
                                         </li>
                                       ))}
                                    </ul>
                                 </section>
                              </div>
                           </div>

                           <footer className="mt-24 pt-10 flex flex-col items-center gap-10 border-t border-[var(--on-surface)]/5">
                              <div className="text-center">
                                 <p className="label-md opacity-30 uppercase tracking-[0.5em] text-[10px] mb-2">Want results like these for your brand?</p>
                                 <Magnetic strength={0.25}>
                                    <Link to="/contact" className="btn-primary px-20 py-8 text-2xl group w-full sm:w-auto shadow-2xl shadow-red-900/10 block text-white font-black italic">
                                      LAUNCH PROJECT <i className="ri-arrow-right-up-line ml-3"></i>
                                    </Link>
                                 </Magnetic>
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
        <section className="mt-40 md:mt-64 p-10 md:p-32 bg-[var(--surface-container-low)] rounded-[4rem] md:rounded-[7rem] overflow-hidden relative group">
          <div className="absolute inset-0 dot-grid-svg opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
            <div className="text-center lg:text-left">
              <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase reveal">Next Stage</p>
              <h2 className="display-lg mb-8 text-5xl md:text-8xl leading-[0.85] uppercase font-black italic">
                READY TO <br /> <span className="text-outline-dark">SCALE?</span>
              </h2>
              <p className="body-lg italic opacity-40 max-w-md mx-auto lg:mx-0 text-sm md:text-lg">
                We design, build, and grow digital experiences that drive measurable capital growth and brand authority.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Magnetic strength={0.25}>
                <Link to="/contact" className="btn-primary px-16 py-8 text-xl md:text-3xl group shadow-2xl shadow-red-900/20 block text-center font-black italic">
                  START BRIEFING <i className="ri-arrow-right-line ml-4 transition-transform group-hover:translate-x-3"></i>
                </Link>
              </Magnetic>
              <Link to="/contact" className="label-md uppercase opacity-30 hover:opacity-100 tracking-[0.4em] transition-all hover:text-[var(--primary)] text-sm whitespace-nowrap">
                OR BOOK A CALL / 15 MIN
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import React from "react";
export default Catalogue;
;
