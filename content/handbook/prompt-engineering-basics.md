---
title: "Prompt 工程實戰：寫得讓 LLM 能跑、能驗證、能維運"
description: "不講玄學，只講能放進 production 的 prompt 設計法。"
slug: "prompt-engineering-basics"
chapter: "03"
order: 3
publishedAt: "2026-04-28"
updatedAt: "2026-04-28"
author: "Rai"
tldr: "好的 prompt = 角色定義 + 任務描述 + 輸入格式 + 輸出格式 + 範例。能被自動化驗證的 prompt 才是 production-ready。"
---

> **TL;DR**：好的 prompt = 角色定義 + 任務描述 + 輸入格式 + 輸出格式 + 範例。能被自動化驗證的 prompt 才是 production-ready；能放進 PPT 的不算。

## Prompt 工程的兩個世界

**世界 A：medium 教學的 prompt**

- 「You are a 10x engineer⋯」
- 「Take a deep breath, think step by step⋯」
- 「If you do well I'll tip you $200」

這些在 demo 偶爾有效，但不可被驗證、不可被維運、不可被 A/B 測試。

**世界 B：production 的 prompt**

- 角色定義 + 任務 + 輸入 + 輸出格式 + 至少 1 個範例
- 輸出 JSON Schema 嚴格驗證
- 失敗時有 fallback
- 每次改動有 regression test

這章只講世界 B。

## 五段式結構

```
[1] ROLE — 你是誰
[2] TASK — 要做什麼
[3] INPUT — 輸入長什麼樣
[4] OUTPUT — 輸出長什麼樣（含格式）
[5] EXAMPLES — 1–3 個範例
```

實際範例（客服 FAQ 分類）：

```text
[ROLE]
你是水行者運動的客服分流助手。

[TASK]
讀取使用者問題，分類到以下 5 個類別之一：
- BOOKING（預約相關）
- PAYMENT（付款相關）
- WEATHER（天氣 / 退費相關）
- EQUIPMENT（裝備 / 技術相關）
- OTHER（其他）

[INPUT]
使用者訊息（中文或英文，1–500 字）

[OUTPUT]
JSON 格式：
{
  "category": "BOOKING" | "PAYMENT" | ...,
  "confidence": 0–1,
  "reason": "20 字內說明分類依據"
}

[EXAMPLES]
Input: "明天衝浪課還能改嗎？"
Output: {"category":"BOOKING","confidence":0.95,"reason":"提到改課程"}

Input: "颱風天怎麼算？"
Output: {"category":"WEATHER","confidence":0.9,"reason":"颱風相關"}
```

## 三個必做：JSON Schema、Few-shot、Fallback

### 1. 強制 JSON Schema 輸出

不要相信 LLM 會「乖乖回 JSON」 ——  用 SDK 的 structured output 功能：

```typescript
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 200,
  messages: [{ role: "user", content: prompt }],
  // 用 tool use 強制結構化輸出
  tools: [{
    name: "classify",
    description: "Classify customer message",
    input_schema: {
      type: "object",
      properties: {
        category: { type: "string", enum: ["BOOKING", "PAYMENT", "WEATHER", "EQUIPMENT", "OTHER"] },
        confidence: { type: "number" },
        reason: { type: "string" },
      },
      required: ["category", "confidence", "reason"],
    },
  }],
  tool_choice: { type: "tool", name: "classify" },
});
```

### 2. Few-shot examples

**規則**：每個邊界條件至少 1 個範例。

不是「越多越好」 ——  我們實測發現超過 5 個範例後效果反而下降，因為 attention 被稀釋。

### 3. Fallback 策略

LLM 一定會失敗。失敗時你要有：

- **重試**：transient error 重試 1 次
- **降級**：用更便宜的 model 再試（Haiku 失敗 → Sonnet）
- **兜底**：最後仍失敗就回 `OTHER` 並記 log，不要崩潰

## 怎麼驗證 prompt

### 自動化測試

把 prompt + expected output 寫成測試集：

```typescript
const testCases = [
  { input: "明天衝浪課還能改嗎？", expected: "BOOKING" },
  { input: "颱風天怎麼算？", expected: "WEATHER" },
  // ... 至少 30 筆
];

for (const tc of testCases) {
  const result = await classify(tc.input);
  expect(result.category).toBe(tc.expected);
}
```

每次改 prompt 跑一次，accuracy 不能掉。

### A/B 測試

兩版 prompt 各跑 100 筆生產流量，比較：
- 準確率
- 平均 latency
- token 成本
- 使用者滿意度

別憑感覺判斷 prompt「變好了」。

## 常見錯誤

| ❌ 錯 | ✅ 對 |
|---|---|
| 「你是世界級的⋯」 | 「你是 [具體職務] 的 [具體角色]」 |
| 「請仔細思考」 | 給結構化的思考步驟 |
| 「請回 JSON」 | 用 tool use / structured output |
| 「請不要⋯」 | 改用「請只做 X 與 Y」正面表述 |
| 一個 prompt 做多件事 | 拆成多個專一 prompt |

## 下一步

讀完這章，你能寫出可被驗證的 prompt。下一步建議：

- [快速上手](/handbook/getting-started) ——  如果你還沒寫過第一支 LLM 程式
- [AI MVP 藍圖](/handbook/ai-mvp-blueprint) ——  把 prompt 放進開發時程
