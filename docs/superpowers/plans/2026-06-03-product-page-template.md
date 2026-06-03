# Страница продукта + калькулятор краски — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Переиспользуемая страница продукта `/products/[slug]/` с ТТХ, калькулятором расхода (подбор банок + цена) и инлайн-примеркой цвета; заполнить данными Genesis Decker.

**Architecture:** Контент красок в `src/data/products.ts`. Чистая математика калькулятора в `src/lib/paint-calc.ts` (юнит-тесты на vitest). Динамический роут со `generateStaticParams` под `output: "export"`. UI-секции в `src/components/product/`. Существующий `ColorVisualizer` рефакторится на пропсы для инлайн-режима.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind v4, framer-motion, lucide-react, vitest (новый).

Спека: `docs/superpowers/specs/2026-06-03-product-page-template-design.md`.

---

## Файловая структура

- Create `src/lib/paint-calc.ts` — чистые функции расчёта (без React).
- Create `src/lib/paint-calc.test.ts` — юнит-тесты.
- Create `src/data/products.ts` — типы + массив `products` (Decker).
- Create `src/lib/colors.ts` — `isLightColor(hex)` для фильтра База 1.
- Create `src/app/products/[slug]/page.tsx` — роут + `generateStaticParams`.
- Create `src/components/product/ProductHero.tsx`
- Create `src/components/product/SpecsTable.tsx`
- Create `src/components/product/ApplicationSystem.tsx`
- Create `src/components/product/PaintCalculator.tsx` (client)
- Modify `src/components/ColorVisualizer.tsx` — пропсы `mode`, `colorFilter`.
- Modify `src/components/Products.tsx` — карточки → `<Link>` на страницу продукта.
- Create `public/products-detail/decker.jpg` — фото банки.
- Modify `package.json`, Create `vitest.config.ts` — тест-раннер.

---

## Task 1: Настроить vitest

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Установить vitest**

Run:
```bash
npm install -D vitest
```
Expected: добавляется `vitest` в devDependencies, без ошибок.

- [ ] **Step 2: Создать конфиг**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Добавить скрипт test**

Modify `package.json` — в `"scripts"` добавить строку после `"lint": "eslint"`:
```json
    "lint": "eslint",
    "test": "vitest run"
```

- [ ] **Step 4: Проверить, что раннер стартует**

Run: `npm test`
Expected: `No test files found` (тестов ещё нет) — раннер работает, exit 0 либо «no tests». Это нормально.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: добавить vitest для юнит-тестов калькулятора"
```

---

## Task 2: paint-calc — площадь, литры, подбор банок (TDD)

**Files:**
- Create: `src/lib/paint-calc.ts`
- Test: `src/lib/paint-calc.test.ts`

- [ ] **Step 1: Написать падающие тесты**

Create `src/lib/paint-calc.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  computeArea,
  litersNeeded,
  pickPackaging,
  type Consumption,
} from "./paint-calc";

const DECKER: Consumption = {
  rollerAbsorbent: [6, 9],
  rollerSmooth: [10, 12],
  sprayMlPerM2: [200, 300],
};

describe("computeArea", () => {
  it("считает стены: 2*(Д+Ш)*В", () => {
    expect(
      computeArea({ length: 4, width: 3, height: 2.5, walls: true, ceiling: false }),
    ).toBe(35); // 2*(7)*2.5
  });
  it("считает потолок: Д*Ш", () => {
    expect(
      computeArea({ length: 4, width: 3, height: 2.5, walls: false, ceiling: true }),
    ).toBe(12);
  });
  it("вычитает проёмы и не уходит ниже 0", () => {
    expect(
      computeArea({ length: 4, width: 3, height: 2.5, walls: true, ceiling: false, deductM2: 40 }),
    ).toBe(0);
  });
});

