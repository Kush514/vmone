import React from 'react';
import { ArrowRight, Play as Youtube } from 'lucide-react';

interface SubscribeButtonProps {
  variant?: 'solid' | 'outline' | 'minimal' | 'cinematic';
  className?: string;
}

export default function SubscribeButton({ variant = 'solid', className = '' }: SubscribeButtonProps) {
  const url = "https://www.youtube.com/@VMone?sub_confirmation=1";

  switch (variant) {
    case 'solid':
      return (
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-primary-dark font-display font-bold uppercase tracking-widest hover:bg-pure-white transition-all duration-300 rounded-sm shadow-lg ${className}`}
        >
          <Youtube className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span>SUBSCRIBE ON YOUTUBE</span>
        </a>
      );

    case 'outline':
      return (
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center gap-3 px-8 py-4 border border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-primary-dark transition-all duration-500 rounded-sm ${className}`}
        >
          <span className="font-display font-bold uppercase tracking-widest relative z-10">
            SUBSCRIBE NOW
          </span>
          <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
        </a>
      );

    case 'minimal':
      return (
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-pure-white transition-colors duration-300 pb-1 border-b-2 border-brand-gold/30 hover:border-brand-gold ${className}`}
        >
          SUBSCRIBE
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </a>
      );

    case 'cinematic':
      return (
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative overflow-hidden flex items-center justify-center px-10 py-5 border border-brand-gold/50 bg-primary-dark text-brand-gold hover:border-brand-gold transition-colors duration-500 rounded-sm ${className}`}
        >
          <div className="absolute inset-0 bg-brand-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
          <span className="font-display font-bold text-lg uppercase tracking-widest relative z-10 flex items-center gap-4 transition-colors duration-500 group-hover:text-primary-dark">
            WATCH & SUBSCRIBE
            <Youtube className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
          </span>
        </a>
      );
  }
}