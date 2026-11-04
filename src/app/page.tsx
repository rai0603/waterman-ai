import type { CSSProperties } from "react";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { DecodeText } from "@/components/decode-text";
import { HudClock } from "@/components/hud-clock";
import { SystemsIndex, type SystemRow } from "@/components/systems-index";
import { listContent, type ProductCategory } from "@/lib/content";
import { capabilities, processSteps } from "@/lib/services";

const categoryOrder: ProductCategory[] = ["platform", "app", "website", "tool"];
const categoryLabel: Record<ProductCategory, string> = {
  platform: "Platform",
  app: "App",
  website: "Web",
  tool: "Tool",
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  const products = listContent("products");
  const live = products.filter((p) => p.frontmatter.status !== "archived");
  const archivedCount = products.length - live.length;

  const rows: SystemRow[] = categoryOrder
    .flatMap((category) => live.filter((p) => p.frontmatter.category === category))
    .map((product, index) => ({
      id: `W-${String(index + 1).padStart(2, "0")}`,
      title: product.frontmatter.title,
      type: categoryLabel[product.frontmatter.category ?? "website"],
      description: product.frontmatter.description ?? "",
      href: `/products/${product.frontmatter.slug}`,
      image: product.frontmatter.image ?? "",
    }));

  return (
    <>
      {/* 主畫面：粒子地球 */}
      <section data-scene="globe" className="min-h-[calc(100svh-4rem)] flex flex-col">
        <div className="wrap flex items-start justify-between gap-4 pt-5">
          <p className="hud">Waterman AI Dev Studio</p>
          <p className="hud text-right">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-success)] mr-2 align-middle" />
            Accepting Projects
          </p>
        </div>

        <div className="wrap flex-1 flex flex-col justify-center py-10">
          <h1 className="display text-[clamp(3rem,6.6vw,7.5rem)]">
            <span className="rise block" style={delay(200)}>把想法，</span>
            <span className="rise block" style={delay(380)}>做成真的產品。</span>
          </h1>
          <p className="rise mt-8 text-lg md:text-xl font-light leading-relaxed max-w-xl" style={delay(640)}>
            網站、App、AI 客服、內部系統。你說得出想解決什麼問題，我們就把它做出來。
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-6" style={delay(800)}>
            <Link href="/contact" className="btn">
              免費 30 分鐘諮詢
              <span aria-hidden>→</span>
            </Link>
            <Link href="/works" className="link-arrow">看作品</Link>
          </div>
        </div>

        <div className="wrap pb-5">
          <dl className="hud grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 border-t border-[var(--color-line)] pt-4">
            <div>
              <dt className="inline">Live Systems </dt>
              <dd className="inline text-[var(--color-ink)]">{String(live.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="inline">Archived </dt>
              <dd className="inline text-[var(--color-ink)]">{String(archivedCount).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="inline">Base </dt>
              <dd className="inline text-[var(--color-ink)]">Yilan, Taiwan</dd>
            </div>
            <div className="md:text-right text-[var(--color-ink)]">
              <HudClock />
            </div>
          </dl>
        </div>
      </section>

      {/* 定位：海面 */}
      <section data-scene="wave" className="min-h-[90svh] flex items-center">
        <div className="wrap py-20">
          <DecodeText text="No Fixed Plans" className="eyebrow block mb-6" />
          <h2 className="display text-[clamp(2.75rem,8vw,8rem)] max-w-5xl">沒有固定方案。</h2>
          <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
            每個案子都從你的需求開始。先聊清楚要做什麼，再依內容個案報價。
          </p>
        </div>
      </section>

      {/* 作品資料表 */}
      <section data-scene="field" className="panel border-y border-[var(--color-line)] py-20 md:py-28">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <DecodeText text="Live Systems" className="eyebrow block mb-4" />
              <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)]">都是真的在運作。</h2>
            </div>
            <Link href="/works" className="link-arrow shrink-0 hidden md:inline-flex">
              全部作品
              <span aria-hidden>→</span>
            </Link>
          </div>
          <SystemsIndex rows={rows} />
          <Link href="/works" className="link-arrow mt-10 md:hidden">
            全部作品
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* 能力模組：運算晶格 */}
      <section data-scene="lattice" className="py-20 md:py-32">
        <div className="wrap">
          <DecodeText text="Capabilities" className="eyebrow block mb-4" />
          <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] mb-4">你要什麼，<br />我們就做什麼。</h2>
          <p className="text-lg font-light leading-relaxed max-w-md mb-12">
            這些是我們做過的類型。不在清單上的需求，也歡迎來問。
          </p>

          <ol className="lg:w-2/3 grid md:grid-cols-2 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            {capabilities.map((capability, index) => (
              <li key={capability.title} className="group bg-[var(--color-bg)] p-6">
                <p className="issue-no mb-3">MOD.{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-light tracking-wide mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {capability.title}
                </h3>
                <p className="leading-relaxed text-[var(--color-muted)]">{capability.desc}</p>
                <p className="mt-3 text-sm">
                  {capability.proof.map((item, proofIndex) => (
                    <span key={item.label}>
                      {proofIndex > 0 && <span className="text-[var(--color-muted)]"> / </span>}
                      <Link href={item.href} className="underline underline-offset-4 hover:text-[var(--color-primary)]">
                        {item.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 基地：台灣地圖 */}
      <section data-scene="taiwan" className="min-h-[100svh] flex items-start md:items-center">
        <div className="wrap py-20">
          <DecodeText text="Base Location" className="eyebrow block mb-5" />
          <h2 className="display text-[clamp(2.75rem,7vw,6.5rem)]">基地在宜蘭。</h2>
          <p className="mt-6 text-lg md:text-xl font-light leading-relaxed max-w-md">
            水行者從 2012 年在宜蘭經營水上活動。我們的預約、排班與 AI 客服，都先在自家場館每天運作。
          </p>
          <dl className="hud mt-8 grid grid-cols-[6rem_1fr] gap-y-1 max-w-xs border-t border-[var(--color-line)] pt-4">
            <dt>Lat</dt>
            <dd className="text-[var(--color-ink)]">24.7°N</dd>
            <dt>Lon</dt>
            <dd className="text-[var(--color-ink)]">121.8°E</dd>
            <dt>Zone</dt>
            <dd className="text-[var(--color-ink)]">UTC+8</dd>
          </dl>
        </div>
      </section>

      {/* 合作流程 */}
      <section data-scene="wave" className="panel border-y border-[var(--color-line)] py-20 md:py-28">
        <div className="wrap">
          <DecodeText text="Sequence" className="eyebrow block mb-4" />
          <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] mb-12">從一句話開始。</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {processSteps.map((step, index) => (
              <li key={step.title} className="reveal border-t border-[var(--color-primary)] pt-4">
                <p className="issue-no mb-8">STEP {String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-light tracking-wide mb-2">{step.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
