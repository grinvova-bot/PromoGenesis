"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер"),
  contactMethod: z.enum(["phone", "whatsapp", "telegram"]),
  consent: z.literal(true, { message: "Необходимо согласие" }),
});

type FormData = z.infer<typeof schema>;

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { contactMethod: "phone" },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content", { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
      gsap.fromTo(".cta-form", { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-off-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-8 py-20 lg:flex-row lg:gap-20 lg:px-20">
        <div className="cta-content invisible flex flex-1 flex-col justify-center gap-6">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">БЕСПЛАТНО</span>
          <h2 className="font-serif text-4xl leading-[1.1] font-medium text-dark-navy md:text-[48px]">Для знакомства<br />с краской</h2>
          <p className="max-w-lg text-[16px] leading-[1.6] text-steel-blue">Заколеруем краску в цвета вашего проекта, даже по палитрам других производителей. Подарим выкрасы и пробник для теста.</p>
        </div>

        <div className="cta-form invisible w-full shrink-0 bg-dark-navy p-10 lg:w-[480px]">
          <h3 className="mb-5 font-serif text-[28px] font-semibold text-off-white">Оставить заявку</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-[12px] font-medium tracking-[1px] text-steel-blue">Имя</label>
              <input {...register("name")} placeholder="Ваше имя" className="w-full border border-border-subtle bg-transparent px-4 py-3.5 text-[14px] text-off-white outline-none transition-colors placeholder:text-steel-blue/50 focus:border-crimson" />
              {errors.name && <p className="mt-1 text-[12px] text-crimson">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-[12px] font-medium tracking-[1px] text-steel-blue">Телефон</label>
              <input {...register("phone")} placeholder="+7 (___) ___-__-__" className="w-full border border-border-subtle bg-transparent px-4 py-3.5 text-[14px] text-off-white outline-none transition-colors placeholder:text-steel-blue/50 focus:border-crimson" />
              {errors.phone && <p className="mt-1 text-[12px] text-crimson">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-[12px] font-medium tracking-[1px] text-steel-blue">Удобный способ связи</label>
              <div className="flex gap-4">
                {([{ value: "phone" as const, label: "Телефон" }, { value: "whatsapp" as const, label: "WhatsApp" }, { value: "telegram" as const, label: "Telegram" }]).map((opt) => (
                  <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-[14px] text-off-white">
                    <input type="radio" value={opt.value} {...register("contactMethod")} className="accent-crimson" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-start gap-2 text-[12px] text-steel-blue">
              <input type="checkbox" {...register("consent")} className="mt-0.5 accent-crimson" />
              <span>Я согласен с{" "}<a href="https://promo.alt-x.ru/pdd" target="_blank" rel="noopener noreferrer" className="text-crimson underline">политикой конфиденциальности</a></span>
            </label>
            {errors.consent && <p className="-mt-3 text-[12px] text-crimson">{errors.consent.message}</p>}
            <button type="submit" className="mt-2 w-full bg-crimson py-4 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-deep-red hover:shadow-[0_0_40px_rgba(239,35,60,0.3)]">Получить бесплатно</button>
          </form>
        </div>
      </div>
    </section>
  );
}
