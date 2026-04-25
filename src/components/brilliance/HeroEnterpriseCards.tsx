"use client"
import React, { useEffect, useRef, useState } from "react"
import { ArrowRight, Cpu, Layout, Globe, Database } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import BorderGlow from "./BorderGlow"

/* ─── Animated Card Wrapper — ORIGINAL layout, unchanged ─────────── */
function AnimatedCard({
  children,
  glowColor,
  className,
}: {
  children: React.ReactNode
  glowColor: string
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const spotBg = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) =>
      `radial-gradient(800px circle at ${((mx as number) + 0.5) * 100}% ${
        ((my as number) + 0.5) * 100
      }%, ${glowColor}25, transparent 60%)`
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className ?? ""}`}
    >
      {/* Interactive Spotlight Radial Gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0, background: spotBg }}
      />

      {/* Glass border reflection */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-[16px] border border-white/10 group-hover:border-white/20 transition-colors duration-700 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div className="relative z-30 h-full w-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ─── Canvas hook with ResizeObserver (FIX: was 0×0 before) ─────── */
function useCanvas(
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

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
      t += 1
      ctx.clearRect(0, 0, w, h)
      if (w > 0 && h > 0) drawFn(ctx, w, h, t)
      raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return canvasRef
}

/* ─── Canvas Draws (proportional, not hardcoded px) ─────────────── */

function drawAI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const pts = 40
  for (let i = 0; i < pts; i++) {
    const seed = i * 137.508
    const px = (Math.sin(seed) * 0.5 + 0.5) * w
    const py = (Math.cos(seed * 0.7) * 0.5 + 0.5) * h
    const pulse = (Math.sin(t * 0.04 + i * 0.9) + 1) / 2

    ctx.beginPath()
    ctx.arc(px, py, 1.5 + pulse * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,107,0,${0.2 + pulse * 0.6})`
    ctx.fill()

    for (let j = i + 1; j < pts; j++) {
      const seed2 = j * 137.508
      const qx = (Math.sin(seed2) * 0.5 + 0.5) * w
      const qy = (Math.cos(seed2 * 0.7) * 0.5 + 0.5) * h
      const d = Math.hypot(px - qx, py - qy)
      const maxDist = Math.min(w, h) * 0.3
      if (d < maxDist) {
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(qx, qy)
        ctx.strokeStyle = `rgba(255,107,0,${0.1 * (1 - d / maxDist) * pulse})`
        ctx.lineWidth = 1
        ctx.stroke()
        if (pulse > 0.8) {
          const prog = (t * 0.018) % 1
          ctx.beginPath()
          ctx.arc(px + (qx - px) * prog, py + (qy - py) * prog, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = "#FF6B00"
          ctx.fill()
        }
      }
    }
  }
}

