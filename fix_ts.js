const fs = require('fs');
let content = fs.readFileSync('components/layout/PageTransition.tsx', 'utf-8');

content = content.replace(
  "const textEl = wipeEl.querySelector('.transition-text');",
  "const textEl = wipeEl?.querySelector('.transition-text');"
);

fs.writeFileSync('components/layout/PageTransition.tsx', content, 'utf-8');
