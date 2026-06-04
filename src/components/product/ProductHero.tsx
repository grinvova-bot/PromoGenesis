import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, Palette } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function ProductHero({ p }: { p: ProductSpec }) {
  const materialAccusative = p.category === "грунт" ? "грунт" : "краску";

  return (
    <section className="bg-bg-base section-y">
      <div className="page-container grid items-center gap-12 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl p-8 [background:radial-gradient(circle_at_center,var(--product-image-center),var(--product-image-edge))]">
          <Image
            src={p.heroImage}
            alt={p.name}
            width={p.imageWidth}
            height={p.imageHeight}
            priority
            className="h-auto max-w-[360px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
        <div className="flex flex-col gap-6">
          <span className="eyebrow">{p.category.toUpperCase()}</span>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-text-primary">
            {p.name}
          </h1>
          <p className="text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-text-secondary">
            {p.tagline}
          </p>
          <ul className="flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 text-[12px] font-semibold text-text-secondary"
              >
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#calc" className="btn btn-primary">
                <Calculator size={17} />
                Рассчитать {materialAccusative}
              </Link>
              {p.colorTryOn && (
                <Link href="#try-on" className="btn btn-ghost">
                  <Palette size={17} />
                  Примерка цвета
                </Link>
              )}
            </div>
            <a
              href={p.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold text-text-secondary underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Купить в магазине
              <ArrowRight size={15} />
            </a>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-accent/15 pt-6 sm:grid-cols-4">
            {p.heroStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold text-accent">
                  {s.value}
                </dt>
                <dd className="text-[13px] leading-snug text-text-secondary">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
