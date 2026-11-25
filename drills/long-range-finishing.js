/*
 * SESSION: Long Range Finishing (Attacking · technical) (DRAFT)
 * From the owner's own plan "Long Range Finishing" (1st4sport L2 session sheet).
 *
 * Key factors: positive attitude; select the right shooting technique (first time or not); execute the strike correctly;
 *   head up, assess the keeper's position (and defenders later); accuracy: hit the target, follow up; communication and
 *   support (good angles); in the game: straight passes, diagonal runs.
 * Owner's dimensions: 41 x 25 yds: two 18 yd shooting areas (same as the penalty box) and a 5 yd middle zone.
 * 1. Tech (10 mins): two teams of 4, each stays in its own area. Two floaters in the middle zone set up long range shots
 *    for both teams. No set number of passes: game like, movement, energy, communication.
 * 2. Skill (10 mins), owner's change "Beat the Press": the two middle defenders press the team with the ball. Find the
 *    spare man, work an opening (a run drags a defender away, a bounce) to bypass the blockers, move onto it, first time.
 * 3. Game (20 mins): a normal match (4 v 4, a floater in each end area who supports but can't shoot), everyone moving,
 *    with extra points: 1 normal, 2 from the middle zone, 3 from your own half. Work a shooting chance from any zone.
 * Owner's extra points: head up, assess the keeper; pick the technique (side foot, laces, volley, lob); maximum power at
 *   the moment of impact; body shape and set-up, standing foot.
 * Pitch laid sideways: x 0..100 = 41 yds (2.44 units a yard), y 0..75 = 25 yds. Middle zone x 43.9..56.1.
 */
