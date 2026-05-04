"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

const TESTIMONIALS = [
  {
    company: "Fintech Operations",
    quote:
      "Softree rebuilt our reporting stack, automated approvals, and gave leadership one clean operating view. We moved faster without adding process debt.",
    name: "Aarav Mehta",
    role: "CTO · Fintech Platform",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&q=85",
    readMoreHref: "/case-studies",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=800&fit=crop&q=85",
    altText: "Modern enterprise team at work",
    service: "AI automation",
    metric: "64% faster reporting",
  },
  {
    company: "Healthcare Systems",
    quote:
      "The delivery felt enterprise-ready from day one. Secure workflows, role-based access, and polished interfaces our teams could adopt immediately.",
    name: "Priya Nair",
    role: "Head of Operations · Healthcare",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&q=85",
    readMoreHref: "/case-studies",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&h=800&fit=crop&q=85",
    altText: "AI data visualization",
    service: "Secure portals",
    metric: "Zero-disruption rollout",
  },
  {
    company: "Microsoft 365 Delivery",
    quote:
      "Softree connected SharePoint, Power Platform, and analytics into one manageable ecosystem. The difference was visible in the first sprint.",
    name: "Sofia Ramirez",
    role: "Director · Enterprise IT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&q=85",
    readMoreHref: "/case-studies",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=800&fit=crop&q=85",
    altText: "Financial technology dashboard",
    service: "Power Platform",
    metric: "3 weeks to adoption",
  },
]

// ─── RESTING shapes — seam runs from 45% at top to 55% at bottom ──────────────
// Left card fills the left half; right card fills the right half.
const L_CLIP = "polygon(45% 0%, 0% 0%, 0% 100%, 55% 100%)"
const R_CLIP = "polygon(100% 0%, 45% 0%, 55% 100%, 100% 100%)"

// ─── CLOSED shapes — thin rectangles at each edge ─────────────────────────────
// Right card collapses to a rectangle on the far-right.
// Top-left corner starts at 92%, bottom-left at 92% → perfectly vertical edge.
// On open: top-left swings to 45% (long arc), bottom-left to 55% (shorter) = compass.
const R_CLIP_CLOSED = "polygon(100% 0%, 92% 0%, 92% 100%, 100% 100%)"
// Left card collapses to a rectangle on the far-left.
// Bottom-right at 8%, top-right at 8% → vertical edge.
// On open: bottom-right swings to 55% (long), top-right to 45% (shorter) = mirror compass.
const L_CLIP_CLOSED = "polygon(8%  0%, 0% 0%, 0% 100%, 8%  100%)"

// ─── Easing ───────────────────────────────────────────────────────────────────
const ENTER_EASE = "cubic-bezier(0.16, 1, 0.3, 1)"
const OUT_EASE = "cubic-bezier(0.55, 0, 0.85, 0.05)"

const EXIT_MS = 480
const SETTLE = 30
const WIPE_MS = 1150

