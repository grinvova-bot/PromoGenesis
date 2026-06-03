"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("genesis-theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-card/60 bg-bg-card/70 text-text-primary transition-colors hover:border-accent/60 hover:text-accent"
      aria-label="Переключить тему"
      title="Переключить тему"
    >
      <Moon size={17} className="theme-icon-light" />
      <Sun size={17} className="theme-icon-dark" />
    </button>
  );
}
