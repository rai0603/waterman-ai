import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "blog" | "handbook" | "works" | "products";

export type ProductStatus = "live" | "beta" | "wip" | "archived";
export type ProductCategory = "platform" | "app" | "hardware" | "website" | "tool";

/** 產品影片。檔案放在 R2 的 videos 目錄，不進 repo。 */
export type VideoClip = {
  file: string;
  title: string;
  poster: string;
  width: number;
  height: number;
  /** 影片長度，單位是秒 */
  duration: number;
  /** 影片完成日期，VideoObject 結構化資料必填 */
  uploadDate: string;
  /** 放到首頁影像區 */
  featured?: boolean;
};

export type Frontmatter = {
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  ogImage?: string;
  /** 卡片用截圖，路徑相對 public，例如 /works/aicms.webp */
  image?: string;
  // works specific
  client?: string;
  outcome?: string;
  techStack?: string[];
  // products specific
  url?: string;
  status?: ProductStatus;
  category?: ProductCategory;
  videos?: VideoClip[];
  // handbook specific
  chapter?: string;
  order?: number;
  tldr?: string;
};

export type ContentItem = {
  frontmatter: Frontmatter;
  body: string;
};

function getContentDir(type: ContentType): string {
  return path.join(process.cwd(), "content", type);
}

export function listContent(type: ContentType): ContentItem[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const items = files.map<ContentItem>((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf-8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string) ?? f.replace(/\.(md|mdx)$/, "");
    return {
      frontmatter: { ...data, slug } as Frontmatter,
      body: content,
    };
  });

  // handbook 用 order 排，其餘用 publishedAt 倒序
  if (type === "handbook") {
    return items.sort(
      (a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999)
    );
  }
  return items.sort((a, b) =>
    (b.frontmatter.publishedAt ?? "").localeCompare(
      a.frontmatter.publishedAt ?? ""
    )
  );
}

export function getContent(
  type: ContentType,
  slug: string
): ContentItem | undefined {
  return listContent(type).find((c) => c.frontmatter.slug === slug);
}

export function listSlugs(type: ContentType): { slug: string }[] {
  return listContent(type).map((c) => ({ slug: c.frontmatter.slug }));
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readingTime(text: string): number {
  // 中英混合：英文 200 wpm、中文 350 cpm
  const cn = (text.match(/[一-龥]/g) ?? []).length;
  const en = (text.match(/[a-zA-Z]+/g) ?? []).length;
  const minutes = Math.ceil(cn / 350 + en / 200);
  return Math.max(1, minutes);
}
