/*
 * SESSION: Dribbling: Week 1 (Attacking · dribbling) (DRAFT)
 * From the owner's own plan ("Dribbling - Part 1", U16).
 *
 * A 35 x 35 yard square.
 * Drill 1: every player in the area with a ball. Start slow, head up, use the other players as passive defenders.
 * Drill 2: 8 inside with a ball, 4 on the outside without. Look up, pass to a free outside player and swap places.
 *          The outside player receives, touch out of the feet, dribbles into space.
 * Drill 3: same set-up, 5 balls, cones in the area as passive defenders. Outside players don't come in. Receive into space,
 *          trick past a cone (change of direction / pace), play it out. Rotate the outside players.
 * Pitch units: x 0..100, y 0..75 (1 unit is about the same across and down, so the square is 56 x 56 units).
 */
(function () {
  const G = '#2fbf7f';
  const SQ = { x: 22, y: 9.5, w: 56, h: 56 };
  const base = {
    plain: true, goals: [],
    areas: [{ x: SQ.x, y: SQ.y, w: SQ.w, h: SQ.h }],
    dims: [{ a: [SQ.x, 4], b: [SQ.x + SQ.w, 4], label: '35 yds' }],
    teamColors: { a: G },
    tagPlace: 'auto',
    legendTeams: [{ label: 'Players', color: G }],
  };

  // ---------- drill 1: a ball each ----------
  // spots for each player at the end of each step (S0 = start)
  const S = [
    [[28, 15], [44, 14], [60, 16], [72, 15], [40, 27], [62, 27], [28, 38], [46, 40], [58, 40], [36, 54], [70, 52], [52, 60]],
    [[33, 20], [50, 18], [66, 20], [74, 29], [39, 32], [60, 31], [27, 46], [48, 46], [65, 41], [37, 58], [72, 58], [54, 57]],
    [[40, 16], [57, 13], [72, 20], [68, 36], [33, 30], [53, 30], [32, 54], [44, 49], [61, 48], [44, 60], [74, 50], [60, 58]],
    [[48, 22], [64, 14], [66, 27], [73, 42], [28, 24], [44, 34], [26, 46], [36, 56], [56, 44], [52, 60], [68, 56], [62, 50]],
  ];
  const ids = S[0].map((_, i) => 'p' + (i + 1));
  const go = (k, opts) => ids.map((id, i) => Object.assign({ id, to: S[k][i] }, (opts || {})[id] || {}, (opts || {}).all || {}));

  // ---------- drills 2 and 3: 8 inside, 4 outside ----------
  // outside spots: top, right, bottom, left
  const OUT = { oT: [64, 4.5], oR: [84, 36], oB: [40, 71], oL: [16, 38] };
  const outside = Object.keys(OUT).map(id => ({ id, team: 'a', x: OUT[id][0], y: OUT[id][1] }));

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'dribbling-week-1',
    draft: true,
    title: 'Dribbling: Week 1',
    subtitle: 'Head up, change of direction and pace',
    type: 'Technical',
    category: 'attacking',
    topics: ['Dribbling'],
    squad: [10, 14],
    thumb: 'assets/thumbs/dribbling-week-1.jpg',
    summary: 'A ball each in a 35 yard square, then players on the outside to pass to and swap with, then cones to beat. Head up, ball out of your feet, change of direction and pace.',
    keyPhrase: 'Head up, ball out of your feet',
    ages: { from: 16 },

    cards: [
      {
        title: 'Key factors',
        lead: '*Head up* when you dribble. Be *positive*: want to dribble.',
        columns: [
          { heading: 'Receive', items: ['*First touch* the way you want to dribble', 'Get the *ball out of your feet*'] },
          { heading: 'Dribble', items: ['*Head up*', 'Use your *big and little toes*', '*Change of direction* and *pace*'] },
        ],
        phrase: { big: 'HEAD UP, BALL OUT OF YOUR FEET', small: 'Change of direction, change of pace' },
      },
      {
        title: 'Make it easier or harder',
        columns: [
          { heading: 'Easier', items: ['Make the area *bigger*', 'Fewer players in the area', 'Fewer balls in play'] },
          { heading: 'Harder', items: ['Make the area *smaller*', 'Add more *passive defenders*'] },
        ],
      },
    ],

    keywords: [
      { word: 'Ball out of your feet', meaning: 'A first touch that pushes the ball into space, so you can run with it straight away.' },
      { word: 'Passive defender', meaning: 'A player or cone in your way that doesn\'t try to win the ball. You still have to get past it.' },
      { word: 'Big and little toes', meaning: 'The inside (big toe) and outside (little toe) of your foot.' },
      { word: 'Change of pace', meaning: 'Go slow, then suddenly fast, to get away.' },
    ],

    training: {
      area: 'A 35 × 35 yard square.',
      players: '12: 8 inside and 4 on the outside (drills 2 and 3). Drill 1 works with everyone inside.',
      equipment: 'A ball each, cones for the square and for passive defenders, bibs if you like.',
      setup: [
        'Quick explanation first (2 or 3 minutes).',
        'Drill 1 (10 minutes): every player in the area with a ball. Start slow. Head up, and use the other players as passive defenders.',
        'Drill 2 (10 minutes): 4 players on the outside without a ball, 8 balls inside. Dribblers look up for a free outside player, pass to them and swap places.',
        'The outside player receives, takes it out of their feet and dribbles into space.',
        'Drill 3 (15 minutes): same set-up, 5 balls, cones in the area as passive defenders. Outside players don\'t come in.',
        'Receive into space (away from other players), then a trick to go past a cone: change of direction and pace. Rotate the outside players.',
        'Before this: receiving priorities. Next: Dribbling Week 2 (1 v 1).',
      ],
    },

    questions: [
      'How often could you look up while you dribbled?',
      'Where did your first touch go? Was it out of your feet?',
      'Which part of your foot did you use to change direction?',
      'When did you speed up?',
    ],

    clips: [
      // ---------------- drill 1 ----------------
      Object.assign({}, base, {
        id: 'ball-each',
        video: 'videos/dribbling-week-1-1.mp4',
        kicker: 'Drill 1 · A ball each',
        title: 'Ball Each',
        tagline: 'Start slow, head up, the other players are your defenders.',
        intro: ['Every player in the square *with a ball*.', 'Start *slow*, *head up*.', 'Other players are *passive defenders*.'],
        players: ids.map((id, i) => ({ id, team: 'a', x: S[0][i][0], y: S[0][i][1], ball: true })),
        keyPhrase: { big: 'HEAD UP', small: 'Small touches, see the space' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A *35 yard* square.', 'Every player inside *with a ball*.'],
          },
          {
            title: 'START SLOW, HEAD UP',
            text: ['Small touches, *slow* to start.', '*Head up*: see the other players.'],
            tags: { p1: 'HEAD UP', p11: 'HEAD UP' }, timing: { move: 3.2 },
            moves: go(1, { all: { end: 0.95 } }),
          },
          {
            title: 'BIG AND LITTLE TOES',
            text: ['Move the ball with your *big toe* (inside)...', '...and your *little toe* (outside).'],
            tags: { p2: 'INSIDE', p8: 'OUTSIDE' }, timing: { move: 3.2 },
            moves: go(2, { all: { end: 0.95 } }),
          },
          {
            title: 'CHANGE DIRECTION',
            text: ['A player in your way? They\'re a *defender*.', '*Change of direction* away from them.', 'Then *change of pace* into space.'],
            tags: { p1: 'CHANGE OF PACE', p9: 'CHANGE OF PACE' }, timing: { move: 3.4 },
            moves: go(3, {
              all: { end: 0.95 },
              p1: { path: [[44, 19], [48, 22]] },
              p9: { path: [[60, 46], [56, 44]] },
            }),
          },
        ],
        summary: ['*Head up*: see the space.', '*Big and little toes*.', '*Change of direction*, then *change of pace*.'],
      }),

      // ---------------- drill 2 ----------------
      Object.assign({}, base, {
        id: 'pass-and-swap',
        video: 'videos/dribbling-week-1-2.mp4',
        kicker: 'Drill 2 · 8 balls',
        title: 'Pass and Swap',
        tagline: 'Look up, find a free outside player, swap places.',
        intro: ['*8* inside with a ball, *4* on the outside without.', 'Look up: pass to a *free outside player*...', '...and *swap places* with them.'],
        players: [
          { id: 'i1', team: 'a', x: 56, y: 16 }, { id: 'i2', team: 'a', x: 66, y: 22 }, { id: 'i3', team: 'a', x: 30, y: 48 },
          { id: 'i4', team: 'a', x: 50, y: 22, ball: true }, { id: 'i5', team: 'a', x: 44, y: 32, ball: true },
          { id: 'i6', team: 'a', x: 60, y: 42, ball: true }, { id: 'i7', team: 'a', x: 46, y: 50, ball: true },
          { id: 'i8', team: 'a', x: 64, y: 56, ball: true },
        ].concat(outside),
        ball: { owner: 'i1' }, ball2: { owner: 'i2' }, ball3: { owner: 'i3' },
        keyPhrase: { big: 'LOOK UP, PASS, SWAP', small: 'Receive, touch out of your feet, go' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*8* inside, a ball each.', '*4* on the outside, no ball.'],
            tags: { oT: 'OUT', oR: 'OUT', oB: 'OUT', oL: 'OUT' },
          },
          {
            title: 'HEAD UP',
            text: ['Dribble with your *head up*.', 'Is an outside player *free*?'],
            tags: { oT: 'FREE' }, timing: { move: 3 },
            moves: [
              { id: 'i1', to: [76, 19], end: 0.95 }, { id: 'i4', to: [40, 24], end: 0.95, arrow: false },
              { id: 'i2', to: [72, 30], end: 0.95, arrow: false }, { id: 'i5', to: [52, 32], end: 0.95, arrow: false },
              { id: 'i6', to: [64, 46], end: 0.95, arrow: false }, { id: 'i3', to: [32, 42], end: 0.95, arrow: false },
              { id: 'i7', to: [42, 56], end: 0.95, arrow: false }, { id: 'i8', to: [70, 58], end: 0.95, arrow: false },
            ],
          },
          {
            title: 'PASS AND SWAP',
            text: ['*Pass* to the free player...', '...and *swap places* with them.', 'They take it *out of their feet* and go.'],
            tags: { oT: 'TOUCH OUT' }, timing: { move: 3.4 },
            passes: [{ to: 'oT', start: 0.05, end: 0.3 }],
            moves: [
              { id: 'oT', path: [[60, 11], [54, 20]], start: 0.32, end: 0.95 },
              { id: 'i1', to: [73, 4.5], start: 0.3, end: 0.95 },
              { id: 'i2', to: [76, 36], end: 0.95, arrow: false }, { id: 'i4', to: [36, 28], end: 0.95, arrow: false },
              { id: 'i5', to: [50, 40], end: 0.95, arrow: false }, { id: 'i6', to: [60, 50], end: 0.95, arrow: false },
              { id: 'i3', to: [28, 34], end: 0.95, arrow: false }, { id: 'i7', to: [36, 58], end: 0.95, arrow: false },
            ],
          },
          {
            title: 'AGAIN, OTHER SIDE',
            text: ['Look up: *who is free*?', 'Pass, swap, *touch out of your feet*.'],
            tags: { oR: 'TOUCH OUT' }, timing: { move: 3.4 },
            passes2: [{ to: 'oR', start: 0.05, end: 0.3 }],
            moves: [
              { id: 'oR', path: [[78, 28], [66, 28]], start: 0.32, end: 0.95 },
              { id: 'i2', to: [84, 47], start: 0.3, end: 0.95 },
              { id: 'oT', to: [50, 26], end: 0.95, arrow: false }, { id: 'i5', to: [46, 46], end: 0.95, arrow: false },
              { id: 'i6', to: [66, 44], end: 0.95, arrow: false }, { id: 'i8', to: [62, 60], end: 0.95, arrow: false },
              { id: 'i3', to: [27, 30], end: 0.95, arrow: false }, { id: 'i4', to: [40, 20], end: 0.95, arrow: false },
            ],
          },
          {
            title: 'KEEP IT GOING',
            text: ['The new dribblers *look up* too.', 'Pass, swap, go: keep it moving.'],
            tags: { oL: 'TOUCH OUT', oT: 'HEAD UP' }, timing: { move: 3.4 },
            passes3: [{ to: 'oL', start: 0.05, end: 0.3 }],
            moves: [
              { id: 'i3', to: [16, 30], start: 0.3, end: 0.95 },
              { id: 'oL', path: [[26, 42], [34, 50]], start: 0.32, end: 0.95 },
              { id: 'oT', to: [58, 16], end: 0.95, arrow: false }, { id: 'oR', to: [70, 22], end: 0.95, arrow: false },
              { id: 'i7', to: [30, 60], end: 0.95, arrow: false }, { id: 'i5', to: [40, 36], end: 0.95, arrow: false },
              { id: 'i6', to: [70, 50], end: 0.95, arrow: false }, { id: 'i8', to: [56, 62], end: 0.95, arrow: false },
            ],
          },
        ],
        summary: ['*Head up*: who is free?', '*Pass and swap*.', 'Receive, *touch out of your feet*, dribble into space.'],
      }),

      // ---------------- drill 3 ----------------
      Object.assign({}, base, {
        id: 'beat-the-cones',
        video: 'videos/dribbling-week-1-3.mp4',
        kicker: 'Drill 3 · 5 balls · cones as defenders',
        title: 'Beat the Cones',
        tagline: 'Receive into space, a trick past a cone, change of pace.',
        intro: ['Same set-up, *5 balls*.', '*Cones* are passive defenders.', 'Outside players *stay out*.'],
        cones: [[38, 22], [62, 20], [50, 36], [32, 48], [68, 46], [52, 56]].map(at => ({ at, color: '#d9622b' })),
        players: [
          { id: 'i1', team: 'a', x: 70, y: 32 }, { id: 'i2', team: 'a', x: 28, y: 18, ball: true },
          { id: 'i3', team: 'a', x: 60, y: 60, ball: true },
          { id: 'i4', team: 'a', x: 50, y: 15 }, { id: 'i5', team: 'a', x: 72, y: 54 },
          { id: 'i6', team: 'a', x: 40, y: 32 }, { id: 'i7', team: 'a', x: 28, y: 36 }, { id: 'i8', team: 'a', x: 42, y: 52 },
        ].concat(outside),
        ball: { owner: 'oT' }, ball2: { owner: 'oR' }, ball3: { owner: 'i1' },
        keyPhrase: { big: 'RECEIVE INTO SPACE', small: 'Then a trick, change of direction, change of pace' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*Cones* in the square: passive defenders.', '*5 balls*. Outside players *don\'t come in*.'],
            tags: { oT: 'OUT', oR: 'OUT', oB: 'OUT', oL: 'OUT' },
          },
          {
            title: 'RECEIVE INTO SPACE',
            text: ['Move *away from other players*.', 'First touch *into space*.'],
            tags: { i4: 'INTO SPACE', i5: 'INTO SPACE' }, timing: { move: 3.4 },
            passes: [{ to: 'i4', start: 0.35, end: 0.6 }],
            passes2: [{ to: 'i5', start: 0.35, end: 0.6 }],
            moves: [
              { id: 'i4', to: [58, 13], end: 0.35 }, { id: 'i5', to: [74, 44], end: 0.35 },
              { id: 'i1', path: [[72, 26], [70, 22]], end: 0.95, arrow: false },
              { id: 'i2', to: [26, 26], end: 0.95, arrow: false }, { id: 'i3', to: [62, 66 - 4], end: 0.95, arrow: false },
            ],
          },
          {
            title: 'A TRICK PAST A CONE',
            text: ['Dribble *at* a cone.', 'A trick, then *change of direction*...', '...and *change of pace* past it.'],
            tags: { i4: 'STEP OVER', i5: 'CHANGE OF PACE' }, timing: { move: 3.4 },
            moves: [
              { id: 'i4', path: [[60, 15], [66, 18], [66, 26]], end: 0.95 },
              { id: 'i5', path: [[70, 50], [62, 48], [58, 42]], end: 0.95 },
              { id: 'i1', path: [[74, 28], [70, 34]], end: 0.95, arrow: false },
              { id: 'i2', path: [[30, 30], [36, 27], [44, 25]], end: 0.95, arrow: false },
              { id: 'i3', to: [44, 60], end: 0.95, arrow: false },
            ],
          },
          {
            title: 'PLAY IT OUT',
            text: ['*Head up*: find a free outside player.', 'Pass it out, then find *space* again.'],
            tags: { i4: 'HEAD UP', oR: 'FREE', oT: 'FREE' }, timing: { move: 3 },
            passes: [{ to: 'oT', start: 0.05, end: 0.4 }],
            passes3: [{ to: 'oR', start: 0.1, end: 0.45 }],
            moves: [
              { id: 'i4', to: [74, 18], start: 0.4, end: 0.95 },
              { id: 'i5', path: [[54, 40], [56, 30]], end: 0.95, arrow: false },
            ],
          },
          {
            title: 'ROTATE THE OUTSIDE',
            text: ['Every few minutes, *swap* the outside players.', 'Everyone gets *time on the ball*.'],
            tags: { oL: 'IN', i7: 'OUT' }, timing: { move: 3 },
            moves: [
              { id: 'i7', to: [16, 28], end: 0.6 }, { id: 'oL', to: [27, 42], start: 0.35, end: 0.95 },
            ],
          },
        ],
        summary: ['Receive *into space*, away from players.', 'A *trick*, change of *direction*...', '...then change of *pace*.'],
      }),
    ],
  });
})();
