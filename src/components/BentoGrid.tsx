import { motion } from "framer-motion";
import { getIKUrl } from "../utils/imageKit";

interface ImageItem {
  url: string;
  title: string;
  category: string;
}

const images: ImageItem[] = [
  { url: "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp", title: "Luminescence", category: "Identity" },
  { url: "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp", title: "Skyward", category: "Engineering" },
  { url: "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp", title: "Aurora Glass", category: "Interaction" },
  { url: "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp", title: "Kinetic Flow", category: "Creative 3D" },
  { url: "https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp?updatedAt=1776085229057", title: "Aetherial", category: "Art Direction" },
  { url: "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp", title: "Minimalism", category: "Branding" },
  { url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop", title: "Prism", category: "Shaders" },
  { url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", title: "Vortex", category: "VFX" },
  { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", title: "Fluidity", category: "UI/UX" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", title: "Deep Mind", category: "AI Content" },
];

export default function BentoGrid() {
  return (
    <div className="relative w-full h-[85vh] sm:h-[100vh] lg:h-[120vh] overflow-hidden py-12 mb-32 bg-[var(--surface-container-low)]">
      {/* Tilted Container - More extreme tilt and depth for Mobile Impact */}
      <div 
        className="absolute inset-[-40%] sm:inset-[-30%] rotate-[-12deg] sm:rotate-[-8deg] flex justify-center items-center gap-3 sm:gap-8"
        style={{ perspective: "2000px" }}
      >
        
        {/* Column 1 - Down (Faster for mobile energy) */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-6">
          <ScrollingColumn items={[images[0], images[1], images[2], images[3], images[4]]} duration={30} reverse={false} />
        </div>

        {/* Column 2 - Up (Varying speeds) */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-6">
          <ScrollingColumn items={[images[5], images[6], images[7], images[8], images[9]]} duration={45} reverse={true} />
        </div>

        {/* Column 3 - Down (Visible earlier) */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-6 hidden sm:flex">
          <ScrollingColumn items={[images[2], images[4], images[6], images[0], images[3]]} duration={35} reverse={false} />
        </div>

        {/* Column 4 - Up (Desktop Only) */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-6 hidden xl:flex">
          <ScrollingColumn items={[images[1], images[9], images[5], images[7], images[8]]} duration={50} reverse={true} />
        </div>

      </div>

      {/* Aesthetic Overlays for Depth - Refined to edges only */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--surface)] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none z-10" />
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[var(--surface)] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[var(--surface)] to-transparent pointer-events-none z-10" />
    </div>
  );
}

function ScrollingColumn({ items, duration, reverse }: { items: ImageItem[], duration: number, reverse: boolean }) {
  return (
    <motion.div
      animate={{
        y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex flex-col gap-6 md:gap-12"
    >
      {/* Double mapping for seamless loop */}
      {[...items, ...items].map((image, idx) => (
        <div key={idx} className="relative group overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-[var(--surface-container-high)] aspect-[3/4] w-full">
          <img
            src={getIKUrl(image.url, { width: 300, quality: 100, format: 'auto' })}
            alt={image.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12">
            <p className="label-md text-[var(--primary)] mb-2">{image.category}</p>
            <h3 className="headline-lg text-white text-xl md:text-3xl uppercase">{image.title}</h3>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
