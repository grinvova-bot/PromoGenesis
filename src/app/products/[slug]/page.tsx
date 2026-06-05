import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import ProductHero from "@/components/product/ProductHero";
import DeepMatte from "@/components/product/DeepMatte";
import SpecsTable from "@/components/product/SpecsTable";
import ApplicationSystem from "@/components/product/ApplicationSystem";
import SurfacePrep from "@/components/product/SurfacePrep";
import ApplicationMethods from "@/components/product/ApplicationMethods";
import PaintCalculator from "@/components/product/PaintCalculator";
import FactsGrid from "@/components/product/FactsGrid";
import ColorVisualizer from "@/components/ColorVisualizer";
import ContactCTA from "@/components/ContactCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  absoluteUrl,
  jsonLd,
  productDescription,
  productUrl,
  siteName,
} from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const description = productDescription(p);
  const url = productUrl(p.slug);

  return {
    title: `${p.name} — ${p.tagline}`,
    description,
    alternates: {
      canonical: `/products/${p.slug}/`,
    },
    openGraph: {
      title: `${p.name} — ${p.tagline}`,
      description,
      url,
      siteName,
      type: "website",
      locale: "ru_RU",
      images: [
        {
          url: p.heroImage,
          width: p.imageWidth,
          height: p.imageHeight,
          alt: p.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — ${p.tagline}`,
      description,
      images: [p.heroImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const offers = (p.packagingByBase
    ? p.packagingByBase.flatMap((base) =>
        base.packaging.map((pack) => ({
          ...pack,
          base: base.label,
        })),
      )
    : p.packaging.map((pack) => ({ ...pack, base: undefined }))
  ).map((pack) => ({
    "@type": "Offer",
    sku: pack.sku,
    name: [p.name, pack.base, `${pack.volumeL} л`].filter(Boolean).join(" · "),
    price: pack.priceRub,
    priceCurrency: "RUB",
    availability: "https://schema.org/InStock",
    url: productUrl(p.slug),
  }));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: absoluteUrl(p.heroImage),
    description: productDescription(p),
    sku: p.packaging[0]?.sku,
    category: p.category === "краска" ? "Интерьерная краска" : "Грунтовка",
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    additionalProperty: p.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    offers,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd) }}
      />
      <Navigation />
      <main>
        <ProductHero p={p} />
        <DeepMatte p={p} />
        <SpecsTable p={p} />
        <ApplicationSystem p={p} />
        <SurfacePrep p={p} />
        <ApplicationMethods p={p} />
        <PaintCalculator p={p} />
        <FactsGrid p={p} />
        {p.colorTryOn && (
          <section id="try-on" className="scroll-mt-24 bg-bg-base section-y">
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
              <ColorVisualizer mode="inline" />
            </div>
          </section>
        )}
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
