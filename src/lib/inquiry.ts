import { z } from "zod";

/** 客戶可勾選的需求類型；前端表單與 Worker 共用，避免兩邊驗證不一致。 */
export const needTypeOptions = [
  { value: "website", label: "網站或電商" },
  { value: "app", label: "App" },
  { value: "ai", label: "AI 功能" },
  { value: "system", label: "內部系統" },
  { value: "other", label: "其他" },
  { value: "unsure", label: "還不確定" },
] as const;

const needTypeValues = needTypeOptions.map((o) => o.value) as [
  (typeof needTypeOptions)[number]["value"],
  ...(typeof needTypeOptions)[number]["value"][],
];

/** 單行文字；不允許換行，避免在信件內文偽造欄位。 */
const singleLine = z.string().trim().regex(/^[^\r\n]*$/, "請不要換行");

export const inquirySchema = z.object({
  name: singleLine.min(1, "請填寫你的名字").max(50, "名字太長了"),
  email: z.email("Email 格式不正確").max(200),
  company: singleLine.max(100).optional(),
  needTypes: z.array(z.enum(needTypeValues)),
  message: z
    .string()
    .trim()
    .min(10, "至少 10 個字，讓我們知道你想做什麼")
    .max(2000, "內容太長了，可以先寫重點"),
});

export type Inquiry = z.infer<typeof inquirySchema>;
