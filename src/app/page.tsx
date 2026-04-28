import Link from "next/link";
import Image from "next/image";
import { CtaSection } from "@/components/cta-section";

const services = [
  {
    title: "AI MVP 快速打造",
    desc: "4–8 週交付可運行的 AI MVP，含規格、開發、部署與 30 天保固。",
    href: "/services/ai-mvp",
    weeks: "4–8 週",
    accent: "from-[#0A6CFF] to-[#00C2A8]",
  },
  {
    title: "SaaS 共創落地",
    desc: "技術團隊與你一起把 idea 變成真實上線的 SaaS，共擔風險、共享成果。",
    href: "/services/saas-co-build",
    weeks: "3–6 個月",
    accent: "from-[#0A6CFF] to-[#7C3AED]",
  },
  {
    title: "企業內部 AI 工具",
    desc: "把重複工作流交給 AI：客服、文件、報表、知識庫，三週內看到成效。",
    href: "/services/internal-tool",
    weeks: "3–6 週",
    accent: "from-[#00C2A8] to-[#0A6CFF]",
  },
  {
    title: "AI 工作流顧問",
    desc: "30 分鐘免費診斷你公司能用 AI 解決什麼，給出可執行的導入路線圖。",
    href: "/services/ai-consulting",
    weeks: "顧問制",
    accent: "from-[#F59E0B] to-[#0A6CFF]",
  },
];

const flow = [
  { step: "01", title: "免費諮詢", desc: "30 分鐘聊清楚你想做什麼、做不做得起來。" },
  { step: "02", title: "規格與報價", desc: "1 週內給可簽的需求書與報價，不是空泛簡報。" },
  { step: "03", title: "開發與週報", desc: "每週一次 demo，你看得見進度、改得動方向。" },
  { step: "04", title: "上線與保固", desc: "部署、監控、30 天 bug 修復，文件交付完整。" },
];

export default function Home() {
  return (
    <>
        {/* Hero — 黑底 */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, var(--color-primary), transparent)",
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, var(--color-accent), transparent)",
            }}
          />

          {/* 右側 logo mark 大型 watermark */}
          <div
            aria-hidden
            className="absolute right-[-8%] md:right-[-4%] top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none"
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={760}
              height={664}
              className="w-[420px] md:w-[640px] lg:w-[760px] h-auto"
              priority
            />
          </div>

          <div className="relative mx-auto max-w-[1200px] px-4 md:px-8 pt-20 md:pt-32 pb-20 md:pb-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-xs text-white/70 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              水行者運動國際 — AI 原生開發部門
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.1] max-w-4xl">
              從一句話 idea，
              <br className="hidden sm:block" />
              到上線可運作的{" "}
              <span className="bg-gradient-to-r from-[#5BA0FF] to-[var(--color-accent)] bg-clip-text text-transparent">
                AI 產品
              </span>
              。
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              給新創 PM、企業 IT、想用 AI 解決工作痛點的中小企業老闆 ——
              我們在 <strong className="text-white">4 週內</strong>{" "}
              交付可運行的 AI MVP，不是 demo、不是簡報。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-ink)] px-6 h-12 font-medium transition-colors shadow-lg"
              >
                免費 30 分諮詢
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 hover:border-white hover:bg-white/5 px-6 h-12 font-medium transition-colors text-white"
              >
                看作品集
              </Link>
            </div>

            {/* 信任徽章 — 已上線產品 */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-5">
                已上線 SaaS / 自有產品
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: "DiDiPo", subtitle: "社群 AI 文案", color: "#6366F1", url: "https://didipo.com" },
                  { name: "AI-妹嘻", subtitle: "職人 AI 名片", color: "#EC4899", url: "https://ai-match.cc" },
                  { name: "CitableRank", subtitle: "GEO 排名分析", color: "#06B6D4" },
                  { name: "零時生存", subtitle: "災難應變問答", color: "#F59E0B" },
                  { name: "IQ Suite", subtitle: "多測驗平台", color: "#8B5CF6" },
                  { name: "水行者預約", subtitle: "戶外活動預約", color: "#14B8A6" },
                ].map((p) => {
                  const Tag = p.url ? "a" : "span";
                  const props = p.url
                    ? { href: p.url, target: "_blank", rel: "noopener noreferrer" as const }
                    : {};
                  return (
                    <Tag
                      key={p.name}
                      {...props}
                      className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-colors text-sm"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: p.color }}
                      />
                      <span className="font-semibold text-white">{p.name}</span>
                      <span className="text-white/50 text-xs hidden sm:inline">
                        {p.subtitle}
                      </span>
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 服務矩陣 */}
        <section className="py-20 md:py-28 bg-[var(--color-bg-alt)]">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                Services
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                四種交付方式，<br />
                配合你現在的階段。
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
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
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-[var(--color-muted)] leading-relaxed mb-6">
                    {s.desc}
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

        {/* 開發流程 */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                Process
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                透明的流程，<br />
                每週看得見進度。
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flow.map((f, i) => (
                <div key={f.step} className="relative">
                  <div className="text-5xl font-bold font-mono text-[var(--color-primary)] mb-4">
                    {f.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {f.desc}
                  </p>
                  {i < flow.length - 1 && (
                    <div
                      aria-hidden
                      className="hidden lg:block absolute top-7 -right-3 text-[var(--color-line)] text-2xl"
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
    </>
  );
}
