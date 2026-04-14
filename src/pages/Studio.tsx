import { motion } from "framer-motion";
import Magnetic from "../components/Magnetic";
import { getIKUrl } from "../utils/imageKit";
import { triggerHaptic } from "../utils/haptics";
import { Link } from "react-router";

const team = [
  {
    name: "Kirti Sharma",
    role: "Full-Stack Developer",
    credential: "Co-Founder",
    description: "Architecting scalable digital foundations and complex logic systems with surgical precision.",
    image: "portfolio/team/kirtiweb.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/kirti-sharmaks",
      github: "https://github.com/kirti-kirti",
      email: "mailto:kirtisharma8791@gmail.com"
    }
  },
  {
    name: "Tanu Dhiman",
    role: "Business Developer",
    credential: "Co-Founder",
    description: "Bridging the gap between complex engineering and market growth through strategic partnerships.",
    image: "portfolio/team/tannuweb.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/tanu-dhiman-b82926240",
      instagram: "https://www.instagram.com/tanudhiman647/",
      email: "mailto:tanudhiman64@gmail.com"
    }
  },
  {
    name: "Deepansh Kushwaha",
    role: "Full-Stack Developer",
    credential: "Co-Founder",
    description: "Designing sensory digital journeys through fluid motion, 3D interactivity, and bespoke code.",
    image: "portfolio/team/deepanshweb.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/deepansh-kushwaha",
      github: "https://github.com/Deepansh-kushwaha",
      email: "mailto:deepanshkushwaha9@gmail.com"
    }
  }
];

