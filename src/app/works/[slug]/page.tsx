import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { Markdown } from "@/components/markdown";
import {
  getContent,
  listContent,
  listSlugs,
  formatDate,
} from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return listSlugs("works");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getContent("works", slug);
  if (!w) return {};
  return {
    title: w.frontmatter.title,
    description: w.frontmatter.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const w = getContent("works", slug);
  if (!w) notFound();

  const all = listContent("works");
  const others = all.filter((x) => x.frontmatter.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: w.frontmatter.title,
    description: w.frontmatter.description,
    datePublished: w.frontmatter.publishedAt,
    dateModified: w.frontmatter.updatedAt ?? w.frontmatter.publishedAt,
    author: {
      "@type": "Organization",
      name: "水行者 AI 開發工作室",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        {/* Hero */}
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
          <div className="relative mx-auto max-w-3xl px-4 md:px-8 pt-16 md:pt-20 pb-12 md:pb-16">
            <Link
              href="/works"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-6"
            >
              <span aria-hidden>←</span> 回作品集
            </Link>
            <p className="text-xs font-mono uppercase tracking-widest text-[#5BA0FF] mb-3">
              CASE STUDY
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {w.frontmatter.title}
            </h1>
            {w.frontmatter.description && (
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                {w.frontmatter.description}
              </p>
            )}
            <div className="mt-8 grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {w.frontmatter.client && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    客戶
                  </p>
                  <p className="font-semibold">{w.frontmatter.client}</p>
                </div>
              )}
              {w.frontmatter.outcome && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    成果
                  </p>
                  <p className="font-semibold">{w.frontmatter.outcome}</p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  發佈
                </p>
                <p className="font-semibold">{formatDate(w.frontmatter.publishedAt)}</p>
              </div>
            </div>
            {w.frontmatter.techStack && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
                  技術棧
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {w.frontmatter.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded font-mono bg-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 內文 */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <Markdown>{w.body}</Markdown>
          </div>
        </section>

        {/* 其他案例 */}
        {others.length > 0 && (
          <section className="py-16 md:py-20 bg-[var(--color-bg-alt)]">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
              <h2 className="text-2xl font-bold mb-8">其他案例</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {others.map((o) => (
                  <Link
                    key={o.frontmatter.slug}
                    href={`/works/${o.frontmatter.slug}`}
                    className="group p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
                  >
                    <h3 className="font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {o.frontmatter.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                      {o.frontmatter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaSection
        title="想做類似的專案？"
        subtitle="把你的 idea 告訴我們，30 分鐘聊清楚 4 週能做到什麼。"
      />
    </>
  );
}
