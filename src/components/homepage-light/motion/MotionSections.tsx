"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color, shadow } from "../tokens"
import {
  ArrowRight,
  Eyebrow,
  GoldenCard,
  GrainOverlay,
  InkPill,
  SoftBlurOrb,
} from "../primitives"
import Grainient from "../Grainient"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ====================================================================
 *  MotionMindset — Modern vs Traditional comparison
 * ================================================================== */
export function MotionMindset() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll("[data-mindset-card]"), {
          y: 60,
          opacity: 0,
          stagger: 0.18,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        })
        // animate the modern card's micro-interaction loop
        const ping = root.querySelector<HTMLElement>("[data-mindset-ping]")
        if (ping) {
          gsap.to(ping, {
            scale: 1.4,
            opacity: 0,
            duration: 1.6,
            repeat: -1,
            ease: "power2.out",
            transformOrigin: "center",
          })
        }
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      id="mindset"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      <SoftBlurOrb size={420} color={color.cream} blur={100} opacity={0.5} style={{ left: -120, top: 80 }} />
      <GrainOverlay opacity={0.08} blendMode="overlay" scale={1.3} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow className="justify-center" tone="signal">· Step 01 — Mindset</Eyebrow>
          <h2
            className="mt-6"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(36px, 5.6vw, 72px)",
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: "-0.028em",
              color: color.ink,
              textWrap: "balance",
            }}
          >
            Modern UI isn&apos;t about
            <br />
            <span style={{ color: color.mistral }}>animating everything.</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-[640px]"
            style={{ fontSize: 17, fontWeight: 450, lineHeight: 1.5, color: color.slate }}
          >
            It&apos;s about using motion with purpose. Clarity over choreography.
            Storytelling over special effects. The job is to guide attention,
            explain change, and give feedback — not to remind users that
            JavaScript exists.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2">
          {/* Traditional */}
          <div
            data-mindset-card
            className="relative overflow-hidden p-8 md:p-10"
            style={{
              borderRadius: 32,
              background: color.lifted,
              border: `1px solid ${color.ink}10`,
              minHeight: 420,
            }}
          >
            <div
              className="mb-7 flex items-center gap-2"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: color.slate,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 999, background: color.dustTaupe }} />
              Traditional
            </div>

            <h3
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: color.ink,
                margin: 0,
              }}
            >
              Static layouts.
              <br />
              Hard to tell apart.
            </h3>

            {/* Faux static layout */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 70,
                    borderRadius: 8,
                    background: color.dustTaupe,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2" style={{ color: color.slate, fontSize: 13, fontWeight: 500 }}>
              <span style={{ width: 16, height: 1, background: color.dustTaupe }} />
              <span>No timing. No hierarchy. No story.</span>
            </div>
          </div>

          {/* Modern */}
          <div
            data-mindset-card
            className="relative overflow-hidden p-8 md:p-10"
            style={{
              borderRadius: 32,
              background: `linear-gradient(160deg, ${color.gold} 0%, ${color.sunshine} 50%, ${color.flame} 100%)`,
              boxShadow: shadow.halo,
              minHeight: 420,
            }}
          >
            <GrainOverlay opacity={0.16} blendMode="overlay" scale={1.1} />

            <div
              className="relative mb-7 flex items-center gap-2"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: color.ink,
              }}
            >
              <span
                style={{
                  position: "relative",
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: color.ink,
                  display: "inline-block",
                }}
              >
                <span
                  data-mindset-ping
                  style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: 999,
                    background: color.ink,
                    opacity: 0.5,
                  }}
                />
              </span>
              Modern · Animated
            </div>

            <h3
              className="relative"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: color.ink,
                margin: 0,
              }}
            >
              Layered hierarchy.
              <br />
              Movement that means something.
            </h3>

            {/* Faux modern layered layout */}
            <div className="relative mt-8 h-[150px]">
              <div
                className="absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: "60%",
                  height: 86,
                  borderRadius: 16,
                  background: color.ink,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                  transform: "rotate(-2deg)",
                }}
              />
              <div
                className="absolute"
                style={{
                  right: 0,
                  top: 30,
                  width: "55%",
                  height: 86,
                  borderRadius: 16,
                  background: color.canvas,
                  border: `1.5px solid ${color.ink}20`,
                  transform: "rotate(3deg)",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
                }}
              />
              <div
                className="absolute flex items-center gap-2"
                style={{
                  left: "20%",
                  bottom: 0,
                  padding: "8px 16px",
                  background: color.canvas,
                  borderRadius: 999,
                  boxShadow: shadow.pill,
                  fontSize: 13,
                  fontWeight: 500,
                  color: color.ink,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: color.signalLight }} />
                Story · timing · hierarchy
              </div>
            </div>

            <div className="relative mt-6 flex items-center gap-2" style={{ color: color.ink, fontSize: 13, fontWeight: 500 }}>
              <span style={{ width: 16, height: 1, background: color.ink, opacity: 0.4 }} />
              <span>Higher perceived value · premium pricing.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====================================================================
 *  MotionSteps — The 10-step roadmap (expandable accordion list)
 * ================================================================== */
