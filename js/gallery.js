// js/gallery.js

const USERNAME = 'fmsoper';
const REPO = 'site';
const FOLDER = 'images';

fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/contents/${FOLDER}`)
  .then(res => res.json())
  .then(files => {
    const gallery = document.getElementById('gallery');
    files
      .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f.name))
      .forEach(file => {
        const img = document.createElement('img');
        img.src = file.download_url;
        img.alt = file.name;
        img.loading = 'lazy';
        gallery.appendChild(img);
      });
  })
  .catch(err => {
    document.getElementById('gallery').textContent = 'Could not load photos.';
    console.error(err);
  });