/*
 * SESSION: Close Range Finishing (Attacking · technical) (DRAFT)
 * From the owner's own plan "Close Range Finishing" (1st4sport L2 session sheet).
 *
 * Key factors: positive attitude; movement to create space; decision making (first time etc); where to control the ball;
 *   technique and type of finish (including power); head up to see the keeper's position; where to aim, accuracy, follow up.
 * Pitch (owner's change): two 15 yd shooting zones (like inside the box; adjust for age) and a 4 yd neutral zone = 34 x 20 yds.
 * 1. Tech (10 mins): a goal and keeper at each end, three numbered servers for each half. The coach calls a number; the
 *    attacker receives from that server and shoots. Finishes alternate: close up (first time) at one end, then the other
 *    end; meanwhile the first shooter recovers to the neutral zone for a slightly longer finish (turn and shoot, or let it
 *    run and shoot). Then close again. Repeat.
 * 2. Skill (10 mins): same set-up, 2 v 1 in each half, two servers per half. Decision making: play what you see (quick
 *    pass to take the defender out, soft cushion to hit first time, or touch and shoot). Recover to the neutral zone
 *    while play happens at the other end.
 * 3. Game (20 mins): 4 v 4 + keepers. Floaters in a wide channel each side: unopposed, but must play quickly
 *    (2 or 3 touch) and feed it back in, timed with team-mates' runs. Mix up the serves (angle and speed).
 * Owner's extra points: movements to create space; first time or two touch; placement or power; the set-up pass:
 *   quick to take a defender out of the game, or a soft cushion so a team-mate can hit it first time.
 * Pitch laid sideways: x 0..100 = 34 yds (about 2.9 units a yard), y 0..75 = about 20 yds. Goals left and right.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', S = '#d4a017', OR = '#d9622b', K = '#2b2b2b';
  const NZ = { x: 44.1, w: 11.8 };   // 4 yd neutral zone; shooting zones 0..44.1 and 55.9..100 (15 yds each)
  const neutral = [{ x: NZ.x, y: 2, w: NZ.w, h: 71, fill: 'rgba(22,53,31,0.10)' }];
  const zoneLabels = [
    { x: 0, y: 2, w: NZ.x, h: 71, color: G, label: 'SHOOTING ZONE: 15 YDS', labelAt: [22, 58], soft: true },
    { x: NZ.x, y: 2, w: NZ.w, h: 71, color: OR, label: 'NEUTRAL: 4 YDS', labelAt: [50, 37.5], soft: true },
    { x: NZ.x + NZ.w, y: 2, w: 100 - NZ.x - NZ.w, h: 71, color: G, label: 'SHOOTING ZONE: 15 YDS', labelAt: [78, 58], soft: true },
  ];
  const keepers = [
    { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 },
    { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
  ];
  // servers: 's' on the top line (face down), 't' on the bottom line (face up), 'u' on the right end (face left)
  const common = {
    plain: true,
    goals: [[37.5, 'left'], [37.5, 'right']],
    goalScale: 1.4,
    areas: neutral,
    tagPlace: 'auto',
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'close-range-finishing',
    draft: true,
    title: 'Close Range Finishing',
    subtitle: 'Make space, pick the finish, weight the set-up',
    type: 'Technical',
    category: 'attacking',
    topics: ['Shooting', 'Small-sided games'],
    squad: [8, 12],
    thumb: 'assets/thumbs/close-range-finishing.jpg',
    summary: 'Call a number and finish from that server, then 2 v 1 in each half, then a 4 v 4 game with floaters in the wide channels. Move to make space, first time or two touch, placement or power, and play what you see.',
    keyPhrase: 'Make space, then finish',
    ages: { from: 12 },

    cards: [
      {
        title: 'The finish',
        lead: '*Positive attitude*: get it on target.',
        columns: [
          { heading: 'Before it arrives', items: ['*Move* to create space', '*Head up*: where is the keeper?', 'Decide: *first time* or *two touch*?'] },
          { heading: 'The strike', items: ['Close up: usually *first time*', 'Further out: control it *out of your feet*, towards goal', '*Placement* or *power*? On target, then *follow up*'] },
        ],
        phrase: { big: 'MAKE SPACE, THEN FINISH', small: 'Head up: where is the keeper?' },
      },
      {
        title: 'Play what you see',
        lead: 'The *defender* decides your pass. Weight it for your team-mate.',
        columns: [
          { heading: 'Options', items: ['He commits: *quick pass*, take him out of the game', 'Mate arriving: *soft cushion* to hit first time', 'He follows your mate: *touch and shoot*'] },
          { heading: 'Off the ball', items: ['*Talk*: "square!", "I\'m free!"', 'Play at the other end? *Recover* to the neutral zone', 'Floaters: *quick*, 2 or 3 touch, *feed it in*'] },
        ],
        phrase: { big: 'PLAY WHAT YOU SEE', small: 'Quick, soft, or shoot yourself' },
      },
    ],

    keywords: [
      { word: 'Close range', meaning: 'Finishing from near the goal, inside the box.' },
      { word: 'Double movement', meaning: 'Shape to go one way, then go the other, to lose your defender.' },
      { word: 'First time', meaning: 'Shooting without controlling the ball first.' },
      { word: 'Two touch', meaning: 'One touch to set it up, one to shoot.' },
      { word: 'Placement', meaning: 'Picking a spot, often low into the corner, rather than hitting it hard.' },
      { word: 'Cushion', meaning: 'A soft pass that slows the ball down so a team-mate can strike it first time.' },
      { word: 'Follow up', meaning: 'Following your shot in, ready for a rebound.' },
      { word: 'Neutral zone', meaning: 'The 4 yard strip in the middle. Recover here, then finish from a little further out.' },
      { word: 'Wide channel', meaning: 'The strip down each side where the floaters play, unopposed.' },
    ],

    training: {
      area: '34 × 20 yards: two 15 yard shooting zones (like inside the box; adjust for the age group) and a 4 yard neutral zone in the middle. A goal at each end.',
      players: 'Tech: two keepers, three servers for each half, an attacker (or a queue) in each half. Skill: 2 v 1 in each half. Game: 4 v 4 plus keepers and two floaters (12).',
      equipment: 'Two goals, cones, bibs, plenty of balls with every server.',
      setup: [
        'Tech (10 minutes): three numbered servers for each half. The coach calls a number: the attacker receives from that server and shoots.',
        'Alternate the finishes: close up (usually first time) at one end, then the other end. Meanwhile the first shooter recovers to the neutral zone for a slightly longer finish. Then close again. Repeat.',
        'Receive in the neutral zone: turn and shoot, or let the ball run across you and shoot.',
        'Skill (10 minutes): same set-up, but 2 v 1 in each half. Play what you see: quick pass to take the defender out, soft cushion so your team-mate can hit it first time, or touch and shoot yourself.',
        'While play happens at the other end, recover to the neutral zone.',
        'Game (20 minutes): 4 v 4 plus keepers. A floater in a wide channel on each side plays for the team with the ball, unopposed.',
        'Floaters play quickly: 2 or 3 touches, then feed it back in, timed with a team-mate\'s run. Mix up the serves: angle and speed.',
        'Rotate the servers, attackers and floaters so everyone gets to finish.',
      ],
    },

    questions: [
      'How did you make space before the ball came in?',
      'Close up: did you go first time? Further out: did you take a touch?',
      'Placement or power: which did you pick? Why?',
      'Where was the keeper when you shot?',
      'What did the defender do? What did you pick: quick, soft or shoot?',
      'Floaters: how many touches? Did you time it with the run?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, common, {
        id: 'call-a-number',
        video: 'videos/close-range-finishing-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'Call a Number',
        tagline: 'Close up, then a longer finish. Alternate ends.',
        intro: ['A goal and keeper at each end, *three servers* for each half.', 'Coach calls a *number*: that server plays it in.', '*Alternate*: close up, then recover for a *longer* finish.'],
        keyPhrase: { big: 'MAKE SPACE, THEN FINISH', small: 'Close up: first time' },
        facing: { a: 'left', b: 'right', s: 1, t: -1, u: 'left', k: 'right', k2: 'left' },
        teamColors: { b: G, s: S, t: S, u: S, k2: K },
        legendTeams: [{ label: 'Attackers', color: G }, { label: 'Servers', color: S }],
        players: keepers.concat([
          { id: 'aL', team: 'a', x: 34, y: 44 }, { id: 'aR', team: 'b', x: 74, y: 40 },
          { id: 'L1', team: 's', label: '1', x: 15, y: 3, ball: true }, { id: 'L2', team: 't', label: '2', x: 42, y: 72, ball: true },
          { id: 'L3', team: 't', label: '3', x: 15, y: 72, ball: true },
          { id: 'R1', team: 'u', label: '1', x: 97, y: 13, ball: true }, { id: 'R2', team: 's', label: '2', x: 58, y: 3, ball: true },
          { id: 'R3', team: 't', label: '3', x: 85, y: 72, ball: true },
        ]),
        ball: { owner: 'L1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Two *15 yard* shooting zones, a *4 yard* neutral zone.', '*Three servers* for each half: 1, 2 and 3.', 'Coach calls a *number*: that server plays it in.'],
            halves: zoneLabels,
          },
          {
            title: 'CALL "ONE": CLOSE IN',
            text: ['Coach calls *"one!"*', '*Double movement*: get *close* to goal.', 'Server *weights* it into your run.'],
            tags: { aL: 'DOUBLE MOVE' }, timing: { move: 3 },
            moves: [{ id: 'aL', path: [[38, 50], [25, 33]], start: 0, end: 0.7 }],
            passes: [{ to: 'aL', start: 0.45, end: 0.8 }],
          },
          {
            title: 'CLOSE UP: FIRST TIME',
            text: ['Close up: *first time*.', '*Head up*: where is the keeper?', '*Place it*, low into the corner.'],
            tags: { aL: 'FIRST TIME' }, timing: { move: 2 },
            shot: [-2, 42],
            ball: { to: [-2, 42], start: 0.05, end: 0.4 },
            moves: [{ id: 'kL', to: [2.5, 34.5], start: 0.05, end: 0.4, arrow: false }],
          },
          {
            title: 'OTHER END: CLOSE IN',
            text: ['Other end does the *same*: close in.', 'First shooter *recovers* to the *neutral zone*...', '...ready for a *longer* finish.'],
            tags: { aR: 'DOUBLE MOVE', aL: 'RECOVER' }, timing: { move: 3.2 },
            ball: { give: 'R3' },
            moves: [
              { id: 'aR', path: [[68, 34], [79, 46]], start: 0, end: 0.7 },
              { id: 'aL', to: [48, 43], start: 0.1, end: 0.95 },
              { id: 'kL', to: [2.5, 37.5], start: 0.2, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'aR', start: 0.45, end: 0.8 }],
          },
          {
            title: 'CLOSE UP: FIRST TIME',
            text: ['*First time* again, close up.', 'Keeper covers the near post? *Far post*.'],
            tags: { aR: 'FIRST TIME' }, timing: { move: 2 },
            shot: [102, 32],
            ball: { to: [102, 32], start: 0.05, end: 0.4 },
            moves: [{ id: 'kR', to: [97.5, 41], start: 0.05, end: 0.4, arrow: false }],
          },
          {
            title: 'CALL "TWO": NEUTRAL ZONE',
            text: ['Coach calls *"two!"*: into the *neutral zone*.', 'Second shooter *recovers* too.'],
            tags: { aL: 'MOVE', aR: 'RECOVER' }, timing: { move: 3 },
            ball: { give: 'L2' },
            moves: [
              { id: 'aL', to: [49, 46], start: 0, end: 0.35 },
              { id: 'aR', to: [52, 32], start: 0.1, end: 0.95 },
              { id: 'kR', to: [97.5, 37.5], start: 0.2, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'aL', start: 0.4, end: 0.8 }],
          },
          {
            title: 'LET IT RUN, THEN SHOOT',
            text: ['*Open up*: let it run across you.', 'Longer finish: *power* or *placement*?', '*Head up* first.'],
            tags: { aL: 'LET IT RUN' }, timing: { move: 2.6 },
            shot: [-2, 33],
            ball: { to: [-2, 33], start: 0.42, end: 0.68 },
            moves: [
              { id: 'aL', to: [42, 44], start: 0, end: 0.38 },
              { id: 'kL', to: [2.5, 40], start: 0.42, end: 0.68, arrow: false },
            ],
          },
          {
            title: 'OTHER END: NEUTRAL ZONE',
            text: ['Other end: from the *neutral zone*.', 'First shooter gets back in, ready to go *close* again.'],
            tags: { aR: 'TURN' }, timing: { move: 2.6 },
            ball: { give: 'R2' },
            moves: [{ id: 'aL', to: [34, 46], start: 0.2, end: 0.9 }],
            passes: [{ to: 'aR', start: 0.1, end: 0.5 }],
          },
          {
            title: 'TURN, THEN POWER',
            text: ['*Turn* with your first touch.', 'Second touch: *power*, on target.', 'Then *close up* again: repeat.'],
            tags: { aR: 'POWER' }, timing: { move: 2.6 },
            shot: [102, 42],
            ball: { to: [102, 42], start: 0.42, end: 0.62 },
            moves: [
              { id: 'aR', to: [59, 35], start: 0, end: 0.38 },
              { id: 'kR', to: [97.5, 34], start: 0.42, end: 0.64, arrow: false },
            ],
          },
        ],
        summary: ['*Move* to make space before it arrives.', '*Alternate*: close up first time, then a *longer* finish.', 'Play at the other end? *Recover* to the neutral zone.', '*Head up*, on target, *follow up*.'],
      }),

      // ---------------- 2: skill (2 v 1) ----------------
      Object.assign({}, common, {
        id: 'two-v-one',
        video: 'videos/close-range-finishing-2.mp4',
        kicker: 'Clip 2 · Skill: 2 v 1',
        title: 'Play What You See',
        tagline: 'Quick pass, soft cushion, or shoot yourself.',
        intro: ['*2 v 1* in each half, plus a keeper.', 'Coach calls a number, same as before.', '*Play what you see*: the defender decides.'],
        keyPhrase: { big: 'PLAY WHAT YOU SEE', small: 'Quick, soft, or shoot yourself' },
        facing: { a: 'left', b: 'right', d: 'right', e: 'left', s: 1, t: -1, k: 'right', k2: 'left' },
        teamColors: { b: G, e: B, s: S, t: S, k2: K },
        legendTeams: [{ label: 'Attackers', color: G }, { label: 'Defenders', color: B }, { label: 'Servers', color: S }],
        players: keepers.concat([
          { id: 'dL', team: 'd', x: 15, y: 40 }, { id: 'dR', team: 'e', x: 85, y: 37 },
          { id: 'A1', team: 'a', x: 34, y: 26 }, { id: 'A2', team: 'a', x: 34, y: 50 },
          { id: 'A3', team: 'b', x: 66, y: 26 }, { id: 'A4', team: 'b', x: 66, y: 50 },
          { id: 'L1', team: 's', label: '1', x: 18, y: 3, ball: true }, { id: 'L2', team: 't', label: '2', x: 18, y: 72, ball: true },
          { id: 'R2', team: 's', label: '2', x: 82, y: 3, ball: true }, { id: 'R1', team: 't', label: '1', x: 82, y: 72, ball: true },
        ]),
        ball: { owner: 'L1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*2 v 1* in each half, plus a keeper.', 'Coach calls a number, same as before.', 'Look at the *defender*: *move* and *talk*.'],
            halves: zoneLabels,
          },
          {
            title: 'CALL "ONE": MOVE AND TALK',
            text: ['Coach calls *"one!"*', 'One attacker *moves* to get it.', 'The other *talks*: "square!", "I\'m free!"'],
            tags: { A1: 'MOVE', A2: 'TALK' }, timing: { move: 3 },
            moves: [
              { id: 'A1', to: [29, 18], start: 0, end: 0.45 },
              { id: 'A2', to: [30, 52], start: 0.2, end: 0.7 },
              { id: 'dL', to: [20, 30], start: 0.4, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'A1', start: 0.4, end: 0.75 }],
          },
          {
            title: 'HE COMMITS: QUICK PASS',
            text: ['*Play what you see*.', 'Defender *commits* to you?', '*Quick pass*: takes him out of the game.'],
            tags: { A1: 'QUICK PASS', A2: 'FIRST TIME' }, timing: { move: 2.6 },
            moves: [
              { id: 'dL', to: [22, 20], start: 0, end: 0.45, ease: 'out' },
              { id: 'A2', to: [24, 48], start: 0.1, end: 0.55 },
            ],
            passes: [{ to: 'A2', start: 0.3, end: 0.52 }],
          },
          {
            title: 'FIRST TIME FINISH',
            text: ['Team-mate hits it *first time*.', 'Keeper covers the near post?', '*Place it* far post.'],
            tags: { A2: 'PLACE IT' }, timing: { move: 2 },
            shot: [-2, 33],
            ball: { to: [-2, 33], start: 0.05, end: 0.38 },
            moves: [{ id: 'kL', to: [2.5, 41], start: 0.05, end: 0.38, arrow: false }],
          },
          {
            title: 'OTHER END: RECOVER',
            text: ['Other end: coach calls *"one!"*', 'Meanwhile: *recover* to the *neutral zone*.'],
            tags: { A4: 'MOVE', A1: 'RECOVER', A2: 'RECOVER' }, timing: { move: 3.2 },
            ball: { give: 'R1' },
            moves: [
              { id: 'A4', to: [71, 58], start: 0, end: 0.45 },
              { id: 'dR', to: [80, 45], start: 0.4, end: 0.95, arrow: false },
              { id: 'A1', to: [48, 28], start: 0.1, end: 0.95 },
              { id: 'A2', to: [50, 46], start: 0.15, end: 0.95 },
              { id: 'dL', to: [15, 40], start: 0.2, end: 0.8, arrow: false },
              { id: 'kL', to: [2.5, 37.5], start: 0.2, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'A4', start: 0.4, end: 0.75 }],
          },
          {
            title: 'MATE ARRIVING: SOFT CUSHION',
            text: ['Defender comes to you, team-mate *arriving*?', '*Soft cushion* into the *path*...', '...to hit it *first time*.'],
            tags: { A4: 'CUSHION', A3: 'FIRST TIME' }, timing: { move: 3 },
            moves: [
              { id: 'dR', to: [78, 53], start: 0, end: 0.45, ease: 'out' },
              { id: 'A3', to: [72, 40], start: 0.1, end: 0.85 },
            ],
            passes: [{ to: 'A3', start: 0.4, end: 0.85 }],
          },
          {
            title: 'POWER, ON TARGET',
            text: ['First time with *power*.', 'Make the keeper *work*: on target.', 'Team-mate *follows up*.'],
            tags: { A3: 'POWER', A4: 'FOLLOW UP' }, timing: { move: 2.4 },
            shot: [102, 34],
            ball: { to: [102, 34], start: 0.05, end: 0.3 },
            moves: [
              { id: 'kR', to: [97.5, 40], start: 0.05, end: 0.3, arrow: false },
              { id: 'A4', to: [87, 47], start: 0.3, end: 0.9 },
            ],
          },
          {
            title: 'BACK LEFT: CALL "TWO"',
            text: ['Coach calls *"two!"*', 'Team-mate runs in: the defender *follows him*.', 'Other end *recovers*.'],
            tags: { A1: 'DECOY', A3: 'RECOVER', A4: 'RECOVER' }, timing: { move: 3.2 },
            ball: { give: 'L2' },
            moves: [
              { id: 'A1', to: [24, 30], start: 0, end: 0.6 },
              { id: 'dL', to: [18, 35], start: 0.2, end: 0.75, arrow: false },
              { id: 'A3', to: [52, 28], start: 0.1, end: 0.95 },
              { id: 'A4', to: [53, 58], start: 0.1, end: 0.95 },
              { id: 'dR', to: [85, 37], start: 0.2, end: 0.8, arrow: false },
              { id: 'kR', to: [97.5, 37.5], start: 0.2, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'A2', start: 0.4, end: 0.8 }],
          },
          {
            title: 'HE FOLLOWS: SHOOT YOURSELF',
            text: ['Defender went with your team-mate.', 'Space in front: *touch and shoot*.', 'Different every time: *play what you see*.'],
            tags: { A2: 'TWO TOUCH' }, timing: { move: 2.6 },
            shot: [-2, 41],
            ball: { to: [-2, 41], start: 0.4, end: 0.62 },
            moves: [
              { id: 'A2', to: [42, 45], start: 0, end: 0.35 },
              { id: 'kL', to: [2.5, 35], start: 0.4, end: 0.64, arrow: false },
            ],
          },
        ],
        summary: ['*Play what you see*: the defender decides.', 'He commits: *quick pass*. Mate arriving: *soft cushion*.', 'He follows your mate: *touch and shoot*.', 'Play at the other end? *Recover* to the neutral zone.'],
      }),

      // ---------------- 3: game ----------------
      Object.assign({}, common, {
        id: 'floaters-game',
        video: 'videos/close-range-finishing-3.mp4',
        kicker: 'Clip 3 · Game',
        title: '4 v 4 + Floaters',
        tagline: 'Floaters out wide: quick, then feed it in.',
        intro: ['*4 v 4* plus keepers.', 'A *floater* in a *wide channel* each side, *unopposed*.', '*2 or 3 touches*, then feed it in for a run.'],
        keyPhrase: { big: 'QUICK, THEN FEED IT IN', small: 'Time the run to meet it' },
        areas: [
          { x: 0, y: 1, w: 100, h: 11, fill: 'rgba(212,160,23,0.12)' },
          { x: 0, y: 63, w: 100, h: 11, fill: 'rgba(212,160,23,0.12)' },
        ],
        facing: { a: 'right', d: 'left', f: 1, g: -1, k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: S }],
        players: keepers.concat([
          { id: 'G1', team: 'a', x: 26, y: 22 }, { id: 'G2', team: 'a', x: 32, y: 50 },
          { id: 'G3', team: 'a', x: 52, y: 30 }, { id: 'G4', team: 'a', x: 60, y: 50 },
          { id: 'B1', team: 'd', x: 42, y: 28 }, { id: 'B2', team: 'd', x: 44, y: 44 },
          { id: 'B3', team: 'd', x: 68, y: 26 }, { id: 'B4', team: 'd', x: 74, y: 42 },
          { id: 'F1', team: 'f', label: 'F', x: 50, y: 6.5 }, { id: 'F2', team: 'g', label: 'F', x: 50, y: 68.5 },
        ]),
        ball: { owner: 'G2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* plus keepers.', 'A *floater* in a *wide channel* each side, *unopposed*.', 'They play for the team with the ball: *quickly*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
            halves: [
              { x: 0, y: 1, w: 100, h: 11, color: S, label: 'WIDE CHANNEL', labelAt: [25, 6.5], soft: true },
              { x: 0, y: 63, w: 100, h: 11, color: S, label: 'WIDE CHANNEL', labelAt: [25, 68.5], soft: true },
            ],
          },
          {
            title: 'OUT WIDE',
            text: ['Play it *out wide* to a floater.', 'Floaters: *unopposed*, but play *quickly*.'],
            tags: { F2: 'FLOATER' }, timing: { move: 2.8 },
            moves: [{ id: 'F2', to: [62, 68.5], start: 0, end: 0.45 }],
            passes: [{ to: 'F2', start: 0.4, end: 0.78 }],
          },
          {
            title: 'TOUCH, THEN FEED IT IN',
            text: ['*Two or three touches*, then *feed it back in*.', 'Striker: *time your run* to meet it.'],
            tags: { F2: 'QUICK PASS', G4: 'TIME IT' }, timing: { move: 3.2 },
            moves: [
              { id: 'F2', to: [68, 68.5], start: 0, end: 0.3 },
              { id: 'G4', path: [[64, 46], [79, 55]], start: 0.15, end: 0.8 },
              { id: 'B4', to: [70, 47], start: 0.5, end: 1, arrow: false },
            ],
            passes: [{ to: 'G4', start: 0.52, end: 0.8 }],
          },
          {
            title: 'FIRST TIME, PLACED',
            text: ['*Head up*: keeper covers the near post.', 'First time, *placed* far post.'],
            tags: { G4: 'FIRST TIME' }, timing: { move: 2 },
            shot: [102, 33],
            ball: { to: [102, 33], start: 0.05, end: 0.36 },
            moves: [{ id: 'kR', to: [97.5, 41], start: 0.05, end: 0.36, arrow: false }],
          },
          {
            title: 'BLUES: OUT TO THE FLOATER',
            text: ['Blues restart: out to the *other floater*.', 'Striker: *wait*, then time your run.'],
            tags: { F1: 'FLOATER', B1: 'WAIT' }, timing: { move: 3.2 },
            ball: { give: 'kR' },
            moves: [
              { id: 'F1', to: [44, 6.5], start: 0.2, end: 0.6 },
              { id: 'B1', to: [43, 36], start: 0.3, end: 0.8 },
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.2, arrow: false },
            ],
            passes: [{ to: 'B3', start: 0.05, end: 0.35 }, { to: 'F1', start: 0.5, end: 0.82 }],
          },
          {
            title: 'TWO TOUCH, FEED IT IN',
            text: ['Floater: a touch, then a *soft*, floated serve.', 'Mix up the *angle* and *speed*.', 'Striker *times the run* to meet it.'],
            tags: { F1: 'FLOATED', B1: 'TIME IT' }, timing: { move: 3.4 },
            moves: [
              { id: 'F1', to: [38, 6.5], start: 0, end: 0.28 },
              { id: 'B1', to: [26, 37], start: 0.2, end: 0.78 },
              { id: 'G1', to: [31, 28], start: 0.45, end: 1, arrow: false },
            ],
            passes: [{ to: 'B1', start: 0.38, end: 0.82, loft: 'float' }],
          },
          {
            title: 'TWO TOUCH: POWER',
            text: ['Touch it *out of your feet*, towards goal.', 'Then *power*, on target.', 'Team-mate *follows up*.'],
            tags: { B1: 'POWER', B2: 'FOLLOW UP' }, timing: { move: 2.8 },
            shot: [-2, 41],
            ball: { to: [-2, 41], start: 0.38, end: 0.58 },
            moves: [
              { id: 'B1', to: [21, 38], start: 0, end: 0.33 },
              { id: 'kL', to: [2.5, 34], start: 0.38, end: 0.6, arrow: false },
              { id: 'B2', to: [16, 48], start: 0.35, end: 0.95 },
            ],
          },
        ],
        summary: ['Floaters: *unopposed*, but *quick*: 2 or 3 touches.', 'Feed it back in, *timed* with a run.', '*Mix up* the serve: angle and speed.', '*Move* to make space, then *finish*.'],
      }),
    ],
  });
})();
