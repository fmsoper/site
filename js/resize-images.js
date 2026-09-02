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
    .filter(file => /\.(jpe?g|png|tiff?)$/i.test(file))
    .sort()
    .reverse();

  const outputNames = [];

  await Promise.all(
    files.map(file => {
      const outputName = file.replace(/\.(jpe?g|png|tiff?)$/i, '.jpg');
      outputNames.push(outputName);

      return sharp(path.join(inputDir, file))
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(path.join(outputDir, outputName));
    })
  );

  fs.writeFileSync(manifestPath, JSON.stringify([...new Set(outputNames)], null, 2) + '\n');
  console.log(`Resized ${outputNames.length} image(s) and wrote ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});