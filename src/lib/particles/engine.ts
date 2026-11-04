import * as THREE from "three";
import { scenes, type SceneName } from "./scenes";
import {
  arcFragmentShader,
  arcVertexShader,
  particleFragmentShader,
  particleVertexShader,
} from "./shaders";
import {
  buildArc,
  buildGlobe,
  buildLattice,
  buildTaiwan,
  buildTrident,
  buildWave,
  decodePoints,
  GLOBE_RADIUS,
  latLonToVector,
  taiwanPlane,
  YILAN,
} from "./targets";

export type ParticleEngine = {
  setScene: (name: SceneName) => void;
  dispose: () => void;
};

const COLOR_PARTICLE = 0xf2f4f7;
const COLOR_ACCENT = 0xff5a1f;
const CAMERA_Z = 7;
const GLOBE_TILT = 0.42;
const GLOBE_BASE_ROT = (-YILAN.lon * Math.PI) / 180;

/** 訊號線的端點，從台灣連到世界幾個主要城市。 */
const ARC_CITIES: [number, number][] = [
  [35.68, 139.69],
  [1.35, 103.82],
  [-33.87, 151.21],
  [37.34, -121.89],
  [50.11, 8.68],
  [19.08, 72.88],
];

async function loadBinary(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} ${response.status}`);
  return response.arrayBuffer();
}

/** 取樣 logo 的亮部（圖檔是黑底白圖），輸出 -1 到 1 的座標。 */
async function sampleLogo(url: string): Promise<Float32Array> {
  const image = new Image();
  image.src = url;
  await image.decode();
  const width = 200;
  const height = Math.round((width * image.naturalHeight) / image.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("no 2d context");
  context.drawImage(image, 0, 0, width, height);
  const { data } = context.getImageData(0, 0, width, height);

  const pixels: number[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4] > 128) {
        pixels.push((x / width) * 2 - 1, (1 - y / height) * 2 * (height / width) - height / width);
      }
    }
  }
  return new Float32Array(pixels);
}

function makeRing(accent: THREE.Color, inner: number) {
  return new THREE.Mesh(
    new THREE.RingGeometry(inner, inner * 1.16, 48),
    new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
}

/**
 * 建立全站共用的粒子系統。
 * 無法使用 WebGL 或資料載入失敗時回傳 null，頁面維持純色背景。
 *
 * @param canvas 固定在背景的畫布
 * @returns 控制介面，或 null
 */
export async function createParticleEngine(canvas: HTMLCanvasElement): Promise<ParticleEngine | null> {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = isMobile ? 8000 : 18000;

  let renderer: THREE.WebGLRenderer;
  let land: Float32Array;
  let taiwanPoints: Float32Array;
  let logoPixels: Float32Array;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: "high-performance" });
    const [landData, taiwanData, logo] = await Promise.all([
      loadBinary("/data/land.bin"),
      loadBinary("/data/taiwan.bin"),
      sampleLogo("/logo-mark.png"),
    ]);
    land = decodePoints(landData);
    taiwanPoints = decodePoints(taiwanData);
    logoPixels = logo;
  } catch (error) {
    console.warn("particle field disabled", error);
    return null;
  }

  const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
  renderer.setPixelRatio(pixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
  camera.position.z = CAMERA_Z;

  const accent = new THREE.Color(COLOR_ACCENT);
  const globe = buildGlobe(count, land, Math.random);
  const [yilanX, yilanY] = taiwanPlane(YILAN.lat, YILAN.lon);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(globe.positions, 3));
  geometry.setAttribute("aGlobeAlpha", new THREE.BufferAttribute(globe.alphas, 1));
  geometry.setAttribute("aTaiwan", new THREE.BufferAttribute(buildTaiwan(count, taiwanPoints, Math.random), 3));
  geometry.setAttribute("aTrident", new THREE.BufferAttribute(buildTrident(count, logoPixels, 2.3, Math.random), 3));
  geometry.setAttribute("aLattice", new THREE.BufferAttribute(buildLattice(count, 3.4), 3));
  geometry.setAttribute("aWave", new THREE.BufferAttribute(buildWave(count, 19, 12.5), 2));
  const random = new Float32Array(count * 4);
  for (let i = 0; i < random.length; i++) random[i] = Math.random();
  geometry.setAttribute("aRand", new THREE.BufferAttribute(random, 4));

  const uniforms = {
    uTime: { value: 0 },
    uGlobeRot: { value: GLOBE_BASE_ROT },
    uGlobeTilt: { value: GLOBE_TILT },
    uPixelRatio: { value: pixelRatio },
    uSize: { value: 2 },
    uOpacity: { value: 0 },
    uScale: { value: 1 },
    uBoot: { value: reducedMotion ? 1 : 0 },
    uW: { value: new THREE.Vector4(1, 0, 0, 0) },
    uWWave: { value: 0 },
    uOffset: { value: new THREE.Vector2() },
    uPointer: { value: new THREE.Vector2(99, 99) },
    uYilan: { value: new THREE.Vector3(yilanX, yilanY, 0) },
    uColor: { value: new THREE.Color(COLOR_PARTICLE) },
    uAccent: { value: accent },
  };

  const particles = new THREE.Points(
    geometry,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  particles.frustumCulled = false;
  scene.add(particles);

  // 地球上的訊號線與宜蘭標記，跟粒子用同樣的旋轉
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const origin = latLonToVector(YILAN.lat, YILAN.lon, GLOBE_RADIUS);
  const arcPositions: number[] = [];
  const arcProgress: number[] = [];
  const arcPhase: number[] = [];
  ARC_CITIES.forEach(([lat, lon], arcIndex) => {
    const points = buildArc(origin, latLonToVector(lat, lon, GLOBE_RADIUS), 48);
    for (let i = 0; i < points.length - 1; i++) {
      arcPositions.push(...points[i], ...points[i + 1]);
      arcProgress.push(i / 48, (i + 1) / 48);
      arcPhase.push(arcIndex / ARC_CITIES.length, arcIndex / ARC_CITIES.length);
    }
  });
  const arcGeometry = new THREE.BufferGeometry();
  arcGeometry.setAttribute("position", new THREE.Float32BufferAttribute(arcPositions, 3));
  arcGeometry.setAttribute("aProgress", new THREE.Float32BufferAttribute(arcProgress, 1));
  arcGeometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(arcPhase, 1));
  const arcUniforms = { uTime: uniforms.uTime, uFade: { value: 0 }, uAccent: { value: accent } };
  const arcs = new THREE.LineSegments(
    arcGeometry,
    new THREE.ShaderMaterial({
      uniforms: arcUniforms,
      vertexShader: arcVertexShader,
      fragmentShader: arcFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  globeGroup.add(arcs);

  const globeRing = makeRing(accent, 0.06);
  const outward = new THREE.Vector3(...origin);
  globeRing.position.copy(outward);
  globeRing.lookAt(outward.clone().multiplyScalar(2));
  globeGroup.add(globeRing);

  const taiwanGroup = new THREE.Group();
  scene.add(taiwanGroup);
  const taiwanRing = makeRing(accent, 0.09);
  taiwanRing.position.set(yilanX, yilanY, 0.06);
  taiwanGroup.add(taiwanRing);

  // 目前形態與目標形態，每幀往目標靠近
  let target = scenes.globe;
  const current = {
    weights: [1, 0, 0, 0, 0],
    opacity: 0,
    size: target.size,
    scale: 1,
    offset: [0, 0],
  };

  const sceneValues = (config: typeof target) => {
    const narrow = window.innerWidth < 768;
    return {
      offset: narrow ? config.mobile.offset : config.offset,
      scale: narrow ? config.mobile.scale : config.scale,
      opacity: narrow ? config.mobile.opacity : config.opacity,
    };
  };

  const snapToTarget = () => {
    const values = sceneValues(target);
    current.weights = [...target.weights];
    current.opacity = values.opacity;
    current.scale = values.scale;
    current.size = target.size;
    current.offset = [...values.offset];
  };

  let time = 0;
  let last = performance.now();
  let frame = 0;
  let disposed = false;

  const update = (delta: number) => {
    const values = sceneValues(target);
    const ease = 1 - Math.exp(-delta * 2.4);
    current.weights = current.weights.map((value, i) => value + (target.weights[i] - value) * ease);
    current.opacity += (values.opacity - current.opacity) * ease;
    current.scale += (values.scale - current.scale) * ease;
    current.size += (target.size - current.size) * ease;
    current.offset = current.offset.map((value, i) => value + (values.offset[i] - value) * ease);
    uniforms.uBoot.value = Math.min(1, uniforms.uBoot.value + delta * 0.55);
  };

  const render = () => {
    const [wGlobe, wTaiwan, wTrident, wLattice, wWave] = current.weights;
    const globeRot = GLOBE_BASE_ROT - 0.24 + Math.sin(time * 0.1) * 0.2;

    uniforms.uTime.value = time;
    uniforms.uGlobeRot.value = globeRot;
    uniforms.uW.value.set(wGlobe, wTaiwan, wTrident, wLattice);
    uniforms.uWWave.value = wWave;
    uniforms.uOpacity.value = current.opacity;
    uniforms.uScale.value = current.scale;
    uniforms.uSize.value = current.size;
    uniforms.uOffset.value.set(current.offset[0], current.offset[1]);

    const boot = uniforms.uBoot.value;
    const pulse = (time * 0.6) % 1;

    globeGroup.rotation.set(GLOBE_TILT, globeRot, 0, "XYZ");
    globeGroup.position.set(current.offset[0], current.offset[1], 0);
    globeGroup.scale.setScalar(current.scale);
    arcUniforms.uFade.value = wGlobe * wGlobe * boot * current.opacity;
    (globeRing.material as THREE.MeshBasicMaterial).opacity = wGlobe * wGlobe * boot * (1 - pulse);
    globeRing.scale.setScalar(0.5 + pulse * 2);

    taiwanGroup.rotation.set(-0.25, Math.sin(time * 0.22) * 0.16, 0, "XYZ");
    taiwanGroup.position.set(current.offset[0], current.offset[1], 0);
    taiwanGroup.scale.setScalar(current.scale);
    (taiwanRing.material as THREE.MeshBasicMaterial).opacity = wTaiwan * wTaiwan * (1 - pulse);
    taiwanRing.scale.setScalar(0.6 + pulse * 2.4);

    renderer.render(scene, camera);
  };

  const loop = (now: number) => {
    if (disposed) return;
    frame = requestAnimationFrame(loop);
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += delta;
    update(delta);
    render();
  };

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // 視窗變窄時把鏡頭拉遠，形狀才不會被切掉
    camera.position.z = camera.aspect < 1.2 ? CAMERA_Z * 1.12 : CAMERA_Z;
    camera.updateProjectionMatrix();
    if (reducedMotion) {
      snapToTarget();
      render();
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    const halfHeight = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    uniforms.uPointer.value.set(
      ((event.clientX / window.innerWidth) * 2 - 1) * halfHeight * camera.aspect,
      (1 - (event.clientY / window.innerHeight) * 2) * halfHeight
    );
  };

  const onVisibility = () => {
    cancelAnimationFrame(frame);
    if (!document.hidden && !reducedMotion) {
      last = performance.now();
      frame = requestAnimationFrame(loop);
    }
  };

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  if (!isMobile && !reducedMotion) window.addEventListener("pointermove", onPointerMove);

  resize();
  if (reducedMotion) {
    snapToTarget();
    render();
  } else {
    frame = requestAnimationFrame(loop);
  }

  return {
    setScene(name) {
      target = scenes[name];
      if (reducedMotion) {
        snapToTarget();
        render();
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      arcGeometry.dispose();
      renderer.dispose();
    },
  };
}
