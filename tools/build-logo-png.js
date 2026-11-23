#!/usr/bin/env node
/*
 * Makes the PNG versions of the logo from the SVGs in assets/logo (run after tools/build-logo.js).
 * Needs Playwright (Chromium).
 *
 *   node tools/build-logo-png.js
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '..', 'assets/logo');
const svg = name => 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(DIR, name)).toString('base64');
const CREAM = '#f2e6cd', FOREST = '#16351f';

// [file, width, height, background (null = transparent), svg, image width, square icon without rounded corners]
const JOBS = [
  ['grss-rts-cream-2000.png', 2000, 600, CREAM, 'grss-rts.svg', 1760],
  ['grss-rts-forest-2000.png', 2000, 600, FOREST, 'grss-rts-on-dark.svg', 1760],
  ['grss-rts-transparent-2000.png', 2000, 600, null, 'grss-rts.svg', 1760],
  ['grss-rts-kit-2000.png', 2000, 600, null, 'grss-rts-kit.svg', 1760],
  ['grss-rts-icon-512.png', 512, 512, null, 'grss-rts-icon.svg', 512],
  // phones round the corners themselves, so the home-screen icons are full squares
  ['apple-touch-icon.png', 180, 180, null, 'grss-rts-icon.svg', 180, true],
  ['icon-192.png', 192, 192, null, 'grss-rts-icon.svg', 192, true],
  ['icon-512-maskable.png', 512, 512, null, 'grss-rts-icon.svg', 512, true],
];

(async () => {
  const browser = await chromium.launch();
  for (const [file, w, h, bg, src, iw, square] of JOBS) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    let img = svg(src);
    if (square) img = 'data:image/svg+xml;base64,' + Buffer.from(fs.readFileSync(path.join(DIR, src), 'utf8').replace(/rx="\d+"/, 'rx="0"')).toString('base64');
    await page.setContent(`<html><body style="margin:0;width:${w}px;height:${h}px;display:grid;place-items:center;background:${bg || 'transparent'}">
      <img src="${img}" style="width:${iw}px;height:auto;display:block"></body></html>`);
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(DIR, file), omitBackground: !bg });
    await page.close();
    console.log('png: ' + file);
  }
  await browser.close();
})();
