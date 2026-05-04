"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpRight,
  HeadphonesIcon,
  BarChart3,
  GitBranch,
  Shield,
  Mail,
  FileSearch,
  Bot,
  Sparkles,
  Zap,
  Cpu,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

/* ========================================================= */
/*  AGENT DATA                                               */
/* ========================================================= */

type LogLine = { mode: "prompt" | "cmd" | "ok" | "info"; text: string }

interface Agent {
  id: string
  name: string
  role: string
  icon: LucideIcon
  accent: "orange" | "blue"
  stack: string[]
  metric: { label: string; value: string }
  logs: LogLine[]
  href: string
}

const AGENTS: Agent[] = [
  {
    id: "cs",
    name: "Customer Success Agent",
    role: "Resolves L1 tickets end-to-end",
    icon: HeadphonesIcon,
    accent: "orange",
    stack: ["Zendesk", "Notion", "Slack"],
    metric: { label: "Avg. resolution", value: "42s" },
    href: "/case-studies/customer-success-agent",
    logs: [
      { mode: "prompt", text: "$ softree.agent(cs).run()" },
      { mode: "cmd", text: "→ fetch_ticket(id: ZD-892)" },
      { mode: "cmd", text: "→ classify(intent: 'refund')" },
      { mode: "ok", text: "✓ resolution drafted" },
      { mode: "cmd", text: "→ update_ticket(status: solved)" },
      { mode: "ok", text: "✓ user confirmed resolution" },
      { mode: "info", text: "handled in 41.8s" },
    ],
  },
  {
    id: "analyst",
    name: "Revenue Analyst",
    role: "Builds live exec dashboards from raw data",
    icon: BarChart3,
    accent: "blue",
    stack: ["Supabase", "Power BI", "Sheets"],
    metric: { label: "Reports / week", value: "180+" },
    href: "/case-studies/data-analyst-agent",
    logs: [
      { mode: "prompt", text: "$ softree.agent(analyst).run()" },
      { mode: "cmd", text: "→ query(db: prod, range: Q3)" },
      { mode: "ok", text: "✓ fetched 12.4M rows" },
      { mode: "cmd", text: "→ forecast(model: arima)" },
      { mode: "cmd", text: "→ push(sheet: exec_kpi)" },
      { mode: "ok", text: "✓ dashboard synced" },
      { mode: "info", text: "2.1M rows · 3.4s" },
    ],
  },
  {
    id: "devops",
    name: "DevOps Copilot",
    role: "Ships hotfixes from PR to production",
    icon: GitBranch,
    accent: "orange",
    stack: ["GitHub", "Vercel", "Sentry"],
    metric: { label: "Deploys / day", value: "24" },
    href: "/case-studies/devops-copilot",
    logs: [
      { mode: "prompt", text: "$ softree.agent(devops).run()" },
      { mode: "cmd", text: "→ sentry.diagnose(issue: SIGTERM)" },
      { mode: "ok", text: "✓ root-cause located" },
      { mode: "cmd", text: "→ github.open_pr(branch: fix/rate-limit)" },
      { mode: "cmd", text: "→ vercel.deploy(env: prod)" },
      { mode: "ok", text: "✓ shipped in 2m 14s" },
    ],
  },
  {
    id: "compliance",
    name: "Compliance Sentinel",
    role: "Monitors SOC 2 / GDPR posture 24×7",
    icon: Shield,
    accent: "blue",
    stack: ["Okta", "Azure AD", "Jira"],
    metric: { label: "Controls tracked", value: "312" },
    href: "/case-studies/compliance-sentinel",
    logs: [
      { mode: "prompt", text: "$ softree.agent(compliance).run()" },
      { mode: "cmd", text: "→ scan(policies: 312)" },
      { mode: "ok", text: "✓ 3 drift events detected" },
      { mode: "cmd", text: "→ open_jira(priority: high)" },
      { mode: "ok", text: "✓ remediation assigned" },
    ],
  },
  {
    id: "outreach",
    name: "Outbound SDR",
    role: "Warm-enriches leads & books meetings",
    icon: Mail,
    accent: "orange",
    stack: ["HubSpot", "LinkedIn", "Gmail"],
    metric: { label: "Meetings / month", value: "240" },
    href: "/case-studies/outbound-sdr",
    logs: [
      { mode: "prompt", text: "$ softree.agent(outreach).run()" },
      { mode: "cmd", text: "→ enrich(icp: enterprise_saas)" },
      { mode: "ok", text: "✓ 482 contacts found" },
      { mode: "cmd", text: "→ personalize(tone: executive)" },
      { mode: "cmd", text: "→ send(batch: 120)" },
      { mode: "ok", text: "✓ 31% reply rate" },
    ],
  },
  {
    id: "research",
    name: "Research Navigator",
    role: "Surfaces evidence from 10k+ documents",
    icon: FileSearch,
    accent: "blue",
    stack: ["Vector DB", "Azure OpenAI", "SharePoint"],
    metric: { label: "Docs indexed", value: "10.2M" },
    href: "/case-studies/research-navigator",
    logs: [
      { mode: "prompt", text: "$ softree.agent(research).run()" },
      { mode: "cmd", text: "→ embed(corpus: sharepoint)" },
      { mode: "ok", text: "✓ 10.2M docs indexed" },
      { mode: "cmd", text: "→ answer(q: 'risk posture FY24')" },
      { mode: "ok", text: "✓ 12 citations returned" },
    ],
  },
]

