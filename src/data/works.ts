export interface Work {
  id: number;
  slug: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  impact: string;
  year: string;
  client: string;
  stack: string[];
  platform: string;
  features: string[];
  challenge: string;
  solution: string;
  gallery: string[];
}

export const works: Work[] = [
  {
    id: 1,
    slug: "lumina-jewelry",
    title: "Lumina Jewelry Store",
    category: "Web Development",
    tag: "E-Commerce Build",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp",
    description: "Architecting a high-converting digital storefront for a premium jewelry maison with fluid animations and seamless checkout.",
    impact: "250% Increase in Mobile Conversion",
    year: "2024",
    client: "Luminescence / Paris",
    stack: ["Next.js", "Stripe", "Framer Motion", "ImageKit"],
    platform: "E-Commerce / Desktop & Mobile",
    features: ["Real-time Checkout", "3D Product Previews", "Dynamic Inventory", "Custom Haptics"],
    challenge: "Lumina needed a digital presence that matched the physical luxury of their jewelry. Their previous site was slow, not mobile-optimized, and failed to convey the detail of their hand-crafted pieces.",
    solution: "We built a specialized Next.js storefront utilizing ImageKit for lightning-fast asset delivery. We implemented a fluid-motion UI that mimics the shimmer of jewelry, paired with a custom Stripe integration for a frictionless 2-step checkout.",
    gallery: [
      "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp",
      "https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp"
    ]
  },
  {
    id: 2,
    slug: "skyward-portal",
    title: "Skyward Property Portal",
    category: "Web Development",
    tag: "Performance Platform",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp",
    description: "A high-performance real estate portal with real-time property visualization and fluid architectural transitions.",
    impact: "40% Higher Lead Retention",
    year: "2024",
    client: "Skyward / Dubai",
    stack: ["React", "Three.js", "Firebase", "GSAP"],
    platform: "Architectural Platform / WebGL",
    features: ["3D Virtual Tours", "Interactive Map Deck", "Property AI Search", "CRM Integration"],
    challenge: "The Dubai real estate market is hyper-competitive. Skyward needed a way to showcase properties while they were still under construction, requiring immersive 3D technology that loaded instantly on mobile.",
    solution: "We integrated a Three.js-based visualization engine into a React framework. This allowed users to explore 'Future-State' properties. We also built a specialized Firebase backend for real-time lead synchronization with their internal sales teams.",
    gallery: [
      "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp",
      "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp"
    ]
  },
  {
    id: 3,
    slug: "pulse-social",
    title: "Pulse Social Strategy",
    category: "Social Media",
    tag: "Organic Growth",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp",
    description: "Developing a visual-heavy social strategy that redefined the brand presence across Instagram and TikTok.",
    impact: "+1.2M Organic Reach in 3 Months",
    year: "2023",
    client: "Nebula Tech",
    stack: ["Figma", "After Effects", "Adobe Premiere"],
    platform: "Social Ecosystem",
    features: ["Motion Brand Identity", "Viral Content Engineering", "Community Management", "Strategy Audit"],
    challenge: "Nebula Tech had zero presence among Gen-Z developers. Their content was too 'corporate' and missed the mark on cultural relevance on short-form video platforms.",
    solution: "We executed an 'Editorial First' content strategy. We reimagined their technical features as high-fidelity motion graphics and short, entertaining developer-centric sketches, scaling their organic reach by over 1000%.",
    gallery: [
      "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp",
      "https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp"
    ]
  },
  {
    id: 4,
    slug: "aura-ads",
    title: "Aura Brand Scaling",
    category: "Meta Ads",
    tag: "Paid Acquisition",
    image: "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp",
    description: "Data-driven Meta ad campaigns optimized for high-ticket service acquisition and brand authority.",
    impact: "4.2x ROAS across Q4 Campaign",
    year: "2024",
    client: "Studio Artery",
    stack: ["Meta Ads Manager", "GA4", "Hotjar"],
    platform: "Conversion Engine",
    features: ["Retargeting Logic", "UGC Creative", "Landing Page Optimization", "A/B Testing"],
    challenge: "Studio Artery was spending $5k/month on ads but seeing inconsistent lead quality. Their cost-per-acquisition was higher than their margin on small-ticket services.",
    solution: "We pivoted their ad strategy to focus on 'Authority Building' through long-form educational ads. We implemented a 3-tier retargeting funnel and optimized their landing page UX, resulting in a 4.2x return on ad spend.",
    gallery: [
      "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp"
    ]
  }
];
