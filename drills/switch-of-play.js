/*
 * SESSION (DRAFT): Switch of Play: Game Like (Attacking · build-up and crossing)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#switch-of-play).
 *
 * Half a pitch, goal at the top with a keeper. A wave of 6 (red): LW, CM1, CM2, RW and two ATT; the next wave (yellow)
 * waits at the bottom. CM1 plays to LW, LW to ATT, ATT sets back to CM1, who switches play to RW.
 * Underlap: RW stays wide and plays forward to CM2 running inside; CM2 crosses for the two ATT (LW and CM1 arrive).
 * Overlap: RW comes inside, plays to ATT, who plays forward to CM2 overlapping round the outside.
 * Each player starts beside a mannequin and plays off it, around it or through it.
 * Pitch: x 0..100, y 0..75 (goal at the top).
 */
(function () {
  const RED = '#e5484d', YEL = '#e5b52b';
  const reds = [
    { id: 'LW', team: 'a', label: 'LW', x: 11, y: 48 },
    { id: 'A1', team: 'a', label: 'ST', x: 39, y: 42 },
    { id: 'A2', team: 'a', label: 'ST', x: 58, y: 45 },
    { id: 'CM1', team: 'a', label: 'CM', x: 37, y: 63 },
    { id: 'CM2', team: 'a', label: 'CM', x: 59, y: 64 },
    { id: 'RW', team: 'a', label: 'RW', x: 86, y: 50 },
  ];
  const yellows = [[18, 71], [34, 71], [37, 74], [55, 71], [58, 74], [80, 71]].map(([x, y], i) => ({ id: 'y' + i, team: 'w', x, y, dim: true }));
  const players = [{ id: 'gk', team: 'k', label: 'GK', x: 50, y: 4 }].concat(reds, yellows);
  const GOAL = [50, -2];
  const common = {
    plain: true,
    goals: [[50, 'top']],
    goalScale: 1.3,
    marks: [{ x: 18, y: 0, w: 64, h: 22 }, { x: 36, y: 0, w: 28, h: 8 }],
    // a mannequin beside each player: play off it, around it and through it
    mannequins: [[7, 43], [35, 37], [55, 40], [34, 57], [56, 58], [91, 45]],
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
      title: 'CM TO LW', text: ['The CM plays out to the *LW*.', '*Double movement*: take your marker away...', '...then come back into the space you made.'],
      tags: { LW: 'DOUBLE MOVE' }, timing: { move: 2.8 },
      moves: [{ id: 'LW', path: [[5, 36], [15, 46]], end: 0.62 }],
      passes: [{ to: 'LW', start: 0.45, end: 0.85 }],
    },
    {
      title: 'LW TO ATT', text: ['ATT: *double movement*. Go away first...', '...then come short to receive.'],
      tags: { A1: 'DOUBLE MOVE' }, timing: { move: 2.8 },
      moves: [{ id: 'A1', path: [[43, 32], [34, 46]], end: 0.6 }],
      passes: [{ to: 'A1', start: 0.35, end: 0.8 }],
    },
    {
      title: 'SET BACK', text: ['The ATT *sets it back* to a CM.', '*Mix it up*: either CM can play the switch.'],
      tags: { A1: 'SET' }, timing: { move: 2.2 },
      moves: [{ id: 'CM1', to: [40, 55], end: 0.45 }],
      passes: [{ to: 'CM1', start: 0.3, end: 0.75 }],
    },
    {
      title: 'SWITCH THE PLAY', text: ['The CM *switches play quickly*.', 'RW checks in, then spins out wide.', 'Pass *into space* for the RW to *run onto*.'],
      tags: { CM1: 'SWITCH', RW: 'RUN ONTO IT' }, timing: { move: 3 },
      moves: [{ id: 'RW', path: [[81, 55], [95, 40]], start: 0, end: 0.85 }],
      passes: [{ to: 'RW', start: 0.3, end: 0.85 }],
    },
  ];
  // attack the cross as a team: strikers cross over (near and far post), the opposite winger sweeps round the back of the
  // box for an over-hit cross, one CM gets into the box and one waits just outside it to back up.
  const finish = (crosser, inBox, edge) => [
    {
      title: 'ATTACK THE CROSS', text: ['Attack it *as a team*.', 'Strikers *cross over*: near post and far post.', 'LW sweeps the *back post* for an over-hit cross.'],
      tags: { [crosser]: 'CROSS', A1: 'NEAR POST', A2: 'FAR POST', LW: 'BACK POST' }, timing: { move: 3.4 },
      moves: [
        { id: 'A1', path: [[46, 26], [60, 9]], end: 0.7 }, { id: 'A2', path: [[56, 26], [42, 9]], end: 0.7 },
        { id: 'LW', path: [[16, 30], [27, 13]], start: 0.05, end: 0.9 },
        { id: inBox, to: [50, 17], start: 0.1, end: 0.9 }, { id: edge, to: [56, 28], start: 0.15, end: 0.9 },
      ],
      passes: [{ to: 'A1', start: 0.6, end: 0.95 }],
    },
    {
      title: 'FINISH', text: ['*Attack the ball* and finish.', 'One CM *in the box*, one *on the edge* to back up.'],
      tags: { A1: 'SHOOT', [inBox]: 'IN THE BOX', [edge]: 'EDGE OF BOX' }, shot: GOAL, timing: { move: 2 },
      ball: { to: [47, -2.5], start: 0.05, end: 0.45 },
      moves: [{ id: 'gk', to: [47, 4], start: 0.15, end: 0.45, arrow: false }],
    },
  ];
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
          { heading: 'Build-up', items: ['CM to LW, LW to ATT', 'ATT *sets back* to a CM: *mix up which one*', 'Either CM can switch it to the RW'] },
          { heading: 'Movement', items: ['*Double movements*: take your marker away from the space, then come back into it', 'Switch *into space* for the RW to run onto', 'Switch it with *energy*'] },
        ],
        phrase: { big: 'SWITCH IT QUICKLY', small: 'Game-like timing: take it away, come back' },
      },
      {
        title: 'Underlap or overlap',
        lead: 'Get round or inside the winger, then *cross*.',
        columns: [
          { heading: 'Underlap', items: ['The CM runs *inside* the winger', 'Winger goes *wide to the touchline* to open the gap inside', 'Winger plays the forward pass'] },
          { heading: 'Overlap', items: ['Winger *comes inside* to leave space outside', 'The deeper CM *times the run* round the outside', 'Winger plays to ATT, who plays the runner in'] },
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
      equipment: 'A goal, 6 mannequins (one beside each starting position), cones, bibs, plenty of balls with the waiting wave.',
      setup: [
        'CM plays to LW. LW plays to ATT. ATT sets back to CM, who switches play quickly to the RW.',
        'Underlap: RW stays wide and plays a forward pass to the underlapping CM, who crosses for the two ATT (and LW / CM arriving).',
        'Overlap: after the switch, the RW comes inside and plays to ATT, who plays a forward pass to the overlapping runner.',
        'Attack the cross as a team: strikers cross over (near post and far post), the opposite winger sweeps the back post for an over-hit cross, one CM gets into the box and one waits just outside to back up.',
        'Then the next wave of 6 plays the same pattern.',
        'Mix up which CM the ATT sets back to: either one can play the switch of play pass.',
        'Key points: game-like timing of movement. Double movements: take your marker away from the space, then come back into it.',
        'The switch goes into space in front of the RW, so they run onto it.',
        'When underlapping, the winger must stay wide to give the underlap space. When overlapping, the winger must come inside to allow space for the overlap.',
      ],
    },

    questions: [
      'Did your first movement take your marker away from the space?',
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
        steps: [{ title: 'THE SET-UP', text: ['LW, two CMs, RW and two ATT, each beside a *mannequin*.', 'Play off them, around them and through them.', 'The *next wave of 6* waits at the bottom.'] }].concat(build, [
          {
            title: 'DRIVE ON', text: ['RW *drives on* down the line.', 'Everyone gets ready to attack the cross.'],
            timing: { move: 2.4 },
            moves: [{ id: 'RW', to: [93, 20], end: 0.9 }],
          },
        ], finish('RW', 'CM2', 'CM1')),
        summary: ['CM to LW, LW to ATT, *set back*.', 'CM *switches play quickly* to the RW.', 'Cross, and *attack it as a team*.'],
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
            title: 'UNDERLAP', text: ['The RW goes *wide to the touchline*.', 'That opens the gap *inside* for the CM.', 'RW plays the *forward pass* into the run.'],
            tags: { RW: 'STAY WIDE', CM2: 'UNDERLAP' }, timing: { move: 3.2 },
            moves: [{ id: 'RW', to: [96, 34], end: 0.4 }, { id: 'CM2', path: [[70, 52], [80, 36], [82, 18]], end: 0.85 }],
            passes: [{ to: 'CM2', start: 0.45, end: 0.85 }],
          },
        ], finish('CM2', 'CM1', 'RW')),
        summary: ['Switch play quickly.', 'Winger goes *wide*; CM *underlaps*.', 'Cross and *attack it as a team*.'],
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
            title: 'WINGER COMES INSIDE', text: ['The RW *comes inside* with the ball.', 'That leaves space outside for the overlap.', 'The deeper CM *times the run*: go as the RW comes inside.'],
            tags: { RW: 'COME INSIDE', CM2: 'TIME IT' }, timing: { move: 3.2 },
            moves: [{ id: 'RW', to: [80, 44], end: 0.5 }, { id: 'A2', to: [65, 34], end: 0.5 }, { id: 'CM2', path: [[74, 62], [88, 56]], start: 0.35, end: 1 }],
            passes: [{ to: 'A2', start: 0.55, end: 0.85 }],
          },
          {
            title: 'OVERLAP', text: ['The CM runs *round the outside*: arrive as the pass is played.', 'Too early and you wait; too late and the chance has gone.', 'ATT plays the *forward pass* into the run.'],
            tags: { CM2: 'OVERLAP' }, timing: { move: 3 },
            moves: [{ id: 'CM2', path: [[96, 46], [96, 30], [91, 18]], end: 0.8 }],
            passes: [{ to: 'CM2', start: 0.45, end: 0.85 }],
          },
        ], finish('CM2', 'CM1', 'RW')),
        summary: ['Switch play quickly.', 'Winger *comes inside*; CM *overlaps*.', 'Cross and *attack it as a team*.'],
      }),
    ],
  });
})();
