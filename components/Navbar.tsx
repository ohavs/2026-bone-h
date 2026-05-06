"use client";

import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

  // ─── Hidden admin entry: 10 clicks on logo within 4s ─────────────────────
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleLogoClick = (e: React.MouseEvent) => {
    // Reset inactivity timer
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setClickCount(0), 4000);

    const next = clickCount + 1;
    if (next >= 10) {
      e.preventDefault();
      setClickCount(0);
      setShowLogin(true);
    } else {
      setClickCount(next);
    }
  };

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 30);
  });

  return (
    <>
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
          {/* Logo — click 10× to open admin */}
          <Link
            href="/"
            onClick={handleLogoClick}
            data-cursor="hover"
            className="shrink-0 font-display text-[13px] tracking-[0.3em] text-bone-deep select-none"
            aria-label="בונה הירדן המערבי — דף הבית"
          >
            B / H
          </Link>

          {/* Desktop links */}
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
                      className={`absolute -bottom-0.5 right-0 h-px bg-bone-deep transition-[width] duration-700 ease-out-expo ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            data-cursor="hover"
            className="hidden shrink-0 rounded-full bg-bone-deep px-5 py-2 text-[12px] tracking-[0.05em] text-bone-white transition-colors duration-500 hover:bg-bone-ink md:inline-block"
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

        {/* Mobile drawer */}
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8, pointerEvents: open ? "auto" : "none" }}
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

      {/* Admin login modal */}
      <AdminLoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

// ─── Admin Login Modal ────────────────────────────────────────────────────────

function AdminLoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setPassword("");
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        sessionStorage.setItem("admin-token", token);
        onClose();
        router.push("/admin");
      } else {
        setError(true);
        setPassword("");
        inputRef.current?.focus();
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-bone-ink/20 backdrop-blur-sm"
            aria-hidden
          />
          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal
            aria-label="כניסה לניהול"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[30%] z-[120] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-bone-deep/15 bg-bone-white p-8 shadow-[0_24px_80px_-20px_rgba(31,59,56,0.3)]"
          >
            <h2 className="mb-6 text-center font-display text-[12px] uppercase tracking-[0.4em] text-bone-deep">
              כניסה לניהול
            </h2>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="סיסמה"
                className="field-underline text-center text-[16px] tracking-[0.2em] placeholder:tracking-normal"
                autoComplete="current-password"
                dir="ltr"
              />
              {error && (
                <p className="text-center text-[12px] text-red-500" role="alert">
                  סיסמה שגויה
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !password}
                className="mt-2 rounded-full bg-bone-deep py-3 text-[12px] uppercase tracking-[0.3em] text-bone-white transition-colors duration-500 hover:bg-bone-ink disabled:opacity-50"
              >
                {loading ? "..." : "כניסה"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
