import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listContent } from "./content";
import { formatDuration, toIsoDuration, videoPath } from "./video";

describe("formatDuration", () => {
  it("顯示成分秒", () => {
    expect(formatDuration(38)).toBe("0:38");
    expect(formatDuration(104)).toBe("1:44");
    expect(formatDuration(60)).toBe("1:00");
  });
});

describe("toIsoDuration", () => {
  it("轉成結構化資料用的 ISO 8601", () => {
    expect(toIsoDuration(104)).toBe("PT1M44S");
    expect(toIsoDuration(38)).toBe("PT0M38S");
  });
});

describe("videoPath", () => {
  it("走同網域的 /media 路徑", () => {
    expect(videoPath("soma-iphone.mp4")).toBe("/media/videos/soma-iphone.mp4");
  });
});

describe("產品影片設定", () => {
  const clips = listContent("products").flatMap((p) => p.frontmatter.videos ?? []);

  it("至少有影片，且首頁有精選", () => {
    expect(clips.length).toBeGreaterThan(0);
    expect(clips.some((clip) => clip.featured)).toBe(true);
  });

  it.each(clips.map((clip) => [clip.file, clip] as const))("%s 欄位完整且封面存在", (_file, clip) => {
    expect(clip.file).toMatch(/^[a-z0-9-]+\.mp4$/);
    expect(clip.width).toBeGreaterThan(0);
    expect(clip.height).toBeGreaterThan(0);
    expect(clip.duration).toBeGreaterThan(0);
    expect(clip.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(fs.existsSync(path.join(process.cwd(), "public", clip.poster))).toBe(true);
  });
});
