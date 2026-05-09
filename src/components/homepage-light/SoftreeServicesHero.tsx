"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type TouchEvent as ReactTouchEvent,
} from "react"
import Link from "next/link"
import Image from "next/image"
import { EASE_T } from "@/lib/motion"

const CYCLE_WORDS = ["Innovation", "Growth", "Scale", "Impact", "Results"]
const CYCLE_MS = 4000
const EASE_OUT = EASE_T.silk

/* ─── Headline cycle ───────────────────────────────────────────────── */
function TextCycle() {
  const words = CYCLE_WORDS
  const [idx, setIdx] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setLeaving(true)
      setTimeout(() => {
        setIdx((p) => (p + 1) % words.length)
        setLeaving(false)
      }, 320)
    }, 3400)
    return () => clearInterval(t)
  }, [words.length])

  return (
    <span className="relative inline-block min-w-[120px] text-[#1852FF] sm:min-w-[160px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={leaving ? { opacity: 0, y: -18, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-block"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-current"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ originX: 0 }}
      />
    </span>
  )
}

/* ─── Service data ─────────────────────────────────────────────────── */
const SERVICES = [
  { number: "01", title: "AI & Automation", image: "/whysoftree/ai.webp", href: "/services/ai-intelligence", tagline: "Intelligent systems that think for you" },
  { number: "02", title: "Web Development", image: "/whysoftree/web dev.webp", href: "/services/digital-workspace/web-app-development", tagline: "Fast, beautiful digital products" },
  { number: "03", title: "Microsoft Solutions", image: "/whysoftree/Micorosft.webp", href: "/services/business-applications/power-apps", tagline: "Your M365 stack, fully unlocked" },
  { number: "04", title: "Data & Analytics", image: "/whysoftree/data.webp", href: "/services/data-analytics/power-bi", tagline: "Signal out of noise" },
  { number: "05", title: "Digital Workspace", image: "/whysoftree/web.webp", href: "/services/digital-workspace/sharepoint", tagline: "Your whole company in sync" },
]

/* ─── Animated CTA button ──────────────────────────────────────────── */
function AnimatedButton({ href = "/contact" }: { href?: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-[#0a0a1a]/10 bg-[#0a0a1a] px-5 py-2.5 shadow-[0_8px_24px_-8px_rgba(10,10,26,0.35)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-px hover:shadow-[0_14px_30px_-10px_rgba(10,10,26,0.5)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-5 overflow-hidden">
        <motion.span className="block text-sm font-medium text-white" animate={{ y: hovered ? "-100%" : "0%" }} transition={{ duration: 0.28, ease: EASE_OUT }}>
          LET’S TALK
        </motion.span>
        <motion.span className="absolute left-0 top-full block text-sm font-medium text-white" animate={{ y: hovered ? "-100%" : "0%" }} transition={{ duration: 0.28, ease: EASE_OUT }}>
          LET’S TALK
        </motion.span>
      </div>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#1852FF] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

/* ─── Avatars ──────────────────────────────────────────────────────── */
const AVATARS = [
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d47_Hero%20Client%201.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d45_Hero%20Client%202.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4b_Hero%20Client%203.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4d_Hero%20Client%204.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d49_Hero%20Client%205.webp",
]

/* ─── Reduced-motion query ─────────────────────────────────────────── */
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener?.("change", cb)
  return () => mq.removeEventListener?.("change", cb)
}
const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
const getReducedMotionServerSnapshot = () => false
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot)
}

