"use client"

import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react"

const heroCards = [
  {
    label: "Agentic AI",
    title: "Automate high-friction workflows",
    body: "RAG, agents, approvals, support loops, and business process automation.",
    icon: Bot,
  },
  {
    label: "Microsoft Cloud",
    title: "Modernize the workplace core",
    body: "Microsoft 365, SharePoint, Power Platform, Dynamics, and Azure foundations.",
    icon: Cloud,
  },
  {
    label: "Apps & Portals",
    title: "Build systems people actually use",
    body: "Next.js, React, intranets, dashboards, field apps, and partner platforms.",
    icon: Code2,
  },
  {
    label: "Data Intelligence",
    title: "Turn operations into live insight",
    body: "Power BI, Fabric-ready models, executive reporting, and KPI governance.",
    icon: BarChart3,
  },
]

const platformNodes = [
  ["SharePoint", "Content"],
  ["Power Apps", "Workflow"],
  ["Azure", "Cloud"],
  ["Power BI", "Insight"],
  ["Dynamics", "CRM"],
  ["AI Agents", "Automation"],
]

function SplitSoftreeMark() {
  return (
    <div
      data-hero-motion
      aria-label="Softree"
      className="grid overflow-hidden rounded-[8px] border border-white/[0.10] bg-white/[0.04] shadow-[0_24px_90px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl"
      style={{
        width: "calc(100vw - 32px)",
        maxWidth: "720px",
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
      }}
    >
      {"SOFTREE".split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="flex aspect-square min-w-0 items-center justify-center overflow-hidden border-r border-white/[0.09] last:border-r-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.035))] font-mono text-[clamp(1.25rem,6vw,6.1rem)] font-semibold leading-none text-cyan-100/85 sm:text-[clamp(1.65rem,7.3vw,6.1rem)]"
        >
          {letter}
        </span>
      ))}
    </div>
  )
}

export function HeroClone() {
  return (
    <section
      className="relative isolate min-h-[calc(100svh-4rem)] w-full overflow-hidden bg-[#03060b] px-4 pb-16 pt-16 text-white sm:px-6 lg:px-8"
      aria-labelledby="clone-hero-title"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video
          className="h-full w-full scale-110 object-cover object-center opacity-56 mix-blend-screen"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-view.png"
        >
          <source src="/Hero/hero.webm" type="video/webm" />
          <source src="/Hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#03060b_0%,rgba(3,6,11,0.84)_32%,rgba(3,6,11,0.46)_68%,rgba(3,6,11,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,11,0.64)_0%,rgba(3,6,11,0.16)_45%,#03060b_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-12">
        <div className="min-w-0 max-w-3xl">
          <div
            data-hero-motion
            className="mb-6 inline-flex items-center gap-2 rounded-[4px] border border-white/[0.14] bg-white/[0.07] px-3 py-2 text-xs font-semibold uppercase tracking-[0.17em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Enterprise IT delivery partner
          </div>

          <SplitSoftreeMark />

          <h1
            id="clone-hero-title"
            data-hero-motion
            className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-white md:text-6xl"
          >
            Where Vision Meets Execution.
          </h1>

          <p data-hero-motion className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/70 md:text-xl">
            We modernize Microsoft cloud environments, build enterprise web and
            mobile apps, automate workflows, and turn business data into
            decision-ready intelligence.
          </p>

          <div data-hero-motion className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-sm font-semibold text-[#061b31] shadow-[0_20px_50px_rgba(0,229,255,0.18)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.98]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white/[0.16] bg-white/[0.07] px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-white/[0.11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.98]"
            >
              Explore services
            </Link>
          </div>

          <div data-hero-motion className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["200+", "Projects"],
              ["98%", "Satisfaction"],
              ["4", "Global hubs"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[8px] border border-white/[0.1] bg-black/28 p-4 backdrop-blur-xl">
                <div className="font-mono text-2xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/42">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-motion className="relative min-h-[520px] min-w-0 lg:min-h-[680px]">
          <div className="absolute inset-0 rounded-[8px] border border-white/[0.11] bg-black/[0.34] shadow-[0_40px_120px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl" />
          <div className="absolute inset-4 overflow-hidden rounded-[8px] border border-white/[0.10] bg-[#050914]/80">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,229,255,0.13),transparent_36%),linear-gradient(315deg,rgba(139,92,246,0.15),transparent_42%)]" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative grid h-full grid-rows-[auto_1fr_auto] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100/70">Digital operations graph</div>
                  <div className="mt-1 text-sm text-white/46">Scattered systems becoming one operating layer</div>
                </div>
                <div className="inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-cyan-200 px-2.5 py-1.5 text-xs font-semibold text-[#061b31]">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Live</span>
                </div>
              </div>

              <div className="relative min-h-[320px]">
                {platformNodes.map(([name, type], index) => {
                  const positions = [
                    "left-[5%] top-[14%]",
                    "right-[7%] top-[13%]",
                    "left-[15%] top-[46%]",
                    "right-[16%] top-[45%]",
                    "left-[9%] bottom-[12%]",
                    "right-[8%] bottom-[10%]",
                  ]
                  const Icon = [Database, Workflow, Cloud, BarChart3, Network, Bot][index]
                  return (
                    <div
                      key={name}
                      data-depth-card
                      className={`absolute ${positions[index]} w-[44%] rounded-[8px] border border-white/[0.10] bg-white/[0.07] p-3 shadow-[0_18px_50px_rgba(0,229,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl [transform-style:preserve-3d] sm:w-[42%] sm:p-4`}
                    >
                      <Icon className="h-5 w-5 text-cyan-100" aria-hidden="true" />
                      <div className="mt-5 text-sm font-semibold text-white">{name}</div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/38">{type}</div>
                    </div>
                  )
                })}

                <div className="absolute left-[28%] top-[28%] h-px w-[44%] rotate-[2deg] bg-gradient-to-r from-cyan-200/0 via-cyan-200/75 to-violet-300/0 shadow-[0_0_18px_rgba(0,229,255,0.38)]" />
                <div className="absolute left-[24%] top-[55%] h-px w-[50%] -rotate-[10deg] bg-gradient-to-r from-cyan-200/0 via-blue-300/75 to-violet-300/0 shadow-[0_0_18px_rgba(0,229,255,0.38)]" />
                <div className="absolute left-[30%] top-[72%] h-px w-[42%] rotate-[12deg] bg-gradient-to-r from-cyan-200/0 via-violet-300/75 to-cyan-200/0 shadow-[0_0_18px_rgba(139,92,246,0.38)]" />
              </div>

              <div className="grid gap-3 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
                {heroCards.map((card) => (
                  <div key={card.label} className="rounded-[8px] border border-white/[0.09] bg-black/30 p-4">
                    <card.icon className="h-5 w-5 text-cyan-100" aria-hidden="true" />
                    <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/38">{card.label}</div>
                    <h2 className="mt-2 text-sm font-semibold leading-5 text-white">{card.title}</h2>
                    <p className="mt-2 text-xs leading-5 text-white/48">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 right-4 rounded-[8px] border border-cyan-100/20 bg-white/[0.07] p-4 shadow-[0_20px_70px_rgba(0,229,255,0.14),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl sm:left-6 sm:right-6">
            <div className="flex items-start gap-3">
              <Gauge className="mt-1 h-5 w-5 shrink-0 text-cyan-100" aria-hidden="true" />
              <p className="text-sm leading-6 text-white/66">
                Built as a safe clone: original homepage files stay untouched while the duplicate becomes the GSAP storytelling sales experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
