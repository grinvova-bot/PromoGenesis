"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер"),
  contactMethod: z.enum(["phone", "whatsapp", "telegram"]),
  consent: z.literal(true, { message: "Необходимо согласие" }),
});

type FormData = z.infer<typeof schema>;

export default function ContactCTA() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { contactMethod: "phone" },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <section id="contact" className="bg-off-white section-y">
      <div className="page-container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_min(420px,100%)] lg:items-center lg:gap-14 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex max-w-xl flex-col gap-5 lg:gap-6"
        >
          <span className="text-[12px] font-medium tracking-[5px] text-crimson">БЕСПЛАТНО</span>
          <h2 className="font-serif text-4xl leading-[1.08] font-medium text-dark-navy md:text-[46px] lg:text-[48px]">Для знакомства<br />с краской</h2>
          <p className="text-[16px] leading-[1.75] text-steel-blue">Заколеруем краску в цвета вашего проекта, даже по палитрам других производителей. Подарим выкрасы и пробник для теста.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full rounded-2xl border border-border-subtle bg-dark-navy p-7 shadow-xl shadow-dark-navy/20 sm:p-8"
        >
          <h3 className="mb-4 font-serif text-[26px] font-semibold text-off-white">Оставить заявку</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium tracking-[1px] text-steel-blue">Имя</label>
              <input {...register("name")} placeholder="Ваше имя" className="w-full rounded border border-border-subtle bg-transparent px-4 py-3 text-[14px] text-off-white outline-none transition-colors placeholder:text-steel-blue/50 focus:border-crimson" />
              {errors.name && <p className="mt-1 text-[12px] text-crimson">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium tracking-[1px] text-steel-blue">Телефон</label>
              <input {...register("phone")} placeholder="+7 (___) ___-__-__" className="w-full rounded border border-border-subtle bg-transparent px-4 py-3 text-[14px] text-off-white outline-none transition-colors placeholder:text-steel-blue/50 focus:border-crimson" />
              {errors.phone && <p className="mt-1 text-[12px] text-crimson">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-[12px] font-medium tracking-[1px] text-steel-blue">Удобный способ связи</label>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
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
            <button type="submit" className="mt-2 w-full rounded-lg bg-crimson py-3.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-deep-red hover:shadow-[0_0_40px_rgba(239,35,60,0.3)]">Получить бесплатно</button>
          </form>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
