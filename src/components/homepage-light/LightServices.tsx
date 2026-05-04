"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color } from "./tokens"
import { CirclePortrait, Eyebrow, GhostWatermark, GrainOverlay, SoftBlurOrb } from "./primitives"
import { SplitWords, W } from "./SplitWords"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Services constellation — Mastercard signature treatment.
 *  • 4 circular portraits asymmetrically placed
 *  • Each portrait has a white satellite arrow CTA docked bottom-right
 *  • Thin Light Signal Orange (#F37338) arcs imply connection
 *  • Ghost watermark headline layered behind in cream-on-cream
 */

type Svc = {
  eyebrow: string
  title: string
  href: string
  diameter: number
  bg: string
  x: string // percent left (asymmetric)
  y: number // top offset px
  src?: string
}

const SERVICES: Svc[] = [
  {
    eyebrow: "· Strategy",
    title: "Product discovery & technology strategy",
    href: "#services/strategy",
    diameter: 300,
    bg: `radial-gradient(circle at 30% 30%, ${color.gold} 0%, ${color.sunshine} 55%, ${color.mistral} 100%)`,
    x: "6%",
    y: 60,
  },
  {
    eyebrow: "· Engineering",
    title: "Full-stack product engineering, built to last",
    href: "#services/engineering",
    diameter: 340,
    bg: `radial-gradient(circle at 70% 30%, ${color.cream} 0%, ${color.sunshine} 50%, ${color.flame} 100%)`,
    x: "38%",
    y: 260,
  },
  {
    eyebrow: "· AI & Data",
    title: "Applied AI, production-grade",
    href: "#services/ai",
    diameter: 280,
    bg: `radial-gradient(circle at 40% 40%, ${color.yellow} 0%, ${color.flame} 60%, ${color.mistral} 100%)`,
    x: "66%",
    y: 40,
  },
  {
    eyebrow: "· Platform",
    title: "Cloud, DevOps & platform reliability",
    href: "#services/platform",
    diameter: 260,
    bg: `radial-gradient(circle at 50% 50%, ${color.lifted} 0%, ${color.gold} 60%, ${color.sunshine} 100%)`,
    x: "78%",
    y: 340,
  },
]

export default function LightServices() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Draw orbital arcs on scroll-in
        const paths = root.querySelectorAll<SVGPathElement>("[data-orbit]")
        paths.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(p, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: p, start: "top 85%", once: true },
          })
        })
        // Float portraits up
        const portraits = root.querySelectorAll<HTMLElement>("[data-portrait]")
        gsap.from(portraits, {
          y: 50,
          opacity: 0,
          scale: 0.92,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        })
        // Ghost watermark slow drift
        const ghost = root.querySelector<HTMLElement>("[data-ghost]")
        if (ghost) {
          gsap.to(ghost, {
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        }
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      {/* ambient warm blur + subtle grain */}
      <SoftBlurOrb
        size={520}
        color={color.gold}
        blur={110}
        opacity={0.35}
        style={{ left: "60%", top: -120 }}
      />
      <SoftBlurOrb
        size={420}
        color={color.cream}
        blur={100}
        opacity={0.5}
        style={{ left: -140, bottom: 80 }}
      />
      <GrainOverlay opacity={0.08} blendMode="overlay" scale={1.3} />

      <div ref={sectionRef} className="relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-36">
        {/* Ghost watermark */}
        <div
          className="pointer-events-none absolute -left-6 top-10 z-0"
          aria-hidden
          style={{ overflow: "hidden", width: "120%" }}
        >
          <div data-ghost>
            <GhostWatermark size={220}>services · services · services</GhostWatermark>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-16 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Eyebrow>Services</Eyebrow>
            <SplitWords
              as="h2"
              className="mt-5"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 88%"
            >
              <W>A</W> <W>constellation</W> <W>of</W> <W>disciplines,</W>
              <br />
              <W>orbiting</W> <W>one</W>{" "}
              <W style={{ fontStyle: "italic", color: color.mistral }}>outcome.</W>
            </SplitWords>
          </div>
          <p
            className="max-w-[460px] md:justify-self-end"
            style={{ fontSize: 17, fontWeight: 450, lineHeight: 1.5, color: color.charcoal }}
          >
            We fuse strategy, product design, engineering, AI and platform operations
            into one team. Each discipline is its own circle, but they all share
            gravity with the problem you&rsquo;re trying to solve.
          </p>
        </div>

        {/* Constellation — desktop asymmetric placement */}
        <div className="relative z-10 hidden lg:block" style={{ height: 720 }}>
          {/* Orbital arcs */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 720"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0" stopColor={color.signalLight} stopOpacity="0" />
                <stop offset="0.15" stopColor={color.signalLight} stopOpacity="0.85" />
                <stop offset="0.85" stopColor={color.signalLight} stopOpacity="0.85" />
                <stop offset="1" stopColor={color.signalLight} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              data-orbit
              d="M 150 250 C 350 120, 520 320, 700 420"
              stroke="url(#arcGrad)"
              strokeWidth="1.3"
              fill="none"
            />
            <path
              data-orbit
              d="M 620 420 C 780 260, 880 200, 1000 230"
              stroke="url(#arcGrad)"
              strokeWidth="1.3"
              fill="none"
            />
            <path
              data-orbit
              d="M 1010 280 C 1060 480, 1020 560, 950 560"
              stroke="url(#arcGrad)"
              strokeWidth="1.3"
              fill="none"
            />
          </svg>

          {SERVICES.map((s) => (
            <div
              key={s.title}
              data-portrait
              className="absolute"
              style={{ left: s.x, top: s.y }}
            >
              <CirclePortrait
                alt={s.title}
                eyebrow={s.eyebrow}
                title={s.title}
                href={s.href}
                diameter={s.diameter}
                bg={s.bg}
              />
            </div>
          ))}
        </div>

        {/* Mobile/tablet fallback — clean stacked grid */}
        <div className="relative z-10 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:hidden">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex justify-center">
              <CirclePortrait
                alt={s.title}
                eyebrow={s.eyebrow}
                title={s.title}
                href={s.href}
                diameter={Math.min(s.diameter, 260)}
                bg={s.bg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
