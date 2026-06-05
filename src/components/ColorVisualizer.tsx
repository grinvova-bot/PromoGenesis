"use client";

import Image from "next/image";
import {
  Baby,
  BedDouble,
  Briefcase,
  Check,
  Copy,
  Download,
  Loader2,
  Paintbrush,
  Sofa,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { paletteColors } from "@/data/palette";

const INITIAL_COLOR = paletteColors.find((color) => color.code === "TN105")!;

function CopyHexButton({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // буфер обмена недоступен — тихо игнорируем
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `Скопировано: ${hex}` : `Скопировать ${hex}`}
      title={copied ? "Скопировано" : "Скопировать код"}
      className="inline-flex shrink-0 items-center justify-center rounded-md p-1 text-text-secondary/60 transition-colors hover:bg-text-primary/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      {copied ? (
        <Check size={14} className="text-[#3f7d54]" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}

const scenes = [
  {
    id: "living",
    label: "Гостиная",
    Icon: Sofa,
    image: "/visualizer/living-foreground-v4.webp",
    lighting: "/visualizer/living-lighting-v4.webp",
    alt: "Гостиная с окрашиваемой стеной",
  },
  {
    id: "bedroom",
    label: "Спальня",
    Icon: BedDouble,
    image: "/visualizer/bedroom-foreground-v4.webp",
    lighting: "/visualizer/bedroom-lighting-v4.webp",
    alt: "Спальня с окрашиваемой стеной",
  },
  {
    id: "office",
    label: "Кабинет",
    Icon: Briefcase,
    image: "/visualizer/office-foreground-v4.webp",
    lighting: "/visualizer/office-lighting-v4.webp",
    alt: "Кабинет с окрашиваемой стеной",
  },
  {
    id: "kids",
    label: "Детская",
    Icon: Baby,
    image: "/visualizer/kids-foreground-v4.webp",
    lighting: "/visualizer/kids-lighting-v4.webp",
    alt: "Детская с окрашиваемой стеной",
  },
  {
    id: "kitchen",
    label: "Кухня",
    Icon: Utensils,
    image: "/visualizer/kitchen-foreground-v4.webp",
    lighting: "/visualizer/kitchen-lighting-v4.webp",
    alt: "Кухня с окрашиваемой стеной",
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
  const [downloadState, setDownloadState] = useState<
    "idle" | "loading" | "done"
  >("idle");

  const handleDownload = async () => {
    if (downloadState === "loading") return;
    setDownloadState("loading");

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    try {
      const [foreground, lighting] = await Promise.all([
        loadImage(selectedScene.image),
        selectedScene.lighting
          ? loadImage(selectedScene.lighting)
          : Promise.resolve(null),
      ]);

      const w = foreground.naturalWidth;
      const h = foreground.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no 2d context");

      // 1. цвет стены
      ctx.fillStyle = selectedColor.hex;
      ctx.fillRect(0, 0, w, h);
      // 2. карта освещения (как mix-blend-multiply в CSS)
      if (lighting) {
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(lighting, 0, 0, w, h);
      }
      // 3. передний план (мебель, окна)
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(foreground, 0, 0, w, h);

      // 4. фирменная плашка
      const barH = Math.round(h * 0.12);
      const y = h - barH;
      ctx.fillStyle = "rgba(12,18,28,0.78)";
      ctx.fillRect(0, y, w, barH);

      const pad = Math.round(barH * 0.3);
      const sw = Math.round(barH * 0.42);
      ctx.fillStyle = selectedColor.hex;
      ctx.fillRect(pad, y + (barH - sw) / 2, sw, sw);
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = Math.max(1, Math.round(sw * 0.04));
      ctx.strokeRect(pad, y + (barH - sw) / 2, sw, sw);

      const textX = pad + sw + Math.round(pad * 0.7);
      const font = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${Math.round(barH * 0.27)}px ${font}`;
      ctx.fillText("TEX-COLOR GENESIS", textX, y + barH * 0.46);
      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.font = `500 ${Math.round(barH * 0.24)}px ${font}`;
      ctx.fillText(
        `${selectedColor.code} · ${selectedColor.name} · ${selectedColor.hex}`,
        textX,
        y + barH * 0.8,
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.92),
      );
      if (!blob) throw new Error("toBlob failed");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `genesis-${selectedScene.id}-${selectedColor.code}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setDownloadState("done");
      window.setTimeout(() => setDownloadState("idle"), 1800);
    } catch {
      setDownloadState("idle");
    }
  };

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
      aria-labelledby={mode === "modal" ? "color-visualizer-title" : undefined}
      aria-label={mode === "inline" ? "Примерка цвета в интерьере" : undefined}
      className={
        mode === "modal"
          ? "flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[1240px] flex-col overflow-hidden rounded-2xl border border-border-card/60 bg-bg-card shadow-2xl md:max-h-[calc(100dvh-3rem)]"
          : "flex max-h-[96svh] w-full flex-col overflow-hidden rounded-2xl border border-border-card/60 bg-bg-card lg:max-h-none"
      }
    >
      {mode === "modal" && (
        <header className="flex items-start justify-between gap-6 border-b border-border-card/50 px-5 py-2.5 md:px-7 md:py-5">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="eyebrow">Примерка цвета</span>
            <h2
              id="color-visualizer-title"
              className="font-display text-base font-bold text-text-primary sm:text-xl md:text-2xl"
            >
              Выберите интерьер и оттенок
            </h2>
          </div>
          <button
            type="button"
            aria-label="Закрыть примерку цвета"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-card/60 text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </header>
      )}

      <div
        data-lenis-prevent
        className={`flex min-h-0 flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)] lg:overflow-visible ${
          mode === "inline" ? "lg:h-[760px] lg:flex-none" : ""
        }`}
      >
        <div className="flex shrink-0 flex-col gap-2.5 bg-bg-alt p-3 sm:gap-4 sm:p-4 md:p-6 lg:min-h-0 lg:shrink">
          <div className="flex gap-1.5 sm:flex-wrap sm:gap-2">
            {scenes.map((scene) => {
              const selected = selectedScene.id === scene.id;

              return (
                <button
                  key={scene.id}
                  type="button"
                  aria-pressed={selected}
                  title={scene.label}
                  onClick={() => setSelectedScene(scene)}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-xl border px-1 py-2 font-medium transition-colors sm:flex-none sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-3.5 sm:py-2 ${
                    selected
                      ? "border-accent bg-accent text-on-accent"
                      : "border-border-card/60 bg-bg-card text-text-secondary hover:border-accent/50 hover:text-text-primary"
                  }`}
                >
                  <scene.Icon size={18} className="shrink-0 sm:size-4" />
                  <span className="text-[10px] leading-none sm:text-[13px]">
                    {scene.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="relative isolate aspect-[16/10] max-h-[34svh] w-full shrink-0 overflow-hidden rounded-xl shadow-inner transition-colors duration-300 sm:max-h-none sm:aspect-[3/2] lg:aspect-auto lg:min-h-[260px] lg:flex-1 lg:shrink"
            style={{ backgroundColor: selectedColor.hex }}
          >
            {selectedScene.lighting && (
              <Image
                src={selectedScene.lighting}
                alt=""
                aria-hidden
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover mix-blend-multiply"
              />
            )}
            <Image
              src={selectedScene.image}
              alt={selectedScene.alt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloadState === "loading"}
              aria-label="Скачать изображение с выбранным цветом"
              title="Скачать изображение"
              className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg bg-black/45 px-2.5 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-80"
            >
              {downloadState === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : downloadState === "done" ? (
                <Check size={16} />
              ) : (
                <Download size={16} />
              )}
              <span className="hidden sm:inline">
                {downloadState === "done" ? "Готово" : "Скачать"}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-xl border border-border-card/50 bg-bg-card px-3.5 py-2.5 sm:px-4 sm:py-3.5">
            <div className="flex items-center gap-2.5 text-left sm:gap-3">
              <span
                className="h-9 w-9 shrink-0 rounded-full border border-black/10 shadow-sm sm:h-11 sm:w-11"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="leading-tight">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-accent">
                  {selectedColor.code}
                </p>
                <p className="font-semibold text-text-primary">
                  {selectedColor.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium tracking-[0.08em] text-text-secondary">
                {selectedColor.hex}
              </span>
              <CopyHexButton hex={selectedColor.hex} />
            </div>
          </div>

          <p className="hidden text-[12px] leading-[1.5] text-text-tertiary sm:block">
            Примерка является визуализацией. Цветопередача зависит от
            экрана, освещения и фактуры стены.
          </p>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto border-t border-border-card/50 p-4 md:p-6 lg:flex-none lg:border-l lg:border-t-0"
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
