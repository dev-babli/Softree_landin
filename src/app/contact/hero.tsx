"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  SplitFlapText,
  SplitFlapAudioProvider,
} from "@/components/landing/split-flap-text";
import { motion } from 'framer-motion';

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const setMaskVars = (el: HTMLElement | null, x: number, y: number) => {
        if (!el) return;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
      };

      setMaskVars(revealRef.current, x, y);

      const fog = containerRef.current.querySelector('.atm-fog') as HTMLElement;
      if (fog) {
        fog.style.setProperty('--mx', `${x}px`);
        fog.style.setProperty('--my', `${y}px`); 
      }
    };

    const handleLeave = () => {
      const reset = (el: HTMLElement | null) => {
        if (!el) return;
        el.style.setProperty('--mx', `-9999px`);
        el.style.setProperty('--my', `-9999px`);
      };
      reset(revealRef.current);
      reset(containerRef.current?.querySelector('.atm-fog') as HTMLElement);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[150vh] md:h-[180vh] bg-[#000000] overflow-hidden flex flex-col items-start justify-start pt-32"
    >
      <style>{`
        .atm-fog {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          --mx: -9999px;
          --my: -9999px;
          mask-image: radial-gradient(circle 400px at var(--mx) var(--my), transparent 0%, black 100%);
          -webkit-mask-image: radial-gradient(circle 400px at var(--mx) var(--my), transparent 0%, black 100%);
          transition: mask-image 0.2s ease-out;
        }

        .fog-bank-1 {
          position: absolute;
          width: 100%;
          height: 100%;
          bottom: -20%;
          left: -10%;
          background: radial-gradient(circle 800px at 20% 100%, rgba(132, 152, 230, 0.35) 0%, transparent 70%);
          animation: billow 20s infinite alternate ease-in-out;
          filter: blur(100px);
        }

        .fog-bank-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: -15%;
          right: -5%;
          background: radial-gradient(circle 900px at 80% 10%, rgba(92, 106, 196, 0.25) 0%, transparent 70%);
          animation: billow 25s infinite alternate-reverse ease-in-out;
          filter: blur(120px);
        }

        @keyframes billow {
          0% { transform: translate(-2%, -2%) scale(1); opacity: 0.5; }
          100% { transform: translate(2%, 2%) scale(1.05); opacity: 0.8; }
        }
      `}</style>

      {/* Volumetric Atmospherics */}
      <div className="atm-fog">
        <div className="fog-bank-1" />
        <div className="fog-bank-2" />
      </div>

      {/* Video Background */}
      <div className="absolute inset-x-0 top-0 h-full z-0 mix-blend-lighten pointer-events-none overflow-hidden before:absolute before:top-0 before:z-10 before:h-40 before:w-full before:bg-gradient-to-b before:from-black before:to-transparent">
        <video
          className="w-full h-full object-cover object-top scale-[1.2] translate-x-[8%] -translate-y-[5%]"
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: 1 }}
        >
          <source src="/Hero/hero.webm" type="video/webm" />
          <source src="/Hero/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-50 w-full flex flex-col justify-center px-6 md:px-24 mt-[10vh] md:mt-[20vh] max-w-[1400px] mx-auto text-center md:text-left">
        <div className="transform-gpu huly-reveal-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.2em] text-blue-400">
              Transform Your Capabilities
            </span>
          </motion.div>

          <SplitFlapAudioProvider>
             <div className="relative mb-6 -ml-1 origin-center md:origin-left scale-[0.6] sm:scale-[0.8] md:scale-100 uppercase overflow-hidden">
               {/* Use text sizing appropriate for split flap */}
               <SplitFlapText text="GLOBAL TECH" speed={70} tileTheme="dark" fontSize="clamp(3rem, 6vw, 6rem)" />
               <div className="mt-2" />
               <SplitFlapText text="PARTNER" speed={70} tileTheme="dark" fontSize="clamp(3rem, 6vw, 6rem)" />
             </div>
          </SplitFlapAudioProvider>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-8 text-lg md:text-2xl text-white/50 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0 font-sans tracking-wide"
          >
            Let's build something extraordinary together. Our team will review your requirements and respond within 24 hours.
          </motion.p>
        </div>
      </div>

      {/* Background Foundation */}
      <div className="absolute inset-0 bg-black z-[-1]" />
    </section>
  );
}
