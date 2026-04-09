import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Deepansh's eye for detail and fluid animations transformed our brand's digital presence into something truly premium.",
    author: "Sarah Jenkins",
    role: "Creative Director, Studio X",
  },
  {
    quote: "A sommelier of code indeed. The technical performance matched the stunning aesthetics perfectly.",
    author: "Michael Chen",
    role: "Product Manager, TechFlow",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-[var(--surface)]">
      <div className="container mx-auto px-6 md:px-24">
        <header className="mb-20 text-left reveal">
          <p className="label-md text-[var(--primary)] mb-4">Feedback</p>
          <h2 className="headline-lg">Client <br/>Voices</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              className="p-12 rounded-[3rem] bg-[var(--surface-container-low)] soft-shadow flex flex-col justify-between reveal"
            >
              <i className="ri-double-quotes-l text-4xl text-[var(--primary)] opacity-20 mb-8"></i>
              <p className="body-lg italic opacity-80 leading-relaxed mb-12">
                "{t.quote}"
              </p>
              <div>
                <h4 className="headline-lg text-lg tracking-normal">{t.author}</h4>
                <p className="label-md opacity-40 mt-1 uppercase text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
