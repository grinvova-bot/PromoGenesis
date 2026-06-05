"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { getProduct } from "@/data/products";

// Магазин — пока у красок нет своей страницы продукта
const BUY_URL = "https://pro.alt-x.ru/brand/tex-color/";

type Spec = { label: string; value: string };
type Product = {
  slug: string;
  badge: string;
  paint: boolean;
  name: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  specs: Spec[];
};

const products: Product[] = [
  {
    slug: "decker",
    badge: "КРАСКА",
    paint: true,
    name: "Genesis Decker",
    description: "Глубокоматовая краска для потолков со сложным светом",
    image: "/products/genesis-decker.png",
    imageWidth: 280,
    imageHeight: 218,
    specs: [
      { label: "Блеск", value: "3%" },
      { label: "Укрыв.", value: "1 кл." },
      { label: "Расход", value: "12 м²/л" },
    ],
  },
  {
    slug: "starke-farbe",
    badge: "КРАСКА",
    paint: true,
    name: "Genesis Starke Farbe",
    description: "Сверхпрочная матовая интерьерная краска для стен",
    image: "/products/genesis-starke-farbe.png",
    imageWidth: 260,
    imageHeight: 202,
    specs: [
      { label: "Блеск", value: "6–7%" },
      { label: "Истир.", value: "1 кл." },
      { label: "Расход", value: "12 м²/л" },
    ],
  },
  {
    slug: "soft-matt",
    badge: "КРАСКА",
    paint: true,
    name: "Genesis Soft Matt",
    description: "Глубокоматовая интерьерная краска для стен со сложным боковым светом",
    image: "/products/genesis-soft-matt.png",
    imageWidth: 260,
    imageHeight: 202,
    specs: [
      { label: "Блеск", value: "1–2%" },
      { label: "Истир.", value: "1 кл." },
      { label: "Расход", value: "12 м²/л" },
    ],
  },
  {
    slug: "hp",
    badge: "ГРУНТОВКА",
    paint: false,
    name: "Genesis HP",
    description: "Высококачественный грунтовочный состав на основе дисперсии акрилат-гидрозоля",
    image: "/products/genesis-hp.png",
    imageWidth: 164,
    imageHeight: 202,
    specs: [
      { label: "Сухой ост.", value: "≈ 15%" },
      { label: "Расход", value: "8–12 м²/л" },
      { label: "Объем", value: "5 л; 10 л" },
    ],
  },
  {
    slug: "ge",
    badge: "ГРУНТОВКА",
    paint: false,
    name: "Genesis GE",
    description: "Профессиональная кроющая грунтовочная краска для внутренних работ",
    image: "/products/genesis-ge.png",
    imageWidth: 280,
    imageHeight: 218,
    specs: [
      { label: "Сухой ост.", value: "≈ 55%" },
      { label: "Расход", value: "8–12 м²/л" },
      { label: "Объем", value: "2,5; 5; 10 л" },
    ],
  },
];

function ProductCard({ p, index }: { p: Product; index: number }) {
  const product = getProduct(p.slug);
  const href = product ? `/products/${p.slug}/` : BUY_URL;
  const imageClassName =
    "flex h-[280px] items-center justify-center p-8 [background:radial-gradient(circle_at_center,var(--product-image-center),var(--product-image-edge))]";

  return (
    <Reveal index={index} as="article" className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-card/40 bg-bg-card shadow-[0_8px_30px_-12px_#00000060] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
        {product ? (
          <Link href={href} aria-label={`Подробнее о ${p.name}`} className={imageClassName}>
            <Image
              src={p.image}
              alt={p.name}
              width={p.imageWidth}
              height={p.imageHeight}
              className="h-auto max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Купить ${p.name}`}
            className={imageClassName}
          >
            <Image
              src={p.image}
              alt={p.name}
              width={p.imageWidth}
              height={p.imageHeight}
              className="h-auto max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </a>
        )}
        <div className="flex flex-1 flex-col gap-4 p-7">
          <span
            className={`w-fit rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[2px] ${
              p.paint
                ? "bg-accent/[0.12] text-accent"
                : "bg-accent-2/[0.13] text-accent-2"
            }`}
          >
            {p.badge}
          </span>
          <h3 className="font-display text-[19px] font-semibold text-text-primary">
            {p.name}
          </h3>
          <p className="min-h-[63px] text-[14px] leading-[1.5] text-text-secondary">
            {p.description}
          </p>
          <dl className="mt-auto flex gap-6 border-t border-border-card/50 pt-4">
            {p.specs.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <dt className="text-[11px] font-medium text-text-secondary">
                  {s.label}
                </dt>
                <dd className="text-[14px] font-semibold text-text-primary">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          {product ? (
            <Link
              href={href}
              className="group/btn mt-1 flex items-center justify-between rounded-lg border border-accent/20 px-4 py-3 text-[14px] font-semibold text-text-primary transition-colors hover:border-accent/45 hover:bg-accent/10"
            >
              Подробнее
              <ArrowRight
                size={16}
                className="text-accent transition-transform duration-200 group-hover/btn:translate-x-1"
              />
            </Link>
          ) : (
            <a
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn mt-1 flex items-center justify-between rounded-lg border border-accent/20 px-4 py-3 text-[14px] font-semibold text-text-primary transition-colors hover:border-accent/45 hover:bg-accent/10"
            >
              Купить
              <ArrowRight
                size={16}
                className="text-accent transition-transform duration-200 group-hover/btn:translate-x-1"
              />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Products() {
  return (
    <section id="products" className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">Каталог</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Профессиональная продукция
          </h2>
          <p className="max-w-xl text-[17px] text-text-secondary">
            Краски и грунтовки для профессионального применения
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.name} p={p} index={i} />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-[856px] lg:grid-cols-2">
          {products.slice(3).map((p, i) => (
            <ProductCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
