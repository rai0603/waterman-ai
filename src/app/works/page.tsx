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
    <div className="max-w-3xl mb-10 md:mb-12">
      <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">{subtitle}</p>
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
        title={
          <>
            做過的，<br className="hidden md:block" />
            上線的，
            <br className="hidden md:block" />
            還在養的。
          </>
        }
        subtitle="我們不只列「做過什麼」，還寫每個專案的決策過程、技術選型理由、踩過的坑、量化成果。"
      />

      <section id="live" className="py-20 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <SectionHeading
            eyebrow="Live"
            title="現在線上的網站與 App"
            subtitle="每一個都還在運作，點進去就能看到實際成果。"
          />
          <div className="space-y-14">
            {categorySections.map(({ key, title }) => {
              const items = liveProducts.filter((p) => p.frontmatter.category === key);
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <h3 className="text-lg font-bold mb-5">{title}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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

      <section id="cases" className="py-20 md:py-24 bg-[var(--color-bg-alt)] scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
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
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {works.map((w) => (
                <Link
                  key={w.frontmatter.slug}
                  href={`/works/${w.frontmatter.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-all hover:shadow-lg"
                >
                  {w.frontmatter.image && (
                    <Image
                      src={w.frontmatter.image}
                      alt={`${w.frontmatter.title} 畫面截圖`}
                      width={1200}
                      height={750}
                      className="w-full aspect-[16/10] object-cover object-top border-b border-[var(--color-line)]"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-start justify-between mb-4">
                    {w.frontmatter.client && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-muted)]">
                        {w.frontmatter.client}
                      </span>
                    )}
                    <time
                      dateTime={w.frontmatter.publishedAt}
                      className="text-xs text-[var(--color-muted)]"
                    >
                      {formatDate(w.frontmatter.publishedAt)}
                    </time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {w.frontmatter.title}
                  </h2>
                  {w.frontmatter.description && (
                    <p className="text-[var(--color-muted)] leading-relaxed mb-5">
                      {w.frontmatter.description}
                    </p>
                  )}
                  {w.frontmatter.outcome && (
                    <p className="text-sm text-[var(--color-ink)] mb-5 pl-3 border-l-2 border-[var(--color-success)]">
                      <span className="font-semibold">成果：</span>
                      {w.frontmatter.outcome}
                    </p>
                  )}
                  <div className="flex items-end justify-between mt-auto">
                    {w.frontmatter.techStack && (
                      <div className="flex flex-wrap gap-1.5">
                        {w.frontmatter.techStack.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded font-mono bg-[var(--color-bg-alt)] text-[var(--color-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--color-primary)] inline-flex items-center gap-1 shrink-0 ml-3">
                      看細節
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {archivedProducts.length > 0 && (
        <section id="archived" className="py-20 md:py-24 scroll-mt-20">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <SectionHeading
              eyebrow="Archived"
              title="已停止營運的專案"
              subtitle="這些專案已經下線，或沒有走到公開上線。服務不再提供，這裡留下當時開發的畫面。"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {archivedProducts.map((p) => (
                <ProductCard key={p.frontmatter.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title="想做類似的專案嗎？"
        subtitle="把你的 idea 告訴我們，30 分鐘聊清楚 4 週能做到什麼。"
      />
    </>
  );
}
