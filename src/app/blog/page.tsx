import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { listContent, formatDate, readingTime } from "@/lib/content";

export const metadata: Metadata = {
  title: "部落格",
  description:
    "AI 工程、產品落地、客戶案例幕後、行業觀察 —— 水行者 AI 開發工作室的實戰心得。",
};

export default function BlogIndexPage() {
  const posts = listContent("blog");

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="部落格"
        subtitle="把專案裡的決策和踩坑寫下來。"
      />

      <section className="panel py-20 md:py-24">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="text-[var(--color-muted)] text-center py-20">
              還沒有文章，敬請期待。
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {posts.map((p) => (
                <Link
                  key={p.frontmatter.slug}
                  href={`/blog/${p.frontmatter.slug}`}
                  className="group block border-t border-[var(--color-line)] pt-6"
                >
                  <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] mb-4">
                    <time dateTime={p.frontmatter.publishedAt}>
                      {formatDate(p.frontmatter.publishedAt)}
                    </time>
                    <span>·</span>
                    <span>{readingTime(p.body)} 分鐘閱讀</span>
                  </div>
                  <h2 className="text-2xl font-light mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {p.frontmatter.title}
                  </h2>
                  {p.frontmatter.description && (
                    <p className="text-[var(--color-muted)] leading-relaxed mb-5">
                      {p.frontmatter.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {p.frontmatter.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {p.frontmatter.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--color-primary)] inline-flex items-center gap-1">
                      閱讀全文
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

      <CtaSection />
    </>
  );
}
