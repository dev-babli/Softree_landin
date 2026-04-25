import React, { useRef, useState, useEffect } from 'react';
import BorderGlow from './BorderGlow';
import {
  SplitFlapText,
  SplitFlapMuteToggle,
  SplitFlapAudioProvider,
} from "@/components/landing/split-flap-text";
import {
  SiGithub,
  SiVercel,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiOpenai,
  SiPython,
  SiDatabricks,
  SiTableau
} from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { HeroEnterpriseCards } from './HeroEnterpriseCards';

/**
 * TrueHulyHero - Section 1: Cinematic Entry
 * - Focused on Massive Typography & Central Energy Spine
 * - Interactive 'Background Unveil' masking effect (High-Fidelity Tracking)
 */

export default function TrueHulyHero() {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const setMaskVars = (el, x, y) => {
        if (!el) return;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
      };

      setMaskVars(revealRef.current, x, y);

      // Update fog clear mask
      const fog = containerRef.current.querySelector('.atm-fog');
      if (fog) {
        fog.style.setProperty('--mx', `${x}px`);
        fog.style.setProperty('--my', `${y}px`); // No offset for full-screen fog
      }
    };

    const handleLeave = () => {
      const reset = (el) => {
        if (!el) return;
        el.style.setProperty('--mx', `-9999px`);
        el.style.setProperty('--my', `-9999px`);
      };
      reset(revealRef.current);
      reset(containerRef.current.querySelector('.atm-fog'));
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const logos = [
    { icon: <SiVercel size={28} />, name: 'Vercel' },
    { icon: <SiNextdotjs size={28} />, name: 'Next.js' },
    { icon: <SiJavascript size={28} />, name: 'JS' },
    { icon: <SiTailwindcss size={28} />, name: 'Tailwind' },
    { icon: <FaMicrosoft size={28} />, name: 'SharePoint' },
    { icon: <FaMicrosoft size={28} />, name: 'Power BI' },
    { icon: <FaMicrosoft size={28} />, name: 'Power Apps' },
    { icon: <SiOpenai size={28} />, name: 'AI/OpenAI' },
    { icon: <SiPython size={28} />, name: 'Python' },
    { icon: <SiDatabricks size={28} />, name: 'Data' },
    { icon: <SiTableau size={28} />, name: 'Tableau' },
    { icon: <SiGithub size={28} />, name: 'GitHub' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[240vh] xl:h-[220vh] bg-[#000000] overflow-hidden flex flex-col items-start justify-start"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

        .glass-letter {
          color: rgba(255, 255, 255, 0.15);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.4) 100%);
          -webkit-background-clip: text;
        }

        .reveal-layer {
          position: absolute;
          width: 100%;
          height: 200%;
          top: -50%;
          left: 0;
          z-index: 25;
          pointer-events: none;
          --mx: -9999px;
          --my: -9999px;
          mask-image: radial-gradient(circle 300px at var(--mx) var(--my), black 0%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle 300px at var(--mx) var(--my), black 0%, transparent 100%);
        }

        .atm-fog {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          --mx: -9999px;
          --my: -9999px;
          /* The fog is opaque EVERYWHERE except where the mouse is */
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

        .mist-overlay {
          display: none; /* Removed the birds/mist texture */
        }

        .glow-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: white;
          color: black;
          border-radius: 9999px;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .glow-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(255,255,255,0.2);
        }
      `}</style>



      {/* Volumetric Atmospherics (Clearing Layer) */}
      <div className="atm-fog">
        <div className="fog-bank-1" />
        <div className="fog-bank-2" />
        <div className="mist-overlay" />
      </div>

      <div className="absolute inset-x-0 top-0 h-[240vh] xl:h-[220vh] z-0 mix-blend-lighten pointer-events-none overflow-hidden before:absolute before:top-0 before:z-10 before:h-40 before:w-full before:bg-gradient-to-b before:from-black before:to-transparent">
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

      {/* Precise Monolith Container - Restored to previous Narrower Width */}
      <div className="absolute inset-x-0 top-0 h-[240vh] xl:h-[220vh] pointer-events-none overflow-visible z-[60]">
        <div className="absolute top-[42%] xl:top-[46%] left-1/2 -translate-x-1/2 w-[90%] z-[60] pointer-events-auto flex flex-col items-center min-h-[800px]">
          {/* High-density dark glass layer to block the background details while looking premium */}
          <div className="absolute inset-0 bg-[#000000]/95 backdrop-blur-[100px] z-[-1] rounded-[24px] border border-white/5" />

          <div className="w-full h-full pt-10 pb-16 flex items-center justify-center">
            <HeroEnterpriseCards />
          </div>
        </div>
      </div>

      <div ref={revealRef} className="reveal-layer overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-0 border-t border-l border-white/5">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="aspect-square border-r border-b border-white/5 flex items-center justify-center grayscale opacity-60">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                {logos[i % logos.length].icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-50 h-[100vh] w-full flex flex-col justify-center px-12 md:px-24">
        <style>{`
          .hyper-glass-pill {
            background: linear-gradient(135deg, rgba(255, 87, 34, 0.35) 0%, rgba(255, 255, 255, 0.05) 100%);
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-top-color: rgba(255, 87, 34, 0.5);
            border-left-color: rgba(255, 255, 255, 0.3);
            box-shadow: 
              0 14px 40px 0 rgba(0, 0, 0, 0.5),
              inset 0 1px 4px 0 rgba(255, 255, 255, 0.4),
              inset 0 -1px 3px 0 rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            border-radius: 9999px;
          }
          .hyper-glass-pill::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255, 87, 34, 0.7) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
            mix-blend-mode: color-dodge;
            pointer-events: none;
          }
          .hyper-glass-pill::after {
            content: "";
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%);
            transform: skewX(-20deg);
            animation: hyper-glare 5s infinite ease-in-out;
            pointer-events: none;
          }
          @keyframes hyper-glare {
            0% { left: -100%; }
            15% { left: 200%; }
            100% { left: 200%; }
          }
          
          .secondary-glass-pill {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            box-shadow: 
              inset 0px 1px 2px rgba(255, 255, 255, 0.4), 
              inset 0px -1px 3px rgba(0, 0, 0, 0.3),
              0 8px 32px rgba(0,0,0,0.3);
            position: relative;
            overflow: hidden;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
          .secondary-glass-pill::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(132, 152, 230, 0.5) 0%, transparent 50%, rgba(56, 189, 248, 0.3) 100%);
            mix-blend-mode: color-dodge;
            pointer-events: none;
          }
          .secondary-glass-pill::after {
            content: "";
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
            transform: skewX(-20deg);
            animation: hyper-glare 6s infinite ease-in-out;
            animation-delay: 1.5s;
            pointer-events: none;
          }
        `}</style>
        <div className="max-w-3xl transform-gpu huly-reveal-content">
          <SplitFlapAudioProvider>
            <div className="relative mb-6 -ml-1 origin-left">
              <SplitFlapText text="SOFTREE" speed={70} tileTheme="dark" fontSize="clamp(4rem, 8vw, 7.5rem)" />
            </div>
          </SplitFlapAudioProvider>

          <h2 className="text-2xl md:text-4xl font-mono tracking-wide text-white/90">
            Where Vision Meets Execution
          </h2>

          <p className="mt-6 text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
            From Agentic AI to enterprise web apps — Softree turns your boldest ideas into production-grade software, faster.
          </p>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:gap-4 relative z-10">
            <BorderGlow
              edgeSensitivity={80}
              glowColor="228 65% 63%"
              backgroundColor="rgba(255,255,255,0.03)"
              borderRadius={50}
              glowRadius={80}
              glowIntensity={3}
              coneSpread={45}
              animated={false}
              colors={['#8498e6', '#c299ff', '#38bdf8']}
              className="transition-all duration-300 ease-out hover:scale-105 active:scale-95 rounded-full"
            >
              <a href="/contact" className="hyper-glass-pill flex items-center justify-center h-14 px-8 text-base font-semibold text-white group">
                Start a project
                <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </BorderGlow>
            <BorderGlow
              edgeSensitivity={80}
              glowColor="200 80% 80%"
              backgroundColor="transparent"
              borderRadius={50}
              glowRadius={80}
              glowIntensity={3}
              coneSpread={45}
              animated={false}
              colors={['#ffffff', '#8498e6', '#38bdf8']}
              className="transition-all duration-300 ease-out hover:scale-105 active:scale-95 rounded-full"
            >
              <a href="/services" className="secondary-glass-pill flex items-center justify-center h-14 px-8 text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                Our services
              </a>
            </BorderGlow>
          </div>
        </div>
      </div>



      {/* Background Foundation (Keep at bottom) */}
      <div className="absolute inset-0 bg-black z-[-1]" />
    </section>
  );
}
