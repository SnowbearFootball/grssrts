/*
 * SESSION (DRAFT): Switching Play: Pass and Follow (Attacking · passing)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#switching-play-square).
 *
 * A square (about 20 x 20 yards) with a small coned box at each corner. A team has one player in every box and two in its
 * first box, so there is always someone to pass to. Pass to the next box and follow your pass. Start with one team, then a
 * second going the opposite way (3 or 4 teams also work). Progression: one or two in the middle (coach or players): one-two, or they turn and play on.
 * The steps are generated below from who has each ball, so the passes and runs always line up.
 */
(function () {
  const C = { g: '#2fbf7f', r: '#e5484d', c: '#2b2b2b' };
  const CORNERS = [[22, 12], [78, 12], [78, 63], [22, 63]];            // TL, TR, BR, BL (clockwise)
  const OFF = { g: [-4, 0], r: [4, 0] };                                 // where each team stands in a box
  const OUT = [[-1, -1], [1, -1], [1, 1], [-1, 1]];                      // outward from the square, per corner
  // slot 0 = in the box ready to receive; slot 1 = just behind it (a player who has followed their pass)
  const spot = (t, k, slot = 0) => [CORNERS[k][0] + OFF[t][0] + OUT[k][0] * 5 * slot, CORNERS[k][1] + OFF[t][1] + OUT[k][1] * 5 * slot];

  // Each team has one more player than there are boxes: two start in the first box,
  // so there is always someone in the next box to pass to.
  const teamPlayers = (t, start) => {
    const out = [0, 1, 2, 3].map(k => { const [x, y] = spot(t, k); return { id: t + k, team: t, x, y }; });
    const [x, y] = spot(t, start, 1); out.push({ id: t + 4, team: t, x, y });
    return out;
  };

  // A team going round the boxes: pass to the next box and follow your pass (to the back of that box).
  function team(t, dir, start) {
    const q = [0, 1, 2, 3].map(k => [t + k]);
    q[start].push(t + 4);
    let corner = start;
    return {
      get holder() { return q[corner][0]; },
      next() { return q[(corner + dir + 4) % 4][0]; },
      // passes + moves for one pass-and-follow; from: where the passer starts the pass (if they have moved, e.g. off the coach)
      round(from) {
        const a = corner, b = (corner + dir + 4) % 4;
        const passer = q[a].shift(), receiver = q[b][0];
        const moves = [{ id: passer, to: spot(t, b, q[b].length), start: 0.3, end: 0.95 }];
        q[a].forEach((id, i) => moves.push({ id, to: spot(t, a, i), start: 0.35, end: 0.75, arrow: false }));   // the next player steps up
        q[b].push(passer);
        corner = b;
        return { passes: [{ to: receiver, start: 0.05, end: 0.4 }], moves, receiver };
      },
      // the player on the ball takes a touch (into space, or to open up a blocked passing lane)
      touch(dx, dy) {
        const id = q[corner][0], [x, y] = spot(t, corner);
        return { id, to: [x + dx, y + dy], start: 0.1, end: 0.7 };
      },
      // inward = a touch towards the middle of the square, away from the cones
      inward() { const [x, y] = spot(t, corner); const d = Math.hypot(50 - x, 37.5 - y); return this.touch((50 - x) / d * 5, (37.5 - y) / d * 5); },
      // one-two with a middle player: pass in, step inside, get it back
      oneTwo(mid) {
        const h = q[corner][0], [x, y] = spot(t, corner), d = Math.hypot(50 - x, 37.5 - y);
        return { passes: [{ to: mid, start: 0.05, end: 0.35 }, { to: h, start: 0.55, end: 0.85 }],
          moves: [{ id: h, to: [x + (50 - x) / d * 6, y + (37.5 - y) / d * 6], start: 0.15, end: 0.55 }] };
      },
      // pass in to a middle player, who turns and plays it on to the next box; the passer still follows
      turn(mid) {
        const r = this.round();
        r.moves[0].start = 0.2;
        r.passes = [{ to: mid, start: 0.05, end: 0.32 }, { to: r.receiver, start: 0.55, end: 0.9 }];
        return r;
      },
    };
  }

  function rounds(teams, n, texts, extra) {
    const steps = [];
    for (let i = 0; i < n; i++) {
      const rs = teams.map(T => T.round());
      const step = { title: texts[i % texts.length][0], text: texts[i % texts.length][1], timing: { move: 3 }, moves: [] };
      rs.forEach((r, k) => { step[k ? 'passes' + (k + 1) : 'passes'] = r.passes; step.moves.push(...r.moves); });
      steps.push(Object.assign(step, extra ? extra(rs, i) : {}));
    }
    return steps;
  }

  const base = {
    plain: true, goals: [],
    areas: CORNERS.map(([x, y]) => ({ x: x - 10, y: y - 9, w: 20, h: 18, fill: 'rgba(240,205,110,0.18)' })),
    dims: [{ a: [22, 1.5], b: [78, 1.5], label: '20 yds' }],
    teamColors: C,
    facing: { g: 1, r: -1, c: 1 },
    keyPhrase: { big: 'PASS AND FOLLOW', small: 'Quality of touch, quality of pass' },
  };
  const greenOnly = Object.assign({}, base, {
    legendTeams: [{ label: 'Green', color: C.g }],
    players: teamPlayers('g', 0), ball: { owner: 'g0' },
  });
  const twoTeams = Object.assign({}, base, {
    legendTeams: [{ label: 'Green (clockwise)', color: C.g }, { label: 'Red (anti-clockwise)', color: C.r }],
    players: teamPlayers('g', 0).concat(teamPlayers('r', 2)), ball: { owner: 'g0' }, ball2: { owner: 'r2' },
  });

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'switching-play-square',
    draft: true,
    title: 'Switching Play: Pass and Follow',
    subtitle: 'Passing and movement',
    type: 'Technical',
    category: 'attacking',
    squad: [5, 20],
    thumb: 'assets/thumbs/switching-play-square.jpg',
    summary: 'Pass round a square and follow your pass. One team, then a second going the opposite way. Scan, move quickly, keep it to two touches.',
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
          { heading: 'Be aware', items: ['*Control into space*', 'Lane blocked? *Delay the pass* or *move the ball*', 'Watch for other balls and players running round'] },
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
      players: 'Teams of 5: one in every box, two in the first, so there is always someone to pass to. Start with one team, add a second going the opposite way; 3 or 4 teams also work. A coach or one or two players in the middle for the progression.',
      equipment: 'Cones for the square and boxes, a bib colour per team, a ball per team.',
      setup: [
        'Each team has a player in every box and two in its first box, so there is always someone to pass to. One ball per team.',
        'Pass round the square to your teammate in the next box, then follow your pass.',
        'Start with one team. Then add a second team going the opposite way. You can use 3 or 4 teams.',
        'Quality of touch, quality of pass. 2 touch: great. 3 touch: maybe needed. 4 touches: probably closed off in a game.',
        'With more than one team: control the ball into space. Make it game like: if it is congested or someone is blocking the passing lane, delay the pass or move the ball so you can play it.',
        'Once warm, get between the boxes quickly and join in play. Watch out for balls and players running round.',
        'Check your shoulders and scan for position, then scan again as the ball travels: the picture may have changed.',
        'Progression: one or two in the middle (a coach, or players if the numbers work). One-two off them before passing to the next box, or they turn and play on.',
      ],
    },

    questions: [
      'How many touches did you need? Could it be two?',
      'Did you check your shoulder before the ball arrived?',
      'What changed while the ball was travelling?',
      'When is the middle player available?',
      'Was the passing lane clear? If not, did you delay or move the ball?',
    ],

    clips: [
      Object.assign({}, greenOnly, {
        id: 'one-team',
        video: 'videos/switching-play-square-1.mp4',
        kicker: 'Clip 1 · one team',
        title: 'Pass and Follow',
        tagline: 'Pass to the next box, then follow your pass.',
        intro: ['A square with a box at each corner.', 'One team: a player in every box, *two in the first*.', 'Pass to the next box, then *follow your pass*.'],
        steps: [{ title: 'THE SET-UP', text: ['A player in every box, *two in the first*.', 'So there is *always someone to pass to*.'] }]
          .concat(rounds([team('g', +1, 0)], 4, [
            ['PASS AND FOLLOW', ['Pass to your teammate in the next box.', 'Then *follow your pass*.']],
            ['THE NEXT PLAYER STEPS UP', ['The next player in the box steps up.', 'There is always someone to pass to.']],
            ['KEEP IT MOVING', ['*Quality of touch*, *quality of pass*.', 'Two touch if you can.']],
            ['ALL THE WAY ROUND', ['Keep going round the square.']],
          ])),
        summary: ['Pass to the next box, then *follow your pass*.', 'Two in the first box: *always someone to pass to*.', '*Quality of touch*, *quality of pass*.'],
      }),

      Object.assign({}, twoTeams, {
        id: 'two-teams',
        video: 'videos/switching-play-square-2.mp4',
        kicker: 'Clip 2 · a second team',
        title: 'Add a Second Team',
        tagline: 'A second team goes the opposite way.',
        intro: ['Now add a *second team*, going the *opposite way*.', 'Green go clockwise, red go anti-clockwise.', 'You can use *3 or 4 teams* too.'],
        steps: [{ title: 'TWO TEAMS', text: ['Green go *clockwise*, red go *anti-clockwise*.', 'Each team has *two in its first box*.', 'You can add a *3rd or 4th team*.'] }]
          .concat((function () {
            const G = team('g', +1, 0), R = team('r', -1, 2);
            const s = rounds([G, R], 2, [
              ['OPPOSITE WAYS', ['Two balls, two directions.', 'Pass and follow.']],
              ['WATCH OUT', ['Watch for the other ball and players running round.']],
            ]);
            const gi = G.inward(), ri = R.inward();
            s.push({ title: 'CONTROL INTO SPACE', text: ['First touch *into space*, away from the cones.', 'Set yourself for the next pass.'],
              tags: { [gi.id]: 'INTO SPACE', [ri.id]: 'INTO SPACE' }, timing: { move: 2.2 }, moves: [gi, ri] });
            s.push(...rounds([G, R], 1, [['QUALITY', ['*Quality of touch*, *quality of pass*.']]]));
            // the lane is busy: red plays on, green moves the ball to open the lane, then passes
            const gm = G.touch(0, 0), r = R.round();
            const [hx, hy] = gm.to; gm.to = [hx + (hx < 50 ? 4 : -4), hy + (hy < 37 ? 4 : -4)];
            s.push({ title: 'LANE BLOCKED? DELAY OR MOVE IT', text: ['Make it *game like*.', 'Players in the way? *Delay the pass*...', '...or *move the ball* so you can play it.'],
              tags: { [gm.id]: 'MOVE IT' }, timing: { move: 3 }, moves: [gm, ...r.moves], passes2: r.passes });
            s.push(...rounds([G, R], 1, [['THEN PLAY IT', ['Lane open: *now play the pass*.', 'Then follow it.']]]));
            return s;
          })()),
        summary: ['Second team goes the *opposite way*.', 'Watch for the other ball and players.', 'Use *3 or 4 teams* if you have the numbers.'],
      }),

      Object.assign({}, twoTeams, {
        id: 'scan',
        video: 'videos/switching-play-square-3.mp4',
        kicker: 'Clip 3 · once warm',
        title: 'Scan and Join In',
        tagline: 'Check your shoulders, get there quickly, two touch.',
        timing: { stepIn: 0.5, arrows: 1.2, read: 0.8, move: 2.4, hold: 0.9 },
        intro: ['Once warm: *get between the boxes quickly*.', '*Check your shoulders* before the ball arrives.', 'Two touch: great. Four touches: closed off in a game.'],
        steps: rounds([team('g', +1, 0), team('r', -1, 2)], 4, [
          ['SCAN, THEN RECEIVE', ['*Check your shoulders*: who is around you?', 'Scan again as the ball travels.']],
          ['GET THERE QUICKLY', ['Follow your pass *at speed*.', 'Join in play: be ready for the next one.']],
          ['TWO TOUCH', ['Control, pass. *Two touches*.', 'Three if you need it. Four: closed off in a game.']],
          ['WATCH OUT', ['Other balls and players are running round.', 'The picture may have changed.']],
        ], rs => ({ tags: Object.fromEntries(rs.map(r => [r.receiver, 'SCAN'])), timing: { move: 2.4 } })),
        summary: ['*Scan*, then scan again as the ball travels.', 'Get between the boxes *quickly*.', '*Two touch*: great.'],
      }),

      Object.assign({}, twoTeams, {
        id: 'coach',
        video: 'videos/switching-play-square-4.mp4',
        kicker: 'Progression · players in the middle',
        title: 'Play Off the Middle',
        tagline: 'One or two in the middle: a coach, or players if the numbers work.',
        legendTeams: [{ label: 'Green', color: C.g }, { label: 'Red', color: C.r }, { label: 'Middle', color: C.c }],
        players: twoTeams.players.concat({ id: 'm1', team: 'c', label: 'M', x: 41, y: 31 }, { id: 'm2', team: 'c', label: 'M', x: 59, y: 44 }),
        intro: ['Progression: *one or two in the middle*.', 'A coach, or players if the numbers work.', '*One-two* off them, or they *turn* and play on.'],
        steps: (function () {
          const G = team('g', +1, 0), R = team('r', -1, 2);
          const s = [{ title: 'ONE OR TWO IN THE MIDDLE', text: ['A *coach* or a *player* in the middle.', 'Use *two* if the numbers work.', 'Use them when they are available.'] }];
          // green: one-two off m1, then pass on. red: in to m2, who turns and plays on to the next box.
          const add = (title, text, tags, gx, rx) => s.push(Object.assign({ title, text, tags, timing: { move: 3.2 }, moves: [...gx.moves, ...rx.moves] },
            gx.passes ? { passes: gx.passes } : {}, rx.passes ? { passes2: rx.passes } : {}));
          let g = G.oneTwo('m1'), r = R.round();
          add('ONE-TWO', ['Green: *one-two* with the middle player...', '...step inside and get it back.'], { m1: 'ONE-TWO' }, g, r);
          g = G.round(); r = R.turn('m2');
          add('THEN THE NEXT BOX', ['Green: now pass on to the next box and follow.', 'Red: in to the middle, who *turns* and plays on.'], { m2: 'TURN' }, g, r);
          g = G.round(); r = R.oneTwo('m1');
          add('MIX IT UP', ['Red: *one-two* off the middle this time.', 'Green: pass and follow.'], { m1: 'ONE-TWO' }, g, r);
          g = G.turn('m2'); r = R.round();
          add('TURN AND PLAY ON', ['Green: in to the middle, who *turns*...', '...and plays it on to the next box.', 'Red: pass on and follow.'], { m2: 'TURN' }, g, r);
          return s;
        })(),
        summary: ['A coach or players in the middle: *one or two*.', '*One-two*, then on to the next box.', 'Or the middle player *turns* and plays on.'],
      }),
    ],
  });
})();
