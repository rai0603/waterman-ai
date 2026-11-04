/** 正式站網址；換網域只改這裡，metadata、sitemap、robots、llms.txt 都讀這個常數。 */
export const SITE_URL = "https://ai.waterman-sports.cc";

/** 不含協定的主機名，用於對外引用文字。 */
export const SITE_HOST = new URL(SITE_URL).host;
