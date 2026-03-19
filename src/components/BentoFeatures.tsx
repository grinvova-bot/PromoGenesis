"use client";

import { motion } from "framer-motion";
import { Leaf, Award, ShieldCheck, Palette, Layers, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  Icon: LucideIcon;
  title: string;
  description: string;
  accent: boolean;
}

const row1: Feature[] = [
  { Icon: Leaf, title: "Экологичность", description: "Минимальное воздействие на окружающую среду и здоровье человека", accent: false },
  { Icon: Award, title: "Качество", description: "Европейские стандарты из сырьевых компонентов высочайшего качества", accent: true },
  { Icon: ShieldCheck, title: "Надёжность", description: "Безупречно гладкая бархатистая фактура, устойчивая к загрязнениям и мытью", accent: false },
];

const row2: Feature[] = [
  { Icon: Palette, title: "Стойкость цвета", description: "Подлинная стойкость цвета без выцветания на долгие годы", accent: false },
  { Icon: Layers, title: "Самовыравнивание", description: "Продвинутая технология для безупречно гладкого покрытия", accent: false },
  { Icon: Heart, title: "Низкий ЛОС", description: "Экологичная формула с низким содержанием летучих органических соединений", accent: false },
];

function Cell({
  feature,
  wide,
  motionDelay,
}: {
  feature: Feature;
  wide?: boolean;
  motionDelay: number;
}) {
  const { Icon, title, description, accent } = feature;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: motionDelay }}
      className={`flex min-h-[240px] flex-col justify-end gap-4 p-8 ${
        wide ? "w-full shrink-0 xl:w-[640px] xl:max-w-none" : "min-w-0 w-full xl:flex-1"
      } ${accent ? "bg-gradient-to-br from-crimson to-deep-red" : "bg-surface-dark"}`}
    >
      <Icon size={32} className={accent ? "text-white" : "text-crimson"} strokeWidth={1.5} />
      <h3 className={`font-serif text-[24px] font-semibold ${accent ? "text-white" : "text-off-white"}`}>{title}</h3>
      <p className={`text-[14px] leading-[1.5] ${accent ? "text-white/80" : "text-steel-blue"}`}>{description}</p>
    </motion.div>
  );
}

export default function BentoFeatures() {
  return (
    <section id="features" className="bg-dark-navy section-y">
      <div className="page-container flex flex-col gap-12">
        <header className="flex flex-col items-center gap-3 text-center">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ПРЕИМУЩЕСТВА</span>
          <h2 className="font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Почему Genesis</h2>
          <p className="max-w-xl text-[16px] text-steel-blue">Революционная формула для безупречных интерьеров</p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 xl:h-[240px] xl:flex-row xl:gap-6">
            <Cell feature={row1[0]} motionDelay={0} />
            <Cell feature={row1[1]} motionDelay={0.06} />
            <Cell feature={row1[2]} wide motionDelay={0.12} />
          </div>
          <div className="flex flex-col gap-6 xl:h-[240px] xl:flex-row xl:gap-6">
            <Cell feature={row2[0]} wide motionDelay={0} />
            <Cell feature={row2[1]} motionDelay={0.06} />
            <Cell feature={row2[2]} motionDelay={0.12} />
          </div>
        </div>
      </div>
    </section>
  );
}
