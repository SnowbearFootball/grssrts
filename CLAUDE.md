# GRSS | RTS: notes for Claude

Read this first in every new chat. It holds the decisions made with the owner that aren't obvious from the code.
The README covers how things work (the engine, clip format, tools). Keep this file up to date at the end of each piece of work.

## What it is

grssrts.co.uk: animated grassroots football coaching clips for **coaches, players and parents**. Sessions are
drawn like a session-plan diagram and animated **arrows first, then the movement**, with coaching points beside the pitch.
Hosted on Cloudflare Pages project **grssrts-site** (linked to GitHub, serves grssrts.co.uk); merging to `main` publishes the site
automatically. An older project "grssrts" (no Git connection) is not used: secrets go in **grssrts-site**. Plain HTML/JS, no build step for the site.

## How the owner likes to work

- To animate a new session, the owner starts a new chat with `/animate-session` and a photo of the plan
  (skill in `.claude/skills/animate-session/SKILL.md`). Short chats, one session each.

- **Never publish without the owner's OK.** New sessions start as hidden drafts (`draft: true`, view with `index.html?drafts`).
  Render the videos and **send them to the owner** to check (SendUserFile). Only remove `draft` when they approve.
- To go live: **open a pull request**; the owner merges it on GitHub (usually from a phone). Explain the merge steps briefly.
- Before every pull request run `node tools/bump-version.js` (new ?v= on the site's scripts, so phones don't show stale files).
  Cloudflare zone setting Browser Cache TTL must be "Respect Existing Headers" (owner asked to set it; default overrides _headers).
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
- **Logo versions:** main logo (goal with net) for site, clips, PDFs; kit logo (goal outline, no net: `grss-rts-kit*.svg`) for
  embroidery (hoodies, jackets, bags); plain "GRSS | RTS" with an orange bar for tiny items (cap side, tags). Keep the bar: it's
  the goal's left post, simplified. Write the name "GRSS | RTS"; "GRSS RTS" only where the bar can't be typed (email sender etc.).
- **App icon:** GRSS stacked over RTS-in-the-goal, cream and orange on forest green (`assets/logo/grss-rts-icon.svg`).
- Home page USPs (under the hero, heading "Why coaches use GRSS | RTS"): three orange cards like the Minis pill: See it move
  (every session animated), Share it with your squad (players, parents, co-coaches), Practise at home (Home Ground, free).
  Owner rejected wording about "arrows first" here: just say it's animated.
- Tagline "Watch it. Coach it. Play it." (big heading). Explanation line: "Every session as a short animated clip:
  see the plan, watch it happen, understand why." Keep them separate.

## Clip style decisions

- Arrows first, then movement. Labels (pills) show each player's job; examples use generic words (ATTACKER, not SPLASH).
- Coaches' own diagrams: plain background (`plain: true`) when they don't need pitch markings; add measurements (`dims`)
  and label players by position (GK, CB, FB, CM, W, ST, D, M) when it helps.
- Titles: clear but not too specific. Naming a coach's session: keep the coach's own terms (principle of play, penetration,
  overload); put numbers (4 v 3) in the title when short; a long coach heading can go in the subtitle.
