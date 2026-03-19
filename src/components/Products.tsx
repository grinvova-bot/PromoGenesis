"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  { tag: "GENESIS", name: "DECKER", description: "Глубокоматовая краска для потолков со сложным светом", image: "/products/decker.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
  { tag: "GENESIS", name: "STARKE FARBE", description: "Сверхпрочная матовая интерьерная краска для стен", image: "/products/starke-farbe.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
  { tag: "GENESIS", name: "SOFT MATT", description: "Глубокоматовая краска для стен со сложным боковым светом", image: "/products/soft-matt.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
  { tag: "GENESIS", name: "GE", description: "Профессиональная кроющая грунтовочная краска для внутренних работ", image: "/products/ge.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
];

export default function Products() {
  return (
    <section id="products" className="bg-off-white section-y">
      <div className="page-container flex flex-col gap-12">
        <header className="flex w-full flex-col gap-3">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЛИНЕЙКА GENESIS</span>
          <h2 className="font-serif text-4xl font-medium text-dark-navy md:text-[48px] md:leading-none">Наши продукты</h2>
          <p className="max-w-3xl text-[16px] leading-normal text-steel-blue">Профессиональные краски для интерьеров, которым доверяют дизайнеры</p>
        </header>

        {/* Карточка CMUkS: изображение 280px, контент padding 24, gap 12, кнопка — border 2px crimson */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {products.map((product, i) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden bg-pure-white shadow-sm"
            >
              <div className="flex h-[280px] items-center justify-center bg-surface-dark p-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="h-auto max-h-[220px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <span className="text-[11px] font-medium tracking-[3px] text-crimson">{product.tag}</span>
                <h3 className="font-serif text-[28px] font-semibold text-dark-navy">{product.name}</h3>
                <p className="text-[14px] leading-[1.5] text-steel-blue">{product.description}</p>
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 w-fit border-2 border-crimson px-10 py-4 text-[14px] font-semibold tracking-wide text-crimson transition-all duration-300 hover:bg-crimson hover:text-white"
                >
                  Купить
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
