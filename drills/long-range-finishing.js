/*
 * SESSION: Long Range Finishing (Attacking · technical) (DRAFT)
 * From the owner's own plan "Long Range Finishing" (1st4sport L2 session sheet).
 *
 * Key factors: positive attitude; select the right shooting technique (first time or not); execute the strike correctly;
 *   head up, assess the keeper's position (and defenders later); accuracy: hit the target, follow up; communication and
 *   support (good angles); in the game: straight passes, diagonal runs.
 * 45 x 25 yds, a goal and keeper at each end, a 10 yd middle zone.
 * 1. Tech (10 mins): two teams of 4, each stays in its own area. Two floaters in the middle zone set up long range shots
 *    for both teams. Shoot after 3 passes.
 * 2. Skill (10 mins): same, but two defenders in the middle zone. Look at the defenders as well as the keeper when
 *    deciding when and how to shoot (bend it, drill it, etc).
 * 3. Game (20 mins): 4 v 4, normal game. A floater in each end area (stays there, can't shoot, supports). Goals:
 *    1 point normal, 2 from the middle zone, 3 from your own half.
 * Owner's extra points: head up, assess the keeper; pick the technique (side foot, laces, volley); maximum power at the
 *   moment of impact; body shape and set-up, standing foot.
 * Pitch laid sideways: x 0..100 = 45 yds (2.2 units a yard), y 0..75 = 25 yds. Middle zone x 38.9..61.1.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', S = '#d4a017', OR = '#d9622b', K = '#2b2b2b', RED = '#e5484d';
  const MZ = { x: 38.9, w: 22.2 };
  const middle = [{ x: MZ.x, y: 2, w: MZ.w, h: 71, fill: 'rgba(22,53,31,0.08)' }];
  const zoneLabels = [{ x: MZ.x, y: 2, w: MZ.w, h: 71, color: OR, label: 'MIDDLE ZONE: 10 YDS', labelAt: [50, 66], soft: true }];
  const keepers = [
    { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 },
    { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
  ];
  const teams = [
    { id: 'A1', team: 'a', x: 12, y: 20 }, { id: 'A2', team: 'a', x: 12, y: 55 },
    { id: 'A3', team: 'a', x: 28, y: 28 }, { id: 'A4', team: 'a', x: 30, y: 50 },
    { id: 'B1', team: 'd', x: 88, y: 20 }, { id: 'B2', team: 'd', x: 88, y: 55 },
    { id: 'B3', team: 'd', x: 72, y: 24 }, { id: 'B4', team: 'd', x: 70, y: 50 },
  ];
  const common = {
    plain: true,
    goals: [[37.5, 'left'], [37.5, 'right']],
    goalScale: 1.4,
    areas: middle,
    dims: [{ a: [MZ.x, 74], b: [MZ.x + MZ.w, 74], label: '10 yds' }],
    tagPlace: 'auto',
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'long-range-finishing',
    draft: true,
    title: 'Long Range Finishing',
    subtitle: 'Head up, pick the technique, strike it right',
    type: 'Technical',
    category: 'attacking',
    topics: ['Shooting', 'Small-sided games'],
    squad: [10, 12],
    thumb: 'assets/thumbs/long-range-finishing.jpg',
    summary: 'Three passes then shoot from your own area, with floaters setting it up; then defenders in the middle; then a 4 v 4 where long range goals score more. Head up, pick the technique (side foot, laces, volley), power at impact.',
    keyPhrase: 'Head up, pick the technique',
    ages: { from: 14 },

    cards: [
      {
        title: 'Pick the technique',
        lead: '*Head up*: where is the keeper? Where are the defenders?',
        columns: [
          { heading: 'Which strike?', items: ['*Laces*: power, *drill it* low', '*Side foot*: inside of the foot (big toe), *place it*', '*Volley*: ball in the air', '*Bend it* round a defender'] },
          { heading: 'Decide', items: ['*First time*, or a touch first?', 'Keeper set? *Power*. Off his line? *Place it*', 'Defender in the lane? *Bend it* or *shift it*'] },
        ],
        phrase: { big: 'HEAD UP, PICK THE TECHNIQUE', small: 'Where is the keeper?' },
      },
      {
        title: 'Strike it right',
        lead: '*Body shape* and *set-up* first.',
        columns: [
          { heading: 'Set-up', items: ['*Standing foot* beside the ball, pointing at the target', '*Head over the ball* to keep it down', 'Good first touch: *set it* for the shot'] },
          { heading: 'Strike', items: ['*Fastest at impact*: accelerate through the ball', 'Follow through towards the target', '*Hit the target*, then *follow up*'] },
        ],
        phrase: { big: 'POWER AT IMPACT', small: 'Standing foot, head over the ball' },
      },
    ],

    keywords: [
      { word: 'Long range', meaning: 'A shot from outside the box, 20 yards or more.' },
      { word: 'Laces', meaning: 'Striking with the top of the foot, toe pointed down: the most power.' },
      { word: 'Side foot', meaning: 'Striking with the inside of the foot (big toe side): the most accurate.' },
      { word: 'Volley', meaning: 'Striking the ball before it touches the ground.' },
      { word: 'Bend it', meaning: 'Curling the ball round a defender or the keeper.' },
      { word: 'Standing foot', meaning: 'The foot you don\'t kick with: beside the ball, pointing where you want it to go.' },
      { word: 'Floater', meaning: 'A player who helps the team with the ball. Here they set up shots but can\'t shoot.' },
      { word: 'Follow up', meaning: 'Following the shot in, ready for a rebound.' },
    ],

    training: {
      area: '45 × 25 yards, a goal at each end, a 10 yard middle zone.',
      players: 'Two teams of 4, two floaters (or two defenders), two keepers (12).',
      equipment: 'Two goals, cones, bibs in three colours, plenty of balls by each goal.',
      setup: [
        'Tech (10 minutes): two teams of 4, each stays in its own area. Two floaters in the middle zone help both teams.',
        'Three passes, then shoot at the far goal. Floaters set it up: set it back into a shooter\'s path, or pop it up for a volley.',
        'Head up: where is the keeper? Pick the technique: laces for power, side foot to place it, volley if it\'s in the air.',
        'Standing foot beside the ball, head over it, fastest at the moment of impact. Hit the target and follow up.',
        'Skill (10 minutes): same, but two defenders in the middle zone instead of floaters.',
        'Look at the defenders as well as the keeper: when and how to shoot. Bend it round them, drill it through a gap, or shift it out of their shadow.',
        'Game (20 minutes): 4 v 4, normal game. A floater in each end area: they stay there, support, but can\'t shoot.',
        'A goal is 1 point, 2 from the middle zone, 3 from your own half. Straight passes, diagonal runs.',
      ],
    },

    questions: [
      'Where was the keeper when you shot?',
      'Which technique did you pick? Laces, side foot or volley? Why?',
      'Where was your standing foot?',
      'When was your foot moving fastest?',
      'Where were the defenders? How did you get the shot past them?',
      'Did you follow up?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, common, {
        id: 'three-passes',
        video: 'videos/long-range-finishing-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'Three Passes, Shoot',
        tagline: 'Floaters set it up. Laces, volley, side foot.',
        intro: ['Two teams of 4, each in *its own area*.', '*Floaters* in the middle set up shots for *both teams*.', '*Three passes*, then *shoot* at the far goal.'],
        keyPhrase: { big: 'HEAD UP, PICK THE TECHNIQUE', small: 'Laces, side foot or volley?' },
        facing: { a: 'right', d: 'left', f: 'left', g: 'right', k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: S }],
        players: keepers.concat(teams, [
          { id: 'F1', team: 'f', label: 'F', x: 50, y: 25 }, { id: 'F2', team: 'g', label: 'F', x: 50, y: 52 },
        ]),
        ball: { owner: 'A2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['45 × 25 yards, a *10 yard middle zone*.', 'Two teams of 4: each stays in *its own area*.', '*Floaters* in the middle help *both teams*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
            halves: zoneLabels,
          },
          {
            title: 'PASS ONE, PASS TWO',
            text: ['*Three passes*, then *shoot*.', 'One... two: into a *floater*.'],
            tags: { F1: 'FLOATER' }, timing: { move: 3 },
            moves: [{ id: 'F1', to: [48, 30], start: 0, end: 0.4 }],
            passes: [{ to: 'A4', start: 0.05, end: 0.35 }, { to: 'F1', start: 0.5, end: 0.85 }],
          },
          {
            title: 'THREE: SET IT UP',
            text: ['Floater *sets it back* into your path.', '*Head up*: where is the keeper?'],
            tags: { F1: 'SET', A3: 'HEAD UP' }, timing: { move: 2.8 },
            moves: [{ id: 'A3', to: [34, 33], start: 0, end: 0.65 }],
            passes: [{ to: 'A3', start: 0.3, end: 0.65 }],
          },
          {
            title: 'KEEPER SET? LACES',
            text: ['*Standing foot* beside the ball, *head over it*.', '*Laces*, toe down: *drill it*.', '*Fastest at impact*: accelerate through it.'],
            tags: { A3: 'LACES' }, timing: { move: 2.4 },
            shot: [102, 36],
            ball: { to: [102, 36], start: 0.05, end: 0.35 },
            moves: [
              { id: 'F1', to: [52, 20], start: 0, end: 0.4, arrow: false },
              { id: 'kR', to: [97.5, 41], start: 0.05, end: 0.35, arrow: false },
            ],
          },
          {
            title: 'NOW THE BLUES',
            text: ['Keeper starts the *other team*.', 'Pass one...'],
            timing: { move: 2.2 },
            ball: { give: 'kR' },
            moves: [{ id: 'kR', to: [97.5, 37.5], start: 0, end: 0.3, arrow: false }],
            passes: [{ to: 'B3', start: 0.1, end: 0.5 }],
          },
          {
            title: 'POP IT UP',
            text: ['...two, into the *floater*...', '...three: floater *pops it up*.', 'Shooter: *time your run*.'],
            tags: { F2: 'SET', B4: 'VOLLEY' }, timing: { move: 3.4 },
            moves: [{ id: 'B4', to: [66, 46], start: 0.25, end: 0.85 }],
            passes: [{ to: 'F2', start: 0.05, end: 0.35 }, { to: 'B4', start: 0.45, end: 0.85, loft: 'chip' }],
          },
          {
            title: 'IN THE AIR? VOLLEY',
            text: ['*Eyes on the ball*.', '*Knee and head over it* to keep it down.', 'Hit the *target*.'],
            tags: { B4: 'VOLLEY' }, timing: { move: 2.2 },
            shot: [-2, 40],
            ball: { to: [-2, 40], start: 0.05, end: 0.35 },
            moves: [{ id: 'kL', to: [2.5, 34], start: 0.05, end: 0.35, arrow: false }],
          },
          {
            title: 'GREENS AGAIN',
            text: ['One, two: into a *floater*.', 'Shooter gets *ready*: in line for the set back.'],
            timing: { move: 3 },
            ball: { give: 'kL' },
            moves: [
              { id: 'kL', to: [2.5, 37.5], start: 0, end: 0.3, arrow: false },
              { id: 'A4', to: [31, 42], start: 0, end: 0.4 },
              { id: 'B4', to: [72, 56], start: 0, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'A2', start: 0.05, end: 0.3 }, { to: 'F2', start: 0.45, end: 0.8 }],
          },
          {
            title: 'KEEPER OFF HIS LINE',
            text: ['Three: *set it back*.', '*Head up*: the keeper is *off his line*.'],
            tags: { F2: 'SET', A4: 'HEAD UP' }, timing: { move: 2.6 },
            moves: [
              { id: 'A4', to: [36, 46], start: 0, end: 0.6 },
              { id: 'kR', to: [92, 37], start: 0.2, end: 0.8, arrow: false },
            ],
            passes: [{ to: 'A4', start: 0.25, end: 0.6 }],
          },
          {
            title: 'SIDE FOOT: PLACE IT',
            text: ['*Side foot*: inside of the foot (big toe).', '*Place it* low, past him.', 'Accuracy first: *hit the target*.'],
            tags: { A4: 'SIDE FOOT' }, timing: { move: 2.4 },
            shot: [102, 43],
            ball: { to: [102, 43], start: 0.05, end: 0.42 },
            moves: [{ id: 'kR', to: [93, 40], start: 0.2, end: 0.45, arrow: false }],
          },
        ],
        summary: ['*Three passes*, then shoot.', '*Head up*: where is the keeper?', 'Pick it: *laces*, *volley* or *side foot*.', '*Standing foot*, head over it, *power at impact*.'],
      }),

      // ---------------- 2: skill (defenders in the middle) ----------------
      Object.assign({}, common, {
        id: 'defenders-in-the-middle',
        video: 'videos/long-range-finishing-2.mp4',
        kicker: 'Clip 2 · Skill',
        title: 'Beat the Blockers',
        tagline: 'Look at the defenders too: bend it, drill it, shift it.',
        intro: ['Same set-up, but *two defenders* in the middle.', 'Look at the *defenders* and the *keeper*.', '*When* and *how* to shoot: bend it, drill it...'],
        keyPhrase: { big: 'WHERE ARE THEY?', small: 'Defenders and keeper: then pick the shot' },
        facing: { a: 'right', d: 'left', k: 'right', k2: 'left' },
        teamColors: { o: RED, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Middle defenders', color: RED }],
        players: keepers.concat(teams, [
          { id: 'D1', team: 'o', label: 'D', x: 50, y: 25 }, { id: 'D2', team: 'o', label: 'D', x: 50, y: 50 },
        ]),
        ball: { owner: 'A1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Same, but *two defenders* in the middle zone.', 'They *block* shots, for both teams.', 'Look at the *defenders* as well as the *keeper*.'],
            tags: { D1: 'BLOCK', D2: 'BLOCK' },
            halves: zoneLabels,
          },
          {
            title: 'THREE PASSES',
            text: ['Move it: one, two, three.', 'Defender shifts across to *block* the shot.'],
            tags: { D1: 'BLOCK' }, timing: { move: 3.4 },
            moves: [{ id: 'D1', to: [43, 29], start: 0.4, end: 1 }],
            passes: [{ to: 'A2', start: 0.05, end: 0.3 }, { to: 'A4', start: 0.4, end: 0.62 }, { to: 'A3', start: 0.72, end: 0.95 }],
          },
          {
            title: 'DEFENDER IN THE WAY? BEND IT',
            text: ['Straight line *blocked*.', '*Bend it* round him: wrap your foot round the ball.', 'Aim for the *far post*.'],
            tags: { A3: 'BEND IT' }, timing: { move: 2.6 },
            shot: [102, 40],
            ball: { to: [102, 40], start: 0.05, end: 0.45, bend: -9 },
            moves: [{ id: 'kR', to: [97.5, 35], start: 0.05, end: 0.45, arrow: false }],
          },
          {
            title: 'BLUES: THREE PASSES',
            text: ['Blues move it: one, two, three.', '*Head up*: where are the defenders?'],
            tags: { B3: 'HEAD UP' }, timing: { move: 3.4 },
            ball: { give: 'kR' },
            moves: [
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.3, arrow: false },
              { id: 'D1', to: [50, 22], start: 0.2, end: 0.8, arrow: false },
              { id: 'D2', to: [56, 41], start: 0.6, end: 1, arrow: false },
            ],
            passes: [{ to: 'B2', start: 0.05, end: 0.3 }, { to: 'B4', start: 0.4, end: 0.62 }, { to: 'B3', start: 0.72, end: 0.95 }],
          },
          {
            title: 'GAP? DRILL IT',
            text: ['There\'s a *gap* between them.', '*Drill it* through: laces, low and hard.', '*Standing foot* beside the ball, head over it.'],
            tags: { B3: 'DRILL IT' }, timing: { move: 2.2 },
            shot: [-2, 40],
            ball: { to: [-2, 40], start: 0.05, end: 0.35 },
            moves: [{ id: 'kL', to: [2.5, 34], start: 0.05, end: 0.35, arrow: false }],
          },
          {
            title: 'GREENS: HE CLOSES THE LANE',
            text: ['Greens again.', 'Defender steps across your *shooting lane*.'],
            tags: { D2: 'BLOCK' }, timing: { move: 3 },
            ball: { give: 'kL' },
            moves: [
              { id: 'kL', to: [2.5, 37.5], start: 0, end: 0.3, arrow: false },
              { id: 'D2', to: [43, 49], start: 0.4, end: 1 },
              { id: 'B4', to: [76, 61], start: 0, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'A2', start: 0.05, end: 0.3 }, { to: 'A4', start: 0.45, end: 0.75 }],
          },
          {
            title: 'SHIFT IT, THEN STRIKE',
            text: ['One touch *out of his shadow*...', '...then strike: *power at impact*.', 'Hit the *target*.'],
            tags: { A4: 'SHIFT IT' }, timing: { move: 2.6 },
            shot: [102, 40],
            ball: { to: [102, 40], start: 0.4, end: 0.66 },
            moves: [
              { id: 'A4', to: [32, 58], start: 0, end: 0.35 },
              { id: 'kR', to: [97.5, 40], start: 0.4, end: 0.66, arrow: false },
            ],
          },
        ],
        summary: ['Look at the *defenders* and the *keeper*.', 'Blocked? *Bend it* round, or *shift it* out of his shadow.', 'Gap? *Drill it* through.', '*Power at impact*, on target.'],
      }),

      // ---------------- 3: game ----------------
      Object.assign({}, common, {
        id: 'points-game',
        video: 'videos/long-range-finishing-3.mp4',
        kicker: 'Clip 3 · Game',
        title: 'Points for Distance',
        tagline: '1 point, 2 from the middle, 3 from your own half.',
        intro: ['*4 v 4*, a normal game.', 'A *floater* in each end area: supports, *can\'t shoot*.', '*1* point, *2* from the middle zone, *3* from your own half.'],
        keyPhrase: { big: 'LONG RANGE SCORES MORE', small: 'Straight passes, diagonal runs' },
        facing: { a: 'right', d: 'left', f: 'right', g: 'left', k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: S }],
        players: keepers.concat([
          { id: 'G1', team: 'a', x: 22, y: 20 }, { id: 'G2', team: 'a', x: 24, y: 58 },
          { id: 'G3', team: 'a', x: 40, y: 30 }, { id: 'G4', team: 'a', x: 64, y: 60 },
          { id: 'B1', team: 'd', x: 32, y: 40 }, { id: 'B2', team: 'd', x: 50, y: 20 },
          { id: 'B3', team: 'd', x: 66, y: 46 }, { id: 'B4', team: 'd', x: 80, y: 26 },
          { id: 'F1', team: 'f', label: 'F', x: 14, y: 38 }, { id: 'F2', team: 'g', label: 'F', x: 86, y: 38 },
        ]),
        ball: { owner: 'G2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['*4 v 4*, a normal game.', 'A *floater* in each end area: supports, *can\'t shoot*.', 'Goal: *1* point. Middle zone: *2*. Own half: *3*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
            halves: [
              { x: 0, y: 2, w: MZ.x, h: 71, color: G, label: 'GREENS: 3 PTS', labelAt: [20, 66], soft: true },
              { x: MZ.x, y: 2, w: MZ.w, h: 71, color: OR, label: 'MIDDLE: 2 PTS', labelAt: [50, 66], soft: true },
              { x: MZ.x + MZ.w, y: 2, w: 100 - MZ.x - MZ.w, h: 71, color: B, label: 'BLUES: 3 PTS', labelAt: [80, 66], soft: true },
            ],
          },
          {
            title: 'STRAIGHT PASS, DIAGONAL RUN',
            text: ['*Straight pass* up the line...', '...*diagonal run* to meet it.', 'Into the *middle zone*.'],
            tags: { G2: 'STRAIGHT PASS', G3: 'DIAGONAL RUN' }, timing: { move: 3 },
            moves: [
              { id: 'G3', to: [50, 53], start: 0, end: 0.75 },
              { id: 'B3', to: [57, 61], start: 0.4, end: 1, arrow: false },
            ],
            passes: [{ to: 'G3', start: 0.35, end: 0.75 }],
          },
          {
            title: 'MIDDLE ZONE: 2 POINTS',
            text: ['*Head up*: keeper set? *Power*.', 'Touch to *set it*, then *laces*.', 'From the middle zone: *2 points*.'],
            tags: { G3: 'LACES' }, timing: { move: 2.6 },
            shot: [102, 43],
            ball: { to: [102, 43], start: 0.4, end: 0.66 },
            moves: [
              { id: 'G3', to: [53, 50], start: 0, end: 0.35 },
              { id: 'kR', to: [97.5, 35], start: 0.4, end: 0.66, arrow: false },
            ],
          },
          {
            title: 'BLUES: USE THE FLOATER',
            text: ['Keeper to the *floater*.', 'Floater *supports*: plays it on.', '*Good angles*, talk.'],
            tags: { F2: 'FLOATER' }, timing: { move: 3 },
            ball: { give: 'kR' },
            moves: [
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.25, arrow: false },
              { id: 'B4', to: [72, 30], start: 0.1, end: 0.6 },
            ],
            passes: [{ to: 'F2', start: 0.05, end: 0.3 }, { to: 'B4', start: 0.5, end: 0.82 }],
          },
          {
            title: 'OWN HALF: 3 POINTS',
            text: ['*Head up*: keeper *off his line*.', '*Lift it* over him from your own half.', '*3 points*. Team-mate *follows up*.'],
            tags: { B4: 'CHIPPED', B3: 'FOLLOW UP' }, timing: { move: 3.2 },
            shot: [-2, 36],
            ball: { to: [-2, 36], start: 0.3, end: 0.85, loft: 'chip' },
            moves: [
              { id: 'B4', to: [68, 32], start: 0, end: 0.25 },
              { id: 'kL', path: [[11, 38], [4, 37]], start: 0, end: 0.9, arrow: false },
              { id: 'B3', to: [42, 52], start: 0.35, end: 0.95 },
            ],
          },
        ],
        summary: ['*1* point, *2* from the middle, *3* from your own half.', 'Straight passes, *diagonal runs*.', '*Head up*: where is the keeper?', 'Strike it right, then *follow up*.'],
      }),
    ],
  });
})();
