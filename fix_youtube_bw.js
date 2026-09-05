const fs = require('fs');

let content = fs.readFileSync('components/youtube/YoutubeContent.tsx', 'utf-8');

const targetClass = 'className="object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"';
const replacementClass = 'className="object-cover transition-all duration-700 ease-out group-hover:scale-105"';

content = content.replace(targetClass, replacementClass);

fs.writeFileSync('components/youtube/YoutubeContent.tsx', content, 'utf-8');
