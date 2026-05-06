"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="הסכמה לעוגיות"
          aria-live="polite"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-xl rounded-xl border border-bone-deep/15 bg-bone-white/95 p-5 shadow-[0_16px_48px_-12px_rgba(31,59,56,0.22)] backdrop-blur-md md:left-auto md:right-6 md:max-w-sm"
        >
          <p className="text-right text-[13px] leading-[1.7] text-bone-ink/80">
            אתר זה משתמש בעוגיות חיוניות בלבד לצורך תפעול תקין. אין אנו משתמשים
            בעוגיות שיווקיות או מעקב.{" "}
            <Link
              href="/privacy"
              className="text-bone-deep underline-offset-2 hover:underline"
            >
              מדיניות פרטיות
            </Link>
          </p>
          <div className="mt-4 flex flex-row-reverse items-center gap-3">
            <button
              onClick={accept}
              className="rounded-full bg-bone-deep px-5 py-2 text-[12px] uppercase tracking-[0.2em] text-bone-white transition-colors duration-300 hover:bg-bone-ink"
            >
              הבנתי
            </button>
            <Link
              href="/privacy"
              className="text-[12px] text-bone-muted underline-offset-2 hover:underline"
            >
              קרא עוד
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
