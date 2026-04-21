"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const INTEGRATION_CARDS = [
  { id: 1, top: "30px", left: "20px", label: "Draft replies to this week's emails", icons: ["gmail"] },
  { id: 2, top: "80px", left: "250px", label: "Schedule a standup recap", icons: ["slack", "linear"] },
  { id: 3, top: "120px", left: "60px", label: "Triage new support tickets", icons: ["zendesk", "linear"] },
  { id: 4, top: "170px", left: "320px", label: "Monitor uptime and alert on Slack", icons: ["sentry", "slack"] },
  { id: 5, top: "210px", left: "140px", label: "Create a PR and post to #engineering", icons: ["github", "slack"] },
  { id: 6, top: "260px", left: "30px", label: "Update dependencies and run tests", icons: ["github"] },
  { id: 7, top: "300px", left: "240px", label: "Check errors and create tickets", icons: ["sentry", "linear"] },
]

interface AgentData {
  name: string
  status: string
  icons: string[]
  terminalLines: string[]
}

const AGENTS: AgentData[] = [
  {
    name: "Email Agent",
    status: "Labeled 3 emails",
    icons: ["gmail", "googlecalendar"],
    terminalLines: [
      "$ softree.execute(GMAIL_LABEL_EMAILS,",
      "  {filter: 'is:unread category:primary'})",
      "→ labeled 3 emails as 'Action Required'",
      "$ softree.execute(GCAL_CREATE_EVENT,",
      "  {title: 'Follow-up: Q3 Budget'})",
      "→ event created for tomorrow 10:00 AM",
    ],
  },
  {
    name: "Slack Agent",
    status: "Posted digest",
    icons: ["slack", "googledocs"],
    terminalLines: [
      "$ softree.execute(SLACK_SEND_MESSAGE,",
      "  {channel: '#ops'})",
      "→ posted daily digest to #ops",
      '$ softree.execute(GDOCS_APPEND,',
      '  {doc: "Meeting Notes"})',
      "→ synced 4 highlights from #standup",
    ],
  },
  {
    name: "SQL Agent",
    status: "Optimized slow query",
    icons: ["supabase", "googlesheets"],
    terminalLines: [
      "$ softree.execute(SUPABASE_RUN_QUERY,",
      '  {query: "EXPLAIN ANALYZE SELECT..."})',
      "→ identified 2 sequential scans",
      "$ softree.execute(SHEETS_EXPORT,",
      '  {sheet: "Performance Log"})',
      "→ exported optimization report",
    ],
  },
  {
    name: "Code Review Agent",
    status: "Reviewed PR #127",
    icons: ["github", "linear"],
    terminalLines: [
      "$ softree.execute(GITHUB_REVIEW_PR,",
      "  {repo: 'main', pr: 127})",
      "→ approved with 2 suggestions",
      "$ softree.execute(LINEAR_UPDATE_ISSUE,",
      '  {id: "ENG-482", status: "Done"})',
      "→ moved issue to Done column",
    ],
  },
  {
    name: "Research Agent",
    status: "Saved to workspace",
    icons: ["firecrawl", "notion"],
    terminalLines: [
      "$ softree.execute(FIRECRAWL_SCRAPE,",
      '  {url: "arxiv.org/abs/2406.1234"})',
      "→ extracted paper summary",
      "$ softree.execute(NOTION_ADD_PAGE_CONTENT,",
      '  {page: "Research DB"})',
      "→ saved findings to workspace",
    ],
  },
]

const LOGO_MAP: Record<string, string> = {
  gmail: "https://logos.composio.dev/api/gmail",
  slack: "https://logos.composio.dev/api/slack",
  linear: "https://logos.composio.dev/api/linear",
  zendesk: "https://logos.composio.dev/api/zendesk",
  sentry: "https://logos.composio.dev/api/sentry",
  github: "https://logos.composio.dev/api/github",
  notion: "https://logos.composio.dev/api/notion",
  googlecalendar: "https://logos.composio.dev/api/googlecalendar",
  googledocs: "https://logos.composio.dev/api/googledocs",
  supabase: "https://logos.composio.dev/api/supabase",
  googlesheets: "https://logos.composio.dev/api/googlesheets",
  firecrawl: "https://logos.composio.dev/api/firecrawl",
}

const DEFAULT_TERMINAL_LINES = [
  "$",
  "",
  "softree.execute(NOTION_ADD_PAGE_CONTENT,",
  "  {page: 'runbook'})",
  "→ appended 3 blocks to \"Incident",
  '  Runbook"',
  "$ softree.execute(SLACK_SEND_MESSAGE,",
  "  {channel: '#ops'})",
]

