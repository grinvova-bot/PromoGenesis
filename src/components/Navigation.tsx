"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// Якоря ведут на главную (/#…), чтобы работать и с вложенных маршрутов (/products/…)
const navLinks = [
  { label: "Каталог", href: "/#products" },
  { label: "Интерьеры", href: "/#interiors" },
  { label: "Палитра", href: "/#palette" },
  { label: "Дизайнерам", href: "/#expert" },
  { label: "О бренде", href: "/#about" },
  { label: "Контакты", href: "/#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveIndicator = (target: HTMLElement) => {
    const parent = navItemsRef.current;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setIndicator({
      left: targetRect.left - parentRect.left,
      width: targetRect.width,
      visible: true,
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-accent/10 bg-bg-base/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="page-container flex h-[64px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-text-primary">
            TEX-COLOR
          </span>
          <span className="font-display text-[17px] font-medium tracking-[0.04em] text-accent">
            GENESIS
          </span>
        </Link>

        <div
          ref={navItemsRef}
          onMouseLeave={() => setIndicator((current) => ({ ...current, visible: false }))}
          className="relative hidden items-center gap-7 lg:flex"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1 h-px rounded-full bg-accent transition-[opacity,transform,width] duration-300 ease-out"
            style={{
              opacity: indicator.visible ? 1 : 0,
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={(event) => moveIndicator(event.currentTarget)}
              onFocus={(event) => moveIndicator(event.currentTarget)}
              onBlur={() => setIndicator((current) => ({ ...current, visible: false }))}
              className="relative py-2 text-[15px] font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:text-text-primary"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/#contact" className="btn btn-primary btn-sm">
            Получить веер
            <ArrowRight size={16} />
          </Link>
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
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[16px] font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2"
            >
              Получить веер
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
