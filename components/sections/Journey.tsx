'use client';

import { useRef, useState, useEffect } from 'react';
import MilestoneVisual from '@/components/ui/MilestoneVisual';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  { 
    year: '2019',
    date: '19-9-2019', 
    title: 'THE BEGINNING', 
    desc: 'A dream takes shape.',
    stat: 'START'
  },
  { 
    year: '2020',
    date: '17-10-2020', 
    title: '100K SUBSCRIBERS', 
    desc: 'First major milestone.',
    stat: '100K'
  },
  { 
    year: '2023',
    date: '23-7-2023', 
    title: '1M MILESTONE', 
    desc: 'The first million who believed.',
    stat: '1M'
  },
  { 
    year: '2025',
    date: '17-3-2025', 
    title: '3M STRONG', 
    desc: 'A community that shapes the industry.',
    stat: '3M'
  },
  { 
    year: '2026',
    date: '16-1-2026', 
    title: 'GLOBAL RECOGNITION', 
    desc: 'Trust in creators powers retail shift.',
    stat: 'GLOBAL'
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll triggers for each right-side block to update the left-side state
      const blocks = gsap.utils.toArray<HTMLElement>('.milestone-content-block');
      
      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(i);
              
              // Animate the left side stat change
              gsap.fromTo('.sticky-stat', 
                { y: 30, opacity: 0, rotateX: -45 },
                { y: 0, opacity: 1, rotateX: 0, duration: 0.6, ease: 'back.out(1.7)', overwrite: true }
              );
            }
          }
        });
        
        // Parallax fade effect on the blocks themselves
        gsap.fromTo(block,
          { opacity: 0.2, x: 20 },
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-primary-dark transition-colors duration-500 text-pure-white relative w-full">
      {/* Mobile/Tablet Fallback Header */}
      <div className="lg:hidden pt-24 px-8 md:px-16 text-center">
         <div className="text-xs font-medium tracking-[0.2em] text-brand-gold uppercase mb-4">
           VMONE / HISTORY
         </div>
         <h2 className="font-display font-bold uppercase text-4xl text-pure-white mb-12">THE JOURNEY</h2>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto">
        
        {/* LEFT SIDE: Sticky Display (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 h-screen sticky top-0 flex-col justify-center items-start pl-12 lg:pl-24 xl:pl-32 border-r border-brand-gold/10 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 w-full">
            <div className="w-16 h-[2px] bg-brand-gold/50 mb-8" />
            <div className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase mb-2">
              THE JOURNEY
            </div>
            
            <div className="h-[300px] xl:h-[400px] flex items-center perspective-1000">
              <div className="sticky-stat drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] origin-left scale-90 lg:scale-100 xl:scale-125">
                <MilestoneVisual stat={milestones[activeIndex].stat} />
              </div>
            </div>
            
            <div className="mt-8 font-serif italic text-2xl xl:text-3xl text-brand-gold/70">
              {milestones[activeIndex].year}
            </div>
          </div>
          
          {/* Timeline progress indicator on the border */}
          <div 
            className="absolute right-0 top-0 w-[2px] bg-brand-gold transition-all duration-700 ease-out z-20"
            style={{ 
              height: `${((activeIndex + 1) / milestones.length) * 100}%` 
            }}
          />
        </div>

        {/* RIGHT SIDE: Scrolling Content */}
        <div className="w-full lg:w-1/2 flex flex-col pt-8 pb-32 lg:pt-[40vh] lg:pb-[40vh] px-8 md:px-16 lg:px-24 xl:px-32 relative">
          
          {/* Mobile vertical line */}
          <div className="absolute left-[39px] md:left-[71px] top-0 bottom-0 w-[1px] bg-brand-gold/20 lg:hidden" />

          {milestones.map((item, i) => (
            <div 
              key={i} 
              className="milestone-content-block relative flex flex-col min-h-[30vh] lg:min-h-[50vh] justify-center py-16 lg:py-0"
            >
              {/* Mobile Timeline Dot */}
              <div className="lg:hidden absolute left-[-2px] top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(224,205,127,0.8)]" />
              
              <div className="lg:hidden mb-8 opacity-90 origin-left scale-75 md:scale-90 flex justify-center w-full">
                <MilestoneVisual stat={item.stat} />
              </div>

              <div className="pl-8 lg:pl-0 border-l-2 border-brand-gold/0 lg:border-none transition-all duration-500">
                <span className="inline-block px-4 py-1 border border-brand-gold/30 rounded-full font-display text-xs font-bold tracking-[0.2em] text-brand-gold mb-6 md:mb-8 uppercase">
                  {item.date}
                </span>
                
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-pure-white leading-[0.95] tracking-tight mb-6">
                  {item.title}
                </h3>
                
                <p className="font-serif text-lg md:text-xl lg:text-2xl text-pure-white/60 leading-relaxed max-w-lg">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
