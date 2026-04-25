"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

/* ── Animated Card (same pattern as HeroEnterpriseCards) ───────── */
function GlassCard({
  children,
  glowColor,
  className = "",
}: {
  children: React.ReactNode
  glowColor: string
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mx = useSpring(x, { stiffness: 150, damping: 20 })
  const my = useSpring(y, { stiffness: 150, damping: 20 })
  const spotBg = useTransform(
    [mx, my],
    ([vx, vy]) =>
      `radial-gradient(600px circle at ${((vx as number) + 0.5) * 100}% ${((vy as number) + 0.5) * 100}%, ${glowColor}20, transparent 60%)`
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return
        const r = cardRef.current.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0) }}
      className={`relative group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 rounded-[16px]"
        style={{ opacity: isHovered ? 1 : 0, background: spotBg }}
      />
      <div className="absolute inset-0 z-20 pointer-events-none rounded-[16px] border border-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="relative z-30 h-full w-full">{children}</div>
    </motion.div>
  )
}

/* ── Canvas: animated orbit nodes (trust / network) ───────────── */
function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    let raf = 0, t = 0, w = 0, h = 0
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const tick = () => { t++; ctx.clearRect(0, 0, w, h); if (w > 0 && h > 0) draw(ctx, w, h, t); raf = requestAnimationFrame(tick) }
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize(); tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [draw])
  return ref
}

/* orbit nodes — orange accent */
function drawOrbit(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.35
  ctx.strokeStyle = "rgba(255,107,0,0.15)"; ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, R * 0.6, 0, Math.PI * 2); ctx.stroke()
  const nodes = 6
  for (let i = 0; i < nodes; i++) {
    const angle = (i / nodes) * Math.PI * 2 + t * 0.008
    const pulse = (Math.sin(t * 0.05 + i * 1.2) + 1) / 2
    const nx = cx + R * Math.cos(angle), ny = cy + R * Math.sin(angle)
    ctx.beginPath(); ctx.arc(nx, ny, 3 + pulse * 2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,107,0,${0.4 + pulse * 0.5})`; ctx.fill()
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny)
    ctx.strokeStyle = `rgba(255,107,0,${0.06 + pulse * 0.08})`; ctx.stroke()
  }
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(255,107,0,0.8)"; ctx.fill()
}

/* bar chart — blue accent */
function drawBars(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const bars = 7, bw = w * 0.06
  for (let i = 0; i < bars; i++) {
    const bh = (0.2 + 0.5 * Math.abs(Math.sin(t * 0.04 + i * 0.8))) * h * 0.7
    const bx = w * 0.1 + i * (bw + w * 0.04)
    const alpha = 0.15 + 0.15 * Math.sin(t * 0.06 + i)
    ctx.fillStyle = `rgba(161,196,255,${alpha})`
    ctx.fillRect(bx, h * 0.85 - bh, bw, bh)
    ctx.fillStyle = `rgba(161,196,255,${alpha * 2})`
    ctx.fillRect(bx, h * 0.85 - bh, bw, 3)
  }
  ctx.beginPath(); ctx.setLineDash([4, 4])
  ctx.strokeStyle = "rgba(161,196,255,0.15)"; ctx.lineWidth = 1
  ctx.moveTo(0, h * 0.5)
  for (let xi = 0; xi <= w; xi += 20)
    ctx.lineTo(xi, h * 0.5 + Math.sin(xi * 0.025 + t * 0.03) * 18)
  ctx.stroke(); ctx.setLineDash([])
}

