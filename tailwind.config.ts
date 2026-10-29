import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14181F",
        paper: "#F6F5F2",
        card: "#FFFFFF",
        indigo: {
          DEFAULT: "#3454D1",
          dark: "#24399B",
          light: "#EAEEFB",
        },
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#C4801F",
          light: "#FBF0DC",
        },
        slate: {
          border: "#DEE1E8",
          muted: "#6B7280",
        },
        success: {
          DEFAULT: "#2F9E63",
          light: "#E4F5EC",
        },
        rose: {
          DEFAULT: "#D1495B",
          light: "#FBE9EB",
        },
      },
      fontFamily: {
        display: [
          "Space Grotesk",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 24, 31, 0.04), 0 8px 24px -12px rgba(20, 24, 31, 0.12)",
        "card-hover": "0 4px 10px rgba(20, 24, 31, 0.06), 0 16px 32px -12px rgba(20, 24, 31, 0.18)",
      },
      borderRadius: {
        card: "14px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(20,24,31,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,24,31,0.035) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
