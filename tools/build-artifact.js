#!/usr/bin/env node
/*
 * Packs index.html into one self-contained page for publishing as a shareable link:
 * scripts and images are inlined, the brand font comes from Google Fonts,
 * and MP4 download buttons are hidden (the hosted page can't offer file downloads).
 *
 *   node tools/build-artifact.js <output.html>
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const out = process.argv[2];
if (!out) { console.error('usage: node tools/build-artifact.js <output.html>'); process.exit(1); }

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const mime = { '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
const dataUri = rel => `data:${mime[path.extname(rel)]};base64,${fs.readFileSync(path.join(ROOT, rel)).toString('base64')}`;

// document wrapper and head links are supplied by the host
html = html
  .replace(/<!doctype html>\s*/i, '')
  .replace(/<\/?html[^>]*>\s*/gi, '')
  .replace(/<\/?head>\s*/gi, '')
  .replace(/<\/?body>\s*/gi, '')
  .replace(/<meta charset[^>]*>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .replace(/<link rel="(icon|apple-touch-icon)"[^>]*>\s*/gi, '')
  .replace(/<meta name="theme-color"[^>]*>\s*/i, '');

// fonts: Google Fonts instead of the local files
html = html.replace(/\/\* LOCAL-FONTS-START \*\/[\s\S]*?\/\* LOCAL-FONTS-END \*\//, '');
html = html.replace('<style>', '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap">\n<style>');

// inline scripts
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
  const code = fs.readFileSync(path.join(ROOT, src), 'utf8');
  if (/<\/script/i.test(code)) throw new Error('script contains </script>: ' + src);
  return `<script>/* ${src} */\n${code}</script>`;
});
html = html.replace('<script>/*', '<script>window.NO_DOWNLOADS = true;</script>\n<script>/*');
// drop the MP4 download link entirely (it would do nothing on the hosted page)
html = html.replace(/<a href="\$\{esc\(clip\.video\)\}" download>[^<]*<\/a>/, '');

// inline images referenced by the page and by session data (thumbnails)
html = html.replace(/(["'])(assets\/[^"']+\.(?:svg|jpg|png))\1/g, (m, q, rel) => q + dataUri(rel) + q);

fs.writeFileSync(out, html);
console.log(`wrote ${out} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
