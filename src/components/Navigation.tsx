"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Каталог", href: "#products" },
  { label: "Интерьеры", href: "#interiors" },
  { label: "Палитра", href: "#palette" },
  { label: "Дизайнерам", href: "#expert" },
  { label: "О бренде", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-accent/10 bg-bg-base/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="page-container flex h-[64px] items-center justify-between">
        <a href="#" className="flex items-baseline gap-2" aria-label="TEX-COLOR GENESIS">
          <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-text-primary">
            TEX-COLOR
          </span>
          <span className="font-display text-[17px] font-medium tracking-[0.04em] text-accent">
            GENESIS
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary btn-sm">
            Получить веер
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-text-primary"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-accent/10 bg-bg-base/95 backdrop-blur-md lg:hidden">
          <div className="page-container flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[16px] font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2"
            >
              Получить веер
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
