"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import TextReveal from "./TextReveal";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-[18vh] md:py-[24vh]">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-bone-deep/40" />
              <span className="text-[11px] uppercase tracking-[0.45em] text-bone-deep/70">
                <span className="font-sans">Get in touch</span>
              </span>
            </div>

            <TextReveal
              text="נשמח לשמוע אתכם — לאט, ובלי טפסים מסורבלים."
              as="h2"
              className="mt-8 max-w-2xl text-right font-heb text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.1] tracking-[-0.03em] text-bone-ink"
              asWord
              staggerChildren={0.04}
            />

            <p className="mt-6 max-w-md text-right text-[14px] leading-[1.8] text-bone-muted">
              נחזור אליכם תוך יום עבודה אחד. אנחנו עובדים עם מעט פרויקטים בשנה,
              ולכן מקפידים על שיחה פתוחה לפני כל החלטה.
            </p>

            <div className="mt-12 flex flex-col gap-2 text-right text-[13px] text-bone-ink/80 md:gap-1">
              <span>טבריה · כביש 90</span>
              <span dir="ltr" className="text-bone-deep">
                +972 4 000 0000
              </span>
              <span dir="ltr" className="text-bone-deep">
                hello@bone-h.co.il
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className="flex flex-col gap-2"
              aria-label="טופס יצירת קשר"
            >
              <FieldRow label="שם" name="name" type="text" />
              <FieldRow label="טלפון" name="phone" type="tel" dir="ltr" />
              <FieldRow label="אימייל" name="email" type="email" dir="ltr" />
              <FieldRow label="פרויקט" name="project" type="text" />
              <FieldArea label="הודעה" name="message" />

              <div className="mt-10">
                <WaveSubmit sent={sent} />
              </div>

              <p
                className="mt-4 text-right text-[12px] text-bone-muted"
                aria-live="polite"
              >
                {sent
                  ? "תודה. ההודעה נשמרה — נחזור בקרוב."
                  : "פרטיותכם שמורה. ההודעה לא נשלחת לרשימות תפוצה."}
              </p>
            </motion.form>
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
}: {
  label: string;
  name: string;
  type: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-right text-[11px] uppercase tracking-[0.3em] text-bone-deep/70"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        className="field-underline text-right"
        autoComplete="off"
        data-cursor="hover"
      />
    </div>
  );
}

function FieldArea({ label, name }: { label: string; name: string }) {
  return (
    <div className="mt-2 flex flex-col">
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

function WaveSubmit({ sent }: { sent: boolean }) {
  return (
    <button
      type="submit"
      disabled={sent}
      data-cursor="hover"
      className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-bone-deep/30 px-7 py-3.5 text-[12px] uppercase tracking-[0.4em] text-bone-deep transition-colors duration-700 hover:text-bone-white disabled:opacity-60"
    >
      {/* Wave fill */}
      <span className="pointer-events-none absolute inset-0 -z-0 translate-y-full transition-transform duration-[1100ms] ease-out-expo group-hover:translate-y-0">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="wave-anim absolute inset-x-0 -top-6 h-[140%] w-[200%]"
          aria-hidden
        >
          <path
            d="M0 100 C 150 30, 350 170, 600 100 C 850 30, 1050 170, 1200 100 L 1200 200 L 0 200 Z"
            fill="#3D6F6A"
          />
        </svg>
        <span className="absolute inset-0 bg-bone-deep" />
      </span>

      <span className="relative z-10 transition-transform duration-700 ease-out-expo group-hover:-translate-x-1">
        {sent ? "נשלח" : "שלחו הודעה"}
      </span>
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        className="relative z-10"
        aria-hidden
      >
        <path
          d="M19 5 H 2 M6 1 L 2 5 L 6 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
