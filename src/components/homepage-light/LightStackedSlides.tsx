"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow } from "./tokens"
import {
  ArrowRight,
  Eyebrow,
  GhostWatermark,
  GrainOverlay,
  InkPill,
  SoftBlurOrb,
} from "./primitives"
import Grainient from "./Grainient"
import { SplitWords, W } from "./SplitWords"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * LightStackedSlides — pinned scroll-scrub stacked phases in the
 * light design language. Inspired by ServicesStackedSlides but
 * rebuilt with Mistral cream canvas, Mastercard pill CTAs,
 * Grainient accents, soft warm blur orbs and film grain.
 *
 * Animation:
 *  • Each panel pins at viewport bottom
 *  • As you scroll, panel scales down + fades, next panel enters
 *  • Last panel releases normally
 *  • Respects prefers-reduced-motion (stacks instead of pinning)
 */

type SlideTone = "cream" | "amber" | "ink" | "gold"

type Slide = {
  key: string
  phase: string
  index: string
  title: string
  headline: string
  description: string
  outcomes: string[]
  output: string
  tone: SlideTone
  visual: "map" | "flow" | "agent" | "pulse"
}

const SLIDES: Slide[] = [
  {
    key: "discover",
    phase: "Phase 01",
    index: "01",
    title: "Signal",
    headline: "Find the revenue signal hiding in the noise.",
    description:
      "We start by turning scattered product, funnel and customer data into a single sharp build decision — not a 60-page deck.",
    outcomes: ["Funnel audit", "User signal map", "Priority roadmap"],
    output: "Output: signed scope + fixed price · within 5 business days",
    tone: "cream",
    visual: "map",
  },
  {
    key: "architect",
    phase: "Phase 02",
    index: "02",
    title: "Shape",
    headline: "Make the offer feel clear before the build begins.",
    description:
      "Positioning, experience design and the product story your buyers understand in six seconds — pressure-tested on real users, not whiteboards.",
    outcomes: ["Offer clarity", "Interface direction", "Brand-ready flows"],
    output: "Output: clickable prototype + design tokens · within 2 weeks",
    tone: "amber",
    visual: "flow",
  },
  {
    key: "engineer",
    phase: "Phase 03",
    index: "03",
    title: "Build",
    headline: "Turn the experience into a working product.",
    description:
      "AI workflows, app screens, integrations and the product logic behind them — shipped weekly, reviewed weekly, owned by a small senior team.",
    outcomes: ["AI workflows", "App interfaces", "Production code"],
    output: "Output: production-grade code · weekly demos · typical 6–8 weeks",
    tone: "cream",
    visual: "agent",
  },
  {
    key: "launch",
    phase: "Phase 04",
    index: "04",
    title: "Launch",
    headline: "Ship a page that captures demand, not just attention.",
    description:
      "Conversion copy, launch assets, analytics and the warm handoff to the team that keeps it growing after we step back.",
    outcomes: ["Conversion page", "Tracking live", "Launch handoff"],
    output: "Output: live launch + 30-day support window · then handoff",
    tone: "gold",
    visual: "pulse",
  },
]

/* ─────────────────────────────────────────────────────────────────────
 * Visuals — small abstract SVG compositions per phase.
 *           All use the warm palette.
 * ──────────────────────────────────────────────────────────────────── */

