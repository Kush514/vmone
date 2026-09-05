'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  separator?: string;
}

export default function CinematicMarquee({
  items,
  direction = 'left',
  speed = 30,
  className = '',
  separator = '\u2726'
}: CinematicMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const repeatedItems = Array(10).fill(items).flat();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const xPercentTarget = direction === 'left' ? -50 : 0;
      const initialX = direction === 'left' ? 0 : -50;
      gsap.set(track, { xPercent: initialX });

      const tween = gsap.to(track, {
        xPercent: xPercentTarget,
        repeat: -1,
        duration: speed,
        ease: 'none',
      });
      tweenRef.current = tween;

      let scrollTimeout: NodeJS.Timeout;
      const onScroll = () => {
        if (tweenRef.current) {
          gsap.to(tweenRef.current, { timeScale: direction === 'left' ? 2 : 2, duration: 0.2, overwrite: true });
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (tweenRef.current) {
              gsap.to(tweenRef.current, { timeScale: 1, duration: 1, ease: 'power2.out', overwrite: true });
            }
          }, 150);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        clearTimeout(scrollTimeout);
        if (tweenRef.current) tweenRef.current.kill();
      };
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (trackRef.current) gsap.set(trackRef.current, { xPercent: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.8, ease: 'power2.out', overwrite: true });
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out', overwrite: true });
  };

  return (
    <section 
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 md:py-8 flex items-center border-y border-pure-white/10 bg-primary-dark transition-colors duration-500 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Editorial Marquee"
    >
      <div ref={trackRef} className="flex items-center w-max whitespace-nowrap will-change-transform">
        {repeatedItems.map((item, i) => (
          <div key={`item-${i}`} className="flex items-center" aria-hidden={i >= items.length}>
            <span className={`font-display font-bold uppercase tracking-widest text-[clamp(1.5rem,3vw,3rem)] leading-none px-4 md:px-8 transition-colors duration-500 ${i % 2 !== 0 ? 'text-transparent [-webkit-text-stroke:1px_var(--color-brand-gold)]' : 'text-brand-gold'}`}>
              {item}
            </span>
            <span className={`text-[clamp(1rem,2vw,1.5rem)] pb-0.5 md:pb-1 text-brand-gold/30 transition-colors duration-500`} aria-hidden="true">
              {separator}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
