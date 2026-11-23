/*
 * SESSION (DRAFT): Utilising the Midfield 3 to Penetrate Against a 4-4-2 (Attacking · tactical)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#midfield-three).
 *
 * Primary player: the pivot. Primary unit: midfield. Secondary unit: defence.
 * Greens attack up in a 2-1-2 (two CBs, the pivot, two 8s); reds defend in a 2-2-2. The coach feeds the ball into a green CB.
 * Greens score by passing through the black or blue gates on the far line; reds win it and dribble over the yellow end line.
 * Pitch units: x 0..100, y 0..75.
 */
(function () {
  const G = '#2fbf7f', R = '#e5484d';
  const yellow = '#e5b52b', black = '#2b2b2b', blue = '#3b9ae1';
  const cones = [
    // gates on the far line: black, blue (middle), black
    ...[23, 31, 69, 77].map(x => ({ at: [x, 4], color: black })), ...[44, 56].map(x => ({ at: [x, 4], color: blue })),
    // the yellow end line, and yellow markers down the sides
    ...[15, 27, 39, 50, 61, 73, 85].map(x => ({ at: [x, 70], color: yellow })),
    ...[23, 40, 56].flatMap(y => [{ at: [15, y], color: yellow }, { at: [85, y], color: yellow }]),
  ];
  const players = [
    { id: 'g6', team: 'g', label: '6', x: 30, y: 64 }, { id: 'g5', team: 'g', label: '5', x: 70, y: 64 },
    { id: 'g4', team: 'g', label: '4', x: 47, y: 55 },
    { id: 'g8', team: 'g', label: '8', x: 30, y: 34 }, { id: 'g10', team: 'g', label: '10', x: 69, y: 27 },
    { id: 'r10', team: 'r', label: '10', x: 37, y: 48 }, { id: 'r9', team: 'r', label: '9', x: 60, y: 47 },
    { id: 'r4', team: 'r', label: '4', x: 40, y: 31 }, { id: 'r8', team: 'r', label: '8', x: 59, y: 30 },
    { id: 'r5', team: 'r', label: '5', x: 38, y: 13 }, { id: 'r6', team: 'r', label: '6', x: 60, y: 12 },
    { id: 'co', team: 'c', label: 'C', x: 50, y: 73.5 },
  ];
  const common = {
    plain: true, goals: [],
    marks: [{ x: 15, y: 40, w: 70, h: 0 }],
    areas: [{ x: 15, y: 4, w: 70, h: 66, fill: 'rgba(47,191,127,0.06)' }],
    cones,
    teamColors: { g: G, r: R, c: '#2b2b2b' },
    facing: { g: -1, r: 1, c: -1 },
    legendTeams: [{ label: 'Greens (attack up)', color: G }, { label: 'Reds', color: R }],
    players,
    ball: { owner: 'co' },
    keyPhrase: { big: 'FIND THE SPARE PLAYER', small: 'Scan, back foot, be patient' },
  };
  const feed = (to, text) => ({
    title: 'FEED INTO A CB',
    text: text || ['The coach *feeds the ball* into a green CB.', 'Greens: 2-1-2. Reds: 2-2-2.'],
    timing: { move: 2.2 },
    passes: [{ to, start: 0.05, end: 0.6 }],
  });

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'midfield-three',
    draft: true,
    title: 'Utilising the Midfield 3 to Penetrate Against a 4-4-2',
    subtitle: 'Primary player: pivot · Primary unit: midfield',
    type: 'Tactical',
    category: 'attacking',
    squad: [11, 14],
    thumb: 'assets/thumbs/midfield-three.jpg',
    summary: 'Greens play through a 4-4-2 using a midfield three: the pivot scans and receives on the back foot, the midfield rotates to find the spare player, and the CBs stay patient.',
    keyPhrase: 'Find the spare player',
    ages: { from: 14 },

    cards: [
      {
        title: 'Before',
        lead: 'The *midfield overload*: three of ours against their two.',
        columns: [
          { heading: 'Overload', items: ['Pivot and two 8s against two red midfielders', 'There is always a *spare player*', 'Find them'] },
          { heading: 'Patience', items: ['*Be patient* in possession', '*Use the CBs*: move it, move them', 'Wait for the gap'] },
        ],
        phrase: { big: 'FIND THE SPARE PLAYER', small: 'Scan, back foot, be patient' },
      },
      {
        title: 'During',
        lead: 'Work with the *pivot* and the *midfield unit*.',
        columns: [
          { heading: 'Pivot', items: ['*Scan* before you receive', 'Receive on the *back foot* wherever possible', 'Turn and play forward'] },
          { heading: 'Midfield unit', items: ['*Rotate*: if the pivot is marked, an 8 drops in', 'The pivot moves up into the space', 'Movement to *find the spare player*'] },
        ],
      },
    ],

    keywords: [
      { word: 'Pivot', meaning: 'The deepest midfielder (here the 4), who links the CBs to the midfield.' },
      { word: 'Overload', meaning: 'More of our players than theirs in an area: here, 3 v 2 in midfield.' },
      { word: 'Spare player', meaning: 'The player nobody is marking. Find them.' },
      { word: 'Rotation', meaning: 'Midfielders swapping positions to lose their markers and open up space.' },
      { word: 'Back foot', meaning: 'Receiving on the foot furthest from the ball, so you are already open to play forward.' },
    ],

    training: {
      area: 'About 50 × 40 yards. Three gates on the far line (black, blue in the middle, black). A yellow end line behind the greens.',
      players: 'Greens: two CBs, a pivot and two 8s (2-1-2). Reds: two strikers, two midfielders, two CBs (2-2-2). A coach with the balls behind the yellow line.',
      equipment: 'Cones (black, blue, yellow), bibs, plenty of balls with the coach.',
      setup: [
        'Greens set up to attack in a 4-3-3 shape (2-1-2). Reds set up to defend in a 4-4-2 shape (2-2-2).',
        'Play begins with the coach feeding the ball into a green CB.',
        'Greens score by playing the ball through a black or blue gate with an accurate, well-weighted pass.',
        'If the reds win the ball, they score by dribbling over the yellow end line.',
        'Before: emphasise the midfield overload for the greens, being patient in possession and using the CBs.',
        'During: work with the pivot on scanning and receiving on the back foot. Work with the midfield unit on rotation and movement to find the spare player.',
        'After: review the midfield rotation options with the players. Discuss why being patient in possession matters.',
      ],
    },

    questions: [
      'Who was the spare player? How did we find them?',
      'Pivot: did you scan before the ball came? Which foot did you receive on?',
      'When the pivot was marked, who dropped in?',
      'When did we need to be patient and use the CBs?',
    ],

    clips: [
      // ---------------- 1 ----------------
      Object.assign({}, common, {
        id: 'pivot',
        video: 'videos/midfield-three-1.mp4',
        kicker: 'Clip 1 · the pivot',
        title: 'Through the Pivot',
        tagline: 'Scan, receive on the back foot, find the spare player.',
        intro: ['Greens attack in a *2-1-2*. Reds defend in a *2-2-2*.', 'Score through a *black or blue gate*.', 'The key player: the *pivot* (4).'],
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Greens: two CBs, the *pivot*, two 8s.', 'Reds: two strikers, two midfielders, two CBs.', 'Gates on the far line: *black, blue, black*.'],
          },
          feed('g6'),
          {
            title: 'PIVOT: SCAN, BACK FOOT',
            text: ['The pivot *scans*, then finds a gap between the strikers.', 'Receive on the *back foot*: already open to play forward.'],
            tags: { g4: 'BACK FOOT' }, timing: { move: 3 },
            moves: [{ id: 'g4', path: [[46, 57], [44, 53]], end: 0.55 }, { id: 'r10', to: [34, 52], start: 0.1, end: 0.6 }],
            passes: [{ to: 'g4', start: 0.45, end: 0.85 }],
          },
          {
            title: 'THE MIDFIELD OVERLOAD',
            text: ['*3 v 2* in midfield: someone is free.', 'Red 8 steps up to the pivot, red 4 marks our 8...', '...so the *10 is the spare player*.'],
            tags: { g10: 'FREE MAN', r8: 'PRESS' }, timing: { move: 3 },
            moves: [{ id: 'r8', to: [50, 44], end: 0.4 }, { id: 'r4', to: [33, 32], start: 0.1, end: 0.7 }, { id: 'g10', to: [64, 30], start: 0.2, end: 0.8 }],
            passes: [{ to: 'g10', start: 0.35, end: 0.85 }],
          },
          {
            title: 'THROUGH THE GATE',
            text: ['Drive at the CBs, then an *accurate, well-weighted pass*...', '...through the *black gate*.'],
            tags: { g10: 'SCORE' }, timing: { move: 3 },
            moves: [{ id: 'g10', to: [67, 17], end: 0.55 }, { id: 'r6', to: [64, 11], start: 0.2, end: 0.6 }],
            ball: { to: [74, 1], start: 0.6, end: 0.9 },
          },
        ],
        summary: ['Feed into a CB, find the *pivot*.', 'Pivot: *scan*, receive on the *back foot*.', 'Use the *3 v 2*: find the spare player, through a gate.'],
      }),

      // ---------------- 2 ----------------
      Object.assign({}, common, {
        id: 'rotation',
        video: 'videos/midfield-three-2.mp4',
        kicker: 'Clip 2 · the midfield unit',
        title: 'Rotate and Be Patient',
        tagline: 'Pivot marked? An 8 drops in, the pivot moves up. Use the CBs.',
        intro: ['Now the reds *mark the pivot*.', 'Be *patient*: use the CBs.', 'The midfield *rotates* to find the spare player.'],
        steps: [
          feed('g5', ['The coach feeds the other CB.', 'Red 9 presses, red 10 *marks the pivot*.']),
          {
            title: 'PIVOT MARKED: BE PATIENT',
            text: ['The pivot is marked. *Don\'t force it*.', 'Use the CBs: *move it across*.'],
            tags: { r10: 'TIGHT', g5: 'BACK' }, timing: { move: 3 },
            moves: [{ id: 'r10', to: [47, 51], end: 0.6 }, { id: 'r9', to: [64, 57], start: 0.1, end: 0.7 }],
            passes: [{ to: 'g6', start: 0.45, end: 0.95 }],
          },
          {
            title: 'ROTATE',
            text: ['An 8 *drops into the pivot space*...', '...the pivot *moves up* into the 8\'s space.', 'Red 10 follows the pivot: the gap opens.'],
            tags: { g8: 'DROP', g4: 'PUSH ON' }, timing: { move: 3.4 },
            moves: [
              { id: 'g8', to: [38, 50], end: 0.85 }, { id: 'g4', to: [36, 36], end: 0.85 },
              { id: 'r10', to: [40, 42], start: 0.2, end: 0.9 }, { id: 'r4', to: [42, 30], start: 0.3, end: 0.9, arrow: false },
            ],
          },
          {
            title: 'THE SPARE PLAYER',
            text: ['The dropping 8 is *free*.', 'Receive on the *back foot*, turn.'],
            tags: { g8: 'FREE MAN' }, timing: { move: 2.4 },
            passes: [{ to: 'g8', start: 0.05, end: 0.5 }],
            moves: [{ id: 'g8', to: [39, 49], start: 0.4, end: 0.9 }],
          },
          {
            title: 'PLAY FORWARD',
            text: ['Through to the 10, *between the lines*...', '...and through the *blue gate*.'],
            tags: { g10: 'FREE MAN' }, timing: { move: 3.4 },
            moves: [{ id: 'g10', to: [57, 22], end: 0.4 }, { id: 'r8', to: [60, 28], start: 0.1, end: 0.5, arrow: false }],
            passes: [{ to: 'g10', start: 0.1, end: 0.45 }],
          },
          {
            title: 'THROUGH THE GATE',
            text: ['An *accurate, well-weighted pass* through the middle gate.'],
            tags: { g10: 'SCORE' }, timing: { move: 2 },
            ball: { to: [50, 1], start: 0.1, end: 0.5 },
          },
        ],
        summary: ['Pivot marked? *Be patient*: use the CBs.', '*Rotate*: an 8 drops in, the pivot moves up.', 'Find the *spare player*, then play forward.'],
      }),

      // ---------------- 3 ----------------
      Object.assign({}, common, {
        id: 'reds-win-it',
        video: 'videos/midfield-three-3.mp4',
        kicker: 'Clip 3 · transition',
        title: 'Reds Win It',
        tagline: 'Lose it, and the reds dribble over the yellow end line.',
        intro: ['If the reds *win it*...', '...they score by *dribbling over the yellow end line*.', 'Why patience in possession matters.'],
        steps: [
          feed('g6'),
          {
            title: 'FORCED PASS',
            text: ['A rushed pass into a marked pivot...'],
            timing: { move: 2.4 },
            moves: [{ id: 'r10', to: [44, 56], end: 0.6 }],
            passes: [{ to: 'g4', start: 0.3, end: 0.7 }],
          },
          {
            title: 'REDS WIN IT',
            text: ['...and the red striker *wins it*.'],
            tags: { r10: 'WON IT!' }, timing: { move: 1.8 },
            ball: { pass: 'r10', start: 0.2, end: 0.45, arrow: false },
          },
          {
            title: 'DRIBBLE OVER THE LINE',
            text: ['Reds score by *dribbling over the yellow end line*.', 'Greens: be *patient*, use the CBs, find the spare player.'],
            tags: { r10: 'SCORE' }, timing: { move: 2.8 },
            moves: [
              { id: 'r10', path: [[42, 62], [40, 71]], end: 0.85 },
              { id: 'g6', to: [35, 68], start: 0.2, end: 0.9 }, { id: 'g4', to: [43, 62], start: 0.15, end: 0.9 },
            ],
          },
        ],
        summary: ['Lose it: reds *dribble over the end line*.', 'Don\'t force it into a marked pivot.', '*Be patient*, use the CBs.'],
      }),
    ],
  });
})();
