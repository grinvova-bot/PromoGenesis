import type { Consumption, Packaging } from "@/lib/paint-calc";

export type SpecRow = { label: string; value: string };
export type HeroStat = { value: string; label: string };
export type ApplicationMethod = { title: string; image: string; steps: string[] };
export type PrimingStep = { title: string; detail: string };

/** Богатый контент карточки продукта (разобранный даташит) */
export type ProductContent = {
  /** «Глубокий мат» — ключевая фишка, с иллюстрациями */
  matte: { image: string; macroImage: string; title: string; body: string; points: string[] };
  application: { roller: ApplicationMethod; spray: ApplicationMethod };
  priming: { intro: string; steps: PrimingStep[]; tempNote: string };
  drying: { betweenCoats: string; fullCure: string; conditions: string };
  consumptionNote: string;
  composition: string;
  cleanup: string;
  storage: string;
  safety: string;
};

export type ProductSpec = {
  slug: string;
  name: string;
  tagline: string;
  category: "краска" | "грунт";
  badges: string[];
  heroImage: string;
  imageWidth: number;
  imageHeight: number;
  heroStats: HeroStat[];
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
  colorTryOn: boolean;
  content: ProductContent;
};

export const products: ProductSpec[] = [
  {
    slug: "decker",
    name: "Genesis Decker",
    tagline: "Глубокоматовая краска для потолков со сложным светом",
    category: "краска",
    badges: ["Engineered in Germany", "Экологично", "VOC <10 г/л", "Color Mix"],
    heroImage: "/products-detail/decker.jpg",
    imageWidth: 900,
    imageHeight: 900,
    heroStats: [
      { value: "3%", label: "блеск (85°)" },
      { value: "1 кл.", label: "укрывистость" },
      { value: "2 кл.", label: "истирание" },
      { value: "<10", label: "VOC, г/л" },
    ],
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
    colorTryOn: true,
    content: {
      matte: {
        image: "/products-detail/ill/matte-light.jpg",
        macroImage: "/products-detail/ill/macro-matte.jpg",
        title: "Глубокий мат для сложного света",
        body: "Глубокоматовая оптика — всего 3% блеска при падении света под углом 85°. Микрорельеф из мраморного наполнителя и диоксида титана рассеивает свет во все стороны: покрытие не бликует и визуально маскирует мелкие дефекты поверхности. Именно поэтому Decker идеален для потолков и стен с боковым, скользящим и сложным освещением.",
        points: [
          "Антибликовое покрытие без зеркальных пятен",
          "Скрывает микронеровности шпатлёвки",
          "Эталонная белизна и равномерность тона",
          "Большое открытое время — нанесение без стыков",
        ],
      },
      application: {
        roller: {
          title: "Нанесение валиком",
          image: "/products-detail/ill/roller-apply.jpg",
          steps: [
            "Тщательно перемешать краску перед применением.",
            "Первый слой — без разбавления или с добавлением чистой воды не более 10% от объёма; финишный слой — без разбавления.",
            "Валик для воднодисперсионных красок, ворс 7–18 мм. Минимальная шагрень — синтетика (микрофибра, полиамид) 7–10 мм.",
            "Наносить «мокрое-по-мокрому», валик держать обильно наполненным, не выжимать насухо — так не будет видимых стыков.",
            "Финальный проход в одном направлении (сверху-вниз) — равномерная гладкость и блеск.",
            "Минимум 2 слоя или не менее 200 мкм суммарно.",
          ],
        },
        spray: {
          title: "Безвоздушное распыление",
          image: "/products-detail/ill/spray-apply.jpg",
          steps: [
            "Один слой толщиной 200–300 мкм.",
            "Сопло 0,010–0,015 дюйма, угол распыления 40–60°.",
            "Рабочее давление 80–120 бар.",
            "Разбавление водой 0–5%.",
          ],
        },
      },
      priming: {
        intro: "Для правильной работы краски на подложке соблюдайте системный подход с грунтами Genesis.",
        steps: [
          {
            title: "Genesis HP — грунт-концентрат",
            detail: "Прочные мелкопористые основания: разбавление 1:4–1:5. Средневпитывающие: 1:2–1:3. Сильновпитывающие: 1:1 или без разбавления. Добиваться однородного влажного вида, без заглянцовки «до блеска».",
          },
          {
            title: "Genesis GE — изолирующая грунт-краска",
            detail: "Для сложных оснований: неравномерное впитывание по площади, пятна, разнотипные штукатурки на одном простенке, заглянцовка подложки.",
          },
          {
            title: "Без грунтования — только по качественной шпатлёвке",
            detail: "Допустимо по правильно нанесённой полимерной финишной шпатлёвке с однородными низкими впитывающими свойствами. Пробный выкрас обязателен.",
          },
        ],
        tempNote: "Грунтовочные и окрасочные работы — при температуре основания и воздуха +5…+30 °С.",
      },
      drying: {
        betweenCoats: "1,5–2 часа",
        fullCure: "28 дней",
        conditions: "При +20 °С и влажности 65%. Наносить при +5…+30 °С, влажность воздуха ≤80%.",
      },
      consumptionNote: "Валик: 6–9 м²/л по неровной впитывающей поверхности; 10–12 м²/л по ровной гладкой невпитывающей. Распыление: 200–300 мл/м². На пористых шероховатых основаниях расход растёт. Точный расход определяется пробным выкрасом на объекте.",
      composition: "Дисперсия акриловых сополимеров, микрокристаллический мраморный наполнитель, диоксид титана, вода, функциональные добавки.",
      cleanup: "По окончании работ инструмент промыть водой или мыльным раствором.",
      storage: "Хранить и транспортировать в плотно закрытой таре при +5…+30 °С, оберегая от влаги, тепла и прямых солнечных лучей. Гарантийный срок хранения — 36 месяцев.",
      safety: "Во время работ и сутки после — обеспечить эффективный воздухообмен. При распылении не вдыхать пары, использовать защиту глаз и дыхания. При попадании на кожу/в глаза промыть водой. Хранить в недоступном для детей месте.",
    },
  },
];

export function getProduct(slug: string): ProductSpec | undefined {
  return products.find((p) => p.slug === slug);
}
