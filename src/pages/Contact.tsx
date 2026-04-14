import { useLayoutEffect, useRef } from "react";
import Form from "../components/Form";
import FAQ from "../components/FAQ";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { triggerHaptic } from "../utils/haptics";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
      
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
      });

      // Disable snapping when typing to prevent jitter
      const handleFocus = () => st.disable();
      const handleBlur = () => st.enable();

      const formElements = document.querySelectorAll('input, textarea');
      formElements.forEach(el => {
        el.addEventListener('focus', handleFocus);
        el.addEventListener('blur', handleBlur);
      });

      return () => {
        formElements.forEach(el => {
          el.removeEventListener('focus', handleFocus);
          el.removeEventListener('blur', handleBlur);
        });
      };
    }, containerRef);
    return () => ctx.revert();
  }, []);




  return (
    <main ref={containerRef} className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] pt-36 pb-32">
      <div className="container mx-auto px-6 md:px-24">
        
        {/* Section 1: Header */}
        <section className="snap-section min-h-[80vh] flex flex-col justify-center items-center text-center relative">
          <header className="reveal stagger-1">
            <p className="label-md text-[var(--primary)] mb-4 tracking-[0.5em] uppercase">Connect</p>
            <h1 className="display-lg leading-tight uppercase font-black italic">GET IN <span className="text-outline-primary whitespace-nowrap">TOUCH.</span></h1>
            <p className="body-lg opacity-60 mt-8 max-w-xl mx-auto italic text-lg leading-relaxed">
              "Every great architectural masterpiece begins with a conversation. Let’s initiate yours."
            </p>
          </header>

          {/* New Call Booking Option */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 md:p-12 bg-[var(--surface-container-low)] rounded-[3rem] border border-[var(--on-surface)]/5 flex flex-col md:flex-row items-center gap-10 md:gap-20 max-w-4xl mx-auto group hover:scale-[1.02] transition-transform duration-500 shadow-2xl shadow-black/5"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="label-md text-[var(--primary)] mb-4 uppercase tracking-widest text-xs font-black">Direct Access</p>
              <h3 className="headline-lg text-4xl md:text-5xl uppercase font-black leading-none mb-4">SCHEDULE <br /> <span className="italic">A CALL</span></h3>
              <p className="body-md opacity-40 text-sm">Prefer a verbal overview? Book a 15-minute discovery call to discuss your project requirements in person.</p>
            </div>
            
            <div className="shrink-0 flex flex-col items-center gap-4">
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => triggerHaptic('medium')}
                className="btn-primary px-12 py-5 text-xl group whitespace-nowrap shadow-xl shadow-red-900/10"
              >
                BOOK 15 MIN <i className="ri-calendar-check-line ml-3 group-hover:rotate-12 transition-transform" />
              </a>
              <span className="label-sm opacity-20 text-[10px] uppercase tracking-[0.2em] font-bold italic">Available 10AM - 6PM GMT</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            onClick={(e) => {
              e.preventDefault();
              (window as any).lenis?.scrollTo('#contact-form');
              triggerHaptic('light');
            }}
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 group"
          >
            <span className="label-sm opacity-20 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[10px]">Or Brief us manually</span>
            <i className="ri-arrow-down-s-line text-2xl text-[var(--primary)]"></i>
          </motion.div>
        </section>

        {/* Section 2: Form */}
        <section id="contact-form" className="snap-section min-h-screen flex flex-col justify-center items-center py-20">
          <div className="w-full reveal stagger-2">
            <Form />
          </div>
        </section>

        {/* Section 3: FAQ */}
        <section className="snap-section min-h-screen flex flex-col justify-center py-24">
          <div className="reveal stagger-3">
             <FAQ />
          </div>
        </section>

      </div>
    </main>
  );
}

export default Contact;
