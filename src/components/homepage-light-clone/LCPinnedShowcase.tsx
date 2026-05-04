"use client"

/**
 * LCPinnedShowcase — light clone of PinnedShowcaseSection.
 * Self-contained: ships its own styled-jsx CSS instead of relying on globals.css
 * `.pin-*` classes. GSAP ScrollTrigger pinning + scrub timeline preserved.
 * Cream surface, ink text, flame/sunshine accents on canvas.
 */

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Cpu, Layout, Globe, Database } from "lucide-react"
import { color } from "./tokens"

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  }, [drawFn])
  return canvasRef
}

const FLAME = "251,100,36"
const SUN = "255,161,16"

function drawAI(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const pts = 40
  for (let i = 0; i < pts; i++) {
    const seed = i * 137.508
    const px = (Math.sin(seed) * 0.5 + 0.5) * w
    const py = (Math.cos(seed * 0.7) * 0.5 + 0.5) * h
    const pulse = (Math.sin(t * 0.04 + i * 0.9) + 1) / 2
    ctx.beginPath(); ctx.arc(px, py, 1.5 + pulse * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${FLAME},${0.15 + pulse * 0.4})`; ctx.fill()
    for (let j = i + 1; j < pts; j++) {
      const seed2 = j * 137.508
      const qx = (Math.sin(seed2) * 0.5 + 0.5) * w
      const qy = (Math.cos(seed2 * 0.7) * 0.5 + 0.5) * h
      const d = Math.hypot(px - qx, py - qy)
      const maxDist = Math.min(w, h) * 0.3
      if (d < maxDist) {
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy)
        ctx.strokeStyle = `rgba(${FLAME},${0.08 * (1 - d / maxDist) * pulse})`
        ctx.lineWidth = 1; ctx.stroke()
      }
    }
  }
}

function drawWeb(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2
  ctx.strokeStyle = `rgba(${SUN},0.25)`; ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    const off = Math.sin(t * 0.02 + i * 1.1) * 10
    const fw = w * 0.44 + i * 18; const fh = h * 0.35 + i * 12
    ctx.strokeRect(cx - fw / 2 + off, cy - fh / 2 - off * 0.5, fw, fh)
  }
}

function drawGlobe(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2, cy = h / 2; const R = Math.min(w, h) * 0.4
  for (let lat = -80; lat <= 80; lat += 20) {
    const y0 = Math.sin((lat * Math.PI) / 180) * R
    const r0 = Math.cos((lat * Math.PI) / 180) * R
    ctx.beginPath(); ctx.ellipse(cx, cy + y0, r0, r0 * 0.25, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${FLAME},0.18)`; ctx.stroke()
  }
}

function drawData(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cw = w * 0.1; const spacing = w * 0.13; const startX = w * 0.08; const dbY = h * 0.45
  for (let i = 0; i < 3; i++) {
    const ch = h * 0.22 + Math.sin(t * 0.04 + i * 1.2) * h * 0.04
    ctx.fillStyle = `rgba(${SUN},0.20)`
    ctx.fillRect(startX + i * spacing, dbY, cw, ch)
  }
}

interface ShowcaseItem {
  label: string; pill: string; desc: string
  accentColor: string; glowColor: string
  icon: React.ReactNode
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
}

const ITEMS_DATA: ShowcaseItem[] = [
  { label: "Discover", pill: "PHASE 01", desc: "Deep-dive research, stakeholder mapping, and strategic roadmapping to align technology with business objectives.",
    accentColor: color.flame, glowColor: "rgba(251,100,36,0.16)", icon: <Cpu className="h-5 w-5" />, drawFn: drawAI },
  { label: "Architect", pill: "PHASE 02", desc: "System blueprints, data models, and cinematic UI prototypes engineered for enterprise-grade resilience.",
    accentColor: color.sunshine, glowColor: "rgba(255,161,16,0.16)", icon: <Layout className="h-5 w-5" />, drawFn: drawWeb },
  { label: "Engineer", pill: "PHASE 03", desc: "Production-grade code, CI/CD pipelines, and seamless third-party integrations built for speed and reliability.",
    accentColor: color.flame, glowColor: "rgba(251,100,36,0.16)", icon: <Globe className="h-5 w-5" />, drawFn: drawGlobe },
  { label: "Launch", pill: "PHASE 04", desc: "Zero-downtime deployments, performance monitoring, and elastic scaling that grows with your business.",
    accentColor: color.sunshine, glowColor: "rgba(255,161,16,0.16)", icon: <Database className="h-5 w-5" />, drawFn: drawData },
]

