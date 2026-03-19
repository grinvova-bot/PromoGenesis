"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { tag: "GENESIS", name: "DECKER", description: "Глубокоматовая краска для потолков со сложным светом", image: "/products/decker.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
  { tag: "GENESIS", name: "STARKE FARBE", description: "Сверхпрочная матовая интерьерная краска для стен", image: "/products/starke-farbe.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
  { tag: "GENESIS", name: "SOFT MATT", description: "Глубокоматовая краска для стен со сложным боковым светом", image: "/products/soft-matt.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
  { tag: "GENESIS", name: "GE", description: "Профессиональная кроющая грунтовочная краска для внутренних работ", image: "/products/ge.png", buyUrl: "https://pro.alt-x.ru/brand/tex-color/" },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".product-card");
      gsap.fromTo(cards, { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 80%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="bg-off-white">
      <div className="mx-auto max-w-[1440px] px-8 py-20 lg:px-20">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЛИНЕЙКА GENESIS</span>
          <h2 className="font-serif text-4xl font-medium text-dark-navy md:text-[48px] md:leading-none">Наши продукты</h2>
          <p className="text-[16px] text-steel-blue">Профессиональные краски для интерьеров, которым доверяют дизайнеры</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="product-card invisible group cursor-pointer overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-surface-dark p-6">
                <Image src={product.image} alt={`${product.name} — ${product.description}`} width={240} height={240} className="h-auto max-h-[220px] w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <span className="text-[11px] font-medium tracking-[3px] text-crimson">{product.tag}</span>
                <h3 className="font-serif text-[28px] font-semibold text-dark-navy">{product.name}</h3>
                <p className="text-[14px] leading-relaxed text-steel-blue">{product.description}</p>
                <a href={product.buyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block self-start border-2 border-crimson px-8 py-3 text-[14px] font-semibold tracking-wide text-crimson transition-all duration-300 group-hover:bg-crimson group-hover:text-white">Купить</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
