/*
 * SESSION: Long Range Passing (Attacking · technical) (DRAFT)
 * From the owner's own plan "Long range passing" (1st4sport L2 session sheet).
 *
 * Key factors: make a decision (first time long pass / control and long pass / short pass to a team-mate);
 *   correct technique; move to get in line of the ball, control with the correct surface; support and communication.
 * 1. Tech (10 mins): 40 x 30 yds, a 10 yd end zone at each end. Two players in each end zone, two in the middle.
 *    A middle player passes into an end zone. The receiver passes long to the other end zone, or short to the supporting
 *    middle player, who bounces it straight back or sets it for the other player in that end zone, who then goes long.
 *    After a long pass, the other middle player joins in as the support option. Repeat.
 * 2. Skill (10 mins): same set-up, but the two middle players are now defenders. The first pass starts it; one presses,
 *    the other (deeper) blocks the long passing lane. After a long pass the closer defender presses and the other
 *    blocks the lane: each defender presses one end.
 * 3. Game (20 mins): 45 x 30 yds. 4 v 4, anyone can go anywhere (end zones too). 2 target players in each end zone play
 *    for the team with the ball. Owner's change: the middle players play short; the TARGETS play the long pass. A target's
 *    long pass into the end zone furthest away = a goal (like a defender playing long to the striker).
 *    Support with space, not all close to the ball: one drops short, two wider and a little higher, one gives height
 *    (in the middle, furthest from the target with the ball, not in the other end zone: the mid-length pass).
 *    Win it: feed your own target, then support the long pass. Rotate the targets so everyone practises long passes.
 * Owner's extra points: support and communication; decision making; touch and pass or first time;
 *   mix up the long pass: drilled along the ground, floated, chipped.
 * Pitch units: x 0..100, y 0..75 (about 2 units a yard).
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', T = '#d4a017', OR = '#d9622b';
  const zoneFill = 'rgba(217,98,43,0.10)', midFill = 'rgba(22,53,31,0.04)';

  // ---------- tech / skill: 40 x 30 yds, 10 yd end zones ----------
  const drill = {
    plain: true, goals: [],
    areas: [
      { x: 10, y: 7.5, w: 20, h: 60, fill: zoneFill },
      { x: 30, y: 7.5, w: 40, h: 60, fill: midFill },
      { x: 70, y: 7.5, w: 20, h: 60, fill: zoneFill },
    ],
    dims: [
      { a: [10, 3], b: [90, 3], label: '40 yds' },
      { a: [5, 7.5], b: [5, 67.5], label: '30 yds' },
      { a: [70, 71.5], b: [90, 71.5], label: '10 yds' },
    ],
    tagPlace: 'auto',
  };
  const zoneLabels = [
    { x: 10, y: 7.5, w: 20, h: 60, color: OR, label: 'END ZONE', labelAt: [20, 64], soft: true },
    { x: 70, y: 7.5, w: 20, h: 60, color: OR, label: 'END ZONE', labelAt: [80, 64], soft: true },
  ];
  const endPlayers = [
    { id: 'L1', team: 'a', x: 20, y: 20 }, { id: 'L2', team: 'a', x: 20, y: 55 },
    { id: 'R1', team: 'a', x: 80, y: 20 }, { id: 'R2', team: 'a', x: 80, y: 55 },
  ];

  // ---------- game: 45 x 30 yds ----------
  const A = { x: 7, y: 9, w: 86, h: 57 };
  const game = {
    plain: true, goals: [],
    areas: [
      { x: A.x, y: A.y, w: 19, h: A.h, fill: zoneFill },
      { x: 26, y: A.y, w: 48, h: A.h, fill: midFill },
      { x: 74, y: A.y, w: 19, h: A.h, fill: zoneFill },
    ],
    dims: [{ a: [A.x, 4], b: [A.x + A.w, 4], label: '45 yds' }, { a: [3, A.y], b: [3, A.y + A.h], label: '30 yds' }],
    teamColors: { t: T },
    legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Targets', color: T }],
    tagPlace: 'auto',
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'long-range-passing',
    draft: true,
    title: 'Long Range Passing',
    subtitle: 'Drilled, floated or chipped: play it when it\'s on',
    type: 'Technical',
    category: 'attacking',
    topics: ['Passing', 'Switching play'],
    squad: [6, 12],
    thumb: 'assets/thumbs/long-range-passing.jpg',
    summary: 'Pass long from end zone to end zone, then against two defenders, then a 4 v 4 game with target players. Mix up the long pass (drilled, floated, chipped), decide when it\'s on, and get up to support.',
    keyPhrase: 'Long, touch or short?',
    ages: { from: 14 },

    cards: [
      {
        title: 'Make a decision',
        lead: 'Know your pass *before* the ball arrives. Play it *when it\'s on*.',
        columns: [
          { heading: 'Three choices', items: ['*First time* long pass', '*Touch and pass*: control, then long', '*Short* to a supporting team-mate'] },
          { heading: 'Mix up the long pass', items: ['*Drilled*: firm, along the ground', '*Floated*: up and over, lands soft', '*Chipped*: over a defender in the lane'] },
        ],
        phrase: { big: 'LONG, TOUCH OR SHORT?', small: 'Decide before it arrives' },
      },
      {
        title: 'Technique and support',
        lead: 'Get in line, good first touch, then *strike it well*.',
        columns: [
          { heading: 'On the ball', items: ['*Move* to get *in line* of the ball', 'Control with the *right surface*', 'First touch *out of your feet*', 'Strike through the ball, follow through'] },
          { heading: 'Off the ball', items: ['After a long pass, *get up and support*', 'Support *with space*: one short, two wide, one for height', 'Be the short option: *bounce it back* or *set it*', '*Talk*: call "time", "man on", "short"'] },
        ],
        phrase: { big: 'SUPPORT AND TALK', small: 'Join in after the long pass' },
      },
    ],

    keywords: [
      { word: 'Long pass', meaning: 'A pass over a long distance, here from one end zone to the other.' },
      { word: 'Drilled', meaning: 'A firm, fast long pass along the ground.' },
      { word: 'Floated', meaning: 'A long pass up in the air that drops softly for the receiver.' },
      { word: 'Chipped', meaning: 'A pass lifted quickly up and over a defender who is blocking the way.' },
      { word: 'First time', meaning: 'Passing the ball with your first touch, without controlling it.' },
      { word: 'Touch and pass', meaning: 'One touch to control it out of your feet, then the pass.' },
      { word: 'Support', meaning: 'Moving close to the player on the ball so they have a short pass.' },
      { word: 'Passing lane', meaning: 'The line the ball travels along. A defender standing in it blocks the pass.' },
      { word: 'Target player', meaning: 'A player in an end zone who plays for the team with the ball. Targets play the long pass.' },
      { word: 'Height', meaning: 'The supporting player furthest from the ball, still in the middle: the mid-length pass.' },
    ],

    training: {
      area: 'Drills: 40 × 30 yards with a 10 yard end zone at each end. Game: 45 × 30 yards with an end zone at each end.',
      players: 'Drills: 6 (two in each end zone, two in the middle). Game: 4 v 4 plus 4 target players (12).',
      equipment: 'Cones, balls, bibs (three colours).',
      setup: [
        'Tech (10 minutes): two players in each end zone, two in the middle. A middle player starts by passing into an end zone.',
        'The receiver decides: pass long to the other end zone (first time, or touch and pass), or short to the supporting middle player.',
        'The support player bounces it straight back, or sets it for the other player in that end zone, who then goes long.',
        'After each long pass, the other middle player joins in as the support option. Mix up the long pass: drilled, floated, chipped.',
        'Skill (10 minutes): same set-up, but the two middle players are now defenders. The first pass starts it.',
        'One defender presses, the other (deeper) blocks the long passing lane. After a long pass the closer defender presses and the other blocks the lane: each presses one end.',
        'Look at where the defenders are: go short, chip it over the lane blocker, or drill it through an open lane.',
        'Game (20 minutes): 4 v 4 in a 45 × 30 yard area. Anyone can go anywhere, end zones too.',
        'Two target players in each end zone play for the team with the ball. Middle players play short through the middle into a target; the target plays the long pass.',
        'A goal is a target\'s long pass into the end zone furthest away (targets only). Then support with space: one short, two wide and a little higher, and one giving height: in the middle, furthest from the ball, for a mid-length pass.',
        'Win it? Now you feed your targets, and support the long pass when it\'s played.',
        'Every few minutes, rotate the targets: middle players go into the end zones, so everyone practises the long pass.',
      ],
    },

    questions: [
      'When did you decide which pass to play?',
      'When did you drill it, float it or chip it? Why?',
      'Where were the defenders when you went short?',
      'After a long pass, where did you go to support? Were we too close together?',
      'How did you help the player on the ball? What did you say?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, drill, {
        id: 'end-to-end',
        video: 'videos/long-range-passing-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'End to End',
        tagline: 'Long, or short to the support player? Then join in.',
        intro: ['*Two players* in each end zone, *two* in the middle.', 'Receiver: *long* to the other end zone, or *short* to the support.', 'After a long pass, the middle player *joins in*.'],
        keyPhrase: { big: 'LONG, TOUCH OR SHORT?', small: 'Decide before it arrives' },
        legend: { a: 'Players' },
        players: endPlayers.concat({ id: 'M1', team: 'a', x: 42, y: 52 }, { id: 'M2', team: 'a', x: 57, y: 40 }),
        ball: { owner: 'M1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['40 × 30 yards, an *end zone* at each end.', 'Two players in each end zone.', 'Two in the *middle*.'],
            halves: zoneLabels,
          },
          {
            title: 'MIDDLE PLAYER STARTS',
            text: ['Middle player *passes into an end zone*.', 'Receiver: *move* to get *in line* of the ball.', '*Head up*: what\'s on?'],
            tags: { L1: 'IN LINE' }, timing: { move: 2.8 },
            moves: [{ id: 'L1', to: [23, 25], start: 0, end: 0.45 }],
            passes: [{ to: 'L1', start: 0.3, end: 0.85 }],
          },
          {
            title: 'TOUCH, THEN DRILL IT',
            text: ['First touch *out of your feet*.', '*Drilled*: firm, along the ground.', 'Other middle player: *join in*, *support*.'],
            tags: { L1: 'DRILLED', M2: 'SUPPORT' }, timing: { move: 3.2 },
            moves: [
              { id: 'L1', to: [26, 26], start: 0, end: 0.25 },
              { id: 'R1', to: [79, 23], start: 0.1, end: 0.4 },
              { id: 'M2', to: [67, 34], start: 0.35, end: 0.9 },
            ],
            passes: [{ to: 'R1', start: 0.3, end: 0.68 }],
          },
          {
            title: 'SUPPORT: BOUNCE IT BACK',
            text: ['Support player is the *short option*.', '*Bounces it straight back*...', '...to the *same player*.'],
            tags: { M2: 'BOUNCE', R1: 'ONE-TWO' }, timing: { move: 3 },
            moves: [{ id: 'R1', to: [78, 27], start: 0.3, end: 0.6 }],
            passes: [{ to: 'M2', start: 0.05, end: 0.35 }, { to: 'R1', start: 0.45, end: 0.75 }],
          },
          {
            title: 'NOW FLOAT IT',
            text: ['*Floated*: up and over...', '...dropping *soft* for the receiver.', 'Other middle player *joins in* to support.'],
            tags: { R1: 'FLOATED', M1: 'SUPPORT' }, timing: { move: 3.6 },
            moves: [
              { id: 'L2', to: [22, 48], start: 0, end: 0.3 },
              { id: 'M2', to: [56, 38], start: 0.3, end: 0.9, arrow: false },
              { id: 'M1', to: [32, 58], start: 0.45, end: 0.95 },
            ],
            passes: [{ to: 'L2', start: 0.15, end: 0.7, loft: 'float' }],
          },
          {
            title: 'OR SET IT FOR THE OTHER ONE',
            text: ['Short to the *support*...', '...who *sets it* for the *other player* in the end zone.', '*Talk*: call for it.'],
            tags: { M1: 'SUPPORT', L1: 'TALK' }, timing: { move: 3.2 },
            moves: [{ id: 'L1', to: [21, 36], start: 0, end: 0.4 }],
            passes: [{ to: 'M1', start: 0.05, end: 0.35 }, { to: 'L1', start: 0.45, end: 0.8 }],
          },
          {
            title: 'FIRST TIME, DRILLED',
            text: ['Ball set up nicely: go *first time*.', '*Drilled* to the other end zone.', 'Middle player: *get across* and *support*.'],
            tags: { L1: 'DRILLED', M2: 'SUPPORT' }, timing: { move: 3.2 },
            moves: [
              { id: 'R2', to: [79, 49], start: 0, end: 0.3 },
              { id: 'M2', to: [67, 40], start: 0.45, end: 0.95 },
            ],
            passes: [{ to: 'R2', start: 0.1, end: 0.5 }],
          },
        ],
        summary: ['*Move* to get *in line* of the ball.', 'Decide: *first time*, *touch and pass*, or *short*.', 'Support: *bounce it back* or *set it* for the other player.', 'Mix it up: *drilled*, *floated*, *chipped*.'],
      }),

      // ---------------- 2: skill (two defenders) ----------------
      Object.assign({}, drill, {
        id: 'press-and-block',
        video: 'videos/long-range-passing-2.mp4',
        kicker: 'Clip 2 · Skill: two defenders',
        title: 'Press and Block',
        tagline: 'One defender presses, one blocks the lane. Play it when it\'s on.',
        intro: ['The two middle players are now *defenders*.', 'One *presses*, the other *blocks the long pass*.', 'Short, *chip it*, or *drill it*: play it *when it\'s on*.'],
        keyPhrase: { big: 'PLAY IT WHEN IT\'S ON', small: 'Where are the defenders?' },
        legend: { a: 'Players', d: 'Defenders' },
        players: endPlayers.concat({ id: 'M1', team: 'd', x: 38, y: 46 }, { id: 'M2', team: 'd', x: 62, y: 32 }),
        ball: { owner: 'M1' },
        steps: [
          {
            title: 'NOW TWO DEFENDERS',
            text: ['The middle players are now *defenders*.', 'Each one *presses one end*.', 'The other *blocks the long pass*.'],
            halves: zoneLabels,
          },
          {
            title: 'FIRST PASS STARTS IT',
            text: ['Defender passes in, then *presses*.', 'The other drops deeper to *block the lane*.'],
            tags: { M1: 'PRESS', M2: 'BLOCK' }, timing: { move: 3 },
            moves: [
              { id: 'L1', to: [23, 25], start: 0, end: 0.35 },
              { id: 'M1', to: [31, 29], start: 0.4, end: 0.95, ease: 'out' },
              { id: 'M2', to: [50, 23], start: 0.35, end: 0.95 },
            ],
            passes: [{ to: 'L1', start: 0.05, end: 0.42 }],
          },
          {
            title: 'BLOCKED: GO SHORT',
            text: ['Long pass *blocked*? Don\'t force it.', 'Play *short* to your team-mate.', 'Team-mate: *move* and *talk*.'],
            tags: { L1: 'SHORT PASS', L2: 'TALK' }, timing: { move: 3.2 },
            lanes: [{ from: 'L1', to: 'R1', blocked: true }],
            moves: [
              { id: 'L2', to: [21, 44], start: 0, end: 0.4 },
              { id: 'M1', to: [30, 33], start: 0.65, end: 1, arrow: false },
              { id: 'M2', to: [50, 45], start: 0.6, end: 1, arrow: false },
            ],
            passes: [{ to: 'L2', start: 0.45, end: 0.78 }],
          },
          {
            title: 'CHIP IT OVER',
            text: ['Lane blocker gets across.', '*Chip it* over him.', 'Receiver: *in line*, *right surface* to control.'],
            tags: { L2: 'CHIPPED', M2: 'BLOCK' }, timing: { move: 3.2 },
            moves: [{ id: 'R2', to: [79, 50], start: 0, end: 0.35 }],
            passes: [{ to: 'R2', start: 0.2, end: 0.75, loft: 'chip' }],
          },
          {
            title: 'SWAP JOBS',
            text: ['Long pass made: *closer defender presses*.', 'The other *blocks the lane*.', 'Team-mate: *support* and *talk*.'],
            tags: { M2: 'PRESS', M1: 'BLOCK', R1: 'SUPPORT' }, timing: { move: 3 },
            moves: [
              { id: 'M2', to: [72, 50], start: 0, end: 0.7, ease: 'out' },
              { id: 'M1', to: [48, 44], start: 0.1, end: 0.9 },
              { id: 'R1', to: [79, 36], start: 0.2, end: 0.8 },
            ],
          },
          {
            title: 'SHORT, THEN FLOAT IT',
            text: ['Pressed: *short* to the support.', 'Low lane blocked: *float it* over the top.', '*Lands soft* for the receiver.'],
            tags: { R1: 'FLOATED' }, timing: { move: 3.6 },
            moves: [
              { id: 'L1', to: [22, 24], start: 0.3, end: 0.6 },
              { id: 'M2', to: [74, 46], start: 0.2, end: 0.7, arrow: false },
            ],
            passes: [{ to: 'R1', start: 0.05, end: 0.3 }, { to: 'L1', start: 0.38, end: 0.92, loft: 'float' }],
          },
          {
            title: 'LANE OPEN? DRILL IT',
            text: ['Left defender *presses* again.', 'Lane open: *first time*, *drilled*.', 'Before the pressure arrives.'],
            tags: { M1: 'PRESS', L1: 'DRILLED' }, timing: { move: 3 },
            moves: [
              { id: 'M1', to: [30, 33], start: 0, end: 0.7, ease: 'out' },
              { id: 'M2', to: [62, 44], start: 0, end: 0.8, arrow: false },
            ],
            passes: [{ to: 'R1', start: 0.15, end: 0.55 }],
          },
        ],
        summary: ['*Head up*: where are the defenders?', 'Blocked? *Short*, then long.', 'Blocker in the lane? *Chip* or *float* it over.', 'Lane open? *Drill it*, first time.'],
      }),

      // ---------------- 3: game ----------------
      Object.assign({}, game, {
        id: 'target-game',
        video: 'videos/long-range-passing-3.mp4',
        kicker: 'Clip 3 · Game',
        title: '4 v 4 + Targets',
        tagline: 'The target goes long. Then support with space.',
        intro: ['*4 v 4* in the middle, anyone can go anywhere.', '*2 targets* in each end zone help the team with the ball.', 'A *target\'s long pass* into the *far* end zone = a *goal*.'],
        keyPhrase: { big: 'SUPPORT WITH SPACE', small: 'One short, two wide, one for height' },
        players: [
          { id: 'T1', team: 't', x: 16, y: 20 }, { id: 'T2', team: 't', x: 16, y: 55 },
          { id: 'T3', team: 't', x: 84, y: 20 }, { id: 'T4', team: 't', x: 84, y: 55 },
          { id: 'G1', team: 'a', x: 48, y: 24 }, { id: 'G2', team: 'a', x: 42, y: 50 },
          { id: 'G3', team: 'a', x: 58, y: 38 }, { id: 'G4', team: 'a', x: 64, y: 56 },
          { id: 'B1', team: 'd', x: 54, y: 30 }, { id: 'B2', team: 'd', x: 48, y: 40 },
          { id: 'B3', team: 'd', x: 64, y: 46 }, { id: 'B4', team: 'd', x: 58, y: 17 },
        ],
        ball: { owner: 'G1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* in 45 × 30 yards.', '*2 targets* in each end zone play for the team *with the ball*.', 'A *target\'s long pass* into the far end zone = a *goal*.'],
            tags: { T1: 'TARGET', T2: 'TARGET', T3: 'TARGET', T4: 'TARGET' },
          },
          {
            title: 'SHORT THROUGH THE MIDDLE',
            text: ['Middle players play *short*...', '...through the middle...', '...into a *target*.'],
            tags: { G2: 'SHORT PASS', T2: 'TARGET' }, timing: { move: 3.4 },
            moves: [
              { id: 'G2', to: [36, 45], start: 0, end: 0.3 },
              { id: 'B2', to: [42, 49], start: 0.35, end: 0.95, arrow: false },
              { id: 'B1', to: [44, 34], start: 0.3, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'G2', start: 0.2, end: 0.45 }, { to: 'T2', start: 0.58, end: 0.88 }],
          },
          {
            title: 'THE TARGET GOES LONG',
            text: ['Like a *defender* playing long to the *striker*.', '*Floated* into the far end zone.', 'That\'s a *goal*.'],
            tags: { T2: 'FLOATED', T3: 'SCORE' }, timing: { move: 3.6 },
            moves: [{ id: 'T3', to: [83, 36], start: 0.05, end: 0.5 }],
            passes: [{ to: 'T3', start: 0.1, end: 0.75, loft: 'float' }],
          },
          {
            title: 'SUPPORT WITH SPACE',
            text: ['*Don\'t all go to the ball*: easy to shut down.', 'One *short*. Two *wide*, a little *higher*.', 'One gives *height*: furthest away, a *mid-length* pass.'],
            tags: { G3: 'SHORT', G1: 'WIDE', G4: 'WIDE', G2: 'HEIGHT' }, timing: { move: 3.8 },
            moves: [
              { id: 'G3', to: [67, 38], start: 0, end: 0.5 },
              { id: 'G1', to: [73, 14], start: 0, end: 0.8 },
              { id: 'G4', to: [73, 61], start: 0, end: 0.7 },
              { id: 'G2', to: [33, 38], start: 0.1, end: 0.6 },
              { id: 'B3', to: [76, 42], start: 0.2, end: 0.9, arrow: false },
              { id: 'B1', to: [62, 28], start: 0.2, end: 0.95, arrow: false },
              { id: 'B2', to: [58, 46], start: 0.2, end: 0.95, arrow: false },
              { id: 'B4', to: [64, 19], start: 0.3, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'HARDER TO SHUT DOWN',
            text: ['Spread out: they *can\'t cover* everyone.', 'Target finds the *free* player.', 'Keep it and *go again*.'],
            tags: { T3: 'TARGET', G4: 'FREE' }, timing: { move: 3 },
            moves: [{ id: 'B2', to: [66, 53], start: 0.4, end: 1, arrow: false }],
            passes: [{ to: 'G4', start: 0.1, end: 0.5 }],
          },
          {
            title: 'BLUES WIN IT',
            text: ['A pass gets cut out: *blues win it*.', 'Now the targets play for *blues*.'],
            tags: { B2: 'WON IT!' }, timing: { move: 2.4 },
            moves: [{ id: 'B2', to: [70, 52], start: 0, end: 0.5, ease: 'out' }],
            ball: { pass: 'B2', start: 0.15, end: 0.5 },
          },
          {
            title: 'SHORT IN, TARGET GOES LONG',
            text: ['Blues play *short* into a target.', 'The *target* goes long: *drilled*.', 'Far end zone: *goal*.'],
            tags: { T4: 'DRILLED', T1: 'SCORE' }, timing: { move: 3.4 },
            moves: [{ id: 'T1', to: [17, 24], start: 0.3, end: 0.6, arrow: false }, { id: 'B2', to: [64, 57], start: 0.3, end: 0.6, arrow: false }],
            passes: [{ to: 'T4', start: 0.05, end: 0.3 }, { to: 'T1', start: 0.42, end: 0.85 }],
          },
          {
            title: 'BLUES SUPPORT WITH SPACE',
            text: ['Now *blues* support the long pass.', 'One *short*, two *wide*, a little *higher*.', 'One gives *height*: the *mid-length* pass.'],
            tags: { B1: 'SHORT', B4: 'WIDE', B2: 'WIDE', B3: 'HEIGHT' }, timing: { move: 3.8 },
            moves: [
              { id: 'B1', to: [35, 27], start: 0, end: 0.6 },
              { id: 'B4', to: [28, 12], start: 0, end: 0.85 },
              { id: 'B2', to: [29, 61], start: 0, end: 0.95 },
              { id: 'B3', to: [62, 50], start: 0.1, end: 0.6 },
            ],
          },
          {
            title: 'ROTATE THE TARGETS',
            text: ['Every few minutes, *swap* the targets.', 'Middle players go into the *end zones*.', 'Everyone practises the *long pass*.'],
            tags: { T1: 'IN', T2: 'IN', T3: 'IN', T4: 'IN' },
          },
        ],
        summary: ['Middle players: *short* through the middle into a target.', 'The *target* goes long into the *far* end zone.', 'Support with *space*: one short, two wide, one for *height*.', '*Rotate* the targets: everyone practises the long pass.'],
      }),
    ],
  });
})();