const STEPS = [
  {
    n: "01",
    title: "Adopt a modern animation mindset",
    blurb: "Motion with purpose, not as decoration.",
    body: "Modern UI design isn't about animating everything on screen — it's about using motion with intent. Storytelling and clarity come first; effects are secondary. AI can copy templates, but it can't easily invent the brand-specific timing and feel that make interfaces memorable.",
    tasks: [
      "Switch your inspiration sources",
      "Install the Muzli Chrome extension",
      "Save 3 sites you'd want to ship",
    ],
    color: color.sunshine,
  },
  {
    n: "02",
    title: "Level up your visual style",
    blurb: "Motion performs on a stage — make the stage modern.",
    body: "Before motion, make static design feel modern: grid play, layering and overlap, depth via shadow and blur, bold typography, deliberate contrast. This is the canvas your motion has to perform on.",
    tasks: [
      "Collect 5 hero references from Awwwards",
      "Recreate them in Figma",
      "Note what makes each feel modern",
    ],
    color: color.gold,
  },
  {
    n: "03",
    title: "Master timing and easing",
    blurb: "How it moves = how it feels.",
    body: "Pick your default durations and easings so everything feels consistent and natural. Ease-out for entrances. Ease-in for exits. Ease-in-out for page transitions. Default to one curve, then adjust per case.",
    tasks: [
      "Watch the 12 principles of motion",
      "Try every easing curve for 20 minutes",
      "Pick your default — and stick to it",
    ],
    color: color.flame,
  },
  {
    n: "04",
    title: "Animating practice",
    blurb: "Reps train your eyes to see what's right.",
    body: "Practice is where skills turn into instinct. Six short sprints this week beat one long weekend session — you'll iterate, record, review, and correct sooner. Replicate first to learn the mechanics; then tweak, remix, and apply the same idea in new contexts.",
    tasks: [
      "Pick one short tutorial",
      "Recreate it exactly",
      "Then remix it with your layout",
    ],
    color: color.mistral,
  },
  {
    n: "05",
    title: "Animate your own designs",
    blurb: "Hero first. Before → curve → after.",
    body: "Take your hero. Decide what moves and why (read order, emphasis), then connect Before → After with Smart Animate. Headline rises 16–24px from below. Subhead delays 100ms. CTA shifts outline → filled. Image scales 0.96 → 1 with blur 8px → 0. Keep it purposeful and fast — polish, not fireworks.",
    tasks: [
      "Pick 3–5 elements to animate",
      "Make the Before state",
      "Connect with Smart Animate",
    ],
    color: color.signalLight,
  },
  {
    n: "06",
    title: "Animate other sections",
    blurb: "One reveal logic the whole page understands.",
    body: "Move past the hero and give the next sections a calm, consistent rhythm. Each section: lead element, supporting info, call to action. Use the same reveal pattern everywhere so the page feels intentional, not noisy. Limit concurrency — only a few elements animate at once.",
    tasks: [
      "Pick a reveal pattern (Lead → Support → Action)",
      "Set one default duration & easing",
      "Limit concurrent motion",
    ],
    color: color.sunshine,
  },
  {
    n: "07",
    title: "Export and showcase",
    blurb: "Package it for eyes — portfolios and clients.",
    body: "Two paths. After Effects: render the video or export Lottie. Figma: screen-record the prototype with OBS or Outplayed at 60fps, trim and crop in CapCut, export at 1080p+. Make it loopable. Keep clips 10–20s.",
    tasks: [
      "Record at 60fps minimum",
      "Trim and crop tightly in CapCut",
      "Make the start and end loopable",
    ],
    color: color.flame,
  },
  {
    n: "08",
    title: "Hand it off to developers",
    blurb: "Your prototype is the proof of how it should feel.",
    body: "Two handoff modes. Show & tell: share the Figma file plus the prototype so the dev can copy the motion as-is. Reference & explain: share static states plus 2–3 reference clips and agree on timings in a 10-minute call. Reduce ambiguity — show motion, then add plain notes.",
    tasks: [
      "Share view-only Figma + prototype links",
      "Send 30–60s clips for each interaction",
      "Note trigger / duration / easing / what changes",
    ],
    color: color.gold,
  },
  {
    n: "09",
    title: "Build a portfolio",
    blurb: "Pick one platform. Post consistently.",
    body: "Curate the top 6 pieces on your portfolio site or Notion. But on Dribbble, Behance, IG, LinkedIn, X — post everything. Your social feed isn't a museum; it's how clients discover you. Different clients need different things — the design you think isn't your best might be exactly what lands a project.",
    tasks: [
      "Pick one home base",
      "Post 3–6 designs you've made",
      "Pin your top 3 pieces",
    ],
    color: color.mistral,
  },
  {
    n: "10",
    title: "The daily motion loop",
    blurb: "Design → animate → record → post → repeat.",
    body: "Reading helps. Reps teach. Open one tutorial a day, recreate it, then remix it with your own colors and layout. Save 3 references per session from Awwwards, dark.design, Godly. Note what moves, how it enters, what stays still. Recreate → review → refine → remix is how you grow fast.",
    tasks: [
      "1 tutorial per day",
      "3 references per session",
      "Post tomorrow what you made today",
    ],
    color: color.signalLight,
  },
]