/* ─── Main component ───────────────────────────────────────────────── */
export default function SoftreeServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const reducedMotion = usePrefersReducedMotion()

  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const advance = useCallback((delta: number) => {
    setActiveIdx((p) => (p + delta + SERVICES.length) % SERVICES.length)
  }, [])
  const prev = useCallback(() => advance(-1), [advance])
  const next = useCallback(() => advance(1), [advance])
  const goTo = useCallback(
    (i: number) => setActiveIdx(((i % SERVICES.length) + SERVICES.length) % SERVICES.length),
    []
  )

  /* Auto-advance with rAF-driven progress */
  useEffect(() => {
    if (isPaused || reducedMotion) return
    let raf = 0
    let start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(1, elapsed / CYCLE_MS)
      setProgress(p)
      if (p >= 1) {
        setActiveIdx((i) => (i + 1) % SERVICES.length)
        start = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isPaused, reducedMotion, activeIdx])

  /* Keyboard nav */
  useEffect(() => {
    const node = sliderRef.current
    if (!node) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next() }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev() }
    }
    node.addEventListener("keydown", onKey)
    return () => node.removeEventListener("keydown", onKey)
  }, [next, prev])

  /* Touch swipe */
  const onTouchStart = (e: ReactTouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  const active = SERVICES[activeIdx]

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white pb-16 md:pb-20 lg:pb-24">
      {/* ── Header row ─────────────────────────────────────────────── */}
      <motion.div
        className="flex w-full items-start justify-between px-6 py-6 lg:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-[#0a0a1a] lg:text-4xl">
            Softree<span className="align-super text-xs">®</span>
          </h1>
          <h1 className="text-2xl font-bold tracking-tight text-[#0a0a1a] lg:text-4xl">_Studio</h1>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3 rounded-xl border border-[#0a0a1a]/10 bg-[#f8f9fc] p-2 pr-4 transition-shadow duration-300 hover:shadow-sm">
            <Image
              src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c2c8febe5ed42eae483183_Hero%201%20Profile.webp"
              alt="Team"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <div className="text-sm font-medium text-[#0a0a1a]">Softree Team</div>
              <div className="text-xs text-[#0a0a1a]/55">Digital Solutions</div>
            </div>
          </div>
          <AnimatedButton />
        </div>
      </motion.div>

      {/* Thin rule */}
      <motion.div
        className="-mt-3 mb-5 px-6 lg:px-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#0a0a1a]/18 to-transparent" />
      </motion.div>

      {/* ── Main hero card ──────────────────────────────────────── */}
      <div className="relative w-full px-6 pb-8 lg:px-12">
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {/* Video bg */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay loop muted playsInline
              className="h-full w-full object-cover"
              poster="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg"
            >
              <source src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/80 via-white/60 to-orange-50/70" />
            <div className="absolute inset-0 bg-linear-to-t from-white/95 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div
            className="relative z-10 flex flex-col justify-between p-6 lg:p-10"
            style={{ minHeight: "clamp(520px,65vh,780px)" }}
          >
            {/* Top: avatars + headline + counter */}
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div className="flex flex-col gap-5">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((a, i) => (
                    <motion.div
                      key={i}
                      className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:scale-110"
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: EASE_OUT }}
                    >
                      <Image src={a} alt="" width={36} height={36} className="h-full w-full object-cover" />
                    </motion.div>
                  ))}
                </div>

                <motion.h2
                  className="text-[clamp(20px,3vw,38px)] font-semibold leading-tight tracking-tight text-[#0a0a1a]"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
                  }}
                >
                  {"From idea to live product in 12 weeks".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                      }}
                      transition={{ duration: 0.65, ease: EASE_OUT }}
                      style={{ marginRight: "0.25em" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <br className="hidden sm:block" />
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.65, ease: EASE_OUT }}
                    style={{ marginRight: "0.25em" }}
                  >
                    with
                  </motion.span>{" "}
                  <TextCycle />
                </motion.h2>
              </div>

              {/* Service counter — clean crossfade */}
              <motion.div
                className="hidden flex-col items-end gap-1 sm:flex"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a]/35">
                  Services
                </span>
                <span className="flex items-baseline text-[clamp(28px,4vw,52px)] font-semibold leading-none tracking-[-0.04em] text-[#0a0a1a]/12 select-none tabular-nums">
                  <span className="relative inline-block overflow-hidden align-bottom" style={{ width: "1.6ch", height: "1em" }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={activeIdx}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className="absolute inset-0 inline-block"
                      >
                        {String(activeIdx + 1).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="ml-1 text-[0.45em] text-[#0a0a1a]/22"> / {String(SERVICES.length).padStart(2, "0")}</span>
                </span>
              </motion.div>
            </div>

            {/* ── Slider region ────────────────────────────────── */}
            <motion.div
              ref={sliderRef}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Softree services carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="mt-auto outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/30"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {/* Active service title — clean crossfade */}
              <div className="mb-3 overflow-hidden" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ y: 32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -32, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <h3 className="text-[clamp(22px,3.5vw,48px)] font-semibold tracking-[-0.03em] text-[#0a0a1a]">
                      {active.title}
                    </h3>
                    <p className="mt-1 text-[13px] font-medium tracking-[-0.005em] text-[#0a0a1a]/50 sm:text-[14px]">
                      {active.tagline}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Cards strip — clean, restrained */}
              <div className="flex items-end gap-3 overflow-hidden pb-1">
                {SERVICES.map((s, i) => {
                  const isActive = i === activeIdx
                  const inner = (
                    <motion.div
                      onClick={() => !isActive && goTo(i)}
                      animate={{
                        width: isActive ? "clamp(180px,22vw,260px)" : "clamp(82px,10vw,108px)",
                        opacity: isActive ? 1 : 0.56,
                      }}
                      whileHover={!isActive ? { y: -3, opacity: 0.85 } : undefined}
                      transition={{
                        width: { duration: 0.5, ease: EASE_OUT },
                        opacity: { duration: 0.4, ease: EASE_OUT },
                        y: { type: "spring", stiffness: 280, damping: 26 },
                      }}
                      style={{ flexShrink: 0 }}
                      className="group/card cursor-pointer"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${SERVICES.length} — ${s.title}`}
                      aria-current={isActive}
                    >
                      <div
                        className="relative overflow-hidden rounded-xl"
                        style={{ aspectRatio: isActive ? "4/5" : "3/5" }}
                      >
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          loading={isActive ? "eager" : "lazy"}
                          priority={isActive}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          style={{ transform: isActive ? "scale(1.0)" : "scale(1.04)" }}
                          sizes="(max-width: 768px) 30vw, 22vw"
                        />

                        {/* Bottom vignette */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

                        {/* Active label */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE_OUT }}
                              className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4"
                            >
                              <div>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55">
                                  {s.number}
                                </p>
                                <p className="mt-0.5 text-[12.5px] font-medium text-white">
                                  {s.title}
                                </p>
                              </div>
                              <span
                                aria-hidden
                                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover/card:bg-[#1852FF]"
                              >
                                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Inactive — number only */}
                        {!isActive && (
                          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3">
                            <span className="text-[10px] font-medium tracking-wider text-white/65">{s.number}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )

                  return isActive ? (
                    <Link
                      key={s.number}
                      href={s.href}
                      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/40"
                      aria-label={`Open ${s.title}`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={s.number}>{inner}</div>
                  )
                })}
              </div>

              {/* Navigation + dots */}
              <div className="mt-5 flex items-center justify-between">
                {/* Pill dots — active fills with progress */}
                <div className="flex items-center gap-1.5">
                  {SERVICES.map((_, i) => {
                    const isActive = i === activeIdx
                    return (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/40"
                        aria-label={`Go to service ${i + 1}`}
                        aria-current={isActive}
                      >
                        <motion.div
                          animate={{
                            width: isActive ? 28 : 6,
                            backgroundColor: isActive ? "rgba(10,10,26,0.10)" : "#0a0a1a44",
                          }}
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                          className="relative h-1.5 overflow-hidden rounded-full"
                        >
                          {isActive && (
                            <span
                              aria-hidden
                              className="absolute inset-y-0 left-0 rounded-full bg-[#1852FF]"
                              style={{
                                width: `${(reducedMotion ? 1 : progress) * 100}%`,
                                transition: isPaused ? "width 0.2s linear" : "none",
                              }}
                            />
                          )}
                        </motion.div>
                      </button>
                    )
                  })}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a0a1a]/12 bg-white/70 text-[#0a0a1a] backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-x-px hover:bg-white hover:shadow-md active:scale-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/40"
                    aria-label="Previous service"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a0a1a]/12 bg-white/70 text-[#0a0a1a] backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:translate-x-px hover:bg-white hover:shadow-md active:scale-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/40"
                    aria-label="Next service"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-5 flex items-center justify-between lg:hidden">
          <p className="text-sm text-[#0a0a1a]/55">Fast, user-friendly digital solutions that drive growth.</p>
          <AnimatedButton />
        </div>
      </div>
    </section>
  )
}
