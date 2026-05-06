import { NextResponse } from "next/server";
import { createSession, verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD ?? "admin";

  if (!password || password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = createSession();
  return NextResponse.json({ ok: true, token });
}

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token") ?? "";
  if (!verifyToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
