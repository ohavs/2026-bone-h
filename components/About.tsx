"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stats } from "@/lib/data";
import TextReveal from "./TextReveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <section id="about" className="relative py-[20vh] md:py-[28vh]">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div ref={ref} className="grid grid-cols-12 gap-x-6 gap-y-16">
          {/* Right column (RTL primary): graceful prose */}
          <div className="col-span-12 md:col-span-7 md:col-start-1">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-bone-deep/40" />
              <span className="text-[11px] uppercase tracking-[0.45em] text-bone-deep/70">
                <span className="font-sans">A few words</span>
              </span>
            </div>

            <div className="mt-10 space-y-8 text-right md:text-right">
              <TextReveal
                text="אנחנו לא בונים מהר."
                as="p"
                className="font-heb text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.25] tracking-[-0.02em] text-bone-ink"
                asWord
                staggerChildren={0.06}
              />
              <TextReveal
                text="אנחנו בונים בשקט — שיוודא שכל פרט יזדקק עוד שנה ועוד עשור."
                as="p"
                className="font-heb text-[clamp(1.2rem,2.2vw,1.8rem)] font-light leading-[1.45] text-bone-ink/80"
                asWord
                staggerChildren={0.04}
              />
              <TextReveal
                text="עבודה לאורך הירדן המערבי, מטבריה ועד הבקעה. בוטיק קטן, בעלי מקצוע מעטים, סטנדרט גבוה."
                as="p"
                className="text-[15px] leading-[1.8] text-bone-muted"
                asWord
                staggerChildren={0.02}
              />
            </div>
          </div>

          {/* Left column: stats fluid reveal */}
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-12 md:gap-16"
            >
              {stats.map((s, i) => (
                <FluidStat
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={0.2 + i * 0.25}
                  inView={inView}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FluidStat({
  value,
  suffix,
  label,
  delay,
  inView,
}: {
  value: string;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="text-right md:text-right">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 30, filter: "blur(10px)" }
        }
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
        className="flex items-baseline justify-end gap-3"
      >
        <span className="font-heb text-[clamp(3.2rem,7vw,5.5rem)] font-light leading-none tracking-[-0.04em] text-bone-deep">
          {value}
        </span>
        {suffix && (
          <span className="font-heb text-[15px] text-bone-muted">
            {suffix}
          </span>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: delay + 0.4 }}
        className="mt-2 text-[13px] tracking-wide text-bone-muted"
      >
        {label}
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: delay + 0.5 }}
        className="mt-6 h-px w-full origin-right bg-bone-deep/15"
      />
    </div>
  );
}
