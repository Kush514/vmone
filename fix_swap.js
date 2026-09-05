const fs = require('fs');

let content = fs.readFileSync('components/layout/PageTransition.tsx', 'utf-8');

// The original strings
const noirWipe = 'wipeEl.className = "fixed inset-0 z-[9999] bg-primary-dark flex items-center justify-center overflow-hidden border-t border-b border-brand-gold";';
const goldText = 'textEl.className = "transition-text font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-100 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(224,205,127,0.3)]";';

const goldWipe = 'wipeEl.className = "fixed inset-0 z-[9999] bg-brand-gold flex items-center justify-center overflow-hidden border-t border-b border-primary-dark";';
const noirText = 'textEl.className = "transition-text font-display font-bold text-primary-dark text-[clamp(6rem,20vw,25rem)] opacity-100 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(0,0,0,0.3)]";';

// We want to replace the if (isDarkRoute) block to apply goldWipe/noirText
const targetBlock = `        if (isDarkRoute) {
          ${noirWipe}
          ${goldText}
        } else {
          ${goldWipe}
          ${noirText}
        }`;

const replacementBlock = `        if (isDarkRoute) {
          ${goldWipe}
          ${noirText}
        } else {
          ${noirWipe}
          ${goldText}
        }`;

content = content.replace(targetBlock, replacementBlock);
fs.writeFileSync('components/layout/PageTransition.tsx', content, 'utf-8');