describe("litersNeeded", () => {
  it("валик гладкая: нижний край покрытия даёт больше литров", () => {
    // area 60, 2 слоя, smooth [10,12], запас 0
    const r = litersNeeded(
      { areaM2: 60, coats: 2, surface: "smooth", method: "roller", reservePct: 0 },
      DECKER,
      1.5,
    );
    expect(r.litersMin).toBeCloseTo(10); // 120/12
    expect(r.litersMax).toBeCloseTo(12); // 120/10
    expect(r.liters).toBeCloseTo(12);    // консервативно = max
    expect(r.kg).toBeCloseTo(18);        // 12*1.5
  });
  it("валик впитывающая расходует больше", () => {
    const r = litersNeeded(
      { areaM2: 60, coats: 2, surface: "absorbent", method: "roller", reservePct: 0 },
      DECKER,
      1.5,
    );
    expect(r.liters).toBeCloseTo(20); // 120/6
  });
  it("распыление по мл/м², верхний край", () => {
    const r = litersNeeded(
      { areaM2: 10, coats: 1, surface: "smooth", method: "spray", reservePct: 0 },
      DECKER,
      1.5,
    );
    expect(r.liters).toBeCloseTo(3); // 10*1*300/1000
  });
  it("применяет запас", () => {
    const r = litersNeeded(
      { areaM2: 60, coats: 2, surface: "smooth", method: "roller", reservePct: 10 },
      DECKER,
      1.5,
    );
    expect(r.liters).toBeCloseTo(13.2); // 12*1.1
  });
});

describe("pickPackaging", () => {
  const PACK = [
    { volumeL: 0.9, priceRub: 1980 },
    { volumeL: 2.5, priceRub: 5220 },
    { volumeL: 9, priceRub: 16930 },
  ];
  it("подбирает покрытие нужного объёма", () => {
    const p = pickPackaging(10, PACK);
    expect(p.totalL).toBeGreaterThanOrEqual(10);
  });
  it("минимизирует цену (крупная фасовка выгоднее)", () => {
    const p = pickPackaging(9, PACK);
    // 1×9л (16930) дешевле, чем 10×0.9л (19800)
    expect(p.totalRub).toBe(16930);
    expect(p.items.find((i) => i.volumeL === 9)?.qty).toBe(1);
  });
  it("возвращает остаток", () => {
    const p = pickPackaging(0.5, PACK);
    expect(p.totalL).toBeCloseTo(0.9);
    expect(p.leftoverL).toBeCloseTo(0.4);
  });
});
```

- [ ] **Step 2: Запустить — убедиться, что падает**

Run: `npm test`
Expected: FAIL — `Cannot find module "./paint-calc"` / функции не определены.

- [ ] **Step 3: Реализовать модуль**

Create `src/lib/paint-calc.ts`:
```ts
export type SurfaceType = "smooth" | "absorbent";
export type Method = "roller" | "spray";

export type Consumption = {
  /** м²/л валиком по шероховатой впитывающей */
  rollerAbsorbent: [number, number];
  /** м²/л валиком по гладкой невпитывающей */
  rollerSmooth: [number, number];
  /** мл/м² при распылении */
  sprayMlPerM2: [number, number];
};

export type RoomInput = {
  length: number;
  width: number;
  height: number;
  walls: boolean;
  ceiling: boolean;
  deductM2?: number;
};

export function computeArea(r: RoomInput): number {
  const walls = r.walls ? 2 * (r.length + r.width) * r.height : 0;
  const ceiling = r.ceiling ? r.length * r.width : 0;
  return Math.max(0, walls + ceiling - (r.deductM2 ?? 0));
}

export type LitersInput = {
  areaM2: number;
  coats: number;
  surface: SurfaceType;
  method: Method;
  reservePct: number;
};

export type LitersResult = {
  liters: number; // консервативная рекомендация
  litersMin: number;
  litersMax: number;
  kg: number;
};

export function litersNeeded(
  input: LitersInput,
  c: Consumption,
  density: number,
): LitersResult {
  const { areaM2, coats, surface, method, reservePct } = input;
  const reserve = 1 + reservePct / 100;
  let litersMin: number;
  let litersMax: number;
  let liters: number;

  if (method === "spray") {
    const [mlMin, mlMax] = c.sprayMlPerM2;
    litersMin = (areaM2 * coats * mlMin) / 1000;
    litersMax = (areaM2 * coats * mlMax) / 1000;
    liters = litersMax; // верхний край мл/м² = больше краски
  } else {
    const [covMin, covMax] =
      surface === "smooth" ? c.rollerSmooth : c.rollerAbsorbent;
    litersMin = (areaM2 * coats) / covMax; // больше покрытие → меньше литров
    litersMax = (areaM2 * coats) / covMin;
    liters = litersMax; // нижний край покрытия → больше литров (консервативно)
  }

  liters *= reserve;
  litersMin *= reserve;
  litersMax *= reserve;
  return { liters, litersMin, litersMax, kg: liters * density };
}

