import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const threeBuild = join(root, "node_modules/three/build/three.module.min.js");
const orbitSource = join(root, "node_modules/three/examples/jsm/controls/OrbitControls.js");
const vendorDir = join(root, "www/vendor/three");
const controlsDir = join(vendorDir, "addons/controls");

for (const file of [threeBuild, orbitSource]) {
  if (!existsSync(file)) {
    throw new Error(`Arquivo do Three.js não encontrado: ${file}. Rode npm ci primeiro.`);
  }
}

mkdirSync(controlsDir, { recursive: true });
copyFileSync(threeBuild, join(vendorDir, "three.module.min.js"));

// Troca o import "three" por caminho relativo para o APK funcionar 100% offline,
// sem depender de import maps ou CDN.
const orbit = readFileSync(orbitSource, "utf8").replace(
  /from\s+(['"])three\1/g,
  "from '../../three.module.min.js'"
);
writeFileSync(join(controlsDir, "OrbitControls.js"), orbit);

console.log("Three.js copiado para www/vendor/three (APK offline).");
