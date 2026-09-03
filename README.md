# fmsoper.com

A personal site to host my photography and practice HTML/CSS/JS from scratch, with no frameworks.

## Structure

- `index.html` — homepage (bio)
- `html/photography.html` — photo gallery
- `html/contact.html` — contact details 
- `css/styles.css` — all site styling
- `js/` — page scripts (gallery loading, lightbox, email obfuscation)
- `assets/` — icons
- `fonts/` — self-hosted webfonts
- `images/compressed/` — web-optimized photos, served to visitors
- `images/full/` — full-resolution source photos (not committed — see below)

## Photo workflow

Full-resolution originals live in `images/full/`, which is gitignored.
To add or update photos:

1. Drop full-resolution images into `images/full/`
2. Install dependencies: `npm install`
3. Run `npm run resize-images`

This resizes and compresses each image into `images/compressed/` and regenerates `images/compressed/manifest.json`, which the gallery page reads at runtime to know which photos to display. The manifest needs to be committed along with the resized images.

## Local development

Static HTML/CSS/JS. Built in VS Code using the Live Server extension.