function StepRow({
  step,
  index,
  open,
  onToggle,
}: {
  step: (typeof STEPS)[number]
  index: number
  open: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative w-full"
      style={{
        borderTop: index === 0 ? `1px solid ${color.ink}14` : "none",
        borderBottom: `1px solid ${color.ink}14`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center gap-6 py-7 text-left md:gap-8 md:py-9"
        style={{ background: "transparent", border: 0, cursor: "pointer" }}
        aria-expanded={open}
      >
        {/* Index */}
        <span
          aria-hidden
          style={{
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.4px",
            color: color.slate,
            minWidth: 36,
            display: "inline-block",
          }}
        >
          {step.n}
        </span>

        {/* Tone dot */}
        <span
          aria-hidden
          className="hidden md:inline-block"
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: step.color,
            boxShadow: `0 0 0 4px ${step.color}22`,
            flexShrink: 0,
          }}
        />

        {/* Title + blurb */}
        <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-baseline md:gap-8">
          <h3
            className="m-0"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              color: color.ink,
              flex: "1 1 auto",
            }}
          >
            {step.title}
          </h3>
          <p
            className="m-0 max-w-[480px]"
            style={{
              fontSize: 15,
              fontWeight: 450,
              lineHeight: 1.4,
              color: color.slate,
              flex: "0 1 auto",
            }}
          >
            {step.blurb}
          </p>
        </div>

        {/* Toggle icon */}
        <span
          aria-hidden
          className="grid place-items-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            border: `1px solid ${color.ink}20`,
            color: color.ink,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 320ms cubic-bezier(.65,0,.35,1), background 220ms ease",
            background: open ? color.ink : "transparent",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke={open ? color.canvas : color.ink}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Body */}
      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{
          maxHeight: open ? 800 : 0,
          opacity: open ? 1 : 0,
          transition:
            "max-height 520ms cubic-bezier(.65,0,.35,1), opacity 360ms ease",
        }}
      >
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-[1fr_auto] md:gap-16 md:pb-12">
          <p
            className="ml-0 max-w-[680px] md:ml-[60px]"
            style={{
              fontFamily: "inherit",
              fontSize: 17,
              fontWeight: 450,
              lineHeight: 1.55,
              color: color.ink,
              margin: 0,
            }}
          >
            {step.body}
          </p>

          <div className="md:ml-auto md:min-w-[280px]">
            <div
              className="mb-3"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: color.slate }}
            >
              Your tasks
            </div>
            <ul className="m-0 flex flex-col gap-2.5 p-0" style={{ listStyle: "none" }}>
              {step.tasks.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3"
                  style={{ fontSize: 15, fontWeight: 450, color: color.ink, lineHeight: 1.4 }}
                >
                  <span
                    aria-hidden
                    className="mt-1 grid shrink-0 place-items-center"
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: color.canvas,
                      border: `1.5px solid ${step.color}`,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: step.color }} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MotionSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll("[data-step-row]"), {
          y: 24,
          opacity: 0,
          stagger: 0.05,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      id="steps"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.lifted }}
    >
      <SoftBlurOrb size={500} color={color.gold} blur={120} opacity={0.3} style={{ right: -180, top: 60 }} />
      <GrainOverlay opacity={0.08} blendMode="overlay" scale={1.3} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>· The 10-step roadmap</Eyebrow>
            <h2
              className="mt-6 max-w-[760px]"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(36px, 5.6vw, 76px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
            >
              From static designer to motion-fluent.
              <br />
              <span style={{ color: color.mistral }}>Ten steps. Action-first.</span>
            </h2>
          </div>
          <p
            className="max-w-[360px]"
            style={{ fontSize: 15, fontWeight: 450, lineHeight: 1.5, color: color.slate }}
          >
            Each step is short. Each step has tasks. Do them. By step 10 you&apos;ll
            have a portfolio piece, a process, and the ability to charge premium
            pricing for it.
          </p>
        </div>

        <div className="w-full">
          {STEPS.map((s, i) => (
            <div data-step-row key={s.n}>
              <StepRow
                step={s}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ====================================================================
 *  MotionTutorials — five short tutorial cards
 * ================================================================== */
const TUTORIALS = [
  {
    n: "01",
    label: "Button hover",
    body: "Pop. Press. Release. Three states a button has to communicate.",
    duration: "150–200ms",
    tone: "amber" as const,
  },
  {
    n: "02",
    label: "Hero entrance",
    body: "Headline up. Subhead delays. CTA fills. Image sharpens.",
    duration: "300ms · ease-out · 100ms stagger",
    tone: "gold" as const,
  },
  {
    n: "03",
    label: "Card hover",
    body: "Lift, light, and reveal hidden affordances on intent.",
    duration: "220ms",
    tone: "amber" as const,
  },
  {
    n: "04",
    label: "Cursor follow",
    body: "Soft trailing dot for sites that aren't trying too hard.",
    duration: "quickTo · 0.5s ease",
    tone: "ink" as const,
  },
  {
    n: "05",
    label: "Scroll reveals",
    body: "One pattern reused everywhere — Lead → Support → Action.",
    duration: "ScrollTrigger · once: true",
    tone: "gold" as const,
  },
]

export function MotionTutorials() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll("[data-tutorial-card]"), {
          y: 60,
          opacity: 0,
          rotation: -1.2,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      id="tutorials"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      <SoftBlurOrb size={420} color={color.cream} blur={100} opacity={0.55} style={{ left: -120, top: 80 }} />
      <SoftBlurOrb size={520} color={color.sunshine} blur={120} opacity={0.3} style={{ right: -180, bottom: -160 }} />
      <GrainOverlay opacity={0.1} blendMode="overlay" scale={1.25} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 max-w-[820px]">
          <Eyebrow>· Five short loops</Eyebrow>
          <h2
            className="mt-6"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(36px, 5.6vw, 72px)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.028em",
              color: color.ink,
              textWrap: "balance",
            }}
          >
            The same five interactions
            <br />
            <span style={{ color: color.mistral }}>every modern UI quietly uses.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TUTORIALS.map((t, i) => (
            <div
              key={t.n}
              data-tutorial-card
              className={`relative flex flex-col overflow-hidden p-7 md:p-8 ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              style={{
                borderRadius: 28,
                background:
                  t.tone === "ink"
                    ? color.ink
                    : t.tone === "amber"
                      ? color.lifted
                      : `linear-gradient(160deg, ${color.gold} 0%, ${color.sunshine} 80%)`,
                color: t.tone === "ink" ? color.canvas : color.ink,
                border: t.tone === "amber" ? `1px solid ${color.ink}10` : "none",
                boxShadow: t.tone === "amber" ? "none" : shadow.halo,
                minHeight: i === 0 ? 460 : 280,
              }}
            >
              <GrainOverlay
                opacity={t.tone === "ink" ? 0.16 : t.tone === "amber" ? 0.08 : 0.14}
                blendMode={t.tone === "ink" ? "screen" : "overlay"}
                scale={1.2}
              />
              <div
                className="relative mb-6 flex items-center justify-between"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: t.tone === "ink" ? "rgba(243,240,238,0.6)" : color.slate,
                }}
              >
                <span>Tutorial {t.n}</span>
                <span>{t.duration}</span>
              </div>

              <h3
                className="relative m-0"
                style={{
                  fontFamily: "inherit",
                  fontSize: i === 0 ? "clamp(36px, 4.5vw, 64px)" : "clamp(22px, 2.2vw, 32px)",
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: t.tone === "ink" ? color.canvas : color.ink,
                }}
              >
                {t.label}
              </h3>

              <p
                className="relative mt-4 max-w-[420px]"
                style={{
                  fontFamily: "inherit",
                  fontSize: i === 0 ? 18 : 15,
                  fontWeight: 450,
                  lineHeight: 1.45,
                  color: t.tone === "ink" ? "rgba(243,240,238,0.78)" : color.slate,
                  margin: 0,
                }}
              >
                {t.body}
              </p>

              <div
                className="relative mt-auto flex items-center gap-3 pt-8"
                style={{ fontSize: 13, fontWeight: 500, color: t.tone === "ink" ? color.canvas : color.ink }}
              >
                <span
                  className="grid place-items-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: t.tone === "ink" ? color.canvas : color.ink,
                    color: t.tone === "ink" ? color.ink : color.canvas,
                  }}
                >
                  <ArrowRight size={14} />
                </span>
                <span>Watch the loop</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ====================================================================
 *  MotionInspiration — animated marquee of inspiration sources
 * ================================================================== */
const SOURCES = [
  "Awwwards",
  "Saaspo",
  "One Page Love",
  "Godly",
  "MaxiBestOf",
  "Land Book",
  "CSS Design Awards",
  "Mobbin",
  "Viewport UI",
  "60fps.design",
  "Dark.design",
  "Cofolios",
]

export function MotionInspiration() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: color.ink }}>
      <GrainOverlay opacity={0.18} blendMode="screen" scale={1.3} animated />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[680px] text-center">
          <div
            className="inline-flex items-center gap-2"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.56px",
              textTransform: "uppercase",
              color: color.sunshine,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: color.sunshine }} />
            Switch your inputs
          </div>
          <h2
            className="mt-6"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(32px, 4.6vw, 56px)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: color.canvas,
              textWrap: "balance",
            }}
          >
            The work you make tracks
            <br />
            <span style={{ color: color.gold }}>the work you study.</span>
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden border-y" style={{ borderColor: "rgba(255,250,235,0.1)" }}>
        <div
          className="flex"
          style={{
            animation: "softreeMarquee 38s linear infinite",
            width: "fit-content",
          }}
        >
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-6 px-10 py-6"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: color.canvas,
                whiteSpace: "nowrap",
              }}
            >
              {s}
              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: color.sunshine,
                  display: "inline-block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-12 md:px-10">
        <p
          className="mx-auto max-w-[680px] text-center"
          style={{ fontSize: 15, fontWeight: 450, lineHeight: 1.5, color: "rgba(243,240,238,0.65)" }}
        >
          The fastest way to make a portfolio look generic is to scroll generic
          sources. Switch yours. Awwwards, Godly and dark.design every morning;
          Mobbin and 60fps.design when you ship product.
        </p>
      </div>
    </section>
  )
}

/* ====================================================================
 *  MotionTools — Rive / Lottie / Spline / Unicorn quad
 * ================================================================== */
const TOOLS = [
  {
    name: "Rive",
    tag: "Interactive vectors",
    body: "State-machine icons and illustrations. Tiny files, production-friendly. Perfect for hover, toggle, and success states.",
    accent: color.signalLight,
  },
  {
    name: "Lottie",
    tag: "After Effects → JSON",
    body: "Precise easing and timing for logos, loaders, and illustrations. The dev embeds a JSON file and ships.",
    accent: color.gold,
  },
  {
    name: "Spline",
    tag: "Lightweight 3D",
    body: "Hero ornaments and depth. Orbit, auto-rotate, parallax. Export video or embed the live scene.",
    accent: color.sunshine,
  },
  {
    name: "Unicorn Studio",
    tag: "WebGL flourishes",
    body: "Scroll-driven, GPU-rendered effects for sections that should feel like cinema, not slideshows.",
    accent: color.flame,
  },
]

export function MotionTools() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll("[data-tool-card]"), {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      id="tools"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      <GrainOverlay opacity={0.08} blendMode="overlay" scale={1.3} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow>· Bonus — production tools</Eyebrow>
            <h2
              className="mt-6 max-w-[680px]"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(36px, 5.6vw, 72px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
            >
              Pick one tool.
              <br />
              <span style={{ color: color.mistral }}>Get fluent. Ship faster.</span>
            </h2>
          </div>
          <p
            style={{ fontSize: 15, fontWeight: 450, lineHeight: 1.55, color: color.slate, maxWidth: 420 }}
          >
            Don&apos;t spread thin. Master one of these and you&apos;re already in the top
            percentile. We use all four at Softree, but every project starts
            with the right one for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TOOLS.map((t, i) => (
            <GoldenCard
              key={t.name}
              tone={i % 2 === 0 ? "ivory" : "cream"}
              data-tool-card
              className="relative overflow-hidden p-8 md:p-10"
              style={{ minHeight: 280 }}
            >
              <GrainOverlay opacity={0.08} blendMode="multiply" scale={1.3} />

              <div className="relative mb-6 flex items-center justify-between">
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: t.accent,
                    boxShadow: `0 0 0 5px ${t.accent}22`,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: color.slate,
                  }}
                >
                  {t.tag}
                </span>
              </div>

              <h3
                className="relative m-0"
                style={{
                  fontFamily: "inherit",
                  fontSize: "clamp(32px, 3.8vw, 48px)",
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.028em",
                  color: color.ink,
                }}
              >
                {t.name}
              </h3>

              <p
                className="relative mt-4 max-w-[420px]"
                style={{
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: 450,
                  lineHeight: 1.5,
                  color: color.slate,
                  margin: 0,
                }}
              >
                {t.body}
              </p>
            </GoldenCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ====================================================================
 *  MotionCTA — final block with Grainient
 * ================================================================== */
export function MotionCTA() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelector("[data-cta-headline]"), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: color.canvas }}
    >
      <SoftBlurOrb size={600} color={color.sunshine} blur={120} opacity={0.35} style={{ right: -200, top: -100 }} />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        <div
          className="relative overflow-hidden p-10 md:p-20"
          style={{
            borderRadius: 40,
            background: color.mistral,
            boxShadow: shadow.halo,
          }}
        >
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
          <GrainOverlay opacity={0.22} blendMode="overlay" scale={0.9} animated />

          <div data-cta-headline className="relative z-10 max-w-[820px]">
            <Eyebrow tone="ink">· Build with Softree</Eyebrow>
            <h2
              className="mt-6"
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(44px, 7vw, 92px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
                margin: 0,
              }}
            >
              You don&apos;t need to do
              <br /> this alone.
            </h2>
            <p
              className="mt-6 max-w-[620px]"
              style={{
                fontFamily: "inherit",
                fontSize: 18,
                fontWeight: 450,
                lineHeight: 1.45,
                color: color.ink,
                margin: 0,
              }}
            >
              The roadmap teaches you the craft. Softree turns it into shipped
              product. Tell us what you&apos;re building — we&apos;ll bring the team that
              ships it with motion that earns its keep.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <InkPill href="mailto:hello@softree.tech">
                Start a project <ArrowRight size={16} />
              </InkPill>
              <InkPill href="#steps" variant="cream">
                Read the roadmap
              </InkPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
