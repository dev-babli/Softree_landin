'use client';
import { motion } from 'framer-motion';

const baseCards = [
  {
    title: 'The Vault',
    img: 'https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif',
    href: '/services/ai-agents',
    textColor: 'text-white',
  },
  {
    title: 'Page Transition Course',
    img: 'https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif',
    vid: 'https://osmo.b-cdn.net/website/page-transition-course/page-transition-course-thumb-720x450.mp4',
    href: '/services/enterprise-dashboards',
    textColor: 'text-white',
  },
  {
    title: 'Buttons',
    img: 'https://osmo.b-cdn.net/website/bandwidth/button-pack-product-card-2160x2808.avif',
    href: '/services/ux-ui',
    textColor: 'text-white',
  },
  {
    title: 'Easings',
    img: 'https://osmo.b-cdn.net/website/bandwidth/product-card-easings.avif',
    href: '/services/collaboration',
    textColor: 'text-neutral-300',
  },
  {
    title: 'Icons',
    img: 'https://osmo.b-cdn.net/website/bandwidth/product-card-icons.avif',
    href: '/services/infrastructure',
    textColor: 'text-white',
  },
  {
    title: 'Community',
    img: 'https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif',
    href: '/services/architecture',
    textColor: 'text-white',
  }
];

// 18 cards with 20-degree separation creates a perfect 360 circle
const cards = [...baseCards, ...baseCards, ...baseCards];

export function RadialCardCarousel() {
  const radius = 1500; 
  const diameter = radius * 2;
  const cardWidth = 400;
  const cardHeight = 280;

  return (
    <div className="relative w-full h-[640px] overflow-hidden flex justify-center pointer-events-none mt-4">
      {/* 
        The top of the massive circle is placed exactly at 180px inside this 640px container.
        This ensures the 280px tall cards (which stick up 140px) fit perfectly without getting clipped at the top.
      */}
      <motion.div
        className="absolute flex justify-center items-center rounded-full pointer-events-auto"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 120 }}
        style={{
          top: '180px', 
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
                className="absolute origin-center rounded-[16px] bg-[#1a1a1a] shadow-xl hover:scale-105 transition-transform duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{
                  top: `-${cardHeight / 2}px`, // Anchors center of card exactly to the dashed line
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  padding: '6px',
                }}
              >
                <div className="w-full h-[210px] rounded-[10px] bg-[#222] overflow-hidden relative">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${card.title === 'Easings' ? 'opacity-40 grayscale' : ''}`} 
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
