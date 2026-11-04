import { describe, expect, it } from "vitest";
import {
  buildArc,
  buildGlobe,
  buildLattice,
  buildWave,
  decodePoints,
  GLOBE_RADIUS,
  latLonToVector,
  taiwanPlane,
  YILAN,
} from "./targets";

const fixedRandom = () => 0.5;

describe("latLonToVector", () => {
  it("赤道本初子午線朝向 +z", () => {
    const [x, y, z] = latLonToVector(0, 0, 2);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
    expect(z).toBeCloseTo(2);
  });

  it("北極朝向 +y", () => {
    expect(latLonToVector(90, 0, 1)[1]).toBeCloseTo(1);
  });
});

describe("decodePoints", () => {
  it("還原 Int16 編碼的緯經度", () => {
    const points = decodePoints(new Int16Array([2470, 12175]).buffer);
    expect(points[0]).toBeCloseTo(24.7);
    expect(points[1]).toBeCloseTo(121.75);
  });
});

describe("buildGlobe", () => {
  it("每顆粒子都落在球面上，陸地不透明、海洋很淡", () => {
    const land = new Float32Array([0, 0, 45, 90]);
    const { positions, alphas } = buildGlobe(10, land, fixedRandom);
    for (let i = 0; i < 10; i++) {
      const r = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      expect(r).toBeGreaterThan(GLOBE_RADIUS * 0.99);
      expect(r).toBeLessThan(GLOBE_RADIUS * 1.001);
    }
    expect(alphas[0]).toBe(1);
    expect(alphas[9]).toBeLessThan(0.2);
  });

  it("陸地點比粒子多時不會超出陣列", () => {
    const land = new Float32Array(2000);
    expect(buildGlobe(100, land, fixedRandom).positions).toHaveLength(300);
  });
});

describe("taiwanPlane", () => {
  it("宜蘭在台灣中心的東北方", () => {
    const [x, y] = taiwanPlane(YILAN.lat, YILAN.lon);
    expect(x).toBeGreaterThan(0);
    expect(y).toBeGreaterThan(0);
  });
});

describe("buildLattice 與 buildWave", () => {
  it("輸出長度符合粒子數", () => {
    expect(buildLattice(1000, 3)).toHaveLength(3000);
    expect(buildWave(1000, 18, 12)).toHaveLength(2000);
  });

  it("晶格置中在原點", () => {
    const positions = buildLattice(27, 2);
    expect(positions[0]).toBeCloseTo(-1);
    expect(positions[26 * 3]).toBeCloseTo(1);
  });
});

describe("buildArc", () => {
  it("頭尾貼齊端點，中段拱起", () => {
    const from = latLonToVector(0, 0, 2);
    const to = latLonToVector(0, 60, 2);
    const arc = buildArc(from, to, 10);
    expect(arc).toHaveLength(11);
    expect(arc[0][2]).toBeCloseTo(from[2]);
    expect(arc[10][0]).toBeCloseTo(to[0]);
    expect(Math.hypot(...arc[5])).toBeGreaterThan(2);
  });
});
