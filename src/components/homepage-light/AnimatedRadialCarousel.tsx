"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

type Card = {
  title: string
  img: string
  href: string
  textColor: string
  isHero?: boolean
  vid?: string
}

const baseCards: Card[] = [
  {
    title: "Microsoft Solutions",
    img: "/whysoftree/Micorosft.webp",
    href: "/services/business-applications/power-apps",
    textColor: "text-white",
    isHero: true,
  },
  {
    title: "AI Intelligence",
    img: "/whysoftree/ai.webp",
    href: "/services/ai-intelligence/agentic-ai",
    textColor: "text-white",
  },
  {
    title: "Data & Analytics",
    img: "/whysoftree/data.webp",
    href: "/services/data-analytics/power-bi",
    textColor: "text-white",
  },
  {
    title: "Web Development",
    img: "/whysoftree/web dev.webp",
    href: "/services/digital-workspace/web-app-development",
    textColor: "text-white",
  },
  {
    title: "SharePoint",
    img: "/whysoftree/web.webp",
    href: "/services/digital-workspace/sharepoint",
    textColor: "text-white",
  },
  {
    title: "Mobile Apps",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif",
    href: "/services/digital-workspace/mobile-app-development",
    textColor: "text-white",
  },
  {
    title: "Startups & MVP",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif",
    href: "/services/business-applications/mvp",
    textColor: "text-white",
  },
]

const cards = [...baseCards, ...baseCards, ...baseCards]

interface Props {
  /** True → cards fade in with stagger, then rotation starts. */
  active: boolean
}

/**
 * Radial card carousel that materialises cinematically:
 * 1. Ring + cards exist at final positions but invisible (blurred, opacity 0)
 * 2. On `active`, ring fades in + unblurs (portal manifests)
 * 3. Cards light up in stagger sequence (angle-sorted, 40ms each)
 * 4. After all cards are lit, ring begins slow 360° rotation
 */
/* Responsive dimension presets — scales ring + cards across breakpoints */
const DIMS = {
  sm: { radius: 900, cardWidth: 240, cardHeight: 168, containerH: 400, top: 110, imgH: 126 },
  md: { radius: 1200, cardWidth: 320, cardHeight: 224, containerH: 520, top: 145, imgH: 168 },
  lg: { radius: 1500, cardWidth: 400, cardHeight: 280, containerH: 640, top: 180, imgH: 210 },
} as const
type Bp = keyof typeof DIMS

export function AnimatedRadialCarousel({ active }: Props) {
  const [bp, setBp] = useState<Bp>("lg")

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setBp("sm")
      else if (w < 1024) setBp("md")
      else setBp("lg")
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const { radius, cardWidth, cardHeight, containerH, top, imgH } = DIMS[bp]
  const diameter = radius * 2

  const rotateControls = useAnimation()
  const [rotationStarted, setRotationStarted] = useState(false)

  /* Timing — cohesive, crisp */
  const CARD_STAGGER = 0.04 // 40ms between cards
  const CARD_DURATION = 0.45
  const TOTAL_STAGGER_TIME = (cards.length / 3) * CARD_STAGGER // only count primary arc
  const ROTATION_START_DELAY = TOTAL_STAGGER_TIME + CARD_DURATION * 0.6

  useEffect(() => {
    let cancelled = false

    if (!active) {
      rotateControls.stop()
      rotateControls.set({ rotate: 0 })
      const reset = setTimeout(() => {
        if (!cancelled) setRotationStarted(false)
      }, 0)
      return () => {
        cancelled = true
        clearTimeout(reset)
      }
    }

    const t = setTimeout(() => {
      if (cancelled) return
      setRotationStarted(true)
      rotateControls.start({
        rotate: -360,
        transition: { repeat: Infinity, ease: "linear", duration: 120 },
      })
    }, ROTATION_START_DELAY * 1000)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [active, rotateControls, ROTATION_START_DELAY])

  return (
    <div
      className="relative mt-4 flex w-full justify-center overflow-hidden pointer-events-none"
      style={{ height: `${containerH}px` }}
    >
      <motion.div
        className="pointer-events-auto absolute flex items-center justify-center rounded-full"
        animate={rotateControls}
        initial={{ rotate: 0 }}
        style={{
          top: `${top}px`,
          width: `${diameter}px`,
          height: `${diameter}px`,
          border: rotationStarted
            ? "1px dashed rgba(0,0,0,0.12)"
            : "1px dashed rgba(0,0,0,0)",
          transition: "border-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {cards.map((card, i) => {
          const angle = (i / cards.length) * 360
          /* Angle-sorted stagger — cards closer to top appear first */
          const staggerIdx = Math.min(i, cards.length - i)

          return (
            <div
              key={i}
              className="absolute left-0 top-0"
              style={{
                width: "100%",
                height: "100%",
                transform: `rotate(${angle}deg)`,
              }}
            >
              <motion.a
                href={card.href}
                className={`group absolute flex origin-center flex-col justify-between overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-xl cursor-pointer ${card.isHero ? "ring-2 ring-white/90" : ""}`}
                style={{
                  top: `-${cardHeight / 2}px`,
                  left: "50%",
                  x: "-50%",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  padding: "6px",
                  transformOrigin: "center center",
                }}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(8px)",
                }}
                animate={
                  active
                    ? {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                    : {
                      opacity: 0,
                      scale: 0.92,
                      filter: "blur(8px)",
                    }
                }
                transition={{
                  duration: CARD_DURATION,
                  delay: active ? staggerIdx * CARD_STAGGER : 0,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ scale: 1.04, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-[#222]"
                  style={{ height: `${imgH}px` }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${card.title === "Easings" ? "opacity-40 grayscale" : ""}`}
                  />
                  {card.vid && (
                    <video
                      src={card.vid}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                </div>
                <div className="flex grow items-center justify-between px-4">
                  <h3 className={`text-[14px] font-medium tracking-wide ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <div className="translate-x-2 opacity-0 transition-opacity duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default AnimatedRadialCarousel
