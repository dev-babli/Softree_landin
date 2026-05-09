"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Grainient from "@/components/homepage-light/Grainient"
import { EASE_T } from "@/lib/motion"

/* ====================================================================
 *  LightCreativeImpact — "We collaborate with forward-thinking brands"
 *
 *  Layout (matches the Webflow source):
 *    ┌──────────┬──────────────────────────────┐
 *    │          │ Big two-line heading         │
 *    │ ● ABOUT  │                              │
 *    │   US     │ ┌────────────┬──────────┐    │
 *    │          │ │ Image 60%  │ Image 40%│    │
 *    │          │ └────────────┴──────────┘    │
 *    │ READ-→   │                              │
 *    └──────────┴──────────────────────────────┘
 *    │  $74M    │  95%        │  +225  │  92%  │
 *    │  caption │  caption    │  cap   │  cap  │
 *    └──────────┴─────────────┴────────┴───────┘
 *
 *  Cream canvas (#F3F0EE) + orange accent (#FF5812) + black ink (#141413)
 * ==================================================================== */

const EASE = EASE_T.silk

const STATS = [
  { prefix: "$", target: 74, suffix: "M", label: "Driving growth with strategy." },
  { target: 95, suffix: "%", label: "Building trusted partnerships." },
  { prefix: "+", target: 225, label: "Delivering industry success." },
  { target: 92, suffix: "%", label: "Turning traffic into growth." },
]

