# PROGRESS

## Verified facts
- 正式站 https://ai.waterman-sports.cc（Worker `waterman-ai`，custom domain）。2026-11-04 線上驗收：34 頁無失效連結、114 張圖有實際尺寸、1440 與 390 寬都沒有橫向捲動。
- `waterman-ai.cc` 從未註冊（whois No match）。
- 詢問表單已實測：瀏覽器送出後信件進 Gmail 收件匣，中文正常，Reply-To 為客戶。
- `/pricing/`、`/services/ai-mvp/` 回 404。

## General rules
- 部署用 `npm run deploy`，push 不會上線。
- 對外數字要有來源；查不到就不寫。對客戶的承諾只有「第一次諮詢 30 分鐘免費」。
- `status: "archived"` 不放外連，只放開發畫面截圖。
- 用後台截圖前先確認沒有客戶個資。
- 自訂 CSS 類別放 `@layer components`，否則會蓋過 Tailwind 的 `hidden`。
- 文字區塊加 `.panel`，不要讓文字壓在粒子上。

## Open failures
- 粒子效能只在軟體渲染驗過畫面，還沒在實機量測幀率。
- 表單只有蜜罐與每 IP 每分鐘 5 次限制，沒有真人驗證。
- favicon 尚未換成 logo。

## Lessons learned
- `next/image` 預設 lazy，檢查 `complete && naturalWidth === 0` 會漏掉還沒載入的圖；要先強制載入再驗。
- 長頁面的 element screenshot 可能拍到還沒解碼的圖，要捲到位置再確認。
- 米白底、粗宋體配赭紅是 AI 生成網站的常見樣貌，Rai 看過後否決。
- `logo-mark.png` 是不透明的黑底白圖，取樣形狀要看亮度，不能看透明度。

## Last session
- 2026-11-04：改掛子網域；重新設計成客製化接案站，移除定價與套餐頁；全站粒子系統（地球、台灣、海面、晶格、三叉戟）；表單接上 Cloudflare 寄信。
- 下一步：實機確認粒子效能；視詢問量決定要不要加 Turnstile。
