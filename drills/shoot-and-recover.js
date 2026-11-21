/*
 * SESSION: Shoot & Recover (Attacking · shooting)
 *
 * Two goals with keepers, two queues. A player dribbles and shoots, then keeps running to touch a post.
 * Touching the post sends the next player from the other queue, and the post-toucher sprints back
 * to defend. Then roles swap: the defender rejoins their queue, the striker touches the post and recovers.
 *
 * Pitch units: x 0..100 (left → right), y 0..75 (top → bottom).
 * Engine colours: team 'd' (blue) attacks UP from the bottom-right queue; team 'a' (green) attacks DOWN
 * from the top-left queue; team 'k' are the goalkeepers.
 */
window.SESSIONS = window.SESSIONS || [];
window.SESSIONS.push({
  id: 'shoot-and-recover',
  title: 'Shoot & Recover',
  subtitle: 'Shooting',
  category: 'attacking',
  thumb: 'assets/thumbs/shoot-and-recover.jpg',
  summary: 'Dribble, shoot, touch the post, then sprint back to defend. Lots of shots, and a recovery run every time.',
  keyPhrase: 'Shoot → Touch → Recover',
  ages: { from: 8 },

  cards: [
    {
      title: 'The shooter',
      lead: 'Head up, quick feet, *hit the target*.',
      columns: [
        { heading: 'Dribble', items: ['Big touches into space', 'Head up: where is the keeper?', 'Attack at speed'] },
        { heading: 'Shoot', items: ['Hit the target first', 'Aim for the corners', 'Follow your shot in'] },
      ],
      phrase: { big: 'HIT THE TARGET', small: 'A shot on target always has a chance' },
    },
    {
      title: 'The recovering defender',
      lead: 'Your shot is done. *Now defend: try to stop the striker scoring.*',
      columns: [
        { heading: 'Recover', items: ['Sprint straight back', 'Get *goal-side*: between the ball and the goal', 'Never give up the chase'] },
        { heading: 'Defend', items: ['Your job: *stop them scoring*', 'Slow them down', 'Block the shot', 'Stay on your feet'] },
      ],
      phrase: { big: 'NEVER STOP', small: 'Finish your shot, then get back and stop the goal' },
    },
  ],

  keywords: [
    { word: 'Hit the target', meaning: 'Make the keeper save it. A shot that misses can never go in.' },
    { word: 'Trigger', meaning: 'Touching the post. It sends the next player from the other team.' },
    { word: 'Recover', meaning: 'Sprint back after losing the ball (or shooting) to help defend.' },
    { word: 'Goal-side', meaning: 'Between the attacker and the goal you are defending.' },
  ],

  training: {
    area: 'Half a pitch, with the goals about 15–20 yards apart.',
    players: '6 to 10 players in two queues, plus a goalkeeper in each goal.',
    equipment: 'Two goals, a ball for every player, cones to mark the queues.',
    setup: [
      'One queue beside each goal, every player with a ball.',
      'First player dribbles up and shoots at the far goal.',
      'They keep running and touch one post. That sends the next player from the other queue.',
      'The player who touched the post sprints back as a defender to stop that player scoring.',
      'When the move ends, the defender rejoins their queue; the striker touches the post and becomes the next defender.',
      'Keep it going. Swap the keepers so everyone has a spell in goal.',
    ],
  },

  questions: [
    'Where was the keeper standing before you shot?',
    'Did you hit the target? Which corner were you aiming for?',
    'After you touched the post, how quickly did you get back?',
    'As the defender, did you get goal-side?',
    'What can the striker do when a defender is chasing them?',
  ],

  clips: [
    {
      id: 'drill',
      video: 'videos/shoot-and-recover-1.mp4',
      kicker: 'Clip 1',
      title: 'Shoot & Recover',
      tagline: 'Dribble, shoot, touch the post, then get back and defend.',
      intro: [
        'Two goals, two keepers, two queues.',
        'Every player has a ball.',
        '*Shoot*, *touch the post*, then *recover* to defend.',
      ],
      keyPhrase: { big: 'SHOOT → TOUCH → RECOVER', small: 'Shoot, touch the post, sprint back to defend' },
      legend: { a: 'Green team', d: 'Blue team' },
      goals: [[50, 'top'], [50, 'bottom']],
      players: [
        { id: 'k1', team: 'k', label: 'GK', x: 50, y: 1.5 },
        { id: 'k2', team: 'k', label: 'GK', x: 50, y: 73.5 },
        { id: 'g1', team: 'a', x: 37, y: -0.5, ball: true },
        { id: 'g2', team: 'a', x: 31, y: -1, ball: true },
        { id: 'g3', team: 'a', x: 25, y: -1, ball: true },
        { id: 'b1', team: 'd', x: 61, y: 72.5, ball: true },
        { id: 'b2', team: 'd', x: 66, y: 77, ball: true },
        { id: 'b3', team: 'd', x: 72, y: 77, ball: true },
        { id: 'b4', team: 'd', x: 78, y: 77, ball: true },
      ],
      ball: { owner: 'b1' },
      steps: [
        {
          title: 'DRIBBLE AND SHOOT',
          text: [
            'First player dribbles up the pitch at speed.',
            'Head up: where is the keeper?',
            '*Shoot* and hit the target.',
          ],
          tags: { b1: 'SHOOT' },
          timing: { move: 3.2 },
          moves: [
            { id: 'b1', path: [[60, 52], [57, 24]], end: 0.72 },
            { id: 'k1', to: [52, 1.5], start: 0.72, arrow: false },
          ],
          ball: { to: [53, -3.3], start: 0.74, end: 0.92 },
        },
        {
          title: 'TOUCH THE POST',
          text: [
            'Don\'t stop after the shot.',
            'Keep running and *touch a post*.',
            'That\'s the *trigger* for the other team to go.',
          ],
          tags: { b1: 'GO!' },
          moves: [
            { id: 'b1', to: [57, 0.5] },
            { id: 'k1', to: [50, 1.5], arrow: false },
          ],
        },
        {
          title: 'NEXT PLAYER GOES',
          text: [
            'The next player from the other queue dribbles and shoots.',
            'The player who touched the post *recovers*: sprint back and try to stop the goal.',
            'Get *goal-side*.',
          ],
          tags: { g1: 'SHOOT', b1: 'DEFEND' },
          timing: { move: 3.4 },
          moves: [
            { id: 'g1', path: [[40, 20], [41, 54]], end: 0.74 },
            { id: 'b1', path: [[56, 16], [51, 48]], start: 0.12, end: 0.82, ease: 'out' },
            { id: 'k2', to: [48, 73.5], start: 0.74, arrow: false },
          ],
          ball: { give: 'g1', to: [47.5, 78.5], start: 0.76, end: 0.93 },
        },
        {
          title: 'SWAP OVER',
          text: [
            'The defender drops out and *rejoins their queue*.',
            'The striker touches the post and becomes the *next defender*.',
          ],
          moves: [
            { id: 'b1', path: [[64, 62], [84, 77]] },
            { id: 'g1', path: [[42, 66], [43, 74.5]], start: 0.1 },
            { id: 'k2', to: [50, 73.5], arrow: false },
          ],
        },
        {
          title: 'KEEP IT GOING',
          text: [
            'Next player dribbles and shoots.',
            'The new defender sprints back to stop them.',
            'Keep the cycle going: *shoot, touch, recover*.',
          ],
          tags: { b2: 'SHOOT', g1: 'DEFEND' },
          timing: { move: 3.4 },
          moves: [
            { id: 'b2', path: [[65, 60], [58, 25]], end: 0.74 },
            { id: 'g1', path: [[46, 60], [49, 30]], start: 0.12, end: 0.82, ease: 'out' },
            { id: 'k1', to: [48.5, 1.5], start: 0.74, arrow: false },
          ],
          ball: { give: 'b2', to: [48.5, -3.3], start: 0.76, end: 0.93 },
        },
      ],
      summary: [
        'Dribble at speed and *hit the target*.',
        'Touch the post: that sends the other team.',
        'Then *sprint back* and get goal-side.',
        'Swap the keepers so *everyone has a spell in goal*.',
      ],
    },
  ],
});
