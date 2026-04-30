"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ACTIVE_LABELS,
  Project,
  ProjectStatus,
  projects,
} from "@/lib/data";
import TextReveal from "./TextReveal";

const isActive = (s: ProjectStatus) => s !== "sold";

export default function Projects() {
  // Show curated selection (3-4 most recent/featured active projects)
  const active = projects.filter((p) => isActive(p.status));
  const featured = active.slice(0, 3);

  return (
    <section id="projects" className="relative py-[12vh] md:py-[16vh]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-row-reverse items-center gap-4">
            <span className="h-px w-12 bg-bone-deep/40" />
            <span className="text-[11px] uppercase tracking-[0.45em] text-bone-deep/70">
              <span className="font-sans">Featured Projects</span>
            </span>
          </div>

          <TextReveal
            text="פרויקטים בחירה"
            as="h2"
            className="text-right font-heb text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.02em] text-bone-ink"
            staggerChildren={0.05}
            asWord
          />
        </div>

        {/* Projects Grid — clean 3-column on desktop, 1 on mobile */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {featured.map((p) => (
            <ProjectCardCurated key={p.id} project={p} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-14 flex justify-center"
        >
          <a
            href="/projects"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-bone-deep/30 px-8 py-4 text-[13px] uppercase tracking-[0.3em] text-bone-deep transition-all duration-500 hover:border-bone-deep/60 hover:bg-bone-deep/5"
          >
            <span className="relative z-10 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1">
              צפו בכל הפרויקטים
            </span>
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              className="relative z-10 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1"
              aria-hidden
            >
              <path
                d="M15 5 H 2 M6 1 L 2 5 L 6 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="scale(-1,1) translate(-16,0)"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCardCurated({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-10% 0px" }}
      className="group flex flex-col overflow-hidden rounded-lg border border-bone-deep/10 bg-bone-white transition-all duration-500 hover:border-bone-deep/25 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-bone-gray/10" data-cursor="view">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} — ${project.city}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-row-reverse items-baseline justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-bone-deep/70">
            {project.year}
          </span>
          <span className="text-[11px] uppercase tracking-[0.3em] text-bone-deep font-medium">
            {ACTIVE_LABELS[project.status]}
          </span>
        </div>

        <h3 className="font-heb text-right text-[1.4rem] font-light leading-[1.1] tracking-[-0.01em] text-bone-ink">
          {project.title}
        </h3>

        <div className="flex flex-row-reverse items-center gap-2 text-[12px] text-bone-muted">
          {project.units && <span>{project.units}</span>}
          {project.units && <span>·</span>}
          <span>{project.type}</span>
          <span>·</span>
          <span>{project.city}</span>
        </div>

        <p className="text-right text-[13px] leading-relaxed text-bone-ink/70">
          {project.description}
        </p>

        <a
          href={`#projects/${project.id}`}
          data-cursor="hover"
          className="mt-2 inline-flex flex-row-reverse items-center justify-end gap-2 py-2 text-[12px] uppercase tracking-[0.2em] text-bone-deep transition-colors hover:text-bone-deep/70"
        >
          <span>→</span>
          <span>פרטים</span>
        </a>
      </div>
    </motion.article>
  );
}