export type Packaging = { volumeL: number; priceRub: number };
export type PackItem = { volumeL: number; qty: number; priceRub: number };
export type PackPick = {
  items: PackItem[];
  totalRub: number;
  totalL: number;
  leftoverL: number;
};

/**
 * Подбор фасовок минимальной цены, покрывающих не менее `liters`.
 * DP по децилитрам (unbounded coin problem с минимизацией цены).
 */
export function pickPackaging(liters: number, packaging: Packaging[]): PackPick {
  const sizes = packaging.map((p) => ({
    dl: Math.round(p.volumeL * 10),
    price: p.priceRub,
    volumeL: p.volumeL,
  }));
  const target = Math.max(1, Math.ceil(liters * 10));
  const maxDl = target + Math.max(...sizes.map((s) => s.dl));

  const cost = new Array<number>(maxDl + 1).fill(Infinity);
  const choice = new Array<number>(maxDl + 1).fill(-1);
  cost[0] = 0;
  for (let dl = 1; dl <= maxDl; dl++) {
    for (let i = 0; i < sizes.length; i++) {
      const prev = Math.max(0, dl - sizes[i].dl);
      const candidate = cost[prev] + sizes[i].price;
      if (candidate < cost[dl]) {
        cost[dl] = candidate;
        choice[dl] = i;
      }
    }
  }

  // минимальная цена среди покрытий >= target
  let best = target;
  for (let dl = target; dl <= maxDl; dl++) {
    if (cost[dl] < cost[best]) best = dl;
  }

  const counts = new Array<number>(sizes.length).fill(0);
  let dl = best;
  while (dl > 0 && choice[dl] >= 0) {
    const i = choice[dl];
    counts[i]++;
    dl = Math.max(0, dl - sizes[i].dl);
  }

  const items: PackItem[] = sizes
    .map((s, i) => ({ volumeL: s.volumeL, qty: counts[i], priceRub: s.price }))
    .filter((it) => it.qty > 0)
    .sort((a, b) => b.volumeL - a.volumeL);

  const totalRub = items.reduce((sum, it) => sum + it.qty * it.priceRub, 0);
  const totalL = items.reduce((sum, it) => sum + it.qty * it.volumeL, 0);
  return {
    items,
    totalRub,
    totalL,
    leftoverL: Math.max(0, totalL - liters),
  };
}
```

- [ ] **Step 4: Запустить тесты — зелёные**

Run: `npm test`
Expected: PASS — все тесты `computeArea`, `litersNeeded`, `pickPackaging`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/paint-calc.ts src/lib/paint-calc.test.ts
git commit -m "feat: модуль расчёта краски (площадь, литры, подбор банок)"
```

---

## Task 3: Фильтр светлых цветов (TDD)

**Files:**
- Create: `src/lib/colors.ts`
- Test: `src/lib/colors.test.ts`

- [ ] **Step 1: Написать падающий тест**

Create `src/lib/colors.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { isLightColor } from "./colors";

describe("isLightColor", () => {
  it("светлые пастельные → true", () => {
    expect(isLightColor("#DADBD8")).toBe(true); // TN100
    expect(isLightColor("#F5EFE1")).toBe(true); // TN109
  });
  it("тёмные/насыщенные → false", () => {
    expect(isLightColor("#517C78")).toBe(false); // TG301
    expect(isLightColor("#3D5D70")).toBe(false); // TB201
  });
});
```

- [ ] **Step 2: Запустить — падает**

Run: `npm test`
Expected: FAIL — модуль `./colors` не найден.

- [ ] **Step 3: Реализовать**

Create `src/lib/colors.ts`:
```ts
/** Относительная яркость (0..1) по sRGB-аппроксимации. */
function luminance(hex: string): number {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** База 1: только светлые пастельные оттенки. */
export function isLightColor(hex: string): boolean {
  return luminance(hex) > 0.62;
}
```

