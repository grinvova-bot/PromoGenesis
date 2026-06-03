import Image from "next/image";
import { Check } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function DeepMatte({ p }: { p: ProductSpec }) {
  const m = p.content.matte;
  return (
    <section className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-12">
        {/* Product-specific coating story: optical matte for Decker, durability for Starke. */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border-card/40">
            <Image
              src={m.image}
              alt={m.imageAlt ?? "Глубокоматовый потолок под скользящим светом"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="eyebrow">{m.eyebrow ?? "Технология покрытия"}</span>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-text-primary">
              {m.title}
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-secondary">{m.body}</p>
            <ul className="mt-1 flex flex-col gap-2.5">
              {m.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-[15px] text-text-primary">
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid items-center gap-10 rounded-2xl border border-border-card/40 bg-bg-card p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{m.macroEyebrow ?? "Под микроскопом"}</span>
            <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] font-semibold text-text-primary">
              {m.macroTitle ?? "Почему нет бликов"}
            </h3>
            <p className="text-[15px] leading-[1.65] text-text-secondary">
              {m.macroBody ??
                "Микрорельеф из мраморного наполнителя и диоксида титана рассеивает падающий свет диффузно — во все стороны, а не зеркально. Глаз не видит бликов, а мелкие неровности подложки визуально сглаживаются."}
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
            <Image
              src={m.macroImage}
              alt={m.macroAlt ?? "Микроструктура глубокоматового покрытия рассеивает свет"}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
