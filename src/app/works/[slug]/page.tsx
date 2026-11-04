import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/article-hero";
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
        <ArticleHero
          backHref="/works"
          backLabel="回作品集"
          eyebrow="Case Study"
          title={w.frontmatter.title}
          description={w.frontmatter.description}
        >
          <dl className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-[var(--color-line)] pt-6">
            {w.frontmatter.client && (
              <div>
                <dt className="text-sm text-[var(--color-muted)] mb-1">客戶</dt>
                <dd className="font-medium">{w.frontmatter.client}</dd>
              </div>
            )}
            {w.frontmatter.outcome && (
              <div>
                <dt className="text-sm text-[var(--color-muted)] mb-1">成果</dt>
                <dd className="font-medium">{w.frontmatter.outcome}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-[var(--color-muted)] mb-1">發佈</dt>
              <dd className="font-medium">{formatDate(w.frontmatter.publishedAt)}</dd>
            </div>
          </dl>
          {w.frontmatter.techStack && (
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              {w.frontmatter.techStack.join(" · ")}
            </p>
          )}
        </ArticleHero>

        {/* 內文 */}
        <section className="panel py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <Markdown>{w.body}</Markdown>
          </div>
        </section>

        {/* 其他案例 */}
        {others.length > 0 && (
          <section className="panel py-16 md:py-20 border-t border-[var(--color-line)]">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
              <h2 className="text-2xl font-light mb-8">其他案例</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {others.map((o) => (
                  <Link
                    key={o.frontmatter.slug}
                    href={`/works/${o.frontmatter.slug}`}
                    className="group p-6 rounded-[var(--radius-md)] bg-transparent border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
                  >
                    <h3 className="font-light mb-2 group-hover:text-[var(--color-primary)] transition-colors">
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
        subtitle="告訴我們你的需求，第一次諮詢 30 分鐘免費。"
      />
    </>
  );
}
