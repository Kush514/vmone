const fs = require('fs');

function replaceAllInFile(filePath, search, replacement) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replaceAll(search, replacement);
  fs.writeFileSync(filePath, content, 'utf-8');
}

replaceAllInFile('components/layout/FullscreenMenu.tsx', 'bg-[#000000]', 'bg-primary-dark');
replaceAllInFile('components/ui/Preloader.tsx', 'bg-[#000000]', 'bg-primary-dark');

// Header has text-[#171717] and bg-[#171717] which should be text-primary-dark and bg-primary-dark
// Header has text-[#B8924A] and bg-[#B8924A] which should be text-pure-white and bg-pure-white (or maybe text-muted-dark)
// Wait, if it's over a Golden section, the text is primary-dark, but the HOVER should probably just be pure-white
replaceAllInFile('components/layout/Header.tsx', 'text-[#171717]', 'text-primary-dark');
replaceAllInFile('components/layout/Header.tsx', 'bg-[#171717]', 'bg-primary-dark');
replaceAllInFile('components/layout/Header.tsx', 'text-[#B8924A]', 'text-pure-white');
replaceAllInFile('components/layout/Header.tsx', 'bg-[#B8924A]', 'bg-pure-white');
replaceAllInFile('components/layout/Header.tsx', 'text-[#5F5B54]', 'text-muted-dark');
replaceAllInFile('components/layout/Header.tsx', 'bg-[#D2B06A]', 'bg-primary-dark');

// Let's also check Footer for any hardcoded #000000
if (fs.existsSync('components/layout/Footer.tsx')) {
    replaceAllInFile('components/layout/Footer.tsx', 'bg-[#000000]', 'bg-primary-dark');
    replaceAllInFile('components/layout/Footer.tsx', 'bg-black', 'bg-primary-dark');
    replaceAllInFile('components/layout/Footer.tsx', 'text-white', 'text-pure-white');
    replaceAllInFile('components/layout/Footer.tsx', 'text-black', 'text-primary-dark');
}

