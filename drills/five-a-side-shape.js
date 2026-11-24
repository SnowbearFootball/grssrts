/*
 * SESSION: Shape: 5-a-Side (play in your half, U8–U9)
 * From the owner's own plan: in 5-a-side every player has a half of the pitch. Attacker top half, defender bottom half,
 * wingers their own side, keeper the box. Ball wide on one side: the far winger tucks in, but not past the middle.
 * Connected by string: attacker goes high, defender comes up to halfway; one winger goes wide, the other comes in.
 * Keeping our shape (our halves, connected by string) stops us bunching.
 * Our team attacks the top goal. Pitch drawn as an upright 5-a-side pitch inside x 20..80.
 * Pitch units: x 0..100, y 0..75.
 */
(function () {
  const COL = { att: '#2fbf7f', def: '#3b9ae1', lw: '#e0892b', rw: '#9b6fe0', k: '#2b2b2b' };
  const L = 20, R = 80, TOP = -2.2, BOT = 77.2, MID_Y = 37.5, MID_X = 50;
  const GOAL = [50, -2];

  // each player's half
  const HALF = {
    att: { x: L, y: TOP, w: R - L, h: MID_Y - TOP, color: COL.att, label: 'ATTACKER’S HALF', labelAt: [50, 3.5] },
    def: { x: L, y: MID_Y, w: R - L, h: BOT - MID_Y, color: COL.def, label: 'DEFENDER’S HALF', labelAt: [50, 61] },
    lw: { x: L, y: TOP, w: MID_X - L, h: BOT - TOP, color: COL.lw, label: 'LEFT WING’S HALF', labelAt: [35, 3.5] },
    rw: { x: MID_X, y: TOP, w: R - MID_X, h: BOT - TOP, color: COL.rw, label: 'RIGHT WING’S HALF', labelAt: [65, 3.5] },
    gk: { x: 38, y: 66, w: 24, h: BOT - 66, color: COL.k, label: 'KEEPER’S BOX', labelAt: [50, 62.5] },
  };
  const soft = k => Object.assign({}, HALF[k], { soft: true, label: null });
  const allHalves = ['def', 'att', 'lw', 'rw', 'gk'].map(soft);
  const middle = { a: [MID_X, TOP + 0.5], b: [MID_X, BOT - 0.5], label: 'THE MIDDLE', labelAt: [MID_X, 60] };
  const halfway = { a: [L + 0.5, MID_Y], b: [R - 0.5, MID_Y], label: 'HALFWAY', labelAt: [66, MID_Y + 4.5] };

  const BASE = { gk: [50, 70], def: [50, 53], lw: [29, 37.5], rw: [71, 37.5], att: [50, 21] };
  const players = () => [
    { id: 'gk', team: 'k', label: 'GK', x: BASE.gk[0], y: BASE.gk[1] },
    { id: 'def', team: 'def', label: 'DEF', x: BASE.def[0], y: BASE.def[1] },
    { id: 'lw', team: 'lw', label: 'LW', x: BASE.lw[0], y: BASE.lw[1] },
    { id: 'rw', team: 'rw', label: 'RW', x: BASE.rw[0], y: BASE.rw[1] },
    { id: 'att', team: 'att', label: 'ATT', x: BASE.att[0], y: BASE.att[1] },
  ];
  const back = (ids, opts) => ids.map(id => Object.assign({ id, to: BASE[id], end: 0.85 }, opts || {}));

  const common = {
    plain: true,
    // the 5-a-side pitch: touchlines, halfway line and a box at each end
    marks: [
      { x: L, y: TOP, w: R - L, h: BOT - TOP },
      { x: L, y: MID_Y, w: R - L, h: 0 },
      { x: 38, y: TOP, w: 24, h: 8.2 }, { x: 38, y: 66, w: 24, h: BOT - 66 },
    ],
    teamColors: COL,
    tagPlace: 'auto',
    legendTeams: [{ label: 'ATT', color: COL.att }, { label: 'LW', color: COL.lw }, { label: 'RW', color: COL.rw }, { label: 'DEF', color: COL.def }],
    keyPhrase: { big: 'PLAY IN YOUR HALF', small: 'Spread out. Don’t follow the ball.' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'five-a-side-shape',
    title: 'Shape: 5-a-Side',
    subtitle: 'Play in your half',
    type: 'Tactical',
    category: 'defending',
    topics: ['Shape', 'Small-sided games'],
    squad: [5, 10],
    ages: { from: 8, to: 9 },
    thumb: 'assets/thumbs/five-a-side-shape.jpg',
    summary: 'Team shape in 5-a-side. Every player has their own half of the pitch. Stay in it, tuck in when the ball is on the other side, and stay connected by string.',
    keyPhrase: 'Play in your half',

    cards: [
      {
        title: 'Your half',
        lead: 'Every player has *their own half* of the pitch.',
        columns: [
          { heading: 'Who goes where', items: ['Attacker: the *top half*', 'Defender: the *bottom half*', 'Wingers: *their own side*', 'Keeper: the box'] },
          { heading: 'Why', items: ['We stay *spread out*', 'No *bunching*: not too many players in one area', 'There\'s always *someone to pass to*'] },
        ],
        phrase: { big: 'PLAY IN YOUR HALF', small: 'Spread out. Don’t follow the ball.' },
      },
      {
        title: 'Connected by string',
        lead: 'When one player moves, *the others move too*. Keep our shape and we *won\'t bunch*.',
        columns: [
          { heading: 'Up and back', items: ['Attacker goes *high* towards goal...', '...defender comes up to *halfway*'] },
          { heading: 'Side to side', items: ['Ball on one wing: the other winger *tucks in*', 'Close to the middle, but *not past it*', 'One winger goes really wide: the other comes in'] },
        ],
      },
    ],

    keywords: [
      { word: 'Your half', meaning: 'The part of the pitch that is yours. Attacker top, defender bottom, wingers their own side.' },
      { word: 'Tuck in', meaning: 'Move in towards the middle when the ball is on the other side.' },
      { word: 'The middle', meaning: 'The line down the middle of the pitch. Wingers come close to it but don’t cross it.' },
      { word: 'Connected by string', meaning: 'Imagine the team is tied together. One moves, the others get pulled with them.' },
      { word: 'Bunched', meaning: 'Everyone close together around the ball. No space and no one to pass to.' },
    ],

    training: {
      area: 'A 5-a-side pitch, about 30 × 20 yards, with a goal at each end.',
      players: 'A keeper and four outfield players a side: attacker, defender, left wing, right wing.',
      equipment: 'Goals, flat markers, bibs, balls.',
      setup: [
        'Put flat markers across halfway and down the middle so players can see the halves.',
        'Attacker plays in the top half, defender in the bottom half, each winger in their own side half.',
        'Play a normal game. Now and then shout "Freeze!": everyone stops and checks they are in their half.',
        'Ball out on one wing: the other winger tucks in towards the middle, but doesn’t cross it.',
        'Connected by string: when the attacker goes high, the defender comes up to halfway. When one winger goes really wide, the other comes in.',
        'Keeping our shape (sticking to our halves, connected by string) stops us bunching or getting too many players in one area.',
        'Take the markers away once they’ve got it. Keep freezing to check.',
      ],
    },

    questions: [
      'Where is your half?',
      'The ball is on the other wing. Where should you be?',
      'Can you go past the middle line?',
      'The attacker has gone high. Where should the defender be?',
      'If we all chase the ball, who can we pass to?',
    ],

    clips: [
      // ---------------- 1: whose half ----------------
      Object.assign({}, common, {
        id: 'your-half',
        video: 'videos/five-a-side-shape-1.mp4',
        kicker: 'Clip 1 · Play in your half',
        title: 'Your Half',
        tagline: 'Every player has their own half of the pitch.',
        intro: ['5-a-side: a *keeper* and *four* outfield players.', 'Each player has *their own half*.', 'Stay in it and we stay *spread out*.'],
        players: players(),
        ball: { owner: 'gk' },
        steps: [
          {
            title: 'THE SHAPE',
            text: ['Attacker, defender, two wingers and a keeper.', 'We attack the *top goal*.'],
          },
          {
            title: 'ATTACKER',
            text: ['Attacker: the *top half*.', 'Nearest their goal. Move about in it.'],
            halves: [HALF.att], timing: { move: 3.2 },
            moves: [{ id: 'att', path: [[36, 14], [64, 27], [50, 21]], end: 0.95 }],
          },
          {
            title: 'DEFENDER',
            text: ['Defender: the *bottom half*.', 'Between the ball and our goal.'],
            halves: [HALF.def], timing: { move: 3.2 },
            moves: [{ id: 'def', path: [[37, 45], [63, 57], [50, 53]], end: 0.95 }],
          },
          {
            title: 'LEFT WING',
            text: ['Left wing: the *left half*.', 'All the way up and all the way back.'],
            halves: [HALF.lw], timing: { move: 3.4 },
            moves: [{ id: 'lw', path: [[28, 12], [32, 60], [29, 37.5]], end: 0.95 }],
          },
          {
            title: 'RIGHT WING',
            text: ['Right wing: the *right half*.', 'Same again on the other side.'],
            halves: [HALF.rw], timing: { move: 3.4 },
            moves: [{ id: 'rw', path: [[72, 12], [68, 60], [71, 37.5]], end: 0.95 }],
          },
          {
            title: 'KEEPER',
            text: ['Keeper: *your box*.', 'Move across with the ball.'],
            halves: [HALF.gk], timing: { move: 2.4 },
            moves: [{ id: 'gk', path: [[44, 70], [56, 70], [50, 70]], end: 0.95 }],
          },
          {
            title: 'EVERYONE HAS A HALF',
            text: ['Halves overlap: *two players* share each corner.', 'Stay in yours and we\'re *spread out*.'],
            halves: allHalves,
          },
        ],
        summary: ['Attacker *top half*, defender *bottom half*.', 'Wingers: *your own side*.', 'Stay in your half: we stay *spread out*.'],
      }),

      // ---------------- 2: ball goes wide ----------------
      Object.assign({}, common, {
        id: 'ball-wide',
        video: 'videos/five-a-side-shape-2.mp4',
        kicker: 'Clip 2 · Play in your half',
        title: 'Ball Goes Wide',
        tagline: 'Ball on one wing: the other winger tucks in.',
        intro: ['The ball goes out to the *left wing*.', 'The *right wing tucks in* towards the middle...', '...but *doesn\'t cross it*.'],
        players: players(),
        ball: { owner: 'gk' },
        steps: [
          {
            title: 'KEEPER STARTS IT',
            text: ['Keeper rolls it out to the *defender*.'],
            ball: { pass: 'def', start: 0.1, end: 0.55 },
          },
          {
            title: 'OUT TO THE LEFT',
            text: ['Defender passes *out wide* to the left wing.'],
            timing: { move: 2.6 },
            moves: [{ id: 'lw', to: [25, 33], end: 0.6 }],
            ball: { pass: 'lw', start: 0.2, end: 0.65 },
          },
          {
            title: 'TUCK IN',
            text: ['Ball\'s on the left.', 'Right wing *tucks in* towards the middle.', 'Ready if the ball comes across.'],
            tags: { rw: 'TUCK IN' }, halves: [soft('rw')], lines: [middle], timing: { move: 3 },
            moves: [
              { id: 'rw', to: [55, 30], ease: 'out', end: 0.9 },
              { id: 'lw', to: [25, 21], start: 0.1, end: 0.9 },
              { id: 'att', to: [46, 15], start: 0.2, end: 0.9 },
              { id: 'def', to: [42, 46], start: 0.2, end: 0.9 },
            ],
          },
          {
            title: 'NOT PAST THE MIDDLE',
            text: ['Come *close to the middle*...', '...but *don\'t cross it*.', 'The right half is still yours.'],
            tags: { rw: 'NOT PAST THE MIDDLE' }, halves: [HALF.rw], lines: [middle],
          },
          {
            title: 'BACK POST',
            text: ['Left wing crosses it in.', 'Attacker *near post*. Right wing arrives at the *back post*: still their side.'],
            tags: { att: 'NEAR POST', rw: 'BACK POST' }, lines: [middle], timing: { move: 2.6 },
            moves: [{ id: 'att', to: [42, 9], end: 0.6 }, { id: 'rw', to: [59, 7], end: 0.7 }],
            ball: { pass: 'rw', start: 0.3, end: 0.75 },
          },
          {
            title: 'SHOOT',
            text: ['Right wing finishes. *On target*.'],
            tags: { rw: 'SHOOT' }, shot: GOAL, timing: { move: 1.8 },
            ball: { to: [52, -2.5], start: 0.05, end: 0.45 },
          },
        ],
        summary: ['Ball on one wing: the other winger *tucks in*.', 'Close to the middle, *not past it*.', 'Same on the other side.'],
      }),

      // ---------------- 3: connected by string ----------------
      Object.assign({}, common, {
        id: 'string',
        video: 'videos/five-a-side-shape-3.mp4',
        kicker: 'Clip 3 · Play in your half',
        title: 'Connected by String',
        tagline: 'One player moves, the others move with them.',
        intro: ['Imagine the team is *tied together by string*.', 'Attacker goes high: the *defender comes up*.', 'One winger goes wide: the *other comes in*.'],
        players: players(),
        string: ['lw', 'att', 'rw', 'def', 'lw'],
        ball: { owner: 'def' },
        steps: [
          {
            title: 'TIED TOGETHER',
            text: ['We\'re all *connected by string*.', 'When one moves, the others get *pulled* too.'],
          },
          {
            title: 'ATTACKER GOES HIGH',
            text: ['Attacker runs *high*, towards goal...', '...the string pulls the *defender up to halfway*.'],
            tags: { att: 'GO HIGH', def: 'TO HALFWAY' }, lines: [halfway], timing: { move: 3 },
            moves: [
              { id: 'att', to: [50, 8], end: 0.75 },
              { id: 'def', to: [50, 39.5], start: 0.2, end: 0.95 },
              { id: 'lw', to: [29, 28], start: 0.2, end: 0.95 },
              { id: 'rw', to: [71, 28], start: 0.2, end: 0.95 },
            ],
          },
          {
            title: 'OUT WIDE',
            text: ['Defender passes to the *left wing*.'],
            timing: { move: 2.4 },
            ball: { pass: 'lw', start: 0.1, end: 0.55 },
          },
          {
            title: 'WINGER GOES WIDE',
            text: ['Left wing goes *really wide*...', '...it pulls the *right wing in*.', 'Close to the middle, *not past it*.'],
            tags: { lw: 'GO WIDE', rw: 'TUCK IN' }, lines: [middle], timing: { move: 3 },
            moves: [
              { id: 'lw', to: [22, 24], end: 0.75 },
              { id: 'rw', to: [55, 26], ease: 'out', start: 0.15, end: 0.95 },
              { id: 'def', to: [43, 41], start: 0.2, end: 0.95 },
            ],
          },
          {
            title: 'BACK INSIDE',
            text: ['Left wing passes back to the *defender*.'],
            timing: { move: 2.6 },
            moves: [{ id: 'def', to: [50, 39.5], end: 0.7 }],
            ball: { pass: 'def', start: 0.1, end: 0.6 },
          },
          {
            title: 'AND THE OTHER WAY',
            text: ['Ball to the *right wing*, who goes wide.', 'Now the *left wing tucks in*.'],
            tags: { rw: 'GO WIDE', lw: 'TUCK IN' }, lines: [middle], timing: { move: 3.2 },
            moves: [
              { id: 'rw', to: [78, 24], end: 0.6 },
              { id: 'lw', to: [45, 26], ease: 'out', start: 0.2, end: 0.95 },
              { id: 'def', to: [57, 41], start: 0.3, end: 0.95 },
            ],
            ball: { pass: 'rw', start: 0.25, end: 0.65 },
          },
        ],
        summary: ['We\'re *connected by string*.', 'Attacker high: defender to *halfway*.', 'One winger wide: the other *comes in*.'],
      }),
    ],
  });
})();
