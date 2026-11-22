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

// Sign-up / request form links. Leave null until the forms exist; the buttons then show "Opening soon".
window.SITE_LINKS = {
  suggestTopic: null,     // e.g. 'https://tally.so/r/xxxx'
  bespokeSession: null,
  kitRoomInterest: null,
};

window.AREAS = [
  { id: 'dugout', name: 'The Dugout', tag: 'For coaches',
    blurb: 'Ask for a topic you want covered, or have your own session plan turned into animated clips.',
    icon: '<path d="M3 13a9 9 0 0 1 18 0v6H3z"/><path d="M7 19v-4h10v4"/>' },
  { id: 'home-ground', name: 'Home Ground', tag: 'Solo practice',
    blurb: 'Things to practise on your own: in the garden, at the park or against a wall.',
    icon: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><circle cx="12" cy="15" r="2.5"/>',
    plans: ['Wall passes: both feet', 'Ball mastery 2: drag-backs and turns', 'First touch away from pressure',
      'Shooting at a target', '1 v 1 moves: step-over, drag-back, Cruyff turn', 'Keepy-uppy challenges'] },
  { id: 'kit-room', name: 'Kit Room', tag: 'Shop',
    blurb: 'GRSS | RTS training wear and kit for players, parents and coaches.',
    icon: '<path d="M8 4l-5 3 2 4 3-1v10h8V10l3 1 2-4-5-3c-.5 1.7-2 3-4 3s-3.5-1.3-4-3z"/>',
    plans: ['Training tops', 'Hoodies', 'Coaches’ jackets', 'Water bottles', 'Kit bags'] },
];
