import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import ProductHero from "@/components/product/ProductHero";
import SpecsTable from "@/components/product/SpecsTable";
import ApplicationSystem from "@/components/product/ApplicationSystem";
import PaintCalculator from "@/components/product/PaintCalculator";
import ColorVisualizerInline from "@/components/product/ColorVisualizerInline";
import ContactCTA from "@/components/ContactCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.tagline,
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

  return (
    <>
      <Navigation />
      <main>
        <ProductHero p={p} />
        <SpecsTable p={p} />
        <ApplicationSystem p={p} />
        <PaintCalculator p={p} />
        {p.colorTryOn && (
          <section className="bg-bg-base section-y">
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
              <ColorVisualizerInline />
            </div>
          </section>
        )}
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
