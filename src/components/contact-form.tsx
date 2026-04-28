"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ProjectTypeEnum = z.enum([
  "ai-mvp",
  "saas-co-build",
  "internal-tool",
  "ai-consulting",
  "other",
]);

const projectTypes: { value: z.infer<typeof ProjectTypeEnum>; label: string }[] = [
  { value: "ai-mvp", label: "AI MVP 快速打造" },
  { value: "saas-co-build", label: "SaaS 共創落地" },
  { value: "internal-tool", label: "企業內部 AI 工具" },
  { value: "ai-consulting", label: "AI 工作流顧問" },
  { value: "other", label: "其他" },
];

const budgets = [
  { value: "under-30", label: "30 萬以內" },
  { value: "30-80", label: "30 – 80 萬" },
  { value: "over-80", label: "80 萬以上" },
  { value: "unsure", label: "不確定" },
];

const timelines = [
  { value: "1m", label: "1 個月內" },
  { value: "1-3m", label: "1–3 個月" },
  { value: "6m", label: "半年內" },
  { value: "flexible", label: "不急" },
];

const contactSchema = z.object({
  name: z.string().min(1, "請填寫你的名字").max(50),
  email: z.string().email("Email 格式不正確"),
  company: z.string().max(100).optional(),
  projectTypes: z
    .array(ProjectTypeEnum)
    .min(1, "至少選一個服務類型"),
  message: z.string().min(10, "至少 10 個字，讓我們知道你想做什麼").max(2000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectTypes: [] },
  });

  const onSubmit = async (data: ContactFormData) => {
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "未知錯誤");
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-alt)] border border-[var(--color-line)] p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--color-success)]/10 grid place-items-center">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="text-2xl font-bold mb-3">已收到你的訊息！</h3>
        <p className="text-[var(--color-muted)] leading-relaxed max-w-md mx-auto">
          我們會在 24 小時內以 Email 回覆你。如果是急件，可直接寫信到{" "}
          <a
            href="mailto:rai0603@gmail.com"
            className="text-[var(--color-primary)] hover:underline"
          >
            rai0603@gmail.com
          </a>
          。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 名字 + Email */}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="你的名字" required error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            placeholder="王小明"
          />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      {/* 公司 */}
      <Field label="公司 / 團隊" hint="選填" error={errors.company?.message}>
        <input
          {...register("company")}
          type="text"
          autoComplete="organization"
          className={inputClass(!!errors.company)}
          placeholder="水行者股份有限公司"
        />
      </Field>

      {/* 服務類型 */}
      <Field label="你想做什麼？" required error={errors.projectTypes?.message as string}>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {projectTypes.map((pt) => (
            <label
              key={pt.value}
              className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--color-line)] hover:border-[var(--color-primary)] cursor-pointer transition-colors has-[input:checked]:border-[var(--color-primary)] has-[input:checked]:bg-[var(--color-primary)]/5"
            >
              <input
                {...register("projectTypes")}
                type="checkbox"
                value={pt.value}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm">{pt.label}</span>
            </label>
          ))}
        </div>
      </Field>

      {/* 描述 */}
      <Field
        label="一段話描述你的需求"
        required
        hint="越具體越好。例：我們想做 AI 客服 bot，整合既有 LINE 官方帳號，目前每月人工客服約 2,000 件。"
        error={errors.message?.message}
      >
        <textarea
          {...register("message")}
          rows={5}
          className={inputClass(!!errors.message, true)}
          placeholder="..."
        />
      </Field>

      {/* 預算 + 時程 */}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="預算區間" hint="選填，幫我們快速判斷">
          <select {...register("budget")} className={inputClass(false)}>
            <option value="">未決定 / 不方便透露</option>
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="期望時程" hint="選填">
          <select {...register("timeline")} className={inputClass(false)}>
            <option value="">未決定</option>
            {timelines.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* 提交 */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 h-14 font-semibold transition-colors w-full sm:w-auto"
        >
          {state === "submitting" ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              送出中⋯
            </>
          ) : (
            <>
              送出，24 小時內回覆
              <span aria-hidden>→</span>
            </>
          )}
        </button>
        {state === "error" && (
          <div className="mt-4 p-4 rounded-[var(--radius-md)] bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/30 text-sm">
            <p className="font-semibold text-[var(--color-danger)] mb-1">
              送出失敗 ({errorMsg})
            </p>
            <p className="text-[var(--color-muted)]">
              請直接寫信至{" "}
              <a
                href="mailto:rai0603@gmail.com"
                className="text-[var(--color-primary)] hover:underline"
              >
                rai0603@gmail.com
              </a>
              ，我們會立即回覆。
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-sm font-semibold text-[var(--color-ink)]">
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
        {hint && !error && (
          <span className="text-xs text-[var(--color-muted)]">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean, multiline = false) {
  return [
    "w-full px-4 rounded-[var(--radius-md)] border bg-white",
    multiline ? "py-3 resize-y" : "h-11",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
    hasError
      ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
      : "border-[var(--color-line)] focus:border-[var(--color-primary)]",
  ].join(" ");
}
