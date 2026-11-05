# PROGRESS

## Verified facts
- 正式站 https://ai.waterman-sports.cc（Worker `waterman-ai`，custom domain）。2026-11-04 線上驗收：34 頁無失效連結、114 張圖有實際尺寸、1440 與 390 寬都沒有橫向捲動。
- `waterman-ai.cc` 從未註冊（whois No match）。
- 詢問表單已實測：瀏覽器送出後信件進 Gmail 收件匣，中文正常，Reply-To 為客戶。
- `/pricing/`、`/services/ai-mvp/` 回 404。
- Workers Static Assets 不支援 Range：`curl -r 0-99 /data/land.bin` 回 200 與整個檔案，同樣條件 soma-agent.com（Cloudflare Pages）回 206。影片因此走 R2＋`worker/handle-media.ts`。線上 6 支都回 206，Chrome 與 Playwright WebKit 都實際播放成功（2026-11-05）。

## General rules
- 部署用 `npm run deploy`，push 不會上線。
- 對外數字要有來源；查不到就不寫。對客戶的承諾只有「第一次諮詢 30 分鐘免費」。
- `status: "archived"` 不放外連，只放開發畫面截圖。
- 用後台截圖前先確認沒有客戶個資。
- 自訂 CSS 類別放 `@layer components`，否則會蓋過 Tailwind 的 `hidden`。
- 文字區塊加 `.panel`，不要讓文字壓在粒子上。
- 手機錄影上架前要逐格看（至少 5 fps）。AI-妹嘻那支 3 秒取樣看不出來，5 fps 才抓到相簿選圖畫面。

## Open failures
- 粒子效能只在軟體渲染驗過畫面，還沒在實機量測幀率。
- 表單只有蜜罐與每 IP 每分鐘 5 次限制，沒有真人驗證。
- favicon 尚未換成 logo。

## Lessons learned
- `next/image` 預設 lazy，檢查 `complete && naturalWidth === 0` 會漏掉還沒載入的圖；要先強制載入再驗。
- 長頁面的 element screenshot 可能拍到還沒解碼的圖，要捲到位置再確認。
- 米白底、粗宋體配赭紅是 AI 生成網站的常見樣貌，Rai 看過後否決。
- `logo-mark.png` 是不透明的黑底白圖，取樣形狀要看亮度，不能看透明度。
- 機台截圖別只看檔名：`soma-kiosk-*.png` 是 9/22 的模擬畫面，電視端那張還有已修掉的壓扁 bug。要查日期與解析度（iPad A16 是 1640×2360）。
- 機台頁 `?room=` 只有電視端讀，iPad 端固定用 config 的房號，截雙畫面時兩邊都不帶 `room`。

## Last session
- 2026-11-05：新增 SOMA AI 導覽機台（Beta，新分類 hardware）；6 支影片上 R2，放在首頁 Footage 區與產品頁，含 VideoObject；新增 `/media/` 影片路徑（新增 25 項測試）。沒有新增子網域：`media.waterman-sports.cc` 被權限擋下，改走同網域。
- 機台畫面是本機跑目前程式截的（角色 Yuna Concierge，回答來自正式 AICMS），不是實拍。避開 Alice，因為她的貼圖授權未解決（見 soma-mobile `docs/character-license-audit.md`）。
- 下一步：Rai 拍機台實景照片或影片補進機台頁；真實 iPhone 上確認粒子效能與影片；視詢問量決定 Turnstile。
