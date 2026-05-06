"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/hooks";

const marqueeText =
  "טבריה · כינרת · גלבוע · בקעת הירדן · מגורי יוקרה · בנייה שקטה · ";

export default function Footer() {
  const mounted = useMounted();

  return (
    <footer className="relative pb-12 pt-[14vh]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Animated divider */}
        <motion.div
          initial={mounted ? { scaleX: 0 } : false}
          whileInView={mounted ? { scaleX: 1 } : undefined}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-0 h-px w-full origin-right bg-bone-deep/15"
        />

        {/* Marquee belt */}
        <div className="overflow-hidden border-b border-bone-deep/10 py-4">
          <div className="marquee flex whitespace-nowrap" aria-hidden>
            <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.45em] text-bone-deep/25">
              {marqueeText.repeat(8)}
            </span>
            <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.45em] text-bone-deep/25">
              {marqueeText.repeat(8)}
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end">
          {/* Brand + CTA — center col */}
          <div className="md:order-2 md:text-center">
            <Link
              href="/"
              data-cursor="hover"
              className="font-display text-[13px] tracking-[0.4em] text-bone-deep"
            >
              B / H
            </Link>
            <div className="mt-2 font-heb text-[clamp(1.4rem,2.4vw,1.8rem)] font-light text-bone-ink">
              בונה הירדן המערבי
            </div>
            <div className="mt-5">
              <Link
                href="/#contact"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-bone-deep/30 px-6 py-2.5 text-[11px] uppercase tracking-[0.3em] text-bone-deep transition-[background-color,color,border-color] duration-500 hover:bg-bone-deep hover:text-bone-white hover:border-bone-deep"
              >
                בואו נדבר
              </Link>
            </div>
          </div>

          {/* Copyright + legal links — left col */}
          <div className="text-right text-[12px] text-bone-muted md:order-1 md:text-left">
            <div>© {new Date().getFullYear()} Boneh HaYarden</div>
            <div className="mt-1">All rights reserved.</div>
            <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-x-0 md:gap-y-1.5" aria-label="קישורים משפטיים">
              <Link
                href="/accessibility"
                className="text-[11px] text-bone-muted/80 transition-colors hover:text-bone-deep"
              >
                הצהרת נגישות
              </Link>
              <Link
                href="/privacy"
                className="text-[11px] text-bone-muted/80 transition-colors hover:text-bone-deep"
              >
                מדיניות פרטיות
              </Link>
              <Link
                href="/terms"
                className="text-[11px] text-bone-muted/80 transition-colors hover:text-bone-deep"
              >
                תנאי שימוש
              </Link>
            </nav>
          </div>

          {/* Nav links — right col */}
          <nav className="md:order-3 md:text-right" aria-label="ניווט ראשי">
            <ul className="flex flex-col gap-2 text-right text-[13px]">
              <li>
                <Link
                  href="/projects"
                  data-cursor="hover"
                  className="text-bone-ink/75 transition-colors hover:text-bone-deep"
                >
                  פרויקטים
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  data-cursor="hover"
                  className="text-bone-ink/75 transition-colors hover:text-bone-deep"
                >
                  אודות
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  data-cursor="hover"
                  className="text-bone-ink/75 transition-colors hover:text-bone-deep"
                >
                  המלצות
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  data-cursor="hover"
                  className="text-bone-ink/75 transition-colors hover:text-bone-deep"
                >
                  צור קשר
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
