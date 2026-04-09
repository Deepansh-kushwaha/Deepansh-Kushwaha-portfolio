import React from 'react';

const stats = [
  { label: 'Projects Completed', value: '40+' },
  { label: 'Years Experience', value: '2+' },
  { label: 'Happy Clients', value: '25+' },
  { label: 'Awards Won', value: '05' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-[var(--surface-container-low)]">
      <div className="container mx-auto px-6 md:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center reveal stagger-1">
              <span className="display-lg text-[var(--primary)] text-6xl mb-4">
                {stat.value}
              </span>
              <span className="label-md opacity-40 uppercase tracking-widest text-xs font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
