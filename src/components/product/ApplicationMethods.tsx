import Image from "next/image";
import type { ProductSpec, ApplicationMethod } from "@/data/products";

function MethodCard({ m, index }: { m: ApplicationMethod; index: number }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border-card/40 bg-bg-card">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={m.image}
          alt={m.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-bg-base/85 px-3 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-text-primary backdrop-blur">
          0{index + 1} · {m.title}
        </span>
      </div>
      <ol className="flex flex-col gap-3 p-6">
        {m.steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-[1.55] text-text-secondary">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/30 text-[12px] font-semibold text-accent">
              {i + 1}
            </span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function ApplicationMethods({ p }: { p: ProductSpec }) {
  const a = p.content.application;
  return (
    <section className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Технология нанесения</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Как наносить
          </h2>
          <p className="max-w-xl text-[16px] text-text-secondary">
            Два способа под разные задачи. Работать в пределах рекомендованного
            расхода, при +5…+30 °С.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <MethodCard m={a.roller} index={0} />
          <MethodCard m={a.spray} index={1} />
        </div>
      </div>
    </section>
  );
}
