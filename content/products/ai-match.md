---
title: "AI-妹嘻"
description: "聊天就能生成的 AI 專屬名片網站，支援活動場域名片牆。"
slug: "ai-match"
publishedAt: "2026-04-23"
updatedAt: "2026-11-05"
url: "https://ai-match.cc"
status: "live"
category: "platform"
image: "/works/ai-match.webp"
tags: ["SaaS", "個人品牌", "AI 內容生成"]
videos:
  - file: "ai-match-card.mp4"
    title: "手機實錄：聊幾句就生成數位名片"
    poster: "/works/poster-ai-match-card.webp"
    width: 720
    height: 1564
    duration: 17
    uploadDate: "2026-04-27"
    featured: true
---

> **TL;DR**：AI-妹嘻幫職人用聊天的方式生成自己的數位名片網站。攝影師、運動教練、設計師、業務、仲介都用得上，也支援活動場域名片牆。

## 給誰用

- 攝影師 / 設計師 ——  把作品集整理成一頁式
- 運動教練 / 健身房 ——  快速建立預約頁
- 業務 / 仲介 ——  替代名片，打 QR 直接看
- 活動主辦方 ——  讓 30–50 位參加者快速建立個人名片牆

## 核心功能

### 1. 聊天生成

- Claude 對話介面引導
- 自動生成：自介、服務、作品、聯絡資訊
- 即時預覽 + 一鍵調整風格

### 2. ISR 加速名片頁

每張名片頁 `/m/[slug]` 採 ISR 60 秒快取，熱門名片 PV 共享，效能飛快、Supabase 用量超低。

### 3. 多名片管理

同一個使用者可發多張名片（例如不同身分：教練版 / 攝影版），依付費方案而定。

### 4. 活動場域名片牆

- 主辦方建活動 → 拿到 QR
- 現場參加者掃 QR → 進聊天室建名片
- 主辦方 dashboard 看所有人名片
- 設計目標：30–50 人同時生成不阻塞

### 5. 聯盟行銷

- 任何 user 拿推薦連結
- 付費訂戶抽佣 20%、last-click 30 天
- NT$ 5000 門檻人工匯款
- 所有名片底部浮水印永遠顯示

## 方案

方案與價格以[官網](https://ai-match.cc/pricing)為準。

## 技術亮點

- Next.js 15 App Router + Vercel-style ISR
- Supabase Postgres + RLS（讀靠 RLS、寫靠 API）
- Anthropic Claude 對話生成
- 部署在 Cloudflare

## 想做類似的個人化內容生成 SaaS？

「AI 對話 → 結構化內容 → ISR 展示」是非常可複製的 pattern。如果你的垂直市場有相似需求，[歡迎來聊](/contact)。
