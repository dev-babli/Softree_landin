"use client"

import { useRef, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
 * LightHorizontalCodePath — DARK MODE
 * Pinned horizontal pipeline of "delivery stages" rendered as
 * glassmorphic cards on a deep navy canvas (#0a0a1a).
 * SVG draws a glowing blue route that scrubs with scroll.
 * ─────────────────────────────────────────────────────────────────*/

/* ── Dark mode tokens ───────────────────────────────────────────── */
const dk = {
  bg: "#0a0a1a",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  ink: "#ffffff",
  body: "rgba(255,255,255,0.65)",
  muted: "rgba(255,255,255,0.40)",
  gridLine: "rgba(255,255,255,0.04)",
  blue: "#1852FF",
  violet: "#6C42F5",
  cyan: "#38BDF8",
  accent: "#1852FF",
} as const

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
    label: "01 · Discovery",
    title: "Map the terrain before we build a single line.",
    body:
      "Workshops, stakeholder interviews, and system audits. We surface the constraints that quietly cost quarters.",
    accent: dk.blue,
    meta: "stage.discover",
    offsetY: -120,
  },
  {
    id: "architect",
    label: "02 · Architecture",
    title: "Design that survives scale and team growth.",
    body:
      "Component systems, data contracts, and motion language — defined upfront so every team ships from one source of truth.",
    accent: dk.violet,
    meta: "stage.architect",
    offsetY: 140,
  },
  {
    id: "build",
    label: "03 · Engineering",
    title: "Production-grade code, every sprint.",
    body:
      "Cross-functional pods across UK, Middle East, and Asia deliver weekly increments with full audit trails.",
    accent: dk.cyan,
    meta: "stage.build",
    offsetY: -100,
  },
  {
    id: "ship",
    label: "04 · Launch & Evolve",
    title: "Ship, observe, iterate — together.",
    body:
      "Zero-downtime releases, telemetry baked in, and a partnership that continues long after go-live.",
    accent: dk.blue,
    meta: "stage.ship",
    offsetY: 160,
  },
]

