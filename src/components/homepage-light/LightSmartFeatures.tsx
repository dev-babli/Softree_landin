"use client"

import { motion, type Variants } from "framer-motion"
import {
  Calendar,
  CheckCircle2,
  Search,
  User,
  X,
} from "lucide-react"

/* ====================================================================
 *  LIGHT SMART FEATURES — bento grid
 *
 *  Header:
 *    • "Features" pill
 *    • Title "Smart Features Built to Simplify Your Workflow"
 *      (Workflow rendered letter-by-letter with rainbow gradient stops)
 *
 *  Bento (3-col grid on lg+):
 *    ┌──────────────┬─────────────┬─────────────┐
 *    │              │ Advanced    │ Customizable│
 *    │ AI-Powered   │ Security    │ Workflows   │
 *    │ Automation   ├─────────────┴─────────────┤
 *    │ (tall)       │ Smart Analytics & Insights │
 *    └──────────────┴───────────────────────────┘
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Title with rainbow "Workflow" letters ── */

const WORKFLOW_LETTERS: { ch: string; color: string }[] = [
  { ch: "W", color: "#ffffff" },
  { ch: "o", color: "rgb(228, 228, 211)" },
  { ch: "r", color: "rgb(146, 217, 145)" },
  { ch: "k", color: "rgb(90, 221, 177)" },
  { ch: "f", color: "rgb(47, 207, 228)" },
  { ch: "l", color: "rgb(20, 152, 235)" },
  { ch: "o", color: "rgb(15, 112, 230)" },
  { ch: "w", color: "rgb(12, 91, 228)" },
]

const titleContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
}

const titleLetter: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EASE } },
}

