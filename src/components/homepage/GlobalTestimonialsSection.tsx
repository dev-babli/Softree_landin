"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/* ====================================================================
 *  GlobalTestimonialsSection
 *
 *  Two-panel geographic testimonial carousel:
 *    LEFT  · pill-shaped "globe portal" — spinning earth where the
 *            active testimonial's country lights up + city label
 *    RIGHT · 3D rolodex of blue cards — auto-cycles every 4.4s with
 *            perspective rotateX flips, supports hover-pause, keyboard,
 *            and touch-swipe.
 * ==================================================================== */

interface Testimonial {
  map: keyof typeof mapImages
  city: string
  country: string
  /** % position on the globe (0–100) where the city pin sits */
  pin: { x: number; y: number }
  name: string
  role: string
  image: string
  headline: string
  quote: string
}

const mapImages = {
  UK: "https://osmo.b-cdn.net/website/bandwidth/map-uk.svg",
  SWE: "https://osmo.b-cdn.net/website/bandwidth/map-swe.svg",
  NL: "https://osmo.b-cdn.net/website/bandwidth/map-nl.svg",
  AUS: "https://osmo.b-cdn.net/website/bandwidth/map-aus.svg",
  CA: "https://osmo.b-cdn.net/website/bandwidth/map-ca.svg",
  VNM: "https://osmo.b-cdn.net/website/bandwidth/map-vnm.svg",
} as const

const testimonials: Testimonial[] = [
  {
    map: "CA",
    city: "Toronto",
    country: "Canada",
    pin: { x: 26, y: 38 },
    name: "Aarav Mehta",
    role: "CTO · Fintech Platform",
    image: "https://osmo.b-cdn.net/website/author/victor-work-270x270.avif",
    headline: "Softree helped us move from fragmented workflows to one intelligent operating layer.",
    quote:
      "Their team understood the business logic quickly, rebuilt our internal dashboards, and connected AI automation into the daily workflow without disrupting operations.",
  },
  {
    map: "UK",
    city: "London",
    country: "United Kingdom",
    pin: { x: 49, y: 41 },
    name: "Priya Nair",
    role: "Head of Operations · Healthcare",
    image: "https://osmo.b-cdn.net/website/author/cassie-evans-270x270.avif",
    headline: "The delivery quality was exactly what we needed for a regulated environment.",
    quote:
      "Softree built secure patient-facing workflows, automated reporting, and role-based access with a level of polish our teams could adopt immediately.",
  },
  {
    map: "AUS",
    city: "Sydney",
    country: "Australia",
    pin: { x: 84, y: 76 },
    name: "Daniel Hughes",
    role: "VP Product · SaaS Company",
    image: "https://osmo.b-cdn.net/website/author/by-huy-270x270.avif",
    headline: "They think like product partners, not just an outsourced development team.",
    quote:
      "From architecture to interface detail, Softree brought product judgment, engineering depth, and the ability to ship fast without making the platform fragile.",
  },
  {
    map: "VNM",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    pin: { x: 76, y: 58 },
    name: "Sofia Ramirez",
    role: "Director · Enterprise IT",
    image: "https://osmo.b-cdn.net/website/author/dang-nguyen-270x270.avif",
    headline: "Our Microsoft 365 ecosystem finally feels connected and manageable.",
    quote:
      "They modernized SharePoint, built Power Platform automations, and gave leadership the reporting layer we had been missing for years.",
  },
  {
    map: "SWE",
    city: "Stockholm",
    country: "Sweden",
    pin: { x: 53, y: 32 },
    name: "Marcus Lind",
    role: "COO · Manufacturing Group",
    image: "https://osmo.b-cdn.net/website/author/jesper-landberg-270x270.avif",
    headline: "Softree gave us operational visibility across plants, teams, and systems.",
    quote:
      "The dashboards, automation, and data pipelines reduced manual reporting and helped managers act on real-time information instead of stale spreadsheets.",
  },
  {
    map: "NL",
    city: "Amsterdam",
    country: "Netherlands",
    pin: { x: 51, y: 42 },
    name: "Emily Carter",
    role: "Founder · Digital Commerce",
    image: "https://osmo.b-cdn.net/website/author/jordan-gilroy-270x270.avif",
    headline: "The new platform gave us speed, trust, and a much stronger customer journey.",
    quote:
      "Softree redesigned the frontend, improved performance, and connected analytics and CRM so the business team could finally see what was working.",
  },
]

