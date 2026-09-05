const fs = require('fs');

const newContent = `'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const wipeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const prevPathname = useRef(pathname);
  const isTransitioning = useRef(false);

  useEffect(() => {
    // Check if the route has actually changed
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      
      // If we arrived here due to our custom transition, animate out
      if (isTransitioning.current) {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          const tl = gsap.timeline({
            onComplete: () => {
              isTransitioning.current = false;
              gsap.set(wipeRef.current, { display: 'none' });
            }
          });

          // Ensure it's ready to shrink into the top
          gsap.set(bgRef.current, { transformOrigin: 'top' });

          // Fade out text quickly, then shrink the background upwards
          tl.to(textContainerRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0);
          tl.to(bgRef.current, { scaleY: 0, duration: 0.5, ease: 'power2.inOut' }, 0.1);
        });

        mm.add('(prefers-reduced-motion: reduce)', () => {
          isTransitioning.current = false;
          gsap.set(wipeRef.current, { display: 'none' });
        });
        
        return () => mm.revert();
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find anchor tag
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');
      
      // Ignore non-internal links
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || targetAttr === '_blank') return;
      
      // Ignore hash links
      if (href.startsWith('#')) return;

      // Extract pathname
      let url;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      
      if (url.pathname === pathname && url.search === window.location.search) {
        // Same page, ignore
        return;
      }

      // Valid internal navigation
      e.preventDefault();
      
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Dynamically set transition colors based on target route
      const isDarkRoute = url.pathname === '/' || url.pathname === '/reviews' || url.pathname === '/true-view';
      const wipeBg = bgRef.current;
      const textEl = wipeRef.current?.querySelector('.transition-text');
      
      if (wipeBg && textEl) {
        if (isDarkRoute) {
          wipeBg.className = "absolute inset-0 bg-brand-gold border-t border-b border-primary-dark";
          textEl.className = "transition-text font-display font-bold text-primary-dark text-[clamp(6rem,20vw,25rem)] opacity-10 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(0,0,0,0.3)]";
        } else {
          wipeBg.className = "absolute inset-0 bg-primary-dark border-t border-b border-brand-gold";
          textEl.className = "transition-text font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-10 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(224,205,127,0.3)]";
        }
      }

      if (prefersReducedMotion) {
        router.push(href);
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            // Push route after wipe covers screen
            router.push(href);
            
            // Safety fallback: if route doesn't change within 2s, force clear
            setTimeout(() => {
              if (isTransitioning.current) {
                isTransitioning.current = false;
                gsap.set(wipeRef.current, { display: 'none' });
              }
            }, 2000);
          }
        });

        // Setup for stretch upwards
        gsap.set(wipeRef.current, { display: 'flex' });
        gsap.set(bgRef.current, { transformOrigin: 'bottom', scaleY: 0 });
        gsap.set(textContainerRef.current, { opacity: 0 });

        // Stretch background up, then fade in text
        tl.to(bgRef.current, { scaleY: 1, duration: 0.5, ease: 'power2.inOut' }, 0);
        tl.to(textContainerRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.3);
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [pathname, router]);

  return (
    <>
      <div 
        ref={wipeRef} 
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden" 
        style={{ display: 'none' }} 
        aria-hidden="true"
      >
        <div 
          ref={bgRef} 
          className="absolute inset-0 bg-primary-dark border-t border-b border-brand-gold" 
          style={{ transformOrigin: 'bottom', transform: 'scaleY(0)' }} 
        />
        <div ref={textContainerRef} className="relative z-10 opacity-0">
          <div className="transition-text font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-10 tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(224,205,127,0.3)]">
            VMONE
          </div>
        </div>
      </div>
      <div ref={contentRef} className="flex-1 flex flex-col origin-top" style={{ opacity: 1, transform: 'none' }}>
        {children}
      </div>
    </>
  );
}
`;

fs.writeFileSync('components/layout/PageTransition.tsx', newContent, 'utf-8');
console.log('Done!');
