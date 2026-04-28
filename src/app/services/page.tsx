import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "服務總覽",
  description:
    "AI MVP 快速打造、SaaS 共創落地、企業內部 AI 工具、AI 工作流顧問 — 四種交付方式，配合你現在的階段。",
};

const dontTakeList = [
  "想用 AI 取代整個部門的「裁員工程」",
  "規格寫不清楚、需求每週變三次的案子",
  "金流 / 法律邊界灰色地帶（爬蟲、繞過 ToS）",
  "「先做出來看看再說」沒預算邊界的開放案",
  "純研究目的、無上線打算的學術 PoC",
];

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            四種交付方式，
            <br className="hidden md:block" />
            配合你現在的階段。
          </>
        }
        subtitle="從一句話 idea 到上線可運作的 AI 產品 ——  我們把交付拆成四種模式，依你「現在缺什麼」對應切入。"
      />

      {/* 4 服務卡 */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative p-8 rounded-[var(--radius-lg)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className={`inline-block w-10 h-10 rounded-lg bg-gradient-to-br ${s.accent}`}
                  />
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-muted)] font-mono">
                    {s.weeks}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-3">{s.name}</h2>
                <p className="text-[var(--color-muted)] leading-relaxed mb-6">
                  {s.shortDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)]">
                  了解細節
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 我們不接的案子 */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Honest Boundaries
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              我們不接的案子。
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              先說清楚我們不做哪些，比說做什麼更重要 ——  這樣雙方都不浪費時間。
            </p>
            <ul className="space-y-3">
              {dontTakeList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[var(--color-ink)]"
                >
                  <span
                    aria-hidden
                    className="mt-2 w-4 h-0.5 bg-[var(--color-danger)] shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
