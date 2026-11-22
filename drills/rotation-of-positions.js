/*
 * SESSION (DRAFT): Rotation of Positions (Attacking · building out)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#rotation-of-positions).
 *
 * Plain background, laid sideways: about 40 yards long (x 0..100, 2.5 units a yard) by 27 yards wide (y 0..75, 2.8 units a yard).
 * The big goal and keeper are on the right. Yellow box: 18 × 18 yards in front of the goal (x 55–100, y 12–62).
 * The "yellow line" is a line of yellow cones 10 yards out from the box (x 30). Two mini goals in the far corners.
 * Blue (team 'a') build out from the back; red (team 'd') press.
 */
(function () {
  const BLUE = '#3b9ae1', RED = '#e5484d';
  const yellowLine = [3, 17, 31, 45, 59, 72].map(y => ({ at: [30, y], color: '#e5b52b' }));
  const common = {
    plain: true,
    goals: [[37, 'right']],
    goalScale: 1.6,
    miniGoals: [{ at: [4, 4], angle: -45 }, { at: [4, 71], angle: 45 }],
    areas: [{ x: 55, y: 12, w: 45, h: 50, fill: 'rgba(240,205,110,0.38)', cone: RED }],
    cones: yellowLine,
    dims: [{ a: [55, 66], b: [100, 66], label: '18 yds' }, { a: [30, 73.5], b: [55, 73.5], label: '10 yds' }],
    teamColors: { a: BLUE, d: RED },
    facing: { a: 'left', d: 'right', k: 'left' },
    legendTeams: [{ label: 'Building out', color: BLUE }, { label: 'Pressing', color: RED }],
    keyPhrase: { big: 'FIND THE FREE PLAYER', small: 'Rotate, invite pressure, play away' },
  };
  const gk = { id: 'gk', team: 'k', label: 'GK', x: 95, y: 37 };
  const base = [
    gk,
    { id: 'cb1', team: 'a', label: 'CB', x: 58, y: 26 }, { id: 'cb2', team: 'a', label: 'CB', x: 58, y: 50 },
    { id: 'fb1', team: 'a', label: 'FB', x: 49, y: 5 }, { id: 'fb2', team: 'a', label: 'FB', x: 45, y: 66 },
    { id: 'cm1', team: 'a', label: 'CM', x: 25, y: 29 }, { id: 'cm2', team: 'a', label: 'CM', x: 25, y: 50 },
    { id: 'r9', team: 'd', x: 47, y: 44 }, { id: 'r1', team: 'd', x: 34, y: 10 }, { id: 'r2', team: 'd', x: 33, y: 38 }, { id: 'r3', team: 'd', x: 37, y: 65 },
  ];
  const nineV5 = [
    { id: 'gk', team: 'k', label: 'GK', x: 94, y: 36 },
    { id: 'cb1', team: 'a', label: 'CB', x: 57, y: 26 }, { id: 'cb2', team: 'a', label: 'CB', x: 56, y: 50 },
    { id: 'fb1', team: 'a', label: 'FB', x: 48, y: 4 }, { id: 'fb2', team: 'a', label: 'FB', x: 44, y: 66 },
    { id: 'cm1', team: 'a', label: 'CM', x: 25, y: 28 }, { id: 'cm2', team: 'a', label: 'CM', x: 25, y: 50 },
    { id: 'wg1', team: 'a', label: 'W', x: 22, y: 7 }, { id: 'wg2', team: 'a', label: 'W', x: 25, y: 68 },
    { id: 'r1', team: 'd', x: 34, y: 10 }, { id: 'rcm', team: 'd', x: 19, y: 25 }, { id: 'r9', team: 'd', x: 48, y: 40 },
    { id: 'r4', team: 'd', x: 21, y: 44 }, { id: 'r3', team: 'd', x: 36, y: 64 },
  ];
  const longToKeeper = () => ({
    title: 'LONG TO THE KEEPER',
    text: ['Play starts: the pressing team *plays it long* to the keeper.'],
    timing: { move: 2 },
    passes: [{ to: 'gk', start: 0, end: 0.8 }],
  });

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'rotation-of-positions',
    draft: true,
    title: 'Rotation of Positions',
    subtitle: 'Building out',
    type: 'Tactical',
    category: 'attacking',
    squad: [11, 16],
    thumb: 'assets/thumbs/rotation-of-positions.jpg',
    summary: 'Play out from the back against a press. A midfielder drops in, the others rotate, and the free full-back scores.',
    keyPhrase: 'Find the free player',
    ages: { from: 14 },

    cards: [
      {
        title: 'Dropping in',
        lead: 'One CM drops in to receive. Pick *one of two* positions.',
        columns: [
          { heading: 'Between the CBs', items: ['The CBs *split* wide', 'That forces one FB *above the yellow line*'] },
          { heading: 'Between CB and FB', items: ['You effectively *become the FB*', 'So the FB *pushes on*'] },
        ],
      },
      {
        title: 'Beating the press',
        lead: 'Rotate, *invite pressure*, then play away.',
        columns: [
          { heading: 'Six passes', items: ['Make *6 passes* before releasing a FB', 'Invite pressure', 'Play away to the *free FB*, who can score'] },
          { heading: 'The free player', items: ['Movement creates a *free player* in the rotation triangle', 'Choose the right pass', 'Execute it to *beat the press*'] },
        ],
        phrase: { big: 'FIND THE FREE PLAYER', small: 'Rotate, invite pressure, play away' },
      },
    ],

    keywords: [
      { word: 'Rotation', meaning: 'Players swap positions so each space is still filled, but by a different player.' },
      { word: 'Drop in', meaning: 'A midfielder coming back to receive between or beside the defenders.' },
      { word: 'Split', meaning: 'The centre-backs moving wide to make room for the player dropping in.' },
      { word: 'Push on', meaning: 'A full-back moving higher up the pitch, above the yellow line.' },
      { word: 'Free player', meaning: 'The player the press can\'t get to. Find them with the right pass.' },
    ],

    training: {
      area: 'About 40 × 27 yards: a quarter pitch, brought in 6 yards from the goal line and halfway. An 18 × 18-yard box in front of the goal, a line of cones 10 yards out from it, and two mini goals at the far end.',
      players: 'Building team: GK, 2 CBs, 2 FBs, 2 CMs against 4 pressers. Progression: add 2 wingers against 5 pressers (9 v 5).',
      equipment: 'A full-size goal, two mini goals, cones for the box and the yellow line, bibs, plenty of balls.',
      setup: [
        'Play starts with the pressing team playing it long to the keeper.',
        'The defenders drop in to play out from the back. The 2 CMs stay behind the yellow line.',
        'One CM drops in to receive: between the CBs (the CBs split and one FB goes above the yellow line), or between a CB and FB (they become the FB and the FB pushes on).',
        'The building team must make 6 passes before releasing a FB to score in a mini goal. Invite pressure, then play away to the free FB.',
        'If the pressing team win it, they try to score in the big goal.',
        'Progression, 9 v 5: add wingers. If the CB splits, the FB pushes higher and the winger comes inside to play CM.',
      ],
    },

    questions: [
      'Where did you drop in: between the CBs, or between CB and FB?',
      'When the CBs split, which FB went above the yellow line?',
      'Who was the free player? How did we find them?',
      'Did we invite pressure before playing away?',
      'Winger: when did you come inside?',
    ],

    clips: [
      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'between-cbs',
        video: 'videos/rotation-of-positions-1.mp4',
        kicker: 'Option 1 · drop between the CBs',
        title: 'Drop Between the CBs',
        tagline: 'The CM drops in, the CBs split, the FB pushes on.',
        intro: ['Blue *play out from the back*, red press.', 'A CM drops in *between the CBs*.', 'The CBs *split*, and a FB goes *above the yellow line*.'],
        players: base,
        ball: { owner: 'r2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['An *18-yard box* in front of goal; the *yellow line* 10 yards out.', 'Blue build out; red press.', 'The 2 CMs stay *behind the yellow line*.'],
          },
          longToKeeper(),
          {
            title: 'DROP BETWEEN THE CBs',
            text: ['A CM *drops in* between the CBs.', 'The CBs *split* wide.'],
            tags: { cm1: 'DROP', cb1: 'SPLIT', cb2: 'SPLIT' },
            timing: { move: 3 },
            moves: [
              { id: 'cm1', to: [60, 37], ease: 'out' },
              { id: 'cb1', to: [67, 14], start: 0.1 }, { id: 'cb2', to: [67, 60], start: 0.1 },
              { id: 'r9', to: [50, 38], start: 0.3, arrow: false },
            ],
          },
          {
            title: 'FB ABOVE THE YELLOW LINE',
            text: ['The split forces one FB *above the yellow line*.'],
            tags: { fb1: 'PUSH ON' },
            timing: { move: 2.6 },
            moves: [{ id: 'fb1', to: [22, 5] }],
          },
          {
            title: 'SIX PASSES: INVITE PRESSURE',
            text: ['Make *6 passes* before releasing a FB.', 'Draw the press in.'],
            timing: { move: 4 },
            passes: [{ to: 'cb2' }, { to: 'cm1' }, { to: 'cb1' }],
            moves: [
              { id: 'r9', to: [56, 40], start: 0.2, arrow: false }, { id: 'r3', to: [58, 56], start: 0.1, arrow: false },
              { id: 'r1', to: [56, 17], start: 0.6, arrow: false }, { id: 'r2', to: [48, 30], start: 0.4, arrow: false },
            ],
          },
          {
            title: 'PLAY AWAY TO THE FREE FB',
            text: ['The press is drawn in.', 'Play away to the *free FB*.'],
            tags: { fb1: 'FREE MAN' },
            timing: { move: 2.2 },
            passes: [{ to: 'fb1', start: 0, end: 0.6 }],
          },
          {
            title: 'SCORE',
            text: ['The free FB goes on and *scores* in the mini goal.'],
            tags: { fb1: 'SCORE' },
            timing: { move: 2.4 },
            moves: [{ id: 'fb1', to: [12, 8], end: 0.6 }],
            ball: { to: [3.5, 3.5], start: 0.62, end: 0.9, arrow: false },
          },
        ],
        summary: ['CM drops *between the CBs*.', 'CBs *split*; a FB goes *above the yellow line*.', '*6 passes*, invite pressure.', 'Play away to the *free FB*.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'between-cb-fb',
        video: 'videos/rotation-of-positions-2.mp4',
        kicker: 'Option 2 · drop between CB and FB',
        title: 'Drop Between CB and FB',
        tagline: 'The CM drops in beside the CB and becomes the FB.',
        intro: ['Same set-up.', 'This time the CM drops in *between a CB and FB*.', 'They *become the FB*, so the FB *pushes on*.'],
        players: base,
        ball: { owner: 'r2' },
        steps: [
          longToKeeper(),
          {
            title: 'DROP BETWEEN CB AND FB',
            text: ['A CM drops in *between the CB and FB*.', 'They have effectively *become the FB*.'],
            tags: { cm2: 'DROP' },
            timing: { move: 3 },
            moves: [{ id: 'cm2', to: [55, 63], ease: 'out' }, { id: 'r3', to: [42, 60], start: 0.4, arrow: false }],
          },
          {
            title: 'THE FB PUSHES ON',
            text: ['So the FB *pushes on*, above the yellow line.'],
            tags: { fb2: 'PUSH ON' },
            timing: { move: 2.6 },
            moves: [{ id: 'fb2', to: [22, 68] }],
          },
          {
            title: 'SIX PASSES: INVITE PRESSURE',
            text: ['Keep it: *6 passes*.', 'Draw the press across.'],
            timing: { move: 4 },
            passes: [{ to: 'cb1' }, { to: 'cb2' }, { to: 'cm2' }],
            moves: [
              { id: 'r9', to: [55, 44], start: 0.1, arrow: false }, { id: 'r1', to: [52, 24], start: 0.1, arrow: false },
              { id: 'r3', to: [50, 62], start: 0.5, arrow: false },
            ],
          },
          {
            title: 'PLAY AWAY TO THE FREE FB',
            text: ['Play away to the *free FB*.'],
            tags: { fb2: 'FREE MAN' },
            timing: { move: 2.2 },
            passes: [{ to: 'fb2', start: 0, end: 0.6 }],
          },
          {
            title: 'SCORE',
            text: ['The free FB *scores* in the mini goal.'],
            tags: { fb2: 'SCORE' },
            timing: { move: 2.4 },
            moves: [{ id: 'fb2', to: [12, 67], end: 0.6 }],
            ball: { to: [3.5, 71.5], start: 0.62, end: 0.9, arrow: false },
          },
        ],
        summary: ['CM drops *between CB and FB*.', 'They *become the FB*; the FB *pushes on*.', '*6 passes*, then play away to the *free FB*.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'press-wins',
        video: 'videos/rotation-of-positions-3.mp4',
        kicker: 'If the press wins it',
        title: 'Press Wins It',
        tagline: 'Win it back and score in the big goal.',
        intro: ['If the pressing team *win the ball*...', '...they try to *score in the big goal*.'],
        players: base,
        ball: { owner: 'r2' },
        steps: [
          longToKeeper(),
          {
            title: 'A LOOSE PASS',
            text: ['Blue play it out, but a pass is *too slow*.'],
            timing: { move: 2.6 },
            passes: [{ to: 'cb1', start: 0, end: 0.4 }, { to: 'r1', start: 0.55, end: 0.95 }],
            moves: [{ id: 'r1', to: [44, 27], start: 0.3, end: 0.95, ease: 'out' }],
          },
          {
            title: 'PRESS WINS IT: SCORE',
            text: ['Red *win it*.', 'Now they try to *score in the big goal*.'],
            tags: { r1: 'SHOOT' },
            shot: [102, 41],
            timing: { move: 2 },
            ball: { to: [102, 41], start: 0.05, end: 0.55 },
            moves: [{ id: 'gk', to: [95, 39], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['A slow pass invites the *interception*.', 'Press wins it: *score in the big goal*.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'nine-v-five',
        video: 'videos/rotation-of-positions-4.mp4',
        kicker: 'Progression · 9 v 5 with wingers',
        title: 'Rotation With Wingers',
        tagline: 'An extra player in the rotation. Find the free player in the triangle.',
        intro: ['Same, but now *with wingers*: 9 v 5.', 'The rotation includes *an extra player*.', 'Find the *free player* in the triangle.'],
        players: nineV5,
        legendTeams: [{ label: 'Building out', color: BLUE }, { label: 'Pressing', color: RED }],
        ball: { owner: 'r4' },
        steps: [
          {
            title: 'THE SET-UP: 9 v 5',
            text: ['Now *with wingers*.', 'The rotation includes *an extra player*.'],
          },
          longToKeeper(),
          {
            title: 'INTO THE CB',
            text: ['The keeper plays it to a CB.'],
            timing: { move: 1.8 },
            passes: [{ to: 'cb1', start: 0, end: 0.6 }],
          },
          {
            title: 'CM DROPS: THEIR CM FOLLOWS',
            text: ['The CM *drops in*, beside the CB.', 'It *drags their CM* towards the ball.'],
            tags: { cm1: 'DROP' },
            timing: { move: 3 },
            moves: [{ id: 'cm1', to: [57, 10], ease: 'out' }, { id: 'rcm', to: [44, 13], start: 0.2 }],
          },
          {
            title: 'FB HIGHER, WINGER INSIDE',
            text: ['The FB *pushes higher*.', 'The winger *comes inside* to play CM, behind their CM.'],
            tags: { fb1: 'PUSH ON', wg1: 'INSIDE' },
            timing: { move: 2.8 },
            moves: [{ id: 'fb1', to: [26, 4] }, { id: 'wg1', to: [23, 20], start: 0.15 }],
          },
          {
            title: 'FIND THE FREE PLAYER',
            text: ['There\'s a *free player* in the rotation triangle.', 'Choose the right pass, and *execute it*.'],
            tags: { wg1: 'FREE MAN' },
            timing: { move: 2.2 },
            passes: [{ to: 'wg1', start: 0, end: 0.6 }],
          },
          {
            title: 'BEAT THE PRESS',
            text: ['The press is beaten.', 'Play the FB in.'],
            timing: { move: 2 },
            passes: [{ to: 'fb1', start: 0, end: 0.6 }],
          },
          {
            title: 'SCORE',
            text: ['The FB *scores* in the mini goal.'],
            tags: { fb1: 'SCORE' },
            timing: { move: 2.4 },
            moves: [{ id: 'fb1', to: [12, 7], end: 0.6 }],
            ball: { to: [3.5, 3.5], start: 0.62, end: 0.9, arrow: false },
          },
        ],
        summary: ['CM drops in; *their CM follows*.', 'FB *higher*, winger *inside*.', 'Find the *free player* in the triangle.', 'Choose the right pass, *beat the press*.'],
      }),
    ],
  });
})();
