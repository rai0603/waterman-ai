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
        <ArticleHero
          backHref="/blog"
          backLabel="回部落格"
          title={post.frontmatter.title}
          description={post.frontmatter.description}
        >
          <p className="mt-8 flex flex-wrap gap-x-3 text-sm text-[var(--color-muted)] border-t border-[var(--color-line)] pt-4">
            <time dateTime={post.frontmatter.publishedAt}>
              {formatDate(post.frontmatter.publishedAt)}
            </time>
            <span>{readingTime(post.body)} 分鐘閱讀</span>
            <span>{post.frontmatter.author ?? "Rai"}</span>
          </p>
        </ArticleHero>

        {/* 內文 */}
        <section className="panel py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <Markdown>{post.body}</Markdown>
          </div>
        </section>

        {/* 相關文章 */}
        {related.length > 0 && (
          <section className="panel py-16 md:py-20 border-t border-[var(--color-line)]">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
              <h2 className="text-2xl font-light mb-8">繼續閱讀</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.frontmatter.slug}
                    href={`/blog/${r.frontmatter.slug}`}
                    className="group p-6 rounded-[var(--radius-md)] bg-transparent border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
                  >
                    <h3 className="font-light mb-2 group-hover:text-[var(--color-primary)] transition-colors">
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
