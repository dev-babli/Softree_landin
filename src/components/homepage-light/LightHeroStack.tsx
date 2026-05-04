"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow } from "./tokens"
import { ArrowRight, BlockGradientStripe, Eyebrow, GrainOverlay, InkPill, SoftBlurOrb } from "./primitives"
import Grainient from "./Grainient"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Hero with GSAP-driven stacked cards deck.
 *  • Left column: eyebrow, massive display headline, body, CTAs, ticker
 *  • Right column: 5 stadium-radius cards stacked like a fanned deck.
 *    - Entrance: spring up + fan-out on mount (timeline)
 *    - Idle: subtle y-float via yoyo
 *    - Scroll: cards parallax-separate; top card tilts slightly
 *    - Hover a card: it lifts and siblings settle
 *  • Background: warm cream wash + animated sunrise blob
 */

type DeckCard = {
  tag: string
  title: string
  metric?: string
  body?: string
  tone: "amber" | "cream" | "ink" | "gold" | "white"
  accent?: string
}

const DECK: DeckCard[] = [
  {
    tag: "Live",
    title: "99.997%",
    body: "Uptime across 14 cloud regions this quarter.",
    tone: "ink",
    metric: "SLO · 30d",
  },
  {
    tag: "Strategy",
    title: "From napkin to roadmap in 14 days",
    tone: "amber",
    accent: "+ sharper problem",
  },
  {
    tag: "Engineering",
    title: "Ships that age well",
    tone: "white",
    body: "TypeScript · Go · Rust · Python.",
  },
  {
    tag: "AI & Data",
    title: "Applied AI, production-grade",
    tone: "gold",
    body: "RAG, agents, evals — not demos.",
  },
  {
    tag: "Platform",
    title: "SRE on your side",
    tone: "cream",
    body: "24/7 on-call from week one.",
  },
]

function Card({
  c,
  index,
  active,
  onClick,
}: {
  c: DeckCard
  index: number
  active: boolean
  onClick: () => void
}) {
  const background =
    c.tone === "ink"
      ? `linear-gradient(160deg, ${color.ink} 0%, ${color.charcoal} 100%)`
      : c.tone === "amber"
        ? `linear-gradient(152deg, ${color.yellow} 0%, ${color.sunshine} 46%, ${color.flame} 100%)`
        : c.tone === "gold"
          ? `linear-gradient(152deg, ${color.gold} 0%, ${color.sunshine} 100%)`
          : c.tone === "cream"
            ? color.cream
            : color.white

  const textCol = c.tone === "ink" ? color.canvas : color.ink
  const subCol =
    c.tone === "ink" ? "rgba(243,240,238,0.75)" : c.tone === "amber" ? color.ink : color.slate

  return (
    <button
      type="button"
      onClick={onClick}
      data-deck-card
      data-index={index}
      aria-label={`${c.tag} — ${c.title}`}
      className="hero-deck-card absolute left-1/2 top-1/2 flex flex-col overflow-hidden text-left"
      style={{
        width: 320,
        height: 400,
        marginLeft: -160,
        marginTop: -200,
        borderRadius: 40,
        background,
        color: textCol,
        boxShadow: active ? shadow.drama : shadow.halo,
        border:
          c.tone === "white" || c.tone === "cream"
            ? `1px solid rgba(20,20,19,0.08)`
            : "none",
        cursor: "pointer",
        willChange: "transform, box-shadow",
        padding: 24,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 999,
            background:
              c.tone === "ink" ? "rgba(255,255,255,0.12)" : "rgba(20,20,19,0.08)",
            color: textCol,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.48px",
            textTransform: "uppercase",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: c.tone === "ink" ? color.signalLight : color.mistral,
            }}
          />
          {c.tag}
        </span>
        <span
          aria-hidden
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: subCol,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}
        >
          0{index + 1}
        </span>
      </div>

      <div className="mt-auto">
        <h3
          style={{
            fontFamily: "inherit",
            fontSize: c.title.length > 24 ? 26 : 40,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: "-0.028em",
            color: textCol,
          }}
        >
          {c.title}
        </h3>
        {c.body ? (
          <p className="mt-3" style={{ fontSize: 14, fontWeight: 450, color: subCol, lineHeight: 1.45 }}>
            {c.body}
          </p>
        ) : null}
        {c.accent ? (
          <div
            className="mt-3"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.48px",
              textTransform: "uppercase",
              color: c.tone === "amber" ? color.ink : color.mistral,
            }}
          >
            {c.accent}
          </div>
        ) : null}
      </div>

      {/* arrow dot */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: 18,
          bottom: 18,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: c.tone === "ink" ? color.canvas : color.ink,
          color: c.tone === "ink" ? color.ink : color.canvas,
          display: "grid",
          placeItems: "center",
        }}
      >
        <ArrowRight size={16} />
      </span>

      {/* metric pill — only on top/ink card */}
      {c.metric ? (
        <span
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.32px",
          }}
        >
          {c.metric}
        </span>
      ) : null}
    </button>
  )
}

export default function LightHeroStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Entrance + idle float + scroll parallax
  useGSAP(
    () => {
      const deck = deckRef.current
      if (!deck) return
      const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card]", deck)

      // target fan-out transforms, indexed
      const layout = [
        { x: -180, y: 60, r: -14, z: 1 },
        { x: -90, y: 24, r: -7, z: 2 },
        { x: 0, y: 0, r: 0, z: 5 },
        { x: 90, y: 24, r: 7, z: 3 },
        { x: 180, y: 60, r: 14, z: 2 },
      ]

      // initial (stacked tight)
      gsap.set(cards, {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 120,
        rotate: 0,
        scale: 0.9,
        opacity: 0,
        transformOrigin: "50% 100%",
      })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.07,
      }).to(
        cards,
        {
          x: (i) => layout[i]?.x ?? 0,
          y: (i) => layout[i]?.y ?? 0,
          rotate: (i) => layout[i]?.r ?? 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.05,
        },
        "-=0.35"
      )

      // z-index management (gsap doesn't animate z-index numerically for stacking well)
      cards.forEach((c, i) => {
        c.style.zIndex = String(layout[i]?.z ?? 1)
      })

      // Idle float — only the center card, gentle yoyo
      const centerIndex = 2
      const float = gsap.to(cards[centerIndex], {
        y: layout[centerIndex].y - 10,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Mouse parallax
      const onMove = (e: MouseEvent) => {
        const rect = deck.getBoundingClientRect()
        const nx = (e.clientX - rect.left - rect.width / 2) / rect.width
        const ny = (e.clientY - rect.top - rect.height / 2) / rect.height
        cards.forEach((c, i) => {
          const depth = Math.abs(i - centerIndex) + 1
          gsap.to(c, {
            x: (layout[i]?.x ?? 0) + nx * 14 * depth,
            y: (layout[i]?.y ?? 0) + ny * 10 * depth,
            rotate: (layout[i]?.r ?? 0) + nx * 2,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          })
        })
      }
      deck.addEventListener("mousemove", onMove)
      deck.addEventListener("mouseleave", () => {
        cards.forEach((c, i) => {
          gsap.to(c, {
            x: layout[i]?.x ?? 0,
            y: layout[i]?.y ?? 0,
            rotate: layout[i]?.r ?? 0,
            duration: 0.8,
            ease: "power3.out",
          })
        })
      })

      // Scroll parallax — deck sinks slightly on scroll down
      const scrollTween = gsap.to(cards, {
        y: (i) => (layout[i]?.y ?? 0) + 80,
        scale: 0.96,
        rotate: (i) => (layout[i]?.r ?? 0) * 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })

      return () => {
        deck.removeEventListener("mousemove", onMove)
        float.kill()
        scrollTween.scrollTrigger?.kill()
        scrollTween.kill()
        tl.kill()
      }
    },
    { scope: sectionRef }
  )

  // On click, pop active card to front with zoom
  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    const cards = deck.querySelectorAll<HTMLElement>("[data-deck-card]")
    cards.forEach((c, i) => {
      gsap.to(c, {
        scale: i === active ? 1.06 : 0.96,
        boxShadow: i === active ? shadow.drama : shadow.halo,
        duration: 0.6,
        ease: "power3.out",
      })
      c.style.zIndex = String(i === active ? 10 : 2 + (3 - Math.abs(i - 2)))
    })
  }, [active])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      {/* Animated warm grainient wash — low opacity, heavily blurred */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.55, filter: "blur(40px) saturate(1.05)" }}
      >
        <Grainient
          color1={color.yellow}
          color2={color.sunshine}
          color3={color.cream}
          timeSpeed={0.12}
          warpStrength={1.2}
          warpFrequency={3.6}
          warpSpeed={1.2}
          warpAmplitude={80}
          blendAngle={20}
          blendSoftness={0.25}
          rotationAmount={220}
          noiseScale={1.6}
          grainAmount={0}
          contrast={1.15}
          saturation={0.95}
          zoom={1.1}
          centerX={0.18}
          centerY={-0.1}
        />
      </div>

      {/* soft warm blur orbs for depth */}
      <SoftBlurOrb
        size={560}
        color={color.sunshine}
        blur={100}
        opacity={0.35}
        style={{ right: -180, top: -180 }}
      />
      <SoftBlurOrb
        size={380}
        color={color.cream}
        blur={80}
        opacity={0.55}
        style={{ left: -120, bottom: -120 }}
      />

      {/* Film grain — sits above everything for that analog tooth */}
      <GrainOverlay opacity={0.14} blendMode="overlay" scale={1.2} />

      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-16 px-6 pb-28 pt-14 md:px-10 md:pb-36 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10">
        {/* Left — headline */}
        <div className="relative z-10">
          <Eyebrow className="mb-6">Softree · Technology partner</Eyebrow>

          <h1
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(44px, 7.6vw, 96px)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: color.ink,
              textWrap: "balance",
            }}
          >
            We build frontier{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(92deg, ${color.mistral} 0%, ${color.flame} 40%, ${color.sunshine} 75%, ${color.yellow} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              software
            </span>
            <br />
            in golden hour.
          </h1>

          <p
            className="mt-8 max-w-[560px]"
            style={{
              fontSize: 18,
              fontWeight: 450,
              lineHeight: 1.5,
              color: color.charcoal,
            }}
          >
            A calm, senior engineering studio shipping durable products for
            ambitious teams. Strategy, design, engineering — one partner, from
            first whiteboard to production scale.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <InkPill href="#contact" size="lg">
              Start a project <ArrowRight />
            </InkPill>
            <InkPill href="#work" size="lg" variant="cream">
              See our work
            </InkPill>
          </div>

          {/* quick dots */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            {[
              { d: color.signalLight, t: "Live · 120+ products" },
              { d: color.mistral, t: "9.1 yr senior tenure" },
              { d: color.ink, t: "14 industries shipped" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2">
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: x.d,
                    boxShadow: `0 0 10px ${x.d}88`,
                  }}
                />
                <span style={{ fontSize: 13, fontWeight: 500, color: color.ink }}>{x.t}</span>
              </div>
            ))}
          </div>

          {/* spectrum strip */}
          <div className="mt-12 max-w-[520px]">
            <div
              className="mb-2 flex items-center justify-between"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.48px",
                textTransform: "uppercase",
                color: color.slate,
              }}
            >
              <span>· Softree spectrum</span>
              <span>Warm → Signal</span>
            </div>
            <BlockGradientStripe height={10} style={{ borderRadius: 999 }} />
          </div>
        </div>

        {/* Right — stacked deck */}
        <div
          ref={deckRef}
          className="relative mx-auto w-full"
          style={{
            height: 540,
            maxWidth: 620,
            perspective: 1200,
          }}
          aria-label="Softree capability deck"
        >
          {DECK.map((c, i) => (
            <Card key={c.tag} c={c} index={i} active={active === i} onClick={() => setActive(i)} />
          ))}

          {/* ground shadow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[calc(50%+180px)] -translate-x-1/2"
            style={{
              width: 480,
              height: 40,
              borderRadius: "50%",
              background: `radial-gradient(ellipse at center, rgba(127,99,21,0.22) 0%, transparent 70%)`,
              filter: "blur(6px)",
            }}
          />

          {/* deck dots nav */}
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {DECK.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Focus card ${i + 1}`}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: active === i ? color.ink : `${color.ink}33`,
                  border: "none",
                  cursor: "pointer",
                  transition: "width 300ms ease, background 300ms ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* marquee ticker — trusted by */}
      <div
        className="relative overflow-hidden border-y"
        style={{ borderColor: `${color.ink}15`, background: color.lifted }}
      >
        <div className="flex animate-[softreeMarquee_38s_linear_infinite] gap-16 whitespace-nowrap py-5 pl-10">
          {[...Array(2)].flatMap((_, rep) =>
            ["Atlas", "Meridian", "Northwind", "Solace", "Orbit Labs", "Paragon", "Cirrus", "Lumen"].map((n) => (
              <span
                key={`${rep}-${n}`}
                style={{
                  fontFamily: "inherit",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: "-0.5px",
                  color: color.ink,
                  opacity: 0.72,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 32,
                }}
              >
                {n}
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: color.signalLight,
                    display: "inline-block",
                  }}
                />
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
