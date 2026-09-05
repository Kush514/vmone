'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGlobalTheme } from '@/components/providers/ThemeProvider';

const stages = [
  { id: '01', title: 'BUY IT', desc: 'Products are experienced as consumers experience them — in the real world.' },
  { id: '02', title: 'TEST IT', desc: 'Performance, usability, features and everyday behavior are put to the test.' },
  { id: '03', title: 'COMPARE IT', desc: 'Products are evaluated against alternatives, not in isolation.' },
  { id: '04', title: 'FIND THE TRUTH', desc: 'Strengths matter. Limitations matter too. Marketing claims don\'t get a free pass.' },
  { id: '05', title: 'GIVE YOU THE ANSWER', desc: 'The goal is simple: help you understand what is actually worth buying.' },
];

export default function TrueView() {
  const { theme } = useGlobalTheme();
  const container = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  
  const stageRefs = useRef<HTMLDivElement[]>([]);
  const bgTextRef = useRef<HTMLDivElement>(null);
  
  const statement1Ref = useRef<HTMLDivElement>(null);
  const statement2Ref = useRef<HTMLDivElement>(null);
  const bottomDividerRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);

  const addToHeadingRefs = (el: HTMLSpanElement | null) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  const addToStageRefs = (el: HTMLDivElement | null) => {
    if (el && !stageRefs.current.includes(el)) {
      stageRefs.current.push(el);
    }
  };

  useGSAP(() => {
    if (theme === 'noir_new') return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Intro
      gsap.set(topDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRefs.current, { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set([subHeadingRef.current, copyRef.current], { opacity: 0, y: 20 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      introTl.to(topDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
             .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
             .to(headingRefs.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.out' }, "-=0.4")
             .to([subHeadingRef.current, copyRef.current], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.4");

      // BG Typography Parallax
      gsap.to(bgTextRef.current, {
        y: -300,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Stages active/inactive scroll effect
      stageRefs.current.forEach((stage) => {
        gsap.set(stage, { opacity: 0.2, y: 40 });

        ScrollTrigger.create({
          trigger: stage,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => gsap.to(stage, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }),
          onLeave: () => gsap.to(stage, { opacity: 0.2, duration: 0.8, ease: 'power2.out' }),
          onEnterBack: () => gsap.to(stage, { opacity: 1, duration: 0.8, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(stage, { opacity: 0.2, duration: 0.8, ease: 'power2.out' }),
        });
      });

      // Climax Statement
      gsap.set([statement1Ref.current, statement2Ref.current], { opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(bottomDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(footerTextRef.current, { opacity: 0, y: 10 });

      const climaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: statement1Ref.current,
          start: "top 75%",
        }
      });

      climaxTl.to(statement1Ref.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.out' })
              .to(statement2Ref.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.out' }, "+=0.2");

      const endTl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomDividerRef.current,
          start: "top 95%",
        }
      });

      endTl.to(bottomDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
           .to(footerTextRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");

    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        container.current, topDividerRef.current, eyebrowRef.current, ...headingRefs.current,
        subHeadingRef.current, copyRef.current, ...stageRefs.current, bgTextRef.current,
        statement1Ref.current, statement2Ref.current, bottomDividerRef.current, footerTextRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        scaleX: 1, 
        clipPath: 'inset(0% 0% 0% 0%)',
      });
    });

    return () => mm.revert();
  }, { scope: container, dependencies: [theme] });

  if (theme === 'noir_new') {
    return (
      <section 
        id="true-view"
        ref={container}
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-primary-dark"
      >
        <div className="container-editorial relative z-10 flex flex-col items-center">
          
          {/* Intro Centered */}
          <div className="mb-8 md:mb-12 flex flex-col items-center text-center">
            <div className="w-[120px] h-px bg-brand-gold mb-6" />
            <div className="text-xs md:text-sm font-bold tracking-[0.25em] text-brand-gold uppercase">
              THE VMONE METHOD
            </div>
          </div>

          {/* Main Heading & Copy */}
          <div className="flex flex-col items-center gap-6 mb-32 md:mb-48 text-center max-w-4xl">
            <h2 className="font-display font-black uppercase leading-none tracking-tighter text-[clamp(4rem,10vw,12rem)] text-brand-gold">
              TRUE-VIEW.
            </h2>
            <div className="font-display font-bold uppercase tracking-widest text-lg md:text-2xl lg:text-3xl text-brand-silver">
              REAL PRODUCTS. REAL TESTING. <br className="md:hidden"/>UNCOMFORTABLE TRUTHS.
            </div>
          </div>

          {/* Cinematic Storytelling Stages */}
          <div className="flex flex-col gap-24 md:gap-40 w-full max-w-5xl mx-auto my-16 md:my-32">
            {stages.map((stage, i) => (
              <div 
                key={stage.id} 
                ref={addToStageRefs}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16 items-start md:items-center ${i % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}
              >
                <div className="font-serif italic font-normal text-6xl md:text-8xl lg:text-[12rem] tracking-tighter text-brand-silver/20 leading-none shrink-0 transition-colors duration-500 group-hover:text-brand-gold/30">
                  {stage.id}
                </div>
                <div className={`flex flex-col gap-4 md:gap-6 mt-4 md:mt-0 ${i % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}>
                  <h3 className="font-display font-black uppercase tracking-tight text-3xl md:text-5xl lg:text-6xl text-brand-gold leading-none">
                    {stage.title}
                  </h3>
                  <p className="font-body font-light text-brand-silver text-lg md:text-xl leading-relaxed max-w-md">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Signature Statement Climax */}
          <div className="mt-40 md:mt-64 mb-32 md:mb-48 w-full max-w-5xl text-center flex flex-col items-center border-t border-brand-silver/10 pt-24">
            <div className="font-display font-bold uppercase leading-[1.1] tracking-widest text-xl md:text-3xl lg:text-4xl text-brand-silver mb-8 md:mb-12">
              MARKETING TELLS YOU WHAT TO BUY.
            </div>
            <div className="font-display font-black uppercase leading-tight tracking-tight text-4xl md:text-6xl lg:text-7xl text-brand-gold">
              TRUE-VIEW HELPS YOU<br className="hidden md:block"/> DECIDE WHETHER <span className="font-serif italic font-normal normal-case tracking-normal pl-2">You Should.</span>
            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section 
      id="true-view"
      ref={container}
      className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden bg-primary-dark"
    >
      {/* Background Typography */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/4 left-0 w-full text-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="font-display font-bold uppercase text-[clamp(10rem,25vw,30rem)] leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.03)] whitespace-nowrap">
          TRUE-VIEW
        </div>
      </div>

      <div className="container-editorial relative z-10">
        
        {/* Intro */}
        <div className="mb-12 md:mb-24">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-muted-light/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
            THE VMONE METHOD
          </div>
        </div>

        {/* Main Heading & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32 md:mb-48">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(4rem,9vw,10rem)]">
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">TRUE-VIEW.</span>
              </span>
            </h2>
            <div ref={subHeadingRef} className="font-display font-bold uppercase tracking-tight text-xl md:text-3xl lg:text-4xl text-brand-gold leading-snug">
              REAL PRODUCTS. REAL TESTING. <span className="text-muted-light">UNCOMFORTABLE TRUTHS.</span>
            </div>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 flex items-end pb-2 md:pb-4">
            <p ref={copyRef} className="text-base md:text-lg lg:text-xl font-body font-light text-muted-light leading-relaxed border-l border-muted-light/30 pl-6">
              Specifications tell you what a product promises. Real-world testing tells you what it actually delivers.
            </p>
          </div>
        </div>

        {/* Cinematic Storytelling Stages */}
        <div className="flex flex-col gap-32 md:gap-48 max-w-5xl mx-auto md:ml-[10%] my-32 md:my-56">
          {stages.map((stage) => (
            <div 
              key={stage.id} 
              ref={addToStageRefs}
              className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24 items-start md:items-center origin-left"
            >
              <div className="font-serif italic font-normal text-6xl md:text-8xl lg:text-[10rem] tracking-tighter text-muted-light/30 leading-none shrink-0 transition-colors duration-500 group-hover:text-brand-gold/30">
                {stage.id}
              </div>
              <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-0">
                <h3 className="font-display font-bold uppercase tracking-tight text-[clamp(2rem,4vw,4.5rem)] text-brand-gold leading-none">
                  {stage.title}
                </h3>
                <p className="font-body font-light text-muted-light text-lg md:text-2xl leading-relaxed max-w-xl">
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Statement Climax */}
        <div className="mt-40 md:mt-64 mb-32 md:mb-48 max-w-6xl">
          <div ref={statement1Ref} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2.5rem,6vw,7rem)] text-muted-light mb-8 md:mb-12">
            MARKETING TELLS YOU<br />WHAT TO BUY.
          </div>
          <div ref={statement2Ref} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2.5rem,6vw,7rem)] text-brand-gold md:ml-[10%]">
            TRUE-VIEW HELPS YOU<br />DECIDE WHETHER <span className="font-serif italic font-normal normal-case tracking-normal border-b-4 border-pure-white inline-block pb-1 md:pb-2 pl-4">You Should.</span>
          </div>
        </div>

        {/* Section Footer / Divider */}
        <div className="mt-32 md:mt-48 flex flex-col items-start md:items-end md:text-right">
          <div className="w-full">
            <div className="flex justify-between items-end gap-6 md:gap-4 mb-8">
              <div ref={footerTextRef} className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-light">
                <span>VMONE / TRUE-VIEW</span>
              </div>
            </div>
            
            <div ref={bottomDividerRef} className="w-full h-px bg-muted-light/30" />
          </div>
        </div>

      </div>
    </section>
  );
}