function drawWeb(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2
  ctx.strokeStyle = "rgba(161,196,255,0.2)"
  ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    const off = Math.sin(t * 0.02 + i * 1.1) * 10
    const fw = w * 0.44 + i * 18
    const fh = h * 0.35 + i * 12
    ctx.strokeRect(cx - fw / 2 + off, cy - fh / 2 - off * 0.5, fw, fh)
    ctx.fillStyle = "rgba(161,196,255,0.4)"
    for (let d = 0; d < 3; d++) {
      ctx.beginPath()
      ctx.arc(cx - fw / 2 + off + 10 + d * 9, cy - fh / 2 - off * 0.5 + 8, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  const fs = Math.max(14, Math.round(w * 0.055))
  ctx.font = `bold ${fs}px monospace`
  ctx.fillStyle = "rgba(161,196,255,0.3)"
  ctx.fillText("</> ", cx + w * 0.1 + Math.sin(t * 0.03) * 5, cy - h * 0.08)
  ctx.font = `${Math.max(12, Math.round(w * 0.04))}px monospace`
  ctx.fillText("div", cx - w * 0.22 + Math.cos(t * 0.025) * 5, cy + h * 0.18)
}

function drawGlobe(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2
  const R = Math.min(w, h) * 0.4
  const angle = t * 0.008

  ctx.lineWidth = 1

  for (let lat = -80; lat <= 80; lat += 20) {
    const y0 = Math.sin((lat * Math.PI) / 180) * R
    const r0 = Math.cos((lat * Math.PI) / 180) * R
    ctx.beginPath()
    ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,107,0,0.15)"
    ctx.stroke()
  }

  for (let i = 0; i < 8; i++) {
    const phi = angle + (i / 8) * Math.PI * 2
    const rx = Math.cos(phi) * R
    const opacity = (Math.cos(phi) + 1) / 2
    ctx.beginPath()
    ctx.ellipse(cx, cy, Math.abs(rx), R, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255,107,0,${0.08 + opacity * 0.2})`
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.ellipse(cx, cy, R, R * 0.25, 0, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(255,107,0,0.3)"
  ctx.lineWidth = 1.5
  ctx.stroke()

  for (let i = 0; i < 3; i++) {
    const phi2 = angle + (i / 3) * Math.PI * 2
    const theta = ((i * 40 - 20) * Math.PI) / 180
    const sx = cx + Math.cos(phi2) * R * 0.7
    const sy = cy + Math.sin(theta) * R * 0.6
    const pulse = (Math.sin(t * 0.06 + i * 2) + 1) / 2
    ctx.beginPath()
    ctx.arc(sx, sy, 2.5 + pulse * 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,140,0,${0.4 + pulse * 0.5})`
    ctx.fill()
  }
}

function drawData(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const drawCylinder = (x: number, y: number, cw: number, ch: number, alpha: number) => {
    const ry = ch * 0.22
    ctx.fillStyle = `rgba(161,196,255,${alpha})`
    ctx.fillRect(x, y + ry, cw, ch - ry * 2)
    ctx.beginPath()
    ctx.ellipse(x + cw / 2, y + ry, cw / 2, ry, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(x + cw / 2, y + ch - ry, cw / 2, ry, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "rgba(255,255,255,0.07)"
    ctx.beginPath()
    ctx.ellipse(x + cw / 2, y + ry, cw / 2, ry, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  const cw = w * 0.1
  const spacing = w * 0.13
  const startX = w * 0.08
  const dbY = h * 0.45
  for (let i = 0; i < 3; i++) {
    const ch = h * 0.22 + Math.sin(t * 0.04 + i * 1.2) * h * 0.04
    drawCylinder(startX + i * spacing, dbY, cw, ch, 0.15)
  }

  const barW = w * 0.045
  const barStartX = w * 0.58
  for (let i = 0; i < 8; i++) {
    const bh = (0.18 + 0.22 * Math.sin(t * 0.05 + i * 0.9 + 1)) * h
    ctx.fillStyle = `rgba(161,196,255,${0.2 + 0.1 * Math.sin(t * 0.07 + i)})`
    ctx.fillRect(barStartX + i * (barW + 3), h * 0.85 - bh, barW, bh)
  }

  ctx.beginPath()
  ctx.setLineDash([5, 5])
  ctx.strokeStyle = "rgba(161,196,255,0.2)"
  ctx.lineWidth = 1
  ctx.moveTo(0, h / 2)
  for (let xi = 0; xi <= w; xi += 20) {
    ctx.lineTo(xi, h / 2 + Math.sin(xi * 0.02 + t * 0.04) * 20)
  }
  ctx.stroke()
  ctx.setLineDash([])
}

/* ─── Main Export ────────────────────────────────────────────────── */
export function HeroEnterpriseCards() {
  const canvas1Ref = useCanvas(drawAI)
  const canvas2Ref = useCanvas(drawWeb)
  const canvas3Ref = useCanvas(drawGlobe)
  const canvas4Ref = useCanvas(drawData)

  const services = [
    {
      title: "AGENTIC AI & AUTOMATION",
      desc: "Deploy autonomous AI agents that handle complex workflows, fine-tuned to your proprietary data for unmatched precision.",
      icon: <Cpu className="h-6 w-6" />,
      canvasRef: canvas1Ref,
      glowColor: "#FF6B00",
      accentColor: "text-[#FF6B00]",
      pill: "ELITE AI",
      bgGradient: "from-[#FF6B00]/20",
      href: "/services/ai-intelligence",
    },
    {
      title: "PREMIUM WEB SYSTEMS",
      desc: "Cinematic, high-conversion web applications built with Next.js and React 19, engineered for speed and enterprise reliability.",
      icon: <Layout className="h-6 w-6" />,
      canvasRef: canvas2Ref,
      glowColor: "#A1C4FF",
      accentColor: "text-[#A1C4FF]",
      pill: "NEXT-GEN",
      bgGradient: "from-[#A1C4FF]/20",
      href: "/services/digital-workspace",
    },
    {
      title: "ENTERPRISE TRANSFORMATION",
      desc: "Strategic engineering partners for global digital dominance, migrating legacy complexity into lean, modern architectures.",
      icon: <Globe className="h-6 w-6" />,
      canvasRef: canvas3Ref,
      glowColor: "#FF6B00",
      accentColor: "text-[#FF6B00]",
      pill: "STRATEGIC",
      bgGradient: "from-[#FF6B00]/20",
      href: "/services/business-applications",
    },
    {
      title: "DATA SOVEREIGNTY",
      desc: "Robust data engineering pipelines and real-time analytics that turn massive datasets into actionable competitive advantages.",
      icon: <Database className="h-6 w-6" />,
      canvasRef: canvas4Ref,
      glowColor: "#A1C4FF",
      accentColor: "text-[#A1C4FF]",
      pill: "SOVEREIGN",
      bgGradient: "from-[#A1C4FF]/20",
      href: "/services/data-analytics",
    },
  ]

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 overflow-visible">
      <style>{`
        .glass-title {
          background: linear-gradient(to right, #ffffff, #a0a0a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Dynamic Cinematic Header */}
      <div className="w-full max-w-7xl mb-6 relative z-30">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-60" />
          <span className="text-[10px] font-black tracking-[0.4em] text-[#FF6B00] uppercase opacity-80">
            Enterprise Solutions
          </span>
        </div>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-[1px] drop-shadow-2xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Core Engineering <span className="text-white/40">Services</span>
        </h2>
      </div>

      {/* 2×2 Grid — ORIGINAL classes, unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl flex-1 items-stretch relative z-30 perspective-[2000px]">
        {services.map((service, index) => (
          <AnimatedCard key={index} glowColor={service.glowColor} className="min-h-[220px] md:min-h-[240px]">
            {/* Ambient Corner Glow */}
            <div
              className={`absolute top-0 left-0 w-80 h-80 bg-gradient-to-br ${service.bgGradient} to-transparent opacity-30 mix-blend-screen rounded-full blur-[100px] pointer-events-none group-hover:opacity-60 transition-opacity duration-1000`}
            />

            {/* Canvas Animation — full bleed, now properly sized */}
            <canvas
              ref={service.canvasRef}
              className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen group-hover:opacity-80 transition-opacity duration-1000"
              style={{ display: "block" }}
            />

            {/* Content Container */}
            <div
              className="relative z-30 p-6 md:p-8 h-full flex flex-col justify-between"
              style={{ transform: "translateZ(40px)" }}
            >
              {/* Top Row: Pill & Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="px-4 py-1.5 rounded-full bg-[#0A0A0C]/60 border border-white/10 backdrop-blur-2xl">
                  <span className={`text-[9px] font-black tracking-[0.3em] ${service.accentColor} uppercase`}>
                    {service.pill}
                  </span>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#0A0A0C]/60 border border-white/10 backdrop-blur-2xl transition-all duration-700 group-hover:scale-110 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] ${service.accentColor}`}
                >
                  {service.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 mb-4 flex-1 flex flex-col justify-end">
                <h3
                  className="text-xl md:text-2xl font-black text-white leading-tight tracking-tighter"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-white/50 text-[13px] md:text-[14px] font-medium leading-relaxed max-w-[320px] line-clamp-2">
                  {service.desc}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="mt-auto">
                <BorderGlow
                  edgeSensitivity={80}
                  glowColor="200 80% 80%"
                  backgroundColor="transparent"
                  borderRadius={50}
                  glowRadius={80}
                  glowIntensity={3}
                  coneSpread={45}
                  animated={false}
                  colors={["#ffffff", "#8498e6", "#38bdf8"]}
                  className="transition-all duration-300 ease-out hover:scale-105 active:scale-95 rounded-full w-max"
                >
                  <Link
                    href={service.href}
                    className="hyper-glass-pill flex items-center justify-center h-12 px-8 text-[13px] font-black text-white group cursor-pointer tracking-widest uppercase"
                  >
                    EXPLORE SOLUTION
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </Link>
                </BorderGlow>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  )
}
