import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Magnetic from "../../components/Magnetic";
import { Link, useNavigate } from "react-router";
import { getIKUrl, getIKPlaceholder } from "../../utils/imageKit";
import { triggerHaptic } from "../../utils/haptics";
import { works } from "../../data/works";

const categories = ["All", "Web Development", "Social Media", "Meta Ads"];

function Catalogue() {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const filteredWorks = useMemo(() => {
    return works.filter(work => activeFilter === "All" || work.category === activeFilter);
  }, [activeFilter]);

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
            <div key={work.id}>
              {/* Mid-Page CTA Insert */}
              {/* {index === 3 && activeFilter === "All" && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 py-32 md:py-48 px-8 md:px-20 bg-[var(--surface-container-low)] rounded-[4rem] my-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-[0.03] blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="text-center md:text-left">
                      <p className="label-md text-[var(--primary)] mb-4 tracking-[0.5em] uppercase text-xs">Partnership</p>
                      <h2 className="display-lg text-4xl md:text-6xl italic font-black uppercase tracking-tighter leading-none">WANT RESULTS <br /> <span className="text-outline-dark">LIKE THESE?</span></h2>
                    </div>
                    <Magnetic strength={0.2}>
                      <Link to="/contact" className="btn-primary py-6 px-12 md:px-16 text-xl md:text-2xl whitespace-nowrap group">
                        GET A QUOTE <i className="ri-arrow-right-line ml-4 group-hover:translate-x-2 transition-transform text-white" />
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              )} */}

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
                className={`flex flex-col group cursor-pointer ${
                  index % 3 === 1 ? "lg:mt-32" : 
                  index % 3 === 2 ? "lg:mt-64" : ""
                }`}
                onClick={() => { triggerHaptic('medium'); navigate(`/catalogue/${work.slug}`); }}
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
                          <i className="ri-line-chart-line text-sm text-white" />
                        </div>
                        <p className="text-white font-bold text-xs md:text-sm tracking-tight uppercase">{work.impact}</p>
                      </div>

                      <div className="btn-primary py-4 uppercase text-xs tracking-[0.2em] mt-2 font-black italic text-center text-white">
                        VIEW DETAILS <i className="ri-arrow-right-line ml-2 text-white" />
                      </div>
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
            </div>
          ))}
        </div>

        {/* Call to Action - Tonal Depth */}
        <section className="mt-40 md:mt-64 p-10 md:p-32 bg-[var(--surface-container-low)] rounded-[4rem] md:rounded-[7rem] overflow-hidden relative group">
          <div className="absolute inset-0 dot-grid-svg opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
            <div className="text-center lg:text-left">
              <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase reveal text-xs font-black">Get Started</p>
              <h2 className="display-lg mb-8 text-5xl md:text-8xl leading-[0.85] uppercase font-black italic">
                READY TO <br /> <span className="text-outline-dark">GROW WITH US?</span>
              </h2>
              <p className="body-lg italic opacity-40 max-w-md mx-auto lg:mx-0 text-sm md:text-lg">
                We design, build, and grow digital experiences that drive measurable capital growth and brand authority.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Magnetic strength={0.25}>
                <Link to="/contact" className="btn-primary px-16 py-8 text-xl md:text-3xl group shadow-2xl shadow-red-900/20 block text-center font-black italic text-white">
                  GET A QUOTE <i className="ri-arrow-right-line ml-4 transition-transform group-hover:translate-x-3 text-white"></i>
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

export default Catalogue;
;
