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
      className="relative overflow-hidden bg-[var(--surface)] text-[var(--on-surface)]"
      aria-label="About"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[var(--primary)] blur-[100px]" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-[var(--secondary-container)] blur-[100px]" />
      </div>

      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-24 lg:py-32">
        {/* Text side */}
        <div className="relative z-10">
          <div
            ref={badgeRef}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--surface-container)] px-4 py-1.5 text-xs label-md text-[var(--on-surface)]"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--primary)]" />
            Open to opportunities
          </div>

          <h2
            ref={headlineRef}
            className="mb-8 display-lg text-[var(--on-surface)]"
          >
            {name}
          </h2>
          
          <p className="label-md text-[var(--primary)] mb-4">{title}</p>

          <p
            ref={bioRef}
            className="mb-10 max-w-prose body-lg opacity-80"
          >
            {bio}
          </p>

          {/* Skills */}
          <div ref={skillsRef} className="mb-12">
            <div className="mb-4 label-md text-[var(--on-surface)] opacity-50">
              Core Expertise
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[var(--surface-container-low)] px-5 py-2 text-sm font-medium label-md border border-[var(--surface-container)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
            <a
              href={resumeUrl}
              target="_blank"
              className="btn-primary"
              aria-label="Download Resume"
            >
              <i className="ri-download-line font-bold"></i>
              Download Resume
            </a>

            {socials.length > 0 && (
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic glass soft-shadow inline-flex h-12 w-12 items-center justify-center rounded-full text-[var(--on-surface)] transition-all hover:text-[var(--primary)] hover:scale-110"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <i className={iconFor(s.label)}></i>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Avatar side */}
        <div className="relative z-10 flex justify-center md:justify-end">
          <div
            ref={avatarWrapRef}
            className="relative w-full max-w-[400px]"
          >
            {/* Decorative fluid elements */}
            <div className="absolute -left-6 top-4 orb h-4 w-4 rounded-full bg-[var(--primary)] shadow-[0_0_24px_rgba(184,20,0,0.5)]" />
            <div className="absolute -right-4 bottom-10 orb h-3 w-3 rounded-full bg-[var(--secondary-container)] shadow-[0_0_24px_rgba(252,175,56,0.5)]" />

            <div className="overflow-hidden rounded-[2rem] bg-[var(--surface-container-low)] p-4 soft-shadow">
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src={avatarUrl}
                  alt={`${name} portrait`}
                  className="h-auto w-full scale-100 transform object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[var(--surface-container-highest)] px-8 py-3 rounded-full label-md text-[var(--on-surface)] glass soft-shadow whitespace-nowrap">
              Based in India • Collaborative
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
      return "ri-github-line";
    case "LinkedIn":
      return "ri-linkedin-box-line";
    case "Twitter":
    case "X":
      return "ri-twitter-x-line";
    case "Portfolio":
      return "ri-global-line";
    case "Email":
      return "ri-mail-line";
    default:
      return "ri-links-line";
  }
}

export default AboutSection;
