"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API, Getusers, getAll } from "../api/ServerFunctions";
import type { AuthUser } from "@/types";
import { useAuth } from "../auth/useAuth";

type DbUser = {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const nextPath = searchParams.get("next") || "/";
  const { isLoggedIn, login, user } = useAuth();
  const [selectedId, setSelectedId] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => Getusers<DbUser>(API),
  });

  const users = data ?? [];
  const selected = useMemo(() => users.find((u) => u.id === selectedId) ?? null, [users, selectedId]);

  if (isLoggedIn) {
    return (
      <main className="container py-10">
        <div className="rounded-lg border p-5" style={{ borderColor: "var(--color-border)" }}>
          <div className="text-sm" style={{ color: "var(--color-muted)" }}>
            You are already logged in as{" "}
            <span className="font-medium" style={{ color: "var(--color-text)" }}>
              {user?.name}
            </span>
            .
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-10">
      <div className="max-w-xl rounded-lg border p-5" style={{ borderColor: "var(--color-border)" }}>
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
          Login
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
          Select a user from json-server to create an auth cookie.
        </p>

        <div className="mt-4 grid gap-3">
          {isLoading ? (
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>
              Loading users...
            </div>
          ) : isError ? (
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>
              Failed to load users. Make sure json-server is running on port 3001.
            </div>
          ) : (
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}
            >
              <option value="" disabled>
                Choose a user...
              </option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} {u.role ? `— ${u.role}` : ""}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              const authUser: AuthUser = {
                id: selected.id,
                name: selected.name,
                role: selected.role,
                avatar: selected.avatar,
              };
              login(authUser);
              toast.success("Logged in");
              router.push(nextPath);
            }}
            className="rounded-md px-3 py-2 text-sm disabled:opacity-60"
            style={{ background: "var(--color-surface-2)", color: "var(--color-text)" }}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}