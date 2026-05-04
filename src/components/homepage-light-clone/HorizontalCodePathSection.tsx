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
    label: "Softree.Engine",
    title: "The best place to build, test, and ship front-end systems.",
    accent: "#c792ea",
    glow: "rgba(199,146,234,0.18)",
    lines: [],
    offsetY: -140,
  },
  {
    id: "html",
    label: "Structure.svg",
    title: "Semantic markup that scales.",
    accent: "#82aaff",
    glow: "rgba(130,170,255,0.18)",
    lines: [
      '<svg id="svgPaths" width="740"',
      '  height="2000" xmlns="',
      '  http://www.w3.org/2000/svg">',
      '  <use href="#linePath01" />',
      '  <use href="#linePath02" />',
      '  <use href="#linePath03" />',
      '  <use href="#linePath04" />',
      '</svg>',
    ],
    offsetY: 160,
  },
  {
    id: "css",
    label: "Styles.css",
    title: "Responsive constraints that never break layout.",
    accent: "#c3e88d",
    glow: "rgba(195,232,141,0.18)",
    lines: [
      "* { box-sizing: border-box; }",
      "html, body {",
      "  width: 100%; margin: 0;",
      "  padding: 0; overflow-x: clip;",
      "}",
      "body {",
      "  --strokeDashoffset: 0;",
      "}",
    ],
    offsetY: -120,
  },
  {
    id: "js",
    label: "Motion.js",
    title: "Scroll-linked animation with GSAP ScrollTrigger.",
    accent: "#ffcb6b",
    glow: "rgba(255,203,107,0.18)",
    lines: [
      "scrollTrigger: {",
      "  trigger: \"body\",",
      "  start: \"top top\",",
      "  end: \"bottom bottom\",",
      "  scrub: true,",
      "  onUpdate: (self) => {",
      "    let progress = -self.progress;",
      "    gsap.set(\"body\", {",
      '      "--strokeDashoffset": progress',
      "    });",
      "  }",
      "}",
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
  if (lines.length === 0) {
    return (
      <div className="flex h-full items-center">
        <p className="text-[20px] font-medium leading-snug tracking-tight text-white/90 sm:text-[22px]">
          The best place to build, test, and discover front-end code.
        </p>
      </div>
    )
  }

  return (
    <div className="font-mono text-[12px] leading-[1.65] sm:text-[13px]">
      {lines.map((line, li) => (
        <div key={li} className="whitespace-pre">
          {line.split("").map((char, ci) => {
            const trimmed = line.trimStart()
            const color =
              trimmed.startsWith("<") || trimmed.startsWith("</")
                ? "#ff5370"
                : trimmed.startsWith("*") ||
                  trimmed.startsWith("html") ||
                  trimmed.startsWith("body")
                  ? "#c792ea"
                  : trimmed.startsWith("width") ||
                    trimmed.startsWith("margin") ||
                    trimmed.startsWith("padding") ||
                    trimmed.startsWith("overflow")
                    ? "#82aaff"
                    : trimmed.startsWith("scrollTrigger") ||
                      trimmed.startsWith("trigger") ||
                      trimmed.startsWith("start") ||
                      trimmed.startsWith("end") ||
                      trimmed.startsWith("scrub")
                      ? accent
                      : "#abb2bf"
            return (
              <span
                key={`${li}-${ci}`}
                className="inline-block transition-[opacity,transform] duration-[400ms] ease-out"
                style={{
                  transitionDelay: active
                    ? `${li * 100 + ci * 8}ms`
                    : "0ms",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(5px)",
                  color,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            )
          })}
        </div>
      ))}
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
  return (
    <div
      className="path-card relative flex-shrink-0"
      style={{
        width: "clamp(300px, 30vw, 400px)",
        transform: `translateY(${card.offsetY}px) translateZ(0)`,
      }}
      data-card-index={index}
    >
      {/* Glow backdrop */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[28px] transition-opacity duration-700"
        style={{
          background: `radial-gradient(380px circle at 50% 50%, ${card.glow}, transparent 70%)`,
          opacity: active ? 0.55 : 0,
        }}
      />

      {/* Card shell */}
      <div className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0b0d12]/90 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md">
        {/* Top gradient edge */}
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${card.accent}45 50%, transparent 100%)`,
          }}
        />

        {/* Inner content */}
        <div className="relative p-6 sm:p-7">
          {/* Header row */}
          <div className="mb-5 flex items-center justify-between">
            <span
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: card.accent }}
            >
              {card.label}
            </span>
            <span className="font-mono text-[10px] text-white/25">
              {String(index + 1).padStart(2, "0")}/04
            </span>
          </div>

          {/* Title */}
          <h3
            className="mb-4 text-base font-bold leading-tight tracking-tight text-white/95 sm:text-lg"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {card.title}
          </h3>

          {/* Code block */}
          <div className="overflow-hidden rounded-[12px] border border-white/[0.06] bg-[#07080a]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {/* Fake window chrome */}
            <div className="mb-3 flex items-center gap-1.5 border-b border-white/[0.06] pb-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
              <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
              <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                {card.id}.motion
              </span>
            </div>

            <TypingLines
              lines={card.lines}
              active={active}
              accent={card.accent}
            />
          </div>
        </div>

        {/* Bottom subtle glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60px]"
          style={{
            background: `linear-gradient(to top, ${card.glow.replace(
              "0.18",
              "0.07"
            )}, transparent)`,
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
          Build Pipeline
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