- Copy the coach's intent, not a rigid pattern: e.g. "ideas to create a shot, not a set move"; movement is free.
- Coaching detail the owner has corrected before: in passing patterns (5 Y's, draft) the middle player moves away from the cone first (separation, like losing a defender), back-foot control, and the pass up is always to the opposite side (same side gets tight); alternate direction each go; shots must go on target; pass and follow needs one more player than boxes (never an empty box); a middle player only bounces it back (one-two), never the longer pass; crosses are attacked as a team (strikers cross over, opposite winger sweeps the back post, one CM in the box, one on the edge); runner times the run and keeps space to move onto the ball; pressing as a
  comment means "send one in to apply pressure", not a win-it-and-score drill; a long ball to the keeper comes from the
  furthest opponent and is over-hit; waiting players rotate in; say "inside / outside of the foot" with "(big toe)" / "(little toe)" after it, never "instep" (reads as the laces); in dribbling drills all the balls start inside; a run off the ball works as a decoy (defender follows: dribble) or the spare player (defender stays: pass); never dribble towards a team-mate's run (closes your own space, meets two defenders): feint that way, attack away from it; an underlap here = run behind the player on the ball and down the other wing (attackers cross over, "who marks who?"), not a run through the middle; both press the dribbler = pass, both follow the runner = dribble; 2 v 1 needs queues with more attackers than defenders; GK stands on an arc post to post, an extra step towards
  the near post when the ball is wide; long passing: mix it up (drilled along the ground, floated, chipped over a lane blocker) and play it when it's on;
  support after a long pass with space, not all near the ball: one drops short, two wider and a little higher, one gives height
  (in the middle, furthest from the ball, not in the other end zone: the mid-length pass); finishing drills: decisions are "play what you see", not a set order; while play is at the other end, recover; avoid set numbers of passes: be game like (movement, energy, talk), defenders always moving; vs blockers, find the spare man and work an opening; pass on angles, not straight lines (easier to open up); a check away is only a couple of yards; game clips can "freeze" to show the better option; in feeder drills, defenders never pass: the scorer gets the ball and plays in his team-mate; defending: "travel as the ball travels" is the trigger to get out; small goals rather than cone gates; forcing play sideways or back = job done.
- Remove children's names from any photo before using it. Avoid other companies' watermarked diagrams on the site.
- Never copy other providers' (e.g. The Coaching Manual) drills, diagrams or wording into the library; sessions come
  from the owner's own plans or are newly written.

## Content

- Sections: Goalkeeping, Defending, Attacking; areas: The Dugout (coach requests), Home Ground (practise at home), Kit Room (shop).
  The Dugout comes before Home Ground. Home Ground opens with an explanation and two pills side by side (no big cards; Minis orange, Juniors green): Minis (U8 and under, Grass and Roots, `#minis`) and Juniors (U9 and up, `#juniors`); each has its own page.
- Sessions: Splash & Ripple (defending), Shoot & Recover, 5 v 2 Transfer Rondo, Long Range Shooting: Move Onto It (U14+),
  Long Range Shooting: Up, Back, Shot (U14+), Rotation of Positions (U14+, replaced Building Out: Rotations; old address
  redirects via `aliases`), Combination Play (U12+, two balls at once), Switching Play: Pass and Follow (U12+, square of 4 boxes: one team then two, 3 or 4 teams OK; progression bounce off one or two middle players, who only bounce it back, talk), Switch of Play: Game Like (U14+, 6 mannequins, double movements, switch into space, underlap / overlap, every clip ends with a team attack on the cross; mix up which CM gets the set-back), Penetration via Dribbling (U9+, from another coach's plan: Drill 1 Ball Mastery: Beat Your Player, unopposed then semi-opposed; Drill 2 Penetration Overload: 4 v 3 to End Zones; titles use the coach's own terms), Midfield Three: Playing Through (U14+, coach's plan "Utilising the Midfield 3 to Penetrate Against a 4-4-2", shown as coachTitle: pivot scans / back foot, midfield rotates to find the spare player, patient with CBs, score through black or blue gates; reds win it and dribble over the yellow end line), Defending the Wide Areas (defending, U14+, coach's plan "Defending in a 4-4-2 Against a Wide 4-3-3": compact, show it wide, ball wide = pressing trigger, pressure / cover / balance and the staircase, win it and carry over halfway), Set Position & Shot-Stopping (GK, U6+),
  Dribbling (attacking, U12+, owner's own plan: 35 yd square; Ball Each, Pass and Swap with 4 purple outside players who swap colour when they
  swap places, Beat the Cones with 5 balls all starting inside, cones as passive defenders, rotate the outside),
  Dribbling: 1 v 1 to 2 v 2 (attacking, U11+, owner's own plans "Dribbling Part 2 and 3"; 6 clips: Beat the Cone, Turn and Back In,
  Beat Your Defender (1 v 1 + double movement, queues each end, swap ends = swap roles), Decoy or Spare Player (2 v 1, queues, more attackers),
  Isolate the Defender and The Underlap (2 v 2); small goals throughout),
  Dribbling: Where Is the Space / Overload? (attacking, Game, U11+, owner's own plan "Dribbling Part 4"; numbers game in a 35 yd square,
  goal + keeper each end, two teams numbered 1 to 5 by their own goal: the coach calls a number and passes straight to the attacker
  (nobody runs to the middle and waits), numbered opponent defends; 1 v 1, then 2 v 2 (call two numbers), then 4 v 4 + keepers on 40 x 50:
  where is the space (drive into it), where is the overload (2 v 1: defender steps up = pass, stays = drive). Owner rejected "risk / reward":
  don't use it),
  Ball Mastery: The Basics (Home Ground, solo clips), Shape: 5-a-Side (defending, Shape, U8–U9 only; first called Play in Your Half, renamed because "your half" could read as the team's own half; that phrase stays as the subtitle and key phrase, owner's own plan: 5-a-side,
  each player's half shaded in their colour (ATT top, DEF bottom, wingers their side, GK box); ball wide = far winger tucks in to the
  middle but not past it; connected by string: ATT high pulls DEF to halfway, one winger wide pulls the other in. A "Don't Bunch"
  clip was dropped: keeping our shape is what stops bunching. Older ages would need more players, so not U10+),
  Defending Outnumbered (defending, Tactical, U12+, owner's own plan "Defending out-numbered"; 3 clips: Stall the Attack (2 v 1, 15 x 15,
  the coach passes to either attacker, defender stalls the attack between ball and goal, shows them away, decides when to stop backing off),
  Recover to Help (2 v 1 to 2 v 2, 15 x 20: defender 1 passes in and delays, defender 2 starts behind the attackers and recovers towards goal
  as soon as they receive), One in the Zone (4 v 4 + keepers, 40 x 30 yds, 10 yd defensive zone each end with one defender until the ball
  goes in, 2 floaters outside play for whoever has the ball)),
  Short Passing (attacking, Technical, U12+, owner's own plan; 3 clips: Pass and Move (two hexagons of cones sharing a middle line, 7 players on
  the sides, pass then move to a free side; receive on the middle line = open up to the other zone, back-foot control, turn and pass into it;
  one touch progression), Keep It: 5 v 2 (one defender per zone, only in their zone; defender wins it = swap roles, hand over the bib),
  Overload: 10 v 4 (40 x 30, 4 v 4 inside + 2 floaters who can't pass to each other + 4 outside, all play for the team with the ball;
  8 passes = a goal; rotate: a team goes outside, the outside four come in)). Engine: `edges` draws cone lines in any shape (hexagons).
  Long Range Passing (attacking, Technical, U14+, owner's own plan; 3 clips: End to End (40 x 30, 10 yd end zones, 2 per end zone + 2 middle;
  long, or short to the supporting middle player who bounces it straight back or sets it for the other end-zone player, who goes long;
  after every long pass the other middle player joins in as support), Press and Block (both middle players are defenders: first pass starts it,
  one presses, the deeper one blocks the long lane; after a long pass the closer one presses, the other blocks: each presses one end),
  4 v 4 + Targets (45 x 30, 2 targets per end zone; middle players play short into a target, ONLY targets play the long pass, into the far end
  zone = a goal; win it = feed your own target; rotate the targets so everyone practises long passes)). Engine: lofted passes
  (`loft: 'float' | 'chip'` on a pass: curved arrow, ball lifts off its shadow).
  Close Range Finishing (attacking, Technical, U12+, owner's own plan; 34 x 20: two 15 yd shooting zones (like inside the box, adjust
  for age) + a 4 yd neutral zone, goal + GK each end; 3 clips: Call a Number (3 numbered servers per half; finishes alternate ends:
  close up first time, meanwhile the first shooter recovers to the neutral zone for a longer finish (let it run / turn and shoot), then
  close again), Play What You See (2 v 1 each half: he commits = quick pass, mate arriving = soft cushion to hit first time, he follows
  your mate = touch and shoot; not in a set order; recover to the neutral zone while play is at the other end), 4 v 4 + Floaters
  (a floater in a wide channel each side, unopposed but quick: 2 or 3 touches, feed it back in timed with a run; mix up angle and speed)).
  Long Range Finishing (attacking, Technical, U14+, owner's own plan; 41 x 25: two 18 yd shooting areas (penalty box) + a 5 yd middle zone;
  3 clips: Set Up the Shot (two teams of 4 in their own areas, floaters in the middle set it up; no set number of passes, game like:
  movement, energy, talk; laces, volley, side foot), Beat the Press (the two middle defenders press: find the spare man, work an opening
  (decoy run, bounce) to bypass the blockers, move onto it, first time), Points for Distance (a normal match, everyone moving; floater in each
  end area can't shoot; 1 point, 2 from the middle, 3 from own half; work the chance from any zone)). Engine: shots can bend and lift
  (`ball: { to, bend, loft }`).
  Creating Space (attacking, Technical, U10+, owner's own plan; 3 clips: Double Movement (10 x 25 grid, 5 yd end zones + 15 yd receiving
  zone, 4 players numbered 1 to 4; check away just a couple of yards, explode back, half turn, back foot, pass; players offset so every
  pass is on an angle, never straight lines; swap with the end player), Lose Your Defender (1 v 1 at each end, a small goal each end, no
  keepers; blues only defend at first: score, get the ball back, play in your team-mate at the other end, that end's defender is out;
  repeat, then rotate: blues attack), Make the Space (4 v 4 + keepers on 40 x 30, a floater in each side channel, 3 touch; a real game,
  sharp passing and moving, width and depth; coach freezes it (red FREEZE label, space highlighted), rewinds, shows the better option)).
  Defending: Matched Up (defending, Technical, U10+, owner's own plan; 3 clips: Travel as the Ball Travels (1 v 1, 10 x 10, small goal a
  little left of centre near the defender; defender passes in, the ball travelling is the trigger to get out; arc run, slow, get low,
  show away, pivot off the back foot (never turn your back), patient front-foot tackle), Pressure and Cover (30 x 20, teams numbered 1 to 6,
  small goal central each end; coach calls two numbers: press + cover, swap jobs when the ball moves), Defend as a Unit (4 v 4 + keepers,
  floaters; stop the shot and forward pass, sideways or back = job done, squeeze, quick switch = travel as the ball travels as a unit,
  recovery runs)). Engine: long intro titles shrink to fit.
