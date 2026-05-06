import Link from "next/link";

export default function LegalPage({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bone-white pt-28 pb-24 md:pt-36">
      <div className="mx-auto max-w-[760px] px-6 md:px-12">
        {/* Back */}
        <Link
          href="/"
          className="mb-10 inline-flex flex-row-reverse items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-bone-muted transition-colors hover:text-bone-deep"
        >
          <span>חזרה לדף הבית</span>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
            <path
              d="M1 4.5 H 13 M9 1 L 13 4.5 L 9 8"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Header */}
        <header className="mb-12 border-b border-bone-deep/15 pb-8 text-right">
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-bone-deep/60">
            {subtitle ?? "מסמך משפטי"}
          </p>
          <h1 className="font-heb text-[clamp(2rem,5vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-bone-ink">
            {title}
          </h1>
          <p className="mt-4 text-[12px] text-bone-muted">
            עדכון אחרון: {lastUpdated}
          </p>
        </header>

        {/* Content */}
        <article className="legal-prose text-right" dir="rtl">
          {children}
        </article>
      </div>
    </div>
  );
}
