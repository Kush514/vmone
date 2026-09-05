'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLenis } from 'lenis/react';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'REVIEWS', href: '/reviews' },
  { label: 'EXPERTISE', href: '/expertise' },
  { label: 'TRUE-VIEW', href: '/true-view' },
  { label: 'CONTACT', href: '/contact' },
];

const socials = [
  { name: 'YOUTUBE', url: 'https://www.youtube.com/@VMone' },
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/vm__one/' },
  { name: 'X', url: 'https://x.com/vm__one' },
  { name: 'FACEBOOK', url: 'https://www.facebook.com/vmone1' },
  { name: 'TELEGRAM', url: 'https://t.me/VM_ONE1' },
];

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Scroll lock and keyboard listeners
  useEffect(() => {
    if (isOpen) {
      // Lock scrolling
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      
      // Escape key to close
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      
      // Focus management (focus first element inside menu)
      setTimeout(() => {
        if (menuRef.current) {
          const firstFocusable = menuRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
          if (firstFocusable) firstFocusable.focus();
        }
      }, 100);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        lenis?.start();
      };
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
  }, [isOpen, lenis, onClose]);

  // Handle pointer events state based on isOpen
  const pointerEventsClass = isOpen ? 'pointer-events-auto' : 'pointer-events-none';

  return (
    <div 
      className={`fixed inset-0 z-[100] ${pointerEventsClass}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Navigation Menu"
    >
      {/* Background Overlay */}
      <div 
        className={`absolute inset-0 bg-primary-dark transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
      />
      
      <div ref={menuRef} className={`relative w-full h-full flex flex-col transition-opacity duration-500 delay-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header row in menu */}
        <div className="container-editorial h-16 md:h-20 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 font-display text-lg font-bold tracking-tighter uppercase text-brand-gold">
            <Image 
              src="/logo.png" 
              alt="VMONE Logo" 
              width={22} 
              height={22} 
              className="object-contain" 
              priority 
            />
            <span>VMONE</span>
          </div>
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000] rounded-none px-2 py-2 min-h-[44px]"
            aria-label="Close menu"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-light group-hover:text-brand-gold transition-colors duration-300">
              CLOSE
            </span>
            <span className="text-xl leading-none text-muted-light group-hover:text-brand-gold transition-colors duration-300 -mt-0.5">
              &times;
            </span>
          </button>
        </div>

        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden container-editorial py-12 md:py-24 flex flex-col justify-between"
          data-lenis-prevent
        >
          
          {/* Main Navigation Links */}
          <nav className="flex flex-col gap-4 md:gap-6 mb-24 max-w-4xl">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-6 md:gap-12 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-8 focus-visible:ring-offset-[#000000] rounded-sm py-2"
                >
                  <span className="hidden md:inline-block font-display text-sm font-bold tracking-[0.2em] text-brand-gold opacity-50 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                  <span className={`font-display font-bold uppercase tracking-tighter text-[clamp(2rem,11vw,6.5rem)] leading-[0.9] transition-colors duration-400 ${isActive ? 'text-pure-white' : 'text-brand-gold group-hover:text-pure-white'}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Area of Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 border-t border-white/10 pt-12 md:pt-16">
            
            {/* Social Links */}
            <div className="flex flex-col gap-6">
              <div className="text-xs font-medium tracking-[0.2em] text-muted-light uppercase">
                SOCIAL CHANNELS
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 max-w-md">
                {socials.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-sm font-display font-bold tracking-[0.2em] uppercase text-brand-gold hover:text-pure-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold py-2 min-h-[44px]"
                  >
                    {social.name}
                    <ArrowUpRight className="w-4 h-4 text-brand-gold opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Email */}
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="text-xs font-medium tracking-[0.2em] text-muted-light uppercase">
                DIRECT INQUIRIES
              </div>
              <a 
                href="mailto:vineet@vmone.in"
                className="flex items-center text-xl md:text-2xl font-display font-bold tracking-widest uppercase text-brand-gold hover:text-pure-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#000000] py-2 min-h-[44px]"
              >
                VINEET@VMONE.IN
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
