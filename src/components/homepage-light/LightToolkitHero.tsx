'use client';
import { FC } from 'react';
import StaggeredReveal from './StaggeredReveal';
import RadialCardCarousel from './RadialCardCarousel';
import { motion } from 'framer-motion';

export const LightToolkitHero: FC = () => {
  return (
    <section className="relative w-full bg-[#f6f6f6] text-black overflow-hidden pt-32 pb-32 font-sans flex flex-col items-center">
      
      {/* Top Inline Header */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full px-4 mb-4 z-10">
        <StaggeredReveal 
          text="AI Scale" 
          className="text-[60px] sm:text-[90px] md:text-[110px] lg:text-[130px] font-medium tracking-[-0.04em] text-[#111111] leading-none"
        />
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="text-[#6C42F5] flex-shrink-0 mt-2 sm:mt-4"
        >
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none" className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px]">
            <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" fill="currentColor"/>
          </svg>
        </motion.div>
        <StaggeredReveal 
          text="Built to Last" 
          className="text-[60px] sm:text-[90px] md:text-[110px] lg:text-[130px] font-medium tracking-[-0.04em] text-[#111111] leading-none"
        />
      </div>

      {/* Description Paragraph with Pills */}
      <div className="max-w-3xl mx-auto text-center px-4 z-10 mb-8 relative">
        <p className="text-[17px] sm:text-[19px] font-normal text-[#111111] leading-[2.2] tracking-tight">
          Platform packed with{' '}
          <span className="inline-flex items-center justify-center px-3 py-0.5 bg-[#eaeaea] text-[#111111] rounded-md mx-1 transform -translate-y-[2px]">
            <span className="font-medium tracking-tight text-[15px]">AI Agents</span>
          </span>
          {' '}&{' '}
          <span className="inline-flex items-center justify-center px-3 py-0.5 bg-[#eaeaea] text-[#111111] rounded-md mx-1 transform -translate-y-[2px]">
            <span className="font-medium tracking-tight text-[15px]">Next.js</span>
          </span>
          {' '}resources,<br className="hidden sm:block" />
          <span className="inline-flex items-center justify-center px-3 py-0.5 bg-[#eaeaea] text-[#111111] rounded-md mx-1 transform -translate-y-[2px]">
            <span className="font-medium tracking-tight text-[15px]">enterprise</span>
          </span>
          {' '}components,{' '}
          <span className="inline-flex items-center justify-center px-3 py-0.5 bg-[#eaeaea] text-[#111111] rounded-md mx-1 transform -translate-y-[2px]">
            <span className="font-medium tracking-tight text-[15px]">high-end</span>
          </span>
          {' '}visual design and{' '}
          <span className="inline-flex items-center justify-center px-3 py-0.5 bg-[#eaeaea] text-[#111111] rounded-md mx-1 transform -translate-y-[2px]">
            <span className="font-medium tracking-tight text-[15px]">UX</span>
          </span>
        </p>
      </div>

      {/* The Carousel Arch */}
      <RadialCardCarousel />

      {/* The Reel Section (Below the Arch) */}
      <div className="flex flex-col items-center mt-24 px-4 max-w-[800px] z-10">
        <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-medium text-center text-[#111111] leading-[1.3] tracking-tight mb-20">
          Osmo is an ever-growing platform with Webflow & HTML resources. Get exclusive access to the elements, techniques and code behind award-winning work.
        </h2>

        <div className="flex items-center justify-center gap-8 relative w-full">
          <span className="text-[#d1d1d1] font-medium text-5xl sm:text-7xl tracking-[-0.04em]">Play</span>
          
          <div className="w-[280px] h-[140px] bg-black rounded-lg flex flex-col justify-end p-4 relative cursor-pointer hover:scale-105 transition-transform duration-500 shadow-2xl overflow-hidden group">
             <video 
               src="https://cdn.prod.website-files.com/6708f85ff3d3cba6aff436fb%2F670e5ef201603b3a7dda3aa9_Osmo-V12-Reel-Tiny_compressed-transcode.mp4" 
               autoPlay loop muted playsInline 
               className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
             />
             <div className="relative z-10 flex items-center justify-between w-full">
               <span className="text-white text-[13px] font-medium tracking-wide">Osmo in use</span>
               <span className="text-white text-[13px] font-medium tracking-wide">00:48</span>
             </div>

             {/* Red Scribble Arrow */}
             <div className="absolute -right-[140px] -bottom-[40px] flex items-start gap-2">
                <svg width="40" height="40" viewBox="0 0 31 32" fill="none" className="text-red-500 rotate-[-15deg]">
                  <path d="M0 0.8L1.2 0.6L1.6 0C1.4 1.9 4.5 2.8 5.2 4.7C5.4 5.2 4.7 5.3 4.5 5.2C4.5 5.1 4.3 4.4 3.9 4C3.5 3.7 2 1.9 1.6 2.2C2.1 7.3 3.3 11.9 5.9 16.3C11.2 25.3 20.7 30.3 30.9 31.1C15.8 31.7 2.7 19 1.2 4.2C0.4 4.5 1.3 7.3 0 7.1L0 0.8Z" fill="currentColor"></path>
                </svg>
                <span className="text-red-500 font-caveat text-[20px] italic rotate-[-15deg] mt-6">See what it can do!</span>
             </div>
          </div>

          <span className="text-[#d1d1d1] font-medium text-5xl sm:text-7xl tracking-[-0.04em]">Reel</span>
        </div>

        <div className="mt-32 flex items-center justify-center gap-4">
           <div className="flex -space-x-3">
             <div className="w-8 h-8 rounded-full bg-neutral-800 border-[3px] border-[#f6f6f6] shadow-sm relative z-40" />
             <div className="w-8 h-8 rounded-full bg-neutral-600 border-[3px] border-[#f6f6f6] shadow-sm relative z-30" />
             <div className="w-8 h-8 rounded-full bg-neutral-400 border-[3px] border-[#f6f6f6] shadow-sm relative z-20" />
             <div className="w-8 h-8 rounded-full bg-neutral-300 border-[3px] border-[#f6f6f6] shadow-sm relative z-10" />
           </div>
           <span className="text-[12px] font-bold text-[#111111] uppercase tracking-widest">Join 2K+ others</span>
        </div>
      </div>

    </section>
  );
};

export default LightToolkitHero;
