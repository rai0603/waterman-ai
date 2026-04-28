import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "參考方案",
  description:
    "AI MVP、SaaS 共創、企業內部工具、AI 顧問四種服務的價格區間，以及上線後的維運方案 Light / Standard / Pro。",
};

const buildPricing = [
  {
    name: "AI 工作流顧問",
    sub: "起點：30 分鐘免費諮詢",
    range: "NT$ 8–25 萬",
    weeks: "顧問制",
    items: [
      "完整評估報告 PDF",
      "3–5 個按 ROI 排序的場景",
      "可拿去報股東會的簡報版本",
      "30 天內 Email 答詢",
    ],
    href: "/services/ai-consulting",
    accent: "from-[#F59E0B] to-[#0A6CFF]",
    highlight: false,
  },
  {
    name: "AI MVP 快速打造",
    sub: "最熱門 — 4 週交付看得見的東西",
    range: "NT$ 30–80 萬",
    weeks: "4–8 週",
    items: [
      "可運行的 MVP（前後台 + 部署）",
      "完整原始碼 + 文件 + 架構圖",
      "30 天 bug 修復保固",
      "1 場交接 / Onboarding",
    ],
    href: "/services/ai-mvp",
    accent: "from-[#0A6CFF] to-[#00C2A8]",
    highlight: true,
  },
  {
    name: "企業內部 AI 工具",
    sub: "PoC 先行 — 有看得見的成效再展開",
    range: "PoC 8–20 萬 ｜ 全案 30–120 萬",
    weeks: "3–6 週",
    items: [
      "與貴司現有系統整合",
      "管理後台（用量、成本、權限）",
      "資料安全合規評估",
      "員工 1 場培訓 + 文件",
    ],
    href: "/services/internal-tool",
    accent: "from-[#00C2A8] to-[#0A6CFF]",
    highlight: false,
  },
  {
    name: "SaaS 共創落地",
    sub: "現金 + 股權 / 分潤皆可",
    range: "個案議定",
    weeks: "3–6 個月",
    items: [
      "完整可商業化的 SaaS",
      "上線後 6 個月迭代支援",
      "市場行銷頁（landing + pricing + blog）",
      "金流串接 + 訂閱管理",
    ],
    href: "/services/saas-co-build",
    accent: "from-[#0A6CFF] to-[#7C3AED]",
    highlight: false,
  },
];

const maintenance = [
  {
    name: "Light",
    price: "NT$ 8,000",
    period: "/ 月",
    desc: "基本維運，內容更新自己來",
    items: [
      "主機監控 + 安全更新",
      "每月 2 篇文章 / 案例上架",
      "Email 答詢 24 小時內回覆",
      "Bug 修復按時計費",
    ],
  },
  {
    name: "Standard",
    price: "NT$ 18,000",
    period: "/ 月",
    desc: "持續成長，需要外部視角",
    items: [
      "Light 全部內容",
      "每月 1 場 1 小時 SEO/AEO 改版會議",
      "元件擴充 4 hr / 月",
      "GA4 + Search Console 月報",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "NT$ 35,000",
    period: "/ 月",
    desc: "全託管，用力推到底",
    items: [
      "Standard 全部內容",
      "每月新增 1 個案例頁",
      "A/B 測試與優化",
      "Bug 修復免費（合理範圍）",
      "季度策略檢核會議",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            透明的價格，
            <br className="hidden md:block" />
            沒有藏起來的隱藏費用。
          </>
        }
        subtitle="所有服務都會在規格 freeze 後給你可簽收的固定報價。以下是市場參考區間，實際數字依需求而定。"
      />

      {/* 一次性建置 */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              One-off Build
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              四種建置方案。
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {buildPricing.map((p) => (
              <div
                key={p.name}
                className={`relative p-8 rounded-[var(--radius-lg)] border transition-all ${
                  p.highlight
                    ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)] shadow-xl"
                    : "bg-white border-[var(--color-line)] hover:border-[var(--color-ink)]"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] text-[var(--color-ink)] px-3 py-1 text-xs font-bold">
                    最熱門
                  </div>
                )}
                <div className="flex items-start justify-between mb-6">
                  <span
                    className={`inline-block w-10 h-10 rounded-lg bg-gradient-to-br ${p.accent}`}
                  />
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-mono ${
                      p.highlight
                        ? "bg-white/10 text-white/70"
                        : "bg-[var(--color-bg-alt)] text-[var(--color-muted)]"
                    }`}
                  >
                    {p.weeks}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">{p.name}</h3>
                <p
                  className={`text-sm mb-5 ${p.highlight ? "text-white/60" : "text-[var(--color-muted)]"}`}
                >
                  {p.sub}
                </p>
                <p className="text-2xl md:text-3xl font-bold mb-5">{p.range}</p>
                <ul
                  className={`space-y-2 mb-8 text-sm ${
                    p.highlight ? "text-white/80" : "text-[var(--color-ink)]"
                  }`}
                >
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${
                          p.highlight ? "bg-[var(--color-accent)]" : "bg-[var(--color-primary)]"
                        }`}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                    p.highlight ? "text-[var(--color-accent)]" : "text-[var(--color-primary)]"
                  }`}
                >
                  了解此服務 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 維運方案 */}
      <section className="py-20 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Maintenance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
              上線後的維運方案。
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              產品交付不是終點。依你內部能投入的人力，選擇合適的維運強度。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {maintenance.map((m) => (
              <div
                key={m.name}
                className={`relative p-8 rounded-[var(--radius-lg)] bg-white border ${
                  m.highlight
                    ? "border-[var(--color-primary)] shadow-lg"
                    : "border-[var(--color-line)]"
                }`}
              >
                {m.highlight && (
                  <div className="absolute -top-3 right-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] text-white px-3 py-1 text-xs font-bold">
                    推薦
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{m.name}</h3>
                <p className="text-sm text-[var(--color-muted)] mb-5">{m.desc}</p>
                <div className="mb-6 pb-6 border-b border-[var(--color-line)]">
                  <span className="text-3xl font-bold">{m.price}</span>
                  <span className="text-[var(--color-muted)] ml-1">{m.period}</span>
                </div>
                <ul className="space-y-3 text-sm text-[var(--color-ink)]">
                  {m.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-1 text-[var(--color-success)] shrink-0"
                      >
                        ✓
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-[var(--color-muted)] text-center">
            所有方案皆為月繳、可隨時升降級或取消。首月為試行期，不滿意全額退費。
          </p>
        </div>
      </section>

      <CtaSection
        title="不確定哪個方案適合？"
        subtitle="跟我們聊 30 分鐘，我們會直接告訴你預算與時程是否合理。"
        primaryLabel="預約諮詢"
      />
    </>
  );
}
