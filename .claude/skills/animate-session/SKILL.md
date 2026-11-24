---
name: animate-session
description: Turn a coach's session plan (photo, drawing, PDF or notes) into a new GRSS | RTS animated session as a hidden draft, render the clips and send them to the owner to check. Use when the owner sends a session plan to animate, or asks to change one in progress.
---

# Animate a session

**Firm rule:** always build the session as a `drills/<id>.js` file that uses the site's own engine (`js/drill-engine.js`),
exactly like the existing sessions. Never write a separate HTML page, artifact or your own animation code: it won't match the
site's look, has no MP4s, no Share link, no PDF plan and can't go in the library. Output = draft session file + rendered
MP4s sent with SendUserFile. Use the existing look: plain light pitch, team colours, arrows first, step text in the side panel.

**Start here to save time:** read `CHEATSHEET.md` (in this skill's folder) instead of the engine code, and copy
`starter.js` (same folder) as the new `drills/<id>.js`. Only open `js/drill-engine.js` if something isn't covered.

The owner (non-technical, usually on a phone) sends a picture of a session plan with a short note. Turn it into a draft
session on grssrts.co.uk, show them the clips, and fix it until they approve. Follow CLAUDE.md (style, coaching corrections,
brand, plain UK English replies). The README explains the engine and clip format.

## 1. Read the plan

- Work out: the drills (each becomes one or more clips), players and positions, the order of passes and runs, the scoring,
  the coaching points, age group, and any title the coach uses.
- If it's from **another coach** (a Dugout send-in): keep the coach's own terms in the title (short), the long heading as
  `coachTitle`, and `fromCoach: true`.
- Never copy other providers' drills, diagrams or wording. A watermark (e.g. The Coaching Manual) on the owner's own drawing
  is fine to work from, but don't reproduce their text. Never use children's names.
- Ask only about things you truly can't tell (who shoots, which way a run goes). Otherwise make a sensible choice and list
  your guesses in the reply.

## 2. Build it as a hidden draft

1. Copy `starter.js` from this skill's folder, or the closest existing file in `drills/` (e.g. `switch-of-play.js`, `midfield-three.js`,
   `penetration-dribbling.js`, `switching-play-square.js`).
2. New file `drills/<id>.js` with `draft: true`, `category`, `type` (Technical / Tactical / Game / Rondo), `ages`, `squad`,
   `topics` (from `TOPICS` in `js/categories.js` only: generic words like "Passing", not "Passing and receiving"),
   `summary`, `keyPhrase`, `cards`, `keywords`, `training` (area, players, equipment, setup), `questions`, `clips`.
3. Add `<script src="drills/<id>.js"></script>` to `index.html` after the other drill scripts.
4. New tag words (pills) go in `TAG_STYLE` in `js/drill-engine.js`.
5. Respect the corrections in CLAUDE.md (e.g. shots on target, never an empty box, middle player only bounces it back,
   crosses attacked as a team, pass up to the opposite side).

## 3. Check before sending

```bash
rm -rf tools/stills && node tools/render-videos.js --stills <id>
# contact sheet per clip (frames are 1920x1080):
ffmpeg -loglevel error -y -pattern_type glob -i "tools/stills/<id>-<clip>-*.png" \
  -vf "crop=1170:900:60:132,scale=390:300,tile=5x5" -frames:v 1 <scratchpad>/<clip>.png
```

Look at every sheet. Fix anything off before the owner sees it: players on top of each other or on cones, labels cut off
at the edge, titles too long for the title card, balls going wide of the goal, runs that don't make sense.

## 4. Render and send

```bash
rm -rf tools/stills
node tools/render-videos.js --thumbs <id>
node tools/render-videos.js <id>
git add -A && git commit -m "Draft: <title>" && git push -u origin <branch>
```

Send the videos with SendUserFile (one caption naming the clips). Reply briefly: what each clip shows, then your guesses
as questions. Keep it hidden until the owner says it's good.

## 5. When the owner approves

1. Remove `draft: true` (and "(DRAFT)" from the file's header comment).
2. Add the session to the Sessions list in CLAUDE.md and the table in README.md; add any new coaching corrections the owner
   gave to CLAUDE.md.
3. `node tools/bump-version.js`, commit, push, open a pull request, and give the owner the merge steps:
   open the link → Merge pull request → Confirm merge. Live in a minute or two.
