"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { GlobalNetworkMap } from "@/components/homepage/GlobalNetworkMap"
import { DeliveryProcessDiagram } from "@/components/homepage/DeliveryProcessDiagram"
import { FlexibleTechExecutionVisual } from "@/components/homepage/FlexibleTechExecutionVisual"
import { LongTermDeliveryVisual } from "@/components/homepage/LongTermDeliveryVisual"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ServiceSlide = {
  key: string
  phase: string
  index: string
  title: string
  headline: string
  description: string
  outcomes: string[]
  media: string
  tone: "light" | "dark" | "ember" | "violet"
}

const SERVICE_SLIDES: ServiceSlide[] = [
  {
    key: "discover",
    phase: "PHASE 01",
    index: "01",
    title: "Signal",
    headline: "Find the revenue signal hiding in the noise.",
    description:
      "The dashboard visual sets the tone: we start by turning scattered product, funnel, and customer data into a sharp build decision.",
    outcomes: ["Funnel audit", "User signal map", "Priority roadmap"],
    media: "/gif_assetsforservices/Scene.gif",
    tone: "light",
  },
  {
    key: "architect",
    phase: "PHASE 02",
    index: "02",
    title: "Shape",
    headline: "Make the offer feel clear before the build begins.",
    description:
      "The rotating brand collage maps to positioning, experience design, and the product story your buyers understand in seconds.",
    outcomes: ["Offer clarity", "Interface direction", "Brand-ready flows"],
    media: "/gif_assetsforservices/ORBIT-5-01-LITE.gif",
    tone: "ember",
  },
  {
    key: "engineer",
    phase: "PHASE 03",
    index: "03",
    title: "Build",
    headline: "Turn the experience into a working product.",
    description:
      "The chat interface visual fits the work: AI workflows, app screens, integrations, and the product logic behind them.",
    outcomes: ["AI workflows", "App interfaces", "Production code"],
    media: "/gif_assetsforservices/1-1.gif",
    tone: "dark",
  },
  {
    key: "launch",
    phase: "PHASE 04",
    index: "04",
    title: "Launch",
    headline: "Ship a page that captures demand, not just attention.",
    description:
      "The landing-page blocks point to the finish line: conversion copy, launch assets, analytics, and the handoff to growth.",
    outcomes: ["Conversion page", "Tracking live", "Launch handoff"],
    media: "/gif_assetsforservices/Website-landing-page-with-blocs.gif",
    tone: "violet",
  },
]

