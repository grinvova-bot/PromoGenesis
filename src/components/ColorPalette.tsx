"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { paletteColors, type Collection } from "@/data/palette";
import ColorVisualizer from "./ColorVisualizer";
import Reveal from "./Reveal";

type Filter = "all" | Collection;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "quiet", label: "Тихие истины" },
  { value: "mountain", label: "Горные сонеты" },
];

export default function ColorPalette() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filteredColors = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");

    return paletteColors.filter((color) => {
      const matchesFilter =
        activeFilter === "all" || color.collection === activeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${color.code} ${color.name}`
          .toLocaleLowerCase("ru")
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <section id="palette" className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-10">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">Палитра</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Цветовая палитра «ЛИТЕРА ЧУВСТВ»
          </h2>
          <p className="max-w-2xl text-[17px] leading-[1.6] text-text-secondary">
            Полная коллекция оттенков Genesis: «Тихие истины» и «Горные
            сонеты».
          </p>
        </Reveal>

        <Reveal className="mx-auto flex w-full max-w-4xl flex-col gap-5">
          <label className="relative block">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по коду или названию цвета"
              className="w-full rounded-xl border border-border-card/60 bg-bg-card py-3.5 pl-12 pr-4 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
            />
          </label>

          <div className="flex flex-wrap justify-center gap-2.5">
            {filters.map((filter) => {
              const selected = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                    selected
                      ? "border-accent bg-accent text-on-accent"
                      : "border-border-card/60 bg-bg-card text-text-secondary hover:border-accent/60 hover:text-text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {filteredColors.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {filteredColors.map((color, index) => (
              <Reveal key={color.code} index={index % 6} as="article" className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/70 bg-[#f4f4f2] shadow-[0_8px_24px_-14px_#00000070] transition-all duration-300 hover:-translate-y-1 hover:border-white">
                  <div className="aspect-square p-2.5">
                    <div
                      className="h-full w-full rounded-lg border border-black/5 transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ backgroundColor: color.hex }}
                      role="img"
                      aria-label={`${color.code} ${color.name}, цвет ${color.hex}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 border-t border-black/8 px-4 py-3.5">
                    <span className="text-[12px] font-semibold tracking-[0.12em] text-[#315f91]">
                      {color.code}
                    </span>
                    <h3 className="text-[14px] font-medium leading-[1.35] text-[#1b2845]">
                      {color.name}
                    </h3>
                    <span className="mt-1 text-[11px] font-medium tracking-[0.08em] text-[#66727f]">
                      {color.hex}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border-card/40 bg-bg-card px-6 py-12 text-center text-[15px] text-text-secondary">
            Цвета по вашему запросу не найдены.
          </div>
        )}

        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-[13px] leading-[1.6] text-text-tertiary">
            Цветопередача зависит от настроек экрана. Для точного выбора
            используйте физический веер или выкрас.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ColorVisualizer />
            <a href="#contact" className="btn btn-primary">
              Получить веер бесплатно
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
