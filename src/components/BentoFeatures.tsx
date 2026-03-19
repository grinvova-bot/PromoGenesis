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

const features: Feature[] = [
  { Icon: Leaf, title: "Экологичность", description: "Минимальное воздействие на окружающую среду и здоровье человека", accent: false },
  { Icon: Award, title: "Качество", description: "Европейские стандарты из сырьевых компонентов высочайшего качества", accent: true },
  { Icon: ShieldCheck, title: "Надёжность", description: "Безупречно гладкая бархатистая фактура, устойчивая к загрязнениям и мытью", accent: false },
  { Icon: Palette, title: "Стойкость цвета", description: "Подлинная стойкость цвета без выцветания на долгие годы", accent: false },
  { Icon: Layers, title: "Самовыравнивание", description: "Продвинутая технология для безупречно гладкого покрытия", accent: false },
  { Icon: Heart, title: "Низкий ЛОС", description: "Экологичная формула с низким содержанием летучих органических соединений", accent: false },
];

export default function BentoFeatures() {
  return (
    <section id="features" className="bg-dark-navy section-y">
      <div className="page-container">
        <header className="mb-12 text-center md:mb-16">
          <span className="mb-3 block text-[12px] font-medium tracking-[5px] text-crimson">ПРЕИМУЩЕСТВА</span>
          <h2 className="mb-4 font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Почему Genesis</h2>
          <p className="mx-auto max-w-lg text-[16px] leading-relaxed text-steel-blue">Революционная формула для безупречных интерьеров</p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group flex min-h-[200px] flex-col justify-between gap-4 rounded-xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl md:min-h-[220px] md:p-7 ${
                feature.accent
                  ? "bg-gradient-to-br from-crimson to-deep-red"
                  : "border border-border-subtle bg-surface-dark"
              }`}
            >
              <feature.Icon
                size={28}
                className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${feature.accent ? "text-white" : "text-crimson"}`}
                strokeWidth={1.5}
              />
              <div className="flex flex-col gap-2">
                <h3 className={`font-serif text-xl font-semibold md:text-[22px] ${feature.accent ? "text-white" : "text-off-white"}`}>
                  {feature.title}
                </h3>
                <p className={`text-[13px] leading-relaxed ${feature.accent ? "text-white/85" : "text-steel-blue"}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
