import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "隱私權政策",
  description:
    "水行者 AI 開發工作室如何蒐集、使用、保護你的個人資料。符合台灣個資法與 GDPR 精神。",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="隱私權政策"
        subtitle="最後更新：2026-11-04"
      />
      <section className="panel py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8 prose-content space-y-8 text-[var(--color-ink)] leading-relaxed">
          <section>
            <h2 className="text-2xl font-light mb-4">我們會蒐集什麼資料</h2>
            <p>當你透過詢問表單或 Email 與我們聯絡時，我們會蒐集：</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>姓名、Email、公司名稱（你主動提供）</li>
              <li>需求描述</li>
              <li>Cloudflare 提供的匿名流量資料</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">資料用途</h2>
            <p>蒐集的資料僅用於：</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>回覆你的諮詢</li>
              <li>合作期間的專案溝通</li>
              <li>網站效能分析與改善</li>
            </ul>
            <p className="mt-3">
              表單內容會透過 Cloudflare 的郵件服務傳送到我們的信箱。<strong>我們不會：</strong>把你的資料賣給第三方、寄沒同意的廣告信、未經授權對外提及合作關係。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">資料保存與刪除</h2>
            <p>
              詢問資料保存 2 年，合作期間文件依合約規範保存。你可隨時來信
              <a
                href="mailto:rai0603@gmail.com"
                className="text-[var(--color-primary)] underline mx-1"
              >
                rai0603@gmail.com
              </a>
              要求查詢、修改、刪除你的資料。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">Cookie 使用</h2>
            <p>本站僅使用必要的 cookie 與分析工具，不使用廣告追蹤。</p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">第三方服務</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cloudflare（網站託管、流量統計與表單信件傳送）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">聯絡我們</h2>
            <p>
              如對本政策有任何疑問，請來信
              <a
                href="mailto:rai0603@gmail.com"
                className="text-[var(--color-primary)] underline mx-1"
              >
                rai0603@gmail.com
              </a>
              。
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
