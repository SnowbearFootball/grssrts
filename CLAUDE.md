# GRSS | RTS: notes for Claude

Read this first in every new chat. It holds the decisions made with the owner that aren't obvious from the code.
The README covers how things work (the engine, clip format, tools). Keep this file up to date at the end of each piece of work.

## What it is

grssrts.co.uk: animated grassroots football coaching clips for **coaches, players and parents**. Sessions are
drawn like a session-plan diagram and animated **arrows first, then the movement**, with coaching points beside the pitch.
Hosted on Cloudflare Pages; merging to `main` publishes the site automatically. Plain HTML/JS, no build step for the site.

## How the owner likes to work

- **Never publish without the owner's OK.** New sessions start as hidden drafts (`draft: true`, view with `index.html?drafts`).
  Render the videos and **send them to the owner** to check (SendUserFile). Only remove `draft` when they approve.
- To go live: **open a pull request**; the owner merges it on GitHub (usually from a phone). Explain the merge steps briefly.
- Don't create PRs unprompted for unapproved work. Commit and push work in progress to the session branch.
- The owner is non-technical and often on a phone: **plain UK English, short sentences, no jargon**, no code in replies
  unless asked. Lead with what changed, then what to check. Ask before guessing on coaching details.
- Show visual changes (screenshots / stills) rather than describing them. Fix anything that looks off before sending.
- Keep costs down: one task per chat, don't re-render everything unless the engine or logo changed.
- When the owner says "don't change anything", only discuss.

## Brand

- Colours: forest green `#16351f`, burnt orange `#d9622b`, cream `#f2e6cd` (page `#f6eedd`). Font: Montserrat.
- Website is cream-led; the clip "screen" is forest green.
- **Logo:** "GRSS" then "RTS" standing in a **football goal** (left post is the divider; deeper net, stanchions angled down
  to the ground, side net is four-sided, not triangular). The owner rejected a box/hockey-goal look and rejected putting
  all of GRSS RTS inside the goal. Built by `tools/build-logo.js`, PNGs by `tools/build-logo-png.js`.
- **App icon:** GRSS stacked over RTS-in-the-goal, cream and orange on forest green (`assets/logo/grss-rts-icon.svg`).
- Tagline "Watch it. Coach it. Play it." (big heading). Explanation line: "Every session as a short animated clip:
  see the plan, watch it happen, understand why." Keep them separate.

## Clip style decisions

- Arrows first, then movement. Labels (pills) show each player's job; examples use generic words (ATTACKER, not SPLASH).
- Coaches' own diagrams: plain background (`plain: true`) when they don't need pitch markings; add measurements (`dims`)
  and label players by position (GK, CB, FB, CM, W, ST, D, M) when it helps.
- Copy the coach's intent, not a rigid pattern: e.g. "ideas to create a shot, not a set move"; movement is free.
- Coaching detail the owner has corrected before: runner times the run and keeps space to move onto the ball; pressing as a
  comment means "send one in to apply pressure", not a win-it-and-score drill; a long ball to the keeper comes from the
  furthest opponent and is over-hit; waiting players rotate in; GK stands on an arc post to post, an extra step towards
  the near post when the ball is wide.
- Remove children's names from any photo before using it. Avoid other companies' watermarked diagrams on the site.
- Never copy other providers' (e.g. The Coaching Manual) drills, diagrams or wording into the library; sessions come
  from the owner's own plans or are newly written.

## Content

- Sections: Goalkeeping, Defending, Attacking; areas: The Dugout (coach requests), Home Ground (solo), Kit Room (shop).
  The Dugout comes before Home Ground.
- Sessions: Splash & Ripple (defending), Shoot & Recover, 5 v 2 Transfer Rondo, Long Range Shooting: Move Onto It (U14+),
  Long Range Shooting: Up, Back, Shot (U14+), Rotation of Positions (U14+, replaced Building Out: Rotations; old address
  redirects via `aliases`), Combination Play (U12+, two balls at once), Set Position & Shot-Stopping (GK, U6+),
  Ball Mastery: The Basics (Home Ground, solo clips).
- Gaps to fill: defending, younger ages (U6–U10), goalkeeping, more solo sessions.

## Grass and Roots (the Minis characters)

- **Grass** = the coach: cream ball, **green grass hair**, **orange panels**, green eyes, GRSS RTS badge, whistle and
  clipboard, side-on boots. **Roots** = the young player: smaller cream ball, **orange hair**, **grass-green panels**,
  bigger green eyes; does the moves. Only Roots's feet face forward (Roots does the exercise; Grass doesn't).
- Say "Grass and Roots" (real words); the characters carry GRSS / RTS on their kit.
- Shown on a light panel (`#eef0f2`) with a green border, an orange divider, beside the feet view. Dark boots on light.
- Code: `js/mascots.js` (drawings + sync to solo clips). Coach lines per clip in `coach: { intro, steps, outro }`.
- Minis videos: `tools/render-minis.js` (frame in `tools/minis-frame.html`) writes each clip's `minisVideo`.
- Rejected along the way: animal players (fox, dog, hedgehog etc.), a cone (looked like Wizbit; hair never sat right),
  black panels or a panel in the middle of the forehead, seams across the face, hair floating above the ball.
- **Minis area** (U8 and under, `minis` in AREAS): Grass and Roots clips + stars per move (1 slow, 2 faster, 3 challenge),
  saved on the device only (no accounts, no children's data). Live since the owner approved it (`SITE_FLAGS.minis = true` in `js/categories.js`);
  preview with `?drafts`. Sessions join with `minis: true`.

## Business decisions

- **Your session, animated** (The Dugout): Share it = **free** (added to the library to help other grassroots coaches,
  credit offered); Keep it private = **£25** full session (up to 4 progressions) / **£10** single animation, for the
  coach or their club; Priority = **+£10** on either, ready in 48 hours. Usually within 2 weeks; one round of changes.
- Order/suggest buttons say "Opening soon" until form links are set in `SITE_LINKS` (`js/categories.js`). The form should
  include permission to publish.
- Every session has Share with your squad and a one-page PDF plan with a QR code.
- Later: membership at ~12–15 sessions (~£4/month or ~£29/year; club licence), club packs, Kit Room.

## Ideas agreed, not built yet

- Installable web app (PWA) with clips saved for offline use at training; icons are ready. App stores later.
- Per-session link previews for WhatsApp.