- Gaps to fill: more defending, younger ages (U6–U10), goalkeeping, more solo sessions.
- Defending attempts: Defending Outnumbered was approved (recovery runs with a 2 v 1 and the zone rule had enough depth). Recovery Runs and Defend as a Back Four were rejected (too similar to Shoot & Recover and Splash & Ripple; removed).
  Intercepting Passes, Blocking Shots and The 5 Y's (waiting for better drawings) are on hold as hidden drafts (owner: "very basic"). Next defending ideas need more depth than a 1 v 1 basic.

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
- **Minis** (U8 and under) is one of Home Ground's two parts (`parts` in `js/categories.js`), page `#minis`: Grass and Roots clips + stars per move (1 slow, 2 faster, 3 challenge),
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
- Free accounts keep the monthly free session; paying members get the whole library (once membership starts). During the trial,
  "Join free" unlocks everything.
- **Founding members** (idea agreed): the Burgess Hill Town F.C. trial coaches get a free year of membership as a thank-you
  when paid membership starts.

## Registration (planned, club trial)

- First trial: coaches at **Burgess Hill Town F.C.**, free sign-up. Trial coaches get their sessions **animated free**
  (to build up content, with permission to publish and credit).
- Tool: **MailerLite** (free up to 1,000; owner is setting up the account). Sign-up asks: first name, email, role
  (coach / parent / player 16+), coaching qualification (optional, coaches only), age groups coached, club, email consent tick box. Never children's names or dates of birth.
