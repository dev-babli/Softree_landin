"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow } from "./tokens"
import { ArrowRight, GrainOverlay, InkPill, SoftBlurOrb } from "./primitives"
import Grainient from "./Grainient"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Word-split headline data ── */
const H1 = [
  [{ t: "We", g: false }, { t: "engineer", g: false }, { t: "the", g: false }],
  [{ t: "systems", g: true }, { t: "that", g: false }, { t: "power", g: true }],
  [{ t: "industries.", g: true }],
] as const

/* ── Orbit nodes ── */
const NODES = [
  { label: "Cloud", sub: "Multi-region", icon: "M17.5 19c0-3-2.5-5.5-5.5-5.5S6.5 16 6.5 19M19 19c0-4.5-3.5-8-8-8s-8 3.5-8 8M12 3v4M8 5l4-2 4 2", a: 0 },
  { label: "AI & ML", sub: "Intelligence", icon: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2Zm5 0A2.5 2.5 0 0 1 17 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 14.5 2Z", a: 60 },
  { label: "Security", sub: "Zero-trust", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", a: 120 },
  { label: "Data", sub: "Pipelines", icon: "M12 2v20M2 7h20M2 12h20M2 17h20", a: 180 },
  { label: "DevOps", sub: "SRE & CI/CD", icon: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12v4m0 4h.01", a: 240 },
  { label: "Strategy", sub: "Consulting", icon: "M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Zm3-15-6 3 3 3 6-3-3-3Z", a: 300 },
] as const

const STATS = [
  { v: 99.997, s: "%", l: "Uptime SLA", d: "Across 14 cloud regions", dec: 3 },
  { v: 14, s: "", l: "Global Regions", d: "Edge-deployed & monitored", dec: 0 },
  { v: 500, s: "+", l: "Engineers", d: "Senior tenure, avg 9.1 yr", dec: 0 },
  { v: 90, s: "", l: "Days to Prod", d: "From strategy to shipping", dec: 0 },
] as const

const TRUST = ["Atlas", "Meridian", "Northwind", "Solace", "Orbit Labs", "Paragon", "Cirrus", "Lumen"]

function Counter({ value, suffix, decimals, delay }: { value: number; suffix: string; decimals: number; delay: number }) {
  const r = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = r.current; if (!el) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const o = { v: 0 }
      const t = gsap.to(o, {
        v: value, duration: 1.8, ease: "power2.out", delay,
        onUpdate: () => { el.textContent = (decimals ? o.v.toFixed(decimals) : Math.round(o.v).toString()) + suffix },
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      })
      return () => { t.scrollTrigger?.kill(); t.kill() }
    })
    return () => mm.revert()
  }, [value, suffix, decimals, delay])
  return <span ref={r}>{value}{suffix}</span>
}

