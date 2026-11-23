/*
 * SOLO SESSION: Ball Mastery: The Basics (Home Ground)
 *
 * Solo clips (kind: 'solo') show a close-up of two feet and a ball, seen from above. Forward is up the screen.
 * Each step is a list of touches, repeated `reps` times:
 *   touches: ['R sole to -0.5,0', 'L sole to 0.5,0']
 *   = right sole rolls the ball to x -0.5, then left sole rolls it back to x 0.5.
 * Touch: '<L|R> <sole|inside|outside|toe|laces> [to x,y]'. Leave out "to" and the ball stays put (e.g. toe taps).
 * Units: 1 = one ball width. x: left − / right +. y: up the screen − / towards the player +. The ball starts at [0, 0].
 * Optional per step: ball: [x, y] (place the ball), feet: { L: [x, y], R: [x, y] } (where the feet rest), speed (1 = normal).
 */
window.SESSIONS = window.SESSIONS || [];
window.SESSIONS.push({
  id: 'ball-mastery',
  title: 'Ball Mastery: The Basics',
  subtitle: 'Solo practice',
  type: 'Ball mastery',
  category: 'home-ground',
  squad: [1, 1],
  thumb: 'assets/thumbs/ball-mastery.jpg',
  summary: 'Four moves to practise on your own: toe taps, sole rolls, tic-tacs and pull-push. Slow first, then faster.',
  keyPhrase: 'Little touches, lots of them',
  ages: { from: 6 },
  minis: true,   // shown with Grass and Roots in the Minis area

  cards: [
    {
      title: 'How to practise',
      lead: 'A few minutes *every day* beats an hour once a week.',
      columns: [
        { heading: 'Do', items: ['Start *slow*: get it right first', 'Small touches, ball close', 'Use *both feet*', 'Stay on your toes'] },
        { heading: 'Make it harder', items: ['Go faster', '*Head up*: look up between touches', 'Count your touches in 30 seconds', 'Beat your best score'] },
      ],
      phrase: { big: 'SLOW, THEN FAST', small: 'Get it right, then get it quick' },
    },
  ],

  keywords: [
    { word: 'Sole', meaning: 'The bottom of your foot. Good for rolling and stopping the ball.' },
    { word: 'Inside', meaning: 'The inside of your foot, by your big toe.' },
    { word: 'Laces', meaning: 'The top of your foot, where your laces are.' },
    { word: 'Toe tap', meaning: 'Touching the top of the ball with the bottom of your toes, left then right.' },
    { word: 'Tic-tac', meaning: 'Passing the ball between your feet with the insides, quickly.' },
  ],

  training: {
    area: 'A small space: the garden, the park, or indoors with a soft ball.',
    players: 'Just you. A parent or friend can count and time.',
    equipment: 'A ball (size 3 or 4 for younger players). A phone timer.',
    setup: [
      'Do each move for 30 seconds, then rest for 30 seconds.',
      'Start slow. Only go faster when it feels easy.',
      'Do every move with both feet.',
      'Count your touches in 30 seconds and write down your best score.',
      'Try to beat it next time.',
    ],
  },

  questions: [
    'Which move was easiest? Which was hardest?',
    'Can you do it with your other foot?',
    'Could you look up while you did it?',
    'What was your best score in 30 seconds?',
  ],

  clips: [
    // ------------------------------------------------------------------
    {
      id: 'toe-taps',
      kind: 'solo',
      video: 'videos/ball-mastery-1-toe-taps.mp4',
      minisVideo: 'videos/ball-mastery-1-toe-taps-minis.mp4',
      coach: {
        intro: ['Hi Roots! Today: toe taps.', 'Tap the top of the ball with your toes'],
        steps: [['Nice and slow first.', 'Right, left, right, left...'], ['Now faster!', 'Stay on your toes'], ['Challenge!', 'How many in 30 seconds?']],
        outro: ['Great touches, Roots!', 'Same again tomorrow?'],
      },
      kicker: 'Move 1',
      title: 'Toe Taps',
      tagline: 'Tap the top of the ball: right, left, right, left.',
      intro: ['Ball in front of you.', 'Tap the *top of the ball* with your toes.', '*Right, left, right, left.*'],
      keyPhrase: { big: 'RIGHT, LEFT, RIGHT, LEFT', small: 'Light taps, on your toes' },
      feet: { L: [-0.55, 1.6], R: [0.55, 1.6] },
      steps: [
        {
          title: 'SLOW',
          text: ['Tap the top of the ball with your *right toe*, then your *left*.', 'Light taps. Don\'t push it away.'],
          touches: ['R toe', 'L toe'], reps: 4, speed: 0.8,
        },
        {
          title: 'FASTER',
          text: ['Same again, *faster*.', 'Stay on your toes.'],
          touches: ['R toe', 'L toe'], reps: 8, speed: 1.6,
        },
        {
          title: 'CHALLENGE',
          text: ['How many in *30 seconds*?', 'Try it with your *head up*.'],
          touches: ['R toe', 'L toe'], reps: 10, speed: 2.2,
        },
      ],
      summary: ['Tap the *top of the ball*.', '*Right, left*, again and again.', 'Light and quick, on your toes.'],
    },

    // ------------------------------------------------------------------
    {
      id: 'sole-rolls',
      kind: 'solo',
      video: 'videos/ball-mastery-2-sole-rolls.mp4',
      minisVideo: 'videos/ball-mastery-2-sole-rolls-minis.mp4',
      coach: {
        intro: ['Sole rolls, Roots!', 'Bottom of your foot on top of the ball'],
        steps: [['One foot first.', 'Roll it across, then back'], ['Now swap feet.', 'Right rolls it, left rolls it back'], ['Faster!', 'Little hops, foot to foot']],
        outro: ['Lovely rolling!', 'Roll it, don\'t kick it'],
      },
      kicker: 'Move 2',
      title: 'Sole Rolls',
      tagline: 'Roll the ball across with the bottom of your foot.',
      intro: ['Put your *sole* on top of the ball.', 'Roll it *across* your body.', 'Then the other foot rolls it back.'],
      keyPhrase: { big: 'ROLL IT, DON\'T KICK IT', small: 'Sole on top of the ball' },
      ball: [0.5, 0],
      steps: [
        {
          title: 'ONE FOOT',
          text: ['*Right sole* on top of the ball.', 'Roll it across, then roll it back.'],
          touches: ['R sole to -0.5,0', 'R sole to 0.5,0'], reps: 2, speed: 0.7,
        },
        {
          title: 'SWAP FEET',
          text: ['*Right sole* rolls it across.', '*Left sole* rolls it back.'],
          touches: ['R sole to -0.5,0', 'L sole to 0.5,0'], reps: 3, speed: 0.8,
        },
        {
          title: 'FASTER',
          text: ['Keep it going, *faster*.', 'Little hops from foot to foot.'],
          touches: ['R sole to -0.5,0', 'L sole to 0.5,0'], reps: 6, speed: 1.5,
        },
      ],
      summary: ['*Sole on top* of the ball.', 'Roll it across, don\'t kick it.', 'Swap feet: *right, left*.'],
    },

    // ------------------------------------------------------------------
    {
      id: 'tic-tacs',
      kind: 'solo',
      video: 'videos/ball-mastery-3-tic-tacs.mp4',
      minisVideo: 'videos/ball-mastery-3-tic-tacs-minis.mp4',
      coach: {
        intro: ['Tic-tacs time!', 'Ball between your feet'],
        steps: [['Slow first.', 'Inside, inside'], ['Faster now!', 'Small touches, keep it close'], ['Head up, Roots!', 'Can you feel where the ball is?']],
        outro: ['Brilliant, Roots!', 'Little touches, lots of them'],
      },
      kicker: 'Move 3',
      title: 'Tic-Tacs',
      tagline: 'Pass the ball between your feet with the insides.',
      intro: ['Ball *between your feet*.', 'Pass it from one foot to the other.', 'Use the *inside* of your foot.'],
      keyPhrase: { big: 'INSIDE, INSIDE', small: 'Small, quick touches between your feet' },
      feet: { L: [-0.95, 0.35], R: [0.95, 0.35] },
      ball: [0.22, 0.35],
      steps: [
        {
          title: 'SLOW',
          text: ['*Right inside* passes it to your left foot.', '*Left inside* passes it back.'],
          touches: ['R inside to -0.22,0.35', 'L inside to 0.22,0.35'], reps: 3, speed: 0.8,
        },
        {
          title: 'FASTER',
          text: ['Smaller touches, *faster*.', 'Keep the ball close.'],
          touches: ['R inside to -0.22,0.35', 'L inside to 0.22,0.35'], reps: 8, speed: 1.8,
        },
        {
          title: 'HEAD UP',
          text: ['Now *look up* while you do it.', 'Can you feel where the ball is?'],
          touches: ['R inside to -0.22,0.35', 'L inside to 0.22,0.35'], reps: 8, speed: 1.8,
        },
      ],
      summary: ['Ball *between your feet*.', 'Use the *inside* of each foot.', 'Small, quick touches. Then *head up*.'],
    },

    // ------------------------------------------------------------------
    {
      id: 'pull-push',
      kind: 'solo',
      video: 'videos/ball-mastery-4-pull-push.mp4',
      minisVideo: 'videos/ball-mastery-4-pull-push-minis.mp4',
      coach: {
        intro: ['Pull-push, Roots!', 'Sole pulls it back, laces push it'],
        steps: [['Right foot first.', 'Pull, push'], ['Now your left foot.', 'Pull, push'], ['Put it together!', 'Pull, push, pass it across']],
        outro: ['Superstar, Roots!', 'Both feet, every day'],
      },
      kicker: 'Move 4',
      title: 'Pull-Push',
      tagline: 'Pull it back with your sole, push it out with your laces.',
      intro: ['*Pull* the ball back with your sole.', '*Push* it forward with your laces.', 'Then pass it across to the other foot.'],
      keyPhrase: { big: 'PULL, PUSH', small: 'Sole back, laces forward' },
      ball: [0.62, -0.3],
      steps: [
        {
          title: 'RIGHT FOOT',
          text: ['*Right sole* pulls the ball back.', '*Right laces* push it forward again.'],
          touches: ['R sole to 0.62,0.45', 'R laces to 0.62,-0.3'], reps: 2, speed: 0.7,
        },
        {
          title: 'LEFT FOOT',
          text: ['Same with your *left foot*.'],
          ball: [-0.62, -0.3],
          touches: ['L sole to -0.62,0.45', 'L laces to -0.62,-0.3'], reps: 2, speed: 0.7,
        },
        {
          title: 'PULL, PUSH, PASS ACROSS',
          text: ['Pull, push, then the *inside* passes it across.', 'The other foot does the same.'],
          ball: [0.62, -0.3],
          touches: ['R sole to 0.62,0.45', 'R laces to 0.62,-0.3', 'R inside to -0.62,-0.3', 'L sole to -0.62,0.45', 'L laces to -0.62,-0.3', 'L inside to 0.62,-0.3'],
          reps: 2, speed: 1,
        },
      ],
      summary: ['*Sole* pulls it back.', '*Laces* push it forward.', '*Inside* passes it across. Both feet.'],
    },
  ],
});