/* globe — orange */
function drawGlobeSmall(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.38, angle = t * 0.007
  for (let lat = -60; lat <= 60; lat += 20) {
    const y0 = Math.sin(lat * Math.PI / 180) * R
    const r0 = Math.cos(lat * Math.PI / 180) * R
    ctx.beginPath(); ctx.ellipse(cx, cy + y0, r0, r0 * 0.22, 0, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,107,0,0.12)"; ctx.lineWidth = 1; ctx.stroke()
  }
  for (let i = 0; i < 6; i++) {
    const phi = angle + (i / 6) * Math.PI * 2
    const rx = Math.cos(phi) * R
    ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(rx), R, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255,107,0,${0.05 + ((Math.cos(phi) + 1) / 2) * 0.12})`; ctx.stroke()
  }
  for (let i = 0; i < 4; i++) {
    const phi2 = angle + (i / 4) * Math.PI * 2
    const pulse = (Math.sin(t * 0.05 + i * 1.5) + 1) / 2
    const sx = cx + Math.cos(phi2) * R * 0.65
    const sy = cy + Math.sin((i * 35 - 20) * Math.PI / 180) * R * 0.5
    ctx.beginPath(); ctx.arc(sx, sy, 2 + pulse * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,140,0,${0.4 + pulse * 0.4})`; ctx.fill()
  }
}

/* shield — blue */
function drawShield(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2
  const sw = Math.min(w, h) * 0.5, sh = sw * 1.15
  const pulse = (Math.sin(t * 0.04) + 1) / 2
  ctx.beginPath()
  ctx.moveTo(cx, cy - sh * 0.5)
  ctx.lineTo(cx + sw * 0.5, cy - sh * 0.25)
  ctx.lineTo(cx + sw * 0.5, cy + sh * 0.1)
  ctx.quadraticCurveTo(cx + sw * 0.5, cy + sh * 0.5, cx, cy + sh * 0.5)
  ctx.quadraticCurveTo(cx - sw * 0.5, cy + sh * 0.5, cx - sw * 0.5, cy + sh * 0.1)
  ctx.lineTo(cx - sw * 0.5, cy - sh * 0.25)
  ctx.closePath()
  ctx.strokeStyle = `rgba(161,196,255,${0.15 + pulse * 0.15})`; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillStyle = `rgba(161,196,255,${0.03 + pulse * 0.04})`; ctx.fill()
  const ck = 8 + pulse * 4
  ctx.beginPath(); ctx.arc(cx, cy - ck * 0.2, ck * 0.5, Math.PI, 0)
  ctx.rect(cx - ck * 0.4, cy - ck * 0.2, ck * 0.8, ck * 0.9)
  ctx.strokeStyle = `rgba(161,196,255,${0.4 + pulse * 0.4})`; ctx.lineWidth = 1.2; ctx.stroke()
}

const PILLARS = [
  { tag: "01 / DELIVERY", title: "Rapid,\nPredictable Delivery", body: "From kick-off to go-live in weeks. Fixed milestones, transparent reporting — zero surprise invoices.", accentColor: "#FF6B00", glowColor: "#FF6B00", pill: "DELIVERY", drawFn: drawOrbit },
  { tag: "02 / ANALYTICS", title: "Real-time\nBusiness Intelligence", body: "Power BI, Azure Synapse, and Microsoft Fabric turn your raw data into live dashboards your leadership can act on.", accentColor: "#A1C4FF", glowColor: "#A1C4FF", pill: "DATA", drawFn: drawBars },
  { tag: "03 / GLOBAL", title: "Zero Handoff\nGlobal Teams", body: "One PM, one process, four continents. UK, US, India, and Middle East — consistent quality without the offshore chaos.", accentColor: "#FF6B00", glowColor: "#FF6B00", pill: "GLOBAL", drawFn: drawGlobeSmall },
  { tag: "04 / SECURITY", title: "Enterprise-Grade\nSecurity by Default", body: "SOC 2-aligned pipelines, role-based access, encrypted at rest and in transit — compliance built in, not bolted on.", accentColor: "#A1C4FF", glowColor: "#A1C4FF", pill: "SECURE", drawFn: drawShield },
]

const STATS = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4", label: "Global Delivery Hubs" },
]

