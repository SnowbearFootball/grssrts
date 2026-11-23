/*
 * SESSION (DRAFT): Switching Play: Pass and Follow (Attacking · passing)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#switching-play-square).
 *
 * A square (about 20 x 20 yards) with a small coned box at each corner. Three teams (green, red, blue) have a player in
 * every corner. Pass round the square to a teammate and follow your pass: green goes clockwise, red and blue anti-clockwise,
 * all at the same time (three balls). Progression: play off a coach in the middle.
 * The steps are generated below from who has each ball, so the passes and runs always line up.
 */
(function () {
  const C = { g: '#2fbf7f', r: '#e5484d', b: '#3b9ae1', c: '#2b2b2b' };
  const CORNERS = [[22, 12], [78, 12], [78, 63], [22, 63]];            // TL, TR, BR, BL (clockwise)
  const OFF = { g: [-5, -3.5], r: [5, -3.5], b: [0, 4.5] };          // where each team stands in a corner box
  const OUT = [[-1, -1], [1, -1], [1, 1], [-1, 1]];                      // outward from the square, per corner
  const spot = (team, k) => [CORNERS[k][0] + OFF[team][0], CORNERS[k][1] + OFF[team][1]];
  const wait = (team, k) => [spot(team, k)[0] + OUT[k][0] * 7, spot(team, k)[1] + OUT[k][1] * 7];   // just behind, after following a pass

  const players = [];
  ['g', 'r', 'b'].forEach(t => [0, 1, 2, 3].forEach(k => { const [x, y] = spot(t, k); players.push({ id: t + k, team: t, x, y }); }));

  // A team going round. Each round: the player with the ball passes to the teammate in the next box and follows the pass
  // (waiting just behind that box). Next round, the receiver passes on and the waiting player steps into the box.
  function team(t, dir, start) {
    let holder = t + start, corner = start, waiter = null;
    const occ = [t + 0, t + 1, t + 2, t + 3];      // occ[k]: the player standing in box k
    return {
      round() {
        const from = corner, to = (corner + dir + 4) % 4;
        const passer = holder, receiver = occ[to];
        const moves = [];
        if (waiter) { moves.push({ id: waiter, to: spot(t, from), start: 0.3, end: 0.7, arrow: false }); occ[from] = waiter; }
        moves.push({ id: passer, to: wait(t, to), start: 0.32, end: 0.95 });
        waiter = passer; holder = receiver; corner = to;
        return { passes: [{ to: receiver, start: 0.05, end: 0.4 }], moves, receiver };
      },
    };
  }

  // build steps: each round, all three balls move at once
  function rounds(n, texts, extra = {}) {
    const G = team('g', +1, 0), R = team('r', -1, 0), B = team('b', -1, 2);
    const steps = [];
    for (let i = 0; i < n; i++) {
      const g = G.round(), r = R.round(), b = B.round();
      steps.push(Object.assign({
        title: texts[i % texts.length][0], text: texts[i % texts.length][1],
        timing: { move: 3 },
        passes: r.passes, passes2: g.passes, passes3: b.passes,
        moves: [...g.moves, ...r.moves, ...b.moves],
      }, typeof extra === 'function' ? extra({ g, r, b }, i) : extra));
    }
    return steps;
  }

  const common = {
    plain: true, goals: [],
    areas: CORNERS.map(([x, y]) => ({ x: x - 10, y: y - 9, w: 20, h: 18, fill: 'rgba(240,205,110,0.18)' })),
    dims: [{ a: [22, 1.5], b: [78, 1.5], label: '20 yds' }],
    teamColors: C,
    facing: { g: 1, r: 1, b: -1, c: 1 },
    legendTeams: [{ label: 'Green', color: C.g }, { label: 'Red', color: C.r }, { label: 'Blue', color: C.b }],
    players,
    ball: { owner: 'r0' }, ball2: { owner: 'g0' }, ball3: { owner: 'b2' },
    keyPhrase: { big: 'PASS AND FOLLOW', small: 'Quality of touch, quality of pass' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'switching-play-square',
    draft: true,
    title: 'Switching Play: Pass and Follow',
    subtitle: 'Passing and movement',
    type: 'Technical',
    category: 'attacking',
    squad: [12, 15],
    thumb: 'assets/thumbs/switching-play-square.jpg',
    summary: 'Three teams pass round a square and follow their pass, one clockwise and two anti-clockwise. Scan, move quickly, keep it to two touches.',
    keyPhrase: 'Pass and follow',
    ages: { from: 12 },

    cards: [
      {
        title: 'Pass and follow',
        lead: '*Quality of touch*, *quality of pass*.',
        columns: [
          { heading: 'On the ball', items: ['Pass to your teammate at the next box', 'Then *follow your pass*', 'Weight the pass so they can move it on'] },
          { heading: 'Touches', items: ['*2 touch*: great', '3 touch: maybe needed', '4 touches: probably closed off in a game'] },
        ],
        phrase: { big: 'PASS AND FOLLOW', small: 'Quality of touch, quality of pass' },
      },
      {
        title: 'Scan and join in',
        lead: 'Get between the boxes *quickly* and join in play.',
        columns: [
          { heading: 'Scan', items: ['*Check your shoulders* before the ball arrives', 'Scan again as the ball travels', 'The picture may have changed'] },
          { heading: 'Be aware', items: ['Watch for other balls and players running round', 'Move to make the pass easy', 'Talk to your teammate'] },
        ],
      },
    ],

    keywords: [
      { word: 'Pass and follow', meaning: 'After you pass, run to where your pass went.' },
      { word: 'Scan', meaning: 'Look over your shoulders to see what is around you before the ball arrives.' },
      { word: 'Two touch', meaning: 'One touch to control, one to pass.' },
      { word: 'Join in play', meaning: 'Get to the next box quickly so you are ready to play again.' },
    ],

    training: {
      area: 'A square about 20 × 20 yards, with a small coned box at each corner.',
      players: 'Three teams of 4 or 5, a player from each team in every corner box (12 to 15). A coach for the progression.',
      equipment: 'Cones for the square and boxes, bibs in three colours, three balls.',
      setup: [
        'Each team has a player in every corner box. One ball per team.',
        'Pass round the square to your teammate in the next box, then follow your pass.',
        'One team goes clockwise, the other two anti-clockwise, all at the same time.',
        'Quality of touch, quality of pass. 2 touch: great. 3 touch: maybe needed. 4 touches: probably closed off in a game.',
        'Once warm, get between the boxes quickly and join in play. Watch out for balls and players running round.',
        'Check your shoulders and scan for position, then scan again as the ball travels: the picture may have changed.',
        'Progression: play off a coach in the middle, if they are available in a central position.',
      ],
    },

    questions: [
      'How many touches did you need? Could it be two?',
      'Did you check your shoulder before the ball arrived?',
      'What changed while the ball was travelling?',
      'When is the coach available in the middle?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'pass-and-follow',
        video: 'videos/switching-play-square-1.mp4',
        kicker: 'Clip 1 · three teams, three balls',
        title: 'Pass and Follow',
        tagline: 'Pass to the next box, then follow your pass.',
        intro: ['A square with a box at each corner.', 'Three teams, a player from each team in every box.', 'Green go *clockwise*; red and blue go *anti-clockwise*.'],
        steps: [{ title: 'THE SET-UP', text: ['A player from each team in every box.', 'Green go *clockwise*.', 'Red and blue go *anti-clockwise*.'] }]
          .concat(rounds(3, [
            ['PASS AND FOLLOW', ['Pass to your teammate in the next box.', 'Then *follow your pass*.']],
            ['KEEP IT MOVING', ['*Quality of touch*, *quality of pass*.', 'Two touch if you can.']],
            ['AND AGAIN', ['All three balls at once.', 'Watch for other balls and players.']],
          ])),
        summary: ['Pass to the next box, then *follow your pass*.', 'Green clockwise, red and blue anti-clockwise.', '*Quality of touch*, *quality of pass*.'],
      }),

      Object.assign({}, common, {
        id: 'scan',
        video: 'videos/switching-play-square-2.mp4',
        kicker: 'Clip 2 · once warm',
        title: 'Scan and Join In',
        tagline: 'Check your shoulders, get there quickly, two touch.',
        timing: { stepIn: 0.5, arrows: 1.2, read: 0.8, move: 2.4, hold: 0.9 },
        intro: ['Once warm: *get between the boxes quickly*.', '*Check your shoulders* before the ball arrives.', 'Two touch: great. Four touches: closed off in a game.'],
        steps: rounds(4, [
          ['SCAN, THEN RECEIVE', ['*Check your shoulders*: who is around you?', 'Scan again as the ball travels.']],
          ['GET THERE QUICKLY', ['Follow your pass *at speed*.', 'Join in play: be ready for the next one.']],
          ['TWO TOUCH', ['Control, pass. *Two touches*.', 'Three if you need it. Four: closed off in a game.']],
          ['WATCH OUT', ['Other balls and players are running round.', 'The picture may have changed.']],
        ], ({ g, r, b }) => ({ tags: { [g.receiver]: 'SCAN', [r.receiver]: 'SCAN', [b.receiver]: 'SCAN' }, timing: { move: 2.4 } })),
        summary: ['*Scan*, then scan again as the ball travels.', 'Get between the boxes *quickly*.', '*Two touch*: great.'],
      }),

      Object.assign({}, common, {
        id: 'coach',
        video: 'videos/switching-play-square-3.mp4',
        kicker: 'Progression · play off the coach',
        title: 'Play Off the Coach',
        tagline: 'If the coach is available in the middle, use them.',
        legendTeams: [{ label: 'Green', color: C.g }, { label: 'Red', color: C.r }, { label: 'Coach', color: C.c }],
        players: players.filter(p => p.team !== 'b').concat({ id: 'co', team: 'c', label: 'C', x: 50, y: 38 }),
        ball3: null,
        intro: ['Progression: a *coach in the middle*.', 'Can you play off the coach if they are available?', 'In, set back, then on to the next box.'],
        steps: (function () {
          const G = team('g', +1, 0);
          const s = [{ title: 'A COACH IN THE MIDDLE', text: ['The coach stands in a *central position*.', 'Use them when they are available.'] }];
          const gr = () => { const g = G.round(); return { passes2: g.passes, gm: g.moves }; };
          let g = gr();
          s.push({
            title: 'IN TO THE COACH', text: ['Red play *in to the coach*...', '...who sets it back.'],
            tags: { co: 'SET' }, timing: { move: 3.2 },
            passes: [{ to: 'co', start: 0.05, end: 0.38 }, { to: 'r0', start: 0.55, end: 0.85 }],
            moves: [{ id: 'r0', to: [32, 21], start: 0.15, end: 0.55 }, ...g.gm], passes2: g.passes2,
          });
          g = gr();
          s.push({
            title: 'ON TO THE NEXT BOX', text: ['Then pass on to the next box...', '...and *follow your pass*.'],
            timing: { move: 3 },
            passes: [{ to: 'r3', start: 0.05, end: 0.45 }],
            moves: [{ id: 'r0', to: wait('r', 3), start: 0.35, end: 0.95 }, ...g.gm], passes2: g.passes2,
          });
          g = gr();
          s.push({
            title: 'AND AGAIN', text: ['In to the coach, set back, on.', 'Two touch if you can.'],
            tags: { co: 'SET' }, timing: { move: 3.2 },
            passes: [{ to: 'co', start: 0.05, end: 0.38 }, { to: 'r3', start: 0.55, end: 0.85 }],
            moves: [{ id: 'r3', to: [32, 53], start: 0.15, end: 0.55 }, { id: 'r0', to: spot('r', 3), start: 0.4, end: 0.8, arrow: false }, ...g.gm], passes2: g.passes2,
          });
          g = gr();
          s.push({
            title: 'ON, AND FOLLOW', text: ['Pass on to the next box and *follow*.'],
            timing: { move: 3 },
            passes: [{ to: 'r2', start: 0.05, end: 0.45 }],
            moves: [{ id: 'r3', to: wait('r', 2), start: 0.35, end: 0.95 }, ...g.gm], passes2: g.passes2,
          });
          return s;
        })(),
        summary: ['Play *in to the coach* when they are available.', 'Set back, then on to the next box.', 'Follow your pass.'],
      }),
    ],
  });
})();
