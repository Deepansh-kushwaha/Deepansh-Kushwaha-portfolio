import { Link } from "react-router";
import { motion } from "framer-motion";

import "./Home.css";
import Footer from "../../components/Footer";
import Swiperslide from "../../components/swiperslide/Swiperslide";
import SkillsSection from "../../components/SkillsSection";
import Magnetic from "../../components/Magnetic";
import MouseFollower from "../../components/MouseFollower";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";

function Home() {
  return (
    <>
      <main className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white">
        <section className="hero dot-grid-svg min-h-screen flex relative overflow-hidden pt-20">
          <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 items-center h-full relative z-10 py-20">
            <div className="flex flex-col justify-center h-full">
              <div className="reveal stagger-1">
                <p className="label-md text-[var(--primary)] mb-4">Personal Portfolio</p>
                <h1 className="display-lg max-w-4xl text-6xl md:text-8xl">
                  DEEPANSH <br />
                  <span className="text-[var(--primary)] text-outline-primary">KUSHWAHA</span>
                </h1>
              </div>

              <div className="reveal stagger-2 mt-12 md:max-w-md">
                <p className="body-lg text-[var(--on-surface)] opacity-80 leading-relaxed">
                  Curating digital experiences through intentional design and fluid motion. A sommelier of code and aesthetics.
                </p>
              </div>

              <div className="reveal stagger-3 mt-16">
                <Magnetic strength={0.1}>
                  <Link to="/about" className="btn-primary group py-6 px-12">
                    Hire Me <i className="ri-arrow-right-up-line inline-block transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"></i>
                  </Link>

                </Magnetic>
              </div>
            </div>

            {/* Enlarged & Beautified Spreaded Cards Section */}
            <div className="relative h-[600px] mt-20 lg:mt-0 hidden xl:block">
              {[
                { 
                  title: "Fluid Interaction", 
                  accent: "from-blue-500/30", 
                  glow: "shadow-blue-500/20",
                  icon: "ri-cursor-fill", 
                  rotate: -12, x: -80, y: 0,
                  desc: "Choreographing sensory digital journeys through motion."
                },
                { 
                  title: "High Engineering", 
                  accent: "from-orange-500/30", 
                  glow: "shadow-orange-500/20",
                  icon: "ri-terminal-box-fill", 
                  rotate: 0, x: 60, y: -60,
                  desc: "Bespoke, scalable architectures built for tomorrow."
                },
                { 
                  title: "Vivid Creative", 
                  accent: "from-purple-500/30", 
                  glow: "shadow-purple-500/20",
                  icon: "ri-magic-line", 
                  rotate: 12, x: 220, y: 40,
                  desc: "Designing soul-led experiences for premium brands."
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, x: 0, y: 150, rotate: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: card.x, 
                    y: card.y, 
                    rotate: card.rotate 
                  }}
                  transition={{ 
                    duration: 1.4, 
                    delay: 0.6 + (i * 0.25), 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ 
                    y: card.y - 40, 
                    scale: 1.08, 
                    rotate: card.rotate * 0.3,
                    zIndex: 100,
                    transition: { duration: 0.4, ease: "backOut" }
                  }}
                  className={`absolute w-80 aspect-[0.75] glass rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/20 shadow-2xl backdrop-blur-3xl bg-gradient-to-br ${card.accent} to-transparent cursor-pointer group hover:${card.glow}`}
                >
                  {/* Grain Layer */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-[2.5rem]"></div>
                  
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center border border-white/10 group-hover:bg-[var(--primary)] group-hover:border-transparent transition-all duration-500 shadow-inner">
                    <i className={`${card.icon} text-3xl text-[var(--primary)] group-hover:text-white group-hover:scale-110 transition-all duration-500`}></i>
                  </div>


                  <div className="relative z-10">
                    <p className="label-md opacity-40 mb-3 tracking-widest uppercase text-xs">Capability // 0{i + 1}</p>
                    <h3 className="headline-md font-bold tracking-tight text-3xl mb-4 leading-none">{card.title}</h3>
                    <p className="body-sm opacity-60 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>

                  {/* Highlight Shine */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>
                </motion.div>
              ))}
            </div>

          </div>

          <MouseFollower />
        </section>


        <section id="features" className="bg-[var(--surface)]">
          <SkillsSection />
        </section>

        <section id="projects" className="p-10 md:p-24 flex flex-col justify-center min-h-screen bg-[var(--surface-container-low)]">
          <div className="reveal stagger-1 mb-16">
            <p className="label-md text-[var(--primary)]">Curated Selection</p>
            <h2 className="headline-lg">Selected Projects</h2>
          </div>

          <div className="reveal stagger-2">
            <Swiperslide />
          </div>

          <div className="flex items-center justify-center mt-20 reveal stagger-3">
            <Magnetic strength={1}>
              <Link to="/projects" className="btn-primary">
                View All Projects <i className="ri-arrow-right-line"></i>
              </Link>
            </Magnetic>
          </div>
        </section>

        <Testimonials />

        <section className="min-h-screen flex flex-col justify-center items-center text-center p-10 md:p-24 relative overflow-hidden">
          <div className="reveal stagger-1">
            <p className="label-md text-[var(--primary)] text-center">Inquiries</p>
            <h2 className="display-lg text-center mb-16">Let's Create<br />Something Fluid</h2>
          </div>

          <div className="reveal stagger-2 flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-10">
            <Magnetic strength={0.5}>
              <a href="https://www.linkedin.com/in/deepansh-kushwaha" target="_blank" rel="noreferrer"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-linkedin-box-line"></i>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a href="https://github.com/Deepansh-kushwaha" target="_blank" rel="noreferrer"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-github-line"></i>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a href="https://instagram.com/deepansh_kushwaha" target="_blank" rel="noreferrer"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a href="mailto:deepanshkushwaha9@gmail.com"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-mail-line"></i>
              </a>
            </Magnetic>
          </div>
        </section>

        <Newsletter />

        <div className="mt-20 w-full relative z-10">
          <Footer />
        </div>
      </main>
    </>
  );
}

export default Home;

