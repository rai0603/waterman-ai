import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "作品", href: "/works" },
  { label: "服務", href: "/services" },
  { label: "關於", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-line)]">
      <div className="wrap h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt=""
            width={30}
            height={26}
            priority
            className="object-contain"
          />
          <span className="font-wide text-xs font-bold tracking-[0.18em]">WATERMAN AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="主要導覽">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="link-arrow">
            開始一個專案
            <span aria-hidden>→</span>
          </Link>
        </nav>

        {/* 手機選單用原生 details，不需要 client component；連結用 a 換頁時會自動收合 */}
        <details className="md:hidden group">
          <summary className="list-none cursor-pointer select-none py-2 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">選單</span>
            <span className="hidden group-open:inline">關閉</span>
          </summary>
          <nav
            className="absolute inset-x-0 top-16 bg-[var(--color-bg)] border-b border-[var(--color-line)]"
            aria-label="手機導覽"
          >
            <ul className="wrap py-4">
              {[...navItems, { label: "開始一個專案", href: "/contact" }].map((item) => (
                <li key={item.href} className="border-b border-[var(--color-line)] last:border-0">
                  <a href={item.href} className="block py-4 text-2xl font-light tracking-wide">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
