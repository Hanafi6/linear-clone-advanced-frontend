import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/performance", label: "Performance" },
  { href: "/animatedList", label: "Animated List" },
];

const resources = [
  { href: "/auth/login", label: "Login" },
  { href: "/auth/register", label: "Register" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-16 border-t "
      style={{
        borderColor: "var(--color-border)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-surface) 70%, transparent 30%), transparent)",
      }}
    >
      <div className="container py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              <span
                className="h-9 w-9 rounded-lg border shadow-glow"
                style={{
                  borderColor: "var(--color-border)",
                  background:
                    "radial-gradient(14px 14px at 30% 30%, color-mix(in oklab, var(--color-brand) 55%, transparent 45%), transparent 60%), linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 85%, transparent 15%), color-mix(in oklab, var(--color-surface) 85%, transparent 15%))",
                }}
              />
              <span>Lenear</span>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              واجهة بسيطة وسريعة لمتابعة المشاريع وقياس الأداء.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              Pages
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "var(--color-muted)" }}>
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-text"
                    style={{ color: "inherit" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              Account
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "var(--color-muted)" }}>
              {resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-text"
                    style={{ color: "inherit" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              Contact
            </p>

            <div
              className="rounded-lg border p-4 shadow-soft"
              style={{
                borderColor: "var(--color-border)",
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 80%, transparent 20%), color-mix(in oklab, var(--color-surface) 80%, transparent 20%))",
              }}
            >
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                لو عندك اقتراحات/ملاحظات:
              </p>
              <a
                href="mailto:Lacheu7@gmail.com"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--color-text)" }}
              >
                Lacheu7@gmail.com
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href="https://github.com/Hanafi6"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-surface"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 19c-4 1.5-4-2.5-5-3m10 6v-3.5c0-1 .1-1.4-.5-2 1.7-.2 3.5-.8 3.5-4a3.1 3.1 0 0 0-.9-2.2A2.9 2.9 0 0 0 16 5s-.8-.2-2 .8a7 7 0 0 0-4 0C8.8 4.8 8 5 8 5a2.9 2.9 0 0 0-.1 2.8A3.1 3.1 0 0 0 7 10c0 3.2 1.8 3.8 3.5 4-.4.4-.5 1-.5 2V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/mahmoud-ahmed-64641a351/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-surface"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9H3v12h3V9ZM4.5 3.5A1.8 1.8 0 1 0 4.5 7a1.8 1.8 0 0 0 0-3.5ZM21 21h-3v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-3V9h2.9v1.6h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5V21Z"
                      fill="currentColor"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p style={{ color: "var(--color-muted)" }}>© {year} Lenear. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3" style={{ color: "var(--color-muted)" }}>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              Built with Next.js
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-2" aria-hidden="true" />
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;