'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  { id: '01', title: 'THE MARKETING CLAIM', desc: 'What brands say a product can do.' },
  { id: '02', title: 'THE SPECIFICATION SHEET', desc: 'Numbers, features and technical promises.' },
  { id: '03', title: 'THE REAL EXPERIENCE', desc: 'What actually happens when you use it.' },
  { id: '04', title: 'THE UNCOMFORTABLE TRUTH', desc: 'What the product does well — and where it falls short.' },
  { id: '05', title: 'THE BUYING DECISION', desc: 'Whether it makes sense for you.' },
];

export default function TrustSection() {
  const container = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  
  const stageRefs = useRef<HTMLDivElement[]>([]);
  
  const statementRefs = useRef<HTMLDivElement[]>([]);
  const principlesRef = useRef<HTMLDivElement>(null);
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
      // 2. BG Typography Parallax
      gsap.to(bgTextRef.current, {
        y: -300,
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

      // 4. Staggered Row reveals and Active/Inactive scroll
      stageRefs.current.forEach((stage) => {
        // Initial state before entering viewport
        gsap.set(stage, { opacity: 0, y: 40 });

        // Reveal animation
        gsap.to(stage, {
          scrollTrigger: {
            trigger: stage,
            start: "top 90%",
          },
          opacity: 0.2, // Base inactive opacity
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        });

        // Active state when near center
        ScrollTrigger.create({
          trigger: stage,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => gsap.to(stage, { opacity: 1, duration: 0.6, ease: 'power2.out', x: 10 }),
          onLeave: () => gsap.to(stage, { opacity: 0.2, duration: 0.6, ease: 'power2.out', x: 0 }),
          onEnterBack: () => gsap.to(stage, { opacity: 1, duration: 0.6, ease: 'power2.out', x: 10 }),
          onLeaveBack: () => gsap.to(stage, { opacity: 0.2, duration: 0.6, ease: 'power2.out', x: 0 }),
        });
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
      gsap.set(principlesRef.current, { opacity: 0, y: 20 });
      gsap.set(bottomDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(footerTextRef.current, { opacity: 0, y: 10 });

      gsap.to(principlesRef.current, {
        scrollTrigger: {
          trigger: principlesRef.current,
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
        copyRef.current, ...stageRefs.current, ...statementRefs.current, principlesRef.current, 
        bottomDividerRef.current, footerTextRef.current, bgTextRef.current
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
      id="trust"
      ref={container}
      className="relative pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-primary-dark text-pure-white transition-colors duration-500"
    >
      {/* Background Typography */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/4 left-0 w-full text-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="font-display font-bold uppercase text-[clamp(10rem,25vw,30rem)] leading-none tracking-tighter opacity-[0.02] text-brand-gold whitespace-nowrap">
          TRUTH
        </div>
      </div>

      <div className="container-editorial relative z-10 flex flex-col items-center">
        
        {/* Intro */}
        <div className="mb-12 md:mb-20 w-full">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-brand-gold/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-brand-gold uppercase">
            THE VMONE PHILOSOPHY
          </div>
        </div>

        {/* Main Philosophy Heading */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(3.5rem,7vw,8rem)]">
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">NO PERFECT</span>
              </span>
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">PRODUCTS.</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end pb-2 md:pb-4">
            <p ref={copyRef} className="text-base md:text-lg lg:text-xl font-body font-light text-brand-silver leading-relaxed border-l border-brand-silver/30 pl-6">
              Every device has limitations. True value comes from understanding what those limitations are, and whether they actually affect your daily use.
            </p>
          </div>
        </div>

        {/* The Methodology Stages */}
        <div className="flex flex-col border-t border-brand-silver/20 mt-24 md:mt-32 mb-16 md:mb-24 max-w-7xl mx-auto w-full">
          {stages.map((stage, index) => (
            <div 
              key={stage.id}
              ref={(el) => { if (el) stageRefs.current[index] = el; }}
              className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-brand-silver/20 py-12 md:py-16 lg:py-24"
            >
              <div className="font-display font-bold text-sm md:text-lg tracking-[0.2em] text-brand-silver/50 mb-6 lg:mb-0 lg:w-2/12 uppercase">
                {stage.id}
              </div>
              <div className="font-display font-bold uppercase tracking-tight text-[clamp(2.5rem,4.5vw,5rem)] leading-none text-brand-gold lg:w-6/12 mb-6 lg:mb-0">
                {stage.title}
              </div>
              <div className="font-body font-light text-brand-silver text-lg md:text-2xl lg:w-4/12 lg:text-right lg:pl-12">
                {stage.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Key Statement (Climax) */}
        <div className="mt-16 md:mt-24 mb-24 md:mb-32 flex flex-col items-center text-center max-w-5xl">
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-brand-silver mb-6">
            WE DON&apos;T LOOK FOR PERFECT PRODUCTS.
          </div>
          <div ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-brand-gold">
            <span className="border-b-4 border-brand-gold inline-block pb-1 md:pb-2">WE LOOK FOR THE RIGHT PRODUCT FOR YOU.</span>
          </div>
        </div>

        {/* Supporting Statement & Footer */}
        <div className="mt-20 md:mt-32 flex flex-col items-start md:items-end md:text-right w-full">
          
          <div ref={principlesRef} className="w-full border-y border-brand-silver/20 py-8 md:py-12 mb-24 md:mb-32">
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-12 text-sm md:text-base font-display font-bold tracking-[0.2em] uppercase text-brand-gold">
              <span>INDEPENDENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-silver/50 hidden md:block" />
              <span>PRACTICAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-silver/50 hidden md:block" />
              <span>CONSUMER FIRST</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-silver/50 hidden md:block" />
              <span>TRANSPARENT</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 mb-8">
              <div ref={footerTextRef} className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-silver">
                <span>VMONE / PHILOSOPHY</span>
              </div>
            </div>
            
            <div ref={bottomDividerRef} className="w-full h-px bg-brand-silver/30" />
          </div>
        </div>

      </div>
    </section>
  );
}
