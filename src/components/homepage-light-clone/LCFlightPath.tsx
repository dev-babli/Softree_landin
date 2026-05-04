"use client"

/**
 * LCFlightPath — The definitive Softree scroll experience.
 *
 * A scroll-driven GSAP MotionPath section where a flame-branded particle
 * traces a serpentine SVG route through 6 capability milestones.
 *
 * Mechanics:
 *   - ScrollTrigger pin + scrub drives motionPath progress (0 → 1)
 *   - An SVG <path> is rendered in real-time; a second "wake" path trails behind
 *   - Each milestone station has a glass card that lights up when the particle passes
 *   - Arrival triggers a framer-motion particle burst + station pulse
 *   - Resize recalculates path points from station container positions
 *
 * Inspired by: motionpathplot-through-points (GSAP CodePen)
 * Design: Emil Kowalski principles — strong ease-out, spring settling, invisible polish
 */

import { useRef, useCallback, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { useGSAP } from "@gsap/react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Code2,
  Database,
  Cloud,
  Workflow,
  Layers,
  Zap,
} from "lucide-react"
import { color } from "./tokens"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/* ─── DATA ─── */

interface Milestone {
  id: string
  label: string
  desc: string
  icon: React.ReactNode
  accent: "flame" | "sunshine"
}

const MILESTONES: Milestone[] = [
  { id: "ai", label: "AI & Agents", desc: "Agentic systems that reason, plan, and act on your data.", icon: <Brain className="h-5 w-5" />, accent: "flame" },
  { id: "web", label: "Modern Web", desc: "Accessible, performant interfaces built to convert.", icon: <Code2 className="h-5 w-5" />, accent: "sunshine" },
  { id: "m365", label: "Microsoft 365", desc: "Native Teams, SharePoint & Power Platform integrations.", icon: <Layers className="h-5 w-5" />, accent: "flame" },
  { id: "data", label: "Data & Insight", desc: "Pipelines that turn noise into decision-ready signal.", icon: <Database className="h-5 w-5" />, accent: "sunshine" },
  { id: "cloud", label: "Cloud Platform", desc: "Elastic infrastructure that scales with your growth.", icon: <Cloud className="h-5 w-5" />, accent: "flame" },
  { id: "ops", label: "DevOps & Ship", desc: "Zero-downtime CI/CD, monitoring, and handoff.", icon: <Workflow className="h-5 w-5" />, accent: "sunshine" },
]

const ACCENT: Record<string, string> = {
  flame: color.flame,
  sunshine: color.sunshine,
}

const ACCENT_SHADOW: Record<string, string> = {
  flame: "rgba(251,100,36,0.45)",
  sunshine: "rgba(255,161,16,0.45)",
}

/* ─── PARTICLE BURST (framer-motion) ─── */

/* Deterministic pseudo-random seeded by index — avoids impure Math.random during render */
function seeded(i: number, s = 1) {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function ParticleBurst({ x, y, tone }: { x: number; y: number; tone: string }) {
  const particles = Array.from({ length: 12 }, (_, i) => i)
  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y, zIndex: 40 }}>
      {particles.map((i) => {
        const angle = (i / 12) * Math.PI * 2
        const dist = 24 + seeded(i, 1) * 36
        const size = 3 + seeded(i, 2) * 3
        const dur = 0.55 + seeded(i, 3) * 0.25
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: tone,
              left: -2,
              top: -2,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: dur, ease: "easeOut" }}
          />
        )
      })}
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */

