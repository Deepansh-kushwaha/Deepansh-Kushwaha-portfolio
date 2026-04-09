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
      className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] p-6 md:p-10 pt-32"
    >
      <header className="relative overflow-hidden mb-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[var(--primary)] blur-[100px]" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <p className="label-md text-[var(--primary)] mb-4">Credentials</p>
          <h1 className="ch-title display-lg">Certification <br/><span className="text-[var(--primary)]">Hall</span></h1>
          <p className="ch-sub mt-8 max-w-2xl body-lg opacity-60">
            A curated wall of credentials—click any tile to preview, verify, or download.
          </p>
          <div className="ch-filters mt-12 flex flex-wrap gap-4">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f as "All" | CertCategory)}
                  className={[
                    "rounded-full px-6 py-2 text-sm label-md transition-all duration-300",
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20"
                      : "bg-[var(--surface-container)] text-[var(--on-surface)] opacity-60 hover:opacity-100",
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
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((c) => (
            <article
              key={c.id}
              className="ch-card group tilt relative rounded-[2.5rem] bg-[var(--surface-container-low)] p-4 soft-shadow transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="shine pointer-events-none absolute inset-0 rounded-[2.5rem]" />
              <div
                className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-container)] aspect-[4/3] cursor-pointer"
                role="button"
                aria-label={`Open ${c.title}`}
                tabIndex={0}
                onClick={() => setModal(c)}
              >
                <img
                  src={c.thumbnailUrl}
                  alt={`${c.title} preview`}
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="mt-6 px-4 pb-4 space-y-4">
                <div className="flex flex-col gap-1">
                   <p className="label-md text-[var(--primary)] text-xs opacity-60 uppercase">{c.category}</p>
                  <h3 className="headline-lg text-lg tracking-normal uppercase-none">
                    {c.title}
                  </h3>
                </div>
                
                <p className="body-md opacity-60 font-medium">
                  {c.issuer} — {c.issueDate}
                </p>

                {c.skills?.length ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-[var(--surface-container)] px-3 py-1 text-[10px] label-md opacity-50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center gap-4 pt-4">
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="label-md text-xs hover:text-[var(--primary)] transition-colors flex items-center gap-2"
                    >
                      <i className="ri-external-link-line"></i> Verify
                    </a>
                  )}
                  {c.downloadUrl && (
                    <a
                      href={c.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto btn-primary py-2 px-5 text-xs rounded-full"
                    >
                      Download <i className="ri-download-2-line"></i>
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

