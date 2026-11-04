import Link from "next/link";

const columns = [
  {
    title: "WORKS",
    links: [
      { label: "全部作品", href: "/works" },
      { label: "線上產品", href: "/products" },
      { label: "AICMS 開發紀錄", href: "/works/aicms-case" },
    ],
  },
  {
    title: "STUDIO",
    links: [
      { label: "服務", href: "/services" },
      { label: "關於", href: "/about" },
      { label: "聯絡我們", href: "/contact" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "開發手冊", href: "/handbook" },
      { label: "部落格", href: "/blog" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="wrap pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="md:col-span-5 text-xl md:text-2xl font-light leading-relaxed tracking-wide">
            專接客製化 AI 開發。
            <br />
            你的需求，我們做成產品。
          </p>
          {columns.map((column) => (
            <div key={column.title} className="md:col-span-2 md:first-of-type:col-start-7">
              <h3 className="hud mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[var(--color-primary)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          aria-hidden
          className="font-wide font-bold leading-none whitespace-nowrap mt-14 md:mt-20 text-[8.4vw] 2xl:text-[8.4rem] select-none"
        >
          WATERMAN AI
        </p>

        <div className="mt-8 border-t border-[var(--color-line)] py-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
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
