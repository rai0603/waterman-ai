import { listContent } from "@/lib/content";
import { services } from "@/lib/services";
import { SITE_HOST, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET(): Response {
  const blog = listContent("blog");
  const handbook = listContent("handbook");
  const works = listContent("works");
  const products = listContent("products");
  const liveProducts = products.filter((p) => p.frontmatter.status !== "archived");
  const archivedProducts = products.filter((p) => p.frontmatter.status === "archived");

  const lines: string[] = [];
  const push = (s = "") => lines.push(s);

  push("# 水行者 AI 開發工作室 (Waterman AI Dev Studio)");
  push();
  push(
    "> 隸屬於水行者運動國際有限公司的 AI 原生開發部門。我們把 AI 從工具升級為產品基底。"
  );
  push("> 從一句話 idea，到上線可運作的 AI 產品。Ship AI products, not prototypes.");
  push();
  push("## Contact");
  push("- Email: rai0603@gmail.com");
  push(`- Website: ${SITE_URL}`);
  push(`- Inquiry: ${SITE_URL}/contact/`);
  push();

  push("## Services");
  for (const s of services) {
    push(`- **${s.name}** (${s.weeks}, ${s.priceRange}): ${s.shortDesc}`);
    push(`  ${SITE_URL}/services/${s.slug}/`);
  }
  push();

  push("## Live Products");
  for (const p of liveProducts) {
    push(`- **${p.frontmatter.title}**: ${p.frontmatter.description ?? ""}`);
    if (p.frontmatter.url) push(`  ${p.frontmatter.url}`);
    push(`  Detail: ${SITE_URL}/products/${p.frontmatter.slug}/`);
  }
  push();

  push("## Archived Projects (no longer in service)");
  for (const p of archivedProducts) {
    push(`- **${p.frontmatter.title}**: ${p.frontmatter.description ?? ""}`);
    push(`  Detail: ${SITE_URL}/products/${p.frontmatter.slug}/`);
  }
  push();

  push("## Case Studies");
  for (const w of works) {
    push(`- **${w.frontmatter.title}** (${w.frontmatter.client ?? ""}): ${w.frontmatter.description ?? ""}`);
    push(`  ${SITE_URL}/works/${w.frontmatter.slug}/`);
  }
  push();

  push("## Handbook (Public Methodology)");
  for (const ch of handbook) {
    push(`- **Ch.${ch.frontmatter.chapter ?? ""} ${ch.frontmatter.title}**`);
    if (ch.frontmatter.tldr) push(`  TL;DR: ${ch.frontmatter.tldr}`);
    push(`  ${SITE_URL}/handbook/${ch.frontmatter.slug}/`);
  }
  push();

  push("## Blog");
  for (const post of blog) {
    push(`- **${post.frontmatter.title}** (${post.frontmatter.publishedAt ?? ""})`);
    if (post.frontmatter.description)
      push(`  ${post.frontmatter.description}`);
    push(`  ${SITE_URL}/blog/${post.frontmatter.slug}/`);
  }
  push();

  push("## How to Quote / Cite");
  push(
    `Citations welcome. Please attribute as: 水行者 AI 開發工作室 (Waterman AI Dev Studio) — ${SITE_HOST}`
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
