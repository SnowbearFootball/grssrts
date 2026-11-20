// Sections on the home page: moments of the game, plus individual skills and goalkeeping.
// A session joins a section with  category: '<id>'  in its drill file.
window.CATEGORIES = [
  { id: 'defending', name: 'Defending', blurb: 'Out of possession: team shape, pressing and winning the ball back.',
    icon: '<path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/>' },
  { id: 'attacking', name: 'Attacking', blurb: 'In possession: building up, creating chances and finishing as a team.',
    icon: '<path d="M5 19L18 6"/><path d="M9 6h9v9"/>' },
  { id: 'transitions', name: 'Transitions', blurb: 'The first five seconds after we win or lose the ball.',
    icon: '<path d="M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4"/><path d="M20 12a8 8 0 0 1-14 5.3"/><path d="M6 21v-4h4"/>' },
  { id: 'skills', name: 'Skills', blurb: 'Passing, dribbling, shooting, first touch and 1 v 1s.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8.2l3.2 2.3-1.2 3.8h-4l-1.2-3.8z"/>' },
  { id: 'goalkeeping', name: 'Goalkeeping', blurb: 'Handling, footwork, positioning and distribution.',
    icon: '<path d="M3 19V7h18v12"/><path d="M3 7l3 3h12l3-3"/><path d="M6 10v9M18 10v9"/>' },
];
