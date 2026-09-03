'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { id: '01', title: 'TELEVISIONS', desc: 'Picture quality. Processing. Real-world viewing.' },
  { id: '02', title: 'AIR CONDITIONERS', desc: 'Cooling performance. Efficiency. Everyday comfort.' },
  { id: '03', title: 'REFRIGERATORS', desc: 'Storage. Cooling. Convenience. Long-term usability.' },
  { id: '04', title: 'WASHING MACHINES', desc: 'Cleaning performance. Fabric care. Practical features.' },
  { id: '05', title: 'SOUNDBARS & HOME AUDIO', desc: 'Sound quality. Clarity. Immersion.' },
  { id: '06', title: 'VACUUM CLEANERS & ROBOT VACUUMS', desc: 'Cleaning performance. Navigation. Everyday usability.' },
  { id: '07', title: 'KITCHEN APPLIANCES', desc: 'Features that matter beyond the specification sheet.' },
  { id: '08', title: 'SMART HOME', desc: 'Connected technology designed for real life.' },
];

export default function Expertise() {
  const container = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomDividerRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const addToHeadingRefs = (el: HTMLSpanElement) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 2. Intro reveals
      gsap.set(topDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRefs.current, { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(copyRef.current, { opacity: 0, y: 20 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      introTl.to(topDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
             .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
             .to(headingRefs.current, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, stagger: 0.15, ease: 'power3.out' }, "-=0.4")
             .to(copyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");

      // 3. Staggered Row reveals
      gsap.set(rowRefs.current, { opacity: 0, y: 30 });
      
      gsap.to(rowRefs.current, {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // 4. Ending Elements
      gsap.set(bottomDividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set([footerTextRef.current, taglineRef.current], { opacity: 0, y: 10 });

      const endTl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomDividerRef.current,
          start: "top 95%",
        }
      });

      endTl.to(bottomDividerRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' })
           .to([taglineRef.current, footerTextRef.current], { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, "-=0.6");

    });

    // Reduced motion fallback
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        container.current, topDividerRef.current, eyebrowRef.current, ...headingRefs.current,
        copyRef.current, ...rowRefs.current, bottomDividerRef.current, footerTextRef.current, taglineRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        scaleX: 1, 
        clipPath: 'inset(0% 0% 0% 0%)',
        
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      id="expertise"
      ref={container}
      className="relative bg-primary-dark pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden"
    >
      <div className="container-editorial relative z-10">
        
        {/* Intro */}
        <div className="mb-12 md:mb-24">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-pure-white/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
            WHAT VMONE COVERS
          </div>
        </div>

        {/* Header & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(3.5rem,7vw,7rem)]">
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">TECHNOLOGY FOR</span>
              </span>
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">REAL HOMES.</span>
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 flex items-end pb-2 md:pb-4">
            <p ref={copyRef} className="text-base md:text-lg font-body font-light text-muted-light leading-relaxed">
              From entertainment and cooling to appliances and smart home technology, VMONE focuses on what actually matters when you live with a product.
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div ref={listRef} className="flex flex-col border-b border-pure-white/20">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              href="/expertise"
              ref={(el) => { if (el) rowRefs.current[index] = el; }}
              className="group flex flex-col md:flex-row md:items-center justify-between border-t border-pure-white/20 py-8 md:py-12 transition-colors duration-500 hover:bg-pure-white/5 px-4 md:px-8 -mx-4 md:-mx-8 cursor-pointer focus:outline-none focus-visible:bg-pure-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 lg:gap-24 w-full">
                <span className="font-display text-sm md:text-base font-bold tracking-widest text-muted-light transition-transform duration-500 group-hover:translate-x-2">
                  {category.id}
                </span>
                
                <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-gold transition-transform duration-500 group-hover:translate-x-2">
                  {category.title}
                </h3>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto md:min-w-[300px] lg:min-w-[400px]">
                <p className="font-body text-sm md:text-base text-muted-light/70 transition-all duration-500 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
                  {category.desc}
                </p>
                <ArrowRight className="w-5 h-5 text-brand-gold transition-all duration-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 hidden md:block" />
              </div>
            </Link>
          ))}
        </div>

        {/* Ending Copy & Divider */}
        <div className="mt-20 md:mt-32 flex flex-col items-start md:items-end md:text-right">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 mb-8">
              <div ref={footerTextRef} className="flex flex-col gap-1 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-light">
                <span>VMONE / EXPERTISE</span>
              </div>
              
              <div ref={taglineRef} className="font-display font-bold uppercase tracking-tight text-xl md:text-3xl text-brand-gold">
                REAL PRODUCTS. <span className="text-muted-light">PRACTICAL TESTING.</span> CLEARER DECISIONS.
              </div>
            </div>
            
            <div ref={bottomDividerRef} className="w-full h-px bg-pure-white/30" />
          </div>
        </div>

      </div>
    </section>
  );
}
