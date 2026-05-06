import { NextResponse } from "next/server";
import { readAll, save } from "@/lib/submissions";
import { verifyToken } from "@/lib/auth";

function auth(request: Request): boolean {
  const token = request.headers.get("x-admin-token") ?? "";
  return verifyToken(token);
}

export async function GET(request: Request) {
  if (!auth(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const all = await readAll();
  return NextResponse.json({ ok: true, submissions: all });
}

export async function PATCH(request: Request) {
  if (!auth(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = (await request.json()) as { id?: string };
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  const all = await readAll();
  const updated = all.map((s) => (s.id === id ? { ...s, read: true } : s));
  await save(updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!auth(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = (await request.json()) as { id?: string };
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  const all = await readAll();
  await save(all.filter((s) => s.id !== id));
  return NextResponse.json({ ok: true });
}
