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

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

export default function ColorPalette() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const rows = chunkArray(colorGroups[activeGroup].colors, 6);

  return (
    <section
      id="palette"
      className="bg-dark-navy transition-colors duration-1000"
      style={{ backgroundColor: hoveredColor ? `${hoveredColor}22` : undefined }}
    >
      <div className="mx-auto max-w-[1440px] px-8 py-20 lg:px-20">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЦВЕТОВАЯ ПАЛИТРА</span>
          <h2 className="font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Литера Чувств</h2>
          <p className="text-[16px] text-steel-blue">Интерактивный селектор цветов для вашего проекта</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-6">
          {colorGroups.map((group, i) => (
            <button key={group.name} onClick={() => setActiveGroup(i)} className={`px-6 py-2.5 text-[13px] font-medium transition-all duration-300 ${activeGroup === i ? "bg-crimson text-white" : "border border-border-subtle text-steel-blue hover:border-off-white hover:text-off-white"}`}>
              {group.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeGroup} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="flex flex-col gap-4">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap gap-4 lg:flex-nowrap">
                {row.map((color, colIdx) => (
                  <div key={`${color.code}-${rowIdx}-${colIdx}`} className="group min-w-[calc(50%-8px)] flex-1 cursor-pointer sm:min-w-[calc(33%-8px)] lg:min-w-0" onMouseEnter={() => setHoveredColor(color.hex)} onMouseLeave={() => setHoveredColor(null)}>
                    <div className="mb-2 h-[80px] w-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl" style={{ backgroundColor: color.hex }} />
                    <p className="text-[10px] font-medium tracking-[1px] text-off-white/60">{color.code}</p>
                    <p className="text-[10px] text-steel-blue opacity-0 transition-opacity group-hover:opacity-100">{color.label}</p>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <a href="https://www.tex-color.pro/images/docs/Catalog_Image_TexColor.pdf" target="_blank" rel="noopener noreferrer" className="border border-off-white/30 px-10 py-4 text-[14px] font-semibold tracking-wide text-off-white transition-all duration-300 hover:border-off-white hover:bg-off-white/5">Скачать каталог</a>
        </div>
      </div>
    </section>
  );
}
