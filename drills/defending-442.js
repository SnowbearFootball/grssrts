/*
 * SESSION: Defending in a 4-4-2 Against a Wide 4-3-3 (Defending · tactical)
 * From a coach's own session plan.
 *
 * Primary player: the winger. Primary unit: midfield 4. Secondary unit: back 4.
 * One side of the pitch, goal at the top (the far side marked by blue cones). Reds attack the goal in a 3-3-2;
 * greens defend in a 3-3-2 and score by carrying the ball over halfway under control.
 * Pitch units: x 0..100, y 0..75. Halfway at y 62.
 */
(function () {
  const G = '#2fbf7f', R = '#e5484d';
  const players = [
    { id: 'g1', team: 'k', label: '1', x: 31, y: 6 },
    { id: 'g5', team: 'g', label: '5', x: 27, y: 26 }, { id: 'g6', team: 'g', label: '6', x: 49, y: 25 }, { id: 'g3', team: 'g', label: '3', x: 68, y: 26 },
    { id: 'g8', team: 'g', label: '8', x: 35, y: 34 }, { id: 'g4', team: 'g', label: '4', x: 52, y: 35 }, { id: 'g11', team: 'g', label: '11', x: 66, y: 35 },
    { id: 'g10', team: 'g', label: '10', x: 27, y: 42 }, { id: 'g9', team: 'g', label: '9', x: 44, y: 44 },
    { id: 'r9', team: 'r', label: '9', x: 33, y: 30 }, { id: 'r10', team: 'r', label: '10', x: 72, y: 40 }, { id: 'r7', team: 'r', label: '7', x: 88, y: 29 },
    { id: 'r8', team: 'r', label: '8', x: 18, y: 47 }, { id: 'r4', team: 'r', label: '4', x: 42, y: 51 }, { id: 'r2', team: 'r', label: '2', x: 89, y: 54 },
    { id: 'r6', team: 'r', label: '6', x: 24, y: 68 }, { id: 'r5', team: 'r', label: '5', x: 58, y: 65 },
  ];
  const common = {
    plain: true,
    goals: [[31, 'top']],
    marks: [{ x: -1, y: 0, w: 64, h: 20 }, { x: 17, y: 0, w: 28, h: 7 }, { x: 14, y: 62, w: 86, h: 0 }],
    cones: [12, 24, 36, 48, 60].map(y => ({ at: [14, y], color: '#3b9ae1' })),
    teamColors: { g: G, r: R },
    facing: { g: 1, r: -1 },
    legendTeams: [{ label: 'Greens (defend, 4-4-2)', color: G }, { label: 'Reds (attack, 4-3-3)', color: R }],
    players,
    ball: { owner: 'r5' },
    keyPhrase: { big: 'COMPACT, SHOW IT WIDE', small: 'Pressure, cover, balance' },
  };
  // the ball goes wide: the pressing trigger
  const wide = {
    title: 'BALL GOES WIDE: THE TRIGGER',
    text: ['The ball goes into the *wide area*.', 'That\'s the *pressing trigger*.'],
    tags: { r2: 'TRIGGER' }, timing: { move: 2.4 },
    passes: [{ to: 'r2', start: 0.05, end: 0.6 }],
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'defending-442',
    topics: ['Shape', 'Pressing'],
    title: 'Defending the Wide Areas',
    coachTitle: 'Defending in a 4-4-2 Against a Wide 4-3-3',
    fromCoach: true,
    subtitle: 'Primary player: winger · Primary unit: midfield 4',
    type: 'Tactical',
    category: 'defending',
    squad: [16, 18],
    thumb: 'assets/thumbs/defending-442.jpg',
    summary: 'Defend as a compact 4-4-2: show the ball wide, press when it goes into the wide area, and use pressure, cover, balance and the staircase. Win it and carry it over halfway.',
    keyPhrase: 'Compact, show it wide',
    ages: { from: 14 },

    cards: [
      {
        title: 'Before',
        lead: 'Stay *compact*. *Show the ball wide*, away from goal.',
        columns: [
          { heading: 'Compactness', items: ['Short distances between players', '*Limit the space* between the lines', 'Midfield 4 and back 4 move together'] },
          { heading: 'Show it wide', items: ['Strikers block the way inside', 'Force them out to the side', 'Wide = further from goal'] },
        ],
        phrase: { big: 'COMPACT, SHOW IT WIDE', small: 'Pressure, cover, balance' },
      },
      {
        title: 'During',
        lead: 'Ball goes wide: *that\'s the trigger*.',
        columns: [
          { heading: 'Pressure, cover, balance', items: ['Winger *presses*: curve the run, block the pass inside', 'Next player *covers* behind at an angle', 'The rest *balance*: shift across, tuck in'] },
          { heading: 'The staircase', items: ['Each player a step *behind and inside* the last', 'Like steps on a staircase', 'No straight lines, no big gaps'] },
        ],
      },
    ],

    keywords: [
      { word: 'Compact', meaning: 'Players close together, with little space between them or between the lines.' },
      { word: 'Pressing trigger', meaning: 'A moment that tells us to press: here, the ball going into the wide area.' },
      { word: 'Pressure, cover, balance', meaning: 'One presses the ball, the next covers behind, the rest balance the shape.' },
      { word: 'Staircase', meaning: 'Defenders stepped diagonally behind each other, so each one covers the one in front.' },
      { word: 'Between the lines', meaning: 'The space between the midfield 4 and the back 4. Keep it small.' },
    ],

    training: {
      area: 'One half of the pitch, from the goal to halfway, across to a line of cones past the far post.',
      players: 'Greens defend in a 4-4-2 shape (3-3-2 on this side, plus a keeper). Reds attack in a 4-3-3 shape (3-3-2).',
      equipment: 'A goal, cones, bibs, balls with the reds.',
      setup: [
        'Reds attack the goal in a 4-3-3 shape (3-3-2). Greens defend the goal in a 4-4-2 shape (3-3-2).',
        'Greens score by progressing the ball over halfway with the ball under control.',
        'Before: emphasise compactness. Show the ball wide, away from goal.',
        'During: use pressure, cover, balance and the staircase principle. Press when the ball goes into the wide area (the trigger). Limit the space between the lines and units.',
        'After: reinforce the basic principles of compactness and pressure, cover, balance.',
      ],
    },

    questions: [
      'What is our pressing trigger?',
      'Winger: how did you curve your run? What did it stop?',
      'Who covered? Who balanced?',
      'How big was the space between our midfield and our back line?',
    ],

    clips: [
      // ---------------- 1 ----------------
      Object.assign({}, common, {
        id: 'compact',
        video: 'videos/defending-442-1.mp4',
        kicker: 'Clip 1 · before',
        title: 'Compact: Show It Wide',
        tagline: 'Stay compact. Show the ball wide, away from goal.',
        intro: ['Reds attack in a *4-3-3*. Greens defend in a *4-4-2*.', 'Greens: stay *compact*...', '...and *show the ball wide*, away from goal.'],
        steps: [
          {
            title: 'THE SET-UP',
            text: ['One side of the pitch. Reds attack the goal.', 'Greens defend: midfield 4 and back 4 (this side).', 'Greens score by carrying it *over halfway*.'],
          },
          {
            title: 'SHOW IT WIDE',
            text: ['The striker *curves the press*...', '...blocking the way inside.', 'The other striker *screens* the middle.'],
            tags: { g9: 'SHOW', g10: 'SCREEN' }, timing: { move: 3 },
            moves: [{ id: 'g9', path: [[50, 52], [55, 59]], end: 0.85 }, { id: 'g10', to: [35, 46], start: 0.1, end: 0.85 }],
          },
          {
            title: 'STAY COMPACT',
            text: ['Midfield 4 and back 4 *squeeze together*.', '*Limit the space* between the lines.'],
            tags: { g4: 'COMPACT', g6: 'COMPACT' }, timing: { move: 2.8 },
            moves: [
              { id: 'g8', to: [40, 38], end: 0.8 }, { id: 'g4', to: [55, 38], end: 0.8 }, { id: 'g11', to: [66, 37], end: 0.8 },
              { id: 'g5', to: [28, 28], end: 0.8 }, { id: 'g6', to: [51, 29], end: 0.8 }, { id: 'g3', to: [68, 29], end: 0.8 },
            ],
          },
          Object.assign({}, wide, { text: ['No way inside: the ball goes *wide*.', 'Just what we wanted. Now it\'s the *trigger*.'] }),
        ],
        summary: ['Stay *compact*: small spaces between the lines.', 'Strikers *show it wide*.', 'Ball wide = the *trigger* to press.'],
      }),

      // ---------------- 2 ----------------
      Object.assign({}, common, {
        id: 'press',
        video: 'videos/defending-442-2.mp4',
        kicker: 'Clip 2 · during',
        title: 'Press, Cover, Balance',
        tagline: 'The winger presses, the staircase forms, win it and go.',
        intro: ['Ball goes wide: *press*.', 'The winger is the key player.', '*Pressure, cover, balance*: the staircase.'],
        steps: [
          wide,
          {
            title: 'PRESSURE',
            text: ['The *winger presses*.', '*Curve the run*: block the pass inside.', 'Show them down the line.'],
            tags: { g11: 'PRESS' }, timing: { move: 2.6 },
            moves: [{ id: 'g11', path: [[78, 40], [85, 49]], end: 0.9 }],
          },
          {
            title: 'COVER AND BALANCE: THE STAIRCASE',
            text: ['Next player *covers*, a step behind and inside.', 'The rest *balance*: shift across, tuck in.', 'Each a step behind the last: a *staircase*.'],
            tags: { g4: 'COVER', g3: 'TIGHT', g8: 'BALANCE', g6: 'COVER' }, timing: { move: 3.2 },
            moves: [
              { id: 'g4', to: [77, 45], end: 0.8 }, { id: 'g8', to: [60, 40], end: 0.8 }, { id: 'g3', to: [84, 32], end: 0.8 },
              { id: 'g6', to: [70, 28], end: 0.8 }, { id: 'g5', to: [52, 25], end: 0.8 }, { id: 'g9', to: [66, 56], end: 0.8 },
              { id: 'g10', to: [48, 48], end: 0.8 },
            ],
          },
          {
            title: 'WIN IT',
            text: ['Only the line is left. *Tight* to the winger...', '...and the full back *wins it*.'],
            tags: { g3: 'WON IT!' }, timing: { move: 2.6 },
            moves: [{ id: 'r7', to: [90, 33], end: 0.4 }, { id: 'g3', to: [87, 35], start: 0.2, end: 0.6 }],
            passes: [{ to: 'g3', start: 0.3, end: 0.65 }],
          },
          {
            title: 'OVER HALFWAY',
            text: ['Play forward to the winger...', '...who carries it *over halfway, under control*.', 'That\'s a *goal* for the greens.'],
            tags: { g11: 'SCORE' }, timing: { move: 3.4 },
            passes: [{ to: 'g11', start: 0.05, end: 0.35 }],
            moves: [{ id: 'g11', path: [[82, 56], [80, 66]], start: 0.4, end: 1 }, { id: 'r2', to: [86, 60], start: 0.3, end: 1 }],
          },
        ],
        summary: ['Ball wide: the *trigger*.', 'Winger *presses*, next one *covers*, the rest *balance*.', 'The *staircase*. Win it, carry it over halfway.'],
      }),

      // ---------------- 3 ----------------
      Object.assign({}, common, {
        id: 'shift',
        video: 'videos/defending-442-3.mp4',
        kicker: 'Clip 3 · during',
        title: 'Shift Together',
        tagline: 'They go back and across: shift as a unit, stay compact.',
        intro: ['Reds go *back and across*.', 'Greens *shift together*.', 'The staircase forms on the *other side*.'],
        steps: [
          wide,
          {
            title: 'BACK AND ACROSS',
            text: ['Pressed, the reds go *back and across*.', 'Greens *shift together* as the ball travels.'],
            timing: { move: 3.8 },
            passes: [{ to: 'r5', start: 0.05, end: 0.35 }, { to: 'r6', start: 0.45, end: 0.75 }],
            moves: [
              { id: 'g11', to: [67, 37], end: 0.9 }, { id: 'g4', to: [55, 39], end: 0.9 }, { id: 'g8', to: [40, 39], end: 0.9 },
              { id: 'g9', to: [50, 56], end: 0.9 }, { id: 'g10', to: [30, 54], end: 0.9 },
            ],
          },
          {
            title: 'SHOW IT WIDE AGAIN',
            text: ['Striker *shows it wide* again...', '...out to the other side.'],
            tags: { g10: 'SHOW' }, timing: { move: 2.6 },
            passes: [{ to: 'r8', start: 0.4, end: 0.85 }],
            moves: [{ id: 'g10', path: [[26, 60], [24, 62]], end: 0.6 }],
          },
          {
            title: 'THE STAIRCASE, OTHER SIDE',
            text: ['Nearest midfielder *presses*.', 'Next *covers*, the rest *balance*.', 'Stay *compact*: no space between the lines.'],
            tags: { g8: 'PRESS', g4: 'COVER', g11: 'BALANCE' }, timing: { move: 3.2 },
            moves: [
              { id: 'g8', path: [[27, 41], [22, 43]], end: 0.85 }, { id: 'g4', to: [36, 40], end: 0.85 }, { id: 'g11', to: [55, 38], end: 0.85 },
              { id: 'g5', to: [26, 30], end: 0.85 }, { id: 'g6', to: [42, 27], end: 0.85 }, { id: 'g3', to: [60, 27], end: 0.85 },
            ],
          },
        ],
        summary: ['Ball goes back and across: *shift together*.', '*Show it wide* again.', 'Pressure, cover, balance: *stay compact*.'],
      }),
    ],
  });
})();
