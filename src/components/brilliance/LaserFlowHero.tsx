"use client"

import React, { useRef, useState, useEffect } from 'react';
import LaserFlow from "@/components/ui/LaserFlow";
import { cn } from "@/lib/utils";

/**
 * LaserFlowHero - A high-fidelity hero section with a cinematic mouse reveal effect.
 * Based on the LaserFlowDemo from ReactBits.
 */

const REVEAL_IMAGES = [
  "https://cdn.dribbble.com/userupload/15325964/file/original-25ae735b5d9255a4a31d3471fd1c346a.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/14104278/file/original-4d4b1a4a4b4a4b4a4b4a4b4a4b4a4b4a.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/13904278/file/original-3d3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/12804278/file/original-2d2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a.png?resize=1024x768&vertical=center"
];

export default function LaserFlowHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !revealLayerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      revealLayerRef.current.style.setProperty('--mx', `${x}px`);
      revealLayerRef.current.style.setProperty('--my', `${y}px`);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#F7F5F3] flex flex-col items-center justify-center cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (revealLayerRef.current) {
          revealLayerRef.current.style.setProperty('--mx', '-9999px');
          revealLayerRef.current.style.setProperty('--my', '-9999px');
        }
      }}
    >
      {/* 1. Underlying Animation (LaserFlow) */}
      <div className="absolute inset-0 z-0">
        <LaserFlow 
          color="#CF9EFF"
          horizontalSizing={0.8}
          verticalSizing={2.0}
          wispDensity={1.5}
          wispSpeed={12.0}
          wispIntensity={6.0}
          flowSpeed={0.4}
          flowStrength={0.3}
          fogIntensity={0.5}
          fogScale={0.35}
          fogFallSpeed={0.7}
        />
      </div>

      {/* 2. Hidden Content Layer (Revealed by Mask) */}
      <div 
        ref={revealLayerRef}
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          '--mx': '-9999px',
          '--my': '-9999px',
          WebkitMaskImage: `radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 100px, rgba(255,255,255,0.6) 200px, rgba(255,255,255,0.3) 300px, transparent 400px)`,
          maskImage: `radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 100px, rgba(255,255,255,0.6) 200px, rgba(255,255,255,0.3) 300px, transparent 400px)`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        } as React.CSSProperties}
      >
        <div className="w-full h-full p-20 grid grid-cols-2 gap-8 opacity-90 scale-100 transition-transform duration-700 ease-out">
          {REVEAL_IMAGES.map((src, i) => (
            <div 
              key={i} 
              className="relative rounded-2xl overflow-hidden border-2 border-[#CF9EFF]/30 shadow-2xl bg-white/5 backdrop-blur-sm"
              style={{
                margin: '10px',
                transform: `scale(1.02) translateY(${i % 2 === 0 ? '-10px' : '10px'})`
              }}
            >
              <img 
                src={src} 
                alt="Project Reveal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D]/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Hero Copy (Always Visible) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-black/10 backdrop-blur-md text-[13px] font-medium tracking-tight text-[#37322F]">
          <span className="w-2 h-2 rounded-full bg-[#CF9EFF] animate-pulse" />
          The New Standard of Excellence
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#37322F] mb-6 leading-[1.1]">
          Effortless custom<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF9EFF] to-[#91a0ff]">
            contract billing
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#37322F]/60 max-w-2xl mb-10 font-medium">
          Automate your high-ticket service operations with precision.<br />
          Designed for elite creative agencies and consultancy firms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="px-8 py-4 rounded-full bg-[#37322F] text-white font-semibold text-base shadow-xl hover:scale-105 active:scale-95 transition-all">
            Get Started Free
          </button>
          <button className="px-8 py-4 rounded-full bg-white border border-black/10 text-[#37322F] font-semibold text-base hover:bg-black/5 transition-all">
            Watch Showcase
          </button>
        </div>
      </div>

      {/* Custom Cursor Circle */}
      <div 
        className={cn(
          "fixed w-10 h-10 border-2 border-[#CF9EFF] rounded-full pointer-events-none z-[100] transition-transform duration-200 ease-out",
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        style={{
          left: 'var(--mx)',
          top: 'var(--my)',
          transform: 'translate(-50%, -50%)'
        } as React.CSSProperties}
      />
    </section>
  );
}
