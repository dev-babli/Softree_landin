"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

/* ====================================================================
 *  CORE FEATURES — Globe + 3D Card Carousel
 *  Exact visual match to Corex reference (globe.html)
 *  Pitch-black bg, blue glowing globe, floating glass cards with icons
 * ==================================================================== */

const EASE = [0.32, 0.72, 0, 1] as const

interface Slide {
  id: string
  num: string
  title: string
  desc: string
  accent: string
}

const slides: Slide[] = [
  {
    id: "ai",
    num: "/01",
    title: "Agentic Intelligence",
    desc: "Domain-trained agents that parse documents, route decisions, and trigger actions across your stack — not chatbots, operational systems.",
    accent: "#2B7FFF",
  },
  {
    id: "web",
    num: "/02",
    title: "Product Engineering",
    desc: "Cloud-native apps built with Next.js & React Native. Clean architecture that performs under real traffic.",
    accent: "#2B7FFF",
  },
  {
    id: "m365",
    num: "/03",
    title: "Enterprise Productivity",
    desc: "SharePoint, Power Platform, Teams apps & Azure governance unified into a coherent operating system.",
    accent: "#2B7FFF",
  },
]

/* ── Globe background — rotating dotted earth + orbiting mask-lights ── */
function Globe() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-1 flex justify-center overflow-visible"
      style={{ height: "75%" }}
    >
      <div
        className="relative flex items-end justify-center"
        style={{
          width: "min(140vw, 1400px)",
          aspectRatio: "1 / 1",
          transform: "translateY(35%)",
        }}
      >
        <motion.div
          className="absolute inset-[-15%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(43,127,255,0.35) 0%, rgba(43,127,255,0.12) 35%, transparent 65%)",
            filter: "blur(60px)",
          }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-[5%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(60,140,255,0.55) 0%, rgba(20,60,140,0.4) 35%, rgba(5,15,40,0.2) 65%, transparent 80%)",
          }}
        />
        <motion.div
          className="relative z-10 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <Image
            src="/labels/earth-dotted.png"
            alt=""
            width={1400}
            height={1400}
            priority={false}
            className="h-full w-full object-contain"
            style={{
              filter:
                "brightness(1.4) saturate(0) sepia(1) hue-rotate(180deg) saturate(6) brightness(1.1)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Stacked-card icon w/ glow underneath (matches chart-image + chart-light) ── */
function CardIcon({ color }: { color: string }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      {/* chart-light — soft blue glow underneath */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, ${color}55 0%, ${color}22 35%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
      {/* chart-image */}
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        className="relative z-10"
      >
        {/* Top stacked card (smallest, most faded) */}
        <rect
          x="22"
          y="6"
          width="24"
          height="14"
          rx="3"
          stroke={color}
          strokeWidth="1.2"
          fill="rgba(43,127,255,0.04)"
          opacity="0.4"
        />
        {/* Middle stacked card */}
        <rect
          x="16"
          y="18"
          width="36"
          height="16"
          rx="3"
          stroke={color}
          strokeWidth="1.2"
          fill="rgba(43,127,255,0.06)"
          opacity="0.7"
        />
        {/* Bottom card (main, brightest) */}
        <rect
          x="8"
          y="32"
          width="52"
          height="28"
          rx="4"
          stroke={color}
          strokeWidth="1.5"
          fill="rgba(43,127,255,0.08)"
        />
        {/* Inner bar chart lines on bottom card */}
        <rect x="14" y="48" width="3" height="8" rx="1" fill={color} opacity="0.6" />
        <rect x="20" y="44" width="3" height="12" rx="1" fill={color} opacity="0.8" />
        <rect x="26" y="40" width="3" height="16" rx="1" fill={color} />
        <rect x="32" y="46" width="3" height="10" rx="1" fill={color} opacity="0.7" />
        {/* Dollar sign */}
        <text
          x="46"
          y="54"
          textAnchor="middle"
          fill={color}
          fontSize="13"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          $
        </text>
      </svg>
    </div>
  )
}

/* ── 3D Carousel Card (matches chart-bar-crad structure) ── */
function CarouselCard({
  slide,
  position,
}: {
  slide: Slide
  position: "left" | "center" | "right"
}) {
  const isCenter = position === "center"
  const isLeft = position === "left"

  // Position offsets from center (in px, matching HTML reference ~325px at desktop)
  const xOffset = isCenter ? 0 : isLeft ? -280 : 280

  return (
    <div
      className="absolute left-1/2 top-0 w-full"
      style={{
        maxWidth: 420,
        transform: "translateX(-50%)",
        zIndex: isCenter ? 20 : 10,
        pointerEvents: isCenter ? "auto" : "none",
      }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, filter, opacity",
        }}
        initial={false}
        animate={{
          x: xOffset,
          scale: isCenter ? 1 : 0.8,
          rotateZ: isLeft ? -8 : isCenter ? 0 : 8,
          filter: isCenter ? "blur(0px)" : "blur(5px)",
          opacity: isCenter ? 1 : 0.55,
        }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* chart-bar-crad */}
        <div
          className="relative overflow-hidden rounded-xl backdrop-blur-md"
          style={{
            background: "rgba(8, 10, 18, 0.85)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.04), 0 32px 80px -24px rgba(0,0,0,0.9)",
          }}
        >
          {/* chart-background layer */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(43,127,255,0.08) 0%, transparent 50%)",
            }}
          />

          {/* chart-title-wrapper */}
          <div className="relative z-10 flex items-start justify-between gap-4 p-6 sm:p-7 md:p-8 pb-0">
            {/* chart-title */}
            <div className="flex-1 min-w-0">
              <div className="sub-heading text-[13px] font-medium tracking-tight text-white/50">
                {slide.num}
              </div>
              <h4 className="mt-1 text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                {slide.title}
              </h4>
            </div>

            {/* chart-image-wrapper */}
            <div className="shrink-0 mt-1">
              <CardIcon color={slide.accent} />
            </div>
          </div>

          {/* chart-content */}
          <div className="relative z-10 px-6 sm:px-7 md:px-8 pt-4 pb-6 sm:pb-7 md:pb-8">
            {/* line divider */}
            <div
              className="line h-px w-full mb-4"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />
            {/* body-2 gray-60 */}
            <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-white/40">
              {slide.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Dot navigation ── */
function Dots({
  count,
  active,
  onChange,
}: {
  count: number
  active: number
  onChange: (i: number) => void
}) {
  return (
    <div className="relative z-30 flex items-center justify-center gap-3 pt-8">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="relative h-2 w-2 rounded-full transition-all duration-500 cursor-pointer"
          style={{
            background: i === active ? "#2B7FFF" : "rgba(255,255,255,0.2)",
            transform: i === active ? "scale(1.35)" : "scale(1)",
            boxShadow:
              i === active ? "0 0 8px rgba(43,127,255,0.5)" : "none",
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* ── Main Section ── */
export default function CoreFeatures() {
  const [active, setActive] = useState(0)

  const autoCycle = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const id = setInterval(autoCycle, 4000)
    return () => clearInterval(id)
  }, [autoCycle])

  const getPosition = (index: number): "left" | "center" | "right" => {
    const diff = index - active
    if (diff === 0) return "center"
    if (diff === -1 || diff === slides.length - 1) return "left"
    return "right"
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-black py-24 sm:py-32 md:py-40">
      {/* Globe background */}
      <Globe />

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex flex-col items-center px-6 md:px-10">
        {/* Header text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
            Core Features
          </span>
          <h2 className="max-w-[600px] text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            Master the Market with{" "}
            <span className="text-white/40">Softree</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-[1.6] text-white/35 sm:text-[15px]">
            Empowering enterprises across the globe with data-driven insights and
            institutional-grade AI technology.
          </p>
        </motion.div>

        {/* 3D Card Stage */}
        <div
          className="relative w-full"
          style={{
            height: "clamp(280px, 40vw, 360px)",
            perspective: 1200,
          }}
        >
          {slides.map((slide, i) => (
            <CarouselCard
              key={slide.id}
              slide={slide}
              position={getPosition(i)}
            />
          ))}
        </div>

        {/* Dots */}
        <Dots count={slides.length} active={active} onChange={setActive} />
      </div>
    </section>
  )
}
