import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "聯絡 / 詢價",
  description:
    "30 秒留訊息，24 小時內回覆。免費 30 分鐘諮詢，幫你判斷你的 AI 需求是否值得做、要花多少時間、預算多少。",
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "聯絡 / 詢價",
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
        title={
          <>
            30 秒留訊息，
            <br className="hidden md:block" />
            24 小時內回覆。
          </>
        }
        subtitle="不收諮詢費，不綁約。先聊清楚再決定要不要合作。"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* 左側：表單 */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* 右側：替代聯絡方式 */}
            <aside className="space-y-8">
              <div>
                <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                  Direct
                </p>
                <h2 className="text-xl font-bold mb-3">直接寫信給我們</h2>
                <a
                  href="mailto:rai0603@gmail.com"
                  className="text-[var(--color-primary)] hover:underline break-all"
                >
                  rai0603@gmail.com
                </a>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  正常工作日 24 小時內回覆。週末會晚一些。
                </p>
              </div>

              <div className="border-t border-[var(--color-line)] pt-8">
                <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                  What to expect
                </p>
                <h2 className="text-xl font-bold mb-3">送出後會發生什麼</h2>
                <ol className="space-y-3 text-sm text-[var(--color-ink)]">
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--color-muted)] shrink-0">
                      01
                    </span>
                    <span>立即收到自動回信確認，附我們的開發手冊 PDF。</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--color-muted)] shrink-0">
                      02
                    </span>
                    <span>24 小時內人工回覆，提幾個澄清問題。</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--color-muted)] shrink-0">
                      03
                    </span>
                    <span>排 30 分鐘 Google Meet，免費聊清楚範圍。</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--color-muted)] shrink-0">
                      04
                    </span>
                    <span>合適的話，1 週內出規格書 + 報價。</span>
                  </li>
                </ol>
              </div>

              <div className="border-t border-[var(--color-line)] pt-8">
                <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                  Privacy
                </p>
                <h2 className="text-xl font-bold mb-3">我們不會做的事</h2>
                <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                  <li>· 不會把你的資料賣給第三方</li>
                  <li>· 不會把你加進 EDM 名單</li>
                  <li>· 不會在沒同意下對外提及合作關係</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
