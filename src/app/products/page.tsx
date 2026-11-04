import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { ProductCard } from "@/components/product-card";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "已上線產品",
  description:
    "我們自己做、自己養的網站、App 與工具 —— 所有方法論都是先在自家產品試過、再用在客戶身上。",
};

export default function ProductsIndexPage() {
  const products = listContent("products").filter(
    (p) => p.frontmatter.status !== "archived"
  );

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            自己做的產品，<br className="hidden md:block" />
            現在線上就用得到。
          </>
        }
        subtitle="先在自家產品試過、再用在客戶身上 —— 我們不推沒自己 dogfood 過的方法論。"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          {products.length === 0 ? (
            <p className="text-[var(--color-muted)] text-center py-20">
              產品整理中。
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <ProductCard key={p.frontmatter.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="想做自己的 SaaS？"
        subtitle="以上所有產品的技術棧都可以複製到你的場景。"
      />
    </>
  );
}
