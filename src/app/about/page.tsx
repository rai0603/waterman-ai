import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "水行者 AI 開發工作室隸屬於水行者運動國際有限公司，專接客製化 AI 開發，把想法做成真的能用的產品。",
};

const principles = [
  {
    title: "先把需求談清楚",
    desc: "需求還模糊也沒關係，我們會一起把它整理成做得出來的範圍。",
  },
  {
    title: "過程看得見",
    desc: "開發過程持續同步進度，方向可以邊做邊調整，不是黑盒交付。",
  },
  {
    title: "不綁單一供應商",
    desc: "模型與技術依需求選擇，優先採用開放標準。",
  },
  {
    title: "公開方法論",
    desc: "我們把開發手冊放在網站上讓所有人讀，因為能說清楚才是真的會。",
  },
];

const products = [
  {
    name: "AICMS",
    desc: "為 AI 搜尋時代設計的多租戶 CMS，內建 AI 客服、線上預約與 MCP Gateway。",
    url: "https://ai-cms.cc",
  },
  {
    name: "Soma Agent",
    desc: "會說話、有記憶的 AI 角色夥伴，桌面版與 iPhone App 都已上線。",
    url: "https://soma-agent.com",
  },
  {
    name: "CitableRank",
    desc: "繁體中文 GEO 分析平台，量測品牌被 AI 推薦的頻率。",
    url: "https://citablerank.com",
  },
  {
    name: "AI-妹嘻",
    desc: "聊天就能生成的職人 AI 名片網站，支援活動場域名片牆。",
    url: "https://ai-match.cc",
  },
  {
    name: "水行者裝備站",
    desc: "Ozone 與 Red Paddle Co 預購電商，內建風箏、風翼、SUP 尺寸建議器。",
    url: "https://shop.waterman-sports.cc",
  },
  {
    name: "水行者預約系統",
    desc: "自家水上活動預約，Vite + Apps Script + Google Sheet 月費 $0。",
    url: "https://book.waterman-sports.com",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>把想法做成<br />真的能用的東西。</>}
        subtitle="水行者 AI 開發工作室隸屬於水行者運動國際有限公司。我們專接客製化開發，也持續養著自己的產品。"
        scene="trident"
      />

      <section className="panel py-20 md:py-28">
        <div className="wrap grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Why</p>
            <h2 className="display text-[clamp(2.25rem,4vw,3.5rem)]">為什麼做這件事</h2>
          </div>
          <div className="lg:col-start-6 lg:col-span-7 space-y-5 text-lg leading-relaxed">
            <p>AI 已經不是「要不要用」的問題，而是「怎麼用得到位」的問題。</p>
            <p>
              我們看到太多公司把 AI 當外掛，接個聊天機器人就期待奇蹟發生。結果是
              <strong>能 demo 的很多，能上線、能維運的很少。</strong>
            </p>
            <p>
              水行者從 2012 年開始經營線下水上活動，我們知道「真實場域裡能用」和「簡報上能講」差多少。成立 AI 開發部門，是想用同樣的務實態度做產品。
            </p>
          </div>
        </div>
      </section>

      <section className="panel border-y border-[var(--color-line)] py-20 md:py-28">
        <div className="wrap">
          <p className="eyebrow mb-4">Principles</p>
          <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] mb-12">我們的工作方式</h2>
          <ol className="grid md:grid-cols-2 gap-x-10 lg:gap-x-16">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-t border-[var(--color-line)] py-6">
                <p className="issue-no mb-2">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-light tracking-wide mb-2">{principle.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{principle.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="panel py-20 md:py-28">
        <div className="wrap">
          <p className="eyebrow mb-4">Track Record</p>
          <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] mb-12">自己也養著這些產品</h2>
          <ul className="border-b border-[var(--color-line)]">
            {products.map((product) => (
              <li key={product.name} className="border-t border-[var(--color-line)]">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid md:grid-cols-12 gap-x-8 gap-y-1 py-5 md:py-6"
                >
                  <span className="md:col-span-5 text-2xl font-light tracking-wide group-hover:text-[var(--color-primary)] transition-colors">
                    {product.name} <span aria-hidden className="text-lg">↗</span>
                  </span>
                  <span className="md:col-span-7 md:pt-1.5 leading-relaxed text-[var(--color-muted)]">
                    {product.desc}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel border-y border-[var(--color-line)] py-20 md:py-28">
        <div className="wrap grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Founder</p>
            <h2 className="display text-[clamp(2.25rem,4vw,3.5rem)]">主理人</h2>
          </div>
          <div className="lg:col-start-6 lg:col-span-7">
            <h3 className="text-3xl font-light tracking-wide mb-1">陳建文（Rai）</h3>
            <p className="text-[var(--color-muted)] mb-6">水行者運動國際有限公司 · AI 開發部門主理人</p>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                TypeScript / Node.js 為主的全端開發者。用 Claude Code 在 30 天內上線 3 個產品，2 萬行程式碼沒有一行手寫，但每一行都讀過、都負責。
              </p>
              <p>相信能說清楚的方法論才是真的會，所以把開發手冊公開放在網站上。</p>
            </div>
            <p className="mt-6 flex flex-wrap gap-6">
              <a href="mailto:rai0603@gmail.com" className="link-arrow">rai0603@gmail.com</a>
              <a
                href="https://waterman-sports.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                waterman-sports.com ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
