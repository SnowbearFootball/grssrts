/*
 * SESSION: 5 v 2 Transfer Rondo
 *
 * Three teams of 4 (green, red, yellow) plus 2 blue floaters, each fixed to an end box.
 * Boxes are 10 x 7 yards: end box, middle box, end box, plus a wide box either side of the middle.
 * Laid out sideways (end boxes left and right) so the boxes fill the wide pitch.
 *
 * Positions below are written in yards in the diagram's upright layout
 * (X across 0..17, Y down 0..21) and turned sideways by P().
 */
(function () {
  const GREEN = '#2fbf7f', RED = '#e5484d', YELLOW = '#e0a91b', BLUE = '#3b9ae1';
  const S = 4, X0 = 8, YMID = 37.5, XMID = 8.5;          // pitch units per yard, offsets
  const P = (X, Y) => [+(X0 + Y * S).toFixed(1), +(YMID + (X - XMID) * S).toFixed(1)];
  const box = (X, Y, w, h, cone) => {                       // w/h in yards, upright layout
    const [x, y] = P(X, Y);
    return { x, y, w: h * S, h: w * S, cone };
  };
  const areas = [
    box(3.5, 0, 10, 7),            // green end box (left)
    box(3.5, 7, 10, 7),            // middle box
    box(3.5, 14, 10, 7),           // yellow end box (right)
    box(0, 7, 3.5, 7, RED),        // wide box (top)
    box(13.5, 7, 3.5, 7, RED),     // wide box (bottom)
  ];
  const pl = (id, team, X, Y) => { const [x, y] = P(X, Y); return { id, team, x, y }; };
  const to = (X, Y) => P(X, Y);

  // positions (yards, upright layout)
  const players = [
    pl('g1', 'a', 4.6, 1.2), pl('g2', 'a', 12.4, 1.2), pl('g3', 'a', 4.6, 5.8), pl('g4', 'a', 12.4, 5.8),
    pl('f1', 'f', 8.5, 3.5), pl('f2', 'f', 8.5, 18.6),
    pl('r1', 'r', 6.4, 1.9), pl('r2', 'r', 10.4, 5.0),
    pl('r3', 'r', 6.6, 10.4), pl('r4', 'r', 10.6, 10.6),
    pl('y1', 'y', 1.6, 10.5), pl('y2', 'y', 15.4, 10.5),
    pl('y3', 'y', 5.6, 16.8), pl('y4', 'y', 11.6, 16.8),
  ];

  // after a transfer to the yellow end
  const reactToYellow = [
    { id: 'y1', to: to(4.6, 15.2) }, { id: 'y2', to: to(12.4, 15.2) },
    { id: 'y3', to: to(4.6, 19.8) }, { id: 'y4', to: to(12.4, 19.8) },
    { id: 'r3', to: to(6.6, 16.4), start: 0.05 }, { id: 'r4', to: to(10.6, 16.6), start: 0.05 },
    { id: 'r1', to: to(6.6, 10.4), start: 0.15 }, { id: 'r2', to: to(10.6, 10.6), start: 0.15 },
    { id: 'g3', to: to(1.6, 10.5), start: 0.2 }, { id: 'g4', to: to(15.4, 10.5), start: 0.2 },
  ];
  // after a transfer back to the green end
  const reactToGreen = [
    { id: 'g3', to: to(4.6, 5.8) }, { id: 'g4', to: to(12.4, 5.8) },
    { id: 'r1', to: to(6.8, 2.6), start: 0.05 }, { id: 'r2', to: to(10.2, 4.6), start: 0.05 },
    { id: 'r3', to: to(6.6, 10.4), start: 0.15 }, { id: 'r4', to: to(10.6, 10.6), start: 0.15 },
    { id: 'y1', to: to(1.6, 10.5), start: 0.2 }, { id: 'y2', to: to(15.4, 10.5), start: 0.2 },
  ];

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'transfer-rondo',
    topics: ['Passing'],
    title: '5 v 2 Transfer Rondo',
    subtitle: 'Possession',
    type: 'Rondo',
    category: 'attacking',
    squad: [14, 14],
    thumb: 'assets/thumbs/transfer-rondo.jpg',
    summary: 'Keep the ball 5 v 2, then switch it to the other end. Everyone attacks, defends and transfers.',
    keyPhrase: 'Keep it, then transfer',
    ages: { from: 14 },

    cards: [
      {
        title: 'In possession (the 5)',
        lead: 'Keep the ball, then *find the other end*.',
        columns: [
          { heading: 'Keep it', items: ['*4 on the edges, 1 in the middle*', 'Rotate: don\'t stand still', 'Open your body to see both sides', 'Count your passes out loud'] },
          { heading: 'Transfer', items: ['After *8 passes*, look to switch', 'Via a wide player: *1 point*', 'Direct to the other end: *2 points*', 'Pass with pace through the gap'] },
        ],
        phrase: { big: 'KEEP IT, THEN TRANSFER', small: '8 passes, then find the other end' },
      },
      {
        title: 'Out of possession (the 2 + middle)',
        lead: 'Win it back, or *stop the transfer*.',
        columns: [
          { heading: 'The 2 pressing', items: ['Press together, not one at a time', 'Cut the pass through the middle', 'Force them to the edge'] },
          { heading: 'The middle pair', items: ['*Block the passing lanes*', 'Watch the passer\'s hips and eyes', 'Press the wide player if the ball goes wide'] },
        ],
        phrase: { big: 'BLOCK THE LANES', small: 'Make the transfer hard' },
      },
    ],

    keywords: [
      { word: 'Rondo', meaning: 'A keep-ball game: more attackers than defenders in a small area.' },
      { word: 'Transfer', meaning: 'Moving the ball from one end box to the other, past the middle defenders.' },
      { word: 'Floater', meaning: 'A player who always plays for the team with the ball. Fixed to their end box.' },
      { word: 'Passing lane', meaning: 'The space a pass travels through. Defenders try to stand in it.' },
      { word: 'Transition', meaning: 'The moment the ball is won or lost and everyone changes job.' },
    ],

    training: {
      area: 'Three 10 × 7 yard boxes in a line (end, middle, end), with a narrow wide box either side of the middle.',
      players: '12 players in three teams of 4, plus 2 floaters (14 in total).',
      equipment: 'Cones for the boxes, bibs in 4 colours, plenty of balls.',
      setup: [
        'Team A (4) and a floater keep the ball in one end box: 5 v 2 against two defenders.',
        'The other two defenders stand in the middle box. Team C has 2 wide players and 2 in the far end box with the other floater.',
        'After 8 passes, Team A can transfer: 1 point via a wide player, 2 points if played directly to the far end.',
        'When the ball arrives, the wide players join the end box to make 5 v 2. The middle defenders press; the other two defend the middle.',
        'The team that just passed sends 2 players to the wide boxes.',
        'If the defenders win the ball, play restarts and the team that lost it becomes the new defending unit.',
      ],
    },

    questions: [
      'How many passes have we made? Who is counting?',
      'Where is the free player right now?',
      'When is the right moment to transfer?',
      'Middle players: which lane are you blocking?',
      'Who just lost the ball, and what is your job now?',
    ],

    clips: [{
      id: 'rondo',
      video: 'videos/transfer-rondo.mp4',
      title: '5 v 2 Transfer Rondo',
      tagline: 'Keep it, transfer it, and react: the whole game in one clip.',
      intro: ['Three teams of 4, plus 2 *floaters*.', 'Keep it *5 v 2*, then transfer to the other end.', 'Three ways it can go: *via a wide player*, *direct*, or *defenders win it*.'],
      goals: [],
      areas,
      playerScale: 0.85,
      teamColors: { r: RED, y: YELLOW, f: BLUE },
      legendTeams: [{ label: 'Green', color: GREEN }, { label: 'Red', color: RED }, { label: 'Yellow', color: YELLOW }, { label: 'Floater', color: BLUE }],
      facing: { a: 1, f: 1, r: 1, y: -1 },
      keyPhrase: { big: 'KEEP IT, THEN TRANSFER', small: '8 passes, then find the other end' },
      players,
      ball: { owner: 'g1' },
      steps: [
        {
          title: 'THE SET-UP',
          text: ['*5 v 2* in the green box: green + the blue floater.', 'Two reds press, two reds guard the middle.', 'Yellow wait wide and at the other end.'],
        },
        {
          title: 'KEEP IT: 5 v 2',
          text: ['*4 on the edges, 1 in the middle.*', 'Move the ball quickly. Count every pass.'],
          timing: { move: 4 },
          passes: [{ to: 'f1' }, { to: 'g2' }, { to: 'g4' }, { to: 'g3' }],
          moves: [{ id: 'r1', to: to(6.2, 4.4), arrow: false }, { id: 'r2', to: to(10.8, 4.2), start: 0.3, arrow: false }],
        },
        {
          title: '8 PASSES: TRANSFER VIA A WIDE PLAYER',
          text: ['Eight passes done: *look for the other end*.', 'Play it to the *wide player*, who switches it into the far box.', 'That\'s *1 point*.'],
          timing: { move: 3.6 },
          passes: [{ to: 'y1', start: 0.05, end: 0.35 }, { to: 'y3', start: 0.6, end: 0.88 }],
          moves: [{ id: 'r3', to: to(4.4, 10.2), start: 0.3, end: 0.75, arrow: false }],
        },
        {
          title: 'EVERYONE REACTS',
          text: ['Wide players *join the box*: yellow now 5 v 2.', 'Middle reds *drop in to press*; the other reds guard the middle.', 'Green send 2 players *to the wide boxes*.'],
          timing: { move: 3.4 },
          moves: reactToYellow,
        },
        {
          title: 'VARIATION: DIRECT TRANSFER, 2 POINTS',
          text: ['Yellow keep it, then spot a *gap through the middle*.', 'Straight into the far box: *2 points*.'],
          timing: { move: 4 },
          passes: [{ to: 'f2', start: 0, end: 0.18 }, { to: 'y4', start: 0.24, end: 0.42 }, { to: 'g2', start: 0.55, end: 0.9 }],
          moves: [{ id: 'r2', to: to(11, 9.6), start: 0.5, end: 0.95, arrow: false }],
        },
        {
          title: 'EVERYONE REACTS AGAIN',
          text: ['Green wide players *join their box*: 5 v 2.', 'Middle reds press; the other reds come back to the middle.', 'Yellow send 2 players *to the wide boxes*.'],
          timing: { move: 3.4 },
          moves: reactToGreen,
        },
        {
          title: 'VARIATION: DEFENDERS WIN IT',
          text: ['A loose pass, and red *win the ball*.'],
          timing: { move: 2.6 },
          passes: [{ to: 'r1', start: 0.1, end: 0.5 }],
          moves: [{ id: 'r1', to: to(5.4, 2.0), end: 0.5, arrow: false }],
        },
        {
          title: 'SWAP JOBS',
          text: ['Red keep it with the floater: *5 v 2*.', 'Green *lost it*, so green defend: 2 press, 2 guard the middle.', 'React fast: *the quickest team wins*.'],
          timing: { move: 3.6 },
          moves: [
            { id: 'g1', to: to(6.8, 3.4) }, { id: 'g2', to: to(10.2, 2.4) },
            { id: 'g3', to: to(6.6, 10.4), start: 0.1 }, { id: 'g4', to: to(10.6, 10.6), start: 0.1 },
            { id: 'r1', to: to(4.6, 1.2), start: 0.1 }, { id: 'r2', to: to(12.4, 1.2), start: 0.15 },
            { id: 'r3', to: to(4.6, 5.8), start: 0.2 }, { id: 'r4', to: to(12.4, 5.8), start: 0.2 },
          ],
        },
      ],
      summary: ['*4 on the edges, 1 in the middle.*', '*8 passes*, then transfer: wide *1 point*, direct *2 points*.', 'When the ball arrives, *everyone changes job*.', 'Lose it: *you defend*.'],
    }],
  });
})();
