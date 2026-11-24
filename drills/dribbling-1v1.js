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
    summary: 'A ball each with cones as defenders, then turns at the outside cones, then 1 v 1 to a small goal. Receive into space, head up, a double movement to move the defender, then attack the space.',
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
        'Before this: Dribbling (Part 1). Next: 2 v 2, using other players to make dribbling chances.',
      ],
    },

    questions: [
      'Where did your first touch go? Was it into space?',
      'How did you make the defender move?',
      'Where was the space after they moved?',
      'When did you explode away?',
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
    ],
  });
})();
