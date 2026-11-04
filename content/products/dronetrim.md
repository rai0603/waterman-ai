---
title: "DroneTrim"
description: "開源的空拍影片批次粗剪工具，自動剪掉起降晃動與靜止懸停片段。"
slug: "dronetrim"
publishedAt: "2026-06-10"
updatedAt: "2026-11-04"
url: "https://github.com/rai0603/DroneTrim"
status: "live"
category: "tool"
image: "/works/dronetrim.webp"
tags: ["開源", "MIT", "影片處理"]
---

> **TL;DR**：空拍素材頭尾常有一段晃動或靜止的畫面。DroneTrim 用光流偵測找出這些片段，批次粗剪後直接進剪輯軟體。

## 技術亮點

- Python CLI 與 PySide6 圖形介面
- 光流偵測畫面動態
- ffmpeg 無損 copy，或用 VideoToolbox 重新編碼
- 純本機運作，不需要後端
