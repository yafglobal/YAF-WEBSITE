/**
 * Optimize gallery images in-place using Sharp.
 *
 * - Converts PNG/JPG to WebP (much smaller, supported by all modern browsers)
 * - Resizes to max 800px wide (gallery cards are 300px, so 800px gives 2x retina)
 * - Quality 80 — good balance of size vs visual fidelity
 * - Deletes the original after conversion
 *
 * Run: bun scripts/optimize-gallery.ts
 */

import sharp from "sharp";
import { readdir, unlink, stat } from "fs/promises";
import { join, extname, basename } from "path";

const GALLERY_DIRS = [
  "public/ukyaf",
  "public/yaf-canada",
  "public/usayaf",
  "public/usayaf/newimagesherousa",
];
const MAX_WIDTH = 800;
const WEBP_QUALITY = 80;

async function optimizeImage(filePath: string): Promise<{ saved: number }> {
  const ext = extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return { saved: 0 };

  const originalStat = await stat(filePath);
  const originalSize = originalStat.size;

  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");

  await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(webpPath);

  const newStat = await stat(webpPath);

  // Delete the original
  await unlink(filePath);

  const saved = originalSize - newStat.size;
  const pct = ((saved / originalSize) * 100).toFixed(0);
  console.log(
    `  ${basename(filePath)} → ${basename(webpPath)}  ` +
      `${(originalSize / 1024).toFixed(0)}KB → ${(newStat.size / 1024).toFixed(0)}KB  ` +
      `(-${pct}%)`
  );

  return { saved };
}

async function processDir(dir: string) {
  console.log(`\n${dir}/`);
  const files = await readdir(dir);
  let totalSaved = 0;
  let count = 0;

  for (const file of files.sort()) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) continue;

    const { saved } = await optimizeImage(filePath);
    totalSaved += saved;
    if (saved > 0) count++;
  }

  console.log(`  → ${count} images optimized, ${(totalSaved / 1024 / 1024).toFixed(1)}MB saved`);
  return totalSaved;
}

async function main() {
  console.log("Gallery Image Optimizer");
  console.log(`Max width: ${MAX_WIDTH}px | WebP quality: ${WEBP_QUALITY}`);

  let grandTotal = 0;
  for (const dir of GALLERY_DIRS) {
    grandTotal += await processDir(dir);
  }

  console.log(`\nTotal saved: ${(grandTotal / 1024 / 1024).toFixed(1)}MB`);
}

main().catch(console.error);
