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
    <section id="features" className="bg-dark-navy">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-16">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span className="text-[12px] font-medium tracking-[5px] text-crimson">ПРЕИМУЩЕСТВА</span>
          <h2 className="font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Почему Genesis</h2>
          <p className="max-w-md text-[16px] leading-relaxed text-steel-blue">Революционная формула для безупречных интерьеров</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group flex h-[220px] flex-col justify-end gap-3 rounded-lg p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                feature.accent
                  ? "bg-gradient-to-br from-crimson to-deep-red"
                  : "border border-border-subtle bg-surface-dark"
              }`}
            >
              <feature.Icon
                size={28}
                className={`transition-transform duration-300 group-hover:scale-110 ${feature.accent ? "text-white" : "text-crimson"}`}
                strokeWidth={1.5}
              />
              <h3 className={`font-serif text-[22px] font-semibold ${feature.accent ? "text-white" : "text-off-white"}`}>
                {feature.title}
              </h3>
              <p className={`text-[13px] leading-[1.6] ${feature.accent ? "text-white/80" : "text-steel-blue"}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
