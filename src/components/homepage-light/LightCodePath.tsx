"use client"

/**
 * LightCodePath — Horizontal scroll-driven code card journey for /light page.
 *
 * Adapted from HorizontalCodePathSection with light-theme tokens.
 * Cards slide horizontally as user scrolls, with flame/sunshine accent colors.
 */

import { useRef, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color } from "./tokens"

gsap.registerPlugin(ScrollTrigger)

/* ─── DATA ─── */

interface CodeCard {
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
    accent: color.mistral,
    glow: "rgba(250,82,15,0.12)",
    lines: [],
    offsetY: -140,
  },
  {
    id: "html",
    label: "Structure.svg",
    title: "Semantic markup that scales.",
    accent: color.flame,
    glow: "rgba(251,100,36,0.12)",
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
    accent: color.sunshine,
    glow: "rgba(255,161,16,0.12)",
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
    accent: color.gold,
    glow: "rgba(255,226,149,0.12)",
    lines: [
      "scrollTrigger: {",
      '  trigger: "body",',
      '  start: "top top",',
      '  end: "bottom bottom",',
      "  scrub: true,",
      "  onUpdate: (self) => {",
      '    let progress = -self.progress;',
      '    gsap.set("body", {',
      '      "--strokeDashoffset": progress',
      "    });",
      "  }",
      "}",
    ],
    offsetY: 180,
  },
]

/* ─── TYPING REVEAL ─── */

const TypingLines = memo(function TypingLines({ lines, active }: { lines: string[]; active: boolean }) {
  return (
    <div className="flex flex-col gap-1 font-mono text-[13px] leading-relaxed" style={{ color: color.slate }}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="overflow-hidden whitespace-pre transition-[max-width] duration-300"
          style={{
            maxWidth: active ? `${line.length + 1}ch` : "0ch",
            transitionDelay: `${i * 80}ms`,
          }}
        >
          {line || "\u00A0"}
        </div>
      ))}
    </div>
  )
})

/* ─── MAIN ─── */

export default function LightCodePath() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      // Set initial positions
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.set(card, { y: CARDS[i].offsetY })
      })

      // Horizontal scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Slide track left
      tl.to(track, {
        x: () => -(track.scrollWidth - section.clientWidth + 80),
        ease: "none",
        duration: 1,
      })

      // Animate SVG path draw
      if (svgPathRef.current) {
        const len = svgPathRef.current.getTotalLength()
        gsap.set(svgPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        })
        tl.to(
          svgPathRef.current,
          { strokeDashoffset: 0, ease: "none", duration: 1 },
          0
        )
      }

      return () => {
        tl.kill()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      <div className="relative mx-auto w-full max-w-[1320px] px-4 py-20 md:py-28 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: color.lifted, borderColor: color.dustTaupe }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color.flame }} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: color.slate }}>How we build</span>
          </div>
          <h2 className="max-w-[640px] text-3xl font-medium leading-[1.05] tracking-tight md:text-[48px]" style={{ color: color.ink }}>
            Structure. Style. Motion.
          </h2>
          <p className="mt-4 max-w-[54ch] text-base leading-relaxed" style={{ color: color.slate }}>
            Every Softree project follows a disciplined build pipeline — from semantic markup through responsive constraints to scroll-linked animation.
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        {/* SVG route line */}
        <svg
          className="pointer-events-none absolute left-0 top-1/2 z-0 h-px w-[200%] -translate-y-1/2"
          viewBox="0 0 2000 10"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            ref={svgPathRef}
            d="M0 5 Q 500 0, 1000 5 T 2000 5"
            fill="none"
            stroke={color.flame}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.6}
          />
        </svg>

        <div
          ref={trackRef}
          className="flex h-full items-center gap-8 px-4 will-change-transform md:gap-12 lg:px-10"
          style={{ width: "max-content" }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className="relative flex w-[clamp(300px,40vw,520px)] shrink-0 flex-col gap-4 rounded-lg border p-6 md:p-8"
              style={{
                background: color.lifted,
                borderColor: color.dustTaupe,
                boxShadow: `0 20px 60px -12px ${card.glow}`,
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full" style={{ background: card.accent }} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: card.accent }}>
                  {card.label}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-snug md:text-xl" style={{ color: color.ink }}>
                {card.title}
              </h3>

              {/* Code block */}
              {card.lines.length > 0 && (
                <div
                  className="rounded-md border p-4 font-mono text-[12px] leading-relaxed"
                  style={{ background: color.ivory, borderColor: color.dustTaupe, color: color.charcoal }}
                >
                  <TypingLines lines={card.lines} active />
                </div>
              )}

              {/* Index */}
              <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs font-bold" style={{ background: color.canvas, borderColor: color.dustTaupe, color: card.accent }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
