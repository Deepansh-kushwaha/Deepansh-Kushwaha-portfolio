import { Link } from "react-router"
import Magnetic from "../../components/Magnetic"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getIKUrl } from "../../utils/imageKit"
import { triggerHaptic } from "../../utils/haptics"

function Projects() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Reveal text animations
    gsap.from(".reveal-text", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    });

    // Parallax images
    gsap.utils.toArray(".parallax-wrap").forEach((container: any) => {
      const img = container.querySelector("img");
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  })

  const highlights = [
    { title: "Lumina", category: "E-Commerce", image: "portfolio/Jewellery3.webp", slug: "lumina-jewelry" },
    { title: "Skyward", category: "Property Tech", image: "portfolio/real%20estate.webp", slug: "skyward-portal" },
  ];

  return (
    <main className="bg-[var(--surface)] min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="container-editorial">
        {/* Editorial Hero */}
        <header className="mb-32 md:mb-64">
          <div className="max-w-4xl">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase text-xs reveal-text">Masterclass Archive</p>
            <h1 className="display-lg leading-[0.85] text-5xl md:text-[9vw] uppercase font-black italic reveal-text">
              ARCHITECTING <br />
              <span className="text-outline-primary whitespace-nowrap">IMPACT.</span>
            </h1>
          </div>
          <p className="body-lg max-w-sm mt-12 opacity-40 italic reveal-text">
            "We don't just build websites; we design digital instruments that resonate with precision and emotion."
          </p>

          <div className="mt-20 md:mt-32 reveal-text">
             <button 
               onClick={() => (window as any).lenis?.scrollTo('#archive')}
               className="group flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity"
             >
                <span className="label-md uppercase tracking-[0.4em] text-[10px]">SCROLL TO EXPLORE</span>
                <div className="w-[1px] h-20 bg-[var(--on-surface)] relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-[var(--primary)] -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                </div>
                <i className="ri-arrow-down-line text-2xl group-hover:translate-y-2 transition-transform duration-500"></i>
             </button>
          </div>
        </header>

        {/* Viewing Archive Section - Reprioritized to Top */}
        <section id="archive" className="py-20 md:py-32 flex flex-col justify-center items-start relative overflow-hidden group border-y border-[var(--on-surface)]/10 mb-32 md:mb-48 bg-[var(--surface-container-low)]/30">
            <div className="reveal stagger-2 max-w-4xl relative z-10">
                <p className="label-md text-[var(--primary)] mb-8 uppercase tracking-widest text-xs font-black">Private Access</p>
                <h2 className="display-lg text-4xl md:text-8xl leading-[0.8] uppercase tracking-tighter mb-16 font-black">
                   VIEW ALL <br/> <span className="text-outline-dark italic">OFF-GRID</span> WORKS
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <Magnetic strength={0.3}>
                        <a 
                          href="https://wa.me/918882364435?text=I'd%20like%20to%20view%20your%20full%20project%20archive%20and%20expert%20case%20studies." 
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => triggerHaptic('medium')}
                          className="btn-primary py-8 px-16 text-2xl rounded-full flex items-center gap-6 text-white group"
                        >
                            <i className="ri-whatsapp-line text-3xl text-white group-hover:rotate-12 transition-transform"></i> CONNECT ON WHATSAPP
                        </a>
                    </Magnetic>
                    <p className="label-md opacity-40 max-w-sm text-sm tracking-widest leading-loose italic">
                      Contact the studio directly to receive a curated portfolio of our unpublished enterprise solutions and architectural case studies.
                    </p>
                </div>
            </div>
            <div className="absolute right-0 top-0 w-[500px] h-full bg-gradient-to-l from-[var(--primary)]/5 to-transparent blur-[100px] -z-10" />
        </section>

        {/* Highlight Section - Massive Cards */}
        <section className="space-y-40 md:space-y-64 mb-64">
          {highlights.map((item, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}>
              <div className={`lg:col-span-12 group cursor-pointer`}>
                 <Link to={`/catalogue/${item.slug}`} className="block">
                    <div className="parallax-wrap relative h-[60vh] md:h-[80vh] w-full overflow-hidden rounded-[4rem] bg-[var(--surface-container-high)] soft-shadow transition-all duration-700 group-hover:scale-[0.99]">
                        <img 
                          src={getIKUrl(item.image, { width: 1600, quality: 90 })} 
                          className="absolute inset-0 w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        
                        <div className="absolute bottom-16 left-16 md:bottom-24 md:left-24 z-10">
                           <p className="label-md text-white/50 mb-4 uppercase tracking-[0.5em] text-xs">0{i+1} / {item.category}</p>
                           <h2 className="display-lg text-white text-5xl md:text-8xl leading-none uppercase font-black italic">{item.title}</h2>
                        </div>
                    </div>
                 </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Studio Philosophy - Horizontal Hook */}
        <section className="py-32 md:py-64 bg-[var(--surface-container-low)] rounded-[5rem] md:rounded-[10rem] mx-4 md:mx-0 relative overflow-hidden mb-64 group">
            <div className="absolute inset-0 dot-grid-svg opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
            <div className="relative z-10 text-center container-editorial">
               <p className="label-md text-[var(--primary)] mb-12 uppercase tracking-[1em] text-xs font-black">Our Logic</p>
               <h2 className="display-lg text-4xl md:text-7xl uppercase leading-tight font-black italic max-w-5xl mx-auto">
                 EVERY PIXEL IS A <br /> <span className="text-outline-dark">CONVERTING ASSET.</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-left max-w-6xl mx-auto">
                  {[
                    { t: "STRATEGY", d: "Data-driven interventions designed for measurable growth." },
                    { t: "CRAFT", d: "High-fidelity execution where engineering meets emotion." },
                    { t: "GROWTH", d: "Iterative optimization to ensure long-term brand authority." }
                  ].map((step, i) => (
                    <div key={i} className="p-10 bg-[var(--surface)]/50 backdrop-blur-xl rounded-[3rem] border border-white/5 group/card hover:bg-[var(--primary)] transition-all duration-500">
                       <p className="label-md text-[var(--primary)] mb-6 group-hover/card:text-white transition-colors">/ 0{i+1}</p>
                       <h3 className="headline-lg text-2xl mb-4 group-hover/card:text-white transition-colors">{step.t}</h3>
                       <p className="body-lg text-sm opacity-40 group-hover/card:opacity-100 group-hover/card:text-white/80 transition-all font-light">{step.d}</p>
                    </div>
                  ))}
               </div>
            </div>
        </section>

        {/* Final Masterclass Footer CTA */}
        <section className="py-40 md:py-64 text-center">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase text-xs font-black">Partnership</p>
            <h2 className="display-lg mb-16 text-5xl md:text-[10vw] leading-[0.8] uppercase font-black italic">
               ARCHITECT <br /> <span className="text-outline-dark">YOUR SUCCESS.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <Magnetic strength={0.25}>
                <Link 
                  to="/contact" 
                  onClick={() => triggerHaptic('heavy')}
                  className="btn-primary px-16 py-8 md:px-24 md:py-10 text-2xl group shadow-2xl shadow-red-900/20 block text-center font-black italic text-white"
                >
                  GET A CUSTOM QUOTE <i className="ri-arrow-right-line ml-4 group-hover:translate-x-3 transition-transform text-white"></i>
                </Link>
              </Magnetic>
              <Link 
                to="/contact" 
                className="label-md uppercase opacity-40 hover:opacity-100 tracking-[0.4em] transition-all hover:text-[var(--primary)] text-sm whitespace-nowrap"
              >
                BOOK CONSULTATION / 15 MIN
              </Link>
            </div>
        </section>
      </div>
    </main>
  )
}

export default Projects
