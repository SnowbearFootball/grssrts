# GRSS | RTS

*Grassroots coaching clips* (repo: kids-football-skills)


Animated coaching clips for young players and parents, drawn like a session-plan diagram:
players are circles (green = attackers, blue = defenders), each step shows the
**arrows first**, then the players and ball move, with the coaching points beside the pitch.

- **Website:** open `index.html`. The home page groups sessions by moment of the game
  (Goalkeeping, Defending, Attacking); `index.html#<section-id>` (e.g. `#defending`) lists that section's sessions and `index.html#<session-id>` opens a session's player.
- **Shareable link:** `node tools/build-artifact.js out.html` packs the site into one self-contained page for publishing.
- **Shareable videos:** `videos/*.mp4` (1080p) to send on WhatsApp, email and so on.

## Sessions

| Session | Clips |
|---|---|
| Splash & Ripple (defending) | 1. The Basics (2 v 2) · 2. 3 v 3 · 3. Hold or Press? (3 v 3) · 4. Outnumbered (3 v 4) |
| 5 v 2 Transfer Rondo (attacking, U14+) | One clip: keep it, transfer (wide / direct), defenders win it |
| Set Position & Shot-Stopping (goalkeeping, U6+) | 1. Get Set · 2. Move With the Ball (3 servers) · 3. Save, Get Up, Set Again |
| Ball Mastery: The Basics (Home Ground, solo, U6+) | 1. Toe Taps · 2. Sole Rolls · 3. Tic-Tacs · 4. Pull-Push |
| Long Range Shooting: Move Onto It (attacking, U14+) | 1. Move It, Then Shoot · 2. Play Under Pressure · 3. Two Touch, First Time |
| Long Range Shooting: Up, Back, Shot (attacking, U14+) | Idea 1: Follow Your Pass · Idea 2: Third-Player Run · Progression: Up, Back, Shot |
| Rotation of Positions (attacking, tactical, U14+) | 1. Drop Between the CBs · 2. Drop Between CB and FB · 3. Press Wins It · 4. Rotation With Wingers (9 v 5) |
| Combination Play (attacking, U12+) | 1. Set and Play Long · 2. One-Two in the Box · 3. Show Short · 4. Around the Corner (two balls at once) |
| Switching Play: Pass and Follow (attacking, U12+) | 1. Pass and Follow · 2. Add a Second Team · 3. Scan and Join In · 4. Bounce Off the Middle |
| Switch of Play: Game Like (attacking, U14+) | 1. Build Up and Switch · 2. Switch and Underlap · 3. Switch and Overlap |
| Penetration via Dribbling (attacking, U9+) | 1. Beat Your Player · 2. Semi-Opposed · 3. 4 v 3 to End Zones · 4. Win It and Go |
| Midfield Three: Playing Through (attacking, U14+) | 1. Through the Pivot · 2. Rotate and Be Patient · 3. Reds Win It |
| Defending the Wide Areas (defending, U14+) | 1. Compact: Show It Wide · 2. Press, Cover, Balance · 3. Shift Together |
| Shape: 5-a-Side (defending, U8–U9) | 1. Your Half · 2. Ball Goes Wide · 3. Connected by String |
| Dribbling (attacking, U12+) | 1. Ball Each · 2. Pass and Swap · 3. Beat the Cones |
| Dribbling: 1 v 1 to 2 v 2 (attacking, U11+) | 1. Beat the Cone · 2. Turn and Back In · 3. Beat Your Defender (1 v 1) · 4. Decoy or Spare Player (2 v 1) · 5. Isolate the Defender (2 v 2) · 6. The Underlap (2 v 2) |
| Dribbling: Where Is the Space / Overload? (attacking, U11+) | 1. 1 v 1: Find the Space · 2. Call Two Numbers (2 v 2) · 3. Space or Overload? (4 v 4 + keepers) |
| Defending Outnumbered (defending, U12+) | 1. Stall the Attack (2 v 1) · 2. Recover to Help (2 v 1 to 2 v 2) · 3. One in the Zone (4 v 4 + keepers + 2 floaters) |

## Brand

Colours: forest green `#16351F` · burnt orange `#D9622B` · cream `#F2E6CD`. Font: Montserrat (free, SIL Open Font License, in `assets/fonts`).
The logo is GRSS followed by RTS standing in a football goal: the left post is the divider; behind the crossbar the net runs back, and the stanchions angle down to the ground.
The website is cream-led; the video frame stays forest green.

Logo files are in `assets/logo/`:

| File | Use |
|---|---|
| `grss-rts.svg` / `grss-rts-cream-2000.png` | Main logo on cream or white (website, posters) |
| `grss-rts-on-dark.svg` / `grss-rts-forest-2000.png` | On forest green or dark backgrounds (videos) |
| `grss-rts-kit.svg` / `grss-rts-kit-2000.png` | Simplified, no fine net: embroidery and small prints |
| `grss-rts-kit-white.svg` | Simplified, all white |
| `grss-rts-forest.svg` | One colour |
| `grss-rts-white.svg` | All white |
| `grss-rts-transparent-2000.png` | Main logo, transparent background |
| `grss-rts-icon.svg` / `grss-rts-icon-512.png` | Square app icon: GRSS stacked over RTS in the goal (WhatsApp profile, home-screen icon) |
| `apple-touch-icon.png`, `icon-192.png`, `icon-512-maskable.png` | Home-screen icons (full squares; phones round the corners) |

