'use client';

import { ReactNode } from 'react';

// Future FadeUp Animation Component
export function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  // To be implemented with GSAP later
  return <div className="fade-up-placeholder" data-delay={delay}>{children}</div>;
}

// Future TextReveal Animation Component
export function TextReveal({ children }: { children: ReactNode }) {
  // To be implemented with GSAP later
  return <div className="text-reveal-placeholder">{children}</div>;
}

// Future Parallax Animation Component
export function Parallax({ children, speed = 1 }: { children: ReactNode; speed?: number }) {
  // To be implemented with GSAP later
  return <div className="parallax-placeholder" data-speed={speed}>{children}</div>;
}

// Future Stagger Animation Component
export function Stagger({ children }: { children: ReactNode }) {
  // To be implemented with GSAP later
  return <div className="stagger-placeholder">{children}</div>;
}
