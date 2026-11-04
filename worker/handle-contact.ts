import { inquirySchema, type Inquiry } from "../src/lib/inquiry";

const MAX_BODY_BYTES = 16 * 1024;

export type ContactDeps = {
  /** 只接受從這個來源送出的表單。 */
  allowedOrigin: string;
  /** 依 IP 判斷是否還在頻率限制內。 */
  isAllowed: (key: string) => Promise<boolean>;
  /** 實際寄出詢問信。 */
  send: (inquiry: Inquiry) => Promise<void>;
};

function json(status: number, body: { ok: boolean; error?: string }): Response {
  return Response.json(body, { status });
}

/**
 * 處理網站詢問表單。依序檢查方法、來源、頻率與大小，通過驗證後才寄信。
 * 蜜罐欄位有值時回傳成功但不寄信，避免讓機器人知道被擋下。
 *
 * @param request 送到 /api/contact 的請求
 * @param deps 來源設定、頻率限制與寄信實作
 * @returns JSON 回應；ok 為 false 時前端會顯示備用 Email
 */
export async function handleContact(request: Request, deps: ContactDeps): Promise<Response> {
  if (request.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });
  if (request.headers.get("origin") !== deps.allowedOrigin) {
    return json(403, { ok: false, error: "forbidden" });
  }

  // 先擋頻率與宣告長度，再讀內容，大型請求才不會消耗資源
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!(await deps.isAllowed(ip))) return json(429, { ok: false, error: "rate_limited" });

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: "too_large" });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: "too_large" });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  if (typeof body === "object" && body !== null && "website" in body && body.website) {
    return json(200, { ok: true });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return json(400, { ok: false, error: "invalid_fields" });

  try {
    await deps.send(parsed.data);
  } catch (error) {
    console.error("inquiry send failed", error);
    return json(502, { ok: false, error: "send_failed" });
  }
  return json(200, { ok: true });
}
