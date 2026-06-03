import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function ProductHero({ p }: { p: ProductSpec }) {
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
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link href="#calc" className="btn btn-primary">
              <Calculator size={17} />
              Рассчитать краску
            </Link>
            <a
              href={p.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Купить
              <ArrowRight size={16} />
            </a>
            <a
              href={p.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <FileText size={16} />
              Даташит PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
