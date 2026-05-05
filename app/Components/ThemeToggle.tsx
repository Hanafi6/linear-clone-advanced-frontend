"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const initial = saved === "light" || saved === "dark" ? saved : getSystemTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded cursor-pointer duration-200 p-1  hover:bg-white/20"
      aria-label="Toggle theme "
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

