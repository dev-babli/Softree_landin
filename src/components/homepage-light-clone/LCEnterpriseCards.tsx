"use client"

/**
 * LCEnterpriseCards — light clone of brilliance/HeroEnterpriseCards.
 * Cream surface + golden shadow per card; canvas drawings now use flame & sunshine palette
 * (instead of orange/blue), subtle and printed onto cream not screen-blended.
 */

import React, { useEffect, useRef, useState } from "react"
import { ArrowRight, Cpu, Layout, Globe, Database } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { color, shadow } from "./tokens"

function AnimatedCard({ children, glowColor, className }: { children: React.ReactNode; glowColor: string; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { setIsHovered(false); x.set(0); y.set(0) }

  const spotBg = useTransform([sx, sy], ([mx, my]) =>
    `radial-gradient(800px circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, ${glowColor}25, transparent 60%)`
  )

  return (
    <motion.div ref={cardRef} onMouseMove={onMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={onLeave} className={`relative ${className ?? ""}`}>
      <motion.div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0, background: spotBg }} />
      <div className="absolute inset-0 z-20 pointer-events-none rounded-[16px]" style={{ border: `1px solid ${color.dustTaupe}` }} />
      <div className="relative z-30 h-full w-full" style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  )
}

function useCanvas(drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf = 0, t = 0, w = 0, h = 0
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const tick = () => { t += 1; ctx.clearRect(0, 0, w, h); if (w > 0 && h > 0) drawFn(ctx, w, h, t); raf = requestAnimationFrame(tick) }
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize(); tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return canvasRef
}

const FLAME_RGB = "251,100,36"
const SUN_RGB = "255,161,16"

function drawAI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const pts = 40
  for (let i = 0; i < pts; i++) {
    const seed = i * 137.508
    const px = (Math.sin(seed) * 0.5 + 0.5) * w
    const py = (Math.cos(seed * 0.7) * 0.5 + 0.5) * h
    const pulse = (Math.sin(t * 0.04 + i * 0.9) + 1) / 2
    ctx.beginPath(); ctx.arc(px, py, 1.5 + pulse * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${FLAME_RGB},${0.15 + pulse * 0.4})`; ctx.fill()
    for (let j = i + 1; j < pts; j++) {
      const seed2 = j * 137.508
      const qx = (Math.sin(seed2) * 0.5 + 0.5) * w
      const qy = (Math.cos(seed2 * 0.7) * 0.5 + 0.5) * h
      const d = Math.hypot(px - qx, py - qy)
      const maxDist = Math.min(w, h) * 0.3
      if (d < maxDist) {
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy)
        ctx.strokeStyle = `rgba(${FLAME_RGB},${0.08 * (1 - d / maxDist) * pulse})`
        ctx.lineWidth = 1; ctx.stroke()
      }
    }
  }
}

function drawWeb(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2
  ctx.strokeStyle = `rgba(${SUN_RGB},0.25)`; ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    const off = Math.sin(t * 0.02 + i * 1.1) * 10
    const fw = w * 0.44 + i * 18; const fh = h * 0.35 + i * 12
    ctx.strokeRect(cx - fw / 2 + off, cy - fh / 2 - off * 0.5, fw, fh)
    ctx.fillStyle = `rgba(${SUN_RGB},0.4)`
    for (let d = 0; d < 3; d++) {
      ctx.beginPath(); ctx.arc(cx - fw / 2 + off + 10 + d * 9, cy - fh / 2 - off * 0.5 + 8, 2, 0, Math.PI * 2); ctx.fill()
    }
  }
  const fs = Math.max(14, Math.round(w * 0.055))
  ctx.font = `bold ${fs}px monospace`; ctx.fillStyle = `rgba(${SUN_RGB},0.3)`
  ctx.fillText("</> ", cx + w * 0.1 + Math.sin(t * 0.03) * 5, cy - h * 0.08)
  ctx.font = `${Math.max(12, Math.round(w * 0.04))}px monospace`
  ctx.fillText("div", cx - w * 0.22 + Math.cos(t * 0.025) * 5, cy + h * 0.18)
}

function drawGlobe(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2; const R = Math.min(w, h) * 0.4; const angle = t * 0.008
  ctx.lineWidth = 1
  for (let lat = -80; lat <= 80; lat += 20) {
    const y0 = Math.sin((lat * Math.PI) / 180) * R; const r0 = Math.cos((lat * Math.PI) / 180) * R
    ctx.beginPath(); ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${FLAME_RGB},0.15)`; ctx.stroke()
  }
  for (let i = 0; i < 8; i++) {
    const phi = angle + (i / 8) * Math.PI * 2
    const rx = Math.cos(phi) * R; const opacity = (Math.cos(phi) + 1) / 2
    ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(rx), R, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${FLAME_RGB},${0.08 + opacity * 0.18})`; ctx.stroke()
  }
  ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.25, 0, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(${FLAME_RGB},0.3)`; ctx.lineWidth = 1.5; ctx.stroke()
}

