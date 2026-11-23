/*
 * SESSION (DRAFT): The 5 Y's: Passing & Shooting (Attacking · passing and finishing)
 * From the owner's own session plan. draft: true keeps it off the site until approved (index.html?drafts#y-passing).
 *
 * Cones in a Y: a start cone (the queue, every player with a ball), a middle cone, and two top cones either side, just
 * outside the box. Five passing patterns; each ends with a pass through to around the edge of the box and a shot.
 * No goal? The last player passes back to the start of the queue instead, and everyone follows their pass.
 * Pitch units: x 0..100, y 0..75. Goal at the TOP. Green attack it.
 */
(function () {
  const GOAL = [50, -2];
  const CONES = { S: [50, 66], M: [50, 47], L: [35, 31], R: [65, 31] };
  // where each player stands (just behind their cone)
  const AT = { s1: [50, 70], s2: [45, 72.5], s3: [40, 74], m: [50, 51], l: [35, 35], r: [65, 35] };
  const players = [
    { id: 'gk', team: 'k', label: 'GK', x: 50, y: 3 },
    ...['s1', 's2', 's3', 'm', 'l', 'r'].map(id => ({ id, team: 'a', x: AT[id][0], y: AT[id][1], ball: /^s[23]$/.test(id) })),
  ];
  const common = {
    goals: [[50, 'top']],
    marks: [{ x: 18, y: 0, w: 64, h: 22 }, { x: 36, y: 0, w: 28, h: 8 }],
    cones: Object.values(CONES).map(at => ({ at })),
    facing: { a: -1 },
    legend: { a: 'Players', k: 'Keeper' },
    players,
    ball: { owner: 's1' },
    keyPhrase: { big: 'OPEN UP, THEN PLAY', small: 'Body shape, weight of pass, then finish' },
  };
  // touch out of your feet, then shoot
  const shoot = (id, touch, aimX, text) => ({
    title: 'TOUCH AND SHOT',
    text: text || ['*Touch* it out of your feet...', '...then *shoot*. Hit the target.'],
    tags: { [id]: 'SHOOT' }, shot: GOAL, timing: { move: 2.6 },
    moves: [{ id, to: touch, end: 0.5 }, { id: 'gk', to: [50 + (touch[0] - 50) * 0.25, 4], start: 0.2, end: 0.55, arrow: false }],
    ball: { to: [aimX, -2.5], start: 0.58, end: 0.82 },
  });
  // show short and set back: the first 1-2 (clips 3, 4 and 5)
  const showShort = {
    title: 'SHOW SHORT, SET BACK',
    text: ['Middle player *moves away from the cone*: get separation.', 'Then *shows short*. *Firm* pass in, *soft* set back.', 'The first *one-two*.'],
    tags: { m: 'SHOW SHORT', s1: 'FIRM' }, timing: { move: 3.4 },
    moves: [{ id: 'm', path: [[47, 46], [43, 53]], end: 0.45 }, { id: 's1', to: [50, 64], start: 0.55, end: 0.9 }],
    passes: [{ to: 'm', start: 0.3, end: 0.55 }, { to: 's1', start: 0.65, end: 0.88 }],
  };
  const setUp = {
    title: 'THE SET-UP',
    text: ['Cones in a *Y*: start, middle, and two at the top.', 'Everyone in the queue has a ball.', 'Each pattern ends with a *shot*.'],
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'y-passing',
    draft: true,
    title: 'The 5 Y\'s: Passing & Shooting',
    subtitle: 'Passing patterns and finishing',
    type: 'Technical',
    category: 'attacking',
    squad: [5, 12],
    thumb: 'assets/thumbs/y-passing.jpg',
    summary: 'Five passing patterns on a Y of cones, each ending with a pass through to the edge of the box and a shot. Body shape, weight of pass, varied distances.',
    keyPhrase: 'Open up, then play',
    ages: { from: 10 },

    cards: [
      {
        title: 'Receiving',
        lead: '*Body shape* before the ball arrives.',
        columns: [
          { heading: 'Open up', items: ['*Half-turned*: see the ball and where you are going next', 'Receive on your *back foot*', 'First touch *away from the cone*'] },
          { heading: 'Move first', items: ['*Move away from the cone*: get separation', 'Then show short or open up', 'Play up to the *opposite side*: same side gets tight'] },
        ],
        phrase: { big: 'OPEN UP, THEN PLAY', small: 'Body shape, weight of pass, then finish' },
      },
      {
        title: 'Passing',
        lead: 'The right *weight* for the right pass.',
        columns: [
          { heading: 'Weight', items: ['*Firm* into feet', '*Soft* set back: easy to play first time', 'Through ball *into the run*, not to feet'] },
          { heading: 'Distance', items: ['Short sets, *longer passes* up the Y', 'Mix it up: move the cones', 'Finish: *hit the target*'] },
        ],
      },
    ],

    keywords: [
      { word: 'Back foot', meaning: 'The foot furthest from the ball. Receiving on it opens you up to play forward.' },
      { word: 'Show short', meaning: 'Come towards the ball to make an angle for the pass.' },
      { word: 'Set back', meaning: 'A soft pass back to the player who passed to you, so they can play it first time.' },
      { word: 'One-two', meaning: 'Pass, run, and get the ball straight back.' },
      { word: 'Through ball', meaning: 'A pass into space in front of a runner, for them to run onto.' },
    ],

    training: {
      area: 'A Y of cones in front of the goal: start cone about 35 yards out, middle cone about 15 yards up, top cones either side just outside the box.',
      players: '5 to 12 players: a queue at the start (each with a ball), one at the middle cone and one at each top cone. A keeper.',
      equipment: 'A goal, 4 cones, plenty of balls in the queue.',
      setup: [
        'Play the pattern, finish with a pass through to around the edge of the box and a shot.',
        'Follow your pass: start goes to middle, middle goes to the top, the shooter collects their ball and joins the back of the queue.',
        'No goal? The last player passes back to the start of the queue instead, and the rotation keeps going.',
        'Middle player: move away from the cone first (like losing a defender). Get separation, then receive.',
        'Body shape: open up and receive on the back foot.',
        'The pass up to the top is always to the opposite side, from the middle player or after the set back. Same side gets tight and is easy to defend.',
        'Weight of pass: firm into feet, soft set backs, through balls into the run.',
        'Alternate the direction: the next player goes the other way.',
        'Vary the passing distances: move the cones in or out. Go both ways (left and right).',
        'Patterns: 1. Back-foot control. 2. One-two outside the cone. 3. Two one-twos, run under the cone. 4. Two one-twos, run outside the cone. 5. Two one-twos and a through ball.',
      ],
    },

    questions: [
      'Were you open before the ball arrived?',
      'Which passes needed to be firm? Which soft?',
      'Did your through ball go to feet or into the run?',
      'When did you start your run?',
    ],

    clips: [
      // ---------------- 1 ----------------
      Object.assign({}, common, {
        id: 'back-foot',
        video: 'videos/y-passing-1.mp4',
        kicker: 'Y 1',
        title: 'Back-Foot Control',
        tagline: 'Move away, back foot, play to the opposite side.',
        intro: ['Middle player *moves away from the cone*.', '*Back-foot control*, open up...', '...and play to the *opposite side*. Then the other way.'],
        steps: [
          setUp,
          {
            title: 'MOVE AWAY FROM THE CONE',
            text: ['Treat the cone like a *defender*.', 'Move away from it: *get separation*.', '*Firm* pass in.'],
            tags: { m: 'MOVE AWAY', s1: 'FIRM' }, timing: { move: 3 },
            moves: [{ id: 'm', path: [[53, 46], [43, 51]], end: 0.55 }],
            passes: [{ to: 'm', start: 0.4, end: 0.85 }],
          },
          {
            title: 'BACK-FOOT CONTROL',
            text: ['Receive on your *back foot*.', 'Your body *opens up* to the other side.'],
            tags: { m: 'BACK FOOT' }, timing: { move: 2 },
            moves: [{ id: 'm', to: [46, 47], end: 0.7 }],
          },
          {
            title: 'PLAY TO THE OPPOSITE SIDE',
            text: ['Your movement *opened the passing lane*.', 'Play to the top player on the *opposite side*.', 'Not the closest player: that side is tight.'],
            tags: { m: 'FIRM', r: 'OPEN UP' }, timing: { move: 2.6 },
            passes: [{ to: 'r', start: 0.05, end: 0.6 }],
          },
          shoot('r', [59, 23], 48),
          {
            title: 'FOLLOW YOUR PASS',
            text: ['Start goes to the middle. Middle goes to the top.', 'The shooter gets their ball and joins the *back of the queue*.'],
            timing: { move: 3 },
            moves: [
              { id: 's1', to: AT.m, end: 0.8 }, { id: 'm', to: AT.r, end: 0.8 },
              { id: 'r', path: [[78, 40], [36, 74]], end: 1, arrow: false },
              { id: 's2', to: AT.s1, start: 0.3, end: 0.8, arrow: false }, { id: 's3', to: AT.s2, start: 0.3, end: 0.8, arrow: false },
            ],
          },
          {
            title: 'NEXT PLAYER: THE OTHER WAY',
            text: ['*Alternate* the direction.', 'This time move away to the *other side*.'],
            tags: { s1: 'MOVE AWAY', s2: 'FIRM' }, timing: { move: 3 },
            ball: { give: 's2' },
            moves: [{ id: 's1', path: [[47, 46], [57, 51]], end: 0.55 }],
            passes: [{ to: 's1', start: 0.4, end: 0.85 }],
          },
          {
            title: 'BACK FOOT, OPPOSITE SIDE',
            text: ['*Back-foot control*, open up...', '...and play to the *opposite side*.'],
            tags: { s1: 'BACK FOOT' }, timing: { move: 3 },
            moves: [{ id: 's1', to: [54, 47], end: 0.45 }],
            passes: [{ to: 'l', start: 0.5, end: 1 }],
          },
          shoot('l', [41, 23], 52),
        ],
        summary: ['*Move away from the cone*: separation.', '*Back-foot control*: open up.', 'Play to the *opposite side*. Alternate each go.'],
      }),

      // ---------------- 2 ----------------
      Object.assign({}, common, {
        id: 'one-two-outside',
        video: 'videos/y-passing-2.mp4',
        kicker: 'Y 2',
        title: 'One-Two Outside',
        tagline: 'Opposite side, one-two outside, through ball.',
        intro: ['Move away, then play up to the *opposite side*.', '*One-two*: get it back outside the cone.', 'Through ball, *touch and shot*.'],
        steps: [
          setUp,
          {
            title: 'MOVE AWAY, PASS IN',
            text: ['Middle player *moves away from the cone*.', '*Firm* pass in.'],
            tags: { m: 'MOVE AWAY', s1: 'FIRM' }, timing: { move: 3 },
            moves: [{ id: 'm', path: [[53, 46], [43, 51]], end: 0.55 }],
            passes: [{ to: 'm', start: 0.4, end: 0.85 }],
          },
          {
            title: 'PLAY UP, RUN OUTSIDE',
            text: ['*Back foot*, open up, play to the *opposite side*.', 'Then run *outside the cone*.'],
            tags: { m: 'BACK FOOT' }, timing: { move: 3 },
            passes: [{ to: 'r', start: 0.05, end: 0.5 }],
            moves: [{ id: 'm', path: [[42, 45], [48, 40]], start: 0.45, end: 1 }],
          },
          {
            title: 'SET BACK',
            text: ['A *soft* set back...', '...into the run, outside the cone.'],
            tags: { r: 'SET' }, timing: { move: 2.2 },
            passes: [{ to: 'm', start: 0.05, end: 0.6 }],
            moves: [{ id: 'm', to: [51, 38], end: 0.6 }],
          },
          {
            title: 'THROUGH BALL',
            text: ['Top player *spins* in behind.', 'Through ball *into the run*, not to feet.'],
            tags: { r: 'RUN', m: 'THROUGH BALL' }, timing: { move: 3 },
            moves: [{ id: 'r', path: [[69, 28], [62, 23]], end: 0.85 }],
            passes: [{ to: 'r', start: 0.3, end: 0.85 }],
          },
          shoot('r', [58, 20], 48),
        ],
        summary: ['Move away, play to the *opposite side*.', 'Run *outside the cone*: *soft* set back.', 'Through ball *into the run*, touch and shot.'],
      }),

      // ---------------- 3 ----------------
      Object.assign({}, common, {
        id: 'two-one-twos-under',
        video: 'videos/y-passing-3.mp4',
        kicker: 'Y 3 · two one-twos',
        title: 'Run Under the Cone',
        tagline: 'Set back, opposite side, run under the cone.',
        intro: ['Move away from the cone, *set back*.', 'Pass up to the *opposite side*.', 'Then run *under* the cone, not round the outside.'],
        steps: [
          setUp,
          showShort,
          {
            title: 'UP TO THE OPPOSITE SIDE',
            text: ['The set back opens up the *opposite side*.', 'Same side gets *tight*: easy to defend.', 'Middle player runs *under* the cone.'],
            tags: { s1: 'FIRM', m: 'UNDER' }, timing: { move: 3 },
            passes: [{ to: 'r', start: 0.05, end: 0.55 }],
            moves: [{ id: 'm', path: [[50, 44], [58, 38]], start: 0.25, end: 0.9 }],
          },
          {
            title: 'SECOND ONE-TWO',
            text: ['*Soft* set back into the run.', 'The opposite top player *makes a run*.'],
            tags: { r: 'SET', l: 'RUN' }, timing: { move: 2.6 },
            passes: [{ to: 'm', start: 0.05, end: 0.45 }],
            moves: [{ id: 'l', path: [[40, 28], [47, 24]], start: 0.2, end: 0.95 }],
          },
          {
            title: 'THROUGH BALL',
            text: ['Through ball *into the run*.'],
            tags: { m: 'THROUGH BALL' }, timing: { move: 2.4 },
            moves: [{ id: 'l', to: [50, 21], end: 0.7 }],
            passes: [{ to: 'l', start: 0.1, end: 0.7 }],
          },
          shoot('l', [50, 17], 52.5),
        ],
        summary: ['Move away, *set back*.', 'Up to the *opposite side*, run *under* the cone.', 'Second one-two, through ball, *shot*.'],
      }),

      // ---------------- 4 ----------------
      Object.assign({}, common, {
        id: 'two-one-twos-outside',
        video: 'videos/y-passing-4.mp4',
        kicker: 'Y 4 · two one-twos',
        title: 'Run Outside the Cone',
        tagline: 'Set it back, then spin round the outside.',
        intro: ['Move away, *set back*, up to the *opposite side*.', 'Top player *sets it back* to the middle...', '...then runs *outside* the cone for the through ball.'],
        steps: [
          setUp,
          showShort,
          {
            title: 'UP TO THE OPPOSITE SIDE',
            text: ['*Longer pass* up to the *opposite side*.', 'Middle player comes in to *join in*.'],
            tags: { s1: 'FIRM', m: 'UNDER' }, timing: { move: 3 },
            passes: [{ to: 'r', start: 0.05, end: 0.55 }],
            moves: [{ id: 'm', path: [[49, 45], [55, 41]], start: 0.25, end: 0.9 }],
          },
          {
            title: 'SET BACK TO THE MIDDLE',
            text: ['Top player *sets it back* to the middle player.', 'The defender is drawn to the ball...'],
            tags: { r: 'SET' }, timing: { move: 2.2 },
            passes: [{ to: 'm', start: 0.05, end: 0.5 }],
          },
          {
            title: 'RUN OUTSIDE THE CONE',
            text: ['...so *spin round the outside* of the cone.', 'Get *behind* your defender.', 'Through ball *into the run*.'],
            tags: { r: 'OUTSIDE', m: 'THROUGH BALL' }, timing: { move: 3.2 },
            moves: [{ id: 'r', path: [[71, 33], [70, 25], [62, 21]], end: 0.85 }, { id: 'l', path: [[38, 26], [44, 16]], start: 0.3, end: 1 }],
            passes: [{ to: 'r', start: 0.4, end: 0.85 }],
          },
          shoot('r', [58, 19], 47.5, ['*Touch* and *shoot*.', 'Opposite player follows in for the *rebound*.']),
        ],
        summary: ['Up to the *opposite side*.', 'Top player *sets back*, then runs *outside* the cone.', 'Through ball, *touch and shot*.'],
      }),

      // ---------------- 5 ----------------
      Object.assign({}, common, {
        id: 'through-ball',
        video: 'videos/y-passing-5.mp4',
        kicker: 'Y 5 · two one-twos',
        title: 'Through Ball',
        tagline: 'Come in under the cone, set inside, through ball for the run outside.',
        intro: ['Show short, set back.', 'Come in *under the cone* to join in.', '*Through ball* for the run outside the cone.'],
        steps: [
          setUp,
          showShort,
          {
            title: 'PLAY UP, COME IN',
            text: ['A *longer pass* up to the top cone.', 'Top player *comes in* to meet it.', 'Middle player comes *under the cone* to join in.'],
            tags: { r: 'COME SHORT', m: 'UNDER' }, timing: { move: 3 },
            passes: [{ to: 'r', start: 0.05, end: 0.6 }],
            moves: [{ id: 'r', to: [61, 37], start: 0.1, end: 0.6 }, { id: 'm', to: [54, 41], start: 0.3, end: 0.9 }],
          },
          {
            title: 'SET INSIDE',
            text: ['*Set it inside* for the one-two.', 'Opposite player runs *outside* their cone.'],
            tags: { r: 'SET', l: 'OUTSIDE' }, timing: { move: 2.6 },
            passes: [{ to: 'm', start: 0.05, end: 0.45 }],
            moves: [{ id: 'l', path: [[28, 30], [32, 22]], start: 0.25, end: 1 }],
          },
          {
            title: 'THROUGH BALL',
            text: ['Look up: *through ball* into the run.', 'Weight it so they run onto it.'],
            tags: { m: 'THROUGH BALL', l: 'RUN' }, timing: { move: 2.6 },
            moves: [{ id: 'l', to: [36, 20], end: 0.75 }],
            passes: [{ to: 'l', start: 0.1, end: 0.75 }],
          },
          shoot('l', [40, 17], 52.5),
        ],
        summary: ['Show short, *set back*.', 'Come in *under the cone*, set inside.', '*Through ball* for the run outside, touch and shot.'],
      }),

    ],
  });
})();
