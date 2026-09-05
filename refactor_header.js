const fs = require('fs');

let content = fs.readFileSync('components/layout/Header.tsx', 'utf-8');

// 1. Add data-theme to header
content = content.replace(
  '<header \n        className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none"\n      >',
  '<header \n        className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none"\n        data-theme={theme === "light" ? "golden" : undefined}\n      >'
);

// 2. Simplify the ternaries because data-theme handles the inversion!
// MenuButton Text
content = content.replace(
  "${theme === 'dark' ? 'text-pure-white group-hover:text-brand-gold' : 'text-primary-dark group-hover:text-pure-white'}",
  "text-pure-white group-hover:text-brand-gold"
);
// MenuButton Lines (x2)
content = content.replaceAll(
  "${theme === 'dark' ? 'bg-pure-white group-hover:bg-brand-gold' : 'bg-primary-dark group-hover:bg-pure-white'}",
  "bg-pure-white group-hover:bg-brand-gold"
);

// Logo Block
content = content.replace(
  "${theme === 'dark' ? 'text-pure-white group-hover:text-brand-gold' : 'text-primary-dark group-hover:text-pure-white'}",
  "text-pure-white group-hover:text-brand-gold"
);
// Logo Subtitle
content = content.replace(
  "${theme === 'dark' ? 'text-pure-white/60 group-hover:text-brand-gold/80' : 'text-muted-dark group-hover:text-primary-dark'}",
  "text-pure-white/60 group-hover:text-brand-gold"
);

// Desktop Links (Not active)
content = content.replace(
  "(theme === 'dark' ? 'text-pure-white group-hover:text-brand-gold' : 'text-muted-dark group-hover:text-primary-dark')",
  "'text-pure-white/70 group-hover:text-pure-white'"
);
// Desktop Links (Active)
content = content.replace(
  "(theme === 'dark' ? 'text-brand-gold' : 'text-primary-dark')",
  "'text-pure-white'"
);
// Desktop Links Underline
content = content.replace(
  "${theme === 'dark' ? 'bg-brand-gold' : 'bg-primary-dark'}",
  "bg-pure-white"
);

// CTA Button
content = content.replace(
  "${theme === 'dark' ? 'bg-brand-gold text-primary-dark hover:bg-pure-white focus-visible:ring-white focus-visible:ring-offset-primary-dark' : 'bg-primary-dark text-brand-gold hover:bg-brand-gold hover:text-primary-dark focus-visible:ring-primary-dark focus-visible:ring-offset-brand-gold'}",
  "bg-brand-gold text-primary-dark hover:bg-pure-white hover:text-primary-dark focus-visible:ring-pure-white focus-visible:ring-offset-primary-dark"
);

fs.writeFileSync('components/layout/Header.tsx', content, 'utf-8');
