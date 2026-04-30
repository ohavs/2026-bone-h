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
  const active = projects.filter((p) => isActive(p.status));
  const sold = projects.filter((p) => !isActive(p.status));

  return (
    <section id="projects" className="relative py-[18vh] md:py-[24vh]">
      {/* Section eyebrow */}
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-bone-deep/40" />
            <span className="text-[11px] uppercase tracking-[0.45em] text-bone-deep/70">
              <span className="font-sans">Selected Work</span>
            </span>
          </div>

          <TextReveal
            text="עבודה נבחרת — בקצב שקט"
            as="h2"
            className="text-right font-heb text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1] tracking-[-0.03em] text-bone-ink"
            staggerChildren={0.025}
            asWord
          />
        </div>
      </div>

      {/* ACTIVE — irregular layout */}
      <div className="mx-auto mt-[14vh] max-w-[1500px] px-6 md:px-12">
        <SeparatorMarquee
          label="פעילים — למכירה · להשכרה · בבנייה"
          tone="deep"
        />

        <div className="mt-[10vh] grid grid-cols-12 gap-x-6 gap-y-[18vh]">
          {active.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} variant="active" />
          ))}
        </div>
      </div>

      {/* Separator: ink-in-water style */}
      <div className="mx-auto mt-[24vh] max-w-[1500px] px-6 md:px-12">
        <SeparatorMarquee label="נמכרו — שקטים, גמורים, חתומים" tone="muted" />
      </div>

      {/* SOLD — different rhythm: smaller, monochrome wash */}
      <div className="mx-auto mt-[10vh] max-w-[1500px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-[14vh]">
          {sold.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} variant="sold" />
          ))}
        </div>
      </div>
    </section>
  );
}

