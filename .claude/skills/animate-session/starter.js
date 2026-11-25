/*
 * SESSION (DRAFT): <Title> (<Section> · <focus>)
 * From a coach's own session plan. draft: true keeps it off the site until approved (index.html?drafts#<id>).
 *
 * <One or two lines: the set-up, how it scores, the progressions.>
 * Pitch units: x 0..100 (left → right), y 0..75 (top → bottom).
 *
 * STARTER: copy to drills/<id>.js, rename everything in <>, delete what you don't need. Field reference: CHEATSHEET.md.
 */
(function () {
  const G = '#2fbf7f', R = '#e5484d';
  const common = {
    plain: true,                                   // light pitch with no dots; drop it for a normal pitch
    goals: [[50, 'top']],                          // [] for none; [[x,'top'|'bottom']] or [[y,'left'|'right']]
    marks: [{ x: 18, y: 0, w: 64, h: 22 }],        // pitch lines (h: 0 for a single line)
    areas: [{ x: 20, y: 30, w: 60, h: 40, fill: 'rgba(240,205,110,0.18)' }],   // coned areas (cones at corners)
    cones: [{ at: [50, 60] }],                     // single cones; color: '#e5b52b' etc.
    teamColors: { g: G, r: R },                    // custom teams; built in: a (green), d (blue), k (keeper)
    facing: { g: -1, r: 1 },                       // which way each team faces (ball sits in front): -1 up, 1 down
    legendTeams: [{ label: 'Attackers', color: G }, { label: 'Defenders', color: R }],
    players: [
      { id: 'gk', team: 'k', label: 'GK', x: 50, y: 4 },
      { id: 'A1', team: 'g', label: 'ST', x: 40, y: 50 },
      { id: 'A2', team: 'g', label: 'W', x: 70, y: 55 },
      { id: 'D1', team: 'r', label: 'D', x: 48, y: 38 },
    ],
    ball: { owner: 'A1' },
    keyPhrase: { big: '<KEY PHRASE>', small: '<one-line reminder>' },
  };

  window.SESSIONS = window.SESSIONS || [];
  window.SESSIONS.push({
    id: '<id>',
    draft: true,
    title: '<Title>',
    subtitle: '<Short subtitle>',
    type: 'Technical',                             // Technical | Tactical | Game | Rondo
    category: 'attacking',                         // attacking | defending | goalkeeping | home-ground
    topics: ['Passing'],                           // from TOPICS in js/categories.js only
    squad: [6, 12],
    thumb: 'assets/thumbs/<id>.jpg',
    summary: '<One sentence for the session list.>',
    keyPhrase: '<Key phrase>',
    ages: { from: 10 },

    cards: [
      { title: '<Card title>', lead: '<Lead with *highlight*>.',
        columns: [{ heading: '<Heading>', items: ['<point>', '<point>'] }, { heading: '<Heading>', items: ['<point>'] }],
        phrase: { big: '<KEY PHRASE>', small: '<reminder>' } },
    ],
    keywords: [{ word: '<Word>', meaning: '<Plain meaning.>' }],
    training: {
      area: '<Size of area>', players: '<Who and how many>', equipment: '<Cones, bibs, balls>',
      setup: ['<How it starts>', '<How it scores>', '<Progression>'],
    },
    questions: ['<Question to ask players>?'],

    clips: [
      Object.assign({}, common, {
        id: '<clip-id>',
        video: 'videos/<id>-1.mp4',
        kicker: 'Clip 1',
        title: '<Clip Title>',                     // keep short: it must fit the title card
        tagline: '<One line under the title>',
        intro: ['<Line 1>', '<Line 2 with *highlight*>', '<Line 3>'],
        steps: [
          { title: 'THE SET-UP', text: ['<What we see>.'] },                     // no motion: just the picture
          {
            title: 'PASS AND MOVE', text: ['<Pass to the winger>...', '...<who runs onto it>.'],
            tags: { A2: 'RUN' }, timing: { move: 3 },
            moves: [{ id: 'A2', path: [[75, 45], [70, 30]], end: 0.8 }],         // run arrow, then movement
            passes: [{ to: 'A2', start: 0.3, end: 0.8 }],                        // pass arrow, then the ball goes
          },
          {
            title: 'SHOOT', text: ['<Touch and *shoot*>.'],
            tags: { A2: 'SHOOT' }, shot: [50, -2], timing: { move: 2.4 },
            ball: { to: [48, -2.5], start: 0.2, end: 0.55 },                     // ball into the goal (keep x 47-53)
            moves: [{ id: 'gk', to: [48, 4], start: 0.25, end: 0.55, arrow: false }],
          },
        ],
        summary: ['<Recap 1>', '<Recap 2>', '<Recap 3>'],
      }),
    ],
  });
})();