function MapVisual() {
  // Network map — 7 nodes with animated signal lines
  return (
    <svg viewBox="0 0 600 480" className="h-full w-full" fill="none">
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%">
          <stop offset="0" stopColor={color.sunshine} stopOpacity="0.25" />
          <stop offset="1" stopColor={color.sunshine} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="240" r="220" fill="url(#mapGlow)" />

      {[
        [300, 240],
        [140, 160],
        [460, 160],
        [170, 360],
        [430, 360],
        [300, 90],
        [300, 400],
      ].map(([cx, cy], i) => {
        const r = i === 0 ? 26 : 12
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r + 10}
              stroke={color.mistral}
              strokeWidth="1"
              fill="none"
              opacity="0.35"
            >
              <animate
                attributeName="r"
                values={`${r + 8};${r + 22};${r + 8}`}
                dur={`${2.4 + i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur={`${2.4 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={cx} cy={cy} r={r} fill={i === 0 ? color.mistral : color.flame} />
          </g>
        )
      })}

      {/* lines from hub */}
      {[
        [140, 160],
        [460, 160],
        [170, 360],
        [430, 360],
        [300, 90],
        [300, 400],
      ].map(([x2, y2], i) => (
        <g key={`l-${i}`}>
          <line
            x1="300"
            y1="240"
            x2={x2}
            y2={y2}
            stroke={color.mistral}
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />
          <circle r="3" fill={color.signalLight}>
            <animateMotion
              path={`M 300 240 L ${x2} ${y2}`}
              dur={`${1.6 + i * 0.25}s`}
              repeatCount="indefinite"
              begin={`${i * 0.4}s`}
            />
          </circle>
        </g>
      ))}
    </svg>
  )
}

function FlowVisual() {
  // Offer-shaping flow — 4 stacked pill chips linked by curved lines
  const items = ["Research", "Positioning", "Experience", "Story"]
  return (
    <svg viewBox="0 0 600 480" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id="flowGrad" x1="0" x2="1">
          <stop offset="0" stopColor={color.signalLight} stopOpacity="0" />
          <stop offset="0.5" stopColor={color.signalLight} stopOpacity="0.8" />
          <stop offset="1" stopColor={color.signalLight} stopOpacity="0" />
        </linearGradient>
      </defs>

      {items.map((t, i) => {
        const y = 70 + i * 100
        return (
          <g key={t}>
            <rect
              x="110"
              y={y}
              width="380"
              height="58"
              rx="29"
              fill={i === 1 ? color.ink : color.white}
              stroke={color.ink}
              strokeWidth="1.5"
            />
            <circle cx="150" cy={y + 29} r="8" fill={i === 1 ? color.sunshine : color.mistral} />
            <text
              x="180"
              y={y + 35}
              fill={i === 1 ? color.canvas : color.ink}
              fontFamily="inherit"
              fontSize="20"
              fontWeight="500"
              letterSpacing="-0.4"
            >
              {t}
            </text>
            <circle cx="450" cy={y + 29} r="14" fill={i === 1 ? color.canvas : color.ink} />
            <path
              d={`M ${445} ${y + 29} L ${455} ${y + 29} M ${451} ${y + 25} L ${455} ${y + 29} L ${451} ${y + 33}`}
              stroke={i === 1 ? color.ink : color.canvas}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {i < items.length - 1 && (
              <path
                d={`M 300 ${y + 58} C 300 ${y + 78}, 300 ${y + 92}, 300 ${y + 100}`}
                stroke="url(#flowGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

function AgentVisual() {
  // Chat/AI panel — window with message bubbles
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{
        background: color.lifted,
        borderRadius: 24,
        boxShadow: shadow.halo,
        border: `1px solid ${color.ink}12`,
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: `1px solid ${color.ink}10` }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 999, background: color.flame }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: color.sunshine }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: color.gold }} />
        <span
          className="ml-auto"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.4px",
            color: color.slate,
            textTransform: "uppercase",
          }}
        >
          softree · agent
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div
          className="self-start rounded-2xl px-4 py-2.5"
          style={{
            background: color.cream,
            color: color.ink,
            maxWidth: "78%",
            fontSize: 14,
            fontWeight: 450,
            borderRadius: 18,
          }}
        >
          Draft a retention pricing tier for EU mid-market.
        </div>
        <div
          className="self-end rounded-2xl px-4 py-2.5"
          style={{
            background: color.ink,
            color: color.canvas,
            maxWidth: "82%",
            fontSize: 14,
            fontWeight: 450,
            borderRadius: 18,
          }}
        >
          Pulling churn data from ProductDB · competitor pricing from crawl · drafting 3 tiers with usage caps.
        </div>
        <div
          className="self-end flex items-center gap-2 rounded-2xl px-4 py-2.5"
          style={{
            background: color.ink,
            color: color.canvas,
            maxWidth: "68%",
            fontSize: 14,
            fontWeight: 450,
            borderRadius: 18,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: color.signalLight,
              boxShadow: `0 0 10px ${color.signalLight}`,
              animation: "softreePulseDot 1.4s ease-in-out infinite",
            }}
          />
          Running · 3 tools active
        </div>

        <div
          className="mt-auto flex items-center gap-3 rounded-full px-4 py-3"
          style={{ background: color.white, border: `1px solid ${color.ink}20` }}
        >
          <span style={{ fontSize: 14, fontWeight: 450, color: color.slate, flex: 1 }}>
            Ask anything about your pipeline…
          </span>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: color.ink,
              color: color.canvas,
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

function PulseVisual() {
  // Launch pulse — big metric + sparkline
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden p-7"
      style={{
        background: `linear-gradient(160deg, ${color.gold} 0%, ${color.sunshine} 55%, ${color.flame} 100%)`,
        borderRadius: 24,
        boxShadow: shadow.halo,
      }}
    >
      <GrainOverlay opacity={0.14} blendMode="overlay" scale={1.1} />
      <div className="relative">
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.48px",
            textTransform: "uppercase",
            color: color.ink,
          }}
        >
          · Launch week · live
        </div>
        <div
          className="mt-6"
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(64px,10vw,120px)",
            fontWeight: 500,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: color.ink,
          }}
        >
          +34%
        </div>
        <div
          className="mt-3"
          style={{ fontSize: 15, fontWeight: 500, color: color.ink }}
        >
          Conversion lift · week 1
        </div>
      </div>
      <svg viewBox="0 0 400 120" className="mt-auto h-32 w-full" fill="none">
        <path
          d="M 0 95 L 40 85 L 80 90 L 120 70 L 160 72 L 200 50 L 240 55 L 280 35 L 320 30 L 360 18 L 400 10"
          stroke={color.ink}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 0 95 L 40 85 L 80 90 L 120 70 L 160 72 L 200 50 L 240 55 L 280 35 L 320 30 L 360 18 L 400 10 L 400 120 L 0 120 Z"
          fill={color.ink}
          fillOpacity="0.08"
        />
      </svg>
    </div>
  )
}

