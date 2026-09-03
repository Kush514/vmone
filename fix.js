const fs = require('fs');
let content = fs.readFileSync('components/sections/AboutVineet.tsx', 'utf8');

const regex = /<div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-12 pt-2 md:pt-4">[\s\S]*?(?=<div className="lg:hidden relative w-3\/4 max-w-sm)/;

const replacement = \<div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-12 pt-2 md:pt-4">
            
            <div className="flex flex-col gap-6">
              <p ref={introRef} className="text-lg md:text-xl font-body font-light text-muted-dark leading-relaxed">
                Vineet Malhotra is a consumer technology expert and the founder of VMONE. For more than a decade, he has tested and analysed technology and home appliances to make complicated buying decisions simpler.
              </p>
              
              <div ref={highlightRef} className="pl-6 border-l-2 border-primary-dark">
                <p className="text-base md:text-lg font-medium tracking-wide uppercase text-primary-dark leading-snug">
                  TECHNOLOGY SHOULD BE<br />EASY TO UNDERSTAND.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 md:gap-8 items-start border-y border-muted-light/50 py-10">
              <div ref={experienceNumberRef} className="font-display text-7xl md:text-8xl font-bold tracking-tighter text-primary-dark leading-none">
                14+
              </div>
              <div ref={experienceTextRef} className="flex flex-col justify-center text-sm md:text-base font-medium tracking-widest uppercase text-muted-dark leading-relaxed">
                <span>YEARS</span>
                <span>TESTING</span>
                <span>APPLIANCES</span>
              </div>
            </div>

            <p ref={secondaryTextRef} className="font-body text-base md:text-lg text-primary-dark/70 leading-relaxed font-light">
              From televisions and air conditioners to refrigerators, washing machines, home audio and smart appliances, Vineet focuses on what matters beyond the specification sheet &mdash; real-world performance, usability and value.
            </p>

            {/* Vineet Malhotra Image (Mobile) */}
            \;

content = content.replace(regex, replacement);
fs.writeFileSync('components/sections/AboutVineet.tsx', content);
