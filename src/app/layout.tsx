import type { Metadata } from "next";
import { Martian_Mono, Noto_Sans_TC, Syncopate } from "next/font/google";
import { ParticleField } from "@/components/particle-field";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  display: "swap",
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "水行者 AI 開發工作室 Waterman AI Dev Studio",
    template: "%s ｜ 水行者 AI 開發工作室",
  },
  description:
    "水行者 AI 開發工作室專接客製化開發：網站、App、AI 客服、內部系統，依需求個案報價，第一次諮詢 30 分鐘免費。",
  keywords: [
    "AI 開發",
    "客製化開發",
    "AI 接案",
    "網站開發",
    "App 開發",
    "AI 客服",
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
    description: "專接客製化 AI 開發，依需求個案報價。",
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
    description: "專接客製化 AI 開發，依需求個案報價。",
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
      className={`${notoSansTC.variable} ${martianMono.variable} ${syncopate.variable} h-full antialiased`}
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
        <ParticleField />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
