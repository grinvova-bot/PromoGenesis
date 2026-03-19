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
    <section id="products" className="bg-off-white">
      <div className="mx-auto max-w-[1440px] px-8 py-20 lg:px-20">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЛИНЕЙКА GENESIS</span>
          <h2 className="font-serif text-4xl font-medium text-dark-navy md:text-[48px] md:leading-none">Наши продукты</h2>
          <p className="text-[16px] text-steel-blue">Профессиональные краски для интерьеров, которым доверяют дизайнеры</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-[280px] items-center justify-center overflow-hidden bg-surface-dark p-6">
                <Image src={product.image} alt={product.name} width={240} height={240} className="h-auto max-h-[220px] w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <span className="text-[11px] font-medium tracking-[3px] text-crimson">{product.tag}</span>
                <h3 className="font-serif text-[28px] font-semibold text-dark-navy">{product.name}</h3>
                <p className="text-[14px] leading-relaxed text-steel-blue">{product.description}</p>
                <a href={product.buyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block self-start border-2 border-crimson px-8 py-3 text-[14px] font-semibold tracking-wide text-crimson transition-all duration-300 group-hover:bg-crimson group-hover:text-white">Купить</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
