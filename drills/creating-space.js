/*
 * SESSION: Creating Space (Attacking · technical) (DRAFT)
 * From the owner's own plan "Creating Space" (1st4sport L2 session sheet).
 *
 * Key factors: identify where the space is; initial movement away from the space (with or without the ball); then
 *   explode into the space (losing your opponent); angle and approach to receive (half turn); good touch (back foot),
 *   head up, assess options; positive outcome (forward pass, dribble, shot, cross).
 * 1. Tech (10 mins): 3 sets of 4. Grid 10 x 25 yds: 5 yd end zones, a 15 yd receiving zone. One player on each end line,
 *    two in the receiving zone. Receiver checks off a far cone, bursts back into the receiving zone, receives on the
 *    half turn, ball out of the body, head up, passes to the end player. End player and receiver swap; the end player
 *    is now the passer for the other receiver. Progressions: end players make space along their lines; the receiver
 *    does a trick and attacks a front cone before passing.
 * 2. Skill (10 mins): same set-up. Receiver v end player, taking turns to defend. Lose the defender anywhere in the zone
 *    before receiving. Owner's change: a small goal at each end (no keeper), 1 v 1 at each end, continuous, rotate roles.
 * Owner's changes: the double movement is the headline: check away just a couple of yards (separation), explode back;
 *   pass on angles, not straight lines (easier to open up). Game: play it as a real game, sharp passing and moving; the
 *   coach freezes it to show the better option (double movement, open up, back foot).
 * 3. Game (20 mins): 40 x 30 yds, 4 v 4 + keepers, a floater in a channel each side (3 touch, keeps the game flowing).
 *    Coach one team on creating space with or without the ball: width and depth, make the pitch big in possession.
 * Owner's extra points: movement, scanning, back-foot control.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', S = '#d4a017', OR = '#d9622b', K = '#2b2b2b';
  // ---------- the grid: 10 x 25 yds, upright ----------
  const XL = 36.6, XR = 63.4, Y0 = 4, Y1 = 17.4, Y2 = 57.6, Y3 = 71;
  const grid = {
    plain: true, goals: [],
    areas: [{ x: XL, y: Y1, w: XR - XL, h: Y2 - Y1, fill: 'rgba(22,53,31,0.07)' }],
    edges: [
      { a: [XL, Y0], b: [50, Y0] }, { a: [50, Y0], b: [XR, Y0] }, { a: [XL, Y3], b: [50, Y3] }, { a: [50, Y3], b: [XR, Y3] },
      { a: [XL, Y0], b: [XL, Y1] }, { a: [XL, Y1], b: [XL, Y2] }, { a: [XL, Y2], b: [XL, Y3] },
      { a: [XR, Y0], b: [XR, Y1] }, { a: [XR, Y1], b: [XR, Y2] }, { a: [XR, Y2], b: [XR, Y3] },
      { a: [XL, Y1], b: [XR, Y1], dash: true }, { a: [XL, Y2], b: [XR, Y2], dash: true },
    ],
    dims: [
      { a: [30, Y0], b: [30, Y1], label: '5' }, { a: [30, Y1], b: [30, Y2], label: '15 yds' }, { a: [30, Y2], b: [30, Y3], label: '5' },
      { a: [XL, 74], b: [XR, 74], label: '10 yds' },
    ],
    tagPlace: 'auto',
  };
  const zoneLabel = [{ x: XL, y: Y1, w: XR - XL, h: Y2 - Y1, color: OR, label: 'RECEIVING ZONE', labelAt: [50, 37.5], soft: true }];

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'creating-space',
    draft: true,
    title: 'Creating Space',
    subtitle: 'Double movement, angles, back-foot control',
    type: 'Technical',
    category: 'attacking',
    topics: ['Passing', 'Small-sided games'],
    squad: [4, 12],
    thumb: 'assets/thumbs/creating-space.jpg',
    summary: 'Double movement: check away, explode back into space and receive on the half turn; then lose a defender and pass into a small goal; then a real 4 v 4 game where the coach freezes it to show the better option. Angles, back-foot control, width and depth.',
    keyPhrase: 'Double movement',
    ages: { from: 10 },

    cards: [
      {
        title: 'Make the space',
        lead: '*Scan*: where is the space?',
        columns: [
          { heading: 'Double movement', items: ['Check *away* a couple of yards', 'Then *explode* back into the space', 'Lose your opponent: with or without the ball', 'Pass on *angles*, not straight lines'] },
          { heading: 'As a team', items: ['*Width*: get wide', '*Depth*: one high, one short', 'Make the pitch *big* when you have the ball'] },
        ],
        phrase: { big: 'DOUBLE MOVEMENT', small: 'Check away, explode back' },
      },
      {
        title: 'Receive it well',
        lead: 'Get your *angle* and *body shape* right.',
        columns: [
          { heading: 'Receive', items: ['*Half turn*: see the ball and the pitch', 'Let it come across you', 'Control on the *back foot*, *out of your body*'] },
          { heading: 'Then', items: ['*Head up*: what are my options?', 'Positive: *forward pass*, *dribble*, *shot*, *cross*'] },
        ],
        phrase: { big: 'HALF TURN, BACK FOOT', small: 'Head up, then go forward' },
      },
    ],

    keywords: [
      { word: 'Scan', meaning: 'A quick look over your shoulder to see where the space and the players are.' },
      { word: 'Check away', meaning: 'Moving away from where you want the ball first, to take your defender with you.' },
      { word: 'Explode', meaning: 'A sudden, fast burst into the space you just made.' },
      { word: 'Half turn', meaning: 'Standing side on, so you can see the ball and the pitch at the same time.' },
      { word: 'Back foot', meaning: 'The foot furthest from the ball. Control it there and you are already facing forward.' },
      { word: 'Width and depth', meaning: 'Players spread wide and players high and short: the pitch is as big as it can be.' },
      { word: 'Floater', meaning: 'A player who plays for the team with the ball. Here: 3 touches, keep the game flowing.' },
    ],

    training: {
      area: 'Drills: a 10 × 25 yard grid: 5 yard end zones and a 15 yard receiving zone (make three for 12 players). Game: 40 × 30 yards.',
      players: 'Drills: 4 per grid (12 for three grids). Game: 4 v 4 plus keepers and two floaters.',
      equipment: 'Cones, balls, bibs, two goals.',
      setup: [
        'Tech (10 minutes): one player on each end line, two in the receiving zone. Make three grids for 12 players.',
        'Double movement: the receiver checks away a couple of yards (enough to get separation), then explodes back into the space.',
        'Pass on angles, not straight lines: it makes opening up easier.',
        'Good body angle to receive: half turn, ball out of the body, head up, pass to the end player.',
        'End player and receiver swap. The end player is now the passer for the other receiver. Repeat.',
        'Progressions: end players move along their line to make space. The receiver does a trick and attacks a front cone before passing.',
        'Skill (10 minutes): same grid. 1 v 1 at each end: lose your defender anywhere in the zone before receiving, turn, and pass it into the small goal.',
        'Owner\'s change: a small goal at each end (no keepers), 1 v 1 at each end. One end plays, then the other: it keeps going. Rotate attacking and defending roles.',
        'Game (20 minutes): 40 × 30 yards, 4 v 4 plus keepers. A floater in a channel on each side: 3 touches, keeps the game flowing.',
        'Play it as a real game: sharp passing and moving. Focus on double movements, opening up the pitch and back-foot control.',
        'Width and depth: make the pitch as big as possible when you have the ball. Step in (freeze) when needed to show the better option.',
      ],
    },

    questions: [
      'Did you scan before the ball came?',
      'Which way did you move first? Why?',
      'When did you explode into the space?',
      'How did you stand to receive? Could you see the pitch?',
      'Which foot did you control it with?',
      'With the ball: did we make the pitch big?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, grid, {
        id: 'check-away',
        video: 'videos/creating-space-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'Double Movement',
        tagline: 'Check away a couple of yards, explode back, think angles.',
        intro: ['A *10 × 25 yard* grid, four players.', '*Double movement*: check away, *explode* back into space.', 'Pass on *angles*, not straight lines.'],
        keyPhrase: { big: 'DOUBLE MOVEMENT', small: 'Check away, explode back' },
        legend: { a: 'Players' },
        players: [
          { id: 'X1', team: 'a', label: '1', x: 42, y: Y0 }, { id: 'X2', team: 'a', label: '2', x: 48, y: 27 },
          { id: 'X3', team: 'a', label: '3', x: 44, y: 50 }, { id: 'X4', team: 'a', label: '4', x: 56, y: Y3 },
        ],
        ball: { owner: 'X3' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['5 yard end zones, a *15 yard receiving zone*.', 'One player on each end line, *two* in the middle.', 'Three grids for 12 players.'],
            halves: zoneLabel,
          },
          {
            title: 'CHECK AWAY',
            text: ['*Scan*: where is the space?', 'Check *away* from it: just a *couple of yards*.', 'Enough to get *separation*.'],
            tags: { X2: 'CHECK AWAY' }, timing: { move: 1.8 },
            moves: [{ id: 'X2', to: [44, 24], start: 0, end: 0.8 }],
          },
          {
            title: 'EXPLODE BACK INTO SPACE',
            text: ['*Explode* back into the space.', 'Pass on an *angle*, not a straight line.', '*Half turn*: see the ball and the pitch.'],
            tags: { X2: 'EXPLODE' }, timing: { move: 2.6 },
            moves: [{ id: 'X2', to: [56, 32], start: 0, end: 0.5, ease: 'out' }],
            passes: [{ to: 'X2', start: 0.3, end: 0.78 }],
          },
          {
            title: 'HEAD UP, BACK FOOT, PASS',
            text: ['Let it come *across* you: *back foot*.', 'Already *open*: *head up*.', 'Pass on an *angle* to the end player.'],
            tags: { X2: 'BACK FOOT' }, timing: { move: 2.8 },
            moves: [{ id: 'X2', to: [57, 28], start: 0, end: 0.3 }],
            passes: [{ to: 'X1', start: 0.42, end: 0.8 }],
          },
          {
            title: 'SWAP',
            text: ['End player and receiver *swap*.', 'He brings the ball in...', '...and passes for the *other* receiver.'],
            tags: { X1: 'IN', X2: 'OUT' }, timing: { move: 2.8 },
            moves: [
              { id: 'X1', to: [43, 27], start: 0, end: 0.8 },
              { id: 'X2', to: [56, Y0], start: 0.1, end: 0.9 },
            ],
          },
          {
            title: 'CHECK AWAY',
            text: ['Other receiver: *scan*...', '...check *away*, a couple of yards.'],
            tags: { X3: 'CHECK AWAY' }, timing: { move: 1.8 },
            moves: [{ id: 'X3', to: [41, 54], start: 0, end: 0.8 }],
          },
          {
            title: 'EXPLODE, ON AN ANGLE',
            text: ['*Explode* back into space.', 'Ball comes on an *angle*: easy to *open up*.'],
            tags: { X3: 'EXPLODE' }, timing: { move: 2.6 },
            moves: [{ id: 'X3', to: [55, 44], start: 0, end: 0.5, ease: 'out' }],
            passes: [{ to: 'X3', start: 0.3, end: 0.78 }],
          },
          {
            title: 'BACK FOOT, PASS ON',
            text: ['*Back foot*, *head up*.', 'End player *moves along his line*: a new angle.', 'Pass, swap, repeat.'],
            tags: { X3: 'BACK FOOT', X4: 'MOVE' }, timing: { move: 2.8 },
            moves: [
              { id: 'X3', to: [56, 48], start: 0, end: 0.3 },
              { id: 'X4', to: [42, Y3], start: 0, end: 0.4 },
            ],
            passes: [{ to: 'X4', start: 0.45, end: 0.82 }],
          },
        ],
        summary: ['*Double movement*: check away a couple of yards...', '...then *explode* back into space.', '*Angles*, not straight lines: easier to open up.', '*Back foot*, *head up*, pass.'],
      }),

      // ---------------- 2: skill (1 v 1 at each end, small goals) ----------------
      Object.assign({}, grid, {
        id: 'lose-your-defender',
        video: 'videos/creating-space-2.mp4',
        kicker: 'Clip 2 · Skill',
        title: 'Lose Your Defender',
        tagline: '1 v 1 at each end, a small goal each end. Keep it going.',
        intro: ['Same grid, a *small goal* at each end.', '*1 v 1* at one end, then the other.', 'Lose him, turn, *pass it in*. Rotate roles.'],
        keyPhrase: { big: 'LOSE YOUR DEFENDER', small: 'Check away, explode, turn' },
        legend: { a: 'Attackers', d: 'Defenders' },
        miniGoals: [{ at: [50, 2.5], angle: 0, scale: 0.9 }, { at: [50, 72.5], angle: 180, scale: 0.9 }],
        players: [
          { id: 'X1', team: 'd', label: '1', x: 50, y: 22 }, { id: 'X2', team: 'a', label: '2', x: 50, y: 33 },
          { id: 'X3', team: 'a', label: '3', x: 45, y: 45, ball: true }, { id: 'X4', team: 'd', label: '4', x: 53, y: 58 },
        ],
        ball: { owner: 'X3' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A *small goal* at each end, no keepers.', '*1 v 1* at each end: one attacks, one defends.', 'One end, then the other: it *keeps going*.'],
            tags: { X1: 'DEFENDER', X2: 'ATTACKER', X4: 'DEFENDER' },
          },
          {
            title: 'TOP END: CHECK AWAY, EXPLODE',
            text: ['Check *towards* the passer: he follows.', 'Then *explode* into the space.', 'Lose him *anywhere* in the zone.'],
            tags: { X2: 'DOUBLE MOVE' }, timing: { move: 3 },
            moves: [
              { id: 'X2', path: [[51, 37], [40, 30]], start: 0, end: 0.75 },
              { id: 'X1', path: [[51, 30], [47, 27]], start: 0.1, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'X2', start: 0.5, end: 0.85 }],
          },
          {
            title: 'HALF TURN, BACK FOOT',
            text: ['Receive on the *half turn*.', '*Back foot* touch, *away* from him.', '*Head up*: where is the goal?'],
            tags: { X2: 'BACK FOOT' }, timing: { move: 2.4 },
            moves: [
              { id: 'X2', to: [39, 23], start: 0, end: 0.4 },
              { id: 'X1', to: [45, 22], start: 0.2, end: 0.8, arrow: false },
            ],
          },
          {
            title: 'PASS IT IN',
            text: ['A gap: *pass it in*.', 'Side foot, *on target*.'],
            tags: { X2: 'SCORE' }, timing: { move: 2 },
            shot: [50, 3.2],
            ball: { to: [50, 3.2], start: 0.05, end: 0.4 },
            moves: [{ id: 'X1', to: [46, 26], start: 0.1, end: 0.6, arrow: false }],
          },
          {
            title: 'NOW THE OTHER END',
            text: ['Straight away: *1 v 1* at the *other end*.', 'Ball in from the top.', 'Check *away*, then *explode*.'],
            tags: { X3: 'DOUBLE MOVE' }, timing: { move: 3.2 },
            ball: { give: 'X1' },
            moves: [
              { id: 'X3', path: [[47, 43], [58, 50]], start: 0, end: 0.75 },
              { id: 'X4', path: [[50, 51], [53, 53]], start: 0.1, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'X3', start: 0.45, end: 0.85 }],
          },
          {
            title: 'TURN ON THE BACK FOOT',
            text: ['*Back foot*: turn *away* from him.', '*Head up*.'],
            tags: { X3: 'BACK FOOT' }, timing: { move: 2.4 },
            moves: [
              { id: 'X3', to: [61, 58], start: 0, end: 0.4 },
              { id: 'X4', to: [55, 52], start: 0.2, end: 0.9, arrow: false },
            ],
          },
          {
            title: 'PASS IT IN',
            text: ['He\'s behind you: *pass it in*.'],
            tags: { X3: 'SCORE' }, timing: { move: 2 },
            shot: [50, 71.8],
            ball: { to: [50, 71.8], start: 0.05, end: 0.4 },
          },
          {
            title: 'ROTATE ROLES',
            text: ['*Swap* roles at each end.', 'Defenders now attack.', 'Keep it going: one end, then the other.'],
            tags: { X1: 'ATTACKER', X4: 'ATTACKER' }, timing: { move: 2.8 },
            team: { X1: 'a', X2: 'd', X3: 'd', X4: 'a' },
            moves: [
              { id: 'X1', to: [50, 31], start: 0, end: 0.8 },
              { id: 'X2', to: [50, 21], start: 0, end: 0.8 },
              { id: 'X4', to: [48, 48], start: 0, end: 0.8 },
              { id: 'X3', to: [52, 58], start: 0, end: 0.8 },
            ],
          },
        ],
        summary: ['*1 v 1* at each end, a *small goal* each end.', '*Check away*, then *explode*: lose your defender.', '*Half turn*, *back foot*, pass it in.', '*Rotate* roles and keep it going.'],
      }),

      // ---------------- 3: game ----------------
      {
        id: 'width-and-depth',
        video: 'videos/creating-space-3.mp4',
        kicker: 'Clip 3 · Game',
        title: 'Make the Space',
        tagline: 'A real game. Coach steps in to show the better option.',
        intro: ['*4 v 4* plus keepers, a *floater* each side.', 'Play it as a *game*: sharp passing and moving.', 'Coach *steps in* to show a better option.'],
        keyPhrase: { big: 'MAKE THE SPACE', small: 'Double movement, open up, back foot' },
        plain: true,
        goals: [[37.5, 'left'], [37.5, 'right']],
        goalScale: 1.4,
        areas: [{ x: 0, y: 0.5, w: 100, h: 8, fill: 'rgba(212,160,23,0.12)' }, { x: 0, y: 66.5, w: 100, h: 8, fill: 'rgba(212,160,23,0.12)' }],
        dims: [{ a: [8, 73], b: [92, 73], label: '40 yds' }],
        tagPlace: 'auto',
        facing: { a: 'right', d: 'left', f: 1, g: -1, k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: S }],
        players: [
          { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 }, { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
          { id: 'G1', team: 'a', x: 24, y: 22 }, { id: 'G2', team: 'a', x: 24, y: 54 },
          { id: 'G3', team: 'a', x: 56, y: 36 }, { id: 'G4', team: 'a', x: 36, y: 40 },
          { id: 'B1', team: 'd', x: 44, y: 26 }, { id: 'B2', team: 'd', x: 44, y: 50 },
          { id: 'B3', team: 'd', x: 74, y: 42 }, { id: 'B4', team: 'd', x: 60, y: 56 },
          { id: 'F1', team: 'f', label: 'F', x: 40, y: 4.5 }, { id: 'F2', team: 'g', label: 'F', x: 60, y: 70.5 },
        ],
        ball: { owner: 'kL' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* plus keepers, 40 × 30 yards.', 'A *floater* in each side channel: *3 touches*.', 'Play it as a *game*. Coach steps in when needed.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
          },
          {
            title: 'OPEN UP THE PITCH',
            text: ['We have the ball: make the pitch *big*.', '*Width*: two go wide. *Depth*: one high, one short.'],
            tags: { G1: 'GO WIDE', G2: 'GO WIDE', G3: 'GO HIGH', G4: 'SHOW' }, timing: { move: 3 },
            moves: [
              { id: 'G1', to: [30, 14], start: 0, end: 0.8 },
              { id: 'G2', to: [27, 60], start: 0, end: 0.8 },
              { id: 'G3', to: [72, 38], start: 0, end: 0.8 },
              { id: 'G4', to: [20, 38], start: 0, end: 0.7 },
              { id: 'B3', to: [80, 40], start: 0, end: 0.8, arrow: false },
              { id: 'B1', to: [38, 25], start: 0.3, end: 1, arrow: false },
              { id: 'B2', to: [38, 50], start: 0.3, end: 1, arrow: false },
              { id: 'B4', to: [56, 58], start: 0.3, end: 1, arrow: false },
            ],
          },
          {
            title: 'SHARP: PASS AND MOVE',
            text: ['*Sharp* passing, always *moving*.', 'Pass on *angles*: open up the next player.'],
            tags: { G4: 'MOVE' }, timing: { move: 3.4 },
            moves: [
              { id: 'G4', to: [32, 44], start: 0.2, end: 0.45 },
              { id: 'B2', to: [33, 54], start: 0.2, end: 0.6, arrow: false },
              { id: 'B1', to: [33, 23], start: 0.55, end: 1, arrow: false },
            ],
            passes: [{ to: 'G2', start: 0.02, end: 0.25 }, { to: 'G4', start: 0.33, end: 0.52 }, { to: 'G1', start: 0.62, end: 0.85 }],
          },
          {
            title: 'STRAIGHT TO THE BALL',
            text: ['Striker comes *straight* to the ball.', 'Defender follows him *tight*.', 'Front foot, facing his own goal: only option is *back*.'],
            tags: { G3: 'SHOW' }, timing: { move: 3.4 },
            moves: [
              { id: 'G3', to: [60, 34], start: 0, end: 0.4 },
              { id: 'B3', to: [65, 35], start: 0.05, end: 0.45, arrow: false },
            ],
            passes: [{ to: 'G3', start: 0.25, end: 0.55 }, { to: 'G1', start: 0.72, end: 0.95 }],
          },
          {
            title: 'FREEZE! COACH STEPS IN',
            text: ['*Freeze!* Could he have done better?', 'Look at the *space* behind the defender.', 'A *double movement* would have found it.'],
            tags: { G3: 'FREEZE' },
            zones: [{ at: [68, 26], r: 7, label: 'Space' }],
          },
          {
            title: 'REWIND',
            text: ['*Rewind*: back to where he was.', 'Try it again.'],
            timing: { move: 2 },
            moves: [
              { id: 'G3', to: [72, 40], start: 0, end: 0.8, arrow: false },
              { id: 'B3', to: [78, 42], start: 0, end: 0.8, arrow: false },
            ],
          },
          {
            title: 'DOUBLE MOVEMENT',
            text: ['Check *away* a couple of yards: he follows.', 'Then *explode* into the space.', 'Ball comes on an *angle*.'],
            tags: { G3: 'DOUBLE MOVE' }, timing: { move: 3.2 },
            moves: [
              { id: 'G3', path: [[76, 45], [66, 30]], start: 0, end: 0.7 },
              { id: 'B3', path: [[80, 45], [76, 42]], start: 0.15, end: 1, arrow: false },
            ],
            passes: [{ to: 'G3', start: 0.45, end: 0.82 }],
          },
          {
            title: 'BACK FOOT: BETTER OUTCOME',
            text: ['*Back foot*: now he\'s *facing forward*.', 'Better outcome: *turn and shoot*.', 'Then *play on*.'],
            tags: { G3: 'BACK FOOT' }, timing: { move: 2.6 },
            shot: [102, 40],
            ball: { to: [102, 40], start: 0.4, end: 0.62 },
            moves: [
              { id: 'G3', to: [71, 33], start: 0, end: 0.35 },
              { id: 'kR', to: [97.5, 34], start: 0.4, end: 0.62, arrow: false },
            ],
          },
        ],
        summary: ['Play it as a *game*: sharp passing and moving.', '*Double movements* to make space.', '*Open up* the pitch, *back foot* control.', 'Coach *freezes* it to show the better option.'],
      },
    ],
  });
})();
