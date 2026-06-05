import type { Metadata } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll";
import { siteName, siteUrl } from "@/lib/seo";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "TEX-COLOR GENESIS — профессиональные краски и грунты",
    template: `%s | ${siteName}`,
  },
  description:
    "Профессиональные краски и грунты TEX-COLOR Genesis для интерьеров: немецкие рецептуры, российское производство, VOC менее 10 г/л, Color Mix и расчёт расхода.",
  keywords: [
    "tex-color Genesis",
    "профессиональные краски",
    "интерьерные краски",
    "краски для стен",
    "краски для потолков",
    "немецкие краски",
    "грунтовка",
    "глубокоматовая краска",
  ],
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TEX-COLOR GENESIS — профессиональные краски и грунты",
    description:
      "Краски и грунты Genesis для стен, потолков и подготовки основания. Характеристики, фасовки, применение и расчёт расхода.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/img/hero-interior.webp",
        width: 1200,
        height: 630,
        alt: "Интерьер с профессиональными красками TEX-COLOR Genesis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEX-COLOR GENESIS — профессиональные краски и грунты",
    description:
      "Профессиональные краски и грунты Genesis: характеристики, применение, фасовки и расчёт расхода.",
    images: ["/img/hero-interior.webp"],
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
              // Превью-копия на *.vercel.app — переадресуем на боевой домен
              if (location.hostname.endsWith(".vercel.app")) {
                location.replace("https://genesis.alt-x.ru" + location.pathname + location.search + location.hash);
              }
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
