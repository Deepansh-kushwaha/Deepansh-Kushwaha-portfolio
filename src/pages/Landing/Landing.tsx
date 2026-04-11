import { useLayoutEffect, useRef } from 'react';
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../../components/Magnetic";
import MouseFollower from "../../components/MouseFollower";
import Footer from "../../components/Footer";
import Stats from "../../components/Stats";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";
import SkillsSection from "../../components/SkillsSection";
import HeroScene from "../../components/HeroScene";

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const heroTitleRef = useRef(null);
  const marqueeRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transform for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic text reveal
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 2.2
      });

      // Horizontal Marquee Scroll Animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, heroTitleRef);
    return () => ctx.revert();
  }, []);

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };


  return (
    <main className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white relative overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 relative">
        <HeroScene />
        
        <div ref={heroTitleRef} className="relative z-10">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.5, delay: 2 }}
            className="label-md text-[var(--primary)] mb-8 tracking-[0.2em]"
          >
            DEEPANSH KUSHWAHA / STUDIO
          </motion.p>
          <h1 className="display-lg leading-[0.9] text-[12vw] md:text-[8vw] uppercase overflow-hidden">
            <span className="hero-line block">WE ARCHITECT</span>
            <span className="hero-line block text-[var(--primary)] text-outline-primary">FLUID DIGITAL</span>
            <span className="hero-line block">SYMPHONIES.</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-20 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.8 }}
            className="max-w-lg"
          >
            <p className="body-lg opacity-60 leading-relaxed">
              A boutique freelance agency specializing in high-end interaction design, 
              bespoke code architecture, and immersive digital storytelling for brands that refuse to blend in.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 3 }}
            className="relative z-50"
          >
            <Magnetic strength={0.1}>
              <Link to="/projects" className="btn-primary py-6 px-12 text-lg group cursor-pointer pointer-events-auto flex items-center gap-4">
                View Studio Work <i className="ri-arrow-right-line inline-block transition-transform group-hover:translate-x-2"></i>
              </Link>
            </Magnetic>
          </motion.div>

        </div>

        <MouseFollower />
      </section>

      {/* 2. SCROLL MARQUEE */}
      <section ref={marqueeRef} className="py-20 border-y border-[var(--on-surface)]/5 overflow-hidden bg-[var(--surface)] relative z-10">
        <div className="marquee-inner flex whitespace-nowrap gap-20 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-20">
              <span className="display-lg text-[10vw] leading-none opacity-20 uppercase font-black">Studio</span>
              <span className="w-4 h-4 rounded-full bg-[var(--primary)]"></span>
              <span className="display-lg text-[10vw] leading-none opacity-40 uppercase text-outline-primary text-transparent font-black italic">Fluidity</span>
              <span className="w-4 h-4 rounded-full bg-[var(--primary)]"></span>
              <span className="display-lg text-[10vw] leading-none opacity-20 uppercase font-black">Precision</span>
              <span className="w-4 h-4 rounded-full bg-[var(--primary)]"></span>
            </div>
          ))}
        </div>
      </section>


      {/* 3. SERVICES */}
      <section className="py-40 bg-[var(--surface-container-low)] rounded-[4rem] relative z-20">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div 
              style={{ y: y1 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={revealVariants} className="label-md text-[var(--primary)] mb-6">Capabilities</motion.p>
              <motion.h2 variants={revealVariants} className="display-lg text-5xl mb-16 leading-tight">The Sommelier’s <br/>Specialties</motion.h2>
              <div className="space-y-16">
                {[
                  { title: "Interaction Design", desc: "Crafting fluid motion and micro-interactions that make digital experiences feel alive and effortless." },
                  { title: "Bespoke Engineering", desc: "High-performance React & TypeScript architectures built for speed, scale, and uncompromising quality." },
                  { title: "Creative WebGL", desc: "Implementing custom GLSL shaders and 3D environments that redefine what's possible in the browser." }
                ].map((service, i) => (
                  <motion.div 
                    key={i}
                    variants={revealVariants}
                    className="group border-b border-[var(--on-surface)]/5 pb-12 transition-all hover:pl-4"
                  >
                    <h3 className="headline-lg text-2xl tracking-normal mb-4 transition-colors group-hover:text-[var(--primary)]">{service.title}</h3>
                    <p className="body-lg opacity-60 max-w-md">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="sticky top-32 aspect-[4/5] bg-[var(--surface-container)] rounded-[3rem] overflow-hidden soft-shadow flex items-center justify-center group"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <i className="ri-award-line text-[12rem] opacity-5 transform group-hover:scale-110 transition-transform duration-1000"></i>
               <div className="absolute bottom-12 left-12">
                  <p className="label-md opacity-40">Boutique Agency / 2024 - Present</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Stats />
      <SkillsSection />
      <Testimonials />

      {/* 6. CALL TO ACTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-10 md:p-24 bg-[var(--surface)]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="label-md text-[var(--primary)] mb-8 uppercase tracking-widest">Collaborate</p>
          <h2 className="display-lg text-[10vw] mb-16 leading-[0.85]">Let’s compose <br/>your next symphony.</h2>
          <Magnetic strength={0.3}>
            <Link to="/contact" className="btn-primary py-10 px-24 text-2xl font-bold rounded-full inline-block">
              Start A Conversation
            </Link>
          </Magnetic>
        </motion.div>
      </section>

      <Newsletter />
      
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}

export default Landing;