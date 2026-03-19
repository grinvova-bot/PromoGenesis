"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* .pen: высота 600, фото 560, контент padding 80, gap 24, цитата Cormorant 24 italic 1.5 */
export default function ExpertTestimonial() {
  return (
    <section className="overflow-hidden bg-off-white">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:h-[600px] lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative aspect-[4/3] w-full shrink-0 bg-dark-navy sm:aspect-[16/10] lg:aspect-auto lg:h-auto lg:w-[560px]"
        >
          <Image src="/expert/yulia.jpg" alt="Юлия Васильева" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 560px" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-1 flex-col justify-center gap-6 px-6 py-14 sm:px-10 lg:gap-6 lg:px-20 lg:py-16"
        >
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЭКСПЕРТНОЕ МНЕНИЕ</span>

          <blockquote className="font-serif text-[22px] font-medium leading-[1.5] text-dark-navy italic md:text-[24px]">
            &laquo;Как дизайнер интерьеров я работала с бесчисленным количеством брендов красок, но TEX-COLOR GENESIS выделяется.
            Глубина цвета, лёгкость нанесения и исключительная долговечность делают его моим первым выбором.&raquo;
          </blockquote>

          <div className="flex flex-col gap-1">
            <p className="text-[16px] font-semibold text-dark-navy">Юлия Васильева</p>
            <p className="text-[13px] text-steel-blue">Председатель Союза Дизайнеров и Архитекторов СПб</p>
            <p className="text-[11px] font-medium tracking-[2px] text-crimson">VASILEVA DESIGN</p>
          </div>

          <p className="text-[12px] text-steel-blue">
            #ВыборЭксперта&nbsp;&nbsp;#ПремиальноеКачество&nbsp;&nbsp;#ОдобреноДизайнерами
          </p>
        </motion.div>
      </div>
    </section>
  );
}