function LiveTerminalCard({ lines, isDefault }: { lines: string[]; isDefault: boolean }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d1a14] p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="size-[6px] rounded-full bg-[#3fffdd] shadow-[0_0_6px_rgba(63,255,221,0.6)]"
        />
        <span className="font-mono text-[10px] text-[#3fffdd]/80 tracking-wider uppercase">
          live terminal
        </span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-hidden font-mono text-[11px] leading-[1.7]">
        <AnimatePresence mode="wait">
          <motion.div
            key={isDefault ? "default" : lines.join("")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {lines.map((line, i) => (
              <div key={i} className={
                line.startsWith("$") 
                  ? "text-white/90" 
                  : line.startsWith("→") 
                    ? "text-[#3fffdd]/80" 
                    : "text-white/50"
              }>
                {line || "\u00A0"}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function AgentCard({
  agent,
  isHovered,
  onHover,
  onLeave,
}: {
  agent: AgentData
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        borderColor: isHovered ? "rgba(63, 255, 221, 0.3)" : "rgba(255, 255, 255, 0.08)",
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.03)",
      }}
      transition={{ duration: 0.25 }}
      className="relative flex h-full cursor-pointer flex-col justify-between rounded-lg border p-4"
    >
      {/* Agent Name + Active Dot */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] text-neutral-200 tracking-tight">{agent.name}</span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="size-[6px] rounded-full bg-[#3fffdd] shadow-[0_0_6px_rgba(63,255,221,0.5)]"
        />
      </div>

      {/* Integration Icons */}
      <div className="mt-3 flex items-center gap-1.5">
        {agent.icons.map((icon) => (
          <motion.img
            key={icon}
            src={LOGO_MAP[icon]}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
            className="size-[22px] rounded-[4px]"
            alt={icon}
          />
        ))}
      </div>

      {/* Status Text (slides up on hover) */}
      <div className="mt-auto pt-6 overflow-hidden h-[20px]">
        <motion.p
          animate={{ y: isHovered ? 0 : 6, opacity: isHovered ? 0.9 : 0.4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="truncate font-mono text-[10px] text-neutral-400 tracking-tight"
        >
          {agent.status}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function SoftreeComposioSection() {
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null)

  const terminalLines = hoveredAgent !== null ? AGENTS[hoveredAgent].terminalLines : DEFAULT_TERMINAL_LINES

  return (
    <section className="flex w-full justify-center bg-[#F6F6F6] pt-16 pb-0 lg:pb-16 font-sans">
      <div className="w-full max-w-[1240px] lg:px-0">
        
        {/* Header Section */}
        <div className="flex flex-col gap-8 px-4 lg:px-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex h-6 items-center gap-2 px-2 py-1.5"
          >
            <div className="size-[5.82px] bg-black"></div>
            <span className="font-mono text-black text-sm leading-normal tracking-[-0.28px]">ZERO CODE TO FULL CONTROL</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-[474px] text-3xl text-black leading-[0.9] md:text-4xl lg:text-[48px] font-medium"
          >
            One product, every workflow
          </motion.h2>
        </div>

        <div className="relative mt-16 flex flex-col gap-8 lg:gap-12 px-4 lg:px-0">
          
          {/* Card A: Softree For You (Light) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex h-auto w-full flex-col overflow-hidden bg-white p-6 md:p-8 lg:h-[450px] lg:flex-row lg:p-12 shadow-sm border border-neutral-200/50"
          >
            <div className="flex w-full flex-col justify-between gap-6 pr-0 lg:w-[340px] lg:shrink-0 lg:gap-0 lg:pr-10">
              <div className="flex flex-col gap-[18px]">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-2xl text-neutral-900 leading-[1.2]">Softree</span>
                  <span className="rounded-[4px] border border-[#ff715b] px-1.5 py-0.5 font-mono text-[#ff715b] text-sm leading-normal">FOR YOU</span>
                </div>
                <p className="text-base text-neutral-600 leading-[1.5]">
                  Turn VS Code, Cursor, or any MCP client into an agent that executes across all your apps. Go from asking questions to doing work.
                </p>
                <p className="text-base text-neutral-600 leading-[1.5]">
                  Every tool comes production-ready — authenticated, optimized, and reliable. No setup required.
                </p>
              </div>
              <a href="#" className="inline-flex w-fit items-center justify-center bg-black px-4 py-2 font-mono text-sm text-white leading-normal tracking-[-0.28px] hover:bg-neutral-800 transition-colors">
                LEARN MORE
              </a>
            </div>

            {/* Terminal Multi-Layer Graphics */}
            <div className="relative mt-6 h-[380px] overflow-hidden p-2 lg:-m-2 lg:mt-0 lg:h-auto lg:flex-1 bg-neutral-50 rounded-xl border border-neutral-100">
              {/* Terminal Window (Background) */}
              <div className="absolute top-8 right-0 h-[85%] w-[65%] shadow-2xl rounded-lg overflow-hidden border border-[#e0e0e0] flex flex-col">
                <div className="flex items-center gap-2 bg-[#E8E8E8] px-3 py-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]"></div>
                    <div className="h-[11px] w-[11px] rounded-full bg-[#febc2e]"></div>
                    <div className="h-[11px] w-[11px] rounded-full bg-[#28c840]"></div>
                  </div>
                  <span className="flex-1 text-left font-mono text-[#999] text-[10px] ml-2 tracking-tight">user — ✻ Softree AI — softree</span>
                </div>
                <div className="flex-1 bg-[#F6F6F6] p-4 font-mono text-[9px] leading-[1.6] overflow-hidden">
                  <div className="select-none text-[#D87756] whitespace-pre opacity-90" style={{ fontSize: '5px', lineHeight: '1.2' }}>
{` ███████╗  ██████╗  ███████╗ ████████╗ ██████╗  ███████╗ ███████╗
 ██╔════╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔══██╗ ██╔════╝ ██╔════╝
 ███████╗ ██║   ██║ █████╗      ██║    ██████╔╝ █████╗   █████╗  
 ╚════██║ ██║   ██║ ██╔══╝      ██║    ██╔══██╗ ██╔══╝   ██╔══╝  
 ███████║ ╚██████╔╝ ██║         ██║    ██║  ██║ ███████╗ ███████╗
 ╚══════╝  ╚═════╝  ╚═╝         ╚═╝    ╚═╝  ╚═╝ ╚══════╝ ╚══════╝`}
                  </div>
                  <div className="mt-4 flex flex-col gap-0.5 text-[#999]">
                    <div>v1.0.42</div>
                    <div>Softree Engine 2.0 · Pro Max</div>
                    <div>/Users/softree/workspace</div>
                  </div>
                  <div className="mt-8 flex items-center gap-2 border-[#ddd] border-t pt-4">
                    <span className="text-[#333] font-bold">❯</span>
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block h-[13px] w-1 bg-[#333]"
                    />
                    <span className="text-[#bbb]">try &quot;optimize my cloud budget&quot;</span>
                  </div>
                  <div className="mt-4 flex justify-between text-[#bbb] text-[9px] opacity-80">
                    <span>? for shortcuts</span>
                    <span>/ide for <span className="text-[#8B5CF6]">Cursor</span></span>
                  </div>
                </div>
              </div>

              {/* Floating Cards (Foreground) */}
              {INTEGRATION_CARDS.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.3 + idx * 0.1, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="absolute bg-white border border-[#e0e0e0] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)] rounded-lg p-3 z-20 cursor-default"
                  style={{ 
                    top: card.top, 
                    left: card.left,
                    maxWidth: '280px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex shrink-0 items-center -space-x-1.5">
                      {card.icons.map((icon) => (
                        <img 
                          key={icon}
                          alt={icon} 
                          className="h-5 w-5 rounded-[4px] border border-white shadow-sm" 
                          src={LOGO_MAP[icon]} 
                        />
                      ))}
                    </div>
                    <span className="whitespace-nowrap font-medium text-neutral-700 text-[12px] pr-2">
                      {card.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card B: Softree Platform (Dark) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex h-auto w-full flex-col overflow-hidden bg-black px-6 py-8 md:p-8 lg:h-[450px] lg:flex-row lg:p-12 text-white"
          >
            {/* Left: Text + Code */}
            <div className="flex w-full flex-col justify-between gap-6 pr-0 lg:w-[340px] lg:shrink-0 lg:gap-0 lg:pr-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-2xl text-white leading-[1.2]">Softree</span>
                  <span className="rounded-[4px] border border-[#3fffdd]/70 px-1.5 py-0.5 font-mono text-[#3fffdd] text-sm leading-normal">PLATFORM</span>
                </div>
                <p className="text-base text-neutral-400 leading-[1.5]">
                  Your agent has the intelligence. Now let it execute. Go from chatbot to general-purpose agent in five lines of code.
                </p>
              </div>

              {/* Code Snippet */}
              <div className="rounded-md border border-white/10 bg-white/5 p-4 font-mono text-[11px] text-white/80 leading-[1.6] my-4 lg:my-0">
                <code className="block">
                  <span className="text-[#3fffdd]">tools</span> = session.tools()<br />
                  <span className="text-[#5b9cf4]">agent</span> = Agent(<br />
                  &nbsp;&nbsp;name=<span className="text-[#f0a46c]">&quot;Assistant&quot;</span>,<br />
                  &nbsp;&nbsp;tools=tools,<br />
                  )
                </code>
              </div>

              <a href="#" className="inline-flex w-fit items-center justify-center bg-white px-4 py-2 font-mono text-sm text-black leading-normal tracking-[-0.28px] hover:bg-neutral-200 transition-colors">
                LEARN MORE
              </a>
            </div>

            {/* Right: Agent Grid (2 rows x 3 cols) */}
            {/* First card is the live terminal, rest are agent cards */}
            <div className="mt-6 grid flex-1 grid-cols-2 gap-3 lg:mt-0 lg:grid-cols-3">
              {/* Live Terminal Card (Top-Left) */}
              <LiveTerminalCard 
                lines={terminalLines} 
                isDefault={hoveredAgent === null} 
              />

              {/* Agent Cards */}
              {AGENTS.map((agent, idx) => (
                <AgentCard
                  key={agent.name}
                  agent={agent}
                  isHovered={hoveredAgent === idx}
                  onHover={() => setHoveredAgent(idx)}
                  onLeave={() => setHoveredAgent(null)}
                />
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
