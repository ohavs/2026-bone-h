"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMounted } from "@/lib/hooks";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import TextReveal from "./TextReveal";

export default function Projects() {
  const mounted = useMounted();

  // Curated: 3 featured (latest active / construction)
  const featured = projects
    .filter((p) => p.status !== "sold")
    .slice(0, 3);

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-[14vh] md:py-[18vh]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header — RTL: title on right, eyebrow on left */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <div className="order-2 flex items-center gap-4 md:order-1 md:justify-start">
            <span className="h-px w-12 bg-bone-deep/40" />
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-bone-deep/70">
              Featured Projects · נבחרים
            </span>
          </div>

          <div className="order-1 md:order-2">
            <TextReveal
              text="פרויקטים נבחרים"
              as="h2"
              className="block text-right font-heb text-[clamp(2rem,5vw,4rem)] font-light leading-[1] tracking-[-0.03em] text-bone-ink"
              staggerChildren={0.04}
              asWord
            />
          </div>
        </div>

        {/* Grid: 3 cards on desktop, 1 on mobile, with stagger entrance */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-7">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} delay={0.1} />
          ))}
        </div>

        {/* View All — prominent, elegant */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/projects"
            data-cursor="hover"
            className="group relative inline-flex flex-row-reverse items-center gap-4 overflow-hidden rounded-md border border-bone-deep/40 px-10 py-4 text-[12px] uppercase tracking-[0.35em] text-bone-deep transition-all duration-700 hover:border-bone-deep hover:bg-bone-deep hover:text-bone-white"
          >
            <span>צפו בכל הפרויקטים</span>
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              className="transition-transform duration-700 ease-out-expo group-hover:-translate-x-1.5"
              aria-hidden
            >
              <path
                d="M13 5 H 1 M5 1 L 1 5 L 5 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
