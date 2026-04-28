import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "水行者 AI 開發工作室隸屬於水行者運動國際有限公司，是 2026 年成立的 AI 原生開發部門，將 AI 從工具升級為產品基底的落地工坊。",
};

const principles = [
  {
    title: "規格先行",
    desc: "在開工前把需求收斂成可簽收的規格書。沒有規格的需求，我們不接。",
  },
  {
    title: "週週可見",
    desc: "每週 demo、每週週報、每週可改方向。不是黑盒交付。",
  },
  {
    title: "開源精神",
    desc: "原始碼歸客戶，技術選型優先 open standard，不綁單一供應商。",
  },
  {
    title: "公開方法論",
    desc: "我們把開發手冊放在網站讓所有人讀，因為「能說清楚」比「能做出來」更重要。",
  },
];

const products = [
  {
    name: "DiDiPo",
    desc: "AI 社群文案生成 + 自動排程，三家 6 個模型可切換。",
    url: "https://didipo.com",
  },
  {
    name: "AI-妹嘻",
    desc: "5 分鐘生成你的 AI 專屬職人名片網站，活動場域用得最多。",
    url: "https://ai-match.cc",
  },
  {
    name: "CitableRank",
    desc: "台灣第一個繁體中文 GEO 分析平台，幫品牌進入 AI 答案前 5 名。",
  },
  {
    name: "零時生存",
    desc: "台灣災難應變情境問答遊戲，PWA 手機優先，玩著就學會自救。",
  },
  {
    name: "IQ Suite",
    desc: "多測驗平台（智商、情商、領導力、社交⋯）—  6 個測驗已上線。",
  },
  {
    name: "水行者預約系統",
    desc: "自家水上活動預約，Vite + Apps Script + Google Sheet 月費 $0。",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            把 AI 從工具，
            <br className="hidden md:block" />
            升級為產品基底。
          </>
        }
        subtitle="水行者 AI 開發工作室隸屬於水行者運動國際有限公司，是 2026 年成立的 AI 原生開發部門。我們不只是把 AI 當作 SaaS 接進來，而是把它當成產品的中樞神經設計。"
        size="tall"
      >
        <div className="flex items-center gap-3 mt-4">
          <span className="grid place-items-center w-10 h-10 rounded-md bg-white/10 overflow-hidden">
            <Image
              src="/logo-mark.png"
              alt=""
              width={40}
              height={40}
              className="object-contain w-[78%] h-[78%]"
            />
          </span>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest">母公司</p>
            <p className="text-white font-semibold">水行者運動國際有限公司</p>
          </div>
        </div>
      </PageHero>

      {/* 為什麼做這個 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                Why
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                為什麼成立這個部門。
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-5 text-[var(--color-ink)] text-lg leading-relaxed">
              <p>
                2026 年開始，AI 已經不是「要不要用」的問題，而是「怎麼用得到位」的問題。
              </p>
              <p>
                我們看到太多公司把 AI 當「外掛」 ——  接個 chatbot、塞個 GPT API，期待奇蹟自動發生。結果是：
                <strong className="text-[var(--color-ink)]">能 demo 的很多，能上線、能維運、能賺錢的很少。</strong>
              </p>
              <p>
                水行者運動國際做了十年的線下水上活動，我們知道「真實場域裡能用」跟「PPT 上能講」差多少。
                成立 AI 開發部門，是因為我們想用同樣的「上線思維」做 AI 產品。
              </p>
              <p>
                不是 prototype。是 ship。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 工作原則 */}
      <section className="py-20 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              我們的工作方式。
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="p-8 rounded-[var(--radius-lg)] bg-white border border-[var(--color-line)]"
              >
                <div className="font-mono text-xs text-[var(--color-muted)] mb-3">
                  {String(i + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 已上線產品 */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Track Record
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              我們做過、上過、養著的產品。
            </h2>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
              我們不只接案，自己也養著一條 SaaS 產品線。所有方法論都是先在自家產品試過、再用在客戶身上。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => {
              const Tag = p.url ? "a" : "div";
              const props = p.url
                ? { href: p.url, target: "_blank", rel: "noopener noreferrer" as const }
                : {};
              return (
                <Tag
                  key={p.name}
                  {...props}
                  className="group p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors block"
                >
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {p.name}
                    {p.url && (
                      <span
                        aria-hidden
                        className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] text-sm transition-colors"
                      >
                        ↗
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {p.desc}
                  </p>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* 創辦人 */}
      <section className="py-20 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Founder
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
              主理人。
            </h2>
            <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-10 border border-[var(--color-line)]">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] grid place-items-center text-white font-bold text-2xl shrink-0">
                  R
                </div>
                <div>
                  <h3 className="text-xl font-bold">陳建文（Rai）</h3>
                  <p className="text-[var(--color-muted)] text-sm">
                    水行者運動國際有限公司 · AI 開發部門主理人
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-[var(--color-ink)] leading-relaxed">
                <p>
                  TypeScript / Node.js 為主的全端工程師。
                  使用 Claude Code 在 30 天內上線 3 個產品（DiDiPo / AI-妹嘻 / 零時生存），2 萬行程式碼沒有一行手寫，但每一行都讀過、都負責。
                </p>
                <p>
                  相信「能說清楚的方法論才是真的會」 ——  所以把開發手冊公開放在網站，所有踩過的坑都寫成可搜尋的內容。
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a
                  href="mailto:rai0603@gmail.com"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  rai0603@gmail.com
                </a>
                <span className="text-[var(--color-line)]">|</span>
                <a
                  href="https://waterman-sports.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  waterman-sports.com ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
