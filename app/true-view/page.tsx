import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TRUE-VIEW | VMONE',
  description: 'VMONE doesn\'t just tell you what a product does. We test it, compare it, question it - and tell you what actually matters before you buy.',
};

export default function TrueViewPage() {
  const stages = [
    { id: '01', title: 'BUY IT', desc: 'VMONE reviews products independently and focuses on real products available to consumers.' },
    { id: '02', title: 'TEST IT', desc: 'Products are evaluated through practical, real-world usage rather than relying only on specifications.' },
    { id: '03', title: 'COMPARE IT', desc: 'Products are compared against alternatives to understand meaningful differences in performance, features and value.' },
    { id: '04', title: 'FIND THE TRUTH', desc: 'Highlight the important details, limitations, compromises and the "Uncomfortable Truth" that may not be obvious from promotional material.' },
    { id: '05', title: 'GIVE YOU THE ANSWER', desc: 'Turn research and testing into practical, understandable buying advice.' },
  ];

  const principles = [
    'REAL-WORLD TESTING',
    'INDEPENDENT RESEARCH',
    'HONEST PROS AND CONS',
    'PRACTICAL PERFORMANCE',
    'CLEAR EXPLANATIONS',
    'CONSUMER-FIRST RECOMMENDATIONS',
    'TRANSPARENCY'
  ];

  return (
    <main className="flex-1 text-pure-white">
      
      {/* 1. DARK */}
      <section className="bg-primary-dark pt-20 pb-12 md:pt-32 md:pb-24 transition-colors duration-500">
        <div className="container-editorial">
          {/* Intro */}
          <div className="mb-12 md:mb-20">
            <div className="w-full max-w-[120px] h-px bg-brand-gold/40 mb-6" />
            <div className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-light uppercase">
              TRUE-VIEW
            </div>
          </div>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
              <h1 className="font-display font-bold uppercase leading-[0.95] tracking-tight md:tracking-tighter text-[clamp(4rem,9vw,10rem)] text-brand-gold transition-colors duration-500">
                THE UNCOMFORTABLE <span className="font-serif italic font-normal normal-case tracking-normal">Truth.</span>
              </h1>
            </div>
            
            <div className="lg:col-span-4 lg:col-start-9 flex items-end pb-2 md:pb-4">
              <p className="text-base md:text-lg lg:text-xl font-body font-light text-muted-light leading-relaxed border-l border-pure-white/20 pl-6 transition-colors duration-500">
                VMONE doesn't just tell you what a product does. We test it, compare it, question it - and tell you what actually matters before you buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GOLDEN */}
      <section data-theme="golden" className="bg-primary-dark transition-colors duration-500">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex flex-col gap-16 md:gap-24 max-w-5xl mx-auto md:ml-[10%]">
            <div className="text-sm font-medium tracking-[0.2em] text-muted-light uppercase mb-8 md:mb-16 transition-colors duration-500">
              THE PROCESS
            </div>
            
            {stages.map((stage) => (
              <div key={stage.id} className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24 items-start md:items-center">
                <div className="font-serif italic font-normal text-6xl md:text-8xl lg:text-[10rem] tracking-tighter text-pure-white/10 leading-none shrink-0 transition-colors duration-500">
                  {stage.id}
                </div>
                <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-0">
                  <h3 className="font-display font-bold uppercase tracking-tight text-[clamp(2rem,4vw,4.5rem)] text-brand-gold leading-none transition-colors duration-500">
                    {stage.title}
                  </h3>
                  <p className="font-body font-light text-muted-light text-lg md:text-2xl leading-relaxed max-w-xl transition-colors duration-500">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DARK */}
      <section className="bg-primary-dark transition-colors duration-500">
        <div className="container-editorial pt-16 pb-20 md:pb-32">
          <div className="text-sm font-medium tracking-[0.2em] text-muted-light uppercase mb-16 md:mb-24 text-center">
            TRUE-VIEW PRINCIPLES
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {principles.map((principle, idx) => (
              <div key={idx} className="flex flex-col items-center text-center border-t border-pure-white/10 pt-6 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] transition-colors duration-500">
                <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-muted-light mb-3 md:mb-4 transition-colors duration-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-bold text-lg md:text-2xl tracking-tight text-brand-gold uppercase transition-colors duration-500">
                  {principle}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-20 mt-20 md:mt-32 border-t border-pure-white/10 transition-colors duration-500">
            <Link 
              href="/reviews"
              className="group relative overflow-hidden flex items-center justify-center px-12 py-5 border border-brand-gold bg-primary-dark text-brand-gold font-medium tracking-[0.15em] uppercase hover:border-brand-gold transition-colors duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark w-full md:w-auto text-sm md:text-base rounded-sm"
            >
              <div className="absolute inset-0 bg-brand-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary-dark">SEE THE REVIEWS</span>
            </Link>
            <Link 
              href="/expertise"
              className="group relative overflow-hidden flex items-center justify-center px-12 py-5 border border-pure-white/20 bg-primary-dark text-pure-white font-medium tracking-[0.15em] uppercase transition-colors duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark w-full md:w-auto text-sm md:text-base rounded-sm"
            >
              <div className="absolute inset-0 bg-pure-white origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary-dark">OUR EXPERTISE</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
