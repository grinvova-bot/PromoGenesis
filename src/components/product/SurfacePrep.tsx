import { Thermometer } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function SurfacePrep({ p }: { p: ProductSpec }) {
  const pr = p.content.priming;
  return (
    <section className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Подготовка поверхности</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Системное грунтование
          </h2>
          <p className="max-w-2xl text-[16px] leading-[1.6] text-text-secondary">
            {pr.intro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pr.steps.map((s, i) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-2xl border border-border-card/40 bg-bg-card p-6"
            >
              <span className="font-display text-[26px] font-bold text-accent/30">
                0{i + 1}
              </span>
              <h3 className="font-display text-[17px] font-semibold text-text-primary">
                {s.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-text-secondary">
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="flex items-center gap-2.5 text-[14px] text-text-secondary">
          <Thermometer size={17} className="shrink-0 text-accent" />
          {pr.tempNote}
        </p>
      </div>
    </section>
  );
}
