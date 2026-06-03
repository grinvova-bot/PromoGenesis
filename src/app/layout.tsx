import type { Metadata } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Дисплейный шрифт заголовков — характерный геометрический гротеск с кириллицей
const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Текстовый шрифт — родная кириллица, чистый гротеск
const sans = Golos_Text({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TEX-COLOR GENESIS — Профессиональные краски премиум-класса",
  description:
    "Профессиональные краски tex-color Genesis — локализация немецких рецептур. Немецкое качество с 1942 года, VOC менее 10 г/л, российское производство.",
  keywords: [
    "tex-color Genesis",
    "профессиональные краски",
    "интерьерные краски",
    "немецкие краски",
    "грунтовка",
    "глубокоматовая краска",
  ],
  openGraph: {
    title: "TEX-COLOR GENESIS — Безупречные покрытия для интерьера",
    description:
      "Локализация немецких рецептур для профессионального применения. Немецкое качество с 1942 года.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      data-theme="light"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem("genesis-theme");
                document.documentElement.dataset.theme =
                  savedTheme === "dark" ? "dark" : "light";
              } catch {}
            `,
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
