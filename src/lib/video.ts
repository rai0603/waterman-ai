/**
 * 影片的站內路徑。影片放在 R2，由 Worker 從同網域的 /media 提供。
 *
 * @param file R2 videos 目錄底下的檔名
 */
export function videoPath(file: string): string {
  return `/media/videos/${file}`;
}

/**
 * 把秒數顯示成分秒，例如 1:44。
 *
 * @param seconds 影片長度
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * 把秒數轉成 VideoObject 要的 ISO 8601 長度，例如 PT1M44S。
 *
 * @param seconds 影片長度
 */
export function toIsoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}
