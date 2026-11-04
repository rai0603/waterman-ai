export type Capability = {
  title: string;
  desc: string;
  /** 這項能力實際做過的作品，連到站內頁面 */
  proof: { label: string; href: string }[];
};

/** 客製化開發能做的事。每一項都有實際作品佐證。 */
export const capabilities: Capability[] = [
  {
    title: "網站與電商",
    desc: "品牌官網、預購電商、課程報名網站。",
    proof: [
      { label: "水行者裝備站", href: "/products/waterman-shop" },
      { label: "Claude Code 實戰課程站", href: "/products/claude-code-class" },
    ],
  },
  {
    title: "App 開發",
    desc: "iPhone、macOS 與 iPad 應用，從開發到上架。",
    proof: [{ label: "Soma Agent", href: "/products/soma-agent" }],
  },
  {
    title: "SaaS 與平台",
    desc: "多租戶架構、會員權限、管理後台。",
    proof: [
      { label: "AICMS", href: "/products/aicms" },
      { label: "CitableRank", href: "/products/citablerank" },
    ],
  },
  {
    title: "AI 客服與知識庫",
    desc: "讀懂你的資料、回答客人問題，必要時轉真人。",
    proof: [{ label: "AICMS AI 客服", href: "/works/aicms-case" }],
  },
  {
    title: "預約與營運系統",
    desc: "線上預約、排班、報到、訂單管理。",
    proof: [
      { label: "AICMS 預約與排班", href: "/works/aicms-case" },
      { label: "水行者預約系統", href: "/products/waterman-booking" },
    ],
  },
  {
    title: "流程自動化與工具",
    desc: "把重複的工作交給程式，做成順手的小工具。",
    proof: [
      { label: "DroneTrim", href: "/products/dronetrim" },
      { label: "CC Token 儀表板", href: "/products/cc-token-dashboard" },
    ],
  },
  {
    title: "互動內容與 3D",
    desc: "互動教材、資料視覺化、虛擬角色。",
    proof: [
      { label: "食 · 日月之間", href: "/products/eclipse-explainer" },
      { label: "Soma Agent", href: "/products/soma-agent" },
    ],
  },
  {
    title: "AI 導入與教學",
    desc: "幫團隊判斷 AI 該用在哪裡，帶著做一次。",
    proof: [{ label: "Claude Code 實戰課程站", href: "/products/claude-code-class" }],
  },
];

export const processSteps: { title: string; desc: string }[] = [
  {
    title: "聊需求",
    desc: "告訴我們你想解決什麼。第一次諮詢 30 分鐘免費，還沒想清楚也沒關係。",
  },
  {
    title: "定範圍與報價",
    desc: "把需求整理成做得出來的範圍，再依內容個案報價。",
  },
  {
    title: "開發與同步",
    desc: "開發過程持續同步進度，方向可以邊做邊調整。",
  },
  {
    title: "上線與交接",
    desc: "部署上線，並說明後續怎麼使用與維護。",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "你們接什麼樣的案子？",
    a: "我們專接客製化開發。網站、App、AI 功能、內部系統都可以，沒有列在網站上的需求也歡迎來問。",
  },
  {
    q: "為什麼網站上沒有價格？",
    a: "每個案子的需求都不一樣，所以我們沒有固定方案。聊清楚你要做什麼之後，再依內容個案報價。",
  },
  {
    q: "我還沒想清楚要做什麼，可以找你們嗎？",
    a: "可以。第一次諮詢 30 分鐘免費，你只要說得出想解決什麼問題，我們會一起把它整理成做得出來的範圍。",
  },
  {
    q: "可以在現有的網站或系統上加 AI 功能嗎？",
    a: "可以。例如 AICMS 的 AI 客服就能掛到不是用 AICMS 架設的外部網站上。實際做法要看你現有的系統，歡迎來聊。",
  },
  {
    q: "你們會用哪些 AI 模型？",
    a: "依需求選擇，不綁單一供應商。我們做過的專案用過 Claude、GPT 與 Gemini。",
  },
];
