import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "水行者 AI 開發工作室 Waterman AI Dev Studio",
    template: "%s ｜ 水行者 AI 開發工作室",
  },
  description:
    "從一句話 idea，到上線可運作的 AI 產品。給新創 PM、企業 IT、想用 AI 解決工作痛點的中小企業老闆，4 週交付可運行的 AI MVP。",
  keywords: [
    "AI 開發",
    "AI MVP",
    "SaaS 共創",
    "企業 AI 導入",
    "AI 工作流顧問",
    "Waterman AI",
    "水行者 AI",
  ],
  authors: [{ name: "Rai", url: SITE_URL }],
  creator: "水行者運動國際有限公司",
  publisher: "水行者 AI 開發工作室",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    siteName: "水行者 AI 開發工作室",
    title: "水行者 AI 開發工作室 Waterman AI Dev Studio",
    description: "從一句話 idea，到上線可運作的 AI 產品。",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Waterman AI Dev Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "水行者 AI 開發工作室 Waterman AI Dev Studio",
    description: "從一句話 idea，到上線可運作的 AI 產品。",
    images: ["/og/default.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "水行者 AI 開發工作室",
  alternateName: "Waterman AI Dev Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  parentOrganization: {
    "@type": "Organization",
    name: "水行者運動國際有限公司",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "rai0603@gmail.com",
    contactType: "customer service",
    availableLanguage: ["zh-Hant", "en"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "水行者 AI 開發工作室",
  url: SITE_URL,
  inLanguage: "zh-TW",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSansTC.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
