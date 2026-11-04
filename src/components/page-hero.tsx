import type { CSSProperties, ReactNode } from "react";
import { DecodeText } from "@/components/decode-text";
import type { SceneName } from "@/lib/particles/scenes";

type PageHeroProps = {
  /** 英文標籤，以等寬字呈現 */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  /** 這個區塊要顯示的粒子形態 */
  scene?: SceneName;
};

/** 內頁標題區：背景讓給粒子，標題靠左留出空間。 */
export function PageHero({ eyebrow, title, subtitle, children, scene = "wave" }: PageHeroProps) {
  return (
    <section data-scene={scene} className="min-h-[72svh] flex items-end border-b border-[var(--color-line)]">
      <div className="wrap py-14 md:py-20">
        {eyebrow && <DecodeText text={eyebrow} className="eyebrow block mb-5" />}
        <h1
          className="display rise text-[clamp(2.75rem,7vw,6.5rem)] max-w-4xl"
          style={{ "--delay": "80ms" } as CSSProperties}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="rise mt-6 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
            style={{ "--delay": "200ms" } as CSSProperties}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
