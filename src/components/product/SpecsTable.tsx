import type { ProductSpec } from "@/data/products";

export default function SpecsTable({ p }: { p: ProductSpec }) {
  return (
    <section className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Характеристики</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Технические данные
          </h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <dl className="divide-y divide-border-card/40">
            {p.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-6 py-3.5"
              >
                <dt className="text-[14px] text-text-secondary">{s.label}</dt>
                <dd className="text-right text-[14px] font-semibold text-text-primary">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-3 font-display text-[17px] font-semibold text-text-primary">
                Свойства
              </h3>
              <ul className="flex flex-col gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-[15px] leading-[1.5] text-text-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-display text-[17px] font-semibold text-text-primary">
                Область применения
              </h3>
              <ul className="flex flex-wrap gap-2">
                {p.surfaces.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border-card/50 bg-bg-card px-3 py-1.5 text-[13px] text-text-secondary"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
