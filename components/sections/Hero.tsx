'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Entrance Timeline sequence
      tl.from(bgRef.current, { opacity: 0, duration: 2 }, 0)
        .from(eyebrowRef.current, { opacity: 0, y: 20, duration: 1.2 }, 0.2)
        .from(line1Ref.current, { opacity: 0, y: 80, clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2 }, 0.4)
        .from(line2Ref.current, { opacity: 0, y: 80, clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2 }, 0.55)
        .from(line3Ref.current, { opacity: 0, y: 80, clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2 }, 0.7)
        .from(copyRef.current, { opacity: 0, y: 20, duration: 1 }, 1.0)
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 1 }, 1.15)
        .from(signatureRef.current, { opacity: 0, y: 20, duration: 1 }, 1.35);

      // Mouse Parallax (Desktop Only)
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(bgRef.current, {
          x: x * -10,
          y: y * -10,
          duration: 2,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    });

    // Reduced motion fallback
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        bgRef.current, eyebrowRef.current, line1Ref.current, line2Ref.current, line3Ref.current,
        copyRef.current, ctaRef.current, signatureRef.current
      ], { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-primary-dark pt-24 pb-8 md:pt-32"
      aria-label="Introduction"
    >
      {/* Restrained subtle dark gradient background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] md:w-3/4 h-[50vh] bg-secondary-dark rounded-[100%] blur-[120px]" />
      </div>
      
      <div className="container-editorial relative z-10 w-full flex flex-col items-start justify-center mt-[-5vh]">
        <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 w-full max-w-6xl">
          
          <div 
            ref={eyebrowRef} 
            className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase"
          >
            VMONE / CONSUMER TECHNOLOGY
          </div>
          
          <h1 className="flex flex-col font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-brand-gold text-[clamp(3.5rem,8.5vw,10rem)]">
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line1Ref} className="block origin-bottom">
                TECHNOLOGY.
              </span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3 md:ml-[10%]">
              <span ref={line2Ref} className="block origin-bottom">
                WITHOUT
              </span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line3Ref} className="block origin-bottom">
                THE NOISE.
              </span>
            </span>
          </h1>

          <p 
            ref={copyRef}
            className="max-w-[480px] md:max-w-[560px] text-base md:text-lg lg:text-xl font-body font-light text-muted-light leading-relaxed md:ml-[10%] mt-2"
          >
            We test it, compare it, and tell you what actually matters before you buy. Real reviews for real consumers.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 mt-4 md:ml-[10%]">
            <div ref={ctaRef}>
              <Link 
                href="/reviews"
                className="group relative overflow-hidden flex items-center gap-4 border border-brand-gold bg-primary-dark text-brand-gold font-display font-bold tracking-[0.15em] uppercase px-8 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
              >
                <div className="absolute inset-0 bg-brand-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-primary-dark">WATCH REVIEWS</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-all duration-500 group-hover:text-primary-dark" />
              </Link>
            </div>
            
            <div ref={signatureRef} className="flex flex-col gap-1">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-muted-light/60 uppercase">
                HOSTED BY
              </span>
              <span className="text-sm md:text-base font-display font-bold tracking-widest text-pure-white uppercase">
                VINEET MALHOTRA
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
