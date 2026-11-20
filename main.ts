// news-image-20261120: copy the front-page image to the output directory,
// then verify the copy matches the source byte for byte.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
const inBytes = statSync(source).size;
const outBytes = statSync(target).size;
if (inBytes !== outBytes) {
  throw new Error(`entry.png copy mismatch: ${inBytes} bytes in, ${outBytes} bytes out`);
}
console.log(`wrote ${target} (${outBytes} bytes)`);
