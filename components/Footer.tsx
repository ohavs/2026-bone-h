"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative pb-12 pt-[14vh]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 h-px w-full origin-right bg-bone-deep/20"
        />

        <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <div className="text-right">
            <div className="font-display text-sm tracking-[0.4em] text-bone-deep">
              B / H
            </div>
            <div className="mt-2 font-heb text-[clamp(1.4rem,2.4vw,1.8rem)] font-light text-bone-ink">
              בונה הירדן המערבי
            </div>
          </div>

          <div className="text-right text-[12px] text-bone-muted md:text-left">
            <div>© {new Date().getFullYear()} Boneh HaYarden — All rights reserved.</div>
            <div className="mt-1">בנייה שקטה לאורך הירדן המערבי.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
