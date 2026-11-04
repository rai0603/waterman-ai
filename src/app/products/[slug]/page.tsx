import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/article-hero";
import { CtaSection } from "@/components/cta-section";
import { Markdown } from "@/components/markdown";
import { getStatusLabel } from "@/components/product-card";
import { getContent, listSlugs, formatDate } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return listSlugs("products");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getContent("products", slug);
  if (!p) return {};
  return {
    title: p.frontmatter.title,
    description: p.frontmatter.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getContent("products", slug);
  if (!p) notFound();

  const isArchived = p.frontmatter.status === "archived";
  const label = getStatusLabel(p.frontmatter.status);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.frontmatter.title,
    description: p.frontmatter.description,
    url: p.frontmatter.url,
    applicationCategory: "WebApplication",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <ArticleHero
          backHref={isArchived ? "/works#archived" : "/products"}
          backLabel={isArchived ? "回作品集" : "回產品列表"}
          eyebrow={isArchived ? "Archived Project" : "Product"}
          title={p.frontmatter.title}
          description={p.frontmatter.description}
        >
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {p.frontmatter.url && (
              <a
                href={p.frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                前往網站
                <span aria-hidden>↗</span>
              </a>
            )}
            <Link href="/contact" className="link-arrow">
              做一個類似的
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-muted)] border-t border-[var(--color-line)] pt-4">
            <span className="inline-flex items-center gap-2">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${label.color}`} />
              {label.text}
            </span>
            <span>更新於 {formatDate(p.frontmatter.updatedAt ?? p.frontmatter.publishedAt)}</span>
            {p.frontmatter.tags && <span>{p.frontmatter.tags.join(" · ")}</span>}
          </p>
        </ArticleHero>

        {/* 內文 */}
        <section className="panel py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            {p.frontmatter.image && (
              <Image
                src={p.frontmatter.image}
                alt={`${p.frontmatter.title} 畫面截圖`}
                width={1200}
                height={750}
                loading="eager"
                className="w-full h-auto mb-10 rounded-[var(--radius-md)] border border-[var(--color-line)]"
              />
            )}
            <Markdown>{p.body}</Markdown>
          </div>
        </section>
      </article>

      <CtaSection />
    </>
  );
}
