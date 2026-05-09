"use client"

import { useRef, useState, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

/* ================================================================== */
/*  DATA                                                              */
/* ================================================================== */

type CodeCard = {
  id: string
  label: string
  title: string
  accent: string
  glow: string
  lines: string[]
  offsetY: number
}

const CARDS: CodeCard[] = [
  {
    id: "intro",
    label: "Softree.Delivery",
    title: "From ambiguous problem to shipped software in four clean moves.",
    accent: "#c792ea",
    glow: "rgba(199,146,234,0.18)",
    lines: [],
    offsetY: -140,
  },
  {
    id: "discover",
    label: "01 · Discover",
    title: "Map the real problem before writing a single line of code.",
    accent: "#82aaff",
    glow: "rgba(130,170,255,0.18)",
    lines: [
      "→ Outcome workshop with stakeholders",
      "→ Technical + data audit",
      "→ User journey + friction map",
      "→ Success metrics agreed upfront",
      "→ Fixed-scope pilot proposal",
      "",
      "deliverable: outcome roadmap",
      "timebox: 5 business days",
    ],
    offsetY: 160,
  },
  {
    id: "design",
    label: "02 · Design",
    title: "Prototype the experience until the team can feel it.",
    accent: "#c3e88d",
    glow: "rgba(195,232,141,0.18)",
    lines: [
      "→ Interactive prototype in Figma",
      "→ System architecture + data model",
      "→ Security + compliance review",
      "→ Stakeholder sign-off session",
      "→ Cut scope, not quality",
      "",
      "deliverable: clickable prototype",
      "timebox: 7 business days",
    ],
    offsetY: -120,
  },
  {
    id: "build",
    label: "03 · Build & Scale",
    title: "Ship a working pilot in three weeks. Then scale it.",
    accent: "#ffcb6b",
    glow: "rgba(255,203,107,0.18)",
    lines: [
      "→ Weekly demo + retro with client",
      "→ Working software, not slide decks",
      "→ Senior engineers, never juniors",
      "→ CI/CD + monitoring from day one",
      "→ Handover playbook on delivery",
      "→ Scale plan for quarters 2-4",
      "",
      "deliverable: live pilot in prod",
      "timebox: 3 weeks to first ship",
    ],
    offsetY: 180,
  },
]

/* ================================================================== */
/*  TYPING REVEAL COMPONENT                                           */
/* ================================================================== */

const TypingLines = memo(function TypingLines({
  lines,
  active,
  accent,
}: {
  lines: string[]
  active: boolean
  accent: string
}) {
  if (lines.length === 0) return null

  return (
    <div className="flex flex-col gap-2.5">
      {lines.map((line, li) => {
        const trimmed = line.trim()
        if (trimmed === "") return <div key={li} className="h-1.5" />

        const isBullet = trimmed.startsWith("→")
        const isMeta = trimmed.includes(":") && !isBullet
        const body = isBullet ? trimmed.replace(/^→\s*/, "") : trimmed

        return (
          <div
            key={li}
            className="flex items-start gap-3"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(0.22,1,0.36,1)",
              transitionDelay: active ? `${li * 90}ms` : "0ms",
            }}
          >
            {isBullet ? (
              <span
                className="mt-[7px] inline-block size-1.5 shrink-0 rounded-full"
                style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
              />
            ) : null}
            <p
              className={
                isMeta
                  ? "font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
                  : "text-[13.5px] font-medium leading-[1.5] text-white/88 sm:text-[14px]"
              }
              style={{
                fontFamily: isMeta ? undefined : "Outfit, sans-serif",
              }}
            >
              {body.split("").map((char, ci) => (
                <span
                  key={`${li}-${ci}`}
                  className="inline-block"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 240ms ease-out, transform 240ms ease-out",
                    transitionDelay: active ? `${li * 90 + ci * 6}ms` : "0ms",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>
          </div>
        )
      })}
    </div>
  )
})

/* ================================================================== */
/*  SINGLE CARD                                                       */
/* ================================================================== */

const PathCard = memo(function PathCard({
  card,
  index,
  active,
}: {
  card: CodeCard
  index: number
  active: boolean
}) {
  const isIntro = card.lines.length === 0
  const stepNumber = index === 0 ? "" : String(index).padStart(2, "0")

  return (
    <div
      className="path-card relative flex-shrink-0"
      style={{
        width: "clamp(320px, 32vw, 440px)",
        transform: `translateY(${card.offsetY}px) translateZ(0)`,
      }}
      data-card-index={index}
    >
      {/* Outer glow backdrop (stronger when active) */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[36px] transition-opacity duration-700"
        style={{
          background: `radial-gradient(460px circle at 50% 50%, ${card.glow}, transparent 70%)`,
          opacity: active ? 0.75 : 0,
        }}
      />

      {/* Card shell */}
      <div
        className="relative overflow-hidden rounded-[26px] border border-white/[0.08] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
        style={{
          // Layered grainient: directional color wash → diagonal accent sweep → deep base
          background: `
            radial-gradient(120% 80% at 0% 0%, ${card.accent}22, transparent 55%),
            radial-gradient(100% 70% at 100% 100%, ${card.accent}18, transparent 50%),
            linear-gradient(155deg, #14161f 0%, #0b0d14 55%, #06070b 100%)
          `,
        }}
      >
        {/* GRAINIENT NOISE OVERLAY — subtle film grain for "grainient" feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
            backgroundSize: "160px 160px",
          }}
        />

        {/* Conic accent aura top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full blur-3xl transition-opacity duration-700"
          style={{ background: card.accent + "33", opacity: active ? 0.9 : 0.5 }}
        />

        {/* Top rim highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${card.accent}66 50%, transparent 100%)`,
          }}
        />

        {/* Huge step-number watermark */}
        {stepNumber ? (
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-4 -right-3 select-none font-black leading-none tracking-[-0.08em]"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(160px, 18vw, 220px)",
              background: `linear-gradient(145deg, ${card.accent}28 0%, transparent 80%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stepNumber}
          </div>
        ) : null}

        {/* Inner content */}
        <div className="relative flex min-h-[420px] flex-col p-7 sm:p-8">
          {/* Header row */}
          <div className="mb-6 flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{
                color: card.accent,
                borderColor: card.accent + "40",
                background: card.accent + "12",
              }}
            >
              <span
                className="inline-block size-1.5 rounded-full"
                style={{ background: card.accent, boxShadow: `0 0 10px ${card.accent}` }}
              />
              {card.label}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
              {String(index + 1).padStart(2, "0")} / 04
            </span>
          </div>

          {/* Title */}
          <h3
            className={
              isIntro
                ? "mb-2 text-[26px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[30px]"
                : "mb-6 text-[20px] font-semibold leading-[1.18] tracking-[-0.03em] text-white sm:text-[22px]"
            }
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {card.title}
          </h3>

          {/* Body: intro vs step */}
          {isIntro ? (
            <>
              <div
                className="mt-5 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${card.accent}55 0%, transparent 100%)`,
                }}
              />
              <p className="mt-5 text-[14px] leading-[1.55] text-white/60">
                Scroll to see how we move from an ambiguous problem to a live pilot in three sharp phases.
              </p>
              <div className="mt-auto flex items-center gap-2 pt-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Scroll
                </span>
                <span
                  className="inline-block h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${card.accent}66 0%, transparent 100%)`,
                  }}
                />
                <span className="text-white/50">→</span>
              </div>
            </>
          ) : (
            <>
              <div
                className="mb-5 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${card.accent}55 0%, transparent 100%)`,
                }}
              />
              <TypingLines
                lines={card.lines}
                active={active}
                accent={card.accent}
              />
            </>
          )}
        </div>

        {/* Bottom glow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{
            background: `linear-gradient(to top, ${card.accent}12, transparent)`,
          }}
        />
      </div>
    </div>
  )
})

/* ================================================================== */
/*  MAIN SECTION                                                      */
/* ================================================================== */

export function HorizontalCodePathSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      const svg = svgRef.current
      if (!section || !track || !svg) return

      const cards = gsap.utils.toArray<HTMLElement>(".path-card")
      const totalWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const distance = totalWidth - viewportWidth

      /* ── 1. Horizontal scroll (pin + scrub) ── */
      const scrollTween = gsap.to(track, {
        x: () => -(distance),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              CARDS.length - 1,
              Math.max(0, Math.floor(self.progress * CARDS.length))
            )
            setActiveIndex(idx)
          },
        },
      })

      /* ── 2. SVG path draw ── */
      const paths = svg.querySelectorAll<SVGPathElement>(".draw-path")
      paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
        })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
          },
        })
      })

      /* ── 3. Card entrance (subtle y + opacity) ── */
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        gsap.from(card, {
          y: direction * 30,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance * 0.2}`,
            scrub: 1,
          },
        })
      })

      return () => {
        scrollTween.scrollTrigger?.kill()
        scrollTween.kill()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080a0d] text-white"
      style={{ height: "100dvh" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#080a0d_0%,rgba(8,10,13,0)_12%,rgba(8,10,13,0)_88%,#080a0d_100%)]" />

      {/* Section label */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 sm:left-10 sm:top-10">
        <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
          How We Ship
        </span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="relative flex h-full items-center gap-[8vw] px-[10vw]"
        style={{ width: "max-content" }}
      >
        {/* Background SVG paths */}
        <svg
          ref={svgRef}
          className="pointer-events-none absolute left-0 top-0 h-full"
          style={{
            width: "100%",
            minWidth: "2400px",
            overflow: "visible",
          }}
          preserveAspectRatio="none"
          viewBox="0 0 2400 800"
        >
          <defs>
            <linearGradient
              id="pathGrad1"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#c792ea" />
              <stop offset="35%" stopColor="#82aaff" />
              <stop offset="65%" stopColor="#c3e88d" />
              <stop offset="100%" stopColor="#ffcb6b" />
            </linearGradient>
            <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main route path - snakes across */}
          <path
            className="draw-path"
            d="M 60 400 
               C 200 320 280 480 420 400 
               C 560 320 640 480 780 400 
               C 920 320 1000 480 1140 400 
               C 1280 320 1360 480 1500 400 
               C 1640 320 1720 480 1860 400 
               C 2000 320 2080 480 2220 400 
               L 2340 400"
            fill="none"
            stroke="url(#pathGrad1)"
            strokeLinecap="round"
            strokeWidth="3"
            filter="url(#pathGlow)"
            opacity="0.7"
          />

          {/* Secondary thinner path - offset */}
          <path
            className="draw-path"
            d="M 60 430 
               C 200 510 280 350 420 430 
               C 560 510 640 350 780 430 
               C 920 510 1000 350 1140 430 
               C 1280 510 1360 350 1500 430 
               C 1640 510 1720 350 1860 430 
               C 2000 510 2080 350 2220 430 
               L 2340 430"
            fill="none"
            stroke="url(#pathGrad1)"
            strokeLinecap="round"
            strokeWidth="1.5"
            opacity="0.35"
          />

          {/* Station dots at card positions */}
          <g>
            {[
              { cx: 420, cy: 400 },
              { cx: 900, cy: 400 },
              { cx: 1380, cy: 400 },
              { cx: 1860, cy: 400 },
            ].map((pos, i) => (
              <g key={i}>
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="28"
                  fill="#0b0d12"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
                <circle
                  className="station-dot"
                  cx={pos.cx}
                  cy={pos.cy}
                  r="10"
                  fill={
                    activeIndex >= i
                      ? ["#c792ea", "#82aaff", "#c3e88d", "#ffcb6b"][i]
                      : "rgba(255,255,255,0.15)"
                  }
                />
                <text
                  x={pos.cx + 42}
                  y={pos.cy + 4}
                  fill={
                    activeIndex >= i
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(255,255,255,0.25)"
                  }
                  fontFamily="monospace"
                  fontSize="11"
                  letterSpacing="2"
                >
                  {String(i).padStart(2, "0")}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Cards */}
        {CARDS.map((card, index) => (
          <PathCard
            key={card.id}
            card={card}
            index={index}
            active={activeIndex >= index}
          />
        ))}
      </div>
    </section>
  )
}

export default HorizontalCodePathSection
