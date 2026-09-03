'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyVmone() {
  const container = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const statementRefs = useRef<HTMLDivElement[]>([]);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const bottomDividerRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const addToHeadingRefs = (el: HTMLSpanElement) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  const addToStatementRefs = (el: HTMLDivElement) => {
    if (el && !statementRefs.current.includes(el)) {
      statementRefs.current.push(el);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 2. Intro reveals
      gsap.set(topDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRefs.current, { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      introTl.to(topDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
             .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
             .to(headingRefs.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, stagger: 0.15, ease: 'power3.out' }, "-=0.4");

      // 3. Background Typography Parallax
      gsap.to(bgTextRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 4. Statements Active/Inactive Sequence
      statementRefs.current.forEach((statement) => {
        gsap.set(statement, { opacity: 0.25, y: 30 });

        ScrollTrigger.create({
          trigger: statement,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => gsap.to(statement, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }),
          onLeave: () => gsap.to(statement, { opacity: 0.25, duration: 0.8, ease: 'power2.out' }),
          onEnterBack: () => gsap.to(statement, { opacity: 1, duration: 0.8, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(statement, { opacity: 0.25, duration: 0.8, ease: 'power2.out' }),
        });
      });

      // 5. Ending Elements
      gsap.set(copyRef.current, { opacity: 0, y: 20 });
      gsap.set(bottomDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set([footerTextRef.current, taglineRef.current], { opacity: 0, y: 10 });

      gsap.to(copyRef.current, {
        scrollTrigger: {
          trigger: copyRef.current,
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
           .to([footerTextRef.current, taglineRef.current], { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, "-=0.6");

    });

    // Reduced motion fallback
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        container.current, topDividerRef.current, eyebrowRef.current, ...headingRefs.current,
        ...statementRefs.current, bgTextRef.current, copyRef.current, bottomDividerRef.current, footerTextRef.current, taglineRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        scaleX: 1, 
        clipPath: 'inset(0% 0% 0% 0%)',
        
      });
      // Ensure all statements are fully visible
      gsap.set(statementRefs.current, { opacity: 1 });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      id="why-vmone"
      ref={container}
      className="relative pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-primary-dark text-pure-white"
    >
      {/* Large Subtle Background Typography */}
      <div 
        ref={bgTextRef}
        className="absolute top-[30%] left-0 w-full text-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="font-display font-bold uppercase text-[clamp(10rem,25vw,30rem)] leading-none tracking-tighter opacity-[0.03] text-brand-gold">
          VMONE
        </div>
      </div>

      <div className="container-editorial relative z-10 flex flex-col items-center">
        
        {/* Intro */}
        <div className="mb-12 md:mb-20">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-brand-gold/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-brand-gold uppercase">
            THE PROBLEM
          </div>
        </div>

        {/* Dynamic Typography Block */}
        <div className="flex flex-col items-center text-center max-w-5xl">
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2.5rem,6.5vw,8rem)] flex flex-col gap-2 md:gap-4 mb-16 md:mb-24">
            
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">BUYING TECHNOLOGY</span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={addToHeadingRefs} className="block origin-bottom text-brand-silver">SHOULDN&apos;T BE</span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">A GUESS.</span>
            </span>

          </h2>

          <div className="flex flex-col gap-16 md:gap-24 w-full">
            <h3 ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-left w-full md:w-3/4">
              <span className="block text-brand-gold">SPECIFICATIONS</span>
              <span className="block text-brand-silver">CAN BE</span>
              <span className="block text-brand-gold">OVERWHELMING.</span>
            </h3>

            <h3 ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-right w-full md:w-3/4 ml-auto">
              <span className="block text-brand-gold">MARKETING</span>
              <span className="block text-brand-silver">CAN BE</span>
              <span className="block text-brand-gold">LOUDER THAN REALITY.</span>
            </h3>

            <h3 ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-left w-full md:w-3/4">
              <span className="block text-brand-gold">OPINIONS</span>
              <span className="block text-brand-silver">CAN</span>
              <span className="block text-brand-gold">CONFLICT.</span>
            </h3>

            <h3 ref={addToStatementRefs} className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(2rem,5vw,6rem)] text-right w-full md:w-3/4 ml-auto">
              <span className="block text-brand-gold">VMONE</span>
              <span className="block text-brand-silver">SIMPLIFIES</span>
              <span className="block text-brand-gold">THE DECISION.</span>
            </h3>
          </div>
        </div>

        {/* Conclusion / Paragraph */}
        <div className="w-full flex justify-end mt-20 md:mt-32">
          <p ref={copyRef} className="max-w-[480px] text-base md:text-lg lg:text-xl font-body font-light text-brand-silver leading-relaxed mb-24 md:mb-32 text-left md:text-right">
            Too many reviews list specifications instead of answering real consumer questions. VMONE bridges the gap between technical data and everyday use, providing clarity instead of confusion.
          </p>
        </div>

        {/* Footer Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-8">
          <div className="flex justify-between items-end gap-6 md:gap-4">
            <div ref={footerTextRef} className="flex flex-col gap-1 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-silver">
              <span>VMONE / THE PROBLEM</span>
            </div>
          </div>
          <div ref={taglineRef} className="font-display font-bold uppercase tracking-tight text-xl md:text-3xl text-brand-gold">
            REAL TESTING. <span className="text-brand-silver">CLEAR ANSWERS.</span>
          </div>
        </div>

        <div className="mt-12 md:mt-16 w-full">
          <div ref={bottomDividerRef} className="w-full h-px bg-brand-gold/40" />
        </div>
      </div>
    </section>
  );
}
