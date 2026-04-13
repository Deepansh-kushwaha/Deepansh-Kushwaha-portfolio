import { motion } from "framer-motion";
import { Link } from "react-router";
import Magnetic from "../../components/Magnetic";
import { getIKUrl } from "../../utils/imageKit";

const services = [
  {
    id: "01",
    title: "Website Development",
    description: "We architect high-performance digital symphonies. From immersive WebGL experiences to robust enterprise architectures, we build with precision, fluidity, and agency-grade code standards.",
    features: ["Next.js & React Specialists", "Custom WebGL & Three.js", "Performance Optimization", "Bespoke CMS Integration"],
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp",
    icon: "ri-window-line"
  },
  {
    id: "02",
    title: "Meta Ads Strategy",
    description: "Data-driven disruption for the modern brand. We engineer high-conversion Meta campaigns that go beyond simple targeting, focusing on creative storytelling and algorithmic precision.",
    features: ["Strategic Campaign Planning", "Creative Performance Audit", "A/B Dynamic Testing", "ROAS Focused Scaling"],
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp",
    icon: "ri-advertisement-line"
  },
  {
    id: "03",
    title: "Social Media Boutique",
    description: "Curated editorial storytelling for the discerning audience. We manage social ecosystems with a sommelier's precision, ensuring every post feels like a calculated brand intervention.",
    features: ["Editorial Content Curation", "Brand Voice Synthesis", "Community Engagement", "Visual Identity Guarding"],
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp",
    icon: "ri-instagram-line"
  }
];

export default function Services() {
  return (
    <main className="bg-[var(--surface)] min-h-screen pt-40 pb-32">
      <div className="container-editorial">
        {/* Hero Section - The Architectural Hook */}
        <header className="mb-32 md:mb-56 max-w-5xl">
          <p className="label-md text-[var(--primary)] mb-8 tracking-[1em] reveal uppercase">Capabilities / 24</p>
          <h1 className="display-lg mb-12 reveal stagger-1">
             ARCHITECTING <br />
             <span className="text-outline-primary italic">DIGITAL VALUE</span>
          </h1>
          <p className="body-lg text-2xl md:text-3xl opacity-50 max-w-2xl reveal stagger-2">
            A curated collection of strategic interventions designed to elevate brands through engineering excellence and editorial curation.
          </p>
        </header>

        {/* Services List - Asymmetric Editorial Layout */}
        <div className="space-y-40 md:space-y-80">
          {services.map((service, index) => (
            <section 
              key={service.id} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className={`lg:col-span-6 reveal ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-6 mb-8">
                  <span className="w-12 h-[1px] bg-[var(--primary)] opacity-40"></span>
                  <p className="label-md text-[var(--primary)]">{service.id} // {service.title}</p>
                </div>
                
                <h2 className="display-md text-5xl md:text-7xl mb-12 leading-[0.9] uppercase tracking-tighter">
                  {service.title.split(' ')[0]} <br />
                  <span className="italic font-light">{service.title.split(' ').slice(1).join(' ')}</span>
                </h2>

                <p className="body-lg text-2xl opacity-70 mb-16 leading-relaxed max-w-xl">
                  {service.description}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-16">
                  {service.features.map((feature, i) => (
                    <li key={i} className="label-md flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
                      <i className="ri-add-line text-[var(--primary)]"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Magnetic strength={0.2}>
                  <Link to="/contact" className="btn-secondary px-10 py-4 group">
                    Inquire <i className="ri-arrow-right-line ml-3 transition-transform group-hover:translate-x-2"></i>
                  </Link>
                </Magnetic>
              </div>

              {/* Image Side - Floating Tonal Card */}
              <div className={`lg:col-span-6 reveal stagger-1 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative aspect-video lg:aspect-square rounded-[4rem] overflow-hidden tonal-card soft-shadow group">
                   <motion.img 
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      src={getIKUrl(service.image, { width: 1000, quality: 90 })} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   {/* Floating Icon Cap */}
                   <div className="absolute top-12 right-12 w-20 h-20 rounded-full glass border border-white/10 flex items-center justify-center text-3xl">
                      <i className={service.icon}></i>
                   </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Global CTA - The sommelier's choice */}
        <section className="mt-64 text-center section-padding bg-[var(--surface-container-low)] rounded-[5rem] overflow-hidden relative">
          <div className="absolute inset-0 dot-grid-svg opacity-30" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="label-md text-[var(--primary)] mb-12 tracking-[1.5em] uppercase">Initiate Workflow</p>
            <h2 className="display-lg mb-20 leading-tight">
              Ready to compose <br /> your <span className="text-outline-primary">Digital Symphony?</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <Magnetic strength={0.25}>
                <Link to="/contact" className="btn-primary px-24 py-10 text-2xl shadow-xl shadow-red-900/10">
                  Start a Project
                </Link>
              </Magnetic>
              <Link to="/catalogue" className="label-md flex items-center justify-center underline underline-offset-8 opacity-40 hover:opacity-100">
                View Works Archive
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