const PathCard = memo(function PathCard({
  card,
  index,
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
      {/* Glow halo */}
      <div
        className="pointer-events-none absolute -inset-6 transition-opacity duration-700"
        style={{
          background: `radial-gradient(420px circle at 50% 50%, ${card.accent}30, transparent 70%)`,
          opacity: 0,
          borderRadius: 32,
        }}
      />

      {/* Card shell — glassmorphic dark */}
      <div
        className="relative overflow-hidden backdrop-blur-xl"
        style={{
          background: dk.card,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px -20px rgba(0,0,0,0.5)",
          border: `1px solid ${dk.cardBorder}`,
          borderRadius: 8,
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 2,
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
                textTransform: "uppercase" as const,
                color: card.accent,
                padding: "4px 10px",
                border: `1px solid ${card.accent}40`,
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
                color: dk.muted,
                letterSpacing: "0.18em",
              }}
            >
              {String(index + 1).padStart(2, "0")} / 04
            </span>
          </div>

          <h3
            className="mb-4"
            style={{
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.44px",
              color: dk.ink,
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.55,
              color: dk.body,
            }}
          >
            {card.body}
          </p>

          {/* Meta footer */}
          <div
            className="mt-6 flex items-center gap-2 px-3 py-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${dk.cardBorder}`,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: card.accent,
                boxShadow: `0 0 6px ${card.accent}88`,
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                color: dk.muted,
              }}
            >
              {card.meta}
            </span>
            <span
              className="ml-auto font-mono card-meta-status"
              style={{ fontSize: 10, color: dk.muted, opacity: 0.7 }}
            >
              queued
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
  const activeIndexRef = useRef(-1)

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
            if (idx === activeIndexRef.current) return
            activeIndexRef.current = idx

            const counter = section.querySelector<HTMLElement>(".stage-counter")
            if (counter) counter.textContent = `${String(idx + 1).padStart(2, "0")} / 04`

            // Update SVG stage markers
            const markers = svg.querySelectorAll<SVGCircleElement>(".stage-dot")
            const accentColors = STAGES.map((s) => s.accent)
            markers.forEach((dot, i) => {
              dot.setAttribute("fill", idx >= i ? accentColors[i] : "rgba(255,255,255,0.15)")
            })

            // Update card active states
            const cards = section.querySelectorAll<HTMLElement>(".path-card")
            cards.forEach((card) => {
              const ci = Number(card.dataset.cardIndex)
              const meta = card.querySelector<HTMLElement>(".card-meta-status")
              if (meta) meta.textContent = idx >= ci ? "active" : "queued"
              // glow halo
              const halo = card.firstElementChild as HTMLElement | null
              if (halo) halo.style.opacity = idx >= ci ? "1" : "0"
            })
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

      const cardEls = gsap.utils.toArray<HTMLElement>(".path-card")
      cardEls.forEach((card, i) => {
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
      style={{ height: "100dvh", background: dk.bg }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(90deg, ${dk.gridLine} 1px, transparent 1px), linear-gradient(180deg, ${dk.gridLine} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Purple bloom — top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-0"
        style={{
          left: "10%",
          top: "-15%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(circle, rgba(108,66,245,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blue bloom — bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-0"
        style={{
          right: "5%",
          bottom: "-10%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(24,82,255,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Edge fades */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{
          width: 120,
          background: `linear-gradient(90deg, ${dk.bg} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{
          width: 120,
          background: `linear-gradient(270deg, ${dk.bg} 0%, transparent 100%)`,
        }}
      />

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      {/* Header chrome */}
      <div className="absolute left-6 top-6 z-20 sm:left-12 sm:top-12">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-[#1852FF]"
            style={{ boxShadow: "0 0 8px rgba(24,82,255,0.9)" }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
            The Softree Pipeline
          </span>
        </div>
        <h2
          className="mt-3 max-w-[520px]"
          style={{
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: dk.ink,
          }}
        >
          From discovery to delivery,{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1852FF 0%, #6C42F5 50%, #38BDF8 100%)",
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
            color: "rgba(255,255,255,0.55)",
            padding: "6px 14px",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${dk.cardBorder}`,
            borderRadius: 999,
            backdropFilter: "blur(20px)",
          }}
        >
          Stage <span className="stage-counter">01 / 04</span>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="relative flex h-full items-center gap-[8vw] px-[12vw]"
        style={{ width: "max-content" }}
      >
        {/* SVG route — blue/violet gradient stroke */}
        <svg
          ref={svgRef}
          className="pointer-events-none absolute left-0 top-0 h-full"
          style={{ width: "100%", minWidth: 2400, overflow: "visible" }}
          preserveAspectRatio="none"
          viewBox="0 0 2400 800"
        >
          <defs>
            <linearGradient id="lcpGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={dk.blue} />
              <stop offset="35%" stopColor={dk.violet} />
              <stop offset="70%" stopColor={dk.cyan} />
              <stop offset="100%" stopColor={dk.blue} />
            </linearGradient>
            <filter id="lcpGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
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
            opacity="0.35"
          />

          {/* Stage markers */}
          {[420, 980, 1540, 2100].map((cx, i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={400}
                r={26}
                fill="rgba(255,255,255,0.03)"
                stroke={dk.cardBorder}
                strokeWidth="1"
              />
              <circle
                className="stage-dot"
                cx={cx}
                cy={400}
                r={9}
                fill="rgba(255,255,255,0.15)"
              />
            </g>
          ))}
        </svg>

        {STAGES.map((card, index) => (
          <PathCard
            key={card.id}
            card={card}
            index={index}
            active={false}
          />
        ))}
      </div>
    </section>
  )
}

export default LightHorizontalCodePath
