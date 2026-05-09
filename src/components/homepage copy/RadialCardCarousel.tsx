"use client"

import { motion } from "framer-motion"

export interface RadialCard {
  title: string
  image: string
  video?: string
  href?: string
  variant?: "light" | "dark" | "electric" | "disabled" | "black" | "purple"
  description?: string
  cta?: string
}

interface RadialCardCarouselProps {
  cards: RadialCard[]
  step?: number
  duration?: number
  direction?: "cw" | "ccw"
  radius?: string
  cardWidth?: string
  className?: string
}

export default function RadialCardCarousel({
  cards: initialCards,
  step = 20,
  duration = 120,
  direction = "ccw",
  className = "",
}: RadialCardCarouselProps) {
  const target = direction === "cw" ? 360 : -360

  // Tile around full 360° for seamless rotation.
  const slotCount = Math.round(360 / step)
  const slots = Array.from({ length: slotCount }, (_, i) => initialCards[i % initialCards.length])

  // Use a massive flat radius for the elegant arch look instead of a tight circle
  const circleRadius = 1500;
  const diameter = circleRadius * 2;
  const cWidth = 400;
  const cHeight = 280;

  return (
    <div className={`relative w-full h-[640px] overflow-hidden flex justify-center pointer-events-none ${className}`}>
      {/* 
        The top of the massive circle is placed exactly at 180px inside this 640px container.
        This ensures the 280px tall cards fit without getting clipped at the top.
      */}
      <motion.div
        className="absolute flex justify-center items-center rounded-full pointer-events-auto"
        animate={{ rotate: target }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
        style={{
          top: '180px', 
          width: `${diameter}px`,
          height: `${diameter}px`,
          border: '1px dashed rgba(255,255,255,0.15)', // White dashed line for dark mode
        }}
      >
        {slots.map((c, i) => {
          const angle = i * step
          return (
            <div
              key={`slot-${i}`}
              className="absolute top-0 left-0"
              style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${angle}deg)`,
              }}
            >
              <RadialMediaCard card={c} width={cWidth} height={cHeight} />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

function RadialMediaCard({ card, width, height }: { card: RadialCard; width: number; height: number }) {
  const Wrapper: any = card.href ? "a" : "div"
  const wrapperProps = card.href ? { href: card.href } : {}
  return (
    <Wrapper
      {...wrapperProps}
      className="absolute origin-center rounded-[16px] bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer border border-white/5"
      style={{
        top: `-${height / 2}px`, // Anchors center of card exactly to the dashed line
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${width}px`,
        height: `${height}px`,
        padding: '6px',
      }}
    >
      <div className="w-full h-[210px] rounded-[10px] bg-[#222] overflow-hidden relative">
        <img 
          src={card.image} 
          alt={card.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${card.variant === 'disabled' ? 'opacity-40 grayscale' : ''}`} 
        />
        {card.video && (
          <video 
            src={card.video} 
            autoPlay loop muted playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          />
        )}
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div className="flex-grow flex items-center justify-between px-4">
        <span className={`text-[14px] font-medium tracking-wide ${card.variant === 'disabled' ? 'text-neutral-500' : 'text-white'}`}>
          {card.title}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </Wrapper>
  )
}
