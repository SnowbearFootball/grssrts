/*
 * SESSION (DRAFT): Dribbling: Risk or Reward? (Attacking · dribbling)
 * From the owner's own plan "Dribbling - Part 4". Follows Dribbling (Part 1) and Dribbling: 1 v 1 to 2 v 2 (Parts 2 and 3).
 *
 * Numbers game: 35 x 35 yard square, a goal and keeper at each end. Two teams of 5, numbered 1 to 5 (each player has
 *   a numbered opponent). Greens wait by the top goal, blues by the bottom goal. The coach calls a number and plays a
 *   ball in: whoever gets it is the attacker and attacks the other team's goal. 1 v 1 (10 mins), then 2 v 2: call two
 *   numbers, use movement and exploit space (10 mins).
 * Game: 4 v 4 + keepers on 40 x 50 yards (20 mins). Dribble where possible and appropriate. Think risk / reward.
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
  const RISK = { x: 19, y: -1.5, w: 62, h: 25, color: '#e5484d', label: 'RISK: KEEP IT SAFE', labelAt: [33, 2.5], soft: true };
  const REWARD = { x: 19, y: 51.5, w: 62, h: 25, color: ORANGE, label: 'REWARD: TAKE THEM ON', labelAt: [33, 72.5], soft: true };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'dribbling-risk-reward',
    draft: true,
    title: 'Dribbling: Risk or Reward?',
    subtitle: 'Numbers game: 1 v 1, 2 v 2, then the game',
    type: 'Game',
    category: 'attacking',
    topics: ['Dribbling', 'Small-sided games'],
    squad: [10, 12],
    thumb: 'assets/thumbs/dribbling-risk-reward.jpg',
    summary: 'A numbers game in a 35 yard square with a goal and keeper at each end. The coach calls a number: whoever gets the ball attacks. 1 v 1, then 2 v 2, then a 4 v 4 game. Find the space, dribble into it, then pick a positive finish: a shot, or a positive pass.',
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
        title: 'Risk or reward?',
        lead: 'Dribbling is worth it in the *right place*.',
        columns: [
          { heading: 'Near your own goal', items: ['Lose it here and they *score*', '*High risk*: keep it simple, pass'] },
          { heading: 'Near their goal', items: ['Beat one player and you\'re *in on goal*', '*High reward*: take them on'] },
        ],
        phrase: { big: 'THINK RISK OR REWARD', small: 'Where am I? What happens if I lose it?' },
      },
      {
        title: 'Make it easier or harder',
        columns: [
          { heading: 'Easier', items: ['Play the ball *nearer* the attacker', 'Make the square *bigger*'] },
          { heading: 'Harder', items: ['Play the ball *between* the two players', 'Call *two numbers* fast, or a 3 v 3'] },
        ],
      },
    ],

    keywords: [
      { word: 'Numbers game', meaning: 'Each player has a number. The coach calls a number and those players go in.' },
      { word: 'Attacker', meaning: 'Here: whoever gets the ball first. They attack the other team\'s goal.' },
      { word: 'Space', meaning: 'An area with no defender in it, where you have time to dribble and look up.' },
      { word: 'Isolate', meaning: 'A team-mate\'s run takes one defender away, leaving it 1 v 1.' },
      { word: 'Positive outcome', meaning: 'The end of your dribble: a shot on target, or a pass or cross that keeps the attack going.' },
      { word: 'Risk or reward', meaning: 'What you might lose if the dribble goes wrong, against what you might win if it works.' },
    ],

    training: {
      area: 'Numbers game: a 35 × 35 yard square, a goal at each end. Game: 40 × 50 yards, a goal at each end.',
      players: '12: two keepers, two teams of 5. Number each team 1 to 5, so every player has a numbered opponent.',
      equipment: 'Cones, 2 goals, a good supply of balls with the coach, bibs in two colours.',
      setup: [
        'Numbers game: greens wait by the top goal, blues by the bottom goal. A keeper in each goal. The coach stands at the side with the balls.',
        '1 v 1 (10 minutes): the coach calls a number and plays a ball in. Whoever gets it is the attacker and attacks the other team\'s goal. The other player defends.',
        'Head up: find the space, dribble into it, beat the defender and get a shot on target.',
        'After each go, both back to their line. Call a new number.',
        'Progression, 2 v 2 (10 minutes): call two numbers. Use movement off the ball to make space, then exploit it. A run can take a defender away: then attack the space away from the run.',
        'Shot on? Shoot. Not on? Look for a positive pass or cross.',
        'Game, 4 v 4 + keepers (20 minutes): go to a game. Encourage players to dribble where possible and appropriate.',
        'Think risk / reward: near your own goal, keep it simple. Near their goal, take them on.',
        'Before this: Dribbling (Part 1) and Dribbling: 1 v 1 to 2 v 2 (Parts 2 and 3).',
      ],
    },

    questions: [
      'When you got the ball, where was the space?',
      'Was the shot on? If not, what was the best pass?',
      'In 2 v 2, how did your team-mate\'s run help you?',
      'Where on the pitch is dribbling worth the risk?',
      'If you lose it there, what happens?',
    ],

    clips: [
      // ---------------- 1 v 1 ----------------
      Object.assign({}, numbers, {
        id: 'one-v-one',
        video: 'videos/dribbling-risk-reward-1.mp4',
        kicker: 'Numbers game · 1 v 1',
        title: 'Call a Number',
        tagline: 'Whoever gets the ball attacks. Find the space, get a shot on target.',
        intro: ['Two teams, numbered *1 to 5*.', 'The coach *calls a number* and plays a ball in.', 'Whoever gets it *attacks*: dribble past and *shoot*.'],
        players: numberPlayers(),
        ball: { owner: 'co' },
        keyPhrase: { big: 'FIND THE SPACE, GO PAST', small: 'Then a shot on target' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A *35 yard* square, a goal and *keeper* each end.', 'Two teams, numbered *1 to 5*.', 'Every player has a *numbered opponent*.'],
          },
          {
            title: '"NUMBER 3!"',
            text: ['The coach *calls a number*.', 'Both *number 3s* sprint in.'],
            tags: { co: 'NUMBER 3!', g3: 'GO!', b3: 'GO!' }, timing: { move: 2.6 },
            moves: [
              { id: 'g3', to: [60, 26], end: 0.9 },
              { id: 'b3', to: [67, 43], end: 0.9 },
            ],
          },
          {
            title: 'FIRST TO THE BALL',
            text: ['The coach *plays a ball in*.', 'Whoever gets it is the *attacker*.', 'They attack the *other team\'s goal*.'],
            tags: { b3: 'ATTACKER', g3: 'DEFENDER' }, timing: { move: 3 },
            passes: [{ to: 'b3', start: 0.02, end: 0.38 }],
            moves: [
              { id: 'b3', to: [64, 41], start: 0.42, end: 0.95 },
              { id: 'g3', to: [57, 24], start: 0.35, end: 0.95, ease: 'out' },
            ],
          },
          {
            title: 'HEAD UP: WHERE\'S THE SPACE?',
            text: ['*Head up*: find the *space* to dribble into.', 'Dribble *at* the defender.'],
            tags: { b3: 'HEAD UP' }, timing: { move: 2.6 },
            moves: [{ id: 'b3', to: [61, 37], end: 0.9 }, { id: 'g3', to: [58, 25], end: 0.9, ease: 'out' }],
            halves: [{ x: 38, y: 14, w: 14, h: 15, color: ORANGE, label: 'THE SPACE', labelAt: [45, 31.5], soft: true }],
          },
          {
            title: 'MOVE THE DEFENDER',
            text: ['*Show them one way*...', '...the defender *moves* with you.'],
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
              { id: 'g1', to: [30, 18], start: 0.45, end: 0.95 },
              { id: 'b1', to: [32, 56], start: 0.45, end: 0.95 },
            ],
          },
        ],
        summary: ['Whoever gets the ball *attacks*.', '*Head up*: find the space, dribble into it.', 'Then a *shot on target*.'],
      }),

      // ---------------- 2 v 2 ----------------
      Object.assign({}, numbers, {
        id: 'two-v-two',
        video: 'videos/dribbling-risk-reward-2.mp4',
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
            text: ['The coach calls *two numbers*.', 'Both *1s* and both *4s* sprint in.'],
            tags: { co: '1 AND 4!' }, timing: { move: 2.8 },
            moves: [
              { id: 'g1', to: [33, 21], end: 0.9 }, { id: 'g4', to: [64, 21], end: 0.9 },
              { id: 'b1', to: [36, 46], end: 0.9 }, { id: 'b4', to: [64, 46], end: 0.9 },
            ],
          },
          {
            title: 'FIRST TO THE BALL',
            text: ['The coach *plays a ball in*.', 'Greens get it: they *attack the bottom goal*.'],
            tags: { g4: 'ATTACKER', g1: 'ATTACKER', b4: 'DEFENDER', b1: 'DEFENDER' }, timing: { move: 3 },
            passes: [{ to: 'g4', start: 0.02, end: 0.38 }],
            moves: [
              { id: 'g4', to: [62, 27], start: 0.42, end: 0.95 },
              { id: 'b4', to: [61, 40], start: 0.35, end: 0.95, ease: 'out' },
              { id: 'b1', to: [40, 44], start: 0.35, end: 0.95, arrow: false },
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
        video: 'videos/dribbling-risk-reward-3.mp4',
        kicker: 'Game · 4 v 4 + keepers',
        title: 'Risk or Reward?',
        tagline: 'Dribble where it\'s worth it. Near your goal, keep it simple.',
        intro: ['*4 v 4* plus keepers.', 'Dribble where *possible and appropriate*.', 'Think *risk or reward*.'],
        players: [
          { id: 'kt', team: 'k', label: 'GK', x: 50, y: 2 },
          { id: 'kb', team: 'k', label: 'GK', x: 50, y: 73 },
          { id: 'g1', team: 'a', x: 40, y: 13 }, { id: 'g2', team: 'a', x: 67, y: 19 },
          { id: 'g3', team: 'a', x: 32, y: 34 }, { id: 'g4', team: 'a', x: 55, y: 37 },
          { id: 'b1', team: 'd', x: 47, y: 24 }, { id: 'b2', team: 'd', x: 62, y: 31 },
          { id: 'b3', team: 'd', x: 38, y: 50 }, { id: 'b4', team: 'd', x: 62, y: 55 },
        ],
        ball: { owner: 'g1' },
        keyPhrase: { big: 'THINK RISK OR REWARD', small: 'Keep it simple near your goal. Take them on near theirs.' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*40 × 50* yards, *4 v 4* plus keepers.', 'Greens attack *down* the screen.', 'Dribble where *possible and appropriate*.'],
          },
          {
            title: 'RISK OR REWARD?',
            text: ['Near *your own goal*: lose it and they score.', 'Near *their goal*: beat one and you\'re *in*.'],
            timing: { move: 1.5 },
            halves: [RISK, REWARD],
          },
          {
            title: 'NEAR YOUR GOAL: KEEP IT SIMPLE',
            text: ['Pressed near your own goal?', '*High risk*: don\'t dribble.', 'A *simple pass* to a free team-mate.'],
            tags: { b1: 'PRESS', g1: 'KEEP IT SAFE' }, timing: { move: 3 },
            passes: [{ to: 'g2', start: 0.35, end: 0.7 }],
            moves: [
              { id: 'b1', to: [44, 19.5], end: 0.5, ease: 'out' },
              { id: 'g2', to: [71, 21], end: 0.35 },
              { id: 'g3', to: [31, 41], start: 0.4, end: 0.95, arrow: false },
              { id: 'g4', to: [52, 43], start: 0.4, end: 0.95, arrow: false },
              { id: 'b2', to: [66, 30], start: 0.6, end: 0.95, arrow: false },
            ],
            halves: [RISK, REWARD],
          },
          {
            title: 'SPACE AHEAD: GO',
            text: ['*Space* in front of you?', '*Run with it*: big touches, head up.'],
            tags: { g2: 'INTO SPACE' }, timing: { move: 3 },
            moves: [
              { id: 'g2', path: [[74, 30], [73, 44]], end: 0.95 },
              { id: 'b2', to: [65, 36], start: 0.3, end: 0.95, arrow: false },
              { id: 'b4', to: [66, 55], start: 0.3, end: 0.95, arrow: false },
              { id: 'g4', to: [50, 49], start: 0.3, end: 0.95, arrow: false },
              { id: 'g3', to: [28, 50], start: 0.3, end: 0.95, arrow: false },
              { id: 'b3', to: [36, 58], start: 0.3, end: 0.95, arrow: false },
              { id: 'b1', to: [46, 28], start: 0.3, end: 0.95, arrow: false },
            ],
            halves: [RISK, REWARD],
          },
          {
            title: 'NEAR THEIR GOAL: TAKE THEM ON',
            text: ['*High reward*: beat them and you\'re *in on goal*.', 'Show them outside, *cut inside*.'],
            tags: { g2: 'TAKE THEM ON' }, timing: { move: 3.2 },
            moves: [
              { id: 'g2', path: [[75, 50], [72, 54], [61, 60]], end: 0.95 },
              { id: 'b4', to: [71, 56], start: 0.1, end: 0.6, arrow: false },
              { id: 'b2', to: [68, 46], start: 0.3, end: 0.95, arrow: false },
            ],
            halves: [RISK, REWARD],
          },
          {
            title: 'NO SHOT? POSITIVE PASS',
            text: ['The shot is *blocked*: don\'t force it.', 'A *positive pass* to the free team-mate.'],
            tags: { b3: 'BLOCK', g4: 'FREE MAN' }, timing: { move: 3 },
            passes: [{ to: 'g4', start: 0.4, end: 0.75 }],
            moves: [
              { id: 'b3', to: [55, 65], end: 0.4, ease: 'out' },
              { id: 'kb', to: [53.5, 72], end: 0.4, arrow: false },
              { id: 'g4', to: [45, 57], end: 0.4 },
            ],
            halves: [RISK, REWARD],
          },
          {
            title: 'SCORE',
            text: ['*Shot on target*.', 'Dribble *where it\'s worth it*.'],
            tags: { g4: 'SCORE' }, timing: { move: 2 },
            ball: { to: [47, 77.5], start: 0.05, end: 0.5 },
          },
        ],
        summary: ['Near *your goal*: high risk, keep it simple.', 'Near *their goal*: high reward, take them on.', 'Shot blocked? A *positive pass*.'],
      }),
    ],
  });
})();
