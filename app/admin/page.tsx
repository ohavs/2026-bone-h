"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, ACTIVE_LABELS } from "@/lib/data";
import type { Submission } from "@/lib/submissions";

type Tab = "submissions" | "projects";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" }) +
    " · " + d.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
}

function statusColor(s: string) {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    construction: "bg-amber-100 text-amber-700",
    rent: "bg-sky-100 text-sky-700",
    sold: "bg-bone-ink/10 text-bone-ink/60",
  };
  return map[s] ?? "bg-bone-aqua/10 text-bone-deep";
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = sessionStorage.getItem("admin-token") ?? "";
    if (!t) { router.replace("/"); return; }
    setToken(t);

    fetch("/api/admin/login", { headers: { "x-admin-token": t } })
      .then((r) => { if (!r.ok) { router.replace("/"); } })
      .catch(() => router.replace("/"));
  }, [router]);

  useEffect(() => {
    if (!token) return;
    fetchSubmissions();
  }, [token]);

  async function fetchSubmissions() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { "x-admin-token": token },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id: string) {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, read: true } : s));
  }

  async function deleteSubmission(id: string) {
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  function logout() {
    sessionStorage.removeItem("admin-token");
    router.push("/");
  }

  const unread = submissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-bone-beige/40 pb-24 md:pb-0" dir="rtl">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-bone-deep/10 bg-bone-white/90 px-5 py-4 backdrop-blur-md md:px-8">
        <span className="font-display text-[12px] tracking-[0.3em] text-bone-deep">
          B / H &nbsp;ניהול
        </span>
        <button
          onClick={logout}
          className="rounded-full border border-bone-deep/20 px-4 py-1.5 text-[11px] tracking-[0.05em] text-bone-ink/70 transition-colors hover:border-bone-deep/50 hover:text-bone-deep"
        >
          יציאה
        </button>
      </header>

      {/* Desktop tabs */}
      <div className="hidden border-b border-bone-deep/10 bg-bone-white md:flex">
        <TabBtn active={tab === "submissions"} onClick={() => setTab("submissions")}>
          פניות{unread > 0 && <Badge n={unread} />}
        </TabBtn>
        <TabBtn active={tab === "projects"} onClick={() => setTab("projects")}>
          פרויקטים
        </TabBtn>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
        {tab === "submissions" && (
          <SubmissionsTab
            submissions={submissions}
            loading={loading}
            onMarkRead={markRead}
            onDelete={deleteSubmission}
            onRefresh={fetchSubmissions}
          />
        )}
        {tab === "projects" && <ProjectsTab />}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 flex border-t border-bone-deep/10 bg-bone-white/95 backdrop-blur-md md:hidden">
        <MobileTabBtn active={tab === "submissions"} onClick={() => setTab("submissions")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>פניות</span>
          {unread > 0 && <Badge n={unread} />}
        </MobileTabBtn>
        <MobileTabBtn active={tab === "projects"} onClick={() => setTab("projects")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>פרויקטים</span>
        </MobileTabBtn>
      </nav>
    </div>
  );
}

// ─── UI Primitives ───────────────────────────────────────────────────────────

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-7 py-4 text-[12px] tracking-[0.1em] transition-colors ${
        active ? "text-bone-deep" : "text-bone-ink/50 hover:text-bone-ink"
      }`}
    >
      {children}
      {active && <span className="absolute bottom-0 left-0 right-0 h-px bg-bone-deep" />}
    </button>
  );
}

function MobileTabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-[10px] tracking-[0.05em] transition-colors ${
        active ? "text-bone-deep" : "text-bone-ink/40"
      }`}
    >
      {children}
    </button>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-bone-deep px-1 text-[9px] text-bone-white">
      {n}
    </span>
  );
}

// ─── Submissions Tab ─────────────────────────────────────────────────────────

