"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Продукты", href: "#products" },
  { label: "Преимущества", href: "#features" },
  { label: "Палитра", href: "#palette" },
  { label: "Контакты", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-dark-navy/80 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="page-container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-[22px] font-semibold tracking-[2px] text-off-white">
            TEX-COLOR
          </span>
          <span className="text-[11px] font-medium tracking-[4px] text-crimson">
            GENESIS
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] font-medium tracking-[1px] text-off-white transition-colors hover:text-crimson"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-crimson transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded bg-crimson px-7 py-2.5 text-[12px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-deep-red md:block"
        >
          Получить веер
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Меню"
        >
          <span className={`block h-[2px] w-6 bg-off-white transition-all ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-off-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-off-white transition-all ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-dark-navy/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6 px-8 py-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="font-serif text-2xl text-off-white">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-4 bg-crimson px-8 py-4 text-center text-sm font-semibold tracking-wide text-white">
                Получить веер
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
