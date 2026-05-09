"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { FiArrowRight } from "react-icons/fi"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ─── data ─── */

interface Service {
  key: string
  phase: string
  index: string
  total: string
  title: string
  headline: string
  description: string
  proof: string[]
  gif: string
  href: string
}

const SERVICES: Service[] = [
  {
    key: "discover",
    phase: "Phase",
    index: "01",
    total: "04",
    title: "Validate & Plan",
    headline: "Know exactly what to build before spending a dollar.",
    description:
      "We compress 6 months of planning into 2 weeks. Validated roadmaps, market-proven direction, and zero scope creep. Your team ships with conviction, not guesses.",
    proof: ["2-week discovery sprint", "Market-validated roadmap", "40+ enterprise customers"],
    gif: "/gif_assetsforservices/Scene.gif",
    href: "/services/discover",
  },
  {
    key: "architect",
    phase: "Phase",
    index: "02",
    total: "04",
    title: "Scale-Ready Systems",
    headline: "Build infrastructure that grows with you, not against you.",
    description:
      "Enterprise-grade architecture designed to scale 10× without rewrites. SOC 2 compliance baked in. Zero technical debt. When traffic spikes, your system breathes.",
    proof: ["99.99% uptime SLA", "SOC 2 Type II certified", "Auto-scaling ready"],
    gif: "/gif_assetsforservices/ORBIT-5-01-LITE.gif",
    href: "/services/architect",
  },
  {
    key: "engineer",
    phase: "Phase",
    index: "03",
    total: "04",
    title: "Rapid Execution",
    headline: "Handpicked senior engineers, zero ramp-up time.",
    description:
      "Production-ready code by week one. Our senior squads plug directly into your workflow—no junior learning curves, no onboarding tax. Just shipping.",
    proof: ["40% faster delivery", "Senior engineers only", "Proven sprint velocity"],
    gif: "/gif_assetsforservices/1-1.gif",
    href: "/services/engineer",
  },
  {
    key: "launch",
    phase: "Phase",
    index: "04",
    total: "04",
    title: "Confident Launch",
    headline: "Ship to millions without the sleepless nights.",
    description:
      "Zero-downtime deploys, real-time monitoring, battle-tested runbooks. Your launch doesn't require a war room. Your team releases on schedule, every time.",
    proof: ["1,000+ successful deploys", "24/7 post-launch support", "Zero critical incidents"],
    gif: "/gif_assetsforservices/Website-landing-page-with-blocs.gif",
    href: "/services/launch",
  },
]

/* ─── color tokens ─── */

const DARK = {
  counterAccent: "#ff5722",
  counterSlash: "rgba(255,255,255,0.25)",
  counterTotal: "rgba(255,255,255,0.30)",
  phaseLabel: "rgba(255,255,255,0.40)",
  titleColor: "#ffffff",
  headlineColor: "rgba(255,255,255,0.82)",
  descColor: "rgba(255,255,255,0.52)",
  sepColor: "rgba(255,255,255,0.10)",
  proofColor: "rgba(255,255,255,0.82)",
  proofBg: "rgba(255,255,255,0.06)",
  proofBorder: "rgba(255,255,255,0.12)",
  svgColor: "rgba(110,230,145,1)",
  eyebrowColor: "rgba(255,255,255,0.42)",
  eyebrowLine: "rgba(255,255,255,0.10)",
  progressBorder: "rgba(255,255,255,0.10)",
  trackBg: "rgba(255,255,255,0.12)",
  indicatorBg: "#ff5722",
  labelColor: "rgba(255,255,255,0.36)",
  ctaColor: "rgba(255,255,255,0.70)",
  ctaBorder: "rgba(255,255,255,0.15)",
}

const LIGHT = {
  counterAccent: "#d94010",
  counterSlash: "rgba(0,0,0,0.25)",
  counterTotal: "rgba(0,0,0,0.35)",
  phaseLabel: "rgba(0,0,0,0.40)",
  titleColor: "#0a0a0a",
  headlineColor: "#1c1c1c",
  descColor: "rgba(0,0,0,0.58)",
  sepColor: "rgba(0,0,0,0.10)",
  proofColor: "#111111",
  proofBg: "rgba(0,0,0,0.04)",
  proofBorder: "rgba(0,0,0,0.10)",
  svgColor: "#0b7c42",
  eyebrowColor: "rgba(0,0,0,0.42)",
  eyebrowLine: "rgba(0,0,0,0.10)",
  progressBorder: "rgba(0,0,0,0.10)",
  trackBg: "rgba(0,0,0,0.12)",
  indicatorBg: "#d94010",
  labelColor: "rgba(0,0,0,0.40)",
  ctaColor: "rgba(0,0,0,0.65)",
  ctaBorder: "rgba(0,0,0,0.14)",
}

