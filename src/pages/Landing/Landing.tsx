import { useLayoutEffect, useRef, lazy, Suspense, useState } from 'react';
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../../components/Magnetic";
import { triggerHaptic } from "../../utils/haptics";

// Lazy Components
import HeroScene from "../../components/HeroScene";
import { BentoSkeleton, SectionSkeleton } from '../../components/Skeleton';

// Lazy Components
const Footer = lazy(() => import("../../components/Footer"));
const Stats = lazy(() => import("../../components/Stats"));
const Testimonials = lazy(() => import("../../components/Testimonials"));
const Newsletter = lazy(() => import("../../components/Newsletter"));
const SkillsSection = lazy(() => import("../../components/SkillsSection"));
const BentoGrid = lazy(() => import("../../components/BentoGrid"));


gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const [activeSpecialty, setActiveSpecialty] = useState<number | null>(null);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  const specialties = [
    { 
      id: "01", 
      title: "Interactive Experiences", 
      desc: "Websites that respond to your touch and movement, making your brand feel alive and premium.",
      mission: "User Engagement",
      details: "We build websites that people actually enjoy using. By focusing on smooth animations and natural interactions, we keep your visitors engaged and impressed.",
      icon: "ri-cursor-line",
      color: "rgba(184, 20, 0, 0.4)"
    },
    { 
      id: "02", 
      title: "High-Performance Build", 
      desc: "Modern engineering that ensures your site loads instantly and works perfectly on every device.",
      mission: "Rock-Solid Reliability",
      details: "Your website is your storefront. We use enterprise-grade tools to make sure it never crashes, stays secure, and handles any amount of traffic with ease.",
      icon: "ri-shield-check-line",
      color: "rgba(0, 108, 69, 0.4)"
    },
    { 
      id: "03", 
      title: "Visual Storytelling", 
      desc: "Stunning 3D visuals and cinematic effects that set you apart from every other generic site.",
      mission: "Brand Distinction",
      details: "Don't just list your products—show them. We use cutting-edge 3D technology to create immersive worlds that tell your brand's story in a way nobody forgets.",
      icon: "ri-magic-line",
      color: "rgba(108, 69, 0, 0.4)"
    }
  ];
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Marquee
      gsap.to(".marquee-content", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.0, 
        delay: 0.3, // Faster appearance for LCP optimization
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <main ref={containerRef} className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white relative">

      {/* 1. HERO SECTION - The Discovery Hook */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">
        <Suspense fallback={<div className="absolute inset-0 bg-[var(--surface-container-highest)]/5 animate-pulse" />}>
          <HeroScene />
        </Suspense>
        
        <div className="container-editorial relative z-10 pt-0">
          <motion.div 
            initial="hidden"
            animate="visible"
            className="max-w-6xl"
          >
            <motion.p 
              variants={revealVariants}
              className="label-md text-[var(--primary)] mb-8 md:mb-12"
            >
              Curation / Engineering / Fluidity
            </motion.p>
            
            <motion.h1 
              variants={revealVariants}
              className="display-lg mb-12 md:mb-16"
            >
              We Architect <br />
              <span className="text-outline-primary">Fluid Digital</span> <br />
              Symphonies.
            </motion.h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mt-8 md:mt-0">
               <motion.p 
                 variants={revealVariants}
                 className="body-lg max-w-md text-center md:text-left"
               >
                 A boutique agency specializing in high-end interaction design and bespoke code architecture for brands that refuse to blend in.
               </motion.p>

               <motion.div variants={revealVariants} className="flex justify-center md:justify-end">
                   <Magnetic strength={0.15}>
                    <a 
                      href="#specialties" 
                      onClick={(e) => {
                        e.preventDefault();
                        (window as any).lenis?.scrollTo('#specialties');
                        triggerHaptic('light');
                      }}
                      className="btn-primary group text-lg md:text-xl relative overflow-hidden w-full md:w-auto justify-center"
                    >
                      <span>Explore Services</span>
                      <i className="ri-arrow-right-down-line transition-transform group-hover:translate-y-1"></i>
                    </a>
                  </Magnetic>
               </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Background Texture - Hidden on Mobile */}
        <div className="absolute top-1/2 right-[-10%] w-[50vw] h-[50vw] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none hidden md:block" />
      </section>

      {/* 2. PROOF SECTION - Cinematic Marquee + Case Studies */}
      <section ref={marqueeRef} className="py-20 md:py-40 bg-[var(--surface-container-low)] rounded-t-[3rem] md:rounded-t-[5rem] relative z-20 border-t border-[var(--on-surface)]/5 shadow-2xl">
         <div className="overflow-hidden mb-16 md:mb-40">
           <div className="marquee-content flex whitespace-nowrap gap-8 md:gap-24 items-center">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="flex items-center gap-8 md:gap-24">
                 <span className="display-lg text-[20vw] md:text-[15vw] opacity-10 leading-none">CRAFT</span>
                 <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--primary)]" />
                 <span className="display-lg text-[20vw] md:text-[15vw] opacity-30 leading-none text-outline-primary">FLUIDITY</span>
                 <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--primary)]" />
                 <span className="display-lg text-[20vw] md:text-[15vw] opacity-10 leading-none">PRECISION</span>
                 <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--primary)]" />
               </div>
             ))}
           </div>
         </div>

         <div className="container-editorial">
            <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
               <div className="reveal text-center md:text-left">
                  <p className="label-md text-[var(--primary)] mb-6">Case Studies</p>
                  <h2 className="display-lg text-4xl md:text-6xl uppercase">Selected <br/>Editorial Work</h2>
               </div>
               <div className="reveal md:max-w-xs text-center md:text-right opacity-40">
                  <p className="body-lg italic">A visual archive of architected digital interventions curated for global leaders.</p>
               </div>
            </header>

            <Suspense fallback={<BentoSkeleton />}>
               <BentoGrid />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="h-64" />}>
               <Stats />
            </Suspense>
         </div>
      </section>

      {/* 3. SERVICES - The Value Proposition */}
      <section id="specialties" className="py-32 md:py-64 bg-[var(--surface)] relative z-20">
         <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:items-start">
               <div className="reveal">
                  <p className="label-md text-[var(--primary)] mb-8 md:mb-12 uppercase tracking-[0.5em]">Specialties</p>
                  <h2 className="display-lg text-4xl md:text-5xl lg:text-7xl mb-12 md:mb-20 uppercase font-black leading-[0.9]">
                    The <br/> 
                    <span className="group relative">
                      Sommelier's
                      <span className="absolute bottom-full left-0 mb-4 px-6 py-3 bg-[var(--on-surface)] text-[var(--surface)] text-xs md:text-sm rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none normal-case font-normal whitespace-pre-wrap w-64 z-[100] tracking-normal shadow-2xl">
                        A metaphor for an expert curator with a refined 'palate' for digital motion, aesthetics, and rhythm.
                        <span className="absolute top-full left-8 border-8 border-transparent border-t-[var(--on-surface)]" />
                      </span>
                    </span>
                    <br/> 
                    <span className="text-[var(--primary)] text-outline-primary whitespace-nowrap">Collection</span>
                  </h2>
                  
                  <div className="space-y-0" onMouseLeave={() => setActiveSpecialty(null)}>
                    {specialties.map((s, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onMouseEnter={() => {
                          setActiveSpecialty(i);
                          triggerHaptic('light');
                        }}
                        className={`group py-12 border-b border-[var(--on-surface)]/10 hover:pr-8 transition-all cursor-crosshair flex justify-between items-center ${activeSpecialty === i ? 'bg-[var(--surface-container-low)]/50 px-4 -mx-4' : ''}`}
                      >
                         <div className="flex gap-8 items-start">
                            <span className={`label-md transition-all ${activeSpecialty === i ? 'text-[var(--primary)] scale-110' : 'text-[var(--on-surface)]/20'}`}>{s.id}</span>
                            <div className="max-w-md">
                               <h3 className={`headline-lg text-2xl md:text-3xl mb-4 transition-colors ${activeSpecialty === i ? 'text-[var(--primary)]' : ''}`}>{s.title}</h3>
                               <p className={`body-lg transition-opacity ${activeSpecialty === i ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>{s.desc}</p>
                            </div>
                         </div>
                         <div className={`w-12 h-12 rounded-full border border-[var(--on-surface)]/10 flex items-center justify-center transition-all ${activeSpecialty === i ? 'bg-[var(--primary)] text-white border-transparent rotate-45' : ''}`}>
                            <i className="ri-arrow-right-up-line text-xl"></i>
                         </div>
                      </motion.div>
                    ))}
                  </div>
               </div>

               <div className="hidden lg:block sticky top-40 aspect-[4/5] bg-[var(--on-surface)] rounded-[4rem] overflow-hidden p-16 flex flex-col justify-end group">
                  {/* Dynamic Color Overlay */}
                  <motion.div 
                    key={activeSpecialty ?? 'default'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: activeSpecialty !== null 
                        ? specialties[activeSpecialty].color 
                        : 'rgba(184, 20, 0, 0.1)' 
                    }}
                  />
                  <div className="absolute inset-0 dot-grid-svg opacity-10" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeSpecialty ?? 'default'}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      className="relative z-10"
                    >
                       <p className="label-md text-white/40 mb-4 uppercase tracking-widest">
                        {activeSpecialty !== null ? specialties[activeSpecialty].mission : "Studio Mission"}
                       </p>
                       <h2 className="display-lg text-3xl md:text-5xl text-white mb-8">
                         {activeSpecialty !== null 
                           ? <>{specialties[activeSpecialty].title.split(' ')[0]} <br /> {specialties[activeSpecialty].title.split(' ')[1]}</>
                           : <>Curating The <br /> Future of Web</>
                         }
                       </h2>
                       <p className="body-lg text-white/50 max-w-sm">
                        {activeSpecialty !== null 
                          ? specialties[activeSpecialty].details 
                          : "We believe software should feel like high-end furniture: functional, durable, and architecturally beautiful."
                        }
                       </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  <motion.div 
                    key={activeSpecialty !== null ? `icon-${activeSpecialty}` : 'default-icon'}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-16 right-16 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/40"
                  >
                     <i className={`${activeSpecialty !== null ? specialties[activeSpecialty].icon : 'ri-command-line'} text-2xl`}></i>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. ABOUT / AUTHORITY - Skills & Testimonials */}
      <Suspense fallback={<SectionSkeleton height="h-[60vh]" />}>
        <SkillsSection />
      </Suspense>
      
      <div className="bg-[var(--surface-container-low)] py-24 md:py-40 rounded-[3rem] md:rounded-[5rem] overflow-hidden">
        <Suspense fallback={<SectionSkeleton height="h-[40vh]" />}>
          <Testimonials />
        </Suspense>
      </div>

      {/* 5. CTA SECTION - Conversion */}
      <section className="relative py-40 md:py-64 overflow-hidden text-center">
         <div className="absolute inset-0 dot-grid-svg opacity-40" />
         
         <div className="container-editorial relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase">Collaborate</p>
               <h2 className="display-lg text-[10vw] mb-16 leading-none">Let's Compose <br /> Your Symphony.</h2>
               
               <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <Magnetic strength={0.2}>
                    <Link to="/contact" className="btn-primary py-10 px-24 text-2xl">
                       Start A Project
                    </Link>
                  </Magnetic>
                  
                  <Link to="/projects" className="label-md underline underline-offset-8 decoration-[var(--primary)] opacity-40 hover:opacity-100 transition-opacity p-6">
                     Browse Archive
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      <Suspense fallback={<SectionSkeleton height="h-[30vh]" />}>
        <Newsletter />
      </Suspense>
      
      <div className="mt-24 md:mt-40">
        <Suspense fallback={<div className="h-64" />}>
          <Footer />
        </Suspense>
      </div>
    </main>
  );
}

export default Landing;