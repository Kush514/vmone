import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact VMONE | Vineet Malhotra',
  description: 'Connect with Vineet Malhotra and follow VMONE through our official channels for the latest in consumer technology.',
};

export default function ContactPage() {
  const socials = [
    { name: 'YOUTUBE', url: 'https://www.youtube.com/@VMone' },
    { name: 'INSTAGRAM', url: 'https://www.instagram.com/vm__one/' },
    { name: 'X (TWITTER)', url: 'https://x.com/vm__one' },
    { name: 'FACEBOOK', url: 'https://www.facebook.com/vmone1' },
    { name: 'TELEGRAM', url: 'https://t.me/VM_ONE1' },
  ];

  return (
    <main className="flex-1 bg-brand-gold text-primary-dark min-h-screen flex flex-col overflow-hidden">
      <div className="container-editorial pt-20 pb-12 md:pt-32 md:pb-24 flex-1 flex flex-col">
        
        {/* Intro */}
        <div className="mb-12 md:mb-20">
          <div className="w-full max-w-[120px] h-px bg-muted-dark mb-6" />
          <div className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-dark uppercase">
            CONTACT VMONE
          </div>
        </div>

        {/* Hero & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <h1 className="font-display font-bold uppercase leading-[0.9] tracking-tighter text-[clamp(4.5rem,10vw,12rem)] text-primary-dark">
              LET&apos;S CONNECT.
            </h1>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 flex items-end pb-2 md:pb-6">
            <p className="text-base md:text-xl lg:text-2xl font-body font-light text-muted-dark leading-relaxed border-l-2 border-primary-dark pl-6">
              Follow VMONE for the latest reviews or reach out directly to Vineet Malhotra through our official channels.
            </p>
          </div>
        </div>

        {/* Large Email CTA */}
        <div className="flex flex-col items-center justify-center py-16 md:py-24 border-y border-muted-light/50 mb-16 md:mb-24">
          <div className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-dark uppercase mb-8 md:mb-12">
            DIRECT INQUIRIES
          </div>
          <a 
            href="mailto:vineet@vmone.in"
            className="group flex flex-col items-center focus:outline-none"
            aria-label="Email Vineet Malhotra at vineet@vmone.in"
          >
            <span className="font-display font-bold uppercase tracking-tighter text-[clamp(3rem,8vw,9rem)] text-primary-dark group-hover:text-muted-dark transition-colors duration-500 leading-none pb-2 border-b-4 border-transparent group-hover:border-primary-dark">
              VINEET@VMONE.IN
            </span>
            <div className="mt-8 flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-muted-dark uppercase group-hover:text-primary-dark transition-colors duration-500">
              SEND AN EMAIL <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </div>
          </a>
        </div>

        {/* Social Links Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 max-w-6xl mx-auto w-full mb-16">
          <div className="flex flex-col">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight uppercase text-primary-dark mb-6">
              OFFICIAL CHANNELS
            </h2>
            <p className="font-body font-light text-muted-dark text-lg max-w-sm">
              Stay updated with the latest consumer technology reviews, buying guides, and behind-the-scenes testing on our social platforms.
            </p>
          </div>

          <div className="flex flex-col border-t border-muted-light/50">
            {socials.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 md:py-8 border-b border-muted-light/50 hover:bg-pure-white/50 px-4 -mx-4 transition-colors duration-300 focus:outline-none focus-visible:bg-pure-white/50"
              >
                <span className="font-display font-bold text-xl md:text-2xl tracking-widest text-primary-dark uppercase transition-colors duration-300">
                  {social.name}
                </span>
                <ArrowUpRight className="w-6 h-6 text-muted-dark group-hover:text-primary-dark group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
