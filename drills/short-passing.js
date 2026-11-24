/*
 * SESSION: Short Passing (Attacking · technical)
 * From the owner's own plan "Short Passing" (1st4sport L2 session sheet).
 *
 * Key factors: get in line of the pass; control out of your feet (ready to pass); head up; pick the right short pass;
 *   timing and weight of the pass (talk); move after the pass (to a free area).
 * 1. Tech (10 mins): two hexagons of cones side by side, sharing the middle line. 7 players stand on the sides.
 *    Pass to a team-mate, then move to a free side. Receive on the middle line: turn and pass into the other zone.
 *    Progress to one touch. (Set it up twice for bigger groups.)
 * 2. Skill (10 mins): same set-up, one defender per zone (can only defend their own zone): 5 v 2. Keep possession.
 *    Defender wins it: swap roles (defenders hold a bib and hand it over).
 * 3. Game (20 mins): 40 x 30 yds. 4 v 4 inside, 2 floaters play for the team with the ball (can't pass to each other),
 *    4 players on the outside play for the team with the ball: 10 v 4. 8 passes = a goal. Rotate: a team goes outside,
 *    the outside four come in.
 * Owner's extra points: body shape; back-foot control on the middle line; open up to the other zone.
 * Pitch units: x 0..100, y 0..75 (1 unit is about the same across and down).
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', F = '#9b6fe0', O = '#d4a017';

  // ---------- the two hexagons (points at the top, sharing an upright side: the middle line) ----------
  const R = 19, HW = R * Math.sqrt(3) / 2;        // corner distance and side distance from the centre
  const CL = [50 - HW, 38], CR = [50 + HW, 38];
  const rad = d => d * Math.PI / 180;
  const corner = (c, d) => [c[0] + R * Math.cos(rad(d)), c[1] + R * Math.sin(rad(d))];
  // where a player stands on a side: angle 0 = right side, 60 = bottom right, 120 = bottom left, 180 = left, 240 = top left, 300 = top right
  const side = (c, d, off = 3) => [+(c[0] + (HW + off) * Math.cos(rad(d))).toFixed(1), +(c[1] + (HW + off) * Math.sin(rad(d))).toFixed(1)];
  const MID = [50, 38];
  const hexEdges = (c, skip) => [-90, -30, 30, 90, 150, 210].map((d, i, a) => ({ a: corner(c, d), b: corner(c, a[(i + 1) % 6]) }))
    .filter((e, i) => i !== skip);
  const MIDLINE_A = corner(CL, -30), MIDLINE_B = corner(CL, 30);
  const hex = {
    plain: true, goals: [],
    edges: [...hexEdges(CL, 1), ...hexEdges(CR, 4), { a: MIDLINE_A, b: MIDLINE_B, dash: true }],
    dims: [{ a: [corner(CL, 150)[0], 70], b: [corner(CR, 30)[0], 70], label: 'about 20 yds' }],
    tagPlace: 'auto',
  };
  const midLabel = [{ a: MIDLINE_A, b: MIDLINE_B, label: 'MIDDLE LINE', labelAt: [50, 33] }];
  const midLine = [{ a: MIDLINE_A, b: MIDLINE_B }];
  const P = (id, team, xy, label) => Object.assign({ id, team, x: xy[0], y: xy[1] }, label ? { label } : {});

  // ---------- the game: 40 x 30 yards ----------
  const A = { x: 12, y: 8, w: 76, h: 57 };
  const game = {
    plain: true, goals: [],
    areas: [{ x: A.x, y: A.y, w: A.w, h: A.h }],
    dims: [{ a: [A.x, 3], b: [A.x + A.w, 3], label: '40 yds' }, { a: [5, A.y], b: [5, A.y + A.h], label: '30 yds' }],
    teamColors: { f: F, o: O },
    legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: F }, { label: 'Outside', color: O }],
    tagPlace: 'auto',
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'short-passing',
    title: 'Short Passing',
    subtitle: 'Pass, move, find a free side',
    type: 'Technical',
    category: 'attacking',
    topics: ['Passing'],
    squad: [7, 14],
    thumb: 'assets/thumbs/short-passing.jpg',
    summary: 'Pass and move around two hexagons of cones, then keep it 5 v 2, then a 10 v 4 overload game. Get in line, control it out of your feet, head up, the right weight, then move.',
    keyPhrase: 'Pass, then move',
    ages: { from: 12 },

    cards: [
      {
        title: 'On the ball',
        lead: 'Be *ready to pass* before the ball arrives.',
        columns: [
          { heading: 'Receive', items: ['*Get in line* of the pass', '*Open body shape*: see the ball and your pass', 'Control it *out of your feet*, on the *back foot*'] },
          { heading: 'Pass', items: ['*Head up*: see your pass', 'Pick the *right short pass*', '*Timing and weight*: talk to each other'] },
        ],
        phrase: { big: 'OPEN UP, BACK FOOT', small: 'Ready to pass with your next touch' },
      },
      {
        title: 'After the pass',
        lead: 'Your job isn\'t done when the ball leaves your foot.',
        columns: [
          { heading: 'Move', items: ['*Move* straight after you pass', 'Find a *free side* (free space)', 'Make a new *angle* to help'] },
          { heading: 'Overload', items: ['*Support*: be an easy pass', '*Create space* for each other', '*Decide*: first time or a touch?'] },
        ],
        phrase: { big: 'PASS, THEN MOVE', small: 'Find the free space' },
      },
    ],

    keywords: [
      { word: 'In line of the pass', meaning: 'Somewhere the ball can reach you, with no defender in the way.' },
      { word: 'Out of your feet', meaning: 'A first touch that sets the ball a little in front, ready to pass.' },
      { word: 'Weight of pass', meaning: 'How hard you pass it: firm enough to arrive, soft enough to control.' },
      { word: 'Body shape', meaning: 'How you stand to receive: open, so you can see the ball and where it goes next.' },
      { word: 'Back foot', meaning: 'The foot furthest from the ball. Control it there and you are already facing your next pass.' },
      { word: 'Free side', meaning: 'A side of the hexagon with nobody on it: the free space to move to.' },
      { word: 'Floater', meaning: 'A player who always plays for the team with the ball.' },
      { word: 'Overload', meaning: 'More of us than them, like 10 v 4.' },
    ],

    training: {
      area: 'Drills: two hexagons of cones side by side (sides about 6 yards), sharing the middle line. Game: 40 × 30 yards.',
      players: '7 per hexagon group (set it up twice for 14). Game: 4 v 4, two floaters and four outside players (14).',
      equipment: 'Cones, balls, bibs (four colours).',
      setup: [
        'Tech (10 minutes): seven players stand on the sides of the two hexagons. Pass to a team-mate, then move to a free side.',
        'If you receive on the middle line, turn and pass into the other zone. Open up to the other zone and control it on your back foot.',
        'Too easy? Make it one touch.',
        'Skill (10 minutes): same set-up, but one defender in each zone. Defenders can only defend their own zone. 5 v 2: attackers keep possession.',
        'Defender wins it: swap roles. Defenders hold a bib and hand it over.',
        'Game (20 minutes): 4 v 4 in a 40 × 30 yard area. Two floaters play for the team with the ball (they can\'t pass to each other).',
        'Four players on the outside also play for the team with the ball: 10 v 4. 8 passes in a row is a goal.',
        'Switch the teams round every few minutes: a team goes to the outside, the outside four come inside.',
      ],
    },

    questions: [
      'Where did you stand so the ball could reach you?',
      'How did you stand on the middle line? Could you see the other zone?',
      'Where did your first touch go? Were you ready to pass?',
      'When did you look up?',
      'Was the pass too hard, too soft or just right?',
      'Where did you move after your pass? Why there?',
    ],

    clips: [
      // ---------------- 1: pass and move ----------------
      (() => {
        const pos = {
          p1: side(CL, 240), p2: side(CR, 240), p3: side(CL, 180), p4: side(CR, 0),
          p5: side(CL, 60), p6: side(CR, 120), p7: side(CR, 60),
        };
        return Object.assign({}, hex, {
          id: 'pass-and-move',
          video: 'videos/short-passing-1.mp4',
          kicker: 'Clip 1 · Tech',
          title: 'Pass and Move',
          tagline: 'Pass to a team-mate, then move to a free side.',
          intro: ['Two *hexagons* of cones, 7 players on the sides.', 'Pass, then *move to a free side*.', 'Get it on the *middle line*? *Turn* and pass to the other zone.'],
          keyPhrase: { big: 'PASS, THEN MOVE', small: 'Find a free side' },
          legend: { a: 'Players' },
          players: Object.keys(pos).map(id => P(id, 'a', pos[id])),
          ball: { owner: 'p4' },
          steps: [
            {
              title: 'THE SET-UP',
              text: ['Two hexagons side by side.', 'Players stand on the *sides*.', 'Some sides are *free*, like the *middle line*.'],
              lines: midLabel,
            },
            {
              title: 'PASS AND MOVE',
              text: ['Pass to a team-mate...', '...then *move* to a *free side*.'],
              tags: { p4: 'MOVE' }, timing: { move: 3 },
              passes: [{ to: 'p2', start: 0.02, end: 0.4 }],
              moves: [{ id: 'p4', to: MID, start: 0.35, end: 0.95 }],
            },
            {
              title: 'OUT OF YOUR FEET',
              text: ['*Get in line* of the pass.', '*Open body shape*: see the ball and your pass.', 'Control it *out of your feet*, *head up*.'],
              tags: { p2: 'HEAD UP' }, timing: { move: 3 },
              passes: [{ to: 'p4', start: 0.1, end: 0.45 }],
              moves: [{ id: 'p2', to: side(CR, 300), start: 0.45, end: 0.95 }],
              lines: midLine,
            },
            {
              title: 'MIDDLE LINE: TURN',
              text: ['On the *middle line*: *open up* to the other zone.', 'Control on your *back foot*.', '*Turn* and pass into the *other zone*.'],
              tags: { p4: 'OPEN UP' }, timing: { move: 3.2 },
              passes: [{ to: 'p3', start: 0.12, end: 0.45 }],
              moves: [{ id: 'p4', to: side(CL, 300), start: 0.5, end: 0.95 }],
              lines: midLine,
            },
            {
              title: 'KEEP IT MOVING',
              text: ['Right *weight*: firm, but easy to control.', '*Talk*: call for it.', 'Pass, then *move*.'],
              tags: { p3: 'MOVE' }, timing: { move: 3 },
              passes: [{ to: 'p5', start: 0.02, end: 0.38 }],
              moves: [{ id: 'p3', to: side(CL, 120), start: 0.35, end: 0.95 }],
            },
            {
              title: 'TOO EASY? ONE TOUCH',
              text: ['Progress to *one touch*.', 'Know your pass *before* it arrives.'],
              tags: { p5: 'FIRST TIME', p6: 'FIRST TIME', p7: 'FIRST TIME' }, timing: { move: 3.2 },
              passes: [{ to: 'p6', start: 0.02, end: 0.28 }, { to: 'p7', start: 0.32, end: 0.58 }, { to: 'p2', start: 0.62, end: 0.92 }],
            },
          ],
          summary: ['*Get in line*, *open body shape*.', 'Control it *out of your feet*, *head up*.', 'Pass, then *move to a free side*.', 'Middle line: *open up*, *back foot*, play to the other zone.'],
        });
      })(),

      // ---------------- 2: 5 v 2 ----------------
      (() => {
        const pos = { a1: side(CL, 240), a2: side(CL, 180), a3: side(CL, 60), a4: side(CR, 0), a5: side(CR, 120) };
        return Object.assign({}, hex, {
          id: 'five-v-two',
          video: 'videos/short-passing-2.mp4',
          kicker: 'Clip 2 · Skill: 5 v 2',
          title: 'Keep It: 5 v 2',
          tagline: 'One defender in each zone. Move to stay in line of the pass.',
          intro: ['Same set-up, now *one defender in each zone*.', 'Defenders can only defend *their zone*.', '*5 v 2*: keep possession.'],
          keyPhrase: { big: 'GET IN LINE', small: 'Blocked? Move to a free side' },
          legend: { a: 'Attackers', d: 'Defenders' },
          players: [
            ...Object.keys(pos).map(id => P(id, 'a', pos[id])),
            P('dL', 'd', [36, 46]), P('dR', 'd', [71, 45]),
          ],
          ball: { owner: 'a4' },
          steps: [
            {
              title: 'THE SET-UP',
              text: ['*5 attackers* on the sides.', '*One defender* in each zone.', 'Defenders stay in *their own zone*.'],
              tags: { dL: 'DEFENDER', dR: 'DEFENDER' },
              lines: midLabel,
            },
            {
              title: 'BLOCKED? MOVE',
              text: ['The defender *blocks the pass*.', 'Move to a *free side*.', 'Get back *in line* of the pass.'],
              tags: { a5: 'IN LINE' }, timing: { move: 2.8 },
              lanes: [{ from: 'a4', to: 'a5', blocked: true }],
              moves: [{ id: 'a5', to: side(CR, 60), start: 0.1, end: 0.85 }],
            },
            {
              title: 'HEAD UP',
              text: ['Control it *out of your feet*.', '*Head up*: where is the free player?', 'Pass, then *move*.'],
              tags: { a5: 'HEAD UP', a3: 'MOVE' }, timing: { move: 3.2 },
              passes: [{ to: 'a5', start: 0.02, end: 0.35 }],
              moves: [
                { id: 'a3', to: MID, start: 0.1, end: 0.6 },
                { id: 'a4', to: side(CR, 300), start: 0.4, end: 0.95 },
                { id: 'dR', to: [73, 46], start: 0.2, end: 0.9, arrow: false },
              ],
              lines: midLine,
            },
            {
              title: 'MIDDLE LINE: TURN',
              text: ['Into the *middle line*: *open up* to the other zone.', '*Back foot* control, then play into the *other zone*.', 'The defender there is on their own.'],
              tags: { a3: 'BACK FOOT' }, timing: { move: 3.4 },
              passes: [{ to: 'a3', start: 0.02, end: 0.35 }, { to: 'a1', start: 0.5, end: 0.85 }],
              moves: [
                { id: 'dR', to: [64, 42], start: 0.1, end: 0.6, arrow: false },
                { id: 'dL', to: [33, 33], start: 0.55, end: 0.95, arrow: false },
              ],
              lines: midLine,
            },
            {
              title: 'TOO SOFT? LOST IT',
              text: ['A slow pass gives the defender time.', 'Get the *weight* right.'],
              tags: { dL: 'WON IT!' }, timing: { move: 2.8 },
              lanes: [{ from: 'a1', to: 'a2' }],
              moves: [
                { id: 'a3', to: side(CL, 120), start: 0.05, end: 0.6, arrow: false },
                { id: 'dL', to: [21, 32], start: 0.25, end: 0.7, ease: 'out' },
              ],
              ball: { pass: 'dL', start: 0.15, end: 0.7, arrow: false },
            },
            {
              title: 'SWAP ROLES',
              text: ['Defender wins it: *swap roles*.', 'Hand over the *bib*.', 'Straight back into it.'],
              tags: { a1: 'DEFENDER' }, timing: { move: 2.8 },
              team: { a1: 'd', dL: 'a' },
              moves: [
                { id: 'a1', to: [31, 33], start: 0.2, end: 0.9 },
                { id: 'dL', to: side(CL, 240), start: 0.2, end: 0.9 },
              ],
            },
          ],
          summary: ['Blocked? *Move* to a free side.', 'Control it *out of your feet*, *head up*.', 'Middle line: *open up*, *back foot*, switch zones.', 'Lose it? *Swap roles*: hand over the bib.'],
        });
      })(),

      // ---------------- 3: the game, 10 v 4 ----------------
      Object.assign({}, game, {
        id: 'game',
        video: 'videos/short-passing-3.mp4',
        kicker: 'Clip 3 · Game: 4 v 4 + 6',
        title: 'Overload: 10 v 4',
        tagline: 'Floaters and outside players help the team with the ball.',
        intro: ['*4 v 4* inside. *2 floaters* and *4 outside players*', 'play for the team with the ball: *10 v 4*.', '*8 passes* in a row = a *goal*.'],
        keyPhrase: { big: 'USE THE OVERLOAD', small: 'Head up, support, angles' },
        players: [
          { id: 'G1', team: 'a', x: 30, y: 24 }, { id: 'G2', team: 'a', x: 60, y: 20 },
          { id: 'G3', team: 'a', x: 32, y: 52 }, { id: 'G4', team: 'a', x: 66, y: 48 },
          { id: 'B1', team: 'd', x: 38, y: 30 }, { id: 'B2', team: 'd', x: 55, y: 28 },
          { id: 'B3', team: 'd', x: 40, y: 46 }, { id: 'B4', team: 'd', x: 62, y: 40 },
          { id: 'F1', team: 'f', label: 'F', x: 48, y: 17 }, { id: 'F2', team: 'f', label: 'F', x: 24, y: 38 },
          { id: 'O1', team: 'o', x: 35, y: A.y - 2.5 }, { id: 'O2', team: 'o', x: A.x + A.w + 3, y: 26 },
          { id: 'O3', team: 'o', x: 62, y: A.y + A.h + 2.5 }, { id: 'O4', team: 'o', x: A.x - 3, y: 48 },
        ],
        ball: { owner: 'G3' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4* inside, 40 × 30 yards.', '*2 floaters* inside, *4 players* on the outside.', 'They all play for the team *with the ball*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER', O1: 'OUTSIDE', O2: 'OUTSIDE', O3: 'OUTSIDE', O4: 'OUTSIDE' },
          },
          {
            title: '10 v 4',
            text: ['Greens have it: *10 v 4*.', '*8 passes* in a row = a *goal*.', 'Use the *outside*, *move* to make an angle.'],
            tags: { O4: 'OUTSIDE', G1: 'MOVE' }, timing: { move: 3.2 },
            passes: [{ to: 'O4', start: 0.02, end: 0.32 }, { to: 'G1', start: 0.62, end: 0.92 }],
            moves: [
              { id: 'G1', to: [22, 26], start: 0.15, end: 0.6 },
              { id: 'B3', to: [32, 44], start: 0.2, end: 0.9, arrow: false },
              { id: 'B1', to: [30, 31], start: 0.5, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'HEAD UP: FIND THE FREE PLAYER',
            text: ['*Head up* before it arrives.', 'Floater in space: play it in.', 'Floaters *can\'t pass to each other*.'],
            tags: { G1: 'HEAD UP', F1: 'FLOATER' }, timing: { move: 3.2 },
            passes: [{ to: 'F1', start: 0.05, end: 0.4 }, { to: 'G2', start: 0.6, end: 0.9 }],
            moves: [
              { id: 'F1', to: [44, 15], start: 0, end: 0.35 },
              { id: 'G2', to: [66, 17], start: 0.2, end: 0.6 },
              { id: 'B2', to: [58, 22], start: 0.4, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'FIRST TIME OR A TOUCH?',
            text: ['*Decide*: first time is quicker.', 'Pass, then *move* into space.'],
            tags: { O2: 'FIRST TIME', G2: 'MOVE' }, timing: { move: 3.2 },
            passes: [{ to: 'O2', start: 0.02, end: 0.3 }, { to: 'G4', start: 0.4, end: 0.7 }],
            moves: [
              { id: 'G2', to: [74, 28], start: 0.32, end: 0.9 },
              { id: 'G4', to: [72, 50], start: 0.1, end: 0.4 },
              { id: 'B4', to: [68, 44], start: 0.45, end: 0.95, arrow: false },
            ],
          },
          {
            title: 'WON IT!',
            text: ['A heavy touch: blues *win it*.'],
            tags: { B4: 'WON IT!' }, timing: { move: 2.2 },
            moves: [{ id: 'B4', to: [67, 46], start: 0, end: 0.6, ease: 'out' }],
            ball: { pass: 'B4', start: 0.45, end: 0.65, arrow: false },
          },
          {
            title: 'SWITCH: BLUES HAVE 10',
            text: ['Now the *floaters* and *outside* play for *blues*.', 'Blues have the *10 v 4*.', 'Greens: *win it back*.'],
            tags: { O3: 'OUTSIDE' }, timing: { move: 2.8 },
            passes: [{ to: 'O3', start: 0.05, end: 0.4 }],
            moves: [{ id: 'G4', to: [66, 56], start: 0.3, end: 0.9 }, { id: 'B3', to: [50, 55], start: 0.3, end: 0.9, arrow: false }],
          },
          {
            title: 'SWITCH THE TEAMS',
            text: ['Every few minutes, *rotate*.', 'Greens go to the *outside*.', 'The outside four come *inside*.'],
            tags: { O1: 'IN', O2: 'IN', O3: 'IN', O4: 'IN' }, timing: { move: 3.4 },
            moves: [
              { id: 'G1', to: [35, A.y - 2.5], end: 0.9 }, { id: 'G2', to: [A.x + A.w + 3, 26], end: 0.9 },
              { id: 'G4', to: [62, A.y + A.h + 2.5], end: 0.9 }, { id: 'G3', to: [A.x - 3, 48], end: 0.9 },
              { id: 'O1', to: [36, 18], end: 0.9 }, { id: 'O2', to: [76, 30], end: 0.9 },
              { id: 'O3', to: [58, 55], end: 0.9 }, { id: 'O4', to: [24, 50], end: 0.9 },
            ],
          },
        ],
        summary: ['Use the *overload*: 10 v 4. *8 passes* = a goal.', '*Head up*: find the free player.', '*Support* and *angles*: move after you pass.', '*Rotate* the teams: outside comes in.'],
      }),
    ],
  });
})();
