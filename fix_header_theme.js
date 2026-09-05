const fs = require('fs');

let content = fs.readFileSync('components/layout/Header.tsx', 'utf-8');

content = content.replace(
  '<header \n        className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none"\n      >',
  '<header \n        className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none"\n        data-theme={theme === "light" ? "golden" : undefined}\n      >'
);

// Fallback if the above doesn't match perfectly
if (!content.includes('data-theme={theme === "light" ? "golden" : undefined}')) {
  content = content.replace(
    'className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none"',
    'className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none" data-theme={theme === "light" ? "golden" : undefined}'
  );
}

fs.writeFileSync('components/layout/Header.tsx', content, 'utf-8');
