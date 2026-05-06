import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory session store — tokens expire after 24 h
const sessions = new Map<string, number>();

function cleanupSessions() {
  const now = Date.now();
  for (const [token, ts] of sessions.entries()) {
    if (now - ts > 24 * 60 * 60 * 1000) sessions.delete(token);
  }
}

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD ?? "admin";

  if (!password || password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  cleanupSessions();
  const token = crypto.randomUUID();
  sessions.set(token, Date.now());
  return NextResponse.json({ ok: true, token });
}

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token") ?? "";
  const ts = sessions.get(token);
  if (!ts || Date.now() - ts > 24 * 60 * 60 * 1000) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

export function verifyToken(token: string): boolean {
  const ts = sessions.get(token);
  return !!ts && Date.now() - ts <= 24 * 60 * 60 * 1000;
}
