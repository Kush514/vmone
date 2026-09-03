'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const dimensions = [
  { 
    id: '01', 
    title: 'PERFORMANCE', 
    question: 'Does it actually deliver where it matters?',
    focus: ['Real-world performance', 'Consistency', 'Everyday results']
  },
  { 
    id: '02', 
    title: 'FEATURES', 
    question: 'Which features genuinely improve the experience?',
    focus: ['Useful features', 'Practical implementation', 'Features worth paying for']
  },
  { 
    id: '03', 
    title: 'USABILITY', 
    question: 'What is it like to live with every day?',
    focus: ['Ease of use', 'Interface', 'Convenience', 'Everyday experience']
  },
  { 
    id: '04', 
    title: 'EFFICIENCY', 
    question: 'What does it demand over time?',
    focus: ['Energy efficiency', 'Running considerations', 'Practical ownership']
  },
  { 
    id: '05', 
    title: 'DURABILITY', 
    question: 'Will it continue to make sense after the first few weeks?',
    focus: ['Build quality', 'Long-term considerations', 'Reliability factors']
  },
  { 
    id: '06', 
    title: 'VALUE', 
    question: 'Is it actually worth your money?',
    focus: ['Price vs performance', 'Alternatives', 'Overall value']
  },
];

export default function ReviewIntelligence() {
  const container = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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

      // 2. BG Typography Parallax
      gsap.to(bgTextRef.current, {
        y: -250,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Intro elements
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

      // 4. Staggered Row reveals
      gsap.set(rowRefs.current, { opacity: 0, y: 40 });
      
      gsap.to(rowRefs.current, {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 75%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // 5. Climax Statement
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

      // 6. Ending Elements
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
        copyRef.current, ...rowRefs.current, ...statementRefs.current, supportRef.current, 
        bottomDividerRef.current, footerTextRef.current, bgTextRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        scaleX: 1, 
        clipPath: 'inset(0% 0% 0% 0%)',
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      id="review-intelligence"
      ref={container}
      className="relative pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-primary-dark text-pure-white transition-colors duration-500"
    >
      {/* Background Typography */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/3 left-0 w-full text-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="font-display font-bold uppercase text-[clamp(10rem,25vw,30rem)] leading-none tracking-tighter opacity-[0.02] text-pure-white whitespace-nowrap">
          REAL-WORLD
        </div>
      </div>

      <div className="container-editorial relative z-10">
        
        {/* Intro */}
        <div className="mb-12 md:mb-24">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-muted-light/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
            WHAT WE LOOK AT
          </div>
        </div>

        {/* Main Heading & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(3.5rem,7vw,8rem)]">
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">BEYOND THE</span>
              </span>
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold font-serif italic font-normal normal-case tracking-normal pt-2">Spec Sheet.</span>
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 flex items-end pb-2 md:pb-4">
            <p ref={copyRef} className="text-base md:text-lg lg:text-xl font-body font-light text-muted-light leading-relaxed border-l border-muted-light/30 pl-6">
              A product can look impressive on paper and still disappoint at home. VMONE looks at the things that specifications cannot fully explain.
            </p>
          </div>
        </div>

        {/* Review Dimensions List */}
        <div ref={listRef} className="flex flex-col border-b border-muted-light/20 mb-16 md:mb-24 max-w-6xl">
          {dimensions.map((dim, index) => (
            <div 
              key={dim.id}
              ref={(el) => { if (el) rowRefs.current[index] = el; }}
              className="group flex flex-col lg:flex-row lg:items-start border-t border-muted-light/20 py-8 md:py-16 transition-colors duration-500 hover:bg-pure-white/5 px-4 md:px-8 -mx-4 md:-mx-8 cursor-default"
            >
              <div className="lg:w-5/12 flex items-baseline gap-4 md:gap-8">
                <span className="font-display text-sm md:text-base font-bold tracking-widest text-muted-dark transition-transform duration-500 group-hover:translate-x-2">
                  {dim.id}
                </span>
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-brand-gold transition-transform duration-500 group-hover:translate-x-2">
                  {dim.title}
                </h3>
              </div>
              
              <div className="lg:w-7/12 mt-6 lg:mt-2 flex flex-col gap-6 lg:pl-8">
                <p className="font-display text-xl md:text-3xl font-bold text-muted-light group-hover:text-pure-white transition-colors duration-500 leading-tight">
                  {dim.question}
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-medium tracking-widest uppercase text-muted-dark group-hover:text-muted-light transition-colors duration-500">
                  {dim.focus.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 md:gap-4">
                      <span>{item}</span>
                      {idx !== dim.focus.length - 1 && (
                        <span className="w-1 h-1 rounded-full bg-muted-dark group-hover:bg-muted-light transition-colors duration-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Statement (Climax) */}
        <div className="mt-24 md:mt-32 mb-16 md:mb-24 flex flex-col items-center text-center">
          <div ref={addToStatementRefs} className="font-display font-bold uppercase tracking-widest text-sm md:text-base text-muted-dark mb-12">
            THE QUESTION ISN&apos;T
          </div>
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-muted-light mb-4 md:mb-6">
            &quot;WHAT DOES THE SPEC SHEET SAY?&quot;
          </div>
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-brand-gold">
            <span className="border-b-4 border-pure-white inline-block pb-1 md:pb-2">&quot;WHAT HAPPENS WHEN YOU LIVE WITH IT?&quot;</span>
          </div>
        </div>

        {/* Supporting Statement & Footer */}
        <div className="mt-20 md:mt-32 flex flex-col items-start md:items-end md:text-right">
          <div ref={supportRef} className="max-w-2xl text-left md:text-right mb-24 md:mb-32">
            <h4 className="font-display font-bold text-lg md:text-2xl text-brand-gold uppercase tracking-wider mb-2">
              PERFORMANCE. USABILITY. EFFICIENCY. VALUE.
            </h4>
            <p className="font-body font-light text-muted-light text-base md:text-lg tracking-wide">
              THE DETAILS THAT ACTUALLY MATTER.
            </p>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-end gap-6 md:gap-4 mb-8">
              <div ref={footerTextRef} className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-light">
                <span>VMONE / REVIEW INTELLIGENCE</span>
              </div>
            </div>
            
            <div ref={bottomDividerRef} className="w-full h-px bg-muted-light/30" />
          </div>
        </div>

      </div>
    </section>
  );
}