function SubmissionsTab({
  submissions,
  loading,
  onMarkRead,
  onDelete,
  onRefresh,
}: {
  submissions: Submission[];
  loading: boolean;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-bone-beige/60" />
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center text-bone-ink/40">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[14px]">אין פניות עדיין</p>
        <button onClick={onRefresh} className="text-[12px] text-bone-aqua underline-offset-4 hover:underline">
          רענן
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-bone-ink/50">{submissions.length} פניות סה"כ</p>
        <button onClick={onRefresh} className="text-[11px] text-bone-aqua underline-offset-4 hover:underline">
          רענן
        </button>
      </div>

      {submissions.map((s) => (
        <div
          key={s.id}
          className={`rounded-xl border bg-bone-white transition-shadow ${
            s.read
              ? "border-bone-deep/8"
              : "border-bone-deep/20 shadow-sm"
          }`}
        >
          {/* Card header */}
          <button
            className="flex w-full items-start gap-3 p-4 text-right"
            onClick={() => {
              setExpanded((prev) => (prev === s.id ? null : s.id));
              if (!s.read) onMarkRead(s.id);
            }}
          >
            {/* Unread dot */}
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.read ? "bg-transparent" : "bg-bone-deep"}`} aria-label={s.read ? "" : "לא נקרא"} />

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate font-medium text-[14px] text-bone-deep">{s.name}</span>
                <span className="shrink-0 text-[11px] text-bone-ink/40">{formatDate(s.date)}</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-bone-ink/60">
                {s.phone || s.email}
                {s.project ? ` · ${s.project}` : ""}
              </p>
              {s.message && !expanded && (
                <p className="mt-1 truncate text-[12px] text-bone-ink/40">{s.message}</p>
              )}
            </div>

            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className={`shrink-0 mt-1 transition-transform ${expanded === s.id ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Expanded details */}
          {expanded === s.id && (
            <div className="border-t border-bone-deep/8 px-4 pb-4 pt-3">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
                {s.phone && (
                  <>
                    <dt className="text-bone-ink/40">טלפון</dt>
                    <dd><a href={`tel:${s.phone}`} className="text-bone-deep underline-offset-2 hover:underline">{s.phone}</a></dd>
                  </>
                )}
                <dt className="text-bone-ink/40">מייל</dt>
                <dd><a href={`mailto:${s.email}`} className="text-bone-deep underline-offset-2 hover:underline">{s.email}</a></dd>
                {s.project && (
                  <>
                    <dt className="text-bone-ink/40">פרויקט</dt>
                    <dd className="text-bone-ink">{s.project}</dd>
                  </>
                )}
              </dl>
              {s.message && (
                <div className="mt-3 rounded-lg bg-bone-beige/60 p-3 text-[13px] leading-relaxed text-bone-ink/80">
                  {s.message}
                </div>
              )}
              <div className="mt-4 flex justify-end gap-3">
                {!s.read && (
                  <button
                    onClick={() => onMarkRead(s.id)}
                    className="rounded-full border border-bone-deep/20 px-4 py-1.5 text-[11px] tracking-[0.05em] text-bone-deep transition-colors hover:bg-bone-deep/5"
                  >
                    סמן כנקרא
                  </button>
                )}
                <button
                  onClick={() => onDelete(s.id)}
                  className="rounded-full border border-red-200 px-4 py-1.5 text-[11px] tracking-[0.05em] text-red-500 transition-colors hover:bg-red-50"
                >
                  מחק
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Projects Tab ────────────────────────────────────────────────────────────

function ProjectsTab() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] text-bone-ink/50">{projects.length} פרויקטים</p>
      {projects.map((p) => (
        <div key={p.id} className="flex items-center gap-4 rounded-xl border border-bone-deep/10 bg-bone-white p-4">
          <img
            src={p.image}
            alt={p.title}
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-[14px] text-bone-deep truncate">{p.title}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${statusColor(p.status)}`}>
                {ACTIVE_LABELS[p.status]}
              </span>
            </div>
            <p className="mt-0.5 text-[12px] text-bone-ink/60">{p.city} · {p.type}</p>
            {p.units && <p className="mt-0.5 text-[11px] text-bone-ink/40">{p.units}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
