"use client"

import { useEffect, useState } from "react"

const testimonials = [
  {
    map: "CA",
    name: "Aarav Mehta",
    role: "CTO · Fintech Platform",
    image: "https://osmo.b-cdn.net/website/author/victor-work-270x270.avif",
    headline: "Softree helped us move from fragmented workflows to one intelligent operating layer.",
    quote:
      "Their team understood the business logic quickly, rebuilt our internal dashboards, and connected AI automation into the daily workflow without disrupting operations.",
  },
  {
    map: "UK",
    name: "Priya Nair",
    role: "Head of Operations · Healthcare",
    image: "https://osmo.b-cdn.net/website/author/cassie-evans-270x270.avif",
    headline: "The delivery quality was exactly what we needed for a regulated environment.",
    quote:
      "Softree built secure patient-facing workflows, automated reporting, and role-based access with a level of polish our teams could adopt immediately.",
  },
  {
    map: "AUS",
    name: "Daniel Hughes",
    role: "VP Product · SaaS Company",
    image: "https://osmo.b-cdn.net/website/author/by-huy-270x270.avif",
    headline: "They think like product partners, not just an outsourced development team.",
    quote:
      "From architecture to interface detail, Softree brought product judgment, engineering depth, and the ability to ship fast without making the platform fragile.",
  },
  {
    map: "VNM",
    name: "Sofia Ramirez",
    role: "Director · Enterprise IT",
    image: "https://osmo.b-cdn.net/website/author/dang-nguyen-270x270.avif",
    headline: "Our Microsoft 365 ecosystem finally feels connected and manageable.",
    quote:
      "They modernized SharePoint, built Power Platform automations, and gave leadership the reporting layer we had been missing for years.",
  },
  {
    map: "SWE",
    name: "Marcus Lind",
    role: "COO · Manufacturing Group",
    image: "https://osmo.b-cdn.net/website/author/jesper-landberg-270x270.avif",
    headline: "Softree gave us operational visibility across plants, teams, and systems.",
    quote:
      "The dashboards, automation, and data pipelines reduced manual reporting and helped managers act on real-time information instead of stale spreadsheets.",
  },
  {
    map: "NL",
    name: "Emily Carter",
    role: "Founder · Digital Commerce",
    image: "https://osmo.b-cdn.net/website/author/jordan-gilroy-270x270.avif",
    headline: "The new platform gave us speed, trust, and a much stronger customer journey.",
    quote:
      "Softree redesigned the frontend, improved performance, and connected analytics and CRM so the business team could finally see what was working.",
  },
]

const mapImages: Record<string, string> = {
  UK: "https://osmo.b-cdn.net/website/bandwidth/map-uk.svg",
  SWE: "https://osmo.b-cdn.net/website/bandwidth/map-swe.svg",
  NL: "https://osmo.b-cdn.net/website/bandwidth/map-nl.svg",
  AUS: "https://osmo.b-cdn.net/website/bandwidth/map-aus.svg",
  CA: "https://osmo.b-cdn.net/website/bandwidth/map-ca.svg",
  VNM: "https://osmo.b-cdn.net/website/bandwidth/map-vnm.svg",
}

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

  return {
    opacity: distance === 1 ? 0.44 : 0,
    zIndex: 6 - distance,
    pointerEvents: "none" as const,
    transform: `translate3d(0, calc(-50% + ${direction * distance * 8.25}rem), -${distance * 5.5}rem) rotateX(${-direction * 44}deg) scale(${1 - distance * 0.025})`,
    willChange: "transform, opacity",
  }
}

