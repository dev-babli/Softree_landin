"use client"

import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Sparkles,
} from "lucide-react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"

type ClientStory = {
  name: string
  role: string
  company: string
  location: string
  quote: string
  outcome: string
  detail: string
  project: string
  portrait: string
  alt: string
  accent: string
}

const CYCLE_MS = 5200

const stories: ClientStory[] = [
  {
    name: "Anika Rao",
    role: "COO",
    company: "Northstar Clinics",
    location: "Toronto",
    quote:
      "Softree rebuilt our intake and reporting flow so teams stopped chasing spreadsheets and started acting on live information.",
    outcome: "42%",
    detail: "fewer manual handoffs",
    project: "Healthcare operations",
    portrait:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2c80b31afe1de228046d3_Testimonial%2001.webp",
    alt: "Client portrait of a woman with curly brown hair wearing a blue and cream sweater.",
    accent: "#8DE1FF",
  },
  {
    name: "Marcus Hale",
    role: "Founder",
    company: "Ledgerline",
    location: "London",
    quote:
      "They gave us a production-ready platform without forcing our team into a long, risky rebuild.",
    outcome: "9 weeks",
    detail: "from audit to launch",
    project: "Fintech platform",
    portrait:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2c80b0df1b09890afd720_Testimonial%2002.webp",
    alt: "Client portrait of a man in thin-framed sunglasses and a striped shirt.",
    accent: "#B6F56A",
  },
  {
    name: "Priya Menon",
    role: "VP Data",
    company: "Kestrel Manufacturing",
    location: "Singapore",
    quote:
      "The reporting layer changed how our managers run the day. Everyone sees the same numbers now.",
    outcome: "Daily",
    detail: "plant visibility",
    project: "Power BI command center",
    portrait:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2c80bdeb7dd03eb9e01fe_Testimonial%2003.webp",
    alt: "Client portrait of a person in a tan cap and light green hoodie.",
    accent: "#FFD15C",
  },
  {
    name: "Sofia Ramirez",
    role: "Product Lead",
    company: "OrbitDesk",
    location: "Amsterdam",
    quote:
      "Softree brought product judgment into every sprint. The interface feels sharper and the back office finally keeps up.",
    outcome: "31%",
    detail: "faster task closure",
    project: "SaaS workflow redesign",
    portrait:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2c80bc3c6f67024959d7c_Testimonial%2004.webp",
    alt: "Client portrait of a woman wearing hoop earrings and a multicolored knit sweater.",
    accent: "#FF8DA1",
  },
  {
    name: "Dev Patel",
    role: "IT Director",
    company: "Helio Retail Group",
    location: "Mumbai",
    quote:
      "Our Microsoft 365 environment went from scattered files and approvals to a system people actually trust.",
    outcome: "18",
    detail: "automated approval flows",
    project: "SharePoint modernization",
    portrait:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2c80b02586068035d4796_Testimonial%2005.webp",
    alt: "Client portrait of a man in a teal shirt holding a black crossbody bag strap.",
    accent: "#6EF3C5",
  },
  {
    name: "Elena Brooks",
    role: "Head of Growth",
    company: "MotiveApps",
    location: "Sydney",
    quote:
      "They understood the commercial goal first, then shipped the site and automation around it.",
    outcome: "2.4x",
    detail: "qualified demo requests",
    project: "Growth site and CRM",
    portrait:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2c80b3b5d3ea44ecf163d_Testimonial%2006.webp",
    alt: "Client portrait of a man with curly blond hair wearing a black beanie and blue sweatshirt.",
    accent: "#A7B7FF",
  },
]

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setPrefersReducedMotion(media.matches)

    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return prefersReducedMotion
}

function wrapIndex(index: number) {
  return (index + stories.length) % stories.length
}

