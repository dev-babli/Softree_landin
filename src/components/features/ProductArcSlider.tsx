"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BASE_CARDS = [
  {
    id: "engineering",
    title: "Dedicated Pods",
    description: "Elite engineering teams integrated directly into your agile workflows for maximum velocity.",
    tag: "DELIVERY MODEL",
    bgColor: "#FFFFFF",
    textColor: "#141413",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ai-systems",
    title: "AI Integration",
    description: "Production-ready AI workflows, agentic automation, and LLM implementation.",
    tag: "CAPABILITY",
    bgColor: "#141413",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cloud-scale",
    title: "Cloud Native",
    description: "Scalable, resilient architecture built on Azure, AWS, and modern cloud primitives.",
    tag: "CAPABILITY",
    bgColor: "#F3F0EE",
    textColor: "#141413",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ux-ui",
    title: "Premium Design",
    description: "High-fidelity interfaces engineered to convert, engage, and dominate your market.",
    tag: "CAPABILITY",
    bgColor: "#FF5812",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800"
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

const PILLS = BASE_CARDS.map(c => c.title);

export default function ProductArcSlider() {
  const radius = 2000; 
  const diameter = radius * 2;
  const cardWidth = 420;
  const cardHeight = 620;

  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { damping: 50, stiffness: 200 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = rotationMV.onChange((val) => {
      const targetAngle = -val;
      let idx = Math.round(targetAngle / DEG_PER_CARD) % TOTAL_CARDS;
      if (idx < 0) idx += TOTAL_CARDS;
      setActiveIndex(idx % BASE_CARDS.length);
    });
    return unsubscribe;
  }, [rotationMV]);

  const handlePillClick = (idx: number) => {
    const currentRot = rotationMV.get();
    const targetBase = -idx * DEG_PER_CARD;
    const diff = ((targetBase - currentRot) % 360 + 360) % 360;
    const shortestDiff = diff > 180 ? diff - 360 : diff;
    rotationMV.set(currentRot + shortestDiff);
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      rotationMV.set(rotationMV.get() - DEG_PER_CARD);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, rotationMV]);

  const handlePan = (e: any, info: any) => {
    // Unbounded rotation for infinite looping
    const newRot = rotationMV.get() + info.delta.x * 0.05;
    rotationMV.set(newRot);
  };

  return (
    <section 
      className="relative w-full bg-[#F3F0EE] pt-16 md:pt-24 pb-0 overflow-visible touch-none z-30"
      style={{ height: "950px" }}
    >
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[1600px] pointer-events-none opacity-30 z-0">
        <img 
          src="https://osmo.b-cdn.net/website/svg/product-slider-circle-deco.svg" 
          alt="" 
          className="w-full h-auto"
        />
      </div>

      <div className="relative z-30 mx-auto max-w-[1400px] px-6 md:px-12 pointer-events-none flex flex-col items-start text-left">
        <h2 className="text-[clamp(28px,4.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#141413] mb-6 max-w-[800px]">
          A growing ecosystem for enterprise scale
        </h2>
        <p className="text-[18px] md:text-[22px] text-[#141413]/70 leading-relaxed mb-10 max-w-[600px]">
          Accelerate development with our core services:
        </p>

        <div className="flex flex-wrap items-center gap-2 max-w-[800px] pointer-events-auto">
          {PILLS.map((pill, idx) => (
            <button 
              key={pill} 
              onClick={() => handlePillClick(idx)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-[15px] font-medium transition-all duration-300 ${
                idx === activeIndex 
                  ? "bg-[#141413] text-white shadow-md" 
                  : "bg-black/5 text-[#141413] hover:bg-black/10"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        onPan={handlePan}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 top-[260px] z-20 cursor-grab active:cursor-grabbing"
        style={{ overflow: 'visible' }} 
      >
        <motion.div
          style={{ 
            width: diameter, 
            height: diameter, 
            rotate: smoothRotation,
            position: "absolute",
            left: "50%",
            top: "400px", 
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
                <h3 className="text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-none mb-6">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed mb-8 max-w-[280px] opacity-80">
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
