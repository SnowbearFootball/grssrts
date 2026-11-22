/*
 * Drill animation engine
 * ----------------------
 * Draws a coaching clip onto a <canvas> at any point in time.
 * Each step of a clip plays in phases:
 *   1. caption fades in
 *   2. arrows draw on (planned runs / passes)
 *   3. short pause to read
 *   4. players and ball move
 *   5. hold on the end position
 *
 * Everything is a pure function of time, so the same code drives the
 * in-browser player, scrubbing, and frame-by-frame MP4 rendering.
 *
 * Pitch units: x 0..100 (left to right), y 0..75 (top to bottom).
 * The defending team defends the goal at the BOTTOM of the pitch.
 */
(function (global) {
  'use strict';

  const W = 1280, H = 720;
  const FONT = 'Montserrat, "Segoe UI", Roboto, "Liberation Sans", Arial, sans-serif';

  const C = {
    // GRSS | RTS brand palette: forest green, burnt orange, cream
    bg: '#16351f',          // forest frame
    panel: '#1e4128',
    panelEdge: '#2b5233',
    accent: '#d9622b',      // burnt orange: titles, tags, Splash, progress
    accent2: null,          // optional second tone for stripes (e.g. mown-grass themes)
    accentSoft: '#f0905e',  // lighter orange: highlighted words, key phrase
    accentDark: '#122b19',  // key-phrase box
    accentDark2: null,
    accentMid: '#8a4422',   // borders, completed step dots
    string: 'rgba(217,98,43,0.7)',
    block: '#e5484d',       // the ✕ on a blocked lane
    pitchStripe: null,      // set a second pitch colour for mown stripes on the pitch itself
    text: '#f2e6cd',        // cream
    subText: '#ddd3be',
    muted: '#b4c2ae',
    track: '#2b5233',
    dotOff: '#2f5a39',
    overlay: 'rgba(18,43,25,0.93)',
    pitch: '#eef0f2',
    pitchDot: '#d4d8dd',
    pitchEdge: '#c9ced4',
    attack: '#2fbf7f',     // green, as in the coaching diagrams
    defend: '#3b9ae1',
    arrow: '#2b2b2b',
    danger: '#e5484d',
    keeper: '#2b2b2b',
  };
  // Per-clip extra team colours: clip.teamColors = { r: '#e5484d', ... }
  function teamColor(cp, team) { return (cp.clip.teamColors && cp.clip.teamColors[team]) || TEAM_COLOR[team] || C.attack; }
  const TEAM_COLOR = { get a() { return C.attack; }, get d() { return C.defend; }, get k() { return C.keeper; } };

  const PITCH = { x: 40, y: 88, w: 780, h: 600, pad: 26, uw: 100, uh: 75 };
  const PANEL = { x: 848, y: 88, w: 392, h: 600 };
  // player radius; a clip can shrink players with playerScale (e.g. 0.85) to give the pitch more room
  let R_PX = 17;                                     // player radius in px
  let R_U = R_PX / ((PITCH.w - 2 * PITCH.pad) / PITCH.uw); // radius in pitch units
  function setPlayerScale(k) { R_PX = 17 * (k || 1); R_U = R_PX / ((PITCH.w - 2 * PITCH.pad) / PITCH.uw); }

  const DEFAULT_TIMING = { intro: 3.5, stepIn: 0.6, arrows: 1.6, read: 1.8, move: 2.6, hold: 2.2, outro: 5 };

  // ---------- maths helpers ----------
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const lerpP = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
  const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
  const EASE = {
    linear: k => k,
    inOut: k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
    out: k => 1 - Math.pow(1 - k, 3),                // fast then slow  (FAST → SLOW → LOW)
    in: k => k * k * k,
    pass: k => 1 - Math.pow(1 - k, 2),
  };
  const toPx = p => [
    PITCH.x + PITCH.pad + (p[0] / PITCH.uw) * (PITCH.w - 2 * PITCH.pad),
    PITCH.y + PITCH.pad + (p[1] / PITCH.uh) * (PITCH.h - 2 * PITCH.pad),
  ];

  function alongPath(pts, k) {
    if (pts.length === 1 || k <= 0) return pts[0].slice();
    const lens = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) { const l = dist(pts[i - 1], pts[i]); lens.push(l); total += l; }
    if (total === 0 || k >= 1) return pts[pts.length - 1].slice();
    let d = k * total;
    for (let i = 0; i < lens.length; i++) {
      if (d <= lens[i]) return lerpP(pts[i], pts[i + 1], lens[i] ? d / lens[i] : 1);
      d -= lens[i];
    }
    return pts[pts.length - 1].slice();
  }

  // Trim a polyline by `a` units at the start and `b` units at the end.
  function trimPath(pts, a, b) {
    let total = 0;
    for (let i = 1; i < pts.length; i++) total += dist(pts[i - 1], pts[i]);
    if (total <= a + b + 0.5) return null;
    const out = [];
    const N = 24;
    for (let i = 0; i <= N; i++) out.push(alongPath(pts, (a + (total - a - b) * (i / N)) / total));
    return out;
  }

  // ---------- compile a clip into a timeline ----------
  function compile(clip) {
    setPlayerScale(clip.playerScale);
    const timing = Object.assign({}, DEFAULT_TIMING, clip.timing || {});
    const team = {};
    const pos = {};
    clip.players.forEach(p => { team[p.id] = p.team; pos[p.id] = [p.x, p.y]; });
    let state = {
      pos,
      ball: clip.ball && clip.ball.owner ? { owner: clip.ball.owner } : { owner: null, at: clip.ball ? clip.ball.at : [50, 37] },
      used: clip.ball && clip.ball.owner ? [clip.ball.owner] : [],   // players whose own ball is in play / used
      spent: [],                                                      // finished balls left where they ended (e.g. in the net)
    };

    let t = timing.intro;
    const steps = clip.steps.map((def, index) => {
      const d = Object.assign({}, timing, def.timing || {});
      const moves = def.moves || [];
      // ball.give: at the start of this step, the given player's own ball comes into play
      if (def.ball && def.ball.give) {
        if (!state.ball.owner && state.ball.at) state.spent.push(state.ball.at.slice());
        state.ball = { owner: def.ball.give };
        if (!state.used.includes(def.ball.give)) state.used.push(def.ball.give);
      }
      const hasArrows = moves.some(m => m.arrow !== false) || (def.ball && def.ball.arrow !== false) || !!(def.passes && def.passes.length);
      const hasMotion = moves.length > 0 || !!def.ball || !!(def.passes && def.passes.length);
      const phases = {
        stepIn: d.stepIn,
        arrows: hasArrows ? d.arrows : 0,
        read: d.read,
        move: hasMotion ? d.move : 0,
        hold: d.hold,
      };
      const total = phases.stepIn + phases.arrows + phases.read + phases.move + phases.hold;
      const startState = JSON.parse(JSON.stringify(state));
      const endState = JSON.parse(JSON.stringify(state));
      moves.forEach(m => { const path = m.path || [m.to]; endState.pos[m.id] = path[path.length - 1].slice(); });
      if (def.passes && def.passes.length) endState.ball = { owner: def.passes[def.passes.length - 1].to };
      if (def.ball) {
        if (def.ball.pass) endState.ball = { owner: def.ball.pass };
        else if (def.ball.to) endState.ball = { owner: null, at: def.ball.to.slice() };
      }
      const step = { def, index, start: t, total, phases, startState, endState };
      t += total;
      state = endState;
      return step;
    });
    const outro = clip.summary ? timing.outro : 1.0;
    return { clip, timing, team, steps, outroStart: t, duration: t + outro, finalState: state };
  }

  // ---------- positions at a given moment ----------
  function playerPos(step, id, u) {
    const m = (step.def.moves || []).find(mm => mm.id === id);
    const from = step.startState.pos[id];
    if (!m) return from.slice();
    const s = m.start != null ? m.start : 0, e = m.end != null ? m.end : 1;
    const k = EASE[m.ease || 'inOut'](clamp((u - s) / (e - s)));
    return alongPath([from].concat(m.path || [m.to]), k);
  }

  function ballOffset(cp, id) {
    // attackers face down the pitch, defenders face up it (a clip can override with facing: { a: -1 })
    const f = cp.clip.facing && cp.clip.facing[cp.team[id]];
    const dir = f != null ? f : cp.team[id] === 'a' ? 1 : -1;
    return [0, dir * (R_U + 1.3)];
  }

  function attached(cp, step, id, u) {
    const p = playerPos(step, id, u);
    const o = ballOffset(cp, id);
    return [p[0] + o[0], p[1] + o[1]];
  }

  function ballStartPos(cp, step, u) {
    const b = step.startState.ball;
    return b.owner ? attached(cp, step, b.owner, u) : b.at.slice();
  }

  // A sequence of passes in one step: def.passes = [{ to, start, end }, ...] (start/end are 0..1 of the move phase)
  function passSeq(cp, step) {
    let from = step.startState.ball.owner;
    return step.def.passes.map((ps, i) => {
      const seg = { from, to: ps.to, s: ps.start != null ? ps.start : i / step.def.passes.length, e: ps.end };
      if (seg.e == null) seg.e = seg.s + 0.6 / step.def.passes.length;
      from = ps.to;
      return seg;
    });
  }
  function ballPos(cp, step, u) {
    if (step.def.passes && step.def.passes.length) {
      const segs = passSeq(cp, step);
      if (u <= segs[0].s) return ballStartPos(cp, step, u);
      for (let i = 0; i < segs.length; i++) {
        const g = segs[i];
        if (u < g.s) return attached(cp, step, segs[i - 1].to, u);
        if (u <= g.e) {
          const a = g.from ? attached(cp, step, g.from, g.s) : ballStartPos(cp, step, g.s);
          return lerpP(a, attached(cp, step, g.to, g.e), EASE.pass(clamp((u - g.s) / (g.e - g.s))));
        }
      }
      return attached(cp, step, segs[segs.length - 1].to, u);
    }
    const act = step.def.ball;
    if (!act || (!act.pass && !act.to)) return ballStartPos(cp, step, u);   // e.g. ball.give only
    const s = act.start != null ? act.start : 0;
    const e = act.end != null ? act.end : 0.4;
    const target = u2 => (act.pass ? attached(cp, step, act.pass, u2) : act.to.slice());
    if (u <= s) return ballStartPos(cp, step, u);
    if (u >= e) return target(u);
    const k = EASE.pass(clamp((u - s) / (e - s)));
    return lerpP(ballStartPos(cp, step, s), target(e), k);
  }

  // ---------- drawing primitives ----------
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Fill a rect with alternating bands (mown-grass stripes). vertical=true → bands run top to bottom.
  function fillStripes(ctx, x, y, w, h, c1, c2, band, vertical) {
    ctx.fillStyle = c1;
    ctx.fillRect(x, y, w, h);
    if (!c2) return;
    ctx.fillStyle = c2;
    const len = vertical ? w : h;
    for (let i = 1; i * band < len; i += 2) {
      if (vertical) ctx.fillRect(x + i * band, y, Math.min(band, w - i * band), h);
      else ctx.fillRect(x, y + i * band, w, Math.min(band, h - i * band));
    }
  }

  // scale: clip.goalScale makes the goal bigger for close-ups (e.g. goalkeeping); depth grows less than width
  function drawGoal(ctx, cx, cy, scale) {
    const k = scale || 1;
    const w = 64 * k, h = 24 * Math.min(k, 1.6);
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#1f1f1f';
    ctx.lineWidth = 3;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
    ctx.save();
    ctx.beginPath();
    ctx.rect(cx - w / 2, cy - h / 2, w, h);
    ctx.clip();
    ctx.strokeStyle = '#9a9a9a';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 6) {
      ctx.beginPath(); ctx.moveTo(cx - w / 2 + i, cy - h / 2); ctx.lineTo(cx - w / 2 + i - h, cy + h / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - w / 2 + i - h, cy - h / 2); ctx.lineTo(cx - w / 2 + i, cy + h / 2); ctx.stroke();
    }
    ctx.restore();
    ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
    ctx.restore();
  }

  // goals: optional list of [x, 'top'|'bottom'] in pitch units (default: one centred goal at each end)
  function drawPitch(ctx, goals, goalScale, marks, arc) {
    ctx.save();
    roundRect(ctx, PITCH.x, PITCH.y, PITCH.w, PITCH.h, 10);
    ctx.clip();
    fillStripes(ctx, PITCH.x, PITCH.y, PITCH.w, PITCH.h, C.pitch, C.pitchStripe, PITCH.h / 10, false);
    ctx.fillStyle = C.pitchDot;
    for (let x = PITCH.x + 10; x < PITCH.x + PITCH.w; x += 18) {
      for (let y = PITCH.y + 10; y < PITCH.y + PITCH.h; y += 18) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = C.pitchEdge;
    ctx.lineWidth = 6;
    roundRect(ctx, PITCH.x + 3, PITCH.y + 3, PITCH.w - 6, PITCH.h - 6, 8);
    ctx.stroke();
    ctx.restore();
    // pitch markings: clip.marks = [{ x, y, w, h }] in pitch units, drawn as solid lines (e.g. the 6-yard box), kept on the pitch
    (marks || []).forEach(m => {
      const [x1, y1] = toPx([m.x, m.y]), [x2, y2] = toPx([m.x + m.w, m.y + m.h]);
      ctx.save();
      roundRect(ctx, PITCH.x, PITCH.y, PITCH.w, PITCH.h, 10);
      ctx.clip();
      ctx.strokeStyle = C.pitchEdge; ctx.lineWidth = 3;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      ctx.restore();
    });
    // positioning arc: clip.arc = { cx, cy, rx, ry } in pitch units, the half-ellipse in front of a goal at the bottom
    if (arc) {
      const [cx, cy] = toPx([arc.cx, arc.cy]);
      const kx = (PITCH.w - 2 * PITCH.pad) / PITCH.uw, ky = (PITCH.h - 2 * PITCH.pad) / PITCH.uh;
      ctx.save();
      ctx.strokeStyle = C.accent; ctx.globalAlpha = 0.55; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
      ctx.beginPath(); ctx.ellipse(cx, cy, arc.rx * kx, arc.ry * ky, 0, Math.PI, 2 * Math.PI); ctx.stroke();
      ctx.restore();
    }
    (goals || [[50, 'top'], [50, 'bottom']]).forEach(([gx, end]) => {
      drawGoal(ctx, toPx([gx, 0])[0], end === 'top' ? PITCH.y + 2 : PITCH.y + PITCH.h - 2, goalScale);
    });
  }

  function drawPlayer(ctx, p, team, alpha, label, color) {
    const [x, y] = toPx(p);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, R_PX, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color || TEAM_COLOR[team];
    ctx.stroke();
    if (label) {
      ctx.fillStyle = color || TEAM_COLOR[team];
      ctx.font = `800 12px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 1);
    }
    ctx.restore();
  }

  function drawBall(ctx, p) {
    const [x, y] = toPx(p);
    const r = 9;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#111';
    ctx.stroke();
    // simple pentagon pattern
    ctx.fillStyle = '#111';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const px = x + Math.cos(a) * 3.6, py = y + Math.sin(a) * 3.6;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * 3.6, y + Math.sin(a) * 3.6);
      ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw a (partially drawn) dashed arrow along a polyline in pitch units.
  function drawArrow(ctx, ptsU, progress, alpha, style) {
    if (!ptsU || progress <= 0 || alpha <= 0) return;
    const pts = ptsU.map(toPx);
    let total = 0;
    const segs = [];
    for (let i = 1; i < pts.length; i++) { const l = dist(pts[i - 1], pts[i]); segs.push(l); total += l; }
    let remaining = total * clamp(progress);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = style.color;
    ctx.fillStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.lineCap = 'round';
    ctx.setLineDash(style.dash);
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    let tip = pts[0], prev = pts[0];
    for (let i = 0; i < segs.length && remaining > 0; i++) {
      const k = Math.min(1, remaining / (segs[i] || 1));
      const q = lerpP(pts[i], pts[i + 1], k);
      ctx.lineTo(q[0], q[1]);
      prev = pts[i];
      tip = q;
      remaining -= segs[i];
    }
    ctx.stroke();
    ctx.setLineDash([]);
    // arrow head
    const ang = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
    const hs = style.head;
    ctx.beginPath();
    ctx.moveTo(tip[0] + Math.cos(ang) * 2, tip[1] + Math.sin(ang) * 2);
    ctx.lineTo(tip[0] - Math.cos(ang - 0.45) * hs, tip[1] - Math.sin(ang - 0.45) * hs);
    ctx.lineTo(tip[0] - Math.cos(ang + 0.45) * hs, tip[1] - Math.sin(ang + 0.45) * hs);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const ARROW_STYLE = {
    run: { color: C.arrow, width: 3, dash: [7, 7], head: 13 },
    pass: { get color() { return C.attack; }, width: 3, dash: [9, 7], head: 13 },
    passD: { get color() { return C.defend; }, width: 3, dash: [9, 7], head: 13 },
    loose: { color: '#7a7a7a', width: 2.5, dash: [4, 6], head: 11 },
  };

  const TAG_STYLE = {
    SPLASH: { get bg() { return C.accent; }, fg: '#fff' },
    RIPPLE: { bg: C.defend, fg: '#fff' },
    DANGER: { get bg() { return C.danger; }, fg: '#fff' },
    FREE: { bg: '#6b7280', fg: '#fff' },
    SHOOT: { get bg() { return C.accent; }, fg: '#fff' },
    DEFEND: { bg: '#16351f', fg: '#fff' },
    'GO!': { get bg() { return C.accent; }, fg: '#fff' },
    ATTACKER: { get bg() { return C.accent; }, fg: '#fff' },
    READY: { bg: '#16351f', fg: '#fff' },
    SHUFFLE: { bg: '#16351f', fg: '#fff' },
    SET: { get bg() { return C.accent; }, fg: '#fff' },
    SAVE: { get bg() { return C.accent; }, fg: '#fff' },
    'GET UP!': { get bg() { return C.accent; }, fg: '#fff' },
    DEFENDER: { bg: '#16351f', fg: '#fff' },
  };

  function drawTag(ctx, p, text, alpha, below) {
    if (alpha <= 0) return;
    const [x, y] = toPx(p);
    const st = TAG_STYLE[text] || { bg: '#444', fg: '#fff' };
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `700 14px ${FONT}`;
    const tw = ctx.measureText(text).width;
    const w = tw + 16, h = 22;
    const ty = below ? y + R_PX + 10 : y - R_PX - 12 - h;
    roundRect(ctx, x - w / 2, ty, w, h, 11);
    ctx.fillStyle = st.bg;
    ctx.fill();
    ctx.fillStyle = st.fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, ty + h / 2 + 1);
    ctx.restore();
  }

  function drawSplashRings(ctx, p, time, alpha) {
    if (alpha <= 0) return;
    const [x, y] = toPx(p);
    ctx.save();
    for (let i = 0; i < 3; i++) {
      const ph = (time * 0.7 + i / 3) % 1;
      ctx.beginPath();
      ctx.arc(x, y, R_PX + 4 + ph * 46, 0, Math.PI * 2);
      ctx.strokeStyle = C.accent;
      ctx.globalAlpha = alpha * (1 - ph) * 0.55;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDanger(ctx, p, time, alpha) {
    if (alpha <= 0) return;
    const [x, y] = toPx(p);
    ctx.save();
    ctx.globalAlpha = alpha * (0.6 + 0.4 * Math.sin(time * 5));
    ctx.setLineDash([6, 5]);
    ctx.lineDashOffset = -time * 20;
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, R_PX + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawShotLine(ctx, from, to, alpha) {
    const a = toPx(from), b = toPx(to);
    ctx.save();
    ctx.globalAlpha = alpha * 0.8;
    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([2, 7]);
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    ctx.restore();
  }

  // "Connected by string" — a slightly sagging line between defenders.
  function drawString(ctx, pts, alpha) {
    if (alpha <= 0 || pts.length < 2) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = C.string;
    ctx.lineWidth = 2.5;
    for (let i = 1; i < pts.length; i++) {
      const a = toPx(pts[i - 1]), b = toPx(pts[i]);
      const d = dist(a, b);
      const sag = Math.max(6, 60 - d * 0.18);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.quadraticCurveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag, b[0], b[1]);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawLane(ctx, a, b, blocked, alpha) {
    if (alpha <= 0) return;
    const pa = toPx(a), pb = toPx(b);
    ctx.save();
    ctx.globalAlpha = blocked ? alpha * 0.5 : alpha;
    ctx.strokeStyle = blocked ? C.attack : C.danger;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([3, 6]);
    ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
    ctx.setLineDash([]);
    if (blocked) {
      const m = lerpP(pa, pb, 0.5);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = C.block;  // the ✕ stays red: universal "blocked
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(m[0] - 9, m[1] - 9); ctx.lineTo(m[0] + 9, m[1] + 9);
      ctx.moveTo(m[0] + 9, m[1] - 9); ctx.lineTo(m[0] - 9, m[1] + 9);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ---------- rich text: *word* = highlight colour ----------
  // Split into words; a word with no space before it (e.g. "." after *highlight*) is glued on.
  function tokens(text) {
    const out = [];
    let em = false, spaceBefore = true;
    text.split(/(\*)/).forEach(part => {
      if (part === '*') { em = !em; return; }
      part.split(/(\s+)/).forEach(w => {
        if (!w) return;
        if (/^\s+$/.test(w)) { spaceBefore = true; return; }
        out.push({ w, em, glue: !spaceBefore && out.length > 0 });
        spaceBefore = false;
      });
    });
    return out;
  }

  function wrapRich(ctx, text, maxW, size) {
    const lines = [];
    let line = [], lw = 0;
    const space = (ctx.font = `500 ${size}px ${FONT}`, ctx.measureText(' ').width);
    tokens(text).forEach(tok => {
      ctx.font = `${tok.em ? 700 : 500} ${size}px ${FONT}`;
      const w = ctx.measureText(tok.w).width;
      tok.width = w;
      if (tok.glue && line.length) { lw += w; line.push(tok); return; }
      if (line.length && lw + space + w > maxW) {
        // carry glued tokens (e.g. trailing punctuation) together onto the next line
        lines.push(line); line = []; lw = 0;
      }
      lw += (line.length ? space : 0) + w;
      line.push(tok);
    });
    if (line.length) lines.push(line);
    return { lines, space };
  }

  function drawRich(ctx, text, x, y, maxW, size, lineH, color) {
    const { lines, space } = wrapRich(ctx, text, maxW, size);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    lines.forEach((line, i) => {
      let cx = x;
      line.forEach((tok, j) => {
        if (j > 0 && !tok.glue) cx += space;
        ctx.font = `${tok.em ? 700 : 500} ${size}px ${FONT}`;
        ctx.fillStyle = tok.em ? C.accentSoft : color;
        ctx.fillText(tok.w, cx, y + i * lineH);
        cx += tok.width;
      });
    });
    return lines.length * lineH;
  }

  // ---------- panel / chrome ----------
  // Slim top line: SECTION · Session title · Clip n of N
  function drawHeader(ctx, session, clip) {
    ctx.save();
    ctx.textBaseline = 'alphabetic';
    const cat = (global.CATEGORIES || []).find(c => c.id === session.category);
    let x = 40;
    if (cat) {
      ctx.fillStyle = C.accent;
      ctx.font = `700 14px ${FONT}`;
      const label = cat.name.toUpperCase().split('').join(String.fromCharCode(8202));
      ctx.fillText(label, x, 50);
      x += ctx.measureText(label).width + 14;
      ctx.fillStyle = C.dotOff;
      ctx.fillRect(x, 33, 2, 22);
      x += 16;
    }
    ctx.fillStyle = C.text;
    ctx.font = `700 24px ${FONT}`;
    ctx.fillText(session.title || '', x, 52);
    x += ctx.measureText(session.title || '').width + 14;
    const idx = (session.clips || []).indexOf(clip);
    if (idx >= 0 && session.clips.length > 1) {
      ctx.fillStyle = C.muted;
      ctx.font = `600 16px ${FONT}`;
      ctx.fillText(`Clip ${idx + 1} of ${session.clips.length}`, x, 51);
    }

    // legend (right)
    x = 1240;
    ctx.font = `500 15px ${FONT}`;
    const items = [
      { label: 'Pass', draw: (lx) => drawArrowPx(ctx, lx, 46, lx + 34, 46, ARROW_STYLE.pass) },
      { label: 'Run', draw: (lx) => drawArrowPx(ctx, lx, 46, lx + 34, 46, ARROW_STYLE.run) },
    ].concat(clip.legendTeams
      ? clip.legendTeams.slice().reverse().map(t => ({ label: t.label, draw: (lx) => legendDot(ctx, lx + 10, 46, t.color) }))
      : [
        { label: clip.legend && clip.legend.d || 'Defenders', draw: (lx) => legendDot(ctx, lx + 10, 46, C.defend) },
        { label: clip.legend && clip.legend.a || 'Attackers', draw: (lx) => legendDot(ctx, lx + 10, 46, C.attack) },
      ]);
    items.forEach(it => {
      const lw = ctx.measureText(it.label).width;
      x -= lw;
      ctx.fillStyle = C.muted;
      ctx.fillText(it.label, x, 51);
      x -= 44;
      it.draw(x);
      x -= 22;
    });
    ctx.restore();
  }

  function legendDot(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
  }

  function drawArrowPx(ctx, x1, y1, x2, y2, st) {
    ctx.save();
    ctx.strokeStyle = st.color === C.arrow ? C.subText : st.color;
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - 6, y2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 9, y2 - 5); ctx.lineTo(x2 - 9, y2 + 5); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function fitFont(ctx, text, weight, size, maxW) {
    do { ctx.font = `${weight} ${size}px ${FONT}`; size -= 1; } while (size > 10 && ctx.measureText(text).width > maxW);
  }

  function drawPanel(ctx, opts) {
    const { kicker, title, lines, bullet, alpha, keyPhrase, stepDots } = opts;
    ctx.save();
    roundRect(ctx, PANEL.x, PANEL.y, PANEL.w, PANEL.h, 12);
    ctx.fillStyle = C.panel;
    ctx.fill();
    ctx.fillStyle = C.accent;
    roundRect(ctx, PANEL.x, PANEL.y, 5, PANEL.h, 2);
    ctx.fill();
    if (C.accent2) { ctx.save(); ctx.clip(); fillStripes(ctx, PANEL.x, PANEL.y, 5, PANEL.h, C.accent, C.accent2, 40, false); ctx.restore(); }

    const x = PANEL.x + 28, maxW = PANEL.w - 52;
    let y = PANEL.y + 44;

    // step dots
    if (stepDots) {
      for (let i = 0; i < stepDots.count; i++) {
        ctx.beginPath();
        ctx.arc(PANEL.x + PANEL.w - 30 - (stepDots.count - 1 - i) * 18, PANEL.y + 38, 5, 0, Math.PI * 2);
        ctx.fillStyle = i === stepDots.active ? C.accent : i < stepDots.active ? C.accentMid : C.dotOff;
        ctx.fill();
      }
    }

    ctx.globalAlpha = alpha;
    ctx.fillStyle = C.muted;
    ctx.font = `600 15px ${FONT}`;
    // keep the kicker clear of the step dots on the right
    const dotsW = stepDots ? stepDots.count * 18 + 20 : 0;
    let kick = (kicker || '').toUpperCase();
    ctx.font = `600 15px ${FONT}`;
    if (ctx.measureText(kick).width > maxW - dotsW && kick.includes(' · ')) kick = kick.split(' · ').pop();   // drop the clip name if it won't fit
    fitFont(ctx, kick, 600, 15, maxW - dotsW);
    ctx.fillText(kick, x, y);
    y += 44;

    ctx.font = `800 30px ${FONT}`;
    const tl = wrapRich(ctx, title || '', maxW, 30);
    ctx.font = `800 30px ${FONT}`;
    tl.lines.forEach(line => {
      ctx.fillStyle = C.accent;
      ctx.fillText(line.map((t, j) => (j && !t.glue ? ' ' : '') + t.w).join(''), x, y);
      y += 36;
    });
    y += 14;

    (lines || []).forEach(text => {
      const isSub = text.startsWith('-');
      const body = isSub ? text.slice(1).trim() : text;
      const ind = bullet ? (isSub ? 40 : 22) : 0;
      if (bullet) {
        ctx.font = `700 21px ${FONT}`;
        ctx.fillStyle = isSub ? C.muted : C.accent;
        ctx.fillText(isSub ? '–' : bullet, x + (isSub ? 22 : 0), y);
      }
      const h = drawRich(ctx, body, x + ind, y, maxW - ind, isSub ? 19 : 21, isSub ? 26 : 29, isSub ? C.subText : C.text);
      y += h + 12;
    });
    ctx.globalAlpha = 1;

    if (keyPhrase) {
      const bh = 92, by = PANEL.y + PANEL.h - bh - 20, bx = PANEL.x + 20, bw = PANEL.w - 40;
      roundRect(ctx, bx, by, bw, bh, 10);
      ctx.save();
      ctx.clip();
      fillStripes(ctx, bx, by, bw, bh, C.accentDark, C.accentDark2, 30, true);
      ctx.restore();
      roundRect(ctx, bx, by, bw, bh, 10);
      ctx.strokeStyle = C.accentMid;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = C.accentSoft;
      fitFont(ctx, keyPhrase.big, 800, 28, bw - 28);
      ctx.fillText(keyPhrase.big, bx + bw / 2, by + 44);
      ctx.fillStyle = C.subText;
      fitFont(ctx, keyPhrase.small || '', 500, 17, bw - 24);
      ctx.fillText(keyPhrase.small || '', bx + bw / 2, by + 72);
      ctx.textAlign = 'left';
    }
    ctx.restore();
  }

  function drawProgress(ctx, cp, t) {
    const x = 40, y = 700, h = 5, w = 1240 - logoWidth(LOGO_H) - 24 - x;
    ctx.save();
    ctx.fillStyle = C.track;
    roundRect(ctx, x, y, w, h, 2.5); ctx.fill();
    roundRect(ctx, x, y, Math.max(5, w * clamp(t / cp.duration)), h, 2.5);
    ctx.save();
    ctx.clip();
    fillStripes(ctx, x, y, w, h, C.accent, C.accent2, 16, true);
    ctx.restore();
    ctx.fillStyle = C.bg;
    cp.steps.forEach(s => ctx.fillRect(x + w * (s.start / cp.duration) - 1, y, 2, h));
    ctx.restore();
    drawLogo(ctx, 1240, y + h / 2, LOGO_H, 'right');
  }

  function drawBareStrip(ctx, cp, t) {
    const lw = logoWidth(18), y = BARE_H - BARE.strip / 2, x = BARE.m, w = BARE_W - 2 * BARE.m - lw - 20, h = 5;
    ctx.save();
    ctx.fillStyle = C.track;
    roundRect(ctx, x, y - h / 2, w, h, 2.5); ctx.fill();
    ctx.fillStyle = C.accent;
    roundRect(ctx, x, y - h / 2, Math.max(5, w * clamp(t / cp.duration)), h, 2.5); ctx.fill();
    ctx.fillStyle = C.bg;
    cp.steps.forEach(s => ctx.fillRect(x + w * (s.start / cp.duration) - 1, y - h / 2, 2, h));
    ctx.restore();
    drawLogo(ctx, BARE_W - BARE.m, y, 18, 'right');
  }

  // ---------- GRSS | RTS logo (outlines from js/logo-data.js) ----------
  const LOGO_H = 22;
  const LOGO = () => global.GRSS_LOGO;
  const pathCache = {};
  const P2 = d => pathCache[d] || (pathCache[d] = new Path2D(d));
  function logoWidth(h) {
    const L = LOGO();
    if (L) return (L.vb.w * h) / L.vb.h;
    return 0;
  }
  // Draws the wordmark h px tall, vertically centred on cy. align: 'right' (x = right edge) or 'center'.
  function drawLogo(ctx, x, cy, h, align) {
    const L = LOGO();
    if (!L || typeof Path2D === 'undefined') return;
    const s = h / L.vb.h, w = L.vb.w * s;
    const left = align === 'center' ? x - w / 2 : x - w;
    ctx.save();
    ctx.translate(left - L.vb.x * s, cy - (L.vb.y + L.vb.h / 2) * s);
    ctx.scale(s, s);
    ctx.fillStyle = C.text;
    ctx.fill(P2(L.grss));
    // the goal: net layers, back frame, then the front posts and crossbar
    ctx.strokeStyle = C.text;
    (L.goal || []).forEach(st => {
      ctx.globalAlpha = st.op;
      ctx.lineWidth = st.w;
      ctx.lineCap = st.join ? 'butt' : 'round';
      ctx.lineJoin = st.join || 'round';
      ctx.stroke(P2(st.d));
    });
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.accent;
    ctx.fill(P2(L.rts));
    ctx.restore();
  }

  // Where are we at time t? { step, phase, pk (0..1 within the phase), u (0..1 of the move) }
  function locate(cp, t) {
    let step = null, phase = 'intro', u = 0, pk = 0;
    if (t >= cp.outroStart) {
      phase = 'outro';
      step = cp.steps[cp.steps.length - 1];
      u = 1;
    } else if (t >= cp.timing.intro) {
      step = cp.steps.find(s => t >= s.start && t < s.start + s.total) || cp.steps[cp.steps.length - 1];
      const local = t - step.start;
      const P = step.phases;
      const marks = [
        ['stepIn', P.stepIn], ['arrows', P.arrows], ['read', P.read], ['move', P.move], ['hold', P.hold],
      ];
      let acc = 0;
      for (const [name, dur] of marks) {
        if (local < acc + dur || name === 'hold') { phase = name; pk = dur ? clamp((local - acc) / dur) : 1; break; }
        acc += dur;
      }
      u = phase === 'move' ? pk : phase === 'hold' ? 1 : 0;
    } else {
      step = cp.steps[0];
    }
    return { step, phase, pk, u };
  }

  // The four beats of every step: 0 labels (who's who) · 1 arrows (the plan) · 2 movement · 3 outcome
  const BEAT_OF = { intro: 0, stepIn: 0, arrows: 1, read: 2, move: 2, hold: 3, outro: 3 };
  // start time of a beat within a step
  function beatStart(step, beat) {
    const P = step.phases;
    return step.start + [0, P.stepIn, P.stepIn + P.arrows, P.stepIn + P.arrows + P.read + P.move][beat];
  }

  // Bare mode: just the pitch, with a slim strip underneath for the progress bar and the logo
  const BARE = { m: 12, gap: 20, strip: 34 };
  const BARE_W = PITCH.w + 2 * BARE.m, BARE_H = PITCH.h + BARE.m + BARE.gap + BARE.strip;

  // ---------- main frame render ----------
  function render(ctx, cp, session, t, opts) {
    const bare = !!(opts && opts.bare);
    setPlayerScale(cp.clip.playerScale);
    const clip = cp.clip;
    t = clamp(t, 0, cp.duration);

    ctx.save();
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    if (bare) ctx.translate(BARE.m - PITCH.x, BARE.m - PITCH.y);
    else drawHeader(ctx, session, clip);
    drawPitch(ctx, clip.goals, clip.goalScale, clip.marks, clip.arc);
    // marked practice areas: clip.areas = [{ x, y, w, h }] in pitch units, cones at the corners
    (clip.areas || []).forEach(a => {
      const [x1, y1] = toPx([a.x, a.y]), [x2, y2] = toPx([a.x + a.w, a.y + a.h]);
      ctx.save();
      ctx.fillStyle = 'rgba(22,53,31,0.06)';
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
      ctx.strokeStyle = 'rgba(22,53,31,0.25)'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]);
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      ctx.setLineDash([]);
      [[x1, y1], [x2, y1], [x1, y2], [x2, y2]].forEach(([cx, cy]) => {
        ctx.beginPath(); ctx.moveTo(cx, cy - 7); ctx.lineTo(cx + 6, cy + 5); ctx.lineTo(cx - 6, cy + 5); ctx.closePath();
        ctx.fillStyle = a.cone || '#e5b52b'; ctx.fill();
      });
      ctx.restore();
    });

    // Which segment are we in?
    const { step, phase, pk, u } = locate(cp, t);

    const def = step.def;
    const showStepFx = phase !== 'intro' && phase !== 'outro';
    const fxAlpha = phase === 'stepIn' ? pk : 1;

    // string between defenders
    const stringIds = def.string !== undefined ? def.string : clip.string;
    if (stringIds && phase !== 'intro') {
      drawString(ctx, stringIds.map(id => playerPos(step, id, u)), showStepFx ? 1 : 0.8);
    }

    // passing lanes
    if (showStepFx && def.lanes) {
      const laneAlpha = phase === 'move' ? pk : phase === 'hold' ? 1 : 0;
      def.lanes.forEach(l => {
        const a = l.blocked === 'start' ? 1 : laneAlpha;
        drawLane(ctx, playerPos(step, l.from, u), playerPos(step, l.to, u), !!l.blocked, a);
      });
    }

    // arrows
    if (showStepFx) {
      const arrows = [];
      (def.moves || []).forEach(m => {
        if (m.arrow === false) return;
        const from = step.startState.pos[m.id];
        arrows.push({ pts: trimPath([from].concat(m.path || [m.to]), R_U + 0.6, R_U + 0.6), style: ARROW_STYLE.run, order: m.start || 0 });
      });
      if (def.passes && def.passes.length) {
        passSeq(cp, step).forEach((g, i) => {
          if (!g.from) return;
          const a = playerPos(step, g.from, g.s), b = playerPos(step, g.to, g.e);
          const col = teamColor(cp, cp.team[g.from]);
          arrows.push({ pts: trimPath([a, b], R_U + 1, R_U + 1.2), style: { color: col, width: 3, dash: [9, 7], head: 13 }, order: -1 + i * 0.01 });
        });
      }
      if (def.ball && def.ball.arrow !== false) {
        const s = def.ball.start != null ? def.ball.start : 0;
        const e = def.ball.end != null ? def.ball.end : 0.4;
        if (def.ball.pass) {
          const owner = step.startState.ball.owner;
          const a = owner ? playerPos(step, owner, s) : step.startState.ball.at;
          const b = playerPos(step, def.ball.pass, e);
          arrows.push({ pts: trimPath([a, b], R_U + 1, R_U + 1.2), style: owner && cp.team[owner] === 'd' ? ARROW_STYLE.passD : ARROW_STYLE.pass, order: -1 });
        } else if (def.ball.to) {
          arrows.push({ pts: trimPath([ballStartPos(cp, step, s), def.ball.to], 1.2, 1.4), style: ARROW_STYLE.loose, order: -1 });
        }
      }
      arrows.sort((a, b) => a.order - b.order);
      const n = arrows.length;
      arrows.forEach((ar, i) => {
        let prog = 0, alpha = 1;
        if (phase === 'arrows') {
          const slot = 1 / (n + 0.6);
          prog = clamp((pk - i * slot * 0.6) / (slot * 1.6));
        } else if (phase === 'stepIn') {
          prog = 0;
        } else {
          prog = 1;
          if (phase === 'move') alpha = 1 - 0.65 * clamp(pk / 0.3);
          if (phase === 'hold') alpha = 0.35 * (1 - clamp(pk / 0.6));
        }
        drawArrow(ctx, ar.pts, prog, alpha, ar.style);
      });
    }

    // shot line: dotted line from the ball to the goal it threatens
    if (showStepFx && def.shot) {
      const a = phase === 'move' ? clamp((pk - 0.5) / 0.4) : phase === 'hold' ? 1 : 0;
      if (a > 0) drawShotLine(ctx, ballPos(cp, step, u), def.shot, a);
    }

    // highlighted zones, e.g. the "pocket" behind their midfield
    if (showStepFx && def.zones) {
      def.zones.forEach(z => {
        const [zx, zy] = toPx(z.at), r = z.r * ((PITCH.w - 2 * PITCH.pad) / PITCH.uw);
        ctx.save();
        ctx.globalAlpha = fxAlpha;
        ctx.beginPath(); ctx.arc(zx, zy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 196, 70, 0.35)'; ctx.fill();
        if (z.label) {
          ctx.fillStyle = '#7a5a00'; ctx.font = `700 13px ${FONT}`; ctx.textAlign = 'center';
          ctx.fillText(z.label.toUpperCase(), zx, zy - r + 16);
        }
        ctx.restore();
      });
    }

    // tags & effects (under players)
    const tags = showStepFx ? def.tags || {} : {};
    const time = t;
    Object.keys(tags).forEach(id => {
      const p = playerPos(step, id, u);
      if (tags[id] === 'SPLASH') drawSplashRings(ctx, p, time, fxAlpha);
      if (tags[id] === 'DANGER') drawDanger(ctx, p, time, fxAlpha);
    });
    // clip.tagFlash: a quick ring when a player's label changes from the step before (e.g. ATTACKER → DEFENDER)
    const prevTags = clip.tagFlash && step.index > 0 ? cp.steps[step.index - 1].def.tags || {} : {};
    if (clip.tagFlash && (phase === 'stepIn' || phase === 'arrows')) {
      const k = clamp((t - step.start) / 0.9);
      Object.keys(tags).forEach(id => {
        if (!prevTags[id] || prevTags[id] === tags[id] || k >= 1) return;
        const [x, y] = toPx(playerPos(step, id, u));
        ctx.save();
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = C.accent; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(x, y, R_PX + 4 + k * 26, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      });
    }

    // players
    // balls waiting at players' feet, and finished balls (e.g. in the net)
    const st = phase === 'outro' ? cp.finalState : step.startState;
    (st.spent || []).forEach(b => drawBall(ctx, b));
    clip.players.forEach(p => { if (p.ball && !(st.used || []).includes(p.id)) drawBall(ctx, attached(cp, step, p.id, u)); });
    clip.players.forEach(p => drawPlayer(ctx, playerPos(step, p.id, u), p.team, p.dim ? 0.4 : 1, p.label, teamColor(cp, p.team)));
    // ball
    if (clip.ball) drawBall(ctx, ballPos(cp, step, u));
    // tags on top
    // labels sit below defenders, above everyone else; clip.tagPlace 'auto': above, unless near the top edge
    Object.keys(tags).forEach(id => {
      const p = playerPos(step, id, u);
      const kept = prevTags[id] === tags[id];   // with tagFlash, an unchanged label stays put instead of fading in again
      drawTag(ctx, p, tags[id], kept ? 1 : fxAlpha, clip.tagPlace === 'auto' ? p[1] < 10 : cp.team[id] === 'd');
    });

    if (bare) {
      // fade in from and out to the forest frame, so the loop restarts cleanly
      const fade = Math.max(1 - clamp(t / 0.5), clamp((t - (cp.duration - 0.5)) / 0.5));
      if (fade > 0) {
        ctx.save(); ctx.globalAlpha = fade; ctx.fillStyle = C.bg;
        ctx.fillRect(PITCH.x - BARE.m, PITCH.y - BARE.m, BARE_W, PITCH.h + BARE.m + BARE.gap); ctx.restore();
      }
      ctx.restore();
      drawBareStrip(ctx, cp, t);
      return;
    }

    // intro overlay on the pitch
    if (phase === 'intro') {
      const a = 1 - clamp((t - (cp.timing.intro - 0.7)) / 0.7);
      ctx.save();
      ctx.globalAlpha = a;
      roundRect(ctx, PITCH.x, PITCH.y, PITCH.w, PITCH.h, 10);
      ctx.fillStyle = C.overlay;
      ctx.fill();
      drawLogo(ctx, PITCH.x + PITCH.w / 2, PITCH.y + PITCH.h / 2 - 130, 34, 'center');
      ctx.textAlign = 'center';
      ctx.fillStyle = C.muted;
      ctx.font = `600 20px ${FONT}`;
      ctx.fillText((clip.kicker || '').toUpperCase(), PITCH.x + PITCH.w / 2, PITCH.y + PITCH.h / 2 - 50);
      ctx.fillStyle = C.accent;
      ctx.font = `800 54px ${FONT}`;
      ctx.fillText(clip.title.toUpperCase(), PITCH.x + PITCH.w / 2, PITCH.y + PITCH.h / 2 + 10);
      ctx.fillStyle = C.text;
      ctx.font = `500 22px ${FONT}`;
      ctx.fillText(clip.tagline || '', PITCH.x + PITCH.w / 2, PITCH.y + PITCH.h / 2 + 52);
      ctx.restore();
    }

    // caption panel
    const n = cp.steps.length;
    if (phase === 'intro') {
      drawPanel(ctx, {
        kicker: clip.kicker, title: clip.title.toUpperCase(), lines: clip.intro || [], bullet: '•',
        alpha: clamp(t / 0.6), keyPhrase: clip.keyPhrase, stepDots: { count: n, active: -1 },
      });
    } else if (phase === 'outro') {
      drawPanel(ctx, {
        kicker: 'Remember', title: clip.summaryTitle || 'KEY POINTS', lines: clip.summary || [], bullet: '✓',
        alpha: clamp((t - cp.outroStart) / 0.6), keyPhrase: clip.keyPhrase, stepDots: { count: n, active: n },
      });
    } else {
      drawPanel(ctx, {
        kicker: `${clip.title} · Step ${step.index + 1} of ${n}`, title: def.title, lines: def.text || [], bullet: '•',
        alpha: phase === 'stepIn' ? pk : 1, keyPhrase: def.keyPhrase || clip.keyPhrase,
        stepDots: { count: n, active: step.index },
      });
    }

    drawProgress(ctx, cp, t);
    ctx.restore();
  }

  // ---------- public player ----------
  class DrillPlayer {
    constructor(canvas, session, clip, opts = {}) {
      this.canvas = canvas;
      this.session = session;
      this.scale = opts.scale || 1;
      this.bare = !!opts.bare;
      canvas.width = (this.bare ? BARE_W : W) * this.scale;
      canvas.height = (this.bare ? BARE_H : H) * this.scale;
      this.ctx = canvas.getContext('2d');
      this.load(clip);
    }
    load(clip) {
      this.clip = clip;
      this.cp = compile(clip);
      this.duration = this.cp.duration;
      this.t = 0;
      this.draw();
    }
    // start time of each step (useful for "next step" buttons)
    get stepStarts() { return this.cp.steps.map(s => s.start); }
    // which of the four beats (0 labels · 1 arrows · 2 movement · 3 outcome) is showing, and in which step
    beatAt(t = this.t) { const L = locate(this.cp, t); return { step: L.step.index, beat: BEAT_OF[L.phase], phase: L.phase }; }
    beatStart(stepIndex, beat) { return beatStart(this.cp.steps[stepIndex], beat); }
    renderAt(t) { this.t = t; this.draw(); }
    draw() {
      this.ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0);
      render(this.ctx, this.cp, this.session, this.t, { bare: this.bare });
    }
  }

  // Override colours, e.g. DrillEngine.setTheme({ accent: '#22c55e', attack: '#f59e0b' })
  const setTheme = theme => Object.assign(C, theme);
  global.DrillEngine = { DrillPlayer, compile, setTheme, WIDTH: W, HEIGHT: H };
})(typeof window !== 'undefined' ? window : globalThis);
