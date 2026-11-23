/*
 * SESSION (DRAFT): Defend as a Back Four (Defending)
 * Newly written for the library. draft: true keeps it off the site until approved (index.html?drafts#back-four).
 *
 * Four defenders in a line in front of a goal and keeper. Four attackers (plus one deeper) pass the ball across in front
 * of them. The back four move as one: nearest presses, next covers, the others shift across and tuck in; step up together
 * when the ball goes back, drop together when it can go forward. At 7 v 7 or 9 v 9, play it with 2 or 3 at the back.
 * Pitch units: x 0..100, y 0..75. The goal is at the BOTTOM. Blue defends it; green attacks it.
 */
(function () {
  const line = (y, xs) => ({ LB: [xs[0], y], LCB: [xs[1], y + 2], RCB: [xs[2], y + 2], RB: [xs[3], y] });
  const to = (pos, ids, start = 0.25, end = 0.95) => ids.map(id => ({ id, to: pos[id], start, end }));
  const HOME = line(44, [18, 39, 61, 82]);
  const D = ['LB', 'LCB', 'RCB', 'RB'];
  const common = {
    goals: [[50, 'bottom']],
    marks: [{ x: 18, y: 53, w: 64, h: 22 }, { x: 36, y: 67, w: 28, h: 8 }],
    legend: { a: 'Attackers', d: 'Back four' },
    players: [
      { id: 'gk', team: 'k', label: 'GK', x: 50, y: 73 },
      ...D.map(id => ({ id, team: 'd', label: id.replace(/^[LR](CB)$/, '$1'), x: HOME[id][0], y: HOME[id][1] })),
      { id: 'a1', team: 'a', x: 14, y: 18 }, { id: 'a2', team: 'a', x: 38, y: 16 },
      { id: 'a3', team: 'a', x: 62, y: 16 }, { id: 'a4', team: 'a', x: 86, y: 18 },
      { id: 'a5', team: 'a', x: 50, y: 5 },
    ],
    ball: { owner: 'a2' },
    keyPhrase: { big: 'MOVE AS ONE', small: 'Press, cover, shift, tuck in' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'back-four',
    draft: true,
    title: 'Defend as a Back Four',
    subtitle: 'Defending as a unit',
    type: 'Tactical',
    category: 'defending',
    squad: [9, 12],
    thumb: 'assets/thumbs/back-four.jpg',
    summary: 'Four defenders move as one: press, cover, shift across and tuck in. Step up together, drop together.',
    keyPhrase: 'Move as one',
    ages: { from: 10, note: 'From U8 with a back two or three (7 v 7 and 9 v 9).' },

    cards: [
      {
        title: 'Shift across',
        lead: 'The ball moves, *the whole line moves*.',
        columns: [
          { heading: 'Nearest the ball', items: ['*Press*: go and stop them playing forward', 'Next one *covers* behind, at an angle'] },
          { heading: 'Everyone else', items: ['*Shift across* towards the ball', 'Far side *tucks in*', 'Stay close together: no big gaps'] },
        ],
        phrase: { big: 'MOVE AS ONE', small: 'Press, cover, shift, tuck in' },
      },
      {
        title: 'Step up, drop',
        lead: 'Up together, back together. *Talk to each other*.',
        columns: [
          { heading: 'Step up', items: ['Ball goes *backwards*: step up together', 'Squeeze the space in front of you'] },
          { heading: 'Drop', items: ['They have time to pass *forward*: drop together', 'Stay *goal-side*', 'Keep the line straight'] },
        ],
      },
    ],

    keywords: [
      { word: 'Back four', meaning: 'The four defenders: left back, two centre backs, right back.' },
      { word: 'Press', meaning: 'Go to the player with the ball and stop them playing forward.' },
      { word: 'Cover', meaning: 'Stand behind the presser, at an angle, ready to help if they get beaten.' },
      { word: 'Shift', meaning: 'Move across the pitch together, towards the side the ball is on.' },
      { word: 'Tuck in', meaning: 'The defender furthest from the ball moves in towards the middle.' },
    ],

    training: {
      area: 'About 40 yards wide and 30 yards deep, in front of a goal.',
      players: 'A back four and a keeper, against 4 or 5 attackers. Playing 7 v 7 or 9 v 9? Use 2 or 3 at the back: the same ideas.',
      equipment: 'A goal, cones for the area, bibs, plenty of balls with the attackers.',
      setup: [
        'The back four start in a line, about 10 yards apart. The attackers spread out in front.',
        'Attackers pass the ball across. Slowly at first, so the defenders can learn where to go.',
        'Nearest defender presses. The next one covers behind at an angle. The others shift across and tuck in.',
        'Ball goes backwards: step up together. Attackers have time to pass forward: drop together.',
        'Talk: the presser shouts "go", the cover shouts "I\'m behind you".',
        'Then let the attackers try to score. Defenders win it and pass to the coach (or through a gate) for a point.',
      ],
    },

    questions: [
      'The ball has moved. Who presses now?',
      'Where does the cover stand?',
      'Are there any big gaps in our line?',
      'When do we step up? When do we drop?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'shift',
        video: 'videos/back-four-1.mp4',
        kicker: 'Clip 1',
        title: 'Press, Cover, Shift',
        tagline: 'The ball moves, the whole line moves.',
        intro: ['A *back four* in front of the goal.', 'The ball moves: *the whole line moves*.', 'Playing 7 v 7? Use *2 or 3* at the back.'],
        steps: (function () {
          const R = line(44, [32, 50, 66, 80]); R.RB = [80, 30]; R.RCB = [68, 40];
          const L = line(44, [20, 34, 52, 68]); L.LB = [20, 30]; L.LCB = [32, 40];
          return [
            {
              title: 'THE SET-UP',
              text: ['Four defenders in a line, about *10 yards apart*.', 'Ball in the middle: stay level and central.'],
            },
            {
              title: 'BALL GOES WIDE',
              text: ['Nearest defender *presses*.', 'Next one *covers* behind, at an angle.', 'The others *shift across* and *tuck in*.'],
              tags: { RB: 'PRESS', RCB: 'COVER', LCB: 'SHIFT', LB: 'TUCK IN' }, timing: { move: 3.4 },
              passes: [{ to: 'a4', start: 0.05, end: 0.5 }],
              moves: to(R, D, 0.2),
            },
            {
              title: 'SWITCHED TO THE OTHER SIDE',
              text: ['The ball goes across. *Move while it travels*.', 'Now the left back presses.', 'Everyone shifts the other way.'],
              tags: { LB: 'PRESS', LCB: 'COVER', RCB: 'SHIFT', RB: 'TUCK IN' }, timing: { move: 3.8 },
              passes: [{ to: 'a1', start: 0.05, end: 0.6 }],
              moves: to(L, D, 0.15),
            },
            {
              title: 'BACK TO THE MIDDLE',
              text: ['Ball back in the middle.', 'Back into a *straight line*, close together.'],
              timing: { move: 3 },
              passes: [{ to: 'a2', start: 0.05, end: 0.45 }],
              moves: to(HOME, D, 0.2),
            },
          ];
        })(),
        summary: ['Nearest *presses*.', 'Next one *covers*.', 'Others *shift across* and *tuck in*.'],
      }),

      Object.assign({}, common, {
        id: 'step-up-drop',
        video: 'videos/back-four-2.mp4',
        kicker: 'Clip 2',
        title: 'Step Up, Drop',
        tagline: 'Up together, back together.',
        intro: ['The line moves *up and back* too.', 'Ball goes backwards: *step up*.', 'They can pass forward: *drop*.'],
        steps: (function () {
          const UP = line(34, [20, 40, 60, 80]);
          const DROP = line(48, [20, 40, 60, 80]);
          const P = line(50, [26, 40, 62, 76]); P.RCB = [61, 40]; P.LCB = [48, 50];
          return [
            {
              title: 'THE SET-UP',
              text: ['The back four in a straight line.', 'An attacker waits *deep*.'],
            },
            {
              title: 'BALL GOES BACK: STEP UP',
              text: ['The ball goes *backwards*.', '*Step up together*: squeeze the space.'],
              tags: { LCB: 'STEP UP', RCB: 'STEP UP' }, timing: { move: 3 },
              passes: [{ to: 'a5', start: 0.05, end: 0.45 }],
              moves: to(UP, D, 0.3),
            },
            {
              title: 'TIME TO PASS FORWARD: DROP',
              text: ['No pressure on the ball: they can pass *forward*.', '*Drop together*. Stay goal-side.', 'Keep the line straight.'],
              tags: { LCB: 'DROP', RCB: 'DROP' }, timing: { move: 3 },
              moves: to(DROP, D, 0.1, 0.8).concat([{ id: 'a3', to: [62, 30], start: 0.3, end: 0.95 }]),
            },
            {
              title: 'BALL PLAYED IN: PRESS',
              text: ['Ball played in to an attacker.', 'Nearest *presses*, next *covers*.', 'The others shift and tuck in.'],
              tags: { RCB: 'PRESS', LCB: 'COVER', RB: 'TUCK IN' }, timing: { move: 3.2 },
              passes: [{ to: 'a3', start: 0.05, end: 0.45 }],
              moves: to(P, D, 0.3),
            },
          ];
        })(),
        summary: ['Ball goes back: *step up* together.', 'They can pass forward: *drop* together.', '*Talk*: move as one.'],
      }),
    ],
  });
})();
