"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/lib/hooks";
import { ACTIVE_LABELS, Project } from "@/lib/data";

const statusColor: Record<Project["status"], string> = {
  active: "text-bone-deep",
  construction: "text-bone-deep",
  rent: "text-bone-deep",
  sold: "text-bone-muted",
};

export default function ProjectCard({
  project,
  delay = 0,
  index = 0,
}: {
  project: Project;
  delay?: number;
  index?: number;
}) {
  const mounted = useMounted();

  return (
    <motion.article
      initial={mounted ? { opacity: 0, y: 50 } : false}
      whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: delay + index * 0.12,
      }}
      viewport={{ once: true, margin: "-8% 0px" }}
      className="group flex flex-col overflow-hidden rounded-lg border border-bone-deep/10 bg-bone-white transition-all duration-700 ease-out-expo hover:border-bone-deep/30 hover:shadow-[0_20px_60px_-30px_rgba(31,59,56,0.25)]"
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-bone-gray/10"
        data-cursor="view"
        data-cursor-label="פרויקט"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} — ${project.city}`}
          className={`h-full w-full object-cover transition-all duration-[1400ms] ease-out-expo group-hover:scale-[1.04] ${
            project.status === "sold" ? "saturate-[0.6]" : ""
          }`}
          loading="lazy"
        />
        {/* Status pill (top-right in RTL = top-start) */}
        <div className="absolute right-4 top-4">
          <span
            className={`inline-block rounded-full border border-bone-deep/15 bg-bone-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${statusColor[project.status]} backdrop-blur-sm`}
          >
            {ACTIVE_LABELS[project.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-row-reverse items-baseline justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-bone-muted">
            {project.year}
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-bone-muted">
            {project.city}
          </span>
        </div>

        <h3 className="font-heb text-right text-[1.5rem] font-light leading-[1.1] tracking-[-0.01em] text-bone-ink">
          {project.title}
        </h3>

        <div className="flex flex-row-reverse items-center justify-end gap-2 text-[12px] text-bone-muted">
          <span>{project.type}</span>
          {project.units && (
            <>
              <span className="h-1 w-1 rounded-full bg-bone-gray/60" />
              <span>{project.units}</span>
            </>
          )}
        </div>

        <p className="mt-1 text-right text-[13px] leading-[1.7] text-bone-ink/70">
          {project.description}
        </p>

        <div className="mt-auto pt-4">
          <a
            href={`/projects#${project.id}`}
            data-cursor="hover"
            className="group/link inline-flex flex-row-reverse items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-bone-deep transition-colors hover:text-bone-deep/70"
          >
            <span>פרטים נוספים</span>
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              className="transition-transform duration-500 ease-out-expo group-hover/link:-translate-x-1"
              aria-hidden
            >
              <path
                d="M13 4.5 H 1 M5 1 L 1 4.5 L 5 8"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
