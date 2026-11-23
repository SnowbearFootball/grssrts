#!/usr/bin/env node
/*
 * Builds the GRSS | RTS logo: "GRSS" then "RTS" standing in a football goal.
 * The goal's left post is the divider. Behind the crossbar a roof runs back (up and to the right),
 * then the stanchions angle down to the ground, with the net drawn in perspective on each panel
 * (roof, sides, sloping back).
 * Letters are converted to outlines, so the SVGs look identical everywhere.
 *
 *   npm i opentype.js@1.3.4   (once)
 *   node tools/build-logo.js
 *
 * Writes: assets/logo/*.svg and js/logo-data.js (used by the video engine).
 * Then run  node tools/build-logo-png.js  to make the PNG versions (needs Playwright).
 */
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const COLORS = { forest: '#16351f', orange: '#d9622b', cream: '#f2e6cd', white: '#ffffff' };
const font = opentype.loadSync(path.join(ROOT, 'assets/fonts/montserrat-700.woff'));
const EM = 100, TRACK = 0.09 * EM, BASE = 100;
const f2 = n => +n.toFixed(2);

function word(text, x0) {
  let x = x0, d = '';
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(x, BASE, EM).toPathData(2);
    x += (g.advanceWidth / font.unitsPerEm) * EM + TRACK;
  }
  return { d, end: x - TRACK };
}
const capH = (font.charToGlyph('H').getBoundingBox().y2 / font.unitsPerEm) * EM;

// ---------- goal geometry (all in font units, EM = 100) ----------
const G = {
  pw: 5.5,          // front post / crossbar thickness
  ox: 26, oy: 12,   // depth direction: right and up (one unit of depth)
  roof: 0.9,        // how far back the roof runs before the stanchions angle down
  depth: 1.7,       // how far back the net meets the ground
  padL: 20, padR: 12, padTop: 18, below: 5,
  cell: 13,         // net mesh size
  net: 0.5, back: 0.28,
};
function goalGeometry(x0, rtsWidth) {
  const h = G.pw / 2;
  const W = G.padL + rtsWidth + G.padR;
  const L = x0 + h, R = x0 + W - h, T = BASE - capH - G.padTop + h, B = BASE + G.below;
  // roof back (top of the stanchions) and ground back (where the net meets the ground)
  const rL = L + G.ox * G.roof, rR = R + G.ox * G.roof, rT = T - G.oy * G.roof;
  const gL = L + G.ox * G.depth, gR = R + G.ox * G.depth, gB = B - G.oy * G.depth;
  return { L, R, T, B, rL, rR, rT, gL, gR, gB, bT: rT, bR: gR, rtsX: x0 + G.padL };
}
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
// Diamond mesh drawn in the plane of a panel (quad p0-p1 / p3-p2), returned as one path string
function mesh(p0, p1, p2, p3) {
  const nu = Math.max(2, Math.round(Math.max(dist(p0, p1), dist(p3, p2)) / G.cell));
  const nv = Math.max(1, Math.round(Math.max(dist(p0, p3), dist(p1, p2)) / G.cell));
  const P = (u, v) => lerp(lerp(p0, p1, u), lerp(p3, p2, u), v);
  let d = '';
  const seg = pts => { if (pts.length > 1) { const a = pts[0], b = pts[pts.length - 1]; d += `M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}`; } };
  for (let k = -nv; k <= nu; k++) {
    const a = [], b = [];
    for (let j = 0; j <= nv; j++) {
      const u1 = (k + j) / nu, u2 = (k + nv - j) / nu, v = j / nv;
      if (u1 >= 0 && u1 <= 1) a.push(P(u1, v));
      if (u2 >= 0 && u2 <= 1) b.push(P(u2, v));
    }
    seg(a); seg(b);
  }
  return d;
}
const line = (a, b) => `M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}`;

// Strokes making up the goal: [{ d, w, op }] (net layers first, front frame last)
function goalStrokes(g, withNet) {
  const { L, R, T, B, rL, rR, rT, gL, gR, gB } = g;
  const sw = EM / 64;
  const s = [];
  if (withNet) {
    // far panels faint (the sloping back net, the left side); near panels stronger (the roof, the right side)
    s.push({ d: mesh([rL, rT], [rR, rT], [gR, gB], [gL, gB]) + mesh([L, T], [rL, rT], [gL, gB], [L, B]), w: sw, op: G.net * G.back });
    s.push({ d: mesh([L, T], [R, T], [rR, rT], [rL, rT]) + mesh([R, T], [rR, rT], [gR, gB], [R, B]), w: sw, op: G.net });
  }
  s.push({ d: line([rL, rT], [rR, rT]), w: sw * 1.8, op: 0.8 });                 // back of the roof
  s.push({ d: line([L, T], [rL, rT]), w: sw * 1.6, op: 0.75 });                  // roof sides
  s.push({ d: line([R, T], [rR, rT]), w: sw * 1.8, op: 0.85 });
  s.push({ d: line([rR, rT], [gR, gB]), w: sw * 2.2, op: 0.9 });                 // angled stanchions
  s.push({ d: line([rL, rT], [gL, gB]), w: sw * 1.6, op: 0.5 });
  s.push({ d: line([R, B], [gR, gB]), w: sw * 1.4, op: 0.6 });                   // ground bars
  s.push({ d: line([L, B], [gL, gB]), w: sw * 1.2, op: 0.4 });
  s.push({ d: line([gL, gB], [gR, gB]), w: sw * 1.2, op: 0.4 });
  s.push({ d: `M${f2(L)} ${f2(B)}V${f2(T)}H${f2(R)}V${f2(B)}`, w: G.pw, op: 1, join: 'miter' });
  return s;
}

