// Gives the site's own scripts a new version number (?v=...) so phones fetch fresh copies after an update.
// Run before each pull request:  node tools/bump-version.js
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'index.html');
const v = new Date().toISOString().replace(/\D/g, '').slice(0, 12);   // e.g. 202611241130
const html = fs.readFileSync(file, 'utf8')
  .replace(/(<script src="(?:js|drills)\/[^"?]+\.js)(?:\?v=\w+)?"/g, `$1?v=${v}"`);
fs.writeFileSync(file, html);
console.log('version', v, '·', (html.match(/\?v=/g) || []).length, 'scripts');
