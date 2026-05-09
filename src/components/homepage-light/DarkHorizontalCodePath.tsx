"use client"

import { useRef, useState, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color } from "./tokens"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
 * DarkHorizontalCodePath
 * Dark-theme twin of LightHorizontalCodePath — same four-stage
 * pinned horizontal pipeline with a glowing inked route that scrubs
 * with scroll, retuned for a deep-ink canvas.
 * ─────────────────────────────────────────────────────────────────*/

/* Dark surface tokens — kept local so this file doesn't fight the
   warm/cream tokens.ts palette used across the light variants. */
const dark = {
  canvas: "#0a0a1a",
  lifted: "#13142a",
  rim: "rgba(255,255,255,0.08)",
  rimStrong: "rgba(255,255,255,0.14)",
  ink: "#ffffff",
  charcoal: "rgba(255,255,255,0.78)",
  slate: "rgba(255,255,255,0.55)",
  muted: "rgba(255,255,255,0.35)",
  stationIdle: "rgba(255,255,255,0.18)",
}

const shadow = {
  card:
    "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02)",
  pill:
    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 24px -14px rgba(0,0,0,0.6)",
}

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
      {/* Warm halo around the card when active */}
      <div
        className="pointer-events-none absolute -inset-8 transition-opacity duration-700"
        style={{
          background: `radial-gradient(440px circle at 50% 50%, ${card.accent}33, transparent 70%)`,
          opacity: active ? 1 : 0,
          borderRadius: 40,
          filter: "blur(2px)",
        }}
      />

      {/* Card shell — dark glass */}
      <div
        className="relative overflow-hidden backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(25,27,48,0.85) 0%, rgba(15,17,36,0.92) 100%)",
          boxShadow: shadow.card,
          border: `1px solid ${dark.rim}`,
          borderRadius: 6,
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

        {/* Corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${card.accent}40 0%, transparent 70%)`,
            filter: "blur(20px)",
            opacity: active ? 0.9 : 0.4,
            transition: "opacity 600ms ease",
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
                background: `${card.accent}15`,
              }}
            >
              {card.label}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                color: dark.slate,
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
              color: dark.ink,
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.55,
              color: dark.charcoal,
            }}
          >
            {card.body}
          </p>

          {/* Meta footer — terminal-style on dark */}
          <div
            className="mt-6 flex items-center gap-2 px-3 py-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${dark.rim}`,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: card.accent,
                boxShadow: `0 0 8px ${card.accent}`,
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: dark.slate,
              }}
            >
              {card.meta}
            </span>
            <span
              className="ml-auto font-mono"
              style={{ fontSize: 10, color: dark.muted }}
            >
              {active ? "active" : "queued"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export function DarkHorizontalCodePath() {
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
      style={{ height: "100dvh", background: dark.canvas }}
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "10%",
          top: "30%",
          width: "40%",
          height: "40%",
          background: `radial-gradient(circle, ${color.sunshine}22 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: "5%",
          top: "20%",
          width: "45%",
          height: "50%",
          background: `radial-gradient(circle, ${color.mistral}1f 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Subtle cool grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(90deg, ${dark.rim} 1px, transparent 1px), linear-gradient(180deg, ${dark.rim} 1px, transparent 1px)`,
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
          width: 140,
          background: `linear-gradient(90deg, ${dark.canvas} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{
          width: 140,
          background: `linear-gradient(270deg, ${dark.canvas} 0%, transparent 100%)`,
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Header chrome */}
      <div className="absolute left-6 top-6 z-20 sm:left-12 sm:top-12">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${dark.rim}`,
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: color.flame,
              boxShadow: `0 0 8px ${color.flame}`,
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: dark.slate,
              fontWeight: 600,
            }}
          >
            The Softree pipeline
          </span>
        </div>
        <h2
          className="mt-4 max-w-[560px]"
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: dark.ink,
          }}
        >
          From discovery to delivery,{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${color.sunshine}, ${color.flame}, ${color.mistral})`,
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
            color: dark.charcoal,
            padding: "7px 14px",
            background: dark.lifted,
            border: `1px solid ${dark.rim}`,
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
        {/* SVG route — glowing warm stroke drawn as you scroll */}
        <svg
          ref={svgRef}
          className="pointer-events-none absolute left-0 top-0 h-full"
          style={{ width: "100%", minWidth: 2400, overflow: "visible" }}
          preserveAspectRatio="none"
          viewBox="0 0 2400 800"
        >
          <defs>
            <linearGradient id="dcpGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color.yellow} />
              <stop offset="30%" stopColor={color.sunshine} />
              <stop offset="65%" stopColor={color.flame} />
              <stop offset="100%" stopColor={color.mistral} />
            </linearGradient>
            <filter id="dcpGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="dcpSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* soft under-glow */}
          <path
            className="draw-path"
            d="M 60 400 C 280 280 480 520 720 400 C 960 280 1160 520 1400 400 C 1640 280 1840 520 2080 400 L 2340 400"
            fill="none"
            stroke="url(#dcpGrad)"
            strokeLinecap="round"
            strokeWidth="14"
            filter="url(#dcpSoftGlow)"
            opacity="0.35"
          />

          <path
            className="draw-path"
            d="M 60 400 C 280 280 480 520 720 400 C 960 280 1160 520 1400 400 C 1640 280 1840 520 2080 400 L 2340 400"
            fill="none"
            stroke="url(#dcpGrad)"
            strokeLinecap="round"
            strokeWidth="3.25"
            filter="url(#dcpGlow)"
            opacity="1"
          />
          <path
            className="draw-path"
            d="M 60 430 C 280 550 480 320 720 430 C 960 550 1160 320 1400 430 C 1640 550 1840 320 2080 430 L 2340 430"
            fill="none"
            stroke="url(#dcpGrad)"
            strokeLinecap="round"
            strokeWidth="1.4"
            opacity="0.55"
          />

          {/* Stage markers */}
          {[420, 980, 1540, 2100].map((cx, i) => {
            const accent = [color.sunshine, color.flame, color.mistral, color.signal][i]
            const isActive = activeIndex >= i
            return (
              <g key={i}>
                {/* outer glow when active */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={400}
                    r={34}
                    fill={accent}
                    opacity={0.18}
                    filter="url(#dcpSoftGlow)"
                  />
                )}
                <circle
                  cx={cx}
                  cy={400}
                  r={26}
                  fill={dark.lifted}
                  stroke={dark.rimStrong}
                  strokeWidth="1"
                />
                <circle
                  cx={cx}
                  cy={400}
                  r={9}
                  fill={isActive ? accent : dark.stationIdle}
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 6px ${accent})`
                      : "none",
                  }}
                />
              </g>
            )
          })}
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

export default DarkHorizontalCodePath
