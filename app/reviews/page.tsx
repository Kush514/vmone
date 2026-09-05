import YoutubeSection from "@/components/sections/YoutubeSection";
import ReviewIntelligence from "@/components/sections/ReviewIntelligence";
import FeaturedContent from "@/components/sections/FeaturedContent";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VMONE - Technology & Home Appliances',
  description: 'Watch VMONE technology and home appliance reviews, comparisons and practical product testing.',
};

export default function ReviewsPage() {
  return (
    <main className="flex-1">
      {/* 1. DARK */}
      <YoutubeSection />

      {/* 2. GOLDEN */}
      <div data-theme="golden">
        <div className="">
          <ReviewIntelligence />
        </div>
      </div>

      {/* 3. DARK */}
      <FeaturedContent />
    </main>
  );
}
