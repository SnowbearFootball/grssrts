# kids-football-skills

Animated coaching clips for young players and parents, drawn like a session-plan diagram:
players are circles (green = attackers, blue = defenders), each step shows the
**arrows first**, then the players and ball move, with the coaching points beside the pitch.

- **Web player:** open `index.html` to play, pause, step through and scrub each clip.
- **Shareable videos:** `videos/*.mp4` (1080p) to send on WhatsApp, email and so on.

## Sessions

| Session | Clips |
|---|---|
| Splash & Ripple (defending) | 1. The Basics · 2. Hold or Press? · 3. Outnumbered (3 v 4) |

## Adding a new session

1. Copy `drills/splash-and-ripple.js` to `drills/<new-session>.js` and edit it.
2. Add `<script src="drills/<new-session>.js"></script>` to `index.html`.
3. Render the videos: `node tools/render-videos.js` (requires Playwright and ffmpeg).

### Clip format (quick reference)

```js
players: [{ id: 'b1', team: 'd', x: 15, y: 51 }],  // team 'a' = attack (green), 'd' = defend (blue)
ball: { owner: 'g2' },                             // or { at: [x, y] } for a loose ball
string: ['b1', 'b2', 'b3'],                        // "connected by string" line between players
steps: [{
  title: 'THE SPLASH!',
  text: ['Closest player goes to the ball.', 'Job: *stall the attack*.'],  // *stars* = red highlight
  tags: { b2: 'SPLASH', b1: 'RIPPLE', g4: 'DANGER' },
  moves: [{ id: 'b2', to: [48, 35], ease: 'out', start: 0, end: 1 }],   // or path: [[x,y],[x,y]]
  ball: { pass: 'g3', start: 0, end: 0.35 },       // or { to: [x, y] } for a loose ball / bad touch
  lanes: [{ from: 'g2', to: 'g1', blocked: true }],
  timing: { move: 3 },                             // seconds; optional per-step override
}]
```

Pitch coordinates: `x` runs 0–100 from left to right, and `y` runs 0–75 from the top goal to the bottom goal.
Defenders defend the bottom goal. `ease: 'out'` gives a "fast → slow" approach.