- Domain grssrts.co.uk is registered and managed in the owner's Cloudflare account (email and MailerLite settings go there).
  Email: a hello@grssrts.co.uk inbox is needed (MailerLite won't send from Yahoo/Gmail). Owner chose **Google Workspace** (Business Starter, business name "GRSS RTS") linked to Cloudflare and verified: **hello@grssrts.co.uk** works (on the privacy page).
- Access (agreed direction): anyone can browse the home page and section lists; opening a session (clips, coaching points, downloads)
  needs an account. Header buttons Log in + Join free; tapping a session shows a join / log in pop-up. Home Ground (Minis and Juniors)
  stays free with no sign-up. Shared ("Share with your squad") links open that one session without login (`?squad` in the link). No first-clip taster:
  one free session per section instead (see below). Login service: suggested Clerk
  (passwords, reset emails, Google sign-in); MailerLite stays for emails only. Owner to confirm and create accounts.
- Accounts preview is built (SITE_FLAGS.members = false; see it with ?drafts, "pretend to log in" button until the login service is
  connected). Free session per section in FREE_SESSIONS (js/categories.js), changed monthly; replaces the first-clip taster.
  Topic list in TOPICS (js/categories.js); every session has `topics`. Coach sessions: `fromCoach: true` ("From a coach" label).
- Neater section pages (LIVE since 25 Nov 2026, SITE_FLAGS.shelves = true): owner wants uniform, symmetrical and informative.
  Type pills solid orange with cream writing, the chosen one forest green (wrap on phones), one-line "Age group: All ages ▾" (opens U6–U16 + All ages; remembered on the device), Search /
  Saved / Refine, then always a grid in rows of 3: a mixed selection of 6 (newest of each type in turn), "Show more" adds 6.
  Heading above the grid in green ("A selection of sessions" / the chosen type + what it means); owner chose green over orange.
  No per-type rows (they left lonely single cards). Works without logins; padlocks + Log in only with SITE_FLAGS.members (preview ?drafts&members).
- Section page design (approved): orange Type pills across the top (All / Technical / Tactical / Game / Rondo,
  with counts), rows of up to 3 sessions per type, padlock "Join to watch" on cards, and one featured session first on All with an
  orange "Free to watch" speech bubble (no sign-up). Topics to be picked at upload from a fixed list (stored as `topics` on each session); keep them generic ("Dribbling",
  not "Dribbling and 1 v 1"). List: Attacking: Passing, Dribbling, Shooting, Crossing, Combination play, Build-up play, Switching play,
  Counter-attacks. Defending: Pressing, Tackling, Shape, Transition, Crosses. Goalkeeping: Handling, Shot-stopping, Positioning,
  Distribution, Crosses. Any section: Warm-ups, Small-sided games.
- Built and merged (hidden, preview with ?drafts; owner checked it on their phone): Join page (club link ?club=bhtfc#join),
  Privacy page (contact email and date still to fill in), the accounts preview above.
- Emails: one monthly round-up (new sessions, the free session of the month, a tip or coach shout-out), drafted by Claude for the
  owner to send; an automatic welcome email. No per-video or weekly emails.
- MailerLite: account created with hello@; sending domain grssrts.co.uk added manually in Cloudflare (DKIM CNAME litesrv._domainkey,
  DNS only; SPF merged into one record "v=spf1 include:_spf.mlsend.com include:_spf.google.com ~all"; verification TXT). Never give
  third parties Cloudflare API keys; add records by hand.
- MailerLite fields made (Text, not required): Role, Qualification, Age Groups, Club (API keys likely role, qualification,
  age_groups, club: check via API). Group "Club trial: Burgess Hill" made (group ID 205014604942673731).
- MailerLite API key saved by the owner as Cloudflare secret MAILERLITE_API_KEY. `functions/api/join.js` (Pages Function, /api/join)
  adds sign-ups to MailerLite as unconfirmed (double opt-in), Burgess Hill club link → the trial group; every sign-up also joins group "Website Sign-Ups" (looked up by name), which
  starts the MailerLite "Welcome" automation; hidden trap box against bots.
- Sign-up tested for real (owner's own email): confirm email arrives from GRSS RTS. Secrets only apply after a redeploy
  (grssrts-site > Deployments > Retry deployment).
- Join and Privacy pages are public (no logins yet; whole site stays open). Owner is thinking about logins: they must never
  get in the way of coaches sending sessions in (The Dugout never needs a login).
- The Dugout "Send your session" = Tally form https://tally.so/r/o92ajb (owner's account, hello@): name, email, club, title, ages,
  section, file upload, notes, share/private, credit, permission + no-children's-details ticks. No login needed. Tested: submissions
  email hello@ within a minute (Tally self email notifications on). Owner replies from hello@, then sends Claude the plan.
- Trial is ready to launch: WhatsApp message drafted with the Join link (?club=bhtfc#join) and #dugout. Welcome email: MailerLite "Welcome"
  workflow made (trigger: joins Website Sign-Ups) but not activated yet (MailerLite wouldn't allow it; maybe account approval or
  missing content). Optional: trial goes ahead without it. Later, when the owner decides: Clerk logins, then switch on SITE_FLAGS.members. Later: a Starter Pack PDF.

## Ideas agreed, not built yet

- Installable web app (PWA) with clips saved for offline use at training; icons are ready. App stores later.
- Per-session link previews for WhatsApp.
