import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BentoFeatures from "@/components/BentoFeatures";
import ExpertTestimonial from "@/components/ExpertTestimonial";
import ColorPalette from "@/components/ColorPalette";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Products />
        <BentoFeatures />
        <ExpertTestimonial />
        <ColorPalette />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