/* ========================================================= */
/*  LOG TERMINAL                                             */
/* ========================================================= */

function AgentTerminal({ agent }: { agent: Agent }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= agent.logs.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 380)
    return () => clearInterval(id)
  }, [agent.logs.length])

  const accentHex = agent.accent === "orange" ? "#FF6B00" : "#A1C4FF"

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
      {/* Terminal chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-[10px] text-white/40">
          softree · {agent.id}.agent
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accentHex }}
          />
          <span className="font-mono text-[10px] text-white/50">LIVE</span>
        </div>
      </div>

      {/* Log body */}
      <div className="flex flex-1 flex-col gap-1.5 p-5 font-mono text-[12.5px] leading-relaxed">
        {agent.logs.slice(0, visibleCount).map((line, i) => {
          let color = "text-white/75"
          if (line.mode === "prompt") color = "text-white/50"
          if (line.mode === "cmd") color = "text-white/85"
          if (line.mode === "ok")
            color = agent.accent === "orange" ? "text-[#FF6B00]" : "text-[#A1C4FF]"
          if (line.mode === "info") color = "text-white/40 italic"
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={color}
            >
              {line.text}
            </motion.div>
          )
        })}
        {visibleCount < agent.logs.length && (
          <span className="inline-block h-4 w-1.5 animate-pulse bg-white/60" />
        )}
      </div>
    </div>
  )
}

/* ========================================================= */
/*  MAIN                                                      */
/* ========================================================= */

