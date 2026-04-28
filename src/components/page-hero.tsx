import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  size?: "default" | "tall";
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  size = "default",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary), transparent)",
        }}
      />
      <div
        className={`relative mx-auto max-w-[1200px] px-4 md:px-8 ${
          size === "tall" ? "pt-20 md:pt-28 pb-20 md:pb-24" : "pt-16 md:pt-24 pb-14 md:pb-20"
        }`}
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5BA0FF] mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.15] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
