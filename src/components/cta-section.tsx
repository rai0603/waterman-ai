import Link from "next/link";
import { DecodeText } from "@/components/decode-text";

type CtaSectionProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

/** 頁尾前的行動呼籲，背景粒子聚成水行者三叉戟。 */
export function CtaSection({
  title = "開始一個專案。",
  subtitle = "沒有固定方案，每個案子都依需求個案報價。第一次諮詢 30 分鐘免費。",
  primaryLabel = "聊聊你的需求",
  primaryHref = "/contact",
}: CtaSectionProps) {
  return (
    <section data-scene="trident" className="min-h-[92svh] flex items-end md:items-center">
      <div className="wrap py-16">
        <DecodeText text="Transmission Open" className="eyebrow block mb-5" />
        <h2 className="display text-[clamp(2.75rem,7vw,6.5rem)] max-w-3xl">{title}</h2>
        <p className="mt-6 text-lg font-light leading-relaxed max-w-md">{subtitle}</p>
        <Link href={primaryHref} className="btn mt-8">
          {primaryLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