export default function LightHeroEngine() {
  const sRef = useRef<HTMLElement>(null)
  const lRef = useRef<HTMLDivElement>(null)
  const oRef = useRef<HTMLDivElement>(null)
  const mRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = sRef.current; if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      const eyebrow = root.querySelector<HTMLElement>("[data-h-eyebrow]")
      if (eyebrow) { gsap.set(eyebrow, { scale: 0.9, opacity: 0 }); tl.to(eyebrow, { scale: 1, opacity: 1, duration: 0.5 }, 0) }

      const words = root.querySelectorAll<HTMLElement>("[data-h-word]")
      if (words.length) { gsap.set(words, { y: 30, opacity: 0 }); tl.to(words, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 }, 0.1) }

      const sub = root.querySelector<HTMLElement>("[data-h-sub]")
      if (sub) { gsap.set(sub, { y: 16, opacity: 0 }); tl.to(sub, { y: 0, opacity: 1, duration: 0.7 }, 0.55) }

      const stats = root.querySelectorAll<HTMLElement>("[data-h-stat]")
      if (stats.length) { gsap.set(stats, { y: 12, opacity: 0 }); tl.to(stats, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.75) }

      const ctas = root.querySelectorAll<HTMLElement>("[data-h-cta]")
      if (ctas.length) { gsap.set(ctas, { scale: 0.96, opacity: 0 }); tl.to(ctas, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.9) }

      const orbit = root.querySelector<HTMLElement>("[data-h-orbit]")
      if (orbit) { gsap.set(orbit, { scale: 0.92, opacity: 0, filter: "blur(8px)" }); tl.to(orbit, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2 }, 0.3) }

      const nodes = root.querySelectorAll<HTMLElement>("[data-o-node]")
      if (nodes.length) { gsap.set(nodes, { scale: 0.8, opacity: 0 }); tl.to(nodes, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.5) }

      const lines = root.querySelectorAll<SVGPathElement>("[data-o-line]")
      lines.forEach((line) => { const len = line.getTotalLength(); gsap.set(line, { strokeDasharray: len, strokeDashoffset: len }); tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.8) })

      /* idle */
      const core = root.querySelector<HTMLElement>("[data-o-core]")
      if (core) gsap.to(core, { scale: 1.1, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 })
      nodes.forEach((node, i) => { gsap.to(node, { y: i % 2 === 0 ? -6 : 6, duration: 3 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 }) })

      /* scroll parallax */
      if (lRef.current) gsap.to(lRef.current, { yPercent: -8, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 } })
      if (oRef.current) gsap.to(oRef.current, { rotation: 6, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 } })
      if (mRef.current) gsap.to(mRef.current, { opacity: 0, y: 20, ease: "none", scrollTrigger: { trigger: root, start: "60% top", end: "bottom top", scrub: true } })

      return () => { tl.kill() }
    })
    return () => mm.revert()
  }, { scope: sRef })

  return (
    <section ref={sRef} className="relative w-full overflow-hidden" style={{ background: color.canvas, minHeight: "100vh" }}>
      {/* BG */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: 0.5, filter: "blur(32px) saturate(1.05)" }}>
        <Grainient color1={color.yellow} color2={color.sunshine} color3={color.cream} timeSpeed={0.15} warpStrength={1.2} warpFrequency={3.6} warpSpeed={1.2} warpAmplitude={70} blendAngle={25} blendSoftness={0.22} rotationAmount={240} noiseScale={1.6} grainAmount={0} contrast={1.15} saturation={0.95} zoom={1.08} centerX={0.15} centerY={-0.12} />
      </div>
      <SoftBlurOrb size={600} color={color.sunshine} blur={120} opacity={0.3} style={{ right: -200, top: -180 }} />
      <SoftBlurOrb size={420} color={color.cream} blur={90} opacity={0.45} style={{ left: -140, bottom: -100 }} />
      <GrainOverlay opacity={0.12} blendMode="overlay" scale={1.2} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-12 px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8">
        {/* LEFT */}
        <div ref={lRef} className="relative z-10">
          <div data-h-eyebrow className="mb-8 inline-flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2" style={{ padding: "6px 14px", borderRadius: 999, background: color.ink, color: color.canvas, fontSize: 12, fontWeight: 700, letterSpacing: "0.56px", textTransform: "uppercase" }}>
              <span aria-hidden className="inline-block" style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight, boxShadow: `0 0 8px ${color.signalLight}` }} />
              Enterprise Technology Partner
            </span>
          </div>

          <h1 style={{ fontFamily: "inherit", fontSize: "clamp(42px,7vw,96px)", fontWeight: 500, lineHeight: 0.96, letterSpacing: "-0.032em", color: color.ink, textWrap: "balance" }}>
            {H1.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={wi} data-h-word className="inline-block" style={{ marginRight: "0.28em", backgroundImage: w.g ? `linear-gradient(92deg,${color.mistral} 0%,${color.flame} 40%,${color.sunshine} 75%,${color.yellow} 100%)` : undefined, backgroundClip: w.g ? "text" : undefined, WebkitBackgroundClip: w.g ? "text" : undefined, color: w.g ? "transparent" : color.ink }}>{w.t}</span>
                ))}
              </span>
            ))}
          </h1>

          <p data-h-sub className="mt-8 max-w-[560px]" style={{ fontSize: 18, fontWeight: 450, lineHeight: 1.5, color: color.charcoal, opacity: 0 }}>
            From cloud infrastructure to AI operations, cybersecurity to 24/7 managed services. We design, build, and run the technology backbone of modern enterprises.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
            {STATS.map((st) => (
              <div key={st.l} data-h-stat style={{ opacity: 0 }}>
                <div style={{ fontFamily: "inherit", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-1.5px", color: color.ink }}>
                  <Counter value={st.v} suffix={st.s} decimals={st.dec} delay={0.8} />
                </div>
                <div className="mt-1.5" style={{ fontSize: 14, fontWeight: 500, color: color.ink, letterSpacing: "-0.3px" }}>{st.l}</div>
                <div style={{ fontSize: 12, fontWeight: 450, color: color.slate, marginTop: 2 }}>{st.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div data-h-cta style={{ opacity: 0 }}><InkPill href="#contact" size="lg">Start transformation <ArrowRight /></InkPill></div>
            <div data-h-cta style={{ opacity: 0 }}><InkPill href="#services" size="lg" variant="cream">Explore capabilities</InkPill></div>
          </div>
        </div>

        {/* RIGHT — Capability Orbit */}
        <div ref={oRef} data-h-orbit className="relative mx-auto hidden lg:block" style={{ width: 520, height: 520, opacity: 0 }}>
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 520" aria-hidden>
            {NODES.map((n) => {
              const cx = 260, cy = 260, r = 190, rad = (n.a * Math.PI) / 180
              return <path key={n.label} data-o-line d={`M ${cx} ${cy} L ${cx + r * Math.cos(rad)} ${cy + r * Math.sin(rad)}`} stroke={color.ink + "18"} strokeWidth="1" fill="none" strokeLinecap="round" />
            })}
            <circle cx="260" cy="260" r="190" fill="none" stroke={color.ink + "10"} strokeWidth="1" strokeDasharray="6 6" />
          </svg>

          <div data-o-core className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle,${color.white} 0%,${color.cream} 40%,${color.gold}88 70%,transparent 100%)`, boxShadow: `0 0 60px ${color.sunshine}55,inset 0 0 30px ${color.white}`, display: "grid", placeItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.48px", textTransform: "uppercase", color: color.ink }}>Core</span>
          </div>

          {NODES.map((n) => {
            const r = 190, rad = (n.a * Math.PI) / 180, nx = 260 + r * Math.cos(rad), ny = 260 + r * Math.sin(rad)
            return (
              <div key={n.label} className="absolute" style={{ left: nx, top: ny, transform: "translate(-50%,-50%)", width: 130 }}>
                <div data-o-node className="flex flex-col items-center gap-2 rounded-xl p-3" style={{ background: color.white, border: `1px solid ${color.ink}12`, boxShadow: shadow.pill, opacity: 0 }}>
                  <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: color.cream, color: color.mistral }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={n.icon} /></svg>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: 12, fontWeight: 600, color: color.ink, letterSpacing: "-0.2px" }}>{n.label}</div>
                    <div style={{ fontSize: 11, fontWeight: 450, color: color.slate, marginTop: 1 }}>{n.sub}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Marquee */}
      <div ref={mRef} className="relative overflow-hidden border-y" style={{ borderColor: `${color.ink}15`, background: color.lifted, marginTop: 40 }}>
        <div className="flex animate-[softreeMarquee_38s_linear_infinite] gap-16 whitespace-nowrap py-5 pl-10">
          {[...Array(2)].flatMap((_, rep) => TRUST.map((name) => (
            <span key={`${rep}-${name}`} style={{ fontFamily: "inherit", fontSize: 24, fontWeight: 500, letterSpacing: "-0.5px", color: color.ink, opacity: 0.72, display: "inline-flex", alignItems: "center", gap: 32 }}>
              {name}
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: color.signalLight, display: "inline-block" }} />
            </span>
          )))}
        </div>
      </div>
    </section>
  )
}
