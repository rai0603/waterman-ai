"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Taipei",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** 台北時間，HUD 上的即時資料。 */
export function HudClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>TPE {time}</span>;
}
