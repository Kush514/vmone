'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useGlobalTheme } from '@/components/providers/ThemeProvider';

const socials = [
  { name: 'YOUTUBE', url: 'https://www.youtube.com/@VMone' },
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/vmone.in' },
  { name: 'TWITTER', url: 'https://twitter.com/vmone' },
];

export default function Footer() {
  const { theme } = useGlobalTheme();
  const container = useRef<HTMLElement>(null);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  const addToSocialRefs = (el: HTMLAnchorElement | null) => {
    if (el && !socialRefs.current.includes(el)) {
      socialRefs.current.push(el);
    }
  };

  useGSAP(() => {
    if (theme === 'noir_new') return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(socialRefs.current, { opacity: 0, y: 20 });
      gsap.set([emailRef.current, bottomMetaRef.current], { opacity: 0, y: 10 });

      const socialTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 95%",
        }
      });

      socialTl.to(socialRefs.current, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' })
              .to([emailRef.current, bottomMetaRef.current], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.2");
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        ...socialRefs.current, emailRef.current, bottomMetaRef.current
      ], { 
        opacity: 1, 
        y: 0, 
      });
    });

    return () => mm.revert();
  }, { scope: container, dependencies: [theme] });

  // NOIR NEW THEME LAYOUT
  if (theme === 'noir_new') {
    return (
      <footer 
        ref={container}
        className="relative z-10 w-full border-t border-brand-gold bg-primary-dark text-pure-white flex flex-col justify-between py-12 px-8 md:px-16 lg:px-24"
      >
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 h-full content-between items-start pt-8 pb-16">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between h-full space-y-8 md:space-y-0">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-brand-gold tracking-widest uppercase">
                VMONE
              </h2>
              <p className="mt-6 text-brand-silver italic font-serif text-lg md:text-xl">
                Consumer Technology. Without the Noise.
              </p>
            </div>
            <div className="mt-auto md:mt-32">
              <a 
                href="mailto:VINEET@VMONE.IN"
                ref={emailRef}
                className="text-brand-gold hover:text-pure-white transition-colors duration-300 font-display font-bold tracking-[0.15em] text-sm lg:text-base focus:outline-none focus-visible:text-pure-white"
              >
                VINEET@VMONE.IN
              </a>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col justify-center h-full pt-4 md:pt-0">
            <nav className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10 items-start md:items-center w-full">
              {['HOME', 'ABOUT', 'EXPERTISE', 'REVIEWS', 'TRUE-VIEW', 'CONTACT'].map((item) => (
                <a key={item} href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} className="text-brand-silver hover:text-brand-gold transition-colors duration-300 font-display tracking-[0.2em] uppercase text-sm lg:text-lg focus:outline-none focus-visible:text-brand-gold">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-center items-start md:items-end h-full w-full pt-8 md:pt-0">
            <div className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10 text-left md:text-right w-full">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={addToSocialRefs}
                  className="text-brand-gold hover:text-pure-white transition-colors duration-300 font-display font-bold tracking-[0.15em] uppercase text-sm lg:text-lg flex items-center md:justify-end gap-3 group focus:outline-none focus-visible:text-pure-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div ref={bottomMetaRef} className="w-full pt-8 border-t border-brand-silver/20 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-display tracking-[0.15em] uppercase text-[10px] text-brand-silver text-center w-full md:w-auto">
              © {new Date().getFullYear()} VMONE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6 font-display tracking-[0.15em] uppercase text-[10px] text-brand-silver">
              <a href="#" className="hover:text-brand-gold transition-colors">PRIVACY</a>
              <a href="#" className="hover:text-brand-gold transition-colors">TERMS</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // DEFAULT (OLD) LAYOUT
  return (
    <footer 
      ref={container}
      className="relative z-10 border-t border-brand-silver/20 pt-12 md:pt-16 pb-6 md:pb-8 bg-primary-dark text-pure-white"
    >
      <div className="container-editorial">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8 mb-16 md:mb-24">
          {/* Socials */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-6 md:gap-12">
            {socials.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={addToSocialRefs}
                className="text-xs md:text-sm font-display font-bold tracking-[0.2em] uppercase text-pure-white hover:text-brand-gold transition-colors duration-300 focus:outline-none focus-visible:text-brand-gold"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Email */}
          <a 
            href="mailto:VINEET@VMONE.IN"
            ref={emailRef}
            className="text-lg md:text-xl font-display font-bold tracking-widest uppercase text-pure-white hover:text-brand-gold transition-colors duration-300 focus:outline-none focus-visible:text-brand-gold"
          >
            VINEET@VMONE.IN
          </a>
        </div>

        {/* Micro Branding */}
        <div ref={bottomMetaRef} className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-medium tracking-[0.2em] text-brand-silver uppercase text-center md:text-left">
          <div>VMONE</div>
          <div>CONSUMER TECHNOLOGY / DELHI NCR</div>
        </div>
        
      </div>
    </footer>
  );
}
