/*
 * TWO SESSIONS: Long Range Shooting: Move Onto It, and Long Range Shooting: Up, Back, Shot (Attacking)
 * From a coach's own session plan.
 *
 * Pitches are laid sideways (x 0..100 left to right, y 0..75 top to bottom), goals on the left and right.
 * Green attacks the right-hand goal, blue the left. 'f' = strikers/floaters in the middle, 'k'/'k2' = keepers.
 * Move Onto It: 45 × 30 yards, 20-yard end zones and a 5-yard middle zone (details below).
 * Up, Back, Shot: 35 × 25 yards (x 2.86 units a yard, y 3 units a yard), 10-yard end zones (x 0–28.6 and 71.4–100),
 * a 15-yard middle zone, 4 v 4 + 1 defender at each end.
 */
(function () {
  const FLOAT = '#e0a91b';
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
  const fourV4 = keepers.concat([
    { id: 'aD', team: 'a', x: 14, y: 37.5 }, { id: 'bD', team: 'd', x: 86, y: 37.5 },
    { id: 'a1', team: 'a', x: 36, y: 20 }, { id: 'a2', team: 'a', x: 36, y: 56 }, { id: 'a3', team: 'a', x: 47, y: 38 }, { id: 'a4', team: 'a', x: 60, y: 24 },
    { id: 'b1', team: 'd', x: 64, y: 50 }, { id: 'b2', team: 'd', x: 50, y: 11 }, { id: 'b3', team: 'd', x: 41, y: 47 }, { id: 'b4', team: 'd', x: 62, y: 10 },
  ]);
  const teamsLegend = [{ label: 'Green', color: '#2fbf7f' }, { label: 'Blue', color: '#3b9ae1' }];
  const shotQuestions = [
    'Which technique did you use for that shot? Why?',
    'Power or placement: which was right there?',
  ];

  window.SESSIONS = window.SESSIONS || [];

  // ====================================================================
  // 1. MOVE ONTO IT
  // 45 × 30 yards: x 0..100 = 45 yards (2.22 units a yard), y 0..75 = 30 yards (2.5 units a yard).
  // 20-yard end zones (x 0–44.4 and 55.6–100: the far goal is about 20–25 yards away, the edge of the box)
  // and a 5-yard middle zone. D = defenders and M = midfielders in the end zones; ST = one central striker
  // in the middle, who sets the ball back for both teams (two strikers also works).
  // ====================================================================
  const moveKey = { big: 'MOVE ONTO IT', small: "Shoot on the move. Don't turn and shoot" };
  const zone20 = [{ x: 44.4, y: 0, w: 11.2, h: 75 }];
  const dims45 = [
    { a: [0, 3], b: [44.4, 3], label: '20 yds' }, { a: [44.4, 3], b: [55.6, 3], label: '5' }, { a: [55.6, 3], b: [100, 3], label: '20 yds' },
    { a: [61, 8], b: [61, 72], label: '30 yds' },
  ];
  const zonePlayers = keepers.concat([
    { id: 'gD1', team: 'a', label: 'D', x: 10, y: 24 }, { id: 'gD2', team: 'a', label: 'D', x: 10, y: 51 },
    { id: 'gM1', team: 'a', label: 'M', x: 31, y: 18 }, { id: 'gM2', team: 'a', label: 'M', x: 31, y: 57 },
    { id: 'bD1', team: 'd', label: 'D', x: 90, y: 24 }, { id: 'bD2', team: 'd', label: 'D', x: 90, y: 51 },
    { id: 'bM1', team: 'd', label: 'M', x: 69, y: 18 }, { id: 'bM2', team: 'd', label: 'M', x: 69, y: 57 },
    { id: 'st', team: 'f', label: 'ST', x: 50, y: 37.5 },
  ]);
  const A = Object.assign({}, common, {
    legendTeams: [{ label: 'Green', color: '#2fbf7f' }, { label: 'Blue', color: '#3b9ae1' }, { label: 'Striker (both teams)', color: FLOAT }],
    keyPhrase: moveKey, areas: zone20, dims: dims45, players: zonePlayers, playerScale: 0.95,
  });
  window.SESSIONS.push({
    id: 'long-range-move-onto-it',
    topics: ['Shooting', 'Small-sided games'],
    title: 'Long Range Shooting: Move Onto It',
    subtitle: 'Shooting game',
    type: 'Game',
    category: 'attacking',
    squad: [9, 14],
    thumb: 'assets/thumbs/long-range-move-onto-it.jpg',
    summary: 'A zoned shooting game: a central striker sets it back for both teams; midfielders and defenders move onto it and shoot from the edge of the box.',
    keyPhrase: 'Move onto it',
    ages: { from: 14 },

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
          { heading: 'Defenders and midfielders', items: ['*Energy and movement* to make passes', 'Play it into the striker', '*Time your run*: go as the ball goes in', 'Don\'t get too close: keep *space to run onto it*'] },
          { heading: 'Striker (middle zone)', items: ['Plays for *both teams*', 'Be *"alive"*: always on the move', '*Demand the ball*', 'Set it back into a runner\'s path, like in a match'] },
        ],
      },
    ],

    keywords: [
      { word: 'Long range', meaning: 'A shot from about the edge of the box or further out.' },
      { word: 'Move onto it', meaning: 'Running onto the ball as it arrives so you can shoot facing the goal, without stopping to turn.' },
      { word: 'Set back', meaning: 'A short pass back to a teammate who is running onto the ball, facing the goal.' },
      { word: 'First time', meaning: 'Shooting or passing without stopping the ball first.' },
      { word: 'Two touch', meaning: 'One touch to control, one to pass or shoot.' },
    ],

    training: {
      area: '45 × 30 yards: two 20-yard end zones (the edge of the box) and a 5-yard middle zone, a goal at each end.',
      players: 'Defenders and midfielders in each end zone, one striker in the middle for both teams, a keeper in each goal. For example 4 v 4 + 1 + 2 keepers (11). Vary the numbers to suit your group.',
      equipment: 'Two goals, cones to mark the zones, bibs in three colours, plenty of balls by each goal.',
      setup: [
        'Each team\'s defenders and midfielders stay in their end zone. One central striker plays in the middle zone for both teams.',
        'Vary the numbers to suit your group, e.g. 3 v 3 + 1 or 5 v 5 + 2. Two strikers in the middle also works.',
        'Rotate positions every few minutes, so everyone gets to shoot, set it back, defend and play in goal.',
        'Move the ball with speed, play it into a striker, and shoot from the set back: about 20 to 25 yards out.',
        'Shooters move onto the ball as they shoot. No stopping to turn.',
        'Time the run to join the striker: go as the ball goes in, and don\'t get too close. Leave space to move onto the ball.',
        'Progression: send one in. An opponent crosses the middle to press, so the team on the ball has to play under pressure.',
        'Progression: two touch, then first-time finishes. Too slow? Give them 5 seconds to shoot.',
      ],
    },

    questions: shotQuestions.concat([
      'Were you moving onto the ball when you shot?',
      'Strikers: where did you set it back to?',
      'Runners: when did you start your run? Did you leave yourself space?',
      'Could you have hit it first time?',
      'Under pressure: did you move it quickly enough?',
    ]),

    clips: [
      Object.assign({}, A, {
        id: 'move-onto-it',
        video: 'videos/long-range-move-onto-it-1.mp4',
        kicker: 'Clip 1 · 4 v 4 + 1 central striker',
        title: 'Move It, Then Shoot',
        tagline: 'Into the striker, set it back, shoot on the move.',
        intro: ['*20-yard* zones: shooting from the *edge of the box*.', 'Defenders and midfielders in the end zones, *one striker* in the middle for *both teams*.', 'Move the ball *with speed*, shoot *moving onto it*.'],
        ball: { owner: 'gD1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['45 × 30 yards: two *20-yard zones* and a 5-yard middle zone.', '*Defenders and midfielders* in each end zone.', '*One striker* in the middle plays for *both teams*.', '*Rotate positions*, and vary the numbers.'],
          },
          {
            title: 'MOVE IT WITH SPEED',
            text: ['Quick passes, *with speed*.', '*Energy and movement* to make the pass.'],
            timing: { move: 2.6 },
            passes: [{ to: 'gD2' }, { to: 'gM1' }],
          },
          {
            title: 'UP TO THE STRIKER',
            text: ['Play it *into the striker*.', 'Runner: *time your run*. Go as the ball goes in.', 'Don\'t get too close: leave *space to run into*.'],
            tags: { st: 'UP', gM2: 'WAIT' },
            timing: { move: 1.8 },
            passes: [{ to: 'st', start: 0, end: 0.6 }],
            moves: [{ id: 'gM2', to: [32, 53], start: 0.45 }],
          },
          {
            title: 'SET BACK: MOVE ONTO IT',
            text: ['The striker *sets it back*, like in a match.', 'Into the *space* in front of the runner.', 'Run *onto it*, facing the goal.'],
            tags: { st: 'BACK', gM2: 'GO!' },
            timing: { move: 2.4 },
            moves: [{ id: 'gM2', to: [39, 47.5], end: 0.75 }],
            passes: [{ to: 'gM2', start: 0.3, end: 0.75 }],
          },
          {
            title: 'SHOOT ON THE MOVE',
            text: ['Strike it *on the move*: about 20 to 25 yards out.', '*Don\'t stop, turn and shoot.*'],
            tags: { gM2: 'SHOOT' },
            shot: [102, 40],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 40], start: 0.05, end: 0.55 },
            moves: [{ id: 'gM2', to: [42, 46.5], end: 0.3, arrow: false }, { id: 'kR', to: [97.5, 38], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['Move the ball *with speed*.', 'Into the *striker*, who *sets it back*.', 'Run onto it and *shoot on the move*.', '*Rotate positions*, so everyone shoots.'],
      }),

      Object.assign({}, A, {
        id: 'under-pressure',
        video: 'videos/long-range-move-onto-it-2.mp4',
        kicker: 'Clip 2 · send one in',
        title: 'Play Under Pressure',
        tagline: 'Send one in to press. Move it quickly and still get the shot off.',
        intro: ['Same set-up.', '*Send one in*: an opponent crosses the middle to press.', 'Play *under pressure*: move it quickly, still get the shot off.'],
        ball: { owner: 'gM1' },
        steps: [
          {
            title: 'SEND ONE IN',
            text: ['A blue player crosses the middle to *press the ball*.', 'Now green have to play *under pressure*.'],
            tags: { bM1: 'PRESS' },
            timing: { move: 2.6 },
            moves: [{ id: 'bM1', to: [36, 21], ease: 'out' }],
          },
          {
            title: 'MOVE IT AWAY FROM PRESSURE',
            text: ['Don\'t get caught on the ball.', 'Move it *quickly*, away from the presser.'],
            timing: { move: 2.2 },
            passes: [{ to: 'gD1', start: 0, end: 0.45 }],
            moves: [{ id: 'bM1', to: [24, 20], start: 0.3, arrow: false }],
          },
          {
            title: 'FIND THE STRIKER',
            text: ['Play it *into the striker*, past the press.', 'Runner: *time your run*, and keep your distance.'],
            tags: { st: 'UP', gM2: 'WAIT' },
            timing: { move: 2 },
            passes: [{ to: 'st', start: 0, end: 0.6 }],
            moves: [{ id: 'gM2', to: [32, 53], start: 0.45 }, { id: 'bM1', to: [15, 18.5], start: 0.1, end: 0.6, arrow: false }],
          },
          {
            title: 'SET BACK: MOVE ONTO IT',
            text: ['Set it back into *space*, away from the presser.', 'Run *onto it*, facing the goal.'],
            tags: { st: 'BACK', gM2: 'GO!' },
            timing: { move: 2.4 },
            moves: [{ id: 'gM2', to: [39, 47.5], end: 0.75 }, { id: 'bM1', to: [22, 28], start: 0.4, arrow: false }],
            passes: [{ to: 'gM2', start: 0.3, end: 0.75 }],
          },
          {
            title: 'SHOOT ON THE MOVE',
            text: ['Strike it *on the move*: about 20 to 25 yards out.', '*Don\'t stop, turn and shoot.*'],
            tags: { gM2: 'SHOOT' },
            shot: [102, 40],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 40], start: 0.05, end: 0.55 },
            moves: [{ id: 'gM2', to: [42, 46.5], end: 0.3, arrow: false }, { id: 'kR', to: [97.5, 38], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['*Send one in* to press.', 'Move it *quickly*, away from the pressure.', 'Still *get the shot off*.'],
      }),

      Object.assign({}, A, {
        id: 'two-touch',
        video: 'videos/long-range-move-onto-it-3.mp4',
        kicker: 'Clip 3 · two touch, first time',
        title: 'Two Touch, First Time',
        tagline: 'Two touches to move it. One touch to finish.',
        intro: ['Now limit the touches.', '*Two touch* to move the ball.', 'Then a *first-time* finish.'],
        ball: { owner: 'gD2' },
        steps: [
          {
            title: 'TWO TOUCH',
            text: ['Control, pass. *Two touches* each.', 'It makes the ball move *faster*.'],
            timing: { move: 2.6 },
            passes: [{ to: 'gM2' }, { to: 'gD1' }, { to: 'gM1' }],
          },
          {
            title: 'UP TO THE STRIKER',
            text: ['Into the *striker*.', 'Runner: *time your run*, don\'t get too close.'],
            tags: { st: 'UP', gM2: 'WAIT' },
            timing: { move: 1.8 },
            passes: [{ to: 'st', start: 0, end: 0.6 }],
            moves: [{ id: 'gM2', to: [32, 53], start: 0.45 }],
          },
          {
            title: 'SET BACK INTO THE RUN',
            text: ['*First-time* set back into the *space* in front of the runner.'],
            tags: { st: 'BACK', gM2: 'GO!' },
            timing: { move: 2.2 },
            moves: [{ id: 'gM2', to: [39, 47.5], end: 0.7 }],
            passes: [{ to: 'gM2', start: 0.25, end: 0.7 }],
          },
          {
            title: 'FIRST-TIME FINISH',
            text: ['*No touch* before the shot.', 'Strike it as it arrives.'],
            tags: { gM2: 'FIRST TIME' },
            shot: [102, 41],
            timing: { stepIn: 0.3, arrows: 1.2, read: 0.6, move: 1.8 },
            ball: { to: [102, 41], start: 0.05, end: 0.5 },
            moves: [{ id: 'kR', to: [97.5, 38.5], start: 0.2, end: 0.5, arrow: false }],
          },
        ],
        summary: ['*Two touch* moves the ball faster.', 'Striker sets it back *first time*.', '*First-time* finish.'],
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
    topics: ['Shooting', 'Combination play'],
    title: 'Long Range Shooting: Up, Back, Shot',
    subtitle: 'Shooting game',
    type: 'Game',
    category: 'attacking',
    squad: [10, 12],
    thumb: 'assets/thumbs/long-range-up-back-shot.jpg',
    summary: 'Ways to create a long-range shot: follow your pass for the set back, or a third-player run onto it. Score only from the middle zone.',
    keyPhrase: 'Up, back, shot',
    ages: { from: 14 },

    cards: [
      {
        title: 'Ways to create a shot',
        lead: '*Ideas* to look for in the game, not a set move: play it *up*, it comes *back*, then *shoot*.',
        columns: [
          { heading: 'Follow your pass', items: ['Pass it up, then *follow it*', 'Don\'t get too close: leave *space to move onto it*', 'Arrive as the set back comes, and shoot on the move'] },
          { heading: 'Third-player run', items: ['A teammate *runs onto the set back*', '*Time the run*: arrive, don\'t wait', 'Keep your distance, then move onto it'] },
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
        'Ideas to create a shot (not a set move): follow your pass for the set back, or a third player runs onto it and shoots.',
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
        kicker: 'Idea 1 · 4 v 4 + 1 defender each end',
        title: 'Follow Your Pass',
        tagline: 'Pass it up, follow it, shoot from the set back.',
        intro: ['*4 v 4* in the middle, one defender in each end zone.', 'You can only *score from the middle zone*.', '*One idea* to create a shot: follow your pass.'],
        ball: { owner: 'a1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A wide *middle zone*: score only from here.', 'One *defender* in each end zone.', 'Ideas, not a set move: *look for the chance*.'],
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
        summary: ['An idea, not a set move: *look for it* in the game.', 'Play it *up* and *follow your pass*.', 'Set it *back*, then *shoot*.'],
      }),

      Object.assign({}, B, {
        id: 'third-player',
        video: 'videos/long-range-up-back-shot-2.mp4',
        kicker: 'Idea 2 · third-player run',
        title: 'Third-Player Run',
        tagline: 'A third player runs onto the set back and shoots.',
        intro: ['Same set-up.', '*Another idea*: a third player runs onto the set back.', 'Time the run: *arrive*, don\'t wait.'],
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
        summary: ['Another idea to *look for* in the game.', '*Up*, then *back* into a third player\'s run.', '*Shot*, on the move.'],
      }),

      Object.assign({}, B, {
        id: 'final-third',
        video: 'videos/long-range-up-back-shot-3.mp4',
        kicker: 'Progression · into the final third',
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
