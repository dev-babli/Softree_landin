"use client"

import { useEffect, useRef } from "react"
import { color, BLOCK_GRADIENT, shadow } from "./tokens"
import { Eyebrow, InkPill, ArrowRight, GrainOverlay, SoftBlurOrb } from "./primitives"

/* ──────────────────────────────────────────────────────────────────
 * LightMidCTA — light reimagining of SoftreeMidCTA
 * Warm cream canvas, gradient block lift, scrolling logo ticker
 * with monochrome ink logos on dust taupe.
 * ─────────────────────────────────────────────────────────────────*/

const LOGOS = [
  "Microsoft",
  "Azure",
  "SharePoint",
  "Power BI",
  "Power Apps",
  "Vercel",
  "Next.js",
  "OpenAI",
  "GitHub",
  "Python",
  "Salesforce",
  "AWS",
  "Snowflake",
  "Databricks",
]

function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let raf = 0
    const speed = 0.5
    const tick = () => {
      x -= speed
      const totalW = track.scrollWidth / 2
      if (Math.abs(x) >= totalW) x = 0
      track.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const set = (
    <div className="flex items-center gap-12 px-6 shrink-0">
      {LOGOS.map((l, i) => (
        <div
          key={i}
          className="flex items-center gap-2"
          style={{
            color: color.ink,
            opacity: 0.55,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: color.flame,
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.2px",
              whiteSpace: "nowrap",
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        borderTop: `1px solid ${color.ghostCream}`,
        borderBottom: `1px solid ${color.ghostCream}`,
        background: color.ivory,
      }}
    >
      <div ref={trackRef} className="flex will-change-transform py-5">
        {set}
        {set}
        {set}
      </div>
    </div>
  )
}

export default function LightMidCTA() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      {/* Ambient warmth */}
      <SoftBlurOrb
        size={520}
        color={color.sunshine}
        opacity={0.22}
        blur={120}
        style={{ top: -180, left: "10%" }}
      />
      <SoftBlurOrb
        size={420}
        color={color.flame}
        opacity={0.18}
        blur={110}
        style={{ bottom: -160, right: "8%" }}
      />
      <GrainOverlay opacity={0.07} blendMode="multiply" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 px-5 pt-24 pb-12 md:px-6 md:pt-32">
        <Eyebrow>Your global delivery partner</Eyebrow>

        <h2
          className="max-w-[860px] text-center"
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(40px, 6vw, 82px)",
            fontWeight: 500,
            lineHeight: 0.98,
            letterSpacing: "-2.6px",
            color: color.ink,
          }}
        >
          AI. Apps. Microsoft.{" "}
          <span
            style={{
              backgroundImage: BLOCK_GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            All delivered.
          </span>
        </h2>

        <p
          className="max-w-[620px] text-center"
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: color.charcoal,
            opacity: 0.78,
          }}
        >
          From intelligent automation to enterprise Microsoft platforms and
          modern web apps — Softree delivers production-grade technology to
          teams across the globe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <InkPill href="/contact" size="lg">
            Book a discovery call <ArrowRight />
          </InkPill>
          <InkPill href="/services" variant="outline" size="lg">
            Explore services
          </InkPill>
        </div>

        {/* Trust microline */}
        <div
          className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
          style={{ color: color.slate }}
        >
          {["SOC 2 aligned", "ISO 27001 ready", "GDPR compliant", "24/7 SLA"].map((t) => (
            <span
              key={t}
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              · {t}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative w-full"
        style={{ boxShadow: shadow.pill }}
      >
        <LogoTicker />
      </div>
    </section>
  )
}
