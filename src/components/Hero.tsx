"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] max-h-[860px] overflow-hidden bg-dark-navy">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/70 via-dark-navy/40 to-dark-navy/90" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] items-center px-6 lg:px-16">
        <div className="flex max-w-[680px] flex-col gap-7">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[11px] font-medium tracking-[6px] text-crimson"
          >
            TEX-COLOR GENESIS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-5xl leading-[0.95] font-medium text-off-white md:text-6xl lg:text-[72px]"
            style={{ letterSpacing: "-1.5px" }}
          >
            Цвет, который
            <br />
            чувствуешь
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-[520px] text-[17px] leading-[1.7] text-steel-blue"
          >
            Профессиональные интерьерные краски премиум-класса.
            <br />
            Глубина цвета и безупречная текстура.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a href="#contact" className="rounded bg-crimson px-9 py-3.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-deep-red hover:shadow-[0_0_40px_rgba(239,35,60,0.3)]">
              Получить бесплатно
            </a>
            <a href="#products" className="rounded border border-off-white/30 px-9 py-3.5 text-[13px] font-semibold tracking-wide text-off-white transition-all duration-300 hover:border-off-white hover:bg-off-white/5">
              Каталог
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-7 w-[1px] animate-pulse bg-off-white/30" />
        <span className="text-[9px] tracking-[3px] text-off-white/30">SCROLL</span>
      </div>
    </section>
  );
}
