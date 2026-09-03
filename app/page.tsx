import Hero from "@/components/sections/Hero";
import TrustSection from "@/components/sections/TrustSection";
import FinalCTA from "@/components/sections/FinalCTA";
import CinematicMarquee from "@/components/ui/CinematicMarquee";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VMONE - Technology Without the Noise',
};

export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. DARK */}
      <Hero />
      
      {/* (Marquee matches previous section: DARK) */}
      <CinematicMarquee 
        items={["REAL PRODUCTS", "REAL TESTING", "REAL OPINIONS"]} 
        direction="left" 
        speed={35}
      />

      {/* 2. GOLDEN */}
      <div data-theme="golden">
        <TrustSection />

        {/* (Marquee matches previous section: GOLDEN) */}
        <CinematicMarquee 
          items={["TECHNOLOGY WITHOUT THE NOISE", "CONSUMER FIRST"]} 
          direction="left" 
          speed={30}
          className="border-b-0"
        />
      </div>

      {/* 3. DARK */}
      <FinalCTA />
    </main>
  );
}
