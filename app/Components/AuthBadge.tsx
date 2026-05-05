"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";

export default function AuthBadge() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="rounded-md px-3 py-2 text-sm transition-colors"
        style={{
          color: "var(--color-text)",
          background: "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)",
        }}
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-2 rounded-full border px-2 py-1"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full" />
        ) : (
          <div className="h-7 w-7 rounded-full" style={{ background: "var(--color-surface-2)" }} />
        )}
        <div className="max-w-[140px] truncate text-xs sm:text-sm" style={{ color: "var(--color-text)" }}>
          {user?.name}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="rounded-md px-3 py-2 text-sm transition-colors"
        style={{
          color: "var(--color-text)",
          background: "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)",
        }}
      >
        Logout
      </button>
    </div>
  );
}

