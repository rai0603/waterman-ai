---
title: "Claude Code 實戰課程站"
description: "Claude 工作流課程的招生與報名網站，含梯次報名、優惠碼與後台管理。"
slug: "claude-code-class"
publishedAt: "2026-05-31"
updatedAt: "2026-11-04"
url: "https://claude.waterman-sports.com"
status: "live"
category: "website"
image: "/works/claude-code-class.webp"
tags: ["網站", "課程", "報名系統"]
---

> **TL;DR**：把開發 AI 產品的流程整理成實體課程，招生頁、報名、優惠碼和後台都是自己做的。

## 核心功能

- 課程介紹與學員作品集
- 半日班、一日班報名
- 折扣碼與後台名單管理

## 技術亮點

- 靜態前端，後端走 Supabase
- 資料表全部鎖 RLS，只透過 SECURITY DEFINER RPC 存取，折扣金額在伺服器端計算
