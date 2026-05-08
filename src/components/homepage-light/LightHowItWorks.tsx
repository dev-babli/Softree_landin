"use client"

import { motion } from "framer-motion"
import { Infinity as InfinityIcon, BarChart3, Settings2 } from "lucide-react"

/* ====================================================================
 *  LIGHT — HOW IT WORKS
 *  "Get Started in 3 Simple Steps" — Corex reference match
 *
 *  Layout:
 *   ┌──────────────── "How It Works" pill ────────────────┐
 *   │         Get Started in 3 Simple Steps (gradient)    │
 *   │           Connect, automate, and scale ...          │
 *   │                                                     │
 *   │    [STEP 01]        ╭──top sphere──╮     [STEP 02]  │
 *   │                     ╰──────────────╯                │
 *   │                 ╭────glowing ring ◎ ────╮           │
 *   │  ╭─bottom-left─╮                  ╭─bottom-right─╮  │
 *   │  ╰─────────────╯                  ╰──────────────╯  │
 *   │                     [STEP 03]                       │
 *   └─────────────────────────────────────────────────────┘
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Sphere with icon ──────────────────────────────────────────────── */

function IconSphere({
  icon,
  className = "",
  delay = 0,
}: {
  icon: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={`relative ${className}`}
    >
      <div
        className="relative h-[220px] w-[220px] rounded-full sm:h-[240px] sm:w-[240px]"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.05) 0%, rgba(20,28,48,0.9) 45%, rgba(8,12,22,1) 80%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -30px 60px rgba(0,0,0,0.6), 0 40px 80px -30px rgba(0,0,0,0.8)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Edge rim highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 80%, rgba(43,127,255,0.05) 0%, transparent 55%)",
          }}
        />
        {/* Icon centered */}
        <div className="absolute inset-0 flex items-center justify-center text-white/90">
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Glowing central ring with 4 dots + brand mark ─────────────────── */

function GlowingRing() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      className="relative h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]"
    >
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute inset-[-12%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(43,127,255,0.55) 0%, rgba(43,127,255,0.2) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      {/* Ring */}
      <motion.div
        className="absolute inset-[15%] rounded-full"
        style={{
          border: "14px solid #2B7FFF",
          boxShadow:
            "0 0 30px rgba(43,127,255,0.6), inset 0 0 15px rgba(43,127,255,0.4)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* 4 cardinal dots */}
        {[
          { top: "-8px", left: "50%", translate: "-50% 0" },
          { top: "50%", right: "-8px", translate: "0 -50%" },
          { bottom: "-8px", left: "50%", translate: "-50% 0" },
          { top: "50%", left: "-8px", translate: "0 -50%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute h-4 w-4 rounded-full bg-[#2B7FFF]"
            style={{
              ...pos,
              transform: `translate(${pos.translate})`,
              boxShadow: "0 0 10px rgba(43,127,255,0.9)",
            }}
          />
        ))}
      </motion.div>
      {/* Center brand sphere */}
      <div className="absolute inset-[38%] flex items-center justify-center rounded-full bg-[linear-gradient(145deg,#3a8fff_0%,#1a4fb8_70%)] shadow-[0_8px_20px_rgba(43,127,255,0.5),inset_0_1px_0_rgba(255,255,255,0.35)]">
        <span className="text-[22px] font-bold tracking-tight text-white">
          C
        </span>
      </div>
    </motion.div>
  )
}

/* ── Step card ─────────────────────────────────────────────────────── */

function StepCard({
  number,
  text,
  delay = 0,
  className = "",
}: {
  number: string
  text: string
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={`w-[240px] rounded-xl border border-white/8 bg-white/[0.02] p-5 backdrop-blur-sm sm:w-[260px] ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px -20px rgba(0,0,0,0.6)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-[#2B7FFF] shadow-[0_0_8px_rgba(43,127,255,0.8)]" />
        <span className="text-[12.5px] font-semibold uppercase tracking-[0.15em] text-white">
          {number}
        </span>
      </div>
      <p className="mt-2.5 text-[13.5px] leading-[1.5] text-white/55">{text}</p>
    </motion.div>
  )
}

/* ── Gradient word "Steps" ─────────────────────────────────────────── */

function GradientSteps() {
  // Per reference: S(white) t(#E2E3CF) e(#8CD98E) p(#59DEB6) s(#2FCCE4)
  const letters = [
    { ch: "S", color: "#FFFFFF" },
    { ch: "t", color: "#E2E3CF" },
    { ch: "e", color: "#8CD98E" },
    { ch: "p", color: "#59DEB6" },
    { ch: "s", color: "#2FCCE4" },
  ]
  return (
    <span>
      {letters.map((l, i) => (
        <span key={i} style={{ color: l.color }}>
          {l.ch}
        </span>
      ))}
    </span>
  )
}

/* ── Main ──────────────────────────────────────────────────────────── */

export default function LightHowItWorks() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#050812] py-24 sm:py-32 md:py-36">
      {/* Ambient background vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, rgba(43,127,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span
            className="mb-5 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-tight text-white"
            style={{
              background: "rgba(43,127,255,0.15)",
              border: "1px solid rgba(43,127,255,0.35)",
            }}
          >
            How It Works
          </span>
          <h2 className="max-w-[720px] text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Get Started in 3 Simple <GradientSteps />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-[1.6] text-white/55">
            Connect, automate, and scale your workflow with our powerful
            AI-driven platform.
          </p>
        </motion.div>

        {/* Stage */}
        <div className="relative mx-auto h-[680px] w-full max-w-[920px] sm:h-[720px]">
          {/* Top sphere — infinity */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <IconSphere
              icon={<InfinityIcon className="h-14 w-14" strokeWidth={1.4} />}
              delay={0.1}
            />
          </div>

          {/* Bottom-left sphere — bar chart */}
          <div className="absolute bottom-[120px] left-[8%]">
            <IconSphere
              icon={<BarChart3 className="h-14 w-14" strokeWidth={1.4} />}
              delay={0.2}
            />
          </div>

          {/* Bottom-right sphere — gear */}
          <div className="absolute bottom-[120px] right-[8%]">
            <IconSphere
              icon={<Settings2 className="h-14 w-14" strokeWidth={1.4} />}
              delay={0.3}
            />
          </div>

          {/* Center glowing ring */}
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
            <GlowingRing />
          </div>

          {/* STEP 01 — left middle */}
          <div className="absolute left-0 top-[40%]">
            <StepCard
              number="STEP 01"
              text="Integrate your tools and bring everything into dashboard."
              delay={0.4}
            />
          </div>

          {/* STEP 02 — right middle */}
          <div className="absolute right-0 top-[40%]">
            <StepCard
              number="STEP 02"
              text="Let AI handle repetitive workflows and processes."
              delay={0.5}
            />
          </div>

          {/* STEP 03 — bottom center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <StepCard
              number="STEP 03"
              text="Track performance with powerful analytics."
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
