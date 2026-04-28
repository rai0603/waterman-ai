---
title: "AI-妹嘻"
description: "5 分鐘聊天生成你的 AI 專屬名片網站，活動場域用得最多的職人線上名片。"
slug: "ai-match"
publishedAt: "2026-04-23"
updatedAt: "2026-04-28"
url: "https://ai-match.cc"
status: "live"
tags: ["SaaS", "個人品牌", "AI 內容生成"]
---

> **TL;DR**：AI-妹嘻幫職人在 5 分鐘聊天就生成自己的數位名片網站。攝影師、運動教練、設計師、業務、仲介都用得上。活動場域名片牆功能整合中。

## 給誰用

- 攝影師 / 設計師 ——  把作品集整理成一頁式
- 運動教練 / 健身房 ——  快速建立預約頁
- 業務 / 仲介 ——  替代名片，打 QR 直接看
- 活動主辦方 ——  讓 30–50 位參加者快速建立個人名片牆

## 核心功能

### 1. 5 分鐘聊天生成

- Claude 對話介面引導
- 自動生成：自介、服務、作品、聯絡資訊
- 即時預覽 + 一鍵調整風格

### 2. ISR 加速名片頁

每張名片頁 `/m/[slug]` 採 ISR 60 秒快取，熱門名片 PV 共享，效能飛快、Supabase 用量超低。

### 3. 多名片管理（規劃中）

同一個 user 可發多張名片（例如不同身分：教練版 / 攝影版）。付費解鎖每多一張的功能。

### 4. 活動場域名片牆（整合中）

- 主辦方建活動 → 拿到 QR
- 現場參加者掃 QR → 進 chatroom 5 分鐘建名片
- 主辦方 dashboard 看所有人名片
- Phase 4.5 高併發：30–50 人同時生成不阻塞

### 5. 聯盟行銷

- 任何 user 拿推薦連結
- 付費訂戶抽佣 20%、last-click 30 天
- NT$ 5000 門檻人工匯款
- 所有名片底部浮水印永遠顯示

## 訂閱方案

| 方案 | 月費 | 名片數 | 自訂網域 |
|---|---|---|---|
| Free | NT$ 0 | 1 | 否 |
| Pro | NT$ 199 | 3 | 是 |
| Studio | NT$ 599 | 10 | 是 |
| Event | 個案議定 | — | — |

## 技術亮點

- Next.js 15 App Router + Vercel-style ISR
- Supabase Postgres + RLS（讀靠 RLS、寫靠 API）
- Anthropic Claude 對話生成
- Paddle 訂閱金流
- Cloudflare DNS + Zeabur 部署

## 立即試用

[https://ai-match.cc →](https://ai-match.cc)

免費版可建 1 張名片永久免費。

## 想做類似的個人化內容生成 SaaS？

「AI 對話 → 結構化內容 → ISR 展示」是非常可複製的 pattern。如果你的垂直市場有相似需求，[歡迎來聊](/contact)。
