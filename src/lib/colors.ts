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
