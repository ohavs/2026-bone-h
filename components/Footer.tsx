"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/hooks";

export default function Footer() {
  const mounted = useMounted();

  return (
    <footer className="relative pb-12 pt-[10vh]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={mounted ? { scaleX: 0 } : false}
          whileInView={mounted ? { scaleX: 1 } : undefined}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 h-px w-full origin-right bg-bone-deep/15"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end">
          <div className="md:order-2 md:text-right">
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
          </div>

          <div className="text-right text-[12px] text-bone-muted md:order-1 md:text-left">
            <div>© {new Date().getFullYear()} Boneh HaYarden</div>
            <div className="mt-1">All rights reserved.</div>
          </div>

          <nav className="md:order-3 md:text-right">
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
