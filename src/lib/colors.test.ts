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
