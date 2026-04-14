import { useParams, Link } from "react-router";
import { works } from "../../data/works";
import { motion } from "framer-motion";
import { getIKUrl } from "../../utils/imageKit";
import Magnetic from "../../components/Magnetic";
import { triggerHaptic } from "../../utils/haptics";
import { useEffect } from "react";

const CaseStudy = () => {
  const { id } = useParams();
  const work = works.find((w) => w.slug === id || w.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
        <div className="text-center">
          <h1 className="display-lg opacity-20 mb-8">Not Found</h1>
          <Link to="/catalogue" className="btn-primary px-12 py-4">Return to Catalogue</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[var(--surface)] min-h-screen selection:bg-[var(--primary)] selection:text-white pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pt-40 overflow-hidden">
        <div className="container-editorial relative z-10 px-4 md:px-0 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[var(--primary)]"></span>
              <p className="label-md text-[var(--primary)] uppercase tracking-[0.5em] text-xs font-black">{work.category} / {work.year}</p>
            </div>
            <h1 className="display-lg text-6xl md:text-[8vw] uppercase leading-[0.8] tracking-tighter italic font-black">
              {work.title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-outline-primary">{work.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="body-lg mt-12 max-w-2xl text-2xl md:text-3xl italic opacity-60 leading-tight">
              "{work.description}"
            </p>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent z-10" />
          <img 
            src={getIKUrl(work.image, { width: 1920, quality: 90 })} 
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
            alt=""
          />
        </motion.div>
      </section>

      {/* Overview & Metadata */}
      <section className="py-32 md:py-48 border-t border-[var(--on-surface)]/5">
        <div className="container-editorial px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <p className="label-md text-[var(--primary)] mb-8 uppercase tracking-widest text-xs font-black">The Overview</p>
              <p className="body-lg text-2xl md:text-4xl leading-snug opacity-80">
                {work.challenge}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-12">
              <div className="space-y-4">
                <p className="label-md opacity-30 text-[10px] uppercase tracking-widest">Client</p>
                <p className="headline-lg text-2xl uppercase font-black">{work.client}</p>
              </div>
              <div className="space-y-4">
                <p className="label-md opacity-30 text-[10px] uppercase tracking-widest">Platform</p>
                <p className="headline-lg text-2xl uppercase font-black">{work.platform}</p>
              </div>
              <div className="space-y-4">
                <p className="label-md opacity-30 text-[10px] uppercase tracking-widest">Year</p>
                <p className="headline-lg text-2xl uppercase font-black">{work.year}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metric (High Contrast) */}
      <section className="py-32 md:py-48 bg-[var(--surface-container-low)] rounded-[4rem] md:rounded-[7rem] mx-4 md:mx-10 overflow-hidden relative group">
        <div className="absolute inset-0 dot-grid-svg opacity-30" />
        <div className="container-editorial relative z-10 text-center">
            <p className="label-md text-[var(--primary)] mb-12 uppercase tracking-[1em] text-xs font-black">Success Metric</p>
            <h2 className="display-lg text-5xl md:text-[10vw] uppercase font-black leading-none break-words">
              {work.impact.split(' ').map((term, i) => (
                <span key={i} className={i === 0 ? "text-[var(--primary)]" : "text-outline-dark"}>
                  {term}{" "}
                </span>
              ))}
            </h2>
        </div>
      </section>

      {/* Problem & Solution Flow */}
      <section className="py-32 md:py-48">
        <div className="container-editorial px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <p className="label-md text-[var(--primary)] mb-8 uppercase tracking-widest text-xs font-black">The Problem</p>
              <h3 className="headline-lg text-4xl md:text-5xl uppercase font-black italic mb-8">THE <br /> CHALLENGE</h3>
              <p className="body-lg text-lg md:text-xl opacity-60 leading-relaxed">
                {work.challenge}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
              <p className="label-md text-[var(--primary)] mb-8 uppercase tracking-widest text-xs font-black">The Intervention</p>
              <h3 className="headline-lg text-4xl md:text-5xl uppercase font-black italic mb-8">OUR <br /> SOLUTION</h3>
              <p className="body-lg text-lg md:text-xl opacity-60 leading-relaxed">
                {work.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Showcase (Asymmetric Gallery) */}
      <section className="py-32 md:py-48">
        <div className="container-editorial px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-12 mb-12">
              <img 
                src={getIKUrl(work.image, { width: 1600, quality: 90 })} 
                className="w-full h-auto rounded-[3rem] shadow-2xl" 
                alt=""
              />
            </div>
            {work.gallery?.map((img, i) => (
              <div key={i} className={`${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5"} ${i === 1 ? "md:mt-32" : ""}`}>
                <img 
                  src={getIKUrl(img, { width: 1000, quality: 90 })} 
                  className="w-full h-auto rounded-[3rem] shadow-xl" 
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Tech Stack */}
      <section className="py-32 md:py-48 bg-[var(--surface-container-high)]/30 border-y border-[var(--on-surface)]/5">
        <div className="container-editorial px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <p className="label-md text-[var(--primary)] mb-12 uppercase tracking-widest text-xs font-black">Capabilities Deployed</p>
              <ul className="space-y-6">
                {work.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-6 group py-4 border-b border-[var(--on-surface)]/5">
                    <span className="label-md text-[var(--primary)] opacity-40">0{i+1}</span>
                    <span className="headline-lg text-2xl uppercase font-black opacity-80 group-hover:opacity-100 group-hover:translate-x-3 transition-all cursor-default">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-md text-[var(--primary)] mb-12 uppercase tracking-widest text-xs font-black">Engineering Stack</p>
              <div className="flex flex-wrap gap-4">
                {work.stack.map((tech) => (
                  <span key={tech} className="label-md px-10 py-5 rounded-full bg-[var(--surface)] text-[var(--on-surface)] border border-[var(--on-surface)]/10 text-xs tracking-widest hover:border-[var(--primary)]/40 transition-colors uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="pt-48 pb-32">
        <div className="container-editorial px-4 md:px-0 text-center">
            <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] uppercase text-xs font-black">Partnership</p>
            <h2 className="display-lg mb-16 text-5xl md:text-8xl leading-[0.85] uppercase font-black italic">
               WANT SIMILAR <br /> <span className="text-outline-dark">RESULTS?</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
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
                OR SCHEDULE A CALL / 15 MIN
              </Link>
            </div>

            <div className="mt-40 pt-20 border-t border-[var(--on-surface)]/5 flex justify-between items-center opacity-40">
               <Link to="/catalogue" className="label-md uppercase tracking-widest text-xs hover:text-[var(--primary)] transition-colors">
                  <i className="ri-arrow-left-line mr-2"></i> back to catalogue
               </Link>
               <p className="label-md uppercase tracking-widest text-[10px]">Case Study / {work.slug}</p>
            </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudy;
