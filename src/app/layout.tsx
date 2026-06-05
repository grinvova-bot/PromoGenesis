import type { Metadata } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
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
    title: "TEX-COLOR GENESIS — Идеальная поверхность. Благородный цвет.",
    description:
      "Локализация немецких рецептур для профессионального применения. Немецкое качество с 1942 года.",
    type: "website",
    locale: "ru_RU",
  },
  verification: {
    yandex: "e0d61056162210df",
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
        <CookieConsent />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109676567', 'ym');
              ym(109676567, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<div><img src="https://mc.yandex.ru/watch/109676567" style="position:absolute; left:-9999px;" alt="" /></div>',
          }}
        />
      </body>
    </html>
  );
}
