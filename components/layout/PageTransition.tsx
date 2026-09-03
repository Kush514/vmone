'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const wipeRef = useRef<HTMLDivElement>(null);
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

          // Wipe moves up to reveal new page
          tl.to(wipeRef.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' });
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
      // DO NOT stop propagation so React onClick handlers (like menu close) still fire!
      
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        router.push(href);
      } else {
        // Reset wipe to start from bottom
        gsap.set(wipeRef.current, { display: 'block', yPercent: 100 });
        
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

        // Wipe comes up from bottom
        tl.to(wipeRef.current, { yPercent: 0, duration: 0.7, ease: 'power3.inOut' });
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [pathname, router]);

  return (
    <>
      <div 
        ref={wipeRef} 
        className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden border-t border-b border-brand-gold" 
        style={{ display: 'none', transform: 'translateY(100%)' }} 
        aria-hidden="true"
      >
        <div className="font-display font-bold text-brand-gold text-[clamp(6rem,20vw,25rem)] opacity-10 tracking-tighter uppercase whitespace-nowrap">
          VMONE
        </div>
      </div>
      <div ref={contentRef} className="flex-1 flex flex-col origin-top" style={{ opacity: 1, transform: 'none' }}>
        {children}
      </div>
    </>
  );
}
