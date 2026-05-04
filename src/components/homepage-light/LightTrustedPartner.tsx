"use client"

/**
 * LightTrustedPartner — editorial redesign.
 * Stats bento (hairline-divided columns with accent dots, tabular numerals)
 * + 4 pillar cards using the same editorial card system as LightEnterpriseCards.
 *
 * Reference: ui-ux-pro-max → "Light/Dark Mode Contrast", "Layout & Spacing",
 * "Common Rules for Professional UI"; frontend-developer agent → WCAG 2.2.
 */

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type Accent = { hex: string; rgb: string; tint: string; border: string }

const A_DELIVERY: Accent = { hex: "#6366F1", rgb: "99,102,241", tint: "#EEF0FF", border: "#C7CCFE" }
const A_ANALYTICS: Accent = { hex: "#8B5CF6", rgb: "139,92,246", tint: "#F2EDFE", border: "#D6C7FB" }
const A_GLOBAL: Accent = { hex: "#F59E0B", rgb: "245,158,11", tint: "#FFF6E6", border: "#FCD279" }
const A_SECURITY: Accent = { hex: "#10B981", rgb: "16,185,129", tint: "#E6F8F2", border: "#86E0BD" }

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
    let raf = 0,
      t = 0,
      w = 0,
      h = 0
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
    if (reduce) drawFn(ctx, w, h, 0)
    else tick()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ref
}

/* ─────────── Pillar canvas drawings (mono per accent) ─────────── */

/** Delivery — concentric arcs sweeping clockwise (cadence) */
function makeArcSweep(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w * 0.78
    const cy = h * 0.34
    const R = Math.min(w, h) * 0.42
    ctx.shadowBlur = 6
    ctx.shadowColor = `rgba(${a.rgb},0.4)`
    for (let i = 0; i < 4; i++) {
      const r = R - i * 16
      const phase = t * 0.012 + i * 0.6
      ctx.beginPath()
      ctx.arc(cx, cy, r, phase, phase + Math.PI * 0.9)
      ctx.strokeStyle = `rgba(${a.rgb},${0.22 + i * 0.06})`
      ctx.lineWidth = 1.4
      ctx.stroke()
    }
    ctx.shadowBlur = 0
  }
}

