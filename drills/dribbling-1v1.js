/*
 * SESSION (DRAFT): Dribbling: 1 v 1 (Attacking · dribbling)
 * From the owner's own plan ("Dribbling - Part 2"). Follows Dribbling (Part 1); next is 2 v 2.
 * draft: true keeps it off the site until approved (index.html?drafts#dribbling-1v1).
 *
 * Warm up: 35 x 35 yard square, a ball each, cones inside (passive defenders) and 6 outside.
 *   Dribble, head up, beat a cone with a trick and explode away into space.
 * Progression: dribble out to a cone outside the square, a turn, then dribble back in.
 * 1 v 1: an area 10 yards wide, a small goal at the defender's end. The defender passes to the attacker,
 *   who receives into space and tries to beat them. Double movement: make the defender move away from the space, then attack it.
 *   Queues at each end; after a go, each player joins the other end's queue (roles swap).
 * Pitch units: x 0..100, y 0..75 (1 unit is about the same across and down).
 */
(function () {
  const G = '#2fbf7f';
  const ORANGE = '#d9622b';

  // ---------- warm up: the square ----------
  const SQ = { x: 22, y: 9.5, w: 56, h: 56 };
  const INSIDE = [[36, 22], [58, 20], [46, 36], [66, 40], [34, 50], [56, 54]];
  const OUTSIDE = [[14, 24], [14, 52], [86, 24], [86, 52], [34, 4.5], [66, 71]];
  const warm = {
    plain: true, goals: [],
    areas: [{ x: SQ.x, y: SQ.y, w: SQ.w, h: SQ.h }],
    dims: [{ a: [SQ.x, 4], b: [SQ.x + SQ.w, 4], label: '35 yds' }],
    cones: INSIDE.map(at => ({ at, color: ORANGE })).concat(OUTSIDE.map(at => ({ at }))),
    teamColors: { a: G },
    facing: { a: 1 },
    tagPlace: 'auto',
    legendTeams: [{ label: 'Players', color: G }],
  };
  // a ball each: start spots
  const S0 = [[28, 14], [48, 13], [70, 15], [28, 34], [58, 28], [74, 30], [46, 45], [70, 52], [26, 60], [46, 62]];
  const ids = S0.map((_, i) => 'p' + (i + 1));
  const warmPlayers = ids.map((id, i) => ({ id, team: 'a', x: S0[i][0], y: S0[i][1], ball: true }));
  const drift = (id, to, o) => Object.assign({ id, to, end: 0.95, arrow: false }, o || {});

  // ---------- 1 v 1 ----------
  const BOX = { x: 32, y: 8, w: 36, h: 54 };
  const GOAL = [50, 62];
  const one = {
    plain: true, goals: [],
    areas: [{ x: BOX.x, y: BOX.y, w: BOX.w, h: BOX.h, fill: 'rgba(240,205,110,0.10)' }],
    miniGoals: [{ at: GOAL, angle: 180 }],
    dims: [{ a: [BOX.x, 4], b: [BOX.x + BOX.w, 4], label: '10 yds' }],
    legend: { a: 'Attacker', d: 'Defender' },
    tagPlace: 'auto',
  };
  const SPACE = { x: 53, y: 34, w: 15, h: 22, color: ORANGE, label: 'THE SPACE', labelAt: [60.5, 31.5], soft: true };

  // ---------- progressions: 2 v 1 and 2 v 2 (small goal at the bottom) ----------
  const twoArea = (w, label) => ({
    plain: true, goals: [],
    areas: [{ x: 50 - w / 2, y: 8, w, h: 60, fill: 'rgba(240,205,110,0.10)' }],
    miniGoals: [{ at: [50, 68], angle: 180 }],
    dims: [{ a: [50 - w / 2, 4], b: [50 + w / 2, 4], label }],
    legend: { a: 'Attackers', d: 'Defenders' },
    tagPlace: 'auto',
  });

  const zone = (x, w, lx) => ({ x, y: 38, w, h: 22, color: ORANGE, label: 'THE SPACE', labelAt: [lx, 62.5], soft: true });
  const ZONE_L = zone(37, 10, 42), ZONE_R = zone(53, 10, 58);   // 2 v 1 (area x 37..63)
  const ZONE_2R = zone(56, 13.5, 62.75);                           // 2 v 2 (area x 30.5..69.5)

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'dribbling-1v1',
    draft: true,
    title: 'Dribbling: 1 v 1',
    subtitle: 'Double movements: move the defender, attack the space',
    type: 'Technical',
    category: 'attacking',
    topics: ['Dribbling', 'Warm-ups'],
    squad: [10, 12],
    thumb: 'assets/thumbs/dribbling-1v1.jpg',
    summary: 'A ball each with cones as defenders, then turns at the outside cones, then 1 v 1 to a small goal, then 2 v 1 and 2 v 2. Receive into space, head up, move the defender (with a double movement or a run off the ball), then attack the space.',
    keyPhrase: 'Move the defender, attack the space',
    ages: { from: 11 },

    cards: [
      {
        title: 'Key factors',
        lead: 'Be *positive* and *confident*: want the ball, want to go past them.',
        columns: [
          { heading: 'Get ready', items: ['Receive *out of your feet*, into space', '*Head up*: where is the space?'] },
          { heading: 'Go past', items: ['*Double movement*: move the defender away from the space', '*Change of direction* and *pace*', '*Explode* away from the defender'] },
        ],
        phrase: { big: 'MOVE THE DEFENDER, ATTACK THE SPACE', small: 'Be positive, be confident' },
      },
      {
        title: 'Make it easier or harder',
        columns: [
          { heading: 'Easier', items: ['Make the area *bigger*', 'Defender starts further back'] },
          { heading: 'Harder', items: ['Make the area *smaller* (close the space)', 'Defender starts closer'] },
        ],
      },
    ],

    keywords: [
      { word: 'Double movement', meaning: 'Show the defender one way, so they move, then go the other way into the space they left.' },
      { word: 'Out of your feet', meaning: 'A first touch that pushes the ball into space, so you can run with it straight away.' },
      { word: 'Passive defender', meaning: 'A cone or player in your way that doesn\'t try to win the ball. You still have to get past it.' },
      { word: 'Explode', meaning: 'A sudden burst of speed away from the defender after your trick.' },
    ],

    training: {
      area: 'Warm up: a 35 × 35 yard square. 1 v 1: areas about 10 yards wide and 15 long, a small goal at one end.',
      players: '10: a ball each for the warm up, then a queue at each end of the 1 v 1 area (more areas for more players).',
      equipment: 'A ball each, cones for the square, cones inside and 6 outside, small goals (or two cones), bibs.',
      setup: [
        'Quick explanation first (2 minutes): receive out of your feet, head up, change of direction and pace, explode away. Be positive.',
        'Warm up (8 minutes): a ball each in the square. Cones inside are passive defenders. Head up, dribble into space, beat a cone with a trick and explode away.',
        'Progression (8 minutes): dribble out to a cone outside the square, a turn, then dribble back in.',
        '1 v 1 (20 minutes): a queue at each end. Defenders by the small goal with the balls, attackers at the far end. The next defender passes to the next attacker.',
        'The attacker receives into space and tries to beat the defender and score in the small goal. Look for where the space is.',
        'Double movement: show the defender one way so they move, then attack the space they left.',
        'After a go, both join the queue at the other end, so the attacker becomes a defender and the defender becomes an attacker. Next two in.',
        'Progression, 2 v 1 (10 minutes): an area 10 × 25 yards with a small goal. Queues at each end, with more attackers than defenders. The defender passes in to two attackers.',
        'The player on the ball must take the defender on. The other attacker makes a run. If the defender follows the run, it was a decoy: dribble into the space. If the defender stays, pass to the free player.',
        'Back to the end of your queue after each go; next group in. Swap jobs every few goes.',
        'Progression, 2 v 2 (20 minutes): an area 15 × 25 yards with a small goal. A run off the ball takes a defender away and isolates the other one. Feint towards the run, then attack the space away from it (don\'t dribble towards the run: you close your own space and meet two defenders).',
        'Then the underlap: the free player runs inside the dribbler. Both defenders press you? Pass to the runner. Both follow the runner? Dribble. Passing is allowed, but the focus is dribbling.',
        'Before this: Dribbling (Part 1).',
      ],
    },

    questions: [
      'Where did your first touch go? Was it into space?',
      'How did you make the defender move?',
      'Where was the space after they moved?',
      'When did you explode away?',
      'Without the ball, how did your run help your team-mate?',
    ],

    clips: [
      // ---------------- warm up ----------------
      Object.assign({}, warm, {
        id: 'warm-up',
        video: 'videos/dribbling-1v1-1.mp4',
        kicker: 'Warm up · A ball each',
        title: 'Beat the Cone',
        tagline: 'Head up, dribble into space, a trick past a cone, explode away.',
        intro: ['A ball each in the square.', '*Cones* are passive defenders.', 'Beat a cone with a *trick*, then *explode* away.'],
        players: warmPlayers,
        keyPhrase: { big: 'TRICK, THEN EXPLODE', small: 'Head up, into space' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A *35 yard* square, a ball each.', '*Cones* inside are defenders.'],
          },
          {
            title: 'HEAD UP, FIND SPACE',
            text: ['Dribble with your *head up*.', 'Go where the *space* is.'],
            tags: { p1: 'HEAD UP', p8: 'INTO SPACE' }, timing: { move: 3 },
            moves: [
              drift('p1', [32, 18], { arrow: true }), drift('p2', [52, 12]), drift('p3', [72, 20]), drift('p4', [28, 41]),
              drift('p5', [60, 26]), drift('p6', [76, 34]), drift('p7', [48, 42]), drift('p8', [68, 60], { arrow: true }),
              drift('p9', [34, 60]), drift('p10', [48, 58]),
            ],
          },
          {
            title: 'BEAT THE CONE',
            text: ['Dribble *at* a cone.', 'A *trick*: change of direction...', '...then *explode* away into space.'],
            tags: { p5: 'STEP OVER', p7: 'EXPLODE' }, timing: { move: 3.4 },
            moves: [
              { id: 'p5', path: [[59, 24], [64, 20], [68, 12]], end: 0.95 },
              { id: 'p7', path: [[47, 39.5], [42, 39], [51, 32], [56, 31]], end: 0.95 },
              drift('p1', [28, 26]), drift('p2', [42, 13]), drift('p3', [76, 22]), drift('p4', [27, 46]),
              drift('p6', [76, 46]), drift('p8', [72, 61]), drift('p9', [40, 61]), drift('p10', [61, 46]),
            ],
          },
          {
            title: 'EVERY CONE A DEFENDER',
            text: ['Find the *next* cone.', 'A different trick each time.', '*Be positive*: want to go past.'],
            tags: { p1: 'SHOULDER DROP', p10: 'CHANGE OF PACE' }, timing: { move: 3.4 },
            moves: [
              { id: 'p1', path: [[32, 24], [36, 27], [44, 27]], end: 0.95 },
              { id: 'p10', path: [[63, 43], [60, 40], [60, 34]], end: 0.95 },
              drift('p5', [72, 14]), drift('p7', [56, 15]), drift('p2', [30, 14]), drift('p3', [74, 30]),
              drift('p4', [28, 54]), drift('p6', [72, 52]), drift('p8', [62, 62]), drift('p9', [44, 56]),
            ],
          },
        ],
        summary: ['*Head up*: find the space.', 'A *trick* past the cone.', '*Explode* away into space.'],
      }),

      // ---------------- progression: turns ----------------
      Object.assign({}, warm, {
        id: 'turn-and-back-in',
        video: 'videos/dribbling-1v1-2.mp4',
        kicker: 'Warm up · Progression',
        title: 'Turn and Back In',
        tagline: 'Out to a cone outside the square, a turn, back in.',
        intro: ['Same set-up.', 'Dribble out to a cone *outside* the square.', 'A *turn*, then dribble *back in*.'],
        players: warmPlayers,
        keyPhrase: { big: 'TURN, THEN GO', small: 'Change of direction, change of pace' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Same square, a ball each.', '*6 cones* outside the square.'],
          },
          {
            title: 'OUT TO A CONE',
            text: ['*Head up*: pick a cone outside.', 'Dribble out to it.'],
            tags: { p4: 'HEAD UP', p8: 'HEAD UP', p10: 'HEAD UP' }, timing: { move: 3 },
            moves: [
              { id: 'p4', to: [18, 28], end: 0.95 }, { id: 'p8', to: [82, 51], end: 0.95 }, { id: 'p10', to: [62, 68], end: 0.95 },
              drift('p1', [32, 16]), drift('p2', [52, 14]), drift('p3', [70, 22]), drift('p5', [52, 28]),
              drift('p6', [74, 36]), drift('p7', [40, 42]), drift('p9', [30, 58]),
            ],
          },
          {
            title: 'TURN',
            text: ['A *turn* at the cone.', '*Drag back* with the sole...', '...or a hook with the *inside of the foot* (big toe).'],
            tags: { p4: 'TURN', p8: 'TURN', p10: 'TURN' }, timing: { move: 2.6 },
            moves: [
              { id: 'p4', path: [[15.5, 29], [19, 31]], end: 0.9 },
              { id: 'p8', path: [[84.5, 55], [81, 56]], end: 0.9 },
              { id: 'p10', path: [[66, 67.5], [62, 66]], end: 0.9 },
              drift('p1', [40, 15]), drift('p2', [62, 12]), drift('p3', [72, 30]), drift('p5', [50, 24]),
              drift('p6', [76, 44]), drift('p7', [38, 36]), drift('p9', [26, 54]),
            ],
          },
          {
            title: 'BACK IN',
            text: ['*Change of pace* back into the square.', 'Head up: go into *space*.'],
            tags: { p4: 'CHANGE OF PACE', p8: 'CHANGE OF PACE', p10: 'CHANGE OF PACE' }, timing: { move: 3 },
            moves: [
              { id: 'p4', to: [30, 30], end: 0.9 }, { id: 'p8', to: [70, 47], end: 0.9 }, { id: 'p10', to: [46, 58], end: 0.9 },
              drift('p1', [50, 14]), drift('p2', [68, 14]), drift('p3', [74, 22]), drift('p5', [52, 44]),
              drift('p6', [64, 30]), drift('p7', [44, 22]), drift('p9', [28, 46]),
            ],
          },
        ],
        summary: ['Out to a cone with your *head up*.', 'A *turn*: drag back or hook.', '*Change of pace* back into space.'],
      }),

      // ---------------- 1 v 1 with a double movement ----------------
      Object.assign({}, one, {
        id: 'one-v-one',
        video: 'videos/dribbling-1v1-3.mp4',
        kicker: '1 v 1 · Double movement',
        title: 'Beat Your Defender',
        tagline: 'Move the defender away from the space, then attack it.',
        intro: ['The *defender* passes to the attacker.', '*Double movement*: make the defender move...', '...then *attack the space* and score.'],
        players: [
          { id: 'A', team: 'a', x: 36, y: 12 }, { id: 'D', team: 'd', x: 64, y: 59 },
          { id: 'qa1', team: 'a', x: 26, y: 12 }, { id: 'qa2', team: 'a', x: 20, y: 12 },
          { id: 'qd1', team: 'd', x: 74, y: 59, ball: true }, { id: 'qd2', team: 'd', x: 80, y: 59, ball: true },
        ],
        ball: { owner: 'D' },
        keyPhrase: { big: 'MOVE THE DEFENDER, ATTACK THE SPACE', small: 'Be positive, be confident' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['An area *10 yards* wide, a *small goal*.', 'A queue at *each end*.', 'The defenders have the balls.'],
            tags: { A: 'ATTACKER', D: 'DEFENDER' },
          },
          {
            title: 'RECEIVE INTO SPACE',
            text: ['The defender *passes in*, then closes down.', 'First touch *out of your feet*, into space.'],
            tags: { A: 'INTO SPACE', D: 'CLOSE DOWN' }, timing: { move: 3.4 },
            passes: [{ to: 'A', start: 0.02, end: 0.38 }],
            moves: [
              { id: 'A', to: [44, 20], start: 0.4, end: 0.95 },
              { id: 'D', to: [54, 44], start: 0.3, end: 0.95, ease: 'out' },
            ],
          },
          {
            title: 'HEAD UP, GO AT THEM',
            text: ['*Head up*: where is the space?', 'Dribble *at* the defender.'],
            tags: { A: 'FACE UP' }, timing: { move: 2.6 },
            moves: [{ id: 'A', to: [50, 32], end: 0.9 }, { id: 'D', to: [50, 44], end: 0.9, ease: 'out' }],
          },
          {
            title: 'DOUBLE MOVEMENT',
            text: ['*Show them one way*: drop your shoulder.', 'The defender *moves* with you...', '...and the *space* opens on the other side.'],
            tags: { A: 'DOUBLE MOVE', D: 'SHIFT' }, timing: { move: 3 },
            moves: [
              { id: 'A', path: [[45, 33], [49, 33]], end: 0.75 },
              { id: 'D', to: [45, 44], start: 0.25, end: 0.8 },
            ],
            halves: [SPACE],
          },
          {
            title: 'ATTACK THE SPACE',
            text: ['Now go the *other way*.', '*Explode* into the space they left.'],
            tags: { A: 'ATTACK THE SPACE' }, timing: { move: 3 },
            moves: [
              { id: 'A', path: [[55, 36], [61, 43], [61, 53]], end: 0.95 },
              { id: 'D', to: [50, 50], start: 0.3, end: 0.9, arrow: false },
            ],
            halves: [SPACE],
          },
          {
            title: 'SCORE',
            text: ['*Score* in the small goal.', '*Be positive*: want to go past them.'],
            tags: { A: 'SCORE' }, timing: { move: 2.2 },
            ball: { to: [51, 61], start: 0.05, end: 0.5 },
          },
          {
            title: 'SWAP ENDS',
            text: ['Join the queue at the *other end*.', 'Attacker becomes a *defender*, and the other way round.', 'Next two in.'],
            tags: { A: 'DEFENDER', D: 'ATTACKER' }, timing: { move: 3.4 },
            team: { A: 'd', D: 'a' },
            ball: { give: 'qd1' },
            moves: [
              { id: 'A', path: [[62, 67], [86, 67], [86, 59]], end: 0.95 },
              { id: 'D', path: [[40, 34], [24, 20], [24, 12]], end: 0.95 },
              { id: 'qa1', to: [36, 12], start: 0.2, end: 0.8 }, { id: 'qa2', to: [30, 12], start: 0.3, end: 0.9, arrow: false },
              { id: 'qd1', to: [64, 59], start: 0.2, end: 0.8 }, { id: 'qd2', to: [74, 59], start: 0.3, end: 0.9, arrow: false },
            ],
          },
        ],
        summary: ['Receive *into space*, *head up*.', '*Double movement*: make them move.', '*Attack the space*, then swap ends.'],
      }),
      // ---------------- progression: 2 v 1 (queues, two examples) ----------------
      Object.assign({}, twoArea(26, '10 yds'), {
        id: 'two-v-one',
        video: 'videos/dribbling-1v1-4.mp4',
        kicker: '2 v 1 · Queues at each end',
        title: 'Decoy or Spare Player',
        tagline: 'The run off the ball: a decoy, or the player who uses the space.',
        intro: ['*2 v 1*: the defender passes in.', 'Defender *follows the run*? It was a *decoy*: dribble past.', 'Defender *stays*? *Pass* to the free player.'],
        players: [
          { id: 'A1', team: 'a', x: 43, y: 13 }, { id: 'A2', team: 'a', x: 57, y: 13 }, { id: 'D', team: 'd', x: 57, y: 64 },
          { id: 'qa1', team: 'a', x: 31, y: 12 }, { id: 'qa2', team: 'a', x: 31, y: 18 },
          { id: 'qa3', team: 'a', x: 31, y: 24 }, { id: 'qa4', team: 'a', x: 31, y: 30 },
          { id: 'qd1', team: 'd', x: 69, y: 64, ball: true }, { id: 'qd2', team: 'd', x: 75, y: 64, ball: true },
        ],
        ball: { owner: 'D' },
        keyPhrase: { big: 'WATCH THE DEFENDER', small: 'Follows the run? Dribble. Stays? Pass.' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['An area *10 × 25* yards, a *small goal*.', '*More attackers* than defenders in the queues.', 'Attackers come in *two at a time*.'],
            tags: { A1: 'ATTACKER', A2: 'ATTACKER', D: 'DEFENDER' },
          },
          {
            title: 'PASS IN',
            text: ['The defender *passes in*, then closes down.', 'First touch *into space*, head up.'],
            tags: { A1: 'INTO SPACE', D: 'CLOSE DOWN' }, timing: { move: 3.2 },
            passes: [{ to: 'A1', start: 0.02, end: 0.36 }],
            moves: [
              { id: 'A1', to: [44, 21], start: 0.38, end: 0.95 },
              { id: 'D', to: [50, 44], start: 0.3, end: 0.95, ease: 'out' },
              { id: 'A2', to: [57, 20], start: 0.3, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'A RUN TO DRAG THEM',
            text: ['Off the ball: make a *run*.', 'The defender *follows* it...', '...so the run was a *decoy*.'],
            tags: { A2: 'DECOY', D: 'FOLLOWS' }, timing: { move: 3 },
            moves: [
              { id: 'A2', path: [[60, 32], [60, 52]], end: 0.85 },
              { id: 'D', to: [53, 45], start: 0.35, end: 0.9 },
              { id: 'A1', to: [44, 31], end: 0.8, arrow: false },
            ],
            halves: [ZONE_L],
          },
          {
            title: 'DRIBBLE INTO THE SPACE',
            text: ['The space is *yours*.', '*Change of pace*: explode into it.'],
            tags: { A1: 'ATTACK THE SPACE' }, timing: { move: 2.8 },
            moves: [
              { id: 'A1', path: [[41, 42], [43, 54]], end: 0.95 },
              { id: 'D', to: [51, 52], start: 0.3, end: 0.9, arrow: false },
              { id: 'A2', to: [60, 58], end: 0.9, arrow: false },
            ],
            halves: [ZONE_L],
          },
          {
            title: 'SCORE',
            text: ['*Score* in the small goal.'],
            tags: { A1: 'SCORE' }, timing: { move: 1.8 },
            ball: { to: [50, 67.5], start: 0.05, end: 0.5 },
          },
          {
            title: 'NEXT GROUP IN',
            text: ['Back to the *end of your queue*.', 'Next *two attackers* and next *defender* in.', 'Swap jobs every few goes.'],
            timing: { move: 3.4 },
            ball: { give: 'qd1' },
            moves: [
              { id: 'qa1', to: [43, 13], start: 0.05, end: 0.5 }, { id: 'qa2', to: [57, 13], start: 0.05, end: 0.5 },
              { id: 'qa3', to: [31, 12], start: 0.1, end: 0.5, arrow: false }, { id: 'qa4', to: [31, 18], start: 0.1, end: 0.5, arrow: false },
              { id: 'A1', path: [[34, 44], [31, 24]], start: 0.35, end: 0.95, arrow: false },
              { id: 'A2', path: [[60, 42], [40, 31], [31, 30]], start: 0.35, end: 0.95, arrow: false },
              { id: 'qd1', to: [57, 64], start: 0.05, end: 0.5 }, { id: 'qd2', to: [69, 64], start: 0.1, end: 0.5, arrow: false },
              { id: 'D', path: [[58, 71], [75, 71], [75, 64]], start: 0.3, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'PASS IN AGAIN',
            text: ['Same start: pass in, *first touch into space*.'],
            tags: { qa1: 'INTO SPACE', qd1: 'CLOSE DOWN' }, timing: { move: 3.2 },
            passes: [{ to: 'qa1', start: 0.02, end: 0.36 }],
            moves: [
              { id: 'qa1', to: [44, 21], start: 0.38, end: 0.95 },
              { id: 'qd1', to: [50, 44], start: 0.3, end: 0.95, ease: 'out' },
              { id: 'qa2', to: [57, 20], start: 0.3, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'THIS TIME THEY STAY',
            text: ['Same run, but the defender *stays* on the ball.', 'Now the runner is *free*.'],
            tags: { qa2: 'FREE MAN', qd1: 'STAYS' }, timing: { move: 3 },
            moves: [
              { id: 'qa2', path: [[60, 32], [60, 46]], end: 0.85 },
              { id: 'qd1', to: [45, 38], start: 0.3, end: 0.9, ease: 'out' },
              { id: 'qa1', to: [45, 29], end: 0.8, arrow: false },
            ],
            halves: [ZONE_R],
          },
          {
            title: 'USE THE SPARE PLAYER',
            text: ['*Pass* to the free player...', '...who takes it *into the space*.'],
            tags: { qa2: 'ATTACK THE SPACE' }, timing: { move: 3 },
            passes: [{ to: 'qa2', start: 0.02, end: 0.35 }],
            moves: [
              { id: 'qa2', to: [57, 56], start: 0.38, end: 0.95 },
              { id: 'qd1', to: [50, 50], start: 0.3, end: 0.95, arrow: false },
            ],
            halves: [ZONE_R],
          },
          {
            title: 'SCORE',
            text: ['*Score* in the small goal.', 'Watch the defender: *dribble or pass*.'],
            tags: { qa2: 'SCORE' }, timing: { move: 1.8 },
            ball: { to: [50, 67.5], start: 0.05, end: 0.5 },
          },
        ],
        summary: ['Defender *follows the run*: it\'s a *decoy*, dribble.', 'Defender *stays*: pass to the *spare player*.', 'Watch the defender, then decide.'],
      }),

      // ---------------- progression: 2 v 2, isolate ----------------
      Object.assign({}, twoArea(39, '15 yds'), {
        id: 'two-v-two',
        video: 'videos/dribbling-1v1-5.mp4',
        kicker: '2 v 2 · Run away from the ball',
        title: 'Isolate the Defender',
        tagline: 'Feint towards the run, then attack away from it.',
        intro: ['*2 v 2*: use the player *off the ball*.', 'Their run takes a defender away: the other is *isolated*.', 'Show them towards the run, then attack the space *away from it*.'],
        players: [
          { id: 'A1', team: 'a', x: 57, y: 15 }, { id: 'A2', team: 'a', x: 42, y: 15 },
          { id: 'D1', team: 'd', x: 56, y: 34 }, { id: 'D2', team: 'd', x: 41, y: 40 },
        ],
        ball: { owner: 'A1' },
        keyPhrase: { big: 'ISOLATE, THEN BEAT THEM', small: 'Attack away from the run' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['An area *15 × 25* yards, a *small goal*.', '*2 v 2*. You can pass, but the focus is *dribbling*.'],
            tags: { A1: 'ATTACKER', A2: 'ATTACKER', D1: 'DEFENDER', D2: 'DEFENDER' },
          },
          {
            title: 'RUN OFF THE BALL',
            text: ['Off the ball: a *curved run* round the outside.', 'Their defender has to *go with them*.'],
            tags: { A2: 'RUN', D2: 'FOLLOWS' }, timing: { move: 3.4 },
            moves: [
              { id: 'A2', path: [[35, 24], [33, 40], [34, 58]], end: 0.95 },
              { id: 'D2', to: [40, 55], start: 0.3, end: 0.95 },
              { id: 'A1', to: [56, 24], end: 0.9, arrow: false },
              { id: 'D1', to: [56, 40], end: 0.9, arrow: false },
            ],
          },
          {
            title: 'SHOW THEM THAT WAY',
            text: ['Don\'t dribble *towards* the run.', 'You\'d close your own space, and meet *two defenders*.', 'Instead, *feint* that way: the defender shifts.'],
            tags: { A1: 'DOUBLE MOVE', D1: 'ISOLATED' }, timing: { move: 3 },
            moves: [
              { id: 'A1', path: [[54, 30], [51, 32]], end: 0.75 },
              { id: 'D1', to: [51, 44], start: 0.3, end: 0.85 },
            ],
            halves: [ZONE_2R],
          },
          {
            title: 'ATTACK AWAY FROM THE RUN',
            text: ['Now go the *other way*...', '...into the space *away from the run*.', '*Change of pace*: explode.'],
            tags: { A1: 'ATTACK THE SPACE' }, timing: { move: 3 },
            moves: [
              { id: 'A1', path: [[57, 34], [62, 44], [61, 55]], end: 0.95 },
              { id: 'D1', to: [55, 50], start: 0.3, end: 0.9, arrow: false },
            ],
            halves: [ZONE_2R],
          },
          {
            title: 'SCORE',
            text: ['*Score* in the small goal.'],
            tags: { A1: 'SCORE' }, timing: { move: 1.8 },
            ball: { to: [50.5, 67.5], start: 0.05, end: 0.5 },
          },
        ],
        summary: ['A *run off the ball* takes a defender away.', '*Feint* towards the run: don\'t go that way.', 'Attack the space *away from it*.'],
      }),

      // ---------------- progression: 2 v 2, underlap ----------------
      Object.assign({}, twoArea(39, '15 yds'), {
        id: 'underlap',
        video: 'videos/dribbling-1v1-6.mp4',
        kicker: '2 v 2 · The underlap',
        title: 'The Underlap',
        tagline: 'A run inside confuses the defenders. Then pass or dribble.',
        intro: ['The free player *underlaps*: runs *inside* the dribbler.', 'Both defenders *press you*? *Pass* to the runner.', 'Both *follow the runner*? *Dribble*.'],
        players: [
          { id: 'A1', team: 'a', x: 61, y: 20 }, { id: 'A2', team: 'a', x: 48, y: 13 },
          { id: 'D1', team: 'd', x: 60, y: 36 }, { id: 'D2', team: 'd', x: 44, y: 36 },
        ],
        ball: { owner: 'A1' },
        keyPhrase: { big: 'PRESSED? PASS. FREE? DRIBBLE.', small: 'Watch what the defenders do' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*2 v 2*, a *small goal*.', 'The dribbler is *wide*, the free player *inside*.'],
            tags: { A1: 'ATTACKER', A2: 'ATTACKER', D1: 'DEFENDER', D2: 'DEFENDER' },
          },
          {
            title: 'THE UNDERLAP',
            text: ['The free player runs *inside* the dribbler.', 'The defenders are *confused*: who goes with them?'],
            tags: { A2: 'UNDERLAP' }, timing: { move: 3.2 },
            moves: [
              { id: 'A2', path: [[52, 22], [53, 34], [52, 48]], end: 0.95 },
              { id: 'A1', to: [61, 27], end: 0.9, arrow: false },
            ],
          },
          {
            title: 'BOTH PRESS YOU: PASS',
            text: ['Both defenders *press the dribbler*.', 'The runner is *free*: *pass*.'],
            tags: { D1: 'PRESS', D2: 'PRESS', A2: 'FREE MAN' }, timing: { move: 3.2 },
            moves: [
              { id: 'D1', to: [63, 33], end: 0.5, ease: 'out' }, { id: 'D2', to: [55, 30], end: 0.5, ease: 'out' },
              { id: 'A2', to: [51, 56], start: 0.82, end: 1 },
            ],
            passes: [{ to: 'A2', start: 0.5, end: 0.8 }],
          },
          {
            title: 'SCORE',
            text: ['*Score* in the small goal.'],
            tags: { A2: 'SCORE' }, timing: { move: 1.8 },
            ball: { to: [50, 67.5], start: 0.05, end: 0.5 },
          },
          {
            title: 'GO AGAIN',
            text: ['Back to the start.', 'Same *underlap*: watch the defenders.'],
            timing: { move: 2.4 },
            ball: { give: 'A1' },
            moves: [
              { id: 'A1', to: [61, 20], end: 0.9, arrow: false }, { id: 'A2', to: [48, 13], end: 0.9, arrow: false },
              { id: 'D1', to: [60, 36], end: 0.9, arrow: false }, { id: 'D2', to: [44, 36], end: 0.9, arrow: false },
            ],
          },
          {
            title: 'THE UNDERLAP',
            text: ['The free player runs *inside* again.'],
            tags: { A2: 'UNDERLAP' }, timing: { move: 3.2 },
            moves: [
              { id: 'A2', path: [[52, 22], [53, 34], [52, 48]], end: 0.95 },
              { id: 'A1', to: [61, 27], end: 0.9, arrow: false },
            ],
          },
          {
            title: 'BOTH FOLLOW THE RUN: DRIBBLE',
            text: ['This time *both defenders* follow the runner.', 'Space down the *outside*: *dribble*.', '*Change of pace*, away from the run.'],
            tags: { D1: 'FOLLOWS', D2: 'FOLLOWS', A1: 'ATTACK THE SPACE' }, timing: { move: 3.4 },
            moves: [
              { id: 'D1', to: [55, 50], end: 0.55 }, { id: 'D2', to: [45, 52], end: 0.55 },
              { id: 'A2', to: [50, 58], end: 0.6, arrow: false },
              { id: 'A1', path: [[64, 36], [65, 48], [61, 57]], start: 0.35, end: 0.98 },
            ],
            halves: [{ x: 61, y: 32, w: 8.5, h: 24, color: ORANGE, label: 'THE SPACE', labelAt: [65, 62.5], soft: true }],
          },
          {
            title: 'SCORE',
            text: ['*Score* in the small goal.', 'Pressed? *Pass*. Free? *Dribble*.'],
            tags: { A1: 'SCORE' }, timing: { move: 1.8 },
            ball: { to: [50.5, 67.5], start: 0.05, end: 0.5 },
          },
        ],
        summary: ['The free player *underlaps*: confusion.', 'Both press you: *pass* to the runner.', 'Both follow the runner: *dribble*.'],
      }),
    ],
  });
})();
