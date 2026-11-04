@AGENTS.md

# 專案：Waterman AI Dev Studio 官網

水行者運動國際有限公司 — AI 開發部門的接案網站。定位是專接客製化開發，沒有固定方案，依需求個案報價。

## 技術棧

| 層級 | 選擇 |
|---|---|
| 框架 | Next.js 16 App Router (注意：不是 15，breaking change 多，寫前讀 `node_modules/next/dist/docs/`) |
| 樣式 | Tailwind CSS v4（@theme inline，不是 v3 的 config-based） |
| 字型 | Noto Sans TC（細體大字與內文）+ Martian Mono（HUD 標籤）+ Syncopate（字標） |
| 動畫 | three.js 全站粒子系統，邏輯在 `src/lib/particles/`，`engine.ts` 只在瀏覽器載入 |
| 內容 | MDX 用 gray-matter + react-markdown（不用 Velite/Contentlayer） |
| 表單 | react-hook-form + zod |
| 部署 | Cloudflare Workers Static Assets（`output: 'export'` 純靜態，設定在 `wrangler.jsonc`）|
| 網域 | ai.waterman-sports.cc（集中在 `src/lib/site.ts`）|

## 重要決策

- **靜態 export 為主**：`next.config.ts` 設 `output: 'export'`，所有頁面 prerender 成 HTML。唯一的動態路徑是 `/api/contact`，由 `worker/` 處理。
- **沒有資料庫**：純內容站，content 用 markdown 在 `content/` 下，由 `lib/content.ts` 掃描。
- **詢問表單**：`worker/` 用 Cloudflare `send_email` 寄到 rai0603@gmail.com，免第三方金鑰。需要 waterman-sports.cc 的 Email Routing 保持開啟。欄位驗證共用 `src/lib/inquiry.ts`。
- **設計風格 = 科幻介面（FUI）**：近黑底、單一訊號橘，細線格與 HUD 標籤，參考《銀翼殺手 2049》《異星入境》與硬科技公司。Rai 否決過米白底加粗宋體的雜誌風，嫌太像 AI 生成。色彩與 `.display`、`.eyebrow`、`.btn`、`.frame`、`.panel` 在 `globals.css`；自訂類別要放在 `@layer components`，否則會蓋過 Tailwind 的 `hidden` 等 utility。
- **粒子形態由 `data-scene` 控制**：畫面中線碰到哪個區塊，粒子就變成該形態（globe、taiwan、trident、lattice、wave、field），參數在 `scenes.ts`。文字區塊要加 `.panel` 底板避免壓到粒子。
- **地圖資料**：`public/data/*.bin` 由 `scripts/generate-map-data.mjs` 從 Natural Earth 產生。座標只到縣市層級，不標精確地址。
- **HUD 只放真實資料**：作品數由內容計算、台北時間、縣市座標，不放假數據。
- **對外承諾只有「第一次諮詢 30 分鐘免費」**：不寫價格，也不寫原始碼歸屬、保固、交付時程、回覆時效。
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
    ├── site.ts             # 正式站網址，換網域只改這裡
    ├── content.ts          # markdown scan + parse
    ├── inquiry.ts          # 詢問表單 schema，前後端共用
    └── services.ts         # 能力清單、合作流程、FAQ

content/                    # markdown 內容
├── blog/  handbook/  works/  products/

worker/                     # /api/contact，其餘請求走靜態檔
├── index.ts                # 入口與 Cloudflare binding
├── handle-contact.ts       # 請求處理，可注入依賴測試
└── inquiry-email.ts        # 組 MIME 信件
```

## 加新內容

直接在 `content/<type>/` 新增 .md 檔，frontmatter 必含 `title`、`slug`、`publishedAt`。
- `handbook/` 加 `chapter`、`order`、`tldr`
- `works/` 加 `client`、`outcome`、`techStack`
- `products/` 加 `status`、`category`（platform／app／website／tool）、`image`
- 上線中的產品加 `url`；`status: "archived"` 不放 `url`，只放開發畫面截圖
- 截圖放 `public/works/`（webp，寬 1200）。用後台截圖前先確認沒有客戶個資
- 寫數字前要有來源，不要放查不到的註冊數、付費數或用戶見證

頁面會自動掃描，generateStaticParams 自動產生 routes。Build 即可。

## 加新能力

改 `src/lib/services.ts` 的 `capabilities`，每一項都要有實際作品佐證。首頁與 `/services` 會自動更新。

## 部署

```bash
npm run deploy  # build 後用 wrangler 部署到 ai.waterman-sports.cc
```

- 沒有接 Git 自動部署，push 不會上線，要跑 `npm run deploy`
- deploy 腳本會清掉 `CLOUDFLARE_API_TOKEN`，因為 `~/.zshenv` 的 token 權限不含這個 zone，要用 wrangler OAuth 登入

## 待辦

- [ ] OG image：`public/og/default.png`（1200×630）—  目前 metadata 已 reference 但檔案沒生
- [ ] favicon：`public/favicon.ico` 換成 logo mark
- [ ] 把 ai-dev-notes 真實內容遷移進 `content/handbook/`
