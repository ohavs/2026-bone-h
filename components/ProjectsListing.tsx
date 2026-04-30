"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useMounted } from "@/lib/hooks";
import { projects, ProjectStatus } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import TextReveal from "./TextReveal";

type Filter = "all" | "active" | "construction" | "rent" | "sold";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "active", label: "למכירה" },
  { value: "construction", label: "בבנייה" },
  { value: "rent", label: "להשכרה" },
  { value: "sold", label: "נמכרו" },
];

export default function ProjectsListing() {
  const [filter, setFilter] = useState<Filter>("all");
  const mounted = useMounted();

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.status === (filter as ProjectStatus));
  }, [filter]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Back link */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 10 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <Link
            href="/"
            data-cursor="hover"
            className="group inline-flex flex-row-reverse items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-bone-muted transition-colors hover:text-bone-deep"
          >
            <span>חזרה לדף הבית</span>
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
              <path
                d="M1 4.5 H 13 M9 1 L 13 4.5 L 9 8"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Page header */}
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7 md:col-start-1">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-bone-deep/40" />
              <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-bone-deep/70">
                The Archive · ארכיון
              </span>
            </div>
            <TextReveal
              text="כל הפרויקטים"
              as="h1"
              className="block text-right font-heb text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.04em] text-bone-ink"
              staggerChildren={0.06}
              asWord
            />
          </div>
          <motion.p
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-right text-[14px] leading-[1.8] text-bone-ink/70 md:col-span-4 md:col-start-9 md:self-end"
          >
            פרויקטים אקטיביים, פרויקטים בבנייה, ופרויקטים שכבר נמסרו לדיירים
            לאורך השנים. סננו לפי סטטוס.
          </motion.p>
        </header>

        {/* Filter bar */}
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={mounted ? { opacity: 1 } : undefined}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-end gap-2 border-b border-bone-deep/15 pb-6 md:gap-4"
        >
          {filters.map((f) => {
            const isActive = filter === f.value;
            const count =
              f.value === "all"
                ? projects.length
                : projects.filter((p) => p.status === f.value).length;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                data-cursor="hover"
                className={`group relative flex flex-row-reverse items-baseline gap-2 rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.25em] transition-all duration-500 ${
                  isActive
                    ? "bg-bone-deep text-bone-white"
                    : "border border-bone-deep/20 bg-transparent text-bone-ink/70 hover:border-bone-deep/50 hover:text-bone-deep"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? "text-bone-white/60" : "text-bone-muted/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid with stagger */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} delay={0.05} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center text-[14px] text-bone-muted">
            אין פרויקטים בקטגוריה זו כרגע.
          </div>
        )}
      </div>
    </div>
  );
}
