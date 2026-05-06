"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useMounted } from "@/lib/hooks";
import TextReveal from "./TextReveal";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const mounted = useMounted();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      project: (form.elements.namedItem("project") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-[14vh] md:py-[18vh]">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          {/* Heading & meta */}
          <div className="md:col-span-6 md:col-start-7 md:order-2">
            <div className="mb-6 flex items-center justify-end gap-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-bone-deep/70">
                Get in Touch
              </span>
              <span className="h-px w-12 bg-bone-deep/40" />
            </div>

            <TextReveal
              text="נשמח לשמוע מכם."
              as="h2"
              className="block text-right font-heb text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.03em] text-bone-ink"
              asWord
              staggerChildren={0.05}
            />

            <p className="mt-6 max-w-md text-right text-[14px] leading-[1.8] text-bone-ink/70 ms-auto">
              נחזור אליכם תוך יום עבודה אחד. אנחנו עובדים עם מעט פרויקטים בשנה,
              ולכן מקפידים על שיחה פתוחה לפני כל החלטה.
            </p>

            <div className="mt-12 flex flex-col items-end gap-1 text-right text-[13px] text-bone-ink/85">
              <span>טבריה · כביש 90</span>
              <a
                href="tel:+97240000000"
                dir="ltr"
                className="text-bone-deep transition-colors hover:text-bone-ink"
              >
                +972 4 000 0000
              </a>
              <a
                href="mailto:hello@bone-h.co.il"
                dir="ltr"
                className="text-bone-deep transition-colors hover:text-bone-ink"
              >
                hello@bone-h.co.il
              </a>
            </div>
          </div>

          {/* Form — wrapped in card */}
          <div className="md:col-span-6 md:col-start-1 md:order-1">
            <div className="rounded-xl border border-bone-deep/10 bg-bone-white/70 p-7 shadow-sm backdrop-blur-sm md:p-10">
              <motion.form
                onSubmit={handleSubmit}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-15% 0px" }}
                className="flex flex-col gap-5"
                aria-label="טופס יצירת קשר"
              >
                <FieldRow label="שם" name="name" type="text" required />
                <FieldRow label="טלפון" name="phone" type="tel" dir="ltr" />
                <FieldRow label="אימייל" name="email" type="email" dir="ltr" required />
                <FieldRow label="פרויקט" name="project" type="text" />
                <FieldArea label="הודעה" name="message" />

                <div className="mt-6 flex justify-end">
                  <WaveSubmit sent={sent} loading={loading} />
                </div>

                <p
                  className="text-right text-[12px] text-bone-muted"
                  aria-live="polite"
                  role="status"
                >
                  {sent
                    ? "✓ תודה. נחזור אליכם בקרוב."
                    : error
                    ? "אירעה שגיאה — אנא נסו שוב או פנו ישירות בטלפון."
                    : "פרטיותכם שמורה. ההודעה לא נשלחת לרשימות תפוצה."}
                </p>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldRow({
  label,
  name,
  type,
  dir,
  required,
}: {
  label: string;
  name: string;
  type: string;
  dir?: "ltr" | "rtl";
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-right text-[11px] uppercase tracking-[0.3em] text-bone-deep/70"
      >
        {label}
        {required && <span className="ms-1 text-bone-deep/50" aria-label="שדה חובה">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        className="field-underline text-right"
        autoComplete="off"
        data-cursor="hover"
        required={required}
      />
    </div>
  );
}

function FieldArea({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-right text-[11px] uppercase tracking-[0.3em] text-bone-deep/70"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        className="field-underline resize-none text-right"
        data-cursor="hover"
      />
    </div>
  );
}

function WaveSubmit({ sent, loading }: { sent: boolean; loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={sent || loading}
      data-cursor="hover"
      aria-busy={loading}
      className="group relative inline-flex flex-row-reverse items-center gap-3 overflow-hidden rounded-full border border-bone-deep/40 px-7 py-3.5 text-[12px] uppercase tracking-[0.35em] text-bone-deep transition-colors duration-700 hover:text-bone-white disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span className="pointer-events-none absolute inset-0 -z-0 translate-y-full bg-bone-deep transition-transform duration-[900ms] ease-out-expo group-hover:translate-y-0" />
      <span className="relative z-10">
        {loading ? "שולח..." : sent ? "נשלח" : "שלחו הודעה"}
      </span>
      {!sent && (
        <svg width="14" height="9" viewBox="0 0 14 9" className="relative z-10" aria-hidden>
          <path
            d="M13 4.5 H 1 M5 1 L 1 4.5 L 5 8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
