"use client";

import Reveal from "./Reveal";

const timeline = [
  { year: "1942", title: "Основание", text: "Основание завода ERFORDIA в Эрфурте, Германия" },
  { year: "1995", title: "Tex-Color", text: "Компания получает имя Tex-Color GmbH & Co. KG" },
  { year: "2007", title: "Meffert AG", text: "Слияние с Meffert AG Farbwerke — одним из ведущих европейских производителей" },
  { year: "2010", title: "Россия", text: "Запуск завода в Ногинск-Технопарке, Подмосковье" },
];

export default function History() {
  return (
    <section id="history" className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-12">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">История</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Ключевые этапы развития
          </h2>
          <p className="max-w-2xl text-[17px] leading-[1.6] text-text-secondary">
            От немецкого производства до локализации профессиональной системы
            красок в России.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} index={i} as="article">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-border-card/50 bg-bg-card p-8">
                <span className="font-display text-[clamp(2rem,3vw,2.6rem)] font-bold leading-none text-accent">
                  {t.year}
                </span>
                <h3 className="text-[18px] font-semibold text-text-primary">
                  {t.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-text-secondary">
                  {t.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
