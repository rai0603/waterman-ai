# PROGRESS

## Verified facts
- 正式站 https://ai.waterman-sports.cc（2026-11-04 上線，Worker `waterman-ai`，custom domain）。驗證：線上爬 39 頁無失效連結，24 頁 108 張圖有實際尺寸，390px 無橫向捲動。
- `waterman-ai.cc` 從未註冊（whois No match）。
- 已上線項目都逐一實測過；App Store 用 iTunes lookup 確認。
- 聯絡表單 POST `/api/contact` 回 405，表單會顯示 mailto 備援，不會送出。
- `/og/default.png` 回 404。

## General rules
- 部署用 `npm run deploy`，push 不會上線。
- 對外數字要有來源；查不到就不寫。
- `status: "archived"` 不放外連，只放開發畫面截圖。
- 用後台截圖前先確認沒有客戶個資。

## Open failures
- 聯絡表單沒有後端。Workers Static Assets 不會跑 `functions/`，要改成 Worker 入口。
- OG 分享圖與 favicon 尚未製作。

## Lessons learned
- `next/image` 預設 lazy，檢查 `complete && naturalWidth === 0` 會漏掉還沒載入的圖；要先強制載入再驗。
- 長頁面的 element screenshot 可能拍到還沒解碼的圖，要捲到位置再確認。

## Last session
- 2026-11-04：改掛子網域、集中網址常數、部署到 Workers；`/works` 改成線上作品、功能開發紀錄、已停止營運三區；新增 AICMS 與 Soma 開發紀錄；修正舊案例裡沒有來源的數字。
- 下一步：補聯絡表單後端與 OG 圖。
