"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow } from "../tokens"
import { ArrowRight, Eyebrow, GrainOverlay, InkPill, SoftBlurOrb } from "../primitives"
import Grainient from "../Grainient"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * MotionHero — landing hero for the Motion Roadmap page.
 *
 * Showcases the core idea of the page: motion = before → curve → after.
 * Visual: a "before" wireframe state morphs to an "after" polished state
 * on a loop, scrubbed manually in code so users see the transformation.
 */
export default function MotionHero() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero copy entrance
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.from("[data-mh-eyebrow]", { y: 16, opacity: 0, duration: 0.7 })
          .from("[data-mh-h1] > span", { yPercent: 100, opacity: 0, stagger: 0.08, duration: 1 }, "-=0.4")
          .from("[data-mh-sub]", { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
          .from("[data-mh-cta]", { y: 16, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.5")
          .from("[data-mh-meta] > *", { y: 12, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.4")

        // Looping before → after demo on the right
        const demoTL = gsap.timeline({ repeat: -1, repeatDelay: 1.4 })
        demoTL
          .set("[data-demo-stage]", { "--p": 0 })
          .to("[data-demo-stage]", {
            "--p": 1,
            duration: 1.2,
            ease: "expo.inOut",
          })
          .to(
            "[data-demo-stage]",
            { "--p": 1, duration: 2, ease: "none" },
            "+=0.5"
          )
          .to("[data-demo-stage]", {
            "--p": 0,
            duration: 1.2,
            ease: "expo.inOut",
          })

        return () => {
          tl.kill()
          demoTL.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      {/* Grainient warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.5, filter: "blur(48px) saturate(1.05)" }}
      >
        <Grainient
          color1={color.cream}
          color2={color.sunshine}
          color3={color.ivory}
          timeSpeed={0.1}
          warpStrength={1.1}
          warpFrequency={3.2}
          warpSpeed={0.9}
          warpAmplitude={90}
          blendAngle={15}
          blendSoftness={0.3}
          rotationAmount={180}
          noiseScale={1.4}
          grainAmount={0}
          contrast={1.1}
          saturation={0.9}
          zoom={1.15}
          centerX={-0.1}
          centerY={-0.1}
        />
      </div>

      <SoftBlurOrb size={520} color={color.gold} blur={110} opacity={0.4} style={{ right: -160, top: -160 }} />
      <SoftBlurOrb size={420} color={color.cream} blur={90} opacity={0.55} style={{ left: -120, bottom: -120 }} />
      <GrainOverlay opacity={0.12} blendMode="overlay" scale={1.3} />

      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-14 px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
        {/* Left — copy */}
        <div className="relative">
          <div data-mh-eyebrow>
            <Eyebrow>· Motion roadmap · 10 steps</Eyebrow>
          </div>

          <h1
            data-mh-h1
            className="mt-7"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(48px, 8vw, 112px)",
              fontWeight: 500,
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              color: color.ink,
            }}
          >
            <span className="block overflow-hidden">Motion that</span>
            <span className="block overflow-hidden">earns its keep,</span>
            <span className="block overflow-hidden" style={{ color: color.mistral }}>
              not its keystrokes.
            </span>
          </h1>

          <p
            data-mh-sub
            className="mt-8 max-w-[580px]"
            style={{
              fontFamily: "inherit",
              fontSize: 19,
              fontWeight: 450,
              lineHeight: 1.45,
              color: color.ink,
            }}
          >
            A 10-step path from static UI to interfaces that breathe. Designed
            for the way Softree ships product — purpose first, polish second,
            performance always.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span data-mh-cta>
              <InkPill href="#steps">
                Start the roadmap <ArrowRight size={16} />
              </InkPill>
            </span>
            <span data-mh-cta>
              <InkPill href="#tutorials" variant="outline">
                Try a tutorial
              </InkPill>
            </span>
          </div>

          <div
            data-mh-meta
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: color.slate, textTransform: "uppercase" }}
          >
            <div className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: 999, background: color.signalLight }} />
              <span>10 steps</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: 999, background: color.mistral }} />
              <span>5 practice loops</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: 999, background: color.gold }} />
              <span>4 production tools</span>
            </div>
          </div>
        </div>

        {/* Right — Before → After demo */}
        <div className="relative">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden"
            style={{
              borderRadius: 32,
              background: color.lifted,
              boxShadow: shadow.halo,
              border: `1px solid ${color.ink}10`,
            }}
          >
            <GrainOverlay opacity={0.08} blendMode="multiply" scale={1.3} />

            {/* Stage label */}
            <div
              className="absolute left-5 top-5 flex items-center gap-2"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: color.slate,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: color.signalLight }} />
              Live · before → after
            </div>

            {/* The demo card — uses CSS custom prop --p (0 = before, 1 = after) */}
            <div
              data-demo-stage
              className="absolute inset-0 flex items-center justify-center"
              style={{ ['--p' as string]: 0 } as React.CSSProperties}
            >
              {/* Headline placeholder block */}
              <div
                className="absolute"
                style={{
                  left: "9%",
                  top: "calc(28% + (1 - var(--p)) * 16px)",
                  right: "9%",
                  height: 18,
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${color.dustTaupe} 0%, ${color.dustTaupe} 70%, transparent 100%)`,
                  opacity: "calc(0.4 + var(--p) * 0.6)",
                  transform: "scaleX(calc(0.92 + var(--p) * 0.08))",
                  transformOrigin: "left center",
                }}
              />
              <div
                className="absolute"
                style={{
                  left: "9%",
                  top: "calc(35% + (1 - var(--p)) * 16px)",
                  right: "30%",
                  height: 14,
                  borderRadius: 4,
                  background: color.dustTaupe,
                  opacity: "calc(0.3 + var(--p) * 0.5)",
                }}
              />

              {/* Image placeholder */}
              <div
                className="absolute overflow-hidden"
                style={{
                  left: "9%",
                  right: "9%",
                  top: "48%",
                  height: "32%",
                  borderRadius: 16,
                  background: `linear-gradient(160deg, ${color.gold} 0%, ${color.sunshine} 60%, ${color.flame} 100%)`,
                  filter: "blur(calc((1 - var(--p)) * 8px))",
                  transform: "scale(calc(0.96 + var(--p) * 0.04))",
                  transformOrigin: "center",
                }}
              >
                <GrainOverlay opacity={0.18} blendMode="overlay" scale={1.1} />
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
                  <circle cx="78" cy="22" r="14" fill={color.ivory} fillOpacity="0.5" />
                  <path d="M 0 80 Q 30 60 50 70 T 100 60 L 100 100 L 0 100 Z" fill={color.flame} fillOpacity="0.35" />
                </svg>
              </div>

              {/* CTA — outline → filled */}
              <div
                className="absolute flex items-center justify-center gap-2"
                style={{
                  left: "9%",
                  bottom: "9%",
                  height: 44,
                  paddingInline: 24,
                  borderRadius: 999,
                  background: `rgba(20,20,19, calc(var(--p) * 1))`,
                  color: `rgba(20,20,19, calc(1 - var(--p)))`,
                  border: `1.5px solid ${color.ink}`,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "-0.32px",
                  transform: "scale(calc(0.98 + var(--p) * 0.02))",
                  transformOrigin: "left center",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    color: `rgb(calc((1 - var(--p)) * 20 + var(--p) * 243), calc((1 - var(--p)) * 20 + var(--p) * 240), calc((1 - var(--p)) * 19 + var(--p) * 238))`,
                  }}
                >
                  Get started
                </span>
                <span
                  style={{
                    color: `rgb(calc((1 - var(--p)) * 20 + var(--p) * 243), calc((1 - var(--p)) * 20 + var(--p) * 240), calc((1 - var(--p)) * 19 + var(--p) * 238))`,
                    display: "inline-flex",
                  }}
                >
                  <ArrowRight size={14} />
                </span>
              </div>

              {/* Diff arrow & label */}
              <div
                className="absolute right-5 top-5 flex items-center gap-2"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: color.ink,
                  background: color.white,
                  borderRadius: 999,
                  padding: "4px 12px",
                  boxShadow: shadow.pill,
                }}
              >
                <span>{`${0}%`}</span>
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background: color.ink,
                    opacity: 0.3,
                  }}
                />
                <span style={{ color: color.mistral }}>{`${100}%`}</span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div
            className="mt-4 flex items-center justify-between"
            style={{ fontSize: 13, fontWeight: 500, color: color.slate, letterSpacing: "-0.2px" }}
          >
            <span>Two states · one curve · everything between is automatic.</span>
            <span style={{ color: color.ink, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", fontSize: 11 }}>
              ease · 1.2s
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
