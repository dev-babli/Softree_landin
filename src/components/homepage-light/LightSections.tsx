"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow } from "./tokens"
import {
  ArrowRight,
  BlockGradientStripe,
  Eyebrow,
  GoldenCard,
  GrainOverlay,
  InkPill,
  SoftBlurOrb,
} from "./primitives"
import Grainient from "./Grainient"
import { SplitWords, W } from "./SplitWords"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/* Tiny animated counter — counts from 0 to target when in view. */
function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.8,
  className,
  style,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { v: 0 }
      const tween = gsap.to(obj, {
        v: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          const n = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toString()
          el.textContent = `${prefix}${n}${suffix}`
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [value, duration, decimals, prefix, suffix])
  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {decimals ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </span>
  )
}

/* ======================================================================
 *  FEATURES — 3 golden-shadow cards (Mistral) with ink pill CTA
 * ==================================================================== */
const FEATURES = [
  {
    eyebrow: "· Discover",
    title: "From a napkin sketch to a wedge-shaped roadmap",
    body:
      "We pair business strategy with senior engineering judgment. You leave week one with a sharper problem, a smaller first release, and the confidence to ship.",
    kicker: "WEEK 1 — 2",
    tone: "cream" as const,
  },
  {
    eyebrow: "· Build",
    title: "Engineering that ages well, on purpose",
    body:
      "TypeScript, Go, Rust, Python — picked for the job, not the resume. Tests, observability and CI/CD baked in from day one so velocity survives week 40.",
    kicker: "WEEK 3 — 16",
    tone: "ivory" as const,
  },
  {
    eyebrow: "· Operate",
    title: "Stay on the pitch long after launch",
    body:
      "We run your product with you — on-call rotations, release trains, performance budgets — so the team that built it is the team that keeps it healthy.",
    kicker: "ONGOING",
    tone: "lifted" as const,
  },
]

export function LightFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = root.querySelectorAll<HTMLElement>("[data-feature-card]")
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          rotate: -1.5,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        })
        // Headline split-ish slide
        const h = root.querySelector<HTMLElement>("[data-feature-head]")
        if (h) {
          gsap.from(h, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          })
        }
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="process" className="w-full" style={{ background: color.canvas }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Eyebrow>How we work</Eyebrow>
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
              scrollStart="top 85%"
            >
              <W>Three</W> <W>phases.</W> <W>One</W> <W>team.</W>
              <br />
              <W>Zero</W> <W>pantomime.</W>
            </SplitWords>
          </div>
          <p
            className="max-w-[460px] md:justify-self-end"
            style={{ fontSize: 17, fontWeight: 450, lineHeight: 1.5, color: color.charcoal }}
          >
            No discovery theatre, no Gantt-chart cosplay. A small senior team,
            weekly demos, and a roadmap that changes when the evidence does.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <GoldenCard
              key={f.title}
              tone={f.tone}
              className="relative overflow-hidden p-8 md:p-10"
              style={{ minHeight: 380 }}
              data-feature-card
            >
              {/* paper-grain tooth */}
              <GrainOverlay opacity={0.09} blendMode="multiply" scale={1.4} />
              <div
                className="mb-8 flex items-center justify-between"
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.48px", color: color.slate }}
              >
                <span>{f.kicker}</span>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: color.ink,
                    color: color.canvas,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <Eyebrow>{f.eyebrow}</Eyebrow>
              <h3
                className="mt-4"
                style={{
                  fontFamily: "inherit",
                  fontSize: 26,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: "-0.6px",
                  color: color.ink,
                }}
              >
                {f.title}
              </h3>
              <p
                className="mt-5"
                style={{ fontSize: 15.5, lineHeight: 1.55, fontWeight: 450, color: color.charcoal }}
              >
                {f.body}
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2"
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: "-0.3px",
                    color: color.ink,
                    textDecoration: "none",
                    borderBottom: `1.5px solid ${color.ink}`,
                    paddingBottom: 2,
                  }}
                >
                  Learn more <ArrowRight size={14} />
                </a>
              </div>
            </GoldenCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ======================================================================
 *  STATS BAND — big numerals on lifted cream
 * ==================================================================== */
