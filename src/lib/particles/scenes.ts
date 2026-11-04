export type SceneName = "globe" | "taiwan" | "trident" | "lattice" | "wave" | "field";

export type SceneConfig = {
  /** 各形狀權重，順序為 globe、taiwan、trident、lattice、wave */
  weights: [number, number, number, number, number];
  opacity: number;
  size: number;
  offset: [number, number];
  scale: number;
  mobile: { offset: [number, number]; scale: number; opacity: number };
};

/** 頁面區塊用 data-scene 指定的粒子形態。offset 以世界座標計，桌機讓出左側給文字。 */
export const scenes: Record<SceneName, SceneConfig> = {
  globe: {
    weights: [1, 0, 0, 0, 0],
    opacity: 1,
    size: 2.5,
    offset: [2.25, -0.1],
    scale: 1,
    mobile: { offset: [0, -2.75], scale: 0.85, opacity: 0.85 },
  },
  taiwan: {
    weights: [0, 1, 0, 0, 0],
    opacity: 0.95,
    size: 1.7,
    offset: [1.9, 0],
    scale: 1,
    mobile: { offset: [0.8, -1.65], scale: 0.48, opacity: 0.9 },
  },
  trident: {
    weights: [0, 0, 1, 0, 0],
    opacity: 0.95,
    size: 1.8,
    offset: [2.1, 0.05],
    scale: 1,
    mobile: { offset: [0, 1], scale: 0.55, opacity: 0.6 },
  },
  lattice: {
    weights: [0, 0, 0, 1, 0],
    opacity: 0.9,
    size: 1.7,
    offset: [3.25, 0],
    scale: 0.55,
    mobile: { offset: [0, 0], scale: 0.8, opacity: 0.22 },
  },
  wave: {
    weights: [0, 0, 0, 0, 1],
    opacity: 1,
    size: 2.7,
    offset: [0, -0.35],
    scale: 1,
    mobile: { offset: [0, -0.5], scale: 1, opacity: 0.6 },
  },
  field: {
    weights: [0, 0, 0, 0, 1],
    opacity: 0.16,
    size: 1.8,
    offset: [0, -0.5],
    scale: 1,
    mobile: { offset: [0, -0.5], scale: 1, opacity: 0.14 },
  },
};
