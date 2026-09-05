const fs = require('fs');

let content = fs.readFileSync('components/layout/PageTransition.tsx', 'utf-8');

// Inside handleGlobalClick, before gsap.set
const insertionTarget = `      if (prefersReducedMotion) {`;
const dynamicClassLogic = `
      // Dynamically set transition colors based on target route
      const isDarkRoute = url.pathname === '/' || url.pathname === '/reviews' || url.pathname === '/true-view';
      const wipeEl = wipeRef.current;
      const textEl = wipeEl.querySelector('.transition-text');
      
      if (wipeEl && textEl) {
        if (isDarkRoute) {
          wipeEl.className = "fixed inset-0 z-[9999] bg-primary-dark flex items-center justify-center overflow-hidden border-t border-b border-brand-gold";
          textEl.className = "transition-text font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-100 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(224,205,127,0.3)]";
        } else {
          wipeEl.className = "fixed inset-0 z-[9999] bg-brand-gold flex items-center justify-center overflow-hidden border-t border-b border-primary-dark";
          textEl.className = "transition-text font-display font-bold text-primary-dark text-[clamp(6rem,20vw,25rem)] opacity-100 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(0,0,0,0.3)]";
        }
      }

      if (prefersReducedMotion) {`;

content = content.replace(insertionTarget, dynamicClassLogic);

// Replace JSX elements
const jsxTarget = `<div 
        ref={wipeRef} 
        className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden border-t border-b border-brand-gold" 
        style={{ display: 'none', transform: 'translateY(100%)' }} 
        aria-hidden="true"
      >
        <div className="font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-10 tracking-tighter uppercase whitespace-nowrap">
          VMONE
        </div>
      </div>`;

const jsxReplacement = `<div 
        ref={wipeRef} 
        className="fixed inset-0 z-[9999] bg-primary-dark flex items-center justify-center overflow-hidden border-t border-b border-brand-gold" 
        style={{ display: 'none', transform: 'translateY(100%)' }} 
        aria-hidden="true"
      >
        <div className="transition-text font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-100 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(224,205,127,0.3)]">
          VMONE
        </div>
      </div>`;

content = content.replace(jsxTarget, jsxReplacement);

fs.writeFileSync('components/layout/PageTransition.tsx', content, 'utf-8');
