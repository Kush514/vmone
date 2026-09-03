'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const socials = [
  { name: 'YOUTUBE', url: 'https://www.youtube.com/@VMone' },
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/vmone.in' },
  { name: 'TWITTER', url: 'https://twitter.com/vmone' },
];

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  const addToSocialRefs = (el: HTMLAnchorElement) => {
    if (el && !socialRefs.current.includes(el)) {
      socialRefs.current.push(el);
    }
  };

  useGSAP(() => {
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
  }, { scope: container });

  return (
    <footer 
      ref={container}
      className="relative z-10 border-t border-pure-white/10 pt-12 md:pt-16 pb-6 md:pb-8 bg-primary-dark text-pure-white"
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
                className="text-xs md:text-sm font-display font-bold tracking-[0.2em] uppercase text-brand-gold hover:text-pure-white transition-colors duration-300 focus:outline-none focus-visible:text-pure-white"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Email */}
          <a 
            href="mailto:VINEET@VMONE.IN"
            ref={emailRef}
            className="text-lg md:text-xl font-display font-bold tracking-widest uppercase text-brand-gold hover:text-pure-white transition-colors duration-300 focus:outline-none focus-visible:text-pure-white"
          >
            VINEET@VMONE.IN
          </a>
        </div>

        {/* Micro Branding */}
        <div ref={bottomMetaRef} className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-medium tracking-[0.2em] text-muted-light/50 uppercase text-center md:text-left">
          <div>VMONE</div>
          <div>CONSUMER TECHNOLOGY / DELHI NCR</div>
        </div>
        
      </div>
    </footer>
  );
}
