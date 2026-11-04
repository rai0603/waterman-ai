---
title: "AICMS 功能開發紀錄：一個 CMS 怎麼長成 AI 商務平台"
description: "從內容管理、AI 客服、線上預約到 MCP Gateway，這份紀錄整理 AICMS 的功能模組與開發順序。"
slug: "aicms-case"
publishedAt: "2026-11-04"
updatedAt: "2026-11-04"
author: "Rai"
image: "/works/aicms-plugins.webp"
client: "自家平台"
outcome: "水行者官網正式運作中，內容、預約、排班與 AI 客服都在同一個後台"
techStack: ["Next.js 15", "Turborepo", "Supabase", "Anthropic Claude", "TipTap", "Cloudflare Containers"]
tags: ["SaaS", "CMS", "功能開發", "案例研究"]
---

> **TL;DR**：AICMS 從 2026 年 5 月開工。我們拿自家的水行者海洋運動中心當第一個租戶，碰到真實需求就做成功能，再包成其他行業也能用的外掛。

## 為什麼要做

WordPress 是為「給人看」設計的網站系統。當客人開始問 AI 而不是問 Google，網站要讓 AI 讀得懂、引用得到，最好還能直接完成交易。這些事很難靠外掛補在舊架構上，所以我們從結構開始重做。

## 架構

| 層 | 內容 |
|---|---|
| 應用 | 客戶網站、客戶後台、平台後台，共 3 個 Next.js App |
| 共用模組 | 21 個 packages，包含 schema 引擎、編輯器、外掛 SDK 與各功能外掛 |
| 多租戶 | 依網域判斷租戶，每個租戶有自己的網站、後台與資料隔離 |
| 部署 | 2026 年 11 月全部搬到 Cloudflare Containers |

![AICMS 外掛市集](/works/aicms-plugins.webp)

## 功能模組

### 內容與 GEO

後台用 TipTap 做區塊編輯器，寫內容時可以直接請 AI 補 FAQ、產生 SEO 描述。發佈時系統自動產出 JSON-LD 結構化資料和 llms.txt。

上線前有一份 GEO／AEO 自檢清單，會掃描 robots.txt、llms.txt、sitemap 和 schema，告訴你哪些該補。

![內容編輯器](/works/aicms-editor.webp)

![上線前 GEO／AEO 自檢](/works/aicms-checklist.webp)

另外內建 36 套版型，涵蓋水上運動、旅宿、餐飲、醫美、專業顧問等行業。

### AI 客服 × 線上預約

客服不只回答問題，還能完成訂單。訪客問「週六有空位嗎」，AI 透過工具查時段、算金額，再推出確認卡。

我們刻意不讓 AI 直接建立訂單。AI 只能準備草稿，由訪客自己按下確認，這樣金額和資料都不會只靠模型判斷。訪客也可以改走表單，或轉 LINE 真人客服。

知識庫分成手動和自動條目，重新掃描網站時不會覆蓋人工寫好的答案。

![AI 客服知識庫](/works/aicms-kb.webp)

水行者官網的客服也接上了 Live2D 虛擬人和語音，訪客可以直接看著角色對話。沒有用 AICMS 架站的外部網站，也能用 iframe 掛上同一套客服。

### MCP Gateway

每個租戶開通後都有自己的 MCP endpoint，Claude、ChatGPT 這類 AI agent 可以直接查服務、查時段、送出預約。

- 用 `/.well-known/mcp.json` 讓 agent 找得到服務
- 自己實作 JSON-RPC 2.0 dispatcher，因為官方 SDK 的 transport 和 Next.js Route Handler 型別不相容
- agent 建立的預約先進待確認，由客人用 email 連結確認

![MCP Gateway 設定](/works/aicms-mcp.webp)

### 預約、排班與報到

這一塊來自水行者每天的營運需求：

- **訂單管理**：狀態細分、客服與教練各有自己的 portal
- **排班**：週視圖班表、教練自選帶團、同時段衝突檢查
- **候補**：正取釋出時自動遞補，出發前 24 小時鎖定自助取消
- **QR 報到**：客人有永久票券頁，帶隊教練現場掃碼報到
- **出團費用統計**：自動計算每位教練的已出團費用，邊界案例有單元測試

![排班週視圖](/works/aicms-schedule.webp)

### 其他行業外掛

- **門診掛號（Beta）**：診次批次建立、線上掛號、現場叫號台
- **金流（Beta）**：用 provider adapter 架構接金流，支援綠界

### WordPress 匯入

優先走 WordPress REST API 拿乾淨資料，失敗時改用 sitemap 與 HTML 解析，再把內容轉成編輯器的格式。

### 內建流量分析

GA4 不適合跨租戶使用，所以我們自己做了一套。除了社群和搜尋引擎，也能辨識來自 ChatGPT、Claude、Perplexity 等 AI 的流量。訪客識別用每日更換 salt 的雜湊，不保存個資。

![內建流量分析](/works/aicms-analytics.webp)

### 場館導覽機台

[Soma 導覽機台](/works/soma-case)的問答走 AICMS 知識庫。訪客問附近有什麼好玩的，回覆會帶地點卡片和導航 QR。平台策展的地點庫和租戶自己的知識庫分開檢索，問課程時不會撈到景點。

## 開發時間軸

| 時間 | 里程碑 |
|---|---|
| 2026-05-03 | 專案啟動 |
| 2026-05-12 | 客戶後台上線、MCP Gateway 上線 |
| 2026-05-13 | AI 客服接上預約工具 |
| 2026-05-14 | 門診掛號外掛 |
| 2026-05-15 | 排班候補名單、叫號台 |
| 2026-05-19 | 內建流量分析、Search Console 串接 |
| 2026-05-26 | 金流外掛 |
| 2026-05-27 | QR 報到 |
| 2026-05-28 | 外站 AI 客服 widget |
| 2026-06-12 | 版型擴充到 36 套 |
| 2026-06-18 | Live2D 語音 AI 客服上線 |
| 2026-07-19 | 教練出團費用統計 |
| 2026-10-06 | 景點美食推薦 |
| 2026-11-04 | 全部網域切到 Cloudflare Containers |

## 我們學到的事

- **先在真實場館用**：水行者每天的訂單和排班，比任何規格書都更快暴露問題
- **AI 負責理解，系統負責決定**：金額、時段和成交都由程式計算，AI 不直接下單
- **能當外掛就別寫死**：預約、客服、排班都做成可依行業啟用的模組

## 想做類似專案？

如果你的行業也有預約、排班或客服需求，想讓 AI 真的接手工作，歡迎來聊。

[看 AICMS 產品介紹 →](/products/aicms)

[預約 30 分鐘諮詢 →](/contact)
