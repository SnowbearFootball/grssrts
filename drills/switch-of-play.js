/*
 * SESSION (DRAFT): Switch of Play: Game Like (Attacking · build-up and crossing)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#switch-of-play).
 *
 * Half a pitch, goal at the top with a keeper. A wave of 6 (red): LW, CM1, CM2, RW and two ATT; the next wave (yellow)
 * waits at the bottom. CM1 plays to LW, LW to ATT, ATT sets back to CM1, who switches play to RW.
 * Underlap: RW stays wide and plays forward to CM2 running inside; CM2 crosses for the two ATT (LW and CM1 arrive).
 * Overlap: RW comes inside, plays to ATT, who plays forward to CM2 overlapping round the outside.
 * Pitch: x 0..100, y 0..75 (goal at the top).
 */
(function () {
  const RED = '#e5484d', YEL = '#e5b52b';
  const reds = [
    { id: 'LW', team: 'a', label: 'LW', x: 14, y: 42 },
    { id: 'A1', team: 'a', label: 'ST', x: 40, y: 31 },
    { id: 'A2', team: 'a', label: 'ST', x: 60, y: 33 },
    { id: 'CM1', team: 'a', label: 'CM', x: 37, y: 57 },
    { id: 'CM2', team: 'a', label: 'CM', x: 58, y: 59 },
    { id: 'RW', team: 'a', label: 'RW', x: 86, y: 44 },
  ];
  const yellows = [[18, 71], [34, 71], [37, 74], [55, 71], [58, 74], [80, 71]].map(([x, y], i) => ({ id: 'y' + i, team: 'w', x, y, dim: true }));
  const players = [{ id: 'gk', team: 'k', label: 'GK', x: 50, y: 4 }].concat(reds, yellows);
  const GOAL = [50, -2];
  const common = {
    plain: true,
    goals: [[50, 'top']],
    goalScale: 1.3,
    marks: [{ x: 18, y: 0, w: 64, h: 22 }, { x: 36, y: 0, w: 28, h: 8 }],
    teamColors: { a: RED, w: YEL },
    facing: { a: -1, w: -1 },
    legendTeams: [{ label: 'This wave', color: RED }, { label: 'Next wave', color: YEL }],
    players,
    ball: { owner: 'CM1' },
    keyPhrase: { big: 'SWITCH IT QUICKLY', small: 'Game-like timing: take it away, come back' },
  };
  // the build-up and switch, shared by all three clips
  const build = [
    {
      title: 'CM TO LW', text: ['The CM plays out to the *LW*.', 'LW: *take it away, come back* to receive.'],
      tags: { LW: 'COME SHORT' }, timing: { move: 2.6 },
      moves: [{ id: 'LW', path: [[10, 36], [17, 46]], end: 0.6 }],
      passes: [{ to: 'LW', start: 0.45, end: 0.85 }],
    },
    {
      title: 'LW TO ATT', text: ['LW finds the *ATT*, who comes short.'],
      timing: { move: 2.4 },
      moves: [{ id: 'A1', to: [36, 37], end: 0.5 }],
      passes: [{ to: 'A1', start: 0.35, end: 0.8 }],
    },
    {
      title: 'SET BACK', text: ['The ATT *sets it back* to the CM.'],
      tags: { A1: 'SET' }, timing: { move: 2.2 },
      moves: [{ id: 'CM1', to: [38, 50], end: 0.45 }],
      passes: [{ to: 'CM1', start: 0.3, end: 0.75 }],
    },
    {
      title: 'SWITCH THE PLAY', text: ['The CM *switches play quickly* to the RW.', 'Energy!'],
      tags: { CM1: 'SWITCH' }, timing: { move: 2.6 },
      moves: [{ id: 'RW', to: [88, 46], start: 0.2, end: 0.6, arrow: false }],
      passes: [{ to: 'RW', start: 0.05, end: 0.7 }],
    },
  ];
  const finish = (crosser, target) => [
    {
      title: 'CROSS', text: ['Cross for the *two ATT*.', 'They cross over: one *near post*, one *far post*.', 'LW and CM arrive at the edge of the box.'],
      tags: { [crosser]: 'CROSS', A1: 'NEAR POST', A2: 'FAR POST' }, timing: { move: 3 },
      moves: [
        { id: 'A1', path: [[46, 24], [60, 9]], end: 0.7 }, { id: 'A2', path: [[56, 24], [43, 9]], end: 0.7 },
        { id: 'LW', to: [30, 26], start: 0.1, end: 0.9 }, { id: 'CM1', to: [50, 28], start: 0.15, end: 0.9 },
      ],
      passes: [{ to: target, start: 0.55, end: 0.95 }],
    },
    {
      title: 'FINISH', text: ['*Attack the ball* and finish.'],
      tags: { [target]: 'SHOOT' }, shot: GOAL, timing: { move: 1.8 },
      ball: { to: [47, -2.5], start: 0.05, end: 0.45 },
      moves: [{ id: 'gk', to: [47, 4], start: 0.15, end: 0.45, arrow: false }],
    },
  ];
  const nextWave = {
    title: 'NEXT WAVE OF 6', text: ['This wave comes off.', 'The *next wave of 6* steps on and plays the same pattern.'],
    timing: { move: 3 },
    dim: Object.assign({}, ...reds.map(r => ({ [r.id]: true })), ...yellows.map(y => ({ [y.id]: false }))),
    // the yellow wave takes the starting spots (LW, CM, ST, CM, ST, RW); the red wave goes to the back
    moves: [0, 3, 1, 4, 2, 5].map((r, i) => ({ id: yellows[i].id, to: [reds[r].x, reds[r].y], start: 0.15, end: 0.95, arrow: false }))
      .concat(reds.map((r, i) => ({ id: r.id, to: [yellows[[0, 2, 4, 1, 3, 5][i]].x, yellows[[0, 2, 4, 1, 3, 5][i]].y], start: 0, end: 0.8, arrow: false }))),
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'switch-of-play',
    draft: true,
    title: 'Switch of Play: Game Like',
    subtitle: 'Build-up, switch and cross',
    type: 'Tactical',
    category: 'attacking',
    squad: [13, 19],
    thumb: 'assets/thumbs/switch-of-play.jpg',
    summary: 'Build up on one side, switch play quickly, then underlap or overlap on the other side to cross for two strikers.',
    keyPhrase: 'Switch it quickly',
    ages: { from: 14 },

    cards: [
      {
        title: 'The switch',
        lead: 'Draw them one way, then *switch play quickly*.',
        columns: [
          { heading: 'Build-up', items: ['CM to LW, LW to ATT', 'ATT *sets back* to the CM', 'CM switches to the RW'] },
          { heading: 'Timing', items: ['*Game-like* timing of movement', '*Take it away, come back* to receive', 'Switch it with *energy*'] },
        ],
        phrase: { big: 'SWITCH IT QUICKLY', small: 'Game-like timing: take it away, come back' },
      },
      {
        title: 'Underlap or overlap',
        lead: 'Get round or inside the winger, then *cross*.',
        columns: [
          { heading: 'Underlap', items: ['The CM runs *inside* the winger', 'Winger *stays wide* to give the underlap space', 'Winger plays the forward pass'] },
          { heading: 'Overlap', items: ['The CM runs *round the outside*', 'Winger *comes inside* to give the overlap space', 'Winger plays to ATT, who plays the runner in'] },
        ],
      },
    ],

    keywords: [
      { word: 'Switch of play', meaning: 'Moving the ball quickly from one side of the pitch to the other.' },
      { word: 'Set back', meaning: 'A short pass back to a teammate facing the way you want to play.' },
      { word: 'Underlap', meaning: 'A run inside a teammate who has the ball out wide.' },
      { word: 'Overlap', meaning: 'A run round the outside of a teammate who has the ball.' },
      { word: 'Take it away, come back', meaning: 'Move away from where you want the ball, then come back into space to receive it.' },
    ],

    training: {
      area: 'Half a pitch, with a goal and a keeper.',
      players: 'Waves of 6 (LW, two CMs, RW, two ATT) plus a keeper. The next wave waits at the halfway line.',
      equipment: 'A goal, cones, bibs, plenty of balls with the waiting wave.',
      setup: [
        'CM plays to LW. LW plays to ATT. ATT sets back to CM, who switches play quickly to the RW.',
        'Underlap: RW stays wide and plays a forward pass to the underlapping CM, who crosses for the two ATT (and LW / CM arriving).',
        'Overlap: after the switch, the RW comes inside and plays to ATT, who plays a forward pass to the overlapping runner.',
        'Then the next wave of 6 plays the same pattern.',
        'Key points: game-like timing of movement. Take it away, come back.',
        'When underlapping, the winger must stay wide to give the underlap space. When overlapping, the winger must come inside to allow space for the overlap.',
      ],
    },

    questions: [
      'When did you start your run to receive?',
      'How quickly did we switch the play?',
      'Underlap or overlap: where did the winger need to be?',
      'Strikers: who went near post, who went far post?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'build-and-switch',
        video: 'videos/switch-of-play-1.mp4',
        kicker: 'Clip 1 · build-up and switch',
        title: 'Build Up and Switch',
        tagline: 'Draw them one way, then switch play quickly.',
        intro: ['A wave of 6 plays; the *next wave* waits.', 'Build up on the left...', '...then *switch play quickly* to the right.'],
        steps: [{ title: 'THE SET-UP', text: ['LW, two CMs, RW and two ATT.', 'The *next wave of 6* waits at the bottom.'] }].concat(build),
        summary: ['CM to LW, LW to ATT.', 'ATT *sets back* to the CM.', 'CM *switches play quickly* to the RW.'],
      }),

      Object.assign({}, common, {
        id: 'underlap',
        video: 'videos/switch-of-play-2.mp4',
        kicker: 'Clip 2 · underlap',
        title: 'Switch and Underlap',
        tagline: 'Winger stays wide; the CM runs inside and crosses.',
        intro: ['Build up, then switch.', 'The RW *stays wide*; the CM *underlaps*.', 'Cross for the two ATT.'],
        steps: build.concat([
          {
            title: 'UNDERLAP', text: ['The RW *stays wide* to give the underlap space.', 'The CM runs *inside* the RW.', 'RW plays the *forward pass* into the run.'],
            tags: { RW: 'STAY WIDE', CM2: 'UNDERLAP' }, timing: { move: 3 },
            moves: [{ id: 'CM2', path: [[70, 44], [80, 18]], end: 0.8 }],
            passes: [{ to: 'CM2', start: 0.35, end: 0.8 }],
          },
        ], finish('CM2', 'A1'), [nextWave]),
        summary: ['Switch play quickly.', 'Winger *stays wide*; CM *underlaps*.', 'Cross for the two ATT.', 'Next wave goes.'],
      }),

      Object.assign({}, common, {
        id: 'overlap',
        video: 'videos/switch-of-play-3.mp4',
        kicker: 'Clip 3 · overlap',
        title: 'Switch and Overlap',
        tagline: 'Winger comes inside; the CM overlaps round the outside.',
        intro: ['Build up, then switch.', 'The RW *comes inside*; the CM *overlaps*.', 'ATT plays the overlapping runner in.'],
        steps: build.concat([
          {
            title: 'WINGER COMES INSIDE', text: ['The RW *comes inside* to make space for the overlap.', 'RW plays to the *ATT*.'],
            tags: { RW: 'COME INSIDE' }, timing: { move: 2.8 },
            moves: [{ id: 'RW', to: [76, 38], end: 0.5 }, { id: 'A2', to: [64, 30], end: 0.5 }],
            passes: [{ to: 'A2', start: 0.4, end: 0.8 }],
          },
          {
            title: 'OVERLAP', text: ['The CM runs *round the outside*.', 'ATT plays the *forward pass* to the overlapping runner.'],
            tags: { CM2: 'OVERLAP' }, timing: { move: 3 },
            moves: [{ id: 'CM2', path: [[86, 52], [92, 18]], end: 0.8 }],
            passes: [{ to: 'CM2', start: 0.45, end: 0.85 }],
          },
        ], finish('CM2', 'A1')),
        summary: ['Switch play quickly.', 'Winger *comes inside*; CM *overlaps*.', 'ATT plays the runner in; cross and finish.'],
      }),
    ],
  });
})();
