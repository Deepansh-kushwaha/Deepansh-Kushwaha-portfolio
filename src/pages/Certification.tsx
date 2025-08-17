import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import webdev from'../assets/Certificates/webdev.jpg'
import aptitude from'../assets/Certificates/aptitude.jpg'
import basicweb from '../assets/Certificates/basicsweb.jpg'
import copilot from '../assets/Certificates/copilot.jpg'
import Css from '../assets/Certificates/Css.jpg'
import html from '../assets/Certificates/Html.jpg'
import flutter from '../assets/Certificates/flutter-certificate.jpg'
import webresume from '../assets/Certificates/webresume-certificate.jpg'
import figma from '../assets/Certificates/figma.png'

gsap.registerPlugin(ScrollTrigger);

type CertCategory = "Tech" | "Design" | "Other";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // "Aug 2025" or ISO
  thumbnailUrl: string;
  imageUrl?: string;
  verifyUrl?: string;
  downloadUrl?: string;
  category: CertCategory;
  skills?: string[];
  description?: string;
};

const filters: Array<"All" | CertCategory> = ["All", "Tech", "Design", "Other"];

// Demo data — replace with your real data or fetch.
const demoCerts: Certification[] = [
  {
    id: "cert-1",
    title: "React website",
    issuer: "Skill Risers",
    issueDate: "Feb 2024",
    thumbnailUrl: webresume,
    imageUrl: webresume,
    downloadUrl: webresume,
    category: "Tech",
    skills: ["React", "TypeScript", "Hooks", "Performance"],
    description: "Deep dive into composability, render patterns, and DX.",
  },
  {
    id: "cert-2",
    title: "Figma",
    issuer: "GUVI hcl",
    issueDate: "Aug 2025",
    thumbnailUrl: figma,
    imageUrl: figma,
    downloadUrl: figma,
    category: "Design",
    skills: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: "cert-3",
    title: "Aptitude",
    issuer: "Icat",
    issueDate: "Aug 2025",
    thumbnailUrl: aptitude,
    imageUrl: aptitude,
    downloadUrl: aptitude,
    category: "Other",
    skills: ["Aptitude", "Mathematics", "Reasoning"],
  },
  {
    id: "cert-4",
    title: "Get started with web development",
    issuer: "Microsoft",
    issueDate: "Mar 2024",
    thumbnailUrl: webdev,
    imageUrl: webdev,
    downloadUrl: webdev,
    category: "Tech",
    skills: ["Html", "CSS", "JavaScript"],
  },
  {
    id: "cert-5",
    title: "Css",
    issuer: "Microsoft",
    issueDate: "Mar 2024",
    thumbnailUrl: Css,
    imageUrl: Css,
    downloadUrl: Css,
    category: "Tech",
    skills: ["CSS"],
  },
  {
    id: "cert-6",
    title: "Webpage",
    issuer: "Microsoft",
    issueDate: "Mar 2024",
    thumbnailUrl: html,
    imageUrl: html,
    downloadUrl: html,
    category: "Tech",
    skills: ["Html"],
  },
  {
    id: "cert-7",
    title: "copilot",
    issuer: "Microsoft",
    issueDate: "Mar 2024",
    thumbnailUrl: copilot,
    imageUrl: copilot,
    downloadUrl: copilot,
    category: "Tech",
    skills: ["Copilot", "ChatGPT"],
  },
  {
    id: "cert-8",
    title: "Flutter",
    issuer: "Skill Risers",
    issueDate: "Feb 2024",
    thumbnailUrl: flutter,
    imageUrl: flutter,
    downloadUrl: flutter,
    category: "Tech",
    skills: ["Flutter", "Dart"],
  },
  {
    id: "cert-9",
    title: "basic web",
    issuer: "Microsoft",
    issueDate: "Mar 2024",
    thumbnailUrl: basicweb,
    imageUrl: basicweb,
    downloadUrl: basicweb,
    category: "Tech",
    skills: ["Html", "CSS", "JavaScript", "Bootstrap" , "Tailwind", "React"],
  },
];

