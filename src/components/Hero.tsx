"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "80+", label: "лет истории" },
  { value: "30 000+", label: "наименований" },
  { value: "60+", label: "стран присутствия" },
  { value: "<10 г/л", label: "VOC (ЛОС)" },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg-base">
      {/* Фон — фото интерьера */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('/img/hero-interior.jpg')",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,var(--hero-overlay-strong) 0%,var(--hero-overlay-soft) 45%,var(--hero-overlay-strong) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,var(--hero-overlay-strong) 0%,var(--hero-overlay-side) 42%,transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -left-20 top-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "var(--hero-glow)" }}
        aria-hidden
      />

      <div className="page-container relative z-10 w-full pt-32 pb-20">
        <div className="flex max-w-[820px] flex-col gap-7">
          <motion.span
            {...fade(0.1)}
            className="eyebrow w-fit rounded-full border border-accent/25 bg-accent/[0.07] px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Немецкое качество с 1942 года
          </motion.span>

          <motion.h1
            {...fade(0.22)}
            className="font-display text-[clamp(2rem,5.4vw,3.75rem)] font-bold text-text-primary"
          >
            Безупречные{" "}
            <span className="text-accent">краски</span>
            <span className="mt-1 block font-medium text-text-primary/45">
              для вашего интерьера
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.36)}
            className="max-w-[560px] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-text-secondary"
          >
            Профессиональные краски tex-color Genesis — локализация немецких
            рецептур для профессионального применения.
          </motion.p>

          <motion.div {...fade(0.5)} className="flex flex-wrap items-center gap-3.5">
            <a href="#contact" className="btn btn-primary">
              Получить веер бесплатно
              <ArrowRight size={17} />
            </a>
            <a href="#products" className="btn btn-ghost">
              Каталог
            </a>
          </motion.div>

          <motion.dl
            {...fade(0.64)}
            className="mt-6 grid max-w-[640px] grid-cols-2 gap-x-10 gap-y-7 border-t border-accent/15 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <dt className="whitespace-nowrap font-display text-[clamp(1.3rem,2.2vw,1.8rem)] font-bold text-accent">
                  {s.value.replace(" ", " ")}
                </dt>
                <dd className="text-[13px] leading-snug text-text-secondary">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
