/** 要讀取的位元組範圍。 */
export type ByteRange = { offset: number; length: number };

/** 處理器需要的儲存能力，正式環境由 R2 實作，測試時可替換。 */
export type MediaStore = {
  head: (key: string) => Promise<{ size: number; httpEtag: string } | null>;
  read: (key: string, range: ByteRange) => Promise<ReadableStream | null>;
};

const VIDEO_PATH = /^\/media\/(videos\/[a-z0-9-]+\.mp4)$/;
const SINGLE_RANGE = /^bytes=(\d*)-(\d*)$/;

/**
 * 解析 Range 標頭。回傳 null 代表忽略標頭、回整個檔案。
 * 多段範圍與不合法的格式都依 RFC 9110 直接忽略。
 *
 * @param header Range 標頭的值
 * @param size 檔案大小
 */
export function parseRange(header: string | null, size: number): ByteRange | "unsatisfiable" | null {
  const match = header ? SINGLE_RANGE.exec(header) : null;
  if (!match) return null;

  const [, start, end] = match;
  if (start === "" && end === "") return null;

  if (start === "") {
    const suffix = Number(end);
    if (suffix === 0) return null;
    const length = Math.min(suffix, size);
    return { offset: size - length, length };
  }

  const offset = Number(start);
  if (offset >= size) return "unsatisfiable";

  const last = end === "" ? size - 1 : Math.min(Number(end), size - 1);
  if (last < offset) return null;
  return { offset, length: last - offset + 1 };
}

/**
 * 從 R2 回傳影片。靜態資源不支援 Range，
 * 而 iPhone Safari 的 video 要拿到 206 才播得動，所以影片走這裡。
 *
 * @param request 進來的請求
 * @param store 影片儲存
 */
export async function handleMedia(request: Request, store: MediaStore): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
  }

  const key = VIDEO_PATH.exec(new URL(request.url).pathname)?.[1];
  const meta = key ? await store.head(key) : null;
  if (!key || !meta) return new Response("Not found", { status: 404 });

  const range = parseRange(request.headers.get("range"), meta.size);
  if (range === "unsatisfiable") {
    return new Response(null, { status: 416, headers: { "content-range": `bytes */${meta.size}` } });
  }

  const target = range ?? { offset: 0, length: meta.size };
  const headers = new Headers({
    "content-type": "video/mp4",
    "content-length": String(target.length),
    "accept-ranges": "bytes",
    "cache-control": "public, max-age=86400",
    etag: meta.httpEtag,
  });
  if (range) {
    headers.set("content-range", `bytes ${range.offset}-${range.offset + range.length - 1}/${meta.size}`);
  }

  const status = range ? 206 : 200;
  if (request.method === "HEAD") return new Response(null, { status, headers });

  const body = await store.read(key, target);
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(body, { status, headers });
}
