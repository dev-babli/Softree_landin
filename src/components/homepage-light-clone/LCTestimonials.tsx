"use client"

/**
 * LCTestimonials — light clone of brilliance/testimonials-section.
 * Re-themed: cream canvas, ink dark side stays for image contrast, ink
 * progress bar replaces orange-violet-blue gradient with flame→sunshine.
 * Clip-path/wipe mechanics preserved.
 */

import { useState, useEffect, useRef, useCallback } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { color } from "./tokens"

const TESTIMONIALS = [
  { company: "TechFlow", quote: "Softree has revolutionized how we handle enterprise workflows. The automation saves us hours every week and eliminates errors completely.",
    name: "Sarah Chen", role: "VP Operations at TechFlow",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&q=85",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=800&fit=crop&q=85",
    altText: "Modern enterprise team at work" },
  { company: "Exponent", quote: "In just a few weeks, Softree transformed our fragmented data into actionable insights. The agentic AI layer is unlike anything else we've seen.",
    name: "Jamie Marshall", role: "Co-founder at Exponent",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&q=85",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&h=800&fit=crop&q=85",
    altText: "AI data visualization" },
  { company: "InnovateCorp", quote: "The AI-driven billing automation is a game-changer. What used to take our team three days now happens automatically with perfect accuracy.",
    name: "Marcus Rodriguez", role: "Finance Director at InnovateCorp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&q=85",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=800&fit=crop&q=85",
    altText: "Financial technology dashboard" },
]

const L_CLIP        = "polygon(45% 0%, 0% 0%, 0% 100%, 55% 100%)"
const R_CLIP        = "polygon(100% 0%, 45% 0%, 55% 100%, 100% 100%)"
const R_CLIP_CLOSED = "polygon(100% 0%, 92% 0%, 92% 100%, 100% 100%)"
const L_CLIP_CLOSED = "polygon(8%  0%, 0% 0%, 0% 100%, 8%  100%)"

const ENTER_EASE = "cubic-bezier(0.16, 1, 0.3, 1)"
const OUT_EASE   = "cubic-bezier(0.55, 0, 0.85, 0.05)"

const EXIT_MS = 480
const SETTLE  = 30
const WIPE_MS = 1150

