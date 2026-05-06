import crypto from "crypto";

const sessions = new Map<string, number>();

function cleanupSessions() {
  const now = Date.now();
  for (const [token, ts] of sessions.entries()) {
    if (now - ts > 24 * 60 * 60 * 1000) sessions.delete(token);
  }
}

export function createSession(): string {
  cleanupSessions();
  const token = crypto.randomUUID();
  sessions.set(token, Date.now());
  return token;
}

export function verifyToken(token: string): boolean {
  const ts = sessions.get(token);
  return !!ts && Date.now() - ts <= 24 * 60 * 60 * 1000;
}
