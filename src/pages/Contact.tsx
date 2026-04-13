import { useLayoutEffect, useRef } from "react";
import Form from "../components/Form";
import FAQ from "../components/FAQ";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        snap: {
          snapTo: (value) => {
            const sectionProgress = sections.map((_, i) => i / (sections.length - 1));
            return gsap.utils.snap(sectionProgress, value);
          },
          duration: { min: 0.5, max: 1.5 },
          delay: 0.2,
          ease: "power2.inOut"
        }
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
        <section className="snap-section min-h-[80vh] flex flex-col justify-center items-center text-center">
          <header className="reveal stagger-1">
            <p className="label-md text-[var(--primary)] mb-4">Contact</p>
            <h1 className="display-lg">GET IN <span className="text-[var(--primary)]">TOUCH</span></h1>
            <p className="body-lg opacity-60 mt-6 max-w-2xl mx-auto italic">
              "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
            </p>
          </header>
        </section>

        {/* Section 2: Form */}
        <section className="snap-section min-h-screen flex flex-col justify-center items-center py-20">
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
