/*
 * SESSION: Combination Play (Attacking · passing)
 * From a coach's own session plan.
 *
 * A 20 × 20-yard square split into four boxes (x 17.7–82.3, y 5.4–69.6; the middle lines at x 50 and y 37.5).
 * Four teams: black (bottom right), yellow (top right), green (top left), blue (bottom left).
 * Each team has 2 players in its box and 2 waiting at its outside corner.
 * Two balls at once, both going the same way round: one starts with black (bottom right), one with green (top left).
 * Black → yellow → green → blue → black. The steps are written for black's ball; green's ball does the same,
 * turned half way round the square (see mirror() at the bottom).
 * Rotation: whoever plays the long pass to the next corner drops out to their corner,
 * and the player who passed the ball in takes their place in the box.
 */
(function () {
  const C = { g: '#2fbf7f', y: '#e0a91b', b: '#3b9ae1', n: '#2b2b2b' };
  const X0 = 17.7, X1 = 50, X2 = 82.3, Y0 = 5.4, Y1 = 37.5, Y2 = 69.6;
  const common = {
    plain: true,
    goals: [],
    marks: [
      { x: X0, y: Y0, w: X1 - X0, h: Y1 - Y0 }, { x: X1, y: Y0, w: X2 - X1, h: Y1 - Y0 },
      { x: X0, y: Y1, w: X1 - X0, h: Y2 - Y1 }, { x: X1, y: Y1, w: X2 - X1, h: Y2 - Y1 },
    ],
    dims: [{ a: [4, Y0], b: [4, Y2], label: '20 yds' }],
    teamColors: C,
    facing: { n: -1, y: 1, g: 1, b: -1 },
    legendTeams: [{ label: 'Black', color: C.n }, { label: 'Yellow', color: C.y }, { label: 'Green', color: C.g }, { label: 'Blue', color: C.b }],
    timing: { stepIn: 0.5, arrows: 1.3, read: 0.9, move: 2.3, hold: 1.2 },
    keyPhrase: { big: 'MOVE, TALK, PASS', small: 'Movement, communication, quality of pass' },
  };
  const half = [
    { id: 'n1', team: 'n', x: 62, y: 58 }, { id: 'n2', team: 'n', x: 73, y: 47 },
    { id: 'nq1', team: 'n', x: 85.5, y: 72.5 }, { id: 'nq2', team: 'n', x: 90, y: 74.5 },
    { id: 'y1', team: 'y', x: 61, y: 16 }, { id: 'y2', team: 'y', x: 67, y: 27 },
    { id: 'yq1', team: 'y', x: 85.5, y: 2.5 }, { id: 'yq2', team: 'y', x: 90, y: 0.5 },
  ];
  // green and blue are black and yellow turned half way round the square
  const M = { n1: 'g1', n2: 'g2', nq1: 'gq1', nq2: 'gq2', y1: 'b1', y2: 'b2', yq1: 'bq1', yq2: 'bq2' };
  Object.keys(M).forEach(k => { M[M[k]] = k; });   // and back again
  const TEAM = { n: 'g', y: 'b' };
  const mir = p => [+(100 - p[0]).toFixed(1), +(75 - p[1]).toFixed(1)];
  const players = half.concat(half.map(p => { const [x, y] = mir([p.x, p.y]); return { id: M[p.id], team: TEAM[p.team], x, y }; }));

  // the long passer drops out to the back of the corner; the player who passed in takes their place
  const rotateBlack = (out, inTo) => ({
    title: 'ROTATE',
    text: ['Whoever played the *long pass* drops out to the corner.', 'The player who *passed it in* takes their place.'],
    tags: { [out]: 'OUT', nq1: 'IN' },
    moves: [
      { id: 'nq1', to: inTo, end: 0.5 },
      { id: out, to: [90, 74.5], start: 0.3 }, { id: 'nq2', to: [85.5, 72.5], start: 0.5 },
    ],
  });

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'combination-play',
    title: 'Combination Play',
    subtitle: 'Passing and movement',
    type: 'Technical',
    category: 'attacking',
    squad: [12, 20],
    thumb: 'assets/thumbs/combination-play.jpg',
    summary: 'Four teams round a 20-yard square: play in, combine, then a longer pass to the next corner. Rotate as you go.',
    keyPhrase: 'Move, talk, pass',
    ages: { from: 12 },

    cards: [
      {
        title: 'The pattern',
        lead: 'Play in, *combine*, then a longer pass to the *next corner*.',
        columns: [
          { heading: 'In the box', items: ['Set it to a teammate', 'Play a *one-two*', 'Show short, then play back out', 'Around the corner to the next box'] },
          { heading: 'Rotate', items: ['Whoever plays the *long pass* drops out', 'The player who *passed it in* takes their place', 'Teams stay in their box'] },
        ],
      },
      {
        title: 'Focus',
        lead: '*Movement, communication* and the *quality of the pass*.',
        columns: [
          { heading: 'Movement', items: ['Movement is *free*: don\'t always go to the same spot', '*Vary* your movement and your passes', 'Don\'t stand still: *create space*', 'Body shape: open to see the next pass'] },
          { heading: 'Sharpness', items: ['Talk: *communicate* between boxes', 'Can we play *one touch*?', 'Weight and accuracy of every pass'] },
        ],
        phrase: { big: 'MOVE, TALK, PASS', small: 'Movement, communication, quality of pass' },
      },
    ],

    keywords: [
      { word: 'Set', meaning: 'A short pass to a teammate who is facing the way you want to play.' },
      { word: 'One-two', meaning: 'Pass to a teammate and run; they pass it straight back into your run.' },
      { word: 'Show short', meaning: 'Coming towards the ball to receive, dragging your opponent with you.' },
      { word: 'Around the corner', meaning: 'A pass into the next box, to a player who plays it back.' },
      { word: 'Rotate', meaning: 'The long passer drops out; the player who passed in replaces them.' },
    ],

    training: {
      area: 'A 20 × 20-yard square, split into four 10-yard boxes.',
      players: 'Four teams of 4: 2 in each box and 2 waiting at its outside corner (16). Teams of 3 also work.',
      equipment: 'Cones for the square and boxes, bibs in four colours, a few balls at each corner.',
      setup: [
        'Each team has 2 players in its box and 2 at its outside corner. Two balls at once: start one at the bottom-right corner and one at the top-left, both going the same way round.',
        'The corner player passes into their box. The box players combine, then play a longer pass to the next team\'s corner.',
        'Rotate: whoever plays the long pass drops out to the corner; the player who passed it in takes their place. Teams stay in their own box.',
        'Movement is free: don\'t always go to the same spot. Vary the movement and the passes.',
        'Part 1: set it to a teammate, then the long pass.',
        'Part 2: a one-two in the box before the long pass.',
        'Part 3: one player shows short (dragging an opponent in a game) and bounces it back to the server, who stays put; the server passes to the second player, who sets it for the first player\'s second run to play long.',
        'Part 4: play around the corner to a player in the next box, who plays it back to the free player for the long pass. Can we play one touch?',
      ],
    },

    questions: [
      'Did you go to a different spot each time?',
      'Who told you where to pass? Did you talk?',
      'Was your body open to see the next pass?',
      'Could you have played it one touch?',
      'Was the long pass weighted for the next corner?',
    ],

    clips: [
      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'set-and-long',
        video: 'videos/combination-play-1.mp4',
        kicker: 'Part 1 · set, then long',
        title: 'Set and Play Long',
        tagline: 'Play in, set it, then a longer pass to the next corner.',
        intro: ['Four teams round a *20-yard square*, *two balls* at once.', 'Play in, *set* it, then a *long pass* to the next corner.', 'The long passer drops out; the player who passed in replaces them.'],
        players,
        ball: { owner: 'nq1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A 20-yard square, *four boxes*.', '2 players in each box, 2 at each corner.', '*Two balls*: bottom right and top left, both going the same way round.'],
          },
          {
            title: 'PLAY IN',
            text: ['The corner player passes *into the box*.', 'Move to receive: *anywhere*, not always the same spot.'],
            moves: [{ id: 'n2', to: [75, 56], end: 0.5 }],
            passes: [{ to: 'n2', start: 0.35, end: 0.8 }],
          },
          {
            title: 'SET',
            text: ['*Set* it to your teammate.'],
            tags: { n2: 'SET' },
            moves: [{ id: 'n1', to: [64, 51], end: 0.5 }],
            passes: [{ to: 'n1', start: 0.3, end: 0.75 }],
          },
          {
            title: 'LONG PASS TO THE NEXT CORNER',
            text: ['A *longer pass* to the next team\'s corner.', 'Quality of pass: *weight and accuracy*.'],
            tags: { n1: 'LONG PASS' },
            timing: { move: 2.4 },
            passes: [{ to: 'yq1', start: 0, end: 0.75 }],
          },
          rotateBlack('n1', [66, 62]),
          {
            title: 'NEXT TEAMS: PLAY IN AND SET',
            text: ['Yellow and blue go: play in and set.', 'Different spots this time: *movement is free*.'],
            tags: { y1: 'SET' },
            timing: { move: 3 },
            moves: [{ id: 'y1', to: [60, 11], end: 0.35 }, { id: 'y2', to: [71, 23], start: 0.3, end: 0.65 }],
            passes: [{ to: 'y1', start: 0.15, end: 0.4 }, { to: 'y2', start: 0.55, end: 0.8 }],
          },
          {
            title: 'LONG PASS',
            text: ['On to the *next corner*.'],
            tags: { y2: 'LONG PASS' },
            timing: { move: 2.4 },
            passes: [{ to: 'gq2', start: 0, end: 0.75 }],   // green's new front-of-corner player (gq1 went into the box)
          },
          {
            title: 'ROTATE',
            text: ['Long passer *out*, the player who passed in *in*.', 'And on round the square.'],
            tags: { y2: 'OUT', yq1: 'IN' },
            moves: [{ id: 'yq1', to: [64, 18], end: 0.5 }, { id: 'y2', to: [90, 0.5], start: 0.3 }, { id: 'yq2', to: [85.5, 2.5], start: 0.5 }],
          },
        ],
        summary: ['Play in, *set* it, *long pass* to the next corner.', 'Long passer *out*, passer-in *in*.', 'Movement is free: *vary it*.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'one-two',
        video: 'videos/combination-play-2.mp4',
        kicker: 'Part 2 · one-two in the box',
        title: 'One-Two in the Box',
        tagline: 'Play a one-two in the box before the long pass.',
        intro: ['Same as part 1.', 'Now play a *one-two* in the box first.', '*Vary* your movement. Don\'t stand still.'],
        players,
        ball: { owner: 'nq1' },
        steps: [
          {
            title: 'PLAY IN',
            text: ['Show for the ball and receive.'],
            moves: [{ id: 'n1', to: [63, 61], end: 0.5 }],
            passes: [{ to: 'n1', start: 0.35, end: 0.8 }],
          },
          {
            title: 'ONE-TWO',
            text: ['Pass and *move*.', 'It comes straight back *into your run*.'],
            tags: { n1: 'ONE-TWO' },
            timing: { move: 2.8 },
            moves: [{ id: 'n2', to: [71, 49], end: 0.3 }, { id: 'n1', to: [66, 47], start: 0.3, end: 0.8 }],
            passes: [{ to: 'n2', start: 0.05, end: 0.35 }, { to: 'n1', start: 0.55, end: 0.85 }],
          },
          {
            title: 'CARRY, THEN PLAY LONG',
            text: ['Take it on, then the *long pass* to the next corner.'],
            tags: { n1: 'LONG PASS' },
            timing: { move: 2.8 },
            moves: [{ id: 'n1', to: [70, 43], end: 0.4 }],
            passes: [{ to: 'yq1', start: 0.45, end: 0.95 }],
          },
          rotateBlack('n1', [64, 60]),
        ],
        summary: ['Play in, then a *one-two*.', '*Vary* the movement: don\'t stand still.', 'Long pass, then *rotate*.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'show-short',
        video: 'videos/combination-play-3.mp4',
        kicker: 'Part 3 · show short, back to the server',
        title: 'Show Short',
        tagline: 'Show short, back to the server, then set for the second run.',
        intro: ['One player *shows short*, dragging an opponent in a game.', 'They bounce it *back to the server*, who stays put.', 'The server finds player 2, who *sets* it for the first player\'s *second run*.'],
        players,
        ball: { owner: 'nq1' },
        steps: [
          {
            title: 'SHOW SHORT',
            text: ['Come *short* to the ball.', 'In a game, you drag your opponent with you.'],
            tags: { n1: 'SHOW' },
            moves: [{ id: 'n1', to: [75, 63], end: 0.5 }],
            passes: [{ to: 'n1', start: 0.4, end: 0.8 }],
          },
          {
            title: 'BACK TO THE SERVER',
            text: ['Bounce it *back out* to the server.', 'The server *stays where they are*.'],
            passes: [{ to: 'nq1', start: 0.1, end: 0.5 }],
          },
          {
            title: 'IN TO PLAYER 2',
            text: ['The server plays it in to *player 2*.', 'The first player makes a *second run*.'],
            moves: [{ id: 'n2', to: [71, 45], end: 0.4 }, { id: 'n1', to: [62, 54], start: 0.15, end: 0.75 }],
            passes: [{ to: 'n2', start: 0.2, end: 0.6 }],
          },
          {
            title: 'SET FOR THE SECOND RUN',
            text: ['Player 2 *sets* it for the first player.'],
            tags: { n2: 'SET' },
            moves: [{ id: 'n1', to: [64, 51], end: 0.5 }],
            passes: [{ to: 'n1', start: 0.15, end: 0.55 }],
          },
          {
            title: 'LONG PASS',
            text: ['The *long pass* to the next corner.'],
            tags: { n1: 'LONG PASS' },
            timing: { move: 2.4 },
            passes: [{ to: 'yq1', start: 0, end: 0.75 }],
          },
          rotateBlack('n1', [68, 61]),
        ],
        summary: ['*Show short*, bounce it back to the server.', 'Server to player 2, who *sets* it.', 'First player\'s *second run*, then long.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'around-the-corner',
        video: 'videos/combination-play-4.mp4',
        kicker: 'Part 4 · around the corner',
        title: 'Around the Corner',
        tagline: 'Into the next box and back to the free player, then long.',
        intro: ['The receiver plays *around the corner* to a player in the next box.', 'They play it back to the *free player*.', 'Who plays the long pass. *One touch*?'],
        players,
        ball: { owner: 'nq1' },
        steps: [
          {
            title: 'PLAY IN',
            text: ['Receive in the box.'],
            moves: [{ id: 'n1', to: [65, 56], end: 0.5 }],
            passes: [{ to: 'n1', start: 0.35, end: 0.8 }],
          },
          {
            title: 'AROUND THE CORNER',
            text: ['Play it into the *next box*.', '*Communicate* between boxes.'],
            tags: { n1: 'AROUND THE CORNER' },
            moves: [{ id: 'y2', to: [67, 32], end: 0.45 }],
            passes: [{ to: 'y2', start: 0.35, end: 0.75 }],
          },
          {
            title: 'BACK TO THE FREE PLAYER',
            text: ['Back into the first box, to the *free player*.'],
            tags: { n2: 'FREE MAN' },
            moves: [{ id: 'n2', to: [76, 46], end: 0.45 }],
            passes: [{ to: 'n2', start: 0.35, end: 0.75 }],
          },
          {
            title: 'LONG PASS, ONE TOUCH',
            text: ['The free player plays the *long pass*.', '*One touch* if you can: sharpness.'],
            tags: { n2: 'LONG PASS' },
            timing: { move: 2.2 },
            passes: [{ to: 'yq1', start: 0, end: 0.75 }],
          },
          rotateBlack('n2', [72, 50]),
        ],
        summary: ['*Around the corner* into the next box.', 'Back to the *free player*.', 'Long pass, *one touch* if you can. Talk between boxes.'],
      }),
    ],
  });

  // Every step is written for black's ball; add green's ball doing the same, turned half way round the square
  function mirror(def) {
    const out = Object.assign({}, def);
    if (def.moves) out.moves = def.moves.concat(def.moves.map(m => Object.assign({}, m, { id: M[m.id], to: m.to && mir(m.to), path: m.path && m.path.map(mir) })));
    if (def.tags) { out.tags = Object.assign({}, def.tags); Object.keys(def.tags).forEach(id => { out.tags[M[id]] = def.tags[id]; }); }
    if (def.passes) out.passes2 = def.passes.map(p => Object.assign({}, p, { to: M[p.to] }));
    return out;
  }
  const session = window.SESSIONS[window.SESSIONS.length - 1];
  session.clips.forEach(c => { c.ball2 = { owner: 'gq1' }; c.steps = c.steps.map(mirror); });
})();
