import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { listContent, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "作品集",
  description:
    "我們做過的真實案例 —— 從 4 週上線的 AI MVP 到完整 SaaS。每個案例附帶決策過程、技術選型、量化成果。",
};

export default function WorksIndexPage() {
  const works = listContent("works");

  return (
    <>
      <PageHero
        eyebrow="Works"
        title={
          <>
            做過的，<br className="hidden md:block" />
            上線的，
            <br className="hidden md:block" />
            還在養的。
          </>
        }
        subtitle="我們不只列「做過什麼」，還寫每個專案的決策過程、技術選型理由、踩過的坑、量化成果。"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          {works.length === 0 ? (
            <p className="text-[var(--color-muted)] text-center py-20">
              案例整理中。
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {works.map((w) => (
                <Link
                  key={w.frontmatter.slug}
                  href={`/works/${w.frontmatter.slug}`}
                  className="group flex flex-col p-8 rounded-[var(--radius-lg)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    {w.frontmatter.client && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-muted)]">
                        {w.frontmatter.client}
                      </span>
                    )}
                    <time
                      dateTime={w.frontmatter.publishedAt}
                      className="text-xs text-[var(--color-muted)]"
                    >
                      {formatDate(w.frontmatter.publishedAt)}
                    </time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {w.frontmatter.title}
                  </h2>
                  {w.frontmatter.description && (
                    <p className="text-[var(--color-muted)] leading-relaxed mb-5">
                      {w.frontmatter.description}
                    </p>
                  )}
                  {w.frontmatter.outcome && (
                    <p className="text-sm text-[var(--color-ink)] mb-5 pl-3 border-l-2 border-[var(--color-success)]">
                      <span className="font-semibold">成果：</span>
                      {w.frontmatter.outcome}
                    </p>
                  )}
                  <div className="flex items-end justify-between mt-auto">
                    {w.frontmatter.techStack && (
                      <div className="flex flex-wrap gap-1.5">
                        {w.frontmatter.techStack.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded font-mono bg-[var(--color-bg-alt)] text-[var(--color-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--color-primary)] inline-flex items-center gap-1 shrink-0 ml-3">
                      看細節
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="想做類似的專案嗎？"
        subtitle="把你的 idea 告訴我們，30 分鐘聊清楚 4 週能做到什麼。"
      />
    </>
  );
}