function AnimatedTitle() {
  const before = "Smart Features Built to Simplify Your "
  return (
    <motion.h2
      variants={titleContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className="text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white"
      aria-label="Smart Features Built to Simplify Your Workflow"
    >
      {before.split(" ").map((word, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((c, li) => (
            <span
              key={li}
              aria-hidden
              className="relative inline-block overflow-hidden align-bottom"
            >
              <motion.span
                variants={titleLetter}
                className="relative inline-block will-change-transform"
              >
                {c}
              </motion.span>
            </span>
          ))}
          {wi < arr.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
      <span className="inline-block whitespace-nowrap">
        {WORKFLOW_LETTERS.map(({ ch, color }, i) => (
          <span
            key={i}
            aria-hidden
            className="relative inline-block overflow-hidden align-bottom"
          >
            <motion.span
              variants={titleLetter}
              className="relative inline-block will-change-transform"
              style={{ color }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.h2>
  )
}

/* ── Card chrome ── */

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={cardVariant}
      className={`relative overflow-hidden rounded-[28px] border border-white/8 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(20,22,42,0.95) 0%, rgba(10,10,26,0.98) 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 60px -28px rgba(0,0,0,0.6)",
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── Card 1: AI-Powered Automation ── */

function StatPill({ value, delta }: { value: string; delta: string }) {
  return (
    <div
      className="rounded-2xl border border-white/8 bg-white/[0.03] p-3"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <div className="mb-1 h-1.5 w-1.5 rounded-full bg-[#1852FF]" />
      <div className="text-[15px] font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] text-white/45">{delta}</div>
    </div>
  )
}

function ProgressBar({ widthPct, glow = false }: { widthPct: number; glow?: boolean }) {
  return (
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/[0.04]">
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${widthPct}%`,
          background:
            "linear-gradient(90deg, #1852FF 0%, #5C9DFF 100%)",
          boxShadow: glow ? "0 0 16px rgba(24,82,255,0.5)" : undefined,
        }}
      />
      <div
        className="absolute right-1 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white"
        style={{
          right: `${100 - widthPct}%`,
          boxShadow: "0 0 0 3px rgba(255,255,255,0.18)",
        }}
      />
    </div>
  )
}

function Card1() {
  return (
    <Card className="row-span-2 flex flex-col">
      <div className="relative flex-1 p-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2.5">
          <StatPill value="12,845" delta="+8.2% last month" />
          <StatPill value="12,845" delta="+8.2% last month" />
          <StatPill value="12,845" delta="+8.2% last month" />
        </div>

        {/* Profile circle with concentric rings */}
        <div className="relative mx-auto mt-6 flex h-[150px] items-center justify-center">
          {[120, 90, 64, 40].map((s, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute rounded-full border border-white/8"
              style={{ width: s, height: s }}
            />
          ))}
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0f1024]">
            <User className="h-5 w-5 text-white/80" />
          </div>
        </div>

        {/* Smart Features built to */}
        <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-3">
          <span className="text-[13px] font-medium text-white">Smart Features Built to</span>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#5cd6a5]">
            <span className="text-[10px]">▲</span>9.6%
          </span>
        </div>

        {/* Progress bars */}
        <div className="mt-5 space-y-3">
          <ProgressBar widthPct={88} />
          <ProgressBar widthPct={62} glow />
          <ProgressBar widthPct={38} />
        </div>

        {/* Tooltip */}
        <div
          className="mt-4 inline-flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          <div
            className="h-6 w-6 flex-shrink-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #5C9DFF 0%, #1852FF 60%, #0a0a1a 100%)",
            }}
          />
          <p className="text-[10.5px] leading-[1.4] text-white/65">
            Designed to improve clarity, speed, and productivity across your workflow.
          </p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <h3 className="text-[19px] font-semibold tracking-tight text-white">
          AI-Powered Automation
        </h3>
        <p className="mt-2 text-[13px] leading-[1.55] text-white/55">
          Automate repetitive tasks and workflows with intelligent tools designed to save time.
        </p>

        {/* Buy Template CTA */}
        <a
          href="#"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full text-[13px] font-semibold tracking-tight text-white"
          style={{
            background:
              "linear-gradient(180deg, #2864FF 0%, #1852FF 50%, #0e3ed8 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 24px -10px rgba(24,82,255,0.7)",
          }}
        >
          Buy Template
        </a>
      </div>
    </Card>
  )
}

/* ── Card 2: Advanced Security (timeline mockup) ── */

function Card2() {
  return (
    <Card className="flex flex-col">
      <div className="relative flex-1 p-5">
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          {/* Window dots */}
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>

          {/* Donut + title */}
          <div className="flex flex-col items-center">
            <div className="relative h-14 w-14">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#1852FF"
                  strokeWidth="3"
                  strokeDasharray="60 88"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
            </div>

            <div className="mt-3 text-center">
              <div className="text-[13px] font-semibold text-white">
                Timeline & Keyframe
              </div>
              <div className="mt-0.5 text-[10px] text-white/45">
                Sit back while we are gathering Timeline & Keyframe
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{
                  width: "65%",
                  background:
                    "linear-gradient(90deg, #1852FF 0%, #5C9DFF 100%)",
                }}
              />
            </div>

            {/* Bottom row */}
            <div className="mt-3 flex w-full items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-white/45">
                <span className="font-semibold text-white/85">98%</span>
                <span>•</span>
                <span>600/400 Frames</span>
              </div>
              <button className="inline-flex items-center gap-1 rounded-full bg-[#1852FF] px-3 py-1 text-[10px] font-semibold text-white">
                <X className="h-2.5 w-2.5" /> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2">
        <h3 className="text-[18px] font-semibold tracking-tight text-white">
          Advanced Security
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-[1.55] text-white/55">
          Protect your data with enterprise-grade security, encryption, and reliable infrastructure.
        </p>
      </div>
    </Card>
  )
}

/* ── Card 3: Customizable Workflows (browser mock) ── */

function Card3() {
  return (
    <Card className="flex flex-col">
      <div className="relative flex-1 p-5">
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
          {/* Window header */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            </div>
            <Search className="h-3 w-3 text-white/30" />
          </div>

          {/* Body — main panel + side stack */}
          <div className="flex gap-2">
            <div
              className="relative h-[120px] flex-1 overflow-hidden rounded-xl"
              style={{
                background:
                  "linear-gradient(160deg, #C8E0FF 0%, #5C9DFF 100%)",
              }}
            >
              <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#1852FF]" />
              <div className="absolute left-3 top-4 h-1.5 w-16 rounded-full bg-white/55" />
              <div className="absolute left-3 top-7 h-1.5 w-10 rounded-full bg-white/40" />
              <div className="absolute left-3 top-10 h-1.5 w-12 rounded-full bg-white/40" />

              {/* CTA on top of panel */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full bg-[#0a0a1a] px-3 py-1.5 text-[10px] font-semibold text-white whitespace-nowrap">
                Start With Clarion
              </div>
            </div>
            <div className="flex w-14 flex-col gap-2">
              <div
                className="h-[56px] rounded-lg"
                style={{
                  background:
                    "linear-gradient(160deg, #C8E0FF 0%, #5C9DFF 100%)",
                }}
              />
              <div
                className="h-[56px] rounded-lg"
                style={{
                  background:
                    "linear-gradient(160deg, #C8E0FF 0%, #5C9DFF 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2">
        <h3 className="text-[18px] font-semibold tracking-tight text-white">
          Customizable Workflows
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-[1.55] text-white/55">
          Adapt the platform to fit your team's needs with flexible automation and customizable processes.
        </p>
      </div>
    </Card>
  )
}

/* ── Card 4: Smart Analytics & Insights (wide, spans 2 cols) ── */

function Card4() {
  return (
    <Card className="lg:col-span-2 flex flex-col">
      <div className="relative flex-1 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Left side: tasks + donut */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <div className="grid grid-cols-[1fr,auto] items-center gap-3">
              <div className="flex flex-col gap-3">
                {/* Task Streak */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1852FF]/15">
                    <Calendar className="h-4 w-4 text-[#5C9DFF]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/45">
                      Task Streak
                    </div>
                    <div className="text-[14px] font-semibold text-white">
                      15 Days Max
                    </div>
                  </div>
                </div>
                {/* Task Completed */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1852FF]/15">
                    <CheckCircle2 className="h-4 w-4 text-[#5C9DFF]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/45">
                      Task Completed
                    </div>
                    <div className="text-[14px] font-semibold text-white">
                      1 Task Left
                    </div>
                  </div>
                </div>
              </div>

              {/* Donut chart */}
              <div className="relative h-[110px] w-[110px]">
                <svg viewBox="0 0 36 36" className="h-full w-full">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#1852FF"
                    strokeWidth="4"
                    strokeDasharray="18 70"
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[18px] font-semibold leading-none text-white">
                    20%
                  </div>
                  <div className="mt-0.5 text-[9px] text-white/50">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: completed task list */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <h4 className="text-[14px] font-semibold tracking-tight text-white">
              Completed Task
            </h4>
            <p className="mt-1 text-[11px] text-white/50">
              Built to remove complexity so your team can focus.
            </p>
            <div className="mt-3 space-y-2.5">
              {["Automate", "Heavy Lifting", "Intelligent Features"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-[5px] border border-white/12 bg-white/[0.04]">
                      <div className="h-1.5 w-1.5 rounded-[2px] bg-[#1852FF]" />
                    </div>
                    <span className="text-[12px] text-white/85">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <h3 className="text-[19px] font-semibold tracking-tight text-white">
          Smart Analytics & Insights
        </h3>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-white/55">
          Get real-time data and actionable insights to make smarter decisions and track performance easily.
        </p>
      </div>
    </Card>
  )
}

/* ── Section ── */

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}

export default function LightSmartFeatures() {
  return (
    <section
      className="relative isolate w-full overflow-hidden"
      style={{ background: "#05060e" }}
    >
      {/* Soft top wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(24,82,255,0.18) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 py-20 sm:py-24 md:py-28">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-[#5C9DFF]" />
            <span className="text-[12px] font-medium tracking-tight text-white/80">
              Features
            </span>
          </motion.div>

          <AnimatedTitle />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="mt-5 max-w-[520px] text-[14px] leading-[1.6] text-white/55 sm:text-[15px]"
          >
            Designed to improve clarity, speed, and productivity across your workflow.
          </motion.p>
        </div>

        {/* Bento grid */}
        <motion.div
          variants={stage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: "auto" }}
        >
          <Card1 />
          <Card2 />
          <Card3 />
          <Card4 />
        </motion.div>
      </div>
    </section>
  )
}
