import AboutVineet from "@/components/sections/AboutVineet";
import WhyVmone from "@/components/sections/WhyVmone";
import Journey from "@/components/sections/Journey";
import CinematicMarquee from "@/components/ui/CinematicMarquee";

export const metadata = {
  title: 'About Vineet Malhotra - VMONE',
  description: 'Learn about Vineet Malhotra, founder of VMONE, and the consumer-first approach behind practical technology and home appliance reviews.',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* 1. GOLDEN */}
      <div data-theme="golden">
        <div className="">
          <AboutVineet />
        </div>
        
        {/* (Marquee matches previous section: GOLDEN) */}
        <CinematicMarquee 
          items={["CONSUMER FIRST", "UNBIASED REVIEWS", "PRACTICAL ADVICE"]} 
          direction="left" 
          speed={30}
        />
      </div>
      
      {/* 2. DARK */}
      <Journey />

      {/* 3. GOLDEN */}
      <div data-theme="golden">
        <div className="">
          <WhyVmone />
        </div>
      </div>
    </main>
  );
}
