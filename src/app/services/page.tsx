import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { capabilities, faqs, processSteps } from "@/lib/services";

export const metadata: Metadata = {
  title: "服務",
  description:
    "專接客製化 AI 開發：網站、App、SaaS 平台、AI 客服、預約系統、流程自動化。沒有固定方案，依需求個案報價。",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="Services"
        title={<>任何需求，<br />都可以聊。</>}
        subtitle="我們專接客製化開發，沒有固定方案。告訴我們你想解決什麼，我們一起把它做出來。"
        scene="lattice"
      />

      <section className="panel py-20 md:py-28">
        <div className="wrap">
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            {capabilities.map((capability, index) => (
              <li key={capability.title} className="bg-[var(--color-bg)] p-6">
                <p className="issue-no mb-3">MOD.{String(index + 1).padStart(2, "0")}</p>
                <h2 className="text-2xl font-light tracking-wide mb-2">{capability.title}</h2>
                <p className="leading-relaxed text-[var(--color-muted)]">{capability.desc}</p>
                <ul className="mt-4 space-y-1 text-sm">
                  {capability.proof.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="underline underline-offset-4 hover:text-[var(--color-primary)]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="display mt-10 text-[clamp(1.75rem,4vw,3rem)]">
            不在清單上？
            <Link href="/contact" className="text-[var(--color-primary)] underline underline-offset-8 decoration-1 ml-2">
              那更要告訴我們。
            </Link>
          </p>
        </div>
      </section>

      <section className="panel border-y border-[var(--color-line)] py-20 md:py-28">
        <div className="wrap">
          <p className="eyebrow mb-4">Sequence</p>
          <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] mb-12">合作流程</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-t border-[var(--color-primary)] pt-4">
                <p className="issue-no mb-8">STEP {String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-light tracking-wide mb-2">{step.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="panel py-20 md:py-28">
        <div className="wrap grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)]">常見問題</h2>
          </div>
          <dl className="lg:col-start-6 lg:col-span-7">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-t border-[var(--color-line)] py-6">
                <dt className="text-xl md:text-2xl font-light tracking-wide mb-2">{faq.q}</dt>
                <dd className="leading-relaxed text-[var(--color-muted)]">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
