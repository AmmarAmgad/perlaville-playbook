// Generates responsive WebP copies of every PNG in public/images.
//
//   public/images/hair-tonic.png  ->  public/images/opt/hair-tonic-{160..1280}.webp
//
// The site's image loader (lib/image-loader.ts) points <Image> at these files,
// so browsers download a ~20-90 KB WebP sized for the screen instead of the
// 1-2.5 MB original. Runs automatically before `npm run dev` and `npm run build`;
// files that are already up to date are skipped.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Keep in sync with WIDTHS in lib/image-loader.ts.
const WIDTHS = [160, 320, 480, 640, 960, 1280];

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "public", "images");
const outDir = path.join(srcDir, "opt");
fs.mkdirSync(outDir, { recursive: true });

const sources = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".png"));
let written = 0;

for (const file of sources) {
  const src = path.join(srcDir, file);
  const srcTime = fs.statSync(src).mtimeMs;
  const name = path.basename(file, path.extname(file));

  for (const width of WIDTHS) {
    const out = path.join(outDir, `${name}-${width}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;

    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90, effort: 5 })
      .toFile(out);
    written++;
  }
}

console.log(
  written
    ? `optimize-images: wrote ${written} WebP file(s) to public/images/opt`
    : "optimize-images: all images up to date",
);
