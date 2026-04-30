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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed top-4 right-4 left-4 z-50"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(247,245,238,0.95)"
            : "rgba(247,245,238,0)",
          borderColor: scrolled
            ? "rgba(31,59,56,0.12)"
            : "rgba(31,59,56,0)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-[1400px] items-center justify-between rounded-lg border px-6 py-4 md:px-8"
      >
        {/* Logo */}
        <a
          href="#top"
          className="font-display text-sm tracking-[0.3em] text-bone-deep shrink-0"
          data-cursor="hover"
        >
          B / H
        </a>

        {/* Desktop Menu */}
        <ul className="hidden flex-row-reverse items-center gap-12 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="hover"
                className="group relative inline-block py-1 text-sm text-bone-ink/85 transition-colors duration-300 hover:text-bone-deep"
              >
                <span>{l.label}</span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-bone-deep transition-all duration-700 ease-out-expo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          data-cursor="hover"
          className="hidden text-sm font-medium text-bone-deep md:inline-block shrink-0"
        >
          דברו איתנו
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-cursor="hover"
          className="text-bone-deep md:hidden shrink-0"
          aria-label="תפריט"
          aria-expanded={mobileMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={mobileMenuOpen ? "M6 6L18 18M6 18L18 6" : "M3 6H21M3 12H21M3 18H21"} strokeLinecap="round" />
          </svg>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-16 right-0 left-0 mx-4 rounded-lg border border-bone-deep/10 bg-bone-white/98 backdrop-blur-md overflow-hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                data-cursor="hover"
                className="block px-4 py-3 text-right text-sm text-bone-ink/80 hover:text-bone-deep hover:bg-bone-aqua/5 rounded transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              data-cursor="hover"
              className="block px-4 py-3 text-right text-sm font-medium text-bone-deep hover:bg-bone-deep/5 rounded transition-colors"
            >
              צור קשר
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
