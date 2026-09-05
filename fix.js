const fs = require('fs');

let content = fs.readFileSync('components/sections/Journey.tsx', 'utf-8');

// Replace left side
content = content.replace(
  /<div className="h-\[200px\] xl:h-\[250px\] flex items-center perspective-1000">[\s\S]*?<\/div>/,
  `<div className="h-[300px] xl:h-[400px] flex items-center perspective-1000">
              <div className="sticky-stat drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] origin-left scale-90 lg:scale-100 xl:scale-125">
                <MilestoneVisual stat={milestones[activeIndex].stat} />
              </div>
            </div>`
);

// Replace mobile side
content = content.replace(
  /<div className="lg:hidden font-display text-4xl font-bold text-brand-gold\/30 mb-4 tracking-tighter">[\s\S]*?<\/div>/g,
  `<div className="lg:hidden mb-8 opacity-90 origin-left scale-75 md:scale-90 flex justify-center w-full">
                <MilestoneVisual stat={item.stat} />
              </div>`
);

fs.writeFileSync('components/sections/Journey.tsx', content, 'utf-8');
