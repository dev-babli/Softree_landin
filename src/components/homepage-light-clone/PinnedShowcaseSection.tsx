"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Cpu, Layout, Globe, Database } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ─── Canvas hook with ResizeObserver ─────── */
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
  }, [drawFn])

  return canvasRef
}

/* ─── Drawing Functions (Matching Hero Section) ─── */
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
  }
}

function drawGlobe(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2
  const R = Math.min(w, h) * 0.4
  const angle = t * 0.008
  for (let lat = -80; lat <= 80; lat += 20) {
    const y0 = Math.sin((lat * Math.PI) / 180) * R
    const r0 = Math.cos((lat * Math.PI) / 180) * R
    ctx.beginPath()
    ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,107,0,0.15)"
    ctx.stroke()
  }
}

function drawData(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cw = w * 0.1
  const spacing = w * 0.13
  const startX = w * 0.08
  const dbY = h * 0.45
  for (let i = 0; i < 3; i++) {
    const ch = h * 0.22 + Math.sin(t * 0.04 + i * 1.2) * h * 0.04
    ctx.fillStyle = `rgba(161,196,255,0.15)`
    ctx.fillRect(startX + i * spacing, dbY, cw, ch)
  }
}

/* ─── data ─── */

interface ShowcaseItem {
  label: string
  pill: string
  desc: string
  accentColor: string
  glowColor: string
  icon: React.ReactNode
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
}

const ITEMS_DATA = [
  {
    label: "Discover",
    pill: "PHASE 01",
    desc: "Deep-dive research, stakeholder mapping, and strategic roadmapping to align technology with business objectives.",
    accentColor: "#FF6B00",
    glowColor: "rgba(255,107,0,0.15)",
    icon: <Cpu className="h-5 w-5" />,
    drawFn: drawAI,
  },
  {
    label: "Architect",
    pill: "PHASE 02",
    desc: "System blueprints, data models, and cinematic UI prototypes engineered for enterprise-grade resilience.",
    accentColor: "#A1C4FF",
    glowColor: "rgba(161,196,255,0.15)",
    icon: <Layout className="h-5 w-5" />,
    drawFn: drawWeb,
  },
  {
    label: "Engineer",
    pill: "PHASE 03",
    desc: "Production-grade code, CI/CD pipelines, and seamless third-party integrations built for speed and reliability.",
    accentColor: "#FF6B00",
    glowColor: "rgba(255,107,0,0.15)",
    icon: <Globe className="h-5 w-5" />,
    drawFn: drawGlobe,
  },
  {
    label: "Launch",
    pill: "PHASE 04",
    desc: "Zero-downtime deployments, performance monitoring, and elastic scaling that grows with your business.",
    accentColor: "#A1C4FF",
    glowColor: "rgba(161,196,255,0.15)",
    icon: <Database className="h-5 w-5" />,
    drawFn: drawData,
  },
]

/* ─── component ─── */

export function PinnedShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create refs for each canvas
  const canvasRefs = [
    useCanvas(drawAI),
    useCanvas(drawWeb),
    useCanvas(drawGlobe),
    useCanvas(drawData),
  ]

  useGSAP(
    () => {
      const list = document.querySelector(".pin-showcase .pin-list") as HTMLElement | null
      const fill = document.querySelector(".pin-showcase .pin-fill") as HTMLElement | null
      const listItems = gsap.utils.toArray<HTMLElement>("li", list!)
      const slides = gsap.utils.toArray<HTMLElement>(".pin-slide")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-showcase .pin-section",
          start: "top top",
          end: "+=" + listItems.length * 50 + "%",
          pin: true,
          scrub: true,
        },
      })

      if (fill) {
        gsap.set(fill, {
          scaleY: 1 / listItems.length,
          transformOrigin: "top left",
        })
      }

      listItems.forEach((item, i) => {
        const previousItem = listItems[i - 1]
        if (previousItem) {
          tl.set(item, { color: "#0ae448" }, 0.5 * i)
            .to(
              slides[i],
              {
                autoAlpha: 1,
                duration: 0.2,
              },
              "<"
            )
            .set(previousItem, { color: "#fffce1" }, "<")
            .to(
              slides[i - 1],
              {
                autoAlpha: 0,
                duration: 0.2,
              },
              "<"
            )
        } else {
          gsap.set(item, { color: "#0ae448" })
          gsap.set(slides[i], { autoAlpha: 1 })
        }
      })

      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration(),
        },
        0
      ).to({}, {})
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="pin-showcase">
      <section className="pin-spacer-section">
        <div className="pin-spacer-inner">
          <div className="pin-label-row">
            <div className="pin-label-line" />
            <span className="pin-label-tag">Our Delivery Framework</span>
          </div>
          <h2 className="pin-hero-heading">
            How We <span className="pin-hero-dim">Build</span>
          </h2>
          <p className="pin-hero-sub">
            Four precision-engineered phases that transform vision into production-grade reality.
          </p>
        </div>
      </section>

      <section className="pin-section">
        <div className="pin-content">
          <div className="pin-left-col">
            <ul className="pin-list">
              {ITEMS_DATA.map((item, i) => (
                <li key={i}>
                  <span className="pin-list-number">0{i + 1}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="pin-fill" />

          <div className="pin-right">
            {ITEMS_DATA.map((item, i) => (
              <div key={i} className="pin-slide pin-center">
                <div className="pin-card group min-h-[320px] flex flex-col justify-center">
                  <div
                    className="pin-card__glow"
                    style={{ background: `radial-gradient(600px circle at 30% 20%, ${item.glowColor}, transparent 70%)` }}
                  />

                  {/* Canvas Background Animation */}
                  <canvas
                    ref={canvasRefs[i]}
                    className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen group-hover:opacity-80 transition-opacity duration-1000"
                    style={{ display: "block" }}
                  />

                  <div className="pin-card__header relative z-10 mb-6">
                    <div className="pin-card__pill">
                      <span style={{ color: item.accentColor }}>{item.pill}</span>
                    </div>
                    <div className="pin-card__icon" style={{ color: item.accentColor }}>
                      {item.icon}
                    </div>
                  </div>

                  <div className="pin-card__body relative z-10">
                    <h3 className="pin-card__title mb-3">{item.label}</h3>
                    <p className="pin-card__desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pin-spacer-section" />
    </div>
  )
}
