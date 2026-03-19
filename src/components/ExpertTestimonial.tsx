"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ExpertTestimonial() {
  return (
    <section className="bg-off-white section-y">
      <div className="page-container">
        <div className="overflow-hidden rounded-2xl border border-dark-navy/[0.06] bg-pure-white shadow-[0_4px_40px_-12px_rgba(43,45,66,0.12)] md:rounded-3xl">
          <div className="flex flex-col lg:min-h-[min(520px,70vh)] lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] w-full shrink-0 bg-dark-navy sm:aspect-[16/10] lg:aspect-auto lg:w-[42%] lg:max-w-[480px]"
            >
              <Image
                src="/expert/yulia.jpg"
                alt="Юлия Васильева"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-1 flex-col justify-center gap-6 px-6 py-10 sm:px-10 sm:py-12 lg:gap-8 lg:px-12 lg:py-14 xl:px-16"
            >
              <span className="text-[12px] font-medium tracking-[5px] text-crimson">ЭКСПЕРТНОЕ МНЕНИЕ</span>

              <blockquote className="font-serif text-[19px] font-medium leading-[1.65] text-dark-navy italic sm:text-[21px] lg:text-[22px]">
                &laquo;Как дизайнер интерьеров я работала с бесчисленным количеством брендов красок, но TEX-COLOR GENESIS
                выделяется. Глубина цвета, лёгкость нанесения и исключительная долговечность делают его моим первым
                выбором.&raquo;
              </blockquote>

              <div className="flex flex-col gap-1 border-l-2 border-crimson/40 pl-4">
                <p className="text-[16px] font-semibold text-dark-navy">Юлия Васильева</p>
                <p className="text-[13px] text-steel-blue">Председатель Союза Дизайнеров и Архитекторов СПб</p>
                <p className="text-[11px] font-medium tracking-[3px] text-crimson">VASILEVA DESIGN</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-dark-navy/[0.06] px-3 py-1.5 text-[11px] text-steel-blue">#ВыборЭксперта</span>
                <span className="rounded-full bg-dark-navy/[0.06] px-3 py-1.5 text-[11px] text-steel-blue">#ПремиальноеКачество</span>
                <span className="rounded-full bg-dark-navy/[0.06] px-3 py-1.5 text-[11px] text-steel-blue">#ОдобреноДизайнерами</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
