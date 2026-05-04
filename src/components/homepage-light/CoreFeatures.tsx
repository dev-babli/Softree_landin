"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Globe,
  Layers,
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

/* ====================================================================
 *  SOFTREE CORE FEATURES — Premium Ethereal Glass Showcase
 *  Vibe: Deep OLED black + subtle glowing orbs + machined glass cards
 * ==================================================================== */

const EASE = [0.32, 0.72, 0, 1] as const

interface Feature {
  id: string
  number: string
  eyebrow: string
  title: string
  description: string
  metric: string
  metricLabel: string
  Icon: React.ElementType
  accent: string
  glow: string
}

const features: Feature[] = [
  {
    id: "ai",
    number: "01",
    eyebrow: "Agentic Intelligence",
    title: "AI that runs inside your operations.",
    description:
      "We build domain-trained agents that parse documents, route decisions, and trigger actions across your stack. Not chatbots — operational systems that reduce manual work and accelerate throughput.",
    metric: "40%",
    metricLabel: "avg. manual effort reduced",
    Icon: Brain,
    accent: "#FF6B00",
    glow: "rgba(255,107,0,0.18)",
  },
  {
    id: "web",
    number: "02",
    eyebrow: "Product Engineering",
    title: "Engineering that ships and scales.",
    description:
      "Cloud-native apps built with Next.js and React Native. From public-facing landing pages to internal SaaS platforms — we ship clean architecture that performs under real traffic, not synthetic benchmarks.",
    metric: "99+",
    metricLabel: "Lighthouse score maintained",
    Icon: Globe,
    accent: "#A1C4FF",
    glow: "rgba(161,196,255,0.18)",
  },
  {
    id: "microsoft",
    number: "03",
    eyebrow: "Enterprise Productivity",
    title: "Microsoft 365, connected end-to-end.",
    description:
      "SharePoint intranets, Power Platform workflows, Teams apps, and Azure governance — unified into a coherent operating system. We map business processes to platform capabilities.",
    metric: "200+",
    metricLabel: "M365 solutions shipped",
    Icon: Layers,
    accent: "#FF8C42",
    glow: "rgba(255,140,66,0.18)",
  },
  {
    id: "data",
    number: "04",
    eyebrow: "Decision Infrastructure",
    title: "Data infrastructure that drives decisions.",
    description:
      "Power BI dashboards, Azure Synapse pipelines, and real-time analytics. Clean governance, executive-grade reporting, and KPI-linked outcomes — not charts for charts' sake.",
    metric: "99.9%",
    metricLabel: "pipeline uptime SLA",
    Icon: BarChart3,
    accent: "#5C9DFF",
    glow: "rgba(92,157,255,0.18)",
  },
]

/* ── Staggered scroll-reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Double-Bezel Feature Card ── */
function FeatureCard({
  feature,
  index,
  isActive,
  onHover,
}: {
  feature: Feature
  index: number
  isActive: boolean
  onHover: (i: number | null) => void
}) {
  const { Icon, accent, glow } = feature
  return (
    <motion.div
      className="group relative"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Outer shell (Doppelrand) */}
      <div
        className="relative overflow-hidden rounded-[2rem] p-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          background:
            isActive
              ? `linear-gradient(135deg, ${accent}40, transparent 60%)`
              : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
        }}
      >
        {/* Inner core */}
        <div
          className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(2rem-1.5px)] bg-[#08090c]/80 px-8 py-10 backdrop-blur-xl md:px-10 md:py-12"
          style={{
            boxShadow: isActive
              ? `inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 60px -20px ${glow}`
              : "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 48px -20px rgba(0,0,0,0.6)",
          }}
        >
          {/* Ambient radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${glow}, transparent 70%)`,
              filter: "blur(50px)",
            }}
          />

          {/* Top row: number + icon plate */}
          <div className="relative z-10 flex items-start justify-between">
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {feature.number}
            </span>
            <div
              className="relative grid size-12 place-items-center rounded-xl border transition-all duration-500 group-hover:scale-105"
              style={{
                borderColor: `${accent}25`,
                background: `linear-gradient(135deg, ${accent}15, transparent)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px -8px ${glow}`,
              }}
            >
              <Icon className="size-5" style={{ color: accent }} strokeWidth={1.5} />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 mt-8">
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                borderColor: `${accent}20`,
                color: accent,
                background: `${accent}08`,
              }}
            >
              <Sparkles className="size-3" strokeWidth={2} />
              {feature.eyebrow}
            </div>
            <h3 className="text-[22px] font-semibold leading-[1.08] tracking-[-0.025em] text-white md:text-[26px]">
              {feature.title}
            </h3>
            <p className="mt-4 text-[13.5px] leading-[1.65] text-white/45">
              {feature.description}
            </p>
          </div>

          {/* Bottom metric strip */}
          <div className="relative z-10 mt-8 flex items-end justify-between border-t border-white/6 pt-5">
            <div>
              <div
                className="text-3xl font-bold tracking-tight"
                style={{ color: accent }}
              >
                {feature.metric}
              </div>
              <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/35">
                {feature.metricLabel}
              </div>
            </div>
            <div
              className="grid size-8 place-items-center rounded-full border opacity-0 transition-all duration-500 group-hover:opacity-100"
              style={{
                borderColor: `${accent}30`,
                background: `${accent}10`,
              }}
            >
              <ArrowUpRight className="size-3.5" style={{ color: accent }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Section ── */
export default function CoreFeatures() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const autoCycle = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : prev === features.length - 1 ? null : prev + 1
    )
  }, [])

  useEffect(() => {
    const id = setInterval(autoCycle, 3500)
    return () => clearInterval(id)
  }, [autoCycle])

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#050505] py-32 md:py-40 lg:py-52">
      {/* ── Background orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-[15%] -top-[10%] h-[600px] w-[600px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,0,0.45), transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute -bottom-[15%] -right-[10%] h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, rgba(161,196,255,0.4), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto mb-24 flex max-w-3xl flex-col items-center text-center md:mb-32">
          <Reveal>
            <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                Core Capabilities
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 text-balance text-[clamp(36px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
              Four practices.
              <br />
              <span className="text-white/30">One delivery system.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/40 md:text-lg">
              AI agents, product engineering, Microsoft 365, and data analytics — each team works as one unit so nothing falls through the gaps.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isActive={activeIndex === index}
              onHover={setActiveIndex}
            />
          ))}
        </div>

        {/* Bottom accent strip */}
        <Reveal delay={0.5}>
          <div className="mx-auto mt-20 flex h-[10px] w-full max-w-[600px] overflow-hidden rounded-full opacity-40">
            <div className="h-full flex-1 bg-[#FF6B00]" />
            <div className="h-full flex-1 bg-[#FF8C42]" />
            <div className="h-full flex-1 bg-[#A1C4FF]" />
            <div className="h-full flex-1 bg-[#5C9DFF]" />
            <div className="h-full flex-1 bg-white/20" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