export default function CertificationHallPage() {
  const [active, setActive] = useState<"All" | CertCategory>("All");
  const [modal, setModal] = useState<Certification | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const certifications = demoCerts; // swap with props or data fetch

  const filtered = useMemo(() => {
    if (active === "All") return certifications;
    return certifications.filter((c) => c.category === active);
  }, [active, certifications]);

  // GSAP: page intro and grid item reveal
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });
      tl.from(".ch-title", { y: 20, opacity: 0 })
        .from(".ch-sub", { y: 18, opacity: 0 }, "-=0.4")
        .from(".ch-filters", { y: 16, opacity: 0 }, "-=0.5");

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll(".ch-card"), {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover tilt + shine
  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const target = (e.target as HTMLElement).closest<HTMLDivElement>(".tilt");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * 6; // tilt X
    const ry = (0.5 - px) * 6; // tilt Y
    gsap.to(target, { rotateX: rx, rotateY: ry, duration: 0.3, ease: "power2.out" });
    const shine = target.querySelector<HTMLElement>(".shine");
    if (shine) {
      const dx = px * 100;
      const dy = py * 100;
      shine.style.background = `radial-gradient(600px circle at ${dx}% ${dy}%, rgba(255,255,255,0.18), transparent 40%)`;
    }
  };
  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const target = (e.target as HTMLElement).closest<HTMLDivElement>(".tilt");
    if (!target) return;
    gsap.to(target, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power3.out" });
    const shine = target.querySelector<HTMLElement>(".shine");
    if (shine) shine.style.background = "transparent";
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-slate-100 p-10"
    >
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -right-24 top-48 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
          <h1 className="ch-title text-3xl font-semibold md:text-4xl font-poppins">
            Certification Hall
          </h1>
          <p className="ch-sub mt-3 max-w-2xl text-slate-300">
            A curated wall of credentials—click any tile to preview, verify, or download.
          </p>
          <div className="ch-filters mt-6 flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f as "All" | CertCategory)}
                  className={[
                    "rounded-full border px-4 py-1.5 text-sm backdrop-blur transition-colors",
                    isActive
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200"
                      : "border-slate-700/60 bg-slate-800/40 text-slate-300 hover:text-white",
                  ].join(" ")}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <div
          ref={gridRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((c) => (
            <article
              key={c.id}
              className="ch-card group tilt relative rounded-2xl border border-slate-700/60 bg-slate-900/60 p-3 shadow-xl shadow-black/20 backdrop-blur will-change-transform"
            >
              <div className="shine pointer-events-none absolute inset-0 rounded-2xl" />
              <div
                className="relative overflow-hidden rounded-xl bg-slate-800/40"
                role="button"
                aria-label={`Open ${c.title}`}
                tabIndex={0}
                onClick={() => setModal(c)}
                onKeyDown={(e) => e.key === "Enter" && setModal(c)}
              >
                <img
                  src={c.thumbnailUrl}
                  alt={`${c.title} preview`}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-slate-100">
                    {c.title}
                  </h3>
                  <span className="rounded-full border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-xs text-slate-300">
                    {c.category}
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  {c.issuer} • {c.issueDate}
                </p>

                {c.skills?.length ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-xs text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center gap-2 pt-2">
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-slate-700/60 bg-slate-800/40 px-3 py-1.5 text-xs text-slate-200 hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                      Verify
                    </a>
                  )}
                  {c.downloadUrl && (
                    <a
                      href={c.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
                      Download
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close preview"
              className="absolute right-3 top-3 z-10 rounded-md border border-slate-700/60 bg-slate-800/60 px-2 py-1 text-sm text-slate-200 hover:text-white"
              onClick={() => setModal(null)}
            >
              Close
            </button>
            {modal.imageUrl ? (
              <img
                src={modal.imageUrl}
                alt={`${modal.title} full`}
                className="max-h-[85vh] w-full object-contain"
                loading="eager"
              />
            ) : (
              <div className="flex h-[60vh] items-center justify-center text-slate-400">
                No full-size image available
              </div>
            )}
            <div className="border-t border-slate-700/60 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-slate-100">{modal.title}</div>
                  <div className="text-sm text-slate-400">
                    {modal.issuer} • {modal.issueDate}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {modal.verifyUrl && (
                    <a
                      href={modal.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-200 hover:text-white"
                    >
                      Verify
                    </a>
                  )}
                  {modal.downloadUrl && (
                    <a
                      href={modal.downloadUrl}
                      download
                      className="rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1.5 text-sm font-medium text-white"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
              {modal.description && (
                <p className="mt-2 text-sm text-slate-300">{modal.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