/* ─── component ─── */

export function ServicesParallaxShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards       = gsap.utils.toArray<HTMLElement>(".spx-card")
      const progressDots = gsap.utils.toArray<HTMLElement>(".spx-prog-dot")
      const indicators  = gsap.utils.toArray<HTMLElement>(".spx-indicator")
      const n = SERVICES.length

      /* ── color target groups ── */
      const counterNums    = gsap.utils.toArray<HTMLElement>(".spx-counter-num")
      const counterSlashes = gsap.utils.toArray<HTMLElement>(".spx-counter-slash")
      const counterTotals  = gsap.utils.toArray<HTMLElement>(".spx-counter-total")
      const phaseLabels    = gsap.utils.toArray<HTMLElement>(".spx-phase-label")
      const titles         = gsap.utils.toArray<HTMLElement>(".spx-title")
      const headlines      = gsap.utils.toArray<HTMLElement>(".spx-headline")
      const descs          = gsap.utils.toArray<HTMLElement>(".spx-desc")
      const seps           = gsap.utils.toArray<HTMLElement>(".spx-sep")
      const proofItems     = gsap.utils.toArray<HTMLElement>(".spx-proof li")
      const proofSvgs      = gsap.utils.toArray<HTMLElement>(".spx-proof li svg")
      const eyebrowEls     = gsap.utils.toArray<HTMLElement>(".spx-eyebrow-label")
      const eyebrowLines   = gsap.utils.toArray<HTMLElement>(".spx-eyebrow-line")
      const progressEls    = gsap.utils.toArray<HTMLElement>(".spx-progress")
      const tracks         = gsap.utils.toArray<HTMLElement>(".spx-progress-track")
      const progLabels     = gsap.utils.toArray<HTMLElement>(".spx-prog-label")
      const ctaEls         = gsap.utils.toArray<HTMLElement>(".spx-cta")

      /* ── ordered child elements per card for stagger ── */
      const getCardEls = (card: HTMLElement): HTMLElement[] =>
        Array.from(
          card.querySelectorAll<HTMLElement>(
            ".spx-counter-row, .spx-title, .spx-headline, .spx-sep, .spx-desc, .spx-proof, .spx-cta"
          )
        )

      /* ── initial state ──
         All non-first card elements start invisible at a slight y offset.
         We only use gsap.set + tl.to (no fromTo) so reverse-scroll
         always plays cleanly back through the same keyframes.
      ── */
      gsap.set(fillRef.current, { scaleY: 0, transformOrigin: "bottom center" })

      cards.forEach((card, i) => {
        const els = getCardEls(card)
        if (i === 0) {
          gsap.set(els, { autoAlpha: 1, y: 0, x: 0, scale: 1 })
        } else {
          gsap.set(els, { autoAlpha: 0, y: 28, x: 14, scale: 0.92 })
        }
      })

      indicators.forEach((ind, i) => {
        gsap.set(ind, { scaleX: i === 0 ? 1 : 0, transformOrigin: "left center" })
      })
      progressDots.forEach((dot, i) => {
        gsap.set(dot, { opacity: i === 0 ? 1 : 0.3 })
      })

      /* ── timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=480%",
          pin: stageRef.current,
          scrub: 1.4,            // slight lag makes scroll-driven motion feel organic
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      /* Phase 1 (0 → 0.12): cream floods up + colors → light */
      tl.to(fillRef.current, { scaleY: 1, ease: "power2.out", duration: 0.12 }, 0)

      const applyTheme = (theme: typeof DARK, pos: number, dur = 0.10) => {
        tl.to(counterNums,    { color: theme.counterAccent, ease: "power1.inOut", duration: dur }, pos)
        tl.to(counterSlashes, { color: theme.counterSlash,  ease: "power1.inOut", duration: dur }, pos)
        tl.to(counterTotals,  { color: theme.counterTotal,  ease: "power1.inOut", duration: dur }, pos)
        tl.to(phaseLabels,    { color: theme.phaseLabel,    ease: "power1.inOut", duration: dur }, pos)
        tl.to(titles,         { color: theme.titleColor,    ease: "power1.inOut", duration: dur }, pos)
        tl.to(headlines,      { color: theme.headlineColor, ease: "power1.inOut", duration: dur }, pos)
        tl.to(descs,          { color: theme.descColor,     ease: "power1.inOut", duration: dur }, pos)
        tl.to(seps,           { backgroundColor: theme.sepColor,    ease: "power1.inOut", duration: dur }, pos)
        tl.to(eyebrowEls,     { color: theme.eyebrowColor,          ease: "power1.inOut", duration: dur }, pos)
        tl.to(eyebrowLines,   { backgroundColor: theme.eyebrowLine, ease: "power1.inOut", duration: dur }, pos)
        tl.to(proofItems,     { color: theme.proofColor, backgroundColor: theme.proofBg, borderColor: theme.proofBorder, ease: "power1.inOut", duration: dur }, pos)
        tl.to(proofSvgs,      { color: theme.svgColor, ease: "power1.inOut", duration: dur }, pos)
        tl.to(progressEls,    { borderTopColor: theme.progressBorder, ease: "power1.inOut", duration: dur }, pos)
        tl.to(tracks,         { backgroundColor: theme.trackBg,       ease: "power1.inOut", duration: dur }, pos)
        tl.to(indicators,     { backgroundColor: theme.indicatorBg,   ease: "power1.inOut", duration: dur }, pos)
        tl.to(progLabels,     { color: theme.labelColor,    ease: "power1.inOut", duration: dur }, pos)
        tl.to(ctaEls,         { color: theme.ctaColor, borderColor: theme.ctaBorder, ease: "power1.inOut", duration: dur }, pos)
      }

      applyTheme(LIGHT, 0.01)

      /* Phase 2 (0.12 → 0.88): service cycling + horizontal parallax */
      const cycleStart = 0.12
      const cycleEnd   = 0.88
      const cycleRange = cycleEnd - cycleStart
      const perService = cycleRange / n

      // strip drifts left with a very gentle ease so motion feels weighted
      tl.to(
        stripRef.current,
        { xPercent: -((n - 1) / n) * 100, ease: "power1.inOut", duration: cycleRange },
        cycleStart
      )

      SERVICES.forEach((_, i) => {
        const sStart = cycleStart + i * perService

        if (i === 0) {
          // first indicator fills during its window
          tl.to(indicators[0], { scaleX: 1, ease: "none", duration: perService }, cycleStart)
          return
        }

        const exitEls  = getCardEls(cards[i - 1])
        const enterEls = getCardEls(cards[i])

        // timing constants
        const exitDur   = perService * 0.20
        const enterDur  = perService * 0.32
        const gap       = perService * 0.032
        const enterDelay = perService * 0.11

        // ── exit: drift upward + fade — transform+opacity only (no filter:blur during scrub) ──
        exitEls.forEach((el, j) => {
          tl.to(el, {
            autoAlpha: 0,
            y: -18,
            scale: 0.96,
            ease: "power1.in",
            duration: exitDur,
          }, sStart + j * gap)
        })

        // ── enter: slide from right + scale pop — transform+opacity only ──
        enterEls.forEach((el, j) => {
          tl.to(el, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            ease: "back.out(1.1)",
            duration: enterDur,
          }, sStart + enterDelay + j * gap)
        })

        // progress rail
        tl.to(indicators[i - 1], { scaleX: 1, ease: "none", duration: 0.005 }, sStart)
        tl.to(indicators[i],     { scaleX: 1, ease: "none", duration: perService }, sStart)
        tl.to(progressDots[i - 1], { opacity: 0.3, ease: "none", duration: 0.01 }, sStart)
        tl.to(progressDots[i],     { opacity: 1,   ease: "power1.out", duration: perService * 0.18 }, sStart)
      })

      // reset last card's exit elements back to visible for last service hold
      const lastEls = getCardEls(cards[n - 1])
      gsap.set(lastEls, { y: 0 })  // ensure no residual offset after all services

      /* Phase 3 (0.88 → 1.0): cream drains + colors → dark */
      tl.set(fillRef.current, { transformOrigin: "top center" }, 0.88)
      tl.to(fillRef.current, { scaleY: 0, ease: "power2.in", duration: 0.12 }, 0.88)
      applyTheme(DARK, 0.89)
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="spx-root w-full">
      <div ref={stageRef} className="spx-stage">
        <div className="spx-base" />
        <div ref={fillRef} className="spx-fill" aria-hidden />

        <div className="spx-content">
          <div className="spx-grid">

            {/* ── LEFT ── */}
            <div className="spx-left">

              {/* eyebrow */}
              <div className="spx-eyebrow">
                <span className="spx-eyebrow-dot" aria-hidden />
                <span className="spx-eyebrow-label">Our Services</span>
                <span className="spx-eyebrow-line" aria-hidden />
              </div>

              {/* card stack */}
              <div className="spx-cards">
                {SERVICES.map((s) => (
                  <article key={s.key} className="spx-card">

                    {/* counter row */}
                    <div className="spx-counter-row">
                      <span className="spx-counter-num">{s.index}</span>
                      <span className="spx-counter-slash">/</span>
                      <span className="spx-counter-total">{s.total}</span>
                      <span className="spx-phase-label">{s.phase}</span>
                    </div>

                    {/* title */}
                    <h2 className="spx-title">{s.title}</h2>

                    {/* headline */}
                    <p className="spx-headline">{s.headline}</p>

                    {/* separator */}
                    <div className="spx-sep" aria-hidden />

                    {/* description */}
                    <p className="spx-desc">{s.description}</p>

                    {/* proof points */}
                    <ul className="spx-proof">
                      {s.proof.map((p) => (
                        <li key={p}>
                          <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden>
                            <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                          </svg>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a href={s.href} className="spx-cta">
                      <span>Explore {s.title}</span>
                      <FiArrowRight className="spx-cta-arrow" aria-hidden />
                    </a>

                  </article>
                ))}
              </div>

              {/* progress rail */}
              <div className="spx-progress">
                {SERVICES.map((s, i) => (
                  <div key={s.key} className="spx-progress-item">
                    <div className="spx-prog-dot-wrap">
                      <div className="spx-prog-dot" />
                    </div>
                    <div className="spx-progress-track">
                      <div className="spx-indicator" />
                    </div>
                    <span className="spx-prog-label">{String(i + 1).padStart(2, "0")} · {s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="spx-right">
              <div className="spx-viewport">
                <div ref={stripRef} className="spx-strip">
                  {SERVICES.map((s) => (
                    <div key={s.key} className="spx-panel">
                      <div className="spx-panel-frame">
                        <Image
                          src={s.gif}
                          alt={`${s.title} motion graphic`}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="spx-panel-img"
                          priority={s.key === "discover"}
                        />
                        <div className="spx-panel-vignette" aria-hidden />
                      </div>
                      <div className="spx-panel-caption">
                        <span className="spx-panel-caption-num">{s.index}</span>
                        <span className="spx-panel-caption-title">{s.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="spx-fade spx-fade-l" aria-hidden />
                <div className="spx-fade spx-fade-r" aria-hidden />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

        .spx-root { position: relative; width: 100%; }

        .spx-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          isolation: isolate;
        }

        .spx-base {
          position: absolute;
          inset: 0;
          background: #000000;
          z-index: 0;
        }

        .spx-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #f5f2eb 0%, #ede7db 60%, #e5dece 100%);
          z-index: 1;
          will-change: transform;
        }

        .spx-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spx-grid {
          width: 100%;
          max-width: 1440px;
          height: 100%;
          padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 4rem);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        /* ─── LEFT — dark-theme defaults (white on black) ─── */

        .spx-left {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2vw, 2rem);
          max-width: 600px;
        }

        /* eyebrow */
        .spx-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .spx-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff5722;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(255,87,34,0.7);
          animation: spx-pulse 2.4s ease-in-out infinite;
        }

        @keyframes spx-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(0.7); }
        }

        .spx-eyebrow-label {
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
        }

        .spx-eyebrow-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.10);
          max-width: 80px;
        }

        /* card stack */
        .spx-cards {
          position: relative;
          min-height: clamp(320px, 46vh, 480px);
        }

        .spx-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(0.65rem, 1vw, 0.95rem);
          will-change: transform, opacity;
        }

        /* counter row */
        .spx-counter-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          line-height: 1;
        }

        .spx-counter-num {
          font-size: clamp(1.1rem, 1.6vw, 1.4rem);
          font-weight: 700;
          color: #ff5722;
          letter-spacing: -0.01em;
        }

        .spx-counter-slash {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.25);
        }

        .spx-counter-total {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.30);
          letter-spacing: 0.04em;
          margin-right: 0.8rem;
        }

        .spx-phase-label {
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.40);
          border-left: 1px solid rgba(255, 255, 255, 0.14);
          padding-left: 0.8rem;
        }

        /* title */
        .spx-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3.2rem, 6.5vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
        }

        /* headline */
        .spx-headline {
          font-size: clamp(1rem, 1.35vw, 1.2rem);
          line-height: 1.45;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.82);
          margin: 0;
          font-style: italic;
        }

        /* separator */
        .spx-sep {
          width: 48px;
          height: 1px;
          background: rgba(255, 255, 255, 0.10);
          flex-shrink: 0;
        }

        /* description */
        .spx-desc {
          font-size: clamp(0.875rem, 1vw, 0.97rem);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.52);
          margin: 0;
          max-width: 50ch;
        }

        /* proof */
        .spx-proof {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.75rem;
        }

        .spx-proof li {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.82);
          padding: 0.35rem 0.65rem 0.35rem 0.5rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
        }

        .spx-proof li svg {
          color: rgba(110, 230, 145, 1);
          flex-shrink: 0;
        }

        /* CTA */
        .spx-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.70);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 0.2rem;
          align-self: flex-start;
          text-decoration: none;
          transition: gap 0.25s ease;
        }

        .spx-cta:hover {
          gap: 0.8rem;
        }

        :global(.spx-cta-arrow) {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
        }

        /* progress rail */
        .spx-progress {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.10);
        }

        .spx-progress-item {
          display: grid;
          grid-template-columns: 12px 1fr auto;
          align-items: center;
          gap: 0.7rem;
        }

        .spx-prog-dot-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 12px;
          height: 12px;
        }

        .spx-prog-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          transition: background 0.3s;
        }

        .spx-progress-track {
          position: relative;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }

        .spx-indicator {
          position: absolute;
          inset: 0;
          background: #ff5722;
          will-change: transform;
        }

        .spx-prog-label {
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.63rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.36);
          white-space: nowrap;
        }

        /* ─── RIGHT ─── */
        .spx-right {
          position: relative;
          height: 100%;
          min-height: 0;
          display: flex;
          align-items: center;
        }

        .spx-viewport {
          position: relative;
          width: 100%;
          height: min(76vh, 700px);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          background: #0a0a0a;
        }

        .spx-strip {
          display: flex;
          flex-direction: row;
          width: ${SERVICES.length * 100}%;
          height: 100%;
          will-change: transform;
        }

        .spx-panel {
          flex: 0 0 ${100 / SERVICES.length}%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .spx-panel-frame {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        :global(.spx-panel-img) {
          object-fit: cover;
          object-position: center;
        }

        .spx-panel-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 120% 60% at 50% 110%, rgba(0,0,0,0.75) 0%, transparent 75%);
          pointer-events: none;
        }

        .spx-panel-caption {
          position: relative;
          z-index: 1;
          padding: clamp(1rem, 2vw, 1.5rem);
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          color: #fff;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
        }

        .spx-panel-caption-num {
          font-size: clamp(1rem, 1.6vw, 1.3rem);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .spx-panel-caption-title {
          font-size: 0.68rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          opacity: 0.65;
        }

        .spx-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 56px;
          pointer-events: none;
          z-index: 2;
        }

        .spx-fade-l {
          left: 0;
          background: linear-gradient(90deg, rgba(245,242,235,0.85) 0%, transparent 100%);
        }

        .spx-fade-r {
          right: 0;
          background: linear-gradient(270deg, rgba(245,242,235,0.85) 0%, transparent 100%);
        }

        /* responsive */
        @media (max-width: 1024px) {
          .spx-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            overflow-y: auto;
          }

          .spx-left { max-width: none; }

          .spx-cards { min-height: 360px; }

          .spx-viewport { height: min(50vh, 400px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .spx-fill   { transform: scaleY(1) !important; }
          .spx-strip  { transform: none !important; }
          .spx-eyebrow-dot { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default ServicesParallaxShowcase
