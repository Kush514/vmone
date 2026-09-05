const fs = require('fs');
let content = fs.readFileSync('components/layout/PageTransition.tsx', 'utf-8');

// The JSX
content = content.replace(
  /<div \s*ref=\{wipeRef\}[\s\S]*?<\/div>\s*<\/div>/,
  `<div 
        ref={wipeRef} 
        className="fixed inset-0 z-[9999] bg-primary-dark flex items-center justify-center overflow-hidden border-t border-b border-brand-gold" 
        style={{ display: 'none', transform: 'translateY(100%)' }} 
        aria-hidden="true"
      >
        <div className="transition-text font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-100 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(224,205,127,0.3)]">
          VMONE
        </div>
      </div>`
);

fs.writeFileSync('components/layout/PageTransition.tsx', content, 'utf-8');
