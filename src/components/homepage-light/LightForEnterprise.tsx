"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow, radius, BLOCK_GRADIENT } from "./tokens"
import { Eyebrow, InkPill, ArrowRight, GrainOverlay } from "./primitives"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
 * LightForEnterprise
 * Light-theme reimagining of ForDevelopersSection — repurposed
 * for "Business & Enterprises" (executives & decision makers,
 * not engineers).  Two-row card grid on warm cream canvas.
 * ─────────────────────────────────────────────────────────────────*/

type Pillar = {
  title: string
  body: string
  cta: string
  href: string
  illustration: "delivery" | "security" | "global" | "scale"
  accent: string
}

const PILLARS: Pillar[] = [
  {
    title: "Predictable Delivery",
    body:
      "Discovery to go-live in weeks, not quarters. Fixed milestones, transparent reporting, no end-of-quarter surprises for the board.",
    cta: "How we deliver",
    href: "/services",
    illustration: "delivery",
    accent: color.sunshine,
  },
  {
    title: "Enterprise-grade Trust",
    body:
      "SOC 2-aligned practice, role-based access, encrypted data pipelines and full audit trails — built in by default, not bolted on.",
    cta: "Security posture",
    href: "/security",
    illustration: "security",
    accent: color.flame,
  },
  {
    title: "Global Delivery Network",
    body:
      "Pods across UK, US, India and the Middle East. One delivery model, zero handoff gaps, follow-the-sun continuity for your roadmap.",
    cta: "Meet the teams",
    href: "/about",
    illustration: "global",
    accent: color.mistral,
  },
  {
    title: "Built to Scale With You",
    body:
      "Cloud-native architectures that integrate with the systems you already depend on — and grow with you from MVP to multi-region.",
    cta: "View case studies",
    href: "/case-studies",
    illustration: "scale",
    accent: color.signal,
  },
]

function Illustration({ kind, accent }: { kind: Pillar["illustration"]; accent: string }) {
  if (kind === "delivery") {
    return (
      <svg viewBox="0 0 200 140" width="100%" height="100%" fill="none" aria-hidden>
        <circle cx="100" cy="70" r="48" stroke={color.dustTaupe} strokeWidth="1" />
        <circle cx="100" cy="70" r="32" stroke={`${accent}80`} strokeWidth="1" />
        <path d="M100 30 L100 70 L130 92" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="100" cy="70" r="4" fill={accent} />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = 48
          const cx = 100 + r * Math.cos((deg * Math.PI) / 180)
          const cy = 70 + r * Math.sin((deg * Math.PI) / 180)
          return <circle key={i} cx={cx} cy={cy} r="2.5" fill={color.dustTaupe} />
        })}
      </svg>
    )
  }
  if (kind === "security") {
    return (
      <svg viewBox="0 0 200 140" width="100%" height="100%" fill="none" aria-hidden>
        <path
          d="M100 22 L142 38 L142 78 C142 102 122 120 100 128 C78 120 58 102 58 78 L58 38 Z"
          stroke={color.dustTaupe}
          strokeWidth="1"
          fill={`${accent}10`}
        />
        <path
          d="M100 36 L130 48 L130 78 C130 96 116 110 100 116 C84 110 70 96 70 78 L70 48 Z"
          stroke={`${accent}80`}
          strokeWidth="1"
        />
        <path
          d="M84 74 L94 84 L116 62"
          stroke={accent}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (kind === "global") {
    return (
      <svg viewBox="0 0 200 140" width="100%" height="100%" fill="none" aria-hidden>
        <ellipse cx="100" cy="70" rx="70" ry="46" stroke={color.dustTaupe} strokeWidth="1" />
        <ellipse cx="100" cy="70" rx="46" ry="46" stroke={color.dustTaupe} strokeWidth="1" />
        <line x1="30" y1="70" x2="170" y2="70" stroke={color.dustTaupe} strokeWidth="1" />
        {[
          { x: 60, y: 56, label: "UK" },
          { x: 92, y: 80, label: "US" },
          { x: 132, y: 60, label: "IN" },
          { x: 116, y: 92, label: "ME" },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="6" fill={accent} />
            <circle cx={p.x} cy={p.y} r="11" stroke={`${accent}55`} strokeWidth="1" fill="none" />
          </g>
        ))}
      </svg>
    )
  }
  // scale — bar chart climbing
  return (
    <svg viewBox="0 0 200 140" width="100%" height="100%" fill="none" aria-hidden>
      <line x1="20" y1="120" x2="180" y2="120" stroke={color.dustTaupe} strokeWidth="1" />
      {[
        { x: 36, h: 30 },
        { x: 66, h: 50 },
        { x: 96, h: 72 },
        { x: 126, h: 92 },
        { x: 156, h: 110 },
      ].map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={120 - b.h}
          width="18"
          height={b.h}
          fill={i === 4 ? accent : `${accent}55`}
          rx="2"
        />
      ))}
      <path
        d="M40 96 L72 78 L102 56 L132 38 L162 22"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
    </svg>
  )
}