export function LightStats() {
  const stats = [
    { v: 98, suffix: "%", title: "Client NPS", sub: "Over the last 24 months" },
    { v: 14, suffix: "", title: "Active industries", sub: "Fintech to healthtech" },
    { v: 9.1, suffix: " yr", decimals: 1, title: "Senior tenure", sub: "Our team ages like wine" },
    { v: 120, suffix: "+", title: "Products shipped", sub: "Zero abandonware, live" },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll<HTMLElement>("[data-stat]"), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )
  return (
    <section ref={ref} className="w-full" style={{ background: color.lifted }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>By the numbers</Eyebrow>
            <SplitWords
              as="h2"
              className="mt-4"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 90%"
            >
              <W>The</W> <W>proof</W> <W>is</W> <W>in</W> <W>the</W> <W>data.</W>
            </SplitWords>
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: color.slate,
              letterSpacing: "0.4px",
            }}
          >
            Updated · {new Date().toLocaleString("en", { month: "short", year: "numeric" })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.title}
              data-stat
              className="border-l pl-5"
              style={{ borderColor: color.ink + "20" }}
            >
              <AnimatedNumber
                value={s.v}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
                style={{
                  fontFamily: "inherit",
                  fontSize: "clamp(48px, 6vw, 82px)",
                  fontWeight: 500,
                  lineHeight: 0.95,
                  letterSpacing: "-2.05px",
                  color: color.ink,
                  display: "block",
                }}
              />
              <div
                className="mt-4"
                style={{ fontSize: 15, fontWeight: 500, color: color.ink, letterSpacing: "-0.3px" }}
              >
                {s.title}
              </div>
              <div className="mt-1" style={{ fontSize: 13, fontWeight: 450, color: color.slate }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ======================================================================
 *  INDUSTRIES — pill chips on cream
 * ==================================================================== */
export function LightIndustries() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const pills = root.querySelectorAll<HTMLElement>("[data-industry-pill]")
      gsap.from(pills, {
        y: 24, opacity: 0, duration: 0.9, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      })
      const headEyebrow = root.querySelector<HTMLElement>("[data-industry-head] > div:first-child > div:first-child")
      if (headEyebrow) {
        gsap.from(headEyebrow, {
          y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        })
      }
    })
    return () => mm.revert()
  }, { scope: ref })

  const items = [
    "Fintech & Payments",
    "Banking & Wealth",
    "Healthcare",
    "Insurance",
    "Marketplaces",
    "SaaS platforms",
    "Climate tech",
    "Retail & Commerce",
    "Logistics",
    "Govtech",
    "AI startups",
    "Media & Publishing",
  ]
  return (
    <section id="industries" ref={ref} className="w-full" style={{ background: color.canvas }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div data-industry-head className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Eyebrow>Industries</Eyebrow>
            <SplitWords
              as="h2"
              className="mt-5"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(34px, 4.5vw, 56px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 88%"
            >
              <W>Regulated.</W> <W>Networked.</W> <W>Ambitious.</W>
            </SplitWords>
          </div>
          <p
            className="max-w-[460px] md:justify-self-end"
            style={{ fontSize: 17, fontWeight: 450, lineHeight: 1.5, color: color.charcoal }}
          >
            We gravitate toward industries where the details matter — where a
            rounding error can become a lawsuit and a release note can change a market.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {items.map((t, i) => (
            <span
              key={t}
              data-industry-pill
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 22px",
                borderRadius: 999,
                background:
                  i % 5 === 0
                    ? color.ink
                    : i % 5 === 2
                      ? color.cream
                      : color.white,
                color: i % 5 === 0 ? color.canvas : color.ink,
                border:
                  i % 5 === 0
                    ? `1.5px solid ${color.ink}`
                    : `1.5px solid ${color.ink}`,
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "-0.3px",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i % 5 === 0 ? color.signalLight : color.mistral,
                }}
              />
              {t}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <BlockGradientStripe height={10} style={{ borderRadius: 999 }} />
        </div>
      </div>
    </section>
  )
}

/* ======================================================================
 *  CASE-STUDY SHOWCASE — three stadium-pill media cards (Mastercard)
 * ==================================================================== */
export function LightShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tiles = root.querySelectorAll<HTMLElement>("[data-showcase-card]")
        gsap.from(tiles, {
          y: 80,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        })
        // parallax each card slightly
        tiles.forEach((t, i) => {
          gsap.to(t, {
            yPercent: i % 2 === 0 ? -4 : 4,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  const cards = [
    {
      tag: "Case study",
      title: "A trading desk, re-platformed in six months.",
      bg: `linear-gradient(158deg, ${color.mistral} 0%, ${color.flame} 45%, ${color.sunshine} 100%)`,
      metric: "+34% throughput",
    },
    {
      tag: "Case study",
      title: "Claims processing, cut from 11 days to 38 minutes.",
      bg: `linear-gradient(158deg, ${color.ink} 0%, ${color.charcoal} 100%)`,
      metric: "98% automation",
      darkText: true,
    },
    {
      tag: "Case study",
      title: "A marketplace that learned to think before it ranked.",
      bg: `linear-gradient(158deg, ${color.yellow} 0%, ${color.sunshine} 55%, ${color.mistral} 100%)`,
      metric: "+21% GMV",
    },
  ]

  return (
    <section ref={ref} id="work" className="w-full" style={{ background: color.lifted }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <SplitWords
              as="h2"
              className="mt-5 max-w-[720px]"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 85%"
            >
              <W>Proof,</W> <W>not</W> <W>pitch</W> <W>decks.</W>
            </SplitWords>
          </div>
          <InkPill href="#work" variant="outline">
            All case studies <ArrowRight />
          </InkPill>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.title}
              href="#"
              data-showcase-card
              className="group relative flex h-[460px] flex-col overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1"
              style={{
                borderRadius: 40,
                background: c.bg,
                boxShadow: shadow.halo,
                color: c.darkText ? color.canvas : color.ink,
                textDecoration: "none",
              }}
            >
              {/* per-card grain for that analog tooth */}
              <GrainOverlay
                opacity={c.darkText ? 0.18 : 0.14}
                blendMode={c.darkText ? "screen" : "overlay"}
                scale={1.1}
              />
              <span
                style={{
                  alignSelf: "flex-start",
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: c.darkText ? "rgba(255,255,255,0.14)" : color.white,
                  color: c.darkText ? color.canvas : color.ink,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.48px",
                  textTransform: "uppercase",
                }}
              >
                {c.tag}
              </span>

              <h3
                className="mt-auto"
                style={{
                  fontFamily: "inherit",
                  fontSize: 30,
                  fontWeight: 500,
                  lineHeight: 1.05,
                  letterSpacing: "-0.7px",
                }}
              >
                {c.title}
              </h3>
              <div className="mt-6 flex items-center justify-between">
                <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", opacity: 0.85 }}>
                  {c.metric}
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: color.white,
                    color: color.ink,
                    display: "grid",
                    placeItems: "center",
                    transition: "transform 400ms ease",
                  }}
                  className="group-hover:translate-x-1"
                >
                  <ArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ======================================================================
 *  TESTIMONIALS — golden-shadow quote cards
 * ==================================================================== */
export function LightTestimonials() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = root.querySelectorAll<HTMLElement>("[data-quote-card]")
      gsap.from(cards, {
        y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      })
      const headEyebrow = root.querySelector<HTMLElement>("[data-quote-head] > div:first-child")
      if (headEyebrow) {
        gsap.from(headEyebrow, {
          y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        })
      }
    })
    return () => mm.revert()
  }, { scope: ref })

  const quotes = [
    {
      q: "Softree didn't just ship the product — they reset how our engineering org thinks about quality. We're faster and calmer now.",
      a: "Helena Bauer",
      role: "VP Engineering, Atlas Bank",
    },
    {
      q: "They arrived in week one speaking our regulator's language. Six months later, audit took an afternoon.",
      a: "Marcus Ilic",
      role: "CTO, Meridian Insurance",
    },
    {
      q: "The clearest, least-dramatic senior team we've worked with. It felt like hiring an outcome.",
      a: "Priya Natarajan",
      role: "Founder, Solace Health",
    },
  ]
  return (
    <section ref={ref} className="w-full" style={{ background: color.canvas }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div data-quote-head className="mb-14 max-w-[820px]">
          <Eyebrow>Voices from the other side</Eyebrow>
          <SplitWords
            as="h2"
            className="mt-5"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 500,
              lineHeight: 0.98,
              letterSpacing: "-0.028em",
              color: color.ink,
              textWrap: "balance",
            }}
            scrollStart="top 88%"
          >
            <W>What</W> <W>our</W> <W>partners</W> <W>say</W>
            <br />
            <W>when</W> <W>the</W> <W>mic</W> <W>is</W> <W>off.</W>
          </SplitWords>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <GoldenCard key={q.a} tone="white" className="flex h-full flex-col p-8" data-quote-card>
              <svg width="28" height="28" viewBox="0 0 24 24" fill={color.mistral} aria-hidden>
                <path d="M7 7h4v4H7c0 2 1 3 3 3v3c-4 0-6-3-6-6V7Zm10 0h4v4h-4c0 2 1 3 3 3v3c-4 0-6-3-6-6V7Z" />
              </svg>
              <p
                className="mt-5"
                style={{
                  fontFamily: "inherit",
                  fontSize: 19,
                  fontWeight: 450,
                  lineHeight: 1.4,
                  color: color.ink,
                  letterSpacing: "-0.3px",
                }}
              >
                &ldquo;{q.q}&rdquo;
              </p>
              <div className="mt-auto pt-8">
                <div style={{ fontSize: 15, fontWeight: 500, color: color.ink }}>{q.a}</div>
                <div style={{ fontSize: 13, fontWeight: 450, color: color.slate }}>{q.role}</div>
              </div>
            </GoldenCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ======================================================================
 *  FAQ — accordion on cream
 * ==================================================================== */
export function LightFAQ() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = root.querySelectorAll<HTMLElement>("[data-faq-item]")
      gsap.from(items, {
        y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      })
      const headEyebrow = root.querySelector<HTMLElement>("[data-faq-head] > div:first-child")
      if (headEyebrow) {
        gsap.from(headEyebrow, {
          y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 90%", once: true },
        })
      }
    })
    return () => mm.revert()
  }, { scope: ref })

  const faqs = [
    {
      q: "How do engagements start?",
      a: "Usually with a 90-minute discovery call, then a paid two-week discovery sprint. You get a written strategy, an architecture sketch, and a fixed-price offer to build — no drip campaigns, no surprises.",
    },
    {
      q: "Do you work fixed-price or time-and-materials?",
      a: "Both. Discovery is always fixed-price. Build is usually a blended milestone model — fixed for the first release, T&M for iteration, always with a written cap.",
    },
    {
      q: "Can you work alongside our in-house team?",
      a: "Yes — about half our work is embedded. We pair our senior engineers with yours, share repos, on-call rotations and retros, and leave your team stronger than we found it.",
    },
    {
      q: "What industries do you avoid?",
      a: "Anything involving predatory lending, surveillance adtech or weapons. We're a small studio — we only work on things we'd happily explain to our kids.",
    },
    {
      q: "How quickly can you start?",
      a: "Discovery can usually start within 2 weeks. Build typically begins 4–6 weeks out, depending on hiring and compliance setup on your side.",
    },
  ]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section ref={ref} className="w-full" style={{ background: color.lifted }}>
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 md:px-10 md:py-32">
        <div data-faq-head className="mb-14 max-w-[720px]">
          <Eyebrow>Frequently asked</Eyebrow>
          <SplitWords
            as="h2"
            className="mt-5"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 500,
              lineHeight: 0.98,
              letterSpacing: "-0.028em",
              color: color.ink,
              textWrap: "balance",
            }}
            scrollStart="top 90%"
          >
            <W>Answers</W> <W>before</W> <W>the</W> <W>call.</W>
          </SplitWords>
        </div>

        <div
          style={{
            borderTop: `1px solid ${color.ink}22`,
          }}
        >
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                data-faq-item
                style={{ borderBottom: `1px solid ${color.ink}22` }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
                  style={{ background: "transparent", cursor: "pointer" }}
                >
                  <span
                    style={{
                      fontFamily: "inherit",
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.4px",
                      color: color.ink,
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: `1.5px solid ${color.ink}`,
                      display: "grid",
                      placeItems: "center",
                      transition: "transform 300ms ease, background 300ms ease",
                      transform: isOpen ? "rotate(45deg)" : "none",
                      background: isOpen ? color.ink : "transparent",
                      color: isOpen ? color.canvas : color.ink,
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    overflow: "hidden",
                    transition: "max-height 400ms ease",
                  }}
                >
                  <p
                    className="pb-8 pr-12"
                    style={{
                      fontSize: 17,
                      fontWeight: 450,
                      lineHeight: 1.55,
                      color: color.charcoal,
                      maxWidth: 760,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ======================================================================
 *  FINAL CTA — Mistral warm gradient block
 * ==================================================================== */
export function LightCTA() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rings = root.querySelectorAll<HTMLElement>("[data-cta-ring]")
        rings.forEach((r, i) => {
          gsap.to(r, {
            rotation: i % 2 === 0 ? 360 : -360,
            repeat: -1,
            duration: 40 + i * 15,
            ease: "none",
            transformOrigin: "50% 50%",
          })
        })
        // body content fade-up
        const body = root.querySelector<HTMLElement>("[data-cta-body]")
        if (body) {
          gsap.from(body.children, {
            y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%", once: true },
          })
        }
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section id="contact" ref={ref} className="relative w-full overflow-hidden" style={{ background: color.canvas }}>
      {/* ambient blur orb behind the CTA block */}
      <SoftBlurOrb
        size={600}
        color={color.sunshine}
        blur={120}
        opacity={0.35}
        style={{ right: -200, top: -100 }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        <div
          className="relative overflow-hidden p-10 md:p-20"
          style={{
            borderRadius: 40,
            background: color.mistral,
            boxShadow: shadow.halo,
          }}
        >
          {/* Animated warm grainient fill — the hero of this block */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Grainient
              color1={color.yellow}
              color2={color.flame}
              color3={color.mistral}
              timeSpeed={0.22}
              warpStrength={1.3}
              warpFrequency={4.5}
              warpSpeed={1.6}
              warpAmplitude={55}
              blendAngle={135}
              blendSoftness={0.12}
              rotationAmount={320}
              noiseScale={1.8}
              grainAmount={0.08}
              grainScale={2.2}
              grainAnimated
              contrast={1.25}
              saturation={1.05}
              zoom={1.05}
            />
          </div>
          {/* High-contrast grain layer for texture */}
          <GrainOverlay opacity={0.22} blendMode="overlay" scale={0.9} animated />

          {/* decorative rings — rotate slowly */}
          <div
            data-cta-ring
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[460px] w-[460px] rounded-full"
            style={{ border: `1px dashed ${color.white}55` }}
          />
          <div
            data-cta-ring
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full"
            style={{ border: `1px solid ${color.white}33` }}
          />
          <div
            data-cta-ring
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full"
            style={{ border: `1px dashed ${color.white}44` }}
          />

          <div className="relative z-10 max-w-[820px]">
            <SplitWords
              as="h2"
              className="mt-6"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(44px, 7vw, 92px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
              scrollStart="top 85%"
              stagger={0.06}
              duration={0.9}
            >
              <W>Tell</W> <W>us</W> <W>the</W> <W>hard</W> <W>part.</W>
              <br />
              <W>We&apos;ll</W> <W>tell</W> <W>you</W> <W>what&apos;s</W> <W>next.</W>
            </SplitWords>
            <div data-cta-body>
              <Eyebrow tone="ink" className="mt-6">· Let&apos;s build</Eyebrow>
              <p
                className="mt-4 max-w-[600px]"
                style={{ fontSize: 18, fontWeight: 450, lineHeight: 1.5, color: color.ink }}
              >
                Most good engagements start with a single, awkward sentence. Drop it
                in an email; we reply the same day with a real human and a real plan.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <InkPill href="mailto:hello@softree.dev" size="lg">
                  hello@softree.dev <ArrowRight />
                </InkPill>
                <InkPill href="#book" size="lg" variant="outline">
                  Book a 30-min call
                </InkPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
