@AGENTS.md

# 專案：Waterman AI Dev Studio 官網

水行者運動國際有限公司 — AI 原生開發部門的對外官網。

## 技術棧

| 層級 | 選擇 |
|---|---|
| 框架 | Next.js 16 App Router (注意：不是 15，breaking change 多，寫前讀 `node_modules/next/dist/docs/`) |
| 樣式 | Tailwind CSS v4（@theme inline，不是 v3 的 config-based） |
| 字型 | Noto Sans TC + Inter + JetBrains Mono（next/font/google） |
| 內容 | MDX 用 gray-matter + react-markdown（不用 Velite/Contentlayer） |
| 表單 | react-hook-form + zod |
| 部署 | Cloudflare Pages（`output: 'export'` 純靜態）|
| 網域 | waterman-ai.cc |

## 重要決策

- **靜態 export 為主**：`next.config.ts` 設 `output: 'export'`，所有頁面 prerender 成 HTML。沒有 SSR / API routes。
- **沒有資料庫**：純內容站，content 用 markdown 在 `content/` 下，由 `lib/content.ts` 掃描。
- **Contact 表單後端走 Cloudflare Pages Functions**（暫未實作）：`functions/api/contact.ts` 接 Resend 寄信。表單目前 fallback：失敗顯示 mailto 連結。
- **設計風格 = C 方案**：Hero 黑底 + 內容區白底，Logo 走運動品牌風（黑底白色三叉戟）。
- **AEO 優先**：每頁有 JSON-LD（Organization、WebSite、Service、FAQPage、TechArticle、BlogPosting、SoftwareApplication）；llms.txt 與 sitemap.xml 動態生成。

## 目錄結構

```
src/
├── app/                    # 所有 routes
│   ├── (各 page.tsx)
│   ├── robots.ts           # 自動 robots.txt
│   ├── sitemap.ts          # 自動 sitemap.xml
│   └── llms.txt/route.ts   # llms.txt for AEO
├── components/             # 共用元件
│   ├── site-header.tsx, site-footer.tsx
│   ├── page-hero.tsx       # 內頁 hero
│   ├── cta-section.tsx     # 結尾 CTA
│   ├── markdown.tsx        # MD 渲染（含 components prop）
│   └── contact-form.tsx    # client component
└── lib/
    ├── content.ts          # markdown scan + parse
    └── services.ts         # 4 個 service 資料

content/                    # markdown 內容
├── blog/  handbook/  works/  products/
```

## 加新內容

直接在 `content/<type>/` 新增 .md 檔，frontmatter 必含 `title`、`slug`、`publishedAt`。
- `handbook/` 加 `chapter`、`order`、`tldr`
- `works/` 加 `client`、`outcome`、`techStack`
- `products/` 加 `url`、`status`

頁面會自動掃描，generateStaticParams 自動產生 routes。Build 即可。

## 加新服務（services）

改 `src/lib/services.ts` 的 `services` array。`/services/[slug]` 自動產生。

## 部署

```bash
npm run build  # 產生 out/ 靜態檔
```

Cloudflare Pages settings：
- Build command: `npm run build`
- Build output directory: `out`
- Node version: 20+
- Custom domain: `waterman-ai.cc`

## 待辦

- [ ] Contact form 後端：寫 `functions/api/contact.ts`（Cloudflare Pages Function）+ Resend 整合
- [ ] OG image：`public/og/default.png`（1200×630）—  目前 metadata 已 reference 但檔案沒生
- [ ] favicon：`public/favicon.ico` 換成 logo mark
- [ ] 把 ai-dev-notes 真實內容遷移進 `content/handbook/`
