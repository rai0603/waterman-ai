import { describe, expect, it, vi } from "vitest";
import { handleMedia, parseRange, type MediaStore } from "./handle-media";

const URL_MP4 = "https://ai.waterman-sports.cc/media/videos/soma-iphone.mp4";
const SIZE = 1000;

function makeStore(overrides: Partial<MediaStore> = {}): MediaStore {
  return {
    head: vi.fn(async () => ({ size: SIZE, httpEtag: '"abc"' })),
    read: vi.fn(async () => new Response("video").body),
    ...overrides,
  };
}

function get(headers: Record<string, string> = {}, url = URL_MP4, method = "GET"): Request {
  return new Request(url, { method, headers });
}

describe("parseRange", () => {
  it("沒有 Range 標頭時回 null，代表整個檔案", () => {
    expect(parseRange(null, SIZE)).toBeNull();
  });

  it("Safari 開頭探測的 bytes=0-1 回前兩個位元組", () => {
    expect(parseRange("bytes=0-1", SIZE)).toEqual({ offset: 0, length: 2 });
  });

  it("沒寫結尾時讀到檔尾", () => {
    expect(parseRange("bytes=900-", SIZE)).toEqual({ offset: 900, length: 100 });
  });

  it("結尾超過檔案大小時截到檔尾", () => {
    expect(parseRange("bytes=900-5000", SIZE)).toEqual({ offset: 900, length: 100 });
  });

  it("bytes=-100 取最後 100 個位元組", () => {
    expect(parseRange("bytes=-100", SIZE)).toEqual({ offset: 900, length: 100 });
  });

  it("尾段長度超過檔案時回整個檔案", () => {
    expect(parseRange("bytes=-5000", SIZE)).toEqual({ offset: 0, length: SIZE });
  });

  it("起點超過檔案時無法滿足", () => {
    expect(parseRange("bytes=1000-", SIZE)).toBe("unsatisfiable");
  });

  it("格式不對或多段範圍時忽略標頭", () => {
    expect(parseRange("items=0-1", SIZE)).toBeNull();
    expect(parseRange("bytes=5-2", SIZE)).toBeNull();
    expect(parseRange("bytes=0-1,5-6", SIZE)).toBeNull();
    expect(parseRange("bytes=-0", SIZE)).toBeNull();
  });
});

describe("handleMedia", () => {
  it("帶 Range 時回 206 與正確的 Content-Range", async () => {
    const store = makeStore();
    const res = await handleMedia(get({ range: "bytes=0-1" }), store);
    expect(res.status).toBe(206);
    expect(res.headers.get("content-range")).toBe("bytes 0-1/1000");
    expect(res.headers.get("content-length")).toBe("2");
    expect(res.headers.get("content-type")).toBe("video/mp4");
    expect(store.read).toHaveBeenCalledWith("videos/soma-iphone.mp4", { offset: 0, length: 2 });
  });

  it("沒有 Range 時回 200，並宣告支援 Range", async () => {
    const res = await handleMedia(get(), makeStore());
    expect(res.status).toBe(200);
    expect(res.headers.get("accept-ranges")).toBe("bytes");
    expect(res.headers.get("content-length")).toBe("1000");
    expect(res.headers.get("etag")).toBe('"abc"');
  });

  it("超出範圍回 416，並告知檔案大小", async () => {
    const res = await handleMedia(get({ range: "bytes=1000-" }), makeStore());
    expect(res.status).toBe(416);
    expect(res.headers.get("content-range")).toBe("bytes */1000");
  });

  it("HEAD 不讀取影片內容", async () => {
    const store = makeStore();
    const res = await handleMedia(get({}, URL_MP4, "HEAD"), store);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-length")).toBe("1000");
    expect(store.read).not.toHaveBeenCalled();
  });

  it("其他方法回 405", async () => {
    const res = await handleMedia(new Request(URL_MP4, { method: "POST" }), makeStore());
    expect(res.status).toBe(405);
  });

  it("不存在的影片回 404", async () => {
    const res = await handleMedia(get(), makeStore({ head: vi.fn(async () => null) }));
    expect(res.status).toBe(404);
  });

  it("videos 目錄以外的路徑不會查 R2", async () => {
    const store = makeStore();
    for (const path of ["/media/secret.mp4", "/media/videos/../secret.mp4", "/media/videos/a.txt", "/media/videos/"]) {
      const res = await handleMedia(get({}, `https://ai.waterman-sports.cc${path}`), store);
      expect(res.status).toBe(404);
    }
    expect(store.head).not.toHaveBeenCalled();
  });
});
