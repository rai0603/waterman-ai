---
title: "快速上手：從 idea 到第一個 AI 功能"
description: "給第一次接觸 AI 產品開發的 PM / 工程師，最短的學習路徑。"
slug: "getting-started"
chapter: "01"
order: 1
publishedAt: "2026-04-28"
updatedAt: "2026-04-28"
author: "Rai"
tldr: "AI 產品的第一個功能不是「最炫的功能」，而是「資料流最清楚、最可被驗證的功能」。建議從文字摘要、客服 FAQ、或內部文件搜尋這三類選一個切入。"
---

> **TL;DR**：AI 產品的第一個功能不是「最炫的功能」，而是「資料流最清楚、最可被驗證的功能」。建議從文字摘要、客服 FAQ、或內部文件搜尋這三類選一個切入，2 週內可以拿到第一個能 demo 的版本。

## 你在這章會學到什麼

- AI 功能的三種起手式（怎麼選）
- 第一次串 LLM API 的最小可行程式（複製即用）
- 上線前必檢查的 5 件事

## AI 功能的三種起手式

如果你完全是新手，**從這三類選一個開始就對了**：

### 1. 文字摘要 / 整理

| 適合場景 | 為什麼適合 |
|---|---|
| 會議逐字稿摘要 | 輸入輸出邊界清楚 |
| 客戶 email 重點抽取 | 失敗成本低 |
| 長文件 TL;DR 生成 | 不需要 RAG，single prompt 即可 |

### 2. 客服 / FAQ Bot

| 適合場景 | 為什麼適合 |
|---|---|
| 已有 100+ 篇文件的客服中心 | 有訓練資料 |
| 重複問題佔比 60%+ | ROI 易計算 |
| 容錯空間大（轉真人 fallback） | 失敗有救 |

### 3. 內部文件搜尋

| 適合場景 | 為什麼適合 |
|---|---|
| 公司內網有大量文件 | 資料歸你掌控 |
| 員工常找不到資料 | 痛點明確 |
| 不需對外曝光 | 風險低 |

**新手陷阱**：千萬不要第一個專案就做「AI Agent」、「自動執行任務」、「RAG + Tool Use」 ——  失敗率 90%。

## 第一支 LLM API 程式

這是用 Anthropic Claude 的最小例子（Node.js）：

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function summarize(text: string) {
  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `請把以下文字摘要成 3 個要點：\n\n${text}`,
      },
    ],
  });
  return msg.content[0].type === "text" ? msg.content[0].text : "";
}
```

幾個重點：

1. **用 Haiku 開始**，不要一開始就用 Sonnet/Opus，便宜快 100 倍
2. **限制 max_tokens**，避免被吃 token
3. **環境變數放 API key**，絕不 hardcode

## 上線前必檢查的 5 件事

1. **錯誤處理** ——  API 會 timeout、會 429、會 500，你的程式要 retry / fallback
2. **成本上限** ——  在帳號層級設預算 alert，避免被 prompt injection 燒爆
3. **PII 過濾** ——  使用者 input 前先移除信用卡、身分證、私密號碼
4. **回應審查** ——  不該說的東西用 `system prompt` 明確禁止 + 後處理過濾
5. **Log 與 trace** ——  每次呼叫存（input, output, model, tokens, latency），出包時才查得到

## 下一步

讀完這章，建議接著看：

- [AI MVP 藍圖](/handbook/ai-mvp-blueprint) ——  從 idea 到上線的路線圖
- [Prompt 工程實戰](/handbook/prompt-engineering-basics) ——  寫 prompt 的具體方法

如果有 idea 但不確定怎麼開始，[寫信給我們](/contact) 聊 30 分鐘，免費。