(function () {
  const G = '#2fbf7f', B = '#3b9ae1', S = '#d4a017', OR = '#d9622b', K = '#2b2b2b', RED = '#e5484d';
  const MZ = { x: 43.9, w: 12.2 };
  const middle = [{ x: MZ.x, y: 2, w: MZ.w, h: 71, fill: 'rgba(22,53,31,0.08)' }];
  const zoneLabels = [
    { x: 0, y: 2, w: MZ.x, h: 71, color: G, label: 'SHOOTING AREA', labelAt: [22, 8], soft: true },
    { x: MZ.x, y: 2, w: MZ.w, h: 71, color: OR, label: 'MIDDLE', labelAt: [50, 66], soft: true },
    { x: MZ.x + MZ.w, y: 2, w: 100 - MZ.x - MZ.w, h: 71, color: B, label: 'SHOOTING AREA', labelAt: [78, 8], soft: true },
  ];
  const dims = [
    { a: [0, 72.5], b: [MZ.x, 72.5], label: '18 yds' },
    { a: [MZ.x, 72.5], b: [MZ.x + MZ.w, 72.5], label: '5' },
    { a: [MZ.x + MZ.w, 72.5], b: [100, 72.5], label: '18 yds' },
  ];
  const keepers = [
    { id: 'kL', team: 'k', label: 'GK', x: 2.5, y: 37.5 },
    { id: 'kR', team: 'k2', label: 'GK', x: 97.5, y: 37.5 },
  ];
  const teams = [
    { id: 'A1', team: 'a', x: 14, y: 20 }, { id: 'A2', team: 'a', x: 14, y: 55 },
    { id: 'A3', team: 'a', x: 32, y: 28 }, { id: 'A4', team: 'a', x: 34, y: 50 },
    { id: 'B1', team: 'd', x: 86, y: 20 }, { id: 'B2', team: 'd', x: 86, y: 55 },
    { id: 'B3', team: 'd', x: 68, y: 24 }, { id: 'B4', team: 'd', x: 66, y: 50 },
  ];
  const common = {
    plain: true,
    goals: [[37.5, 'left'], [37.5, 'right']],
    goalScale: 1.4,
    areas: middle,
    dims,
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
    summary: 'Shoot from your own area with floaters setting it up; then beat the press and find the spare man; then a normal match where long range goals score more. Head up, pick the finish (laces, side foot, volley), power at impact.',
    keyPhrase: 'Head up, pick the technique',
    ages: { from: 14 },

    cards: [
      {
        title: 'Pick the technique',
        lead: '*Head up*: where is the keeper? Where are the defenders?',
        columns: [
          { heading: 'Mix it up', items: ['*Laces*: power, *drill it* low', '*Side foot*: inside of the foot (big toe), *place it*', '*Volley*: ball in the air', '*Bend it* round a defender', '*Lob it*: keeper off his line'] },
          { heading: 'Decide', items: ['*First time*, or a touch first?', 'Keeper set? *Power*. Off his line? *Place it* or *lob it*', 'Pressed? Find the *spare man*, *move onto it*'] },
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
      { word: 'Lob', meaning: 'Lifting the ball over a keeper who has come off his line.' },
      { word: 'Standing foot', meaning: 'The foot you don\'t kick with: beside the ball, pointing where you want it to go.' },
      { word: 'Floater', meaning: 'A player who helps the team with the ball. Here they set up shots but can\'t shoot.' },
    ],

    training: {
      area: '41 × 25 yards: two 18 yard shooting areas (the same as the penalty box) and a 5 yard middle zone. A goal at each end.',
      players: 'Two teams of 4, two floaters (or two defenders), two keepers (12).',
      equipment: 'Two goals, cones, bibs in three colours, plenty of balls by each goal.',
      setup: [
        'Tech (10 minutes): two teams of 4, each stays in its own area. Two floaters in the middle zone help both teams.',
        'No set number of passes: be game like. Movement, energy and talking to make the chance, then shoot at the far goal.',
        'Floaters set it up: set it back into a shooter\'s path, or pop it up for a volley.',
        'Head up: where is the keeper? Pick the technique: laces for power, side foot to place it, volley if it\'s in the air.',
        'Standing foot beside the ball, head over it, fastest at the moment of impact. Hit the target and follow up.',
        'Skill (10 minutes): same, but two defenders in the middle zone instead of floaters. They press the team with the ball.',
        'Beat the press: move it quickly, find the spare man. Work an opening (a run to drag a defender away, a bounce) to get past the blockers, then move onto it and shoot first time.',
        'Game (20 minutes): a normal match, 4 v 4. A floater in each end area: they stay there, support, but can\'t shoot.',
        'Extra points: a goal is 1, 2 from the middle zone, 3 from your own half. Move the ball and work a shooting chance from any zone: straight passes, diagonal runs.',
      ],
    },

    questions: [
      'Where was the keeper when you shot?',
      'Which technique did you pick? Why?',
      'Where was your standing foot?',
      'When was your foot moving fastest?',
      'Who was the spare man? How did you find him?',
      'How did you make the opening to get the shot past the blockers?',
      'Keeper off his line: did you see it? What did you do?',
    ],

    clips: [
      // ---------------- 1: tech ----------------
      Object.assign({}, common, {
        id: 'three-passes',
        video: 'videos/long-range-finishing-1.mp4',
        kicker: 'Clip 1 · Tech',
        title: 'Set Up the Shot',
        tagline: 'Move, talk, floaters set it up. Laces, volley, side foot.',
        intro: ['Two teams of 4, each in *its own area*.', '*Floaters* in the middle set up shots for *both teams*.', 'Be *game like*: movement, energy, talk.'],
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
            text: ['*18 yard* shooting areas, a *5 yard* middle zone.', 'Two teams of 4: each stays in *its own area*.', '*Floaters* in the middle help *both teams*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
            halves: zoneLabels,
          },
          {
            title: 'MOVE, TALK, FIND THE FLOATER',
            text: ['No set number of passes: be *game like*.', '*Movement* and *energy*: make angles.', '*Talk*: call for it.'],
            tags: { A3: 'TALK', F1: 'FLOATER' }, timing: { move: 3.2 },
            moves: [
              { id: 'F1', to: [49, 30], start: 0, end: 0.4 },
              { id: 'A1', to: [20, 32], start: 0.1, end: 0.6 },
              { id: 'A3', path: [[28, 22], [33, 29]], start: 0.3, end: 0.95 },
            ],
            passes: [{ to: 'A4', start: 0.05, end: 0.35 }, { to: 'F1', start: 0.5, end: 0.85 }],
          },
          {
            title: 'SET IT UP',
            text: ['Floater *sets it back* into your path.', '*Head up*: where is the keeper?'],
            tags: { F1: 'SET', A3: 'HEAD UP' }, timing: { move: 2.8 },
            moves: [{ id: 'A3', to: [38, 33], start: 0, end: 0.65 }],
            passes: [{ to: 'A3', start: 0.3, end: 0.65 }],
          },
          {
            title: 'KEEPER SET? LACES',
            text: ['*Standing foot* beside the ball, *head over it*.', '*Laces*, toe down: *drill it*.', '*Fastest at impact*: accelerate through it.'],
            tags: { A3: 'LACES' }, timing: { move: 2.4 },
            shot: [102, 40],
            ball: { to: [102, 40], start: 0.05, end: 0.35 },
            moves: [
              { id: 'F1', to: [52, 18], start: 0, end: 0.4, arrow: false },
              { id: 'kR', to: [97.5, 34], start: 0.05, end: 0.35, arrow: false },
            ],
          },
          {
            title: 'NOW THE BLUES',
            text: ['Keeper starts the *other team*.', 'Move it, *move* for it.'],
            tags: { B4: 'MOVE' }, timing: { move: 3 },
            ball: { give: 'kR' },
            moves: [
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.3, arrow: false },
              { id: 'B4', to: [68, 54], start: 0.3, end: 0.8 },
            ],
            passes: [{ to: 'B2', start: 0.05, end: 0.3 }, { to: 'B3', start: 0.45, end: 0.85 }],
          },
          {
            title: 'POP IT UP',
            text: ['Into the *floater*...', '...who *pops it up*.', 'Shooter: *time your run*.'],
            tags: { F2: 'SET', B4: 'VOLLEY' }, timing: { move: 3.4 },
            moves: [{ id: 'B4', to: [61, 46], start: 0.25, end: 0.85 }],
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
            text: ['Keeper out, *move it* quickly.', 'Shooter gets *ready*: in line for the set back.'],
            tags: { A4: 'MOVE' }, timing: { move: 3 },
            ball: { give: 'kL' },
            moves: [
              { id: 'kL', to: [2.5, 37.5], start: 0, end: 0.3, arrow: false },
              { id: 'A4', to: [35, 42], start: 0, end: 0.4 },
              { id: 'B4', to: [72, 58], start: 0, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'A2', start: 0.05, end: 0.3 }, { to: 'F2', start: 0.45, end: 0.8 }],
          },
          {
            title: 'KEEPER OFF HIS LINE',
            text: ['Floater *sets it back*.', '*Head up*: the keeper is *off his line*.'],
            tags: { F2: 'SET', A4: 'HEAD UP' }, timing: { move: 2.6 },
            moves: [
              { id: 'A4', to: [40, 46], start: 0, end: 0.6 },
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
        summary: ['Be *game like*: movement, energy, talk.', '*Head up*: where is the keeper?', 'Pick it: *laces*, *volley* or *side foot*.', '*Standing foot*, head over it, *power at impact*.'],
      }),

      // ---------------- 2: skill (beat the press) ----------------
      Object.assign({}, common, {
        id: 'defenders-in-the-middle',
        video: 'videos/long-range-finishing-2.mp4',
        kicker: 'Clip 2 · Skill',
        title: 'Beat the Press',
        tagline: 'Two defenders press. Find the spare man, work the opening.',
        intro: ['Same set-up, but *two defenders* now *press*.', '4 v 2: find the *spare man*.', 'Work an *opening*, move *onto* it, shoot.'],
        keyPhrase: { big: 'FIND THE SPARE MAN', small: 'Work the opening, then shoot' },
        facing: { a: 'right', d: 'left', k: 'right', k2: 'left' },
        teamColors: { o: RED, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Defenders', color: RED }],
        players: keepers.concat(teams, [
          { id: 'D1', team: 'o', label: 'D', x: 50, y: 25 }, { id: 'D2', team: 'o', label: 'D', x: 50, y: 50 },
        ]),
        ball: { owner: 'A1' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Same, but *two defenders* in the middle.', 'They *press* the team with the ball.', '4 v 2: *find the spare man*.'],
            tags: { D1: 'PRESS', D2: 'PRESS' },
            halves: zoneLabels,
          },
          {
            title: 'THEY PRESS',
            text: ['Ball goes in: the defenders *press*.', 'Who is *free*? *Head up*.'],
            tags: { D1: 'PRESS', D2: 'PRESS' }, timing: { move: 3 },
            moves: [
              { id: 'D1', to: [39, 28], start: 0.3, end: 0.9, ease: 'out' },
              { id: 'D2', to: [40, 47], start: 0.4, end: 1, ease: 'out' },
            ],
            passes: [{ to: 'A3', start: 0.05, end: 0.4 }],
          },
          {
            title: 'MOVE IT: FIND THE SPARE MAN',
            text: ['Move it *quickly*, away from the press.', '*Talk*: "spare!", "man on!"', 'They can\'t press *everyone*.'],
            tags: { A1: 'TALK', A2: 'FREE MAN' }, timing: { move: 3.2 },
            moves: [
              { id: 'A1', to: [20, 30], start: 0, end: 0.35 },
              { id: 'A2', to: [18, 52], start: 0.1, end: 0.5 },
              { id: 'D1', to: [26, 26], start: 0.4, end: 1, arrow: false },
            ],
            passes: [{ to: 'A1', start: 0.1, end: 0.35 }, { to: 'A2', start: 0.5, end: 0.8 }],
          },
          {
            title: 'WORK THE OPENING',
            text: ['A run *drags* a defender away.', 'Now there\'s an *opening*.', 'Spare man: *move onto* the pass.'],
            tags: { A4: 'DECOY', A3: 'RUN ONTO IT' }, timing: { move: 3.2 },
            moves: [
              { id: 'A4', to: [36, 62], start: 0, end: 0.6 },
              { id: 'D2', to: [38, 57], start: 0.2, end: 0.8, arrow: false },
              { id: 'A3', to: [38, 36], start: 0.3, end: 0.9 },
            ],
            passes: [{ to: 'A3', start: 0.45, end: 0.88 }],
          },
          {
            title: 'FIRST TIME THROUGH THE GAP',
            text: ['Moving onto it: hit it *first time*.', 'Through the *opening*, past the blockers.', '*Power at impact*, on target.'],
            tags: { A3: 'FIRST TIME' }, timing: { move: 2.2 },
            shot: [102, 42],
            ball: { to: [102, 42], start: 0.05, end: 0.35 },
            moves: [{ id: 'kR', to: [97.5, 35], start: 0.05, end: 0.35, arrow: false }],
          },
          {
            title: 'BLUES: THEY PRESS',
            text: ['Now the defenders press the *blues*.', 'Blues: *head up*, who is free?'],
            tags: { D1: 'PRESS', D2: 'PRESS' }, timing: { move: 3.2 },
            ball: { give: 'kR' },
            moves: [
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.3, arrow: false },
              { id: 'D1', to: [62, 28], start: 0.2, end: 0.9 },
              { id: 'D2', to: [62, 46], start: 0.2, end: 0.9 },
              { id: 'A2', to: [14, 56], start: 0, end: 0.6, arrow: false },
              { id: 'A4', to: [34, 60], start: 0, end: 0.6, arrow: false },
            ],
            passes: [{ to: 'B2', start: 0.05, end: 0.35 }],
          },
          {
            title: 'BOUNCE IT: SPARE MAN ARRIVES',
            text: ['Into a team-mate, who *bounces it* back...', '...into the path of the *spare man*.', 'He *moves onto it*, away from the block.'],
            tags: { B4: 'BOUNCE', B2: 'RUN ONTO IT' }, timing: { move: 3.2 },
            moves: [{ id: 'B2', to: [74, 59], start: 0.2, end: 0.75 }],
            passes: [{ to: 'B4', start: 0.05, end: 0.35 }, { to: 'B2', start: 0.5, end: 0.82 }],
          },
          {
            title: 'MOVING ONTO IT: STRIKE',
            text: ['*First time*, on the move.', 'Through the *opening*: the blockers are bypassed.', '*Hit the target*, then *follow up*.'],
            tags: { B2: 'FIRST TIME' }, timing: { move: 2.2 },
            shot: [-2, 44],
            ball: { to: [-2, 44], start: 0.05, end: 0.38 },
            moves: [{ id: 'kL', to: [2.5, 36], start: 0.05, end: 0.38, arrow: false }],
          },
        ],
        summary: ['Defenders *press*: *head up*, who is free?', 'Move it *quickly*: find the *spare man*.', 'Work the *opening*: a run drags a defender away.', '*Move onto it*, first time, past the blockers.'],
      }),

      // ---------------- 3: game ----------------
      Object.assign({}, common, {
        id: 'points-game',
        video: 'videos/long-range-finishing-3.mp4',
        kicker: 'Clip 3 · Game',
        title: 'Points for Distance',
        tagline: 'A normal match: 1 point, 2 from the middle, 3 from your own half.',
        intro: ['A *normal match*, 4 v 4.', 'Move the ball, *work a shooting chance*: from *any zone*.', 'Extra points: *2* from the middle, *3* from your own half.'],
        keyPhrase: { big: 'WORK THE CHANCE', small: 'Then shoot from any zone' },
        facing: { a: 'right', d: 'left', f: 'right', g: 'left', k: 'right', k2: 'left' },
        teamColors: { f: S, g: S, k2: K },
        legendTeams: [{ label: 'Greens', color: G }, { label: 'Blues', color: B }, { label: 'Floaters', color: S }],
        players: keepers.concat([
          { id: 'G1', team: 'a', x: 22, y: 20 }, { id: 'G2', team: 'a', x: 24, y: 58 },
          { id: 'G3', team: 'a', x: 36, y: 36 }, { id: 'G4', team: 'a', x: 62, y: 56 },
          { id: 'B1', team: 'd', x: 34, y: 48 }, { id: 'B2', team: 'd', x: 46, y: 20 },
          { id: 'B3', team: 'd', x: 66, y: 40 }, { id: 'B4', team: 'd', x: 80, y: 26 },
          { id: 'F1', team: 'f', label: 'F', x: 12, y: 38 }, { id: 'F2', team: 'g', label: 'F', x: 88, y: 38 },
        ]),
        ball: { owner: 'G2' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['A *normal match*, 4 v 4.', 'A *floater* in each end area: supports, *can\'t shoot*.', 'Goal: *1* point. Middle zone: *2*. Own half: *3*.'],
            tags: { F1: 'FLOATER', F2: 'FLOATER' },
            halves: [
              { x: 0, y: 2, w: MZ.x, h: 71, color: G, label: 'GREENS\' HALF', labelAt: [22, 8], soft: true },
              { x: MZ.x, y: 2, w: MZ.w, h: 71, color: OR, label: 'MIDDLE: 2 PTS', labelAt: [50, 66], soft: true },
              { x: MZ.x + MZ.w, y: 2, w: 100 - MZ.x - MZ.w, h: 71, color: B, label: 'BLUES\' HALF', labelAt: [78, 8], soft: true },
            ],
          },
          {
            title: 'MOVE THE BALL',
            text: ['Use the *floater*, move it *quickly*.', 'Everyone *moves*: angles and space.', 'Blues *press* and *shift*.'],
            tags: { F1: 'FLOATER', G3: 'MOVE' }, timing: { move: 3.2 },
            moves: [
              { id: 'G1', to: [26, 24], start: 0, end: 0.4 },
              { id: 'G3', to: [40, 30], start: 0.3, end: 0.9 },
              { id: 'G4', to: [66, 62], start: 0.2, end: 0.8 },
              { id: 'B2', to: [32, 17], start: 0.4, end: 1, arrow: false },
              { id: 'B1', to: [32, 40], start: 0.2, end: 0.8, arrow: false },
              { id: 'B3', to: [60, 46], start: 0.3, end: 0.9, arrow: false },
              { id: 'B4', to: [76, 30], start: 0.3, end: 0.9, arrow: false },
            ],
            passes: [{ to: 'F1', start: 0.05, end: 0.3 }, { to: 'G1', start: 0.45, end: 0.75 }],
          },
          {
            title: 'WORK THE OPENING',
            text: ['A *diagonal run* drags a defender away.', 'Spare man *moves onto* the pass...', '...into the *middle zone*.'],
            tags: { G4: 'DIAGONAL RUN', G3: 'RUN ONTO IT' }, timing: { move: 3.2 },
            moves: [
              { id: 'G3', to: [48, 37], start: 0.2, end: 0.8 },
              { id: 'G4', to: [74, 54], start: 0, end: 0.6 },
              { id: 'B3', to: [64, 52], start: 0.2, end: 0.8, arrow: false },
              { id: 'B1', to: [40, 42], start: 0.3, end: 1, arrow: false },
              { id: 'B4', to: [78, 42], start: 0.3, end: 0.9, arrow: false },
            ],
            passes: [{ to: 'G3', start: 0.4, end: 0.78 }],
          },
          {
            title: 'MIDDLE ZONE: 2 POINTS',
            text: ['The *opening* is there: *first time*.', 'Laces, *power at impact*.', 'From the middle zone: *2 points*.'],
            tags: { G3: 'FIRST TIME' }, timing: { move: 2.4 },
            shot: [102, 35],
            ball: { to: [102, 35], start: 0.05, end: 0.35 },
            moves: [
              { id: 'kR', to: [97.5, 41], start: 0.05, end: 0.35, arrow: false },
              { id: 'B1', to: [42, 43], start: 0, end: 0.4, arrow: false },
            ],
          },
          {
            title: 'BLUES: MOVE IT',
            text: ['Keeper to the *floater*.', 'Blues *move*, greens *press*.', '*Talk*: "time", "man on".'],
            tags: { F2: 'FLOATER', B3: 'MOVE' }, timing: { move: 3.4 },
            ball: { give: 'kR' },
            moves: [
              { id: 'kR', to: [97.5, 37.5], start: 0, end: 0.25, arrow: false },
              { id: 'B4', to: [76, 34], start: 0.1, end: 0.5 },
              { id: 'B3', to: [66, 58], start: 0.2, end: 0.8 },
              { id: 'B2', to: [50, 14], start: 0.2, end: 0.9 },
              { id: 'B1', to: [50, 40], start: 0.2, end: 0.9, arrow: false },
              { id: 'G4', to: [70, 30], start: 0.45, end: 1, arrow: false },
              { id: 'G3', to: [60, 36], start: 0.3, end: 0.9, arrow: false },
              { id: 'G1', to: [42, 24], start: 0.3, end: 0.9, arrow: false },
              { id: 'G2', to: [44, 62], start: 0.3, end: 0.9, arrow: false },
            ],
            passes: [{ to: 'F2', start: 0.05, end: 0.3 }, { to: 'B4', start: 0.48, end: 0.78 }],
          },
          {
            title: 'SWITCH IT: SPARE MAN',
            text: ['Pressed? *Switch it* to the spare man.', 'He *moves onto it*: still in his *own half*.'],
            tags: { B3: 'FREE MAN' }, timing: { move: 2.8 },
            moves: [
              { id: 'B3', to: [62, 53], start: 0.2, end: 0.6 },
              { id: 'G3', to: [58, 42], start: 0.3, end: 1, arrow: false },
              { id: 'G2', to: [48, 62], start: 0.3, end: 1, arrow: false },
            ],
            passes: [{ to: 'B3', start: 0.1, end: 0.5 }],
          },
          {
            title: 'OWN HALF: 3 POINTS',
            text: ['A *gap* between them: *drill it*.', 'Standing foot beside it, *head over it*.', '*3 points*. Team-mate *follows up*.'],
            tags: { B3: 'DRILL IT', B1: 'FOLLOW UP' }, timing: { move: 2.8 },
            shot: [-2, 42],
            ball: { to: [-2, 42], start: 0.35, end: 0.62 },
            moves: [
              { id: 'B3', to: [60, 52], start: 0, end: 0.3 },
              { id: 'kL', to: [2.5, 36], start: 0.35, end: 0.62, arrow: false },
              { id: 'G3', to: [55, 44], start: 0.1, end: 0.5, arrow: false },
              { id: 'B1', to: [30, 46], start: 0.4, end: 1 },
            ],
          },
        ],
        summary: ['A *normal match*: everyone *moves*.', 'Move the ball, *work the chance*: shoot from *any zone*.', '*2* from the middle, *3* from your own half.', '*Head up*, pick the finish, *follow up*.'],
      }),
    ],
  });
})();
