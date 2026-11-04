"use client";

import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, needTypeOptions, type Inquiry } from "@/lib/inquiry";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full bg-transparent border-0 border-b border-[var(--color-muted)] px-0 py-3 text-lg focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_1px_0_var(--color-primary)]";

/** 詢問表單，送到 /api/contact 後由 Worker 寄到工作室信箱。 */
export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { needTypes: [] },
  });

  const onSubmit = async (data: Inquiry, event?: BaseSyntheticEvent) => {
    setState("submitting");
    const website = new FormData(event?.target as HTMLFormElement).get("website");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="border-t border-[var(--color-line)] pt-8">
        <p className="eyebrow mb-3">Transmission Received</p>
        <h2 className="display text-[clamp(2rem,4vw,3.25rem)] mb-4">已收到你的需求。</h2>
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">
          我們讀完後會用 Email 回覆你。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* 蜜罐欄位：真人看不到，機器人填了就不會寄出 */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          請勿填寫
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Field id="name" label="你的名字" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby="name-error"
            className={fieldClass}
            {...register("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-error"
            className={fieldClass}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="company" label="公司或品牌（選填）" error={errors.company?.message}>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          className={fieldClass}
          {...register("company")}
        />
      </Field>

      <fieldset>
        <legend className="text-sm text-[var(--color-muted)] mb-3">想做的類型（選填，可複選）</legend>
        <div className="flex flex-wrap gap-2">
          {needTypeOptions.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="checkbox"
                value={option.value}
                className="peer sr-only"
                {...register("needTypes")}
              />
              <span className="inline-block px-4 py-2 border border-[var(--color-muted)] transition-colors peer-checked:bg-[var(--color-ink)] peer-checked:text-[var(--color-bg)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-primary)] hover:border-[var(--color-primary)]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="message" label="你想解決什麼問題？" error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          placeholder="例如：想讓客人在網站上自己預約，並用 AI 回答常見問題。"
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-error"
          className={`${fieldClass} resize-y placeholder:text-[var(--color-muted)]`}
          {...register("message")}
        />
      </Field>

      <div>
        <button type="submit" disabled={state === "submitting"} className="btn disabled:opacity-70">
          {state === "submitting" ? "傳送中⋯" : "送出需求"}
          {state !== "submitting" && <span aria-hidden>→</span>}
        </button>
        {state === "error" && (
          <p role="alert" className="mt-4 leading-relaxed text-[var(--color-danger)]">
            送出失敗，你的內容還在表單裡。請再試一次，或直接寫信到{" "}
            <a href="mailto:rai0603@gmail.com" className="underline underline-offset-4">
              rai0603@gmail.com
            </a>
            。
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[var(--color-muted)]">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[var(--color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}
