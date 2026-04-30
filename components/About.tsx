"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMounted } from "@/lib/hooks";
import { stats } from "@/lib/data";
import TextReveal from "./TextReveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const mounted = useMounted();

  return (
    <section
      id="about"
      className="relative bg-bone-white py-[14vh] md:py-[18vh]"
    >
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div ref={ref} className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          {/* Eyebrow on left (md:col-start-1) */}
          <div className="flex items-center gap-4 md:col-span-3 md:col-start-1 md:items-start md:pt-2">
            <span className="h-px w-12 bg-bone-deep/40" />
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-bone-deep/70">
              About
            </span>
          </div>

          {/* Right column (RTL primary): graceful prose */}
          <div className="md:col-span-9 md:col-start-4">
            <div className="space-y-8 text-right">
              <TextReveal
                text="אנחנו לא בונים מהר."
                as="p"
                className="block font-heb text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.25] tracking-[-0.02em] text-bone-ink"
                asWord
                staggerChildren={0.06}
              />
              <TextReveal
                text="אנחנו בונים בשקט — שיוודא שכל פרט יזדקק עוד שנה ועוד עשור."
                as="p"
                className="block font-heb text-[clamp(1.15rem,2vw,1.7rem)] font-light leading-[1.5] text-bone-ink/85"
                asWord
                staggerChildren={0.04}
              />
              <TextReveal
                text="עבודה לאורך הירדן המערבי, מטבריה ועד הבקעה. בוטיק קטן, בעלי מקצוע מעטים, סטנדרט גבוה."
                as="p"
                className="block max-w-2xl text-[15px] leading-[1.85] text-bone-ink/70"
                asWord
                staggerChildren={0.02}
              />
            </div>

            {/* Stats — horizontal row, no overlap */}
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-bone-deep/15 pt-10 md:gap-12">
              {stats.map((s, i) => (
                <FluidStat
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={0.2 + i * 0.2}
                  inView={inView && mounted}
                  mounted={mounted}
                />
              ))}
            </div>
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
  mounted,
}: {
  value: string;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
  mounted: boolean;
}) {
  return (
    <div className="text-right">
      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
        className="flex flex-row-reverse items-baseline justify-end gap-2"
      >
        <span className="font-heb text-[clamp(2.4rem,5vw,4rem)] font-light leading-none tracking-[-0.04em] text-bone-deep">
          {value}
        </span>
        {suffix && (
          <span className="font-heb text-[13px] text-bone-muted">{suffix}</span>
        )}
      </motion.div>
      <motion.div
        initial={mounted ? { opacity: 0 } : false}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
          delay: delay + 0.3,
        }}
        className="mt-2 text-[12px] tracking-wide text-bone-muted"
      >
        {label}
      </motion.div>
    </div>
  );
}