export default function LightForEnterprise() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".lfe-head > *", {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".lfe-head",
            start: "top 80%",
          },
        })
        gsap.from(".lfe-card", {
          y: 36,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".lfe-grid",
            start: "top 75%",
          },
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
      <GrainOverlay opacity={0.05} blendMode="multiply" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 md:px-8 md:py-32">
        {/* Header */}
        <div className="lfe-head mx-auto flex max-w-[820px] flex-col items-start gap-6">
          <Eyebrow>For business &amp; enterprises</Eyebrow>
          <h2
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(36px, 5.4vw, 72px)",
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-2.4px",
              color: color.ink,
            }}
          >
            A delivery partner your{" "}
            <span
              style={{
                backgroundImage: BLOCK_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              board can rely on.
            </span>
          </h2>
          <p
            className="max-w-[620px]"
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: color.charcoal,
              opacity: 0.78,
            }}
          >
            Softree partners with leadership teams to ship critical software on
            timelines you can commit to — with the governance, security and
            visibility a regulated business demands.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <InkPill href="/contact" size="lg">
              Book a discovery call <ArrowRight />
            </InkPill>
            <InkPill href="/case-studies" variant="outline" size="lg">
              View case studies
            </InkPill>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="lfe-grid mt-20 grid grid-cols-1 gap-5 md:mt-24 md:grid-cols-2">
          {PILLARS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="lfe-card group relative flex flex-col overflow-hidden transition-transform duration-500"
              style={{
                background: color.lifted,
                border: `1px solid ${color.ghostCream}`,
                borderRadius: radius.consent,
                boxShadow: shadow.golden,
                minHeight: 360,
              }}
            >
              {/* Illustration band */}
              <div
                className="relative w-full"
                style={{
                  height: 180,
                  background: `linear-gradient(180deg, ${color.ivory} 0%, ${color.lifted} 100%)`,
                  borderBottom: `1px solid ${color.ghostCream}`,
                }}
              >
                <div className="absolute inset-0 p-8">
                  <Illustration kind={p.illustration} accent={p.accent} />
                </div>
                {/* Accent corner */}
                <div
                  aria-hidden
                  className="absolute right-5 top-5 font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: p.accent,
                    padding: "4px 10px",
                    border: `1px solid ${p.accent}55`,
                    borderRadius: 999,
                    background: `${p.accent}10`,
                  }}
                >
                  Pillar
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between gap-5 p-7">
                <div className="flex flex-col gap-3">
                  <h3
                    style={{
                      fontFamily: "inherit",
                      fontSize: 26,
                      fontWeight: 500,
                      lineHeight: 1.15,
                      letterSpacing: "-0.6px",
                      color: color.ink,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15.5,
                      lineHeight: 1.55,
                      color: color.charcoal,
                      opacity: 0.78,
                    }}
                  >
                    {p.body}
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: color.ink,
                  }}
                >
                  {p.cta}
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Hover accent line */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ height: 3, background: p.accent }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
