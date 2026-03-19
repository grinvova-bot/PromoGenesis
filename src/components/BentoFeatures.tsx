"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Award, ShieldCheck, Palette, Layers, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

function Cell({ feature, wide }: { feature: Feature; wide?: boolean }) {
  const { Icon, title, description, accent } = feature;
  return (
    <div className={`bento-cell invisible flex h-[240px] flex-col justify-end gap-4 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${wide ? "w-full shrink-0 lg:w-[50%]" : "min-w-0 flex-1"} ${accent ? "bg-gradient-to-br from-crimson to-deep-red" : "border border-border-subtle bg-surface-dark"}`}>
      <Icon size={32} className={accent ? "text-white" : "text-crimson"} strokeWidth={1.5} />
      <h3 className={`font-serif text-[24px] font-semibold ${accent ? "text-white" : "text-off-white"}`}>{title}</h3>
      <p className={`text-[14px] leading-[1.5] ${accent ? "text-white/80" : "text-steel-blue"}`}>{description}</p>
    </div>
  );
}

export default function BentoFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray<HTMLElement>(".bento-cell");
      gsap.fromTo(cells, { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="bg-dark-navy">
      <div className="mx-auto max-w-[1440px] px-8 py-20 lg:px-20">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ПРЕИМУЩЕСТВА</span>
          <h2 className="font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Почему Genesis</h2>
          <p className="text-[16px] text-steel-blue">Революционная формула для безупречных интерьеров</p>
        </div>

        <div className="mb-6 flex flex-col gap-6 lg:flex-row">
          <Cell feature={row1[0]} />
          <Cell feature={row1[1]} />
          <Cell feature={row1[2]} wide />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <Cell feature={row2[0]} wide />
          <Cell feature={row2[1]} />
          <Cell feature={row2[2]} />
        </div>
      </div>
    </section>
  );
}
