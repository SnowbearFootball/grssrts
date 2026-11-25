/*
 * SESSION: Close Range Finishing (Attacking · technical) (DRAFT)
 * From the owner's own plan "Close Range Finishing" (1st4sport L2 session sheet).
 *
 * Key factors: positive attitude; movement to create space; decision making (first time etc); where to control the ball;
 *   technique and type of finish (including power); head up to see the keeper's position; where to aim, accuracy, follow up.
 * 1. Tech (10 mins): 30 x 20 yds, a goal and keeper at each end, a neutral zone in the middle. Three numbered servers for
 *    each half. The coach calls a number; the attacker receives from that server and shoots. Receive in the neutral zone:
 *    turn and shoot, or let the ball run and shoot.
 * 2. Skill (10 mins): same set-up, 2 v 1 in each half (two attackers, one defender, keeper), two servers per half.
 *    Attackers look at the defender and use movement and communication to create space.
 * 3. Game (20 mins): 30 x 20 yds, 4 v 4 + keepers, two floaters who move up and down the sides. Floaters mix up their
 *    serves (angle and speed).
 * Owner's extra points: movements to create space; first time or two touch; placement or power; the set-up pass:
 *   quick to take a defender out of the game, or a soft cushion so a team-mate can hit it first time.
 * Pitch laid sideways: x 0..100 = 30 yds, y 0..75 = about 20 yds. Goals left and right.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', S = '#d4a017', OR = '#d9622b';
  const neutral = [{ x: 45, y: 2, w: 10, h: 71, fill: 'rgba(22,53,31,0.10)' }];
  const neutralLabel = [{ x: 45, y: 2, w: 10, h: 71, color: OR, label: 'NEUTRAL ZONE', labelAt: [50, 37.5], soft: true }];
  const keepers = [
    { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 },
    { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
  ];
  // servers: 's' on the top line (face down), 't' on the bottom line (face up), 'u' on the right end (face left)
  const common = {
    plain: true,
    goals: [[37.5, 'left'], [37.5, 'right']],
    goalScale: 1.4,
    areas: neutral,
    tagPlace: 'auto',
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'close-range-finishing',
    draft: true,
    title: 'Close Range Finishing',
    subtitle: 'Make space, pick the finish, weight the set-up',
    type: 'Technical',
    category: 'attacking',
    topics: ['Shooting', 'Small-sided games'],
    squad: [8, 12],
    thumb: 'assets/thumbs/close-range-finishing.jpg',
    summary: 'Call a number and finish from that server, then 2 v 1 in each half, then a 4 v 4 game with floaters. Move to make space, first time or two touch, placement or power, and the right weight on the set-up pass.',
    keyPhrase: 'Make space, then finish',
    ages: { from: 12 },

    cards: [
      {
        title: 'The finish',
        lead: '*Positive attitude*: get it on target.',
        columns: [
          { heading: 'Before it arrives', items: ['*Move* to create space', '*Head up*: where is the keeper?', 'Decide: *first time* or *two touch*?'] },
          { heading: 'The strike', items: ['Two touch: control it *out of your feet*, towards goal', '*Placement* or *power*?', 'Hit the *target*, then *follow up*'] },
        ],
        phrase: { big: 'MAKE SPACE, THEN FINISH', small: 'Head up: where is the keeper?' },
      },
      {
        title: 'The set-up pass',
        lead: 'Give your team-mate the *right weight*.',
        columns: [
          { heading: 'Quick', items: ['*Firm* and fast', 'Takes a defender *out of the game*', 'Into feet or into a run'] },
          { heading: 'Soft', items: ['A *soft cushion*', 'Sits up nicely to hit *first time*', 'Into your team-mate\'s *path*'] },
        ],
        phrase: { big: 'QUICK OR SOFT?', small: 'Weight it for your team-mate' },
      },
    ],

    keywords: [
      { word: 'Close range', meaning: 'Finishing from near the goal, inside the box.' },
      { word: 'Double movement', meaning: 'Shape to go one way, then go the other, to lose your defender.' },
      { word: 'First time', meaning: 'Shooting without controlling the ball first.' },
      { word: 'Two touch', meaning: 'One touch to set it up, one to shoot.' },
      { word: 'Placement', meaning: 'Picking a spot, often low into the corner, rather than hitting it hard.' },
      { word: 'Cushion', meaning: 'A soft pass that slows the ball down so a team-mate can strike it first time.' },
      { word: 'Follow up', meaning: 'Following your shot in, ready for a rebound.' },
      { word: 'Neutral zone', meaning: 'The strip in the middle. Receive here and turn, or let it run and shoot.' },
    ],

    training: {
      area: '30 × 20 yards, a goal at each end, a neutral zone across the middle.',
      players: 'Tech: two keepers, three servers for each half, an attacker (or a queue) in each half. Skill: 2 v 1 in each half. Game: 4 v 4 plus keepers and two floaters (12).',
      equipment: 'Two goals, cones, bibs, plenty of balls with every server.',
      setup: [
        'Tech (10 minutes): three numbered servers for each half. The coach calls a number: the attacker receives from that server and shoots.',
        'Move to create space before the ball comes in. Decide: first time or two touch? Placement or power? Follow up.',
        'Receive in the neutral zone: turn and shoot, or let the ball run across you and shoot.',
        'Skill (10 minutes): same set-up, but 2 v 1 in each half. Look at where the defender is, and use movement and talking to create space.',
        'The set-up pass: quick and firm to take the defender out of the game, or a soft cushion so your team-mate can hit it first time.',
        'Game (20 minutes): 4 v 4 plus keepers on 30 × 20 yards. Two floaters move up and down the sides and play for the team with the ball.',
        'Floaters: mix up your serves: different angles, different speeds.',
        'Rotate the servers, attackers and floaters so everyone gets to finish.',
      ],
    },

    questions: [
      'How did you make space before the ball came in?',
      'When did you go first time? When did you take a touch?',
      'Placement or power: which did you pick? Why?',
      'Where was the keeper when you shot?',
      'Set-up pass: quick or soft? Did it help your team-mate?',
      'Did you follow your shot in?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, common, {
        id: 'call-a-number',
        video: 'videos/close-range-finishing-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'Call a Number',
        tagline: 'Coach calls a server. Move, receive, finish.',
        intro: ['A goal and keeper at each end, *three servers* for each half.', 'Coach calls a *number*: that server plays it in.', '*Move* to make space, then *finish*.'],
        keyPhrase: { big: 'MAKE SPACE, THEN FINISH', small: 'First time or two touch?' },
        facing: { a: 'left', b: 'right', s: 1, t: -1, u: 'left', k: 'right', k2: 'left' },
        teamColors: { b: G, s: S, t: S, u: S, k2: '#2b2b2b' },
        legendTeams: [{ label: 'Attackers', color: G }, { label: 'Servers', color: S }],
        players: keepers.concat([
          { id: 'aL', team: 'a', x: 36, y: 44 }, { id: 'aR', team: 'b', x: 76, y: 40 },
          { id: 'L1', team: 's', label: '1', x: 15, y: 3, ball: true }, { id: 'L2', team: 't', label: '2', x: 44, y: 72, ball: true },
          { id: 'L3', team: 't', label: '3', x: 15, y: 72, ball: true },
          { id: 'R1', team: 'u', label: '1', x: 97, y: 13, ball: true }, { id: 'R2', team: 's', label: '2', x: 57, y: 3, ball: true },
          { id: 'R3', team: 't', label: '3', x: 85, y: 72, ball: true },
        ]),
        ball: { owner: 'L1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['30 × 20 yards, a *neutral zone* in the middle.', '*Three servers* for each half: 1, 2 and 3.', 'Coach calls a *number*: that server plays it in.'],
            halves: neutralLabel,
          },
          {
            title: 'CALL "ONE": MAKE SPACE',
            text: ['Coach calls *"one!"*', '*Double movement*: shape one way, go the other.', 'Server *weights* it into your run.'],
            tags: { aL: 'DOUBLE MOVE' }, timing: { move: 3 },
            moves: [{ id: 'aL', path: [[40, 50], [27, 33]], start: 0, end: 0.7 }],
            passes: [{ to: 'aL', start: 0.45, end: 0.8 }],
          },
          {
            title: 'FIRST TIME: PLACE IT',
            text: ['*Head up*: where is the keeper?', 'First time, *placed* low into the corner.', 'Then *follow up* for a rebound.'],
            tags: { aL: 'PLACE IT' }, timing: { move: 2.4 },
            shot: [-2, 42],
            ball: { to: [-2, 42], start: 0.05, end: 0.35 },
            moves: [
              { id: 'kL', to: [2.5, 34.5], start: 0.05, end: 0.35, arrow: false },
              { id: 'aL', to: [14, 40], start: 0.35, end: 0.9 },
            ],
          },
          {
            title: 'OTHER END: CALL "ONE"',
            text: ['Other end: coach calls *"one!"*', '*Move away* from goal to find space.', 'Where will you *control* it?'],
            tags: { aR: 'MOVE AWAY' }, timing: { move: 2.8 },
            ball: { give: 'R1' },
            moves: [{ id: 'aR', to: [66, 30], start: 0, end: 0.5 }],
            passes: [{ to: 'aR', start: 0.4, end: 0.85 }],
          },
          {
            title: 'TWO TOUCH: POWER',
            text: ['Touch it *out of your feet*, towards goal.', 'Second touch: *power*.', 'Keep it *on target*.'],
            tags: { aR: 'POWER' }, timing: { move: 2.4 },
            shot: [102, 33],
            ball: { to: [102, 33], start: 0.4, end: 0.6 },
            moves: [
              { id: 'aR', to: [70, 33], start: 0, end: 0.35 },
              { id: 'kR', to: [97.5, 40], start: 0.4, end: 0.62, arrow: false },
            ],
          },
          {
            title: 'CALL "TWO": NEUTRAL ZONE',
            text: ['Coach calls *"two!"*', 'Receive in the *neutral zone*?', '*Turn and shoot*, or *let it run* and shoot.'],
            tags: { aL: 'MOVE' }, timing: { move: 3 },
            ball: { give: 'L2' },
            moves: [
              { id: 'aL', to: [48, 40], start: 0, end: 0.55 },
              { id: 'kL', to: [2.5, 37.5], start: 0.1, end: 0.5, arrow: false },
            ],
            passes: [{ to: 'aL', start: 0.5, end: 0.85 }],
          },
          {
            title: 'LET IT RUN, THEN SHOOT',
            text: ['*Open your body*: let it run across you.', 'No turn needed: *shoot*.', '*Head up* first: power or placement?'],
            tags: { aL: 'LET IT RUN' }, timing: { move: 2.6 },
            shot: [-2, 33],
            ball: { to: [-2, 33], start: 0.42, end: 0.68 },
            moves: [
              { id: 'aL', to: [41, 39], start: 0, end: 0.38 },
              { id: 'kL', to: [2.5, 40], start: 0.42, end: 0.68, arrow: false },
            ],
          },
        ],
        summary: ['*Move* to make space before it arrives.', '*Head up*: where is the keeper?', '*First time* or *two touch*? *Placement* or *power*?', 'Hit the target, then *follow up*.'],
      }),

      // ---------------- 2: skill (2 v 1) ----------------
      Object.assign({}, common, {
        id: 'two-v-one',
        video: 'videos/close-range-finishing-2.mp4',
        kicker: 'Clip 2 · Skill: 2 v 1',
        title: '2 v 1: The Set-Up',
        tagline: 'Move and talk. Quick pass or soft cushion?',
        intro: ['*2 v 1* in each half, plus a keeper.', 'Coach calls a number, same as before.', 'Set-up pass: *quick* past the defender, or a *soft cushion*?'],
        keyPhrase: { big: 'QUICK OR SOFT?', small: 'Weight it for your team-mate' },
        facing: { a: 'left', b: 'right', d: 'right', e: 'left', s: 1, t: -1, k: 'right', k2: 'left' },
        teamColors: { b: G, e: B, s: S, t: S, k2: '#2b2b2b' },
        legendTeams: [{ label: 'Attackers', color: G }, { label: 'Defenders', color: B }, { label: 'Servers', color: S }],
        players: keepers.concat([
          { id: 'dL', team: 'd', x: 15, y: 40 }, { id: 'dR', team: 'e', x: 85, y: 37 },
          { id: 'A1', team: 'a', x: 36, y: 26 }, { id: 'A2', team: 'a', x: 36, y: 50 },
          { id: 'A3', team: 'b', x: 64, y: 26 }, { id: 'A4', team: 'b', x: 64, y: 50 },
          { id: 'L1', team: 's', label: '1', x: 18, y: 3, ball: true }, { id: 'L2', team: 't', label: '2', x: 18, y: 72, ball: true },
          { id: 'R2', team: 's', label: '2', x: 66, y: 3, ball: true }, { id: 'R1', team: 't', label: '1', x: 66, y: 72, ball: true },
        ]),
        ball: { owner: 'L1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*2 v 1* in each half, plus a keeper.', 'Coach calls a number, same as before.', 'Look at the *defender*: *move* and *talk*.'],
            halves: neutralLabel,
          },
          {
            title: 'CALL "ONE": MOVE AND TALK',
            text: ['Coach calls *"one!"*', 'One attacker *moves* to get it.', 'The other *talks*: "square!", "I\'m free!"'],
            tags: { A1: 'MOVE', A2: 'TALK' }, timing: { move: 3 },
            moves: [
              { id: 'A1', to: [30, 18], start: 0, end: 0.45 },
              { id: 'A2', to: [31, 52], start: 0.2, end: 0.7 },
              { id: 'dL', to: [20, 32], start: 0.4, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'A1', start: 0.4, end: 0.75 }],
          },
          {
            title: 'HE COMMITS: QUICK PASS',
            text: ['Defender *commits* to you.', '*Quick, firm pass* across him...', '...takes him *out of the game*.'],
            tags: { A1: 'QUICK PASS', A2: 'FIRST TIME' }, timing: { move: 2.6 },
            moves: [
              { id: 'dL', to: [23, 21], start: 0, end: 0.45, ease: 'out' },
              { id: 'A2', to: [24, 48], start: 0.1, end: 0.55 },
            ],
            passes: [{ to: 'A2', start: 0.3, end: 0.52 }],
          },
          {
            title: 'FIRST TIME FINISH',
            text: ['Team-mate hits it *first time*.', 'Keeper covers the near post?', '*Place it* far post.'],
            tags: { A2: 'PLACE IT' }, timing: { move: 2.2 },
            shot: [-2, 33],
            ball: { to: [-2, 33], start: 0.05, end: 0.35 },
            moves: [{ id: 'kL', to: [2.5, 41], start: 0.05, end: 0.35, arrow: false }],
          },
          {
            title: 'OTHER END: CALL "ONE"',
            text: ['Other end: coach calls *"one!"*', 'Attacker *moves* to get it.', 'Team-mate: *time your run*.'],
            tags: { A4: 'MOVE', A3: 'TALK' }, timing: { move: 2.8 },
            ball: { give: 'R1' },
            moves: [
              { id: 'A4', to: [70, 58], start: 0, end: 0.45 },
              { id: 'dR', to: [80, 44], start: 0.4, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'A4', start: 0.4, end: 0.75 }],
          },
          {
            title: 'SOFT CUSHION',
            text: ['Defender comes to you.', '*Soft cushion* into your team-mate\'s *path*...', '...so they can hit it *first time*.'],
            tags: { A4: 'CUSHION', A3: 'FIRST TIME' }, timing: { move: 3 },
            moves: [
              { id: 'dR', to: [77, 52], start: 0, end: 0.45, ease: 'out' },
              { id: 'A3', to: [71, 40], start: 0.1, end: 0.85 },
            ],
            passes: [{ to: 'A3', start: 0.4, end: 0.85 }],
          },
          {
            title: 'POWER, ON TARGET',
            text: ['First time with *power*.', 'Make the keeper *work*: on target.', 'Team-mate *follows up* for a rebound.'],
            tags: { A3: 'POWER', A4: 'FOLLOW UP' }, timing: { move: 2.6 },
            shot: [102, 34],
            ball: { to: [102, 34], start: 0.05, end: 0.28 },
            moves: [
              { id: 'kR', to: [97.5, 40], start: 0.05, end: 0.3, arrow: false },
              { id: 'A4', to: [87, 46], start: 0.3, end: 0.9 },
            ],
          },
        ],
        summary: ['*Look* at the defender: *move* and *talk*.', 'Set-up pass: *quick* to take him out of the game...', '...or a *soft cushion* to hit first time.', '*On target*, then *follow up*.'],
      }),

      // ---------------- 3: game ----------------
      Object.assign({}, common, {
        id: 'floaters-game',
        video: 'videos/close-range-finishing-3.mp4',
        kicker: 'Clip 3 · Game',
        title: '4 v 4 + Floaters',
        tagline: 'Floaters mix up the serves. Make space and finish.',
        intro: ['*4 v 4* plus keepers.', '*2 floaters* move up and down the sides.', 'They play for the team with the ball: *mix up the serves*.'],
        keyPhrase: { big: 'MIX IT UP', small: 'Angle and speed of the serve' },
        areas: [],
        facing: { a: 'right', d: 'left', f: 1, g: -1, k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: '#2b2b2b' },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: S }],
        players: keepers.concat([
          { id: 'G1', team: 'a', x: 26, y: 22 }, { id: 'G2', team: 'a', x: 32, y: 52 },
          { id: 'G3', team: 'a', x: 52, y: 32 }, { id: 'G4', team: 'a', x: 60, y: 54 },
          { id: 'B1', team: 'd', x: 42, y: 30 }, { id: 'B2', team: 'd', x: 44, y: 46 },
          { id: 'B3', team: 'd', x: 68, y: 28 }, { id: 'B4', team: 'd', x: 74, y: 46 },
          { id: 'F1', team: 'f', label: 'F', x: 50, y: 3 }, { id: 'F2', team: 'g', label: 'F', x: 50, y: 72 },
        ]),
        ball: { owner: 'G2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* plus keepers, 30 × 20 yards.', '*2 floaters* move up and down the sides.', 'They play for the team *with the ball*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
          },
          {
            title: 'FIND THE FLOATER',
            text: ['Play it out to a *floater*.', 'Striker: *double movement* to lose your defender.'],
            tags: { F2: 'FLOATER', G4: 'DOUBLE MOVE' }, timing: { move: 3.2 },
            moves: [
              { id: 'F2', to: [66, 72], start: 0, end: 0.5 },
              { id: 'G4', path: [[66, 50], [80, 58]], start: 0.35, end: 1 },
              { id: 'B4', to: [76, 51], start: 0.6, end: 1, arrow: false },
            ],
            passes: [{ to: 'F2', start: 0.45, end: 0.8 }],
          },
          {
            title: 'QUICK SERVE',
            text: ['Floater picks the *speed*.', '*Quick and firm*: beats the defender.'],
            tags: { F2: 'QUICK PASS' }, timing: { move: 2.2 },
            moves: [{ id: 'B4', to: [72, 50], start: 0.3, end: 0.9, arrow: false }],
            passes: [{ to: 'G4', start: 0.1, end: 0.4 }],
          },
          {
            title: 'FIRST TIME, PLACED',
            text: ['*Head up*: keeper covers the near post.', 'First time, *placed* far post.'],
            tags: { G4: 'FIRST TIME' }, timing: { move: 2.2 },
            shot: [102, 33],
            ball: { to: [102, 33], start: 0.05, end: 0.32 },
            moves: [{ id: 'kR', to: [97.5, 41], start: 0.05, end: 0.32, arrow: false }],
          },
          {
            title: 'BLUES: OUT TO THE FLOATER',
            text: ['Blues restart: keeper to a team-mate...', '...out to the *other floater*.', 'Striker: *move* to make space.'],
            tags: { F1: 'FLOATER', B1: 'DOUBLE MOVE' }, timing: { move: 3.4 },
            ball: { give: 'kR' },
            moves: [
              { id: 'F1', to: [40, 3], start: 0.2, end: 0.6 },
              { id: 'B1', path: [[46, 36], [26, 36]], start: 0.4, end: 1 },
              { id: 'G1', to: [32, 25], start: 0.6, end: 1, arrow: false },
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.2, arrow: false },
            ],
            passes: [{ to: 'B3', start: 0.05, end: 0.35 }, { to: 'F1', start: 0.5, end: 0.8 }],
          },
          {
            title: 'NOW A SOFT SERVE',
            text: ['A *soft*, floated serve: a *different angle*.', 'Where will you *control* it?'],
            tags: { F1: 'FLOATED' }, timing: { move: 2.8 },
            passes: [{ to: 'B1', start: 0.1, end: 0.7, loft: 'float' }],
          },
          {
            title: 'TWO TOUCH: POWER',
            text: ['Touch it *out of your feet*, towards goal.', 'Then *power*, on target.', 'Team-mate *follows up*.'],
            tags: { B1: 'POWER', B2: 'FOLLOW UP' }, timing: { move: 2.8 },
            shot: [-2, 41],
            ball: { to: [-2, 41], start: 0.38, end: 0.58 },
            moves: [
              { id: 'B1', to: [21, 37], start: 0, end: 0.33 },
              { id: 'kL', to: [2.5, 34], start: 0.38, end: 0.6, arrow: false },
              { id: 'B2', to: [16, 47], start: 0.35, end: 0.95 },
            ],
          },
        ],
        summary: ['Floaters *mix up* the serve: angle and speed.', '*Move* to make space before it arrives.', '*First time* or *two touch*? *Placement* or *power*?', '*Follow up* every shot.'],
      }),
    ],
  });
})();
