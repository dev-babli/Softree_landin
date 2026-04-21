"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/* ================================================================== */
/*  VISUAL DEMO PANELS                                                  */
/* ================================================================== */

function SharePointVisual() {
  return (
    <div className="w-full max-w-[340px] overflow-hidden border border-white/[0.12] bg-[#141414] font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ height: 315 }}>
      <div className="p-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
            <svg className="shrink-0 text-white/20" fill="none" height="12" viewBox="0 0 12 12" width="12">
              <circle cx="5.25" cy="5.25" r="3.75" stroke="currentColor" strokeWidth="1" />
              <path d="M8 8l2.5 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1" />
            </svg>
            <span className="truncate font-mono text-[10px] text-white/35">migrate intranet portal to modern SharePoint</span>
            <span className="ml-auto shrink-0 font-mono text-[9px] text-white/20">4 phases</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {[
              { icon: "🔷", name: "SHAREPOINT_SITE_PROVISION", desc: "Create modern comm sites with hub nav", tag: "active" },
              { icon: "⚡", name: "SPFX_WEBPART_DEPLOY", desc: "Custom React webparts with Fluent UI", tag: "active" },
              { icon: "🔄", name: "POWER_AUTOMATE_FLOW", desc: "Approval workflows with Teams notifications", tag: "queued" },
              { icon: "📊", name: "POWER_BI_EMBED", desc: "Dashboard integration in SharePoint pages", tag: null },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 border border-white/[0.04] bg-white/[0.02] px-2.5 py-2">
                <span className="mt-0.5 text-sm shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-[11px] text-white/40 leading-tight">{item.name}</div>
                  <div className="mt-0.5 truncate text-[10px] text-white/20 leading-tight">{item.desc}</div>
                </div>
                {item.tag && (
                  <span className={`mt-0.5 shrink-0 px-1 py-px font-mono text-[8px] uppercase tracking-wider ${item.tag === "active" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"}`}>{item.tag}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <div className="mb-1 font-mono text-[9px] text-white/25 uppercase tracking-wider">Delivery Plan</div>
              <div className="flex flex-col gap-0.5">
                {["Discovery & Architecture", "SPFx Development Sprint", "Integration & UAT"].map((step, i) => (
                  <div key={i} className="flex items-start gap-1.5 font-mono text-[10px] text-white/35 leading-tight">
                    <span className="text-white/15">{i + 1}</span><span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1 font-mono text-[9px] text-green-400/50 uppercase tracking-wider">Status</div>
              <div className="flex flex-col gap-0.5">
                {["98% client satisfaction", "200+ projects delivered"].map((s, i) => (
                  <div key={i} className="flex items-start gap-1.5 font-mono text-[10px] text-white/25 leading-tight">
                    <span className="text-green-400/40">✓</span><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="flex h-[320px] w-[340px] flex-col gap-0 border border-white/[0.12] bg-[#141414] font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col gap-1.5 p-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-[10px] text-white/40">AI_DOCUMENT_PROCESSOR</span>
          <span className="ml-auto text-[9px] text-white/20">v3.2.1</span>
        </div>
        <div className="flex flex-col gap-0.5 pl-[22px] text-[10px]">
          <div className="flex gap-2"><span className="text-white/20">input:</span><span className="text-white/35">&quot;invoice_batch_Q4.pdf&quot;</span></div>
        </div>
      </div>
      <div className="mx-3 flex items-start gap-2 border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
        <span className="mt-px font-medium text-[9px] text-amber-400/70">processing</span>
        <span className="text-[10px] text-white/30 leading-[1.4]">Extracting 847 line items across 34 invoices with GPT-4o vision...</span>
      </div>
      <div className="relative -mx-3 mt-2 flex flex-col gap-2 px-4 py-3 font-mono shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-blue-500/30 border-y bg-[#0a1628]">
        <div className="flex items-center gap-2">
          <span className="text-sm">✨</span>
          <span className="text-[#0089ff] text-[9px] uppercase tracking-wider">Softree AI Engine</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] text-white/35">Classification accuracy: 99.2% across 6 invoice categories</span>
          <span className="text-[9px] text-white/35">Auto-routing to Power Automate approval flows</span>
          <span className="font-medium text-[#0089ff] text-[9px]">847 items → 34 approved invoices</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 p-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <span className="text-[10px] text-white/40">POWER_BI_DASHBOARD</span>
          <span className="ml-auto text-[9px] text-white/30">live</span>
        </div>
        <div className="flex flex-col gap-0.5 pl-[22px] text-[10px]">
          <div className="flex gap-2"><span className="text-white/20">report:</span><span className="text-white/35">&quot;Q4 Financial Summary&quot;</span></div>
        </div>
      </div>
      <div className="mx-3 flex items-start gap-2 border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
        <span className="mt-px font-medium text-[9px] text-green-400/70">200</span>
        <span className="text-[10px] text-white/30 leading-[1.4]">Dashboard refreshed · 34 new records · exec summary generated</span>
      </div>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="flex h-[320px] w-[340px] flex-col border border-white/[0.12] bg-[#141414] font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between border-white/[0.06] border-b px-3 py-2">
        <span className="text-[9px] text-white/30 uppercase tracking-wider">Secure Delivery Pipeline</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="text-[9px] text-white/20">all checks passed</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
        {[
          { label: "Code Review", status: "passed", detail: "0 critical findings · SAST complete", color: "text-green-400/50" },
          { label: "Security Scan", status: "passed", detail: "Azure AD SSO · MFA enforced · RBAC configured", color: "text-green-400/50" },
          { label: "Compliance", status: "passed", detail: "SOC 2 Type II · ISO 27001 aligned", color: "text-green-400/50" },
          { label: "Pen Test", status: "passed", detail: "0 vulnerabilities · OWASP Top 10 verified", color: "text-green-400/50" },
          { label: "Data Protection", status: "active", detail: "AES-256 encryption · DLP policies applied", color: "text-blue-400/50" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-start gap-1">
            <div className="flex w-full items-center gap-2 border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
              <span className={`text-[9px] uppercase tracking-wider ${item.color}`}>{item.status === "passed" ? "✓" : "●"} {item.label}</span>
              <span className="ml-auto text-[9px] text-white/20">{item.status}</span>
            </div>
            <div className="pl-4 text-[10px] text-white/25 leading-[1.5]">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullStackVisual() {
  return (
    <div className="max-h-[320px] w-[340px] overflow-hidden border border-white/[0.12] bg-[#141414] font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ height: 291 }}>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-grid gap-[2px]" style={{ gridTemplateColumns: "repeat(10, 5px)", gridTemplateRows: "repeat(2, 5px)" }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-[5px] w-[5px] bg-white/[0.04]" />
              ))}
            </div>
            <span className="text-[9px] text-white/30 uppercase tracking-wider">Build &amp; deploy pipeline</span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 text-[9px] text-white/20">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
            <span className="w-[100px] text-right">exit 0</span>
          </div>
        </div>
        <div className="border border-white/[0.08] bg-[#111]">
          <div className="max-h-[200px] overflow-hidden px-2.5 py-2" style={{ maskImage: "linear-gradient(black 80%, transparent 100%)" }}>
            <pre className="font-mono text-[9px] leading-[1.6] text-white/30">{`// Softree Full-Stack Pipeline
const stack = {
  frontend: ['Next.js 16', 'React 19', 'TailwindCSS'],
  mobile: ['React Native', 'Expo'],
  backend: ['Node.js', 'Drizzle ORM'],
  cloud: ['Azure', 'Vercel', 'Turso'],
  ai: ['OpenAI', 'Anthropic', 'Groq']
};

await pipeline.run({
  lint: 'eslint --fix',
  typeCheck: 'tsc --noEmit',
  build: 'next build',
  deploy: 'vercel --prod',
  monitor: 'azure-insights'
});

// Result: 99.9% uptime SLA`}</pre>
          </div>
          <div className="border-white/[0.06] border-t px-2.5 py-2">
            <div className="flex flex-col gap-0.5">
              <div className="font-mono text-[9px] text-white/25 leading-[1.5]">Build time: 24s · Bundle: 142kB gzip</div>
              <div className="font-mono text-[9px] text-green-400/50 leading-[1.5]">✓ Deployed to production · Lighthouse 98/100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  TAB DATA                                                            */
/* ================================================================== */

interface TabItem {
  id: number;
  label: string;
  heading: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
}

const TABS: TabItem[] = [
  {
    id: 1,
    label: "SMART SOLUTIONS",
    heading: "Solutions that scale",
    description: "From SharePoint intranets to Power Platform apps — we architect Microsoft solutions purpose-built for your enterprise workflows.",
    bullets: [
      "SharePoint Online, SPFx, and Power Platform expertise",
      "End-to-end delivery from architecture to deployment",
      "Solutions built on Microsoft best practices and proven patterns",
    ],
    visual: <SharePointVisual />,
  },
  {
    id: 2,
    label: "AI INTEGRATION",
    heading: "AI that delivers",
    description: "We embed intelligence directly into your business processes. Not generic chatbots — targeted AI that automates real work.",
    bullets: [
      "Custom AI models trained on your domain data",
      "Intelligent document processing and workflow automation",
      "Seamless integration with existing Microsoft stack",
    ],
    visual: <AIVisual />,
  },
  {
    id: 3,
    label: "TRUSTED DELIVERY",
    heading: "Delivery you trust",
    description: "Enterprise-grade security and compliance built into every engagement. Your data stays protected at every layer.",
    bullets: [
      "SOC 2 and ISO 27001 aligned processes",
      "Azure AD SSO, MFA, and RBAC built-in to every solution",
      "200+ projects delivered with 98% client satisfaction",
    ],
    visual: <SecurityVisual />,
  },
  {
    id: 4,
    label: "FULL STACK",
    heading: "Modern engineering",
    description: "High-performance web and mobile applications built with the latest frameworks. From concept to production in weeks, not months.",
    bullets: [
      "Next.js, React 19, React Native — modern stack, no legacy debt",
      "Cloud-native deployments on Azure and Vercel",
      "CI/CD, monitoring, and 99.9% uptime SLA",
    ],
    visual: <FullStackVisual />,
  },
];

/* ================================================================== */
/*  DECORATIVE STRIPE                                                   */
/* ================================================================== */

function DecorativeStripe({ i }: { i: number }) {
  const patterns = [
    ["#1a1a1a", "rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)", "#1a1a1a", "rgba(255,255,255,0.02)"],
    ["#1a1a1a", "rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)", "#1a1a1a", "rgba(255,255,255,0.02)"],
    ["rgba(255,255,255,0.02)", "#1a1a1a", "rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)", "#1a1a1a"],
    ["#1a1a1a", "rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)", "#1a1a1a", "rgba(255,255,255,0.02)"],
  ];
  const colors = patterns[i] ?? patterns[0];
  return (
    <div className="flex h-[14px] w-full">
      {colors.map((c, j) => (
        <div key={j} className="h-full flex-1 border border-[#2c2c2c]" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  STICKY CARD — Composio layout + Skiper16 scale                     */
/* ================================================================== */

interface CardProps {
  tab: TabItem;
  i: number;
  total: number;
  setCardRef: (el: HTMLDivElement | null, i: number) => void;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function StickyCard({ tab, i, total, setCardRef, progress }: CardProps) {
  // Skiper16: earlier cards scale down as later ones stack on top
  const targetScale = Math.max(0.85, 1 - (total - i - 1) * 0.04);
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <>
      <div className="pointer-events-none h-0" />
      <div
        ref={(el) => setCardRef(el, i)}
        className="lg:sticky"
        style={{ top: 96, zIndex: i + 1 }}
      >
        <motion.div style={{ scale }} className="origin-top">
          {/* Card body — exact Composio structure */}
          <div className="flex flex-col border border-[#2c2c2c] bg-[#1a1a1a] lg:min-h-[400px] lg:flex-row lg:items-start lg:gap-[24px] lg:py-0 lg:pr-[30px] lg:pl-0 xl:gap-[30px] xl:pr-[40px]">

            {/* Visual panel (left 55%) */}
            <div
              className="relative flex h-[240px] w-full items-center justify-center overflow-hidden sm:h-[280px] md:h-[320px] lg:h-auto lg:w-[55%] lg:shrink-0 lg:self-stretch xl:w-[580px]"
              style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(0,137,255,0.05) 0%, transparent 70%)" }}
            >
              <div className="scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-100">
                <div className="flex h-full w-full items-center justify-center">
                  {tab.visual}
                </div>
              </div>
            </div>

            {/* Text content (right) */}
            <div className="flex w-full min-w-0 flex-1 flex-col px-4 pt-4 pb-5 sm:px-5 lg:px-0 lg:pt-[30px] lg:pb-[30px]">
              <div className="flex flex-col gap-3">
                <div className="flex size-7 items-center justify-center rounded-[2px] bg-[rgba(255,255,255,0.08)] font-mono text-[rgba(255,255,255,0.64)] text-sm">
                  {String(tab.id).padStart(2, "0")}
                </div>
                <h3 className="text-[#f6f6f6] text-[22px] leading-[1.2] sm:text-[26px] lg:text-[28px]">
                  {tab.heading}
                </h3>
              </div>
              <p className="mt-3 text-[#f6f6f6] text-[13px] leading-[1.4] opacity-80 sm:text-sm sm:leading-[1.2] lg:mt-4">
                {tab.description}
              </p>
              <div className="relative mt-5 flex flex-col gap-4 sm:mt-6 lg:mt-10">
                <div className="absolute top-0 bottom-0 left-0 w-[3px] rounded-[37px] bg-[rgba(255,255,255,0.24)]" />
                {tab.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className="relative z-10 mt-[2px] h-[14px] w-[3px] shrink-0 rounded-[37px] bg-[rgba(255,255,255,0.56)]" />
                    <p className="text-[13px] text-[rgba(255,255,255,0.8)] leading-[1.3] sm:text-sm sm:leading-[1.2] lg:w-[215px]">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DecorativeStripe i={i} />
        </motion.div>
      </div>
    </>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                      */
/* ================================================================== */

export function WhySoftreeSection() {
  const [activeTab, setActiveTab] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Skiper16: ref only on the cards column — not the whole section
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end start"],
  });

  // Drive the sidebar highlight from scrollYProgress — no IntersectionObserver needed
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * TABS.length), TABS.length - 1);
    setActiveTab(idx);
  });

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  const handleTabClick = useCallback((i: number) => {
    setActiveTab(i);
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="bg-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-10 pb-10 md:px-6 md:pt-[86px] md:pb-[72px] lg:px-6 xl:px-0">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 py-4 sm:gap-6 sm:py-0">
          <div className="flex items-center gap-2 self-start border border-white px-2 py-1">
            <div className="size-[5.82px] bg-white" />
            <span className="font-mono text-sm text-white leading-normal tracking-[-0.28px]">WHY SOFTREE</span>
          </div>
          <h2 className="max-w-[540px] text-3xl text-[#f6f6f6] leading-none md:text-4xl lg:text-[48px]">
            Your business is complex.<br />Your tech partner should be too.
          </h2>
        </div>

        {/* ── Tabs + Content ── */}
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 md:mt-[79px] lg:flex-row lg:gap-[30px] xl:gap-[58px]">

          {/* Mobile horizontal tabs (hidden on lg) */}
          <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex lg:hidden">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(i)}
                type="button"
                className={`flex shrink-0 items-center gap-2 border px-3 py-2 text-left transition-all duration-300 ${activeTab === i ? "border-[#0089ff] bg-[rgba(0,137,255,0.08)]" : "border-[#2c2c2c]"}`}
              >
                <span className={`flex size-[20px] items-center justify-center rounded-[2px] font-mono text-xs tracking-[-0.98px] ${activeTab === i ? "bg-[#0089ff] text-[#172736]" : "bg-[#1a1a1a] text-[rgba(255,255,255,0.56)]"}`}>
                  {String(tab.id).padStart(2, "0")}
                </span>
                <span className="font-mono text-white text-xs leading-normal tracking-[-0.28px]">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop sidebar (hidden below lg) */}
          <div className="hidden lg:block lg:w-[226px] lg:shrink-0">
            <div className="lg:sticky" style={{ top: 96 }}>
              <div className="relative">
                <div className="absolute inset-0 hidden border border-[#2c2c2c] lg:block" />
                <div className="relative flex overflow-x-auto lg:flex-col">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(i)}
                      type="button"
                      className={`flex min-w-[160px] shrink-0 items-center gap-[14px] border p-[10px] text-left transition-all duration-300 lg:w-full lg:min-w-0 ${activeTab === i ? "border-[#0089ff]" : "border-[#2c2c2c]"}`}
                      style={activeTab === i ? { backgroundImage: "linear-gradient(90deg, rgba(0,137,255,0.12) 0%, rgba(0,137,255,0.12) 100%), linear-gradient(90deg, #1a1a1a 0%, #1a1a1a 100%)" } : undefined}
                    >
                      <span className={`flex size-[23px] items-center justify-center rounded-[2px] p-0.5 font-mono text-sm tracking-[-0.98px] transition-colors duration-300 ${activeTab === i ? "bg-[#0089ff] text-[#172736]" : "bg-[#1a1a1a] text-[rgba(255,255,255,0.56)]"}`}>
                        {String(tab.id).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm text-white leading-normal tracking-[-0.28px]">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards column — THIS is the Skiper16 scroll target */}
          <div ref={cardsContainerRef} className="flex-1 pb-[60vh]">
            {TABS.map((tab, i) => (
              <StickyCard
                key={tab.id}
                tab={tab}
                i={i}
                total={TABS.length}
                setCardRef={setCardRef}
                progress={scrollYProgress}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhySoftreeSection;
