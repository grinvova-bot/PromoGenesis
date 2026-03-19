"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExpertTestimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        const text = quoteRef.current.textContent || "";
        quoteRef.current.textContent = "";
        quoteRef.current.style.visibility = "visible";
        const chars = text.split("");
        chars.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.opacity = "0";
          quoteRef.current!.appendChild(span);
        });
        gsap.to(quoteRef.current.children, {
          opacity: 1, duration: 0.03, stagger: 0.02, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        });
      }
      gsap.fromTo(".expert-photo", { xPercent: -10, autoAlpha: 0 }, {
        xPercent: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-off-white">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:h-[600px] lg:flex-row">
        <div className="expert-photo invisible relative h-[400px] w-full bg-dark-navy lg:h-full lg:w-[560px] lg:shrink-0">
          <Image src="/expert/yulia.jpg" alt="Юлия Васильева — Председатель Союза Дизайнеров и Архитекторов СПб" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" priority />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6 px-8 py-16 lg:px-20 lg:py-20">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЭКСПЕРТНОЕ МНЕНИЕ</span>
          <blockquote ref={quoteRef} className="font-serif text-xl leading-[1.6] font-medium text-dark-navy italic md:text-[22px]" style={{ visibility: "hidden" }}>
            &laquo;Как дизайнер интерьеров я работала с бесчисленным количеством брендов красок, но TEX-COLOR GENESIS выделяется. Глубина цвета, лёгкость нанесения и исключительная долговечность делают его моим первым выбором.&raquo;
          </blockquote>
          <div>
            <p className="text-[16px] font-semibold text-dark-navy">Юлия Васильева</p>
            <p className="mt-1 text-[13px] text-steel-blue">Председатель Союза Дизайнеров и Архитекторов СПб</p>
            <p className="mt-1 text-[11px] font-medium tracking-[2px] text-crimson">VASILEVA DESIGN</p>
          </div>
          <p className="text-[12px] text-steel-blue">#ВыборЭксперта &nbsp; #ПремиальноеКачество &nbsp; #ОдобреноДизайнерами</p>
        </div>
      </div>
    </section>
  );
}
