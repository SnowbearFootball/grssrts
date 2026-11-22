/*
 * SESSION (DRAFT): Long Range Shooting (Attacking)
 * From a coach's own session plan. draft: true keeps it off the site's lists until it is approved
 * (open index.html?drafts#long-range-shooting to see it).
 *
 * The pitch is laid sideways: 35 yards long (x 0..100, about 2.86 units a yard) by 25 yards wide (y 0..75, 3 units a yard).
 * Goals on the left and right. Green attacks the right-hand goal, blue the left. 'f' = floaters, 'k'/'k2' = keepers.
 * Clips 1–2: end zones 15 yards (x 0–42.9 and 57.1–100), middle zone 5 yards.
 * Clips 3–4: end zones 10 yards (x 0–28.6 and 71.4–100), middle zone 15 yards.
 */
(function () {
  const FLOAT = '#e0a91b';
  const narrowMiddle = [{ x: 42.9, y: 0, w: 14.2, h: 75 }];
  const wideMiddle = [{ x: 28.6, y: 0, w: 42.8, h: 75 }];
  const common = {
    goals: [[37.5, 'left'], [37.5, 'right']],
    goalScale: 1.4,
    facing: { a: 'right', d: 'left', f: 'right', k: 'right', k2: 'left' },
    teamColors: { f: FLOAT, k2: '#2b2b2b' },
    legendTeams: [{ label: 'Green', color: '#2fbf7f' }, { label: 'Blue', color: '#3b9ae1' }, { label: 'Floater', color: FLOAT }],
    keyPhrase: { big: 'SEE IT, SHOOT IT', small: 'Shoot early, from distance' },
  };
  const keepers = [
    { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 },
    { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5, ball: true },
  ];
  const fiveV5 = keepers.concat([
    { id: 'a1', team: 'a', x: 12, y: 20 }, { id: 'a2', team: 'a', x: 12, y: 55 }, { id: 'a3', team: 'a', x: 25, y: 37.5 },
    { id: 'a4', team: 'a', x: 35, y: 15 }, { id: 'a5', team: 'a', x: 35, y: 60 },
    { id: 'b1', team: 'd', x: 88, y: 20 }, { id: 'b2', team: 'd', x: 88, y: 55 }, { id: 'b3', team: 'd', x: 75, y: 37.5 },
    { id: 'b4', team: 'd', x: 65, y: 15 }, { id: 'b5', team: 'd', x: 65, y: 60 },
    { id: 'f1', team: 'f', x: 50, y: 18 }, { id: 'f2', team: 'f', x: 50, y: 57 },
  ]);
  const fourV4 = keepers.concat([
    { id: 'aD', team: 'a', x: 14, y: 37.5 }, { id: 'bD', team: 'd', x: 86, y: 37.5 },
    { id: 'a1', team: 'a', x: 36, y: 20 }, { id: 'a2', team: 'a', x: 36, y: 56 }, { id: 'a3', team: 'a', x: 47, y: 38 }, { id: 'a4', team: 'a', x: 60, y: 24 },
    { id: 'b1', team: 'd', x: 64, y: 50 }, { id: 'b2', team: 'd', x: 50, y: 11 }, { id: 'b3', team: 'd', x: 41, y: 47 }, { id: 'b4', team: 'd', x: 62, y: 10 },
  ]);

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'long-range-shooting',
    draft: true,
    title: 'Long Range Shooting',
    subtitle: 'Shooting game',
    type: 'Game',
    category: 'attacking',
    squad: [12, 16],
    thumb: 'assets/thumbs/long-range-shooting.jpg',
    summary: 'A zoned shooting game: keep the ball, then shoot from distance. Press, shoot from the middle, and play in and out.',
    keyPhrase: 'See it, shoot it',
    ages: { from: 10 },

    cards: [
      {
        title: 'The shot',
        lead: 'Pick the *right technique* for the chance.',
        columns: [
          { heading: 'Technique', items: ['Which technique will you use?', '*Vary* the finish', 'Hit it *first time* when you can', '*Power or placement*?'] },
          { heading: 'Before the shot', items: ['Head up: where is the keeper?', 'Set your body early', 'Shoot as soon as you see the chance'] },
        ],
        phrase: { big: 'SEE IT, SHOOT IT', small: 'Shoot early, from distance' },
      },
      {
        title: 'Making the chance',
        lead: '*Energy and movement* so the ball can move quickly.',
        columns: [
          { heading: 'Everyone', items: ['Move to make the pass easy', '*Demand the ball*: call for it', 'Keep it game-like and quick'] },
          { heading: 'Floaters', items: ['Be *"alive"*: always on the move', 'Show for the ball', 'Play it quickly to a shooter'] },
        ],
      },
    ],

    keywords: [
      { word: 'Long range', meaning: 'A shot from outside the area, a long way from goal.' },
      { word: 'Power or placement', meaning: 'Hit it hard, or place it into a corner. Choose the one the chance needs.' },
      { word: 'First time', meaning: 'Shooting without stopping the ball first.' },
      { word: 'Floater', meaning: 'A player who plays for whichever team has the ball.' },
      { word: 'Middle zone', meaning: 'The strip across the middle of the pitch. In the later games you can only score from there.' },
    ],

    training: {
      area: '35 × 25 yards: two end zones and a middle zone, a goal at each end.',
      players: '5 v 5, 2 floaters and 2 goalkeepers (14). Adjust the teams to your numbers.',
      equipment: 'Two goals, cones to mark the zones, bibs in three colours, plenty of balls by each goal.',
      setup: [
        'Mark two 15-yard end zones and a 5-yard middle zone. A team of 5 in each end zone, 2 floaters in the middle.',
        'Each team keeps the ball with the floaters\' help and shoots from its own end zone at the far goal.',
        'Progression: one player can cross the middle to press. If they win it, they play it back to their team or score.',
        'Progression: 4 v 4 with one defender at each end. Make the middle zone wider (10-yard end zones); you can only score from the middle zone.',
        'Progression: the ball has to go into the end zone and back out before you can score.',
        'Too slow? Limit touches, or give them 5 seconds to shoot.',
      ],
    },

    questions: [
      'Which technique did you use for that shot? Why?',
      'Power or placement: which was right there?',
      'Could you have hit it first time?',
      'Floaters: were you always available?',
      'What movement helped the pass get to the shooter?',
    ],

    clips: [
      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'zones',
        video: 'videos/long-range-shooting-1-zones.mp4',
        kicker: 'Clip 1 · 5 v 5 + 2 floaters',
        title: 'Keep It, Then Shoot',
        tagline: 'Keep the ball in your zone, then shoot from distance.',
        intro: ['Two end zones and a *middle zone*.', 'A team of 5 in each end zone, *2 floaters* in the middle.', 'Keep the ball, then *shoot from your zone*.'],
        areas: narrowMiddle,
        players: fiveV5,
        ball: { owner: 'a3' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Green in the left zone, blue in the right.', 'The *floaters* in the middle play for the team with the ball.', 'A keeper in each goal.'],
          },
          {
            title: 'KEEP IT',
            text: ['Move the ball quickly.', 'Use the *floaters* to keep it.', '*Movement* makes the pass easy.'],
            timing: { move: 3.6 },
            passes: [{ to: 'a4' }, { to: 'f1' }, { to: 'a3' }],
            moves: [{ id: 'a3', to: [33, 34], start: 0.4, end: 0.85 }],
          },
          {
            title: 'SHOOT FROM DISTANCE',
            text: ['See the chance? *Shoot.*', '*Power or placement*: pick one.'],
            tags: { a3: 'SHOOT' },
            shot: [102, 33],
            timing: { move: 2 },
            ball: { to: [102, 33], start: 0.1, end: 0.6 },
            moves: [{ id: 'kR', to: [97.5, 35.5], start: 0.3, end: 0.6, arrow: false }],
          },
          {
            title: "BLUE'S TURN",
            text: ['The keeper restarts with a new ball.', 'Blue keep it, using the *floaters* too.'],
            timing: { move: 3.6 },
            ball: { give: 'kR' },
            passes: [{ to: 'b2' }, { to: 'f2' }, { to: 'b5' }],
            moves: [{ id: 'b5', to: [68, 52], start: 0.4, end: 0.85 }],
          },
          {
            title: 'SHOOT FIRST TIME',
            text: ['Hit it *first time* when you can.', 'Vary your finish.'],
            tags: { b5: 'SHOOT' },
            shot: [-2, 42],
            timing: { move: 2 },
            ball: { to: [-2, 42], start: 0.05, end: 0.55 },
            moves: [{ id: 'kL', to: [2.5, 39.5], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['Keep the ball *in your zone*.', 'Use the *floaters*.', 'See the chance, *shoot from distance*.', 'Power or placement: *pick one*.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'press',
        video: 'videos/long-range-shooting-2-press.mp4',
        kicker: 'Clip 2 · 1 presser',
        title: 'Send a Presser',
        tagline: 'One player crosses the middle to press. Win it and score.',
        intro: ['Same set-up.', '*One player* can cross the middle to *press*.', 'Win it? Play it back to your team, or *score*.'],
        areas: narrowMiddle,
        players: fiveV5,
        ball: { owner: 'a3' },
        steps: [
          {
            title: 'GREEN KEEP IT',
            text: ['Green move the ball in their zone.'],
            passes: [{ to: 'a2' }],
          },
          {
            title: 'ONE PLAYER PRESSES',
            text: ['A blue player *crosses the middle* to press.', 'Press quickly, *one player only*.'],
            tags: { b4: 'PRESS' },
            timing: { move: 3 },
            moves: [{ id: 'b4', path: [[50, 32], [21, 48]], ease: 'out' }],
          },
          {
            title: 'WIN IT',
            text: ['Green try to pass. The presser *gets a foot in*.'],
            tags: { b4: 'WON IT!' },
            timing: { move: 2 },
            passes: [{ to: 'b4', start: 0.15, end: 0.5 }],
            moves: [{ id: 'b4', to: [18, 46], end: 0.5, arrow: false }],
          },
          {
            title: 'SCORE, OR PLAY IT BACK',
            text: ['Close to goal: *score*.', 'Or play it back to your team.'],
            tags: { b4: 'SHOOT' },
            shot: [-2, 33],
            timing: { move: 2 },
            ball: { to: [-2, 33], start: 0.05, end: 0.5 },
            moves: [{ id: 'kL', to: [2.5, 36], start: 0.2, end: 0.5, arrow: false }],
          },
        ],
        summary: ['*One player* crosses to press.', 'Press quickly: *win it*.', 'Then *score*, or play it back to your team.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'middle-zone',
        video: 'videos/long-range-shooting-3-middle-zone.mp4',
        kicker: 'Clip 3 · 4 v 4 + 1 defender each end',
        title: 'Shoot From the Middle',
        tagline: 'A bigger middle zone. You can only score from there.',
        intro: ['*4 v 4* in a wider middle zone.', 'One defender stays in each end zone.', 'You can only *score from the middle zone*.'],
        areas: wideMiddle,
        players: fourV4,
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['The middle zone is *wider* now.', '4 v 4 in the middle, *one defender* in each end zone.'],
          },
          {
            title: 'MOVE IT QUICKLY',
            text: ['Quick passes to find a shooter.', '*Demand the ball*.'],
            timing: { move: 3 },
            passes: [{ to: 'a3' }, { to: 'a4' }],
            moves: [{ id: 'b2', to: [56, 15], start: 0.3, arrow: false }, { id: 'b3', to: [46, 43], start: 0.2, arrow: false }],
          },
          {
            title: 'SHOOT FROM THE MIDDLE',
            text: ['Still in the *middle zone*: shoot!', 'Hit it before the defender can block.'],
            tags: { a4: 'SHOOT' },
            shot: [102, 41],
            timing: { move: 2 },
            ball: { to: [102, 41], start: 0.05, end: 0.55 },
            moves: [{ id: 'bD', to: [84, 33], start: 0.1, end: 0.5, arrow: false }, { id: 'kR', to: [97.5, 38.5], start: 0.25, end: 0.55, arrow: false }],
          },
          {
            title: 'BLUE COUNTER',
            text: ['New ball from the keeper.', 'Blue\'s defender plays it into the middle.'],
            timing: { move: 3 },
            ball: { give: 'kR' },
            passes: [{ to: 'bD' }, { to: 'b1' }],
          },
          {
            title: 'SHOOT FROM DISTANCE',
            text: ['From the middle zone: *shoot*.', 'Power or placement?'],
            tags: { b1: 'SHOOT' },
            shot: [-2, 33],
            timing: { move: 2.2 },
            ball: { to: [-2, 33], start: 0.05, end: 0.6 },
            moves: [{ id: 'aD', to: [16, 40], start: 0.1, end: 0.55, arrow: false }, { id: 'kL', to: [2.5, 35.5], start: 0.3, end: 0.6, arrow: false }],
          },
        ],
        summary: ['Only *score from the middle zone*.', 'Quick passes, *demand the ball*.', 'Shoot before the defender blocks.'],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'in-and-out',
        video: 'videos/long-range-shooting-4-in-and-out.mp4',
        kicker: 'Clip 4 · In and out',
        title: 'In and Out',
        tagline: 'Into the end zone and back out. Then you can score.',
        intro: ['Same as clip 3.', 'The ball must go *into the end zone* and *back out*.', 'Then you can score.'],
        areas: wideMiddle,
        players: fourV4,
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'THE RULE',
            text: ['Before you can score, the ball goes *in* to the end zone...', '...and *back out* to the middle.'],
          },
          {
            title: 'IN',
            text: ['A green player *runs into the end zone*.', 'Pass it in to them.'],
            tags: { a4: 'IN' },
            timing: { move: 3 },
            moves: [{ id: 'a4', to: [80, 24], end: 0.6 }, { id: 'bD', to: [85, 30], start: 0.3, arrow: false }],
            passes: [{ to: 'a4', start: 0.45, end: 0.85 }],
          },
          {
            title: 'OUT',
            text: ['Lay it *back out* to a teammate arriving in the middle.'],
            tags: { a4: 'OUT' },
            timing: { move: 2.6 },
            moves: [{ id: 'a3', to: [63, 36], end: 0.5 }],
            passes: [{ to: 'a3', start: 0.45, end: 0.85 }],
          },
          {
            title: 'NOW SCORE, FIRST TIME',
            text: ['In and out: *now you can score*.', 'Hit it *first time*.'],
            tags: { a3: 'SHOOT' },
            shot: [102, 42],
            timing: { move: 2 },
            ball: { to: [102, 42], start: 0.05, end: 0.5 },
            moves: [{ id: 'kR', to: [97.5, 39.5], start: 0.2, end: 0.5, arrow: false }],
          },
        ],
        summary: ['Ball goes *in* to the end zone.', 'Then *back out* to the middle.', 'Now *shoot*, first time if you can.'],
      }),
    ],
  });
})();
