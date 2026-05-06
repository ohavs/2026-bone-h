"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Prefs = {
  largeFonts: boolean;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
};

const DEFAULT_PREFS: Prefs = {
  largeFonts: false,
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
};

function applyPrefs(prefs: Prefs) {
  const cl = document.documentElement.classList;
  cl.toggle("a11y-large-fonts", prefs.largeFonts);
  cl.toggle("a11y-high-contrast", prefs.highContrast);
  cl.toggle("a11y-underline-links", prefs.underlineLinks);
  cl.toggle("a11y-reduce-motion", prefs.reduceMotion);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("a11y-prefs");
      if (stored) {
        const p = JSON.parse(stored) as Prefs;
        setPrefs(p);
        applyPrefs(p);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = (key: keyof Prefs) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      applyPrefs(next);
      try {
        localStorage.setItem("a11y-prefs", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const reset = () => {
    setPrefs(DEFAULT_PREFS);
    applyPrefs(DEFAULT_PREFS);
    try {
      localStorage.removeItem("a11y-prefs");
    } catch {}
  };

  return (
    <div className="fixed bottom-6 left-4 z-[95] md:bottom-8 md:left-6">
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="כלי נגישות"
          className="mb-3 w-[230px] rounded-xl border border-bone-deep/15 bg-bone-white/95 p-4 shadow-[0_12px_40px_-12px_rgba(31,59,56,0.2)] backdrop-blur-md"
        >
          <h2 className="mb-3 text-right text-[11px] uppercase tracking-[0.3em] text-bone-deep/70">
            כלי נגישות
          </h2>

          <div className="space-y-1">
            <Toggle
              label="הגדל טקסט"
              active={prefs.largeFonts}
              onToggle={() => toggle("largeFonts")}
            />
            <Toggle
              label="ניגודיות גבוהה"
              active={prefs.highContrast}
              onToggle={() => toggle("highContrast")}
            />
            <Toggle
              label="הדגש קישורים"
              active={prefs.underlineLinks}
              onToggle={() => toggle("underlineLinks")}
            />
            <Toggle
              label="בטל אנימציות"
              active={prefs.reduceMotion}
              onToggle={() => toggle("reduceMotion")}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-bone-deep/10 pt-3">
            <button
              onClick={reset}
              className="text-[11px] text-bone-muted underline-offset-2 hover:underline"
            >
              איפוס
            </button>
            <Link
              href="/accessibility"
              onClick={() => setOpen(false)}
              className="text-[11px] text-bone-deep underline-offset-2 hover:underline"
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "סגור כלי נגישות" : "פתח כלי נגישות"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-bone-deep/25 bg-bone-white shadow-md transition-[background-color,border-color] duration-300 hover:border-bone-deep hover:bg-bone-deep hover:text-bone-white text-bone-deep"
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}

function Toggle({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      className="flex w-full flex-row-reverse items-center justify-between rounded-lg px-2 py-2 text-right text-[13px] text-bone-ink/80 transition-colors hover:bg-bone-aqua/10"
    >
      <span>{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-300 ${
          active ? "bg-bone-deep" : "bg-bone-gray/40"
        }`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
            active ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

function AccessibilityIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M7 8h10M12 8v4m0 0-3 5m3-5 3 5" />
    </svg>
  );
}
