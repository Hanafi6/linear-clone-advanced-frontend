
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

function Icon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="grid size-9 place-items-center rounded-xl"
      style={{
        background: "color-mix(in oklab, var(--color-surface-2) 65%, transparent 35%)",
        border: "1px solid var(--color-border)",
      }}
    >
      {children}
    </span>
  );
}

function SideBae() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hidden = pathname === "/login" || pathname === "/regester";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  const items: NavItem[] = useMemo(
    () => [
      {
        href: "/",
        label: "Home",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        href: "/projects",
        label: "Projects",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        ),
      }
    ],
    [],
  );

  if (hidden) return null;

  const overlayVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const drawerVariants: Variants = {
    closed: { x: "-100%", opacity: 0.98 },
    open: { x: 0, opacity: 1 },
  };

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="mt-4 flex flex-col gap-2">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="group flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors"
            style={{
              background: active
                ? "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)"
                : "transparent",
              border: active ? "1px solid var(--color-border)" : "1px solid transparent",
              color: active ? "var(--color-text)" : "var(--color-muted)",
            }}
          >
            <span
              className="transition-transform group-hover:-translate-y-px"
              style={{ color: active ? "var(--color-text)" : "var(--color-muted)" }}
            >
              <Icon>{item.icon}</Icon>
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        className="fixed left-4 top-[86px] z-40 grid size-11 place-items-center rounded-2xl border lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 90%, transparent 10%), color-mix(in oklab, var(--color-surface) 92%, transparent 8%))",
          borderColor: "var(--color-border)",
          boxShadow: "var(--shadow-soft)",
          backdropFilter: "blur(14px)",
          color: "var(--color-text)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block w-[270px] shrink-0"
        aria-label="Sidebar"
      >
        <div
          className="sticky top-[76px] h-[calc(100vh-100px)] max-h-[600px] rounded-3xl p-4"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 55%, transparent 45%), color-mix(in oklab, var(--color-surface) 78%, transparent 22%))",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-soft)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
              Menu
            </div>
          </div>
          <NavList />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <div className="lg:hidden" aria-hidden={!open}>
            <motion.div
              key="sidebar-overlay"
              className="fixed inset-0 z-50"
              onClick={() => setOpen(false)}
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ background: "rgba(0,0,0,.55)" }}
            />

            <motion.div
              key="sidebar-drawer"
              className="fixed left-0 top-0 z-50 h-dvh w-[86vw] max-w-[340px] p-4"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.6 }}
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 75%, transparent 25%), color-mix(in oklab, var(--color-surface) 85%, transparent 15%))",
                borderRight: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-soft)",
                backdropFilter: "blur(16px)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  Menu
                </div>
                <button
                  type="button"
                  className="grid size-11 place-items-center rounded-2xl border"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                  style={{
                    background: "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <NavList onNavigate={() => setOpen(false)} />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default SideBae;