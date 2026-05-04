"use client"

import { useRef, useState, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow, BLOCK_GRADIENT } from "./tokens"
import { Eyebrow, GrainOverlay } from "./primitives"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
 * LightHorizontalCodePath
 * Light-theme reimagining of HorizontalCodePathSection — a pinned
 * horizontal pipeline of "delivery stages" rendered as warm
 * Mistral / Mastercard cards on a cream canvas.  SVG draws a hand-
 * inked amber route that scrubs with scroll.
 * ─────────────────────────────────────────────────────────────────*/

type StageCard = {
  id: string
  label: string
  title: string
  body: string
  accent: string
  meta: string
  offsetY: number
}

const STAGES: StageCard[] = [
  {
    id: "discover",
    label: "01 · Discover",
    title: "Map the terrain before we build a single line.",
    body:
      "Workshops, interviews, system audits. We surface the real constraints — the ones that quietly burn quarters.",
    accent: color.sunshine,
    meta: "stage.discover",
    offsetY: -120,
  },
  {
    id: "design",
    label: "02 · Design",
    title: "Architecture and UX that survive scale.",
    body:
      "Component systems, data contracts, motion language — defined upfront so every team ships from one source of truth.",
    accent: color.flame,
    meta: "stage.design",
    offsetY: 140,
  },
  {
    id: "build",
    label: "03 · Build",
    title: "Production-grade engineering, every sprint.",
    body:
      "Cross-functional pods in UK, US, India and the Middle East deliver weekly increments with full audit trails.",
    accent: color.mistral,
    meta: "stage.build",
    offsetY: -100,
  },
  {
    id: "ship",
    label: "04 · Ship",
    title: "Launch, observe, iterate — together.",
    body:
      "Zero-downtime releases, telemetry baked in, and a partnership that continues long after go-live.",
    accent: color.signal,
    meta: "stage.ship",
    offsetY: 160,
  },
]

const PathCard = memo(function PathCard({
  card,
  index,
  active,
}: {
  card: StageCard
  index: number
  active: boolean
}) {
  return (
    <div
      className="path-card relative flex-shrink-0"
      style={{
        width: "clamp(320px, 32vw, 440px)",
        transform: `translateY(${card.offsetY}px) translateZ(0)`,
      }}
      data-card-index={index}
    >
      {/* Warm glow halo */}
      <div
        className="pointer-events-none absolute -inset-6 transition-opacity duration-700"
        style={{
          background: `radial-gradient(420px circle at 50% 50%, ${card.accent}22, transparent 70%)`,
          opacity: active ? 1 : 0,
          borderRadius: 32,
        }}
      />

      {/* Card shell — ivory on cream with golden elevation */}
      <div
        className="relative overflow-hidden"
        style={{
          background: color.lifted,
          boxShadow: shadow.golden,
          border: `1px solid ${color.ghostCream}`,
          borderRadius: 4,
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 3,
            background: `linear-gradient(90deg, transparent 0%, ${card.accent} 50%, transparent 100%)`,
          }}
        />

        <div className="relative p-7 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: card.accent,
                padding: "4px 10px",
                border: `1px solid ${card.accent}55`,
                borderRadius: 999,
                background: `${card.accent}10`,
              }}
            >
              {card.label}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                color: color.slate,
                letterSpacing: "0.18em",
              }}
            >
              {String(index + 1).padStart(2, "0")} / 04
            </span>
          </div>

          <h3
            className="mb-4"
            style={{
              fontFamily: "inherit",
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.44px",
              color: color.ink,
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.55,
              color: color.charcoal,
              opacity: 0.78,
            }}
          >
            {card.body}
          </p>

          {/* Meta footer — terminal-style on cream */}
          <div
            className="mt-6 flex items-center gap-2 px-3 py-2"
            style={{
              background: color.canvas,
              border: `1px solid ${color.ghostCream}`,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: card.accent,
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: color.slate,
              }}
            >
              {card.meta}
            </span>
            <span
              className="ml-auto font-mono"
              style={{ fontSize: 10, color: color.slate, opacity: 0.7 }}
            >
              {active ? "active" : "queued"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export function LightHorizontalCodePath() {
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

      const totalWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const distance = totalWidth - viewportWidth

      const scrollTween = gsap.to(track, {
        x: () => -distance,
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
              STAGES.length - 1,
              Math.max(0, Math.floor(self.progress * STAGES.length))
            )
            setActiveIndex(idx)
          },
        },
      })

      const paths = svg.querySelectorAll<SVGPathElement>(".draw-path")
      paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
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

      const cards = gsap.utils.toArray<HTMLElement>(".path-card")
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        gsap.from(card, {
          y: direction * 40,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance * 0.25}`,
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
      className="relative overflow-hidden"
      style={{ height: "100dvh", background: color.canvas }}
    >
      {/* Subtle warm grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(90deg, ${color.ghostCream}80 1px, transparent 1px), linear-gradient(180deg, ${color.ghostCream}55 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Edge fades */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{
          width: 120,
          background: `linear-gradient(90deg, ${color.canvas} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{
          width: 120,
          background: `linear-gradient(270deg, ${color.canvas} 0%, transparent 100%)`,
        }}
      />

      <GrainOverlay opacity={0.06} blendMode="multiply" />

      {/* Header chrome */}
      <div className="absolute left-6 top-6 z-20 sm:left-12 sm:top-12">
        <Eyebrow>The Softree pipeline</Eyebrow>
        <h2
          className="mt-3 max-w-[520px]"
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: color.ink,
          }}
        >
          From discovery to delivery,{" "}
          <span
            style={{
              backgroundImage: BLOCK_GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            in four stages.
          </span>
        </h2>
      </div>

      {/* Progress counter */}
      <div className="absolute right-6 top-6 z-20 sm:right-12 sm:top-12">
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: color.slate,
            padding: "6px 14px",
            background: color.lifted,
            border: `1px solid ${color.ghostCream}`,
            borderRadius: 999,
            boxShadow: shadow.pill,
          }}
        >
          Stage {String(Math.max(0, activeIndex) + 1).padStart(2, "0")} / 04
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="relative flex h-full items-center gap-[8vw] px-[12vw]"
        style={{ width: "max-content" }}
      >
        {/* SVG route — warm amber stroke, drawn as you scroll */}
        <svg
          ref={svgRef}
          className="pointer-events-none absolute left-0 top-0 h-full"
          style={{ width: "100%", minWidth: 2400, overflow: "visible" }}
          preserveAspectRatio="none"
          viewBox="0 0 2400 800"
        >
          <defs>
            <linearGradient id="lcpGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color.yellow} />
              <stop offset="30%" stopColor={color.sunshine} />
              <stop offset="65%" stopColor={color.flame} />
              <stop offset="100%" stopColor={color.mistral} />
            </linearGradient>
            <filter id="lcpGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            className="draw-path"
            d="M 60 400 C 280 280 480 520 720 400 C 960 280 1160 520 1400 400 C 1640 280 1840 520 2080 400 L 2340 400"
            fill="none"
            stroke="url(#lcpGrad)"
            strokeLinecap="round"
            strokeWidth="3"
            filter="url(#lcpGlow)"
            opacity="0.85"
          />
          <path
            className="draw-path"
            d="M 60 430 C 280 550 480 320 720 430 C 960 550 1160 320 1400 430 C 1640 550 1840 320 2080 430 L 2340 430"
            fill="none"
            stroke="url(#lcpGrad)"
            strokeLinecap="round"
            strokeWidth="1.4"
            opacity="0.4"
          />

          {/* Stage markers */}
          {[420, 980, 1540, 2100].map((cx, i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={400}
                r={26}
                fill={color.lifted}
                stroke={color.ghostCream}
                strokeWidth="1"
              />
              <circle
                cx={cx}
                cy={400}
                r={9}
                fill={
                  activeIndex >= i
                    ? [color.sunshine, color.flame, color.mistral, color.signal][i]
                    : color.dustTaupe
                }
              />
            </g>
          ))}
        </svg>

        {STAGES.map((card, index) => (
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

export default LightHorizontalCodePath
