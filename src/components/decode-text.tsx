"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEF0123456789/_#<>";
const DURATION = 900;

/** 進入畫面時像電腦解碼一樣逐字顯示。伺服器端直接輸出原文，不影響閱讀與搜尋。 */
export function DecodeText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1);
        const resolved = Math.floor(progress * text.length);
        element.textContent = [...text]
          .map((char, index) =>
            index < resolved || char === " "
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("");
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        run();
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = text;
    };
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