/** Analytics — flowing line graph */
function makeLineChart(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const startX = w * 0.55
    const endX = w * 0.97
    const baseY = h * 0.55
    const amp = h * 0.18

    ctx.beginPath()
    ctx.moveTo(startX, baseY)
    for (let x = startX; x <= endX; x += 4) {
      const k = (x - startX) / (endX - startX)
      const y =
        baseY -
        Math.sin(k * Math.PI * 2 + t * 0.04) * amp * 0.45 -
        Math.sin(k * Math.PI * 4 + t * 0.06) * amp * 0.25
      ctx.lineTo(x, y)
    }
    ctx.shadowBlur = 8
    ctx.shadowColor = `rgba(${a.rgb},0.5)`
    ctx.strokeStyle = `rgba(${a.rgb},0.75)`
    ctx.lineWidth = 1.8
    ctx.stroke()
    ctx.shadowBlur = 0

    // Filled area beneath
    ctx.lineTo(endX, h)
    ctx.lineTo(startX, h)
    ctx.closePath()
    const grad = ctx.createLinearGradient(0, baseY - amp, 0, h)
    grad.addColorStop(0, `rgba(${a.rgb},0.28)`)
    grad.addColorStop(1, `rgba(${a.rgb},0)`)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

/** Global — wireframe globe */
function makeGlobeMono(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w * 0.78
    const cy = h * 0.34
    const R = Math.min(w, h) * 0.4
    const angle = t * 0.006
    ctx.lineWidth = 1
    for (let lat = -60; lat <= 60; lat += 20) {
      const y0 = Math.sin((lat * Math.PI) / 180) * R
      const r0 = Math.cos((lat * Math.PI) / 180) * R
      ctx.beginPath()
      ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${a.rgb},0.22)`
      ctx.stroke()
    }
    for (let i = 0; i < 7; i++) {
      const phi = angle + (i / 7) * Math.PI * 2
      const rx = Math.cos(phi) * R
      const opacity = (Math.cos(phi) + 1) / 2
      ctx.beginPath()
      ctx.ellipse(cx, cy, Math.abs(rx), R, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${a.rgb},${0.12 + opacity * 0.22})`
      ctx.stroke()
    }
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

/** Security — minimal shield outline with locked center */
function makeShield(a: Accent) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w * 0.78
    const cy = h * 0.36
    const sw = Math.min(w, h) * 0.45
    const sh = sw * 1.15
    const pulse = (Math.sin(t * 0.04) + 1) / 2

    ctx.beginPath()
    ctx.moveTo(cx, cy - sh * 0.5)
    ctx.lineTo(cx + sw * 0.5, cy - sh * 0.25)
    ctx.lineTo(cx + sw * 0.5, cy + sh * 0.1)
    ctx.quadraticCurveTo(cx + sw * 0.5, cy + sh * 0.5, cx, cy + sh * 0.5)
    ctx.quadraticCurveTo(cx - sw * 0.5, cy + sh * 0.5, cx - sw * 0.5, cy + sh * 0.1)
    ctx.lineTo(cx - sw * 0.5, cy - sh * 0.25)
    ctx.closePath()

    ctx.fillStyle = `rgba(${a.rgb},${0.08 + pulse * 0.06})`
    ctx.fill()
    ctx.shadowBlur = 10
    ctx.shadowColor = `rgba(${a.rgb},0.45)`
    ctx.strokeStyle = `rgba(${a.rgb},${0.4 + pulse * 0.25})`
    ctx.lineWidth = 1.4
    ctx.stroke()
    ctx.shadowBlur = 0

    // checkmark
    const ck = sw * 0.18
    ctx.beginPath()
    ctx.moveTo(cx - ck, cy)
    ctx.lineTo(cx - ck * 0.2, cy + ck * 0.6)
    ctx.lineTo(cx + ck, cy - ck * 0.6)
    ctx.strokeStyle = `rgba(${a.rgb},0.78)`
    ctx.lineWidth = 1.8
    ctx.stroke()
  }
}

/* ─────────── Data ─────────── */
const PILLARS = [
  {
    tag: "01 / Delivery",
    title: "Rapid, predictable delivery",
    body: "From kick-off to go-live in weeks. Fixed milestones, transparent reporting — zero surprise invoices.",
    accent: A_DELIVERY,
    makeDraw: makeArcSweep,
  },
  {
    tag: "02 / Analytics",
    title: "Real-time business intelligence",
    body: "Power BI, Synapse, and Microsoft Fabric turn raw data into live dashboards your leadership can act on.",
    accent: A_ANALYTICS,
    makeDraw: makeLineChart,
  },
  {
    tag: "03 / Global",
    title: "Zero-handoff global teams",
    body: "One PM, one process, four continents — UK, US, India, and Middle East. Quality without offshore chaos.",
    accent: A_GLOBAL,
    makeDraw: makeGlobeMono,
  },
  {
    tag: "04 / Security",
    title: "Enterprise-grade security",
    body: "SOC 2-aligned pipelines, role-based access, encrypted at rest and in transit — compliance built in.",
    accent: A_SECURITY,
    makeDraw: makeShield,
  },
]

const STATS = [
  { value: "200+", label: "Projects delivered", accent: A_DELIVERY },
  { value: "98%", label: "Client satisfaction", accent: A_ANALYTICS },
  { value: "99.9%", label: "Uptime SLA", accent: A_SECURITY },
  { value: "4", label: "Global delivery hubs", accent: A_GLOBAL },
]