export function GlobalTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = testimonials[activeIndex]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 4400)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#f2f2f2] px-4 py-16 text-[#191717] sm:px-6 lg:px-8 lg:py-24" data-theme-section="light">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative mx-auto grid w-full max-w-[1420px] items-center gap-6 lg:grid-cols-[0.72fr_1.48fr] xl:gap-8">
        <div className="mx-auto w-full max-w-[430px] lg:max-w-none">
          <div className="relative mx-auto flex min-h-[620px] w-full max-w-[430px] flex-col items-center justify-between overflow-hidden rounded-[999px] bg-[#1d1a1a] px-8 py-10 text-center shadow-[0_34px_80px_rgba(0,0,0,0.18)] sm:min-h-[680px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,88,18,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(0,0,0,0.18))]" />
            <p className="relative z-10 text-[13px] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              <span className="text-[#FF5812]">Trusted</span>
              <br />
              Worldwide
            </p>

            <div className="relative z-10 grid aspect-square w-[86%] place-items-center">
              <svg viewBox="0 0 380 380" fill="none" className="absolute inset-0 h-full w-full animate-[softree-testimonial-spin_28s_linear_infinite] text-white/22">
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
                      className={`absolute inset-0 h-full w-full rounded-full object-contain brightness-[1.25] saturate-150 transition-opacity duration-700 ease-out ${active.map === map ? "opacity-100" : "opacity-0"}`}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_38%_28%,rgba(255,88,18,0.16),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.08),transparent_32%,rgba(0,0,0,0.42)_88%)]" />
              </div>
            </div>

            <p className="relative z-10 rotate-[-8deg] font-serif text-[22px] italic leading-[0.9] tracking-[-0.06em] text-[#FF5812]">
              Softree’s Global
              <br />
              Clients
            </p>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[24px] bg-[#e8e8e8] px-5 py-10 sm:px-10 lg:min-h-[590px] lg:px-16 xl:px-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.85),transparent_20%),radial-gradient(circle_at_80%_78%,rgba(255,88,18,0.13),transparent_26%)]" />

          <div className="relative flex h-full min-h-[430px] items-center [perspective:1200px]">
            <div className="relative h-[360px] w-full [transform-style:preserve-3d] sm:h-[390px] lg:h-[410px]">
              {testimonials.map((item, index) => {
                const transformStyle = getSlideTransform(index, activeIndex, testimonials.length)
                const isActive = index === activeIndex

                return (
                  <article
                    key={`${item.map}-${item.name}`}
                    data-slide-map={item.map}
                    aria-hidden={!isActive}
                    className="absolute left-0 top-1/2 w-full origin-center rounded-[24px] bg-[radial-gradient(circle_at_18%_12%,rgba(129,212,255,0.42),transparent_30%),linear-gradient(135deg,#0B2DFF_0%,#174CFF_38%,#00A3FF_100%)] p-7 text-white shadow-[0_28px_90px_rgba(0,92,255,0.32)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] sm:p-10 lg:left-8 lg:w-[82%] xl:w-[78%]"
                    style={transformStyle}
                  >
                    <div className={`transition-opacity duration-200 ${isActive ? "opacity-100 delay-150" : "opacity-0"}`}>
                      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                        <div>
                          <h3 className="max-w-[610px] text-[30px] font-medium leading-[0.96] tracking-[-0.07em] sm:text-[42px] lg:text-[48px]">
                            {item.headline}
                          </h3>
                        </div>

                        <div className="flex flex-col justify-between gap-8">
                          <button
                            type="button"
                            aria-label="Open testimonial"
                            tabIndex={isActive ? 0 : -1}
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
                        <img src={item.image} alt={item.name} className="size-14 rounded-full border-4 border-white/80 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.2)]" />
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

            <div className="absolute right-1 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex">
              {testimonials.map((item, index) => (
                <button
                  key={`${item.map}-bullet`}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className="group grid h-5 w-10 place-items-end focus:outline-none"
                >
                  <span className={`h-px transition-all duration-300 ${index === activeIndex ? "w-9 bg-[#FF5812]" : "w-3 bg-[#bdbdbd] group-hover:w-6 group-hover:bg-[#FF6B00]"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes softree-testimonial-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes softree-globe-pan {
          0% {
            transform: translate3d(-1.6%, 0, 0) scale(1.04);
          }
          50% {
            transform: translate3d(1.6%, -0.4%, 0) scale(1.04);
          }
          100% {
            transform: translate3d(-1.6%, 0, 0) scale(1.04);
          }
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
