import React from 'react';
import { Link } from "react-router";
import Magnetic from "../../components/Magnetic";
import MouseFollower from "../../components/MouseFollower";
import Footer from "../../components/Footer";
import Stats from "../../components/Stats";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";
import SkillsSection from "../../components/SkillsSection";

function Landing() {
  return (
    <main className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white">
      {/* 1. HERO SECTION - Big Font Styling */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 relative overflow-hidden">
        <div className="reveal stagger-1">
          <p className="label-md text-[var(--primary)] mb-8 tracking-[0.2em] animate-pulse">DEEPANSH KUSHWAHA / STUDIO</p>
          <h1 className="display-lg leading-[0.9] text-[12vw] md:text-[8vw] uppercase">
            WE ARCHITECT <br />
            <span className="text-[var(--primary)] text-outline-primary">FLUID DIGITAL</span> <br />
            SYMPHONIES.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-20 max-w-7xl">
          <div className="reveal stagger-2 max-w-lg">
            <p className="body-lg opacity-60 leading-relaxed">
              A boutique freelance agency specializing in high-end interaction design, 
              bespoke code architecture, and immersive digital storytelling for brands that refuse to blend in.
            </p>
          </div>
          
          <div className="reveal stagger-3">
            <Magnetic strength={0.1}>
              <Link to="/projects" className="btn-primary py-6 px-12 text-lg">
                View Studio Work <i className="ri-arrow-right-line"></i>
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Decorative Fluid Follower */}
        <MouseFollower />
      </section>

      {/* 2. SERVICES - Tonal Layering */}
      <section className="py-40 bg-[var(--surface-container-low)] rounded-[4rem] relative z-20">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="reveal">
              <p className="label-md text-[var(--primary)] mb-6">Capabilities</p>
              <h2 className="display-lg text-5xl mb-16 leading-tight">The Sommelier’s <br/>Specialties</h2>
              <div className="space-y-16">
                <div className="group border-b border-[var(--on-surface)]/5 pb-12 transition-all hover:pl-4">
                  <h3 className="headline-lg text-2xl tracking-normal mb-4 transition-colors group-hover:text-[var(--primary)]">Interaction Design</h3>
                  <p className="body-lg opacity-60 max-w-md">Crafting fluid motion and micro-interactions that make digital experiences feel alive and effortless.</p>
                </div>
                <div className="group border-b border-[var(--on-surface)]/5 pb-12 transition-all hover:pl-4">
                  <h3 className="headline-lg text-2xl tracking-normal mb-4 transition-colors group-hover:text-[var(--primary)]">Bespoke Engineering</h3>
                  <p className="body-lg opacity-60 max-w-md">High-performance React & TypeScript architectures built for speed, scale, and uncompromising quality.</p>
                </div>
                <div className="group border-b border-[var(--on-surface)]/5 pb-12 transition-all hover:pl-4">
                  <h3 className="headline-lg text-2xl tracking-normal mb-4 transition-colors group-hover:text-[var(--primary)]">Creative WebGL</h3>
                  <p className="body-lg opacity-60 max-w-md">Implementing custom GLSL shaders and 3D environments that redefine what's possible in the browser.</p>
                </div>
              </div>
            </div>
            
            <div className="reveal sticky top-32 aspect-[4/5] bg-[var(--surface-container)] rounded-[3rem] overflow-hidden soft-shadow flex items-center justify-center group">
               <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <i className="ri-award-line text-[12rem] opacity-5 transform group-hover:scale-110 transition-transform duration-1000"></i>
               <div className="absolute bottom-12 left-12">
                  <p className="label-md opacity-40">Boutique Agency / 2024 - Present</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS - Social Proof */}
      <Stats />

      {/* 4. SKILLS - Technical Toolkit */}
      <SkillsSection />

      {/* 5. TESTIMONIALS */}
      <Testimonials />

      {/* 6. CALL TO ACTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-10 md:p-24 bg-[var(--surface)]">
        <div className="reveal">
          <p className="label-md text-[var(--primary)] mb-8 uppercase tracking-widest">Collaborate</p>
          <h2 className="display-lg text-[10vw] mb-16 leading-[0.85]">Let’s compose <br/>your next symphony.</h2>
          <Magnetic strength={0.3}>
            <Link to="/contact" className="btn-primary py-10 px-24 text-2xl font-bold rounded-full">
              Start A Conversation
            </Link>
          </Magnetic>
        </div>
      </section>

      <Newsletter />
      
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}

export default Landing;