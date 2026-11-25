/*
 * SESSION: Long Range Passing (Attacking · technical) (DRAFT)
 * From the owner's own plan "Long range passing" (1st4sport L2 session sheet).
 *
 * Key factors: make a decision (first time long pass / control and long pass / short pass to a team-mate);
 *   correct technique; move to get in line of the ball, control with the correct surface; support and communication.
 * 1. Tech (10 mins): 40 x 30 yds, a 10 yd end zone at each end. Two players in each end zone, two in the middle.
 *    A middle player passes into an end zone. The receiver passes short to a team-mate or long to the other end zone.
 *    The other middle player supports the receiver. Repeat.
 * 2. Skill (10 mins): same set-up, but the middle player who passes in then defends (2 v 1). Players look at where the
 *    defender is before deciding how, and if, to pass long.
 * 3. Game (20 mins): 45 x 30 yds. 4 v 4, anyone can go anywhere (end zones too). 2 target players in each end zone play
 *    for the team with the ball and can't make long passes. A long pass into the end zone furthest away = a goal.
 * Owner's extra points: support and communication; decision making; touch and pass or first time.
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
  const sixPlayers = [
    { id: 'L1', team: 'a', x: 20, y: 20 }, { id: 'L2', team: 'a', x: 20, y: 55 },
    { id: 'R1', team: 'a', x: 80, y: 20 }, { id: 'R2', team: 'a', x: 80, y: 55 },
    { id: 'M1', team: 'a', x: 42, y: 52 }, { id: 'M2', team: 'a', x: 57, y: 40 },
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
    subtitle: 'First time, touch and pass, or short?',
    type: 'Technical',
    category: 'attacking',
    topics: ['Passing', 'Switching play'],
    squad: [6, 12],
    thumb: 'assets/thumbs/long-range-passing.jpg',
    summary: 'Pass long from end zone to end zone, then with a defender (2 v 1), then a 4 v 4 game with target players. Decide: first time, touch and pass, or short. Support and talk.',
    keyPhrase: 'Long, touch or short?',
    ages: { from: 14 },

    cards: [
      {
        title: 'Make a decision',
        lead: 'Know your pass *before* the ball arrives.',
        columns: [
          { heading: 'Three choices', items: ['*First time* long pass', '*Touch and pass*: control, then long', '*Short pass* to a team-mate'] },
          { heading: 'How to choose', items: ['*Head up*: where is the defender?', 'Long pass on? *Go first time* if you can', 'Blocked? *Short*, then long'] },
        ],
        phrase: { big: 'LONG, TOUCH OR SHORT?', small: 'Decide before it arrives' },
      },
      {
        title: 'Technique and support',
        lead: 'Get in line, good first touch, then *strike it well*.',
        columns: [
          { heading: 'On the ball', items: ['*Move* to get *in line* of the ball', 'Control with the *right surface*', 'First touch *out of your feet*', 'Strike through the ball, follow through'] },
          { heading: 'Off the ball', items: ['*Support* the receiver: be the short option', '*Talk*: call "time", "man on", "short"', 'Get in line *before* the pass comes'] },
        ],
        phrase: { big: 'SUPPORT AND TALK', small: 'Help the player on the ball decide' },
      },
    ],

    keywords: [
      { word: 'Long pass', meaning: 'A pass over a long distance, here from one end zone to the other.' },
      { word: 'First time', meaning: 'Passing the ball with your first touch, without controlling it.' },
      { word: 'Touch and pass', meaning: 'One touch to control it out of your feet, then the pass.' },
      { word: 'In line', meaning: 'Moving so the ball comes straight to you, with no defender in the way.' },
      { word: 'Support', meaning: 'Moving close to the player on the ball so they have a short pass.' },
      { word: 'End zone', meaning: 'The area at each end of the pitch. Get the ball into the far one.' },
      { word: 'Target player', meaning: 'A player in an end zone who plays for the team with the ball. They can only pass short.' },
    ],

    training: {
      area: 'Drills: 40 × 30 yards with a 10 yard end zone at each end. Game: 45 × 30 yards with an end zone at each end.',
      players: 'Drills: 6 (two in each end zone, two in the middle). Game: 4 v 4 plus 4 target players (12).',
      equipment: 'Cones, balls, bibs (three colours).',
      setup: [
        'Tech (10 minutes): two players in each end zone, two in the middle. A middle player starts by passing into an end zone.',
        'The receiver decides: pass long to the other end zone (first time, or touch and pass), or pass short to a team-mate.',
        'The other middle player supports the receiver. Repeat.',
        'Skill (10 minutes): same set-up, but the middle player who passes in now defends: 2 v 1.',
        'Look at where the defender is before deciding how, and if, to pass to the other end zone.',
        'Game (20 minutes): 4 v 4 in a 45 × 30 yard area. Anyone can go anywhere, end zones too.',
        'Two target players in each end zone play for the team with the ball. Target players can\'t make long passes.',
        'A goal is a long pass into the end zone furthest away. Take every chance to pass long.',
      ],
    },

    questions: [
      'When did you decide which pass to play?',
      'When could you go first time? When did you need a touch?',
      'Where was the defender when you went short?',
      'Where did you move to get in line of the ball?',
      'How did you help the player on the ball? What did you say?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, drill, {
        id: 'end-to-end',
        video: 'videos/long-range-passing-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'End to End',
        tagline: 'Pass into an end zone. Receiver decides: long or short?',
        intro: ['*Two players* in each end zone, *two* in the middle.', 'A middle player *passes in*.', 'Receiver: *long* to the other end zone, or *short*.'],
        keyPhrase: { big: 'LONG, TOUCH OR SHORT?', small: 'Decide before it arrives' },
        legend: { a: 'Players' },
        players: sixPlayers,
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
            title: 'TOUCH AND PASS LONG',
            text: ['First touch *out of your feet*.', 'Then the *long pass* to the other end zone.', 'Other middle player: *support* the receiver.'],
            tags: { L1: 'TOUCH AND PASS', M2: 'SUPPORT' }, timing: { move: 3.4 },
            moves: [
              { id: 'L1', to: [26, 26], start: 0, end: 0.25 },
              { id: 'R1', to: [79, 23], start: 0.1, end: 0.45 },
              { id: 'M2', to: [67, 34], start: 0.4, end: 0.95 },
            ],
            passes: [{ to: 'R1', start: 0.3, end: 0.8 }],
          },
          {
            title: 'OR SHORT TO A TEAM-MATE',
            text: ['Not on? Play it *short*.', 'Team-mate: *move* and *talk*.', 'Call for it: "short!"'],
            tags: { R1: 'SHORT PASS', R2: 'TALK' }, timing: { move: 3 },
            moves: [{ id: 'R2', to: [79, 42], start: 0, end: 0.4 }],
            passes: [{ to: 'R2', start: 0.45, end: 0.8 }],
          },
          {
            title: 'FIRST TIME LONG',
            text: ['Know it *before* it arrives?', 'Go *first time*: quicker.', 'Other middle player: *support* again.'],
            tags: { R2: 'FIRST TIME', L2: 'IN LINE', M1: 'SUPPORT' }, timing: { move: 3.2 },
            moves: [
              { id: 'L2', to: [22, 46], start: 0, end: 0.35 },
              { id: 'M1', to: [34, 58], start: 0.4, end: 0.95 },
            ],
            passes: [{ to: 'L2', start: 0.1, end: 0.6 }],
          },
        ],
        summary: ['*Move* to get *in line* of the ball.', 'Decide: *first time*, *touch and pass*, or *short*.', 'Other middle player: *support* the receiver.', '*Talk*: help the player on the ball.'],
      }),

      // ---------------- 2: skill (2 v 1) ----------------
      Object.assign({}, drill, {
        id: 'two-v-one',
        video: 'videos/long-range-passing-2.mp4',
        kicker: 'Clip 2 · Skill: 2 v 1',
        title: 'Pass In, Then Press',
        tagline: 'Middle player now defends. Where is the defender?',
        intro: ['Same set-up.', 'The middle player *passes in*, then *defends*: *2 v 1*.', 'Where is the defender? *Long*, or *short* first?'],
        keyPhrase: { big: 'WHERE IS THE DEFENDER?', small: 'Blocked: short. Space: long' },
        legend: { a: 'Players', d: 'Defender' },
        players: sixPlayers,
        ball: { owner: 'M1' },
        steps: [
          {
            title: 'NOW A DEFENDER',
            text: ['Same set-up as before.', 'Middle player *passes in*...', '...then *defends* that end zone: *2 v 1*.'],
            halves: zoneLabels,
          },
          {
            title: 'PASS IN, THEN PRESS',
            text: ['Pass into the end zone.', 'Then *press* the receiver.', 'Receiver: *head up*, where is he?'],
            tags: { M1: 'PRESS' }, timing: { move: 3 },
            team: { M1: 'd' },
            moves: [
              { id: 'L1', to: [23, 25], start: 0, end: 0.35 },
              { id: 'M1', to: [31, 25], start: 0.35, end: 0.95, ease: 'out' },
            ],
            passes: [{ to: 'L1', start: 0.05, end: 0.45 }],
          },
          {
            title: 'BLOCKED? GO SHORT',
            text: ['Defender blocks the long pass.', '*Don\'t force it*: play *short*.', 'Team-mate: *move* and *talk*.'],
            tags: { L1: 'SHORT PASS', L2: 'TALK' }, timing: { move: 3 },
            lanes: [{ from: 'L1', to: 'R1', blocked: true }],
            moves: [
              { id: 'L2', to: [21, 42], start: 0, end: 0.4 },
              { id: 'M1', to: [28, 33], start: 0.6, end: 1, arrow: false },
            ],
            passes: [{ to: 'L2', start: 0.45, end: 0.8 }],
          },
          {
            title: 'SPACE? TOUCH AND PASS LONG',
            text: ['Now the long pass is *on*.', 'Touch *away from the defender*...', '...and *pass long* to the other end zone.'],
            tags: { L2: 'TOUCH AND PASS', R2: 'IN LINE' }, timing: { move: 3.4 },
            moves: [
              { id: 'L2', to: [23, 47], start: 0, end: 0.25 },
              { id: 'R2', to: [79, 50], start: 0, end: 0.35 },
              { id: 'M1', to: [31, 37], start: 0.3, end: 0.8, arrow: false },
            ],
            passes: [{ to: 'R2', start: 0.3, end: 0.8 }],
          },
          {
            title: 'PRESSURE COMING? FIRST TIME',
            text: ['Next defender *presses*.', 'Go *first time*, before he gets there.', 'First defender goes back to the middle.'],
            tags: { M2: 'PRESS', R2: 'FIRST TIME' }, timing: { move: 3.2 },
            team: { M2: 'd', M1: 'a' },
            moves: [
              { id: 'M2', to: [71, 42], start: 0, end: 0.6, ease: 'out' },
              { id: 'L2', to: [22, 51], start: 0, end: 0.3 },
              { id: 'M1', to: [45, 30], start: 0.4, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'L2', start: 0.12, end: 0.6 }],
          },
        ],
        summary: ['*Head up*: where is the defender?', 'Blocked? *Short*, then long.', 'Space? *Touch and pass* long.', 'Pressure coming? *First time*.'],
      }),

      // ---------------- 3: game ----------------
      Object.assign({}, game, {
        id: 'target-game',
        video: 'videos/long-range-passing-3.mp4',
        kicker: 'Clip 3 · Game',
        title: '4 v 4 + Targets',
        tagline: 'A long pass into the far end zone is a goal.',
        intro: ['*4 v 4*, anyone can go anywhere.', '*2 targets* in each end zone help the team with the ball.', 'Goal = a *long pass* into the *far* end zone.'],
        keyPhrase: { big: 'LOOK LONG', small: 'Every chance to pass long' },
        players: [
          { id: 'T1', team: 't', x: 16, y: 20 }, { id: 'T2', team: 't', x: 16, y: 55 },
          { id: 'T3', team: 't', x: 84, y: 20 }, { id: 'T4', team: 't', x: 84, y: 55 },
          { id: 'G1', team: 'a', x: 36, y: 24 }, { id: 'G2', team: 'a', x: 38, y: 52 },
          { id: 'G3', team: 'a', x: 58, y: 28 }, { id: 'G4', team: 'a', x: 62, y: 60 },
          { id: 'B1', team: 'd', x: 46, y: 22 }, { id: 'B2', team: 'd', x: 46, y: 42 },
          { id: 'B3', team: 'd', x: 58, y: 40 }, { id: 'B4', team: 'd', x: 68, y: 30 },
        ],
        ball: { owner: 'G1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* in 45 × 30 yards.', '*2 targets* in each end zone play for the team *with the ball*.', 'Targets *can\'t* make long passes.'],
            tags: { T1: 'TARGET', T2: 'TARGET', T3: 'TARGET', T4: 'TARGET' },
          },
          {
            title: 'USE THE TARGET',
            text: ['Play into a *target*.', 'Targets play *short*: *support* them.', '*Talk*: call for it.'],
            tags: { T1: 'TARGET', G2: 'SUPPORT' }, timing: { move: 3.2 },
            moves: [
              { id: 'G2', to: [29, 44], start: 0.1, end: 0.55 },
              { id: 'B1', to: [36, 31], start: 0.3, end: 0.9, arrow: false },
              { id: 'B2', to: [40, 40], start: 0.5, end: 1, arrow: false },
            ],
            passes: [{ to: 'T1', start: 0.02, end: 0.38 }, { to: 'G2', start: 0.58, end: 0.9 }],
          },
          {
            title: 'HEAD UP: LONG IS ON',
            text: ['*Head up*: is the long pass on?', '*Touch and pass*, or *first time*.', 'Into the *far end zone* = a *goal*.'],
            tags: { G2: 'LONG PASS', T4: 'SCORE' }, timing: { move: 3.4 },
            moves: [
              { id: 'G2', to: [30, 47], start: 0, end: 0.25 },
              { id: 'T4', to: [84, 53], start: 0.1, end: 0.4, arrow: false },
              { id: 'B2', to: [38, 43], start: 0.2, end: 0.7, arrow: false },
            ],
            passes: [{ to: 'T4', start: 0.3, end: 0.85 }],
          },
          {
            title: 'KEEP IT: GO AGAIN',
            text: ['Greens keep the ball.', 'Target plays *short* to a team-mate.', 'Now look for the *other* end zone.'],
            tags: { T4: 'TARGET', G4: 'SUPPORT' }, timing: { move: 3 },
            moves: [
              { id: 'G4', to: [70, 58], start: 0, end: 0.4 },
              { id: 'B4', to: [70, 48], start: 0.3, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'G4', start: 0.42, end: 0.8 }],
          },
          {
            title: 'BLUES WIN IT',
            text: ['A pass gets cut out: *blues win it*.', 'Now the targets play for *blues*.'],
            tags: { B3: 'WON IT!' }, timing: { move: 2.4 },
            moves: [{ id: 'B3', to: [63, 46], start: 0, end: 0.5, ease: 'out' }],
            ball: { pass: 'B3', start: 0.2, end: 0.55 },
          },
          {
            title: 'SUPPORT, THEN FIRST TIME',
            text: ['Blue *supports* and *calls* for it...', '...then goes *first time* long.', 'Far end zone: *goal*.'],
            tags: { B4: 'FIRST TIME', T2: 'SCORE' }, timing: { move: 3.4 },
            moves: [
              { id: 'B4', to: [72, 44], start: 0, end: 0.3 },
              { id: 'G4', to: [68, 52], start: 0.3, end: 0.9, arrow: false },
            ],
            passes: [{ to: 'B4', start: 0.3, end: 0.5 }, { to: 'T2', start: 0.55, end: 0.95 }],
          },
        ],
        summary: ['*4 v 4*: targets help the team *with the ball*.', 'Goal = a *long pass* into the *far* end zone.', '*Head up*: take every chance to go long.', '*Support* and *talk*.'],
      }),
    ],
  });
})();
