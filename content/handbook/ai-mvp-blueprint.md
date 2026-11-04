---
title: "AI MVP 藍圖：從規格到上線的可行路線"
description: "把一個 AI idea 收斂成可運行 MVP 的實戰時間表。"
slug: "ai-mvp-blueprint"
chapter: "02"
order: 2
publishedAt: "2026-04-28"
updatedAt: "2026-04-28"
author: "Rai"
tldr: "AI MVP 能不能快速上線，關鍵在規格是否收斂、技術選型是否守 KISS。實際時程依個案範圍而定。"
---

> **TL;DR**：AI MVP 能不能快速上線，關鍵在規格是否收斂、技術選型是否守 KISS。實際時程依個案範圍而定。

## 為什麼第一週最重要

**MVP 拖很久，通常代表規格沒收斂。**

我們的觀察：

- W1 規格沒寫清楚 → W2-W4 一直返工 → 變 W6-W8
- W1 規格 freeze → W2-W3 開發 → W4 上線 → 真實使用回饋接著做 W5+

差別在 W1。

## 一個參考時程

以下是小型 MVP 的參考排程，不是固定承諾，實際時程依個案範圍而定。

### Week 1：規格 freeze

| 動作 | 產出 |
|---|---|
| 需求訪談（2 場 1 hr） | 痛點 / 目標 / 成功定義 |
| 場景剖析 | 1–3 個高優先 user story |
| 技術選型 | 模型、框架、部署、資料層 |
| 簽收規格書 | 含驗收條件、out-of-scope、報價 |

**關鍵**：規格書要可被「拒絕」 ——  用列舉法寫「我們交付什麼、不交付什麼」，避免後期爭議。

### Week 2–3：開發 + 週報

每週固定流程：

- **週一**：sprint planning（30 min）
- **週中**：日常開發 + Slack / Email 隨時溝通
- **週四**：demo 給客戶看（30 min）+ 收集 feedback
- **週五**：依 feedback 調整下週

**禁止項目**：
- 不要「隱藏式開發」 ——  做完一週才給看
- 不要「不在規格內順手加」 ——  寫進 changelog 留下次

### Week 4：上線 + 部署

| Day | 動作 |
|---|---|
| Day 1 | 部署到 staging，full UAT |
| Day 2-3 | 修 critical bug |
| Day 4 | 上 prod、監控啟動 |
| Day 5 | 交接會、文件交付 |

## 哪些情況需要更長時間

時程拉長通常是因為：

1. **多模型整合**（同時用 GPT + Claude + 本地模型）
2. **資料量大需 RAG**
3. **金流 / 合規 / 客服整合**
4. **多語系**

範圍太大時，**可以拆成 MVP 和後續階段**，先上線再迭代。

## 技術選型 KISS 原則

| 層級 | 預設選擇 | 何時換 |
|---|---|---|
| 前端 | Next.js + Tailwind | 別想換 |
| 後端 | Node.js + tRPC / Hono | Python 強需求才換 |
| 資料庫 | Supabase（Postgres + Auth + Storage 一站） | 自架需求才換 |
| LLM | Claude Haiku 起步 | 品質不夠再換 Sonnet |
| 部署 | Cloudflare | 規模大再上 AWS |

**80% 的 MVP 不需要更複雜的技術棧。**

## 真實案例參考

- [DiDiPo](/works/didipo-case) ——  社群 AI 文案 + 自動排程
- [AI-妹嘻](/works/ai-match-case) ——  職人 AI 名片，含活動場域整合

## 下一步

- 想開始你的 MVP？[預約 30 分鐘諮詢](/contact)
- 想自己先動手？讀 [Prompt 工程實戰](/handbook/prompt-engineering-basics)
