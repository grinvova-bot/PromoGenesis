"use client";

import Image from "next/image";
import Reveal from "./Reveal";

type Interior = {
  room: string;
  code: string;
  colorName: string;
  hex: string;
  image: string;
  description: string;
  featured?: boolean;
};

const interiors: Interior[] = [
  {
    room: "Гостиная",
    code: "TG301",
    colorName: "Изумрудный вздох",
    hex: "#517C78",
    image: "/interiors/living-tg301.webp",
    description:
      "Глубокий зелено-бирюзовый оттенок собирает зону отдыха и хорошо сочетается с деревом и светлым текстилем.",
    featured: true,
  },
  {
    room: "Детская",
    code: "TN103",
    colorName: "Молчание утра",
    hex: "#F1E8D7",
    image: "/interiors/kids-tn103.webp",
    description:
      "Мягкий теплый фон не перегружает пространство и оставляет свободу для мебели, игрушек и цветных деталей.",
  },
  {
    room: "Спальня",
    code: "TN108",
    colorName: "Интерлюдия покоя",
    hex: "#D7D0C6",
    image: "/interiors/bedroom-tn108.webp",
    description:
      "Спокойный нейтральный оттенок поддерживает ощущение тишины и работает с натуральным льном и светлым деревом.",
  },
  {
    room: "Прихожая",
    code: "TY500",
    colorName: "Верблюжий плед",
    hex: "#D9BB98",
    image: "/interiors/hallway-ty500.webp",
    description:
      "Теплый песочный цвет делает входную зону гостеприимной и смягчает недостаток естественного света.",
  },
  {
    room: "Кабинет",
    code: "TB201",
    colorName: "Полночное признание",
    hex: "#3D5D70",
    image: "/interiors/office-tb201.webp",
    description:
      "Сдержанный сине-серый оттенок помогает сфокусироваться и подчеркивает фактуру дерева и металла.",
  },
  {
    room: "Ванная",
    code: "TG307",
    colorName: "Эхо росы",
    hex: "#929D8A",
    image: "/interiors/bathroom-tg307.webp",
    description:
      "Приглушенный шалфейный тон создает свежую атмосферу и гармонирует с камнем, керамикой и светлым дубом.",
  },
  {
    room: "Кухня",
    code: "TN105",
    colorName: "Воздух свободы",
    hex: "#DDE1D7",
    image: "/interiors/kitchen-tn105.webp",
    description:
      "Светлый прохладный оттенок поддерживает ощущение чистоты и воздуха, хорошо сочетаясь с деревом и камнем.",
  },
  {
    room: "Столовая",
    code: "TR400",
    colorName: "Поцелуй мака",
    hex: "#AC6D68",
    image: "/interiors/dining-tr400.webp",
    description:
      "Теплый приглушенный акцент создает камерную атмосферу для общения и подчеркивает натуральное дерево.",
  },
];

export default function Interiors() {
  return (
    <section id="interiors" className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-12">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">В интерьере</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Цвета для разных сценариев
          </h2>
          <p className="max-w-2xl text-[17px] leading-[1.6] text-text-secondary">
            Посмотрите, как оттенки палитры Genesis могут работать в жилых и
            функциональных пространствах.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interiors.map((interior, index) => (
            <Reveal
              key={interior.code}
              index={index % 3}
              as="article"
              className={interior.featured ? "lg:col-span-2" : ""}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-card/50 bg-bg-card shadow-[0_12px_34px_-20px_#00000070] transition-all duration-300 hover:-translate-y-1 hover:border-accent/35">
                <div
                  className={`relative overflow-hidden ${
                    interior.featured ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={interior.image}
                    alt={`${interior.room} в цвете ${interior.code} ${interior.colorName}`}
                    fill
                    loading="eager"
                    unoptimized
                    sizes={
                      interior.featured
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#17283a] backdrop-blur-sm">
                    {interior.room}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-10 w-10 shrink-0 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: interior.hex }}
                      aria-label={`Цвет ${interior.hex}`}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-semibold tracking-[0.12em] text-accent">
                        {interior.code}
                      </span>
                      <h3 className="text-[17px] font-semibold text-text-primary">
                        {interior.colorName}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[14px] leading-[1.6] text-text-secondary">
                    {interior.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-[13px] leading-[1.6] text-text-tertiary">
            Интерьеры являются визуализацией. Для точного выбора оттенка
            используйте физический веер или выкрас.
          </p>
          <a href="#palette" className="btn btn-ghost">
            Смотреть всю палитру
          </a>
        </Reveal>
      </div>
    </section>
  );
}
