import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "服務條款",
  description:
    "使用水行者 AI 開發工作室網站、表單、與委任合作的條款說明。",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="服務條款"
        subtitle="最後更新：2026-04-28"
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8 space-y-8 text-[var(--color-ink)] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4">服務提供者</h2>
            <p>
              本網站及相關服務由「水行者運動國際有限公司 — AI 開發工作室部門」（以下簡稱「我們」）提供。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">網站內容使用</h2>
            <p>
              本網站的部落格、開發手冊、案例研究等內容，採 <strong>CC BY 4.0</strong> 授權，歡迎引用、轉載、改作 ——  請註明來源並提供原文連結。
            </p>
            <p className="mt-3">
              程式碼範例（如 handbook 內的 code block）採 <strong>MIT 授權</strong>，可自由用於商業或非商業專案。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">委任合作條款</h2>
            <p>
              所有委任專案均以雙方簽署的「服務合約」為準。本網站列出的價格區間、時程估算僅為市場參考，<strong>不構成正式報價</strong>。
            </p>
            <p className="mt-3">正式報價於規格 freeze 後出具，含：</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>明確的交付物清單</li>
              <li>固定總價（non-scope-creep）</li>
              <li>付款條件（一般為 50% 開工 / 50% 驗收）</li>
              <li>30 天 bug 修復保固範圍</li>
              <li>後續維運的選擇權</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">著作權歸屬</h2>
            <p>
              專案交付後，<strong>程式碼著作權歸客戶</strong>。我們保留：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>於本網站案例頁公開揭露的權利（除非雙方同意保密）</li>
              <li>使用通用元件、套件、方法論於其他專案的權利</li>
              <li>於部落格分享技術心得的權利（不涉及客戶機密）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">免責聲明</h2>
            <p>
              本網站的內容（含手冊、blog、AI 模型推薦）為作者個人經驗整理，不保證適用於所有場景。讀者引用前請自行評估風險。
            </p>
            <p className="mt-3">
              對於外部連結（如客戶網站、第三方工具）的內容、政策變動，我們不負連帶責任。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">條款變更</h2>
            <p>
              本條款可能不定期更新。重大變更時會在網站首頁公告 7 天。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">準據法與管轄</h2>
            <p>
              本條款依中華民國法律解釋。若發生爭議，以臺灣台北地方法院為第一審管轄法院。
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
