import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "服務", href: "/services" },
  { label: "作品", href: "/works" },
  { label: "產品", href: "/products" },
  { label: "手冊", href: "/handbook" },
  { label: "部落格", href: "/blog" },
  { label: "關於", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-md bg-[var(--color-ink)] overflow-hidden">
            <Image
              src="/logo-mark.png"
              alt="Waterman AI"
              width={36}
              height={36}
              priority
              className="object-contain w-[78%] h-[78%]"
            />
          </span>
          <span className="font-bold tracking-tight text-[var(--color-ink)] hidden sm:inline">
            Waterman<span className="text-[var(--color-primary)]">.ai</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 h-10 text-sm font-medium transition-colors shadow-sm"
        >
          立即詢價
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