export function LCStackedSlides({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const media = gsap.matchMedia()

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".ssx-section")
        const panelsToPin = panels.slice(0, -1)

        const timelines = panelsToPin.map((panel) => {
          const innerPanel = panel.querySelector<HTMLElement>(".ssx-section-inner")
          if (!innerPanel) return null

          const getOverflow = () => Math.max(0, innerPanel.scrollHeight - panel.clientHeight)
          const getFakeScrollRatio = () => {
            const overflow = getOverflow()
            const panelHeight = panel.clientHeight || window.innerHeight

            return overflow > 0 ? overflow / (overflow + panelHeight) : 0
          }
          const setPanelSpacing = () => {
            const ratio = getFakeScrollRatio()
            panel.style.marginBottom = ratio ? `${innerPanel.scrollHeight * ratio}px` : ""
          }

          setPanelSpacing()

          const fakeScrollRatio = getFakeScrollRatio()
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "bottom bottom",
              end: () => (getFakeScrollRatio() ? `+=${innerPanel.scrollHeight}` : "bottom top"),
              pin: true,
              pinSpacing: false,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefreshInit: setPanelSpacing,
            },
          })

          if (fakeScrollRatio) {
            timeline.to(innerPanel, {
              y: () => -getOverflow(),
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: "none",
            })
          }

          timeline
            .fromTo(
              panel,
              { scale: 1, autoAlpha: 1 },
              { scale: 0.78, autoAlpha: 0.5, duration: 0.9, ease: "none" }
            )
            .to(panel, { autoAlpha: 0, duration: 0.1, ease: "none" })

          return timeline
        })

        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          timelines.forEach((timeline) => timeline?.kill())
          panels.forEach((panel) => {
            panel.style.marginBottom = ""
          })
        }
      })

      media.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(".ssx-section", { clearProps: "transform,opacity,visibility" })
        gsap.set(".ssx-section-inner", { clearProps: "transform" })
      })

      return () => media.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className={`ssx-root ${className}`}>
      <header className="ssx-intro" aria-label="Services delivery model">
        <div className="ssx-intro-copy">
          <div className="ssx-kicker-row">
            <span className="ssx-kicker-line" />
            <span className="ssx-kicker">What We Deliver</span>
          </div>
          <h2>Services Built For Real Pipeline, Not Pageviews</h2>
        </div>
        <Link href="/contact" className="ssx-intro-action">
          <span>Book a Fit Call</span>
          <ArrowRight className="ssx-action-icon" aria-hidden />
        </Link>
      </header>

      <div className="ssx-slides-wrapper">
        {SERVICE_SLIDES.map((slide) => (
          <section
            key={slide.key}
            className={`ssx-section ssx-section-${slide.key} ssx-tone-${slide.tone}`}
          >
            <div className="ssx-section-content">
              <div className="ssx-section-inner">
                <div className="ssx-copy">
                  <div className="ssx-phase">
                    <span className="ssx-index">{slide.index}</span>
                    <span>{slide.phase}</span>
                  </div>
                  <h3>{slide.title}</h3>
                  <p className="ssx-headline">{slide.headline}</p>
                  <p className="ssx-description">{slide.description}</p>
                  <ul className="ssx-outcomes" aria-label={`${slide.title} outcomes`}>
                    {slide.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                  <div className="ssx-actions">
                    <Link href="/contact" className="ssx-action-primary">
                      <span>Start a Project</span>
                      <ArrowRight className="ssx-action-icon" aria-hidden />
                    </Link>
                    <Link href="/services" className="ssx-action-secondary">
                      <span>View Services</span>
                    </Link>
                  </div>
                </div>

                <div className="ssx-media-block">
                  {slide.key === "discover" ? (
                    <div className="ssx-map-wrap">
                      <GlobalNetworkMap />
                    </div>
                  ) : slide.key === "architect" ? (
                    <div className="ssx-map-wrap ssx-map-wrap--diagram">
                      <DeliveryProcessDiagram />
                    </div>
                  ) : slide.key === "engineer" ? (
                    <div className="ssx-map-wrap ssx-map-wrap--ftx">
                      <FlexibleTechExecutionVisual />
                    </div>
                  ) : slide.key === "launch" ? (
                    <div className="ssx-map-wrap ssx-map-wrap--ltd">
                      <LongTermDeliveryVisual />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        .ssx-root {
          width: 100%;
          background: #F3F0EE; color: #141413;
          overflow-x: clip;
          font-family: "Outfit", sans-serif;
          color-scheme: light;
        }

        .ssx-intro {
          width: min(100% - 2rem, 1320px);
          margin: 0 auto;
          padding: clamp(2.25rem, 5vw, 5rem) clamp(0.25rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.75rem);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .ssx-intro-copy {
          min-width: 0;
          display: grid;
          gap: 0.85rem;
        }

        .ssx-kicker-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #fb6424;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .ssx-kicker-line {
          width: 44px;
          height: 1px;
          background: linear-gradient(90deg, #fb6424, transparent);
          opacity: 0.75;
        }

        .ssx-intro h2 {
          max-width: 780px;
          margin: 0;
          font-size: clamp(2.1rem, 5vw, 5.75rem);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .ssx-intro-action {
          flex: 0 0 auto;
          min-height: 3.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top-color: rgba(251, 100, 36, 0.55);
          border-left-color: rgba(255, 255, 255, 0.3);
          background: linear-gradient(135deg, rgba(251, 100, 36, 0.40) 0%, rgba(255, 255, 255, 0.05) 100%);
          box-shadow:
            0 14px 40px rgba(0, 0, 0, 0.5),
            inset 0 1px 4px rgba(255, 255, 255, 0.4),
            inset 0 -1px 3px rgba(0, 0, 0, 0.1);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0;
          overflow: hidden;
          position: relative;
          text-decoration: none;
          touch-action: manipulation;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            border-color 300ms ease;
        }

        .ssx-intro-action::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(251, 100, 36, 0.75) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }

        .ssx-intro-action::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%);
          transform: skewX(-20deg);
          animation: ssx-hyper-glare 5s infinite ease-in-out;
          pointer-events: none;
        }

        .ssx-intro-action:hover {
          transform: scale(1.05);
          box-shadow:
            0 18px 48px rgba(0, 0, 0, 0.52),
            0 0 40px rgba(255, 107, 0, 0.18),
            inset 0 1px 4px rgba(255, 255, 255, 0.42);
        }

        .ssx-intro-action:focus-visible {
          outline: 2px solid #fb6424;
          outline-offset: 3px;
        }

        .ssx-slides-wrapper {
          width: 100%;
          padding: 0 clamp(0.75rem, 1.5vw, 1.25rem) clamp(0.75rem, 1.5vw, 1.25rem);
        }

        .ssx-section {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 680px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 10px;
          isolation: isolate;
          transform-origin: center top;
          will-change: transform, opacity;
        }

        .ssx-section + .ssx-section {
          margin-top: 0.75rem;
        }

        .ssx-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .ssx-tone-light {
          background: #FCFBFA; color: #141413;
        }

        .ssx-tone-light::before {
          background:
            radial-gradient(900px 520px at 18% 86%, rgba(251, 100, 36, 0.18), transparent 68%),
            radial-gradient(700px 420px at 82% 12%, rgba(0, 0, 0, 0.08), transparent 62%);
        }

        .ssx-tone-ember {
          background: linear-gradient(135deg, #fb6424 0%, #ffa110 100%); color: #141413;
        }

        .ssx-tone-ember::before {
          background:
            radial-gradient(900px 560px at 22% 80%, rgba(251, 100, 36, 0.18), transparent 68%),
            radial-gradient(800px 540px at 82% 18%, rgba(255, 255, 255, 0.05), transparent 65%);
        }

        .ssx-tone-dark {
          background: #FCFBFA; color: #141413;
        }

        .ssx-tone-dark::before {
          background:
            radial-gradient(760px 520px at 15% 85%, rgba(251, 100, 36, 0.12), transparent 70%),
            radial-gradient(980px 540px at 80% 12%, rgba(255, 255, 255, 0.06), transparent 70%);
        }

        .ssx-tone-violet {
          background: linear-gradient(135deg, #ffe295 0%, #ffd900 100%); color: #141413;
        }

        .ssx-tone-violet::before {
          background:
            radial-gradient(860px 540px at 22% 82%, rgba(255, 107, 0, 0.13), transparent 68%),
            radial-gradient(760px 460px at 82% 20%, rgba(255, 161, 16, 0.22), transparent 68%);
        }

        .ssx-section-content {
          position: relative;
          z-index: 1;
          width: min(100%, 1320px);
          height: 100%;
        }

        .ssx-section-inner {
          min-height: 100%;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(340px, 0.86fr) minmax(420px, 1.14fr);
          gap: clamp(2rem, 4.5vw, 4.75rem);
          align-items: center;
          padding: clamp(2rem, 4vw, 4.5rem);
        }

        .ssx-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(0.8rem, 1.2vw, 1.05rem);
          max-width: 560px;
        }

        .ssx-phase {
          display: inline-flex;
          align-items: baseline;
          gap: 0.8rem;
          color: color-mix(in srgb, currentColor 42%, transparent);
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ssx-index {
          color: #fb6424;
          font-size: clamp(1.25rem, 2vw, 1.85rem);
          letter-spacing: -0.02em;
        }

        .ssx-copy h3 {
          max-width: 100%;
          margin: 0;
          font-size: clamp(3.4rem, 8vw, 8.75rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: 0;
          overflow-wrap: normal;
          text-wrap: balance;
        }

        .ssx-headline {
          max-width: 24ch;
          margin: 0;
          font-size: clamp(1.35rem, 2vw, 2.35rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .ssx-description {
          max-width: 47ch;
          margin: 0;
          font-size: clamp(0.96rem, 1vw, 1.05rem);
          line-height: 1.58;
          color: color-mix(in srgb, currentColor 66%, transparent);
          text-wrap: pretty;
        }

        .ssx-outcomes {
          list-style: none;
          padding: 0;
          width: 100%;
          margin: clamp(0.3rem, 0.8vw, 0.65rem) 0 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .ssx-outcomes li {
          display: inline-flex;
          align-items: center;
          min-height: 2.1rem;
          padding: 0.45rem 0.75rem;
          min-width: 0;
          border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
          border-radius: 6px;
          background: color-mix(in srgb, currentColor 6%, transparent);
          color: color-mix(in srgb, currentColor 74%, transparent);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: left;
          overflow-wrap: anywhere;
          backdrop-filter: blur(18px);
        }

        .ssx-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-top: clamp(0.35rem, 1vw, 0.85rem);
        }

        .ssx-action-primary,
        .ssx-action-secondary {
          min-height: 3.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.75rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0;
          text-decoration: none;
          touch-action: manipulation;
          position: relative;
          overflow: hidden;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            border-color 300ms ease,
            color 300ms ease;
        }

        .ssx-action-primary {
          background: linear-gradient(135deg, rgba(251, 100, 36, 0.40) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top-color: rgba(251, 100, 36, 0.55);
          border-left-color: rgba(255, 255, 255, 0.3);
          box-shadow:
            0 14px 40px rgba(0, 0, 0, 0.5),
            inset 0 1px 4px rgba(255, 255, 255, 0.4),
            inset 0 -1px 3px rgba(0, 0, 0, 0.1);
          color: #ffffff;
        }

        .ssx-action-secondary {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.4),
            inset 0 -1px 3px rgba(0, 0, 0, 0.3),
            0 8px 32px rgba(0, 0, 0, 0.3);
          color: rgba(255, 255, 255, 0.9);
        }

        .ssx-action-primary::before,
        .ssx-action-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }

        .ssx-action-primary::before {
          background: linear-gradient(135deg, rgba(251, 100, 36, 0.75) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
        }

        .ssx-action-secondary::before {
          background: linear-gradient(135deg, rgba(132, 152, 230, 0.5) 0%, transparent 50%, rgba(56, 189, 248, 0.3) 100%);
        }

        .ssx-action-primary::after,
        .ssx-action-secondary::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.28) 50%, transparent 100%);
          transform: skewX(-20deg);
          animation: ssx-hyper-glare 5s infinite ease-in-out;
          pointer-events: none;
        }

        .ssx-action-primary:hover,
        .ssx-action-secondary:hover {
          transform: scale(1.05);
        }

        .ssx-action-primary:hover {
          box-shadow:
            0 18px 48px rgba(0, 0, 0, 0.52),
            0 0 40px rgba(255, 107, 0, 0.18),
            inset 0 1px 4px rgba(255, 255, 255, 0.42);
        }

        .ssx-action-secondary:hover {
          color: #ffffff;
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.45),
            inset 0 -1px 3px rgba(0, 0, 0, 0.3),
            0 12px 36px rgba(56, 189, 248, 0.16);
        }

        .ssx-tone-light .ssx-action-secondary {
          color: #141414;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.2) 100%);
          border-color: rgba(10, 10, 10, 0.08);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.72),
            inset 0 -1px 3px rgba(0, 0, 0, 0.1),
            0 10px 28px rgba(0, 0, 0, 0.12);
        }

        .ssx-tone-light .ssx-action-secondary:hover {
          color: #000000;
        }

        .ssx-action-icon {
          width: 1.15rem;
          height: 1.15rem;
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          transition: transform 300ms ease;
        }

        .ssx-action-primary span,
        .ssx-action-secondary span,
        .ssx-intro-action span {
          position: relative;
          z-index: 1;
        }

        .ssx-action-primary:hover .ssx-action-icon,
        .ssx-intro-action:hover .ssx-action-icon {
          transform: translateX(0.25rem);
        }

        @keyframes ssx-hyper-glare {
          0% {
            left: -100%;
          }
          15% {
            left: 200%;
          }
          100% {
            left: 200%;
          }
        }

        .ssx-action-primary:focus-visible,
        .ssx-action-secondary:focus-visible {
          outline: 2px solid #fb6424;
          outline-offset: 3px;
        }

        .ssx-media-block {
          width: 100%;
          max-width: 660px;
          justify-self: end;
          align-self: center;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.85rem;
        }

        .ssx-map-wrap {
          width: 100%;
          aspect-ratio: 16 / 10;
          max-height: min(66svh, 620px);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #FCFBFA;
          box-shadow:
            0 36px 110px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .ssx-map-wrap--diagram {
          aspect-ratio: 16 / 9;
        }

        .ssx-map-wrap--ftx {
          aspect-ratio: auto;
          max-height: min(72svh, 660px);
          background: transparent;
          border: 0;
          box-shadow: none;
          overflow: visible;
        }

        .ssx-map-wrap--ltd {
          aspect-ratio: auto;
          max-height: min(74svh, 700px);
          background: transparent;
          border: 0;
          box-shadow: none;
          overflow: visible;
        }

        .ssx-media-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: min(66svh, 620px);
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #FCFBFA;
          box-shadow:
            0 36px 110px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        :global(.ssx-image) {
          object-fit: cover;
          object-position: center;
        }

        .ssx-media-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.32)),
            radial-gradient(900px 380px at 50% 100%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.42));
        }

        .ssx-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          color: color-mix(in srgb, currentColor 62%, transparent);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          min-width: 0;
        }

        .ssx-caption span:first-child {
          color: #fb6424;
          font-size: 1.15rem;
          letter-spacing: 0;
        }

        @media (max-width: 1100px) {
          .ssx-section {
            min-height: 840px;
          }

          .ssx-section-inner {
            grid-template-columns: 1fr;
            align-content: center;
            gap: 1.75rem;
          }

          .ssx-copy {
            max-width: 740px;
          }

          .ssx-copy h3 {
            font-size: clamp(3.25rem, 12vw, 7.25rem);
          }

          .ssx-media-frame {
            max-height: 36svh;
            aspect-ratio: 16 / 9;
          }

          .ssx-map-wrap {
            max-height: 38svh;
            aspect-ratio: 16 / 9;
          }

          .ssx-media-block {
            justify-self: start;
            max-width: 740px;
          }
        }

        @media (max-width: 767px) {
          .ssx-intro {
            width: min(100% - 1.5rem, 1440px);
            padding-top: 1.75rem;
            padding-bottom: 1rem;
            flex-direction: column;
            align-items: flex-start;
          }

          .ssx-kicker-row {
            font-size: 0.62rem;
            letter-spacing: 0.24em;
          }

          .ssx-intro h2 {
            font-size: clamp(2rem, 11vw, 3.5rem);
            line-height: 1;
          }

          .ssx-slides-wrapper {
            padding: 0.75rem;
          }

          .ssx-section {
            height: auto;
            min-height: auto;
            overflow: visible;
          }

          .ssx-section-inner {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: clamp(1.25rem, 7vw, 2.25rem);
            padding-bottom: clamp(1.75rem, 8vw, 2.75rem);
          }

          .ssx-phase {
            font-size: 0.62rem;
            letter-spacing: 0.16em;
          }

          .ssx-copy h3 {
            font-size: clamp(3rem, 17vw, 5.2rem);
            line-height: 0.92;
          }

          .ssx-headline {
            max-width: 100%;
            font-size: clamp(1.25rem, 6vw, 1.85rem);
            line-height: 1.12;
          }

          .ssx-description {
            font-size: 0.95rem;
            line-height: 1.58;
          }

          .ssx-outcomes {
            grid-template-columns: 1fr;
          }

          .ssx-outcomes li {
            justify-content: flex-start;
          }

          .ssx-actions,
          .ssx-action-primary,
          .ssx-action-secondary,
          .ssx-intro-action {
            width: 100%;
          }

          .ssx-media-frame {
            max-height: none;
            aspect-ratio: 4 / 3;
          }

          .ssx-map-wrap {
            max-height: none;
            aspect-ratio: 4 / 3;
          }

          .ssx-caption {
            letter-spacing: 0.12em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ssx-intro-action::after,
          .ssx-action-primary::after,
          .ssx-action-secondary::after {
            animation: none;
            display: none;
          }

          .ssx-section {
            height: auto;
            min-height: auto;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .ssx-section-inner {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default LCStackedSlides

