# Waterman AI Dev Studio — 官方網站

水行者運動國際有限公司 — AI 原生開發部門對外官網。

- **Production**：https://ai.waterman-sports.cc
- **技術棧**：Next.js 16 + Tailwind v4 + TypeScript + 純靜態 export
- **部署**：Cloudflare Workers Static Assets（`npm run deploy`）

## 開發

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 產生 out/ 靜態檔
```

## 加新內容

直接在 `content/<type>/` 新增 `.md` 檔，build 後自動產生路由。

| 類型 | 路徑 | 必填 frontmatter |
|---|---|---|
| 部落格 | `content/blog/<slug>.md` | `title`, `slug`, `publishedAt`, `description` |
| 手冊章節 | `content/handbook/<slug>.md` | + `chapter`, `order`, `tldr` |
| 案例 | `content/works/<slug>.md` | + `client`, `outcome`, `techStack` |
| 產品 | `content/products/<slug>.md` | + `url`, `status` (`live`/`beta`/`wip`) |

範例 frontmatter：

```yaml
---
title: "AI MVP 在 6 週內上線：給 PM 的最小可行路線圖"
description: "從規格到部署的工作分解。"
slug: "ai-mvp-6-weeks"
publishedAt: "2026-04-28"
updatedAt: "2026-04-28"
author: "Rai"
tags: ["AI MVP", "產品落地"]
---
```

## 加新服務

改 `src/lib/services.ts` 的 `capabilities`，首頁與 `/services` 會自動更新。

## 部署到 Cloudflare

用 Workers Static Assets 部署 `out/`，設定在 `wrangler.jsonc`，custom domain `ai.waterman-sports.cc` 由 Cloudflare 自動建立 DNS 與憑證。

```bash
npm run deploy
```

沒有接 Git 自動部署，push 不會上線。

### 詢問表單

`/api/contact` 由 `worker/` 處理，用 Cloudflare `send_email` 寄到站長信箱，不需要第三方金鑰。測試：`npm test`。

## SEO 與 AEO 檔案

部署後可驗證：
- `/sitemap.xml` ——  動態生成所有 routes
- `/robots.txt` ——  允許所有 LLM bots
- `/llms.txt` ——  給 LLM 抓取的網站摘要

每篇文章 / 案例 / 產品 / 服務頁都有對應 JSON-LD（Article、SoftwareApplication、Service、FAQPage、TechArticle）。

## 待辦

- [ ] OG image `public/og/default.png`（1200×630）
- [ ] Favicon 換成 logo mark
- [ ] 把 ai-dev-notes 內容遷移進 `content/handbook/`
