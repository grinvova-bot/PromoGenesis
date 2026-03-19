"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ExpertTestimonial() {
  return (
    <section className="overflow-hidden bg-off-white">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:h-[600px] lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] w-full bg-dark-navy lg:h-full lg:w-[560px] lg:shrink-0"
        >
          <Image src="/expert/yulia.jpg" alt="Юлия Васильева" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-1 flex-col justify-center gap-6 px-8 py-16 lg:px-20 lg:py-20"
        >
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЭКСПЕРТНОЕ МНЕНИЕ</span>

          <blockquote className="font-serif text-xl leading-[1.6] font-medium text-dark-navy italic md:text-[22px]">
            &laquo;Как дизайнер интерьеров я работала с бесчисленным количеством
            брендов красок, но TEX-COLOR GENESIS выделяется. Глубина цвета,
            лёгкость нанесения и исключительная долговечность делают его моим
            первым выбором.&raquo;
          </blockquote>

          <div>
            <p className="text-[16px] font-semibold text-dark-navy">Юлия Васильева</p>
            <p className="mt-1 text-[13px] text-steel-blue">Председатель Союза Дизайнеров и Архитекторов СПб</p>
            <p className="mt-1 text-[11px] font-medium tracking-[2px] text-crimson">VASILEVA DESIGN</p>
          </div>

          <p className="text-[12px] text-steel-blue">#ВыборЭксперта &nbsp; #ПремиальноеКачество &nbsp; #ОдобреноДизайнерами</p>
        </motion.div>
      </div>
    </section>
  );
}
