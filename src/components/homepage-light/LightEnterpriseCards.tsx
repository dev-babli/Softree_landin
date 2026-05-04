"use client"

/**
 * LightEnterpriseCards — editorial redesign.
 *
 * Design system applied:
 *  - One accent color per card (no rainbow gradients).
 *  - Solid white surface, zinc-200 border, hover-lift via shadow + accent border.
 *  - Monochromatic motion graphics behind content at low opacity, no glow-spam.
 *  - Inline CTA "Explore solution →" with arrow translate, no gradient pills.
 *  - Cursor-pointer, visible focus ring, ≥24px tap targets, prefers-reduced-motion.
 *
 * Reference: ui-ux-pro-max → "Light/Dark Mode Contrast", "Interaction & Cursor",
 * "Common Rules for Professional UI"; frontend-developer agent → WCAG 2.2.
 */

import React, { useEffect, useRef } from "react"
import { ArrowUpRight, Cpu, Layout, Globe, Database } from "lucide-react"
import Link from "next/link"

/* ─────────── Per-card accent system ─────────── */
type Accent = {
  hex: string
  rgb: string
  tint: string // very-soft surface tint
  border: string // hover border
}

const A_AI: Accent = { hex: "#6366F1", rgb: "99,102,241", tint: "#EEF0FF", border: "#C7CCFE" }
const A_WEB: Accent = { hex: "#0EA5E9", rgb: "14,165,233", tint: "#E6F6FE", border: "#9DD9F5" }
const A_GLOBE: Accent = { hex: "#F59E0B", rgb: "245,158,11", tint: "#FFF6E6", border: "#FCD279" }
const A_DATA: Accent = { hex: "#10B981", rgb: "16,185,129", tint: "#E6F8F2", border: "#86E0BD" }

