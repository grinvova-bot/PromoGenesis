"use client";

import { ShieldCheck, Leaf, Factory } from "lucide-react";
import Reveal from "./Reveal";

const ABOUT_IMG = "/img/detail-paint.png";

const features = [
  {
    icon: ShieldCheck,
    title: "Гарантия качества",
    text: "Немецкие рецептуры, проверенные десятилетиями",
  },
  {
    icon: Leaf,
    title: "Экологичность",
    text: "VOC менее 10 г/л — безопасно для здоровья",
  },
  {
    icon: Factory,
    title: "Российское производство",
    text: "Завод в Ногинск-Технопарке, Подмосковье",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-16">
        <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center">
          <span className="eyebrow">О бренде</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Традиции немецкого качества
            <span className="mt-2 block font-medium text-accent/55">
              с 1942 года по сегодняшний день
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal index={1} className="flex flex-col gap-6">
            <p className="text-[17px] leading-[1.7] text-text-secondary">
              Система красок Genesis является одной из линеек немецкого предприятия
              Tex-Color GmbH &amp; Co. KG. Это локализация именно тех красок, которые
              используют профессиональные маляры в Германии.
            </p>
            <p className="text-[17px] leading-[1.7] text-text-secondary">
              Краски адаптированы к современным трендам в оформлении интерьеров и
              высокотехнологичным техникам малярных работ, производятся по
              европейским стандартам из сырьевых компонентов высочайшего качества.
            </p>
          </Reveal>

          <div className="flex flex-col gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} index={i + 1}>
                <article className="flex items-start gap-4 rounded-xl border border-border-card/50 bg-bg-card p-6">
                  <f.icon size={24} className="mt-0.5 shrink-0 text-accent" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[16px] font-semibold text-text-primary">
                      {f.title}
                    </h3>
                    <p className="text-[14px] text-text-secondary">{f.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal index={1}>
          <div
            className="h-[280px] w-full rounded-2xl bg-cover bg-center md:h-[320px]"
            style={{ backgroundImage: `url('${ABOUT_IMG}')` }}
            role="img"
            aria-label="Производство красок Genesis"
          />
        </Reveal>
      </div>
    </section>
  );
}
