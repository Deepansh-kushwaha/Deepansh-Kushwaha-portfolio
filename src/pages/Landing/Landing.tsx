import { useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../../components/Magnetic";

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
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  
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
                   <Link 
                     to="/contact" 
                     className="btn-primary group text-lg md:text-xl relative overflow-hidden w-full md:w-auto justify-center"
                   >
                     <span>Start a Project</span>
                     <i className="ri-arrow-right-up-line transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                   </Link>
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
      <section className="py-32 md:py-64 bg-[var(--surface)] relative z-20">
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
                  
                  <div className="space-y-0">
                    {[
                      { id: "01", title: "Interaction Design", desc: "Fluid motion and tactile digital experiences built on psychology and physics." },
                      { id: "02", title: "Global Engineering", desc: "Enterprise React architectures that scale infinitely without compromising speed." },
                      { id: "03", title: "Creative WebGL", desc: "Pushing the browser to its limits with custom shaders and 3D environments." }
                    ].map((s, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group py-12 border-b border-[var(--on-surface)]/10 hover:pr-8 transition-all cursor-crosshair flex justify-between items-center"
                      >
                         <div className="flex gap-8 items-start">
                            <span className="label-md text-[var(--primary)] group-hover:scale-110 transition-transform">{s.id}</span>
                            <div className="max-w-md">
                               <h3 className="headline-lg text-2xl md:text-3xl mb-4 group-hover:text-[var(--primary)] transition-colors">{s.title}</h3>
                               <p className="body-lg opacity-40 group-hover:opacity-100 transition-opacity">{s.desc}</p>
                            </div>
                         </div>
                         <div className="w-12 h-12 rounded-full border border-[var(--on-surface)]/10 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                            <i className="ri-arrow-right-up-line text-xl"></i>
                         </div>
                      </motion.div>
                    ))}
                  </div>
               </div>

               <div className="hidden lg:block sticky top-40 aspect-[4/5] bg-[var(--on-surface)] rounded-[4rem] overflow-hidden p-16 flex flex-col justify-end group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute inset-0 dot-grid-svg opacity-10" />
                  
                  <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                     <p className="label-md text-white/40 mb-4">Studio Mission</p>
                     <h2 className="display-lg text-3xl md:text-5xl text-white mb-8">
                       <span className="whitespace-nowrap">Curating</span> The <br /> Future of Web
                     </h2>
                     <p className="body-lg text-white/50 max-w-sm">We believe software should feel like high-end furniture: functional, durable, and architecturally beautiful.</p>
                  </div>
                  
                  <div className="absolute top-16 right-16 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/40">
                     <i className="ri-command-line text-2xl"></i>
                  </div>
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