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
 * 作品卡：準星外框裡的畫面加上資料列。
 * 已停止營運的專案沒有 url，圖片以灰階呈現，只連到站內的開發畫面。
 */
export function ProductCard({ product }: { product: ContentItem }) {
  const { title, description, slug, status, url, image } = product.frontmatter;
  const label = getStatusLabel(status);
  const detailHref = `/products/${slug}`;
  const isArchived = status === "archived";

  return (
    <article className="group reveal flex flex-col">
      {image && (
        <Link href={detailHref} className="frame block bg-[var(--color-bg-alt)]">
          <Image
            src={image}
            alt={`${title} 畫面截圖`}
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`w-full aspect-[16/10] object-cover object-top transition-all duration-500 ${
              isArchived ? "grayscale group-hover:grayscale-0" : ""
            }`}
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col pt-4">
        <div className="hud flex items-center gap-2 mb-2">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${label.color}`} />
          <span className="normal-case tracking-normal font-sans text-sm">{label.text}</span>
        </div>
        <Link href={detailHref}>
          <h3 className="text-2xl font-light group-hover:text-[var(--color-primary)] transition-colors">
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-[var(--color-muted)] leading-relaxed flex-1">{description}</p>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <Link href={detailHref} className="link-arrow">
            {isArchived ? "看開發畫面" : "了解更多"}
          </Link>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              前往網站 ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
