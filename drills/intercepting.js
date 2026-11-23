/*
 * SESSION (DRAFT): Intercepting Passes: Read It, Nick It (Defending)
 * Newly written for the library. draft: true keeps it off the site until approved (index.html?drafts#intercepting).
 *
 * A small area with a mini goal at the bottom. A passer at the top plays in to an attacker, who has a defender behind them.
 * The defender stands side-on to see ball and player, reads the pass and steps in front to nick it (then dribbles over the
 * top line to score). If the pass is too good, they stay tight and stop the attacker turning.
 * Pitch units: x 0..100, y 0..75. The defender defends the mini goal at the BOTTOM.
 */
(function () {
  const common = {
    plain: true, goals: [],
    areas: [{ x: 22, y: 6, w: 56, h: 64, fill: 'rgba(240,205,110,0.10)' }],
    miniGoals: [{ at: [50, 70], angle: 180 }],
    dims: [{ a: [22, 3], b: [78, 3], label: '15 yds' }],
    legend: { a: 'Attackers', d: 'Defender' },
    players: [{ id: 'P', team: 'a', x: 38, y: 13 }, { id: 'A', team: 'a', x: 52, y: 37 }, { id: 'D', team: 'd', x: 56, y: 46 }],
    ball: { owner: 'P' },
    keyPhrase: { big: 'READ IT, NICK IT', small: 'See ball and player, then step in front' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'intercepting',
    draft: true,
    title: 'Intercepting Passes: Read It, Nick It',
    subtitle: 'Reading the game',
    type: 'Technical',
    category: 'defending',
    squad: [3, 12],
    thumb: 'assets/thumbs/intercepting.jpg',
    summary: 'See ball and player, read the pass and step in front to nick it. Too good a pass? Stay tight and stop them turning.',
    keyPhrase: 'Read it, nick it',
    ages: { from: 8 },

    cards: [
      {
        title: 'Read it',
        lead: 'Stand where you can *see the ball and the player*.',
        columns: [
          { heading: 'Where to stand', items: ['Goal-side, *a yard or two* off them', '*Side-on*: ball one way, player the other', 'On your toes'] },
          { heading: 'What to watch', items: ['Where is the passer *looking*?', 'Is the pass *slow* or *loose*?', 'That\'s your moment'] },
        ],
        phrase: { big: 'READ IT, NICK IT', small: 'See ball and player, then step in front' },
      },
      {
        title: 'Nick it, or stay tight',
        lead: 'Only go if you\'re *sure* you\'ll get there first.',
        columns: [
          { heading: 'Nick it', items: ['Step *in front* of the attacker', 'Take it with you', 'Go and score'] },
          { heading: 'Can\'t get it?', items: ['Don\'t dive in', 'Stay *tight* behind them', '*Stop them turning*: make them pass back'] },
        ],
      },
    ],

    keywords: [
      { word: 'Intercept', meaning: 'Step in and take a pass before it reaches the player it was meant for.' },
      { word: 'Side-on', meaning: 'Stand at an angle so you can see the ball and the player at the same time.' },
      { word: 'Goal-side', meaning: 'Between the attacker and the goal you are defending.' },
      { word: 'Stay tight', meaning: 'Stay close behind the attacker so they can\'t turn with the ball.' },
    ],

    training: {
      area: 'About 15 yards wide and 20 yards long, with a mini goal (or cone gate) at one end.',
      players: 'Groups of 3: a passer, an attacker and a defender. Rotate every 5 goes.',
      equipment: 'A mini goal or two cones, cones for the area, bibs, plenty of balls with the passer.',
      setup: [
        'The passer starts at the far end with the balls. The attacker stands in the middle, the defender just behind them.',
        'The passer plays in to the attacker. Mix it up: some firm passes, some slow or loose ones.',
        'Defender: side-on, see ball and player. If the pass is slow or loose, step in front and nick it.',
        'Nick it? Dribble over the passer\'s end line to score a point.',
        'Can\'t get there? Stay tight and stop them turning. If they turn, they can shoot at the mini goal.',
        'Make it harder: the attacker can move to lose the defender before the pass.',
      ],
    },

    questions: [
      'Could you see the ball and the attacker at the same time?',
      'How did you know the pass was coming?',
      'When did you decide to go for it?',
      'If you couldn\'t get it, what did you do?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'nick-it',
        video: 'videos/intercepting-1.mp4',
        kicker: 'Clip 1',
        title: 'Read It, Nick It',
        tagline: 'See ball and player, read the pass, step in front.',
        intro: ['A passer, an attacker and a defender.', 'Defender: *see the ball and the player*.', 'Read the pass and *nick it*.'],
        steps: [
          {
            title: 'SEE BALL AND PLAYER',
            text: ['Goal-side, *a yard or two* behind the attacker.', '*Side-on*: you can see the ball *and* the player.', 'On your toes.'],
            tags: { D: 'SEE BOTH' },
          },
          {
            title: 'READ IT',
            text: ['Watch the passer.', 'A *slow* pass? That\'s your moment.', 'Step *in front* and *nick it*.'],
            tags: { D: 'NICK IT' }, timing: { move: 3 },
            moves: [
              { id: 'D', path: [[50, 41], [49, 31]], start: 0.2, end: 0.7, ease: 'out' },
              { id: 'A', to: [52, 35], start: 0.3, end: 0.7, arrow: false },
            ],
            ball: { pass: 'D', start: 0.1, end: 0.72 },
          },
          {
            title: 'GO AND SCORE',
            text: ['Take it with you.', 'Dribble over the end line to *score*.'],
            tags: { D: 'GO!' }, timing: { move: 2.6 },
            moves: [{ id: 'D', to: [56, 7], end: 0.85 }, { id: 'A', to: [54, 16], start: 0.15, end: 0.9 }],
          },
        ],
        summary: ['*Side-on*: see ball and player.', '*Read* the pass.', 'Step in front and *nick it*.'],
      }),

      Object.assign({}, common, {
        id: 'stay-tight',
        video: 'videos/intercepting-2.mp4',
        kicker: 'Clip 2',
        title: 'Can\'t Nick It? Stay Tight',
        tagline: 'Too good a pass? Don\'t dive in: stop them turning.',
        intro: ['Not every pass can be nicked.', 'If you can\'t get there first, *don\'t dive in*.', 'Stay tight and *stop them turning*.'],
        steps: [
          {
            title: 'A GOOD PASS',
            text: ['A *firm* pass, straight to the attacker.', 'You won\'t get there first.', 'So get *tight* behind them instead.'],
            tags: { D: 'TIGHT' }, timing: { move: 2.6 },
            moves: [{ id: 'D', to: [53, 42], start: 0.15, end: 0.6 }],
            passes: [{ to: 'A', start: 0.05, end: 0.45 }],
          },
          {
            title: 'STOP THE TURN',
            text: ['They try to turn. *Move with them*.', 'Stay on your feet. Don\'t dive in.', 'They have to *pass back*.'],
            tags: { D: 'NO TURN' }, timing: { move: 3 },
            moves: [{ id: 'A', to: [47, 38], end: 0.45 }, { id: 'D', to: [48.5, 43], start: 0.05, end: 0.5 }],
            passes: [{ to: 'P', start: 0.55, end: 0.95 }],
          },
          {
            title: 'READY AGAIN',
            text: ['Drop off again: *side-on*, see both.', 'The attacker moves to get free.'],
            tags: { D: 'SEE BOTH' }, timing: { move: 2.4 },
            moves: [{ id: 'A', to: [58, 34], end: 0.8 }, { id: 'D', to: [61, 43], start: 0.15, end: 0.9 }],
          },
          {
            title: 'THIS ONE\'S SLOW',
            text: ['A *slow* pass this time.', 'Read it, step in front, *nick it*.'],
            tags: { D: 'NICK IT' }, timing: { move: 3 },
            moves: [
              { id: 'D', path: [[55, 38], [52, 28]], start: 0.2, end: 0.7, ease: 'out' },
              { id: 'A', to: [57, 32], start: 0.3, end: 0.7, arrow: false },
            ],
            ball: { pass: 'D', start: 0.1, end: 0.72 },
          },
        ],
        summary: ['Can\'t get there first? *Don\'t dive in*.', 'Stay tight: *stop them turning*.', 'Slow pass? *Nick it*.'],
      }),
    ],
  });
})();
