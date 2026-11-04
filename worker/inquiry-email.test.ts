import { describe, expect, it } from "vitest";
import { buildInquiryEmail } from "./inquiry-email";
import type { Inquiry } from "../src/lib/inquiry";

const inquiry: Inquiry = {
  name: "王小明",
  email: "client@example.com",
  company: "小明診所",
  needTypes: ["website", "ai"],
  message: "我想做一個線上掛號系統，還要能回答常見問題。",
};
const options = { from: "inquiry@waterman-sports.cc", to: "owner@example.com", messageId: "abc" };

/** 取出 base64 內文並解碼，確認中文沒有亂碼。 */
function decodeBody(raw: string): string {
  const body = raw.split("\r\n\r\n").slice(1).join("").replace(/\r\n/g, "");
  return new TextDecoder().decode(Uint8Array.from(atob(body), (c) => c.charCodeAt(0)));
}

describe("buildInquiryEmail", () => {
  it("把客戶 Email 放在 Reply-To，收件人按回覆就能直接聯絡", () => {
    expect(buildInquiryEmail(inquiry, options)).toContain("Reply-To: client@example.com\r\n");
  });

  it("主旨用 RFC 2047 編碼，不直接放中文", () => {
    const subject = buildInquiryEmail(inquiry, options).match(/^Subject: (.*)$/m)?.[1] ?? "";
    expect(subject).toMatch(/^=\?UTF-8\?B\?[A-Za-z0-9+/=]+\?=\r?$/);
  });

  it("內文包含所有欄位，中文解碼正確", () => {
    const body = decodeBody(buildInquiryEmail(inquiry, options));
    expect(body).toContain("王小明");
    expect(body).toContain("小明診所");
    expect(body).toContain("網站或電商");
    expect(body).toContain("線上掛號系統");
  });

  it("名字含換行也不能注入額外標頭", () => {
    const raw = buildInquiryEmail({ ...inquiry, name: "x\r\nBcc: victim@example.com" }, options);
    const headers = raw.split("\r\n\r\n")[0];
    expect(headers).not.toContain("Bcc:");
  });

  it("沒填公司與類型時不輸出空欄位", () => {
    const body = decodeBody(buildInquiryEmail({ ...inquiry, company: undefined, needTypes: [] }, options));
    expect(body).not.toContain("公司");
    expect(body).not.toContain("需求類型");
  });
});
