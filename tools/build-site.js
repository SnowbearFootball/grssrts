#!/usr/bin/env node
/*
 * Builds the upload folder + zip for Cloudflare Pages.
 * Every local script, image and font link in index.html gets "?v=<content hash>", so after each upload
 * browsers fetch the new files instead of mixing in old cached copies.
 *
 *   node tools/build-site.js <output-folder>     (writes <output-folder>/grssrts and <output-folder>/grssrts-site.zip)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const outBase = path.resolve(process.argv[2] || path.join(ROOT, 'dist'));
const out = path.join(outBase, 'grssrts');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const dir of ['js', 'drills', 'assets', 'videos']) fs.cpSync(path.join(ROOT, dir), path.join(out, dir), { recursive: true });

const hash = rel => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex').slice(0, 8);
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
html = html.replace(/((?:src|href)=["']|url\()((?:js|drills|assets)\/[^"')?#]+)/g, (m, pre, rel) =>
  fs.existsSync(path.join(ROOT, rel)) ? `${pre}${rel}?v=${hash(rel)}` : m);
fs.writeFileSync(path.join(out, 'index.html'), html);

// Ask Cloudflare to always check for a new index.html (the page itself carries the version stamps)
fs.writeFileSync(path.join(out, '_headers'), '/\n  Cache-Control: no-cache\n/index.html\n  Cache-Control: no-cache\n');

const zip = path.join(outBase, 'grssrts-site.zip');
fs.rmSync(zip, { force: true });
execFileSync('zip', ['-qr', zip, '.'], { cwd: out });
const count = execFileSync('find', ['.', '-type', 'f'], { cwd: out }).toString().trim().split('\n').length;
console.log(`built ${zip} (${count} files)`);
