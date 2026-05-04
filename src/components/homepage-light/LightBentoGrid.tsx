"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color } from "./tokens"
import { Eyebrow, GoldenCard, GrainOverlay, SoftBlurOrb } from "./primitives"
import { SplitWords, W } from "./SplitWords"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

const CAPABILITIES = [
  {
    name: "Cloud Infrastructure",
    tag: "AWS · Azure · GCP",
    body: "Multi-cloud deployments with infrastructure-as-code. Automated scaling, disaster recovery, and 99.99% uptime SLAs backed by enterprise observability.",
    accent: color.signalLight,
    size: "large", // spans 2 columns
  },
  {
    name: "AI & ML Systems",
    tag: "Generative AI · LLMs · Computer Vision",
    body: "Production-ready AI pipelines from model training to deployment. RAG architectures, fine-tuning, and real-time inference at scale.",
    accent: color.gold,
    size: "large",
  },
  {
    name: "Software Engineering",
    tag: "TypeScript · Python · Go · Rust",
    body: "End-to-end product development with typed APIs, microservices, and event-driven architectures.",
    accent: color.sunshine,
    size: "small",
  },
  {
    name: "Data Engineering",
    tag: "Data Lakes · Warehouses · Streaming",
    body: "Real-time data pipelines, ETL automation, and business intelligence dashboards that drive decisions.",
    accent: color.flame,
    size: "small",
  },
  {
    name: "Security & Compliance",
    tag: "SOC2 · GDPR · HIPAA",
    body: "Security-first architecture with automated compliance checks, penetration testing, and zero-trust networking.",
    accent: color.mistral,
    size: "small",
  },
  {
    name: "DevOps & SRE",
    tag: "CI/CD · Kubernetes · Monitoring",
    body: "Release automation, container orchestration, and 24/7 site reliability engineering.",
    accent: color.yellow,
    size: "small",
  },
]

export default function LightBentoGrid() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Header reveal
      gsap.from(root.querySelector("[data-bento-header]"), {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      })

      // Cards stagger with subtle scale
      gsap.from(root.querySelectorAll("[data-bento-card]"), {
        y: 60,
        opacity: 0,
        scale: 0.96,
        stagger: { amount: 0.6, from: "random" },
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      })

      // Floating accent orbs animation
      const orbs = root.querySelectorAll("[data-orb]")
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: "+=20",
          x: "+=10",
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      {/* Ambient blur orbs */}
      <SoftBlurOrb data-orb size={500} color={color.sunshine} blur={140} opacity={0.25} style={{ left: -150, top: 100 }} />
      <SoftBlurOrb data-orb size={400} color={color.mistral} blur={120} opacity={0.2} style={{ right: -100, bottom: 200 }} />
      <GrainOverlay opacity={0.06} blendMode="overlay" scale={1.3} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        {/* Header */}
        <div data-bento-header className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow>· Core Capabilities</Eyebrow>
            <SplitWords
              as="h2"
              className="mt-6 max-w-[720px]"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(36px, 5.6vw, 72px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 90%"
              stagger={0.05}
              y={30}
            >
              <W>Everything</W> <W>you</W> <W>need</W>
              <br />
              <W style={{ color: color.mistral }}>under</W> <W style={{ color: color.mistral }}>one</W> <W style={{ color: color.mistral }}>roof.</W>
            </SplitWords>
          </div>
          <p
            style={{ fontSize: 15, fontWeight: 450, lineHeight: 1.55, color: color.slate, maxWidth: 420 }}
          >
            We&apos;ve assembled world-class expertise across the full technology stack.
            From infrastructure to AI, we deliver integrated solutions that actually work.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item, i) => {
            const isLarge = item.size === "large"
            return (
              <GoldenCard
                key={item.name}
                tone={i % 3 === 0 ? "ivory" : i % 3 === 1 ? "cream" : "white"}
                data-bento-card
                className="group relative overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                style={{
                  minHeight: isLarge ? 320 : 280,
                  gridColumn: isLarge ? "span 2" : "span 1",
                }}
              >
                <GrainOverlay opacity={0.06} blendMode="multiply" scale={1.3} />

                {/* Gradient accent bar at top */}
                <div
                  className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                  style={{ background: item.accent }}
                />

                {/* Accent orb */}
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: item.accent }}
                />

                <div className="relative flex h-full flex-col p-8 md:p-10">
                  {/* Tag */}
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        color: color.slate,
                      }}
                    >
                      {item.tag}
                    </span>
                    <span
                      className="transition-transform duration-500 group-hover:scale-125"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: item.accent,
                        boxShadow: `0 0 0 4px ${item.accent}33`,
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "inherit",
                      fontSize: isLarge ? "clamp(28px, 3vw, 40px)" : "clamp(22px, 2vw, 28px)",
                      fontWeight: 500,
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      color: color.ink,
                    }}
                  >
                    {item.name}
                  </h3>

                  {/* Body */}
                  <p
                    className="mt-4 max-w-[420px]"
                    style={{
                      fontFamily: "inherit",
                      fontSize: 15,
                      fontWeight: 450,
                      lineHeight: 1.55,
                      color: color.slate,
                    }}
                  >
                    {item.body}
                  </p>

                  {/* Hover arrow */}
                  <div className="mt-auto pt-6">
                    <span
                      className="inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: color.ink,
                      }}
                    >
                      Learn more
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </GoldenCard>
            )
          })}
        </div>

        {/* Bottom CTA row */}
        <div
          data-bento-card
          className="mt-5 flex flex-col items-center justify-between gap-6 rounded-3xl p-8 md:flex-row md:p-10"
          style={{
            background: `linear-gradient(135deg, ${color.ink} 0%, ${color.ink}dd 100%)`,
            color: color.canvas,
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to build something extraordinary?
            </h4>
            <p className="mt-2" style={{ fontSize: 15, opacity: 0.8 }}>
              Let&apos;s discuss how we can accelerate your technology roadmap.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 transition-all duration-300 hover:scale-105"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              background: color.canvas,
              color: color.ink,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.28px",
              textDecoration: "none",
            }}
          >
            Schedule a call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
