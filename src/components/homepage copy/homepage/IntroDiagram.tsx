"use client"

/* ─────────────────────────────────────────────────────────────────────────────
   Softree Platform Diagram
   Adapted pixel-for-pixel from composio.dev hero diagram (composio.html)
   Layout reference stored in memory/reference_composio_design.md
   ───────────────────────────────────────────────────────────────────────────── */

function DotGrid() {
  return (
    <div
      className="inline-grid gap-[2px]"
      style={{ gridTemplateColumns: "repeat(10, 5px)", gridTemplateRows: "repeat(2, 5px)" }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="h-[5px] w-[5px] bg-white/[0.04]" />
      ))}
    </div>
  )
}

/* ── Left panel: softree_search_services ── */
function SearchServicesPanel() {
  const tools = [
    {
      label: "SHAREPOINT_CREATE_SITE",
      desc: "Provision a modern comm or team site",
      tag: "match",
    },
    {
      label: "SPFX_DEPLOY_WEBPART",
      desc: "Deploy SPFx web parts to SharePoint",
      tag: "match",
    },
    {
      label: "POWER_AUTOMATE_CREATE_FLOW",
      desc: "Build an approval workflow in Power Automate",
      tag: "match",
    },
  ]

  return (
    <div
      className="absolute z-[5] flex flex-col overflow-hidden border p-4 font-mono text-xs transition-colors duration-500 border-white/[0.08] bg-[#141414]/50"
      style={{ width: "27.4%", left: "13.7%", top: "7%", transform: "translateX(-50%)", opacity: 0.7, height: 360 }}
    >
      <div className="mb-1 text-[10px] text-white/30 uppercase tracking-wider">softree_search_services</div>
      <div className="min-h-0 flex-1">
        <div className="flex h-full flex-col">
          {/* Search bar */}
          <div className="mb-3 flex items-center gap-2 border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
            <svg className="shrink-0 text-white/20" fill="none" height="12" viewBox="0 0 12 12" width="12">
              <circle cx="5.25" cy="5.25" r="3.75" stroke="currentColor" strokeWidth="1" />
              <path d="M8 8l2.5 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1" />
            </svg>
            <span className="truncate font-mono text-[10px] text-white/35">migrate intranet to sharepoint online</span>
            <span className="ml-auto shrink-0 font-mono text-[9px] text-white/20">3 found</span>
          </div>

          {/* Tool rows */}
          <div className="flex flex-col gap-1.5">
            {tools.map((t) => (
              <div key={t.label} className="flex items-start gap-2.5 border border-white/[0.04] bg-white/[0.02] px-2.5 py-2">
                {/* SharePoint-style icon */}
                <div className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center bg-[#0078d4]/40">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <rect x="1" y="1" width="6" height="6" rx="0.5" stroke="#60a5fa" strokeWidth="0.8" />
                    <path d="M1 3h6" stroke="#60a5fa" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-[11px] text-white/40 leading-tight">{t.label}</div>
                  <div className="mt-0.5 truncate text-[10px] text-white/20 leading-tight">{t.desc}</div>
                </div>
                <span className="mt-0.5 shrink-0 bg-blue-500/20 px-1 py-px font-mono text-[8px] text-blue-400 uppercase tracking-wider">
                  {t.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Plan + Warnings */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <div className="mb-1 font-mono text-[9px] text-white/25 uppercase tracking-wider">Plan</div>
              <div className="flex flex-col gap-0.5">
                {["Provision SharePoint sites", "Configure modern nav & hub", "Enable AI search & Viva Topics"].map((s, i) => (
                  <div key={i} className="flex items-start gap-1.5 font-mono text-[10px] text-white/35 leading-tight">
                    <span className="text-white/15">{i + 1}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1 font-mono text-[9px] text-amber-500/40 uppercase tracking-wider">Warnings</div>
              <div className="flex flex-col gap-0.5">
                {["SharePoint admin consent required", "Tenant URL must be configured"].map((w, i) => (
                  <div key={i} className="flex items-start gap-1.5 font-mono text-[10px] text-white/25 leading-tight">
                    <span className="text-amber-500/40">!</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Center: Softree AI delivery agent chat ── */
function ChatPanel() {
  return (
    <div
      className="absolute z-10 flex flex-col overflow-hidden border shadow-2xl"
      style={{
        width: "35.5%",
        left: "50%",
        top: "7%",
        backgroundColor: "rgb(6, 13, 24)",
        borderColor: "rgba(0, 137, 255, 0.3)",
        borderRadius: 28,
        opacity: 1,
        transform: "translateX(-50%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 px-5 py-3">
        <div className="flex h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: "#0089ff" }}>
          <svg fill="none" height="10" viewBox="0 0 10 10" width="10">
            <path d="M2.5 5h5M5 2.5v5" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        </div>
        <span className="font-medium text-[13px]" style={{ color: "rgba(200, 225, 255, 0.9)" }}>
          Softree <span className="font-normal" style={{ color: "rgba(200,225,255,0.35)" }}>Delivery Agent</span>
        </span>
      </div>

      {/* Messages */}
      <div className="scrollbar-none flex h-[380px] flex-col gap-4 overflow-y-auto px-5 pt-5 pb-3" style={{ scrollbarWidth: "none" }}>
        {/* Client request */}
        <div style={{ opacity: 0.35 }}>
          <div className="flex justify-end">
            <div
              className="max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed"
              style={{ backgroundColor: "rgb(19, 32, 56)", color: "rgba(200, 225, 255, 0.9)", borderRadius: 24 }}
            >
              Migrate our intranet to SharePoint Online with 6 department sites, modern navigation, and AI-powered search
            </div>
          </div>
        </div>

        {/* Tool call indicators */}
        {["SOFTREE SEARCH SERVICES", "SOFTREE SANDBOX", "SOFTREE EXECUTE"].map((label, i) => (
          <div key={i} style={{ opacity: i < 2 ? 0.35 : 1 }}>
            <div className="inline-flex items-center gap-1 text-[12px] leading-none tracking-wide" style={{ color: "rgba(0, 137, 255, 0.6)" }}>
              <span className="font-medium uppercase">{label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        ))}

        {/* Intermediate result */}
        <div style={{ opacity: 0.35 }}>
          <div className="text-[15px] leading-relaxed" style={{ color: "rgba(200, 225, 255, 0.9)" }}>
            Provisioning 6 SharePoint sites in sandbox. Configuring hub navigation and deploying AI search connector...
          </div>
        </div>

        {/* Final result */}
        <div style={{ opacity: 1 }}>
          <div className="text-[15px] leading-relaxed" style={{ color: "rgba(200, 225, 255, 0.9)" }}>
            Migration complete. 6 SharePoint sites provisioned, hub navigation configured, Viva Topics AI search enabled across all departments.
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-3 pb-3">
        <div
          className="flex flex-col gap-2 px-4 pt-3 pb-2.5"
          style={{ backgroundColor: "rgb(19, 32, 56)", borderRadius: 24 }}
        >
          <span className="text-[14px]" style={{ color: "rgba(0, 137, 255, 0.4)" }}>Reply...</span>
          <div className="flex items-center justify-between">
            <svg fill="none" height="18" viewBox="0 0 18 18" width="18" style={{ color: "rgba(0, 137, 255, 0.4)" }}>
              <path d="M9 1.5v15M1.5 9h15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center text-[12px] leading-none" style={{ color: "rgba(0, 137, 255, 0.4)" }}>
                claude-sonnet-4
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 h-3 w-3" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "#0089ff" }}>
                <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
                  <path d="M7 12V2M7 2L3 6M7 2l4 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Right top: softree_manage_connections ── */
function ConnectionsPanel() {
  const connections = [
    { name: "Microsoft 365", sub: "OAuth 2.0", connected: true },
    { name: "SharePoint Online", sub: "OAuth 2.0", connected: true },
  ]
  return (
    <div
      className="absolute z-[5] flex flex-col overflow-hidden border p-4 font-mono text-xs transition-colors duration-500 border-white/[0.08] bg-[#141414]/50"
      style={{ width: "27.4%", left: "86.3%", top: "7%", transform: "translateX(-50%)", opacity: 0.7, height: 174 }}
    >
      <div className="mb-4 text-[10px] text-white/30 uppercase tracking-wider">softree_manage_connections</div>
      <div className="mb-4 text-[10px] text-white/20">CLIENT_ID: clt_softree01</div>
      <div className="flex flex-1 flex-col gap-2">
        {connections.map((c) => (
          <div key={c.name} className="flex items-center justify-between border px-2.5 py-2 border-white/[0.08] bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="flex h-[14px] w-[14px] items-center justify-center bg-[#0078d4]/60">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 1v6M1 4h6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] leading-tight text-white/50">{c.name}</span>
                <span className="text-[9px] leading-tight text-white/25">{c.sub}</span>
              </div>
            </div>
            {c.connected ? (
              <span className="flex items-center gap-1.5 text-[10px] text-green-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[10px] text-white/20">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/15" />
                —
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Right mid: softree_execute_service ── */
function ExecutePanel() {
  return (
    <div
      className="absolute z-[5] flex flex-col overflow-hidden border p-4 font-mono text-xs transition-colors duration-500 border-white/[0.08] bg-[#141414]/50"
      style={{ width: "27.4%", left: "86.3%", top: "38%", transform: "translateX(-50%)", opacity: 0.7, height: 174 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[10px] text-white/30 uppercase tracking-wider">softree_execute_service</div>
        <div className="text-[10px] text-white/20">SESSION: sx-m365</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-2.5 py-2">
          <div className="flex h-[14px] w-[14px] shrink-0 items-center justify-center bg-[#0078d4]/60">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="0.5" stroke="white" strokeWidth="0.8" />
              <path d="M1 3h6" stroke="white" strokeWidth="0.8" />
            </svg>
          </div>
          <span className="font-mono text-[11px] text-white/50 leading-tight">SHAREPOINT_CREATE_SITE</span>
        </div>
        <div className="flex flex-col gap-1 border border-white/[0.06] px-2.5 py-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/25">tenant</span>
            <span className="text-white/40">contoso.sharepoint.com</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/25">sites</span>
            <span className="text-white/40">HR → 6 dept sites</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/25">template</span>
            <span className="text-white/40">CommunicationSite</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-green-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>200 OK · 6 sites created</span>
        </div>
      </div>
    </div>
  )
}

/* ── Bottom-left CTA panel ── */
function CTAPanel() {
  return (
    <div
      className="absolute z-20 flex flex-col border border-white/[0.08] bg-[#141414]/50 p-4 font-mono text-xs"
      style={{ width: "27.4%", left: "13.7%", top: "70%", transform: "translateX(-50%)" }}
    >
      <h2 className="mb-4 font-mono text-sm text-white/60 uppercase tracking-wider">See Softree In Action</h2>
      <a
        className="flex w-fit items-center justify-center bg-white px-3 py-1.5 font-mono text-black text-xs leading-normal tracking-[-0.28px] transition-colors hover:bg-white/90"
        href="/contact"
      >
        BOOK A DISCOVERY CALL
      </a>
    </div>
  )
}

/* ── Bottom-right: delivery config ── */
function ConfigPanel() {
  return (
    <div
      className="absolute z-[5] flex flex-col border border-white/[0.08] bg-[#141414]/50 p-4 font-mono text-xs opacity-70"
      style={{ width: "27.4%", left: "86.3%", top: "70%", transform: "translateX(-50%)" }}
    >
      <div className="mb-3">
        <span className="text-[11px] text-white/40 uppercase tracking-wider">DELIVERY_CONFIG</span>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { label: "CLIENT", value: "Enterprise" },
          { label: "PROVIDER", value: "Softree Technology" },
          { label: "STACK", value: "Microsoft 365" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between border-white/[0.06] border-b pb-2 last:border-0 last:pb-0">
            <span className="text-[11px] text-white/30">{label}</span>
            <span className="text-[12px] text-white/70">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Sandbox section ── */
function SandboxSection() {
  const instances = [
    {
      label: "Provision & configure sites",
      status: "6 sites created · hub nav configured",
      code: `const sites = await softree.sharepoint.createSites({
  tenant: 'contoso.sharepoint.com',
  template: 'CommunicationSite',
  departments: ['HR','Finance','IT','Legal','Ops','Exec'],
})
await softree.sharepoint.configureHub({
  hubUrl: '/sites/intranet-home',
  associateSites: sites.map(s => s.url),
})`,
    },
    {
      label: "Enable AI search & Viva Topics",
      status: "AI search active · topics auto-generated",
      code: `const searchConfig = await softree.vivaTopics.enable({
  tenant: 'contoso.sharepoint.com',
  scope: 'AllSites',
})
await softree.search.deployConnector({
  sites: sites.map(s => s.url),
  crawler: 'continuous',
  aiIndex: true,
})`,
    },
  ]

  return (
    <div className="hidden w-full max-w-[1240px] border-white/[0.08] border-b px-[6.4%] pb-16 lg:block">
      <div
        className="overflow-hidden border p-4 font-mono text-xs transition-colors duration-500 border-white/[0.08] bg-[#141414]/50"
        style={{ opacity: 1 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[10px] text-white/30 uppercase tracking-wider">softree_pipeline</div>
          <div className="flex items-center gap-1.5 text-[9px] text-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            pipeline · typescript 5.x
          </div>
        </div>

        <div className="flex h-[110px] gap-3 overflow-hidden">
          {instances.map((inst) => (
            <div key={inst.label} className="flex h-full flex-1 flex-col border transition-all duration-300 border-white/[0.08] bg-[#111]">
              <div className="flex items-center justify-between border-white/[0.06] border-b p-2">
                <div className="flex items-center gap-2">
                  <DotGrid />
                  <span className="text-[9px] text-white/30 uppercase tracking-wider">{inst.label}</span>
                </div>
                <span className="text-[8px] text-white/20">{inst.status}</span>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden px-2 py-1.5">
                <pre className="overflow-hidden font-mono text-[9px] text-white/30 leading-[1.5]">{inst.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main export ── */
export function IntroDiagram() {
  return (
    <div className="w-full bg-[#0e0e0e] flex flex-col items-center">
      {/* Floating diagram — desktop only */}
      <div className="relative mt-6 hidden h-[620px] w-full max-w-[1240px] overflow-hidden border-white/[0.08] border-t lg:block">
        {/* SVG connector lines overlay */}
        <svg
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1240 620"
        >
          {/* Left panel → center */}
          <path d="M340 165 Q560 165 440 310" stroke="rgba(0,137,255,0.12)" strokeWidth="1" fill="none" />
          {/* Center → right panel */}
          <path d="M800 165 Q900 165 900 90" stroke="rgba(0,137,255,0.12)" strokeWidth="1" fill="none" />
          {/* Center → right execute */}
          <path d="M800 310 Q900 310 900 273" stroke="rgba(0,137,255,0.12)" strokeWidth="1" fill="none" />
        </svg>

        <CTAPanel />
        <ChatPanel />
        <SearchServicesPanel />
        <ConnectionsPanel />
        <ExecutePanel />
        <ConfigPanel />
      </div>

      {/* Sandbox — desktop only */}
      <SandboxSection />
    </div>
  )
}