/* ─────────── Canvas hook (reduced-motion aware) ─────────── */
function useCanvas(
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    let t = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const tick = () => {
      t += reduce ? 0 : 1
      ctx.clearRect(0, 0, w, h)
      if (w > 0 && h > 0) drawFn(ctx, w, h, t)
      if (!reduce) raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    if (reduce) {
      // single static frame
      drawFn(ctx, w, h, 0)
    } else {
      tick()
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ref
}

/* ─────────── Single-accent monochromatic drawings ─────────── */

/** AI: orbital rings around a pulsing core (Cohere/Anthropic feel). */
function makeOrbital(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w * 0.78
    const cy = h * 0.32
    const R = Math.min(w, h) * 0.42

    // Concentric rings
    for (let i = 0; i < 4; i++) {
      ctx.beginPath()
      ctx.arc(cx, cy, R - i * 16, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${a.rgb},${0.14 + i * 0.04})`
      ctx.lineWidth = 1.2
      ctx.stroke()
    }
    // Rotating dot on outer ring (with glow)
    const dotPhi = t * 0.012
    const dx = cx + Math.cos(dotPhi) * R
    const dy = cy + Math.sin(dotPhi) * R
    ctx.shadowBlur = 12
    ctx.shadowColor = `rgba(${a.rgb},0.8)`
    ctx.beginPath()
    ctx.arc(dx, dy, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${a.rgb},0.85)`
    ctx.fill()

    // Core (with glow)
    const pulse = (Math.sin(t * 0.04) + 1) / 2
    ctx.shadowBlur = 18
    ctx.beginPath()
    ctx.arc(cx, cy, 7 + pulse * 4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${a.rgb},${0.4 + pulse * 0.3})`
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

/** Web: faux-code rain — vertical lines of varying widths shifting downward. */
function makeCodeLines(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const startX = w * 0.55
    const lineH = 6
    const gap = 9
    const baseY = 28
    const cols = [
      [40, 80, 120, 60],
      [60, 100, 50, 90],
      [80, 40, 100, 70, 50],
      [50, 80, 60, 110, 40],
    ]
    cols.forEach((widths, ci) => {
      const offset = (t * 0.4 + ci * 12) % (lineH + gap)
      const colX = startX + ci * 56
      widths.forEach((wd, ri) => {
        const y = baseY + ri * (lineH + gap) - offset
        if (y < -lineH || y > h - 8) return
        ctx.fillStyle = `rgba(${a.rgb},${0.18 + (ri % 3) * 0.08})`
        ctx.fillRect(colX, y, wd, lineH)
      })
    })
  }
}

/** Globe: wireframe with rotating longitudes. */
function makeGlobe(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w * 0.78
    const cy = h * 0.34
    const R = Math.min(w, h) * 0.42
    const angle = t * 0.006

    ctx.lineWidth = 1
    // Latitudes
    for (let lat = -60; lat <= 60; lat += 20) {
      const y0 = Math.sin((lat * Math.PI) / 180) * R
      const r0 = Math.cos((lat * Math.PI) / 180) * R
      ctx.beginPath()
      ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${a.rgb},0.22)`
      ctx.stroke()
    }
    // Longitudes (rotating)
    for (let i = 0; i < 7; i++) {
      const phi = angle + (i / 7) * Math.PI * 2
      const rx = Math.cos(phi) * R
      const opacity = (Math.cos(phi) + 1) / 2
      ctx.beginPath()
      ctx.ellipse(cx, cy, Math.abs(rx), R, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${a.rgb},${0.12 + opacity * 0.22})`
      ctx.stroke()
    }
    // Equator (with glow)
    ctx.shadowBlur = 8
    ctx.shadowColor = `rgba(${a.rgb},0.5)`
    ctx.beginPath()
    ctx.ellipse(cx, cy, R, R * 0.25, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${a.rgb},0.5)`
    ctx.lineWidth = 1.4
    ctx.stroke()
    ctx.shadowBlur = 0
  }
}

/** Data: live bar chart with smooth wave motion. */
function makeBars(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const barCount = 12
    const totalW = w * 0.42
    const barW = (totalW / barCount) * 0.55
    const gap = (totalW / barCount) * 0.45
    const startX = w * 0.55
    const baseY = h * 0.78

    ctx.shadowBlur = 6
    ctx.shadowColor = `rgba(${a.rgb},0.45)`
    for (let i = 0; i < barCount; i++) {
      const phase = t * 0.04 + i * 0.45
      const bh = (0.18 + 0.42 * (Math.sin(phase) + 1) / 2) * (h * 0.5)
      const x = startX + i * (barW + gap)
      const grad = ctx.createLinearGradient(0, baseY - bh, 0, baseY)
      grad.addColorStop(0, `rgba(${a.rgb},${0.55 + (i % 4) * 0.08})`)
      grad.addColorStop(1, `rgba(${a.rgb},${0.18 + (i % 4) * 0.04})`)
      ctx.fillStyle = grad
      ctx.fillRect(x, baseY - bh, barW, bh)
    }
    ctx.shadowBlur = 0
    // Baseline
    ctx.beginPath()
    ctx.moveTo(startX - 4, baseY)
    ctx.lineTo(startX + totalW, baseY)
    ctx.strokeStyle = `rgba(${a.rgb},0.4)`
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

/* ════════════════════ MAIN ════════════════════ */
export default function LightEnterpriseCards() {
  const c1 = useCanvas(makeOrbital(A_AI))
  const c2 = useCanvas(makeCodeLines(A_WEB))
  const c3 = useCanvas(makeGlobe(A_GLOBE))
  const c4 = useCanvas(makeBars(A_DATA))

  const services = [
    {
      tag: "01 / Intelligence",
      title: "Agentic AI & Automation",
      desc: "Autonomous agents that handle complex workflows, fine-tuned to your data — accuracy where it matters.",
      Icon: Cpu,
      canvasRef: c1,
      accent: A_AI,
      href: "/services/ai-intelligence",
    },
    {
      tag: "02 / Engineering",
      title: "Premium Web Systems",
      desc: "High-conversion web applications built on Next.js and React 19 — engineered for speed and scale.",
      Icon: Layout,
      canvasRef: c2,
      accent: A_WEB,
      href: "/services/digital-workspace",
    },
    {
      tag: "03 / Strategy",
      title: "Enterprise Transformation",
      desc: "Strategic engineering partners migrating legacy complexity into lean, modern architectures.",
      Icon: Globe,
      canvasRef: c3,
      accent: A_GLOBE,
      href: "/services/business-applications",
    },
    {
      tag: "04 / Data",
      title: "Data Sovereignty",
      desc: "Real-time pipelines and analytics that turn massive datasets into competitive advantage.",
      Icon: Database,
      canvasRef: c4,
      accent: A_DATA,
      href: "/services/data-analytics",
    },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-white py-[clamp(80px,10vw,140px)] px-[clamp(20px,4vw,64px)]">
      {/* HEAVY ambient color blobs — the cards will FROST over these */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-40 h-[520px] w-[520px] rounded-full"
        style={{ background: A_AI.hex, opacity: 0.28, filter: "blur(100px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[560px] w-[560px] rounded-full"
        style={{ background: A_GLOBE.hex, opacity: 0.22, filter: "blur(110px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 bottom-10 h-[500px] w-[500px] rounded-full"
        style={{ background: A_DATA.hex, opacity: 0.22, filter: "blur(100px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 bottom-1/4 h-[400px] w-[400px] rounded-full"
        style={{ background: A_WEB.hex, opacity: 0.2, filter: "blur(90px)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-zinc-300" aria-hidden />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                Enterprise Solutions
              </span>
            </div>
            <h2 className="text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em] text-zinc-900">
              Core engineering services
              <span className="block text-zinc-400">built for scale.</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-[1.6] text-zinc-600">
            Four practices, one delivery model. Each engagement is staffed with senior engineers and shipped against fixed milestones.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Card key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Editorial card ─────────── */
function Card({
  tag,
  title,
  desc,
  Icon,
  canvasRef,
  accent,
  href,
}: {
  tag: string
  title: string
  desc: string
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  accent: Accent
  href: string
}) {
  return (
    <Link
      href={href}
      className="group relative block cursor-pointer overflow-hidden rounded-[20px] outline-none transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2"
      style={
        {
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(255,255,255,0.3) inset, 0 40px 80px -24px rgba(15,23,42,0.2), 0 20px 40px -20px rgba(15,23,42,0.14), 0 8px 16px -8px rgba(15,23,42,0.08)",
        } as React.CSSProperties
      }
    >
      {/* Soft accent corner wash (top-right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background: `radial-gradient(circle, ${accent.tint} 0%, transparent 70%)`,
        }}
      />

      {/* Motion canvas (brighter, glass overlay keeps text readable) */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-100"
      />

      {/* Top accent rule (rainbow highlight edge) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.hex}80, transparent)` }}
      />

      <div className="relative flex h-full min-h-[280px] flex-col p-7 md:min-h-[300px] md:p-8">
        {/* Header strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: accent.hex }}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              {tag}
            </span>
          </div>
          {/* Icon chip — glassy with accent inner glow */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md transition-colors duration-300"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.85), ${accent.tint})`,
              border: `1px solid ${accent.border}`,
              color: accent.hex,
              boxShadow: `0 4px 12px -4px rgba(${accent.rgb},0.3), 0 0 0 1px rgba(255,255,255,0.6) inset`,
            }}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </div>
        </div>

        {/* Body — pushed to bottom for editorial weight */}
        <div className="mt-auto pt-16">
          <h3 className="text-[22px] md:text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-zinc-900">
            {title}
          </h3>
          <p className="mt-2.5 max-w-[420px] text-[14px] leading-[1.55] text-zinc-600">
            {desc}
          </p>

          {/* Inline CTA */}
          <div className="mt-6 flex items-center gap-1.5">
            <span
              className="text-[13px] font-medium transition-colors duration-300"
              style={{ color: accent.hex }}
            >
              Explore solution
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: accent.hex }}
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
