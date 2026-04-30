"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import TextReveal from "./TextReveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The whole hero "sinks" — recedes into the page as user scrolls.
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.82]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ["0px", reduce ? "0px" : "10px"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.6, 0]);

  // Image moves slowest (deepest layer)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.18]);

  // Text moves faster (washes over)
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-32%"]);

  // Side label drift
  const labelY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-50%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[140vh] w-full"
    >
      {/* Sticky stage so we can scrub with scroll */}
      <motion.div
        style={{
          scale: heroScale,
          y: heroY,
          filter: useTransform(heroBlur, (b) => `blur(${b})`),
          opacity: heroOpacity,
          transformOrigin: "50% 30%",
        }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Hero image with Ken Burns */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <div className="absolute inset-0">
            {/* Use a remote luxury architecture image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
              alt="פרויקט יוקרה — בונה הירדן המערבי"
              className="ken-burns h-full w-full object-cover"
            />
          </div>
          {/* Soft white wash to keep "ceiling bright white" mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-bone-white via-bone-white/20 to-bone-white/40" />
          {/* Aqua tint */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "radial-gradient(80% 60% at 50% 80%, rgba(168,197,192,0.35), transparent 60%)",
            }}
          />
        </motion.div>

        {/* Vertical accents (NOT centered standard layout) */}
        <motion.div
          style={{ y: labelY }}
          className="absolute right-6 top-28 hidden text-[10px] uppercase tracking-[0.5em] text-bone-deep/60 md:block"
        >
          <span className="vrl">Est. 1998 &nbsp; · &nbsp; West Jordan</span>
        </motion.div>

        <motion.div
          style={{ y: labelY }}
          className="absolute left-6 bottom-10 hidden text-[10px] uppercase tracking-[0.5em] text-bone-deep/60 md:block"
        >
          <span>scroll · גלילה</span>
        </motion.div>

        {/* Center text block — asymmetric placement */}
        <div className="relative z-10 flex h-full w-full items-end pb-[12vh] md:items-center md:pb-0">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
            <div className="flex flex-col items-end gap-6 md:items-start">
              {/* Eyebrow */}
              <motion.div
                style={{ y: subY }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-right text-[11px] uppercase tracking-[0.45em] text-bone-deep/70 md:text-left"
              >
                <span className="font-sans">Real Estate · Portfolio</span>
              </motion.div>

              {/* Hero text — Hebrew, large elegant */}
              <motion.h1
                style={{ y: textY }}
                className="font-heb text-right font-light leading-[0.95] text-bone-ink md:text-right"
                aria-label="בונה הירדן המערבי"
              >
                <TextReveal
                  text="בונה"
                  as="span"
                  className="block text-[clamp(3.5rem,12vw,12rem)] tracking-[-0.04em]"
                  staggerChildren={0.06}
                  delay={0.6}
                />
                <TextReveal
                  text="הירדן המערבי"
                  as="span"
                  className="block text-[clamp(2.4rem,9vw,9rem)] tracking-[-0.04em] text-bone-deep"
                  staggerChildren={0.045}
                  delay={1.0}
                />
              </motion.h1>

              {/* Sub line */}
              <motion.p
                style={{ y: subY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
                className="max-w-md text-right text-[15px] leading-relaxed text-bone-muted md:text-left"
              >
                פרויקטים נבחרים של מגורים, השקעה ובנייה — בתפיסה שקטה, מרווחת
                ומדויקת.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bottom horizon line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          className="absolute bottom-6 left-1/2 h-px w-[88%] -translate-x-1/2 origin-left bg-bone-deep/20 md:bottom-10"
        />
      </motion.div>
    </section>
  );
}
