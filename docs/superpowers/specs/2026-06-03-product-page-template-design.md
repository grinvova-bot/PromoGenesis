# Страница продукта (шаблон) + калькулятор краски + примерка цвета

**Дата:** 2026-06-03
**Проект:** genesis.alt-x.ru (Next.js 16, static export)
**Первый продукт:** Genesis Decker

## Цель

Детальная страница под конкретную краску, переиспользуемая под все 5 продуктов Genesis (Decker, Starke Farbe, Soft Matt, HP, GE). Контент в data-файле, вёрстка общая. На странице: ТТХ из даташита, интерактивный **калькулятор расхода** с подбором банок и ценой, **примерка цвета** (переиспользование существующего `ColorVisualizer`).

## Архитектура

### Маршрутизация
- Динамический роут `src/app/products/[slug]/page.tsx` + `generateStaticParams()` → при `output: "export"` генерирует статические `/products/decker/` и т.д.
- `trailingSlash: true` уже включён → URL вида `/products/decker/`.
- `notFound()` для неизвестного slug.
- Карточки в `src/components/Products.tsx` на главной → `<Link href="/products/{slug}/">`.

### Данные
Новый файл `src/data/products.ts` — типизированный массив. Тип:

```ts
type Packaging = { volumeL: number; priceRub: number };
type Consumption = {
  // м²/л для валика; берём диапазоны из даташита
  rollerAbsorbent: [number, number]; // шероховатая впитывающая
  rollerSmooth: [number, number];    // гладкая невпитывающая
  sprayMlPerM2: [number, number];    // распыление, мл/м²
};
type SpecRow = { label: string; value: string };
type ProductSpec = {
  slug: string;
  name: string;            // "Genesis Decker"
  tagline: string;         // "Глубокоматовая краска для потолков со сложным светом"
  category: "краска" | "грунт";
  badges: string[];        // ["Engineered in Germany","Эко","VOC <10 г/л","Color Mix"]
  heroImage: string;       // локальное фото банки
  features: string[];      // свойства (4 пункта)
  surfaces: string[];      // область применения
  specs: SpecRow[];        // ТТХ-таблица
  system: string[];        // slug'и связанных продуктов: ["hp","ge"]
  consumption: Consumption;
  defaultCoats: number;    // 2
  density: number;         // кг/л (1.5)
  dilutionMaxPct: number;  // 10
  dryTime: string;         // "1.5–2 ч между слоями, 28 дней полная прочность"
  base: string;            // "База 1 — светлые пастельные оттенки"
  packaging: Packaging[];  // [{0.9,1980},{2.5,5220},{9,16930}]
  shopUrl: string;         // pro.alt-x.ru/shop/tex-color/genesis-decker/
  datasheetUrl: string;    // PDF
  colorTryOn: boolean;     // показывать примерку (true для colorMix-красок)
};
```

#### Данные Decker (из даташита + каталога)
- **tagline:** Глубокоматовая краска для потолков со сложным светом
- **features:** Глубокоматовая оптика без бликов · Большое открытое время на подложке · Безупречно гладкая поверхность · Эталонная белизна, тиксотропность и растекаемость
- **specs:** Блеск 3% (85°) · Класс мокрого истирания 2 · Класс укрывистости 1 · Плотность 1.5 кг/л · VOC 6–9 г/л (<10) · База 1 · Высыхание 1.5–2 ч / 28 дней · Состав: акриловая дисперсия, мраморный наполнитель, диоксид титана
- **surfaces:** шпатлёвка, штукатурка, бетон, кирпич, блоки, дерево, ДВП, гипсокартон, стеклообои, обои под покраску (вкл. фактурные)
- **system:** грунт-концентрат `hp` → изолирующая грунт-краска `ge` → Decker
- **consumption:** rollerAbsorbent [6,9], rollerSmooth [10,12], sprayMlPerM2 [200,300]
- **packaging:** [{0.9, 1980}, {2.5, 5220}, {9, 16930}]
- **shopUrl:** https://pro.alt-x.ru/shop/tex-color/genesis-decker/
- **datasheetUrl:** https://www.tex-color.pro/images/docs/Genesis%20Decker.pdf

### Калькулятор — логика (чистый модуль `src/lib/paint-calc.ts`)

Отделён от UI, без React → тестируется юнит-тестами.

