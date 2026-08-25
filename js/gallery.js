// js/gallery.js

const USERNAME = 'fmsoper';
const REPO = 'site';
const FOLDER = 'images/compressed';

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

        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });


        // Open lightbox when a thumbnail is clicked
        img.addEventListener('click', () => openLightbox(file.download_url, file.name));

        gallery.appendChild(img);
      });

    gallery.classList.add('loaded');
  })
  .catch(err => {
    document.getElementById('gallery').textContent = 'Could not load photos.';
    console.error(err);
  });


// --- Lightbox setup ---

// Create the lightbox elements once, up front, hidden by default
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';

const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

document.body.appendChild(lightbox);

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

// Close when clicking anywhere on the overlay (including the image itself)
lightbox.addEventListener('click', closeLightbox);

// Close on Escape key too
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});