/* ─── Count-up tween ───────────────────────────────────────────────── */
function CountUp({
  target,
  duration = 1800,
  active,
}: {
  target: number
  duration?: number
  active: boolean
}) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setN(Math.round(target * ease(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return <span className="tabular-nums">{n}</span>
}

/* ─── Scalloped sticker badge (24 bumps around an orange disc) ─────── */
function ScallopBadge({ size = 40 }: { size?: number }) {
  const scallops = 24
  const items = Array.from({ length: scallops })
  return (
    <span
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {items.map((_, i) => {
        const angle = (i / scallops) * 360
        return (
          <span
            key={i}
            className="absolute rounded-full bg-[#FF5812]"
            style={{
              width: size * 0.26,
              height: size * 0.26,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${size * 0.42}px)`,
            }}
          />
        )
      })}
      <span
        className="absolute rounded-full bg-[#FF5812]"
        style={{ inset: size * 0.13 }}
      />
    </span>
  )
}

/* ─── READ MORE button — pill with sliding text + scallop badge ───── */
function ReadMoreButton({ href = "/about" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-full bg-[#141413] py-2.5 pl-6 pr-2.5 shadow-[0_8px_24px_-8px_rgba(20,20,19,0.45)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-px hover:bg-[#1f1d1c] hover:shadow-[0_14px_30px_-10px_rgba(20,20,19,0.55)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40"
    >
      <span className="relative block h-3.5 overflow-hidden">
        {/* sizing ghost */}
        <span className="invisible block whitespace-pre text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          READ MORE
        </span>
        {/* default layer */}
        <span className="absolute inset-0 block translate-y-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
          READ MORE
        </span>
        {/* hover layer */}
        <span className="absolute inset-0 block translate-y-full text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
          READ MORE
        </span>
      </span>

      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-12">
          <ScallopBadge size={36} />
        </span>
        <svg
          width="9"
          height="11"
          viewBox="0 0 10 12"
          fill="none"
          className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
        >
          <path
            d="M9.62 5.8L0.36 0.04C0.25-0.03 0.11 0 0.04 0.11C0.02 0.14 0 0.18 0 0.22C0 0.26 0.01 0.30 0.03 0.34L2.86 6L0.03 11.66C-0.03 11.77 0.01 11.92 0.13 11.97C0.16 11.99 0.20 12 0.24 12C0.29 12 0.32 11.99 0.36 11.96L9.62 6.20C9.73 6.13 9.76 5.99 9.69 5.88C9.67 5.85 9.65 5.82 9.62 5.80Z"
            fill="#ffffff"
          />
        </svg>
      </span>
    </Link>
  )
}

/* ─── Heading line with sliding cream "shadow" wipe ────────────────── */
function RevealLine({
  children,
  active,
  delay = 0,
}: {
  children: React.ReactNode
  active: boolean
  delay?: number
}) {
  return (
    <span className="relative block">
      <motion.span
        className="block"
        initial={{ y: 60, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[#F3F0EE]"
        initial={{ x: "-2%" }}
        animate={active ? { x: "100%" } : {}}
        transition={{ duration: 1, delay, ease: EASE }}
      />
    </span>
  )
}

/* ─── Image with cream wipe-in + slow ken-burns settle ───────────── */
function RevealImage({
  src,
  alt,
  active,
  delay = 0,
}: {
  src: string
  alt: string
  active: boolean
  delay?: number
}) {
  return (
    <div className="group/img relative h-full w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_-16px_rgba(20,20,19,0.18)] transition-shadow duration-500 hover:shadow-[0_20px_56px_-16px_rgba(20,20,19,0.28)]">
      <motion.div
        className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/img:scale-[1.04]"
        initial={{ scale: 1.12 }}
        animate={active ? { scale: 1 } : {}}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-[#F3F0EE]"
        initial={{ x: 0 }}
        animate={active ? { x: "101%" } : {}}
        transition={{ duration: 1, delay, ease: EASE }}
      />
    </div>
  )
}

/* ─── Component ────────────────────────────────────────────────────── */
export default function LightCreativeImpact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15%" })
  const [hoveredBox, setHoveredBox] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#F3F0EE] px-6 py-20 md:py-24 lg:px-12 lg:py-28"
      data-theme-section="light"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* ── Top row: tag/button (left) + heading + images (right) ── */}
        <div className="grid gap-12 lg:grid-cols-[230px_1fr] lg:gap-16">
          {/* Left rail */}
          <div className="flex flex-col justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-2.5"
            >
              <span className="h-2 w-2 rounded-xs bg-[#FF5812]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#141413]">
                Why SOFTREE
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="hidden lg:block"
            >
              <ReadMoreButton href="/about" />
            </motion.div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {/* Heading & Text */}
            <div className="flex flex-col gap-6">
              <h2 className="text-[clamp(28px,4.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#141413]">
                <RevealLine active={isInView} delay={0.15}>
                  Why partners choose Softree
                </RevealLine>
              </h2>
              <p className="text-[16px] md:text-[20px] leading-relaxed text-[#141413]/70 max-w-[85%]">
                <RevealLine active={isInView} delay={0.3}>
                  Scale delivery with a global engineering partner focused on long-term collaboration, flexible engagement, and enterprise-grade execution.
                </RevealLine>
              </p>
            </div>

            {/* Two-box flex with Grainients (expanding on hover) */}
            <div 
              className="flex w-full h-[300px] sm:h-[400px] gap-3 sm:gap-4 overflow-hidden"
              onMouseLeave={() => setHoveredBox(null)}
            >
              <motion.div
                className="group relative h-full overflow-hidden rounded-2xl shadow-[0_12px_40px_-16px_rgba(20,20,19,0.18)]"
                onMouseEnter={() => setHoveredBox(1)}
                animate={{ flex: hoveredBox === 1 ? 7 : hoveredBox === 2 ? 3 : 6 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <Grainient 
                  color1="#FF5812" 
                  color2="#FF8844" 
                  color3="#FFAA66" 
                  className="absolute inset-0 w-full h-full"
                />
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent mix-blend-multiply"></div>
                
                {/* Top Badge */}
                <div className="absolute left-6 top-6 md:left-8 md:top-8">
                  <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    01 // Talent
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 flex w-full flex-col p-6 md:p-8">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-[32px] leading-none">
                    Global Teams
                  </h3>
                  <div className="overflow-hidden">
                    <p className="min-w-[280px] text-[14px] leading-relaxed text-white/90 md:text-[15px] max-w-[85%]">
                      Elite engineering talent seamlessly integrated into your delivery pipelines to accelerate product development.
                    </p>
                  </div>
                </div>

                {/* Arrow Button */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-45 group-hover:bg-white group-hover:scale-110">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#FF5812] transition-colors"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </motion.div>

              <motion.div
                className="group relative h-full overflow-hidden rounded-2xl shadow-[0_12px_40px_-16px_rgba(20,20,19,0.18)]"
                onMouseEnter={() => setHoveredBox(2)}
                animate={{ flex: hoveredBox === 2 ? 7 : hoveredBox === 1 ? 3 : 4 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <Grainient 
                  color1="#0055FF" 
                  color2="#0099FF" 
                  color3="#0022AA" 
                  className="absolute inset-0 w-full h-full"
                />
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Top Badge */}
                <div className="absolute left-6 top-6 md:left-8 md:top-8">
                  <span className="inline-block rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 shadow-sm">
                    02 // Scale
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 flex w-full flex-col p-6 md:p-8">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-[32px] leading-none">
                    Enterprise Grade
                  </h3>
                  <div className="overflow-hidden">
                    <p className="min-w-[280px] text-[14px] leading-relaxed text-white/70 md:text-[15px] max-w-[85%]">
                      Architecture and processes designed from the ground up to support massive scale, reliability, and security.
                    </p>
                  </div>
                </div>

                {/* Arrow Button */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-45 group-hover:bg-white group-hover:scale-110">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#141413] transition-colors"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </motion.div>
            </div>

            {/* Mobile READ MORE */}
            <div className="lg:hidden">
              <ReadMoreButton href="/about" />
            </div>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-y-12 sm:mt-20 sm:grid-cols-4 sm:gap-x-0 md:mt-24"
        >
          {STATS.map((stat, i) => {
            const isLast = i === STATS.length - 1
            return (
              <motion.div
                key={i}
                className={`group/stat relative px-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 sm:px-6 ${i === 0 ? "sm:pl-0" : ""
                  } ${isLast ? "sm:pr-0" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.85 + i * 0.1, ease: EASE }}
              >
                {/* Vertical divider — between cards on sm+ */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute right-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-[#141413]/12 sm:block"
                  />
                )}

                <div className="text-[clamp(48px,7.2vw,108px)] font-semibold leading-[0.95] tracking-[-0.04em] tabular-nums text-[#141413]">
                  {stat.prefix && <span className="text-[#FF5812] transition-transform duration-500 group-hover/stat:scale-110">{stat.prefix}</span>}
                  <CountUp target={stat.target} active={isInView} />
                  {stat.suffix && <span className="text-[#FF5812] transition-transform duration-500 group-hover/stat:scale-110">{stat.suffix}</span>}
                </div>
                <p className="mt-3 max-w-[16ch] text-[13px] leading-snug text-[#141413]/45 sm:text-[14px]">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
