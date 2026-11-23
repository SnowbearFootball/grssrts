#!/usr/bin/env node
/*
 * Renders the Minis versions of solo clips: Grass and Roots beside the feet view (1920 x 1080, 25 fps),
 * for every clip in a session marked  minis: true  that has a  minisVideo  path.
 *
 *   node tools/render-minis.js               # all
 *   node tools/render-minis.js ball-mastery toe-taps
 *
 * Needs Playwright (Chromium) and ffmpeg.
 */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FPS = 25;
const [onlyS, onlyC] = process.argv.slice(2);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const probe = await browser.newPage();
  await probe.goto('file://' + path.join(ROOT, 'tools/minis-frame.html') + '?s=ball-mastery&c=toe-taps');
  const list = await probe.evaluate(() => SESSIONS.filter(s => s.minis).map(s => ({ id: s.id, clips: s.clips.filter(c => c.minisVideo).map(c => ({ id: c.id, out: c.minisVideo })) })));
  for (const s of list) {
    if (onlyS && s.id !== onlyS) continue;
    for (const c of s.clips) {
      if (onlyC && c.id !== onlyC) continue;
      await page.goto('file://' + path.join(ROOT, 'tools/minis-frame.html') + `?s=${s.id}&c=${c.id}`);
      await page.waitForFunction(() => window.READY);
      const dur = await page.evaluate(() => DUR), n = Math.ceil(dur * FPS) + FPS;
      const out = path.join(ROOT, c.out);
      const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '22', '-movflags', '+faststart', out]);
      for (let i = 0; i < n; i++) {
        await page.evaluate(t => frame(t), Math.min(i / FPS, dur));
        const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      ff.stdin.end();
      await new Promise((res, rej) => ff.on('close', code => (code === 0 ? res() : rej(new Error('ffmpeg ' + code)))));
      console.log(`minis video: ${c.out} (${dur.toFixed(1)}s)`);
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
