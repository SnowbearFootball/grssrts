/*
 * SESSION: Building Out: Rotations (Attacking · tactical)
 *
 * Green (team 'a') has the ball at centre-back and builds up the pitch towards the top.
 * Red opponents (team 'd') hold their pressing shape. Labels in the circles show positions.
 * Pitch units: x 0..100 (left → right), y 0..75 (top → bottom). Our goal is at the bottom.
 */
(function () {
  // Green: 1-4-4-2 style shape, ball with the left centre-back
  const green = pos => Object.entries(pos).map(([id, [x, y]]) => ({ id, team: 'a', label: id.replace(/[0-9]/g, ''), x, y }));
  const red = list => list.map(([x, y], i) => ({ id: 'r' + i, team: 'd', x, y }));

  const clip1Green = green({
    ST1: [38.6, 10.3], ST2: [64.5, 11.4], LW: [4, 25], RW: [96, 26.6], CM1: [34.9, 32], CM2: [57, 38],
    LB: [8.8, 46.6], RB: [87.6, 47], CB1: [29.3, 54.2], CB2: [62, 54.2],
  });
  const clip1Red = red([[34.9, 6.1], [62.2, 6.1], [91.8, 10.9], [5.4, 17.4], [48.4, 19.8], [35, 26.7],
    [55.6, 32.6], [83.7, 36.4], [10.3, 38.2], [34.1, 47.7]]);

  const clip2Green = green({
    ST1: [40.2, 9.7], ST2: [66.2, 11.2], LW: [4, 23.7], RW: [96, 25.8], CM1: [36.5, 30.7], CM2: [57.5, 37.5],
    LB: [7.6, 48], RB: [89.4, 45.5], CB1: [30.7, 54.7], CB2: [70.8, 54.4],
  });
  const clip2Red = red([[36.7, 5.5], [64.1, 6.2], [92.6, 11.2], [5.4, 16.1], [50.2, 19], [36.5, 25.8],
    [53.5, 33.2], [85.5, 35.2], [10.1, 37], [35.4, 47.6]]);

  const keeper = { id: 'GK', team: 'k', label: 'GK', x: 49, y: 71.5 };
  const common = {
    legend: { a: 'In possession', d: 'Opponents' },
    goals: [[50, 'bottom']],
    facing: { a: -1 },                       // green attacks up the pitch: ball sits in front of them
    keyPhrase: { big: 'FILL THE SPACE', small: 'When a teammate leaves a space, someone fills it' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'build-out-rotations',
    title: 'Building Out: Rotations',
    subtitle: 'Tactical',
    type: 'Tactical',
    category: 'attacking',
    thumb: 'assets/thumbs/build-out-rotations.jpg',
    summary: 'Two ways to rotate players when building from the back, so the opponents don\'t know who to press.',
    keyPhrase: 'Fill the space',
    ages: { from: 12 },

    cards: [
      {
        title: 'Rotation 1: CM drops in',
        lead: 'Make a *back three* to get the ball past their first line.',
        columns: [
          { heading: 'Who moves', items: ['Centre-backs split wide', 'A centre-mid drops in between them', 'Full-backs push high', 'Wingers come inside'] },
          { heading: 'Why', items: ['An extra player to build with', 'Full-backs give the width', 'Winger finds space *behind their midfield*'] },
        ],
      },
      {
        title: 'Rotation 2: CM drops wide',
        lead: 'Rotate down one side: *each player fills the space the last one left*.',
        columns: [
          { heading: 'Who moves', items: ['Centre-mid drops into the full-back space', 'Centre-back tucks in', 'Full-back pushes high and wide', 'Winger moves into the pocket'] },
          { heading: 'Why', items: ['Opponents don\'t know who to mark', 'Numbers on one side', 'A free player *between the lines*'] },
        ],
        phrase: { big: 'FILL THE SPACE', small: 'When a teammate leaves a space, someone fills it' },
      },
    ],

    keywords: [
      { word: 'Rotation', meaning: 'Players swap positions so each space is still filled, but by a different player.' },
      { word: 'Back three', meaning: 'Two centre-backs plus a dropping midfielder across the back.' },
      { word: 'Pocket', meaning: 'The space behind their midfield and in front of their defence.' },
      { word: 'Width', meaning: 'Players near the touchline, stretching the opponents across the pitch.' },
      { word: 'Between the lines', meaning: 'In the gap between two lines of opponents, where it is hard to be marked.' },
    ],

    training: {
      area: 'Half to two-thirds of a pitch, with one goal and a keeper.',
      players: 'Your team against 8 to 10 opponents (scale down for 9 v 9).',
      equipment: 'One goal, balls, bibs, cones to mark starting positions.',
      setup: [
        'Start with the ball at a centre-back and the opponents in their pressing shape.',
        'Walk the rotation through first, with no pressure, so everyone knows their new position.',
        'Then play it live: opponents press, and your team builds out using the rotation.',
        'Look for the pass into the winger in the pocket, or out to the high full-back.',
        'Try Rotation 1, then Rotation 2, and talk about when each one works best.',
      ],
    },

    questions: [
      'When the midfielder drops, who fills the space they left?',
      'Where is the free player now?',
      'Which pass gets us past their first line?',
      'When should the full-backs push high?',
      'How does the winger know when to come inside?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'rotation-1',
        video: 'videos/build-out-rotations-1.mp4',
        kicker: 'Rotation 1',
        title: 'CM Drops In',
        tagline: 'Centre-mid drops between the centre-backs to make a back three.',
        intro: [
          'We have the ball at *centre-back*.',
          'The opponents press in their shape.',
          'Rotate so we have *an extra player* at the back and *a free player* in the pocket.',
        ],
        players: [keeper].concat(clip1Green, clip1Red),
        ball: { owner: 'CB1' },
        steps: [
          {
            title: 'THE STARTING SHAPE',
            text: ['Ball with the left centre-back.', 'Opponents are set to press.', 'Watch how *each move opens a space* for the next one.'],
          },
          {
            title: 'CBs SPLIT, CM DROPS IN',
            text: ['Centre-backs *split wide*.', 'A centre-mid *drops in between them*.', 'Now we have a *back three*.'],
            moves: [
              { id: 'CB1', to: [19.3, 55.3] },
              { id: 'CB2', to: [72.7, 55.6] },
              { id: 'CM2', to: [49.4, 54.4], start: 0.1 },
            ],
          },
          {
            title: 'FULL-BACKS PUSH HIGH',
            text: ['With three at the back, the *full-backs push high*.', 'They give us *width* further up the pitch.'],
            moves: [
              { id: 'LB', to: [3.5, 35.6] },
              { id: 'RB', to: [96, 32.6] },
            ],
          },
          {
            title: 'WINGERS COME INSIDE',
            text: ['Full-backs now hold the width, so the *wingers come inside*.', 'Right winger moves into the *pocket behind their midfield*.', 'Centre-mid edges forward to support.'],
            zones: [{ at: [75.9, 24.9], r: 9, label: 'Pocket' }],
            timing: { move: 3 },
            moves: [
              { id: 'RW', to: [75.9, 24.9] },
              { id: 'LW', to: [18, 17.7] },
              { id: 'CM1', to: [44.2, 28.5], start: 0.15 },
            ],
          },
        ],
        summary: [
          'CBs split, CM *drops in*: back three.',
          'Full-backs *push high* for width.',
          'Wingers *come inside*: one into the pocket.',
          'Every space we leave, *someone fills it*.',
        ],
      }),
      Object.assign({}, common, {
        id: 'rotation-2',
        video: 'videos/build-out-rotations-2.mp4',
        kicker: 'Rotation 2',
        title: 'CM Drops Wide',
        tagline: 'Rotate down the right: CM to full-back, full-back high, winger inside.',
        intro: [
          'Same start: ball at *centre-back*.',
          'This time we rotate *down one side*.',
          'Each player *fills the space* the last one left.',
        ],
        players: [keeper].concat(clip2Green, clip2Red),
        ball: { owner: 'CB1' },
        steps: [
          {
            title: 'THE STARTING SHAPE',
            text: ['Ball with the left centre-back.', 'Watch the *right-hand side*: four players rotate.'],
          },
          {
            title: 'CM DROPS WIDE',
            text: ['The centre-mid *drops into the full-back space*.', 'The right centre-back *tucks in* to stay connected.'],
            moves: [
              { id: 'CM2', to: [82.6, 53.7] },
              { id: 'CB2', to: [58.2, 54.4], start: 0.1 },
            ],
          },
          {
            title: 'FULL-BACK PUSHES HIGH',
            text: ['Their space is covered, so the *full-back pushes high and wide*.'],
            moves: [{ id: 'RB', to: [96, 31.8] }],
          },
          {
            title: 'WINGER INTO THE POCKET',
            text: ['Full-back holds the width, so the *winger comes inside*.', 'Into the *pocket*: between their midfield and defence.', 'Who marks them now?'],
            zones: [{ at: [66.1, 25.8], r: 9, label: 'Pocket' }],
            moves: [{ id: 'RW', to: [66.1, 25.8] }],
          },
        ],
        summary: [
          'CM *drops wide* into the full-back space.',
          'CB *tucks in*; full-back *goes high and wide*.',
          'Winger moves *into the pocket*.',
          'Opponents don\'t know *who to mark*.',
        ],
      }),
    ],
  });
})();
