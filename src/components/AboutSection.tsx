import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AboutProps = {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  resumeUrl: string; // public URL or /resume.pdf
  avatarUrl: string; // public image path
  socials?: {
    label: "GitHub" | "LinkedIn" | "Twitter" | "X" | "Portfolio"| "Email";
    href: string;
  }[];
};

const AboutSection: React.FC<AboutProps> = ({
  name,
  title,
  bio,
  skills,
  resumeUrl,
  avatarUrl,
  socials = [],
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLParagraphElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const avatarWrapRef = useRef<HTMLDivElement | null>(null);

  // Split headline for staggered reveal
  useEffect(() => {
    if (!headlineRef.current || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const text = headlineRef.current!.innerText;
      const words = text.split(" ");
      headlineRef.current!.innerHTML = words
        .map(
          (w) =>
            `<span class="inline-block will-change-transform translate-y-6 opacity-0">${w}&nbsp;</span>`
        )
        .join("");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(headlineRef.current!.querySelectorAll("span"), {
        y: 0,
        opacity: 1,
        stagger: 0.06,
      })
        .from(badgeRef.current, { y: 14, opacity: 0 }, "-=0.4")
        .from(bioRef.current, { y: 16, opacity: 0 }, "-=0.5")
        .from(skillsRef.current, { y: 16, opacity: 0 }, "-=0.55")
        .from(ctaRef.current, { y: 16, opacity: 0 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Subtle parallax on avatar
  useEffect(() => {
    if (!avatarWrapRef.current || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        avatarWrapRef.current,
        { y: 12, rotate: -1.5 },
        {
          y: 0,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // floating orbs
      if(!avatarWrapRef.current){
        return;
      }
      const orbs = avatarWrapRef.current.querySelectorAll(".orb");
      orbs.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 12,
          x: i % 2 === 0 ? 8 : -6,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, avatarWrapRef);

    return () => ctx.revert();
  }, []);

  // Hover magnetic effect for social icons
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLAnchorElement>(".magnetic");
    const handleMove = (e: MouseEvent) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);
        const strength = 0.15;
        gsap.to(item, {
          x: mx * strength,
          y: my * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      });
    };
    const reset = () =>
      gsap.to(items, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", reset);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950"
      aria-label="About"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[48rem] -translate-x-1/2 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-12 lg:py-28">
        {/* Text side */}
        <div className="relative z-10">
          <div
            ref={badgeRef}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-300 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Open to opportunities
          </div>

          <h2
            ref={headlineRef}
            className="mb-4 text-3xl font-semibold leading-tight text-slate-100 md:text-4xl"
          >
            {name} — {title}
          </h2>

          <p
            ref={bioRef}
            className="mb-6 max-w-prose text-slate-300/90 md:text-lg"
          >
            {bio}
          </p>

          {/* Skills */}
          <div ref={skillsRef} className="mb-8">
            <div className="mb-2 text-sm uppercase tracking-wider text-slate-400">
              Core Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-sm text-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href={resumeUrl}
              target="_blank"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Download Resume"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download Resume
            </a>

            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700/60 bg-slate-800/40 text-slate-200 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <span className="text-sm">{iconFor(s.label)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Avatar side */}
        <div className="relative z-10">
          <div
            ref={avatarWrapRef}
            className="relative mx-auto w-64 sm:w-72 md:w-80"
          >
            {/* Decorative rings */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-tr from-cyan-500/20 via-transparent to-indigo-500/20 blur-2xl" />
            <div className="absolute -left-6 top-4 orb h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_24px_0_rgba(34,211,238,0.65)]" />
            <div className="absolute -right-4 bottom-10 orb h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_24px_0_rgba(129,140,248,0.65)]" />

            <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 p-2 backdrop-blur">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={avatarUrl}
                  alt={`${name} portrait`}
                  className="h-auto w-full scale-100 transform object-cover transition-transform duration-500 hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-gray-700/60 bg-gray-800/60  w-full px-4 py-1 text-xs text-gray-200 shadow backdrop-blur">
              Based in the Web • Available Remote
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function iconFor(label: "GitHub" | "LinkedIn" | "Twitter" | "X" | "Portfolio" | "Email") {
  switch (label) {
    case "GitHub":
      return "GH";
    case "LinkedIn":
      return "in";
    case "Twitter":
    case "X":
      return "X";
    case "Portfolio":
      return "↗";
    case "Email":
      return "M";
    default:
      return "•";
  }
}

export default AboutSection;
