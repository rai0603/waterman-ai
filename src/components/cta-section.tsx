import Link from "next/link";

type CtaSectionProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function CtaSection({
  title = "準備好把 idea 變產品了嗎？",
  subtitle = "30 秒留訊息，24 小時內回覆。不收諮詢費，不綁約。",
  primaryLabel = "開始你的 AI 專案",
  primaryHref = "/contact",
}: CtaSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink)] text-white p-10 md:p-16 text-center">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(10,108,255,0.4), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
              {subtitle}
            </p>
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-white px-8 h-14 text-base font-semibold transition-colors"
            >
              {primaryLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
