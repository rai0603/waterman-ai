"use client";

import dynamic from "next/dynamic";

/** three.js 只在瀏覽器載入，不佔首屏 HTML。 */
export const ParticleField = dynamic(() => import("./particle-scene"), { ssr: false });
