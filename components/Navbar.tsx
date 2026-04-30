"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#projects", label: "פרויקטים" },
  { href: "#about", label: "אודות" },
  { href: "#testimonials", label: "המלצות" },
  { href: "#contact", label: "צור קשר" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(247,245,238,0.78)"
            : "rgba(247,245,238,0)",
          borderColor: scrolled
            ? "rgba(31,59,56,0.08)"
            : "rgba(31,59,56,0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border px-6 py-3 md:px-8"
      >
        <a
          href="#top"
          className="font-display text-sm tracking-[0.3em] text-bone-deep"
          data-cursor="hover"
        >
          B / H
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="hover"
                className="group relative inline-block py-1 text-sm text-bone-ink/80 transition-colors duration-300 hover:text-bone-deep"
              >
                <span>{l.label}</span>
                <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-bone-deep transition-all duration-700 ease-out-expo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          data-cursor="hover"
          className="hidden text-sm text-bone-deep md:inline-block"
        >
          <span className="relative">
            דברו איתנו
            <span className="absolute -bottom-1 right-0 h-px w-full bg-bone-deep/30" />
          </span>
        </a>

        <a
          href="#contact"
          data-cursor="hover"
          className="text-sm text-bone-deep md:hidden"
        >
          ☰
        </a>
      </motion.nav>
    </motion.header>
  );
}
