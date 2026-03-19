"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ColorSwatch = { code: string; label: string; hex: string };
type ColorGroup = { name: string; colors: ColorSwatch[] };

const colorGroups: ColorGroup[] = [
  {
    name: "Тихие истины",
    colors: [
      { code: "TN100", label: "Тень отражения", hex: "#D5C8B8" },
      { code: "TG306", label: "Луч на опушке", hex: "#8B9E6B" },
      { code: "TG301", label: "Изумрудный вздох", hex: "#2D5A4E" },
      { code: "TR403", label: "Шерсть ламы", hex: "#C4A882" },
      { code: "TN102", label: "Фон тишины", hex: "#E8E0D5" },
      { code: "TY502", label: "Тень ущелья", hex: "#5A4A3C" },
      { code: "TY500", label: "Верблюжий плед", hex: "#D4C4A8" },
      { code: "TN101", label: "Кавычки тумана", hex: "#DDDAD4" },
      { code: "TN104", label: "Песок времени", hex: "#C8B99A" },
      { code: "TG303", label: "Утро в мае", hex: "#7BA47A" },
      { code: "TN106", label: "Полутон ощущения", hex: "#B8AFA4" },
      { code: "TB201", label: "Полночное признание", hex: "#1E2A40" },
      { code: "TR402", label: "Глубина очага", hex: "#8B3A3A" },
      { code: "TG302", label: "Влажная олива", hex: "#6B7A52" },
      { code: "TN107", label: "Пыль воспоминаний", hex: "#ADA59B" },
      { code: "TN110", label: "Шёлк тумана", hex: "#C8C2BA" },
    ],
  },
  {
    name: "Горные сонеты",
    colors: [
      { code: "TG306", label: "Луч на опушке", hex: "#8B9E6B" },
      { code: "TG301", label: "Изумрудный вздох", hex: "#2D5A4E" },
      { code: "TG303", label: "Утро в мае", hex: "#7BA47A" },
      { code: "TG302", label: "Влажная олива", hex: "#6B7A52" },
      { code: "TR403", label: "Шерсть ламы", hex: "#C4A882" },
      { code: "TY502", label: "Тень ущелья", hex: "#5A4A3C" },
      { code: "TY500", label: "Верблюжий плед", hex: "#D4C4A8" },
      { code: "TB201", label: "Полночное признание", hex: "#1E2A40" },
      { code: "TR402", label: "Глубина очага", hex: "#8B3A3A" },
    ],
  },
];

export default function ColorPalette() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const colors = colorGroups[activeGroup].colors;

  return (
    <section
      id="palette"
      className="bg-dark-navy section-y transition-colors duration-1000"
      style={{ backgroundColor: hoveredColor ? `${hoveredColor}22` : undefined }}
    >
      <div className="page-container">
        <header className="mb-10 text-center md:mb-14">
          <span className="mb-3 block text-[12px] font-medium tracking-[5px] text-crimson">ЦВЕТОВАЯ ПАЛИТРА</span>
          <h2 className="mb-4 font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Литера Чувств</h2>
          <p className="mx-auto max-w-lg text-[16px] leading-relaxed text-steel-blue">Интерактивный селектор цветов для вашего проекта</p>
        </header>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {colorGroups.map((group, i) => (
            <button
              key={group.name}
              type="button"
              onClick={() => setActiveGroup(i)}
              className={`rounded-full px-6 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                activeGroup === i
                  ? "bg-crimson text-white shadow-lg shadow-crimson/25"
                  : "border border-border-subtle text-steel-blue hover:border-off-white/50 hover:text-off-white"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4"
          >
            {colors.map((color) => (
              <div
                key={`${activeGroup}-${color.code}-${color.hex}`}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredColor(color.hex)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div
                  className="mb-2 aspect-[5/2] w-full rounded-md ring-1 ring-white/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:ring-white/20"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-[10px] font-medium tracking-wide text-off-white/55">{color.code}</p>
                <p className="min-h-[1rem] text-[10px] leading-tight text-steel-blue opacity-0 transition-opacity group-hover:opacity-100">{color.label}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center md:mt-14">
          <a
            href="https://www.tex-color.pro/images/docs/Catalog_Image_TexColor.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-off-white/35 px-10 py-3.5 text-[13px] font-semibold tracking-wide text-off-white transition-all duration-300 hover:border-off-white hover:bg-off-white/8"
          >
            Скачать каталог
          </a>
        </div>
      </div>
    </section>
  );
}
