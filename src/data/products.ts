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