function SeparatorMarquee({
  label,
  tone,
}: {
  label: string;
  tone: "deep" | "muted";
}) {
  const color = tone === "deep" ? "text-bone-deep" : "text-bone-gray";
  const line = tone === "deep" ? "bg-bone-deep/30" : "bg-bone-gray/40";

  return (
    <div className="relative flex items-center gap-6">
      <span className={`h-px flex-1 ${line}`} />
      <span
        className={`whitespace-nowrap text-[11px] uppercase tracking-[0.45em] ${color}`}
      >
        {label}
      </span>
      <span className={`h-px flex-1 ${line}`} />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  variant,
}: {
  project: Project;
  index: number;
  variant: "active" | "sold";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different speeds per layer (image, details, button)
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const detailsY = useTransform(scrollYProgress, [0, 1], ["20%", "-12%"]);
  const ctaY = useTransform(scrollYProgress, [0, 1], ["30%", "-20%"]);

  // Ripple gradient mask shifts with scroll
  const rippleX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Asymmetric column placement
  const layout = getCardLayout(index, variant);

  return (
    <motion.article
      ref={ref}
      className={`relative ${layout.col} ${layout.offset}`}
    >
      {/* Year + status row */}
      <motion.div
        style={{ y: detailsY }}
        className="mb-5 flex items-end justify-between"
      >
        <span className="text-[11px] uppercase tracking-[0.4em] text-bone-deep/70">
          {project.year}
        </span>
        <span
          className={`text-[11px] uppercase tracking-[0.4em] ${
            variant === "sold" ? "text-bone-gray" : "text-bone-deep"
          }`}
        >
          {ACTIVE_LABELS[project.status]}
        </span>
      </motion.div>

      {/* Image with ripple mask */}
      <div
        className="group relative overflow-hidden"
        data-cursor="view"
        data-cursor-label={variant === "sold" ? "sold" : "view"}
      >
        <motion.div style={{ y: imageY }} className="will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} — ${project.city}`}
            className={`h-[58vh] w-full object-cover transition-[filter] duration-[1200ms] ease-out-expo ${
              variant === "sold"
                ? "saturate-[0.4] brightness-[0.95] group-hover:saturate-100"
                : "saturate-100 group-hover:brightness-[1.04]"
            }`}
            loading="lazy"
          />
        </motion.div>

        {/* Aqua tint overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bone-deep/20 via-transparent to-transparent opacity-60 mix-blend-multiply" />

        {/* Ripple — moving radial light */}
        <motion.div
          aria-hidden
          style={{ x: rippleX }}
          className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-90"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(40% 60% at 30% 50%, rgba(247,245,238,0.35), transparent 60%)",
            }}
          />
        </motion.div>

        {/* Sold marker */}
        {variant === "sold" && (
          <div className="pointer-events-none absolute bottom-6 right-6 text-right">
            <div className="text-[10px] uppercase tracking-[0.4em] text-bone-white/80">
              archived
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <motion.div
        style={{ y: detailsY }}
        className="mt-7 flex flex-col gap-3"
      >
        <h3 className="font-heb text-[clamp(1.5rem,3vw,2.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-bone-ink">
          {project.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-bone-muted">
          <span>{project.city}</span>
          <span className="h-1 w-1 rounded-full bg-bone-gray/60" />
          <span>{project.type}</span>
          {project.units && (
            <>
              <span className="h-1 w-1 rounded-full bg-bone-gray/60" />
              <span>{project.units}</span>
            </>
          )}
        </div>

        <p className="max-w-md text-[14px] leading-relaxed text-bone-ink/70">
          {project.description}
        </p>
      </motion.div>

      {/* CTA — wave dissolve button */}
      <motion.div style={{ y: ctaY }} className="mt-6">
        <WaveLink>
          {variant === "sold" ? "צפייה בארכיון" : "פרטים נוספים"}
        </WaveLink>
      </motion.div>
    </motion.article>
  );
}

function WaveLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      data-cursor="hover"
      className="group relative inline-flex items-center gap-3 overflow-hidden py-2 text-[13px] uppercase tracking-[0.35em] text-bone-deep"
    >
      <span className="relative z-10 transition-transform duration-700 ease-out-expo group-hover:-translate-x-1">
        {children}
      </span>
      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        className="relative z-10 transition-transform duration-700 ease-out-expo group-hover:-translate-x-1"
        aria-hidden
      >
        <path
          d="M0 5 H 18 M14 1 L 18 5 L 14 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="scale(-1,1) translate(-22,0)"
        />
      </svg>

      {/* Wave underline */}
      <span className="absolute bottom-0 right-0 h-[2px] w-full overflow-hidden">
        <span className="block h-full w-full origin-right scale-x-0 bg-bone-deep/50 transition-transform duration-[900ms] ease-out-expo group-hover:scale-x-100" />
      </span>
    </a>
  );
}

function getCardLayout(
  i: number,
  variant: "active" | "sold",
): { col: string; offset: string } {
  if (variant === "active") {
    // 3 cards staggered: full-left big, right small offset down, left medium offset way down
    const layouts = [
      { col: "col-span-12 md:col-span-7", offset: "md:translate-y-0" },
      { col: "col-span-12 md:col-span-4", offset: "md:translate-y-[14vh] md:col-start-9" },
      { col: "col-span-12 md:col-span-6", offset: "md:translate-y-[6vh] md:col-start-2" },
      { col: "col-span-12 md:col-span-5", offset: "md:translate-y-[20vh] md:col-start-8" },
    ];
    return layouts[i % layouts.length];
  }

  // Sold: tighter, monochrome rhythm
  const layouts = [
    { col: "col-span-12 md:col-span-5", offset: "md:translate-y-0 md:col-start-1" },
    { col: "col-span-12 md:col-span-5", offset: "md:translate-y-[8vh] md:col-start-7" },
    { col: "col-span-12 md:col-span-4", offset: "md:translate-y-[18vh] md:col-start-3" },
  ];
  return layouts[i % layouts.length];
}
