/*
 * SESSION: Splash & Ripple — Defensive Principle
 *
 * Pitch units: x 0..100 (left → right), y 0..75 (top → bottom).
 * Blue defenders defend the goal at the BOTTOM. Green attackers attack it.
 * Text: wrap a word or phrase in *stars* to highlight it in red.
 * A line starting with "-" is shown as an indented sub-point.
 */
window.SESSIONS = window.SESSIONS || [];
window.SESSIONS.push({
  id: 'splash-and-ripple',
  title: 'Splash & Ripple',
  subtitle: 'Defensive Principle',

  // Reference cards shown under the video player on the website
  cards: [
    {
      title: 'The Splash',
      lead: 'The player *closest to the ball*. Your job: *stall their attack*. Always stay *between the ball and the goal*: stop the direct shot.',
      columns: [
        { heading: '1. Hold shape', items: ['Block passing lanes', 'Keep your position', 'Make it hard to play forward'],
          triggers: ['Ball far from goal', 'Teammate says "hold"', 'Low chance to win it'] },
        { heading: '2. Press the ball', items: ['Be urgent', 'Show intensity', 'Goal: win it back!'],
          triggers: ['Good chance to win it', 'Bad touch', 'Miskick / loose pass'] },
      ],
      phrase: { big: 'FAST → SLOW → LOW', small: 'Approach fast, slow down, get low' },
    },
    {
      title: 'The Ripple',
      lead: 'Your reaction to the Splash.',
      columns: [
        { heading: 'If Splash holds shape', items: ['Keep your position', 'Shuffle across to support', 'Get into good defensive positions'] },
        { heading: 'If Splash presses', items: ['Press as a TEAM', 'Stop the ball reaching the next player', 'React quickly together'] },
      ],
      phrase: { big: 'YOU STILL REACT!', small: 'Ripple is strongest closest to the Splash — even if you\'re furthest away, react.' },
    },
  ],

  clips: [
    // ------------------------------------------------------------------
    // 2 v 2 to four mini goals. Coach/defender plays a diagonal pass in,
    // two attackers come on, two defenders go out to meet them.
    {
      id: '2v2',
      video: 'videos/splash-ripple-1-2v2.mp4',
      kicker: 'Clip 1',
      title: '2 v 2',
      tagline: 'Who\'s the Splash? Who\'s the Ripple?',
      intro: [
        '2 v 2 to four mini goals.',
        'A *diagonal pass* starts it.',
        'Closest defender = *Splash*. Team mate = *Ripple*.',
        'When the ball moves, the *roles can reverse*.',
      ],
      keyPhrase: { big: 'BALL → SPLASH → GOAL', small: 'Stay between the ball and the goal: stop the shot' },
      goals: [[22, 'top'], [78, 'top'], [22, 'bottom'], [78, 'bottom']],
      string: ['rA', 'rB'],
      players: [
        { id: 'gq1', team: 'a', x: 9, y: -1.5, dim: true },
        { id: 'gA', team: 'a', x: 15, y: 2.5 },
        { id: 'gB', team: 'a', x: 86, y: -1 },
        { id: 'gq2', team: 'a', x: 93, y: -1.5, dim: true },
        { id: 'rq1', team: 'd', x: 7, y: 77, dim: true },
        { id: 'rq2', team: 'd', x: 13, y: 77, dim: true },
        { id: 'rA', team: 'd', x: 31, y: 75 },
        { id: 'rB', team: 'd', x: 86, y: 74 },
        { id: 'rq3', team: 'd', x: 93, y: 77, dim: true },
      ],
      ball: { owner: 'rB' },
      steps: [
        {
          title: 'DIAGONAL PASS TO START',
          text: [
            'Defender plays a *diagonal pass* to the far attacker.',
            'Two attackers come on to the pitch.',
            'Defenders: watch the ball. *Who\'s closest?*',
          ],
          ball: { pass: 'gA', start: 0, end: 0.5 },
          moves: [
            { id: 'gA', to: [17, 10], start: 0.1, end: 0.55 },
            { id: 'gB', to: [68, 20], start: 0.2 },
          ],
        },
        {
          title: 'WHO IS THE SPLASH?',
          text: [
            '*Splash* (closest player): get to the ball *quickly*. Stop them coming forward.',
            'Stay *between the ball and the goal*: stop the direct shot.',
            '*Ripple:* drop into a good supporting position.',
          ],
          tags: { rA: 'SPLASH', rB: 'RIPPLE' },
          shot: [22, 75],
          timing: { move: 3 },
          moves: [
            { id: 'gA', to: [24, 30], ease: 'linear' },
            { id: 'gB', to: [66, 28] },
            { id: 'rA', to: [23.6, 42.5], start: 0.05, ease: 'out' },
            { id: 'rB', to: [46, 58], start: 0.15 },
          ],
        },
        {
          title: 'PASS: THE ROLES REVERSE',
          text: [
            'Point of attack changes, so the *roles reverse*.',
            '*New Splash:* get to the ball quickly, stay between the ball and the goal.',
            '*Old Splash:* drop into a good supporting position.',
          ],
          tags: { rB: 'SPLASH', rA: 'RIPPLE' },
          shot: [78, 75],
          timing: { move: 3 },
          ball: { pass: 'gB', start: 0, end: 0.4 },
          moves: [
            { id: 'rB', to: [68.5, 41.5], start: 0.25, ease: 'out' },
            { id: 'rA', to: [45, 56], start: 0.3 },
          ],
        },
      ],
      summary: [
        'Closest player = *Splash*. Get there quickly.',
        'Always stay *between the ball and the goal*.',
        'Team mate = *Ripple*. Drop in and support.',
        'Ball moves → *roles reverse*.',
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'basics',
      video: 'videos/splash-ripple-2-basics.mp4',
      kicker: 'Clip 2',
      title: 'The Basics',
      tagline: 'Closest player splashes. Everyone else ripples.',
      intro: [
        'The *Splash* is the player closest to the ball.',
        'The *Ripple* is how everyone else reacts.',
        'We are all *connected by string*.',
      ],
      keyPhrase: { big: 'FAST → SLOW → LOW', small: 'Approach fast, slow down, get low' },
      string: ['b1', 'b2', 'b3'],
      players: [
        { id: 'g1', team: 'a', x: 14, y: 24 },
        { id: 'g2', team: 'a', x: 48, y: 24 },
        { id: 'g3', team: 'a', x: 85, y: 21 },
        { id: 'b1', team: 'd', x: 15, y: 51 },
        { id: 'b2', team: 'd', x: 50, y: 54 },
        { id: 'b3', team: 'd', x: 85, y: 51 },
      ],
      ball: { owner: 'g2' },
      steps: [
        {
          title: 'THE SPLASH!',
          text: [
            'Closest player goes to the ball.',
            'Job: *stall the attack*. Stay *between the ball and the goal*.',
            '*Ripple:* the two supporting defenders tuck in to a good defensive shape.',
          ],
          tags: { b2: 'SPLASH', b1: 'RIPPLE', b3: 'RIPPLE' },
          moves: [
            { id: 'b2', to: [48, 35], ease: 'out' },
            { id: 'b1', to: [31, 47], start: 0.15 },
            { id: 'b3', to: [67, 47], start: 0.15 },
          ],
        },
        {
          title: 'BALL IS PASSED',
          text: [
            'The *new* closest player becomes the Splash.',
            '*Ripple:* teammates adjust — drop off and shuffle across.',
            'Don\'t get *attracted to the ball*.',
          ],
          tags: { b3: 'SPLASH', b2: 'RIPPLE', b1: 'RIPPLE' },
          ball: { pass: 'g3', start: 0, end: 0.35 },
          moves: [
            { id: 'b3', to: [82, 32], start: 0.25, ease: 'out' },
            { id: 'b2', to: [62, 45], start: 0.3 },
            { id: 'b1', to: [43, 50], start: 0.35 },
          ],
        },
        {
          title: 'STAY PATIENT',
          text: [
            'The new Splash *stalls* the attack.',
            'Central defender now *supports* — behind, not ahead.',
            'Wide defender has *tucked in* — the string dragged them across.',
            'Wait for a mistake, then press with *intensity*.',
          ],
          tags: { b3: 'SPLASH', b2: 'RIPPLE', b1: 'RIPPLE' },
          moves: [
            { id: 'g3', to: [82, 23] },
            { id: 'b3', to: [81, 33.5], arrow: false },
            { id: 'b2', to: [69, 42] },
            { id: 'b1', to: [52, 49] },
          ],
        },
      ],
      summary: [
        'Closest player = *Splash*. Stall the attack.',
        'Everyone else = *Ripple*. React and support.',
        'Ball moves → *roles change*.',
        'Even if you\'re furthest away — *you still react!*',
      ],
    },

    // ------------------------------------------------------------------
    {
      id: 'hold-or-press',
      video: 'videos/splash-ripple-3-hold-or-press.mp4',
      kicker: 'Clip 3',
      title: 'Hold or Press?',
      tagline: 'The Splash has two choices. Watch for the trigger.',
      intro: [
        'As the Splash you have *two choices*:',
        '-*Hold shape* — stall them, wait.',
        '-*Press the ball* — be urgent, win it back.',
        'The *Ripple* watches and reacts to your decision.',
      ],
      keyPhrase: { big: 'FAST → SLOW → LOW', small: 'Approach fast, slow down, get low' },
      string: ['b1', 'b2', 'b3'],
      players: [
        { id: 'g1', team: 'a', x: 13, y: 22 },
        { id: 'g2', team: 'a', x: 47, y: 24 },
        { id: 'g3', team: 'a', x: 86, y: 22 },
        { id: 'b1', team: 'd', x: 15, y: 54 },
        { id: 'b2', team: 'd', x: 50, y: 58 },
        { id: 'b3', team: 'd', x: 85, y: 54 },
      ],
      ball: { owner: 'g2' },
      steps: [
        {
          title: 'FAST → SLOW → LOW',
          text: [
            'Sprint to the ball *fast*.',
            '*Slow* down as you get close.',
            'Get *low* — on your toes, ready.',
            'Ripple tucks in behind.',
          ],
          tags: { b2: 'SPLASH', b1: 'RIPPLE', b3: 'RIPPLE' },
          timing: { move: 3 },
          moves: [
            { id: 'b2', to: [47, 35], ease: 'out' },
            { id: 'b1', to: [31, 49], start: 0.15 },
            { id: 'b3', to: [67, 49], start: 0.15 },
          ],
        },
        {
          title: 'CHOICE 1: HOLD SHAPE',
          text: [
            'Ball is far from goal — *low chance* to win it.',
            'Stay goal-side, *block the forward pass*, make it hard to play forward.',
            '*Ripple:* keep your position, shuffle across to support.',
          ],
          tags: { b2: 'SPLASH', b1: 'RIPPLE', b3: 'RIPPLE' },
          moves: [
            { id: 'g2', to: [56, 25] },
            { id: 'b2', to: [56, 36], start: 0.08 },
            { id: 'b1', to: [38, 49], start: 0.15 },
            { id: 'b3', to: [73, 49], start: 0.15 },
          ],
        },
        {
          title: 'TRIGGER: BAD TOUCH!',
          text: [
            'Heavy touch — the ball gets away from them.',
            'That\'s a *press trigger*:',
            '-Bad touch',
            '-Miskick / loose pass',
            '-Good chance to win it',
          ],
          tags: { b2: 'SPLASH' },
          timing: { move: 1.4, hold: 1.2 },
          ball: { to: [58, 30.5], start: 0, end: 0.9 },
        },
        {
          title: 'CHOICE 2: PRESS!',
          text: [
            '*Be urgent* — win it back!',
            '*Ripple:* press as a TEAM.',
            'Stop the ball reaching the next player.',
            'React *quickly together*.',
          ],
          tags: { b2: 'SPLASH', b1: 'RIPPLE', b3: 'RIPPLE' },
          ball: { pass: 'b2', start: 0.2, end: 0.32, arrow: false },
          lanes: [
            { from: 'g2', to: 'g1', blocked: true },
            { from: 'g2', to: 'g3', blocked: true },
          ],
          moves: [
            { id: 'b2', to: [59, 35], end: 0.3, ease: 'out' },
            { id: 'b1', to: [31, 27], start: 0.05, ease: 'out' },
            { id: 'b3', to: [74, 26], start: 0.05, ease: 'out' },
          ],
        },
      ],
      summary: [
        '*Hold* when: ball far from goal, teammate says hold, low chance to win it.',
        '*Press* when: bad touch, miskick, loose pass, good chance to win it.',
        'Ripple *watches the Splash* and reacts to their decision.',
      ],
    },

    // ------------------------------------------------------------------
    {
      id: 'outnumbered',
      video: 'videos/splash-ripple-4-outnumbered.mp4',
      kicker: 'Clip 4',
      title: 'Outnumbered',
      tagline: '3 v 4: deal with the biggest danger first.',
      intro: [
        'When we are *outnumbered*, we can\'t mark everyone.',
        'Deal with the *biggest danger* first.',
        'Keep our shape until *recovery runners* get back.',
      ],
      keyPhrase: { big: 'CONNECTED BY STRING', small: 'One defender moves, the others are dragged across' },
      string: ['b1', 'b2', 'b3'],
      players: [
        { id: 'g1', team: 'a', x: 12, y: 30 },
        { id: 'g2', team: 'a', x: 36, y: 17 },
        { id: 'g3', team: 'a', x: 63, y: 17 },
        { id: 'g4', team: 'a', x: 89, y: 28 },
        { id: 'b1', team: 'd', x: 16, y: 44 },
        { id: 'b2', team: 'd', x: 40, y: 55 },
        { id: 'b3', team: 'd', x: 58, y: 55 },
      ],
      ball: { owner: 'g1' },
      steps: [
        {
          title: 'WHAT\'S THE BIGGEST DANGER?',
          text: [
            'The *ball* is the biggest danger. *Splash:* get to it and stall.',
            '*Ripple:* good shape, support the Splash, protect the space nearest the ball and goal.',
            'The far winger is *free* but furthest from the ball, so they\'re the *least danger*. We take that chance.',
          ],
          tags: { b1: 'SPLASH', b2: 'RIPPLE', b3: 'RIPPLE', g4: 'FREE' },
          moves: [
            { id: 'b1', to: [13, 39], ease: 'out' },
            { id: 'b2', to: [31, 51], start: 0.1 },
            { id: 'b3', to: [53, 45], start: 0.1 },
          ],
        },
        {
          title: 'QUICK SWITCH! THE DANGER HAS SHIFTED',
          text: [
            'A quick switch turns the free player into the *main danger*.',
            '*Splash:* closest player gets out and stalls them moving forward.',
            '*Ripple:* shuffle over. Left defender *drops in* and gets across.',
          ],
          tags: { b3: 'SPLASH', b2: 'RIPPLE', b1: 'RIPPLE', g4: 'DANGER' },
          timing: { move: 3.2 },
          ball: { pass: 'g4', start: 0, end: 0.4 },
          moves: [
            { id: 'b3', to: [84, 38], start: 0.2, ease: 'out' },
            { id: 'b2', to: [63, 53], start: 0.3 },
            { id: 'b1', path: [[26, 56], [43, 57]], start: 0.32 },
          ],
        },
        {
          title: 'IF THE BALL MOVES, OUR ROLE MAY CHANGE',
          text: [
            'Ripple is *strongest* closest to the Splash.',
            '*String:* the right-side defender moved, so everyone was dragged across.',
            'Keep shape — wait for help and a mistake.',
          ],
          tags: { b3: 'SPLASH', b2: 'RIPPLE', b1: 'RIPPLE' },
          moves: [
            { id: 'g4', to: [86, 30] },
            { id: 'b3', to: [84, 39.5], arrow: false },
            { id: 'b2', to: [70, 48] },
            { id: 'b1', to: [54, 52] },
          ],
        },
      ],
      summary: [
        'Outnumbered? Deal with the *ball* first; leave the player furthest away.',
        'A *quick switch* makes that free player the main danger.',
        'Keep shape until *help arrives*.',
        'Ball moves → danger shifts → *we shift*.',
        'One moves, we all move — *connected by string*.',
      ],
    },
  ],
});
