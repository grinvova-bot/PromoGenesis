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

export default function Home() {
  return (
    <>
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
