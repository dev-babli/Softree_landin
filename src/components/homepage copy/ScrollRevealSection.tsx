"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowRight, CheckCircle2, LineChart, ShieldCheck, Sparkles, Workflow } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STORY_CARDS = [
  {
    title: "AI intake",
    label: "Capture",
    metric: "18h",
    copy: "Briefs, tickets, and documents become clean work packets with the right context attached.",
    image: "/whysoftree/ai.webp",
  },
  {
    title: "Workflow routing",
    label: "Coordinate",
    metric: "42%",
    copy: "Approvals move through Teams, M365, and internal tools without losing ownership.",
    image: "/team-collaboration-interface-with-shared-workspace.jpg",
  },
  {
    title: "Live decisions",
    label: "Measure",
    metric: "98%",
    copy: "Power BI and product analytics keep leadership aligned on what changed and why.",
    image: "/analytics-dashboard.png",
  },
]

const SIGNALS = [
  { icon: Sparkles, label: "AI agents", value: "Governed" },
  { icon: Workflow, label: "Operations", value: "Connected" },
  { icon: ShieldCheck, label: "Security", value: "Visible" },
  { icon: LineChart, label: "Analytics", value: "Live" },
]

export function ScrollRevealSection() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      const images = gsap.utils.toArray<HTMLImageElement>("img", root)
      const refresh = () => ScrollTrigger.refresh()
      const cleanupImageListeners = () => {
        images.forEach((image) => image.removeEventListener("load", refresh))
      }

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", refresh, { once: true })
        }
      })

      mm.add(
        {
          isDesktop: "(min-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean
            reduceMotion: boolean
          }

          const pin = q(".softree-story-pin")[0]
          const introItems = q(".softree-story-intro > *")
          const secondItems = q(".softree-story-second > *")
          const finaleItems = q(".softree-story-finale > *")
          const cards = q(".softree-story-card")
          const metrics = q(".softree-story-signal")
          const deviceLayers = q(".softree-story-device-layer")

          if (reduceMotion) {
            gsap.set(
              [
                introItems,
                secondItems,
                finaleItems,
                cards,
                metrics,
                deviceLayers,
                q(".softree-story-device"),
                q(".softree-story-orbit"),
              ],
              { clearProps: "all", autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0 }
            )
            gsap.set(root, { "--story-progress": 1 })
            return
          }

          gsap.set(root, { "--story-progress": 0 })
          gsap.set(introItems, { autoAlpha: 0, y: 34 })
          gsap.set(secondItems, { autoAlpha: 0, y: 42 })
          gsap.set(finaleItems, { autoAlpha: 0, y: 28 })
          gsap.set(metrics, { autoAlpha: 0, y: 16 })
          gsap.set(cards, {
            autoAlpha: 0,
            y: isDesktop ? 90 : 56,
            x: (index) => (isDesktop ? (index - 1) * 160 : 0),
            scale: 0.86,
            rotation: (index) => (isDesktop ? (index - 1) * 8 : 0),
            transformOrigin: "50% 80%",
          })
          gsap.set(deviceLayers, { autoAlpha: 0, y: 24, scale: 0.98 })
          gsap.set(q(".softree-story-second"), { pointerEvents: "none" })
          gsap.set(q(".softree-story-finale"), { pointerEvents: "none" })

          gsap
            .timeline({
              scrollTrigger: {
                trigger: root,
                start: "top 72%",
                once: true,
              },
              defaults: { duration: 0.75, ease: "power3.out" },
            })
            .to(introItems, { autoAlpha: 1, y: 0, stagger: 0.08 })
            .fromTo(
              q(".softree-story-orbit"),
              { autoAlpha: 0, scale: 0.86, rotation: -8 },
              { autoAlpha: 1, scale: 1, rotation: 0 },
              "<0.08"
            )
            .fromTo(
              q(".softree-story-device"),
              { autoAlpha: 0, y: 48, scale: 0.9, rotation: -3 },
              { autoAlpha: 1, y: 0, scale: 1, rotation: 0 },
              "<0.12"
            )

          const scrollTl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: isDesktop ? "+=260%" : "+=190%",
              scrub: 0.9,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          scrollTl
            .to(root, { "--story-progress": 1, duration: 1 }, 0)
            .to(q(".softree-story-bg-base"), { scale: 1.04, yPercent: -6, duration: 0.42 }, 0)
            .to(q(".softree-story-bg-accent"), { scale: 1.18, yPercent: 8, duration: 0.42 }, 0)
            .to(introItems, { autoAlpha: 0, y: -44, stagger: 0.02, duration: 0.22 }, 0.1)
            .to(q(".softree-story-device"), { y: isDesktop ? -54 : -26, scale: isDesktop ? 0.74 : 0.78, duration: 0.34 }, 0.08)
            .to(q(".softree-story-orbit"), { scale: 1.14, rotation: 10, autoAlpha: 0.42, duration: 0.36 }, 0.08)
            .to(secondItems, { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.24 }, 0.28)
            .set(q(".softree-story-second"), { pointerEvents: "auto" }, 0.34)
            .to(deviceLayers, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.045, duration: 0.18 }, 0.34)
            .to(metrics, { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.22 }, 0.42)
            .to(cards, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.24 }, 0.48)
            .to(
              cards,
              {
                x: (index) => (isDesktop ? (index - 1) * 46 : 0),
                y: (index) => (isDesktop ? Math.abs(index - 1) * 22 : index * 10),
                scale: (index) => (index === 1 ? 1 : isDesktop ? 0.9 : 0.94),
                rotation: (index) => (isDesktop ? (index - 1) * -4 : 0),
                duration: 0.28,
              },
              0.62
            )
            .to(q(".softree-story-second"), { autoAlpha: 0, y: -34, duration: 0.2 }, 0.78)
            .set(q(".softree-story-second"), { pointerEvents: "none" }, 0.8)
            .to(q(".softree-story-card:nth-child(1)"), { x: isDesktop ? -220 : 0, y: isDesktop ? 62 : 32, scale: 0.82, autoAlpha: 0.62, duration: 0.22 }, 0.8)
            .to(q(".softree-story-card:nth-child(3)"), { x: isDesktop ? 220 : 0, y: isDesktop ? 62 : 32, scale: 0.82, autoAlpha: 0.62, duration: 0.22 }, 0.8)
            .to(q(".softree-story-card:nth-child(2)"), { y: isDesktop ? -24 : -8, scale: 1.05, duration: 0.22 }, 0.8)
            .to(finaleItems, { autoAlpha: 1, y: 0, stagger: 0.045, duration: 0.18 }, 0.84)
            .set(q(".softree-story-finale"), { pointerEvents: "auto" }, 0.9)

          return cleanupImageListeners
        }
      )

      return () => {
        cleanupImageListeners()
        mm.revert()
      }
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="softree-story-section" aria-labelledby="softree-story-title">
      <div className="softree-story-pin">
        <div className="softree-story-background" aria-hidden="true">
          <img className="softree-story-bg-base" src="/gsap-sections/section-bg-3.png" alt="" />
          <img className="softree-story-bg-accent" src="/gsap-sections/section-bg-5.png" alt="" />
          <div className="softree-story-grid" />
          <div className="softree-story-vignette" />
        </div>

        <div className="softree-story-shell">
          <div className="softree-story-copy">
            <div className="softree-story-intro">
              <span className="softree-story-kicker">
                <span />
                Scroll system
              </span>
              <h2 id="softree-story-title">Operations and beyond</h2>
              <p>
                A Softree build connects the messy middle of work: intake, AI decisions,
                approvals, apps, and reporting in one moving system.
              </p>
              <a href="/contact" className="softree-story-cta">
                <span>Map your workflow</span>
                <ArrowRight aria-hidden />
              </a>
            </div>

            <div className="softree-story-second">
              <span className="softree-story-kicker">
                <span />
                Workflow reimagined
              </span>
              <h3>Your process becomes a product people can trust.</h3>
              <p>
                Scroll through the delivery path. Every layer reveals a working part
                of the system, from the first request to the final dashboard.
              </p>
            </div>

            <div className="softree-story-finale">
              <span className="softree-story-kicker">
                <span />
                Delivery loop
              </span>
              <h3>Launch the system, then keep improving it.</h3>
              <p>
                We ship the first durable workflow, instrument it, and use the data to
                decide the next automation worth building.
              </p>
            </div>
          </div>

          <div className="softree-story-stage" aria-label="Softree workflow reveal">
            <div className="softree-story-orbit" aria-hidden="true" />

            <div className="softree-story-device" aria-hidden="true">
              <div className="softree-story-device-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="softree-story-device-screen">
                <div className="softree-story-device-layer softree-story-device-layer-top">
                  <span>Request queue</span>
                  <strong>34 active workflows</strong>
                </div>
                <div className="softree-story-device-layer softree-story-device-layer-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="softree-story-device-layer softree-story-device-layer-row">
                  <CheckCircle2 aria-hidden />
                  <span>AI triage complete</span>
                </div>
                <div className="softree-story-device-layer softree-story-device-layer-row">
                  <CheckCircle2 aria-hidden />
                  <span>Owner and SLA assigned</span>
                </div>
                <div className="softree-story-device-layer softree-story-device-layer-row">
                  <CheckCircle2 aria-hidden />
                  <span>Power BI signal published</span>
                </div>
              </div>
            </div>

            <div className="softree-story-signals">
              {SIGNALS.map((signal) => {
                const Icon = signal.icon
                return (
                  <div className="softree-story-signal" key={signal.label}>
                    <Icon aria-hidden />
                    <span>{signal.label}</span>
                    <strong>{signal.value}</strong>
                  </div>
                )
              })}
            </div>

            <div className="softree-story-cards">
              {STORY_CARDS.map((card) => (
                <article className="softree-story-card" key={card.title}>
                  <div className="softree-story-card-media">
                    <img src={card.image} alt="" />
                  </div>
                  <div className="softree-story-card-body">
                    <div>
                      <span>{card.label}</span>
                      <strong>{card.metric}</strong>
                    </div>
                    <h4>{card.title}</h4>
                    <p>{card.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="softree-story-progress" aria-hidden="true">
          <span />
        </div>
      </div>

      <style jsx>{`
        .softree-story-section {
          --story-progress: 0;
          width: 100%;
          background: #020202;
          color: #ffffff;
          overflow: clip;
        }

        .softree-story-pin {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: clip;
          isolation: isolate;
          background: #020202;
        }

        .softree-story-background,
        .softree-story-background img,
        .softree-story-grid,
        .softree-story-vignette {
          position: absolute;
          inset: 0;
        }

        .softree-story-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.42;
          will-change: transform;
          pointer-events: none;
        }

        .softree-story-bg-base {
          filter: saturate(0.8) contrast(1.08) brightness(0.65);
          transform: scale(1.12);
        }

        .softree-story-bg-accent {
          mix-blend-mode: screen;
          opacity: 0.26 !important;
          filter: hue-rotate(145deg) saturate(1.4) blur(1px);
          transform: scale(1.05);
        }

        .softree-story-grid {
          z-index: 1;
          opacity: 0.12;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at 68% 44%, black 0%, transparent 72%);
        }

        .softree-story-vignette {
          z-index: 2;
          background:
            radial-gradient(circle at 72% 45%, rgba(0, 137, 255, 0.24), transparent 34%),
            radial-gradient(circle at 18% 28%, rgba(10, 228, 72, 0.12), transparent 28%),
            linear-gradient(90deg, rgba(2, 2, 2, 0.95) 0%, rgba(2, 2, 2, 0.6) 44%, rgba(2, 2, 2, 0.88) 100%),
            linear-gradient(180deg, #020202 0%, transparent 22%, transparent 72%, #020202 100%);
        }

        .softree-story-shell {
          position: relative;
          z-index: 4;
          width: min(100% - 2rem, 1240px);
          min-height: 100svh;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(460px, 1.1fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
          padding: clamp(5.5rem, 9vw, 7rem) 0 clamp(3.5rem, 7vw, 5rem);
        }

        .softree-story-copy {
          position: relative;
          min-height: min(520px, 72svh);
          display: grid;
          align-items: center;
        }

        .softree-story-intro,
        .softree-story-second,
        .softree-story-finale {
          grid-area: 1 / 1;
          display: grid;
          gap: 1.2rem;
          align-content: center;
          max-width: 560px;
        }

        .softree-story-second,
        .softree-story-finale {
          opacity: 0;
        }

        .softree-story-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          width: fit-content;
          color: rgba(255, 255, 255, 0.58);
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .softree-story-kicker span {
          width: 2.35rem;
          height: 1px;
          background: linear-gradient(90deg, #0ae448, rgba(255, 255, 255, 0));
        }

        .softree-story-copy h2,
        .softree-story-copy h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(3.2rem, 8.4vw, 7.25rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .softree-story-copy h3 {
          font-size: clamp(2.6rem, 5.4vw, 5.2rem);
          max-width: 10ch;
        }

        .softree-story-copy p {
          max-width: 42rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.66);
          font-size: clamp(1rem, 1.2vw, 1.12rem);
          line-height: 1.72;
        }

        .softree-story-cta {
          width: fit-content;
          min-height: 3.4rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            linear-gradient(135deg, rgba(10, 228, 72, 0.2), rgba(0, 137, 255, 0.18)),
            rgba(255, 255, 255, 0.06);
          color: #fff;
          padding: 0 1.25rem 0 1.45rem;
          font-size: 0.95rem;
          font-weight: 750;
          line-height: 1;
          text-decoration: none;
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background-color 180ms ease;
        }

        .softree-story-cta:hover,
        .softree-story-cta:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.28);
          outline: none;
        }

        .softree-story-cta :global(svg) {
          width: 1.05rem;
          height: 1.05rem;
        }

        .softree-story-stage {
          position: relative;
          min-height: min(720px, 78svh);
          display: grid;
          place-items: center;
          perspective: 1400px;
        }

        .softree-story-orbit {
          position: absolute;
          width: min(620px, 78vw);
          aspect-ratio: 1;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background:
            radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent 48%),
            conic-gradient(from 110deg, rgba(10, 228, 72, 0.35), rgba(0, 137, 255, 0.25), transparent, rgba(10, 228, 72, 0.35));
          mask-image: radial-gradient(circle, transparent 52%, black 53%, black 54%, transparent 56%);
          opacity: 0;
          will-change: transform, opacity;
        }

        .softree-story-device {
          position: relative;
          z-index: 5;
          width: min(360px, 50vw);
          min-width: 300px;
          aspect-ratio: 0.72 / 1;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 2rem;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.03)),
            rgba(7, 9, 13, 0.72);
          box-shadow:
            0 46px 120px rgba(0, 0, 0, 0.54),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
          padding: 0.9rem;
          backdrop-filter: blur(26px) saturate(170%);
          -webkit-backdrop-filter: blur(26px) saturate(170%);
          will-change: transform, opacity;
        }

        .softree-story-device-bar {
          display: flex;
          align-items: center;
          gap: 0.42rem;
          height: 1.4rem;
          padding-inline: 0.35rem;
        }

        .softree-story-device-bar span {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.26);
        }

        .softree-story-device-screen {
          position: relative;
          height: calc(100% - 1.4rem);
          overflow: hidden;
          border-radius: 1.35rem;
          background:
            linear-gradient(180deg, rgba(245, 250, 255, 0.96), rgba(218, 235, 255, 0.88)),
            #dff0ff;
          color: #08111f;
          padding: 1rem;
        }

        .softree-story-device-screen::before {
          content: "";
          position: absolute;
          inset: -22% -38% auto auto;
          width: 78%;
          aspect-ratio: 1;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(0, 137, 255, 0.28), transparent 64%);
        }

        .softree-story-device-layer {
          position: relative;
          z-index: 2;
          will-change: transform, opacity;
        }

        .softree-story-device-layer-top {
          display: grid;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }

        .softree-story-device-layer-top span {
          color: rgba(8, 17, 31, 0.48);
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .softree-story-device-layer-top strong {
          color: #08111f;
          font-size: clamp(1.55rem, 2vw, 2rem);
          line-height: 1;
          letter-spacing: 0;
        }

        .softree-story-device-layer-chart {
          height: 8.2rem;
          display: flex;
          align-items: end;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(12, 32, 70, 0.1);
          background: rgba(255, 255, 255, 0.58);
          padding: 0.7rem;
        }

        .softree-story-device-layer-chart span {
          flex: 1;
          min-width: 0;
          border-radius: 999px 999px 0.35rem 0.35rem;
          background: linear-gradient(180deg, #0089ff, #0ae448);
          box-shadow: 0 8px 20px rgba(0, 137, 255, 0.18);
        }

        .softree-story-device-layer-chart span:nth-child(1) {
          height: 44%;
        }

        .softree-story-device-layer-chart span:nth-child(2) {
          height: 64%;
        }

        .softree-story-device-layer-chart span:nth-child(3) {
          height: 52%;
        }

        .softree-story-device-layer-chart span:nth-child(4) {
          height: 78%;
        }

        .softree-story-device-layer-chart span:nth-child(5) {
          height: 90%;
        }

        .softree-story-device-layer-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          min-height: 2.45rem;
          margin-top: 0.45rem;
          border-radius: 0.9rem;
          background: rgba(255, 255, 255, 0.72);
          padding: 0 0.78rem;
          color: rgba(8, 17, 31, 0.76);
          font-size: 0.78rem;
          font-weight: 800;
        }

        .softree-story-device-layer-row :global(svg) {
          width: 1rem;
          height: 1rem;
          flex: 0 0 auto;
          color: #0a9f49;
        }

        .softree-story-signals {
          position: absolute;
          z-index: 7;
          inset: auto 0 4%;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.65rem;
        }

        .softree-story-signal {
          min-width: 0;
          display: grid;
          gap: 0.22rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.7rem;
          background: rgba(6, 8, 12, 0.68);
          padding: 0.72rem;
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          will-change: transform, opacity;
        }

        .softree-story-signal :global(svg) {
          width: 1rem;
          height: 1rem;
          color: #0ae448;
        }

        .softree-story-signal span {
          color: rgba(255, 255, 255, 0.45);
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .softree-story-signal strong {
          min-width: 0;
          color: #fff;
          font-size: 0.86rem;
          line-height: 1.1;
          overflow-wrap: anywhere;
        }

        .softree-story-cards {
          position: absolute;
          z-index: 6;
          inset: 13% 0 auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          pointer-events: none;
        }

        .softree-story-card {
          width: min(250px, 28vw);
          min-width: 210px;
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(8, 10, 14, 0.82);
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.48);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          will-change: transform, opacity;
          pointer-events: auto;
        }

        .softree-story-card + .softree-story-card {
          margin-left: -2rem;
        }

        .softree-story-card-media {
          position: relative;
          aspect-ratio: 1.35 / 1;
          overflow: hidden;
          background: #101820;
        }

        .softree-story-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.9) contrast(1.04);
        }

        .softree-story-card-body {
          display: grid;
          gap: 0.6rem;
          padding: 0.9rem;
        }

        .softree-story-card-body > div {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.48);
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .softree-story-card-body strong {
          color: #0ae448;
          font-size: 1.2rem;
          letter-spacing: 0;
        }

        .softree-story-card h4 {
          margin: 0;
          color: #fff;
          font-size: 1.12rem;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .softree-story-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.56);
          font-size: 0.78rem;
          line-height: 1.5;
        }

        .softree-story-progress {
          position: absolute;
          z-index: 8;
          left: 50%;
          bottom: 1.25rem;
          width: min(360px, calc(100% - 2rem));
          height: 3px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          transform: translateX(-50%);
        }

        .softree-story-progress span {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #0ae448, #0089ff);
          transform: scaleX(var(--story-progress));
          transform-origin: left center;
        }

        @media (max-width: 1020px) {
          .softree-story-shell {
            grid-template-columns: 1fr;
            gap: 1.2rem;
            align-content: center;
          }

          .softree-story-copy {
            min-height: 280px;
          }

          .softree-story-intro,
          .softree-story-second,
          .softree-story-finale {
            max-width: 680px;
          }

          .softree-story-copy h2 {
            font-size: clamp(3.2rem, 13vw, 5.8rem);
          }

          .softree-story-copy h3 {
            max-width: 13ch;
            font-size: clamp(2.55rem, 10vw, 4.6rem);
          }

          .softree-story-stage {
            min-height: 50svh;
          }

          .softree-story-signals {
            position: relative;
            inset: auto;
            width: min(680px, 100%);
            margin-top: 1rem;
          }
        }

        @media (max-width: 720px) {
          .softree-story-shell {
            width: min(100% - 1.25rem, 1240px);
            padding-top: 5rem;
            padding-bottom: 4rem;
          }

          .softree-story-copy {
            min-height: 340px;
          }

          .softree-story-copy h2 {
            font-size: clamp(3.05rem, 16vw, 4.45rem);
          }

          .softree-story-copy h3 {
            font-size: clamp(2.35rem, 13vw, 3.5rem);
          }

          .softree-story-copy p {
            font-size: 0.96rem;
          }

          .softree-story-stage {
            min-height: 54svh;
            place-items: start center;
          }

          .softree-story-device {
            width: min(290px, 78vw);
            min-width: 0;
            border-radius: 1.35rem;
          }

          .softree-story-device-screen {
            border-radius: 1rem;
            padding: 0.78rem;
          }

          .softree-story-signals {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .softree-story-cards {
            inset: 16% 0 auto;
            flex-direction: column;
            align-items: center;
            gap: 0.7rem;
          }

          .softree-story-card {
            width: min(310px, 88vw);
            min-width: 0;
          }

          .softree-story-card + .softree-story-card {
            margin-left: 0;
          }

          .softree-story-card-media {
            display: none;
          }

          .softree-story-card-body {
            padding: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .softree-story-background img,
          .softree-story-orbit,
          .softree-story-device,
          .softree-story-card,
          .softree-story-signal,
          .softree-story-device-layer {
            will-change: auto;
          }
        }
      `}</style>
    </section>
  )
}

export default ScrollRevealSection
