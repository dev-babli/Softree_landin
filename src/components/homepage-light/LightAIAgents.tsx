"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color as lightColor, radius } from "./tokens"
import { Eyebrow, InkPill, ArrowRight, GrainOverlay } from "./primitives"

/* Dark mode tokens */
const dk = {
  bg: "#0a0a1a",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  ink: "#ffffff",
  body: "rgba(255,255,255,0.65)",
  muted: "rgba(255,255,255,0.40)",
  gridLine: "rgba(255,255,255,0.04)",
  ivory: "rgba(255,255,255,0.03)",
  lifted: "rgba(255,255,255,0.05)",
  ghostCream: "rgba(255,255,255,0.08)",
  dustTaupe: "rgba(255,255,255,0.12)",
  slate: "rgba(255,255,255,0.45)",
  charcoal: "rgba(255,255,255,0.70)",
} as const

const color = {
  ...lightColor,
  // Override light tokens for dark mode
  ink: dk.ink,
  charcoal: dk.charcoal,
  slate: dk.slate,
  canvas: dk.bg,
  lifted: dk.lifted,
  ivory: dk.ivory,
  ghostCream: dk.ghostCream,
  dustTaupe: dk.dustTaupe,
} as const

const shadow = {
  golden: "0 30px 80px -20px rgba(0,0,0,0.5)",
} as const

const BLOCK_GRADIENT = "linear-gradient(90deg, #1852FF 0%, #6C42F5 50%, #38BDF8 100%)"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
 * LightAIAgents — light-theme reimagining of SoftreeComposioSection
 * Repurposed as an "AI Agents Showcase":
 *   • Top tier (cream): intro + scattered integration cards over a
 *     faux Claude/Cursor terminal preview
 *   • Bottom tier (ivory/lifted): grid of agent cards that flip to
 *     a live terminal log on hover
 * Core layout & motion preserved — only palette + chrome changed.
 * ─────────────────────────────────────────────────────────────────*/

const FLOATING_CARDS = [
  { id: 1, top: "20px", left: "10px", label: "Sync CRM contacts to spreadsheet", icons: ["hubspot"] },
  { id: 2, top: "70px", left: "210px", label: "Open a PR and post to #engineering", icons: ["github", "slack"] },
  { id: 3, top: "130px", left: "40px", label: "File a ticket for this incident", icons: ["linear"] },
  { id: 4, top: "190px", left: "240px", label: "Triage errors and create issues", icons: ["sentry", "linear"] },
  { id: 5, top: "240px", left: "20px", label: "Deploy hotfix to staging", icons: ["vercel"] },
  { id: 6, top: "300px", left: "200px", label: "Resolve tier-1 support tickets", icons: ["zendesk", "linear"] },
  { id: 7, top: "350px", left: "55px", label: "Schedule a standup recap", icons: ["slack", "notion"] },
] as const

interface AgentLog {
  mode: "prompt" | "cmd" | "success"
  text: string
}

interface AgentData {
  title: string
  icons: string[]
  action: string
  link: string
  accent: string
  logs: AgentLog[]
}

