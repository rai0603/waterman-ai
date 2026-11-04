---
title: "水行者預約系統"
description: "戶外活動預約表單，Vite + Apps Script + Google Sheet + LINE 通知，每月營運成本 $0。"
slug: "waterman-booking"
publishedAt: "2026-04-21"
updatedAt: "2026-11-04"
url: "https://book.waterman-sports.com"
status: "live"
category: "website"
image: "/works/waterman-booking.webp"
tags: ["網站", "線上預約", "零成本"]
---

> **TL;DR**：不是每個需求都要買 SaaS。這套預約系統用免費服務組起來，客服原本就在用的 Google Sheet 直接當資料庫。

## 架構

- **前端**：Vite + React + TypeScript + Tailwind
- **後端**：Google Apps Script
- **資料**：Google Sheet，欄位對齊客服既有名單
- **通知**：LINE Messaging API 推播到工作群組
