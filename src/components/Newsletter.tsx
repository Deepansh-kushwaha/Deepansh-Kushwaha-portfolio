import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-[var(--surface-container-low)]">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="headline-lg mb-4">Stay in the Flow</h2>
            <p className="body-md opacity-60">
              Get an occasional dose of digital aesthetics, motion design tips, and project updates. No noise, just inspiration.
            </p>
          </div>
          
          <form className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-6 md:px-8 py-4 rounded-full bg-[var(--surface)] border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all body-md min-w-0 md:min-w-[300px] w-full"
            />
            <button type="submit" className="btn-primary py-4 px-10 whitespace-nowrap justify-center">
              Subscribe <i className="ri-send-plane-2-line"></i>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
