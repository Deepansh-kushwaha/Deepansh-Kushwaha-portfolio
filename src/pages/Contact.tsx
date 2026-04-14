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
            <p className="label-md text-[var(--primary)] mb-4">Contact</p>
            <h1 className="display-lg">GET IN <span className="text-[var(--primary)]">TOUCH</span></h1>
            <p className="body-lg opacity-60 mt-6 max-w-2xl mx-auto italic">
              "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
            </p>
          </header>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            onClick={(e) => {
              e.preventDefault();
              (window as any).lenis?.scrollTo('#contact-form');
              triggerHaptic('light');
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 group"
          >
            <span className="label-sm opacity-20 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[10px]">Scroll to message</span>
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
