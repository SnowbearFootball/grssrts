/*
 * SESSION: Dribbling: Where Is the Space / Overload? (Attacking · dribbling)
 * From the owner's own plan "Dribbling - Part 4". Follows Dribbling (Part 1) and Dribbling: 1 v 1 to 2 v 2 (Parts 2 and 3).
 *
 * Numbers game: 35 x 35 yard square, a goal and keeper at each end. Two teams of 5, numbered 1 to 5 (each player has
 *   a numbered opponent). Greens wait by the top goal, blues by the bottom goal. The coach calls a number and passes
 *   straight to one player: the attacker, who attacks the other team's goal. 1 v 1 (10 mins), then 2 v 2: call two
 *   numbers, use movement and exploit space (10 mins).
 * Game: 4 v 4 + keepers on 40 x 50 yards (20 mins). Dribble where possible and appropriate: look for space and overloads.
 * Key factors: identify space to dribble into; once there, pick a positive outcome: a shot, or if not, a positive pass / cross.
 * Pitch units: x 0..100, y 0..75 (1 unit is about the same across and down).
 */
(function () {
  const COACH = '#6b7280';
  const ORANGE = '#d9622b';

  // ---------- numbers game: the square ----------
  const SQ = { x: 19, y: 7, w: 62, h: 62 };
  const TOPQ = 2.5, BOTQ = 73.5;
  const QX = { 1: 26, 2: 33, 3: 64, 4: 71, 5: 78 };
  const numbers = {
    plain: true, goals: [],
    areas: [{ x: SQ.x, y: SQ.y, w: SQ.w, h: SQ.h }],
    miniGoals: [{ at: [50, SQ.y], angle: 0, scale: 1.2 }, { at: [50, SQ.y + SQ.h], angle: 180, scale: 1.2 }],
    dims: [{ a: [13, SQ.y], b: [13, SQ.y + SQ.h], label: '35 yds' }],
    teamColors: { c: COACH },
    legendTeams: [{ label: 'Greens', color: '#2fbf7f' }, { label: 'Blues', color: '#3b9ae1' }, { label: 'Coach', color: COACH }],
    tagPlace: 'auto',
  };
  const numberPlayers = () => [
    { id: 'kt', team: 'k', label: 'GK', x: 50, y: 10.5 },
    { id: 'kb', team: 'k', label: 'GK', x: 50, y: 65.5 },
    { id: 'co', team: 'c', label: 'C', x: 89, y: 38 },
  ].concat([1, 2, 3, 4, 5].map(n => ({ id: 'g' + n, team: 'a', label: String(n), x: QX[n], y: TOPQ })))
    .concat([1, 2, 3, 4, 5].map(n => ({ id: 'b' + n, team: 'd', label: String(n), x: QX[n], y: BOTQ })));

  // ---------- the game: 4 v 4 + keepers ----------
  const game = {
    plain: true,
    goals: [[50, 'top'], [50, 'bottom']],
    areas: [{ x: 19, y: -1.5, w: 62, h: 78 }],
    dims: [{ a: [12, -1.5], b: [12, 76.5], label: '50 yds' }],
    legend: { a: 'Greens (attack down)', d: 'Blues' },
    tagPlace: 'auto',
  };
  const SPACE = { x: 45, y: 20, w: 22, h: 21, color: ORANGE, label: 'THE SPACE', labelAt: [56, 17.5], soft: true };
  const OVERLOAD = { x: 54, y: 41, w: 27, h: 29, color: '#2fbf7f', label: '2 v 1: OVERLOAD', labelAt: [67.5, 67.5], soft: true };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'dribbling-space-overload',
    title: 'Dribbling: Where Is the Space / Overload?',
    subtitle: '1 v 1, 2 v 2, then the game',
    type: 'Game',
    category: 'attacking',
    topics: ['Dribbling', 'Small-sided games'],
    squad: [10, 12],
    thumb: 'assets/thumbs/dribbling-space-overload.jpg',
    summary: 'A numbers game in a 35 yard square with a goal and keeper at each end. The coach calls a number and passes to the attacker. 1 v 1, then 2 v 2, then a 4 v 4 game. Where is the space? Where is the overload? Dribble into the space, use the overload, then a shot or a positive pass.',
    keyPhrase: 'Find the space, then finish positively',
    ages: { from: 11 },

    cards: [
      {
        title: 'Key factors',
        lead: 'Use dribbling, and your team-mates, to *create a chance at goal*.',
        columns: [
          { heading: 'Find the space', items: ['*Head up*: where is the space?', 'Dribble *into* it', 'A team-mate\'s run can *make* space for you'] },
          { heading: 'Then be positive', items: ['Shot on? *Shoot*, on target', 'Not on? A *positive pass* or *cross*', 'Never dribble just for the sake of it'] },
        ],
        phrase: { big: 'FIND THE SPACE, FINISH POSITIVELY', small: 'Shot first. Not on? A positive pass.' },
      },
      {
        title: 'Space or overload?',
        lead: 'In the game, *look up* and ask two questions.',
        columns: [
          { heading: 'Where is the space?', items: ['Nobody in front of you? That\'s *space*', '*Drive into it*: big touches, head up'] },
          { heading: 'Where is the overload?', items: ['*More of us than them*, like 2 v 1', 'Defender steps up? *Pass*. Stays? *Drive*'] },
        ],
        phrase: { big: 'WHERE IS THE SPACE / OVERLOAD?', small: 'Space there? Drive into it.' },
      },
      {
        title: 'Make it easier or harder',
        columns: [
          { heading: 'Easier', items: ['Defender starts *further back*', 'Make the square *bigger*'] },
          { heading: 'Harder', items: ['Pass to the attacker *later*, so the defender is closer', 'Call *two numbers* fast, or a 3 v 3'] },
        ],
      },
    ],

    keywords: [
      { word: 'Numbers game', meaning: 'Each player has a number. The coach calls a number and those players go in.' },
      { word: 'Attacker', meaning: 'Here: the player the coach passes to. They attack the other team\'s goal.' },
      { word: 'Overload', meaning: 'More attackers than defenders in one area, like 2 v 1.' },
      { word: 'Drive', meaning: 'Run with the ball at speed into space, with big touches.' },
      { word: 'Space', meaning: 'An area with no defender in it, where you have time to dribble and look up.' },
      { word: 'Isolate', meaning: 'A team-mate\'s run takes one defender away, leaving it 1 v 1.' },
      { word: 'Positive outcome', meaning: 'The end of your dribble: a shot on target, or a pass or cross that keeps the attack going.' },
    ],

    training: {
      area: 'Numbers game: a 35 × 35 yard square, a goal at each end. Game: 40 × 50 yards, a goal at each end.',
      players: '12: two keepers, two teams of 5. Number each team 1 to 5, so every player has a numbered opponent.',
      equipment: 'Cones, 2 goals, a good supply of balls with the coach, bibs in two colours.',
      setup: [
        'Numbers game: greens wait by the top goal, blues by the bottom goal. A keeper in each goal. The coach stands at the side with the balls.',
        '1 v 1 (10 minutes): the coach calls a number and passes straight to one of them: they are the attacker and attack the other team\'s goal. Their numbered opponent comes out to defend.',
        'Head up: find the space, dribble into it, beat the defender and get a shot on target.',
        'After each go, both back to their line. Call a new number.',
        'Progression, 2 v 2 (10 minutes): call two numbers. Use movement off the ball to make space, then exploit it. A run can take a defender away: then attack the space away from the run.',
        'Shot on? Shoot. Not on? Look for a positive pass or cross.',
        'Game, 4 v 4 + keepers (20 minutes): go to a game. Encourage players to dribble where possible and appropriate.',
        'Look for an overload (more attackers than defenders) and for space. If the space is there, drive into it.',
        'Before this: Dribbling (Part 1) and Dribbling: 1 v 1 to 2 v 2 (Parts 2 and 3).',
      ],
    },

    questions: [
      'When you got the ball, where was the space?',
      'Was the shot on? If not, what was the best pass?',
      'In 2 v 2, how did your team-mate\'s run help you?',
      'In the game, where did we have more players than them?',
    ],

    clips: [
      // ---------------- 1 v 1 ----------------
      Object.assign({}, numbers, {
        id: 'one-v-one',
        video: 'videos/dribbling-space-overload-1.mp4',
        kicker: 'Numbers game · 1 v 1',
        title: '1 v 1: Find the Space',
        tagline: 'Is it on? Find the space, go past, get a shot on target.',
        intro: ['The coach calls a number and *passes to the attacker*.', 'Their numbered opponent *defends*.', '*Head up*: find the space, go past and *shoot*.'],
        players: numberPlayers(),
        ball: { owner: 'co' },
        keyPhrase: { big: 'WHERE IS THE SPACE?', small: 'Find it, go past, shoot.' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A *35 yard* square, a goal and *keeper* each end.', 'Two teams, numbered *1 to 5*.', 'Every player has a *numbered opponent*.'],
          },
          {
            title: '"NUMBER 3!"',
            text: ['The coach calls a number and *passes to the attacker*.', 'Their *number 3* comes out to defend.', 'First touch *out of your feet*.'],
            tags: { co: 'NUMBER 3!', b3: 'ATTACKER', g3: 'DEFENDER' }, timing: { move: 3.4 },
            passes: [{ to: 'b3', start: 0.02, end: 0.45 }],
            moves: [
              { id: 'b3', to: [64, 61], start: 0.5, end: 0.95 },
              { id: 'g3', to: [60, 24], start: 0.1, end: 0.95, ease: 'out' },
            ],
          },
          {
            title: 'WHERE IS THE SPACE?',
            text: ['*Head up*: where is the space?', 'Dribble *at* the defender.'],
            tags: { b3: 'HEAD UP' }, timing: { move: 3 },
            moves: [{ id: 'b3', to: [61, 37], end: 0.9 }, { id: 'g3', to: [58, 25], end: 0.9, ease: 'out' }],
            halves: [{ x: 38, y: 14, w: 14, h: 15, color: ORANGE, label: 'THE SPACE', labelAt: [45, 31.5], soft: true }],
          },
          {
            title: 'MOVE THE DEFENDER',
            text: ['*Be positive*.', '*Show them one way*: the defender moves.'],
            tags: { b3: 'DOUBLE MOVE' }, timing: { move: 2.6 },
            moves: [
              { id: 'b3', path: [[64, 36], [62, 36]], end: 0.75 },
              { id: 'g3', to: [63, 25], start: 0.25, end: 0.85 },
            ],
            halves: [{ x: 38, y: 14, w: 14, h: 15, color: ORANGE, label: 'THE SPACE', labelAt: [45, 31.5], soft: true }],
          },
          {
            title: 'ATTACK THE SPACE',
            text: ['Now go the *other way*.', '*Explode* into the space.'],
            tags: { b3: 'ATTACK THE SPACE' }, timing: { move: 3 },
            moves: [
              { id: 'b3', path: [[56, 33], [49, 26], [47, 19]], end: 0.95 },
              { id: 'g3', to: [57, 21], start: 0.3, end: 0.95, arrow: false },
              { id: 'kt', to: [48.5, 11.5], start: 0.4, end: 0.95, arrow: false },
            ],
            halves: [{ x: 38, y: 14, w: 14, h: 15, color: ORANGE, label: 'THE SPACE', labelAt: [45, 31.5], soft: true }],
          },
          {
            title: 'SHOT ON TARGET',
            text: ['Shot on? *Shoot*.', 'Hit the *target*: make the keeper work.'],
            tags: { b3: 'SHOOT' }, timing: { move: 2 },
            ball: { to: [53.5, 6.8], start: 0.05, end: 0.5 },
          },
          {
            title: 'NEXT NUMBER',
            text: ['Both *back to your line*.', 'The coach calls a *new number*.'],
            tags: { co: 'NUMBER 1!' }, timing: { move: 3 },
            ball: { give: 'co' },
            moves: [
              { id: 'b3', to: [QX[3], BOTQ], end: 0.9, arrow: false },
              { id: 'g3', to: [QX[3], TOPQ], end: 0.9, arrow: false },
              { id: 'kt', to: [50, 10.5], end: 0.6, arrow: false },
            ],
          },
        ],
        summary: ['The coach *passes to the attacker*.', '*Head up*: find the space.', 'Go past, then a *shot on target*.'],
      }),

      // ---------------- 2 v 2 ----------------
      Object.assign({}, numbers, {
        id: 'two-v-two',
        video: 'videos/dribbling-space-overload-2.mp4',
        kicker: 'Progression · 2 v 2',
        title: 'Call Two Numbers',
        tagline: 'Use movement to make space, then exploit it.',
        intro: ['The coach calls *two numbers*: *2 v 2*.', 'A run off the ball *takes a defender away*.', 'Attack the space *away from the run*.'],
        players: numberPlayers(),
        ball: { owner: 'co' },
        keyPhrase: { big: 'MAKE SPACE, THEN USE IT', small: 'Shot on? Shoot. Not on? Positive pass.' },
        steps: [
          {
            title: '"1 AND 4!"',
            text: ['The coach calls *two numbers*...', '...and *passes to an attacker*.', 'Greens attack the *bottom goal*. Blues defend.'],
            tags: { co: '1 AND 4!', g4: 'ATTACKER', g1: 'ATTACKER', b4: 'DEFENDER', b1: 'DEFENDER' }, timing: { move: 3.6 },
            passes: [{ to: 'g4', start: 0.02, end: 0.45 }],
            moves: [
              { id: 'g4', to: [64, 22], start: 0.5, end: 0.95 },
              { id: 'g1', to: [33, 20], start: 0.2, end: 0.95 },
              { id: 'b4', to: [61, 40], start: 0.1, end: 0.95, ease: 'out' },
              { id: 'b1', to: [38, 45], start: 0.1, end: 0.95 },
            ],
          },
          {
            title: 'MOVE TO MAKE SPACE',
            text: ['Off the ball: a *run* round the outside.', 'Their defender *goes with it*.', 'Now it\'s *1 v 1*.'],
            tags: { g1: 'RUN', b1: 'FOLLOWS', b4: 'ISOLATED' }, timing: { move: 3.2 },
            moves: [
              { id: 'g1', path: [[26, 30], [25, 44], [28, 58]], end: 0.95 },
              { id: 'b1', to: [35, 50], start: 0.3, end: 0.95 },
              { id: 'g4', to: [61, 32], end: 0.9, arrow: false },
            ],
          },
          {
            title: 'SHOW THEM, THEN GO',
            text: ['Don\'t dribble *towards* the run.', '*Feint* that way: the defender shifts.'],
            tags: { g4: 'DOUBLE MOVE' }, timing: { move: 2.8 },
            moves: [
              { id: 'g4', path: [[58, 35], [57, 36]], end: 0.75 },
              { id: 'b4', to: [55, 45], start: 0.3, end: 0.85 },
            ],
            halves: [{ x: 61, y: 42, w: 15, h: 18, color: ORANGE, label: 'THE SPACE', labelAt: [68.5, 62.5], soft: true }],
          },
          {
            title: 'EXPLOIT THE SPACE',
            text: ['Go the *other way*, away from the run.', '*Change of pace* into the space.'],
            tags: { g4: 'ATTACK THE SPACE' }, timing: { move: 3 },
            moves: [
              { id: 'g4', path: [[62, 39], [68, 47], [65, 56]], end: 0.95 },
              { id: 'b4', to: [57, 48], start: 0.3, end: 0.95, arrow: false },
              { id: 'kb', to: [52.5, 64.5], start: 0.4, end: 0.95, arrow: false },
            ],
            halves: [{ x: 61, y: 42, w: 15, h: 18, color: ORANGE, label: 'THE SPACE', labelAt: [68.5, 62.5], soft: true }],
          },
          {
            title: 'SHOT ON TARGET',
            text: ['Shot on? *Shoot*, across the keeper.', 'Not on? A *positive pass* to your team-mate.'],
            tags: { g4: 'SHOOT' }, timing: { move: 2 },
            ball: { to: [46.5, 69.2], start: 0.05, end: 0.5 },
          },
        ],
        summary: ['Call *two numbers*: 2 v 2.', 'A run *takes a defender away*.', 'Attack the space *away from the run*.'],
      }),

      // ---------------- the game ----------------
      Object.assign({}, game, {
        id: 'game',
        video: 'videos/dribbling-space-overload-3.mp4',
        kicker: 'Game · 4 v 4 + keepers',
        title: 'Space or Overload?',
        tagline: 'Look for where you outnumber them, and for space to drive into.',
        intro: ['*4 v 4* plus keepers.', 'Look for an *overload*: more attackers than defenders.', 'Look for *space*: if it\'s there, *drive into it*.'],
        players: [
          { id: 'kt', team: 'k', label: 'GK', x: 50, y: 2 },
          { id: 'kb', team: 'k', label: 'GK', x: 50, y: 73 },
          { id: 'g1', team: 'a', x: 46, y: 14 }, { id: 'g2', team: 'a', x: 72, y: 30 },
          { id: 'g3', team: 'a', x: 25, y: 33 }, { id: 'g4', team: 'a', x: 38, y: 40 },
          { id: 'b1', team: 'd', x: 32, y: 24 }, { id: 'b2', team: 'd', x: 31, y: 47 },
          { id: 'b3', team: 'd', x: 44, y: 55 }, { id: 'b4', team: 'd', x: 64, y: 50 },
        ],
        ball: { owner: 'g1' },
        keyPhrase: { big: 'WHERE IS THE SPACE / OVERLOAD?', small: 'Space there? Drive into it.' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*40 × 50* yards, *4 v 4* plus keepers.', 'Greens attack *down* the screen.', 'Dribble where *possible and appropriate*.'],
          },
          {
            title: 'WHERE IS THE SPACE?',
            text: ['*Head up* on the ball.', 'Nobody in front of you? That\'s *space*.'],
            tags: { g1: 'HEAD UP' }, timing: { move: 1.5 },
            halves: [SPACE],
          },
          {
            title: 'DRIVE INTO IT',
            text: ['Space is there: *drive into it*.', 'Big touches, *head up*.'],
            tags: { g1: 'DRIVE' }, timing: { move: 3.2 },
            moves: [
              { id: 'g1', path: [[50, 24], [56, 38]], end: 0.95 },
              { id: 'g2', to: [74, 42], start: 0.2, end: 0.95 },
              { id: 'b1', to: [40, 27], start: 0.3, end: 0.95, arrow: false },
              { id: 'g4', to: [36, 48], start: 0.3, end: 0.95, arrow: false },
              { id: 'b2', to: [32, 52], start: 0.3, end: 0.95, arrow: false },
              { id: 'g3', to: [24, 42], start: 0.3, end: 0.95, arrow: false },
              { id: 'b4', to: [64, 52], start: 0.3, end: 0.95, arrow: false },
            ],
            halves: [SPACE],
          },
          {
            title: 'LOOK FOR THE OVERLOAD',
            text: ['On this side: *2 attackers v 1 defender*.', 'That\'s an *overload*.', 'Keep driving: *make the defender decide*.'],
            tags: { g1: 'DRIVE', g2: 'FREE MAN' }, timing: { move: 2.8 },
            moves: [
              { id: 'g1', to: [59, 45], end: 0.9 },
              { id: 'g2', to: [75, 48], end: 0.9, arrow: false },
              { id: 'b4', to: [63, 53], start: 0.3, end: 0.9, ease: 'out' },
            ],
            halves: [OVERLOAD],
          },
          {
            title: 'THEY STEP UP: PASS',
            text: ['The defender *steps up* to you?', '*Pass* to the free player.', 'They *stay*? Keep *driving* at goal.'],
            tags: { b4: 'PRESS', g2: 'ATTACK THE SPACE' }, timing: { move: 3.2 },
            passes: [{ to: 'g2', start: 0.05, end: 0.4 }],
            moves: [
              { id: 'b4', to: [61, 52], end: 0.4, ease: 'out' },
              { id: 'g2', to: [70, 60], start: 0.45, end: 0.95 },
              { id: 'kb', to: [53.5, 72], start: 0.5, end: 0.95, arrow: false },
              { id: 'b3', to: [52, 60], start: 0.4, end: 0.95, arrow: false },
            ],
            halves: [OVERLOAD],
          },
          {
            title: 'SHOT ON TARGET',
            text: ['*Shoot*: across the keeper, on target.', 'Space or overload? *Use it*.'],
            tags: { g2: 'SCORE' }, timing: { move: 2 },
            ball: { to: [47, 77.5], start: 0.05, end: 0.5 },
          },
        ],
        summary: ['Look for an *overload*: more of us than them.', 'Look for *space*: drive into it.', 'Defender steps up? *Pass*. Stays? *Drive*.'],
      }),
    ],
  });
})();
