"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function ExpertTestimonial() {
  return (
    <section id="expert" className="bg-bg-alt section-y">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid overflow-hidden rounded-3xl border border-border-card/40 bg-bg-card lg:grid-cols-[460px_1fr]"
        >
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full">
            <Image
              src="/expert/yulia.jpg"
              alt="Юлия Васильева"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 460px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,transparent 55%,var(--expert-image-overlay) 100%)",
              }}
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-center gap-7 p-8 sm:p-12 lg:p-14">
            <span className="eyebrow">Экспертное мнение</span>

            <Quote size={36} className="text-accent/40" />

            <blockquote className="text-[clamp(1.1rem,1.7vw,1.45rem)] font-medium leading-[1.5] text-text-primary">
              «Как дизайнер интерьеров я работала с бесчисленным количеством
              брендов красок, но&nbsp;tex-color Genesis выделяется. Глубина цвета,
              лёгкость нанесения и&nbsp;исключительная долговечность делают его моим
              первым выбором.»
            </blockquote>

            <div className="flex flex-col gap-1.5 border-t border-border-card/50 pt-6">
              <p className="font-display text-[17px] font-semibold text-text-primary">
                Юлия Васильева
              </p>
              <p className="text-[14px] text-text-secondary">
                Председатель Союза Дизайнеров и Архитекторов СПб
              </p>
              <p className="mt-1 text-[12px] font-semibold tracking-[2px] text-accent">
                VASILEVA DESIGN
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
