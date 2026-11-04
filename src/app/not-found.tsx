import Link from "next/link";

export default function NotFound() {
  return (
    <section data-scene="wave" className="wrap min-h-[70svh] flex flex-col justify-center py-24">
      <p className="eyebrow mb-4">Signal Lost / 404</p>
      <h1 className="display text-[clamp(2.75rem,8vw,7rem)] mb-8">這一頁不在這裡。</h1>
      <Link href="/" className="link-arrow self-start">
        回首頁
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
