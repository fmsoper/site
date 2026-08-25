// resize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './images/full';
const outputDir = './images/compressed';

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(file => {
  if (!/\.(jpe?g|png)$/i.test(file)) return;

  sharp(path.join(inputDir, file))
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(path.join(outputDir, file));
});