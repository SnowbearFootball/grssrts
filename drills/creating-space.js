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
 *    before receiving. Ball to either front cone = 1 point, back cone = 3 points.
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
    subtitle: 'Move away, explode into space, back-foot control',
    type: 'Technical',
    category: 'attacking',
    topics: ['Passing', 'Small-sided games'],
    squad: [4, 12],
    thumb: 'assets/thumbs/creating-space.jpg',
    summary: 'Check away, explode into space and receive on the half turn in a small grid; then do it against a defender for points; then a 4 v 4 game with floaters. Scan, move, back-foot control, and make the pitch big when you have the ball.',
    keyPhrase: 'Move away, then explode',
    ages: { from: 10 },

    cards: [
      {
        title: 'Make the space',
        lead: '*Scan*: where is the space?',
        columns: [
          { heading: 'Movement', items: ['First move *away* from the space', 'Then *explode* into it', 'Lose your opponent: with or without the ball'] },
          { heading: 'As a team', items: ['*Width*: get wide', '*Depth*: one high, one short', 'Make the pitch *big* when you have the ball'] },
        ],
        phrase: { big: 'MOVE AWAY, THEN EXPLODE', small: 'Scan: where is the space?' },
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
        'The receiver checks off one of the far cones, then explodes back into the receiving zone.',
        'Good body angle to receive: half turn, ball out of the body, head up, pass to the end player.',
        'End player and receiver swap. The end player is now the passer for the other receiver. Repeat.',
        'Progressions: end players move along their line to make space. The receiver does a trick and attacks a front cone before passing.',
        'Skill (10 minutes): same set-up. The receiver and the end player compete, taking turns to defend. Lose your defender anywhere in the zone before receiving.',
        'Get the ball to either front cone = 1 point, the back cone = 3 points.',
        'Game (20 minutes): 40 × 30 yards, 4 v 4 plus keepers. A floater in a channel on each side: 3 touches, keeps the game flowing.',
        'Coach one team on creating space, with or without the ball. Width and depth: make the pitch as big as possible when you have the ball.',
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
        title: 'Check Away, Explode',
        tagline: 'Move away, burst back, receive on the half turn.',
        intro: ['A *10 × 25 yard* grid, four players.', 'Receiver: *check away*, then *explode* into space.', '*Half turn*, *back foot*, head up, pass.'],
        keyPhrase: { big: 'MOVE AWAY, THEN EXPLODE', small: 'Half turn, back foot' },
        legend: { a: 'Players' },
        players: [
          { id: 'X1', team: 'a', label: '1', x: 50, y: Y0 }, { id: 'X2', team: 'a', label: '2', x: 50, y: 26 },
          { id: 'X3', team: 'a', label: '3', x: 50, y: 49 }, { id: 'X4', team: 'a', label: '4', x: 50, y: Y3 },
        ],
        ball: { owner: 'X3' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['5 yard end zones, a *15 yard receiving zone*.', 'One player on each end line, *two* in the middle.', 'Three grids for 12 players.'],
            halves: zoneLabel,
          },
          {
            title: 'SCAN, THEN CHECK AWAY',
            text: ['*Scan*: where is the space?', 'First move *away* from it...', '...towards a *far cone*.'],
            tags: { X2: 'CHECK AWAY' }, timing: { move: 2.4 },
            moves: [{ id: 'X2', to: [41, 20], start: 0, end: 0.8 }],
          },
          {
            title: 'EXPLODE INTO SPACE',
            text: ['Now *explode* into the space.', '*Half turn*: see the ball *and* where it\'s going.'],
            tags: { X2: 'EXPLODE' }, timing: { move: 2.6 },
            moves: [{ id: 'X2', to: [56, 33], start: 0, end: 0.5, ease: 'out' }],
            passes: [{ to: 'X2', start: 0.35, end: 0.8 }],
          },
          {
            title: 'BACK FOOT, HEAD UP',
            text: ['Let it come *across* you: *back foot*.', 'Ball *out of your body*.', '*Head up*: pass to the end player.'],
            tags: { X2: 'BACK FOOT' }, timing: { move: 2.8 },
            moves: [{ id: 'X2', to: [57, 28], start: 0, end: 0.3 }],
            passes: [{ to: 'X1', start: 0.45, end: 0.8 }],
          },
          {
            title: 'SWAP',
            text: ['End player and receiver *swap*.', 'He brings the ball in...', '...and passes for the *other* receiver.'],
            tags: { X1: 'IN', X2: 'OUT' }, timing: { move: 2.8 },
            moves: [
              { id: 'X1', to: [44, 26], start: 0, end: 0.8 },
              { id: 'X2', to: [50, Y0], start: 0.1, end: 0.9 },
            ],
          },
          {
            title: 'OTHER WAY: CHECK AWAY',
            text: ['Other receiver: *scan*...', '...and *check away* towards a far cone.'],
            tags: { X3: 'CHECK AWAY' }, timing: { move: 2.4 },
            moves: [{ id: 'X3', to: [58, 55], start: 0, end: 0.8 }],
          },
          {
            title: 'EXPLODE, HALF TURN',
            text: ['*Explode* back into the space.', 'Open your body: *half turn*.'],
            tags: { X3: 'EXPLODE' }, timing: { move: 2.6 },
            moves: [{ id: 'X3', to: [44, 43], start: 0, end: 0.5, ease: 'out' }],
            passes: [{ to: 'X3', start: 0.35, end: 0.8 }],
          },
          {
            title: 'BACK FOOT, PASS ON',
            text: ['*Back foot*, *head up*.', 'End player *moves along his line* to make space.', 'Pass, swap, repeat.'],
            tags: { X3: 'BACK FOOT', X4: 'MOVE' }, timing: { move: 2.8 },
            moves: [
              { id: 'X3', to: [43, 48], start: 0, end: 0.3 },
              { id: 'X4', to: [42, Y3], start: 0, end: 0.4 },
            ],
            passes: [{ to: 'X4', start: 0.45, end: 0.8 }],
          },
        ],
        summary: ['*Scan*: where is the space?', '*Check away*, then *explode* into it.', '*Half turn*, *back foot*, ball out of your body.', 'Progression: a *trick*, attack a front cone, then pass.'],
      }),

      // ---------------- 2: skill (1 v 1) ----------------
      Object.assign({}, grid, {
        id: 'lose-your-defender',
        video: 'videos/creating-space-2.mp4',
        kicker: 'Clip 2 · Skill',
        title: 'Lose Your Defender',
        tagline: 'Lose him, receive, turn. Front cone 1, back cone 3.',
        intro: ['Same grid, now *1 v 1* in the zone.', '*Lose your defender*, receive, turn.', 'Front cone: *1 point*. Back cone: *3 points*.'],
        keyPhrase: { big: 'LOSE YOUR DEFENDER', small: 'Away, then explode' },
        legend: { a: 'Attacker', d: 'Defender' },
        players: [
          { id: 'X1', team: 'd', label: '1', x: 50, y: 22 }, { id: 'X2', team: 'a', label: '2', x: 50, y: 33 },
          { id: 'X3', team: 'a', label: '3', x: 50, y: 50, ball: true }, { id: 'X4', team: 'a', label: '4', x: 50, y: Y3 },
        ],
        ball: { owner: 'X3' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Same grid. *1 v 1* in the zone.', 'Take turns to *defend*.', 'Front cone: *1 point*. Back cone: *3 points*.'],
            tags: { X1: 'DEFENDER', X2: 'ATTACKER' },
            zones: [{ at: [XL, Y1], r: 4, label: '1' }, { at: [XR, Y1], r: 4, label: '1' }, { at: [50, Y0], r: 4, label: '3' }],
          },
          {
            title: 'AWAY, THEN EXPLODE',
            text: ['Move *towards* the passer: he follows.', 'Then *explode* into the space behind.', 'Lose him *anywhere* in the zone.'],
            tags: { X2: 'DOUBLE MOVE' }, timing: { move: 3 },
            moves: [
              { id: 'X2', path: [[52, 38], [40, 30]], start: 0, end: 0.75 },
              { id: 'X1', path: [[51, 30], [47, 27]], start: 0.1, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'X2', start: 0.5, end: 0.85 }],
          },
          {
            title: 'HALF TURN, BACK FOOT',
            text: ['Receive on the *half turn*.', '*Back foot* touch, *away* from him.', '*Head up*: where can I score?'],
            tags: { X2: 'BACK FOOT' }, timing: { move: 2.4 },
            moves: [
              { id: 'X2', to: [38, 24], start: 0, end: 0.4 },
              { id: 'X1', to: [44, 25], start: 0.2, end: 0.8, arrow: false },
            ],
          },
          {
            title: 'FRONT CONE: 1 POINT',
            text: ['He blocks the middle?', 'Take the *front cone*: *1 point*.'],
            tags: { X2: 'SCORE' }, timing: { move: 2.4 },
            moves: [
              { id: 'X2', to: [38, 20], start: 0, end: 0.6 },
              { id: 'X1', to: [45, 21], start: 0.2, end: 0.8, arrow: false },
            ],
          },
          {
            title: 'SWAP ROLES',
            text: ['Now *swap*: the defender attacks.', 'New ball from the passer.'],
            tags: { X1: 'ATTACKER' }, timing: { move: 2.6 },
            team: { X1: 'a', X2: 'd' },
            ball: { give: 'X3' },
            moves: [
              { id: 'X1', to: [52, 35], start: 0, end: 0.8 },
              { id: 'X2', to: [50, 25], start: 0, end: 0.8 },
            ],
          },
          {
            title: 'AWAY, THEN EXPLODE',
            text: ['Take him *away* from the space...', '...then *explode* into it.'],
            tags: { X1: 'EXPLODE' }, timing: { move: 3 },
            moves: [
              { id: 'X1', path: [[53, 42], [60, 30]], start: 0, end: 0.75 },
              { id: 'X2', path: [[52, 32], [53, 27]], start: 0.15, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'X1', start: 0.5, end: 0.85 }],
          },
          {
            title: 'TURN ON THE BACK FOOT',
            text: ['*Back foot*: turn *away* from him.', 'He\'s behind you now.'],
            tags: { X1: 'BACK FOOT' }, timing: { move: 2.4 },
            moves: [
              { id: 'X1', to: [61, 22], start: 0, end: 0.4 },
              { id: 'X2', to: [57, 28], start: 0.2, end: 0.9, arrow: false },
            ],
          },
          {
            title: 'BACK CONE: 3 POINTS',
            text: ['*Head up*: the middle is open.', 'Go for the *back cone*: *3 points*.'],
            tags: { X1: 'SCORE' }, timing: { move: 2.8 },
            moves: [
              { id: 'X1', path: [[58, 12], [52, 7]], start: 0, end: 0.8 },
              { id: 'X2', to: [56, 16], start: 0.2, end: 0.9, arrow: false },
            ],
          },
        ],
        summary: ['Take him *away* from the space...', '...then *explode* into it.', '*Half turn*, *back foot*: turn away from him.', 'Front cone *1*, back cone *3*. Swap roles.'],
      }),

      // ---------------- 3: game ----------------
      {
        id: 'width-and-depth',
        video: 'videos/creating-space-3.mp4',
        kicker: 'Clip 3 · Game',
        title: 'Width and Depth',
        tagline: 'Make the pitch big. Create space with and without the ball.',
        intro: ['*4 v 4* plus keepers, 40 × 30 yards.', 'A *floater* each side: 3 touches, keeps it flowing.', 'Make the pitch *big*: *width* and *depth*.'],
        keyPhrase: { big: 'MAKE THE PITCH BIG', small: 'Width and depth' },
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
          { id: 'G3', team: 'a', x: 56, y: 38 }, { id: 'G4', team: 'a', x: 36, y: 38 },
          { id: 'B1', team: 'd', x: 44, y: 26 }, { id: 'B2', team: 'd', x: 44, y: 50 },
          { id: 'B3', team: 'd', x: 74, y: 42 }, { id: 'B4', team: 'd', x: 60, y: 56 },
          { id: 'F1', team: 'f', label: 'F', x: 40, y: 4.5 }, { id: 'F2', team: 'g', label: 'F', x: 60, y: 70.5 },
        ],
        ball: { owner: 'kL' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* plus keepers, 40 × 30 yards.', 'A *floater* in each side channel: *3 touches*.', 'Coach one team on *creating space*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
          },
          {
            title: 'MAKE THE PITCH BIG',
            text: ['We have the ball: make the pitch *big*.', '*Width*: two go wide. *Depth*: one high, one short.', 'More space for everyone.'],
            tags: { G1: 'GO WIDE', G2: 'GO WIDE', G3: 'GO HIGH', G4: 'SHOW' }, timing: { move: 3.2 },
            moves: [
              { id: 'G1', to: [30, 14], start: 0, end: 0.8 },
              { id: 'G2', to: [27, 60], start: 0, end: 0.8 },
              { id: 'G3', to: [72, 38], start: 0, end: 0.8 },
              { id: 'G4', to: [18, 38], start: 0, end: 0.7 },
              { id: 'B3', to: [80, 38], start: 0, end: 0.8, arrow: false },
              { id: 'B1', to: [36, 27], start: 0.3, end: 1, arrow: false },
              { id: 'B2', to: [38, 48], start: 0.3, end: 1, arrow: false },
              { id: 'B4', to: [56, 56], start: 0.3, end: 1, arrow: false },
            ],
          },
          {
            title: 'SCAN, HALF TURN',
            text: ['*Scan* before it arrives.', 'Receive on the *half turn*: see the pitch.'],
            tags: { G4: 'HALF TURN' }, timing: { move: 2.6 },
            moves: [
              { id: 'G4', to: [20, 40], start: 0.1, end: 0.5 },
              { id: 'B1', to: [29, 34], start: 0.4, end: 1, arrow: false },
            ],
            passes: [{ to: 'G4', start: 0.1, end: 0.5 }],
          },
          {
            title: 'BACK FOOT, HEAD UP',
            text: ['*Back foot*: ball out of your body.', '*Head up*: what are my options?', 'Out to the *floater*.'],
            tags: { G4: 'BACK FOOT', F2: 'FLOATER' }, timing: { move: 3 },
            moves: [
              { id: 'G4', to: [24, 43], start: 0, end: 0.3 },
              { id: 'F2', to: [40, 70.5], start: 0, end: 0.5 },
              { id: 'B1', to: [31, 37], start: 0.3, end: 1, arrow: false },
            ],
            passes: [{ to: 'F2', start: 0.45, end: 0.82 }],
          },
          {
            title: 'AWAY, THEN EXPLODE',
            text: ['Striker takes his defender *away*...', '...then *explodes* into the space.', 'Floater: *quick*, keep it flowing.'],
            tags: { G3: 'EXPLODE', F2: 'FLOATER' }, timing: { move: 3.2 },
            moves: [
              { id: 'G3', path: [[82, 46], [66, 30]], start: 0, end: 0.75 },
              { id: 'B3', path: [[84, 43], [75, 37]], start: 0.15, end: 1, arrow: false },
              { id: 'B4', to: [52, 58], start: 0.3, end: 1, arrow: false },
            ],
            passes: [{ to: 'G3', start: 0.5, end: 0.85 }],
          },
          {
            title: 'BACK FOOT: GO FORWARD',
            text: ['*Back foot*: turn towards goal.', 'Positive outcome: *shoot*.', 'Forward pass, dribble, shot or cross.'],
            tags: { G3: 'BACK FOOT' }, timing: { move: 2.6 },
            shot: [102, 40],
            ball: { to: [102, 40], start: 0.4, end: 0.62 },
            moves: [
              { id: 'G3', to: [71, 32], start: 0, end: 0.35 },
              { id: 'B3', to: [74, 41], start: 0.2, end: 0.6, arrow: false },
              { id: 'kR', to: [97.5, 34], start: 0.4, end: 0.62, arrow: false },
            ],
          },
        ],
        summary: ['With the ball: make the pitch *big*.', '*Width* and *depth*: wide, high, short.', 'Take him *away*, then *explode* into space.', '*Half turn*, *back foot*, go *forward*.'],
      },
    ],
  });
})();
