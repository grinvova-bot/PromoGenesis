import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TEX-COLOR GENESIS — Профессиональные интерьерные краски премиум-класса",
  description:
    "Глубина цвета и безупречная текстура. Профессиональные краски для дизайнеров интерьера. Европейское качество, экологичная формула.",
  keywords: [
    "краски для интерьера",
    "Tex-Color Genesis",
    "премиум краски",
    "дизайн интерьера",
    "интерьерные краски",
  ],
  openGraph: {
    title: "TEX-COLOR GENESIS — Цвет, который чувствуешь",
    description: "Профессиональные интерьерные краски премиум-класса",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${cormorant.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
