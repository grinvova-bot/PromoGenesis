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

export type Packaging = { volumeL: number; priceRub: number; sku?: string };
export type PackItem = { volumeL: number; qty: number; priceRub: number; sku?: string };
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
    sku: p.sku,
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
    .map((s, i) => ({
      volumeL: s.volumeL,
      qty: counts[i],
      priceRub: s.price,
      sku: s.sku,
    }))
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
