#!/usr/bin/env node
/*
 * Renders every clip in every session to an MP4 (1920x1080, 30fps).
 *
 *   node tools/render-videos.js                 # all clips
 *   node tools/render-videos.js splash-and-ripple basics   # one clip
 *   node tools/render-videos.js --stills        # PNG stills of each step for checking
 *
 * Needs: Playwright (Chromium) and ffmpeg on the PATH.
 */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const FPS = 30;
const SCALE = 1.5; // 1280x720 logical → 1920x1080 video

const args = process.argv.slice(2);
const stills = args.includes('--stills');
const [onlySession, onlyClip] = args.filter(a => !a.startsWith('--'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(ROOT, 'index.html'));
  await page.waitForFunction(() => window.__player);
  // make sure the brand font is loaded before drawing frames
  await page.evaluate(() => Promise.all([document.fonts.load('600 20px Montserrat'), document.fonts.load('700 20px Montserrat')]).then(() => document.fonts.ready));

  const list = await page.evaluate(() => window.SESSIONS.map(s => ({ id: s.id, clips: s.clips.map(c => ({ id: c.id, video: c.video })) })));

  for (const s of list) {
    if (onlySession && s.id !== onlySession) continue;
    for (const c of s.clips) {
      if (onlyClip && c.id !== onlyClip) continue;
      const info = await page.evaluate(({ sid, cid, scale }) => {
        const session = window.SESSIONS.find(x => x.id === sid);
        const clip = session.clips.find(x => x.id === cid);
        const cv = document.createElement('canvas');
        window.__rp = new DrillEngine.DrillPlayer(cv, session, clip, { scale });
        window.__rc = cv;
        return { duration: window.__rp.duration, steps: window.__rp.cp.steps.map(st => ({ start: st.start, ph: st.phases, total: st.total })) };
      }, { sid: s.id, cid: c.id, scale: SCALE });

      if (stills) {
        const dir = path.join(ROOT, 'tools', 'stills');
        fs.mkdirSync(dir, { recursive: true });
        const times = [1.5];
        info.steps.forEach(st => {
          const p = st.ph;
          times.push(st.start + p.stepIn + p.arrows + p.read * 0.5);            // arrows shown
          times.push(st.start + p.stepIn + p.arrows + p.read + p.move * 0.5);   // mid-move
          times.push(st.start + st.total - 0.3);                                // end position
        });
        times.push(info.duration - 0.5);
        for (let i = 0; i < times.length; i++) {
          const data = await page.evaluate(t => { window.__rp.renderAt(t); return window.__rc.toDataURL('image/png'); }, times[i]);
          fs.writeFileSync(path.join(dir, `${s.id}-${c.id}-${String(i).padStart(2, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'));
        }
        console.log(`stills: ${s.id}/${c.id} (${times.length})`);
        continue;
      }

      const out = path.join(ROOT, c.video || `videos/${s.id}-${c.id}.mp4`);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-framerate', String(FPS), '-i', '-',
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '22', '-preset', 'medium', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
      const frames = Math.ceil(info.duration * FPS) + FPS; // +1s hold at the end
      for (let f = 0; f < frames; f++) {
        const data = await page.evaluate(t => { window.__rp.renderAt(t); return window.__rc.toDataURL('image/jpeg', 0.95); }, f / FPS);
        const buf = Buffer.from(data.split(',')[1], 'base64');
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      ff.stdin.end();
      await new Promise((res, rej) => ff.on('close', code => (code === 0 ? res() : rej(new Error('ffmpeg failed ' + code)))));
      console.log(`video: ${path.relative(ROOT, out)} (${info.duration.toFixed(1)}s)`);
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
