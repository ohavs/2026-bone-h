"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMounted } from "@/lib/hooks";

const links = [
  { href: "/projects", label: "פרויקטים" },
  { href: "/#about", label: "אודות" },
  { href: "/#testimonials", label: "המלצות" },
  { href: "/#contact", label: "צור קשר" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 30);
  });

  return (
    <motion.header
      initial={mounted ? { y: -30, opacity: 0 } : false}
      animate={mounted ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed inset-x-4 top-4 z-50"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(247,245,238,0.7)"
            : "rgba(247,245,238,0.35)",
          borderColor: scrolled
            ? "rgba(31,59,56,0.12)"
            : "rgba(31,59,56,0.05)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 rounded-full border px-5 py-3 shadow-[0_8px_32px_-12px_rgba(31,59,56,0.08)] backdrop-blur-xl md:px-8"
      >
        {/* Logo (RTL: right side = start) */}
        <Link
          href="/"
          data-cursor="hover"
          className="shrink-0 font-display text-[13px] tracking-[0.3em] text-bone-deep"
        >
          B / H
        </Link>

        {/* Desktop links - centered */}
        <ul className="hidden flex-1 flex-row-reverse items-center justify-center gap-10 md:flex">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href === "/projects" && pathname?.startsWith("/projects"));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  data-cursor="hover"
                  className={`group relative inline-block py-1 text-[13px] transition-colors duration-300 ${
                    active ? "text-bone-deep" : "text-bone-ink/80 hover:text-bone-deep"
                  }`}
                >
                  <span>{l.label}</span>
                  <span
                    className={`absolute -bottom-0.5 right-0 h-px bg-bone-deep transition-all duration-700 ease-out-expo ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA on left (RTL end) */}
        <Link
          href="/#contact"
          data-cursor="hover"
          className="hidden shrink-0 rounded-full bg-bone-deep px-5 py-2 text-[12px] tracking-[0.05em] text-bone-white transition-all duration-500 hover:bg-bone-ink md:inline-block"
        >
          דברו איתנו
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={open}
          data-cursor="hover"
          className="shrink-0 p-2 text-bone-deep md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path
              d={open ? "M6 6L18 18M6 18L18 6" : "M4 7H20M4 12H20M4 17H20"}
              strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.nav>

      {/* Mobile menu drawer */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : -8,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 overflow-hidden rounded-2xl border border-bone-deep/10 bg-bone-white/95 shadow-[0_12px_40px_-12px_rgba(31,59,56,0.18)] backdrop-blur-xl md:hidden"
        aria-hidden={!open}
      >
        <ul className="flex flex-col p-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                data-cursor="hover"
                className="block rounded-xl px-5 py-3.5 text-right text-[14px] text-bone-ink/85 transition-colors hover:bg-bone-aqua/10 hover:text-bone-deep"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
