import Expertise from "@/components/sections/Expertise";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VMONE Expertise - TVs, ACs, Appliances & Smart Home',
  description: 'Explore the technology and home appliance categories covered by VMONE through practical testing, comparisons and consumer-focused guidance.',
};

export default function ExpertisePage() {
  return (
    <main className="flex-1">
      {/* 1. GOLDEN */}
      <div data-theme="golden">
        <div className="">
          <Expertise />
        </div>
      </div>
    </main>
  );
}