export function SoftreeComposioSection() {
  const [active, setActive] = useState(0)
  const agent = AGENTS[active]
  const accentHex = agent.accent === "orange" ? "#FF6B00" : "#A1C4FF"
  const Icon = agent.icon

  // auto-cycle every 7s unless user interacts
  const [userPaused, setUserPaused] = useState(false)
  useEffect(() => {
    if (userPaused) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % AGENTS.length)
    }, 8000)
    return () => clearInterval(id)
  }, [userPaused])

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-20 md:py-28">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1200px circle at 20% 10%, rgba(255,107,0,0.10), transparent 45%), radial-gradient(900px circle at 85% 90%, rgba(161,196,255,0.08), transparent 45%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 md:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[640px] flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-60" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B00] opacity-80">
                Agentic AI
              </span>
            </div>
            <h2
              className="text-3xl font-black leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[56px]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              AI agents doing the{" "}
              <span className="text-white/40">actual work.</span>
            </h2>
            <p className="max-w-[520px] text-[15px] leading-relaxed text-white/55">
              Production-grade AI agents built on your data and tools — not demos. Running
              in the background, doing real work, reporting measurable outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
            <Sparkles className="h-3.5 w-3.5 text-[#FF6B00]" />
            <span>{AGENTS.length} agents deployed in production</span>
          </div>
        </div>

        {/* Body: left agent list / right live terminal */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
          {/* Agent list */}
          <div className="flex flex-col gap-3">
            {AGENTS.map((a, i) => {
              const isActive = i === active
              const aHex = a.accent === "orange" ? "#FF6B00" : "#A1C4FF"
              const AIcon = a.icon
              return (
                <button
                  key={a.id}
                  onClick={() => {
                    setActive(i)
                    setUserPaused(true)
                  }}
                  className={`group relative flex items-start gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${isActive
                    ? "border-white/20"
                    : "border-white/5 hover:border-white/10"
                    }`}
                  style={{
                    background: isActive
                      ? `radial-gradient(500px circle at 0% 0%, ${aHex}16, transparent 50%), rgba(10,10,12,0.7)`
                      : "rgba(10,10,12,0.4)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C]/70 backdrop-blur-xl"
                    style={{ color: aHex }}
                  >
                    <AIcon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-black tracking-tight text-white">
                        {a.name}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="agentActiveDot"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: aHex }}
                        />
                      )}
                    </div>
                    <span className="text-xs leading-snug text-white/55">{a.role}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Live panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl"
              style={{
                background: `radial-gradient(900px circle at 100% 0%, ${accentHex}18, transparent 45%), rgba(10,10,12,0.92)`,
              }}
            >
              {/* corner glow */}
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-30 blur-[100px]"
                style={{ background: accentHex }}
              />

              <div className="relative grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-2 lg:p-10">
                {/* Left: agent details */}
                <div className="flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C]/70 backdrop-blur-xl"
                        style={{ color: accentHex }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div
                        className="rounded-full border border-white/10 bg-[#0A0A0C]/70 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl"
                        style={{ color: accentHex }}
                      >
                        Live agent
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-black leading-tight tracking-tight text-white md:text-3xl lg:text-[32px]"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {agent.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/65">{agent.role}</p>

                    {/* stack chips */}
                    <div className="flex flex-wrap gap-2">
                      {agent.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* metric */}
                    <div className="mt-2 flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                          {agent.metric.label}
                        </span>
                        <span
                          className="text-2xl font-black tracking-tight"
                          style={{
                            color: accentHex,
                            fontFamily: "Outfit, sans-serif",
                          }}
                        >
                          {agent.metric.value}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/10" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                          Uptime
                        </span>
                        <span
                          className="text-2xl font-black tracking-tight text-white"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          99.98%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={agent.href}
                    className="group/btn inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.25em] text-white backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/[0.08]"
                  >
                    See case study
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      style={{ color: accentHex }}
                    />
                  </Link>
                </div>

                {/* Right: terminal */}
                <div className="h-[340px] lg:h-full">
                  <AgentTerminal key={agent.id} agent={agent} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom stats strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
          {[
            { icon: Bot, label: "Agents in production", value: "42+" },
            { icon: Zap, label: "Actions per day", value: "1.2M" },
            { icon: Cpu, label: "Models fine-tuned", value: "18" },
            { icon: Sparkles, label: "Human-hours saved / mo", value: "9,400" },
          ].map((s) => {
            const SIcon = s.icon
            return (
              <div
                key={s.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0A0A0C]/60 text-[#FF6B00]">
                  <SIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xl font-black tracking-tight text-white md:text-2xl"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[11px] font-medium text-white/50">
                    {s.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SoftreeComposioSection
