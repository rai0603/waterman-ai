import type { ReactNode } from "react";
import Link from "next/link";

type ArticleHeroProps = {
  backHref: string;
  backLabel: string;
  /** 英文標籤，以等寬字呈現 */
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** 文章與作品詳情頁共用的標題區。 */
export function ArticleHero({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  children,
}: ArticleHeroProps) {
  return (
    <section className="border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-4xl px-5 md:px-10 pt-10 md:pt-14 pb-10 md:pb-14">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors mb-10"
        >
          <span aria-hidden>←</span> {backLabel}
        </Link>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="display text-[clamp(2.25rem,5.5vw,4.25rem)]">{title}</h1>
        {description && (
          <p className="mt-6 text-lg font-light leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