// ---------- wordmark layout ----------
const g1 = word('GRSS', 0);
const goalX = g1.end + 0.16 * EM;
const rtsProbe = word('RTS', 0);
const goal = goalGeometry(goalX, rtsProbe.end);
const g2 = word('RTS', goal.rtsX);
const pad = 3;
const VB = { x: -pad, y: f2(goal.bT - pad), w: f2(goal.bR + pad * 2), h: f2(goal.B - goal.bT + pad * 2) };

// stand-alone goal + RTS (for the square icon)
const iconGoal = goalGeometry(0, rtsProbe.end);
const iconRts = word('RTS', iconGoal.rtsX);

function strokesSvg(strokes, colour) {
  return strokes.map(s => `<path d="${s.d}" fill="none" stroke="${colour}" stroke-width="${f2(s.w)}" stroke-linecap="${s.join ? 'butt' : 'round'}"${s.join ? ' stroke-linejoin="miter"' : ''}${s.op < 1 ? ` opacity="${s.op}"` : ''}/>`).join('\n');
}
function wordmark({ grss, goal: cGoal, rts, net = true, label }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" role="img" aria-label="GRSS | RTS">
<title>GRSS | RTS${label ? ' (' + label + ')' : ''}</title>
<path d="${g1.d}" fill="${grss}"/>
${strokesSvg(goalStrokes(goal, net), cGoal)}
<path d="${g2.d}" fill="${rts}"/>
</svg>\n`;
}

const out = path.join(ROOT, 'assets/logo');
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (/\.svg$/.test(f)) fs.unlinkSync(path.join(out, f));   // PNGs: tools/build-logo-png.js
const C = COLORS;
fs.writeFileSync(path.join(out, 'grss-rts.svg'), wordmark({ grss: C.forest, goal: C.forest, rts: C.orange, label: 'main' }));
fs.writeFileSync(path.join(out, 'grss-rts-on-dark.svg'), wordmark({ grss: C.cream, goal: C.cream, rts: C.orange, label: 'on dark' }));
fs.writeFileSync(path.join(out, 'grss-rts-forest.svg'), wordmark({ grss: C.forest, goal: C.forest, rts: C.forest, label: 'one colour' }));
fs.writeFileSync(path.join(out, 'grss-rts-white.svg'), wordmark({ grss: C.white, goal: C.white, rts: C.white, label: 'white' }));
fs.writeFileSync(path.join(out, 'grss-rts-kit.svg'), wordmark({ grss: C.forest, goal: C.forest, rts: C.orange, net: false, label: 'simplified, for embroidery' }));
fs.writeFileSync(path.join(out, 'grss-rts-kit-white.svg'), wordmark({ grss: C.white, goal: C.white, rts: C.white, net: false, label: 'simplified, white' }));

// Square app icon: GRSS stacked over RTS-in-the-goal, cream and orange on forest
{
  const S = 512, maxW = 372, gap = 22;
  const grssBox = { x: 0, y: BASE - capH, w: g1.end, h: capH };
  const goalBox = { x: iconGoal.L - G.pw / 2, y: iconGoal.bT - 1, w: iconGoal.bR + 1 - (iconGoal.L - G.pw / 2), h: iconGoal.B + G.pw / 2 - iconGoal.bT + 1 };
  const k = Math.min(maxW / grssBox.w, maxW / goalBox.w);
  const top = (S - (grssBox.h + goalBox.h) * k - gap) / 2;
  const place = (box, y) => `translate(${f2((S - box.w * k) / 2 - box.x * k)} ${f2(y - box.y * k)}) scale(${f2(k)})`;
  fs.writeFileSync(path.join(out, 'grss-rts-icon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-label="GRSS | RTS"><title>GRSS | RTS icon</title>
<rect width="${S}" height="${S}" rx="112" fill="${C.forest}"/>
<g transform="${place(grssBox, top)}"><path d="${g1.d}" fill="${C.cream}"/></g>
<g transform="${place(goalBox, top + grssBox.h * k + gap)}">
${strokesSvg(goalStrokes(iconGoal, true), C.cream)}
<path d="${iconRts.d}" fill="${C.orange}"/>
</g></svg>\n`);
}

// Data for the canvas video engine (drawn with Path2D, on-dark colours)
fs.writeFileSync(path.join(ROOT, 'js/logo-data.js'),
  `// Generated by tools/build-logo.js — do not edit by hand.\nwindow.GRSS_LOGO = ${JSON.stringify({
    vb: VB, grss: g1.d, rts: g2.d, goal: goalStrokes(goal, true), colors: C,
  })};\n`);
console.log('logo files written', VB);