export function LCFlightPath() {
  const sectionRef = useRef<HTMLElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const wakeRef = useRef<SVGPathElement>(null)
  const particleRef = useRef<HTMLDivElement>(null)
  const stationsRef = useRef<(HTMLDivElement | null)[]>([])

  const [activeIdx, setActiveIdx] = useState(-1)
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; tone: string }[]>([])
  const burstIdRef = useRef(0)
  const [svgSize, setSvgSize] = useState({ w: 1320, h: 1440 })

  /* Compute path points from station DOM positions (responsive) */
  const computePath = useCallback(() => {
    const root = rootRef.current
    if (!root) return null

    const rootRect = root.getBoundingClientRect()
    const points = stationsRef.current.map((el) => {
      if (!el) return { x: 0, y: 0 }
      const r = el.getBoundingClientRect()
      return {
        x: r.left + r.width / 2 - rootRect.left,
        y: r.top + r.height / 2 - rootRect.top,
      }
    })

    // Build a smooth SVG cubic-bezier path through points
    if (points.length < 2) return null

    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cp1x = prev.x + (curr.x - prev.x) * 0.5
      const cp1y = prev.y
      const cp2x = prev.x + (curr.x - prev.x) * 0.5
      const cp2y = curr.y
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
    }

    return { d, points, rootRect }
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const root = rootRef.current
      if (!section || !root) return

      const pathEl = pathRef.current
      const wakeEl = wakeRef.current
      const partEl = particleRef.current

      let prevActive = -1

      const build = () => {
        const data = computePath()
        if (!data || !pathEl || !wakeEl) return

        // Draw path
        pathEl.setAttribute("d", data.d)
        wakeEl.setAttribute("d", data.d)

        const len = pathEl.getTotalLength()
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len })
        gsap.set(wakeEl, { strokeDasharray: len, strokeDashoffset: len })

        // Kill old tweens
        gsap.killTweensOf([pathEl, wakeEl, partEl])
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === section) st.kill()
        })

        // Main scrub timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              // Which station are we nearest?
              const idx = Math.min(
                MILESTONES.length - 1,
                Math.max(0, Math.floor(progress * MILESTONES.length))
              )
              if (idx !== prevActive && idx >= 0) {
                prevActive = idx
                setActiveIdx(idx)
                // Burst at station position
                const pt = data.points[idx]
                if (pt) {
                  const tone = ACCENT[MILESTONES[idx].accent]
                  const id = ++burstIdRef.current
                  setBursts((b) => [...b, { id, x: pt.x, y: pt.y, tone }])
                  setTimeout(() => {
                    setBursts((b) => b.filter((x) => x.id !== id))
                  }, 900)
                }
              }
            },
          },
        })

        // Draw the route (path stroke)
        tl.to(pathEl, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1,
        }, 0)

        // Wake trail (shorter, follows behind)
        tl.fromTo(
          wakeEl,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", duration: 1 },
          0
        )

        // Particle follows the path
        if (partEl) {
          tl.to(
            partEl,
            {
              duration: 1,
              ease: "none",
              motionPath: {
                path: pathEl,
                align: pathEl,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
            },
            0
          )
        }
      }

      build()
      const ro = new ResizeObserver(() => {
        setSvgSize({ w: root.offsetWidth, h: root.offsetHeight })
        build()
      })
      ro.observe(root)
      setSvgSize({ w: root.offsetWidth, h: root.offsetHeight })

      return () => { ro.disconnect() }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas, color: color.ink, minHeight: "100vh" }}
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(251,100,36,0.06), transparent 70%)",
        }}
        aria-hidden
      />

      <div ref={rootRef} className="relative mx-auto w-full max-w-[1320px] px-4 py-20 md:py-28 lg:px-10">
        {/* Header */}
        <div className="mb-16 max-w-[640px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: color.lifted, borderColor: color.dustTaupe }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color.flame }} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: color.slate }}>
              Our Capabilities
            </span>
          </div>
          <h2 className="text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: color.ink }}>
            Every capability. One flight path.
          </h2>
          <p className="mt-4 max-w-[54ch] text-base leading-relaxed md:text-lg" style={{ color: color.slate }}>
            Scroll to trace the route. As the particle passes each station,
            the capability unlocks — watch the full Softree stack come alive.
          </p>
        </div>

        {/* SVG overlay layer */}
        <div className="relative" style={{ minHeight: `${MILESTONES.length * 220 + 120}px` }}>
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Main route */}
            <path
              ref={pathRef}
              fill="none"
              stroke={color.flame}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={0.85}
              filter="url(#lc-fp-glow)"
            />
            {/* Wake trail (sunshine, thinner, behind) */}
            <path
              ref={wakeRef}
              fill="none"
              stroke={color.sunshine}
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.55}
            />

            <defs>
              <filter id="lc-fp-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Particle (moved via GSAP motionPath) */}
          <div
            ref={particleRef}
            className="absolute z-20 flex items-center justify-center rounded-full"
            style={{
              width: 28,
              height: 28,
              marginLeft: -14,
              marginTop: -14,
              background: `radial-gradient(circle, #fff 0%, ${color.flame} 45%, ${color.sunshine} 100%)`,
              boxShadow: `0 0 24px 6px rgba(251,100,36,0.55), 0 0 48px 12px rgba(255,161,16,0.25)`,
              willChange: "transform",
            }}
            aria-hidden
          >
            <Zap className="h-3.5 w-3.5" fill={color.ink} stroke={color.ink} />
          </div>

          {/* Burst overlays */}
          <AnimatePresence>
            {bursts.map((b) => (
              <ParticleBurst key={b.id} x={b.x} y={b.y} tone={b.tone} />
            ))}
          </AnimatePresence>

          {/* Station cards */}
          <div className="relative z-10 flex flex-col gap-[120px] md:gap-[140px]">
            {MILESTONES.map((m, i) => {
              const isActive = i <= activeIdx
              const isCurrent = i === activeIdx
              const tone = ACCENT[m.accent]
              const shadow = ACCENT_SHADOW[m.accent]

              return (
                <div
                  key={m.id}
                  ref={(el) => { stationsRef.current[i] = el }}
                  className="flex items-start gap-5 md:items-center"
                  style={{
                    marginLeft: i % 2 === 0 ? "0%" : "auto",
                    marginRight: i % 2 === 0 ? "auto" : "0%",
                    maxWidth: 520,
                  }}
                >
                  {/* Station dot + ring */}
                  <div className="relative shrink-0">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500"
                      style={{
                        background: isActive ? tone : color.lifted,
                        border: `2px solid ${isActive ? tone : color.dustTaupe}`,
                        boxShadow: isActive ? `0 0 28px 4px ${shadow}` : "none",
                      }}
                    >
                      <span style={{ color: isActive ? "#fff" : color.slate, transition: "color 0.4s ease" }}>
                        {m.icon}
                      </span>
                    </div>
                    {/* Pulse ring when current */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: `2px solid ${tone}` }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    className="flex-1 rounded-2xl border p-5 md:p-6"
                    style={{
                      background: isActive ? color.lifted : "transparent",
                      borderColor: isActive ? color.dustTaupe : "transparent",
                      boxShadow: isActive
                        ? `0 14px 40px -12px ${shadow.replace("0.45", "0.14")}`
                        : "none",
                    }}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.45,
                      y: isActive ? 0 : 8,
                    }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: tone }}
                      >
                        0{i + 1}
                      </span>
                      <div className="h-px flex-1" style={{ background: color.dustTaupe, opacity: 0.5 }} />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold md:text-xl" style={{ color: color.ink }}>
                      {m.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: color.slate }}>
                      {m.desc}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCFlightPath
