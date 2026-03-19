"use client";

import { motion } from "framer-motion";
import { Leaf, Award, ShieldCheck, Palette, Layers, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature { Icon: LucideIcon; title: string; description: string; accent: boolean; }

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

function Cell({ feature, wide, index }: { feature: Feature; wide?: boolean; index: number }) {
  const { Icon, title, description, accent } = feature;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex h-[240px] flex-col justify-end gap-4 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${wide ? "w-full shrink-0 lg:w-[50%]" : "min-w-0 flex-1"} ${accent ? "bg-gradient-to-br from-crimson to-deep-red" : "border border-border-subtle bg-surface-dark"}`}
    >
      <Icon size={32} className={accent ? "text-white" : "text-crimson"} strokeWidth={1.5} />
      <h3 className={`font-serif text-[24px] font-semibold ${accent ? "text-white" : "text-off-white"}`}>{title}</h3>
      <p className={`text-[14px] leading-[1.5] ${accent ? "text-white/80" : "text-steel-blue"}`}>{description}</p>
    </motion.div>
  );
}

export default function BentoFeatures() {
  return (
    <section id="features" className="bg-dark-navy">
      <div className="mx-auto max-w-[1440px] px-8 py-20 lg:px-20">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ПРЕИМУЩЕСТВА</span>
          <h2 className="font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Почему Genesis</h2>
          <p className="text-[16px] text-steel-blue">Революционная формула для безупречных интерьеров</p>
        </div>

        <div className="mb-6 flex flex-col gap-6 lg:flex-row">
          <Cell feature={row1[0]} index={0} />
          <Cell feature={row1[1]} index={1} />
          <Cell feature={row1[2]} wide index={2} />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <Cell feature={row2[0]} wide index={3} />
          <Cell feature={row2[1]} index={4} />
          <Cell feature={row2[2]} index={5} />
        </div>
      </div>
    </section>
  );
}