export function LCPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRefs = [
    useCanvas(drawAI),
    useCanvas(drawWeb),
    useCanvas(drawGlobe),
    useCanvas(drawData),
  ]

  useGSAP(() => {
    const list = containerRef.current?.querySelector(".lc-pin-list") as HTMLElement | null
    const fill = containerRef.current?.querySelector(".lc-pin-fill") as HTMLElement | null
    if (!list) return
    const listItems = gsap.utils.toArray<HTMLElement>("li", list)
    const slides = gsap.utils.toArray<HTMLElement>(".lc-pin-slide", containerRef.current!)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current?.querySelector(".lc-pin-section") as Element,
        start: "top top",
        end: "+=" + listItems.length * 50 + "%",
        pin: true,
        scrub: true,
      },
    })

    if (fill) {
      gsap.set(fill, { scaleY: 1 / listItems.length, transformOrigin: "top left" })
    }

    listItems.forEach((item, i) => {
      const previous = listItems[i - 1]
      if (previous) {
        tl.set(item, { color: color.flame }, 0.5 * i)
          .to(slides[i], { autoAlpha: 1, duration: 0.2 }, "<")
          .set(previous, { color: color.slate }, "<")
          .to(slides[i - 1], { autoAlpha: 0, duration: 0.2 }, "<")
      } else {
        gsap.set(item, { color: color.flame })
        gsap.set(slides[i], { autoAlpha: 1 })
      }
    })

    if (fill) {
      tl.to(fill, { scaleY: 1, transformOrigin: "top left", ease: "none", duration: tl.duration() }, 0).to({}, {})
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="lc-pin-showcase">
      <section className="lc-pin-spacer-section">
        <div className="lc-pin-spacer-inner">
          <div className="lc-pin-label-row">
            <div className="lc-pin-label-line" />
            <span className="lc-pin-label-tag">Our Delivery Framework</span>
          </div>
          <h2 className="lc-pin-hero-heading">
            How We <span className="lc-pin-hero-dim">Build</span>
          </h2>
          <p className="lc-pin-hero-sub">
            Four precision-engineered phases that transform vision into production-grade reality.
          </p>
        </div>
      </section>

      <section className="lc-pin-section">
        <div className="lc-pin-content">
          <div className="lc-pin-left-col">
            <ul className="lc-pin-list">
              {ITEMS_DATA.map((item, i) => (
                <li key={i}>
                  <span className="lc-pin-list-number">0{i + 1}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lc-pin-fill" />

          <div className="lc-pin-right">
            {ITEMS_DATA.map((item, i) => (
              <div key={i} className="lc-pin-slide lc-pin-center">
                <div className="lc-pin-card group min-h-[320px] flex flex-col justify-center">
                  <div className="lc-pin-card__glow" style={{ background: `radial-gradient(600px circle at 30% 20%, ${item.glowColor}, transparent 70%)` }} />
                  <canvas ref={canvasRefs[i]} className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-70 transition-opacity duration-1000" style={{ display: "block" }} />
                  <div className="lc-pin-card__header relative z-10 mb-6">
                    <div className="lc-pin-card__pill">
                      <span style={{ color: item.accentColor }}>{item.pill}</span>
                    </div>
                    <div className="lc-pin-card__icon" style={{ color: item.accentColor }}>{item.icon}</div>
                  </div>
                  <div className="lc-pin-card__body relative z-10">
                    <h3 className="lc-pin-card__title mb-3">{item.label}</h3>
                    <p className="lc-pin-card__desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lc-pin-spacer-section" />

      <style jsx>{`
        .lc-pin-showcase {
          width: 100%;
          font-family: "Outfit", sans-serif;
          background: ${color.canvas};
          color: ${color.ink};
          position: relative;
          overflow: hidden;
        }
        .lc-pin-spacer-section {
          position: relative;
          width: 100%;
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(3rem, 6vw, 6rem) 1.5rem;
        }
        .lc-pin-spacer-inner {
          width: min(100%, 1240px);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .lc-pin-label-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: ${color.flame};
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .lc-pin-label-line {
          width: 44px;
          height: 1px;
          background: linear-gradient(90deg, ${color.flame}, transparent);
          opacity: 0.75;
        }
        .lc-pin-hero-heading {
          margin: 0;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 0.95;
          color: ${color.ink};
        }
        .lc-pin-hero-dim { color: ${color.slate}; }
        .lc-pin-hero-sub {
          max-width: 560px;
          margin: 0;
          color: ${color.slate};
          font-size: 1rem;
          line-height: 1.6;
        }
        .lc-pin-section {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(1rem, 4vw, 3rem);
        }
        .lc-pin-content {
          position: relative;
          width: min(100%, 1240px);
          display: grid;
          grid-template-columns: 320px 4px 1fr;
          gap: 2.5rem;
          height: 70vh;
          align-items: stretch;
        }
        .lc-pin-left-col { position: relative; }
        .lc-pin-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;
          height: 100%;
        }
        .lc-pin-list li {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          font-size: clamp(1.5rem, 2.4vw, 2.4rem);
          font-weight: 900;
          color: ${color.slate};
          transition: color 0.3s ease;
        }
        .lc-pin-list-number {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: ${color.dustTaupe};
        }
        .lc-pin-fill {
          position: relative;
          width: 4px;
          background: linear-gradient(180deg, ${color.flame}, ${color.sunshine});
          border-radius: 4px;
          align-self: stretch;
        }
        .lc-pin-right {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .lc-pin-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
        }
        .lc-pin-card {
          position: relative;
          height: 100%;
          border-radius: 24px;
          background: ${color.lifted};
          border: 1px solid ${color.dustTaupe};
          padding: clamp(1.75rem, 3vw, 2.75rem);
          overflow: hidden;
          box-shadow:
            rgba(127, 99, 21, 0.12) -8px 16px 39px,
            rgba(127, 99, 21, 0.10) -33px 64px 72px,
            rgba(127, 99, 21, 0.06) -73px 144px 97px;
        }
        .lc-pin-card__glow {
          position: absolute;
          inset: 0;
          opacity: 0.6;
          pointer-events: none;
        }
        .lc-pin-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .lc-pin-card__pill {
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          background: ${color.canvas};
          border: 1px solid ${color.dustTaupe};
        }
        .lc-pin-card__pill span {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .lc-pin-card__icon {
          display: flex;
          height: 56px;
          width: 56px;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: ${color.canvas};
          border: 1px solid ${color.dustTaupe};
          box-shadow: 0 10px 30px rgba(127, 99, 21, 0.18);
        }
        .lc-pin-card__title {
          font-size: 2rem;
          font-weight: 900;
          color: ${color.ink};
          line-height: 1.1;
        }
        .lc-pin-card__desc {
          font-size: 15px;
          font-weight: 500;
          color: ${color.slate};
          line-height: 1.55;
          max-width: 60ch;
        }
        @media (max-width: 900px) {
          .lc-pin-section {
            height: auto;
            padding: 4rem 0;
          }
          .lc-pin-content {
            grid-template-columns: 1fr;
            height: auto;
          }
          .lc-pin-fill { display: none; }
          .lc-pin-right { height: auto; min-height: 480px; }
          .lc-pin-card { padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  )
}

export default LCPinnedShowcase
