"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const baseCards = [
  {
    title: "Microsoft Solutions",
    img: "/Hero/reference.png",
    href: "/services/business-applications",
    textColor: "text-white",
    isHero: true,
  },
  {
    title: "The Vault",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif",
    href: "/services/ai-agents",
    textColor: "text-white",
  },
  {
    title: "Page Transition Course",
    img: "https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif",
    vid: "https://osmo.b-cdn.net/website/page-transition-course/page-transition-course-thumb-720x450.mp4",
    href: "/services/enterprise-dashboards",
    textColor: "text-white",
  },
  {
    title: "Buttons",
    img: "https://osmo.b-cdn.net/website/bandwidth/button-pack-product-card-2160x2808.avif",
    href: "/services/ux-ui",
    textColor: "text-white",
  },
  {
    title: "Easings",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-easings.avif",
    href: "/services/collaboration",
    textColor: "text-neutral-300",
  },
  {
    title: "Icons",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-icons.avif",
    href: "/services/infrastructure",
    textColor: "text-white",
  },
  {
    title: "Community",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif",
    href: "/services/architecture",
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
export function AnimatedRadialCarousel({ active }: Props) {
  const radius = 1500
  const diameter = radius * 2
  const cardWidth = 400
  const cardHeight = 280

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
    <div className="relative mt-4 flex h-[640px] w-full justify-center overflow-hidden pointer-events-none">
      <motion.div
        className="pointer-events-auto absolute flex items-center justify-center rounded-full"
        animate={rotateControls}
        initial={{ rotate: 0 }}
        style={{
          top: "180px",
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
                <div className="relative h-[210px] w-full overflow-hidden rounded-xl bg-[#222]">
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
