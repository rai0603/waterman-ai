---
title: "DiDiPo"
description: "AI 社群文案生成 + 自動排程，三家 6 個模型可切換的多平台社群管理工具。"
slug: "didipo"
publishedAt: "2026-04-07"
updatedAt: "2026-04-28"
url: "https://didipo.com"
status: "live"
tags: ["SaaS", "社群行銷", "AI 文案"]
---

> **TL;DR**：DiDiPo 是給「想用 AI 寫文案但不想被綁單一供應商」的社群小編。一個介面接 OpenAI、Anthropic、Google 三家共 6 個模型，自動排程發到 FB / IG / Threads。

## 給誰用

- 自己經營品牌的個人創作者
- 中小企業的 1 人社群行銷
- 經營多個粉專的代理商
- 想 A/B 測試不同 AI 模型寫法的內容團隊

## 核心功能

### 1. 多模型 AI 文案生成

| Slug | 模型 | 適合場景 |
|---|---|---|
| `openai-gpt4o-mini` | gpt-5-mini | 預設、便宜、速度快 |
| `claude-haiku` | claude-haiku-4-5 | 快速 brainstorm |
| `claude-sonnet` | claude-sonnet-4-6 | 品質保證、高難度 |
| `gemini-flash` | gemini-2.5-flash-lite | 最低成本 |
| `gemini-pro` | gemini-2.5-flash | 平衡選擇 |

字數可滑桿調整（非線性，跟著方案點數限制）。

### 2. AI 配圖（Google Imagen 4）

| 模式 | 點數 | 用途 |
|---|---|---|
| Imagen 4 Fast | 5 點 | 草稿 / brainstorm |
| Imagen 4 Standard | 30 點 | 正式發文 |
| Imagen 4 Ultra | 80 點 | 高品質視覺 |

支援「智能解析文案」 ——  按一鍵自動從文案抽取 5 點圖片 prompt。

### 3. 自動排程

- 獨立貼文：選日期時間直接排
- 系列文章：AI 生大綱 → 逐篇可編輯 → 確認後逐篇生成 → 排定發送
- 進度即時顯示，換頁不遺失

### 4. 多平台發送

- Facebook 粉專
- Instagram 商業帳號
- Threads
- 同時發 / 分開排程都可

## 訂閱方案

| 方案 | 月費 | 點數 / 月 | 帳號數 |
|---|---|---|---|
| Starter | NT$ 299 | 500 | 3 |
| Pro | NT$ 799 | 2,000 | 10 |
| Team | NT$ 1,999 | 6,000 | 30 |

點數可加購（不過期）。

## 技術亮點

- 全靜態前端 → Cloudflare Pages，全球 CDN
- Supabase Edge Functions 接 LLM API（Pro 方案不暫停）
- Meta Graph API + Threads API 直接呼叫，不過 Buffer 等中間層
- 推薦碼系統（DIDIPO + 6 碼）

## 立即試用

[https://didipo.com →](https://didipo.com)

新註冊送 100 點數，可生成 1–2 篇貼文體驗。

## 想做類似的 SaaS？

DiDiPo 全套技術棧（Vite + Supabase + Edge Functions + Cloudflare Pages）是我們 [SaaS 共創落地](/services/saas-co-build) 的標準起手式。

[預約諮詢 →](/contact)
