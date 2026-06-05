import type { ProductSpec } from "@/data/products";

export const siteUrl = "https://genesis.alt-x.ru";
export const siteName = "TEX-COLOR GENESIS";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function productUrl(slug: string) {
  return absoluteUrl(`/products/${slug}/`);
}

export function productDescription(product: ProductSpec) {
  const specs = product.heroStats
    .slice(0, 3)
    .map((stat) => {
      const label = `${stat.label.charAt(0).toUpperCase()}${stat.label.slice(1)}`;
      const value = stat.value.replace(/\.$/, "");

      return `${label}: ${value}`;
    })
    .join("; ");

  return `${product.tagline}. Характеристики: ${specs}. Профессиональная линейка TEX-COLOR Genesis: применение, фасовки и расчёт расхода.`;
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
