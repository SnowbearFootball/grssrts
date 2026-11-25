// Site structure.
// CATEGORIES: the main sections. A session joins one with  category: '<id>'  in its drill file.
// AREAS: the other parts of the site (solo practice, coach requests, shop).
// To rename anything, change `name` here; the id is the page address (grssrts.co.uk/#<id>).
window.CATEGORIES = [
  { id: 'goalkeeping', name: 'Goalkeeping', blurb: 'Handling, footwork, positioning and distribution.',
    icon: '<path d="M3 19V7h18v12"/><path d="M3 7l3 3h12l3-3"/><path d="M6 10v9M18 10v9"/>' },
  { id: 'defending', name: 'Defending', blurb: 'Team shape, pressing and winning the ball back.',
    icon: '<path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/>' },
  { id: 'attacking', name: 'Attacking', blurb: 'Building up, creating chances and finishing as a team.',
    icon: '<path d="M5 19L18 6"/><path d="M9 6h9v9"/>' },
];

// Switches for parts of the site still being checked. While false, they only show with ?drafts in the address.
window.SITE_FLAGS = {
  minis: true,    // the Minis part of Home Ground, and Grass and Roots on the Minis clips
  newHome: false, // the lean, benefit-led home page. Preview with ?drafts
  shelves: true,  // neat section pages (type pills, my age group, rows). Preview with ?drafts
  members: false, // accounts: section pages with type pills, padlocks and Log in / Join free. Preview with ?drafts
};

// One free session per section (no sign-up needed), shown first on the section page. Change it each month.
window.FREE_SESSIONS = {
  attacking: 'penetration-dribbling',
  defending: 'splash-and-ripple',
  goalkeeping: 'set-position',
};

// Topics: pick from these when adding a session (topics: ['Passing', ...] in its drill file). Keep them generic.
window.TOPICS = {
  attacking: ['Passing', 'Dribbling', 'Shooting', 'Crossing', 'Combination play', 'Build-up play', 'Switching play', 'Counter-attacks'],
  defending: ['Pressing', 'Tackling', 'Shape', 'Transition', 'Crosses'],
  goalkeeping: ['Handling', 'Shot-stopping', 'Positioning', 'Distribution', 'Crosses'],
  any: ['Warm-ups', 'Small-sided games'],
};

// Sign-up / request form links. Leave null until the forms exist; the buttons then show "Opening soon".
window.SITE_LINKS = {
  suggestTopic: null,     // e.g. 'https://tally.so/r/xxxx'
  bespokeSession: 'https://tally.so/r/o92ajb',   // Tally: Send your session (GRSS RTS)
  kitRoomInterest: null,
  // Join page: the MailerLite form's address (from MailerLite: Forms > Embedded form > HTML code, the form "action").
  // Leave null until MailerLite is set up; the Join button then says sign-up opens soon.
  joinForm: null,
  contactEmail: 'hello@grssrts.co.uk',     // shown on the privacy page
};

// Clubs on a trial: grssrts.co.uk/?club=<code>#join fills in the club and shows the trial offer.
window.CLUBS = {
  bhtfc: 'Burgess Hill Town F.C.',
};

window.AREAS = [
  { id: 'dugout', name: 'The Dugout', tag: 'For coaches',
    blurb: 'Ask for a topic you want covered, or have your own session plan turned into animated clips.',
    icon: '<path d="M3 13a9 9 0 0 1 18 0v6H3z"/><path d="M7 19v-4h10v4"/>' },
  { id: 'home-ground', name: 'Home Ground', tag: 'Practise at home',
    blurb: 'Things to practise on your own: in the garden, at the park or against a wall. A few minutes every day makes a big difference. Choose your group below.',
    // two parts, each with its own page (#minis, #juniors)
    parts: [
      { id: 'minis', name: 'Minis', ages: 'U8 and under', blurb: 'Learn the basics with Grass and Roots: short, fun clips to copy, and stars to collect as you get better.' },
      { id: 'juniors', name: 'Juniors', ages: 'U9 and up', blurb: 'Solo drills to sharpen your skills: first touch, turns, passing and shooting, with a clip for each.' },
    ],
    icon: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><circle cx="12" cy="15" r="2.5"/>',
    plans: ['Wall passes: both feet', 'Ball mastery 2: drag-backs and turns', 'First touch away from pressure',
      'Shooting at a target', '1 v 1 moves: step-over, drag-back, Cruyff turn', 'Keepy-uppy challenges'] },
  { id: 'join', name: 'Join', tag: 'Free sign-up',
    blurb: 'Join the GRSS | RTS squad: new sessions in your inbox, and your own sessions animated.',
    icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>' },
  { id: 'privacy', name: 'Privacy', tag: 'Your details', unlisted: true,
    blurb: 'What we keep, why, and how to have it removed. In plain English.',
    icon: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>' },
  { id: 'kit-room', name: 'Kit Room', tag: 'Shop',
    blurb: 'GRSS | RTS training wear and kit for players, parents and coaches.',
    icon: '<path d="M8 4l-5 3 2 4 3-1v10h8V10l3 1 2-4-5-3c-.5 1.7-2 3-4 3s-3.5-1.3-4-3z"/>',
    plans: ['Training tops', 'Hoodies', 'Coaches’ jackets', 'Water bottles', 'Kit bags'] },
];
