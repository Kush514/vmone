'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useGlobalTheme } from '@/components/providers/ThemeProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutVineet() {
  const { theme } = useGlobalTheme();
  const container = useRef<HTMLDivElement>(null);
  
  // Animation Refs
  const dividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const introRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const experienceNumberRef = useRef<HTMLDivElement>(null);
  const experienceTextRef = useRef<HTMLDivElement>(null);
  const secondaryTextRef = useRef<HTMLParagraphElement>(null);
  
  const bottomDividerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic years of experience since May 20, 2012
  const startDate = new Date('2012-05-20');
  const currentDate = new Date();
  let yearsOfExperience = currentDate.getFullYear() - startDate.getFullYear();
  if (
    currentDate.getMonth() < startDate.getMonth() ||
    (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() < startDate.getDate())
  ) {
    yearsOfExperience--;
  }

  useGSAP(() => {
    if (theme === 'noir_new') return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none none',
      }
    });

    // 1. Top Divider & Eyebrow
    tl.fromTo(dividerRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(eyebrowRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // 2. Main Heading Stagger
    const textLines = mainTextRef.current?.children;
    if (textLines) {
      tl.fromTo(textLines,
        { yPercent: 100, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=0.2'
      );
    }

    // 3. Image Reveal (Clip Path + Scale)
    tl.fromTo(imageContainerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' },
      '-=0.6'
    )
    .fromTo(imageRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=1.2'
    );

    // 4. Right Column Text Stagger
    const rightColElements = [
      introRef.current,
      highlightRef.current,
      experienceNumberRef.current,
      experienceTextRef.current,
      secondaryTextRef.current
    ];

    tl.fromTo(rightColElements,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out' 
      },
      '-=0.8'
    );

    // 5. Bottom Footer Reveal
    tl.fromTo(bottomDividerRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(metadataRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Parallax effect for the image on scroll
    if (imageContainerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

  }, { scope: container, dependencies: [theme] });

  if (theme === 'noir_new') {
    return (
      <section 
        id="about"
        ref={container}
        className="relative bg-primary-dark text-pure-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-4 md:px-16 lg:px-24"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Heading & Image */}
            <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12">
              <h2 className="font-display font-black uppercase leading-[0.9] tracking-tighter text-[clamp(3rem,5vw,6rem)] text-brand-gold">
                <span className="block overflow-hidden pb-2">VINEET</span>
                <span className="block overflow-hidden pb-2">MALHOTRA</span>
              </h2>
              
              <div ref={imageContainerRef} className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-brand-silver/10">
                <Image 
                  ref={imageRef}
                  src="/vineet.webp"
                  alt="Vineet Malhotra"
                  fill
                  className="object-cover object-[center_8%] transition-transform duration-[3s] ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={100}
                />
              </div>
            </div>

            {/* Right Column: Copy & Experience */}
            <div className="lg:col-span-7 flex flex-col gap-12 lg:pt-4">
              
              <div className="flex flex-col gap-8">
                <p className="text-lg md:text-xl font-body font-light text-brand-silver leading-relaxed">
                  <span className="float-left font-display font-black text-6xl md:text-7xl leading-[0.8] pr-4 pt-2 text-brand-gold">V</span>ineet Malhotra is a leading consumer technology expert with an uncompromising critical eye for detail, design, and performance. With over a decade of dedicated experience dissecting the complexities of modern appliances, he founded VMONE to elevate the standard of product evaluation. His approach transcends basic specifications, focusing deeply on how engineering decisions impact daily human experience.
                </p>
                <p className="text-lg md:text-xl font-body font-light text-brand-silver leading-relaxed">
                  Through meticulous testing protocols and a commitment to absolute transparency, Vineet has built a platform that demystifies technology. He believes that true luxury in consumer goods is defined not just by price, but by flawless execution, reliability, and intuitive design.
                </p>
              </div>
              
              <div className="w-full h-px bg-brand-silver/20 my-4" />

              <div className="relative py-4 pl-6 border-l-4 border-brand-gold">
                <p className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-pure-white leading-tight">
                  "Technology should be<br className="hidden md:block"/> easy to understand."
                </p>
              </div>

              <div className="w-full h-px bg-brand-silver/20 my-4" />

              <div className="flex items-center gap-6 md:gap-8 pt-4">
                <div className="font-display font-black text-6xl md:text-8xl tracking-tighter text-brand-gold leading-none">
                  {yearsOfExperience}+
                </div>
                <div className="flex flex-col justify-center text-sm md:text-base font-bold tracking-[0.25em] uppercase text-brand-silver">
                  <span>YEARS</span>
                  <span>TESTING</span>
                  <span>APPLIANCES</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* Bottom Marquee */}
          <div className="mt-24 md:mt-32 w-full pt-8 border-t border-brand-silver/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] md:text-xs font-bold tracking-[0.3em] text-brand-silver uppercase w-full">
              <span>VINEET MALHOTRA</span>
              <span className="text-brand-gold hidden md:block">•</span>
              <span>FOUNDER</span>
              <span className="text-brand-gold hidden md:block">•</span>
              <span>VMONE</span>
              <span className="text-brand-gold hidden md:block">•</span>
              <span>DELHI, NCR</span>
            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section 
      id="about"
      ref={container}
      className="relative bg-primary-dark text-pure-white pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden"
    >
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <div ref={dividerRef} className="w-full max-w-[120px] h-px bg-pure-white/10 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
            THE PERSON BEHIND VMONE
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Heading & Image */}
          <div className="lg:col-span-6 flex flex-col gap-12 md:gap-16">
            <h2 ref={mainTextRef} className="font-display font-bold uppercase leading-[0.9] tracking-tighter text-[clamp(3.5rem,6vw,8rem)]">
              <span className="block overflow-hidden pb-1">VINEET</span>
              <span className="block overflow-hidden pb-1">MALHOTRA</span>
            </h2>
            
            {/* Vineet Malhotra Image (Desktop) */}
            <div ref={imageContainerRef} className="hidden lg:block relative w-3/4 max-w-md aspect-[4/5] overflow-hidden">
              <Image 
                ref={imageRef}
                src="/vineet.webp"
                alt="Vineet Malhotra"
                fill
                className="object-cover object-[center_8%]"
                sizes="(max-width: 1024px) 0vw, 33vw"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* Right Column: Copy & Experience */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-12 pt-2 md:pt-4">
            
            <div className="flex flex-col gap-8 md:gap-10">
              <p ref={introRef} className="text-lg md:text-xl font-body font-light text-muted-light leading-relaxed">
                <span className="font-serif font-bold text-brand-gold">Vineet Malhotra</span> is a consumer technology expert and the founder of VMONE. For more than a decade, he has tested and analysed technology and home appliances to make complicated buying decisions simpler.
              </p>
              
              <div ref={highlightRef} className="relative pt-6 pb-2 md:pl-4">
                <div className="absolute top-0 left-0 text-7xl md:text-8xl text-brand-gold opacity-10 font-serif leading-none -mt-4 md:-mt-6">"</div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-brand-gold leading-tight pl-6 md:pl-10">
                  Technology should be<br />easy to understand.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 md:gap-8 items-start border-y border-muted-light/50 py-10">
              <div ref={experienceNumberRef} className="font-display text-7xl md:text-8xl font-bold tracking-tighter text-brand-gold leading-none">
                {yearsOfExperience}+
              </div>
              <div ref={experienceTextRef} className="flex flex-col justify-center text-sm md:text-base font-medium tracking-widest uppercase text-muted-light leading-relaxed">
                <span>YEARS</span>
                <span>TESTING</span>
                <span>APPLIANCES</span>
              </div>
            </div>

            <p ref={secondaryTextRef} className="font-body text-base md:text-lg text-muted-light leading-relaxed font-light">
              From televisions and air conditioners to refrigerators, washing machines, home audio and smart appliances, Vineet focuses on what matters beyond the specification sheet &mdash; real-world performance, usability and value.
            </p>

            {/* Vineet Malhotra Image (Mobile) */}
            <div className="lg:hidden relative w-3/4 max-w-sm mx-auto aspect-[4/5] mt-8 overflow-hidden">
              <Image 
                src="/vineet.webp"
                alt="Vineet Malhotra"
                fill
                className="object-cover object-[center_8%]"
                sizes="(max-width: 1024px) 75vw, 0vw"
                quality={100}
                priority
              />
            </div>
            
          </div>
        </div>

        {/* Section Footer / Divider */}
        <div className="mt-16 md:mt-24">
          <div ref={bottomDividerRef} className="w-full h-px bg-pure-white/10 mb-8" />
          <div ref={metadataRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-medium tracking-[0.2em] text-muted-light uppercase">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
              <span className="text-brand-gold">VINEET MALHOTRA</span>
              <span className="hidden sm:inline text-muted-light">/</span>
              <span>FOUNDER / VMONE</span>
              <span className="hidden sm:inline text-muted-light">/</span>
              <span>DELHI, NCR</span>
            </div>
            <div className="text-muted-light font-bold">
              TRUE-VIEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
