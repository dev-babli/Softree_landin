import React from "react";
import Image from "next/image";

export default function InfoSection() {
  return (
    <section className="relative w-full bg-[#f6f6f6] pt-40 md:pt-48 pb-24 md:pb-32 overflow-hidden z-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Column (Graphic & Scribble) */}
        <div className="w-full md:w-[35%] lg:w-[25%] shrink-0">
          <div className="mb-12">
            <Image 
              src="https://osmo.b-cdn.net/website/bandwidth/osmo-micrographic-2.avif" 
              alt="Softree graphic" 
              width={160}
              height={160}
              className="w-32 md:w-40 h-auto"
            />
          </div>

          <div className="relative">
            <span className="font-caveat text-[#ff4b4b] text-4xl block transform -rotate-6">
              Why Softree?
            </span>
            <svg 
              className="absolute top-8 left-8 text-[#ff4b4b] w-10 h-10" 
              viewBox="0 0 32 32" 
              fill="none" 
            >
              <path d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921 27.0609 26.6775 27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 19.1711 28.2358 14.7619 25.6477C5.77699 20.3802 0.852119 10.8502 0.0231477 0.612125C-0.616531 15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>

        {/* Right Column (Content) */}
        <div className="w-full md:w-[65%] lg:w-[75%] flex flex-col">
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] text-[#111] mb-16 max-w-[900px]">
            Scale your vision and partner with engineering experts who love building high-performance systems.
          </h2>
          
          <div className="flex flex-col w-full">
            {/* Row 1 */}
            <div className="flex flex-col lg:flex-row border-t border-[#111]/10 py-10 gap-4 lg:gap-16">
              <div className="w-full lg:w-[40%]">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#111]">
                  Accelerate Time to Market
                </h3>
              </div>
              <div className="w-full lg:w-[60%]">
                <p className="text-[17px] text-[#111]/80 leading-relaxed max-w-[500px]">
                  Our modular architectures and AI workflows save months of development time. We build enterprise-ready foundations so you can focus on scaling your core business.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col lg:flex-row border-t border-[#111]/10 py-10 gap-4 lg:gap-16">
              <div className="w-full lg:w-[40%]">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#111]">
                  Uncompromising Quality
                </h3>
              </div>
              <div className="w-full lg:w-[60%]">
                <p className="text-[17px] text-[#111]/80 leading-relaxed max-w-[500px]">
                  We don't do MVPs. Every system we build is engineered to be secure, infinitely scalable, and production-ready from day one, without trading quality for speed.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col lg:flex-row border-t border-[#111]/10 py-10 gap-4 lg:gap-16">
              <div className="w-full lg:w-[40%]">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#111]">
                  A Future-Proof Ecosystem
                </h3>
              </div>
              <div className="w-full lg:w-[60%]">
                <p className="text-[17px] text-[#111]/80 leading-relaxed max-w-[500px]">
                  We integrate the latest advancements in AI and cloud infrastructure daily. Your tech stack evolves dynamically with the industry, ensuring you never fall behind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative mt-24 w-full">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#111]/10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f6f6f6] px-4">
          <div className="px-3 py-1 bg-black/5 rounded-md text-[10px] font-bold tracking-widest text-[#111]/50 uppercase mix-blend-overlay">
            Trusted by global enterprises
          </div>
        </div>
        
        <div className="pt-24 pb-16 flex overflow-x-hidden w-full max-w-[1600px] mx-auto">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 opacity-80 mix-blend-multiply">
            <span className="text-3xl font-bold tracking-tighter text-[#111]">fintech</span>
            <span className="text-4xl font-serif tracking-tight text-[#111]">startups</span>
            <span className="text-3xl font-bold tracking-tight text-[#111] flex items-center gap-2">
              <span className="text-xl">✦</span> Enterprises
            </span>
            <span className="text-2xl font-bold leading-none tracking-tight text-[#111]">AI<br/>PLATFORMS<br/>/DEPT.</span>
            <span className="text-4xl font-black tracking-tighter text-[#111]">SAAS</span>
            
            <span className="text-3xl font-bold tracking-tighter text-[#111]">fintech</span>
            <span className="text-4xl font-serif tracking-tight text-[#111]">startups</span>
            <span className="text-3xl font-bold tracking-tight text-[#111] flex items-center gap-2">
              <span className="text-xl">✦</span> Enterprises
            </span>
            <span className="text-2xl font-bold leading-none tracking-tight text-[#111]">AI<br/>PLATFORMS<br/>/DEPT.</span>
            <span className="text-4xl font-black tracking-tighter text-[#111]">SAAS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
