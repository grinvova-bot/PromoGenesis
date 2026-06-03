"use client";

import Image from "next/image";
import { Paintbrush, X } from "lucide-react";
import { useEffect, useState } from "react";
import { paletteColors } from "@/data/palette";

const INITIAL_COLOR = paletteColors.find((color) => color.code === "TN105")!;

const scenes = [
  {
    id: "living",
    label: "Гостиная",
    image: "/visualizer/living-foreground.webp",
    alt: "Гостиная с прозрачным фоном стены",
  },
  {
    id: "bedroom",
    label: "Спальня",
    image: "/visualizer/bedroom-foreground.webp",
    alt: "Спальня с прозрачным фоном стены",
  },
  {
    id: "office",
    label: "Кабинет",
    image: "/visualizer/office-foreground.webp",
    alt: "Кабинет с прозрачным фоном стены",
  },
  {
    id: "kids",
    label: "Детская",
    image: "/visualizer/kids-foreground.webp",
    alt: "Детская с прозрачным фоном стены",
  },
  {
    id: "kitchen",
    label: "Кухня",
    image: "/visualizer/kitchen-foreground.webp",
    alt: "Кухня с прозрачным фоном стены",
  },
] as const;

type Props = {
  mode?: "modal" | "inline";
};

export default function ColorVisualizer({ mode = "modal" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(INITIAL_COLOR);
  const [selectedScene, setSelectedScene] = useState<(typeof scenes)[number]>(
    scenes[0],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const panel = (
    <section
      role={mode === "modal" ? "dialog" : undefined}
      aria-modal={mode === "modal" ? true : undefined}
      aria-labelledby="color-visualizer-title"
      className={
        mode === "modal"
          ? "flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[1240px] flex-col overflow-hidden rounded-2xl border border-border-card/60 bg-bg-card shadow-2xl md:max-h-[calc(100dvh-3rem)]"
          : "flex w-full flex-col overflow-hidden rounded-2xl border border-border-card/60 bg-bg-card"
      }
    >
      <header className="flex items-start justify-between gap-6 border-b border-border-card/50 px-5 py-4 md:px-7 md:py-5">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Примерка цвета</span>
          <h2
            id="color-visualizer-title"
            className="font-display text-xl font-bold text-text-primary md:text-2xl"
          >
            Выберите интерьер и оттенок
          </h2>
        </div>
        {mode === "modal" && (
          <button
            type="button"
            aria-label="Закрыть примерку цвета"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-card/60 text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
          >
            <X size={20} />
          </button>
        )}
      </header>

      <div
        className={`grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)] ${
          mode === "inline" ? "lg:h-[760px] lg:flex-none" : ""
        }`}
      >
        <div className="flex min-h-0 flex-col gap-4 bg-bg-alt p-4 md:p-6">
          <div className="flex flex-wrap gap-2">
            {scenes.map((scene) => {
              const selected = selectedScene.id === scene.id;

              return (
                <button
                  key={scene.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedScene(scene)}
                  className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    selected
                      ? "border-accent bg-accent text-on-accent"
                      : "border-border-card/60 bg-bg-card text-text-secondary hover:border-accent/50 hover:text-text-primary"
                  }`}
                >
                  {scene.label}
                </button>
              );
            })}
          </div>

          <div
            className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-inner transition-colors duration-300"
            style={{
              backgroundColor: selectedColor.hex,
              backgroundImage:
                "linear-gradient(105deg, rgba(255,255,255,0.2) 0%, transparent 35%, rgba(0,0,0,0.08) 100%)",
            }}
          >
            <Image
              src={selectedScene.image}
              alt={selectedScene.alt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-card/50 bg-bg-card px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span
                className="h-11 w-11 shrink-0 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div>
                <p className="text-[12px] font-semibold tracking-[0.12em] text-accent">
                  {selectedColor.code}
                </p>
                <p className="font-semibold text-text-primary">
                  {selectedColor.name}
                </p>
              </div>
            </div>
            <span className="text-[13px] font-medium tracking-[0.08em] text-text-secondary">
              {selectedColor.hex}
            </span>
          </div>

          <p className="text-[12px] leading-[1.5] text-text-tertiary">
            Примерка является визуализацией. Цветопередача зависит от
            экрана, освещения и фактуры стены.
          </p>
        </div>

        <div
          className="min-h-0 overflow-y-auto border-t border-border-card/50 p-4 md:p-6 lg:border-l lg:border-t-0"
          data-lenis-prevent
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
            {paletteColors.map((color) => {
              const selected = selectedColor.code === color.code;

              return (
                <button
                  key={color.code}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedColor(color)}
                  className={`flex min-w-0 items-center gap-2.5 rounded-lg border p-2.5 text-left transition-all ${
                    selected
                      ? "border-accent bg-accent/10 shadow-sm"
                      : "border-border-card/50 bg-bg-base hover:border-accent/45"
                  }`}
                >
                  <span
                    className="h-9 w-9 shrink-0 rounded-md border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-[0.1em] text-accent">
                      {color.code}
                    </span>
                    <span className="block truncate text-[12px] font-medium text-text-primary">
                      {color.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  if (mode === "inline") {
    return panel;
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => setIsOpen(true)}
      >
        <Paintbrush size={18} />
        Примерить цвет
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111f]/75 p-3 backdrop-blur-sm md:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          {panel}
        </div>
      )}
    </>
  );
}
