import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  },
  {
    quote: "The final product was more than a website; it was a calibrated emotional experience. Highly recommended.",
    author: "Alex Rivera",
    role: "Brand Architect",
  }
];

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Swipe logic
  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-32 md:py-48 bg-[var(--surface)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <header className="reveal">
            <p className="label-md text-[var(--primary)] mb-6 uppercase tracking-widest">Client Voices</p>
            <h2 className="display-lg text-5xl md:text-7xl mb-8">Words From <br/>The Flow</h2>
            <p className="body-lg opacity-60 max-w-md">
              Grab a card to explore the experiences of partners who have joined the studio on our digital journey.
            </p>
          </header>

          <div className="relative h-[450px] w-full max-w-lg mx-auto lg:ml-auto perspective-1000">
            <AnimatePresence initial={false}>
              {[...testimonials].reverse().map((t, i) => {
                const reverseIndex = (testimonials.length - 1) - i;
                if (reverseIndex < index) return null;
                if (reverseIndex > index + 2) return null;

                const isTop = reverseIndex === index;
                const dist = reverseIndex - index;
                const offset = dist * 25;
                const scale = 1 - dist * 0.04;
                const rotation = dist === 0 ? 0 : (dist === 1 ? 6 : -6); // Spreaded effect

                return (
                  <motion.div
                    key={reverseIndex}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 100 || info.offset.x < -100) next();
                    }}
                    initial={isTop ? { x: 0, opacity: 0, scale: 0.9, rotate: 0 } : { x: 0, opacity: 1 }}
                    animate={{ 
                      x: 0, 
                      y: offset, 
                      scale: scale, 
                      rotate: rotation,
                      opacity: 1,
                      zIndex: testimonials.length - reverseIndex 
                    }}
                    exit={{ x: 500, opacity: 0, scale: 0.5, rotate: 20, transition: { duration: 0.5 } }}
                    whileDrag={{ scale: 1.02, rotate: 0, cursor: "grabbing" }}
                    className={`absolute inset-0 p-10 md:p-12 rounded-[3.5rem] bg-[var(--surface-container-low)] soft-shadow flex flex-col justify-between border border-[var(--on-surface)]/10 ${isTop ? 'cursor-grab' : 'pointer-events-none'}`}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    <i className="ri-double-quotes-l text-5xl text-[var(--primary)] opacity-30 mb-6"></i>
                    <p className="body-lg italic opacity-80 leading-relaxed text-lg md:text-xl mb-8">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                          <i className="ri-user-heart-line text-[var(--primary)] text-xl"></i>
                       </div>
                       <div>
                          <h4 className="headline-lg text-lg tracking-normal leading-none mb-1">{t.author}</h4>
                          <p className="label-md opacity-40 uppercase text-[10px] tracking-widest">{t.role}</p>
                       </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

