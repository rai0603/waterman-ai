import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "開發實作手冊",
  description:
    "把 AI 從工具變成產品的完整方法論：從 idea 到上線、從 prompt 到部署、從技術選型到維運。",
};

export default function HandbookIndexPage() {
  const chapters = listContent("handbook");

  return (
    <>
      <PageHero
        eyebrow="Handbook"
        title="開發實作手冊"
        subtitle="我們把踩過的坑、寫過的方法論、選過的技術都寫下來。讀完不一定要找我們做，能幫你少走冤枉路就值得。"
      />

      <section className="panel py-20 md:py-24">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          {chapters.length === 0 ? (
            <p className="text-[var(--color-muted)] text-center py-20">
              手冊章節整理中。
            </p>
          ) : (
            <ol className="border-b border-[var(--color-line)]">
              {chapters.map((c) => (
                <li key={c.frontmatter.slug}>
                  <Link
                    href={`/handbook/${c.frontmatter.slug}`}
                    className="group flex items-start gap-5 md:gap-8 py-8 border-t border-[var(--color-line)]"
                  >
                    <div className="issue-no shrink-0 pt-2">
                      {c.frontmatter.chapter ?? "—"}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-light mb-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                        {c.frontmatter.title}
                      </h2>
                      {c.frontmatter.tldr && (
                        <p className="text-[var(--color-muted)] leading-relaxed mb-3 text-sm md:text-base">
                          <span className="font-semibold text-[var(--color-ink)]">
                            TL;DR：
                          </span>
                          {c.frontmatter.tldr}
                        </p>
                      )}
                      <span className="text-sm font-medium text-[var(--color-primary)] inline-flex items-center gap-1">
                        閱讀本章
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <CtaSection
        title="想直接找人做？"
        subtitle="第一次諮詢 30 分鐘免費，我們可以針對你的情況給更具體的建議。"
      />
    </>
  );
}
