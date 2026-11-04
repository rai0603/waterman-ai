---
title: "AI-妹嘻：聊天生成你的專屬 AI 名片網站"
description: "活動場域 30-50 人並發的 AI 應用，從 Phase 1 個人版到 Phase 4 場域整合的完整工程紀錄。"
slug: "ai-match-case"
publishedAt: "2026-04-20"
updatedAt: "2026-11-04"
image: "/works/ai-match.webp"
author: "Rai"
client: "自家 SaaS（內部產品）"
outcome: "ISR 砍 90% Supabase egress、活動場域流程與聯盟行銷上線"
techStack: ["Next.js 15", "Supabase", "Anthropic Claude", "Cloudflare"]
tags: ["SaaS", "AI 內容生成", "案例研究"]
---

> **TL;DR**：AI-妹嘻幫職人用聊天的方式生成自己的數位名片網站。從個人版做起，演進到「活動場域名片牆」 ——  本文記錄 4 個 Phase 的決策、踩坑與優化。

## 專案背景

| | |
|---|---|
| 客戶 | 自家 SaaS |
| 場景 | 職人（攝影師、設計師、運動教練、業務⋯）需要「能 demo、能改、能分享」的線上名片 |
| 開工日 | 2026-03-20 |
| Phase 1 上線 | 2026-04-23 |
| 網域 | ai-match.cc（部署在 Cloudflare）|

## 痛點與目標

職人現有選擇的痛點：

- Linktree 太簡單、不夠像「網站」
- WordPress 太複雜、要學一週
- Notion / Webflow 要付 $10+/月
- **想要：聊個天就能生成**

## 我們的方法

### 整體架構

```
[活動 QR] → /e/[code] → /create chatroom
                          ↓ 跟 Claude 對話 5 分鐘
                          ↓ 後端生成名片資料 + slug
[使用者] /m/[slug] (ISR 60s 快取)
[管理者] /dashboard 編輯名片
[活動主辦] /event/[code] 名片牆
```

### Phase 演進

#### Phase 1：個人名片版（已上線）

- Landing `/` + Chatroom `/create` 路由分離
- 後端 `/api/generate` 同步呼叫 Anthropic
- ISR `/m/[slug]` 60 秒快取
- 為什麼分離路由？QR → /e/[code] → /create 少一跳，活動使用 UX 更順

#### Phase 2：付費系統

- B2C 年繳方案
- B2B 主辦方配額 Rai 手動發放（避免做太複雜的 admin）

#### Phase 3：聯盟行銷（已上線）

- 付費訂戶抽佣 20%、last-click 30 天歸因
- NT$5000 門檻人工匯款
- 所有名片底部浮水印永遠顯示（轉化漏斗 30 天觀察）

#### Phase 4：活動場域名片牆

關鍵挑戰：**30–50 人尖峰同時生成名片，AI 不能同步阻塞**。

解法：
1. `/api/generate` 改成「立刻回 job_id、放到 queue」
2. 背景 worker 跑 Claude 生成
3. 前端 polling job 狀態

## 關鍵決策紀錄

### 決策 1：ISR 60 秒 vs SSR

ISR `revalidate: 60` 對「名片頁」是完美策略：

| | SSR | ISR 60s |
|---|---|---|
| Supabase egress | 每次 view 都 query | 1 分鐘 1 次 |
| 編輯後生效時間 | 立即 | 60 秒（搭 `revalidatePath` 立即清）|

**結論：egress 砍 90%+**。對純展示型內容站，ISR 永遠優於 SSR。

### 決策 2：RLS 策略

讀靠 RLS、寫靠 API + service role。

過去 RLS 設計常與業務邏輯衝突（例如「免費版只能存 1 張、付費版 5 張」這種規則寫進 RLS 會超亂）。改成：
- **讀**：RLS 只控「誰能看」（owner / public / event member）
- **寫**：API endpoint 用 service role + 業務邏輯驗證

### 決策 3：In-app browser 偵測

LINE / FB / IG 內建瀏覽器無法跑 Google OAuth（被擋）。

第一版上線就加了 UA 偵測：
- 偵測到內建瀏覽器
- 顯示「請開 Safari / Chrome」提示
- 雙寫 localStorage（含 ts 過期）保 OAuth state

這個坑早期沒踩，後來吃過苦才回頭加。**新網站第一版就要做。**

## 量化成果

| 指標 | 數字 |
|---|---|
| Phase 1 上線時間 | 5 週 |
| 活動場域設計目標 | 30–50 人尖峰 |
| Supabase egress 優化 | 砍 90%+ |
| 聯盟行銷漏斗 | 30 天 last-click |

## 用了哪些技術棧

`Next.js 15` `App Router` `TypeScript` `Tailwind CSS` `Supabase` `Postgres` `Anthropic Claude` `Cloudflare` `ISR` `Webhook`

## 想做類似專案？

「AI + 個人化內容生成 + 場域應用」是非常豐富的題目。如果你有特定垂直市場想做（職場、教育、運動、活動），歡迎來聊。

[預約 30 分鐘諮詢 →](/contact)
