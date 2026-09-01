// resize-images.js
//
// Resizes/compresses full-resolution photos into images/compressed, then
// writes manifest.json listing the output files. The gallery page reads
// that manifest locally at runtime instead of calling a remote API, so
// this script must be re-run (npm run resize-images) whenever photos are
// added, removed, or replaced.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './images/full';
const outputDir = './images/compressed';
const manifestPath = path.join(outputDir, 'manifest.json');

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs
    .readdirSync(inputDir)
    .filter(file => /\.(jpe?g|png)$/i.test(file))
    .sort();

  await Promise.all(
    files.map(file =>
      sharp(path.join(inputDir, file))
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(path.join(outputDir, file))
    )
  );

  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + '\n');
  console.log(`Resized ${files.length} image(s) and wrote ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});