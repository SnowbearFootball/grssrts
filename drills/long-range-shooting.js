/*
 * TWO SESSIONS (DRAFTS): Long Range Shooting: Move Onto It, and Long Range Shooting: Up, Back, Shot (Attacking)
 * From a coach's own session plan. draft: true keeps them off the site's lists until approved
 * (open index.html?drafts#long-range-move-onto-it or ?drafts#long-range-up-back-shot to see them).
 *
 * The pitch is laid sideways: 35 yards long (x 0..100, about 2.86 units a yard) by 25 yards wide (y 0..75, 3 units a yard).
 * Goals on the left and right. Green attacks the right-hand goal, blue the left. 'f' = floaters, 'k'/'k2' = keepers.
 * Move Onto It: end zones 15 yards (x 0–42.9 and 57.1–100), middle zone 5 yards, 5 v 5 + 2 floaters.
 * Up, Back, Shot: end zones 10 yards (x 0–28.6 and 71.4–100), middle zone 15 yards, 4 v 4 + 1 defender at each end.
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
  };
  const keepers = [
    { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 },
    { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
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
  const zonesLegend = [{ label: 'Green', color: '#2fbf7f' }, { label: 'Blue', color: '#3b9ae1' }, { label: 'Floater', color: FLOAT }];
  const teamsLegend = [{ label: 'Green', color: '#2fbf7f' }, { label: 'Blue', color: '#3b9ae1' }];
  const shotQuestions = [
    'Which technique did you use for that shot? Why?',
    'Power or placement: which was right there?',
  ];

  window.SESSIONS = window.SESSIONS || [];

  // ====================================================================
  // 1. MOVE ONTO IT
  // ====================================================================
  const moveKey = { big: 'MOVE ONTO IT', small: "Shoot on the move. Don't turn and shoot" };
  const A = Object.assign({}, common, { legendTeams: zonesLegend, keyPhrase: moveKey, areas: narrowMiddle, players: fiveV5 });
  window.SESSIONS.push({
    id: 'long-range-move-onto-it',
    draft: true,
    title: 'Long Range Shooting: Move Onto It',
    subtitle: 'Shooting game',
    type: 'Game',
    category: 'attacking',
    squad: [12, 16],
    thumb: 'assets/thumbs/long-range-move-onto-it.jpg',
    summary: 'A zoned shooting game: move the ball with speed, then shoot from distance while moving onto the ball.',
    keyPhrase: 'Move onto it',
    ages: { from: 10 },

    cards: [
      {
        title: 'The shot',
        lead: '*Move onto the ball* as you shoot. Don\'t stop, turn and shoot.',
        columns: [
          { heading: 'Body', items: ['Run onto the ball, *facing the goal*', 'Strike it on the move', 'Head up: where is the keeper?'] },
          { heading: 'Technique', items: ['Which technique will you use?', '*Vary* the finish', '*Power or placement*?'] },
        ],
        phrase: moveKey,
      },
      {
        title: 'Moving the ball',
        lead: 'Move it *with speed* so the shooter gets a chance.',
        columns: [
          { heading: 'Everyone', items: ['*Energy and movement* to make passes', '*Demand the ball*: call for it', 'Keep it game-like'] },
          { heading: 'Floaters', items: ['Be *"alive"*: always on the move', 'Show for the ball', 'Play it into a runner\'s path'] },
        ],
      },
    ],

    keywords: [
      { word: 'Long range', meaning: 'A shot from a long way out, outside the area.' },
      { word: 'Move onto it', meaning: 'Running onto the ball as it arrives so you can shoot facing the goal, without stopping to turn.' },
      { word: 'First time', meaning: 'Shooting or passing without stopping the ball first.' },
      { word: 'Two touch', meaning: 'One touch to control, one to pass or shoot.' },
      { word: 'Floater', meaning: 'A player who plays for whichever team has the ball.' },
    ],

    training: {
      area: '35 × 25 yards: two 15-yard end zones and a 5-yard middle zone, a goal at each end.',
      players: '5 v 5, 2 floaters and 2 goalkeepers (14). Adjust the teams to your numbers.',
      equipment: 'Two goals, cones to mark the zones, bibs in three colours, plenty of balls by each goal.',
      setup: [
        'A team of 5 in each end zone, 2 floaters in the middle zone, a keeper in each goal.',
        'Teams keep the ball with the floaters\' help and shoot from their own end zone at the far goal.',
        'Shooters move onto the ball as they shoot. No stopping to turn.',
        'Progression: one player can cross the middle to press. If they win it, they play it back to their team or score.',
        'Progression: two touch, then first-time finishes.',
        'Too slow? Give them 5 seconds to shoot.',
      ],
    },

    questions: shotQuestions.concat([
      'Were you moving onto the ball when you shot?',
      'Could you have hit it first time?',
      'Floaters: were you always available?',
    ]),

    clips: [
      Object.assign({}, A, {
        id: 'move-onto-it',
        video: 'videos/long-range-move-onto-it-1.mp4',
        kicker: 'Clip 1 · 5 v 5 + 2 floaters',
        title: 'Move It, Then Shoot',
        tagline: 'Move the ball with speed. Shoot on the move.',
        intro: ['A team of 5 in each end zone, *2 floaters* in the middle.', 'Move the ball *with speed*.', 'Shoot *moving onto the ball*: don\'t turn and shoot.'],
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Green in the left zone, blue in the right.', 'The *floaters* play for the team with the ball.', 'Shoot from your own zone.'],
          },
          {
            title: 'MOVE IT WITH SPEED',
            text: ['Quick passes, *with speed*.', 'Use the floater.'],
            timing: { move: 3 },
            passes: [{ to: 'a4' }, { to: 'f1' }],
          },
          {
            title: 'RUN ONTO IT',
            text: ['The floater plays it *into the shooter\'s path*.', 'Run onto it, *facing the goal*.'],
            tags: { a3: 'GO!' },
            timing: { move: 2.4 },
            moves: [{ id: 'a3', to: [37, 34], end: 0.75 }],
            passes: [{ to: 'a3', start: 0.25, end: 0.75 }],
          },
          {
            title: 'SHOOT ON THE MOVE',
            text: ['Strike it *on the move*.', '*Don\'t stop, turn and shoot.*'],
            tags: { a3: 'SHOOT' },
            shot: [102, 33],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 33], start: 0.05, end: 0.55 },
            moves: [{ id: 'a3', to: [40, 33.5], end: 0.3, arrow: false }, { id: 'kR', to: [97.5, 35.5], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['Move the ball *with speed*.', 'Run onto it, *facing the goal*.', '*Shoot on the move*. Don\'t turn and shoot.'],
      }),

      Object.assign({}, A, {
        id: 'press',
        video: 'videos/long-range-move-onto-it-2.mp4',
        kicker: 'Clip 2 · 1 presser',
        title: 'Send a Presser',
        tagline: 'One player crosses the middle to press. Win it and score.',
        intro: ['Same set-up.', '*One player* can cross the middle to *press*.', 'Win it? Play it back to your team, or *score*.'],
        ball: { owner: 'a3' },
        steps: [
          { title: 'GREEN KEEP IT', text: ['Green move the ball in their zone.'], passes: [{ to: 'a2' }] },
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

      Object.assign({}, A, {
        id: 'two-touch',
        video: 'videos/long-range-move-onto-it-3.mp4',
        kicker: 'Clip 3 · two touch, first time',
        title: 'Two Touch, First Time',
        tagline: 'Two touches to move it. One touch to finish.',
        intro: ['Now limit the touches.', '*Two touch* to move the ball.', 'Then a *first-time* finish.'],
        ball: { owner: 'a2' },
        steps: [
          {
            title: 'TWO TOUCH',
            text: ['Control, pass. *Two touches* each.', 'It makes the ball move *faster*.'],
            timing: { move: 3.4 },
            passes: [{ to: 'a3' }, { to: 'a5' }, { to: 'f2' }],
          },
          {
            title: 'LAY IT INTO THE RUN',
            text: ['The floater lays it *into the runner\'s path*.'],
            tags: { a3: 'GO!' },
            timing: { move: 2.2 },
            moves: [{ id: 'a3', to: [38, 42], end: 0.7 }],
            passes: [{ to: 'a3', start: 0.25, end: 0.7 }],
          },
          {
            title: 'FIRST-TIME FINISH',
            text: ['*No touch* before the shot.', 'Strike it as it arrives.'],
            tags: { a3: 'FIRST TIME' },
            shot: [102, 41],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 41], start: 0.05, end: 0.5 },
            moves: [{ id: 'kR', to: [97.5, 38.5], start: 0.2, end: 0.5, arrow: false }],
          },
        ],
        summary: ['*Two touch* moves the ball faster.', 'Lay it into the runner\'s path.', '*First-time* finish.'],
      }),
    ],
  });

  // ====================================================================
  // 2. UP, BACK, SHOT
  // ====================================================================
  const ubsKey = { big: 'UP, BACK, SHOT', small: 'Play it up, set it back, shoot' };
  const B = Object.assign({}, common, { legendTeams: teamsLegend, keyPhrase: ubsKey, areas: wideMiddle, players: fourV4 });
  window.SESSIONS.push({
    id: 'long-range-up-back-shot',
    draft: true,
    title: 'Long Range Shooting: Up, Back, Shot',
    subtitle: 'Shooting game',
    type: 'Game',
    category: 'attacking',
    squad: [10, 12],
    thumb: 'assets/thumbs/long-range-up-back-shot.jpg',
    summary: 'Score only from the middle zone. Follow your pass for the set back, or make a third-player run onto it.',
    keyPhrase: 'Up, back, shot',
    ages: { from: 12 },

    cards: [
      {
        title: 'The set back',
        lead: 'Play it *up*, it comes *back*, then *shoot*.',
        columns: [
          { heading: 'Follow your pass', items: ['Pass it up, then *follow it*', 'Arrive as the set back comes', 'Shoot on the move'] },
          { heading: 'Third-player run', items: ['A teammate *runs onto the set back*', 'Time the run: arrive, don\'t wait', 'Shoot first time if you can'] },
        ],
        phrase: ubsKey,
      },
      {
        title: 'The shot',
        lead: 'Only from the *middle zone*.',
        columns: [
          { heading: 'Technique', items: ['Which technique will you use?', '*Vary* the finish', '*Power or placement*?'] },
          { heading: 'Speed', items: ['Shoot before the defender blocks', 'Limit touches if it gets slow', '5 seconds to shoot'] },
        ],
      },
    ],

    keywords: [
      { word: 'Set back', meaning: 'A short pass back to a teammate who is facing the goal.' },
      { word: 'Third-player run', meaning: 'A run by a player who wasn\'t in the first pass, onto the set back.' },
      { word: 'Final third', meaning: 'The end zone you are attacking.' },
      { word: 'Up, back, shot', meaning: 'Play it up, it comes back, then shoot.' },
    ],

    training: {
      area: '35 × 25 yards: two 10-yard end zones and a 15-yard middle zone, a goal at each end.',
      players: '4 v 4 in the middle, one defender in each end zone, 2 goalkeepers (12).',
      equipment: 'Two goals, cones to mark the zones, bibs, plenty of balls by each goal.',
      setup: [
        'Four players a side in the middle zone, one defender from each team in their own end zone, a keeper in each goal.',
        'You can only score from the middle zone.',
        'Look for the set back: follow your pass, or a third player runs onto it and shoots.',
        'Progression: the ball has to be played into the final third (the end zone) and set back out before you can shoot.',
        'Too slow? Limit touches, or give them 5 seconds to shoot.',
      ],
    },

    questions: shotQuestions.concat([
      'Who followed the pass? Did you arrive in time?',
      'Who was the third player? When did you start your run?',
      'Up, back, shot: how quickly did we do it?',
    ]),

    clips: [
      Object.assign({}, B, {
        id: 'follow-your-pass',
        video: 'videos/long-range-up-back-shot-1.mp4',
        kicker: 'Clip 1 · 4 v 4 + 1 defender each end',
        title: 'Follow Your Pass',
        tagline: 'Pass it up, follow it, shoot from the set back.',
        intro: ['*4 v 4* in the middle, one defender in each end zone.', 'You can only *score from the middle zone*.', 'Pass it up and *follow your pass*.'],
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A wide *middle zone*: score only from here.', 'One *defender* in each end zone.'],
          },
          {
            title: 'UP, AND FOLLOW IT',
            text: ['Play it *up*.', 'Then *follow your pass*.'],
            tags: { a4: 'UP' },
            timing: { move: 2.6 },
            passes: [{ to: 'a4', start: 0, end: 0.4 }],
            moves: [{ id: 'a1', to: [51, 28], start: 0.3 }],
          },
          {
            title: 'SET IT BACK',
            text: ['A short pass *back* to the player arriving.'],
            tags: { a4: 'BACK' },
            timing: { move: 1.8 },
            passes: [{ to: 'a1', start: 0.1, end: 0.6 }],
            moves: [{ id: 'a1', to: [53, 28.5], end: 0.6, arrow: false }],
          },
          {
            title: 'SHOT',
            text: ['Arrive and *shoot*, facing the goal.', 'Power or placement?'],
            tags: { a1: 'SHOOT' },
            shot: [102, 34],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 34], start: 0.05, end: 0.55 },
            moves: [{ id: 'kR', to: [97.5, 36.5], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['Play it *up*.', '*Follow your pass*.', 'Set it *back*, then *shoot*.'],
      }),

      Object.assign({}, B, {
        id: 'third-player',
        video: 'videos/long-range-up-back-shot-2.mp4',
        kicker: 'Clip 2 · third-player run',
        title: 'Third-Player Run',
        tagline: 'A third player runs onto the set back and shoots.',
        intro: ['Same set-up.', 'This time a *third player* runs onto the set back.', 'Time the run: *arrive*, don\'t wait.'],
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'UP',
            text: ['Play it *up*.'],
            tags: { a4: 'UP' },
            timing: { move: 1.8 },
            passes: [{ to: 'a4', start: 0, end: 0.55 }],
          },
          {
            title: 'BACK, TO THE RUNNER',
            text: ['A *third player* runs onto the set back.', 'Set it back *into their path*.'],
            tags: { a4: 'BACK', a3: 'GO!' },
            timing: { move: 2.4 },
            moves: [{ id: 'a3', to: [55, 33], end: 0.7 }],
            passes: [{ to: 'a3', start: 0.3, end: 0.7 }],
          },
          {
            title: 'SHOT',
            text: ['Shoot *on the move*.', 'First time if you can.'],
            tags: { a3: 'SHOOT' },
            shot: [102, 33],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 33], start: 0.05, end: 0.55 },
            moves: [{ id: 'a3', to: [57, 33], end: 0.3, arrow: false }, { id: 'kR', to: [97.5, 35.5], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['*Up* to a teammate.', '*Back* into a third player\'s run.', '*Shot*, on the move.'],
      }),

      Object.assign({}, B, {
        id: 'final-third',
        video: 'videos/long-range-up-back-shot-3.mp4',
        kicker: 'Clip 3 · into the final third',
        title: 'Up, Back, Shot',
        tagline: 'Into the final third, set it back, then shoot.',
        intro: ['Now the ball must go *into the final third*...', '...and be *set back* before you can shoot.', '*Up, back, shot.*'],
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'THE RULE',
            text: ['Before you can shoot, the ball goes *up* into the end zone...', '...and *back* out to the middle.'],
          },
          {
            title: 'UP: INTO THE FINAL THIRD',
            text: ['A green player *runs into the end zone*.', 'Play it *up* to them.'],
            tags: { a4: 'UP' },
            timing: { move: 3 },
            moves: [{ id: 'a4', to: [80, 24], end: 0.6 }, { id: 'bD', to: [85, 30], start: 0.3, arrow: false }],
            passes: [{ to: 'a4', start: 0.45, end: 0.85 }],
          },
          {
            title: 'BACK',
            text: ['Set it *back* to a teammate arriving in the middle.'],
            tags: { a4: 'BACK', a3: 'GO!' },
            timing: { move: 2.6 },
            moves: [{ id: 'a3', to: [63, 36], end: 0.5 }],
            passes: [{ to: 'a3', start: 0.45, end: 0.85 }],
          },
          {
            title: 'SHOT',
            text: ['Up, back: *now shoot*.', 'Hit it *first time*.'],
            tags: { a3: 'SHOOT' },
            shot: [102, 42],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 42], start: 0.05, end: 0.5 },
            moves: [{ id: 'kR', to: [97.5, 39.5], start: 0.2, end: 0.5, arrow: false }],
          },
        ],
        summary: ['*Up* into the final third.', '*Back* out to the middle.', '*Shot*, first time if you can.'],
      }),
    ],
  });
})();