**Входные параметры:**
```ts
type CalcInput = {
  areaM2: number;          // итоговая площадь (UI считает её из режима)
  coats: number;           // слоёв (default 2)
  surface: "smooth" | "absorbent";
  method: "roller" | "spray";
  reservePct: number;      // запас, default 10
};
```

**Площадь** UI вычисляет до вызова модуля:
- Режим «м²»: пользователь вводит число напрямую.
- Режим «комната»: длина×ширина×высота + чекбоксы «стены»/«потолок».
  - стены = 2×(Д+Ш)×В; потолок = Д×Ш; минус проёмы (окна/двери, опц. поле «вычесть м²»).

**Расчёт литров:**
```
coveragePerL = surface=="smooth" ? rollerSmooth : rollerAbsorbent  // [min,max] м²/л
// валик: берём НИЖНИЙ край покрытия (консервативно, с запасом по краске)
litersRoller = area * coats / coverageMin
// распыление: мл/м² ВЕРХНИЙ край
litersSpray  = area * coats * sprayMax / 1000
liters = method=="roller" ? litersRoller : litersSpray
litersWithReserve = liters * (1 + reservePct/100)
kg = litersWithReserve * density
```
Показываем и точечное значение, и диапазон (min/max покрытия) как «≈ X–Y л».

**Подбор банок (минимизация цены):**
- Перебор комбинаций фасовок, покрывающих `litersWithReserve`, выбор минимальной суммарной цены (фасовок ≤3–4, перебор тривиален).
- Возврат: `{ items: [{volumeL, qty, priceRub}], totalRub, totalL, leftoverL }`.
- Крупная фасовка дешевле по ₽/л → алгоритм её предпочтёт автоматически.

**Чистые функции:** `computeArea(roomInput)`, `litersNeeded(input, spec)`, `pickPackaging(liters, packaging)`. Все — pure, экспортируются.

## Компоненты (UI)

Каталог `src/components/product/`:
- `ProductHero.tsx` — фото банки + название + tagline + бейджи + кнопки «Рассчитать» (scroll), «Купить» (shop), «Даташит PDF».
- `FeatureList.tsx` — свойства.
- `SpecsTable.tsx` — ТТХ (label/value строки).
- `SurfaceList.tsx` — область применения.
- `ApplicationSystem.tsx` — 3 шага HP→GE→Decker с перелинковкой.
- `PaintCalculator.tsx` — `"use client"`, форма + результат, дергает `paint-calc.ts`.
- Рефактор `ColorVisualizer.tsx` → принимает пропсы: `mode?: "modal" | "inline"`, `colorFilter?: (c) => boolean` (для Decker База 1 — только светлые оттенки по luminance). Существующее модальное поведение сохраняется (дефолт).

Сборка страницы — `products/[slug]/page.tsx`: читает `ProductSpec` по slug, рендерит секции по порядку. Секции, зависящие от данных (`colorTryOn`, `system`), условны.

## Связь с магазином
- genesis.alt-x.ru — маркетинговый лендинг; покупка — на pro.alt-x.ru (WooCommerce).
- Кнопки «Купить» и результат калькулятора ведут на `shopUrl` (внешняя ссылка, `target="_blank" rel="noopener"`).

## Ассеты
- Скачать реальное фото банки Decker с `pro.alt-x.ru/.../decker-optimized.png` → `public/products-detail/decker.png` (оптимизировать в JPG/WebP).

## Тестирование
- `src/lib/paint-calc.test.ts` (vitest, +1 dev-dep): покрытие `litersNeeded` (валик гладкая/впитывающая, распыление, слои, запас), `pickPackaging` (минимальная цена, остаток), `computeArea` (стены/потолок/вычет проёмов).
- Визуальная проверка через `npm run build` + curl на проде после деплоя.

## Деплой
Тот же пайплайн: `npm run build` → `rsync --delete out/` на сервер (см. memory `genesis-deploy`). Статика, новые роуты попадают автоматически.

## Вне scope (YAGNI)
- Реальная отправка лида (форма по-прежнему console — отдельная задача).
- Страницы остальных 4 продуктов (только Decker; шаблон готов под них).
- Корзина/checkout на genesis (покупка делегируется магазину).
- Подтягивание цен по API в рантайме (цены статичны в data, обновляются вручную).
