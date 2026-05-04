"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow, radius } from "./tokens"
import { Eyebrow, InkPill, ArrowRight, GrainOverlay, SoftBlurOrb } from "./primitives"
import { SplitWords, W } from "./SplitWords"
import Grainient from "./Grainient"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

const TABS = ["Platform", "Engineering", "AI/ML", "Security"]

const SPECS = [
  {
    label: "Uptime",
    value: "99.99%",
    sub: "Enterprise SLA guarantee",
    accent: color.signalLight,
  },
  {
    label: "Deploy Velocity",
    value: "40x",
    sub: "Faster time to production",
    accent: color.gold,
  },
  {
    label: "Cost Savings",
    value: "60%",
    sub: "Average infrastructure reduction",
    accent: color.sunshine,
  },
]

export default function LightProductShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 75%", once: true } })

      // Container entrance
      tl.from(root.querySelector("[data-container]"), {
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
      }, 0)

      // Tabs stagger
      tl.from(root.querySelectorAll("[data-tab]"), {
        y: -20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out"
      }, 0.2)

      // Left section
      tl.from(root.querySelector("[data-left]"), {
        x: -50, opacity: 0, duration: 0.9, ease: "power3.out"
      }, 0.3)

      // Center visual
      tl.from(root.querySelector("[data-center]"), {
        scale: 0.9, opacity: 0, duration: 1.1, ease: "power3.out"
      }, 0.35)

      // Right cards
      tl.from(root.querySelectorAll("[data-card]"), {
        x: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out"
      }, 0.4)

      // Parallax on center
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 }
        })
      }

      return () => { tl.scrollTrigger?.kill(); tl.kill() }
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: color.lifted }}>
      <SoftBlurOrb size={700} color={color.sunshine} blur={140} opacity={0.28} style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
      <SoftBlurOrb size={500} color={color.mistral} blur={120} opacity={0.14} style={{ right: -120, top: -80 }} />
      <GrainOverlay opacity={0.05} blendMode="overlay" scale={1.2} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Eyebrow className="justify-center">Platform Overview</Eyebrow>
          <SplitWords
            as="h2"
            className="mx-auto mt-5 max-w-2xl"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              color: color.ink,
            }}
            scrollStart="top 85%"
            stagger={0.06}
            y={25}
          >
            <W>Built</W> <W>for</W> <W style={{ color: color.mistral }}>scale.</W>
            <br />
            <W>Engineered</W> <W>for</W> <W style={{ color: color.mistral }}>speed.</W>
          </SplitWords>
        </div>

        {/* Main Showcase Container */}
        <div
          data-container
          className="relative overflow-hidden"
          style={{
            background: color.white,
            borderRadius: radius.stadium,
            boxShadow: shadow.drama,
          }}
        >
          {/* Tabs Header */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b p-4 md:p-6" style={{ borderColor: `${color.ink}10` }}>
            {TABS.map((tab, index) => (
              <button
                key={tab}
                data-tab
                onClick={() => setActiveTab(index)}
                className="transition-all duration-300"
                style={{
                  padding: "10px 24px",
                  borderRadius: radius.pill,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "-0.26px",
                  cursor: "pointer",
                  border: `1.5px solid ${activeTab === index ? color.ink : `${color.ink}20`}`,
                  background: activeTab === index ? color.ink : color.white,
                  color: activeTab === index ? color.canvas : color.ink,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 items-center gap-8 p-6 md:grid-cols-[300px_1fr_280px] md:p-10 md:gap-10">
            {/* Left: Product Info */}
            <div data-left className="flex flex-col">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1" style={{ background: color.cream, fontSize: 12, fontWeight: 600, color: color.ink }}>
                <span className="h-2 w-2 rounded-full" style={{ background: color.signalLight }} />
                Enterprise Grade
              </div>

              <h3 style={{ fontFamily: "inherit", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: color.ink }}>
                Softree
                <br />
                <span style={{ color: color.mistral }}>Platform Stack</span>
              </h3>

              <p className="mt-4 max-w-[280px]" style={{ fontSize: 15, fontWeight: 450, lineHeight: 1.6, color: color.charcoal }}>
                A hardened platform we deploy on every engagement: typed APIs, automated CI/CD, observability, and release trains.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <InkPill href="#book" size="md">Book a demo <ArrowRight size={16} /></InkPill>
                <InkPill href="#spec" variant="outline" size="md">View documentation</InkPill>
              </div>

              {/* Feature bullets */}
              <div className="mt-8 space-y-3">
                {["Kubernetes-native", "SOC 2 Type II", "GDPR compliant", "24/7 SRE support"].map((item, index) => (
                  <div key={index} className="flex items-center gap-2" style={{ fontSize: 14, color: color.slate }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color.mistral} strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Hero Visual */}
            <div
              data-center
              className="relative aspect-[4/3] overflow-hidden"
              style={{
                borderRadius: radius.stadium,
                background: `linear-gradient(135deg, ${color.cream} 0%, ${color.ivory} 50%, ${color.white} 100%)`,
              }}
            >
              <div ref={heroRef} className="absolute inset-0 p-8">
                {/* Animated gradient mesh */}
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
                  <Grainient
                    color1={color.sunshine}
                    color2={color.flame}
                    color3={color.mistral}
                    timeSpeed={0.15}
                    warpStrength={0.8}
                    warpFrequency={3}
                    warpSpeed={1}
                    warpAmplitude={40}
                    blendAngle={120}
                    blendSoftness={0.15}
                    rotationAmount={280}
                    noiseScale={1.5}
                    grainAmount={0.06}
                    grainAnimated={false}
                  />
                </div>

                {/* Central floating card */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 180, height: 220, borderRadius: 20, background: color.white, boxShadow: shadow.drama }}>
                  <div className="flex h-full flex-col p-5">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ background: color.signalLight }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: color.slate }}>System Status</span>
                    </div>
                    <div className="mt-auto">
                      <div style={{ fontSize: 32, fontWeight: 600, color: color.ink, lineHeight: 1 }}>99.99%</div>
                      <div style={{ fontSize: 12, color: color.slate, marginTop: 4 }}>Uptime this month</div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute left-6 top-6" style={{ padding: "10px 16px", borderRadius: 12, background: color.white, boxShadow: shadow.pill }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: color.ink }}>API Latency</div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: color.mistral }}>24ms</div>
                </div>

                <div className="absolute bottom-6 right-6" style={{ padding: "10px 16px", borderRadius: 12, background: color.white, boxShadow: shadow.pill }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: color.ink }}>Deployments</div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: color.mistral }}>1,247</div>
                </div>

                <GrainOverlay opacity={0.1} blendMode="overlay" scale={1.1} />
              </div>
            </div>

            {/* Right: Stat Cards */}
            <div className="flex flex-col gap-4">
              {SPECS.map((spec) => (
                <div
                  key={spec.label}
                  data-card
                  className="group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    borderRadius: radius.consent,
                    background: color.white,
                    border: `1.5px solid ${color.ink}10`,
                    boxShadow: shadow.halo,
                  }}
                >
                  <GrainOverlay opacity={0.06} blendMode="multiply" scale={1.2} />

                  {/* Accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                    style={{ background: spec.accent }}
                  />

                  <div className="relative">
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: color.slate }}>{spec.label}</span>
                    <div className="mt-2" style={{ fontFamily: "inherit", fontSize: 36, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.7px", color: color.ink }}>
                      {spec.value}
                    </div>
                    <div className="mt-1" style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.4, color: color.charcoal }}>
                      {spec.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
