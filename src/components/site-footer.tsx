import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--color-line)] bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-md bg-[var(--color-ink)] overflow-hidden">
              <Image
                src="/logo-mark.png"
                alt="Waterman AI"
                width={36}
                height={36}
                className="object-contain w-[78%] h-[78%]"
              />
            </span>
            <span className="font-bold">Waterman AI Dev Studio</span>
          </div>
          <p className="text-sm text-[var(--color-muted)] max-w-md leading-relaxed">
            水行者 AI 開發工作室 — 隸屬於水行者運動國際有限公司
            AI 原生開發部門。我們把 AI 從工具升級為產品基底。
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-[var(--color-ink)]">服務</h3>
          <ul className="space-y-2 text-[var(--color-muted)]">
            <li><Link href="/services/ai-mvp" className="hover:text-[var(--color-ink)]">AI MVP 快速打造</Link></li>
            <li><Link href="/services/saas-co-build" className="hover:text-[var(--color-ink)]">SaaS 共創落地</Link></li>
            <li><Link href="/services/internal-tool" className="hover:text-[var(--color-ink)]">企業內部 AI 工具</Link></li>
            <li><Link href="/services/ai-consulting" className="hover:text-[var(--color-ink)]">AI 工作流顧問</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-[var(--color-ink)]">資源</h3>
          <ul className="space-y-2 text-[var(--color-muted)]">
            <li><Link href="/handbook" className="hover:text-[var(--color-ink)]">開發實作手冊</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--color-ink)]">部落格</Link></li>
            <li><Link href="/works" className="hover:text-[var(--color-ink)]">作品集</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-ink)]">聯絡我們</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} 水行者運動國際有限公司. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="hover:text-[var(--color-ink)]">隱私權政策</Link>
            <Link href="/legal/terms" className="hover:text-[var(--color-ink)]">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
