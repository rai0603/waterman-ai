import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "聯絡我們",
  description:
    "告訴我們你想做什麼。不用先想好規格，第一次諮詢 30 分鐘免費，依需求個案報價。",
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "聯絡我們",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "水行者 AI 開發工作室",
    contactPoint: {
      "@type": "ContactPoint",
      email: "rai0603@gmail.com",
      contactType: "customer service",
      availableLanguage: ["zh-Hant", "en"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <PageHero
        eyebrow="Get in touch"
        title={<>告訴我們，<br />你想做什麼。</>}
        subtitle="不用先想好規格，用你自己的話寫就好。第一次諮詢 30 分鐘免費。"
        scene="taiwan"
      />

      <section className="panel py-16 md:py-24">
        <div className="wrap grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-start-9 lg:col-span-4 space-y-10">
            <div className="border-t border-[var(--color-line)] pt-4">
              <h2 className="text-xl font-light tracking-wide mb-4">接下來會發生什麼</h2>
              <ol className="space-y-4">
                {[
                  "我們讀完你的需求，用 Email 回覆你。",
                  "排 30 分鐘線上諮詢，免費把範圍聊清楚。",
                  "合適的話，依需求提供報價。",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="issue-no shrink-0 pt-1.5">{String(index + 1).padStart(2, "0")}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-[var(--color-line)] pt-4">
              <h2 className="text-xl font-light tracking-wide mb-3">想直接寫信</h2>
              <a href="mailto:rai0603@gmail.com" className="link-arrow break-all">
                rai0603@gmail.com
              </a>
            </div>

            <div className="border-t border-[var(--color-line)] pt-4">
              <h2 className="text-xl font-light tracking-wide mb-3">你的資料</h2>
              <p className="leading-relaxed text-[var(--color-muted)]">
                只用來回覆你的詢問，不會賣給第三方，也不會加進廣告名單。
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
