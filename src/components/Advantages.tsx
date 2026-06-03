"use client";

import {
  Droplets,
  Brush,
  Shield,
  Layers,
  Timer,
  Recycle,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

type Adv = { icon: LucideIcon; title: string; text: string };

const advantages: Adv[] = [
  {
    icon: Droplets,
    title: "Глубокоматовая оптика",
    text: "Без бликов при любом освещении, идеальная гладкость поверхности даже при сложном свете",
  },
  {
    icon: Brush,
    title: "Эталонная белизна",
    text: "Тиксотропность и растекаемость, безупречно гладкая и однородная поверхность",
  },
  {
    icon: Shield,
    title: "Устойчивость",
    text: "Многократное мытьё и дезинфекция, устойчивость к сухим и мокрым пятнам",
  },
  {
    icon: Layers,
    title: "Системность",
    text: "Все материалы сочетаются друг с другом — от грунта до финишного покрытия",
  },
  {
    icon: Timer,
    title: "Открытое время",
    text: "Большое открытое время на подложке для комфортной работы профессионала",
  },
  {
    icon: Recycle,
    title: "Экологичность",
    text: "Минимальное содержание ЛОС (<10 г/л), безопасно для людей и окружающей среды",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">Преимущества</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Почему выбирают Genesis
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} index={i % 3} as="article">
              <article className="flex h-full flex-col gap-5 rounded-2xl border border-border-card/50 bg-bg-card p-8 transition-colors hover:border-accent/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/[0.12]">
                  <a.icon size={24} className="text-accent" />
                </span>
                <h3 className="text-[18px] font-semibold text-text-primary">
                  {a.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-text-secondary">
                  {a.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
