"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import { useMounted } from "@/lib/hooks";
import TextReveal from "./TextReveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // True parallax: image recedes deeper, text shifts up faster
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[130vh] w-full"
    >
      {/* Sticky stage scrubs with scroll */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Background image: asymmetric — takes ~60% width on desktop, full on mobile */}
        <motion.div
          style={mounted ? { y: imageY, scale: imageScale } : undefined}
          className="absolute inset-y-0 left-0 w-full md:w-[58%] will-change-transform"
        >
          <div className="relative h-full w-full overflow-hidden">
            {/* Warm skeleton — visible until image loads, then cross-fades out */}
            <div
              aria-hidden
              className={`absolute inset-0 z-10 bg-bone-beige/50 transition-opacity duration-[1200ms] ease-out ${
                imageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
              alt="פרויקט יוקרה — בונה הירדן המערבי"
              onLoad={() => setImageLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              fetchpriority="high"
              decoding="async"
            />
            {/* Soft white wash on image right edge to blend into bg */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bone-white to-transparent md:block" />
            {/* Mobile overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-bone-white/80 via-bone-white/30 to-transparent md:hidden" />
          </div>
        </motion.div>

        {/* Right column content (RTL primary side) */}
        <motion.div
          style={mounted ? { y: textY } : undefined}
          className="relative z-10 flex h-full items-end pb-24 md:items-center md:justify-end md:pb-0"
        >
          <div className="w-full px-6 md:max-w-[55%] md:px-12 md:pe-24 lg:pe-32">
            {/* Eyebrow */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mb-8 flex items-center justify-end gap-3 text-[11px] uppercase tracking-[0.4em] text-bone-deep"
            >
              <span className="font-sans">Real Estate · Portfolio</span>
              <span className="h-px w-10 bg-bone-deep/50" />
            </motion.div>

            {/* Hero headline — Hebrew, large, focal point */}
            <h1 className="font-heb text-right font-light leading-[0.95] text-bone-ink">
              <TextReveal
                text="בונה"
                as="span"
                className="block text-[clamp(3.5rem,11vw,9.5rem)] tracking-[-0.04em]"
                staggerChildren={0.07}
                delay={0.5}
              />
              <TextReveal
                text="הירדן המערבי"
                as="span"
                className="mt-2 block text-[clamp(2.2rem,7vw,6.5rem)] tracking-[-0.04em] text-bone-deep"
                staggerChildren={0.05}
                delay={0.9}
              />
            </h1>

            {/* Sub-text — clearly readable, no overlap with headline */}
            <motion.p
              initial={mounted ? { opacity: 0, y: 30 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
              className="mt-10 max-w-md text-right text-[15px] leading-[1.7] text-bone-ink/75 md:text-[16px]"
            >
              פרויקטים נבחרים של מגורים, השקעה ובנייה — בתפיסה שקטה,
              מרווחת ומדויקת. עבודה לאורך הירדן המערבי, מטבריה ועד הבקעה.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
              className="mt-10 flex flex-row-reverse items-center justify-end gap-6"
            >
              <a
                href="#projects"
                data-cursor="hover"
                className="group inline-flex flex-row-reverse items-center gap-3 rounded-md border border-bone-deep/40 bg-bone-white/40 px-7 py-3.5 text-[12px] uppercase tracking-[0.3em] text-bone-deep backdrop-blur-sm transition-all duration-500 hover:border-bone-deep hover:bg-bone-deep hover:text-bone-white"
              >
                <span>צפו בפרויקטים</span>
                <ArrowLeft />
              </a>
              <a
                href="#contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.3em] text-bone-deep transition-colors hover:text-bone-deep/70"
              >
                <span>צור קשר</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating detail card (top-left of image like reference) */}
        <motion.div
          style={mounted ? { y: cardY } : undefined}
          initial={mounted ? { opacity: 0, x: -40, y: 0 } : false}
          animate={mounted ? { opacity: 1, x: 0, y: 0 } : undefined}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
          className="absolute bottom-12 left-6 z-10 hidden md:block lg:left-12 lg:bottom-20"
        >
          <div className="rounded-lg border border-bone-deep/15 bg-bone-white/90 px-7 py-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="font-heb text-2xl font-light text-bone-ink">27</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bone-muted">
                  שנים
                </div>
              </div>
              <div className="h-10 w-px bg-bone-deep/15" />
              <div className="text-center">
                <div className="font-heb text-2xl font-light text-bone-ink">1.2k</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bone-muted">
                  יחידות
                </div>
              </div>
              <div className="h-10 w-px bg-bone-deep/15" />
              <div className="text-center">
                <div className="font-heb text-2xl font-light text-bone-ink">14</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bone-muted">
                  ערים
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={mounted ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 right-1/2 z-10 hidden translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-bone-deep/60 md:flex"
        >
          <span className="h-px w-8 bg-bone-deep/40" />
          <span>גלילה · scroll</span>
          <span className="h-px w-8 bg-bone-deep/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ArrowLeft() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M13 5 H 1 M5 1 L 1 5 L 5 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