const Studio = () => {
  return (
    <main className="bg-[var(--surface)] min-h-screen pt-32 md:pt-48 pb-32 overflow-hidden selection:bg-[var(--primary)] selection:text-white">
      <div className="container-editorial">
        {/* Header - The Collective ID */}
        <header className="mb-32 md:mb-64">
           <div className="max-w-4xl">
              <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase text-xs">The Collective</p>
              <h1 className="display-lg leading-[0.85] text-5xl md:text-[9vw] uppercase font-black italic">
                THE <br />
                <span className="text-outline-primary whitespace-nowrap">FOUNDERS.</span>
              </h1>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 md:mt-24">
              <p className="body-lg opacity-40 italic max-w-sm leading-relaxed">
                "We operate as a flat hierarchy collective—where engineering meets business strategy in its purest form."
              </p>
              <p className="body-lg opacity-80 max-w-lg leading-relaxed md:ml-auto">
                Founded by three specialized freelancers, our startup is built on a radical transparency model. No managers, no bloat—just senior creators building directly for your vision.
              </p>
           </div>

           {/* Scroll Indicator */}
           <div className="mt-20 md:mt-32">
             <button 
               onClick={() => (window as any).lenis?.scrollTo('#founders')}
               className="group flex flex-col items-start gap-4 opacity-30 hover:opacity-100 transition-opacity"
             >
                <span className="label-md uppercase tracking-[0.4em] text-[10px]">MEET THE TEAM</span>
                <div className="w-[1px] h-20 bg-[var(--on-surface)] relative overflow-hidden ml-2">
                   <div className="absolute top-0 left-0 w-full h-full bg-[var(--primary)] -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                </div>
                <i className="ri-arrow-down-line text-2xl group-hover:translate-y-2 transition-transform duration-500"></i>
             </button>
           </div>
        </header>

        {/* The Founders - The Trio Beam Showcase */}
        <section id="founders" className="mb-64">
           <div className="flex flex-col lg:flex-row w-full min-h-[70vh] gap-4 md:gap-6 group/main h-fit">
              {team.map((member, i) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="relative flex-1 group overflow-hidden rounded-[3rem] md:rounded-[5rem] bg-[var(--surface-container-high)] transition-all duration-1000 lg:hover:flex-[1.8] min-h-[500px] lg:min-h-[700px]"
                >
                   {/* Background Image Layer */}
                   <div className="absolute inset-0 z-0">
                      <img 
                        src={getIKUrl(member.image, { width: 1200, quality: 90 })} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                      {/* Depth Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 z-1" />
                      <div className="absolute inset-0 bg-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   </div>

                   {/* Content Layer */}
                   <div className="relative z-10 w-full h-full p-10 md:p-14 flex flex-col justify-between">
                      {/* Top - Identity Header */}
                      <div className="flex justify-between items-start">
                         <div className="glass px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
                            <p className="label-md text-white text-[10px] uppercase font-black tracking-[0.4em]">{member.credential}</p>
                         </div>
                         <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-40 group-hover:opacity-100 transition-all">
                            <i className="ri-arrow-right-up-line text-xl" />
                         </div>
                      </div>

                      {/* Bottom - Name & Bio reveal */}
                      <div className="flex flex-col gap-6">
                         <div className="space-y-4">
                            <p className="label-md text-[var(--primary)] text-xs font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                               {member.role}
                            </p>
                            <h3 className="display-lg text-white text-3xl md:text-5xl lg:text-3xl xl:text-5xl uppercase italic leading-[0.8] drop-shadow-2xl">
                               {member.name.split(' ')[0]} <br />
                               <span className="text-outline-white whitespace-nowrap">{member.name.split(' ')[1]}</span>
                            </h3>
                         </div>

                         {/* Revealed Bio on Hover (Desktop) / Visible on Mobile */}
                         <div className="overflow-hidden lg:max-h-0 lg:group-hover:max-h-96 transition-all duration-1000 ease-[0.22, 1, 0.36, 1]">
                            <p className="body-lg text-white/60 text-[14px] md:text-base italic leading-relaxed max-w-xs mt-6 border-l border-[var(--primary)] pl-6">
                               "{member.description}"
                            </p>
                            
                            <div className="mt-8 flex gap-4">
                               {Object.entries(member.socials).map(([platform, url]) => (
                                  <a 
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-all"
                                    onClick={(e) => { e.stopPropagation(); triggerHaptic('light'); }}
                                  >
                                     <i className={`${
                                       platform === 'linkedin' ? 'ri-linkedin-line' :
                                       platform === 'github' ? 'ri-github-line' :
                                       platform === 'instagram' ? 'ri-instagram-line' :
                                       'ri-mail-line'
                                     } text-white text-sm`}></i>
                                  </a>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Philosophy / Flat Hierarchy Section */}
        <section className="py-40 md:py-64 bg-[var(--surface-container-low)] rounded-[5rem] md:rounded-[10rem] mx-4 md:mx-0 relative overflow-hidden group mb-64">
           <div className="absolute inset-0 dot-grid-svg opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
           <div className="container-editorial relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                 <p className="label-md text-[var(--primary)] mb-12 uppercase tracking-[1em] text-xs font-black">Our Structure</p>
                 <h2 className="display-lg text-4xl md:text-7xl uppercase leading-tight font-black italic mb-16">
                    FLAT BY DESIGN. <br /> <span className="text-outline-dark">ELITE BY CHOICE.</span>
                 </h2>
                 <p className="body-lg text-xl md:text-2xl opacity-60 leading-relaxed italic max-w-2xl mx-auto mb-20">
                   "We abolished the traditional agency pyramid. In our studio, you speak directly to the architects building your product."
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    <div className="p-12 glass border border-white/5 rounded-[4rem]">
                       <h3 className="headline-lg text-2xl mb-6 uppercase text-[var(--primary)]">No Friction</h3>
                       <p className="body-lg text-sm opacity-40">Direct communication with the co-founders means your vision is never lost in translation between account managers and developers.</p>
                    </div>
                    <div className="p-12 glass border border-white/5 rounded-[4rem]">
                       <h3 className="headline-lg text-2xl mb-6 uppercase text-[var(--primary)]">Pure Talent</h3>
                       <p className="body-lg text-sm opacity-40">As a collective of senior freelancers, we bring high-velocity engineering and specialized growth strategy to every project.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Call To Action */}
        <section className="py-40 text-center">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase text-xs font-black">Next Step</p>
            <h2 className="display-lg mb-16 text-5xl md:text-[9vw] leading-[0.8] uppercase font-black italic">
               BUILD WITH <br /> <span className="text-outline-dark">THE FOUNDERS.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <Magnetic strength={0.25}>
                <Link 
                  to="/contact" 
                  onClick={() => { triggerHaptic('heavy'); (window as any).lenis?.scrollTo('#contact'); }}
                  className="btn-primary px-16 py-8 md:px-24 md:py-10 text-2xl group shadow-2xl shadow-red-900/20 block text-center font-black italic text-white"
                >
                  GET A CUSTOM QUOTE <i className="ri-arrow-right-line ml-4 group-hover:translate-x-3 transition-transform text-white"></i>
                </Link>
              </Magnetic>
              <a 
                href="https://wa.me/918882364435?text=book%20a%20call%20for%20me"
                target="_blank"
                rel="noopener noreferrer"
                className="label-md uppercase opacity-40 hover:opacity-100 tracking-[0.4em] transition-all hover:text-[var(--primary)] text-sm whitespace-nowrap"
              >
                BOOK 1-ON-1 / 15 MIN
              </a>
            </div>
        </section>
      </div>
    </main>
  );
};

export default Studio;
