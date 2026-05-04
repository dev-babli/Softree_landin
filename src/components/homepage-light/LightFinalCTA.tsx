"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow, radius, BLOCK_GRADIENT } from "./tokens"
import { Eyebrow, InkPill, ArrowRight, GrainOverlay, SoftBlurOrb } from "./primitives"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
 * LightFinalCTA — light reimagining of SoftreeCTASection (optimus)
 * Editorial split layout: oversized Mistral-style headline on the
 * left, four service tiles on the right, ink-black footer band.
 * ─────────────────────────────────────────────────────────────────*/

type Service = {
  label: string
  desc: string
  glyph: "spark" | "shield" | "globe" | "rocket"
  accent: string
}

const SERVICES: Service[] = [
  {
    label: "Agentic AI",
    desc: "Autonomous AI agents that act, not just answer.",
    glyph: "spark",
    accent: color.sunshine,
  },
  {
    label: "Enterprise Apps",
    desc: "Scalable web & mobile apps built to last a decade.",
    glyph: "shield",
    accent: color.flame,
  },
  {
    label: "Power Platform",
    desc: "Power BI, Power Apps & SharePoint at enterprise scale.",
    glyph: "globe",
    accent: color.mistral,
  },
  {
    label: "MVP Delivery",
    desc: "Launch in weeks, not months — with confidence.",
    glyph: "rocket",
    accent: color.signal,
  },
]

function Glyph({ kind, accent }: { kind: Service["glyph"]; accent: string }) {
  const stroke = accent
  if (kind === "spark")
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
        <path
          d="M12 3 L13.8 9.5 L20 12 L13.8 14.5 L12 21 L10.2 14.5 L4 12 L10.2 9.5 Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  if (kind === "shield")
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
        <path
          d="M12 3 L20 6 L20 12 C20 16.5 16.5 20 12 21 C7.5 20 4 16.5 4 12 L4 6 Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 12 L11 14 L15 10"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  if (kind === "globe")
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="4" ry="9" stroke={stroke} strokeWidth="1.6" />
        <line x1="3" y1="12" x2="21" y2="12" stroke={stroke} strokeWidth="1.6" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <path
        d="M5 19 L9 15 M15 5 C18 5 19 6 19 9 L13 15 L9 11 L15 5 Z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14.5" cy="9.5" r="1.2" fill={stroke} />
    </svg>
  )
}

export default function LightFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".lfc-headline > *", {
          y: 32,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        })
        gsap.from(".lfc-tile", {
          y: 24,
          opacity: 0,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lfc-grid", start: "top 80%" },
        })
        gsap.from(".lfc-marquee > *", {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lfc-marquee", start: "top 95%" },
        })
      }, sectionRef)
      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      <SoftBlurOrb
        size={620}
        color={color.flame}
        opacity={0.18}
        blur={150}
        style={{ top: -240, right: -120 }}
      />
      <SoftBlurOrb
        size={440}
        color={color.sunshine}
        opacity={0.22}
        blur={130}
        style={{ bottom: -180, left: -80 }}
      />
      <GrainOverlay opacity={0.06} blendMode="multiply" />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
        {/* Editorial border frame — Mastercard putty card */}
        <div
          className="relative grid items-start gap-12 lg:grid-cols-12 lg:gap-16"
          style={{
            padding: "48px 32px",
            border: `1px solid ${color.ghostCream}`,
            borderRadius: radius.consent,
            background: color.lifted,
            boxShadow: shadow.golden,
          }}
        >
          {/* Headline column */}
          <div className="lfc-headline lg:col-span-7 flex flex-col gap-8">
            <Eyebrow>Softree · Systems advisory</Eyebrow>
            <h2
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(48px, 7vw, 110px)",
                fontWeight: 500,
                lineHeight: 0.92,
                letterSpacing: "-3.2px",
                color: color.ink,
              }}
            >
              Engineering
              <br />
              <span
                style={{
                  backgroundImage: BLOCK_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                the future.
              </span>
            </h2>
            <p
              className="max-w-[480px]"
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: color.charcoal,
                opacity: 0.78,
              }}
            >
              Deploy production-grade enterprise software with confidence.
              From agentic AI to legacy modernization — one partner, one
              accountable team, end to end.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <InkPill href="/contact" size="lg">
                Initiate project <ArrowRight />
              </InkPill>
              <InkPill href="/services" variant="cream" size="lg">
                Browse capabilities
              </InkPill>
            </div>
          </div>

          {/* Services tile grid */}
          <div className="lfc-grid lg:col-span-5 grid grid-cols-1 gap-px sm:grid-cols-2"
               style={{
                 background: color.ghostCream,
                 border: `1px solid ${color.ghostCream}`,
                 borderRadius: 12,
                 overflow: "hidden",
               }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.label}
                className="lfc-tile group flex flex-col gap-4 p-7 transition-colors duration-300"
                style={{ background: color.lifted }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center transition-colors duration-300"
                  style={{
                    border: `1px solid ${s.accent}55`,
                    background: `${s.accent}10`,
                    borderRadius: 8,
                  }}
                >
                  <Glyph kind={s.glyph} accent={s.accent} />
                </div>
                <h3
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: color.ink,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: color.charcoal,
                    opacity: 0.74,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical marquee */}
        <div
          className="lfc-marquee mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 overflow-hidden border-t pt-8"
          style={{ borderColor: color.ghostCream }}
        >
          {[
            "Status: deploying vision → execution",
            "Softree IT & enterprise solutions · v2025",
            "Agentic AI pipeline active",
            "Multi-tenant architecture validated",
          ].map((line) => (
            <span
              key={line}
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: color.slate,
                opacity: 0.7,
              }}
            >
              · {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
