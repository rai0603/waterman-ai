# Waterman AI Dev Studio — 官方網站

水行者運動國際有限公司 — AI 原生開發部門對外官網。

- **Production**：https://waterman-ai.cc（部署中）
- **技術棧**：Next.js 16 + Tailwind v4 + TypeScript + 純靜態 export
- **部署**：Cloudflare Pages

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

改 `src/lib/services.ts` 的 `services` array。`/services/[slug]` 路由自動生成。

## 部署到 Cloudflare Pages

### 第一次設定

1. **建 GitHub repo** 並 push（或用 `gh repo create`）
2. **登入 Cloudflare Dashboard** → Workers & Pages → Create → Pages → Connect to Git
3. **選 repo**，Production branch: `main`
4. **Build settings**：
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: `20` 或 `22`
5. **Custom domain**：Pages project → Custom domains → 加 `waterman-ai.cc`（Cloudflare DNS 同帳號會自動 provision）
6. **每次 push 到 main 自動 deploy**。

### Contact form 後端（待實作）

目前表單會 POST 到 `/api/contact` 但無對應 endpoint，會 fallback 顯示 mailto 連結。要啟用實際寄信：

1. 在 repo 新建 `functions/api/contact.ts`（Cloudflare Pages Function）
2. 整合 Resend：
   ```typescript
   export async function onRequestPost({ request, env }) {
     const data = await request.json();
     const res = await fetch("https://api.resend.com/emails", {
       method: "POST",
       headers: {
         "Authorization": `Bearer ${env.RESEND_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         from: "noreply@waterman-ai.cc",
         to: "rai0603@gmail.com",
         subject: `[詢價] ${data.name} from ${data.company || "—"}`,
         text: JSON.stringify(data, null, 2),
       }),
     });
     return new Response(null, { status: res.ok ? 200 : 500 });
   }
   ```
3. 在 Cloudflare Pages → Settings → Environment variables 加 `RESEND_API_KEY`
4. Resend dashboard 驗證 `waterman-ai.cc` domain（DNS 加 SPF + DKIM 紀錄）

## SEO 與 AEO 檔案

部署後可驗證：
- `/sitemap.xml` ——  動態生成所有 routes
- `/robots.txt` ——  允許所有 LLM bots
- `/llms.txt` ——  給 LLM 抓取的網站摘要

每篇文章 / 案例 / 產品 / 服務頁都有對應 JSON-LD（Article、SoftwareApplication、Service、FAQPage、TechArticle）。

## 待辦

- [ ] OG image `public/og/default.png`（1200×630）
- [ ] Favicon 換成 logo mark
- [ ] Contact form 後端（Cloudflare Pages Function + Resend）
- [ ] 把 ai-dev-notes 內容遷移進 `content/handbook/`
- [ ] 註冊 `waterman-ai.cc` 並設 Cloudflare DNS
