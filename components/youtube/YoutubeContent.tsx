'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, X } from 'lucide-react';
import { formatCompactNumber, formatTimeAgo, YouTubeChannel, YouTubeVideo } from '@/lib/youtube';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface Props {
  channelData: YouTubeChannel | null;
  latestVideos: YouTubeVideo[] | null;
}

export default function YoutubeContent({ channelData, latestVideos }: Props) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const container = useRef<HTMLElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLAnchorElement[]>([]);

  const addToHeadingRefs = (el: HTMLSpanElement | null) => {
    if (el && !headingRefs.current.includes(el)) headingRefs.current.push(el);
  };
  
  const addToStatRefs = (el: HTMLDivElement | null) => {
    if (el && !statRefs.current.includes(el)) statRefs.current.push(el);
  };

  const addToVideoRefs = (el: HTMLDivElement | null) => {
    if (el && !videoRefs.current.includes(el as any)) videoRefs.current.push(el as any);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // No background transition needed — section stays dark

      // Intro Elements
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

      // Stats Reveal & Counter
      if (statsContainerRef.current) {
        gsap.set(statsContainerRef.current, { opacity: 0, y: 30 });
        gsap.to(statsContainerRef.current, {
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });

        // Count up animation
        const counters = gsap.utils.toArray('.stat-counter') as HTMLElement[];
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute('data-target') || '0');
          gsap.fromTo(counter, 
            { innerHTML: 0 }, 
            {
              innerHTML: target,
              duration: 2.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: statsContainerRef.current,
                start: 'top 85%',
              },
              onUpdate: function () {
                // Add abbreviations like M or K to the number during animation
                // We use the imported formatCompactNumber function!
                const val = Math.ceil(Number(this.targets()[0].innerHTML));
                
                // Let's implement the format logic inline since formatCompactNumber is imported 
                // but might not be available in this scope or context correctly during GSAP update
                if (val >= 100000000) {
                  counter.innerHTML = (val / 1000000).toFixed(0) + 'M';
                } else if (val >= 1000000) {
                  counter.innerHTML = (val / 1000000).toFixed(2) + 'M';
                } else {
                  counter.innerHTML = val.toLocaleString('en-US');
                }
              }
            }
          );
        });
      }

      // Videos Reveal
      if (videoRefs.current.length > 0) {
        gsap.set(videoRefs.current, { opacity: 0, y: 40 });
        gsap.to(videoRefs.current, {
          scrollTrigger: {
            trigger: videoRefs.current[0],
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }

    });

    // Reduced motion fallback
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        container.current, topDividerRef.current, eyebrowRef.current, ...headingRefs.current,
        copyRef.current, statsContainerRef.current, ...videoRefs.current
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
      id="youtube"
      ref={container}
      className="relative bg-secondary-dark text-pure-white pt-24 pb-16 md:pt-24 md:pb-24 overflow-hidden"
    >
      <div className="container-editorial relative z-10">
        
        {/* Intro */}
        <div className="mb-12 md:mb-24">
          <div ref={topDividerRef} className="w-full max-w-[120px] h-px bg-brand-gold/40 mb-6" />
          <div ref={eyebrowRef} className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
            VMONE ON YOUTUBE
          </div>
        </div>

        {/* Main Heading & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(3.5rem,7.5vw,9rem)]">
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-brand-gold">THE REVIEWS</span>
              </span>
              <span className="block overflow-hidden pb-1 md:pb-2">
                <span ref={addToHeadingRefs} className="block origin-bottom text-muted-light font-serif italic font-normal normal-case tracking-normal pt-2">Are Here.</span>
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col items-start justify-end gap-8 pb-2 md:pb-4">
            <p ref={copyRef} className="text-base md:text-lg lg:text-xl font-body font-light text-muted-light leading-relaxed">
              Watch Vineet Malhotra test, compare and explain the technology people actually bring into their homes.
            </p>
            
            <a 
              href="https://www.youtube.com/@VMone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center justify-center px-8 py-4 border border-brand-gold bg-primary-dark text-brand-gold font-medium tracking-[0.15em] uppercase hover:border-brand-gold transition-colors duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark rounded-sm"
            >
              <div className="absolute inset-0 bg-brand-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary-dark">WATCH VMONE ON YOUTUBE</span>
              <ArrowRight className="w-4 h-4 ml-3 relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary-dark" />
            </a>
          </div>
        </div>

        {/* Statistics Area */}
        <div ref={statsContainerRef} className="mb-16 md:mb-24">
          {channelData ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 border-y border-pure-white/10 py-12 md:py-16">
              <div ref={addToStatRefs} className="flex flex-col gap-2">
                <div 
                  className="stat-counter font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-brand-gold"
                  data-target={channelData.subscriberCount}
                >
                  {formatCompactNumber(channelData.subscriberCount)}
                </div>
                <div className="text-xs md:text-sm font-medium tracking-widest text-muted-light uppercase">SUBSCRIBERS</div>
              </div>
              <div ref={addToStatRefs} className="flex flex-col gap-2">
                <div 
                  className="stat-counter font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-brand-gold"
                  data-target={channelData.viewCount}
                >
                  {formatCompactNumber(channelData.viewCount)}
                </div>
                <div className="text-xs md:text-sm font-medium tracking-widest text-muted-light uppercase">TOTAL VIEWS</div>
              </div>
              <div ref={addToStatRefs} className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <div 
                  className="stat-counter font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-brand-gold"
                  data-target={channelData.videoCount}
                >
                  {formatCompactNumber(channelData.videoCount)}
                </div>
                <div className="text-xs md:text-sm font-medium tracking-widest text-muted-light uppercase">VIDEOS</div>
              </div>
            </div>
          ) : (
            <div className="border-y border-pure-white/10 py-12 md:py-16 text-center text-muted-light font-display text-xl">
              Explore the latest VMONE videos on the official channel.
            </div>
          )}
        </div>

        {/* Latest Videos Section */}
        <div className="mb-24 md:mb-32">
          <div className="flex justify-between items-end mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-gold">
              LATEST FROM VMONE
            </h3>
            <span className="hidden md:block text-xs font-medium tracking-widest text-muted-light uppercase">
              WATCH. COMPARE. UNDERSTAND.
            </span>
          </div>

          {latestVideos && latestVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              {latestVideos.slice(0, 3).map((video) => (
                <div 
                  key={video.id}
                  ref={addToVideoRefs}
                  className="group md:col-span-12 lg:col-span-4 flex flex-col gap-5 text-left"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-pure-white/5">
                    {activeVideoId === video.id ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    ) : (
                      <div 
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => setActiveVideoId(video.id)}
                      >
                        {video.thumbnail && (
                          <Image 
                            src={video.thumbnail} 
                            alt={video.title}
                            fill
                            className="object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            unoptimized={true}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="relative transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-2xl flex items-center justify-center">
                            {/* White backing for the play triangle so it isn't transparent */}
                            <div className="absolute bg-white w-4 h-4 md:w-6 md:h-6 rounded-sm z-0" />
                            <YouTubeIcon className="w-14 h-14 md:w-16 md:h-16 text-[#FF0000] relative z-10" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h4 className="font-display text-lg md:text-xl font-bold leading-tight text-pure-white group-hover:text-muted-light transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] md:text-xs font-medium tracking-widest text-muted-light uppercase">
                      <span>{formatTimeAgo(video.publishedAt)}</span>
                      {video.viewCount && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-muted-light/50" />
                          <span>{Number(video.viewCount).toLocaleString('en-US')} VIEWS</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-pure-white/10 bg-pure-white/5">
              <p className="font-display text-xl md:text-2xl text-muted-light mb-4">No recent videos found.</p>
              <a 
                href="https://www.youtube.com/@VMone" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-widest uppercase text-pure-white hover:underline"
              >
                Visit Channel
              </a>
            </div>
          )}
        </div>

        {/* Section Footer */}
        <div className="flex flex-col items-start md:items-end md:text-right mt-12 md:mt-24">
          <div className="w-full">
            <div className="flex justify-between items-end gap-6 md:gap-4 mb-8">
              <div className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-light">
                <span>VMONE / YOUTUBE</span>
              </div>
              <span className="md:hidden text-[10px] font-medium tracking-widest text-muted-light uppercase text-right">
                WATCH. COMPARE. UNDERSTAND.
              </span>
            </div>
            
            <div className="w-full h-px bg-pure-white/10" />
          </div>
        </div>

      </div>

    </section>
  );
}
