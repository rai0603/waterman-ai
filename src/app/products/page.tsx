import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "已上線產品",
  description:
    "我們自己養著的 SaaS 產品線 —— 所有方法論都是先在自家產品試過、再用在客戶身上。",
};

const statusLabel: Record<string, { text: string; color: string }> = {
  live: { text: "已上線", color: "bg-[var(--color-success)]" },
  beta: { text: "Beta", color: "bg-[var(--color-warning)]" },
  wip: { text: "開發中", color: "bg-[var(--color-muted)]" },
};

export default function ProductsIndexPage() {
  const products = listContent("products");

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            自己養的 SaaS。<br className="hidden md:block" />
            別人付費在用的工具。
          </>
        }
        subtitle="先在自家產品試過、再用在客戶身上 —— 我們不推沒自己 dogfood 過的方法論。"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          {products.length === 0 ? (
            <p className="text-[var(--color-muted)] text-center py-20">
              產品整理中。
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => {
                const status = statusLabel[p.frontmatter.status ?? "wip"];
                return (
                  <div
                    key={p.frontmatter.slug}
                    className="group flex flex-col p-7 rounded-[var(--radius-lg)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${status.color}`}
                      />
                      <span className="text-xs text-[var(--color-muted)]">
                        {status.text}
                      </span>
                    </div>
                    <Link
                      href={`/products/${p.frontmatter.slug}`}
                      className="block mb-3"
                    >
                      <h2 className="text-xl font-bold leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                        {p.frontmatter.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5 flex-1">
                      {p.frontmatter.description}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-4 border-t border-[var(--color-line)]">
                      <Link
                        href={`/products/${p.frontmatter.slug}`}
                        className="text-[var(--color-primary)] font-medium hover:underline"
                      >
                        了解更多 →
                      </Link>
                      {p.frontmatter.url && (
                        <a
                          href={p.frontmatter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                        >
                          官網 ↗
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="想做自己的 SaaS？"
        subtitle="以上所有產品的技術棧都可以複製到你的場景。"
      />
    </>
  );
}
