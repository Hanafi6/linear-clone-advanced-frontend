"use client";

import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { fadeIn, hoverCard } from "../lib/motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthBadge from "./AuthBadge";


function NavBar() {
  const pathname = usePathname();
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--color-border)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 90%, transparent 10%), color-mix(in oklab, var(--color-surface) 92%, transparent 8%))",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="container min-h-[70px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.div
            {...hoverCard}
            className="select-none font-semibold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            <Link href="/">Lenear</Link>
          </motion.div>

          <nav className="hidden sm:flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
            {[
              { href: "/", label: "Home" },
              { href: "/projects", label: "Projects" },
            ].map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 transition-colors"
                  style={{
                    color: active ? "var(--color-text)" : "var(--color-muted)",
                    background: active ? "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <AuthBadge />
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}

export default NavBar;