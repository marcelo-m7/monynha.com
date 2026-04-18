import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const foldersToOptimize = [
  path.join(root, 'assets'),
  path.join(root, 'public'),
];

const rasterExtensions = new Set(['.png', '.jpg', '.jpeg']);

const walk = async (dir, files = []) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (rasterExtensions.has(ext) && !entry.name.endsWith('.webp')) {
      files.push(fullPath);
    }
  }

  return files;
};

const optimizeImage = async (inputPath) => {
  const ext = path.extname(inputPath).toLowerCase();
  const outputWebpPath = `${inputPath.slice(0, -ext.length)}.webp`;
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  if ((metadata.width || 0) > 2400) {
    image.resize({ width: 2400, withoutEnlargement: true });
  }

  if (ext === '.png') {
    await image.png({ quality: 82, compressionLevel: 9, palette: true }).toFile(inputPath);
  } else {
    await image.jpeg({ quality: 82, mozjpeg: true }).toFile(inputPath);
  }

  await sharp(inputPath)
    .webp({ quality: 80, effort: 6 })
    .toFile(outputWebpPath);
};

const run = async () => {
  const allFiles = [];

  for (const folder of foldersToOptimize) {
    try {
      await fs.access(folder);
      const files = await walk(folder);
      allFiles.push(...files);
    } catch {
      // Ignore missing folders.
    }
  }

  for (const file of allFiles) {
    // Sequential processing keeps memory predictable on CI runners.
    await optimizeImage(file);
    console.log(`Optimized ${path.relative(root, file)}`);
  }

  console.log(`Image optimization completed. Files processed: ${allFiles.length}`);
};

run().catch((error) => {
  console.error('Failed to optimize images.', error);
  process.exit(1);
});
