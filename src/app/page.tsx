import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Advantages from "@/components/Advantages";
import Interiors from "@/components/Interiors";
import History from "@/components/History";
import ExpertTestimonial from "@/components/ExpertTestimonial";
import ColorPalette from "@/components/ColorPalette";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { jsonLd, productUrl, siteName, siteUrl } from "@/lib/seo";

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "АЛЬТ-Икс",
    url: "https://alt-x.ru/",
    telephone: "+7-800-55-11-047",
    brand: {
      "@type": "Brand",
      name: siteName,
      url: siteUrl,
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "ул. Фучика 9, секция 2в.527",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "В.О., ул. Железноводская 3, секция 144",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      name: "АЛЬТ-Икс",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог TEX-COLOR Genesis",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: productUrl(product.slug),
      name: product.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListJsonLd) }}
      />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Advantages />
        <Interiors />
        <ColorPalette />
        <History />
        <ExpertTestimonial />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
