---
title: "Soma Agent 開發紀錄：從網站客服角色到 iPhone App"
description: "AICMS 的 Live2D 客服，後來長成桌面夥伴、iPhone App 與場館導覽機台。這份紀錄整理同一個角色引擎的三種產品形態。"
slug: "soma-case"
publishedAt: "2026-11-04"
updatedAt: "2026-11-05"
author: "Rai"
image: "/works/soma-agent.webp"
client: "自家產品"
outcome: "iPhone 版 2026-10-21 上架 App Store，macOS 桌面版可從官網下載"
techStack: ["Tauri 2", "Rust", "TypeScript", "three.js", "VRM", "Live2D"]
tags: ["App", "iOS", "macOS", "案例研究"]
---

> **TL;DR**：做 AICMS 語音客服時，我們發現「有臉、有聲音的 AI」本身就是一個產品。於是把角色引擎抽出來，做成桌面夥伴，再帶到 iPhone 和場館機台。

## 專案背景

| | |
|---|---|
| 來源 | AICMS 的 Live2D 語音客服 |
| 產品名 | Soma Agent，Soma 是希臘文的「身體」 |
| 標語 | Agent in the Shell |
| 官網上線 | 2026-07-10 |
| iPhone 版上架 | 2026-10-21 |

## 三種產品形態

### macOS 桌面版

角色常駐在桌面上，Live2D 和 VRM 兩種引擎都支援。兩個角色可以自己對談，使用者在旁邊看，也能隨時插話。

桌面版採 BYOK，使用者自帶 AI 金鑰，由本機直接連線。金鑰存在系統 keychain，不進入 WebView。

### iPhone 版

iPhone 版改成代管 AI，使用者裝好就能聊，不需要自己申請金鑰。

- 3D VRM 角色，語音回覆搭配嘴型同步
- 每個角色有獨立的個性、聲線和記憶
- 需要最新資訊時會上網搜尋

![Soma iPhone 版主畫面](/works/soma-ios-hero.webp)

![Soma 多角色畫面](/works/soma-ios-multi.webp)

### 場館導覽機台

同一份核心打包成 iPad 版，放在場館裡當導覽員。訪客在 iPad 上開口或打字，大電視同步顯示角色和回答。機台不帶任何 AI 金鑰，問答走 [AICMS 知識庫](/works/aicms-case)，內容由場館在後台維護。

![機台的電視展示面](/works/soma-kiosk-tv.webp)

電視用 HDMI 接在 iPad 上。iPadOS 預設只會鏡像畫面，所以我們在 Rust 層開第二個視窗，載入 iPad 本機伺服器上的展示頁，兩個畫面的同步走本機迴路，不經過網路。

[看 SOMA AI 導覽機台介紹 →](/products/soma-kiosk)

## 技術決策

### 為什麼用 Tauri

桌面版用 Rust 外殼加系統 WebView，呼叫 AI 的動作放在 Rust 層，金鑰不會進到前端。iPhone 版同樣用 Tauri 2。

### 一份核心，兩個 iOS target

陪伴版和機台版共用同一份 iOS 專案，打包時用腳本切換 target。差異集中在裝置範圍、金鑰策略和通路，核心功能只維護一份。

### 最低支援 iOS 15

角色渲染需要 WebGL2，而 WebGL2 從 iOS 15 才預設開啟，所以這是硬門檻。

### 授權後端獨立成服務

授權與序號放在獨立服務 `license.soma-agent.com`，跑在 Cloudflare Containers 上。

## 用了哪些技術棧

`Tauri 2` `Rust` `TypeScript` `Vite` `three.js` `three-vrm` `Live2D Cubism` `Azure Speech` `Cloudflare Containers` `Neon`

## 想做類似專案？

如果你想讓 AI 有形象、有聲音，放進 App 或實體場域，歡迎來聊。

[看 Soma Agent 產品介紹 →](/products/soma-agent)

[預約 30 分鐘諮詢 →](/contact)
