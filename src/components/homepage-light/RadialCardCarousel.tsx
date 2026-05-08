'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Card = {
  title: string;
  img: string;
  href: string;
  textColor: string;
  isHero?: boolean;
  vid?: string;
}

const baseCards: Card[] = [
  {
    title: 'Microsoft Solutions',
    img: '/whysoftree/Micorosft.webp',
    href: '/services/business-applications/power-apps',
    textColor: 'text-white',
    isHero: true,
  },
  {
    title: 'AI Intelligence',
    img: '/whysoftree/ai.webp',
    href: '/services/ai-intelligence/agentic-ai',
    textColor: 'text-white',
  },
  {
    title: 'Data & Analytics',
    img: '/whysoftree/data.webp',
    href: '/services/data-analytics/power-bi',
    textColor: 'text-white',
  },
  {
    title: 'Web Development',
    img: '/whysoftree/web dev.webp',
    href: '/services/digital-workspace/web-app-development',
    textColor: 'text-white',
  },
  {
    title: 'SharePoint',
    img: '/whysoftree/web.webp',
    href: '/services/digital-workspace/sharepoint',
    textColor: 'text-white',
  },
  {
    title: 'Mobile Apps',
    img: 'https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif',
    href: '/services/digital-workspace/mobile-app-development',
    textColor: 'text-white',
  }
];

// 18 cards with 20-degree separation creates a perfect 360 circle
const cards = [...baseCards, ...baseCards, ...baseCards];

/* Responsive dimensions */
const DIMS = {
  sm: { radius: 900, cardWidth: 240, cardHeight: 168, containerH: 400, top: 110, imgH: 126 },
  md: { radius: 1200, cardWidth: 320, cardHeight: 224, containerH: 520, top: 145, imgH: 168 },
  lg: { radius: 1500, cardWidth: 400, cardHeight: 280, containerH: 640, top: 180, imgH: 210 },
} as const;
type Bp = keyof typeof DIMS;

export function RadialCardCarousel() {
  const [bp, setBp] = useState<Bp>('lg');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBp('sm');
      else if (w < 1024) setBp('md');
      else setBp('lg');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { radius, cardWidth, cardHeight, containerH, top, imgH } = DIMS[bp];
  const diameter = radius * 2;

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center pointer-events-none mt-4"
      style={{ height: `${containerH}px` }}
    >
      <motion.div
        className="absolute flex justify-center items-center rounded-full pointer-events-auto"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 120 }}
        style={{
          top: `${top}px`,
          width: `${diameter}px`,
          height: `${diameter}px`,
          border: '1px dashed rgba(0,0,0,0.12)',
        }}
      >
        {cards.map((card, i) => {
          const angle = (i / cards.length) * 360;
          return (
            <div
              key={i}
              className="absolute top-0 left-0"
              style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${angle}deg)`,
              }}
            >
              <a
                href={card.href}
                className={`absolute origin-center rounded-[16px] bg-[#1a1a1a] shadow-xl hover:scale-105 transition-transform duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer ${card.isHero ? 'ring-2 ring-white/90' : ''}`}
                style={{
                  top: `-${cardHeight / 2}px`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  padding: '6px',
                }}
              >
                <div
                  className="w-full rounded-[10px] bg-[#222] overflow-hidden relative"
                  style={{ height: `${imgH}px` }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {card.vid && (
                    <video
                      src={card.vid}
                      autoPlay loop muted playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="flex-grow flex items-center justify-between px-4">
                  <h3 className={`text-[14px] font-medium tracking-wide ${card.textColor}`}>{card.title}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default RadialCardCarousel;
