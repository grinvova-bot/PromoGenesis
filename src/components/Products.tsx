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
      <div className="page-container">
        <header className="mb-12 max-w-2xl md:mb-16">
          <span className="mb-3 block text-[12px] font-medium tracking-[5px] text-crimson">ЛИНЕЙКА GENESIS</span>
          <h2 className="mb-4 font-serif text-4xl font-medium text-dark-navy md:text-[48px] md:leading-none">Наши продукты</h2>
          <p className="text-[16px] leading-relaxed text-steel-blue">Профессиональные краски для интерьеров, которым доверяют дизайнеры</p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-dark-navy/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex aspect-[4/3] max-h-[260px] min-h-[220px] items-center justify-center bg-surface-dark p-6">
                <Image src={product.image} alt={product.name} width={200} height={200} className="h-auto max-h-[200px] w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="text-[10px] font-medium tracking-[3px] text-crimson">{product.tag}</span>
                <h3 className="font-serif text-[22px] font-semibold leading-tight text-dark-navy">{product.name}</h3>
                <p className="flex-1 text-[13px] leading-relaxed text-steel-blue">{product.description}</p>
                <a href={product.buyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block self-start rounded border border-crimson px-6 py-2.5 text-[13px] font-semibold tracking-wide text-crimson transition-all duration-300 hover:bg-crimson hover:text-white">Купить</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
