import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { getService, services } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDesc,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDesc,
    provider: {
      "@type": "Organization",
      name: "水行者 AI 開發工作室",
    },
    areaServed: "TW",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow={`Service · ${service.weeks}`}
        title={service.name}
        subtitle={service.shortDesc}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-ink)] px-6 h-12 font-medium transition-colors shadow-lg"
          >
            預約諮詢
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 hover:border-white hover:bg-white/5 px-6 h-12 font-medium transition-colors text-white"
          >
            ← 回服務總覽
          </Link>
        </div>
      </PageHero>

      {/* 適合誰 */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                For Whom
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                適合這樣的你。
              </h2>
            </div>
            <div className="lg:col-span-2">
              <ul className="space-y-4">
                {service.audience.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 text-[var(--color-ink)]"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-flex shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] items-center justify-center text-xs font-bold"
                    >
                      ✓
                    </span>
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 我們交付什麼 */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                Deliverables
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                我們交付什麼。
              </h2>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d, i) => (
                <div
                  key={d}
                  className="flex items-start gap-3 p-5 rounded-[var(--radius-md)] bg-white border border-[var(--color-line)]"
                >
                  <span
                    aria-hidden
                    className="font-mono text-xs text-[var(--color-muted)] shrink-0 mt-0.5"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--color-ink)]">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 開發流程 */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              透明的流程，每階段看得見進度。
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p, i) => (
              <div key={p.week} className="relative">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-2">
                  {p.week}
                </div>
                <div className="text-3xl font-bold font-mono text-[var(--color-primary)] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 價格 */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Investment
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              費用區間。
            </h2>
            <p className="text-xl text-[var(--color-ink)] font-semibold mb-3">
              {service.priceRange}
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              實際報價依需求複雜度、整合難度、時程緊迫程度而定。我們會在規格 freeze 後給你可簽收的固定報價，不超預算。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] hover:bg-[var(--color-primary-dark)] text-white px-6 h-12 font-medium transition-colors"
            >
              我有興趣，給我估價
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              常見問題。
            </h2>
          </div>
          <div className="max-w-3xl space-y-4">
            {service.faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white p-6 hover:border-[var(--color-ink)] transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-[var(--color-ink)] text-lg">
                  {f.q}
                  <span
                    aria-hidden
                    className="text-[var(--color-muted)] group-open:rotate-45 transition-transform text-xl"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`準備好啟動「${service.name}」了嗎？`}
        subtitle="先免費聊 30 分鐘，不對盤也沒關係。"
      />
    </>
  );
}
