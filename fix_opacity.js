const fs = require('fs');
let content = fs.readFileSync('components/layout/PageTransition.tsx', 'utf-8');

// The original strings (with opacity-100)
content = content.replaceAll('opacity-100', 'opacity-10');

fs.writeFileSync('components/layout/PageTransition.tsx', content, 'utf-8');
