import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Depending on complexity, a bespoke premium experience usually takes 4-8 weeks from discovery to launch."
  },
  {
    q: "What tech stack do you specialize in?",
    a: "I work primarily with React, TypeScript, and Three.js for frontend fluidity, and Node.js for scalable backend architectures."
  },
  {
    q: "Do you offer post-launch support?",
    a: "Absolutely. I provide ongoing maintenance and performance optimizations to ensure your digital experience remains state-of-the-art."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[var(--surface)]">
      <div className="container mx-auto px-6 md:px-24">
        <header className="mb-20">
          <p className="label-md text-[var(--primary)] mb-4">Inquiries</p>
          <h2 className="display-lg">Curious <br/>Mind?</h2>
        </header>

        <div className="max-w-3xl space-y-8">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="group cursor-pointer border-b border-[var(--on-surface)]/5 pb-8"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-8 text-left">
                <h3 className={`headline-lg text-xl tracking-normal transition-colors ${openIndex === i ? 'text-[var(--primary)]' : 'opacity-80'}`}>
                  {faq.q}
                </h3>
                <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-[var(--primary)]' : 'opacity-40'}`}></i>
              </div>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="body-lg opacity-60 mt-6 leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
