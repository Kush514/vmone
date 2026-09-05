'use client';

import { useEffect, useRef, useCallback } from 'react';
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
  const pendingHref = useRef<string | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Force-clear helper — resets everything to a clean state
  const forceClear = useCallback(() => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
    isTransitioning.current = false;
    pendingHref.current = null;
    gsap.killTweensOf(bgRef.current);
    gsap.killTweensOf(textContainerRef.current);
    if (wipeRef.current) {
      gsap.set(wipeRef.current, { display: 'none', pointerEvents: 'none' });
    }
    if (bgRef.current) {
      gsap.set(bgRef.current, { scaleY: 0, transformOrigin: 'bottom' });
    }
    if (textContainerRef.current) {
      gsap.set(textContainerRef.current, { opacity: 0 });
    }
  }, []);

  // Animate the wipe OUT (reveal the new page)
  const animateOut = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      forceClear();
      return;
    }

    // Kill any lingering tweens first
    gsap.killTweensOf(bgRef.current);
    gsap.killTweensOf(textContainerRef.current);

    // Shrink from top
    gsap.set(bgRef.current, { transformOrigin: 'top' });

    const tl = gsap.timeline({
      onComplete: () => forceClear()
    });

    tl.to(textContainerRef.current, { opacity: 0, duration: 0.15, ease: 'power2.out' }, 0);
    tl.to(bgRef.current, { scaleY: 0, duration: 0.5, ease: 'power2.inOut' }, 0.08);
  }, [forceClear]);

  // Watch for pathname changes to trigger the exit animation
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      
      if (isTransitioning.current) {
        // Clear the safety timer since navigation succeeded
        if (safetyTimer.current) {
          clearTimeout(safetyTimer.current);
          safetyTimer.current = null;
        }
        animateOut();
      }
    }
  }, [pathname, animateOut]);

  // Global click interceptor
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
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
      
      // Same page — ignore
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      e.preventDefault();
      
      // If already transitioning, force-clear and restart fresh
      if (isTransitioning.current) {
        forceClear();
      }

      isTransitioning.current = true;
      pendingHref.current = href;

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

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      // Kill any lingering tweens
      gsap.killTweensOf(bgRef.current);
      gsap.killTweensOf(textContainerRef.current);

      // Setup
      gsap.set(wipeRef.current, { display: 'flex', pointerEvents: 'auto' });
      gsap.set(bgRef.current, { transformOrigin: 'bottom', scaleY: 0 });
      gsap.set(textContainerRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(textContainerRef.current, { opacity: 1 });
        },
        onComplete: () => {
          // Navigate
          if (pendingHref.current) {
            router.push(pendingHref.current);
          }

          // Safety fallback: if pathname hasn't changed within 3s, force-clear
          safetyTimer.current = setTimeout(() => {
            if (isTransitioning.current) {
              forceClear();
            }
          }, 3000);
        }
      });

      // Stretch curtain up from bottom
      tl.to(bgRef.current, { scaleY: 1, duration: 0.46, ease: 'power2.inOut' }, 0);
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [router, forceClear, animateOut]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      gsap.killTweensOf(bgRef.current);
      gsap.killTweensOf(textContainerRef.current);
    };
  }, []);

  return (
    <>
      <div 
        ref={wipeRef} 
        className="fixed inset-0 z-[9999] pointer-events-none flex items-start justify-start overflow-hidden" 
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