function drawData(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cyl = (x: number, y: number, cw: number, ch: number, alpha: number) => {
    const ry = ch * 0.22
    ctx.fillStyle = `rgba(${SUN_RGB},${alpha})`
    ctx.fillRect(x, y + ry, cw, ch - ry * 2)
    ctx.beginPath(); ctx.ellipse(x + cw / 2, y + ry, cw / 2, ry, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(x + cw / 2, y + ch - ry, cw / 2, ry, 0, 0, Math.PI * 2); ctx.fill()
  }
  const cw = w * 0.1; const spacing = w * 0.13; const startX = w * 0.08; const dbY = h * 0.45
  for (let i = 0; i < 3; i++) {
    const ch = h * 0.22 + Math.sin(t * 0.04 + i * 1.2) * h * 0.04
    cyl(startX + i * spacing, dbY, cw, ch, 0.18)
  }
  const barW = w * 0.045; const barStartX = w * 0.58
  for (let i = 0; i < 8; i++) {
    const bh = (0.18 + 0.22 * Math.sin(t * 0.05 + i * 0.9 + 1)) * h
    ctx.fillStyle = `rgba(${SUN_RGB},${0.2 + 0.1 * Math.sin(t * 0.07 + i)})`
    ctx.fillRect(barStartX + i * (barW + 3), h * 0.85 - bh, barW, bh)
  }
}

export function LCEnterpriseCards() {
  const c1 = useCanvas(drawAI)
  const c2 = useCanvas(drawWeb)
  const c3 = useCanvas(drawGlobe)
  const c4 = useCanvas(drawData)

  const services = [
    { title: "AGENTIC AI & AUTOMATION", desc: "Deploy autonomous AI agents that handle complex workflows, fine-tuned to your proprietary data for unmatched precision.",
      icon: <Cpu className="h-6 w-6" />, canvasRef: c1, glowColor: color.flame, accent: color.flame, pill: "ELITE AI", href: "/services/ai-intelligence" },
    { title: "PREMIUM WEB SYSTEMS", desc: "Cinematic, high-conversion web applications built with Next.js and React 19, engineered for speed and enterprise reliability.",
      icon: <Layout className="h-6 w-6" />, canvasRef: c2, glowColor: color.sunshine, accent: color.sunshine, pill: "NEXT-GEN", href: "/services/digital-workspace" },
    { title: "ENTERPRISE TRANSFORMATION", desc: "Strategic engineering partners for global digital dominance, migrating legacy complexity into lean, modern architectures.",
      icon: <Globe className="h-6 w-6" />, canvasRef: c3, glowColor: color.flame, accent: color.flame, pill: "STRATEGIC", href: "/services/business-applications" },
    { title: "DATA SOVEREIGNTY", desc: "Robust data engineering pipelines and real-time analytics that turn massive datasets into actionable competitive advantages.",
      icon: <Database className="h-6 w-6" />, canvasRef: c4, glowColor: color.sunshine, accent: color.mistral, pill: "SOVEREIGN", href: "/services/data-analytics" },
  ]

  return (
    <section className="w-full" style={{ background: color.canvas }}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
        <div className="rounded-[28px] p-2 md:p-6 md:py-8" style={{ background: color.lifted, border: `1px solid ${color.dustTaupe}`, boxShadow: shadow.golden }}>
          <div className="flex flex-col items-center w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 overflow-visible">
            <div className="w-full max-w-7xl mb-6 relative z-30">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-10" style={{ background: `linear-gradient(90deg, ${color.flame}, transparent)`, opacity: 0.7 }} />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-90" style={{ color: color.flame }}>
                  Enterprise Solutions
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[1px]" style={{ color: color.ink, fontFamily: "Outfit, sans-serif" }}>
                Core Engineering <span style={{ color: color.slate }}>Services</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl flex-1 items-stretch relative z-30">
              {services.map((s, i) => (
                <AnimatedCard key={i} glowColor={s.glowColor} className="min-h-[220px] md:min-h-[240px] rounded-[16px] overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-[16px]" style={{ background: color.canvas }} aria-hidden />
                  <canvas ref={s.canvasRef} className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-70" style={{ display: "block" }} />
                  <div className="relative z-30 p-6 md:p-8 h-full flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="px-4 py-1.5 rounded-full" style={{ background: color.lifted, border: `1px solid ${color.dustTaupe}` }}>
                        <span className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: s.accent }}>{s.pill}</span>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-700 group-hover:scale-110"
                        style={{ background: color.lifted, border: `1px solid ${color.dustTaupe}`, color: s.accent, boxShadow: "0 20px 40px -10px rgba(127,99,21,0.18)" }}>
                        {s.icon}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 flex-1 flex flex-col justify-end">
                      <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tighter" style={{ color: color.ink, fontFamily: "Outfit, sans-serif" }}>
                        {s.title}
                      </h3>
                      <p className="text-[13px] md:text-[14px] font-medium leading-relaxed max-w-[320px] line-clamp-2" style={{ color: color.slate }}>
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <Link href={s.href}
                        className="inline-flex items-center justify-center h-12 px-8 text-[13px] font-black group cursor-pointer tracking-widest uppercase rounded-full transition-all hover:scale-105"
                        style={{ background: color.ink, color: color.lifted }}>
                        EXPLORE SOLUTION
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCEnterpriseCards
