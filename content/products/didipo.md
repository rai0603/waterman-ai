---
title: "DiDiPo"
description: "AI 社群文案生成與自動排程工具，三家模型可切換。已於 2026 年 8 月停止營運，這裡留存當時的開發畫面。"
slug: "didipo"
publishedAt: "2026-04-07"
updatedAt: "2026-11-04"
status: "archived"
category: "platform"
image: "/works/didipo.webp"
tags: ["SaaS", "社群行銷", "已停止營運"]
---

> **專案狀態**：2026 年 8 月停止營運，後端已關閉，服務不再提供。

> **TL;DR**：DiDiPo 是給「想用 AI 寫文案但不想被綁單一供應商」的社群小編。一個介面接 OpenAI、Anthropic、Google 三家多個模型，自動排程發到 FB / IG / Threads。

## 當時的目標用戶

- 自己經營品牌的個人創作者
- 中小企業的 1 人社群行銷
- 經營多個粉專的代理商
- 想 A/B 測試不同 AI 模型寫法的內容團隊

## 當時做了什麼

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

Meta App Review 沒有完成，發文授權當時只開放給測試帳號。

## 技術亮點

- 全靜態前端 → Cloudflare Pages，全球 CDN
- Supabase Edge Functions 接 LLM API
- Meta Graph API + Threads API 直接呼叫，不過 Buffer 等中間層
- 推薦碼系統（DIDIPO + 6 碼）

## 想做類似的 SaaS？

DiDiPo 全套技術棧（Vite + Supabase + Edge Functions + Cloudflare Pages）是我們[客製化開發](/services)常用的起手式。

[預約諮詢 →](/contact)
