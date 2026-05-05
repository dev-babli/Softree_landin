"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BASE_CARDS = [
  {
    id: "community",
    title: "AI Agents",
    description: "Deploy sophisticated multi-agent architectures that automate your most complex workflows.",
    tag: "CORE CAPABILITY",
    bgColor: "#6b38fb",
    textColor: "#ffffff",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif"
  },
  {
    id: "vault",
    title: "Enterprise Dashboards",
    description: "High-performance data visualization and analytics tools built for scale.",
    tag: "CORE CAPABILITY",
    bgColor: "#111111",
    textColor: "#ffffff",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif"
  },
  {
    id: "page-transition",
    title: "High-End UX/UI",
    description: "Cinematic, pixel-perfect visual design that separates you from the competition.",
    tag: "CORE CAPABILITY",
    bgColor: "#9dfa5f",
    textColor: "#111111",
    image: "https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif"
  }
];

const TOTAL_CARDS = 24;
const DEG_PER_CARD = 360 / TOTAL_CARDS;

const CARDS = Array.from({ length: TOTAL_CARDS }).map((_, i) => {
  const baseCard = BASE_CARDS[i % BASE_CARDS.length];
  return {
    ...baseCard,
    uniqueId: `${baseCard.id}-${i}`,
    angle: i * DEG_PER_CARD,
  };
});

const PILLS = [
  "AI Agents", "Enterprise Dashboards", "Next.js Architecture", "High-End UX/UI", "Global Infrastructure", "Team Collaboration"
];

export default function ProductArcSlider() {
  const radius = 2000; 
  const diameter = radius * 2;
  const cardWidth = 420;
  const cardHeight = 620;

  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { damping: 50, stiffness: 200 });

  const handlePan = (e: any, info: any) => {
    // Unbounded rotation for infinite looping
    const newRot = rotationMV.get() + info.delta.x * 0.05;
    rotationMV.set(newRot);
  };

  return (
    <section 
      className="relative w-full bg-[#f6f6f6] pt-24 md:pt-32 pb-0 overflow-visible touch-none z-30"
      style={{ height: "1250px" }}
    >
      <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-[1600px] pointer-events-none opacity-30 z-0">
        <img 
          src="https://osmo.b-cdn.net/website/svg/product-slider-circle-deco.svg" 
          alt="" 
          className="w-full h-auto"
        />
      </div>

      <div className="relative z-30 mx-auto max-w-[1400px] px-6 md:px-12 text-center pointer-events-none flex flex-col items-center">
        <h2 className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-medium tracking-tight leading-[0.95] text-[#111] mb-8 max-w-[1200px]">
          A growing ecosystem for<br/>enterprise scale
        </h2>
        <p className="text-xl md:text-[22px] font-medium tracking-tight text-[#111] mb-12">
          Accelerate development with our core services:
        </p>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full px-4 mb-8 pointer-events-auto hide-scrollbar">
          {PILLS.map((pill, idx) => (
            <button 
              key={pill} 
              className={`whitespace-nowrap px-6 py-3 rounded-md text-[15px] font-medium transition-colors ${
                idx === 0 
                  ? "bg-[#111] text-white" 
                  : "bg-[#eaeaea] text-[#111] hover:bg-[#d4d4d4]"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        onPan={handlePan}
        className="absolute inset-0 top-[400px] z-20 cursor-grab active:cursor-grabbing"
        style={{ overflow: 'visible' }} 
      >
        <motion.div
          style={{ 
            width: diameter, 
            height: diameter, 
            rotate: smoothRotation,
            position: "absolute",
            left: "50%",
            top: "550px", 
            x: "-50%",
          }}
          className="pointer-events-none"
        >
          {CARDS.map((card) => (
            <div
              key={card.uniqueId}
              className="absolute top-0 left-0 w-full h-full"
              style={{ transform: `rotate(${card.angle}deg)` }}
            >
              <div
                className="absolute flex flex-col items-center text-center transition-transform hover:scale-[1.01] pointer-events-auto"
                style={{
                  top: `-${cardHeight / 2}px`, 
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  borderRadius: "32px",
                  padding: "40px",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)"
                }}
              >
                <div 
                  className="text-[11px] font-bold tracking-widest uppercase mb-10 px-3 py-1 rounded-md border border-current/20 mix-blend-overlay"
                >
                  {card.tag}
                </div>
                
                <div className="mb-4 text-4xl">✳</div>
                <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-none mb-6">
                  {card.title}
                </h3>
                <p className="text-[17px] leading-relaxed mb-8 max-w-[280px] opacity-80">
                  {card.description}
                </p>
                
                <div className="w-full flex-1 rounded-[16px] overflow-hidden mb-0 flex items-center justify-center relative pointer-events-none shadow-2xl">
                   <div 
                     className="absolute inset-0 bg-cover bg-center" 
                     style={{ backgroundImage: `url('${card.image}')` }} 
                   />
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                  <button className="px-10 py-4 bg-white text-[#111] rounded-none font-medium text-[16px] hover:scale-105 transition-transform shadow-xl">
                    Discover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
