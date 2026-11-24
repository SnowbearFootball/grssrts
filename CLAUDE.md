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
- **App icon:** GRSS stacked over RTS-in-the-goal, cream and orange on forest green (`assets/logo/grss-rts-icon.svg`).
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
  furthest opponent and is over-hit; waiting players rotate in; say "inside / outside of the foot" with "(big toe)" / "(little toe)" after it, never "instep" (reads as the laces); in dribbling drills all the balls start inside; GK stands on an arc post to post, an extra step towards
  the near post when the ball is wide.
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
  Ball Mastery: The Basics (Home Ground, solo clips), Shape: 5-a-Side (defending, Shape, U8–U9 only; first called Play in Your Half, renamed because "your half" could read as the team's own half; that phrase stays as the subtitle and key phrase, owner's own plan: 5-a-side,
  each player's half shaded in their colour (ATT top, DEF bottom, wingers their side, GK box); ball wide = far winger tucks in to the
  middle but not past it; connected by string: ATT high pulls DEF to halfway, one winger wide pulls the other in. A "Don't Bunch"
  clip was dropped: keeping our shape is what stops bunching. Older ages would need more players, so not U10+).
- Gaps to fill: defending, younger ages (U6–U10), goalkeeping, more solo sessions.
- Defending attempts: Recovery Runs and Defend as a Back Four were rejected (too similar to Shoot & Recover and Splash & Ripple; removed).
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
