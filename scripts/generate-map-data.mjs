// 產生粒子地圖用的座標資料（Natural Earth，經 world-atlas 取得）。
// 輸出 Int16 的 [緯度*100, 經度*100] 配對，換資料來源或密度時重跑：node scripts/generate-map-data.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const require = createRequire(import.meta.url);
const readAtlas = (name) => JSON.parse(readFileSync(require.resolve(`world-atlas/${name}`), "utf8"));

function writePoints(path, points) {
  const data = new Int16Array(points.length * 2);
  points.forEach(([lat, lon], i) => {
    data[i * 2] = Math.round(lat * 100);
    data[i * 2 + 1] = Math.round(lon * 100);
  });
  writeFileSync(path, Buffer.from(data.buffer));
  console.log(path, points.length, "points", data.byteLength, "bytes");
}

/** 用費波那契球面取均勻分布的點，只留在陸地上的。 */
function sampleLand(total) {
  const atlas = readAtlas("land-50m.json");
  const land = feature(atlas, atlas.objects.land);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const points = [];
  for (let i = 0; i < total; i++) {
    const y = 1 - (i / (total - 1)) * 2;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = ((((i * golden * 180) / Math.PI) % 360) + 540) % 360 - 180;
    if (geoContains(land, [lon, lat])) points.push([lat, lon]);
  }
  return points;
}

/** 只取台灣本島，排除金門馬祖等離島。 */
function sampleTaiwan(total) {
  const atlas = readAtlas("countries-10m.json");
  const countries = feature(atlas, atlas.objects.countries);
  const taiwan = countries.features.find((f) => f.properties.name === "Taiwan");
  if (!taiwan) throw new Error("找不到 Taiwan");
  const points = [];
  while (points.length < total) {
    const lat = 21.85 + Math.random() * 3.5;
    const lon = 119.95 + Math.random() * 2.1;
    if (geoContains(taiwan, [lon, lat])) points.push([lat, lon]);
  }
  return points;
}

writePoints("public/data/land.bin", sampleLand(34000));
writePoints("public/data/taiwan.bin", sampleTaiwan(6000));