export default function SoftreeClientStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const cycleStartedAt = useRef(Date.now())
  const prefersReducedMotion = usePrefersReducedMotion()
  const activeStory = stories[activeIndex]

  const goToStory = useCallback((index: number) => {
    setActiveIndex(wrapIndex(index))
    setProgress(0)
    cycleStartedAt.current = Date.now()
  }, [])

  const advance = useCallback(
    (delta: number) => {
      setActiveIndex((current) => wrapIndex(current + delta))
      setProgress(0)
      cycleStartedAt.current = Date.now()
    },
    []
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "220px 0px", threshold: 0.18 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return
    }

    const timer = window.setInterval(() => {
      if (!isVisible) {
        cycleStartedAt.current = Date.now()
        return
      }

      const elapsed = Date.now() - cycleStartedAt.current
      const nextProgress = Math.min(1, elapsed / CYCLE_MS)

      if (nextProgress >= 1) {
        advance(1)
        return
      }

      setProgress(nextProgress)
    }, 120)

    return () => window.clearInterval(timer)
  }, [advance, isPaused, isVisible, prefersReducedMotion])

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return
    const distance = event.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(distance) > 44) {
      advance(distance < 0 ? 1 : -1)
    }

    touchStartX.current = null
  }

  const onRailKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      advance(1)
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      advance(-1)
    }
  }

  const railStyle = {
    "--active-index": activeIndex,
    transform:
      "translate3d(calc(var(--active-index) * -1 * (var(--story-card-width) + var(--story-card-gap))), 0, 0)",
  } as CSSProperties

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#07070b] py-24 text-white sm:py-28 lg:py-32"
      data-theme-section="dark"
      aria-roledescription="carousel"
      aria-label="Softree client stories"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-16 h-[38rem] w-[54rem] -rotate-12 bg-[linear-gradient(90deg,transparent,rgba(141,225,255,0.08),transparent)] blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-[1460px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B6F56A] shadow-[0_0_18px_rgba(182,245,106,0.75)]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                TESTIMONIAL
              </span>
            </div>
            <h2 className="max-w-3xl text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-white">
              Client stories
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/28 to-white/5" />
            <p className="max-w-xl text-pretty text-base leading-7 text-white/66 lg:text-right">
              A darker, cinematic story rail paired with the clean trust-building
              structure of a shadcn testimonial block. Each card connects a
              business result to the people who worked with Softree.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-8">
          <aside className="relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-7 lg:min-h-[620px]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_34%,rgba(182,245,106,0.05))]"
            />

            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                    Story
                  </p>
                  <p className="mt-2 font-mono text-sm text-white/82">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(stories.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Previous story"
                    aria-label="Previous client story"
                    onClick={() => advance(-1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6F56A]/60"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    title="Next story"
                    aria-label="Next client story"
                    onClick={() => advance(1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6F56A]/60"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    aria-label={
                      isPaused
                        ? "Resume client stories autoplay"
                        : "Pause client stories autoplay"
                    }
                    onClick={() => setIsPaused((value) => !value)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white text-[#07070b] transition hover:-translate-y-0.5 hover:bg-[#B6F56A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6F56A]/60"
                  >
                    {isPaused ? (
                      <Play className="h-4 w-4" strokeWidth={1.9} />
                    ) : (
                      <Pause className="h-4 w-4" strokeWidth={1.9} />
                    )}
                  </button>
                </div>
              </div>

              <div aria-live="polite">
                <Quote className="mb-7 h-9 w-9 text-[#B6F56A]" strokeWidth={1.5} />
                <blockquote
                  key={activeStory.name}
                  className="animate-[softree-story-quote_520ms_cubic-bezier(0.22,1,0.36,1)_both]"
                >
                  <p className="text-pretty text-[clamp(1.65rem,4vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
                    {activeStory.quote}
                  </p>
                </blockquote>
              </div>

              <div>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                    <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      {activeStory.outcome}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/52">
                      {activeStory.detail}
                    </p>
                  </div>
                  <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold text-white">
                      {activeStory.project}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/52">
                      Delivery focus
                    </p>
                  </div>
                  <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold text-white">
                      {activeStory.location}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/52">
                      Client location
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#B6F56A] transition-[width] duration-150 ease-linear"
                    style={{
                      width:
                        prefersReducedMotion || isPaused
                          ? "0%"
                          : `${Math.round(progress * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-white/55">
                <Sparkles className="h-4 w-4 text-[#B6F56A]" strokeWidth={1.6} />
                <span>Drag, use arrow keys, or choose a client.</span>
              </div>
              <div className="flex gap-2" aria-label="Choose client story">
                {stories.map((story, index) => {
                  const isActive = index === activeIndex

                  return (
                    <button
                      key={story.name}
                      type="button"
                      aria-label={`Show story from ${story.name}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goToStory(index)}
                      className="group grid h-8 w-8 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6F56A]/60"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-6 bg-[#B6F56A]"
                            : "w-1.5 bg-white/28 group-hover:w-4 group-hover:bg-white/58"
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              tabIndex={0}
              onKeyDown={onRailKeyDown}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.035] p-3 outline-none focus-visible:ring-2 focus-visible:ring-[#B6F56A]/60 sm:p-4 [--story-card-gap:1rem] [--story-card-width:min(82vw,430px)] sm:[--story-card-gap:1.25rem]"
            >
              <div
                className="flex gap-[var(--story-card-gap)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={railStyle}
              >
                {stories.map((story, index) => {
                  const isActive = index === activeIndex

                  return (
                    <article
                      key={story.name}
                      aria-hidden={!isActive}
                      aria-label={`${story.name}, ${story.role} at ${story.company}`}
                      className={`group relative w-[var(--story-card-width)] shrink-0 overflow-hidden rounded-[8px] border transition-all duration-700 ${
                        isActive
                          ? "border-white/28 opacity-100 shadow-[0_32px_90px_rgba(0,0,0,0.42)]"
                          : "border-white/10 opacity-54"
                      }`}
                      style={{
                        transform: isActive
                          ? "translateY(0) scale(1)"
                          : "translateY(1.25rem) scale(0.965)",
                      }}
                    >
                      <div className="relative aspect-[0.76] min-h-[560px] overflow-hidden bg-[#111118]">
                        <Image
                          src={story.portrait}
                          alt={story.alt}
                          fill
                          sizes="(min-width: 1024px) 430px, 82vw"
                          className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.92) 100%), radial-gradient(circle at 72% 18%, ${story.accent}33, transparent 28%)`,
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-1/2 translate-y-full bg-gradient-to-t from-white/18 to-transparent opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100"
                        />

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <div className="mb-4 flex items-center justify-between gap-4">
                            <span className="rounded-full border border-white/18 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/76 backdrop-blur">
                              {story.project}
                            </span>
                            <span className="font-mono text-[11px] text-white/54">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <p className="text-pretty text-xl font-medium leading-[1.08] tracking-[-0.035em] text-white sm:text-2xl">
                            {story.quote}
                          </p>

                          <div className="my-5 h-px w-full bg-white/18" />

                          <div className="flex items-end justify-between gap-5">
                            <div>
                              <h3 className="text-base font-semibold tracking-[-0.025em] text-white">
                                {story.name}
                              </h3>
                              <p className="mt-1 text-xs leading-5 text-white/58">
                                {story.role}, {story.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                                {story.outcome}
                              </p>
                              <p className="mt-1 text-[11px] text-white/48">
                                {story.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes softree-story-quote {
          from {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  )
}