const CYCLE_MS = 4400

/* ── 3D rolodex transform ─────────────────────────────────────────── */

function getSlideTransform(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total

  if (offset === 0) {
    return {
      opacity: 1,
      zIndex: 6,
      pointerEvents: "auto" as const,
      transform: "translate3d(0, -50%, 0) rotateX(0deg) scale(1)",
      willChange: "transform, opacity",
    }
  }

  const direction = offset > 0 ? 1 : -1
  const distance = Math.min(Math.abs(offset), 3)
  // Softer flip than before (was 44deg) — still reads as a 3D rolodex
  const rotateX = -direction * 30
  const yShift = direction * distance * 7.5
  const zShift = -distance * 5.5
  const opacity = distance === 1 ? 0.42 : 0

  return {
    opacity,
    zIndex: 6 - distance,
    pointerEvents: "none" as const,
    transform: `translate3d(0, calc(-50% + ${yShift}rem), ${zShift}rem) rotateX(${rotateX}deg) scale(${1 - distance * 0.025})`,
    willChange: "transform, opacity",
  }
}

/* ── Component ─────────────────────────────────────────────────────── */

export function GlobalTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0) // 0 → 1
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const isVisibleRef = useRef(false)

  const active = testimonials[activeIndex]

  const advance = useCallback((delta: number) => {
    setActiveIndex((i) => (i + delta + testimonials.length) % testimonials.length)
  }, [])

  /* Track section visibility — only run rAF when on-screen.
   * This is the #1 INP fix: was calling setProgress 60x/sec even
   * when the section was thousands of pixels away from the viewport,
   * blocking the main thread with unnecessary React reconciliation. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { rootMargin: "200px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Auto-cycle with rAF-driven progress; pauses on hover, reduced
   * motion, and when section is off-screen. Progress ring updates
   * throttled to every 3rd frame (~20fps) which is smooth enough
   * for a thin SVG ring but cuts React reconciliation by 3×. */
  useEffect(() => {
    if (isPaused) return
    let raf = 0
    let start = performance.now()
    let frameCount = 0

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)

      // Skip all work when section is off-screen
      if (!isVisibleRef.current) {
        start = now // reset so it doesn't jump when re-entering
        return
      }

      const elapsed = now - start
      const p = Math.min(1, elapsed / CYCLE_MS)

      if (p >= 1) {
        setActiveIndex((i) => (i + 1) % testimonials.length)
        start = now
        setProgress(0)
        frameCount = 0
      } else {
        // Throttle progress updates to every 3rd frame (~20fps)
        frameCount++
        if (frameCount % 3 === 0) {
          setProgress(p)
        }
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isPaused])

  /* Reset progress whenever the slide changes from manual nav */
  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  /* Keyboard navigation when section is in focus */
  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        advance(1)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        advance(-1)
      }
    }
    node.addEventListener("keydown", onKey)
    return () => node.removeEventListener("keydown", onKey)
  }, [advance])

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f2f2f2] px-4 py-20 text-[#191717] sm:px-6 md:py-24 lg:px-8 lg:py-28"
      data-theme-section="light"
      aria-roledescription="carousel"
      aria-label="Customer testimonials from around the world"
    >
      {/* Faint grid texture (kept) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative mx-auto grid w-full max-w-[1420px] items-center gap-6 lg:grid-cols-[0.72fr_1.48fr] xl:gap-8">
        {/* ── LEFT: Globe portal ─────────────────────────────────── */}
        <div className="mx-auto w-full max-w-[430px] lg:max-w-none">
          <div
            className="relative mx-auto flex min-h-[640px] w-full max-w-[430px] flex-col items-center justify-between overflow-hidden rounded-[999px] bg-[#1d1a1a] px-8 py-10 text-center shadow-[0_34px_80px_rgba(0,0,0,0.18)] sm:min-h-[700px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,88,18,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(0,0,0,0.18))]" />

            <p className="relative z-10 text-[13px] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              <span className="text-[#FF5812]">Trusted</span>
              <br />
              Worldwide
            </p>

            {/* Globe disc */}
            <div className="relative z-10 grid aspect-square w-[86%] place-items-center">
              <svg
                viewBox="0 0 380 380"
                fill="none"
                aria-hidden
                className="absolute inset-0 h-full w-full animate-[softree-testimonial-spin_28s_linear_infinite] text-white/22"
              >
                <circle cx="190" cy="190" r="166" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
                <circle cx="190" cy="190" r="184" stroke="currentColor" strokeWidth="9" strokeDasharray="1 10" opacity="0.5" />
              </svg>

              <div className="relative aspect-square w-[80%] overflow-hidden rounded-full bg-[#111] shadow-[inset_0_0_42px_rgba(255,255,255,0.06),0_0_42px_rgba(255,88,18,0.13)]">
                <div className="absolute inset-0 animate-[softree-globe-pan_18s_linear_infinite] rounded-full will-change-transform">
                  <img
                    src="https://osmo.b-cdn.net/website/bandwidth/quote-map-base.avif"
                    alt="Global community map"
                    className="absolute inset-0 h-full w-full rounded-full object-contain opacity-90 brightness-[1.15] contrast-125"
                  />
                  {Object.entries(mapImages).map(([map, src]) => (
                    <img
                      key={map}
                      src={src}
                      alt=""
                      data-testimonial-map={map}
                      className={`absolute inset-0 h-full w-full rounded-full object-contain brightness-[1.25] saturate-150 transition-opacity duration-700 ease-out ${active.map === map ? "opacity-100" : "opacity-0"
                        }`}
                      aria-hidden
                    />
                  ))}

                  {/* Pulsing pin at the active city's centroid */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{
                      left: `${active.pin.x}%`,
                      top: `${active.pin.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="relative grid h-3 w-3 place-items-center">
                      <span className="absolute inline-flex h-full w-full animate-[softree-pin-ping_1.6s_ease-out_infinite] rounded-full bg-[#FF5812]/70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF5812] shadow-[0_0_10px_rgba(255,88,18,0.85)]" />
                    </span>
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_38%_28%,rgba(255,88,18,0.16),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.08),transparent_32%,rgba(0,0,0,0.42)_88%)]" />
              </div>
            </div>

            {/* City + country label (new — makes geography explicit) */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span
                key={active.city}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/65"
                style={{ animation: "softree-fade-in 0.7s ease both" }}
              >
                {active.country}
              </span>
              <span
                key={`${active.city}-name`}
                className="text-[20px] font-medium leading-none tracking-[-0.04em] text-white"
                style={{ animation: "softree-fade-in 0.7s ease 0.05s both" }}
              >
                {active.city}
              </span>
              <p className="mt-3 rotate-[-8deg] font-serif text-[22px] italic leading-[0.9] tracking-[-0.06em] text-[#FF5812]">
                Softree’s Global
                <br />
                Clients
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: 3D rolodex ──────────────────────────────────── */}
        <div
          ref={containerRef}
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-live="polite"
          className="relative min-h-[540px] overflow-hidden rounded-[24px] bg-[#e8e8e8] px-5 py-10 outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/40 sm:px-10 lg:min-h-[600px] lg:px-16 xl:px-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.85),transparent_20%),radial-gradient(circle_at_80%_78%,rgba(255,88,18,0.13),transparent_26%)]" />

          <div className="relative flex h-full min-h-[440px] items-center [perspective:1200px]">
            <div className="relative h-[370px] w-full [transform-style:preserve-3d] sm:h-[400px] lg:h-[420px]">
              {testimonials.map((item, index) => {
                const transformStyle = getSlideTransform(index, activeIndex, testimonials.length)
                const isActive = index === activeIndex

                return (
                  <article
                    key={`${item.map}-${item.name}`}
                    data-slide-map={item.map}
                    aria-hidden={!isActive}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${testimonials.length} — ${item.name}, ${item.country}`}
                    onClick={isActive ? () => advance(1) : undefined}
                    className="absolute left-0 top-1/2 w-full origin-center cursor-pointer rounded-[24px] bg-[radial-gradient(circle_at_18%_12%,rgba(129,212,255,0.42),transparent_30%),linear-gradient(135deg,#0B2DFF_0%,#174CFF_38%,#00A3FF_100%)] p-7 text-white shadow-[0_28px_90px_rgba(0,92,255,0.32)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] sm:p-10 lg:left-8 lg:w-[82%] xl:w-[78%]"
                    style={transformStyle}
                  >
                    {/* Decorative quote glyph in the background — subtle editorial touch */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-3 select-none font-serif text-[170px] leading-none text-white/[0.08]"
                    >
                      “
                    </span>

                    <div className={`relative transition-opacity duration-200 ${isActive ? "opacity-100 delay-150" : "opacity-0"}`}>
                      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                        <div>
                          <h3 className="max-w-[610px] text-[30px] font-medium leading-[0.96] tracking-[-0.07em] sm:text-[42px] lg:text-[48px]">
                            {item.headline}
                          </h3>
                        </div>

                        <div className="flex flex-col justify-between gap-8">
                          <button
                            type="button"
                            aria-label={`Open testimonial from ${item.name}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={(e) => {
                              e.stopPropagation()
                              advance(1)
                            }}
                            className="ml-auto grid size-14 place-items-center rounded-full bg-white text-[#171313] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF5812]"
                          >
                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden>
                              <path d="M6.5 11.25V2.75M6.5 2.75L3.25 6M6.5 2.75L9.75 6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                          <p className="text-[13px] font-medium leading-[1.35] tracking-[-0.035em] text-white/92 sm:text-[14px]">
                            {item.quote}
                          </p>
                        </div>
                      </div>

                      <div className="mt-9 flex items-end gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-14 rounded-full border-4 border-white/80 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="pb-0.5">
                          <p className="rotate-[-8deg] font-serif text-[20px] italic leading-none tracking-[-0.07em] text-white">
                            {item.name}
                          </p>
                          <span className="mt-1 inline-flex bg-[#171313] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Desktop bullet rail with progress ring around active */}
            <div className="absolute right-1 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
              {testimonials.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={`${item.map}-bullet`}
                    type="button"
                    aria-label={`Show testimonial from ${item.name}, ${item.country}`}
                    aria-current={isActive}
                    onClick={() => setActiveIndex(index)}
                    className="group relative grid h-7 w-12 place-items-center focus:outline-none"
                  >
                    {isActive ? (
                      <span className="relative h-5 w-5">
                        <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full -rotate-90">
                          <circle cx="12" cy="12" r="9.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
                          <circle
                            cx="12"
                            cy="12"
                            r="9.5"
                            fill="none"
                            stroke="#FF5812"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 9.5}
                            strokeDashoffset={(1 - progress) * 2 * Math.PI * 9.5}
                            style={{ transition: isPaused ? "stroke-dashoffset 0.2s linear" : "none" }}
                          />
                        </svg>
                        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5812]" />
                      </span>
                    ) : (
                      <span className="h-px w-3 bg-[#bdbdbd] transition-all duration-300 group-hover:w-7 group-hover:bg-[#FF6B00]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile bullet row */}
          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={`${item.map}-mobile-bullet`}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={isActive}
                  onClick={() => setActiveIndex(index)}
                  className="grid h-3 w-3 place-items-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${isActive ? "h-2.5 w-2.5 bg-[#FF5812]" : "h-1.5 w-1.5 bg-[#bdbdbd]"
                      }`}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes softree-testimonial-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes softree-globe-pan {
          0%   { transform: translate3d(-1.6%, 0, 0) scale(1.04); }
          50%  { transform: translate3d( 1.6%, -0.4%, 0) scale(1.04); }
          100% { transform: translate3d(-1.6%, 0, 0) scale(1.04); }
        }
        @keyframes softree-pin-ping {
          0%   { transform: scale(0.8); opacity: 0.85; }
          80%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes softree-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          section :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  )
}

export default GlobalTestimonialsSection
