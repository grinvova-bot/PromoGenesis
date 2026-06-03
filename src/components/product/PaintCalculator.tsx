"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ProductSpec } from "@/data/products";
import {
  computeArea,
  litersNeeded,
  pickPackaging,
  type Method,
  type SurfaceType,
} from "@/lib/paint-calc";

type AreaMode = "direct" | "room";

const fmt = (n: number, digits = 1) =>
  n.toLocaleString("ru-RU", { maximumFractionDigits: digits });
const rub = (n: number) =>
  n.toLocaleString("ru-RU", { maximumFractionDigits: 0 });

export default function PaintCalculator({ p }: { p: ProductSpec }) {
  const allowWalls = p.calculator?.allowWalls ?? true;
  const allowCeiling = p.calculator?.allowCeiling ?? true;
  const [areaMode, setAreaMode] = useState<AreaMode>("direct");
  const [areaInput, setAreaInput] = useState(30);
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(2.7);
  const [walls, setWalls] = useState(p.calculator?.defaultWalls ?? true);
  const [ceiling, setCeiling] = useState(p.calculator?.defaultCeiling ?? false);
  const [deduct, setDeduct] = useState(0);
  const [coats, setCoats] = useState(p.defaultCoats);
  const [surface, setSurface] = useState<SurfaceType>("smooth");
  const [method, setMethod] = useState<Method>("roller");
  const [reserve, setReserve] = useState(true);

  const area = useMemo(
    () =>
      areaMode === "direct"
        ? Math.max(0, areaInput)
        : computeArea({ length, width, height, walls, ceiling, deductM2: deduct }),
    [areaMode, areaInput, length, width, height, walls, ceiling, deduct],
  );

  const result = useMemo(
    () =>
      litersNeeded(
        {
          areaM2: area,
          coats,
          surface,
          method,
          reservePct: reserve ? 10 : 0,
        },
        p.consumption,
        p.density,
      ),
    [area, coats, surface, method, reserve, p.consumption, p.density],
  );

  const pack = useMemo(
    () => pickPackaging(result.liters, p.packaging),
    [result.liters, p.packaging],
  );

  const fieldCls =
    "w-full rounded-lg border border-border-card/60 bg-bg-base px-3.5 py-2.5 text-[15px] text-text-primary outline-none focus:border-accent/60";
  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
      active
        ? "border-accent bg-accent text-on-accent"
        : "border-border-card/60 bg-bg-card text-text-secondary hover:border-accent/50"
    }`;
  const setApplicationMethod = (next: Method) => {
    setMethod(next);
    setCoats(next === "spray" ? 1 : p.defaultCoats);
  };

  return (
    <section id="calc" className="bg-bg-alt section-y scroll-mt-24">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Калькулятор</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Сколько краски нужно
          </h2>
          <p className="max-w-xl text-[16px] text-text-secondary">
            Расчёт ориентировочный. Точный расход определяется пробным выкрасом.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
          {/* Ввод */}
          <div className="flex flex-col gap-5 rounded-2xl border border-border-card/40 bg-bg-card p-6">
            <div className="flex gap-2">
              <button type="button" aria-pressed={areaMode === "direct"} className={chip(areaMode === "direct")} onClick={() => setAreaMode("direct")}>
                Площадь, м²
              </button>
              <button type="button" aria-pressed={areaMode === "room"} className={chip(areaMode === "room")} onClick={() => setAreaMode("room")}>
                Размеры комнаты
              </button>
            </div>

            {areaMode === "direct" ? (
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] text-text-secondary">Площадь окраски, м²</span>
                <input type="number" min={0} value={areaInput} onChange={(e) => setAreaInput(+e.target.value)} className={fieldCls} />
              </label>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  {([["Длина, м", length, setLength], ["Ширина, м", width, setWidth], ["Высота, м", height, setHeight]] as const).map(
                    ([label, val, set]) => (
                      <label key={label} className="flex flex-col gap-1.5">
                        <span className="text-[13px] text-text-secondary">{label}</span>
                        <input type="number" min={0} step={0.1} value={val} onChange={(e) => set(+e.target.value)} className={fieldCls} />
                      </label>
                    ),
                  )}
                </div>
                {allowWalls && allowCeiling ? (
                  <div className="flex flex-wrap gap-2">
                    <button type="button" aria-pressed={walls} className={chip(walls)} onClick={() => setWalls((v) => !v)}>Стены</button>
                    <button type="button" aria-pressed={ceiling} className={chip(ceiling)} onClick={() => setCeiling((v) => !v)}>Потолок</button>
                  </div>
                ) : (
                  <p className="text-[13px] text-text-tertiary">
                    Расчёт по {allowCeiling ? "потолку" : "стенам"}.
                  </p>
                )}
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-text-secondary">Вычесть окна/двери, м²</span>
                  <input type="number" min={0} value={deduct} onChange={(e) => setDeduct(+e.target.value)} className={fieldCls} />
                </label>
                <p className="text-[13px] text-text-tertiary">Площадь окраски: <b className="text-text-primary">{fmt(area)} м²</b></p>
              </div>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] text-text-secondary">Слоёв: {coats}</span>
              <input type="range" min={1} max={3} value={coats} onChange={(e) => setCoats(+e.target.value)} className="accent-[var(--color-accent,#2b73b7)]" />
            </label>

            <div className="flex flex-col gap-2">
              <span className="text-[13px] text-text-secondary">Поверхность</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" aria-pressed={surface === "smooth"} className={chip(surface === "smooth")} onClick={() => setSurface("smooth")}>Гладкая (шпатлёвка)</button>
                <button type="button" aria-pressed={surface === "absorbent"} className={chip(surface === "absorbent")} onClick={() => setSurface("absorbent")}>Шероховатая/впитывающая</button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[13px] text-text-secondary">Способ нанесения</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" aria-pressed={method === "roller"} className={chip(method === "roller")} onClick={() => setApplicationMethod("roller")}>Валик</button>
                <button type="button" aria-pressed={method === "spray"} className={chip(method === "spray")} onClick={() => setApplicationMethod("spray")}>Распыление</button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-[14px] text-text-secondary">
              <input type="checkbox" checked={reserve} onChange={(e) => setReserve(e.target.checked)} className="h-4 w-4 accent-[var(--color-accent,#2b73b7)]" />
              Запас +10%
            </label>
          </div>

          {/* Результат */}
          <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-bg-card p-6">
            <div>
              <p className="text-[13px] text-text-secondary">Потребуется краски</p>
              <p className="font-display text-[34px] font-bold text-text-primary">
                {fmt(result.liters)} л
              </p>
              <p className="text-[13px] text-text-tertiary">
                ≈ {fmt(result.litersMin)}–{fmt(result.litersMax)} л · {fmt(result.kg)} кг
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-border-card/40 pt-4">
              <p className="text-[13px] text-text-secondary">Оптимальный набор</p>
              {pack.items.map((it) => (
                <div key={it.volumeL} className="flex items-center justify-between text-[15px]">
                  <span className="text-text-primary">{it.qty} × {fmt(it.volumeL)} л</span>
                  <span className="text-text-secondary">{rub(it.qty * it.priceRub)} ₽</span>
                </div>
              ))}
              <div className="mt-1 flex items-center justify-between border-t border-border-card/40 pt-2">
                <span className="font-semibold text-text-primary">Итого</span>
                <span className="font-display text-[20px] font-bold text-accent">{rub(pack.totalRub)} ₽</span>
              </div>
              <p className="text-[12px] text-text-tertiary">
                {fmt(pack.totalL)} л в наборе · остаток ≈ {fmt(pack.leftoverL)} л
              </p>
              {p.calculator?.priceNote && (
                <p className="text-[12px] text-text-tertiary">{p.calculator.priceNote}</p>
              )}
            </div>

            <a href={p.shopUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary justify-center">
              Купить в магазине
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
