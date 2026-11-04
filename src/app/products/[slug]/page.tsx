import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
              href={isArchived ? "/works#archived" : "/products"}
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-6"
            >
              <span aria-hidden>←</span> {isArchived ? "回作品集" : "回產品列表"}
            </Link>
            <p className="text-xs font-mono uppercase tracking-widest text-[#5BA0FF] mb-3">
              {isArchived ? "ARCHIVED PROJECT" : "PRODUCT"}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {p.frontmatter.title}
            </h1>
            {p.frontmatter.description && (
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                {p.frontmatter.description}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {p.frontmatter.url && (
                <a
                  href={p.frontmatter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-ink)] px-6 h-12 font-medium transition-colors shadow-lg"
                >
                  前往網站
                  <span aria-hidden>↗</span>
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 hover:border-white hover:bg-white/5 px-6 h-12 font-medium transition-colors text-white"
              >
                為我做類似的產品
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mt-8 pt-6 border-t border-white/10">
              <span className="inline-flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-full ${label.color}`} />
                {label.text}
              </span>
              <span>·</span>
              <span>更新於 {formatDate(p.frontmatter.updatedAt ?? p.frontmatter.publishedAt)}</span>
              {p.frontmatter.tags && (
                <>
                  <span>·</span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.frontmatter.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/10 text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 內文 */}
        <section className="py-12 md:py-16">
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
