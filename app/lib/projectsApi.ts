import { Project } from "../types";

export const PROJECTS_URL =
  process.env.NEXT_PUBLIC_PROJECTS_URL ?? "http://localhost:3001/projects";

export type ProjectInput = Omit<Project, "id">;

async function safeJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const res = await fetch(PROJECTS_URL, { cache: "no-store", signal });
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
  return safeJson<Project[]>(res);
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const res = await fetch(PROJECTS_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to create project (${res.status})`);
  return safeJson<Project>(res);
}

export async function deleteProject(id: number): Promise<void> {
  const res = await fetch(`${PROJECTS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete project (${res.status})`);
}