- [ ] **Step 4: Запустить — зелёные**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/colors.ts src/lib/colors.test.ts
git commit -m "feat: фильтр светлых оттенков для базы 1"
```

---

## Task 4: Данные продукта (Decker)

**Files:**
- Create: `src/data/products.ts`

- [ ] **Step 1: Создать data-файл**

Create `src/data/products.ts`:
```ts
import type { Consumption, Packaging } from "@/lib/paint-calc";

export type SpecRow = { label: string; value: string };

export type ProductSpec = {
  slug: string;
  name: string;
  tagline: string;
  category: "краска" | "грунт";
  badges: string[];
  heroImage: string;
  imageWidth: number;
  imageHeight: number;
  features: string[];
  surfaces: string[];
  specs: SpecRow[];
  /** slug'и связанных продуктов системы нанесения */
  system: { slug: string; name: string; role: string }[];
  consumption: Consumption;
  defaultCoats: number;
  density: number;
  dilutionMaxPct: number;
  dryTime: string;
  base: string;
  packaging: Packaging[];
  shopUrl: string;
  datasheetUrl: string;
  colorTryOn: boolean;
};

export const products: ProductSpec[] = [
  {
    slug: "decker",
    name: "Genesis Decker",
    tagline: "Глубокоматовая краска для потолков со сложным светом",
    category: "краска",
    badges: ["Engineered in Germany", "Экологично", "VOC <10 г/л", "Color Mix"],
    heroImage: "/products-detail/decker.jpg",
    imageWidth: 800,
    imageHeight: 800,
    features: [
      "Глубокоматовая оптика без бликов",
      "Большое открытое время на подложке",
      "Образует безупречную гладкую поверхность",
      "Эталонная белизна, тиксотропность и растекаемость",
    ],
    surfaces: [
      "Шпатлёвка",
      "Штукатурка",
      "Бетон",
      "Кирпич",
      "Блоки",
      "Дерево, ДВП",
      "Гипсокартон",
      "Стеклообои",
      "Обои под покраску (вкл. фактурные)",
    ],
    specs: [
      { label: "Степень блеска", value: "Глубокоматовая, 3% (85°)" },
      { label: "Класс мокрого истирания", value: "2 класс (DIN EN 13300)" },
      { label: "Класс укрывистости", value: "1 класс (при ≥100 мкм)" },
      { label: "Плотность", value: "1,5 кг/л" },
      { label: "VOC (ЛОС)", value: "6–9 г/л (<10)" },
      { label: "База", value: "База 1 (светлые пастельные)" },
      { label: "Высыхание между слоями", value: "1,5–2 ч" },
      { label: "Полная прочность", value: "28 дней" },
      {
        label: "Состав",
        value: "Акриловая дисперсия, мраморный наполнитель, диоксид титана",
      },
    ],
    system: [
      { slug: "hp", name: "Genesis HP", role: "Грунт-концентрат" },
      { slug: "ge", name: "Genesis GE", role: "Изолирующая грунт-краска" },
      { slug: "decker", name: "Genesis Decker", role: "Финишная краска" },
    ],
    consumption: {
      rollerAbsorbent: [6, 9],
      rollerSmooth: [10, 12],
      sprayMlPerM2: [200, 300],
    },
    defaultCoats: 2,
    density: 1.5,
    dilutionMaxPct: 10,
    dryTime: "1,5–2 ч между слоями · 28 дней до полной прочности",
    base: "База 1 — колеровка в светлые пастельные оттенки по системе Color Mix",
    packaging: [
      { volumeL: 0.9, priceRub: 1980 },
      { volumeL: 2.5, priceRub: 5220 },
      { volumeL: 9, priceRub: 16930 },
    ],
    shopUrl: "https://pro.alt-x.ru/shop/tex-color/genesis-decker/",
    datasheetUrl: "https://www.tex-color.pro/images/docs/Genesis%20Decker.pdf",
    colorTryOn: true,
  },
];

