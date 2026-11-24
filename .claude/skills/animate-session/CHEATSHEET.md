# Session file cheat sheet

Read this instead of `js/drill-engine.js`. Start from `starter.js` (same folder). Good real examples: `drills/switch-of-play.js`
(waves, mannequins, crosses), `drills/midfield-three.js` (gates, numbered players), `drills/defending-442.js` (shape),
`drills/penetration-dribbling.js` (lanes, two balls), `drills/switching-play-square.js` (generated steps, many players).

## Pitch and units
- x 0..100 left → right, y 0..75 top → bottom. Goal at the top is y≈0 (x 47–53 is inside the posts).
- A step is played in phases: step text appears → **arrows** drawn → read → **movement** → hold. `start`/`end` on moves
  and passes are fractions (0..1) of the movement phase.
- Default phase timing (seconds): `{ intro: 3.5, stepIn: 0.6, arrows: 1.6, read: 1.8, move: 2.6, hold: 2.2, outro: 5 }`.
  Override per clip (`timing`) or per step (`timing: { move: 3 }`).

## Clip fields
| Field | Use |
|---|---|
| `players: [{ id, team, label?, x, y, ball?, dim? }]` | `team`: a green, d blue, k keeper, or your own key + `teamColors`. `ball: true` = has their own ball waiting. `dim: true` = faded (next wave, waiting). |
| `ball: { owner }` / `{ at: [x,y] }` | Who has the ball at the start. `ball2`, `ball3` for extra balls. |
| `goals` | `[[50,'top']]`, `[[50,'bottom']]`, `[]` for none; `goalScale` to enlarge. `miniGoals: [{ at, angle }]`. |
| `plain: true` | Plain light pitch (coach diagrams). |
| `marks: [{x,y,w,h}]` | Pitch lines/boxes (`h: 0` for a line). |
| `areas: [{x,y,w,h,fill}]` | Coned areas (cones drawn at corners). |
| `cones: [{ at:[x,y], color? }]` | Single cones/gates. |
| `mannequins: [[x,y], ...]` | Yellow mannequins. |
| `dims: [{ a:[x,y], b:[x,y], label:'20 yds' }]` | Measurements. |
| `arc: { cx, cy, rx, ry }` | GK positioning arc. |
| `teamColors`, `facing` | `{ g:'#2fbf7f' }`; `facing: { g:-1 }` (-1 up the screen, 1 down, or 'left'/'right'). |
| `legend: { a:'Attackers' }` or `legendTeams: [{label,color}]` | Top-bar key. |
| `kicker`, `title`, `tagline`, `intro: [3 lines]`, `summary: [3 lines]` | Title card and end card. Keep `title` short. Wrap words in `*stars*` to highlight. |
| `keyPhrase: { big, small }` | Box in the side panel. |

## Step fields
| Field | Use |
|---|---|
| `title`, `text: [lines]` | Side panel. Short lines; `*highlight*`. |
| `tags: { id: 'WORD' }` | Pill over a player. Word must be in `TAG_STYLE` in `js/drill-engine.js` (add new ones there). |
| `moves: [{ id, to:[x,y] } or { id, path:[[x,y],...] }, start?, end?, arrow?, ease? }]` | Runs. `arrow: false` = move without an arrow (stepping up, keeper shuffles). `ease`: inOut (default), out, in, linear. |
| `passes: [{ to, start, end }]` | Ball passes in order from its current owner. `passes2`/`passes3` move ball2/ball3. |
| `ball: { pass: id }` | Ball to a player (also for winning it: a tackle). |
| `ball: { to:[x,y], start, end }` | Ball to a spot (shot into the net, clearance). |
| `ball: { give: id }` | That player's own waiting ball comes into play (next in a queue). `ball2: { give }` too. |
| `shot: [50,-2]` | Dotted shot line towards the goal. |
| `dim: { id: true/false }` | Fade players in/out (waves, rotations). |
| `lanes: [{ from, to, blocked? }]` | Passing lane line (✕ if blocked). |
| `zones: [{ at:[x,y], r }]` | Circle highlight. |

## Common tags (already exist)
SHOOT, SCORE, PRESS, COVER, BALANCE, SHIFT, TUCK IN, STEP UP, DROP, SET, ONE-TWO, BOUNCE, CALL, FREE MAN, FIRST TIME,
SCAN, SWITCH, UNDERLAP, OVERLAP, CROSS, NEAR POST, FAR POST, BACK POST, RUN, RUN ONTO IT, THROUGH BALL, BACK FOOT, OPEN UP,
SHOW, SHOW SHORT, MOVE AWAY, DOUBLE MOVE, HEAD UP, FACE UP, CHANGE OF PACE, STEP OVER, WON IT!, GO!, TRIGGER, COMPACT, SCREEN,
FIRM, INSIDE, OUTSIDE, UNDER, TIGHT, ATTACKER, DEFENDER, READY, SAVE. Check `TAG_STYLE` before adding one.

## Gotchas
- Players never on the same spot as a cone, mannequin or another player (offset 2–4 units).
- Labels near the pitch edge get cut off: keep tagged players a few units in.
- A step with no `moves`/`passes`/`ball` is just a still picture with text (fine for THE SET-UP).
- After a pass, the receiver owns the ball; the next step's passes start from them.
- Waiting players (queues) usually have `ball: true` and come in with `ball: { give }`.
- Render: `node tools/render-videos.js --stills <id>` (check), then `--thumbs <id>` and `<id>` (MP4s).
