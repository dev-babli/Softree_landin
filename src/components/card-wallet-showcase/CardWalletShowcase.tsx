"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

/**
 * CardWalletShowcase — PIXEL PERFECT version
 *
 * Uses the actual rendered video file (card-wallet-hero.mp4) for the visual.
 * This is the ONLY way to match a 3D ray-traced scene pixel-for-pixel.
 *
 * The component wraps the video in a responsive container and adds:
 *  - optional headline + CTA overlay
 *  - mouse-reactive parallax (subtle, on top of the video)
 *  - reduced-motion support (pauses animation)
 *  - poster frame while loading
 */

const VIDEO_SRC = "/videos/card-wallet-hero.mp4"
const POSTER_SRC = "/assets/card-wallet-showcase/f-01.png"

export type WalletCard = {
  id: string
  label?: string
  color?: string
}

type CardWalletShowcaseProps = {
  /** Optional overlay headline rendered on top of the video. */
  headline?: string
  /** Optional overlay subline. */
  subline?: string
  /** Optional CTA text. */
  cta?: string
  /** Callback when CTA is clicked. */
  onCtaClick?: () => void
  /** Enable mouse-follow parallax on the text overlay. */
  mouseParallax?: boolean
  /** Extra classes on the outer wrapper. */
  className?: string
}

export default function CardWalletShowcase({
  headline,
  subline,
  cta,
  onCtaClick,
  mouseParallax = true,
  className,
}: CardWalletShowcaseProps) {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reduce) {
      v.pause()
    } else {
      v.play().catch(() => {})
    }
  }, [reduce])

  useEffect(() => {
    if (!mouseParallax) return
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mouseParallax])

  return (
    <div
      className={`relative isolate w-full overflow-hidden bg-[#050508] ${className ?? ""}`}
      style={{ aspectRatio: "16 / 10" }}
    >
      {/* Background ambient glow (subtle, only visible during load) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 52% 42%, rgba(30,25,55,0.2) 0%, transparent 65%)",
        }}
      />

      {/* Video — the actual pixel-perfect source */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay={!reduce}
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        onLoadedData={() => setLoaded(true)}
      />

      {/* Loading state — poster image shown until video loads */}
      {!loaded && (
        <img
          src={POSTER_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Optional text overlay with subtle mouse parallax */}
      {(headline || subline || cta) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{
              x: mouseParallax ? mouse.x * -12 : 0,
              y: mouseParallax ? mouse.y * -8 : 0,
            }}
            className="max-w-2xl"
          >
            {headline && (
              <h2 className="text-3xl font-semibold text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)] md:text-5xl lg:text-6xl">
                {headline}
              </h2>
            )}
            {subline && (
              <p className="mt-4 text-base text-white/80 drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)] md:text-lg">
                {subline}
              </p>
            )}
            {cta && (
              <button
                onClick={onCtaClick}
                className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 active:scale-95"
              >
                {cta}
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* Bottom edge fade for seamless integration into page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[15%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.6) 60%, #050508 100%)",
        }}
      />
    </div>
  )
}
