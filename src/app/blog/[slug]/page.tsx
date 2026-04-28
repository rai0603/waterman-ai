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
  readingTime,
} from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return listSlugs("blog");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getContent("blog", slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getContent("blog", slug);
  if (!post) notFound();

  const all = listContent("blog");
  const related = all
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: post.frontmatter.author ?? "Rai",
    },
    publisher: {
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
        {/* 文章 Hero */}
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
          <div className="relative mx-auto max-w-3xl px-4 md:px-8 pt-20 md:pt-24 pb-12 md:pb-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <span aria-hidden>←</span> 回部落格
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mb-6">
              <time dateTime={post.frontmatter.publishedAt}>
                {formatDate(post.frontmatter.publishedAt)}
              </time>
              <span>·</span>
              <span>{readingTime(post.body)} 分鐘閱讀</span>
              <span>·</span>
              <span>{post.frontmatter.author ?? "Rai"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.description && (
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                {post.frontmatter.description}
              </p>
            )}
            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.frontmatter.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 內文 */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <Markdown>{post.body}</Markdown>
          </div>
        </section>

        {/* 相關文章 */}
        {related.length > 0 && (
          <section className="py-16 md:py-20 bg-[var(--color-bg-alt)]">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
              <h2 className="text-2xl font-bold mb-8">繼續閱讀</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.frontmatter.slug}
                    href={`/blog/${r.frontmatter.slug}`}
                    className="group p-6 rounded-[var(--radius-md)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
                  >
                    <h3 className="font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {r.frontmatter.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                      {r.frontmatter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaSection />
    </>
  );
}
