"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Lock, Search, Check, Sparkles, Shield } from "lucide-react"

/* ====================================================================
 *  OVERVIEW BENTO — "Built for better development"
 *  4-card showcase mirroring the Webflow overview block:
 *    • Analytics  (animated bar chart)
 *    • Automation (tasks + generated content panel)
 *    • Security   (file with lock + role-based access)
 *    • Integrations (logo marquee)
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Card 1: Analytics bar chart ──────────────────────────────────── */

function AnalyticsChart() {
  const bars = [28, 44, 62, 36, 78, 52, 92, 68, 40, 56]
  return (
    <div className="relative flex h-full w-full items-end gap-1.5 px-6 pb-8 pt-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.05 * i, ease: EASE }}
          className="flex-1 rounded-t-md"
          style={{
            background:
              i === 6
                ? "linear-gradient(180deg, #6C42F5 0%, #5A60DE 100%)"
                : "linear-gradient(180deg, rgba(17,17,17,0.16) 0%, rgba(17,17,17,0.08) 100%)",
          }}
        />
      ))}
      {/* "1 Week Avg" callout over bar 6 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
        className="absolute left-[58%] top-3 flex items-center gap-2 rounded-full border border-[#111]/10 bg-white px-3 py-1.5 shadow-[0_8px_24px_-12px_rgba(17,17,17,0.25)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#6C42F5]" />
        <span className="text-[10.5px] font-medium text-[#111]/70">1 Week Avg</span>
      </motion.div>
    </div>
  )
}

/* ── Card 2: Automation ───────────────────────────────────────────── */

function AutomationPanel() {
  return (
    <div className="relative grid h-full w-full grid-cols-2 gap-3 p-5">
      {/* Left: tasks + generate button */}
      <div className="flex flex-col justify-between rounded-xl border border-[#111]/8 bg-white/70 p-4 backdrop-blur">
        <div>
          <div className="flex items-center gap-1 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5555]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFB547]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#2DCD7A]" />
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#111]/50">
            Tasks
          </div>
          <ul className="mt-2 flex flex-col gap-1.5">
            {["Automate", "Reduce", "Improve"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-[#6C42F5]" strokeWidth={3} />
                <span className="text-[11px] font-medium text-[#111]/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="mt-3 w-full rounded-lg bg-[#5A60DE] py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-10px_rgba(90,96,222,0.8)]">
          Generate
        </button>
      </div>

      {/* Right: generated content */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="relative overflow-hidden rounded-xl border border-[#111]/8 bg-white p-3"
      >
        <div className="mb-2 flex items-center gap-1.5 rounded-md bg-[#f3f3f5] px-2 py-1">
          <Search className="h-3 w-3 text-[#111]/40" strokeWidth={2} />
          <span className="text-[9.5px] text-[#111]/40">Search…</span>
        </div>
        {[
          { t: "Email Setup", s: "Automated", g: "linear-gradient(135deg,#6C42F5,#3DA098)" },
          { t: "Data Sync", s: "Syncing data", g: "linear-gradient(135deg,#FF8A5B,#C73D1A)" },
        ].map((b) => (
          <div key={b.t} className="mb-2 flex items-center gap-2 rounded-lg bg-[#f7f7f9] p-2">
            <span className="h-7 w-7 rounded-md" style={{ background: b.g }} />
            <div>
              <div className="text-[10.5px] font-semibold text-[#111]">{b.t}</div>
              <div className="text-[9px] text-[#111]/55">{b.s}</div>
            </div>
          </div>
        ))}
        {/* Corner gradient dots */}
        <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#6C42F5]/20 blur-xl" />
      </motion.div>
    </div>
  )
}

/* ── Card 3: Security ─────────────────────────────────────────────── */

function SecurityPanel() {
  return (
    <div className="relative h-full w-full p-6">
      {/* File graphic */}
      <div className="relative mx-auto mt-4 w-full max-w-[260px]">
        <div
          className="relative aspect-[4/3] rounded-2xl"
          style={{
            background: "linear-gradient(135deg,#fdfdfd 0%,#e9e9ed 100%)",
            boxShadow: "inset 0 1px 0 #fff, 0 20px 40px -20px rgba(17,17,17,0.25)",
          }}
        >
          {/* folder tab */}
          <span
            className="absolute -top-2 left-4 h-3 w-16 rounded-t-lg"
            style={{ background: "linear-gradient(180deg,#e9e9ed,#dcdce1)" }}
          />
          {/* inner file row with lock */}
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-lg border border-[#111]/8 bg-white p-2">
            <div className="flex flex-1 items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6C42F5]" />
              <span className="text-[10px] font-medium text-[#111]/80">Access management</span>
            </div>
            <Lock className="h-4 w-4 text-[#111]" strokeWidth={2} />
          </div>
          {/* data restricted pill */}
          <div className="absolute left-4 top-4 rounded-full bg-[#111] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
            Data Restricted
          </div>
        </div>
      </div>
      {/* Role-based access footer row */}
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#111]/8 bg-white px-4 py-3">
        <Shield className="h-4 w-4 text-[#6C42F5]" strokeWidth={2} />
        <span className="text-[13px] font-semibold text-[#111]">Role based access</span>
      </div>
    </div>
  )
}

/* ── Card 4: Integrations marquee ─────────────────────────────────── */

function IntegrationsMarquee() {
  const gradients = [
    "linear-gradient(135deg,#6C42F5,#1852FF)",
    "linear-gradient(135deg,#FF8A5B,#C73D1A)",
    "linear-gradient(135deg,#3DA098,#0E9C7E)",
    "linear-gradient(135deg,#FCD34D,#D97706)",
    "linear-gradient(135deg,#93C5FD,#1D4ED8)",
    "linear-gradient(135deg,#F9A8D4,#BE185D)",
    "linear-gradient(135deg,#86EFAC,#15803D)",
  ]
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6">
      {/* center sparkle blob */}
      <span className="absolute h-40 w-40 rounded-full bg-[#6C42F5]/15 blur-3xl" />
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...gradients, ...gradients].map((g, i) => (
          <div key={i} className="flex justify-center gap-4">
            {[0, 1, 2].map((col) => (
              <span
                key={col}
                className="grid h-12 w-12 place-items-center rounded-xl shadow-[0_10px_24px_-14px_rgba(17,17,17,0.35)]"
                style={{ background: g }}
              >
                <Sparkles className="h-4 w-4 text-white/90" strokeWidth={1.8} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Card shell ───────────────────────────────────────────────────── */

function OverviewCard({
  eyebrow,
  title,
  sub,
  children,
  className = "",
  visualHeight = "260px",
}: {
  eyebrow?: string
  title: string
  sub: string
  children: React.ReactNode
  className?: string
  visualHeight?: string
}) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, ease: EASE }}
      className={`relative overflow-hidden rounded-3xl border border-[#111]/8 bg-white ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,1), 0 1px 0 rgba(17,17,17,0.04), 0 30px 70px -32px rgba(17,17,17,0.18)",
      }}
    >
      {/* Visual area */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: visualHeight,
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(108,66,245,0.07) 0%, transparent 55%), linear-gradient(180deg, #fbfbfd 0%, #f3f3f6 100%)",
        }}
      >
        {eyebrow && (
          <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C42F5]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#111]/55">
              {eyebrow}
            </span>
          </div>
        )}
        {children}
      </div>
      {/* Text block */}
      <div className="border-t border-[#111]/[0.06] p-6">
        <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-[#111]">
          {title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-[1.5] text-[#111]/55">{sub}</p>
      </div>
    </motion.div>
  )
}

/* ── Main section ─────────────────────────────────────────────────── */

export default function LightOverviewBento() {
  const heading = "Built for better development"
  const words = heading.split(" ")

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#f6f6f6]">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-[#111]/[0.06]"
      />
      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
        {/* Header */}
        <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#111]/10 bg-white px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C42F5]" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#111]/65">
              Overview
            </span>
          </div>

          <h2
            className="mt-6 font-semibold text-[#111]"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
          >
            {words.map((w, wi) => (
              <span key={wi} className="inline-block">
                {w.split("").map((ch, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    className="inline-block"
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{
                      duration: 0.55,
                      ease: EASE,
                      delay: (wi * 0.05) + (ci * 0.018),
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
                {wi < words.length - 1 && "\u00A0"}
              </span>
            ))}
          </h2>

          <p className="mt-5 max-w-[520px] text-[15px] leading-[1.55] text-[#111]/60">
            Tools and workflows designed to help teams build and launch products faster.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <OverviewCard
            eyebrow="Analytics"
            title="Advanced Analytics"
            sub="Deep dive into your user data with real-time tracking."
          >
            <AnalyticsChart />
          </OverviewCard>

          <OverviewCard
            eyebrow="Automation"
            title="Smart Automation"
            sub="Smart automation, simplified."
          >
            <AutomationPanel />
          </OverviewCard>

          <OverviewCard
            eyebrow="Security"
            title="Enterprise Security"
            sub="Bank grade encryption."
          >
            <SecurityPanel />
          </OverviewCard>

          <OverviewCard
            eyebrow="Integrations"
            title="100+ Integrations"
            sub="Connect with your favorite tools."
          >
            <IntegrationsMarquee />
          </OverviewCard>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-px bg-[#111]/[0.06]"
      />
    </section>
  )
}

void ShieldCheck
