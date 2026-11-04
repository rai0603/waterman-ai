/** 粒子形狀的幾何運算。純函式，不依賴瀏覽器，方便單獨測試。 */

export const GLOBE_RADIUS = 2.05;

/** 宜蘭縣的概略位置，只到縣市層級。 */
export const YILAN = { lat: 24.7, lon: 121.75 };

const TAIWAN_CENTER = { lat: 23.6, lon: 120.98 };
const TAIWAN_SCALE = 1.34;

/**
 * 經緯度轉成球面座標，本初子午線朝向 +z。
 *
 * @param lat 緯度（度）
 * @param lon 經度（度）
 * @param radius 球半徑
 * @returns [x, y, z]
 */
export function latLonToVector(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  return [
    radius * Math.cos(phi) * Math.sin(lambda),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(lambda),
  ];
}

/**
 * 解碼地圖資料檔（Int16 的緯度*100、經度*100 配對）。
 *
 * @param buffer generate-map-data 產生的二進位資料
 * @returns 交錯排列的緯經度陣列
 */
export function decodePoints(buffer: ArrayBuffer): Float32Array {
  const raw = new Int16Array(buffer);
  const points = new Float32Array(raw.length);
  for (let i = 0; i < raw.length; i++) points[i] = raw[i] / 100;
  return points;
}

/** 陸地點放在球面上，其餘粒子淡淡鋪滿球體當海洋。 */
export function buildGlobe(count: number, land: Float32Array, random: () => number) {
  const positions = new Float32Array(count * 3);
  const alphas = new Float32Array(count);
  const landCount = land.length / 2;
  const used = Math.min(landCount, Math.floor(count * 0.72));
  const stride = landCount / used;

  for (let i = 0; i < count; i++) {
    if (i < used) {
      const index = Math.floor(i * stride) * 2;
      positions.set(latLonToVector(land[index], land[index + 1], GLOBE_RADIUS), i * 3);
      alphas[i] = 1;
    } else {
      const lat = (Math.asin(random() * 2 - 1) * 180) / Math.PI;
      positions.set(latLonToVector(lat, random() * 360 - 180, GLOBE_RADIUS * 0.995), i * 3);
      alphas[i] = 0.12;
    }
  }
  return { positions, alphas };
}

/**
 * 經緯度轉成台灣地圖平面座標，地圖與標記共用同一個換算。
 *
 * @returns [x, y]
 */
export function taiwanPlane(lat: number, lon: number): [number, number] {
  const aspect = Math.cos((TAIWAN_CENTER.lat * Math.PI) / 180);
  return [
    (lon - TAIWAN_CENTER.lon) * aspect * TAIWAN_SCALE,
    (lat - TAIWAN_CENTER.lat) * TAIWAN_SCALE,
  ];
}

export function buildTaiwan(count: number, points: Float32Array, random: () => number) {
  const positions = new Float32Array(count * 3);
  const total = points.length / 2;
  for (let i = 0; i < count; i++) {
    const index = (i % total) * 2;
    const [x, y] = taiwanPlane(points[index], points[index + 1]);
    positions.set([x + (random() - 0.5) * 0.02, y + (random() - 0.5) * 0.02, (random() - 0.5) * 0.12], i * 3);
  }
  return positions;
}

/**
 * 把 logo 取樣到的像素鋪成粒子。
 *
 * @param count 粒子數
 * @param pixels 交錯排列的 x、y，範圍 -1 到 1
 * @param size 形狀半寬
 */
export function buildTrident(count: number, pixels: Float32Array, size: number, random: () => number) {
  const positions = new Float32Array(count * 3);
  const total = pixels.length / 2;
  for (let i = 0; i < count; i++) {
    const index = Math.floor(random() * total) * 2;
    positions.set([pixels[index] * size, pixels[index + 1] * size, (random() - 0.5) * 0.18], i * 3);
  }
  return positions;
}

/** 立方晶格，呈現運算結構感。 */
export function buildLattice(count: number, size: number) {
  const positions = new Float32Array(count * 3);
  const side = Math.ceil(Math.cbrt(count));
  const step = size / (side - 1);
  for (let i = 0; i < count; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side));
    positions.set([x * step - size / 2, y * step - size / 2, z * step - size / 2], i * 3);
  }
  return positions;
}

/** 海面格點，高度在 shader 裡隨時間計算。 */
export function buildWave(count: number, width: number, depth: number) {
  const positions = new Float32Array(count * 2);
  const columns = Math.ceil(Math.sqrt(count * (width / depth)));
  const rows = Math.ceil(count / columns);
  for (let i = 0; i < count; i++) {
    const x = i % columns;
    const z = Math.floor(i / columns);
    positions.set([(x / (columns - 1) - 0.5) * width, (z / (rows - 1) - 0.5) * depth], i * 2);
  }
  return positions;
}

/** 兩點之間沿大圓拱起的弧線，用於地球上的訊號線。 */
export function buildArc(
  from: [number, number, number],
  to: [number, number, number],
  segments: number
): [number, number, number][] {
  const radius = Math.hypot(...from);
  const dot = (from[0] * to[0] + from[1] * to[1] + from[2] * to[2]) / (radius * radius);
  const angle = Math.acos(Math.min(1, Math.max(-1, dot)));
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = Math.sin((1 - t) * angle) / Math.sin(angle);
    const b = Math.sin(t * angle) / Math.sin(angle);
    const lift = 1 + Math.sin(Math.PI * t) * angle * 0.14;
    points.push([
      (from[0] * a + to[0] * b) * lift,
      (from[1] * a + to[1] * b) * lift,
      (from[2] * a + to[2] * b) * lift,
    ]);
  }
  return points;
}