const AGENTS: AgentData[] = [
  {
    title: "Customer Success Agent",
    icons: ["notion", "slack", "zendesk"],
    action: "Resolved L1 ticket",
    link: "/case-studies/customer-success-agent",
    accent: color.flame,
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(ZENDESK_UPDATE_TICKET," },
      { mode: "cmd", text: "  {id: 'ZD-892', status: 'solved'})" },
      { mode: "success", text: "→ ✓ user confirmed resolution" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(SLACK_SEND_MESSAGE," },
      { mode: "cmd", text: "  {channel: '#cs-logs'})" },
      { mode: "success", text: "→ ✓ logged resolution summary" },
    ],
  },
  {
    title: "Data Analyst Agent",
    icons: ["supabase", "googlesheets", "slack"],
    action: "Generated revenue report",
    link: "/case-studies/data-analyst-agent",
    accent: color.sunshine,
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(SUPABASE_RUN_QUERY," },
      { mode: "cmd", text: "  {query: \"SELECT SUM(revenue)...\"})" },
      { mode: "success", text: "→ ✓ fetched Q3 metrics" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(GOOGLESHEETS_UPDATE," },
      { mode: "cmd", text: "  {range: 'A1:D10'})" },
      { mode: "success", text: "→ ✓ dashboard synced" },
    ],
  },
  {
    title: "DevOps Copilot",
    icons: ["github", "vercel", "linear"],
    action: "Deployed hotfix",
    link: "/case-studies/devops-copilot",
    accent: color.mistral,
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(GITHUB_MERGE_PR," },
      { mode: "cmd", text: "  {repo: 'api-core', pr: 442})" },
      { mode: "success", text: "→ ✓ merge successful" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(VERCEL_DEPLOY," },
      { mode: "cmd", text: "  {target: 'production'})" },
      { mode: "success", text: "→ ✓ deployment active" },
    ],
  },
  {
    title: "Financial Auditor",
    icons: ["googledocs", "linear"],
    action: "Scanned invoices",
    link: "/case-studies/financial-auditor",
    accent: color.signal,
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(DRIVE_SCAN_FOLDER," },
      { mode: "cmd", text: "  {folder: 'Invoices_Q3'})" },
      { mode: "success", text: "→ ✓ 42 documents processed" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(LINEAR_CREATE_ISSUE," },
      { mode: "cmd", text: "  {title: 'Discrepancy found'})" },
      { mode: "success", text: "→ ✓ flagged 2 anomalies" },
    ],
  },
  {
    title: "HR Onboarding Agent",
    icons: ["googlecalendar", "slack", "notion"],
    action: "Provisioned new hire",
    link: "/case-studies/hr-onboarding-agent",
    accent: color.flame,
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(NOTION_DUPLICATE_PAGE," },
      { mode: "cmd", text: "  {template: 'Onboarding'})" },
      { mode: "success", text: "→ ✓ workspace created" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(GOOGLECALENDAR_CREATE_EVENT," },
      { mode: "cmd", text: "  {title: 'IT orientation'})" },
      { mode: "success", text: "→ ✓ scheduled for Mon 9am" },
    ],
  },
  {
    title: "Research Assistant",
    icons: ["firecrawl", "notion"],
    action: "Summarized competitors",
    link: "/case-studies/research-assistant",
    accent: color.sunshine,
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(FIRECRAWL_SCRAPE," },
      { mode: "cmd", text: "  {url: 'competitor.com/pricing'})" },
      { mode: "success", text: "→ ✓ extracted pricing tiers" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(NOTION_APPEND_BLOCK," },
      { mode: "cmd", text: "  {page: 'Market intel'})" },
      { mode: "success", text: "→ ✓ intelligence updated" },
    ],
  },
]

function Typewriter({ logs, accent }: { logs: AgentLog[]; accent: string }) {
  const [typedChars, setTypedChars] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 3
      setTypedChars(current)
    }, 18)
    return () => clearInterval(interval)
  }, [logs])

  // Precompute cumulative starts so we never mutate during render
  const starts = logs.reduce<number[]>((acc, log, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + logs[i - 1].text.length)
    return acc
  }, [])

  return (
    <div className="flex flex-col gap-0.5 mt-2 overflow-hidden flex-1 select-none">
      {logs.map((log, index) => {
        const start = starts[index]
        const lineLen = log.text.length
        if (typedChars < start) return null
        const visibleCount = Math.min(typedChars - start, lineLen)
        const text = log.text.substring(0, visibleCount)

        const colorStyle =
          log.mode === "prompt"
            ? color.slate
            : log.mode === "cmd"
              ? color.charcoal
              : accent

        return (
          <div
            key={index}
            className="font-mono"
            style={{
              fontSize: 9.5,
              lineHeight: 1.6,
              color: colorStyle,
              fontWeight: log.mode === "success" ? 600 : 400,
            }}
          >
            {text}
            {index === logs.length - 1 && typedChars >= start + lineLen && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block ml-1 translate-y-[2px]"
                style={{
                  width: 5,
                  height: 10,
                  background: accent,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function HoverableAgentCard({ agent }: { agent: AgentData }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={agent.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-[160px] flex-col cursor-pointer group"
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col p-3 overflow-hidden z-10"
            style={{
              background: color.ivory,
              border: `1px solid ${agent.accent}55`,
              borderRadius: 6,
              boxShadow: `0 8px 24px ${agent.accent}20`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-1 shrink-0">
              <span
                className="rounded-sm animate-pulse"
                style={{ width: 6, height: 6, background: agent.accent }}
              />
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  color: agent.accent,
                }}
              >
                live terminal
              </span>
            </div>
            <Typewriter logs={agent.logs} accent={agent.accent} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col justify-between p-3 overflow-hidden transition-colors"
            style={{
              background: color.lifted,
              border: `1px solid ${color.ghostCream}`,
              borderRadius: 6,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono"
                style={{
                  fontSize: 12,
                  color: color.ink,
                  letterSpacing: "-0.24px",
                  fontWeight: 600,
                }}
              >
                {agent.title}
              </span>
              <span
                className="rounded-sm"
                style={{ width: 6, height: 6, background: agent.accent }}
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              {agent.icons.map((icon) => (
                <img
                  key={icon}
                  alt={icon}
                  className="size-5 rounded-sm"
                  src={`https://logos.composio.dev/api/${icon}`}
                  draggable={false}
                />
              ))}
            </div>

            <div className="mt-auto pt-3 flex items-center justify-between">
              <p
                className="truncate font-mono"
                style={{
                  fontSize: 10,
                  color: color.slate,
                  letterSpacing: "-0.22px",
                }}
              >
                {agent.action}
              </p>
              <span
                className="font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  fontSize: 9,
                  color: agent.accent,
                  letterSpacing: "0.22em",
                  fontWeight: 600,
                }}
              >
                Case study ↗
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  )
}

export default function LightAIAgents() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".lai-head > *", {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lai-head", start: "top 85%" },
        })
        gsap.from(".lai-tier-1, .lai-tier-2", {
          y: 32,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lai-tier-1", start: "top 80%" },
        })
      }, sectionRef)
      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: dk.bg }}
    >
      <GrainOverlay opacity={0.035} blendMode="overlay" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-24 pb-24 md:px-8 md:pt-32 md:pb-32">
        {/* Header */}
        <div className="lai-head flex flex-col gap-6">
          <Eyebrow>AI agents · proven results</Eyebrow>
          <h2
            className="max-w-[680px]"
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 500,
              lineHeight: 1.0,
              letterSpacing: "-2.2px",
              color: color.ink,
            }}
          >
            Our{" "}
            <span
              style={{
                backgroundImage: BLOCK_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              AI agent
            </span>{" "}
            portfolio.
          </h2>
          <p
            className="max-w-[560px]"
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: color.charcoal,
              opacity: 0.78,
            }}
          >
            Custom-built agents that integrate across your enterprise
            stack — authenticated, observable, and production-grade from day
            one.
          </p>
        </div>

        {/* TIER 1 — Custom agents intro + scattered cards */}
        <div
          className="lai-tier-1 mt-16 flex h-auto w-full flex-col overflow-hidden lg:h-[460px] lg:flex-row"
          style={{
            background: color.lifted,
            border: `1px solid ${color.ghostCream}`,
            borderRadius: radius.consent,
            boxShadow: shadow.golden,
          }}
        >
          {/* Left panel */}
          <div className="flex w-full flex-col justify-between gap-8 p-8 lg:w-[360px] lg:shrink-0 lg:p-12">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span
                  style={{
                    fontFamily: "inherit",
                    fontSize: 26,
                    fontWeight: 500,
                    color: color.ink,
                  }}
                >
                  Softree
                </span>
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: color.flame,
                    border: `1px solid ${color.flame}80`,
                    background: `${color.flame}10`,
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  Custom agents
                </span>
              </div>
              <p
                className="max-w-[280px]"
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: color.charcoal,
                  opacity: 0.82,
                }}
              >
                Turn standard operations into intelligent autonomous workflows.
                We build bespoke agents that integrate perfectly across your
                enterprise stack.
              </p>
              <p
                className="max-w-[280px]"
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: color.charcoal,
                  opacity: 0.82,
                }}
              >
                Every agent ships production-ready — authenticated, optimised,
                observable.
              </p>
            </div>
            <InkPill href="/case-studies">
              View all case studies <ArrowRight size={16} />
            </InkPill>
          </div>

          {/* Right panel — terminal + scattered cards */}
          <div className="relative mt-6 h-[420px] w-full lg:mt-0 lg:h-auto lg:flex-1">
            {/* Faux terminal window */}
            <div
              className="absolute right-0 top-[5%] h-[88%] w-[60%] z-0 overflow-hidden"
              style={{
                border: `1px solid ${dk.ghostCream}`,
                borderRadius: 6,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{
                  background: dk.ghostCream,
                  borderBottom: `1px solid ${dk.dustTaupe}`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      background: "#ff5f57",
                    }}
                  />
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      background: "#febc2e",
                    }}
                  />
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      background: "#28c840",
                    }}
                  />
                </div>
                <span
                  className="flex-1 text-left font-mono ml-2"
                  style={{
                    fontSize: 9,
                    color: color.slate,
                    letterSpacing: "-0.2px",
                  }}
                >
                  user — softree-agents — claude
                </span>
              </div>
              <div
                className="h-full p-4 font-mono"
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  background: "rgba(255,255,255,0.02)",
                  color: dk.charcoal,
                }}
              >
                <div
                  className="select-none overflow-hidden"
                  style={{
                    fontSize: 5,
                    lineHeight: 1.2,
                    fontFamily: "monospace",
                    whiteSpace: "pre",
                    color: "#1852FF",
                  }}
                >
                  {`  ███████╗ ██████╗ ███████╗████████╗██████╗ ███████╗███████╗
 ██╔════╝██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔════╝
 ███████╗██║   ██║█████╗     ██║   ██████╔╝█████╗  █████╗
 ╚════██║██║   ██║██╔══╝     ██║   ██╔══██╗██╔══╝  ██╔══╝
 ███████║╚██████╔╝██║        ██║   ██║  ██║███████╗███████╗
 ╚══════╝ ╚═════╝ ╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝`}
                </div>
                <div className="mt-3 flex flex-col gap-0.5" style={{ color: color.slate }}>
                  <div>v2.1.50</div>
                  <div>Opus 4.6 · Claude max</div>
                  <div>~/projects/softree-agents</div>
                </div>
                <div
                  className="mt-6 flex items-center gap-1.5 pt-3"
                  style={{ borderTop: `1px solid ${dk.dustTaupe}` }}
                >
                  <span style={{ color: color.ink }}>❯</span>
                  <span style={{ color: color.slate }}>build &quot;onboarding agent&quot;</span>
                </div>
              </div>
            </div>

            {/* Scattered floating cards */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {FLOATING_CARDS.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.5, ease: "easeOut" }}
                  animate={{ y: [0, -3, 0] }}
                  className="absolute pointer-events-auto cursor-default flex items-center"
                  style={{
                    top: card.top,
                    left: card.left,
                    padding: "6px 12px",
                    background: color.lifted,
                    border: `1px solid ${color.ghostCream}`,
                    borderRadius: 4,
                    boxShadow: "4px 4px 0px 0px rgba(127,99,21,0.10)",
                  }}
                >
                  <div className="flex shrink-0 items-center justify-center -space-x-1 mr-2">
                    {card.icons.map((icon) => (
                      <img
                        key={icon}
                        alt={icon}
                        className="h-4 w-4 object-cover z-10 rounded-sm"
                        src={`https://logos.composio.dev/api/${icon}`}
                        draggable={false}
                      />
                    ))}
                  </div>
                  <span
                    className="whitespace-nowrap"
                    style={{
                      fontSize: 11,
                      color: color.charcoal,
                      fontWeight: 500,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {card.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* TIER 2 — Agent grid (warm ivory) */}
        <div
          className="lai-tier-2 mt-5 flex h-auto w-full flex-col overflow-hidden px-6 py-10 md:p-10 lg:h-[470px] lg:flex-row lg:p-12"
          style={{
            background: color.ivory,
            border: `1px solid ${color.ghostCream}`,
            borderRadius: radius.consent,
            boxShadow: shadow.golden,
          }}
        >
          <div className="flex w-full flex-col justify-between gap-6 pr-0 lg:w-[340px] lg:shrink-0 lg:gap-0 lg:pr-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span
                  style={{
                    fontFamily: "inherit",
                    fontSize: 26,
                    fontWeight: 500,
                    color: color.ink,
                  }}
                >
                  Softree
                </span>
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: color.mistral,
                    border: `1px solid ${color.mistral}80`,
                    background: `${color.mistral}12`,
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  Case studies
                </span>
              </div>
              <p
                className="max-w-[280px]"
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: color.charcoal,
                  opacity: 0.82,
                }}
              >
                Hover any tile to watch the agent run in real time. Every
                deployment cited here is in active enterprise production today.
              </p>
            </div>
            <pre
              className="font-mono mt-4 lg:mt-0 max-w-[300px] p-4 overflow-auto"
              style={{
                background: color.lifted,
                border: `1px solid ${color.ghostCream}`,
                borderRadius: 6,
                fontSize: 10,
                lineHeight: 1.7,
                color: color.charcoal,
              }}
            >
              <code>
                {`tools = session.tools()
agent = Agent(
  name="Assistant",
  tools=tools,
)`}
              </code>
            </pre>
            <InkPill href="/services/ai-agents" className="mt-4 lg:mt-0">
              Hire us <ArrowRight size={16} />
            </InkPill>
          </div>

          {/* Agent grid */}
          <div className="mt-8 grid flex-1 grid-cols-2 gap-3 lg:mt-0 lg:grid-cols-3 content-start">
            {AGENTS.map((agent) => (
              <HoverableAgentCard key={agent.title} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
