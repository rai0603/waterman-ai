---
title: "DiDiPo：30 天上線的 AI 社群文案 SaaS"
description: "從 idea 到付費客戶的完整時程紀錄。三家 LLM、6 個模型、自動排程、配圖生成 —— 每個技術選型背後的取捨。"
slug: "didipo-case"
publishedAt: "2026-04-15"
updatedAt: "2026-04-28"
author: "Rai"
client: "自家 SaaS（內部產品）"
outcome: "30 天上線、首月 100+ 註冊、可驗證的訂閱金流"
techStack: ["Next.js", "Vite", "Supabase", "Cloudflare Pages", "Anthropic Claude", "OpenAI", "Google Gemini"]
tags: ["SaaS", "AI 文案", "案例研究"]
---

> **TL;DR**：DiDiPo 是水行者 AI 開發部門的第一個自有 SaaS，30 天內完成從 idea 到付費上線。三家 LLM、6 個模型可切換、Meta + Threads 自動發文 ——  本文記錄每個關鍵決策背後的取捨。

## 專案背景

| | |
|---|---|
| 客戶 | 水行者運動國際（自家） |
| 場景 | 社群小編想用 AI 寫文案 + 自動排程，但擔心被綁單一 AI |
| 開工日 | 2026-03-08 |
| 上線日 | 2026-04-07 |
| 首付費客戶 | 2026-04-12 |

## 痛點與目標

社群行銷團隊每月發文 200+ 篇跨 FB / IG / Threads，痛點：

1. ChatGPT 寫得不錯但 OpenAI ToS 對商業 SaaS 限制多
2. Claude 寫得有質感但 API 成本高
3. Gemini 便宜但中文偶爾失準
4. **想要：一個介面、6 個模型、按需切換**

## 我們的方法

### 技術選型

| 元件 | 選擇 | 為什麼 |
|---|---|---|
| 前端 | Vite + React + Tailwind + shadcn/ui | 快、可控、不被框架綁架 |
| 後端 | Supabase Edge Functions（Deno）| 零維運、自帶 Auth + DB |
| 部署 | Cloudflare Pages（前端）| 免費、CDN 全球 |
| LLM | OpenAI + Anthropic + Google 同時接 | 抽象層 / 統一介面 |
| 金流 | 藍新（規劃中）| 台灣消費習慣 |

### 系統架構

```
[使用者瀏覽器]
    ↓ HTTPS
[Cloudflare Pages — Vite SPA]
    ↓ Supabase Client SDK
[Supabase]
    ├── Postgres（user, posts, schedules）
    ├── Auth（Google OAuth）
    └── Edge Functions
         ├── generate-post  →  OpenAI / Anthropic / Google
         ├── generate-image →  Google Imagen 4
         └── publish-post   →  Meta Graph / Threads API
```

### 關鍵決策

**1. 為什麼 6 個模型不只 2 個？**

| Slug | 模型 | 何時用 |
|---|---|---|
| openai-gpt4o-mini | gpt-5-mini | 預設、便宜 |
| openai-gpt4o | gpt-4o | 高品質長文 |
| claude-haiku | claude-haiku-4-5 | 快速 brainstorm |
| claude-sonnet | claude-sonnet-4-6 | 品質保證 |
| gemini-flash | gemini-2.5-flash-lite | 超低成本 |
| gemini-pro | gemini-2.5-flash | 平衡選 |

讓使用者按 task 選模型，避免「一個 model 通吃」的局限。

**2. 為什麼自己接 Meta API 不用 Buffer？**

- Buffer 月費 $15、限 10 個帳號
- 我們直接呼叫 Meta Graph API：成本 $0、無上限
- 換代價：要自己處理 OAuth + token refresh + webhook

決策依據：客戶數量起來後 Buffer 月費會變大坑。

**3. 為什麼 config.toml 全設 `verify_jwt = false`？**

Supabase Edge Functions 預設驗 JWT，但我們的 OAuth callback 流程在「沒登入」狀態就要呼叫 function。改用「函式內自行驗 JWT」更彈性。

## 量化成果

| 指標 | 30 天內 |
|---|---|
| 上線時間 | 30 天（含金流規劃） |
| Edge Functions 部署 | 4 支 |
| 首月註冊 | 100+ |
| 首付費 | 第 5 天 |
| 平均 LLM 成本 / user / 月 | < NT$ 50 |

## 客戶見證

> 「以前我用 5 個視窗切換 ChatGPT、Claude、Gemini，現在一個介面搞定。最重要的是，**我可以拿排程結果跟老闆證明 ROI**。」 ——  社群行銷小編 A

## 用了哪些技術棧

`Vite` `React` `TypeScript` `Tailwind CSS` `shadcn/ui` `Supabase` `Edge Functions (Deno)` `Anthropic SDK` `OpenAI SDK` `Google Gemini SDK` `Cloudflare Pages` `Meta Graph API` `Threads API`

## 想做類似專案？

如果你有自家品牌想做類似的 SaaS（不必是社群文案，也可以是其他垂直領域），歡迎來聊。

[預約 30 分鐘諮詢 →](/contact)
