import Image from "next/image";
import Link from "next/link";
import type { ContentItem, ProductStatus } from "@/lib/content";

const statusLabel: Record<ProductStatus, { text: string; color: string }> = {
  live: { text: "已上線", color: "bg-[var(--color-success)]" },
  beta: { text: "Beta", color: "bg-[var(--color-warning)]" },
  wip: { text: "開發中", color: "bg-[var(--color-muted)]" },
  archived: { text: "已停止營運", color: "bg-[var(--color-muted)]" },
};

/** 取得狀態的顯示文字與色點，產品卡與詳情頁共用。 */
export function getStatusLabel(status: ProductStatus = "wip") {
  return statusLabel[status];
}

/**
 * 產品卡：截圖、狀態、簡介與連結。
 * 已停止營運的專案沒有 url，所以只會連到站內的開發畫面。
 */
export function ProductCard({ product }: { product: ContentItem }) {
  const { title, description, slug, status, url, image } = product.frontmatter;
  const label = getStatusLabel(status);
  const detailHref = `/products/${slug}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-all hover:shadow-md">
      {image && (
        <Link
          href={detailHref}
          className="block border-b border-[var(--color-line)] bg-[var(--color-bg-alt)]"
        >
          <Image
            src={image}
            alt={`${title} 畫面截圖`}
            width={1200}
            height={750}
            className="w-full aspect-[16/10] object-cover object-top"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block w-2 h-2 rounded-full ${label.color}`} />
          <span className="text-xs text-[var(--color-muted)]">{label.text}</span>
        </div>
        <Link href={detailHref} className="block mb-2">
          <h3 className="text-xl font-bold leading-tight group-hover:text-[var(--color-primary)] transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5 flex-1">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs pt-4 border-t border-[var(--color-line)]">
          <Link
            href={detailHref}
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            {status === "archived" ? "看開發畫面 →" : "了解更多 →"}
          </Link>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              前往網站 ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