export function getProduct(slug: string): ProductSpec | undefined {
  return products.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Проверить типы**

Run: `npx tsc --noEmit`
Expected: без ошибок по `src/data/products.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/products.ts
git commit -m "feat: данные продукта Genesis Decker"
```

---

## Task 5: Фото банки Decker

**Files:**
- Create: `public/products-detail/decker.jpg`

- [ ] **Step 1: Скачать и оптимизировать**

Run:
```bash
mkdir -p public/products-detail
curl -sS -L -A "Mozilla/5.0" "https://pro.alt-x.ru/wp-content/uploads/2024/10/decker-optimized.png" -o /tmp/decker-src.png
sips -s format jpeg -s formatOptions 85 --resampleWidth 800 /tmp/decker-src.png --out public/products-detail/decker.jpg
ls -la public/products-detail/decker.jpg
```
Expected: JPG ~50–150 КБ создан.

- [ ] **Step 2: Commit**

```bash
git add public/products-detail/decker.jpg
git commit -m "assets: фото банки Decker для страницы продукта"
```

---

## Task 6: Презентационные секции (Hero, ТТХ, система)

**Files:**
- Create: `src/components/product/ProductHero.tsx`
- Create: `src/components/product/SpecsTable.tsx`
- Create: `src/components/product/ApplicationSystem.tsx`

- [ ] **Step 1: ProductHero**

Create `src/components/product/ProductHero.tsx`:
```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function ProductHero({ p }: { p: ProductSpec }) {
  return (
    <section className="bg-bg-base section-y">
      <div className="page-container grid items-center gap-12 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl p-8 [background:radial-gradient(circle_at_center,var(--product-image-center),var(--product-image-edge))]">
          <Image
            src={p.heroImage}
            alt={p.name}
            width={p.imageWidth}
            height={p.imageHeight}
            priority
            className="h-auto max-w-[360px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
        <div className="flex flex-col gap-6">
          <span className="eyebrow">{p.category.toUpperCase()}</span>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-text-primary">
            {p.name}
          </h1>
          <p className="text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-text-secondary">
            {p.tagline}
          </p>
          <ul className="flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 text-[12px] font-semibold text-text-secondary"
              >
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link href="#calc" className="btn btn-primary">
              <Calculator size={17} />
              Рассчитать краску
            </Link>
            <a
              href={p.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Купить
              <ArrowRight size={16} />
            </a>
            <a
              href={p.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <FileText size={16} />
              Даташит PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: SpecsTable**

Create `src/components/product/SpecsTable.tsx`:
```tsx
import type { ProductSpec } from "@/data/products";

export default function SpecsTable({ p }: { p: ProductSpec }) {
  return (
    <section className="bg-bg-alt section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Характеристики</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Технические данные
          </h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <dl className="divide-y divide-border-card/40">
            {p.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-6 py-3.5"
              >
                <dt className="text-[14px] text-text-secondary">{s.label}</dt>
                <dd className="text-right text-[14px] font-semibold text-text-primary">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-3 font-display text-[17px] font-semibold text-text-primary">
                Свойства
              </h3>
              <ul className="flex flex-col gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-[15px] leading-[1.5] text-text-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-display text-[17px] font-semibold text-text-primary">
                Область применения
              </h3>
              <ul className="flex flex-wrap gap-2">
                {p.surfaces.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border-card/50 bg-bg-card px-3 py-1.5 text-[13px] text-text-secondary"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: ApplicationSystem**

Create `src/components/product/ApplicationSystem.tsx`:
```tsx
import { ArrowRight } from "lucide-react";
import type { ProductSpec } from "@/data/products";

export default function ApplicationSystem({ p }: { p: ProductSpec }) {
  return (
    <section className="bg-bg-base section-y">
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Система нанесения</span>
          <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
            Системный подход
          </h2>
          <p className="max-w-xl text-[16px] text-text-secondary">
            Для заявленных свойств соблюдайте порядок нанесения слоёв.
          </p>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {p.system.map((step, i) => (
            <li
              key={step.slug + i}
              className="relative flex flex-col gap-2 rounded-2xl border border-border-card/40 bg-bg-card p-6"
            >
              <span className="font-display text-[28px] font-bold text-accent/30">
                0{i + 1}
              </span>
              <span className="text-[12px] font-semibold tracking-[0.1em] text-text-secondary">
                {step.role}
              </span>
              <span className="font-display text-[18px] font-semibold text-text-primary">
                {step.name}
              </span>
              {i < p.system.length - 1 && (
                <ArrowRight
                  size={18}
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent/40 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Проверить типы**

Run: `npx tsc --noEmit`
Expected: без ошибок.

- [ ] **Step 5: Commit**

```bash
git add src/components/product/ProductHero.tsx src/components/product/SpecsTable.tsx src/components/product/ApplicationSystem.tsx
git commit -m "feat: секции страницы продукта (hero, ТТХ, система)"
```

---

## Task 7: Калькулятор краски (client-компонент)

**Files:**
- Create: `src/components/product/PaintCalculator.tsx`

- [ ] **Step 1: Реализовать калькулятор**

Create `src/components/product/PaintCalculator.tsx`:
```tsx
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
  const [areaMode, setAreaMode] = useState<AreaMode>("direct");
  const [areaInput, setAreaInput] = useState(30);
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(2.7);
  const [walls, setWalls] = useState(true);
  const [ceiling, setCeiling] = useState(false);
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
        ? "border-accent bg-accent text-bg-deep"
        : "border-border-card/60 bg-bg-card text-text-secondary hover:border-accent/50"
    }`;

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
              <button type="button" className={chip(areaMode === "direct")} onClick={() => setAreaMode("direct")}>
                Площадь, м²
              </button>
              <button type="button" className={chip(areaMode === "room")} onClick={() => setAreaMode("room")}>
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
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={chip(walls)} onClick={() => setWalls((v) => !v)}>Стены</button>
                  <button type="button" className={chip(ceiling)} onClick={() => setCeiling((v) => !v)}>Потолок</button>
                </div>
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
                <button type="button" className={chip(surface === "smooth")} onClick={() => setSurface("smooth")}>Гладкая (шпатлёвка)</button>
                <button type="button" className={chip(surface === "absorbent")} onClick={() => setSurface("absorbent")}>Шероховатая/впитывающая</button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[13px] text-text-secondary">Способ нанесения</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={chip(method === "roller")} onClick={() => setMethod("roller")}>Валик</button>
                <button type="button" className={chip(method === "spray")} onClick={() => setMethod("spray")}>Распыление</button>
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
```

- [ ] **Step 2: Проверить типы**

Run: `npx tsc --noEmit`
Expected: без ошибок.

- [ ] **Step 3: Commit**

```bash
git add src/components/product/PaintCalculator.tsx
git commit -m "feat: интерактивный калькулятор краски с подбором банок"
```

---

## Task 8: Рефактор ColorVisualizer на пропсы (инлайн-режим)

**Files:**
- Modify: `src/components/ColorVisualizer.tsx`

Цель: поддержать инлайн-встраивание и фильтр цветов, не сломав текущее модальное поведение на главной (`<ColorVisualizer />` без пропсов = модалка, вся палитра).

- [ ] **Step 1: Добавить пропсы и фильтр**

Modify `src/components/ColorVisualizer.tsx` — заменить сигнатуру и подготовку данных.

Заменить строки импорта и начало компонента:
```tsx
"use client";

import Image from "next/image";
import { Paintbrush, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { paletteColors, type PaletteColor } from "@/data/palette";

const scenes = [
  { id: "living", label: "Гостиная", image: "/visualizer/living-foreground.webp", alt: "Гостиная с прозрачным фоном стены" },
  { id: "bedroom", label: "Спальня", image: "/visualizer/bedroom-foreground.webp", alt: "Спальня с прозрачным фоном стены" },
  { id: "office", label: "Кабинет", image: "/visualizer/office-foreground.webp", alt: "Кабинет с прозрачным фоном стены" },
] as const;

type Props = {
  mode?: "modal" | "inline";
  colorFilter?: (color: PaletteColor) => boolean;
};

export default function ColorVisualizer({ mode = "modal", colorFilter }: Props) {
  const colors = useMemo(
    () => (colorFilter ? paletteColors.filter(colorFilter) : paletteColors),
    [colorFilter],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedScene, setSelectedScene] = useState<(typeof scenes)[number]>(scenes[0]);
```

> Примечание: удалить старую константу `INITIAL_COLOR` и старый `useState(INITIAL_COLOR)` — начальный цвет теперь `colors[0]`. Также экспортировать `PaletteColor` из `palette.ts` (уже экспортирован как тип).

- [ ] **Step 2: Заменить `paletteColors.map` на `colors.map`**

В блоке списка палитры заменить `{paletteColors.map((color) => {` на `{colors.map((color) => {`.

- [ ] **Step 3: Вынести панель и развести modal/inline**

Заменить `return (...)` так, чтобы общая панель рендерилась функцией, а обёртка зависела от `mode`.

Перед `return` добавить переменную с телом панели (header + grid). Извлечь существующую разметку `<section role="dialog">...</section>` в константу `panel`, затем:

```tsx
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
      {/* header */}
      <header className="flex items-start justify-between gap-6 border-b border-border-card/50 px-5 py-4 md:px-7 md:py-5">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Примерка цвета</span>
          <h2 id="color-visualizer-title" className="font-display text-xl font-bold text-text-primary md:text-2xl">
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

      {/* существующий <div className="grid min-h-0 flex-1 ..."> ... </div> оставить как есть,
          заменив внутри список палитры на colors.map (Step 2) */}
    </section>
  );

  if (mode === "inline") {
    return panel;
  }

  return (
    <>
      <button type="button" className="btn btn-ghost" onClick={() => setIsOpen(true)}>
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
```

> В инлайн-режиме `useEffect` для блокировки скролла/Escape не нужен — он завязан на `isOpen` и в inline просто не сработает (isOpen остаётся false). Оставить как есть.

- [ ] **Step 4: Проверка — главная не сломана + типы**

Run: `npx tsc --noEmit && npm run build`
Expected: сборка успешна; `ColorVisualizer` на главной по-прежнему модалка.

- [ ] **Step 5: Commit**

```bash
git add src/components/ColorVisualizer.tsx
git commit -m "refactor: ColorVisualizer поддерживает inline-режим и фильтр цветов"
```

---

## Task 9: Роут страницы продукта + примерка цвета инлайн

**Files:**
- Create: `src/app/products/[slug]/page.tsx`

- [ ] **Step 1: Создать страницу**

Create `src/app/products/[slug]/page.tsx`:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { isLightColor } from "@/lib/colors";
import ProductHero from "@/components/product/ProductHero";
import SpecsTable from "@/components/product/SpecsTable";
import ApplicationSystem from "@/components/product/ApplicationSystem";
import PaintCalculator from "@/components/product/PaintCalculator";
import ColorVisualizer from "@/components/ColorVisualizer";
import ContactCTA from "@/components/ContactCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.tagline,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  return (
    <>
      <Navigation />
      <main>
        <ProductHero p={p} />
        <SpecsTable p={p} />
        <ApplicationSystem p={p} />
        <PaintCalculator p={p} />
        {p.colorTryOn && (
          <section className="bg-bg-base section-y">
            <div className="page-container flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="eyebrow">Примерка цвета</span>
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold text-text-primary">
                  Подберите оттенок
                </h2>
                <p className="max-w-xl text-[16px] text-text-secondary">
                  {p.base}
                </p>
              </div>
              <ColorVisualizer mode="inline" colorFilter={(c) => isLightColor(c.hex)} />
            </div>
          </section>
        )}
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
```

> Если Next 16 типизирует `params` как `Promise` (async params): при ошибке типов в `npx tsc --noEmit` поменять сигнатуры на `async` и `const { slug } = await params;`. Проверить в Step 2 и применить при необходимости (см. `node_modules/next/dist/docs` про dynamic APIs).

- [ ] **Step 2: Проверить типы и сборку**

Run: `npx tsc --noEmit && npm run build`
Expected: сборка успешна; в выводе виден прероут `/products/decker`. Если ошибка типов `params` — сделать функции `async` и `await params`, пересобрать.

- [ ] **Step 3: Проверить статический вывод**

Run: `ls out/products/decker/`
Expected: присутствует `index.html`.

- [ ] **Step 4: Commit**

```bash
git add src/app/products/[slug]/page.tsx
git commit -m "feat: роут страницы продукта /products/[slug] с примеркой цвета"
```

---

## Task 10: Ссылки с карточек каталога на страницы продуктов

**Files:**
- Modify: `src/components/Products.tsx`

- [ ] **Step 1: Добавить slug в данные карточек**

Modify `src/components/Products.tsx` — в тип `Product` добавить поле и проставить slug у всех 5 товаров.

В тип:
```tsx
type Product = {
  slug: string;
  badge: string;
  paint: boolean;
  name: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  specs: Spec[];
};
```

Проставить slug у каждого товара (по порядку в массиве): `decker`, `starke-farbe`, `soft-matt`, `hp`, `ge`. Например первому:
```tsx
  {
    slug: "decker",
    badge: "КРАСКА",
    paint: true,
    name: "Genesis Decker",
```

- [ ] **Step 2: Превратить кнопку «Купить» карточки в ссылку «Подробнее»**

Modify `src/components/Products.tsx` — добавить импорт `Link`:
```tsx
import Link from "next/link";
```
Заменить блок `<a href={BUY_URL} ...>Купить ...</a>` внутри `ProductCard` на:
```tsx
          <Link
            href={`/products/${p.slug}/`}
            className="group/btn mt-1 flex items-center justify-between rounded-lg border border-accent/20 px-4 py-3 text-[14px] font-semibold text-text-primary transition-colors hover:border-accent/45 hover:bg-accent/10"
          >
            Подробнее
            <ArrowRight
              size={16}
              className="text-accent transition-transform duration-200 group-hover/btn:translate-x-1"
            />
          </Link>
```

> Константу `BUY_URL` можно удалить, если больше не используется (проверить отсутствие других ссылок на неё в файле).

- [ ] **Step 3: Проверить типы и сборку**

Run: `npx tsc --noEmit && npm run build`
Expected: успешно.

- [ ] **Step 4: Commit**

```bash
git add src/components/Products.tsx
git commit -m "feat: карточки каталога ведут на страницы продуктов"
```

---

## Task 11: Финальная проверка и деплой

**Files:** —

- [ ] **Step 1: Полный прогон тестов и сборки**

Run: `npm test && npm run build`
Expected: тесты зелёные; сборка успешна; прероут `/products/decker` и `/` присутствуют.

- [ ] **Step 2: Деплой**

Run:
```bash
SSHPASS='c|_=HoXU@UW3' rsync -az --delete \
  -e "sshpass -e ssh -o StrictHostKeyChecking=no" \
  out/ root@80.78.255.96:/var/www/www-root/data/www/genesis.alt-x.ru/
SSHPASS='c|_=HoXU@UW3' sshpass -e ssh -o StrictHostKeyChecking=no root@80.78.255.96 \
  'chown -R www-root:www-root /var/www/www-root/data/www/genesis.alt-x.ru'
```
Expected: rsync EXIT=0.

- [ ] **Step 3: Проверить прод**

Run:
```bash
curl -sS -o /dev/null -w "%{http_code}\n" --max-time 20 "https://genesis.alt-x.ru/products/decker/"
curl -sS --max-time 20 "https://genesis.alt-x.ru/products/decker/" | grep -o "<title>[^<]*</title>"
```
Expected: `200`; title содержит «Genesis Decker».

- [ ] **Step 4: Финальный commit (если остались изменения)**

```bash
git add -A
git commit -m "chore: деплой страницы продукта Decker" || echo "нечего коммитить"
```

---

## Self-Review

**Spec coverage:**
- Маршрут `/products/[slug]` + generateStaticParams → Task 9 ✓
- Данные в `products.ts` (Decker: ТТХ, фасовки, цены) → Task 4 ✓
- Калькулятор (оба режима площади, слои, поверхность, способ, запас, подбор банок по цене) → Task 2 (логика) + Task 7 (UI) ✓
- Примерка цвета инлайн + фильтр База 1 → Task 3 + Task 8 + Task 9 ✓
- Секции hero/свойства/ТТХ/применение/система → Task 6 ✓
- Связь с магазином (кнопки «Купить» → shopUrl) → Task 6, 7 ✓
- Фото банки локально → Task 5 ✓
- Тесты на калькулятор → Task 1, 2, 3 ✓
- Карточки каталога → страницы → Task 10 ✓
- Деплой → Task 11 ✓

**Placeholder scan:** код приведён полностью в каждом шаге; единственные условные ветки (async `params`, удаление `BUY_URL`) снабжены явной инструкцией проверки. OK.

**Type consistency:** `Consumption`, `Packaging`, `ProductSpec`, `PaletteColor` определены до использования; `litersNeeded(input, consumption, density)`, `pickPackaging(liters, packaging)`, `computeArea(roomInput)`, `isLightColor(hex)` — сигнатуры совпадают между задачами и тестами. OK.
