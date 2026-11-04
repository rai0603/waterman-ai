import { describe, expect, it, vi } from "vitest";
import { handleContact, type ContactDeps } from "./handle-contact";

const ORIGIN = "https://ai.waterman-sports.cc";
const valid = {
  name: "王小明",
  email: "client@example.com",
  needTypes: ["website"],
  message: "我想做一個線上掛號系統，還要能回答常見問題。",
};

function makeDeps(overrides: Partial<ContactDeps> = {}): ContactDeps {
  return {
    allowedOrigin: ORIGIN,
    isAllowed: vi.fn(async () => true),
    send: vi.fn(async () => undefined),
    ...overrides,
  };
}

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN, "cf-connecting-ip": "1.2.3.4", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("handleContact", () => {
  it("合法詢問會寄出並回 200", async () => {
    const deps = makeDeps();
    const res = await handleContact(post(valid), deps);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(deps.send).toHaveBeenCalledOnce();
  });

  it("非 POST 回 405", async () => {
    const res = await handleContact(new Request(`${ORIGIN}/api/contact`), makeDeps());
    expect(res.status).toBe(405);
  });

  it("其他網站送來的請求回 403，不寄信", async () => {
    const deps = makeDeps();
    const res = await handleContact(post(valid, { origin: "https://evil.example" }), deps);
    expect(res.status).toBe(403);
    expect(deps.send).not.toHaveBeenCalled();
  });

  it("超過頻率限制回 429，不寄信", async () => {
    const deps = makeDeps({ isAllowed: vi.fn(async () => false) });
    const res = await handleContact(post(valid), deps);
    expect(res.status).toBe(429);
    expect(deps.send).not.toHaveBeenCalled();
  });

  it("蜜罐欄位有值時假裝成功，不寄信", async () => {
    const deps = makeDeps();
    const res = await handleContact(post({ ...valid, website: "http://spam.example" }), deps);
    expect(res.status).toBe(200);
    expect(deps.send).not.toHaveBeenCalled();
  });

  it("欄位不合法回 400，不寄信", async () => {
    const deps = makeDeps();
    const res = await handleContact(post({ ...valid, email: "not-an-email" }), deps);
    expect(res.status).toBe(400);
    expect(deps.send).not.toHaveBeenCalled();
  });

  it("不是 JSON 回 400", async () => {
    const res = await handleContact(post("{oops"), makeDeps());
    expect(res.status).toBe(400);
  });

  it("內容過大回 413，不寄信", async () => {
    const deps = makeDeps();
    const res = await handleContact(post({ ...valid, message: "字".repeat(20000) }), deps);
    expect(res.status).toBe(413);
    expect(deps.send).not.toHaveBeenCalled();
  });

  it("超過頻率限制時不讀取請求內容", async () => {
    const deps = makeDeps({ isAllowed: vi.fn(async () => false) });
    const request = post({ ...valid, message: "字".repeat(20000) });
    const res = await handleContact(request, deps);
    expect(res.status).toBe(429);
    expect(request.bodyUsed).toBe(false);
  });

  it("宣告的長度過大時不讀取請求內容", async () => {
    const request = post(valid, { "content-length": "99999999" });
    const res = await handleContact(request, makeDeps());
    expect(res.status).toBe(413);
    expect(request.bodyUsed).toBe(false);
  });

  it("名字含換行回 400，避免偽造信件內文欄位", async () => {
    const deps = makeDeps();
    const res = await handleContact(post({ ...valid, name: "王小明\n公司：假公司" }), deps);
    expect(res.status).toBe(400);
    expect(deps.send).not.toHaveBeenCalled();
  });

  it("寄信失敗回 502，讓前端顯示備用 Email", async () => {
    const deps = makeDeps({ send: vi.fn(async () => { throw new Error("boom"); }) });
    const res = await handleContact(post(valid), deps);
    expect(res.status).toBe(502);
  });
});
