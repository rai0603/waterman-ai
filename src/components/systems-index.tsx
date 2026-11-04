"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type SystemRow = {
  id: string;
  title: string;
  type: string;
  description: string;
  href: string;
  image: string;
};

/** 作品資料表：游標或鍵盤移到哪一列，右側就預覽哪個畫面。手機版圖片直接放在列內。 */
export function SystemsIndex({ rows }: { rows: SystemRow[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-12 gap-x-10">
      <ol className="lg:col-span-6 border-b border-[var(--color-line)]">
        {rows.map((row, index) => (
          <li key={row.id} className="border-t border-[var(--color-line)]">
            <Link
              href={row.href}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group block py-4 md:py-5"
            >
              <div className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-3">
                <span className={`issue-no ${active === index ? "" : "lg:!text-[var(--color-muted)]"}`}>
                  {row.id}
                </span>
                <span
                  className={`text-xl md:text-2xl font-light tracking-wide transition-colors group-hover:text-[var(--color-primary)] ${
                    active === index ? "lg:text-[var(--color-primary)]" : ""
                  }`}
                >
                  {row.title}
                </span>
                <span className="hud inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                  {row.type}
                </span>
              </div>
              <div className="frame mt-4 lg:hidden">
                <Image
                  src={row.image}
                  alt={`${row.title} 畫面截圖`}
                  width={1200}
                  height={750}
                  sizes="100vw"
                  className="w-full aspect-[16/10] object-cover object-top"
                />
              </div>
              <p className="mt-3 lg:hidden leading-relaxed text-[var(--color-muted)]">
                {row.description}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block lg:col-span-6">
        <div className="sticky top-24">
          <div className="frame scan relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-alt)]">
            {rows.map((row, index) => (
              <Image
                key={row.id}
                src={row.image}
                alt=""
                fill
                sizes="50vw"
                className={`object-cover object-top transition-opacity duration-500 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between gap-6">
            <p className="leading-relaxed text-[var(--color-muted)] max-w-xl">
              {rows[active].description}
            </p>
            <p className="hud shrink-0">
              {String(active + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
