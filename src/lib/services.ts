export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  weeks: string;
  accent: string;
  audience: string[];
  deliverables: string[];
  process: { week: string; title: string; desc: string }[];
  priceRange: string;
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-mvp",
    name: "AI MVP 快速打造",
    shortDesc: "4–8 週交付可運行的 AI MVP，含規格、開發、部署與 30 天保固。",
    weeks: "4–8 週",
    accent: "from-[#0A6CFF] to-[#00C2A8]",
    audience: [
      "已有 idea 但缺工程資源的新創 PM",
      "想驗證市場但不想花百萬寫 prototype 的創辦人",
      "需要 demo 給投資人的早期團隊",
      "想把現有產品加 AI 功能的負責人",
    ],
    deliverables: [
      "可簽收的需求書 / 規格書",
      "可運行的 MVP（含後台、可部署）",
      "完整原始碼 + 文件 + 系統架構圖",
      "上線部署 + 30 天 bug 修復保固",
      "1 場 1 小時的交接 / Onboarding",
    ],
    process: [
      { week: "W1", title: "規格 freeze", desc: "需求訪談、邊界釐清、可簽收規格書與報價" },
      { week: "W2–W3", title: "開發 + 週報", desc: "每週一次 demo，你看得見進度、改得動方向" },
      { week: "W4", title: "上線 + 部署", desc: "雲端部署、資料層、監控、錯誤回報" },
      { week: "W5+", title: "保固期", desc: "30 天 bug 修復免費，後續以時數計算" },
    ],
    priceRange: "依規格不同，預算區間 NT$ 30–80 萬",
    faq: [
      {
        q: "AI MVP 開發要花多久？",
        a: "從規格 freeze 到上線一般 4–8 週。複雜度高（多模型、需訓練、需大量整合）會落在 8 週上限。",
      },
      {
        q: "我什麼都還沒想清楚，可以開始嗎？",
        a: "可以。我們提供 30 分鐘免費諮詢，協助你把 idea 收斂成「可被估時、可被驗證」的 MVP 範圍，再決定要不要開工。",
      },
      {
        q: "原始碼歸誰？",
        a: "歸你。交付時提供完整 Git Repo 與部署文件，你可以自由帶離或請其他團隊接手。",
      },
      {
        q: "如果上線後想加新功能呢？",
        a: "可以選擇按時計費（NT$ 2,500–4,000 / 小時）或月維運包（見維運方案）。",
      },
      {
        q: "你們會用哪些 AI 模型？",
        a: "依需求選最適合的：通用對話用 Claude / GPT、低延遲用 Haiku / Gemini Flash、向量檢索用 Voyage / OpenAI、圖片用 Imagen 4。我們不綁單一供應商。",
      },
    ],
  },
  {
    slug: "saas-co-build",
    name: "SaaS 共創落地",
    shortDesc: "技術團隊與你一起把 idea 變成真實上線的 SaaS，共擔風險、共享成果。",
    weeks: "3–6 個月",
    accent: "from-[#0A6CFF] to-[#7C3AED]",
    audience: [
      "有領域 know-how 但缺技術合夥人的專家",
      "想驗證新 SaaS 但不想單獨扛全部成本的創業者",
      "需要技術團隊長期承諾、不只是外包的計畫",
      "願意用部分股權 / 收益分享換取執行力的合作模式",
    ],
    deliverables: [
      "完整可商業化的 SaaS 產品（前後台、計費、客服）",
      "上線後 6 個月的迭代與技術支援",
      "市場行銷頁（landing + pricing + blog）",
      "金流串接（Stripe / 綠界）+ 訂閱管理",
      "AEO / SEO 基礎建設",
    ],
    process: [
      { week: "M1", title: "聯合規格", desc: "雙方對齊商業模式、目標客群、計費方式" },
      { week: "M2–M3", title: "MVP", desc: "最小可付費版本，提早收第一筆營收" },
      { week: "M4–M5", title: "市場驗證", desc: "邀請第一批客戶，根據真實使用迭代" },
      { week: "M6+", title: "成長", desc: "依數據決定加深功能、擴展市場、或調整方向" },
    ],
    priceRange: "依合作條件，可走「現金 + 股權」或「分潤」結構",
    faq: [
      {
        q: "SaaS 共創跟外包差在哪？",
        a: "外包是收錢交付完即結束；共創是我們把名字放進去、共同擁有產品、長期一起經營。我們會挑選自己也想做的方向接案。",
      },
      {
        q: "你們會挑題目嗎？",
        a: "會。我們不會什麼題都接 ——  必須是「我們也願意 3 年內持續維運」的方向。這對雙方都更負責。",
      },
      {
        q: "股權 / 分潤怎麼算？",
        a: "依照投入工時、市場潛力、雙方角色談。一般落在 10–30% 區間或淨利分潤 15–25%，每個案子個別簽約。",
      },
      {
        q: "如果做一半我想拆夥怎麼辦？",
        a: "合約會有 buyout 條款。可用議定金額買回我們持有的權益，避免綁死。",
      },
    ],
  },
  {
    slug: "internal-tool",
    name: "企業內部 AI 工具",
    shortDesc: "把重複工作流交給 AI：客服、文件、報表、知識庫，三週內看到成效。",
    weeks: "3–6 週",
    accent: "from-[#00C2A8] to-[#0A6CFF]",
    audience: [
      "被高層要求「導入 AI」但不知從何下手的 IT 主管",
      "客服 / HR / 行政 重複工作量大、想用 AI 減負的負責人",
      "已有大量內部文件、想做知識庫但不想交給 SaaS 的法務 / 醫療 / 金融業",
      "想試水溫但不想簽長約的中小企業",
    ],
    deliverables: [
      "可內部使用的 AI 工具（網頁 / 桌機 / 通訊軟體 bot）",
      "與貴司現有系統整合（Google Workspace、Microsoft 365、Slack、LINE）",
      "管理後台（用量、成本、權限）",
      "資料安全合規評估報告",
      "員工 1 場培訓 + 文件",
    ],
    process: [
      { week: "W1", title: "場景盤點", desc: "走訪 1–2 個部門，找出最痛、最高 ROI 的 1–2 個場景" },
      { week: "W2–W3", title: "PoC", desc: "用真實資料跑通流程，給出可量化的 before/after" },
      { week: "W4–W5", title: "上線", desc: "權限、稽核、計費都接齊，員工可實際使用" },
      { week: "W6+", title: "擴展", desc: "依使用率決定加深、加廣、或換別的場景" },
    ],
    priceRange: "PoC NT$ 8–20 萬，全案 NT$ 30–120 萬",
    faq: [
      {
        q: "資料會上傳到 OpenAI 嗎？",
        a: "看你的合規要求。可以走 OpenAI / Anthropic 的企業 API（不用於訓練），也可以本地跑 open-source 模型（Llama 3 / Qwen）。我們會先評估再選技術。",
      },
      {
        q: "我們公司沒人懂技術怎麼維運？",
        a: "我們提供 3 種選擇：(1) 完全交付給 IT、(2) 我們月維運、(3) 培訓你的人到能自行維運。",
      },
      {
        q: "可以先試 PoC 嗎？",
        a: "強烈建議。1–2 週、NT$ 8–20 萬，給你看得到的實際成效再決定要不要全案展開。",
      },
      {
        q: "會跟現有系統衝突嗎？",
        a: "我們的整合策略是「補充、不替換」 ——  接 API、做 plugin、用 Webhook，盡量不動你既有系統。",
      },
    ],
  },
  {
    slug: "ai-consulting",
    name: "AI 工作流顧問",
    shortDesc: "30 分鐘免費診斷你公司能用 AI 解決什麼，給出可執行的導入路線圖。",
    weeks: "顧問制",
    accent: "from-[#F59E0B] to-[#0A6CFF]",
    audience: [
      "聽過 AI 但不確定能解決什麼的中小企業老闆",
      "需要對內 / 對股東「交一份 AI 戰略」的高階主管",
      "團隊內想推 AI 但拿不到預算的中階管理者",
      "想評估 ROI 後再決定要不要花錢做的審慎決策者",
    ],
    deliverables: [
      "完整的 AI 導入評估報告（PDF）",
      "3–5 個按 ROI 排序的場景候選",
      "每個場景的：技術方案、預算、時程、風險",
      "可拿去報董事會 / 股東會的簡報版本",
      "30 天內 Email 答詢支援",
    ],
    process: [
      { week: "Day 0", title: "免費諮詢", desc: "30 分鐘聊清楚你公司現況與想解決的問題" },
      { week: "Week 1", title: "場域走訪", desc: "現場 / 線上訪談 3–5 個關鍵人，搜集真實工作流" },
      { week: "Week 2", title: "報告交付", desc: "完整評估報告 + 簡報 + 1 小時導讀會議" },
      { week: "後續", title: "選擇權", desc: "你可以自行找團隊執行、找我們執行、或暫不執行" },
    ],
    priceRange: "顧問費 NT$ 8–25 萬（依公司規模 / 場域數量）",
    faq: [
      {
        q: "顧問跟一般顧問公司差在哪？",
        a: "我們是「會自己寫 code 上線」的顧問。給的方案不是空泛策略，是寫得出來、估得出時、跑得出 ROI 的實作路線圖。",
      },
      {
        q: "可以幫我們做員工教育訓練嗎？",
        a: "可以另案開立。半天 / 一天的 workshop，依人數與深度報價。",
      },
      {
        q: "30 分鐘免費諮詢真的免費？",
        a: "真的。我們也想先了解你問題是不是值得我們投入。聊完雙方都不合適也沒關係。",
      },
      {
        q: "報告寫完我可以拿去找別家做嗎？",
        a: "可以，著作權歸你。我們相信好的方案會自己證明價值，不需要綁約強制執行。",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
