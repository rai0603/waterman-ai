import type { CSSProperties } from "react";
import Link from "next/link";
import type { VideoClip } from "@/lib/content";
import { formatDuration, videoPath } from "@/lib/video";

export type GalleryItem = {
  clip: VideoClip;
  /** 影片下方連到的產品頁，產品頁本身不用傳 */
  link?: { href: string; label: string };
};

/** 單支影片。點了才開始下載，不跟全站粒子搶頻寬。 */
function VideoItem({ clip, link }: GalleryItem) {
  const ratio = clip.width / clip.height;

  return (
    <figure
      style={{ "--ratio": ratio } as CSSProperties}
      className="w-full mx-auto max-w-[calc(78svh*var(--ratio))] lg:mx-0 lg:min-w-0 lg:[flex:var(--ratio)_1_0%]"
    >
      <div className="frame bg-[var(--color-bg-alt)]">
        <video
          controls
          playsInline
          preload="none"
          poster={clip.poster}
          width={clip.width}
          height={clip.height}
          aria-label={clip.title}
          className="block w-full h-auto"
        >
          <source src={videoPath(clip.file)} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3">
        <p className="leading-snug">{clip.title}</p>
        <p className="hud mt-1 flex flex-wrap items-center gap-x-4">
          <span>{formatDuration(clip.duration)}</span>
          {link && (
            <Link href={link.href} className="normal-case tracking-normal font-sans text-sm underline underline-offset-4 hover:text-[var(--color-primary)]">
              {link.label}
            </Link>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

/** 一排影片。桌機依比例分配寬度讓高度對齊，手機直接堆疊。 */
export function VideoGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-8">
      {items.map((item) => (
        <VideoItem key={item.clip.file} {...item} />
      ))}
    </div>
  );
}
