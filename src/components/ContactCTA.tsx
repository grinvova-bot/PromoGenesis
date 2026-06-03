"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер"),
  contactMethod: z.enum(["phone", "whatsapp", "telegram"]),
  consent: z.literal(true, { message: "Необходимо согласие" }),
});

type FormData = z.infer<typeof schema>;

const perks = [
  "Выкрасы и пробник краски бесплатно",
  "Колеровка в цвета вашего проекта",
  "Даже по палитрам других производителей",
];

export default function ContactCTA() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { contactMethod: "phone" },
  });

  const onSubmit = (data: FormData) => {
    // TODO: подключить отправку заявки на бэкенд/CRM
    console.info("lead", data);
  };

  return (
    <section
      id="contact"
      className="theme-dark-surface section-y"
      style={{
        background: "var(--contact-gradient)",
      }}
    >
      <div className="page-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="eyebrow">Бесплатно</span>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold text-text-primary">
              Для знакомства с краской
            </h2>
            <p className="max-w-xl text-[17px] leading-[1.6] text-text-secondary">
              Заколеруем краску в цвета вашего проекта, даже по палитрам других
              производителей. Подарим выкрасы и пробник для теста.
            </p>
            <ul className="mt-1 flex flex-col gap-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-text-primary">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Check size={14} className="text-accent" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-3xl border border-border-card/40 bg-bg-card p-8 shadow-[0_16px_48px_-12px_#00000060] sm:p-10"
          >
            <h3 className="font-display text-[20px] font-semibold text-text-primary">
              Оставить заявку
            </h3>

            {isSubmitSuccessful ? (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-accent/10 px-6 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                  <Check size={22} className="text-accent" />
                </span>
                <p className="text-[16px] font-semibold text-text-primary">
                  Заявка отправлена!
                </p>
                <p className="text-[14px] text-text-secondary">
                  Свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-text-secondary">Имя</label>
                  <input
                    {...register("name")}
                    placeholder="Ваше имя"
                    className="w-full rounded-lg border border-border-card/50 bg-bg-base/40 px-4 py-3.5 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                  />
                  {errors.name && (
                    <p className="text-[12px] text-accent-2">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-text-secondary">Телефон</label>
                  <input
                    {...register("phone")}
                    inputMode="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-lg border border-border-card/50 bg-bg-base/40 px-4 py-3.5 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                  />
                  {errors.phone && (
                    <p className="text-[12px] text-accent-2">{errors.phone.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-text-secondary">
                    Удобный способ связи
                  </label>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {[
                      { value: "phone", label: "Телефон" },
                      { value: "whatsapp", label: "WhatsApp" },
                      { value: "telegram", label: "Telegram" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center gap-2 text-[14px] text-text-primary"
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("contactMethod")}
                          className="accent-accent"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-text-secondary">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 accent-accent"
                  />
                  <span>
                    Я согласен с{" "}
                    <a
                      href="https://promo.alt-x.ru/pdd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>
                {errors.consent && (
                  <p className="-mt-2 text-[12px] text-accent-2">{errors.consent.message}</p>
                )}

                <button type="submit" className="btn btn-primary mt-1 w-full">
                  Получить бесплатно
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
