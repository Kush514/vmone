'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import FullscreenMenu from './FullscreenMenu';

const desktopNavLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'REVIEWS', href: '/reviews' },
  { label: 'EXPERTISE', href: '/expertise' },
  { label: 'TRUE-VIEW', href: '/true-view' },
];

const MenuButton = ({ className = "", openMenu, isMenuOpen, theme }: { className?: string, openMenu: () => void, isMenuOpen: boolean, theme: 'light' | 'dark' }) => (
  <button 
    onClick={openMenu}
    className={`group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 rounded-none py-2 transition-colors duration-300 min-h-[44px] ${className}`}
    aria-expanded={isMenuOpen}
    aria-controls="fullscreen-navigation"
    aria-label="Open navigation menu"
  >
    <span className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${theme === 'dark' ? 'text-pure-white group-hover:text-brand-gold' : 'text-primary-dark group-hover:text-pure-white'}`}>
      MENU
    </span>
    <div className="flex flex-col justify-center gap-1.5 w-6 h-5">
      <span 
        className={`w-full h-0.5 transition-colors duration-300 ${theme === 'dark' ? 'bg-pure-white group-hover:bg-brand-gold' : 'bg-primary-dark group-hover:bg-pure-white'}`}
      />
      <span 
        className={`w-4 h-0.5 ml-auto transition-all duration-300 group-hover:w-full ${theme === 'dark' ? 'bg-pure-white group-hover:bg-brand-gold' : 'bg-primary-dark group-hover:bg-pure-white'}`}
      />
    </div>
  </button>
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState(() => {
    // Determine exact initial state based on pathname
    if (pathname === '/' || pathname === '/reviews' || pathname === '/true-view') return { theme: 'dark' as 'light' | 'dark' };
    return { theme: 'light' as 'light' | 'dark' };
  });

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    let ticking = false;
    
    const updateHeaderStyle = () => {
      // Find elements near the bottom of the header (Y=65px) so it adapts as soon as a section slides under it
      const elements = document.elementsFromPoint(window.innerWidth / 2, 65);
      
      // Find the first main section element (ignoring the header itself)
      const section = elements.find(el => el.tagName === 'SECTION' || el.tagName === 'MAIN' || el.tagName === 'FOOTER');
      
      if (section) {
        const style = window.getComputedStyle(section);
        const bg = style.backgroundColor;
        
        // Parse RGB to calculate luminance
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          
          setHeaderState({
            theme: luminance < 0.5 ? 'dark' : 'light'
          });
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderStyle);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    setTimeout(updateHeaderStyle, 100);
    // Secondary check slightly later just in case GSAP takes longer or page wipe is finishing
    const fallbackTimeout = setTimeout(updateHeaderStyle, 800);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(fallbackTimeout);
    };
  }, [pathname]);

  const { theme } = headerState;

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 bg-transparent pointer-events-none"
      >
        <div className="container-editorial h-auto py-3 lg:h-16 lg:py-0 flex items-center justify-between pointer-events-auto">
          
          {/* LEFT: Logo & Desktop Menu Trigger */}
          <div className="flex items-center gap-6 lg:gap-8">
            
            {/* LOGO BLOCK */}
            <Link 
              href="/" 
              className="group flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 min-h-[44px] justify-center"
              aria-label="VMONE Home"
            >
              <div className={`flex items-center gap-2 font-display text-base lg:text-lg font-bold tracking-tighter uppercase leading-none transition-colors duration-300 ${theme === 'dark' ? 'text-pure-white group-hover:text-brand-gold' : 'text-primary-dark group-hover:text-pure-white'}`}>
                <Image 
                  src="/logo.png" 
                  alt="VMONE Logo" 
                  width={20} 
                  height={20} 
                  className="object-contain transition-all duration-300" 
                  priority 
                />
                <span className="mt-0.5">VMONE</span>
              </div>
              <span className={`text-[9px] lg:text-[10px] font-bold tracking-[0.2em] uppercase mt-1 leading-none ml-0.5 transition-colors duration-300 ${theme === 'dark' ? 'text-pure-white/60 group-hover:text-brand-gold/80' : 'text-muted-dark group-hover:text-primary-dark'}`}>
                CONSUMER TECHNOLOGY
              </span>
            </Link>

          </div>

          {/* RIGHT: Desktop Nav & CTA / Mobile Menu Trigger */}
          <div className="flex items-center gap-6 lg:gap-10">
            
            {/* DESKTOP LINKS */}
            <nav className="hidden lg:flex items-center gap-8">
              {desktopNavLinks.map((link) => {
                const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="relative group text-[11px] font-display font-bold tracking-widest uppercase py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                    >
                      <span className={`transition-colors duration-300 ${isActive ? (theme === 'dark' ? 'text-brand-gold' : 'text-primary-dark') : (theme === 'dark' ? 'text-pure-white group-hover:text-brand-gold' : 'text-muted-dark group-hover:text-primary-dark')}`}>
                        {link.label}
                      </span>
                      {/* Active Indicator Underline */}
                      {isActive && (
                        <span className={`absolute -bottom-1 left-0 w-full h-[2px] ${theme === 'dark' ? 'bg-brand-gold' : 'bg-primary-dark'}`} />
                      )}
                    </Link>
                  );
              })}
            </nav>

            {/* CTA BUTTON */}
            <Link 
              href="/contact" 
              className={`hidden lg:inline-flex font-display font-bold text-[11px] tracking-[0.15em] uppercase px-7 py-3 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme === 'dark' ? 'bg-brand-gold text-primary-dark hover:bg-pure-white focus-visible:ring-white focus-visible:ring-offset-primary-dark' : 'bg-primary-dark text-brand-gold hover:bg-brand-gold hover:text-primary-dark focus-visible:ring-primary-dark focus-visible:ring-offset-brand-gold'}`}
            >
              LET&apos;S TALK
            </Link>

            {/* MENU TRIGGER */}
            <MenuButton className="flex" openMenu={openMenu} isMenuOpen={isMenuOpen} theme={theme} />

          </div>

        </div>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
