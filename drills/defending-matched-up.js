/*
 * SESSION: Defending: Matched Up (Defending · technical)
 * From the owner's own plan "Defending (Matched Up)" (1st4sport L2 session sheet).
 *
 * Key factors: close the space as the ball travels; angle of approach (arc run); slow down as you approach the attacker,
 *   get low, watch the ball; body angle: show him away from goal if isolated, or into an area with more defenders in a
 *   game; patience: tackle with the front foot, pivot off the back foot.
 * 1. Tech (10 mins): 10 x 10 yds. The defender passes to the attacker, then defends a cone goal. Close the space as the
 *    ball travels, arc run to protect the goal, get low, body angle, pivot off the back foot, be patient, tackle with the
 *    front foot when possible. Progression: 15 x 15, then 2 v 2.
 * 2. Skill (10 mins): 30 x 20 yds, two teams numbered 1 to 6 on their end lines. The coach calls two numbers and serves
 *    the ball to one side. Coach the team without the ball: pressure the ball, second defender supports (cover) in the
 *    right position.
 * 3. Game (20 mins): 40 x 35 yds, 4 v 4 + keepers, a floater each side. As a team, stop the shot and the forward pass
 *    into a dangerous area. Close the ball quickly, get the shape right (pressure, cover, balance); pivot roles as the
 *    ball is passed; recovery runs; squeeze as a unit if the ball goes back or sideways; communicate, defend as a unit.
 * Owner's extra points: travel as the ball travels, close the space; arc run to protect the goal; body angle; tackle
 *   with the front foot; pivot off the back foot: never turn your back on the attacker.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', S = '#d4a017', K = '#2b2b2b', COACH = '#6b7280';

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'defending-matched-up',
    title: 'Defending: Matched Up',
    subtitle: 'Close it as it travels, arc run, never turn your back',
    type: 'Technical',
    category: 'defending',
    topics: ['Tackling', 'Pressing', 'Shape'],
    squad: [2, 14],
    thumb: 'assets/thumbs/defending-matched-up.jpg',
    summary: 'Pass and defend 1 v 1 with an arc run, then a numbers game 2 v 2 (pressure and cover), then a 4 v 4 where the team defends as a unit. Close it as it travels, get low, body angle, front-foot tackle, pivot off the back foot.',
    keyPhrase: 'Close it as it travels',
    ages: { from: 10 },

    cards: [
      {
        title: 'The first defender',
        lead: '*Travel as the ball travels*: close the space.',
        columns: [
          { heading: 'Approach', items: ['*Arc run*: curve to get between ball and goal', '*Slow down* as you get close', '*Get low*, watch the ball'] },
          { heading: 'Body and tackle', items: ['*Body angle*: show him away from goal', 'Or *into* your team-mates in a game', '*Patient*: tackle with your *front foot*', '*Pivot off your back foot*: never turn your back'] },
        ],
        phrase: { big: 'CLOSE IT AS IT TRAVELS', small: 'Arc run, get low, be patient' },
      },
      {
        title: 'As a team',
        lead: 'Stop the *shot* and the *forward pass*.',
        columns: [
          { heading: 'Shape', items: ['*Pressure* the ball', '*Cover*: behind and to the side', '*Balance*: tuck in on the far side'] },
          { heading: 'Move together', items: ['Ball passed: *roles pivot*', 'Ball back or sideways: *squeeze* up', 'Beaten? *Recovery run*, goal side', '*Talk*: defend as a unit'] },
        ],
        phrase: { big: 'DEFEND AS A UNIT', small: 'Pressure, cover, balance' },
      },
    ],

    keywords: [
      { word: 'Matched up', meaning: 'Same numbers: one defender for each attacker.' },
      { word: 'Arc run', meaning: 'Curving your run so you end up between the ball and the goal, not straight at the attacker.' },
      { word: 'Get low', meaning: 'Knees bent, weight forward, ready to move either way.' },
      { word: 'Body angle', meaning: 'Standing side on to show the attacker where you want him to go.' },
      { word: 'Pivot', meaning: 'Turning on your back foot to stay facing the attacker. Never turn your back.' },
      { word: 'Pressure, cover, balance', meaning: 'One goes to the ball, one supports behind, one tucks in on the far side.' },
      { word: 'Squeeze', meaning: 'Stepping up together when the ball goes back or sideways.' },
      { word: 'Recovery run', meaning: 'Sprinting back to get goal side of the ball.' },
    ],

    training: {
      area: 'Tech: 10 × 10 yards (then 15 × 15). Skill: 30 × 20 yards. Game: 40 × 35 yards.',
      players: 'Tech: pairs. Skill: two teams of up to 6. Game: 4 v 4 plus keepers and two floaters.',
      equipment: 'Cones, balls, bibs, small goals, two full-size goals.',
      setup: [
        'Tech (10 minutes): 10 × 10 yards, a small goal a little left of centre, close to the defender. The defender passes to the attacker, then defends the goal.',
        'Travel as the ball travels: that is the trigger to get out and stop him coming forward. Arc run to protect the goal. Slow down, get low, watch the ball.',
        'Body angle: show him away. Pivot off the back foot, never turn your back. Be patient, tackle with the front foot.',
        'Progression: 15 × 15 yards, then 2 v 2.',
        'Skill (10 minutes): 30 × 20 yards, two teams numbered 1 to 6 on their end lines, a small goal in the middle of each end. The coach calls two numbers and serves to one side.',
        'Coach the team without the ball: pressure the ball, the second defender supports (cover) in the right position. When the ball is passed, swap jobs.',
        'Game (20 minutes): 40 × 35 yards, 4 v 4 plus keepers and a floater on each side.',
        'As a team, stop the shot and the forward pass: if they play sideways or back, the defence has done its job. Close the ball quickly, pressure, cover, balance. Roles pivot as the ball is passed.',
        'Quick switch to a wide player? Travel as the ball travels, as a unit.',
        'Squeeze as a unit when the ball goes back or sideways. Recovery runs when needed. Communicate and defend as a unit.',
      ],
    },

    questions: [
      'When did you start moving: when the ball left, or when it arrived?',
      'Did you run straight at him, or curve your run?',
      'Where did you show him? Why?',
      'Did you turn your back at any point?',
      'When did you tackle? Which foot?',
      'Second defender: where did you stand?',
    ],

    clips: [
      // ---------------- 1: tech (1 v 1) ----------------
      {
        id: 'arc-run',
        video: 'videos/defending-matched-up-1.mp4',
        kicker: 'Clip 1 · Tech: 1 v 1',
        title: 'Travel as the Ball Travels',
        tagline: 'Our trigger: get out and stop them coming forward.',
        intro: ['*10 × 10 yards*, a *small goal*.', 'Defender passes in, then *defends the goal*.', 'Ball travels: that\'s the *trigger* to get out.'],
        keyPhrase: { big: 'CLOSE IT AS IT TRAVELS', small: 'Arc run to protect the goal' },
        plain: true, goals: [],
        areas: [{ x: 20, y: 7.5, w: 60, h: 60 }],
        miniGoals: [{ at: [41, 68.5], angle: 180, scale: 0.9 }],
        dims: [{ a: [20, 71.5], b: [80, 71.5], label: '10 yds' }, { a: [15, 7.5], b: [15, 67.5], label: '10 yds' }],
        tagPlace: 'auto',
        legend: { a: 'Attacker', d: 'Defender' },
        players: [{ id: 'X', team: 'a', x: 25, y: 13 }, { id: 'O', team: 'd', x: 75, y: 63 }],
        ball: { owner: 'O' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['10 × 10 yards, a *small goal*.', 'Defender passes to the attacker...', '...then *defends the goal*.'],
            tags: { X: 'ATTACKER', O: 'DEFENDER' },
          },
          {
            title: 'TRAVEL AS THE BALL TRAVELS',
            text: ['Ball travels: that\'s our *trigger*. Get out!', '*Arc run*: curve to get *between ball and goal*.', 'Stop him *coming forward*.'],
            tags: { O: 'ARC RUN' }, timing: { move: 3 },
            moves: [{ id: 'O', path: [[63, 61], [51, 55], [41, 46], [33, 36]], start: 0.12, end: 1 }],
            passes: [{ to: 'X', start: 0.02, end: 0.5 }],
          },
          {
            title: 'SLOW DOWN, GET LOW',
            text: ['*Slow down* as you get close.', '*Get low*: knees bent.', '*Watch the ball*.'],
            tags: { O: 'GET LOW' }, timing: { move: 2.4 },
            moves: [
              { id: 'O', to: [31, 33], start: 0, end: 0.8, ease: 'out' },
              { id: 'X', to: [28, 19], start: 0.1, end: 0.7 },
            ],
          },
          {
            title: 'BODY ANGLE: SHOW HIM AWAY',
            text: ['Side on: *show him away* from goal.', 'Stay *between ball and goal*.'],
            tags: { O: 'SHOW' }, timing: { move: 2.8 },
            moves: [
              { id: 'X', to: [23, 31], start: 0, end: 0.8 },
              { id: 'O', to: [31, 40], start: 0.1, end: 0.9 },
            ],
          },
          {
            title: 'HE CUTS BACK: PIVOT',
            text: ['He cuts back inside?', '*Pivot off your back foot*.', '*Never turn your back* on him.'],
            tags: { O: 'PIVOT' }, timing: { move: 2.4 },
            moves: [
              { id: 'X', to: [33, 30], start: 0, end: 0.6 },
              { id: 'O', to: [36, 40], start: 0.1, end: 0.7 },
            ],
          },
          {
            title: 'PATIENT: FRONT FOOT TACKLE',
            text: ['*Be patient*: wait for the heavy touch.', 'Then *tackle with your front foot*.'],
            tags: { O: 'WON IT!' }, timing: { move: 2.2 },
            moves: [{ id: 'O', to: [35, 36], start: 0.2, end: 0.6, ease: 'out' }, { id: 'X', to: [34, 31], start: 0, end: 0.3 }],
            ball: { pass: 'O', start: 0.25, end: 0.55, arrow: false },
          },
        ],
        summary: ['*Travel as the ball travels*: our *trigger* to get out.', '*Arc run*: protect the goal, stop him coming forward.', '*Slow down*, *get low*, *body angle*.', '*Pivot*, never turn your back. *Front foot* tackle.', 'Progression: 15 × 15, then *2 v 2*.'],
      },

      // ---------------- 2: skill (numbers, 2 v 2) ----------------
      (() => {
        const top = [18, 30, 42, 54, 66, 78];
        const P = [];
        top.forEach((x, i) => P.push({ id: 'X' + (i + 1), team: 'a', label: String(i + 1), x, y: 4.5 }));
        top.forEach((x, i) => P.push({ id: 'O' + (i + 1), team: 'd', label: String(i + 1), x, y: 70.5 }));
        P.push({ id: 'C', team: 'c', label: 'C', x: 95, y: 36 });
        return {
          id: 'pressure-and-cover',
          video: 'videos/defending-matched-up-2.mp4',
          kicker: 'Clip 2 · Skill: 2 v 2',
          title: 'Pressure and Cover',
          tagline: 'Coach calls two numbers. First defender presses, second covers.',
          intro: ['Two teams, numbered *1 to 6*.', 'Coach calls *two numbers* and serves it in.', '*Pressure* the ball, *cover* in the right place.'],
          keyPhrase: { big: 'PRESSURE AND COVER', small: 'Swap jobs when the ball moves' },
          plain: true, goals: [],
          areas: [{ x: 10, y: 9, w: 80, h: 57 }],
          miniGoals: [{ at: [50, 10.5], angle: 0, scale: 0.9 }, { at: [50, 64.5], angle: 180, scale: 0.9 }],
          dims: [{ a: [10, 73.5], b: [90, 73.5], label: '30 yds' }],
          tagPlace: 'auto',
          teamColors: { c: COACH },
          legendTeams: [{ label: 'Attackers', color: G }, { label: 'Defenders', color: B }, { label: 'Coach', color: COACH }],
          players: P,
          ball: { owner: 'C' },
          steps: [
            {
              title: 'THE SET-UP',
              text: ['30 × 20 yards, a *small goal* at each end.', 'Two teams, numbered *1 to 6*, on their end lines.', 'Coach calls *two numbers*, then serves.'],
            },
            {
              title: 'CALL "2 AND 4!"',
              text: ['Numbers 2 and 4 from *both teams* come in.', '*2 v 2*.'],
              timing: { move: 2.6 },
              moves: [
                { id: 'X2', to: [36, 26], start: 0, end: 0.9 }, { id: 'X4', to: [54, 24], start: 0, end: 0.9 },
                { id: 'O2', to: [38, 50], start: 0, end: 0.9 }, { id: 'O4', to: [54, 48], start: 0, end: 0.9 },
              ],
            },
            {
              title: 'CLOSE IT AS IT TRAVELS',
              text: ['Ball served: *first defender* goes as it travels.', '*Arc run*: protect your goal.', '*Second defender*: *cover*, behind and to the side.'],
              tags: { O4: 'PRESS', O2: 'COVER' }, timing: { move: 3 },
              moves: [
                { id: 'O4', path: [[58, 42], [56, 33]], start: 0.15, end: 0.95, ease: 'out' },
                { id: 'O2', to: [46, 44], start: 0.2, end: 0.95 },
              ],
              passes: [{ to: 'X4', start: 0.02, end: 0.5 }],
            },
            {
              title: 'SHOW HIM INTO YOUR COVER',
              text: ['*Body angle*: show him *towards your cover*.', 'Cover *talks*: "I\'m behind you!"'],
              tags: { O4: 'SHOW', O2: 'TALK' }, timing: { move: 2.6 },
              moves: [
                { id: 'X4', to: [46, 27], start: 0, end: 0.8 },
                { id: 'O4', to: [50, 37], start: 0.1, end: 0.9 },
                { id: 'O2', to: [43, 45], start: 0.2, end: 0.9 },
              ],
            },
            {
              title: 'BALL PASSED: SWAP JOBS',
              text: ['Ball moves: *roles pivot*.', 'Cover becomes *pressure*...', '...pressure drops to *cover*.'],
              tags: { O2: 'PRESS', O4: 'COVER' }, timing: { move: 3 },
              moves: [
                { id: 'O2', path: [[40, 40], [38, 35]], start: 0.15, end: 0.95, ease: 'out' },
                { id: 'O4', to: [46, 43], start: 0.2, end: 0.95 },
                { id: 'X2', to: [36, 28], start: 0, end: 0.3 },
              ],
              passes: [{ to: 'X2', start: 0.05, end: 0.45 }],
            },
            {
              title: 'PATIENT: FRONT FOOT',
              text: ['Get low, *be patient*.', 'Heavy touch: *front foot* tackle.', 'Cover is there if he gets past.'],
              tags: { O2: 'WON IT!' }, timing: { move: 2.2 },
              moves: [
                { id: 'X2', to: [37, 31], start: 0, end: 0.4 },
                { id: 'O2', to: [37, 34], start: 0.2, end: 0.6, ease: 'out' },
              ],
              ball: { pass: 'O2', start: 0.3, end: 0.6, arrow: false },
            },
          ],
          summary: ['First defender: *close it as it travels*.', 'Second defender: *cover*, behind and to the side.', 'Show him *into your cover*.', 'Ball passed: *swap jobs*.'],
        };
      })(),

      // ---------------- 3: game ----------------
      {
        id: 'defend-as-a-unit',
        video: 'videos/defending-matched-up-3.mp4',
        kicker: 'Clip 3 · Game',
        title: 'Defend as a Unit',
        tagline: 'Stop the shot and the forward pass. Squeeze, recover, talk.',
        intro: ['*4 v 4* plus keepers, 40 × 35 yards.', 'A *floater* each side helps the team with the ball.', 'Coach the *blues*: defend as a *unit*.'],
        keyPhrase: { big: 'DEFEND AS A UNIT', small: 'Pressure, cover, balance' },
        plain: true,
        goals: [[37.5, 'left'], [37.5, 'right']],
        goalScale: 1.4,
        areas: [{ x: 0, y: 0.5, w: 100, h: 8, fill: 'rgba(212,160,23,0.12)' }, { x: 0, y: 66.5, w: 100, h: 8, fill: 'rgba(212,160,23,0.12)' }],
        tagPlace: 'auto',
        facing: { a: 'left', d: 'right', f: 1, g: -1, k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues (defending)', color: B }, { label: 'Floaters', color: S }],
        players: [
          { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 }, { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
          { id: 'G1', team: 'a', x: 64, y: 22 }, { id: 'G2', team: 'a', x: 64, y: 54 },
          { id: 'G3', team: 'a', x: 52, y: 40 }, { id: 'G4', team: 'a', x: 32, y: 34 },
          { id: 'B1', team: 'd', x: 46, y: 30 }, { id: 'B2', team: 'd', x: 46, y: 48 },
          { id: 'B3', team: 'd', x: 36, y: 52 }, { id: 'B4', team: 'd', x: 24, y: 36 },
          { id: 'F1', team: 'f', label: 'F', x: 50, y: 4.5 }, { id: 'F2', team: 'g', label: 'F', x: 50, y: 70.5 },
        ],
        ball: { owner: 'G2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* plus keepers, 40 × 35 yards.', 'A *floater* each side helps the team with the ball.', 'Coach the *blues*: stop the *shot* and the *forward pass*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
          },
          {
            title: 'CLOSE IT AS IT TRAVELS',
            text: ['Ball goes sideways: *close it as it travels*.', '*Pressure*, *cover*, *balance*.', 'Everyone *squeezes* across.'],
            tags: { B1: 'PRESS', B2: 'COVER', B3: 'BALANCE' }, timing: { move: 3 },
            moves: [
              { id: 'B1', path: [[52, 30], [57, 25]], start: 0.1, end: 0.9, ease: 'out' },
              { id: 'B2', to: [50, 34], start: 0.15, end: 0.9 },
              { id: 'B3', to: [40, 45], start: 0.2, end: 0.9 },
              { id: 'B4', to: [27, 31], start: 0.2, end: 0.9 },
              { id: 'G4', to: [34, 28], start: 0.1, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'G1', start: 0.05, end: 0.45 }],
          },
          {
            title: 'NO WAY FORWARD',
            text: ['Show him *into* your team-mates.', 'Forward pass *blocked*: he plays it *back*.', 'Sideways or back? *Job done*.'],
            tags: { B1: 'SHOW' }, timing: { move: 2.6 },
            lanes: [{ from: 'G1', to: 'G4', blocked: true }],
            moves: [{ id: 'G3', to: [54, 42], start: 0, end: 0.4, arrow: false }],
            passes: [{ to: 'G3', start: 0.4, end: 0.8 }],
          },
          {
            title: 'BALL BACK: SQUEEZE',
            text: ['Ball played back: *squeeze* up as a unit.', 'Roles *pivot*: nearest presses, others cover.', '*Talk*: "step up!"'],
            tags: { B2: 'PRESS', B1: 'COVER', B4: 'TALK' }, timing: { move: 3 },
            moves: [
              { id: 'B2', path: [[50, 38], [47, 40]], start: 0, end: 0.8, ease: 'out' },
              { id: 'B1', to: [46, 32], start: 0.1, end: 0.9 },
              { id: 'B3', to: [44, 50], start: 0.1, end: 0.9 },
              { id: 'B4', to: [28, 33], start: 0.1, end: 0.9 },
            ],
          },
          {
            title: 'QUICK SWITCH: MOVE TOGETHER',
            text: ['Quick switch out wide?', '*Travel as the ball travels*: as a *unit*.', 'Pressure, cover, balance again.'],
            tags: { B3: 'PRESS', B2: 'COVER', B1: 'BALANCE' }, timing: { move: 3 },
            moves: [
              { id: 'B3', path: [[50, 52], [57, 52]], start: 0.1, end: 0.9, ease: 'out' },
              { id: 'B2', to: [50, 45], start: 0.1, end: 0.9 },
              { id: 'B1', to: [43, 38], start: 0.1, end: 0.9 },
              { id: 'B4', to: [30, 37], start: 0.1, end: 0.9 },
              { id: 'G1', to: [60, 28], start: 0.2, end: 0.8, arrow: false },
            ],
            passes: [{ to: 'G2', start: 0.05, end: 0.45 }],
          },
          {
            title: 'BEATEN? RECOVERY RUN',
            text: ['A one-two with the floater: he\'s past.', '*Recovery run*: sprint back *goal side*.'],
            tags: { F2: 'FLOATER', B3: 'RECOVER' }, timing: { move: 3.4 },
            moves: [
              { id: 'F2', to: [56, 70.5], start: 0, end: 0.3 },
              { id: 'G2', path: [[58, 61], [42, 60]], start: 0.2, end: 0.85 },
              { id: 'B3', to: [34, 57], start: 0.4, end: 1 },
              { id: 'B2', to: [44, 50], start: 0.5, end: 1, arrow: false },
            ],
            passes: [{ to: 'F2', start: 0.05, end: 0.3 }, { to: 'G2', start: 0.55, end: 0.88 }],
          },
          {
            title: 'GOAL SIDE: WIN IT',
            text: ['Goal side again: *get low*, be *patient*.', '*Front foot* tackle. Never turn your back.', '*Talk*: defend as a unit.'],
            tags: { B3: 'WON IT!' }, timing: { move: 2.4 },
            moves: [
              { id: 'G2', to: [39, 59], start: 0, end: 0.4 },
              { id: 'B3', to: [35, 58], start: 0.2, end: 0.6, ease: 'out' },
            ],
            ball: { pass: 'B3', start: 0.3, end: 0.6, arrow: false },
          },
        ],
        summary: ['Stop the *shot* and the *forward pass*: sideways or back is a *job done*.', '*Pressure*, *cover*, *balance*: roles pivot.', 'Ball back: *squeeze*. Quick switch: *travel together*.', 'Beaten? *Recovery run*. *Talk*.'],
      },
    ],
  });
})();
