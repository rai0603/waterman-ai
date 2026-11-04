import { needTypeOptions, type Inquiry } from "../src/lib/inquiry";

type EmailOptions = {
  from: string;
  to: string;
  /** Message-ID 的本地部分，由呼叫端提供以便測試。 */
  messageId: string;
};

function toBase64(text: string): string {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** RFC 2047 編碼；編碼後的值不含換行，使用者輸入無法注入標頭。 */
function encodeHeader(text: string): string {
  return `=?UTF-8?B?${toBase64(text)}?=`;
}

function formatBody(inquiry: Inquiry): string {
  const labels = inquiry.needTypes.map(
    (value) => needTypeOptions.find((option) => option.value === value)?.label ?? value
  );
  return [
    `姓名：${inquiry.name}`,
    `Email：${inquiry.email}`,
    inquiry.company ? `公司：${inquiry.company}` : null,
    labels.length > 0 ? `需求類型：${labels.join("、")}` : null,
    "",
    inquiry.message,
    "",
    "── 來自 ai.waterman-sports.cc 詢問表單，直接回覆即可聯絡對方",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/**
 * 組出可交給 Cloudflare send_email 的原始 MIME 信件。
 * 內文與主旨都以 UTF-8 base64 編碼，確保中文不會亂碼。
 *
 * @param inquiry 已通過驗證的詢問內容
 * @param options 寄件人、收件人與 Message-ID
 * @returns 以 CRLF 分行的 MIME 字串
 */
export function buildInquiryEmail(inquiry: Inquiry, options: EmailOptions): string {
  const domain = options.from.split("@")[1];
  const body = toBase64(formatBody(inquiry)).replace(/(.{76})/g, "$1\r\n");
  const headers = [
    `From: ${encodeHeader("水行者 AI 網站")} <${options.from}>`,
    `To: ${options.to}`,
    `Reply-To: ${inquiry.email.replace(/[\r\n]/g, "")}`,
    `Subject: ${encodeHeader(`[接案詢問] ${inquiry.name}`)}`,
    `Message-ID: <${options.messageId}@${domain}>`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
  ];
  return `${headers.join("\r\n")}\r\n\r\n${body}`;
}
