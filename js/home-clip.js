/*
 * HOME-PAGE CLIP: a short, looping cut of Shoot & Recover, drawn in bare mode (just the pitch, no caption panel).
 * The ATTACKER label flips to DEFENDER the moment the shooter touches the post, and the next player becomes the ATTACKER.
 * The four pills under it (Labels · Arrows · Movement · Outcome) follow the beats of each step.
 * `session` is the full session the "See the full session" link opens.
 */
window.HOME_CLIP = {
  session: 'shoot-and-recover',
  clip: {
    id: 'home',
    title: 'Shoot & Recover',
    tagFlash: true,
    tagPlace: 'auto',
    pitchH: 510,   // a little shorter than the full clips' pitch (600)
    timing: { intro: 0.5, stepIn: 1.1, arrows: 1.2, read: 0.4, move: 2.4, hold: 1.1 },
    goals: [[50, 'top'], [50, 'bottom']],
    players: [
      { id: 'k1', team: 'k', label: 'GK', x: 50, y: 1.5 },
      { id: 'k2', team: 'k', label: 'GK', x: 50, y: 73.5 },
      { id: 'g1', team: 'a', x: 37, y: -0.5, ball: true },
      { id: 'g2', team: 'a', x: 31, y: -1, ball: true },
      { id: 'g3', team: 'a', x: 25, y: -1, ball: true },
      { id: 'b1', team: 'd', x: 61, y: 72.5, ball: true },
      { id: 'b2', team: 'd', x: 66, y: 77, ball: true },
      { id: 'b3', team: 'd', x: 72, y: 77, ball: true },
      { id: 'b4', team: 'd', x: 78, y: 77, ball: true },
    ],
    ball: { owner: 'b1' },
    steps: [
      {
        title: 'DRIBBLE AND SHOOT',
        tags: { b1: 'ATTACKER' },
        timing: { move: 2.8 },
        moves: [
          { id: 'b1', path: [[60, 52], [57, 24]], end: 0.72 },
          { id: 'k1', to: [52, 1.5], start: 0.72, arrow: false },
        ],
        ball: { to: [53, -3.3], start: 0.74, end: 0.92 },
      },
      {
        title: 'TOUCH THE POST',
        tags: { b1: 'ATTACKER' },
        timing: { move: 1.6 },
        moves: [
          { id: 'b1', to: [57, 0.5] },
          { id: 'k1', to: [50, 1.5], arrow: false },
        ],
      },
      {
        title: 'NEXT PLAYER GOES, THE SHOOTER RECOVERS',
        tags: { b1: 'DEFENDER', g1: 'ATTACKER' },
        timing: { move: 3.2, hold: 1.4 },
        moves: [
          { id: 'g1', path: [[40, 20], [41, 54]], end: 0.74 },
          { id: 'b1', path: [[56, 16], [51, 48]], start: 0.12, end: 0.82, ease: 'out' },
          { id: 'k2', to: [48, 73.5], start: 0.74, arrow: false },
        ],
        ball: { give: 'g1', to: [47.5, 78.5], start: 0.76, end: 0.93 },
      },
    ],
  },
};
