/*
 * SESSION: Defending Outnumbered (Defending · tactical) (DRAFT)
 * From the owner's own plan "Defending out-numbered" (1st4sport L2 session sheet).
 *
 * Key factors: delay the attack; recovery run towards goal, as quick as possible; good shape once in position;
 *   show the attack away from goal; deal with the attack once the defenders are set.
 * 1. 2 v 1 (15 x 15 yds, 10 mins): the coach passes in; two attackers score through a cone gate. The defender stays between ball and goal
 *    and delays; nearer the goal they must decide when to stop backing off.
 * 2. 2 v 1 to 2 v 2 (15 x 20 yds, 10 mins): defender 1 passes in from by the goal, then delays. As soon as the attackers
 *    receive, defender 2 (starting behind them) makes a fast recovery run towards goal. Then 2 v 2 as normal.
 * 3. Game (20 mins): 4 v 4 + keepers, 2 floaters outside the pitch. A 10 yd defensive zone at each end (10 / 20 / 10):
 *    only one defender in it until the ball goes in, then a team-mate must help with a quick recovery run.
 * Pitch units: x 0..100, y 0..75 (1 unit is about the same across and down). Blues defend the bottom goal.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', F = '#9b6fe0';
  const ORANGE = '#d9622b', COACH = '#6b7280';

  // ---------- 1: 2 v 1, 15 x 15 yards, a cone gate at the bottom ----------
  const SQ1 = { x: 28, y: 14, w: 44, h: 44 };
  const gate = (y, a, b) => [{ at: [a, y], color: ORANGE }, { at: [b, y], color: ORANGE }];
  const one = {
    plain: true, goals: [],
    areas: [{ x: SQ1.x, y: SQ1.y, w: SQ1.w, h: SQ1.h }],
    cones: gate(58, 44, 56),
    dims: [{ a: [SQ1.x, 64], b: [SQ1.x + SQ1.w, 64], label: '15 yds' }, { a: [79, SQ1.y], b: [79, SQ1.y + SQ1.h], label: '15 yds' }],
    teamColors: { c: COACH },
    legendTeams: [{ label: 'Attackers', color: G }, { label: 'Defender', color: B }, { label: 'Coach', color: COACH }],
    tagPlace: 'auto',
    tagFlash: true,
  };

  // ---------- 2: 2 v 1 to 2 v 2, 15 wide x 20 long ----------
  const SQ2 = { x: 32, y: 10, w: 36, h: 48 };
  const two = {
    plain: true, goals: [],
    areas: [{ x: SQ2.x, y: SQ2.y, w: SQ2.w, h: SQ2.h }],
    cones: gate(58, 44, 56),
    dims: [{ a: [SQ2.x, 64], b: [SQ2.x + SQ2.w, 64], label: '15 yds' }, { a: [25, SQ2.y], b: [25, SQ2.y + SQ2.h], label: '20 yds' }],
    legend: { a: 'Attackers', d: 'Defenders' },
    tagPlace: 'auto',
    tagFlash: true,
  };

  // ---------- 3: the game, 4 v 4 + keepers + 2 floaters; zones 10 / 20 / 10 yards ----------
  const P = { x: 22, y: -1.5, w: 56, h: 78 };
  const Z1 = 18, Z2 = 57;   // ends of the defensive zones
  const game = {
    plain: true,
    goals: [[50, 'top'], [50, 'bottom']],
    areas: [{ x: P.x, y: P.y, w: P.w, h: P.h }],
    marks: [{ x: P.x, y: Z1, w: P.w, h: 0 }, { x: P.x, y: Z2, w: P.w, h: 0 }],
    dims: [
      { a: [7, P.y], b: [7, Z1], label: '10' },
      { a: [7, Z1], b: [7, Z2], label: '20 yds' },
      { a: [7, Z2], b: [7, P.y + P.h], label: '10' },
    ],
    teamColors: { f: F },
    legendTeams: [{ label: 'Greens (attack down)', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: F }],
    tagPlace: 'auto',
  };
  const ZONE_TOP = { x: P.x, y: P.y, w: P.w, h: Z1 - P.y, color: G, soft: true };
  const ZONE_BOT = { x: P.x, y: Z2, w: P.w, h: P.y + P.h - Z2, color: B, label: 'DEFENSIVE ZONE', labelAt: [33, 74], soft: true };
  const zones = [ZONE_TOP, ZONE_BOT];

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'defending-outnumbered',
    draft: true,
    title: 'Defending Outnumbered',
    subtitle: 'Delay, recover, then defend',
    type: 'Tactical',
    category: 'defending',
    topics: ['Transition', 'Shape'],
    squad: [8, 12],
    thumb: 'assets/thumbs/defending-outnumbered.jpg',
    summary: 'When you\'re outnumbered, slow the attack down until help arrives. 2 v 1 to a cone gate, then 2 v 1 with a team-mate making a recovery run, then a 4 v 4 game where only one defender can wait in the defensive zone.',
    keyPhrase: 'Delay, recover, then defend',
    ages: { from: 12 },

    cards: [
      {
        title: 'The defender on the ball',
        lead: 'Outnumbered? *Don\'t dive in*. Your job is to *buy time*.',
        columns: [
          { heading: 'Stall', items: ['Stay *between the ball and the goal*', 'Back off slowly: *slow them down*', '*Show them away from goal*'] },
          { heading: 'Decide', items: ['Near the goal: *stop backing off*', 'Help is here? Now *deal with it*', 'Pick your moment: a heavy touch, head down'] },
        ],
        phrase: { big: 'DELAY, DON\'T DIVE IN', small: 'Buy time for help to arrive' },
      },
      {
        title: 'The recovering defender',
        lead: 'Your team-mate is on their own. *Get back and help*.',
        columns: [
          { heading: 'Recover', items: ['Go *as soon as* they get the ball', 'Sprint *towards your goal*, not the ball', 'The *fastest way* back'] },
          { heading: 'Get set', items: ['Get *goal-side* of a free attacker', '*Good shape*: one presses, one covers', '*Talk*: "I\'m here!"'] },
        ],
        phrase: { big: 'RECOVER TOWARDS GOAL', small: 'Fast, straight back, then get set' },
      },
    ],

    keywords: [
      { word: 'Outnumbered', meaning: 'More of them than us, like 2 v 1.' },
      { word: 'Delay (stall)', meaning: 'Slow the attack down without diving in, so team-mates have time to get back.' },
      { word: 'Recovery run', meaning: 'A fast run back towards your own goal to help a team-mate.' },
      { word: 'Goal-side', meaning: 'Between the attacker (or the ball) and the goal you are defending.' },
      { word: 'Show them away', meaning: 'Stand so the attacker can only go wide, away from the goal.' },
      { word: 'Get set', meaning: 'In position, in good shape, ready to deal with the attack.' },
      { word: 'Floater', meaning: 'A player who always plays for the team with the ball.' },
    ],

    training: {
      area: '2 v 1: 15 × 15 yards. 2 v 2: 15 × 20 yards. Game: 40 yards long (a 10 yard defensive zone at each end, 20 in the middle), about 30 yards wide.',
      players: '8 to 12. Drills in groups of 3 or 4. Game: 4 v 4, two keepers and two floaters outside the pitch.',
      equipment: 'Cones for the areas and gates, balls, bibs (three colours), two goals.',
      setup: [
        'Drill 1, 2 v 1 (10 minutes): the coach passes to either attacker. Two attackers try to score through the cone gate. The defender keeps themselves between the ball and the goal and stalls (delays) the attack.',
        'As the defender gets near the goal they must decide when to stop backing off.',
        'Drill 2, 2 v 1 to 2 v 2 (10 minutes): defender 1 starts by the gate and passes to the attackers, then delays. Defender 2 starts behind the attackers.',
        'As soon as the attackers receive the ball, defender 2 makes a quick recovery run to help. The run must be fast and towards goal. Then defend 2 v 2 as normal.',
        'Swap roles every few goes in both drills.',
        'Game (20 minutes): 4 v 4 with keepers. Two floaters outside the pitch play for the team with the ball.',
        'A 10 yard defensive zone at each end. Only one defender is allowed in it until the ball goes in. Then a team-mate must help the single defender with a quick, effective recovery run.',
      ],
    },

    questions: [
      'You were outnumbered. Why not dive in?',
      'Where did you stand to stay between the ball and the goal?',
      'Which way did you show the attacker? Why?',
      'When did you stop backing off?',
      'When did you start your recovery run? Which way did you run?',
    ],

    clips: [
      // ---------------- 1: 2 v 1 ----------------
      Object.assign({}, one, {
        id: 'two-v-one',
        video: 'videos/defending-outnumbered-1.mp4',
        kicker: 'Clip 1 · 2 v 1',
        title: 'Stall the Attack',
        tagline: 'On your own against two: stay goal-side and slow them down.',
        intro: ['*2 v 1*: the coach passes in.', 'The defender is *outnumbered*.', 'Job: *stall the attack*. Stay *between the ball and the goal*.'],
        keyPhrase: { big: 'STALL, DON\'T DIVE IN', small: 'Ball, you, goal' },
        players: [
          { id: 'A1', team: 'a', x: 37, y: 18 }, { id: 'A2', team: 'a', x: 63, y: 18 },
          { id: 'D', team: 'd', x: 50, y: 33 },
          { id: 'C', team: 'c', label: 'C', x: 50, y: 6 },
        ],
        ball: { owner: 'C' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['An area *15 × 15* yards.', 'Two attackers score through the *cone gate*.', 'One defender in the middle. The *coach* starts it.'],
            tags: { A1: 'ATTACKER', A2: 'ATTACKER', D: 'DEFENDER' },
          },
          {
            title: 'COACH PASSES IN',
            text: ['The coach passes to *either attacker*.', 'Defender: get *between the ball and the goal*.'],
            tags: { D: 'GOAL-SIDE' }, timing: { move: 2.4 },
            passes: [{ to: 'A1', start: 0.02, end: 0.45 }],
            moves: [{ id: 'D', to: [47, 35], start: 0.3, end: 0.9, arrow: false }],
          },
          {
            title: 'STALL THE ATTACK',
            text: ['Outnumbered: *don\'t dive in*.', 'Your job: *stall the attack*.', 'Back off slowly: *slow them down*.'],
            tags: { D: 'STALL' }, timing: { move: 3 },
            moves: [
              { id: 'A1', to: [40, 29], end: 0.9 },
              { id: 'A2', to: [62, 28], end: 0.9, arrow: false },
              { id: 'D', to: [47, 40], start: 0.15, end: 0.95, ease: 'out' },
            ],
          },
          {
            title: 'BALL MOVES, YOU MOVE',
            text: ['They pass across.', 'Shift across as the ball travels.', 'Stay *goal-side*, keep backing off.'],
            tags: { D: 'GOAL-SIDE' }, timing: { move: 3 },
            passes: [{ to: 'A2', start: 0.02, end: 0.4 }],
            moves: [
              { id: 'A2', to: [61, 36], start: 0.42, end: 0.95 },
              { id: 'D', to: [54, 45], start: 0.2, end: 0.95, ease: 'out' },
              { id: 'A1', to: [42, 38], start: 0.3, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'SHOW THEM AWAY',
            text: ['Stand *inside* them.', '*Show them wide*, away from the goal.'],
            tags: { D: 'SHOW' }, timing: { move: 2.8 },
            moves: [
              { id: 'A2', path: [[63, 42], [64, 47]], end: 0.95 },
              { id: 'D', to: [56, 53], start: 0.1, end: 0.95, ease: 'out' },
              { id: 'A1', to: [43, 45], start: 0.2, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'STOP BACKING OFF',
            text: ['Near the goal: *decide*.', 'No more room to back off.', 'Pick your moment and *step in*.'],
            tags: { D: 'STEP UP' }, timing: { move: 2.4 },
            moves: [{ id: 'D', to: [61, 50], end: 0.6, ease: 'out' }],
            ball: { pass: 'D', start: 0.55, end: 0.75, arrow: false },
          },
          {
            title: 'WON IT!',
            text: ['Win it and *get it away* from the goal.', 'Then swap roles.'],
            tags: { D: 'WON IT!' }, timing: { move: 2.4 },
            moves: [{ id: 'D', to: [68, 36], end: 0.9 }, { id: 'A2', to: [62, 44], start: 0.2, end: 0.9, arrow: false }],
          },
        ],
        summary: ['Outnumbered: *stall the attack*, don\'t dive in.', 'Stay *between the ball and the goal*.', '*Show them away* from goal.', 'Near the goal: *decide* when to stop backing off.'],
      }),

      // ---------------- 2: 2 v 1 to 2 v 2 ----------------
      Object.assign({}, two, {
        id: 'recovery-run',
        video: 'videos/defending-outnumbered-2.mp4',
        kicker: 'Clip 2 · 2 v 1 to 2 v 2',
        title: 'Recover to Help',
        tagline: 'One delays, the other sprints back towards goal. Then 2 v 2.',
        intro: ['Defender 1 *passes in*, then *delays*.', 'Defender 2 makes a *fast recovery run*.', 'Then *2 v 2* as normal.'],
        keyPhrase: { big: 'RECOVER TOWARDS GOAL', small: 'Fast, straight back, then get set' },
        players: [
          { id: 'A1', team: 'a', x: 42, y: 24 }, { id: 'A2', team: 'a', x: 58, y: 24 },
          { id: 'D1', team: 'd', label: '1', x: 63, y: 54 }, { id: 'D2', team: 'd', label: '2', x: 50, y: 4.5 },
        ],
        ball: { owner: 'D1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['An area *15 × 20* yards, a *cone gate*.', 'Defender 1 starts by the gate, with the ball.', 'Defender 2 starts *behind* the attackers.'],
            tags: { A1: 'ATTACKER', A2: 'ATTACKER', D1: 'DEFENDER', D2: 'DEFENDER' },
          },
          {
            title: 'PASS IN, THEN DELAY',
            text: ['Defender 1 *passes in*...', '...then *closes down*: fast, then slow.', 'It\'s *2 v 1* for now.'],
            tags: { D1: 'DELAY' }, timing: { move: 3 },
            passes: [{ to: 'A1', start: 0.02, end: 0.4 }],
            moves: [{ id: 'D1', to: [47, 40], start: 0.35, end: 0.95, ease: 'out' }],
          },
          {
            title: 'RECOVERY RUN',
            text: ['*As soon as* they receive it: *GO!*', 'Sprint *towards your goal*, not the ball.', 'Defender 1 keeps *delaying*.'],
            tags: { D2: 'RECOVER', D1: 'DELAY' }, timing: { move: 3.4 },
            moves: [
              { id: 'D2', path: [[50, 22], [52, 38], [56, 47]], end: 0.85 },
              { id: 'A1', to: [43, 33], start: 0.1, end: 0.95 },
              { id: 'A2', to: [59, 33], start: 0.1, end: 0.95, arrow: false },
              { id: 'D1', to: [45, 43], start: 0.1, end: 0.95, ease: 'out' },
            ],
          },
          {
            title: 'GET SET: 2 v 2',
            text: ['Help has arrived: now *2 v 2*.', 'One *presses* the ball, the other *covers*.', 'Both *goal-side*: good shape.'],
            tags: { D1: 'PRESS', D2: 'COVER' }, timing: { move: 2.6 },
            moves: [
              { id: 'D1', to: [44, 39], end: 0.8, ease: 'out' },
              { id: 'D2', to: [53, 45], end: 0.8 },
            ],
          },
          {
            title: 'DEFEND AS NORMAL',
            text: ['They pass across.', 'Defender 2 *presses*, defender 1 *covers*.'],
            tags: { D2: 'PRESS', D1: 'COVER' }, timing: { move: 3 },
            passes: [{ to: 'A2', start: 0.02, end: 0.38 }],
            moves: [
              { id: 'A2', to: [60, 40], start: 0.4, end: 0.95 },
              { id: 'D2', to: [58, 46], start: 0.2, end: 0.95, ease: 'out' },
              { id: 'D1', to: [50, 47], start: 0.2, end: 0.95 },
              { id: 'A1', to: [44, 42], start: 0.3, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'NOW DEAL WITH IT',
            text: ['Set, with help behind you.', 'Now *step in* and *win it*.'],
            tags: { D2: 'WON IT!', D1: 'COVER' }, timing: { move: 2.6 },
            moves: [{ id: 'D2', path: [[60, 43], [66, 50]], end: 0.98 }],
            ball: { pass: 'D2', start: 0.45, end: 0.6, arrow: false },
          },
        ],
        summary: ['Defender 1: pass in, then *delay*.', 'Defender 2: go *as soon as* they receive it.', 'Recover *towards goal*, fast.', '*Get set*, then deal with the attack.'],
      }),

      // ---------------- 3: the game ----------------
      Object.assign({}, game, {
        id: 'game',
        video: 'videos/defending-outnumbered-3.mp4',
        kicker: 'Clip 3 · 4 v 4 + keepers + 2 floaters',
        title: 'One in the Zone',
        tagline: 'Only one defender waits in the zone. Ball goes in? A team-mate recovers to help.',
        intro: ['*4 v 4* with keepers. *Floaters* play for the team with the ball.', 'Only *one defender* in your defensive zone...', '...until the ball goes in. Then a team-mate *recovers to help*.'],
        keyPhrase: { big: 'ONE IN THE ZONE', small: 'Ball goes in? Recover to help.' },
        players: [
          { id: 'kt', team: 'k', label: 'GK', x: 50, y: 1.5 },
          { id: 'kb', team: 'k', label: 'GK', x: 50, y: 73.5 },
          { id: 'G1', team: 'a', x: 50, y: 11 }, { id: 'G2', team: 'a', x: 35, y: 31 },
          { id: 'G3', team: 'a', x: 63, y: 29 }, { id: 'G4', team: 'a', x: 50, y: 40 },
          { id: 'B1', team: 'd', x: 50, y: 64 }, { id: 'B2', team: 'd', x: 42, y: 45 },
          { id: 'B3', team: 'd', x: 60, y: 46 }, { id: 'B4', team: 'd', x: 50, y: 26 },
          { id: 'F1', team: 'f', x: 16, y: 31 }, { id: 'F2', team: 'f', x: 84, y: 42 },
        ],
        ball: { owner: 'G4' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*Defensive zone* at each end, 10 yards.', 'Only *one defender* allowed in it.', '*Floaters* (outside) play for the team with the ball.'],
            tags: { B1: 'DEFENDER', F1: 'FLOATER', F2: 'FLOATER' },
            halves: zones,
          },
          {
            title: 'USE THE FLOATER',
            text: ['Greens move it round, using a *floater*.', 'Blues *shift* with the ball.', 'Only *one blue* in the zone.'],
            tags: { F2: 'FLOATER' }, timing: { move: 3.4 },
            passes: [{ to: 'F2', start: 0.02, end: 0.32 }, { to: 'G3', start: 0.55, end: 0.85 }],
            moves: [
              { id: 'G3', to: [66, 40], start: 0.2, end: 0.55 },
              { id: 'B3', to: [63, 49], start: 0.3, end: 0.95 },
              { id: 'B2', to: [47, 47], start: 0.3, end: 0.95, arrow: false },
              { id: 'B4', to: [54, 32], start: 0.3, end: 0.95, arrow: false },
              { id: 'G2', to: [38, 40], start: 0.3, end: 0.95, arrow: false },
            ],
            halves: zones,
          },
          {
            title: 'BALL INTO THE ZONE',
            text: ['Two runs, and the ball goes *into the zone*.', 'One blue against two: *outnumbered*.', 'That\'s the *trigger* to help.'],
            tags: { G4: 'RUN', B1: 'TRIGGER' }, timing: { move: 3.2 },
            moves: [
              { id: 'G4', path: [[56, 48], [64, 60]], end: 0.6 },
              { id: 'G2', path: [[36, 46], [33, 60]], start: 0.1, end: 0.8 },
              { id: 'B1', to: [52, 64], start: 0.4, end: 0.95, arrow: false },
            ],
            passes: [{ to: 'G4', start: 0.45, end: 0.8 }],
            halves: zones,
          },
          {
            title: 'DELAY AND RECOVER',
            text: ['Single defender *delays*: show them *away from goal*.', 'Nearest team-mate: *fast recovery run*, towards goal.'],
            tags: { B1: 'DELAY', B2: 'RECOVER' }, timing: { move: 3.4 },
            moves: [
              { id: 'B2', path: [[44, 56], [40, 66]], end: 0.85 },
              { id: 'G4', to: [68, 64], start: 0.1, end: 0.95 },
              { id: 'B1', to: [60, 67], start: 0.1, end: 0.95, ease: 'out' },
              { id: 'G2', to: [34, 62], start: 0.2, end: 0.95, arrow: false },
              { id: 'B3', to: [60, 53], start: 0.2, end: 0.95, arrow: false },
            ],
            halves: zones,
          },
          {
            title: 'SET, THEN DEAL WITH IT',
            text: ['Now *2 v 2* in the zone, good shape.', 'Help is behind you: *step in* and *win it*.'],
            tags: { B1: 'WON IT!', B2: 'COVER' }, timing: { move: 2.6 },
            moves: [{ id: 'B1', to: [65, 66], end: 0.55, ease: 'out' }],
            ball: { pass: 'B1', start: 0.45, end: 0.6, arrow: false },
            halves: zones,
          },
          {
            title: 'OUT TO THE FLOATER',
            text: ['Won it: the *floaters* play for blues now.', 'Attack the other way.', 'Same rule at the top: *one green* in their zone.'],
            tags: { F2: 'FLOATER' }, timing: { move: 3 },
            moves: [{ id: 'F2', to: [84, 58], end: 0.45 }],
            passes: [{ to: 'F2', start: 0.5, end: 0.85 }],
            halves: zones,
          },
        ],
        summary: ['Only *one defender* waits in the zone.', 'Ball goes in: they *delay*.', 'A team-mate makes a *fast recovery run*, towards goal.', '*Get set*, then deal with the attack.'],
      }),
    ],
  });
})();