function SlideVisual({ kind }: { kind: Slide["visual"] }) {
  if (kind === "map") return <MapVisual />
  if (kind === "flow") return <FlowVisual />
  if (kind === "agent") return <AgentVisual />
  return <PulseVisual />
}

/* ─────────────────────────────────────────────────────────────────────
 * Slide panel
 * ──────────────────────────────────────────────────────────────────── */

function Panel({ slide }: { slide: Slide }) {
  const isInk = slide.tone === "ink"
  const bg =
    slide.tone === "cream"
      ? color.lifted
      : slide.tone === "amber"
        ? color.canvas
        : slide.tone === "ink"
          ? color.ink
          : color.lifted

  const text = isInk ? color.canvas : color.ink
  const muted = isInk ? "rgba(243,240,238,0.7)" : color.slate

  return (
    <section
      className="ssx-section relative h-screen w-full overflow-hidden"
      style={{ background: bg, color: text }}
      data-tone={slide.tone}
    >
      {/* Ambient layer per tone */}
      {slide.tone === "amber" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0.35, filter: "blur(40px) saturate(1.1)" }}
        >
          <Grainient
            color1={color.yellow}
            color2={color.sunshine}
            color3={color.cream}
            timeSpeed={0.14}
            warpStrength={1.2}
            warpFrequency={3.2}
            warpSpeed={1.1}
            warpAmplitude={70}
            blendAngle={25}
            blendSoftness={0.2}
            rotationAmount={240}
            noiseScale={1.6}
            grainAmount={0}
            contrast={1.15}
            saturation={0.95}
            zoom={1.05}
            centerX={0.2}
            centerY={-0.1}
          />
        </div>
      )}

      {slide.tone === "cream" && (
        <>
          <SoftBlurOrb
            size={520}
            color={color.gold}
            blur={110}
            opacity={0.32}
            style={{ right: -160, top: -120 }}
          />
          <SoftBlurOrb
            size={380}
            color={color.cream}
            blur={100}
            opacity={0.55}
            style={{ left: -120, bottom: -80 }}
          />
        </>
      )}

      {slide.tone === "gold" && (
        <>
          <SoftBlurOrb
            size={600}
            color={color.sunshine}
            blur={130}
            opacity={0.4}
            style={{ left: "58%", top: -180 }}
          />
          <SoftBlurOrb
            size={360}
            color={color.flame}
            blur={110}
            opacity={0.32}
            style={{ left: -100, bottom: -120 }}
          />
        </>
      )}

      {slide.tone === "ink" && (
        <>
          <SoftBlurOrb
            size={560}
            color={color.mistral}
            blur={120}
            opacity={0.35}
            style={{ right: -160, top: -120 }}
          />
          <SoftBlurOrb
            size={380}
            color={color.flame}
            blur={100}
            opacity={0.25}
            style={{ left: -80, bottom: -120 }}
          />
        </>
      )}

      <GrainOverlay
        opacity={isInk ? 0.18 : 0.1}
        blendMode={isInk ? "screen" : "overlay"}
        scale={1.25}
      />

      {/* Ghost watermark index */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-8 md:right-10 md:top-14"
      >
        <div
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(160px, 26vw, 380px)",
            fontWeight: 500,
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            color: isInk ? "rgba(255,250,235,0.05)" : color.ghostCream,
          }}
        >
          {slide.index}
        </div>
      </div>

      <div className="relative mx-auto grid h-full w-full max-w-[1320px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy column */}
        <div className="flex max-w-[620px] flex-col gap-7">
          <div
            className="flex items-center gap-3"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase", color: isInk ? color.sunshine : color.mistral }}
          >
            <span
              aria-hidden
              style={{
                width: 32,
                height: 1,
                background: `linear-gradient(90deg, ${isInk ? color.sunshine : color.mistral}, transparent)`,
              }}
            />
            <span>{slide.phase}</span>
          </div>

          <h3
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(44px, 7vw, 92px)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: text,
              textWrap: "balance",
              margin: 0,
            }}
          >
            {slide.title}
          </h3>

          <p
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 450,
              lineHeight: 1.3,
              color: text,
              margin: 0,
            }}
          >
            {slide.headline}
          </p>

          <p style={{ fontSize: 16, fontWeight: 450, lineHeight: 1.55, color: muted, margin: 0 }}>
            {slide.description}
          </p>

          {/* Output line — specific deliverable + timing (sells outcome, not process) */}
          <div
            className="inline-flex items-center gap-2.5 self-start rounded-full border px-4 py-2"
            style={{
              background: isInk ? "rgba(255,250,235,0.04)" : "rgba(255,255,255,0.6)",
              borderColor: isInk ? "rgba(255,250,235,0.18)" : `${color.ink}15`,
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: isInk ? color.sunshine : color.mistral,
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "-0.18px",
                color: text,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {slide.output}
            </span>
          </div>

          {/* Outcomes pills */}
          <ul className="flex flex-wrap gap-2.5 p-0" style={{ listStyle: "none", margin: 0 }}>
            {slide.outcomes.map((o) => (
              <li
                key={o}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: isInk ? "rgba(255,250,235,0.08)" : color.white,
                  border: `1px solid ${isInk ? "rgba(255,250,235,0.18)" : color.ink + "18"}`,
                  color: text,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "-0.28px",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: isInk ? color.signalLight : color.mistral,
                  }}
                />
                {o}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {isInk ? (
              <>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 hover:-translate-y-0.5"
                  style={{
                    padding: "10px 24px",
                    borderRadius: 20,
                    background: color.canvas,
                    color: color.ink,
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "-0.32px",
                    textDecoration: "none",
                    transition: "transform 220ms ease",
                    border: `1.5px solid ${color.canvas}`,
                  }}
                >
                  Start a project <ArrowRight size={16} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2"
                  style={{
                    padding: "10px 24px",
                    borderRadius: 20,
                    background: "transparent",
                    color: color.canvas,
                    fontSize: 16,
                    fontWeight: 450,
                    letterSpacing: "-0.32px",
                    textDecoration: "none",
                    border: `1.5px solid rgba(255,250,235,0.3)`,
                  }}
                >
                  View services
                </a>
              </>
            ) : (
              <>
                <InkPill href="#contact">
                  Start a project <ArrowRight size={16} />
                </InkPill>
                <InkPill href="#services" variant="outline">
                  View services
                </InkPill>
              </>
            )}
          </div>
        </div>

        {/* Visual column */}
        <div className="relative h-[60vh] max-h-[520px] w-full">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: 32,
              background: isInk
                ? `linear-gradient(160deg, ${color.charcoal} 0%, ${color.ink} 100%)`
                : color.white,
              boxShadow: shadow.halo,
              border: isInk ? `1px solid rgba(255,250,235,0.1)` : `1px solid ${color.ink}10`,
            }}
          >
            <div className="absolute inset-0 p-6 md:p-8">
              <SlideVisual kind={slide.visual} />
            </div>
            <GrainOverlay
              opacity={isInk ? 0.14 : 0.08}
              blendMode={isInk ? "screen" : "multiply"}
              scale={1.1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * The section
 * ──────────────────────────────────────────────────────────────────── */

export default function LightStackedSlides({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".ssx-section", root)
        const pinnedPanels = panels.slice(0, -1)

        const timelines = pinnedPanels.map((panel) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          tl.fromTo(
            panel,
            { scale: 1, autoAlpha: 1 },
            { scale: 0.86, autoAlpha: 0.4, duration: 0.9, ease: "none" }
          ).to(panel, { autoAlpha: 0, duration: 0.1, ease: "none" })

          return tl
        })

        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          timelines.forEach((tl) => tl.kill())
        }
      })

      // Reduced-motion / mobile fallback — flat stack, no pin
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(".ssx-section", { clearProps: "transform,opacity,visibility" })
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className={`relative w-full ${className}`.trim()} style={{ background: color.canvas }}>
      {/* Intro header — shared across the stack */}
      <header
        className="relative mx-auto w-full max-w-[1320px] px-6 pt-24 pb-10 md:px-10 md:pt-32 md:pb-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-16 overflow-hidden"
          style={{ maxWidth: "100%" }}
        >
          <GhostWatermark size={260} style={{ textAlign: "center", paddingLeft: 24 }}>
            services · services
          </GhostWatermark>
        </div>
        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>· What we deliver</Eyebrow>
            <SplitWords
              as="h2"
              className="mt-6 max-w-[880px]"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(36px, 5.8vw, 82px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 90%"
              stagger={0.05}
            >
              <W>Services</W> <W>built</W> <W>for</W> <W>real</W> <W>pipeline,</W>
              <br />
              <W>not</W> <W>pageviews.</W>
            </SplitWords>
          </div>
          <InkPill href="#contact" variant="cream">
            Book a fit call <ArrowRight size={16} />
          </InkPill>
        </div>
      </header>

      <div className="ssx-slides-wrapper relative">
        {SLIDES.map((s) => (
          <Panel key={s.key} slide={s} />
        ))}
      </div>
    </div>
  )
}