export function VirtualOfficeSection() {
  const canvasRefs = [
    useCanvas(PILLARS[0].drawFn),
    useCanvas(PILLARS[1].drawFn),
    useCanvas(PILLARS[2].drawFn),
    useCanvas(PILLARS[3].drawFn),
  ]

  return (
    <section className="relative w-full bg-[#000000] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        .vos-glass-pill {
          background: linear-gradient(135deg, rgba(255,107,0,0.35) 0%, rgba(255,255,255,0.05) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.15);
          border-top-color: rgba(255,107,0,0.5);
          border-left-color: rgba(255,255,255,0.3);
          box-shadow: 0 14px 40px 0 rgba(0,0,0,0.5), inset 0 1px 4px 0 rgba(255,255,255,0.4);
          border-radius: 9999px;
          position: relative;
          overflow: hidden;
        }
        .vos-glass-pill::after {
          content: "";
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
          transform: skewX(-20deg);
          animation: vos-glare 5s infinite ease-in-out;
        }
        @keyframes vos-glare { 0% { left: -100%; } 15% { left: 200%; } 100% { left: 200%; } }
      `}</style>

      {/* Ambient fog matching hero */}
      <div className="pointer-events-none absolute top-0 right-0 w-[700px] h-[500px]"
        style={{ background: "radial-gradient(ellipse at 85% 10%, rgba(132,152,230,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px]"
        style={{ background: "radial-gradient(ellipse at 5% 90%, rgba(255,107,0,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">

        {/* Tag — hero style */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-60" />
          <span className="text-[10px] font-black tracking-[0.4em] text-[#FF6B00] uppercase opacity-80"
            style={{ fontFamily: "Outfit, sans-serif" }}>
            Trusted Global Partner
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}>
            Built for enterprises.{" "}
            <span className="text-white/30">Delivered globally.</span>
          </h2>
          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-[400px] lg:text-right font-medium">
            Softree turns your boldest enterprise ambitions into production-grade software — on time, on spec, every time.
          </p>
        </div>

        {/* Stats bar — glass card style matching hero */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-[16px] overflow-hidden mb-12 border border-white/10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-8 px-4 bg-[#0A0A0C] backdrop-blur-2xl">
              <span className="font-black text-3xl md:text-4xl text-white mb-1 tracking-tight"
                style={{ fontFamily: "Outfit, sans-serif", color: i % 2 === 0 ? "#FF6B00" : "#A1C4FF" }}>
                {s.value}
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase text-center">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 2×2 Pillar Cards — identical pattern to HeroEnterpriseCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((p, i) => (
            <GlassCard key={i} glowColor={p.glowColor} className="min-h-[260px] md:min-h-[280px]">
              {/* Corner ambient glow */}
              <div className="absolute top-0 left-0 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-25 mix-blend-screen"
                style={{ background: `radial-gradient(circle, ${p.accentColor} 0%, transparent 70%)` }} />

              {/* Canvas animation */}
              <canvas
                ref={canvasRefs[i]}
                className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-30 mix-blend-screen group-hover:opacity-60 transition-opacity duration-700"
                style={{ display: "block" }} />

              {/* Content */}
              <div className="relative z-30 p-6 md:p-8 h-full flex flex-col justify-between"
                style={{ transform: "translateZ(20px)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="px-4 py-1.5 rounded-full bg-[#0A0A0C]/60 border border-white/10 backdrop-blur-2xl">
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase"
                      style={{ color: p.accentColor }}>{p.pill}</span>
                  </div>
                  <span className="text-[9px] font-black tracking-[0.25em] text-white/15 uppercase"
                    style={{ fontFamily: "Outfit, sans-serif" }}>{p.tag}</span>
                </div>

                <div className="flex-1 flex flex-col justify-end space-y-3">
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tighter whitespace-pre-line"
                    style={{ fontFamily: "Outfit, sans-serif" }}>{p.title}</h3>
                  <p className="text-white/45 text-[13px] md:text-sm font-medium leading-relaxed max-w-[340px]">{p.body}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA row — hero pill style */}
        <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Link href="/contact"
            className="vos-glass-pill flex items-center justify-center h-14 px-8 text-[13px] font-black text-white tracking-widest uppercase">
            Book a Discovery Call
            <svg className="ml-2 h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/services"
            className="flex items-center justify-center h-14 px-8 text-[13px] font-black text-white/50 hover:text-white/80 tracking-widest uppercase transition-colors border border-white/10 rounded-full backdrop-blur-2xl bg-white/5">
            Our Services
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
