'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const formats = [
  { id: '01', title: 'PRODUCT REVIEWS', desc: 'Deep dives into how products perform in the real world.' },
  { id: '02', title: 'COMPARISONS', desc: 'Side-by-side analysis to make competing choices clearer.' },
  { id: '03', title: 'BUYING GUIDES', desc: 'Practical guidance before you spend your money.' },
  { id: '04', title: 'TOP RECOMMENDATIONS', desc: 'Shortlists focused on what is actually worth considering.' },
  { id: '05', title: 'LONG-TERM TESTING', desc: 'What changes when a product becomes part of everyday life.' },
  { id: '06', title: 'TECHNOLOGY UPDATES', desc: 'Important developments without unnecessary noise.' },
  { id: '07', title: 'TIPS & HOW-TO', desc: 'Useful technology knowledge for everyday consumers.' },
];

export default function FeaturedContent() {
  const container = useRef<HTMLElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const statementRefs = useRef<HTMLDivElement[]>([]);
  const supportRef = useRef<HTMLDivElement>(null);
  const bottomDividerRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);

  const addToHeadingRefs = (el: HTMLSpanElement | null) => {
    if (el && !headingRefs.current.includes(el)) headingRefs.current.push(el);
  };

  const addToStatementRefs = (el: HTMLDivElement | null) => {
    if (el && !statementRefs.current.includes(el)) statementRefs.current.push(el);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // No background transition needed — section stays dark

      // 2. Intro elements
      gsap.set(topDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRefs.current, { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(copyRef.current, { opacity: 0, y: 20 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      introTl.to(topDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
             .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
             .to(headingRefs.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, stagger: 0.15, ease: 'power3.out' }, "-=0.4")
             .to(copyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");

      // 3. Sequential Reveal of Content Items
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const line = lineRefs.current[i];
        const isEven = i % 2 === 0;
        
        gsap.set(item, { opacity: 0, x: isEven ? -40 : 40 });
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: isEven ? 'left center' : 'right center' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });

        if (line) {
          tl.to(line, { scaleX: 1, duration: 0.8, ease: 'power3.out' });
        }
        
        tl.to(item, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, line ? "-=0.4" : "0");
      });

      // 4. Climax Statement
      gsap.set(statementRefs.current, { opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' });
      
      const climaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: statementRefs.current[0],
          start: "top 80%",
        }
      });

      climaxTl.to(statementRefs.current, { 
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(0% 0% 0% 0%)', 
        duration: 1, 
        stagger: 0.3, 
        ease: 'power3.out' 
      });

      // 5. Ending Elements
      gsap.set(supportRef.current, { opacity: 0, y: 20 });
      gsap.set(bottomDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(footerTextRef.current, { opacity: 0, y: 10 });

      gsap.to(supportRef.current, {
        scrollTrigger: {
          trigger: supportRef.current,
          start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      const endTl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomDividerRef.current,
          start: "top 95%",
        }
      });

      endTl.to(bottomDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
           .to(footerTextRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");

    });

    // Reduced motion fallback
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        container.current, topDividerRef.current, eyebrowRef.current, ...headingRefs.current,
        copyRef.current, ...itemRefs.current, ...lineRefs.current, ...statementRefs.current, supportRef.current, 
        bottomDividerRef.current, footerTextRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        x: 0,
        scaleX: 1, 
        clipPath: 'inset(0% 0% 0% 0%)',
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      id="featured-content"
      ref={container}
      className="relative pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-secondary-dark text-pure-white"
    >
      <div className="container-editorial relative z-10">
        
        {/* Intro */}
        <div className="mb-12 md:mb-24">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-brand-gold/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
            VMONE CONTENT
          </div>
        </div>

        {/* Main Heading & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(3.5rem,7vw,8rem)]">
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">MORE THAN</span>
              </span>
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-muted-light font-serif italic font-normal normal-case tracking-normal pt-2">A Review.</span>
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 flex items-end pb-2 md:pb-4">
            <p ref={copyRef} className="text-base md:text-lg lg:text-xl font-body font-light text-muted-light leading-relaxed">
              Reviews are only the beginning. VMONE helps consumers understand products, compare choices and make better technology decisions.
            </p>
          </div>
        </div>

        {/* Editorial Content Sequence (Alternating Asymmetrical Layout) */}
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-32 my-20 md:my-32 overflow-hidden">
          {formats.map((format, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={format.id} className="relative group cursor-default">
                {/* Thin divider line per item */}
                <div 
                  ref={(el) => { if (el) lineRefs.current[index] = el; }}
                  className={`absolute top-0 w-[40%] h-px bg-pure-white/10 ${isEven ? 'left-0' : 'right-0'}`}
                />
                
                <div 
                  ref={(el) => { if (el) itemRefs.current[index] = el; }}
                  className={`flex flex-col pt-8 lg:w-8/12 ${isEven ? 'mr-auto' : 'ml-auto md:items-end text-left md:text-right'}`}
                >
                  <div className="flex items-center gap-6 mb-4 md:mb-6">
                    <span className="font-display text-sm md:text-base font-bold tracking-widest text-muted-light transition-transform duration-500 group-hover:translate-x-2">
                      {format.id}
                    </span>
                    {/* Subtle marker on hover */}
                    <span className={`w-0 h-px bg-brand-gold transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:w-8 ${isEven ? '' : 'order-first hidden md:block'}`} />
                  </div>
                  
                  <h3 className="font-display font-bold uppercase tracking-tight text-[clamp(2.5rem,5vw,6rem)] leading-none text-brand-gold mb-4 md:mb-6 transition-transform duration-500 group-hover:translate-x-2">
                    {format.title}
                  </h3>
                  
                  <p className="font-body font-light text-muted-light text-lg md:text-2xl max-w-xl transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:text-pure-white">
                    {format.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Statement (Climax) */}
        <div className="mt-24 md:mt-32 mb-16 md:mb-24 flex flex-col items-center text-center">
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2.5rem,6vw,7rem)] text-muted-light mb-4 md:mb-6">
            ONE PRODUCT.
          </div>
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2.5rem,6vw,7rem)] text-muted-light mb-4 md:mb-6">
            MANY QUESTIONS.
          </div>
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2.5rem,6vw,7rem)] text-brand-gold">
            <span className="border-b-4 border-brand-gold inline-block pb-2">VMONE HELPS ANSWER THEM.</span>
          </div>
        </div>

        {/* Supporting Statement & Footer */}
        <div className="mt-20 md:mt-32 flex flex-col items-start md:items-end md:text-right">
          <div ref={supportRef} className="max-w-2xl text-left md:text-right mb-24 md:mb-32">
            <h4 className="font-display font-bold text-sm md:text-base text-muted-light uppercase tracking-widest">
              WATCH. READ. COMPARE. UNDERSTAND.
            </h4>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-end gap-6 md:gap-4 mb-8">
              <div ref={footerTextRef} className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-light">
                <span>VMONE / CONTENT</span>
              </div>
            </div>
            
            <div ref={bottomDividerRef} className="w-full h-px bg-pure-white/10" />
          </div>
        </div>

      </div>
    </section>
  );
}
