"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMounted } from "@/lib/hooks";
import { testimonials } from "@/lib/data";
import TextReveal from "./TextReveal";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden py-[14vh] md:py-[18vh]"
    >
      {/* Soft aqua wash */}
      <motion.div
        aria-hidden
        style={mounted ? { y: drift } : undefined}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 30%, rgba(168,197,192,0.4), transparent 60%), radial-gradient(60% 50% at 10% 75%, rgba(216,205,185,0.35), transparent 60%)",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="flex items-center gap-4 md:col-span-3 md:col-start-1">
            <span className="h-px w-12 bg-bone-deep/40" />
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-bone-deep/70">
              Voices
            </span>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <TextReveal
              text="לקוחות מדברים בשקט."
              as="h2"
              className="block text-right font-heb text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-bone-ink"
              asWord
              staggerChildren={0.05}
            />
          </div>
        </div>

        {/* Quotes — clean grid */}
        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Quote
              key={t.id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              index={i}
              mounted={mounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Quote({
  quote,
  name,
  role,
  index,
  mounted,
}: {
  quote: string;
  name: string;
  role: string;
  index: number;
  mounted: boolean;
}) {
  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 30 } : false}
      whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`text-right ${
        index > 0 ? "border-t border-bone-deep/10 pt-12 md:border-0 md:pt-0" : ""
      } ${index === 1 ? "lg:translate-y-12" : ""}`}
    >
      {/* Large decorative quote mark */}
      <span
        aria-hidden
        className="block font-heb text-7xl leading-none text-bone-aqua/50 select-none"
      >
        «
      </span>
      <blockquote className="mt-3 font-heb text-[clamp(1.1rem,1.8vw,1.4rem)] font-light leading-[1.6] text-bone-ink">
        {quote}
      </blockquote>
      <div className="mt-6 flex flex-row-reverse items-center justify-end gap-3">
        <span className="text-[12px] tracking-[0.15em] text-bone-deep">
          {name}
        </span>
        <span className="h-px w-8 bg-bone-deep/30" />
        <span className="text-[12px] tracking-[0.15em] text-bone-muted">
          {role}
        </span>
      </div>
    </motion.div>
  );
}
