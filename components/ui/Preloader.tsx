'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Track if the VERY FIRST load of the session is the homepage
  // Since this component is in layout.tsx, it only mounts once.
  // Using useState means it calculates exactly once on mount and never changes.
  const [isInitialHome] = useState(pathname === '/');

  useGSAP(() => {
    // If we didn't start on the homepage, the DOM isn't rendered anyway, abort.
    if (!isInitialHome) return;

    // 2. Otherwise, run the preloader sequence
    const mm = gsap.matchMedia();

    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Safety timeout in case GSAP fails or something hangs
    const safetyTimer = setTimeout(() => {
      if (containerRef.current) {
        gsap.set(containerRef.current, { display: 'none' });
        document.body.style.overflow = '';
      }
    }, 4000);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimer);
        gsap.set(containerRef.current, { display: 'none' });
        document.body.style.overflow = '';
      }
    });

    const counter = { value: 0 };

    // 1. Progress Bar expanding & Counter ticking up
    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: "power3.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          // Format with leading zero if needed, but going to 100
          counterRef.current.innerText = Math.round(counter.value).toString();
        }
      }
    }, "start");
    
    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: "power3.inOut",
    }, "start");

    // 2. Fade out text
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.inOut"
    }, "+=0.2");

    // 3. Slide the curtain UP (matching the PageTransition wipe direction)
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut"
    }, "-=0.2");

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, { scope: containerRef });

  // If the user refreshed or loaded directly onto a page that IS NOT the homepage,
  // we return NULL. This prevents the HTML from ever rendering, completely eliminating the 0% flash.
  if (!isInitialHome) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* Center Content */}
      <div ref={textRef} className="flex flex-col items-center relative z-10 w-full px-8">
        <div className="font-display font-bold uppercase tracking-[0.4em] text-brand-gold text-lg md:text-2xl mb-6">
          VMONE
        </div>
        
        {/* Progress Line */}
        <div className="w-full max-w-[200px] h-[1px] bg-pure-white/10 relative mb-8">
           <div 
             ref={progressBarRef}
             className="absolute top-0 left-0 h-full w-full bg-brand-gold origin-left"
             style={{ transform: 'scaleX(0)' }}
           />
        </div>

        <div className="flex items-start gap-2 text-pure-white">
          <div 
            ref={counterRef} 
            className="font-display font-light text-6xl md:text-8xl leading-none tracking-tighter"
          >
            0
          </div>
          <div className="font-display font-bold text-xl md:text-2xl text-brand-gold mt-2 md:mt-4">
            %
          </div>
        </div>
        
        <div className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-pure-white/40 uppercase mt-8">
          Consumer Technology
        </div>
      </div>
      
      {/* Background massive watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden opacity-5 pointer-events-none select-none flex justify-center">
        <h2 className="font-display font-bold uppercase text-[clamp(15rem,35vw,40rem)] leading-none tracking-tighter text-brand-gold whitespace-nowrap">
          VMONE
        </h2>
      </div>
    </div>
  );
}
