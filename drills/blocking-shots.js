/*
 * SESSION (DRAFT): Blocking Shots: Get In the Way (Defending)
 * Newly written for the library. draft: true keeps it off the site until approved (index.html?drafts#blocking-shots).
 *
 * A goal with a keeper. An attacker dribbles in to shoot; a defender starts by the post, sprints out, gets in line between
 * ball and goal and blocks the shot: side-on, arms in, eyes open, on their feet. Progression: block the near post and let
 * the keeper have the far post.
 * Pitch units: x 0..100, y 0..75. The goal is at the BOTTOM. Blue defends it; green attacks it.
 */
(function () {
  const common = {
    goals: [[50, 'bottom']],
    marks: [{ x: 18, y: 53, w: 64, h: 22 }, { x: 36, y: 67, w: 28, h: 8 }],
    legend: { a: 'Attacker', d: 'Defender' },
    keyPhrase: { big: 'GET IN THE WAY', small: 'Close them down, get big, stay on your feet' },
  };
  const GK = { id: 'gk', team: 'k', label: 'GK', x: 50, y: 73 };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'blocking-shots',
    topics: ['Shape'],
    draft: true,
    title: 'Blocking Shots: Get In the Way',
    subtitle: 'Stopping shots',
    type: 'Technical',
    category: 'defending',
    squad: [3, 12],
    thumb: 'assets/thumbs/blocking-shots.jpg',
    summary: 'Close the shooter down, get in line with the goal and block it: side-on, arms in, eyes open, stay on your feet.',
    keyPhrase: 'Get in the way',
    ages: { from: 8 },

    cards: [
      {
        title: 'Close down',
        lead: 'Get *between the ball and the goal*, quickly.',
        columns: [
          { heading: 'Go', items: ['*Sprint* out as soon as they get the ball', 'Run the line between ball and goal', '*Slow down* as you get close'] },
          { heading: 'Block', items: ['*Side-on*, get big', 'Arms *in* (no handball)', '*Eyes open*, on your feet'] },
        ],
        phrase: { big: 'GET IN THE WAY', small: 'Close them down, get big, stay on your feet' },
      },
      {
        title: 'You and your keeper',
        lead: 'Block *one side*. Your keeper has the *other*.',
        columns: [
          { heading: 'Defender', items: ['Block the *near post*', 'Don\'t turn your back', 'Don\'t dive in: they\'ll go round you'] },
          { heading: 'Keeper', items: ['Cover the *far post*', '*Talk*: "near post!"', 'Ready for the rebound'] },
        ],
      },
    ],

    keywords: [
      { word: 'Block', meaning: 'Get your body in the way of a shot so it can\'t reach the goal.' },
      { word: 'Close down', meaning: 'Get to the player with the ball quickly, so they have less time.' },
      { word: 'Near post', meaning: 'The goal post closest to the ball.' },
      { word: 'Far post', meaning: 'The goal post furthest from the ball.' },
      { word: 'Rebound', meaning: 'The ball bouncing back off a player or the keeper after a shot.' },
    ],

    training: {
      area: 'About 25 yards from the goal, as wide as the penalty area.',
      players: 'Groups of 3: an attacker, a defender and a keeper. Queues for attacker and defender.',
      equipment: 'A goal, cones for the start spots, plenty of balls with the attackers.',
      setup: [
        'The attacker starts with a ball about 25 yards out. The defender starts by a goal post.',
        'On "go" the attacker dribbles in and shoots from around the edge of the box.',
        'The defender sprints out, gets between ball and goal, and blocks the shot.',
        'Side-on, arms in, eyes open, on your feet. Don\'t turn your back.',
        'Block or clear it: a point to the defender. Goal: a point to the attacker. Swap over.',
        'Progression: start the attacker wide. Defender blocks the near post; keeper covers the far post. Talk to each other.',
      ],
    },

    questions: [
      'How quickly did you get out?',
      'Were you between the ball and the goal?',
      'Did you keep your eyes open and your arms in?',
      'Which side did you block? Which side did your keeper have?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'get-in-the-way',
        video: 'videos/blocking-shots-1.mp4',
        kicker: 'Clip 1',
        title: 'Get In the Way',
        tagline: 'Close them down, get in line, block it.',
        intro: ['An attacker dribbles in to *shoot*.', 'The defender starts by the post.', 'Close them down and *block it*.'],
        players: [GK, { id: 'A', team: 'a', x: 44, y: 16 }, { id: 'D', team: 'd', x: 61, y: 69 }],
        ball: { owner: 'A' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Attacker with the ball, about 25 yards out.', 'Defender by the post.'],
          },
          {
            title: 'CLOSE DOWN',
            text: ['Attacker goes. *Sprint out*.', 'Run the line *between ball and goal*.', 'Slow down as you get close.'],
            tags: { A: 'GO!', D: 'CLOSE DOWN' }, timing: { move: 3 },
            moves: [
              { id: 'A', to: [45, 35], end: 0.9 },
              { id: 'D', path: [[55, 58], [46.5, 50]], start: 0.05, end: 0.9, ease: 'out' },
            ],
          },
          {
            title: 'GET BIG',
            text: ['*Side-on*. Get big.', 'Arms *in*: no handball.', '*Eyes open*. Stay on your feet.'],
            tags: { D: 'BLOCK' }, timing: { move: 1.6 },
            moves: [{ id: 'A', to: [45, 37], end: 0.8 }],
          },
          {
            title: 'BLOCKED',
            text: ['The shot hits you, not the net.', 'Don\'t turn your back on it.'],
            tags: { A: 'SHOOT', D: 'BLOCK' }, timing: { move: 1.8 },
            ball: { to: [46.5, 47.5], start: 0.1, end: 0.3 },
          },
          {
            title: 'CLEAR IT',
            text: ['Then *clear it* or win it.', 'High, wide and far.'],
            tags: { D: 'CLEAR IT' }, timing: { move: 2.4 },
            moves: [{ id: 'D', to: [46, 46], end: 0.3 }],
            ball: { to: [12, 20], start: 0.35, end: 0.85 },
          },
        ],
        summary: ['*Sprint out*: between ball and goal.', 'Side-on, arms in, *eyes open*.', 'Block it, then *clear it*.'],
      }),

      Object.assign({}, common, {
        id: 'near-post',
        video: 'videos/blocking-shots-2.mp4',
        kicker: 'Clip 2',
        title: 'You and Your Keeper',
        tagline: 'Block the near post. Your keeper has the far post.',
        intro: ['Now the attacker comes from the *side*.', 'Defender blocks the *near post*.', 'The keeper covers the *far post*.'],
        players: [GK, { id: 'A', team: 'a', x: 20, y: 22 }, { id: 'D', team: 'd', x: 38, y: 69 }],
        ball: { owner: 'A' },
        steps: [
          {
            title: 'FROM THE SIDE',
            text: ['The attacker starts *wide*.', 'Defender by the near post.'],
          },
          {
            title: 'CLOSE DOWN, NEAR POST',
            text: ['Sprint out.', 'Get in line with the *near post*.', 'Keeper: shout "*near post!*"'],
            tags: { A: 'GO!', D: 'NEAR POST', gk: 'TALK' }, timing: { move: 3 },
            moves: [
              { id: 'A', to: [29, 44], end: 0.9 },
              { id: 'D', path: [[36, 60], [33.5, 52]], start: 0.05, end: 0.9, ease: 'out' },
              { id: 'gk', to: [53, 72], start: 0.4, end: 0.9, arrow: false },
            ],
          },
          {
            title: 'KEEPER HAS THE FAR POST',
            text: ['The near post is *blocked*.', 'Only the far post is left...', '...and the keeper is ready for it.'],
            tags: { A: 'SHOOT', gk: 'SAVE' }, timing: { move: 2.2 },
            moves: [{ id: 'gk', to: [57, 71], start: 0.15, end: 0.5, arrow: false }],
            ball: { pass: 'gk', start: 0.1, end: 0.5 },
          },
        ],
        summary: ['Defender blocks the *near post*.', 'Keeper covers the *far post*.', '*Talk* to each other.'],
      }),
    ],
  });
})();
