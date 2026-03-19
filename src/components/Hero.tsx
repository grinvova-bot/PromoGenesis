"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(tagRef.current, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.5)
        .fromTo(headlineRef.current, { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.7)
        .fromTo(subRef.current, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 1.2)
        .fromTo(ctaRef.current, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 1.5);

      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[900px] overflow-hidden bg-dark-navy">
      <div ref={bgRef} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/70 via-dark-navy/40 to-dark-navy/80" />
      </div>

      <div className="relative z-10 mx-auto h-full max-w-[1440px] px-8 lg:px-20">
        <div className="flex h-full flex-col justify-center pt-20">
          <div className="flex max-w-[800px] flex-col gap-6">
            <span ref={tagRef} className="invisible text-[12px] font-medium tracking-[5px] text-crimson">TEX-COLOR GENESIS</span>
            <h1 ref={headlineRef} className="invisible font-serif text-5xl leading-none font-medium text-off-white md:text-7xl lg:text-[80px]" style={{ letterSpacing: "-2px" }}>
              Цвет, который<br />чувствуешь
            </h1>
            <p ref={subRef} className="invisible max-w-[600px] text-[18px] leading-[1.6] text-steel-blue">
              Профессиональные интерьерные краски премиум-класса.<br />Глубина цвета и безупречная текстура.
            </p>
            <div ref={ctaRef} className="invisible flex flex-wrap gap-4">
              <a href="#contact" className="bg-crimson px-10 py-4 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-deep-red hover:shadow-[0_0_40px_rgba(239,35,60,0.3)]">Получить бесплатно</a>
              <a href="#products" className="border border-off-white/30 px-10 py-4 text-[14px] font-semibold tracking-wide text-off-white transition-all duration-300 hover:border-off-white hover:bg-off-white/5">Каталог</a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[60px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-8 w-[1px] animate-pulse bg-off-white/40" />
        <span className="text-[9px] tracking-[3px] text-off-white/40">SCROLL</span>
      </div>
    </section>
  );
}
