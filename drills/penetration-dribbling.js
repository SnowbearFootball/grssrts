/*
 * SESSION: Penetration via Dribbling (Attacking · principle of play)
 * From a coach's own session plan.
 *
 * Drill 1 (ball mastery): two lanes, players at both ends. Dribble to the middle, beat it with a move, change pace to the far
 * end. Cones first (unopposed), then a half-pace defender in the middle (semi-opposed).
 * Drill 2 (end zones, opposed): 4 attackers v 3 defenders, plus a keeper or defender who stays in the end zone. Score by
 * dribbling into the end zone. Defenders win it: they go the other way.
 * Pitch units: x 0..100, y 0..75.
 */
(function () {
  const G = '#2fbf7f';
  // ---------- drill 1: two lanes ----------
  const LANES = [30, 70];
  const laneCones = LANES.flatMap(x => [{ at: [x, 14] }, { at: [x, 62] }]);
  const mid = LANES.map(x => ({ at: [x, 38] }));
  // u* = going up (from the bottom), d* = coming down (from the top); L = left lane, R = right lane
  const lanePlayers = [
    { id: 'uL', team: 'a', x: 30, y: 66 }, { id: 'uL2', team: 'a', x: 30, y: 71, ball: true },
    { id: 'uR', team: 'a', x: 70, y: 66 }, { id: 'uR2', team: 'a', x: 70, y: 71, ball: true },
    { id: 'dL', team: 'b', x: 30, y: 10, ball: true }, { id: 'dL2', team: 'b', x: 30, y: 5, ball: true },
    { id: 'dR', team: 'b', x: 70, y: 10, ball: true }, { id: 'dR2', team: 'b', x: 70, y: 5, ball: true },
  ];
  const drill1 = {
    plain: true, goals: [],
    teamColors: { a: G, b: G },
    facing: { a: -1, b: 1 },
    legend: { a: 'Players', d: 'Defender' },
    ball: { owner: 'uL' }, ball2: { owner: 'uR' },
    keyPhrase: { big: 'HEAD UP, CHANGE OF PACE', small: 'Small touches in, big touch out' },
  };

  // ---------- drill 2: end zones ----------
  const zoneFill = 'rgba(217,98,43,0.10)';
  const drill2 = {
    plain: true, goals: [],
    areas: [
      { x: 20, y: 4, w: 60, h: 12, fill: zoneFill }, { x: 20, y: 16, w: 60, h: 22, fill: 'rgba(47,191,127,0.06)' },
      { x: 20, y: 38, w: 60, h: 22, fill: 'rgba(59,154,225,0.06)' }, { x: 20, y: 60, w: 60, h: 12, fill: zoneFill },
    ],
    legend: { a: 'Attackers', d: 'Defenders' },
    players: [
      { id: 'A1', team: 'a', x: 33, y: 31 }, { id: 'A2', team: 'a', x: 67, y: 31 },
      { id: 'A3', team: 'a', x: 33, y: 23 }, { id: 'A4', team: 'a', x: 67, y: 23 },
      { id: 'D1', team: 'd', x: 39, y: 45 }, { id: 'D2', team: 'd', x: 61, y: 45 }, { id: 'D3', team: 'd', x: 50, y: 53 },
      { id: 'gk', team: 'k', label: 'GK', x: 50, y: 66 },
    ],
    ball: { owner: 'A1' },
    keyPhrase: { big: 'FACE UP, GO PAST', small: 'Head up, scan, change of pace' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'penetration-dribbling',
    topics: ['Dribbling', 'Small-sided games'],
    title: 'Penetration via Dribbling',
    fromCoach: true,
    subtitle: 'Principle of Play: Attacking',
    type: 'Technical',
    category: 'attacking',
    squad: [8, 10],
    thumb: 'assets/thumbs/penetration-dribbling.jpg',
    summary: 'Beat your player with the ball. Ball mastery in two lanes, then 4 v 3 to an end zone. Face up, head up, change of pace.',
    keyPhrase: 'Face up, go past',
    ages: { from: 9 },

    cards: [
      {
        title: 'Drill 1: Ball Mastery: Beat Your Player',
        lead: 'Use *different parts of your foot*. *Small* touches, then a *big* one.',
        columns: [
          { heading: 'Moves', items: ['Sole roll', 'Inside / outside', 'Step over', 'Stop', 'Shoulder drop'] },
          { heading: 'Touches', items: ['*Small touches* as you get close', 'Do the move', '*Big touch* out and *change of pace*'] },
        ],
        phrase: { big: 'HEAD UP, CHANGE OF PACE', small: 'Small touches in, big touch out' },
      },
      {
        title: 'Drill 2: Penetration Overload: 4 v 3 to End Zones',
        lead: '*Face up* your defender and *go past them*.',
        columns: [
          { heading: 'Before', items: ['*Head up, scan*: where is the space?', '*Face up*: turn and run at them', 'Use the extra player: 4 v 3'] },
          { heading: 'Go', items: ['Make them commit', 'Move, then *change of pace*', 'Dribble into the *end zone*'] },
        ],
      },
    ],

    keywords: [
      { word: 'Penetration', meaning: 'Getting past defenders, towards and behind them.' },
      { word: 'Face up', meaning: 'Turn and run straight at your defender with the ball.' },
      { word: 'Change of pace', meaning: 'Go slow, then suddenly fast, to get away from a defender.' },
      { word: 'Overload', meaning: 'Having more players than the other team in an area: here, 4 v 3.' },
      { word: 'End zone', meaning: 'The area at the end of the pitch. Dribble into it to score.' },
    ],

    training: {
      area: 'Drill 1: two lanes about 25 yards long. Drill 2: about 30 × 40 yards, split into two halves with an end zone at each end.',
      players: '8 to 10 players. You can build the numbers up for the game.',
      equipment: 'Cones, bibs, a ball each for drill 1.',
      setup: [
        'Drill 1: two lanes, players at both ends, a cone in the middle. Dribble to the middle, beat the cone with a move, change of pace to the far end and join that queue.',
        'Moves: sole roll, inside / outside, step over, stop, shoulder drop. Small touches in, big touch out.',
        'Then semi-opposed: a defender in the middle at half pace. Face them up and go past.',
        'Drill 2: attackers start in their half, defenders in theirs. 4 v 3, plus a keeper or defender who stays in the end zone.',
        'Attackers score by dribbling into the end zone. If the defenders win it, they score by dribbling into the other end zone.',
        'Key coaching: face up, head up and scan, change of pace.',
      ],
    },

    questions: [
      'Which move worked best for you? Why?',
      'When did you speed up?',
      'Did you look up before you went?',
      'Where was the extra player in the 4 v 3?',
    ],

    clips: [
      // ---------------- drill 1a ----------------
      Object.assign({}, drill1, {
        id: 'beat-the-cone',
        video: 'videos/penetration-dribbling-1.mp4',
        kicker: 'Drill 1 · Ball mastery · unopposed',
        title: 'Beat Your Player',
        tagline: 'Small touches in, a move, then change of pace.',
        intro: ['Two lanes, players at *both ends*.', 'Dribble to the middle and *beat the cone* with a move.', '*Change of pace* to the far end.'],
        cones: laneCones.concat(mid),
        players: lanePlayers,
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Two lanes, a cone in the middle.', 'Players at *both ends*, a ball each.'],
          },
          {
            title: 'SMALL TOUCHES, HEAD UP',
            text: ['Dribble to the middle with *small touches*.', '*Head up*: see the cone coming.'],
            tags: { uL: 'HEAD UP', uR: 'HEAD UP' }, timing: { move: 2.6 },
            moves: [{ id: 'uL', to: [30, 46], end: 0.9 }, { id: 'uR', to: [70, 46], end: 0.9 }],
          },
          {
            title: 'DO A MOVE',
            text: ['Beat the cone with a *move*.', 'Step over one way, go the other.', 'Or drop your shoulder.'],
            tags: { uL: 'STEP OVER', uR: 'SHOULDER DROP' }, timing: { move: 2.4 },
            moves: [{ id: 'uL', path: [[28, 43], [35, 40], [35, 34]], end: 0.95 }, { id: 'uR', path: [[72, 43], [65, 40], [65, 34]], end: 0.95 }],
          },
          {
            title: 'CHANGE OF PACE',
            text: ['*Big touch* out...', '...and *speed up* to the far end.', 'Join that queue.'],
            tags: { uL: 'CHANGE OF PACE', uR: 'CHANGE OF PACE' }, timing: { move: 2.4 },
            moves: [
              { id: 'uL', to: [35, 8], end: 0.8 }, { id: 'uR', to: [65, 8], end: 0.8 },
              { id: 'dL', to: [30, 18], start: 0.6, end: 1, arrow: false }, { id: 'dR', to: [70, 18], start: 0.6, end: 1, arrow: false },
            ],
          },
          {
            title: 'NOW THE OTHER END',
            text: ['Players from the *other end* go.', 'Different moves: *sole roll*, *inside / outside*.'],
            tags: { dL: 'SOLE ROLL', dR: 'INSIDE-OUTSIDE' }, timing: { move: 4 },
            ball: { give: 'dL' }, ball2: { give: 'dR' },
            moves: [
              { id: 'dL', path: [[30, 31], [25, 34], [25, 42], [25, 66]], end: 0.95 },
              { id: 'dR', path: [[70, 31], [75, 34], [75, 42], [75, 66]], end: 0.95 },
            ],
          },
        ],
        summary: ['*Small touches* in, *head up*.', 'Beat the cone with a *move*.', '*Big touch*, *change of pace*.'],
      }),

      // ---------------- drill 1b ----------------
      Object.assign({}, drill1, {
        id: 'semi-opposed',
        video: 'videos/penetration-dribbling-2.mp4',
        kicker: 'Drill 1 · Ball mastery · semi-opposed',
        title: 'Semi-Opposed',
        tagline: 'A half-pace defender in the middle. Face up and go past.',
        intro: ['Now a *defender* in the middle.', 'Half pace: they make it real, but let you try.', '*Face up*, do a move, *change of pace*.'],
        cones: laneCones,
        players: lanePlayers.concat({ id: 'xL', team: 'd', x: 30, y: 36 }, { id: 'xR', team: 'd', x: 70, y: 36 }),
        steps: [
          {
            title: 'A DEFENDER IN THE MIDDLE',
            text: ['The cone becomes a *defender*.', 'Half pace: *semi-opposed*.'],
          },
          {
            title: 'FACE UP',
            text: ['Dribble straight *at* the defender.', '*Face them up*: make them stand still.'],
            tags: { uL: 'FACE UP', uR: 'FACE UP' }, timing: { move: 2.6 },
            moves: [
              { id: 'uL', to: [30, 47], end: 0.9 }, { id: 'uR', to: [70, 47], end: 0.9 },
              { id: 'xL', to: [30, 40], start: 0.3, end: 0.9 }, { id: 'xR', to: [70, 40], start: 0.3, end: 0.9 },
            ],
          },
          {
            title: 'MOVE, THEN GO',
            text: ['*Stop*, or *step over*.', 'When they shift, go the *other way*.'],
            tags: { uL: 'STOP', uR: 'STEP OVER' }, timing: { move: 2.6 },
            moves: [
              { id: 'uL', path: [[30, 46], [36, 42], [36, 34]], end: 0.95 }, { id: 'uR', path: [[72, 45], [64, 42], [64, 34]], end: 0.95 },
              { id: 'xL', to: [28, 40], start: 0.1, end: 0.5, arrow: false }, { id: 'xR', to: [72, 40], start: 0.1, end: 0.5, arrow: false },
            ],
          },
          {
            title: 'CHANGE OF PACE',
            text: ['*Big touch*, *speed up*.', 'Leave them behind.'],
            tags: { uL: 'CHANGE OF PACE', uR: 'CHANGE OF PACE' }, timing: { move: 2.4 },
            moves: [
              { id: 'uL', to: [35, 8], end: 0.8 }, { id: 'uR', to: [65, 8], end: 0.8 },
              { id: 'xL', to: [30, 36], start: 0.3, end: 0.9, arrow: false }, { id: 'xR', to: [70, 36], start: 0.3, end: 0.9, arrow: false },
            ],
          },
          {
            title: 'NOW THE OTHER END',
            text: ['Defenders turn to face the next one.', '*Shoulder drop*, *sole roll*: mix it up.'],
            tags: { dL: 'SHOULDER DROP', dR: 'SOLE ROLL' }, timing: { move: 4 },
            ball: { give: 'dL' }, ball2: { give: 'dR' },
            moves: [
              { id: 'dL', path: [[30, 26], [26, 30], [24, 40], [25, 66]], end: 0.95 },
              { id: 'dR', path: [[70, 26], [74, 30], [76, 40], [75, 66]], end: 0.95 },
              { id: 'xL', to: [30, 34], end: 0.3, arrow: false }, { id: 'xR', to: [70, 34], end: 0.3, arrow: false },
            ],
          },
        ],
        summary: ['*Face up* the defender.', 'Move: when they shift, *go the other way*.', '*Change of pace* past them.'],
      }),

      // ---------------- drill 2a ----------------
      Object.assign({}, drill2, {
        id: 'end-zones',
        video: 'videos/penetration-dribbling-3.mp4',
        kicker: 'Drill 2 · Penetration overload',
        title: '4 v 3 to End Zones',
        tagline: 'Use the overload, face up, dribble in to score.',
        intro: ['Attackers\' half, defenders\' half, an *end zone* at each end.', '*4 v 3*, plus a keeper or defender in the end zone.', 'Score by *dribbling into the end zone*.'],
        steps: [
          {
            title: 'THE SET-UP',
            text: ['4 attackers in their half. 3 defenders in theirs.', 'A *keeper or defender* stays in the end zone.'],
          },
          {
            title: 'FACE UP',
            text: ['Dribble *at* a defender.', '*Face them up*: make them commit.', 'Others move to *give options*.'],
            tags: { A1: 'FACE UP', D1: 'PRESS' }, timing: { move: 3 },
            moves: [
              { id: 'A1', to: [38, 41], end: 0.9 }, { id: 'D1', to: [39, 47], start: 0.2, end: 0.8 },
              { id: 'D3', to: [44, 52], start: 0.3, end: 0.9, arrow: false },
              { id: 'A2', to: [72, 40], start: 0.2, end: 0.95 }, { id: 'A3', to: [26, 38], start: 0.3, end: 0.95 },
              { id: 'A4', to: [58, 33], start: 0.3, end: 0.95 },
            ],
          },
          {
            title: 'HEAD UP, SCAN',
            text: ['*Head up*: where is the space?', 'The *4 v 3*: someone is free.', 'Play it to them.'],
            tags: { A1: 'HEAD UP', A2: 'FREE' }, timing: { move: 2.6 },
            passes: [{ to: 'A2', start: 0.1, end: 0.6 }],
            moves: [{ id: 'D2', to: [66, 47], start: 0.4, end: 0.95 }, { id: 'D3', to: [55, 54], start: 0.4, end: 0.95, arrow: false }],
          },
          {
            title: 'GO PAST',
            text: ['*Face up* the defender...', '...a move, then *change of pace*.'],
            tags: { A2: 'CHANGE OF PACE' }, timing: { move: 3 },
            moves: [
              { id: 'A2', path: [[71, 44], [76, 50], [70, 58]], end: 0.95 },
              { id: 'D2', to: [69, 48], end: 0.4, arrow: false }, { id: 'gk', to: [60, 65], start: 0.4, end: 0.9, arrow: false },
            ],
          },
          {
            title: 'DRIBBLE IN TO SCORE',
            text: ['Into the *end zone* with the ball.', 'That\'s a *goal*.'],
            tags: { A2: 'SCORE' }, timing: { move: 2 },
            moves: [{ id: 'A2', to: [67, 66], end: 0.8 }, { id: 'gk', to: [63, 66], end: 0.8, arrow: false }],
          },
        ],
        summary: ['*Face up*: make them commit.', '*Head up*: find the free player.', '*Change of pace*, dribble into the end zone.'],
      }),

      // ---------------- drill 2b ----------------
      Object.assign({}, drill2, {
        id: 'other-way',
        video: 'videos/penetration-dribbling-4.mp4',
        kicker: 'Drill 2 · Penetration overload · both ways',
        title: 'Win It and Go',
        tagline: 'Defenders win it: dribble into the other end zone.',
        intro: ['The game goes *both ways*.', 'Defenders win it...', '...and dribble into the *other end zone*.'],
        steps: [
          {
            title: 'ATTACKER FACES UP',
            text: ['An attacker runs at the defenders.'],
            tags: { A1: 'FACE UP' }, timing: { move: 2.6 },
            moves: [{ id: 'A1', to: [40, 42], end: 0.9 }, { id: 'D1', to: [41, 46], start: 0.2, end: 0.9 }],
          },
          {
            title: 'DEFENDER WINS IT',
            text: ['A heavy touch: the defender *wins it*.'],
            tags: { D1: 'WON IT!' }, timing: { move: 1.8 },
            moves: [{ id: 'A1', to: [41, 44], end: 0.4 }],
            ball: { pass: 'D1', start: 0.3, end: 0.55, arrow: false },
          },
          {
            title: 'NOW THEY ATTACK',
            text: ['*Head up*, *change of pace*.', 'Dribble into the *other end zone*.', 'Attackers: get back and stop them.'],
            tags: { D1: 'CHANGE OF PACE' }, timing: { move: 3.4 },
            moves: [
              { id: 'D1', path: [[44, 36], [52, 24], [52, 10]], end: 0.95 },
              { id: 'A1', to: [47, 30], start: 0.15, end: 0.95 }, { id: 'A4', to: [56, 16], start: 0.1, end: 0.95 },
              { id: 'A2', to: [62, 28], start: 0.2, end: 0.95, arrow: false },
            ],
          },
        ],
        summary: ['The game goes *both ways*.', 'Win it, *head up*, go.', 'Dribble into the *other end zone*.'],
      }),
    ],
  });
})();
