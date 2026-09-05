import React from "react";

export default function MilestoneVisual({ stat }: { stat: string }) {
  switch (stat) {
    case "START":
      return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-gold fill-transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="25" y="35" width="50" height="35" rx="4" />
            <circle cx="50" cy="52.5" r="10" />
            <circle cx="50" cy="52.5" r="4" />
            <path d="M 35 35 L 40 25 L 60 25 L 65 35" />
            <path d="M 75 45 L 85 40 L 85 65 L 75 60" />
            <line x1="25" y1="52.5" x2="15" y2="52.5" />
          </svg>
        </div>
      );
    case "100K":
      return (
        <div className="relative w-48 h-64 md:w-56 md:h-72 bg-gradient-to-br from-pure-white/20 to-pure-white/5 border border-pure-white/30 rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-2 border border-pure-white/20" />
          <div className="absolute top-12 w-16 h-12 border border-pure-white/40 flex items-center justify-center bg-gradient-to-br from-pure-white/40 to-pure-white/10 rounded-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-pure-white drop-shadow-md">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="absolute bottom-16 text-center">
            <div className="font-display text-pure-white text-3xl font-bold tracking-tighter">100,000</div>
            <div className="font-display text-pure-white/50 text-[10px] tracking-[0.3em] uppercase mt-2">Subscribers</div>
          </div>
        </div>
      );
    case "1M":
      return (
        <div className="relative w-48 h-64 md:w-56 md:h-72 bg-gradient-to-br from-brand-gold/40 to-brand-gold/10 border border-brand-gold/50 rounded-sm shadow-[0_0_40px_rgba(224,205,127,0.15)] flex items-center justify-center overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-2 border border-brand-gold/30" />
          <div className="absolute top-12 w-20 h-16 border border-brand-gold/60 flex items-center justify-center bg-gradient-to-br from-brand-gold to-brand-gold/40 rounded-sm shadow-inner">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-primary-dark drop-shadow-lg">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="absolute bottom-16 text-center">
            <div className="font-display text-brand-gold text-4xl font-bold tracking-tighter">1,000,000</div>
            <div className="font-display text-brand-gold/70 text-[10px] tracking-[0.3em] uppercase mt-2">Subscribers</div>
          </div>
        </div>
      );
    case "3M":
      return (
        <div className="relative w-56 h-64 md:w-72 md:h-72 flex items-center justify-center">
          {/* Back Button */}
          <div className="absolute w-24 h-24 md:w-32 md:h-32 border border-brand-gold/20 rotate-12 flex items-center justify-center bg-brand-gold/5 backdrop-blur-sm rounded-lg shadow-[0_0_20px_rgba(224,205,127,0.05)] -translate-x-12 -translate-y-8">
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-brand-gold/30">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Middle Button */}
          <div className="absolute w-28 h-28 md:w-40 md:h-40 border border-brand-gold/40 -rotate-6 flex items-center justify-center bg-brand-gold/10 backdrop-blur-md rounded-lg shadow-[0_0_30px_rgba(224,205,127,0.15)] translate-x-8 -translate-y-4">
            <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 fill-brand-gold/50">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Front Button */}
          <div className="absolute w-32 h-32 md:w-48 md:h-48 border border-brand-gold/80 flex items-center justify-center bg-gradient-to-br from-brand-gold/30 to-brand-gold/5 backdrop-blur-lg rounded-lg shadow-[0_0_50px_rgba(224,205,127,0.3)] z-10 translate-y-8 -translate-x-2">
            <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 fill-brand-gold drop-shadow-2xl">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Typography overlay */}
          <div className="absolute -bottom-4 md:-bottom-8 font-display text-brand-gold text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase z-20 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            3,000,000
          </div>
        </div>
      );
    case "GLOBAL":
      return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center group">
          <div className="absolute w-full h-full rounded-full border border-brand-gold/20 shadow-[0_0_50px_rgba(224,205,127,0.1)]" />
          <div className="absolute w-[80%] h-full rounded-[100%] border border-brand-gold/40 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          <div className="absolute w-[40%] h-full rounded-[100%] border border-brand-gold/40 -rotate-12 group-hover:-rotate-45 transition-transform duration-1000" />
          <div className="absolute w-full h-[30%] rounded-[100%] border border-brand-gold/30" />
          <div className="absolute w-full h-[70%] rounded-[100%] border border-brand-gold/30" />
          <div className="absolute w-2 h-2 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(224,205,127,1)]" />
        </div>
      );
    default:
      return null;
  }
}
