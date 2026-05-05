/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: "var(--color-brand)",
                    2: "var(--color-brand-2)",
                    dark: "var(--color-brand-dark)",
                },
                bg: "var(--color-bg)",
                surface: "var(--color-surface)",
                "surface-2": "var(--color-surface-2)",
                border: "var(--color-border)",
                text: "var(--color-text)",
                muted: "var(--color-muted)",
                test: "var(--color-test)",
                ring: "var(--color-ring)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
            },
            boxShadow: {
                soft: "var(--shadow-soft)",
                glow: "var(--shadow-glow)",
            },
        },
    },
    plugins: [],
};