export default function TestimonialsSection() {
  const n = TESTIMONIALS.length
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const activeRef = useRef(0)

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

  const leftClip = (enterDelay = "0ms"): React.CSSProperties => ({
    clipPath: isIn ? L_CLIP : L_CLIP_CLOSED,
    transition: isIn
      ? `clip-path ${WIPE_MS}ms ${ENTER_EASE} ${enterDelay}`
      : `clip-path ${EXIT_MS}ms ${OUT_EASE}`,
  })

  const rightClip = (enterDelay = "100ms"): React.CSSProperties => ({
    clipPath: isIn ? R_CLIP : R_CLIP_CLOSED,
    transition: isIn
      ? `clip-path ${WIPE_MS}ms ${ENTER_EASE} ${enterDelay}`
      : `clip-path ${EXIT_MS}ms ${OUT_EASE}`,
  })

  const row = (enterDelay: string): React.CSSProperties => ({
    opacity: isIn ? 1 : 0,
    transform: isIn ? "translateY(0px)" : "translateY(14px)",
    transition: isIn
      ? `opacity 700ms ease-out ${enterDelay}, transform 800ms ${ENTER_EASE} ${enterDelay}`
      : `opacity 100ms ease-in, transform 100ms ease-in`,
  })

  return (
    <section className="relative w-full overflow-hidden px-4 lg:px-10 pt-16 md:pt-24 pb-12 md:pb-20 text-black bg-[#f4f5f7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(255,88,18,0.10),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(0,92,255,0.12),transparent_30%)]" />

      <svg tabIndex={-1} aria-hidden className="pointer-events-none invisible absolute" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="softree-rounded" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="rounded" />
            <feComposite in="SourceGraphic" in2="rounded" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto w-full max-w-[1240px]">
        <div className="flex-col items-center block">

          {/* ── Header ── */}
          <div className="flex w-full flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff5812]/20 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff5812] shadow-[0_10px_30px_rgba(15,15,15,0.05)]">
                <span className="size-1.5 rounded-full bg-[#ff5812]" />
                Client outcomes
              </div>
              <h2 className="max-w-[720px] text-3xl font-medium leading-[0.98] tracking-[-0.055em] text-[#0f0f0f] sm:text-5xl lg:text-[64px]">
                Built for teams that need software to perform, not just launch.
              </h2>
            </div>
            <div className="mb-2 flex gap-x-3">
              <button aria-label="Previous" type="button" onClick={prev}
                className="group inline-grid size-11 place-items-center rounded-full border border-black/10 bg-white shadow-[0_10px_26px_rgba(15,15,15,0.08)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-1 focus-visible:outline focus-visible:outline-orange-500">
                <span className="flex items-center text-[#1a1a1a]"><FiArrowLeft className="text-xl" /></span>
              </button>
              <button aria-label="Next" type="button" onClick={next}
                className="group inline-grid size-11 place-items-center rounded-full bg-[#111] text-white shadow-[0_14px_30px_rgba(15,15,15,0.18)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-1 focus-visible:outline focus-visible:outline-orange-500">
                <span className="flex items-center"><FiArrowRight className="text-xl" /></span>
              </button>
            </div>
          </div>

          {/* ── Cards ── */}
          <div className="mb-5 flex-grow justify-center lg:mb-10 block">
            <div className="w-full">
              <div className="flex h-full w-full flex-col gap-y-4">

                {/* ══════════ DESKTOP ══════════ */}
                {/* No h-full here — let aspect-ratio define the height intrinsically */}
                <div className="relative hidden w-full lg:block lg:max-h-[750px] xl:max-h-[540px] aspect-[2274/1120]">

                  {/* RIGHT — behind the left card */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ filter: "url(#softree-rounded)" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[28px] bg-[#111]"
                      style={rightClip("100ms")}
                    >
                      <img
                        key={t.image}
                        alt={t.altText}
                        src={t.image}
                        className="absolute inset-0 h-full w-full scale-105 object-cover object-center transition-transform duration-[1400ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.10),rgba(0,0,0,0.42)),radial-gradient(circle_at_70%_32%,rgba(255,88,18,0.18),transparent_28%)]" />
                      <div className="absolute bottom-7 right-7 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-right text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Impact</p>
                        <p className="mt-1 text-lg font-semibold tracking-[-0.04em]">{t.metric}</p>
                      </div>
                    </div>
                  </div>

                  {/* LEFT — dark 1px border */}
                  <div
                    className="absolute inset-0"
                    style={{ filter: "url(#softree-rounded)" }}
                  >
                    <div
                      className="absolute inset-0 rounded-[28px] bg-[#0f0f0f]"
                      style={leftClip("0ms")}
                    />
                  </div>

                  {/* LEFT — white content */}
                  <div
                    className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px]"
                    style={{ filter: "url(#softree-rounded)" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#ffffff_0%,#f8f8f8_58%,#eef3ff_100%)] p-8 text-[#0f0f0f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)]"
                      style={leftClip("0ms")}
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#ff5812]/10 blur-3xl" />
                      <div className="w-5/12 h-full flex flex-col relative z-10">

                        <div style={row("0.50s")} className="mb-5">
                          <span className="inline-flex rounded-full bg-[#111] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                            {t.service}
                          </span>
                        </div>

                        <div style={row("0.58s")} className="mb-7">
                          <span className="text-3xl font-semibold font-sans tracking-[-0.05em] text-[#0f0f0f]">
                            {t.company}
                          </span>
                        </div>

                        <div style={row("0.68s")} className="mb-7 lg:mb-12">
                          <h3 className="text-xl lg:text-[25px] font-sans font-medium leading-[1.22] tracking-[-0.035em] text-[#0f0f0f]">
                            &ldquo;{t.quote}&rdquo;
                          </h3>
                        </div>

                        <div style={row("0.84s")} className="flex items-center gap-3">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-[#ff5812]/20"
                          />
                          <div>
                            <p className="text-base font-sans font-semibold text-[#0f0f0f]">{t.name}</p>
                            <p className="text-sm font-sans text-[#3d3d3d]">{t.role}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                {/* ══════════ MOBILE ══════════ */}
                <div className="relative flex h-full w-full lg:hidden aspect-[989/4500] max-h-[2300px]">

                  {/* Dark border */}
                  <div
                    className="h-[78%] w-full rounded-[20px] absolute left-0 top-0"
                    style={{ filter: "url(#softree-rounded)" }}
                  >
                    <div className="w-full rounded-xl h-full bg-[#0f0f0f] [clip-path:polygon(100%_0,0%_0,0%_100%,100%_100%)]" />
                  </div>

                  {/* White content */}
                  <div
                    className="h-[78%] w-full rounded-[20px] absolute top-[1px] left-[1px]"
                    style={{
                      filter: "url(#softree-rounded)",
                      opacity: isIn ? 1 : 0,
                      transition: isIn ? "opacity 500ms ease-out 100ms" : `opacity ${EXIT_MS}ms ease-in`,
                    }}
                  >
                    <div className="rounded-xl p-6 h-[calc(100%-2px)] w-[calc(100%-2px)] overflow-hidden bg-[linear-gradient(145deg,#ffffff_0%,#f8f8f8_58%,#eef3ff_100%)] text-[#0f0f0f] [clip-path:polygon(100%_0,0%_0,0%_100%,100%_100%)]">
                      <div className="flex h-full flex-col relative">
                        <div style={row("0.08s")} className="mb-4">
                          <span className="inline-flex rounded-full bg-[#111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                            {t.service}
                          </span>
                        </div>
                        <div style={row("0.12s")} className="mb-5">
                          <span className="text-2xl font-semibold font-sans tracking-[-0.05em]">{t.company}</span>
                        </div>
                        <div style={row("0.26s")} className="mb-5">
                          <h3 className="text-lg font-sans font-medium leading-[1.28] tracking-[-0.03em]">&ldquo;{t.quote}&rdquo;</h3>
                        </div>
                        <div style={row("0.38s")} className="flex items-center gap-2 mt-auto pt-2">
                          <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-[#ff5812]/20" />
                          <div>
                            <p className="text-sm font-sans font-medium text-[#0f0f0f]">{t.name}</p>
                            <p className="text-xs font-sans text-[#3d3d3d]">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    className="absolute bottom-0 h-[20%] w-full rounded-[20px] pointer-events-none"
                    style={{
                      filter: "url(#softree-rounded)",
                      opacity: isIn ? 1 : 0,
                      transition: isIn ? "opacity 500ms ease-out 200ms" : `opacity ${EXIT_MS}ms ease-in`,
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#111] [clip-path:polygon(100%_0,0%_0,0%_100%,100%_100%)]">
                      <img key={t.image} alt={t.altText} src={t.image} className="h-full w-full object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-xl border border-white/15 bg-black/45 px-3 py-2 text-white backdrop-blur-md">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60">Impact</p>
                        <p className="text-sm font-semibold tracking-[-0.03em]">{t.metric}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div className="flex items-center justify-center mt-2">
            <div className="relative w-[320px] sm:w-[550px]">
              <div className="relative h-[3px]">
                <div
                  className="absolute h-full opacity-[0.15] rounded-full bg-[#0f0f0f] transition-all duration-500 ease-in-out"
                  style={{ left: 0, width: `${(active / n) * 100}%` }}
                />
                <div
                  className="absolute h-full opacity-[0.15] rounded-full bg-[#0f0f0f] transition-all duration-500 ease-in-out"
                  style={{ left: `${((active + 1) / n) * 100}%`, right: 0 }}
                />
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-[#ff5812] via-[#174cff] to-[#00a3ff] transition-all duration-500 ease-in-out"
                  style={{ left: `${(active / n) * 100}%`, width: `${(1 / n) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