export function LCTestimonials() {
  const n = TESTIMONIALS.length
  const [active, setActive] = useState(0)
  const [phase,  setPhase]  = useState<"in" | "out">("in")
  const activeRef           = useRef(0)

  const navigate = useCallback((index: number) => {
    setPhase("out")
    setTimeout(() => {
      activeRef.current = index
      setActive(index)
      setTimeout(() => setPhase("in"), SETTLE)
    }, EXIT_MS)
  }, [])

  const prev = () => navigate((activeRef.current - 1 + n) % n)
  const next = () => navigate((activeRef.current + 1) % n)

  useEffect(() => {
    const id = setInterval(() => navigate((activeRef.current + 1) % n), 11000)
    return () => clearInterval(id)
  }, [n, navigate])

  const t = TESTIMONIALS[active]
  const isIn = phase === "in"

  const leftClip = (delay = "0ms"): React.CSSProperties => ({
    clipPath: isIn ? L_CLIP : L_CLIP_CLOSED,
    transition: isIn ? `clip-path ${WIPE_MS}ms ${ENTER_EASE} ${delay}` : `clip-path ${EXIT_MS}ms ${OUT_EASE}`,
  })

  const rightClip = (delay = "100ms"): React.CSSProperties => ({
    clipPath: isIn ? R_CLIP : R_CLIP_CLOSED,
    transition: isIn ? `clip-path ${WIPE_MS}ms ${ENTER_EASE} ${delay}` : `clip-path ${EXIT_MS}ms ${OUT_EASE}`,
  })

  const row = (delay: string): React.CSSProperties => ({
    opacity  : isIn ? 1 : 0,
    transform: isIn ? "translateY(0px)" : "translateY(14px)",
    transition: isIn ? `opacity 700ms ease-out ${delay}, transform 800ms ${ENTER_EASE} ${delay}` : `opacity 100ms ease-in, transform 100ms ease-in`,
  })

  return (
    <section className="relative w-full px-4 lg:px-10 pt-16 md:pt-24 pb-12 md:pb-20" style={{ background: color.canvas, color: color.ink }}>
      <svg tabIndex={-1} aria-hidden className="pointer-events-none invisible absolute" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="lc-softree-rounded" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="rounded" />
            <feComposite in="SourceGraphic" in2="rounded" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto w-full max-w-[1240px]">
        <div className="flex-col items-center block">
          <div className="flex w-full items-end justify-between pb-10">
            <h2 className="text-2xl lg:text-[32px] font-medium max-w-72 sm:max-w-[550px] leading-tight" style={{ color: color.ink }}>
              Why leading teams trust Softree
            </h2>
            <div className="mb-2 flex gap-x-5">
              <button aria-label="Previous" type="button" onClick={prev} className="group inline-block rounded-sm" style={{ color: color.ink }}>
                <FiArrowLeft className="text-xl sm:text-2xl" />
              </button>
              <button aria-label="Next" type="button" onClick={next} className="group inline-block rounded-sm" style={{ color: color.ink }}>
                <FiArrowRight className="text-xl sm:text-2xl" />
              </button>
            </div>
          </div>

          <div className="mb-5 flex-grow justify-center lg:mb-10 block">
            <div className="w-full">
              <div className="flex h-full w-full flex-col gap-y-4">
                {/* DESKTOP */}
                <div className="relative hidden w-full lg:block lg:max-h-[750px] xl:max-h-[540px] aspect-[2274/1120]">
                  {/* RIGHT image card */}
                  <div className="absolute inset-0 pointer-events-none" style={{ filter: "url(#lc-softree-rounded)" }}>
                    <div className="absolute inset-0 overflow-hidden rounded-xl" style={{ ...rightClip("100ms"), background: color.ink }}>
                      <img key={t.image} alt={t.altText} src={t.image} className="absolute inset-0 h-full w-full object-cover object-center" />
                    </div>
                  </div>
                  {/* LEFT outer (taupe border via golden shadow) */}
                  <div className="absolute inset-0" style={{ filter: "url(#lc-softree-rounded)" }}>
                    <div className="absolute inset-0 rounded-xl" style={{ ...leftClip("0ms"), background: color.dustTaupe }} />
                  </div>
                  {/* LEFT inner cream content */}
                  <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]" style={{ filter: "url(#lc-softree-rounded)" }}>
                    <div className="absolute inset-0 rounded-xl p-8 overflow-hidden" style={{ ...leftClip("0ms"), background: color.lifted, color: color.ink }}>
                      <div className="w-5/12 h-full flex flex-col">
                        <div style={row("0.50s")} className="mb-7">
                          <span className="text-2xl font-bold tracking-tight" style={{ color: color.ink }}>{t.company}</span>
                        </div>
                        <div style={row("0.68s")} className="mb-7 lg:mb-12">
                          <h3 className="text-xl lg:text-[22px] font-medium leading-relaxed" style={{ color: color.ink }}>
                            &ldquo;{t.quote}&rdquo;
                          </h3>
                        </div>
                        <div style={row("0.84s")} className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                          <div>
                            <p className="text-base font-medium" style={{ color: color.ink }}>{t.name}</p>
                            <p className="text-sm" style={{ color: color.slate }}>{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MOBILE */}
                <div className="relative flex h-full w-full lg:hidden aspect-[989/4500] max-h-[2300px]">
                  <div className="h-[78%] w-full rounded-[20px] absolute left-0 top-0" style={{ filter: "url(#lc-softree-rounded)" }}>
                    <div className="w-full rounded-xl h-full [clip-path:polygon(100%_0,0%_0,0%_100%,100%_100%)]" style={{ background: color.dustTaupe }} />
                  </div>
                  <div className="h-[78%] w-full rounded-[20px] absolute top-[1px] left-[1px]" style={{
                    filter: "url(#lc-softree-rounded)",
                    opacity: isIn ? 1 : 0,
                    transition: isIn ? "opacity 500ms ease-out 100ms" : `opacity ${EXIT_MS}ms ease-in`,
                  }}>
                    <div className="rounded-xl p-6 h-[calc(100%-2px)] w-[calc(100%-2px)] overflow-hidden [clip-path:polygon(100%_0,0%_0,0%_100%,100%_100%)]" style={{ background: color.lifted, color: color.ink }}>
                      <div className="flex h-full flex-col">
                        <div style={row("0.12s")} className="mb-5">
                          <span className="text-xl font-bold tracking-tight">{t.company}</span>
                        </div>
                        <div style={row("0.26s")} className="mb-5">
                          <h3 className="text-lg font-medium leading-relaxed">&ldquo;{t.quote}&rdquo;</h3>
                        </div>
                        <div style={row("0.38s")} className="flex items-center gap-2 mt-auto pt-2">
                          <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <div>
                            <p className="text-sm font-medium" style={{ color: color.ink }}>{t.name}</p>
                            <p className="text-xs" style={{ color: color.slate }}>{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 h-[20%] w-full rounded-[20px] pointer-events-none" style={{
                    filter: "url(#lc-softree-rounded)",
                    opacity: isIn ? 1 : 0,
                    transition: isIn ? "opacity 500ms ease-out 200ms" : `opacity ${EXIT_MS}ms ease-in`,
                  }}>
                    <div className="h-full w-full overflow-hidden rounded-xl [clip-path:polygon(100%_0,0%_0,0%_100%,100%_100%)]" style={{ background: color.ink }}>
                      <img key={t.image} alt={t.altText} src={t.image} className="h-full w-full object-cover object-center" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar — flame → sunshine instead of orange-violet-blue */}
          <div className="flex items-center justify-center mt-2">
            <div className="relative w-[320px] sm:w-[550px]">
              <div className="relative h-[3px]">
                <div className="absolute h-full opacity-[0.18] rounded-full transition-all duration-500 ease-in-out" style={{ left: 0, width: `${(active / n) * 100}%`, background: color.ink }} />
                <div className="absolute h-full opacity-[0.18] rounded-full transition-all duration-500 ease-in-out" style={{ left: `${((active + 1) / n) * 100}%`, right: 0, background: color.ink }} />
                <div className="absolute h-full rounded-full transition-all duration-500 ease-in-out" style={{
                  left: `${(active / n) * 100}%`,
                  width: `${(1 / n) * 100}%`,
                  background: `linear-gradient(90deg, ${color.flame}, ${color.sunshine})`,
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCTestimonials
