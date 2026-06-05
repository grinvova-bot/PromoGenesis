import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl, productUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: productUrl(product.slug),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: product.category === "краска" ? 0.9 : 0.85,
    })),
  ];
}
