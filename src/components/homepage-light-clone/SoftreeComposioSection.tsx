"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FLOATING_CARDS = [
  { id: 1, top: "25px", left: "15px", label: "Sync CRM contacts to spreadsheet", icons: ["hubspot"] },
  { id: 2, top: "70px", left: "215px", label: "Create a PR and post to #engineering", icons: ["github", "slack"] },
  { id: 3, top: "125px", left: "45px", label: "File a ticket for this bug", icons: ["linear"] }, // The blue striated circle is mapped as a single icon representing Linear for this context
  { id: 4, top: "185px", left: "240px", label: "Check errors and create tickets", icons: ["sentry", "linear"] },
  { id: 5, top: "230px", left: "25px", label: "Deploy to staging", icons: ["vercel"] }, // Black triangle mapped to vercel
  { id: 6, top: "285px", left: "200px", label: "Triage new support tickets", icons: ["zendesk", "linear"] },
  { id: 7, top: "330px", left: "55px", label: "Schedule a standup recap", icons: ["slack", "linear"] },
]

interface AgentLog {
  mode: "prompt" | "cmd" | "success"
  text: string
}

interface AgentData {
  title: string
  icons: string[]
  action: string
  link: string
  logs: AgentLog[]
}

const AGENTS: AgentData[] = [
  { 
    title: "Customer Success Agent", icons: ["notion", "slack", "zendesk"], action: "Resolved L1 Ticket", link: "/case-studies/customer-success-agent",
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(ZENDESK_UPDATE_TICKET," },
      { mode: "cmd", text: "  {id: 'ZD-892', status: 'solved'})" },
      { mode: "success", text: "→ ✓ user confirmed resolution" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(SLACK_SEND_MESSAGE," },
      { mode: "cmd", text: "  {channel: '#cs-logs'})" },
      { mode: "success", text: "→ ✓ logged resolution summary" }
    ]
  },
  { 
    title: "Data Analyst Agent", icons: ["supabase", "googlesheets", "slack"], action: "Generated Revenue Report", link: "/case-studies/data-analyst-agent",
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(SUPABASE_RUN_QUERY," },
      { mode: "cmd", text: "  {query: \"SELECT SUM(revenue)...\"})" },
      { mode: "success", text: "→ ✓ fetched Q3 metrics" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(GOOGLESHEETS_UPDATE," },
      { mode: "cmd", text: "  {range: 'A1:D10'})" },
      { mode: "success", text: "→ ✓ dashboard synced" }
    ]
  },
  { 
    title: "DevOps Copilot", icons: ["github", "vercel", "linear"], action: "Deployed Hotfix", link: "/case-studies/devops-copilot",
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(GITHUB_MERGE_PR," },
      { mode: "cmd", text: "  {repo: 'api-core', pr: 442})" },
      { mode: "success", text: "→ ✓ merge successful" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(VERCEL_DEPLOY," },
      { mode: "cmd", text: "  {target: 'production'})" },
      { mode: "success", text: "→ ✓ deployment active" }
    ]
  },
  { 
    title: "Financial Auditor", icons: ["googledocs", "linear"], action: "Scanned Invoices", link: "/case-studies/financial-auditor",
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(DRIVE_SCAN_FOLDER," },
      { mode: "cmd", text: "  {folder: 'Invoices_Q3'})" },
      { mode: "success", text: "→ ✓ 42 documents processed" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(LINEAR_CREATE_ISSUE," },
      { mode: "cmd", text: "  {title: 'Discrepancy Found'})" },
      { mode: "success", text: "→ ✓ flagged 2 anomalies" }
    ]
  },
  { 
    title: "HR Onboarding Agent", icons: ["googlecalendar", "slack", "notion"], action: "Provisioned New Hire", link: "/case-studies/hr-onboarding-agent",
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(NOTION_DUPLICATE_PAGE," },
      { mode: "cmd", text: "  {template: 'Onboarding'})" },
      { mode: "success", text: "→ ✓ workspace created" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(GOOGLECALENDAR_CREATE_EVENT," },
      { mode: "cmd", text: "  {title: 'IT Orientation'})" },
      { mode: "success", text: "→ ✓ scheduled for Mon 9am" }
    ]
  },
  { 
    title: "Research Assistant", icons: ["firecrawl", "notion"], action: "Summarized Competitors", link: "/case-studies/research-assistant",
    logs: [
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(FIRECRAWL_SCRAPE," },
      { mode: "cmd", text: "  {url: \"competitor.com/pricing\"})" },
      { mode: "success", text: "→ ✓ extracted pricing tiers" },
      { mode: "prompt", text: "$" },
      { mode: "cmd", text: "softree.execute(NOTION_APPEND_BLOCK," },
      { mode: "cmd", text: "  {page: 'Market Intel'})" },
      { mode: "success", text: "→ ✓ intelligence updated" }
    ]
  },
]

function Typewriter({ logs }: { logs: AgentLog[] }) {
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 3; // Typing speed (chars per tick)
      setTypedChars(current);
    }, 15);
    return () => clearInterval(interval);
  }, [logs]);

  let charsProcessed = 0;

  return (
    <div className="flex flex-col gap-0.5 mt-2 overflow-hidden flex-1 select-none">
      {logs.map((log, index) => {
        const start = charsProcessed;
        const lineLen = log.text.length;
        charsProcessed += lineLen;

        if (typedChars < start) return null;

        const visibleCount = Math.min(typedChars - start, lineLen);
        const text = log.text.substring(0, visibleCount);

        let colorStyle = "text-white/60";
        if (log.mode === "prompt") colorStyle = "text-emerald-400/50";
        if (log.mode === "cmd") colorStyle = "text-emerald-300";
        if (log.mode === "success") colorStyle = "text-emerald-400 font-medium";

        return (
          <div key={index} className={`font-mono text-[9px] leading-[1.6] ${colorStyle}`}>
            {text}
            {index === logs.length - 1 && typedChars >= charsProcessed && (
               <motion.span
                 animate={{ opacity: [1, 0, 1] }}
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-[5px] h-[10px] bg-emerald-400 ml-1 translate-y-[2px]"
               />
            )}
          </div>
        );
      })}
    </div>
  );
}

function HoverableAgentCard({ agent }: { agent: AgentData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a 
      href={agent.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-[150px] flex-col cursor-pointer group"
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col rounded-sm border border-emerald-400/30 bg-[#0d1511] p-3 overflow-hidden z-10"
          >
            <div className="flex items-center gap-1.5 mb-1 shrink-0">
              <span className="size-1.5 rounded-sm bg-emerald-400 animate-pulse"></span>
              <span className="uppercase text-emerald-400/80 font-mono text-[9px] tracking-widest">live terminal</span>
            </div>
            <Typewriter logs={agent.logs} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col justify-between rounded-sm border border-white/10 bg-white/5 p-3 overflow-hidden hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-white text-xs tracking-[-0.24px]">
                {agent.title}
              </span>
              <span className="size-1.5 rounded-sm bg-emerald-400/50" />
            </div>
            
            <div className="mt-3 flex items-center gap-2">
              {agent.icons.map((icon) => (
                <img 
                  key={icon} 
                  alt={icon} 
                  className="size-5 rounded-sm" 
                  src={`https://logos.composio.dev/api/${icon}`} 
                  draggable="false"
                />
              ))}
            </div>

            <div className="mt-auto pt-3 flex items-center justify-between">
              <p className="truncate font-mono text-[10px] text-white/40 tracking-[-0.22px]">
                {agent.action}
              </p>
              <span className="font-mono text-[9px] text-emerald-400/80 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Case Study ↗
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  )
}

export function SoftreeComposioSection() {
  return (
    <section className="flex w-full justify-center bg-[#F6F6F6] pt-16 pb-0 lg:pb-16 font-sans">
      <div className="w-full max-w-[1240px] lg:px-0">
        
        {/* Header Elements */}
        <div className="flex flex-col gap-8 px-4 lg:px-0">
          <div className="flex h-6 items-center gap-2 px-2 py-1.5">
            <div className="size-[5.82px] bg-black"></div>
            <span className="font-mono text-black text-sm leading-normal tracking-[-0.28px] uppercase">
              Proven Results
            </span>
          </div>
          <h2 className="max-w-[474px] text-3xl text-black leading-[0.9] md:text-4xl lg:text-[48px]">
            Our AI Agent Portfolio
          </h2>
        </div>

        <div className="relative mt-16">
          
          {/* Light Theme: Softree FOR YOU */}
          <div className="flex h-auto w-full flex-col overflow-hidden bg-white p-6 md:p-8 lg:h-[450px] lg:flex-row lg:p-12 mb-0">
            <div className="flex w-full flex-col justify-between gap-6 pr-0 lg:w-[340px] lg:shrink-0 lg:gap-0 lg:pr-10 z-10">
              <div className="flex flex-col gap-[18px]">
                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-2xl text-black leading-[1.2]">Softree</span>
                  <span className="rounded-sm border border-blue-600 px-1.5 py-0.5 font-mono text-blue-600 text-xs leading-normal uppercase">
                    Custom Agents
                  </span>
                </div>
                <p className="text-[15px] text-black leading-[1.4] opacity-80 max-w-[280px]">
                  Turn your standard operations into intelligent, autonomous workflows. We build bespoke agents that integrate perfectly across all your enterprise apps.
                </p>
                <p className="text-[15px] text-black leading-[1.4] opacity-80 max-w-[280px]">
                  Every agent comes production-ready — authenticated, optimized, and reliable. See how we've transformed businesses.
                </p>
              </div>
              <a 
                className="inline-flex w-fit items-center justify-center rounded-sm bg-black px-4 py-2.5 font-mono text-xs text-white leading-normal tracking-[-0.28px] hover:bg-neutral-800 transition-colors uppercase" 
                href="/case-studies"
              >
                View All Case Studies
              </a>
            </div>

            <div className="relative mt-6 lg:mt-0 h-[400px] lg:h-auto lg:flex-1 w-full right-0">
              
              {/* Background Faux Terminal Window */}
              <div className="absolute top-0 right-0 h-[90%] w-[60%] z-0 rounded-sm overflow-hidden border border-[#e0e0e0] opacity-80 translate-y-[5%]">
                <div className="flex items-center gap-2 bg-[#E8E8E8] px-3 py-2 border-b border-[#ddd]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[10px] w-[10px] rounded-sm bg-[#ff5f57]"></div>
                    <div className="h-[10px] w-[10px] rounded-sm bg-[#febc2e]"></div>
                    <div className="h-[10px] w-[10px] rounded-sm bg-[#28c840]"></div>
                  </div>
                  <span className="flex-1 text-left font-mono text-[#999] text-[9px] tracking-tight ml-2">
                    user — ✻ Claude Code — claude
                  </span>
                </div>
                <div className="h-full bg-[#F6F6F6] p-4 font-mono text-[9px] leading-[1.7]">
                  <div 
                    className="select-none overflow-hidden text-[#D87756]" 
                    style={{ fontSize: "5px", lineHeight: "1.2", fontFamily: "monospace", whiteSpace: "pre" }}
                  >
{`  ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
 ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
 ██║     ██║     ███████║██║   ██║██║  ██║█████╗
 ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
 ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝`}
                  </div>
                  <div className="mt-4 flex flex-col gap-0.5">
                    <div className="text-[#999]">v2.1.50</div>
                    <div className="text-[#999]">Opus 4.6 · Claude Max</div>
                    <div className="text-[#999]">/Users/dev/projects/app</div>
                  </div>
                  <div className="mt-8 flex items-center gap-1.5 border-[#ddd] border-t pt-4">
                    <span className="text-[#333]">❯</span>
                    <span className="text-[#bbb]">try &quot;fix lint errors&quot;</span>
                  </div>
                  <div className="mt-2 flex justify-between text-[#bbb] text-[8px]">
                    <span>? for shortcuts</span>
                    <span>/ide for <span className="text-[#8B5CF6]">Cursor</span></span>
                  </div>
                </div>
              </div>

              {/* Scattered Integration Cards overlaying the terminal */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {FLOATING_CARDS.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.5, ease: "easeOut" }}
                    animate={{ y: [0, -3, 0] }}
                    className="absolute border border-[#e0e0e0] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.06)] hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,0.1)] transition-shadow duration-300 pointer-events-auto cursor-default flex items-center rounded-sm"
                    style={{ 
                      top: card.top, 
                      left: card.left, 
                      padding: "6px 12px"
                    }}
                  >
                    <div className="flex shrink-0 items-center justify-center -space-x-1 mr-2 opacity-90">
                      {card.icons.map((icon) => (
                        <img 
                          key={icon} 
                          alt={icon} 
                          className="h-4 w-4 object-cover z-10 rounded-sm" 
                          src={`https://logos.composio.dev/api/${icon}`} 
                          draggable="false"
                        />
                      ))}
                    </div>
                    <span className="whitespace-nowrap font-medium text-[#444] text-[11px] tracking-tight">
                      {card.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark Theme: Softree PLATFORM */}
          <div className="flex h-auto w-full flex-col overflow-hidden bg-[#151515] px-6 py-10 md:p-10 lg:h-[450px] lg:flex-row lg:p-12 rounded-b-sm">
            
            <div className="flex w-full flex-col justify-between gap-6 pr-0 lg:w-[340px] lg:shrink-0 lg:gap-0 lg:pr-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-2xl text-white leading-[1.2]">Softree</span>
                  <span className="rounded-sm border border-[rgba(63,255,221,0.5)] px-1.5 py-0.5 font-mono text-emerald-400 text-xs leading-normal uppercase">
                    Case Studies
                  </span>
                </div>
                <p className="text-[15px] text-white leading-[1.4] opacity-80 max-w-[280px]">
                  Explore how our custom-built AI agents solve complex problems, reduce manual overhead, and scale operations for our enterprise partners.
                </p>
              </div>
              <pre className="rounded-sm border border-white/10 bg-white/5 p-4 font-mono text-[10px] text-white/70 leading-[1.7] mt-4 lg:mt-0 max-w-[300px]">
                <code>
tools = session.tools()
agent = Agent(
  name=&quot;Assistant&quot;,
  tools=tools,
)
                </code>
              </pre>
              <a 
                className="inline-flex w-fit items-center justify-center bg-white rounded-sm px-4 py-2.5 font-mono text-black text-xs leading-normal tracking-[-0.28px] hover:bg-neutral-200 transition-colors uppercase mt-4 lg:mt-0" 
                href="/services/ai-agents"
              >
                Hire Us
              </a>
            </div>

            {/* Agent Grid */}
            <div className="mt-8 grid flex-1 grid-cols-2 gap-3 lg:mt-0 lg:grid-cols-3 content-start">
              {AGENTS.map((agent) => (
                <HoverableAgentCard key={agent.title} agent={agent} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
