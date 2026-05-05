"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { create } from "@/api/ServerFunctions";
import type { AuthUser } from "@/types";
import { useAuth } from "@/auth/useAuth";

type DbUser = {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutation({
    mutationFn: (payload: Omit<DbUser, "id">) => create<DbUser>("users", payload),
    onSuccess: async (newUser) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      const authUser: AuthUser = {
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
        avatar: newUser.avatar,
      };
      login(authUser);
      toast.success("Registered & logged in");
      router.push("/");
    },
    onError: () => {
      toast.error("Register failed");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    mutation.mutate({
      name: name.trim(),
      role: role.trim() || undefined,
      avatar: avatar.trim() || undefined,
    });
  };

  return (
    <main className="container py-10">
      <div className="max-w-xl rounded-lg border p-5" style={{ borderColor: "var(--color-border)" }}>
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
          Register (json-server)
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
          Creates a user in `db.json` via json-server, then logs you in (no token).
        </p>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (optional)"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}
          />
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Avatar URL (optional)"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-md px-3 py-2 text-sm disabled:opacity-60"
            style={{ background: "var(--color-surface-2)", color: "var(--color-text)" }}
          >
            {mutation.isPending ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </main>
  );
}