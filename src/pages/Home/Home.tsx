import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

import MouseFollower from "../../components/MouseFollower";
import Magnetic from "../../components/Magnetic";

// Lazy Components
const Footer = lazy(() => import("../../components/Footer"));
const Swiperslide = lazy(() => import("../../components/swiperslide/Swiperslide"));
const SkillsSection = lazy(() => import("../../components/SkillsSection"));
const Testimonials = lazy(() => import("../../components/Testimonials"));
const Newsletter = lazy(() => import("../../components/Newsletter"));

function Home() {
  return (
    <main className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white relative">
      <MouseFollower />
      
      {/* 1. HERO SECTION - Personal Branding */}
      <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
          <div className="reveal">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[0.5em] uppercase">Creative Engineer</p>
            <h1 className="display-lg mb-12">
              DEEPANSH <br />
              <span className="text-outline-primary">KUSHWAHA</span>
            </h1>
            
            <p className="body-lg max-w-md mb-16 opacity-60">
              Curating digital experiences through intentional design and fluid motion. A sommelier of code and aesthetics.
            </p>

            <div className="flex items-center gap-8">
              <Magnetic strength={0.15}>
                <Link to="/contact" className="btn-primary">
                  Initiate Inquiry <i className="ri-arrow-right-up-line"></i>
                </Link>
              </Magnetic>
              <Link to="/catalogue" className="label-md underline underline-offset-8 opacity-40 hover:opacity-100 transition-opacity">
                Explore Studio
              </Link>
            </div>
          </div>

          {/* Spreaded Cards - Editorial Refactor */}
          <div className="relative h-[500px] hidden xl:block perspective-[2000px]">
            {[
              { 
                title: "Fluid Interaction", 
                accent: "rgba(184, 20, 0, 0.05)", 
                icon: "ri-cursor-fill", 
                rotate: -8, x: -40, y: 0,
                desc: "Choreographing sensory digital journeys through motion."
              },
              { 
                title: "High Engineering", 
                accent: "rgba(27, 28, 30, 0.03)", 
                icon: "ri-terminal-box-fill", 
                rotate: 0, x: 80, y: -40,
                desc: "Bespoke, scalable architectures built for tomorrow."
              },
              { 
                title: "Vivid Creative", 
                accent: "rgba(227, 36, 10, 0.05)", 
                icon: "ri-magic-line", 
                rotate: 8, x: 200, y: 40,
                desc: "Designing soul-led experiences for premium brands."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, rotate: 0 }}
                animate={{ opacity: 1, x: card.x, y: card.y, rotate: card.rotate }}
                transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: card.y - 30, scale: 1.05, rotate: card.rotate * 0.5, zIndex: 50 }}
                className="absolute w-72 aspect-[3/4] glass rounded-[3rem] p-10 flex flex-col justify-between soft-shadow border border-[var(--on-surface)]/5 group"
                style={{ backgroundColor: card.accent }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] flex items-center justify-center soft-shadow group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-700">
                  <i className={`${card.icon} text-2xl text-[var(--primary)] group-hover:text-white transition-all`}></i>
                </div>

                <div>
                  <p className="label-md opacity-20 mb-3 tracking-tighter">0{i + 1} // Expertise</p>
                  <h3 className="display-lg text-2xl mb-4 leading-none">{card.title}</h3>
                  <p className="body-lg text-sm opacity-50">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[var(--primary)]/5 rounded-full blur-[120px] -z-10 translate-x-1/4 translate-y-1/4" />
      </section>

      {/* 2. SKILLS - The Technical Foundation */}
      <section className="bg-[var(--surface-container-low)] rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-8">
        <Suspense fallback={null}>
          <SkillsSection />
        </Suspense>
      </section>

      {/* 3. PROJECTS - The Track Record */}
      <section className="section-padding container-editorial">
        <div className="reveal mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <p className="label-md text-[var(--primary)] mb-6 tracking-[0.5em]">Collections</p>
            <h2 className="display-lg text-4xl md:text-6xl">Selected <br /> Interventions</h2>
          </div>
          <p className="body-lg opacity-40 max-w-xs italic text-right">Curated projects that redefine the intersection of commerce and art.</p>
        </div>

        <div className="reveal stagger-1">
          <Suspense fallback={null}>
            <Swiperslide />
          </Suspense>
        </div>

        <div className="flex justify-center mt-20 reveal stagger-2">
          <Magnetic strength={0.2}>
            <Link to="/catalogue" className="btn-primary px-16 py-8">
              Full Catalogue <i className="ri-arrow-right-line"></i>
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* 4. TRUST - Identity & Global Reach */}
      <div className="py-20 bg-[var(--surface)]">
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
      </div>

      {/* 5. CALL TO ACTION - Connecting */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-svg opacity-30" />
        
        <div className="reveal relative z-10">
          <p className="label-md text-[var(--primary)] mb-12 tracking-[1.5em] uppercase">Connect</p>
          <h2 className="display-lg text-[12vw] md:text-[8vw] mb-16 leading-none">Let's Create <br /> Something Fluid.</h2>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-12">
            {[
              { icon: "ri-linkedin-box-line", link: "https://www.linkedin.com/in/deepansh-kushwaha" },
              { icon: "ri-github-line", link: "https://github.com/Deepansh-kushwaha" },
              { icon: "ri-instagram-line", link: "https://instagram.com/deepansh_kushwaha" },
              { icon: "ri-mail-line", link: "mailto:deepanshkushwaha9@gmail.com" }
            ].map((social, i) => (
              <Magnetic key={i} strength={0.3}>
                <a 
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full glass flex items-center justify-center text-3xl hover:bg-[var(--primary)] hover:text-white transition-all duration-700 soft-shadow border border-[var(--on-surface)]/5"
                >
                  <i className={social.icon}></i>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Newsletter />
      </Suspense>
      
      <div className="mt-20">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </main>
  );
}

export default Home;