/* ════════════════════ MAIN ════════════════════ */
export default function LightTrustedPartner() {
  const refs = [
    useCanvas(PILLARS[0].makeDraw(PILLARS[0].accent)),
    useCanvas(PILLARS[1].makeDraw(PILLARS[1].accent)),
    useCanvas(PILLARS[2].makeDraw(PILLARS[2].accent)),
    useCanvas(PILLARS[3].makeDraw(PILLARS[3].accent)),
  ]

  return (
    <section className="relative w-full overflow-hidden bg-white py-[clamp(80px,10vw,140px)] px-[clamp(20px,4vw,64px)]">
      {/* HEAVY ambient color blobs — the cards will FROST over these */}
      <div aria-hidden className="pointer-events-none absolute -left-20 top-1/4 h-[520px] w-[520px] rounded-full" style={{ background: A_DELIVERY.hex, opacity: 0.26, filter: "blur(100px)" }} />
      <div aria-hidden className="pointer-events-none absolute right-1/4 -top-20 h-[500px] w-[500px] rounded-full" style={{ background: A_ANALYTICS.hex, opacity: 0.22, filter: "blur(100px)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-1/4 h-[560px] w-[560px] rounded-full" style={{ background: A_GLOBAL.hex, opacity: 0.24, filter: "blur(110px)" }} />
      <div aria-hidden className="pointer-events-none absolute left-1/3 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: A_SECURITY.hex, opacity: 0.22, filter: "blur(100px)" }} />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-zinc-300" aria-hidden />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                Trusted Global Partner
              </span>
            </div>
            <h2 className="text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em] text-zinc-900">
              Built for enterprises.
              <span className="block text-zinc-400">Delivered globally.</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-[1.6] text-zinc-600">
            Softree turns your boldest enterprise ambitions into production-grade software — on time, on spec, every time.
          </p>
        </div>

        {/* Stats — frosted glass bento, floating */}
        <div
          className="mb-12 grid grid-cols-2 overflow-hidden rounded-[20px] md:grid-cols-4"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(30px) saturate(180%)",
            WebkitBackdropFilter: "blur(30px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(255,255,255,0.3) inset, 0 40px 80px -24px rgba(15,23,42,0.2), 0 20px 40px -20px rgba(15,23,42,0.14), 0 8px 16px -8px rgba(15,23,42,0.08)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-3 px-7 py-8 md:py-10"
              style={{
                borderTop: i >= 2 ? "1px solid #E4E4E7" : undefined,
                borderLeft: i % 4 !== 0 ? "1px solid #E4E4E7" : undefined,
              }}
            >
              {/* On md+ override row borders for single-row layout */}
              <style>{`
                @media (min-width: 768px) {
                  .stat-cell-${i} { border-top: 0 !important; }
                }
              `}</style>
              <div className={`stat-cell-${i} contents`} aria-hidden />

              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ background: s.accent.hex }}
                />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                  {s.label}
                </span>
              </div>
              <span
                className="text-[clamp(36px,3.2vw,44px)] font-semibold leading-none tracking-[-0.03em] text-zinc-900"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <PillarCard
              key={i}
              tag={p.tag}
              title={p.title}
              body={p.body}
              accent={p.accent}
              canvasRef={refs[i]}
            />
          ))}
        </div>

        {/* CTA row — restrained, single solid pill + ghost link */}
        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Book a discovery call
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[13px] font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Our services
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Editorial pillar card (mirrors LightEnterpriseCards.Card) ─────────── */
function PillarCard({
  tag,
  title,
  body,
  accent,
  canvasRef,
}: {
  tag: string
  title: string
  body: string
  accent: Accent
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}) {
  return (
    <article
      className="group relative overflow-hidden rounded-[20px] transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(255,255,255,0.3) inset, 0 40px 80px -24px rgba(15,23,42,0.2), 0 20px 40px -20px rgba(15,23,42,0.14), 0 8px 16px -8px rgba(15,23,42,0.08)",
      }}
    >
      {/* Soft accent corner wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: `radial-gradient(circle, ${accent.tint} 0%, transparent 70%)` }}
      />
      {/* Motion canvas (full brightness, glass keeps text readable) */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-100"
      />
      {/* Top accent rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.hex}80, transparent)` }}
      />

      <div className="relative flex h-full min-h-[280px] flex-col p-7 md:min-h-[300px] md:p-8">
        {/* Header strip */}
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="block h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {tag}
          </span>
        </div>

        {/* Body */}
        <div className="mt-auto pt-16">
          <h3 className="text-[22px] md:text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-zinc-900">
            {title}
          </h3>
          <p className="mt-2.5 max-w-[440px] text-[14px] leading-[1.55] text-zinc-600">
            {body}
          </p>
        </div>
      </div>
    </article>
  )
}
