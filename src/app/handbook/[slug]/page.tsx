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
        {/* 章節 Hero */}
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
          <div className="relative mx-auto max-w-3xl px-4 md:px-8 pt-16 md:pt-20 pb-12 md:pb-14">
            <Link
              href="/handbook"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-6"
            >
              <span aria-hidden>←</span> 回手冊目錄
            </Link>
            <p className="text-xs font-mono uppercase tracking-widest text-[#5BA0FF] mb-3">
              CHAPTER {ch.frontmatter.chapter ?? "—"}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {ch.frontmatter.title}
            </h1>
            {ch.frontmatter.tldr && (
              <div className="mt-6 p-5 rounded-[var(--radius-md)] bg-white/5 border border-white/10">
                <p className="text-sm text-white/90 leading-relaxed">
                  <span className="font-bold text-[#5BA0FF]">TL;DR — </span>
                  {ch.frontmatter.tldr}
                </p>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mt-6">
              <span>{ch.frontmatter.author ?? "Rai"}</span>
              <span>·</span>
              <span>
                最後更新 {formatDate(ch.frontmatter.updatedAt ?? ch.frontmatter.publishedAt)}
              </span>
            </div>
          </div>
        </section>

        {/* 內文 */}
        <section className="py-12 md:py-16">
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
