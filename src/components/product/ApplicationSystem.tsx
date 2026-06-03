import { ArrowRight } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function ApplicationSystem({ p }: { p: ProductSpec }) {
  return (
    <section className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Система нанесения</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Системный подход
          </h2>
          <p className="max-w-xl text-[16px] text-text-secondary">
            Для заявленных свойств соблюдайте порядок нанесения слоёв.
          </p>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {p.system.map((step, i) => (
            <li
              key={step.slug + i}
              className="relative flex flex-col gap-2 rounded-2xl border border-border-card/40 bg-bg-card p-6"
            >
              <span className="font-display text-[28px] font-bold text-accent/30">
                0{i + 1}
              </span>
              <span className="text-[12px] font-semibold tracking-[0.1em] text-text-secondary">
                {step.role}
              </span>
              <span className="font-display text-[18px] font-semibold text-text-primary">
                {step.name}
              </span>
              {i < p.system.length - 1 && (
                <ArrowRight
                  size={18}
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent/40 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
