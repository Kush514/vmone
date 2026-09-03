'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const container = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRefs = useRef<HTMLAnchorElement[]>([]);

  const addToHeadingRefs = (el: HTMLSpanElement) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  const addToCtaRefs = (el: HTMLAnchorElement) => {
    if (el && !ctaRefs.current.includes(el)) {
      ctaRefs.current.push(el);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // BG Typography Parallax (Horizontal movement)
      gsap.to(bgTextRef.current, {
        x: '-10%',
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Intro & Heading
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRefs.current, { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set([subHeadingRef.current, copyRef.current], { opacity: 0, y: 20 });
      gsap.set(ctaRefs.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(headingRefs.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.4")
        .to(subHeadingRef.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.out' }, "-=0.4")
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
        .to(ctaRefs.current, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.4");
    });

    // Reduced motion fallback
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        eyebrowRef.current, ...headingRefs.current, subHeadingRef.current, copyRef.current,
        ...ctaRefs.current, bgTextRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        x: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      id="final-cta"
      ref={container}
      className="relative pt-20 pb-12 md:pt-32 md:pb-24 overflow-hidden bg-primary-dark text-pure-white"
    >
      {/* Background Typography */}
      <div 
        className="absolute top-1/4 left-0 w-[150%] pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div 
          ref={bgTextRef}
          className="font-display font-bold uppercase text-[clamp(15rem,40vw,50rem)] leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(224,205,127,0.05)] whitespace-nowrap pl-12"
        >
          VMONE
        </div>
      </div>

      <div className="container-editorial relative z-10 flex flex-col items-center text-center">
        
        {/* Intro */}
        <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase mb-12 md:mb-16">
          KEEP WATCHING
        </div>

        {/* Main Heading & Copy */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(3.5rem,8vw,10rem)]">
            <span className="block overflow-hidden pb-1 md:pb-2">
              <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">MAKE BETTER TECH</span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-2">
              <span ref={addToHeadingRefs} className="block origin-bottom text-muted-light">DECISIONS.</span>
            </span>
          </h2>
          
          <div className="mt-8 md:mt-12 overflow-hidden">
            <div ref={subHeadingRef} className="font-display font-bold uppercase tracking-tight text-[clamp(2.5rem,6vw,7rem)] leading-none text-brand-gold">
              <span className="border-b-4 border-brand-gold inline-block pb-2">WATCH VMONE.</span>
            </div>
          </div>
          
          <p ref={copyRef} className="text-lg md:text-2xl font-body font-light text-muted-light max-w-2xl mx-auto mt-8 md:mt-12">
            Real products. Real testing. Practical answers for the technology you bring home.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-xl mx-auto mb-16 md:mb-24">
            <a 
              href="https://www.youtube.com/@VMone" 
              target="_blank" 
              rel="noopener noreferrer"
              ref={addToCtaRefs}
              className="group relative overflow-hidden flex items-center justify-center w-full py-6 md:py-8 border border-brand-gold bg-primary-dark text-brand-gold hover:border-brand-gold transition-colors duration-500 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
            >
              <div className="absolute inset-0 bg-brand-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              <span className="font-display font-bold text-lg md:text-2xl uppercase tracking-widest relative z-10 flex items-center gap-4 transition-colors duration-500 group-hover:text-primary-dark">
                WATCH VMONE ON YOUTUBE
                <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </a>
        </div>
      </div>
    </section>
  );
}
