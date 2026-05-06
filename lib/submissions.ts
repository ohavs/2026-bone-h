import { promises as fs } from "fs";
import path from "path";

export type Submission = {
  id: string;
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
  date: string;
  read: boolean;
};

const FILE = path.join(process.cwd(), "data", "submissions.json");

export async function readAll(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

export async function save(submissions: Submission[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(submissions, null, 2), "utf-8");
}

export async function addSubmission(data: Omit<Submission, "id" | "date" | "read">): Promise<Submission> {
  const all = await readAll();
  const entry: Submission = {
    ...data,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
  };
  await save([entry, ...all]);
  return entry;
}
