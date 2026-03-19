"use client";

import { motion } from "framer-motion";

/* Градиент и геометрия как в pencil-new.pen → Hero Section (h 900, контент x 80 y 280) */
const heroOverlay =
  "linear-gradient(180deg, #2B2D42 0%, rgba(43,45,66,0) 50%, rgba(43,45,66,0.8) 100%)";

export default function Hero() {
  return (
    <section className="relative h-[min(900px,100svh)] min-h-[640px] overflow-hidden bg-dark-navy pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80')" }}
      >
        <div className="absolute inset-0" style={{ background: heroOverlay }} />
      </div>

      <div className="relative z-10 page-container pb-24">
        <div className="flex max-w-[800px] flex-col gap-6 pt-16 md:pt-24 lg:pt-[200px]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[12px] font-medium tracking-[5px] text-crimson"
          >
            TEX-COLOR GENESIS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-5xl font-medium leading-none text-off-white md:text-6xl lg:text-[80px]"
            style={{ letterSpacing: "-2px" }}
          >
            Цвет, который
            <br />
            чувствуешь
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-[600px] text-[18px] leading-[1.6] text-steel-blue"
          >
            Профессиональные интерьерные краски премиум-класса.
            <br />
            Глубина цвета и безупречная текстура.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="bg-crimson px-10 py-4 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-deep-red"
            >
              Получить бесплатно
            </a>
            <a
              href="#products"
              className="border border-off-white px-10 py-4 text-[14px] font-semibold tracking-wide text-off-white transition-all duration-300 hover:bg-off-white/5"
            >
              Каталог
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-[100px] left-1/2 flex w-10 -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-[30px] w-px bg-off-white/50" />
        <span className="text-[9px] font-medium tracking-[3px] text-off-white/50">SCROLL</span>
      </div>
    </section>
  );
}