To change the logo, edit `tools/build-logo.js` and run `node tools/build-logo.js` (needs `npm i opentype.js@1.3.4`). It rebuilds the SVGs and `js/logo-data.js`, which the videos use. Then run `node tools/build-logo-png.js` for the PNGs, and re-render the videos.

## Site structure

Main sections (in `js/categories.js`): Goalkeeping, Defending, Attacking. Other areas: Home Ground (solo practice),
The Dugout (coach requests) and Kit Room (shop). Form links for The Dugout and Kit Room go in `SITE_LINKS` in the same file;
until they're set the buttons show "Opening soon".

## Home-page clip

`js/home-clip.js` holds the short looping clip on the home page (a cut of Shoot & Recover). It's drawn in
bare mode (just the pitch, no caption panel). The four pills under it (Labels · Arrows · Movement · Outcome)
light up in time with each step's beats, and tapping one jumps to that beat. `tagFlash: true` rings a player
when their label changes (ATTACKER → DEFENDER); `tagPlace: 'auto'` keeps labels on the pitch near the top goal.

## Section pages

Each section lists its sessions as compact rows, with search (titles, key words, coaching points), filter pills
for age, type and players (behind a "Filter" button on phones), and ☆ to save a session on that device.

## Sharing and the one-page plan

Every session page has **Share with your squad** (the phone's share menu, or copies the link on a computer),
**Download this clip (MP4)** and **Download the session plan (PDF)**. The plan is built from the session data
(set-up, how it runs, coaching points, key words, questions) with a QR code to the clips, and is shrunk to fit one A4 page.
It opens the print dialog, where coaches choose "Save as PDF" or print it. QR codes use `js/vendor/qrcode.js`
(qrcode-generator 1.4.4, MIT licence).

## Minis: Grass and Roots

The Minis area (U8 and under) shows solo clips with two characters beside the feet view: **Grass** (the coach) and
**Roots** (the player, who copies each touch in time with the clip). It's switched on by `SITE_FLAGS.minis` in
`js/categories.js` (set it to `false` to hide it again). A session joins with `minis: true`; each
clip can have Grass's lines (`coach: { intro, steps: [[big, small], ...], outro }`) and a `minisVideo` path.
Render those videos with `node tools/render-minis.js`. Stars for each move are saved on the device only.

## Draft sessions

Add `draft: true` to a session to keep it off the site while it's being checked. Open `index.html?drafts` to see drafts.

## Solo (ball mastery) clips

Solo sessions go in Home Ground (`category: 'home-ground'`). A solo clip has `kind: 'solo'` and shows two feet and a ball
from above. Each step is just a list of touches, repeated:

```js
{ title: 'SWAP FEET', text: ['Right sole rolls it across.', 'Left sole rolls it back.'],
  touches: ['R sole to -0.5,0', 'L sole to 0.5,0'], reps: 3, speed: 0.8 }
```

A touch is `<L|R> <sole|inside|outside|toe|laces> [to x,y]` (leave out `to` and the ball stays put, e.g. toe taps).
Units are ball widths: x left − / right +, y up the screen − / towards the player +; the ball starts at `[0, 0]`.
Optional: `ball: [x, y]` to place the ball, `feet: { L: [x, y], R: [x, y] }` for where the feet rest, `speed` (1 = 0.7s a touch).
The arrows, labels ("1. RIGHT SOLE"), touch counter and the highlighted part of the foot are drawn automatically.
See `drills/ball-mastery.js`.

## Adding a new session

1. Copy `drills/splash-and-ripple.js` to `drills/<new-session>.js` and edit it. Set `category`
   to one of the ids in `js/categories.js`, and give it a `summary` and `thumb` path.
   For the section page's filters, also set `type` (Technical, Tactical, Rondo or Game) and
   `squad: [min, max]` (players needed at training).
2. Add `<script src="drills/<new-session>.js"></script>` to `index.html`.
3. Render the videos and thumbnail: `node tools/render-videos.js` and `node tools/render-videos.js --thumbs`
   (requires Playwright and ffmpeg).

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
  team: { i1: 'o' },                               // change a player's colour from this step (fades over their move), e.g. swapping roles
  halves: [{ x: 20, y: 0, w: 60, h: 37.5, color: '#2fbf7f', label: 'ATTACKER’S HALF', soft: false }], // shaded area per player
  lines: [{ a: [50, 0], b: [50, 75], label: 'THE MIDDLE' }],  // dashed guide line with a label
}]
```

Pitch coordinates: `x` runs 0–100 from left to right, and `y` runs 0–75 from the top goal to the bottom goal.
Defenders defend the bottom goal. `ease: 'out'` gives a "fast → slow" approach.
