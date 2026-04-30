"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/lib/data";

const floatPositions = [
  // top-right
  { right: "8%", top: "12%", maxWidth: "420px", textAlign: "right" as const },
  // mid-left
  { left: "10%", top: "44%", maxWidth: "480px", textAlign: "right" as const },
  // bottom-right
  { right: "14%", top: "76%", maxWidth: "440px", textAlign: "right" as const },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative min-h-[140vh] overflow-hidden py-[16vh]"
    >
      {/* Soft aqua wash background */}
      <motion.div
        aria-hidden
        style={{ y: drift }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 30%, rgba(168,197,192,0.5), transparent 60%), radial-gradient(60% 50% at 10% 75%, rgba(216,205,185,0.45), transparent 60%)",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-bone-deep/40" />
          <span className="text-[11px] uppercase tracking-[0.45em] text-bone-deep/70">
            <span className="font-sans">Voices</span>
          </span>
        </div>

        <h2 className="mt-8 max-w-3xl text-right font-heb text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-bone-ink">
          לקוחות מדברים בשקט.
        </h2>
      </div>

      {/* Floating quotes — positioned absolutely so they appear at "various spots" */}
      <div className="relative mt-[14vh] h-[110vh]">
        {testimonials.map((t, i) => (
          <FloatingQuote
            key={t.id}
            quote={t.quote}
            name={t.name}
            role={t.role}
            position={floatPositions[i % floatPositions.length]}
            delay={i * 0.4}
          />
        ))}
      </div>
    </section>
  );
}

function FloatingQuote({
  quote,
  name,
  role,
  position,
  delay,
}: {
  quote: string;
  name: string;
  role: string;
  position: {
    left?: string;
    right?: string;
    top: string;
    maxWidth: string;
    textAlign: "right";
  };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slow fade in + fade out as it passes through viewport
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-4%"]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        ...position,
        opacity,
        y,
      }}
      className="will-change-transform"
    >
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay }}
        className="font-heb text-right text-[clamp(1.3rem,2.4vw,1.9rem)] font-light leading-[1.5] tracking-[-0.01em] text-bone-ink"
      >
        <span className="select-none text-bone-deep/40">«&nbsp;</span>
        {quote}
        <span className="select-none text-bone-deep/40">&nbsp;»</span>
      </motion.blockquote>
      <div className="mt-6 flex items-center justify-end gap-3">
        <span className="text-[12px] tracking-[0.2em] text-bone-muted">
          {role}
        </span>
        <span className="h-px w-8 bg-bone-deep/30" />
        <span className="text-[12px] tracking-[0.15em] text-bone-deep">
          {name}
        </span>
      </div>
    </motion.div>
  );
}
