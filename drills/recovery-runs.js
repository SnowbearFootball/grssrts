/*
 * SESSION (DRAFT): Recovery Runs: Get Goal-Side (Defending)
 * Newly written for the library. draft: true keeps it off the site until approved (index.html?drafts#recovery-runs).
 *
 * 1 v 1 to a goal with a keeper. The attacker starts ahead of the defender and runs at goal; the defender sprints back
 * towards the goal (not the ball) to get goal-side, then slows down, shows them wide and wins it or makes the shot hard.
 * Pitch units: x 0..100, y 0..75. The goal is at the BOTTOM. Blue defends it; green attacks it.
 */
(function () {
  const GK = { id: 'gk', team: 'k', label: 'GK', x: 50, y: 73 };
  const common = {
    goals: [[50, 'bottom']],
    marks: [{ x: 18, y: 53, w: 64, h: 22 }, { x: 36, y: 67, w: 28, h: 8 }],
    legend: { a: 'Attacker', d: 'Defender' },
    keyPhrase: { big: 'GOAL, NOT THE BALL', small: 'Sprint back towards your goal, then defend' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: 'recovery-runs',
    draft: true,
    title: 'Recovery Runs: Get Goal-Side',
    subtitle: 'Recovering and 1 v 1 defending',
    type: 'Technical',
    category: 'defending',
    squad: [4, 12],
    thumb: 'assets/thumbs/recovery-runs.jpg',
    summary: 'The attacker is away. Sprint back towards your goal, not the ball, get goal-side, then slow down and defend.',
    keyPhrase: 'Goal, not the ball',
    ages: { from: 8 },

    cards: [
      {
        title: 'The recovery run',
        lead: 'Sprint back towards *your goal*, not the ball.',
        columns: [
          { heading: 'Run', items: ['Turn and *sprint*', 'Run the line to your goal', 'Get *goal-side*: between the ball and the goal'] },
          { heading: 'Then defend', items: ['*Slow down* as you get close', 'Side-on, on your toes', '*Show them wide*, away from goal'] },
        ],
        phrase: { big: 'GOAL, NOT THE BALL', small: 'Sprint back towards your goal, then defend' },
      },
      {
        title: 'Can\'t get goal-side?',
        lead: 'Get to their *inside shoulder* and make it hard.',
        columns: [
          { heading: 'Stay close', items: ['Get *inside* them, nearer the goal', 'Push them *wide*', 'Stay on your feet'] },
          { heading: 'Make it hard', items: ['Tight angle = hard shot', 'Block the shot if you can', 'Never stop running'] },
        ],
      },
    ],

    keywords: [
      { word: 'Recovery run', meaning: 'A sprint back to defend after the attacker has got past you or away from you.' },
      { word: 'Goal-side', meaning: 'Between the ball and the goal you are defending.' },
      { word: 'Inside shoulder', meaning: 'The side of the attacker nearer the middle of the goal.' },
      { word: 'Show them wide', meaning: 'Stand so the attacker can only go towards the side, away from the goal.' },
    ],

    training: {
      area: 'About 20 yards wide and 30 yards long, with a goal and a keeper.',
      players: 'Pairs: one attacker, one defender. Everyone else queues in two lines. A keeper.',
      equipment: 'A goal, cones for the start lines, bibs, plenty of balls.',
      setup: [
        'Attackers queue with a ball. Defenders queue on a cone beside them, a little further from the goal.',
        'On "go" the attacker runs at goal. The defender sprints back towards the goal, not the ball.',
        'Once goal-side, slow down, get side-on and show the attacker wide. Win it if they take a heavy touch.',
        'Swap roles after each go: attackers join the defenders\' line and defenders join the attackers\' line.',
        'Make it harder: start the defender further back, behind the attacker.',
        'If you win it, dribble back over the start line to score a point.',
      ],
    },

    questions: [
      'Where did you run: to the ball or to the goal?',
      'When did you slow down?',
      'Which way did you show the attacker?',
      'If you could not get goal-side, what did you do?',
    ],

    clips: [
      Object.assign({}, common, {
        id: 'goal-side',
        video: 'videos/recovery-runs-1.mp4',
        kicker: 'Clip 1',
        title: 'Get Goal-Side',
        tagline: 'Sprint back towards your goal, then slow down and defend.',
        intro: ['The attacker is *away* with the ball.', 'Sprint back towards *your goal*, not the ball.', 'Get *goal-side*, then defend.'],
        players: [GK, { id: 'A', team: 'a', x: 42, y: 20 }, { id: 'D', team: 'd', x: 57, y: 13 }],
        ball: { owner: 'A' },
        steps: [
          {
            title: 'THE SET-UP',
            text: ['Attacker with the ball.', 'Defender beside them, a little *further from the goal*.'],
          },
          {
            title: 'GO! RECOVER',
            text: ['The attacker goes for goal.', 'Sprint back towards *your goal*, not the ball.', 'The quickest way to get in front.'],
            tags: { A: 'GO!', D: 'RECOVER' }, timing: { move: 3.4 },
            moves: [
              { id: 'A', to: [45, 41], end: 0.9 },
              { id: 'D', path: [[54, 32], [46.5, 50]], start: 0.05, end: 0.85, ease: 'out' },
            ],
          },
          {
            title: 'GOAL-SIDE',
            text: ['You are *between the ball and the goal*.', 'Now turn and face them.'],
            tags: { D: 'GOAL-SIDE' }, timing: { move: 1.6 },
            moves: [{ id: 'A', to: [45, 43], end: 0.8 }],
          },
          {
            title: 'SLOW DOWN, SHOW WIDE',
            text: ['*Slow down*. Don\'t dive in.', 'Side-on, on your toes.', '*Show them wide*, away from goal.'],
            tags: { D: 'SHOW' }, timing: { move: 3 },
            moves: [{ id: 'A', to: [32, 50], end: 0.9 }, { id: 'D', to: [38, 55], start: 0.1, end: 0.9 }],
          },
          {
            title: 'WIN IT',
            text: ['A *heavy touch*?', 'Now step in and *win it*.'],
            tags: { D: 'WON IT!' }, timing: { move: 2.4 },
            moves: [{ id: 'A', to: [29, 53], end: 0.5 }, { id: 'D', to: [32, 56], start: 0.3, end: 0.7 }],
            ball: { pass: 'D', start: 0.55, end: 0.75, arrow: false },
          },
        ],
        summary: ['Sprint back towards *your goal*, not the ball.', 'Get *goal-side*.', 'Slow down, *show them wide*, win it.'],
      }),

      Object.assign({}, common, {
        id: 'start-behind',
        video: 'videos/recovery-runs-2.mp4',
        kicker: 'Clip 2 · harder',
        title: 'Start Behind',
        tagline: 'Can\'t get in front? Get to the inside shoulder and push them wide.',
        intro: ['Harder: the defender starts *behind*.', 'You might not get in front.', 'Get to the *inside shoulder* and push them wide.'],
        players: [GK, { id: 'A', team: 'a', x: 40, y: 24 }, { id: 'D', team: 'd', x: 50, y: 9 }],
        ball: { owner: 'A' },
        steps: [
          {
            title: 'START BEHIND',
            text: ['Now the defender starts *behind* the attacker.', 'A real recovery run.'],
          },
          {
            title: 'INSIDE SHOULDER',
            text: ['Sprint on the *inside*: the side nearer the goal.', 'Get to their *inside shoulder*.'],
            tags: { A: 'GO!', D: 'INSIDE' }, timing: { move: 3.4 },
            moves: [
              { id: 'A', to: [40, 45], end: 0.9 },
              { id: 'D', path: [[50, 28], [46, 47]], start: 0.05, end: 0.9, ease: 'out' },
            ],
          },
          {
            title: 'PUSH THEM WIDE',
            text: ['Stay close. *Push them wide*.', 'Keep them away from the middle of the goal.'],
            tags: { D: 'SHOW' }, timing: { move: 2.8 },
            moves: [{ id: 'A', to: [30, 57], end: 0.9 }, { id: 'D', to: [36, 59], end: 0.9 }],
          },
          {
            title: 'MAKE IT HARD',
            text: ['Only a *tight angle* left.', 'A hard shot: the keeper saves.', '*Never stop running*.'],
            tags: { A: 'SHOOT', gk: 'SAVE' }, timing: { move: 2.2 },
            moves: [{ id: 'gk', to: [45, 71], start: 0.1, end: 0.45, arrow: false }],
            ball: { pass: 'gk', start: 0.3, end: 0.6 },
          },
        ],
        summary: ['Start behind? Sprint on the *inside*.', 'Get to the *inside shoulder*.', '*Push them wide*: a tight angle is a hard shot.'],
      }),
    ],
  });
})();
