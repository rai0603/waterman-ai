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
  return listSlugs("handbook");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ch = getContent("handbook", slug);
  if (!ch) return {};
  return {
    title: ch.frontmatter.title,
    description: ch.frontmatter.description ?? ch.frontmatter.tldr,
  };
}

export default async function HandbookChapterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const ch = getContent("handbook", slug);
  if (!ch) notFound();

  const all = listContent("handbook");
  const idx = all.findIndex((c) => c.frontmatter.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: ch.frontmatter.title,
    description: ch.frontmatter.description ?? ch.frontmatter.tldr,
    datePublished: ch.frontmatter.publishedAt,
    dateModified: ch.frontmatter.updatedAt ?? ch.frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: ch.frontmatter.author ?? "Rai",
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
          backHref="/handbook"
          backLabel="回手冊目錄"
          eyebrow={`Chapter ${ch.frontmatter.chapter ?? "—"}`}
          title={ch.frontmatter.title}
          description={ch.frontmatter.tldr}
        >
          <p className="mt-8 flex flex-wrap gap-x-3 text-sm text-[var(--color-muted)] border-t border-[var(--color-line)] pt-4">
            <span>{ch.frontmatter.author ?? "Rai"}</span>
            <span>最後更新 {formatDate(ch.frontmatter.updatedAt ?? ch.frontmatter.publishedAt)}</span>
          </p>
        </ArticleHero>

        {/* 內文 */}
        <section className="panel py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <Markdown>{ch.body}</Markdown>
          </div>
        </section>

        {/* 上一章 / 下一章 */}
        {(prev || next) && (
          <section className="py-12 border-t border-[var(--color-line)]">
            <div className="mx-auto max-w-3xl px-4 md:px-8 grid sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/handbook/${prev.frontmatter.slug}`}
                  className="group p-5 rounded-[var(--radius-md)] border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
                >
                  <p className="text-xs text-[var(--color-muted)] mb-1">
                    ← 上一章
                  </p>
                  <p className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                    {prev.frontmatter.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/handbook/${next.frontmatter.slug}`}
                  className="group p-5 rounded-[var(--radius-md)] border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors text-right sm:col-start-2"
                >
                  <p className="text-xs text-[var(--color-muted)] mb-1">
                    下一章 →
                  </p>
                  <p className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                    {next.frontmatter.title}
                  </p>
                </Link>
              )}
            </div>
          </section>
        )}
      </article>

      <CtaSection />
    </>
  );
}
