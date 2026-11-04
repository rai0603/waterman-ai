import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { ProductCard } from "@/components/product-card";
import {
  listContent,
  formatDate,
  type ProductCategory,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "作品集",
  description:
    "目前線上的網站與 App、AICMS 等產品的功能開發紀錄，以及已停止營運專案當時的開發畫面。",
};

const categorySections: { key: ProductCategory; title: string }[] = [
  { key: "platform", title: "平台與 SaaS" },
  { key: "app", title: "App" },
  { key: "website", title: "網站" },
  { key: "tool", title: "開源工具" },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)]">{title}</h2>
      <p className="mt-4 text-lg font-light leading-relaxed">{subtitle}</p>
    </div>
  );
}

export default function WorksIndexPage() {
  const works = listContent("works");
  const products = listContent("products");
  const liveProducts = products.filter((p) => p.frontmatter.status !== "archived");
  const archivedProducts = products.filter((p) => p.frontmatter.status === "archived");

  return (
    <>
      <PageHero
        eyebrow="Works"
        title={<>做過的，上線的，<br />還在養的。</>}
        subtitle="每一件都是實際做出來的作品。我們也把決策過程、技術選型和踩過的坑寫下來。"
      />

      <section id="live" className="panel py-20 md:py-28 scroll-mt-20">
        <div className="wrap">
          <SectionHeading
            eyebrow="Live"
            title="現在線上的網站與 App"
            subtitle="每一個都還在運作，點進去就能看到實際成果。"
          />
          <div className="space-y-16 md:space-y-20">
            {categorySections.map(({ key, title }) => {
              const items = liveProducts.filter((p) => p.frontmatter.category === key);
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <h3 className="hud border-t border-[var(--color-line)] pt-3 mb-8 normal-case tracking-normal font-sans text-sm">{title}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {items.map((p) => (
                      <ProductCard key={p.frontmatter.slug} product={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cases" className="panel border-y border-[var(--color-line)] py-20 md:py-28 scroll-mt-20">
        <div className="wrap">
          <SectionHeading
            eyebrow="Case Studies"
            title="功能開發與案例紀錄"
            subtitle="AICMS、Soma 這類長期產品的功能怎麼一路長出來，每個決策背後的取捨都寫在這裡。"
          />
          {works.length === 0 ? (
            <p className="text-[var(--color-muted)] text-center py-20">
              案例整理中。
            </p>
          ) : (
            <ol>
              {works.map((w, index) => (
                <li key={w.frontmatter.slug} className="border-t border-[var(--color-line)]">
                  <Link
                    href={`/works/${w.frontmatter.slug}`}
                    className="group grid lg:grid-cols-12 gap-x-8 gap-y-5 py-8 md:py-10"
                  >
                    {w.frontmatter.image && (
                      <div className="lg:col-span-5 frame">
                        <Image
                          src={w.frontmatter.image}
                          alt={`${w.frontmatter.title} 畫面截圖`}
                          width={1200}
                          height={750}
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="w-full aspect-[16/10] object-cover object-top"
                        />
                      </div>
                    )}
                    <div className="lg:col-span-7">
                      <p className="issue-no mb-2">LOG.{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="text-2xl md:text-3xl font-light tracking-wide group-hover:text-[var(--color-primary)] transition-colors">
                        {w.frontmatter.title}
                      </h3>
                      {w.frontmatter.description && (
                        <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
                          {w.frontmatter.description}
                        </p>
                      )}
                      <p className="mt-4 text-sm text-[var(--color-muted)]">
                        {w.frontmatter.client} · {formatDate(w.frontmatter.publishedAt)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {archivedProducts.length > 0 && (
        <section id="archived" className="panel py-20 md:py-28 scroll-mt-20">
          <div className="wrap">
            <SectionHeading
              eyebrow="Archived"
              title="已停止營運的專案"
              subtitle="這些專案已經下線，或沒有走到公開上線。服務不再提供，這裡留下當時開發的畫面。"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {archivedProducts.map((p) => (
                <ProductCard key={p.frontmatter.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
