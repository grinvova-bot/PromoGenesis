import { Clock, Thermometer, Droplets, Package, ShieldCheck, FlaskConical } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function FactsGrid({ p }: { p: ProductSpec }) {
  const c = p.content;
  const isPrimer = p.category === "грунт";
  const dryingBody = isPrimer
    ? `Следующие работы — через ${c.drying.betweenCoats}. Полное высыхание — ${c.drying.fullCure}. ${c.drying.conditions}`
    : `Между слоями — ${c.drying.betweenCoats}. Полная прочность и влажная уборка — через ${c.drying.fullCure}. ${c.drying.conditions}`;
  const dilutionBody =
    c.dilutionNote ??
    `Готова к применению. При необходимости — чистая вода не более ${p.dilutionMaxPct}% от объёма.`;
  const facts = [
    {
      icon: Clock,
      title: "Время высыхания",
      body: dryingBody,
    },
    {
      icon: Droplets,
      title: "Разбавление",
      body: dilutionBody,
    },
    { icon: Thermometer, title: "Расход", body: c.consumptionNote },
    { icon: FlaskConical, title: "Состав", body: c.composition },
    { icon: Package, title: "Хранение", body: c.storage },
    { icon: ShieldCheck, title: "Безопасность", body: c.safety },
  ];

  return (
    <section className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Применение и хранение</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Что важно знать
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-3 rounded-2xl border border-border-card/40 bg-bg-card p-6"
            >
              <f.icon size={22} className="text-accent" />
              <h3 className="font-display text-[16px] font-semibold text-text-primary">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-text-secondary">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-text-tertiary">
          Очистка инструмента: {c.cleanup}
        </p>
      </div>
    </section>
  );
}
