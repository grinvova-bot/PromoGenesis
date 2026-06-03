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
