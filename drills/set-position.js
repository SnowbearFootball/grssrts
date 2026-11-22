/*
 * SESSION: Set Position & Shot-Stopping (Goalkeeping)
 *
 * A close-up of one goal (at the bottom) with the 6-yard box marked. Servers (green) shoot; the goalkeeper (GK) works.
 * Scale: the goal is 8 yards wide = about 44 pitch units, so 1 yard ≈ 5.5 units. Goal line ≈ y 75.7, posts ≈ x 28 and 72.
 * The top of the picture is about 14 yards out.
 * GK positions follow the "ball line": the line from the ball to the middle of the goal.
 */
(function () {
  const GOAL = [50, 75.7];
  const GK_Y = 67;                                       // about 1.5 yards off the line
  // where the keeper stands: on the ball line (ball → middle of the goal), GK_Y down the pitch
  const onLine = (b, gy = GK_Y) => [+(b[0] + (GOAL[0] - b[0]) * (gy - b[1]) / (GOAL[1] - b[1])).toFixed(1), gy];
  const common = {
    goals: [[50, 'bottom']],
    goalScale: 5,
    marks: [{ x: -5, y: 42.7, w: 110, h: 33 }],          // 6-yard box (its sides are just off the picture)
    legendTeams: [{ label: 'Server', color: '#2fbf7f' }, { label: 'Goalkeeper', color: '#2b2b2b' }],
    keyPhrase: { big: 'READY → SET → SAVE', small: 'Be still as the ball is struck' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'set-position',
    title: 'Set Position & Shot-Stopping',
    subtitle: 'Goalkeeping basics',
    type: 'Technical',
    category: 'goalkeeping',
    squad: [3, 8],
    thumb: 'assets/thumbs/set-position.jpg',
    summary: 'Get in line with the ball, be still as it is struck, then make the save. The basics every keeper builds on.',
    keyPhrase: 'Ready → Set → Save',
    ages: { from: 8, note: 'Clips 2 and 3 suit U10 and above.' },

    cards: [
      {
        title: 'The set position',
        lead: 'Balanced and *still* as the ball is struck, so you can move either way.',
        columns: [
          { heading: 'Body', items: ['Feet about shoulder-width apart', 'Weight on the balls of your feet', 'Knees slightly bent', 'Head still, eyes on the ball'] },
          { heading: 'Hands', items: ['Out in front, about waist height', 'Palms facing the ball', 'Relaxed, ready to move'] },
        ],
        phrase: { big: 'SET ON THE STRIKE', small: 'Stop moving just before the shot' },
      },
      {
        title: 'Making the save',
        lead: 'Get your *body behind the ball*, then hold on to it.',
        columns: [
          { heading: 'Catch it', items: ['Chest or head height: hands make a *W*', 'Low shots: *scoop* it up into your chest', 'Body behind your hands'] },
          { heading: "Can't hold it?", items: ['*Push it wide*, away from the goal', 'Never back into the middle', 'Get up fast and *set again*'] },
        ],
        phrase: { big: 'BODY BEHIND THE BALL', small: 'If your hands miss it, your body stops it' },
      },
    ],

    keywords: [
      { word: 'Ready position', meaning: 'Balanced, on your toes, hands in front. How a keeper stands while the ball is away.' },
      { word: 'Set', meaning: 'Being still and balanced just as the shot is struck, so you can move either way.' },
      { word: 'Ball line', meaning: 'An imaginary line from the ball to the middle of the goal. Stand on it.' },
      { word: 'Shuffle', meaning: 'Small side-steps to move across the goal without crossing your feet.' },
      { word: 'W catch', meaning: 'Thumbs and fingers make a W shape behind the ball for shots at chest height or above.' },
      { word: 'Parry', meaning: "Pushing the ball away when you can't hold it: wide, away from the goal." },
    ],

    training: {
      area: 'One goal and the 6-yard box. Mark server spots 10 to 12 yards out.',
      players: '1 or 2 goalkeepers and 2 or 3 servers (or the coach).',
      equipment: 'A goal, plenty of balls and cones for the server spots.',
      setup: [
        'Start with one server in the middle. The keeper gets into the ready position, a step off the line.',
        'The server dribbles left or right. The keeper shuffles to stay on the ball line.',
        'The server takes a touch to set the ball. The keeper sets, then the server shoots at the keeper.',
        'Add servers on the left and right. Pass between them; the keeper moves with every pass.',
        'Progress: shots to the corners, and a second shot straight after the first save.',
        'Keep shots at a level the keeper can save. Success builds confidence.',
      ],
    },

    questions: [
      'Where is the ball line right now?',
      'Were you still when the ball was struck?',
      'Where were your hands before the shot?',
      'Low shot or high shot: which catch did you use?',
      'You pushed it away. Where should it go?',
    ],

    clips: [
      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'get-set',
        video: 'videos/set-position-1-get-set.mp4',
        kicker: 'Clip 1 · 1 server',
        title: 'Get Set',
        tagline: 'Ready, shuffle, set, save.',
        intro: [
          'One server, one keeper.',
          'Stay on the *ball line* as the ball moves.',
          '*Set* as they shoot, then make the save.',
        ],
        players: [
          { id: 'gk', team: 'k', label: 'GK', x: 50, y: GK_Y },
          { id: 's1', team: 'a', x: 50, y: 12 },
        ],
        ball: { owner: 's1' },
        steps: [
          {
            title: 'READY POSITION',
            text: [
              'A step off the line, in the *middle of the goal*.',
              'Feet shoulder-width apart, on your toes, knees bent.',
              'Hands out in front, ready.',
            ],
            tags: { gk: 'READY' },
          },
          {
            title: 'BALL MOVES: SHUFFLE ACROSS',
            text: [
              'The server dribbles to one side.',
              '*Shuffle* across with small side-steps. Don\'t cross your feet.',
              'Stay on the *ball line*: from the ball to the middle of the goal.',
            ],
            tags: { gk: 'SHUFFLE' },
            shot: GOAL,
            timing: { move: 2.8 },
            moves: [
              { id: 's1', to: [16, 16] },
              { id: 'gk', to: onLine([16, 18]), start: 0.15 },
            ],
          },
          {
            title: 'SET AS THEY SHOOT',
            text: [
              'The server takes a touch to get ready to shoot.',
              '*Stop moving.* Balanced and still: that\'s the *set*.',
              'Now you can dive either way.',
            ],
            tags: { gk: 'SET' },
            timing: { move: 1.6 },
            moves: [
              { id: 's1', to: [18, 19], arrow: false },
              { id: 'gk', to: onLine([18, 21], GK_Y - 0.6), start: 0.4, arrow: false },
            ],
          },
          {
            title: 'SHOT: CATCH IT',
            text: [
              'Get your *body behind the ball*.',
              'Chest height: hands make a *W*. Low: *scoop* it up.',
              'Hold on to it.',
            ],
            tags: { gk: 'SAVE' },
            timing: { move: 1.8 },
            ball: { pass: 'gk', start: 0.05, end: 0.45 },
          },
        ],
        summary: [
          'Ready position: *on your toes, hands in front*.',
          'Ball moves: *shuffle* to stay on the ball line.',
          '*Set* as the ball is struck.',
          'Body behind the ball, then *hold on*.',
        ],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'angles',
        ages: { from: 10 },
        video: 'videos/set-position-2-angles.mp4',
        kicker: 'Clip 2 · 3 servers',
        title: 'Move With the Ball',
        tagline: 'Every pass moves the ball line. Move with it.',
        intro: [
          'Three servers: *left, middle and right*.',
          'Every pass moves the *ball line*.',
          'Move with it, then *set* for the shot.',
        ],
        players: [
          { id: 'gk', team: 'k', label: 'GK', x: 50, y: GK_Y },
          { id: 'sL', team: 'a', x: 12, y: 22 },
          { id: 'sC', team: 'a', x: 50, y: 10 },
          { id: 'sR', team: 'a', x: 88, y: 22 },
        ],
        ball: { owner: 'sC' },
        steps: [
          {
            title: 'BALL IN THE MIDDLE',
            text: [
              'Ball in the middle: keeper in the *middle of the goal*.',
              'A step off the line, in the *ready position*.',
            ],
            tags: { gk: 'READY' },
          },
          {
            title: 'PASS LEFT: MOVE ACROSS',
            text: [
              'The ball goes left, so the *ball line* moves.',
              '*Shuffle* across while the ball is travelling.',
              'Be in position before it arrives.',
            ],
            tags: { gk: 'SHUFFLE' },
            shot: GOAL,
            ball: { pass: 'sL', start: 0, end: 0.4 },
            moves: [{ id: 'gk', to: onLine([12, 24]), start: 0.2, ease: 'out' }],
          },
          {
            title: 'SWITCH: ALL THE WAY ACROSS',
            text: [
              'A long pass to the other side.',
              'Keep *shuffling*: small, quick steps.',
              'Same rule: *stay on the ball line*.',
            ],
            tags: { gk: 'SHUFFLE' },
            shot: GOAL,
            timing: { move: 3 },
            ball: { pass: 'sR', start: 0, end: 0.5 },
            moves: [{ id: 'gk', to: onLine([88, 24]), start: 0.2, ease: 'out' }],
          },
          {
            title: 'SET',
            text: [
              'The server sets the ball to shoot.',
              '*Stop. Be still.* Hands ready.',
            ],
            tags: { gk: 'SET' },
            timing: { move: 1.4 },
            moves: [{ id: 'sR', to: [86, 25], arrow: false }, { id: 'gk', to: onLine([86, 27], GK_Y - 0.6), start: 0.4, arrow: false }],
          },
          {
            title: 'SAVE',
            text: [
              'Shot: *body behind the ball*.',
              'Catch it and hold on.',
            ],
            tags: { gk: 'SAVE' },
            timing: { move: 1.8 },
            ball: { pass: 'gk', start: 0.05, end: 0.45 },
          },
        ],
        summary: [
          'Every pass moves the *ball line*.',
          'Move *while the ball travels*, not after.',
          'Small, quick *shuffle* steps.',
          '*Set*, then save.',
        ],
      }),

      // ------------------------------------------------------------------
      Object.assign({}, common, {
        id: 'set-again',
        ages: { from: 10 },
        video: 'videos/set-position-3-set-again.mp4',
        kicker: 'Clip 3 · 2 servers',
        title: 'Save, Get Up, Set Again',
        tagline: 'One save is never the end. Get up and set again.',
        intro: [
          'Two servers, a ball each.',
          'Save the first shot, then *get up fast*.',
          'Move to the new ball line and *set again*.',
        ],
        players: [
          { id: 'gk', team: 'k', label: 'GK', x: onLine([34, 16])[0], y: GK_Y },
          { id: 's1', team: 'a', x: 34, y: 14 },
          { id: 's2', team: 'a', x: 70, y: 12, ball: true },
        ],
        ball: { owner: 's1' },
        steps: [
          {
            title: 'LOW SHOT TO THE CORNER',
            text: [
              'Set on the ball line, then the shot goes low.',
              '*Dive*: lead with your hands.',
              'Get your *body behind the ball*.',
            ],
            tags: { gk: 'SAVE' },
            timing: { move: 2 },
            ball: { pass: 'gk', start: 0.05, end: 0.5 },
            moves: [{ id: 'gk', to: [34, 71], start: 0.15, end: 0.5, ease: 'out' }],
          },
          {
            title: "CAN'T HOLD IT? PUSH IT WIDE",
            text: [
              'If you can\'t catch it, *push it wide*.',
              'Away from the goal, *never back into the middle*.',
            ],
            tags: { gk: 'SAVE' },
            timing: { move: 1.6 },
            ball: { to: [12, 66], start: 0, end: 0.6 },
          },
          {
            title: 'GET UP AND SET AGAIN',
            text: [
              'A second ball is ready. *Get up fast.*',
              'Move to the *new ball line*.',
              'Be set before they shoot.',
            ],
            tags: { gk: 'GET UP!' },
            shot: GOAL,
            ball: { give: 's2' },
            moves: [{ id: 'gk', to: onLine([70, 14]), start: 0.05, ease: 'out' }],
          },
          {
            title: 'SECOND SAVE',
            text: [
              'Set, then save.',
              'This time *catch it and hold on*.',
            ],
            tags: { gk: 'SAVE' },
            timing: { move: 1.8 },
            ball: { pass: 'gk', start: 0.05, end: 0.45 },
          },
        ],
        summary: [
          'Low shot: *dive*, hands first, body behind it.',
          "Can't hold it? *Push it wide*.",
          '*Get up fast* and find the new ball line.',
          '*Set again* before the next shot.',
        ],
      }),
    ],
  });
})();
