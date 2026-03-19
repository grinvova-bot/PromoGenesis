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
      className="bg-dark-navy section-y transition-colors duration-700"
      style={{ backgroundColor: hoveredColor ? `${hoveredColor}22` : undefined }}
    >
      <div className="page-container flex flex-col gap-12">
        <header className="flex flex-col items-center gap-3 text-center">
          <span className="text-[12px] font-medium tracking-[4px] text-crimson">ЦВЕТОВАЯ ПАЛИТРА</span>
          <h2 className="font-serif text-4xl font-medium text-off-white md:text-[48px] md:leading-none">Литера Чувств</h2>
          <p className="max-w-xl text-[16px] text-steel-blue">Интерактивный селектор цветов для вашего проекта</p>
        </header>

        {/* Табы: gap 24, padding 10×24 как в .pen */}
        <div className="flex flex-wrap justify-center gap-6">
          {colorGroups.map((group, i) => (
            <button
              key={group.name}
              type="button"
              onClick={() => setActiveGroup(i)}
              className={`px-6 py-2.5 text-[13px] font-medium transition-colors duration-300 ${
                activeGroup === i ? "bg-crimson text-pure-white" : "border border-border-subtle text-steel-blue hover:border-off-white/40 hover:text-off-white"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6"
              >
                {row.map((color) => (
                  <button
                    key={`${activeGroup}-${color.code}-${rowIdx}`}
                    type="button"
                    className="group w-full text-left"
                    onMouseEnter={() => setHoveredColor(color.hex)}
                    onMouseLeave={() => setHoveredColor(null)}
                  >
                    <div
                      className="relative mb-2 flex h-20 w-full items-end pb-2 pl-3 transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`text-[10px] font-medium tracking-wide ${
                          parseInt(color.hex.slice(1, 3), 16) > 200 ? "text-dark-navy" : "text-pure-white"
                        }`}
                      >
                        {color.code}
                      </span>
                    </div>
                    <span className="text-[10px] text-steel-blue opacity-0 transition-opacity group-hover:opacity-100">{color.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center pt-4">
          <a
            href="https://www.tex-color.pro/images/docs/Catalog_Image_TexColor.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-off-white px-10 py-4 text-[14px] font-semibold tracking-wide text-off-white transition-colors duration-300 hover:bg-off-white/10"
          >
            Скачать каталог
          </a>
        </div>
      </div>
    </section>
  );
}
