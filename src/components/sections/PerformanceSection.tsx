"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import type { CSSProperties } from "react"

// ─── Rolling digit ────────────────────────────────────────────────────────────
function RollingDigit({
  final: finalDigit,
  between,
  dir = "from-below",
  delay = 0,
  triggered,
}: {
  final: string
  between: string[]
  dir?: "from-below" | "from-above"
  delay?: number
  triggered: boolean
}) {
  const n = between.length + 1
  const pct = (n - 1) * 100
  const startY = dir === "from-below" ? `${pct}%` : "0%"
  const endY = dir === "from-below" ? "0%" : `-${pct}%`
  const items = [...between, finalDigit]

  return (
    <span
      className="rolling-number relative inline-flex items-center overflow-hidden"
      style={{ verticalAlign: "baseline" }}
    >
      <span className="opacity-0">{finalDigit}</span>
      <span
        className={`absolute inset-0 flex items-center will-change-transform ${
          dir === "from-below" ? "flex-col-reverse" : "flex-col"
        }`}
        style={{
          transform: triggered ? `translateY(${endY})` : `translateY(${startY})`,
          transition: triggered
            ? `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            : "none",
        }}
      >
        {items.map((d, i) => (
          <span key={i} style={{ height: "1em", lineHeight: 1, display: "flex", alignItems: "center" }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

// ─── Entrance animation helper ────────────────────────────────────────────────
function enter(
  triggered: boolean,
  delay: number,
  axis: "y" | "x" = "y",
  distance = 28
): CSSProperties {
  const transform = triggered
    ? "none"
    : axis === "y"
    ? `translateY(${distance}px)`
    : `translateX(${distance}px)`
  return {
    opacity: triggered ? 1 : 0,
    transform,
    transition: triggered
      ? `opacity 750ms ease-out ${delay}ms, transform 950ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      : "none",
  }
}

// ─── Hero background canvas ───────────────────────────────────────────────────
function MainHeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-35 mix-blend-screen">
      <svg className="h-full w-full max-w-[900px]" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <g stroke="#3a7a3a" strokeWidth="1" fill="none">
          <path d="M 0,300 Q 500,600 1000,300 M 0,250 Q 500,500 1000,250 M 0,350 Q 500,700 1000,350" opacity="0.25" />
          <path d="M 200,0 L 200,600 M 400,0 L 400,600 M 600,0 L 600,600 M 800,0 L 800,600" opacity="0.08" />
          <circle cx="500" cy="300" r="160" strokeDasharray="10 10">
            <animateTransform attributeName="transform" type="rotate" from="0 500 300" to="360 500 300" dur="60s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="300" r="270" strokeDasharray="2 10" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="360 500 300" to="0 500 300" dur="100s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="300" r="380" strokeDasharray="5 15" opacity="0.2">
            <animateTransform attributeName="transform" type="rotate" from="0 500 300" to="360 500 300" dur="140s" repeatCount="indefinite" />
          </circle>
        </g>
        <g fill="#5cb85c">
          <circle cx="500" cy="300" r="5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="660" cy="200" r="3" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3.1s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="400" r="3" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}

// ─── Pulse node for stat cards ────────────────────────────────────────────────
function PulseNode({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
      <svg className="absolute h-[160%] w-[160%] opacity-15" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="5 5">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="22" fill="none" stroke={color} strokeWidth="1">
          <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="12s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="relative z-10 size-3.5 rounded-full" style={{ backgroundColor: color }}>
        <div className="absolute inset-0 animate-ping rounded-full opacity-40" style={{ backgroundColor: color }} />
      </div>
    </div>
  )
}

// ─── Card visual: Custom AI Agents ───────────────────────────────────────────
function CardVisualAgents() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 480 340" fill="none">
      <line x1="240" y1="170" x2="100" y2="85"  stroke="#f97316" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
      <line x1="240" y1="170" x2="380" y2="85"  stroke="#f97316" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
      <line x1="240" y1="170" x2="100" y2="260" stroke="#f97316" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
      <line x1="240" y1="170" x2="380" y2="260" stroke="#f97316" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
      <line x1="240" y1="170" x2="240" y2="50"  stroke="#f97316" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />

      {/* Central node */}
      <circle cx="240" cy="170" r="38" fill="#fff7f0" stroke="#f97316" strokeWidth="2" />
      <circle cx="240" cy="170" r="38" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.3">
        <animate attributeName="r" values="38;54;38" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="240" y="165" fill="#c2410c" fontSize="9.5" textAnchor="middle" fontWeight="800" letterSpacing="0.08em">SOFTREE</text>
      <text x="240" y="179" fill="#f97316" fontSize="7.5" textAnchor="middle" opacity="0.9">Orchestrator</text>

      {[
        { cx: 100, cy: 85,  label: "Sales",    sub: "Agent", dur: "2.8s" },
        { cx: 380, cy: 85,  label: "Ops",      sub: "Agent", dur: "3.3s" },
        { cx: 100, cy: 260, label: "Finance",  sub: "Agent", dur: "2.5s" },
        { cx: 380, cy: 260, label: "Data",     sub: "Agent", dur: "3.6s" },
        { cx: 240, cy: 50,  label: "Security", sub: "Agent", dur: "4.0s" },
      ].map(({ cx, cy, label, sub, dur }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="26" fill="#fff7f0" stroke="#f97316" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="26" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.25">
            <animate attributeName="r" values="26;36;26" dur={dur} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0;0.25" dur={dur} repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy - 3} fill="#c2410c" fontSize="7.5" textAnchor="middle" fontWeight="700">{label}</text>
          <text x={cx} y={cy + 8} fill="#f97316" fontSize="6.5" textAnchor="middle" opacity="0.8">{sub}</text>
        </g>
      ))}

      {/* Traveling signal dots */}
      {[
        { path: "M240,170 L100,85",  dur: "1.6s" },
        { path: "M240,170 L380,85",  dur: "2.0s" },
        { path: "M240,170 L100,260", dur: "1.8s" },
        { path: "M240,170 L380,260", dur: "2.2s" },
        { path: "M240,170 L240,50",  dur: "1.4s" },
      ].map(({ path, dur }, i) => (
        <circle key={i} r="3.5" fill="#f97316" opacity="0.9">
          <animateMotion path={path} dur={dur} repeatCount="indefinite" calcMode="linear" />
        </circle>
      ))}
    </svg>
  )
}

// ─── Card visual: Real-time Analytics ────────────────────────────────────────
function CardVisualAnalytics() {
  const bars = [38, 55, 42, 70, 58, 82, 67, 90, 74, 85, 92, 78]
  return (
    <svg width="100%" height="100%" viewBox="0 0 480 320" fill="none">
      <rect x="20" y="20" width="440" height="280" rx="14" fill="#fff7f0" stroke="#fdba74" strokeWidth="0.8" />
      <text x="42" y="52" fill="#c2410c" fontSize="10" fontWeight="800" letterSpacing="0.06em">LIVE WORKFLOW DASHBOARD</text>
      <circle cx="438" cy="47" r="5" fill="#f97316">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="426" y="51" fill="#f97316" fontSize="8" textAnchor="end" fontWeight="700">LIVE</text>

      {[220, 190, 160, 130].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="444" y2={y} stroke="#fdba74" strokeWidth="0.5" strokeDasharray="3 5" />
      ))}

      {bars.map((h, i) => {
        const barH = (h / 100) * 100
        const x = 48 + i * 33
        return (
          <g key={i}>
            <rect x={x} y={225 - barH} width="20" height={barH} rx="4" fill="#fed7aa" />
            <rect x={x} y={225 - barH} width="20" height={9} rx="4" fill="#f97316" />
          </g>
        )
      })}

      <polyline
        points="58,195 91,178 124,190 157,162 190,172 223,144 256,155 289,126 322,138 355,122 388,110 421,104"
        stroke="#c2410c" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"
      />

      {[
        { x: 55,  label: "Throughput", val: "↑ 94%" },
        { x: 190, label: "Uptime",     val: "99.9%" },
        { x: 325, label: "Latency",    val: "↓ 12ms" },
      ].map(({ x, label, val }) => (
        <g key={label}>
          <rect x={x} y="240" width="110" height="38" rx="8" fill="#fff7f0" stroke="#fdba74" strokeWidth="0.8" />
          <text x={x + 55} y="255" fill="#9a3412" fontSize="8" textAnchor="middle" opacity="0.7">{label}</text>
          <text x={x + 55} y="270" fill="#c2410c" fontSize="10" textAnchor="middle" fontWeight="800">{val}</text>
        </g>
      ))}
    </svg>
  )
}

// ─── Card visual: Deep Integrations ──────────────────────────────────────────
const SPOKES = [
  { angle: -90,  label: "Salesforce",  color: "#f97316", dur: "1.6s" },
  { angle: -30,  label: "SAP ERP",     color: "#a67cff", dur: "2.1s" },
  { angle:  30,  label: "PostgreSQL",  color: "#60a5fa", dur: "1.8s" },
  { angle:  90,  label: "REST APIs",   color: "#f97316", dur: "2.3s" },
  { angle: 150,  label: "Slack",       color: "#a67cff", dur: "1.5s" },
  { angle: 210,  label: "HubSpot",     color: "#60a5fa", dur: "2.5s" },
]

function CardVisualIntegrations() {
  const cx = 240, cy = 165, r = 98
  return (
    <svg width="100%" height="100%" viewBox="0 0 480 330" fill="none">
      {SPOKES.map(({ angle, label, color, dur }) => {
        const rad = (angle * Math.PI) / 180
        const nx = cx + r * Math.cos(rad)
        const ny = cy + r * Math.sin(rad)
        return (
          <g key={label}>
            <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
            <circle cx={nx} cy={ny} r="25" fill="#fafafa" stroke={color} strokeWidth="1.5" />
            <text x={nx} y={ny + 4} fill={color} fontSize="7" textAnchor="middle" fontWeight="700">{label}</text>
            <circle r="3.5" fill={color} opacity="0.9">
              <animateMotion path={`M${cx},${cy} L${nx},${ny}`} dur={dur} repeatCount="indefinite" calcMode="linear" />
            </circle>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="40" fill="#fff7f0" stroke="#f97316" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="40" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.3">
        <animate attributeName="r" values="40;56;40" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <text x={cx} y={cy - 6} fill="#c2410c" fontSize="9" textAnchor="middle" fontWeight="800" letterSpacing="0.06em">SOFTREE</text>
      <text x={cx} y={cy + 8} fill="#f97316" fontSize="7.5" textAnchor="middle" opacity="0.9">Integration Hub</text>
      <text x={cx} y="310" fill="#9a3412" fontSize="9" textAnchor="middle" opacity="0.6" fontWeight="600">240+ native connectors</text>
    </svg>
  )
}

// ─── Card stack data ──────────────────────────────────────────────────────────
const CARDS = [
  {
    badge: "01 — Deploy",
    heading: "Custom AI agents",
    body: "Deploy purpose-built agents for every business function — sales, operations, finance, and beyond — in hours, not months.",
    stat: "406",
    statLabel: "Active agents across customers",
    accent: "#f97316",
    href: "/products/agents",
    Visual: CardVisualAgents,
  },
  {
    badge: "02 — Observe",
    heading: "Real-time observability",
    body: "Live dashboards tracking every workflow, decision, and outcome as they happen — with full audit trails and anomaly alerts.",
    stat: "99.9%",
    statLabel: "Platform uptime SLA",
    accent: "#a67cff",
    href: "/products/analytics",
    Visual: CardVisualAnalytics,
  },
  {
    badge: "03 — Connect",
    heading: "Deep integrations",
    body: "Connect Softree to your existing stack instantly — CRMs, ERPs, databases, and external APIs — with 240+ native connectors.",
    stat: "240+",
    statLabel: "Native connectors available",
    accent: "#60a5fa",
    href: "/products/integrations",
    Visual: CardVisualIntegrations,
  },
]

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PerformanceSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const cluster3Ref = useRef<HTMLDivElement>(null)
  const stackRef    = useRef<HTMLDivElement>(null)

  const [inView,      setInView]      = useState(false)
  const [triggered,   setTriggered]   = useState(false)
  const [c3InView,    setC3InView]    = useState(false)
  const [activeCard,  setActiveCard]  = useState(0)

  // Cluster 1+2: bg color fires at 3% visible
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.03 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Cluster 1+2: element animations fire at 10%
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Cluster 3: color switch fires as soon as it enters viewport
  useEffect(() => {
    const el = cluster3Ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setC3InView(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Card stack scroll tracking
  const handleScroll = useCallback(() => {
    const el = stackRef.current
    if (!el) return
    const { top, height } = el.getBoundingClientRect()
    const vh = window.innerHeight
    const scrolled = Math.max(0, -top)
    const total = Math.max(1, height - vh)
    const p = Math.min(1, scrolled / total)
    setActiveCard(Math.min(CARDS.length - 1, Math.floor(p * CARDS.length)))
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <section data-section="performance" className="w-full">

      {/* ===================================================================
          DARK CLUSTER — cinematic green bg transition (Clusters 1+2)
          =================================================================== */}
      <div
        ref={wrapperRef}
        style={{
          backgroundColor: inView ? "#112817" : "#030804",
          transition: "background-color 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="text-white"
      >

        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden py-32 md:py-52">
          <div style={enter(triggered, 0)}>
            <MainHeroCanvas />
          </div>

          <div className="relative mx-auto px-6 lg:px-12 max-w-[1440px]" style={enter(triggered, 350)}>
            <h3 className="mx-auto w-full max-w-[860px] text-center font-medium leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.1rem)" }}>
              <span className="relative z-10 inline-block">Agentic AI performance</span>{" "}
              <span className="inline-block translate-y-1 align-middle mr-2">
                <svg width="77" height="72" viewBox="0 0 77 72" fill="none" style={{ width: "0.9em", height: "auto", display: "inline-block" }}>
                  <path opacity="0.65"
                    d="M18.6729 41.6514L5.36572 49.1829C4.11136 49.8928 3.33594 51.2227 3.33594 52.664V63.3357C3.33594 65.5449 5.1268 67.3357 7.33594 67.3357H69.999C72.2082 67.3357 73.999 65.5449 73.999 63.3357V13.276C73.999 9.87263 70.0192 8.02409 67.4186 10.2196L60.4305 16.1193L35.6746 38.4773C35.0674 39.0257 34.3066 39.3747 33.4949 39.4772L20.1418 41.1641C19.6251 41.2294 19.1261 41.3949 18.6729 41.6514Z"
                    fill="url(#perf_grad)" />
                  <defs>
                    <linearGradient id="perf_grad" x1="38.6675" y1="4.66406" x2="38.6675" y2="67.3357" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#09CF58" />
                      <stop offset="1" stopColor="#09CF58" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="inline">you can measure, outcomes that drive your business.</span>
            </h3>
          </div>

          <div className="absolute inset-0 mx-auto max-w-[1440px] pointer-events-none">
            {/* Top-left node */}
            <div
              className="absolute top-12 left-6 aspect-square w-[18%] max-w-[160px] md:top-28 md:left-[10%] md:max-w-[180px]"
              style={enter(triggered, 550, "x", -30)}
            >
              <div className="relative h-full w-full rounded-xl border border-[#2d5a2d] bg-[#0f1f10]/80 backdrop-blur-md">
                <PulseNode color="#5cb85c" />
              </div>
            </div>

            {/* Right pills */}
            <div
              className="absolute top-[22%] right-[4%] hidden w-full max-w-[36%] flex-col gap-3 sm:top-[18%] sm:right-[12%] md:flex md:max-w-[30%] z-10"
              style={enter(triggered, 600, "x", 40)}
            >
              <div className="flex min-h-[38px] max-w-max items-center gap-4 rounded-full border border-[#2d5a2d] bg-[#0d1e0e]/85 px-4 py-2 whitespace-nowrap backdrop-blur-md">
                <div className="text-xs font-medium tracking-wide text-[#cfd7c7]">Workflow Automation</div>
                <div className="flex items-center gap-3">
                  <div className="flex text-sm font-semibold tracking-tight text-white leading-none">
                    <RollingDigit final="9" between={["1","5","4"]} dir="from-below" triggered={triggered} />
                    <RollingDigit final="6" between={["9","1","3"]} dir="from-above" delay={60} triggered={triggered} />
                    <span className="opacity-70">%</span>
                  </div>
                  <div className="flex items-center gap-[2.5px]">
                    {[0,1,2,3,4].map((i) => (
                      <div key={i} className="relative size-2 rounded-full bg-[#5cb85c]">
                        {i === 4 && <div className="absolute inset-[2px] rounded-full bg-[#0d1e0e]" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex min-h-[38px] max-w-max translate-x-10 items-center gap-4 rounded-full border border-[#2d5a2d] bg-[#0d1e0e]/85 px-4 py-2 whitespace-nowrap backdrop-blur-md">
                <div className="text-xs font-medium tracking-wide text-[#cfd7c7]">Task Accuracy</div>
                <div className="flex items-center gap-3">
                  <div className="flex text-sm font-semibold tracking-tight text-white leading-none">
                    <RollingDigit final="9" between={["3","4","7"]} dir="from-below" delay={40} triggered={triggered} />
                    <RollingDigit final="2" between={["1","7","6"]} dir="from-above" delay={100} triggered={triggered} />
                    <span className="opacity-70">%</span>
                  </div>
                  <div className="flex items-center gap-[2.5px]">
                    {[0,1,2,3,4].map((i) => (
                      <div key={i} className="relative size-2 rounded-full bg-[#5cb85c]">
                        {i === 4 && <div className="absolute inset-[2px] rounded-full bg-[#0d1e0e]" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-left stat cards */}
            <div
              className="absolute bottom-[12%] left-6 hidden w-full max-w-[34%] flex-col gap-3 sm:left-[6%] sm:max-w-[22%] md:flex lg:bottom-[18%]"
              style={enter(triggered, 500, "x", -40)}
            >
              <div className="relative max-w-[220px] overflow-hidden rounded-xl border border-[#2d5a2d] bg-[#0d1e0e]/80 p-5 backdrop-blur-md">
                <PulseNode color="#5cb85c" />
                <div className="relative z-10 flex text-[22px] font-semibold leading-none tracking-tight">
                  <RollingDigit final="3" between={["2","0","6"]} dir="from-below" delay={0}   triggered={triggered} />
                  <RollingDigit final="8" between={["4","3","6"]} dir="from-above" delay={40}  triggered={triggered} />
                  <span className="mr-0.5 pb-1.5 text-white/40">,</span>
                  <RollingDigit final="5" between={["2","8","1"]} dir="from-below" delay={80}  triggered={triggered} />
                  <RollingDigit final="6" between={["0","6","4"]} dir="from-above" delay={120} triggered={triggered} />
                  <RollingDigit final="4" between={["7","1","3"]} dir="from-below" delay={160} triggered={triggered} />
                </div>
                <div className="relative z-10 mt-3 text-[10px] font-semibold tracking-widest uppercase text-[#cfd7c7] opacity-75">
                  Workflows Automated
                </div>
              </div>
              <div className="relative max-w-[220px] translate-x-10 overflow-hidden rounded-xl border border-[#2d5a2d] bg-[#0d1e0e]/80 p-5 backdrop-blur-md">
                <PulseNode color="#a67cff" />
                <div className="relative z-10 flex text-[22px] font-semibold leading-none tracking-tight">
                  <RollingDigit final="4" between={["5","8","3"]} dir="from-below" delay={100} triggered={triggered} />
                  <RollingDigit final="0" between={["3","5","1"]} dir="from-above" delay={140} triggered={triggered} />
                  <RollingDigit final="6" between={["3","4","6"]} dir="from-below" delay={180} triggered={triggered} />
                </div>
                <div className="relative z-10 mt-3 text-[10px] font-semibold tracking-widest uppercase text-[#cfd7c7] opacity-75">
                  Active AI Agents
                </div>
              </div>
            </div>

            {/* Extra nodes */}
            <div className="absolute bottom-[18%] left-[40%] hidden aspect-square w-[14%] sm:block opacity-35">
              <div className="relative h-full w-full rounded-xl border border-[#2d5a2d] bg-[#0f1f10]/50">
                <PulseNode color="#a67cff" />
              </div>
            </div>
            <div className="absolute right-[8%] bottom-[6%] aspect-square w-full max-w-[60%] sm:max-w-[14%] lg:bottom-[28%] z-5 opacity-50">
              <div className="relative h-full w-full rounded-xl border border-[#2d5a2d] bg-[#0f1f10]/50">
                <PulseNode color="#FF7759" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Measurable Results ─── */}
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 pb-28 md:pb-40 z-20">
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white" style={enter(triggered, 200)}>
            Measurable results from day one
          </h3>
          <div className="mt-10 flex flex-wrap gap-8 md:gap-12 md:mt-16">
            <div className="relative flex flex-[1_1_100%] flex-col gap-4 pl-8 sm:flex-1 lg:flex-row lg:items-end xl:gap-8 border-l border-[#cfd7c7]/15" style={enter(triggered, 400)}>
              <div className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-[#5cb85c]" />
              <div className="flex font-semibold leading-none tracking-tight text-white" style={{ fontSize: "clamp(3.2rem, 6.5vw, 4.5rem)" }}>
                <RollingDigit final="9" between={["9","3","6"]} dir="from-below" delay={0}  triggered={triggered} />
                <RollingDigit final="3" between={["0","4","1"]} dir="from-above" delay={50} triggered={triggered} />
                <span className="mb-2 inline-flex items-center text-4xl opacity-70">%</span>
              </div>
              <div className="text-lg opacity-60 max-w-[210px] leading-snug pb-2">workflow automation rate across enterprise deployments</div>
            </div>
            <div className="relative flex flex-[1_1_100%] flex-col gap-4 pl-8 sm:flex-1 lg:flex-row lg:items-end xl:gap-8 border-l border-[#cfd7c7]/15" style={enter(triggered, 550)}>
              <div className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-[#a67cff]" />
              <div className="flex font-semibold leading-none tracking-tight text-white" style={{ fontSize: "clamp(3.2rem, 6.5vw, 4.5rem)" }}>
                <RollingDigit final="8" between={["8","5","4"]} dir="from-below" delay={100} triggered={triggered} />
                <RollingDigit final="4" between={["8","7","6"]} dir="from-above" delay={150} triggered={triggered} />
                <span className="mb-2 inline-flex items-center text-4xl opacity-70">%</span>
              </div>
              <div className="text-lg opacity-60 max-w-[210px] leading-snug pb-2">reduction in manual errors and rework costs</div>
            </div>
            <div className="relative flex flex-[1_1_100%] flex-col gap-4 pl-8 sm:flex-1 lg:flex-row lg:items-end xl:gap-8 border-l border-[#cfd7c7]/15" style={enter(triggered, 700)}>
              <div className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-[#FF7759]" />
              <div className="flex font-semibold leading-none tracking-tight text-white" style={{ fontSize: "clamp(3.2rem, 6.5vw, 4.5rem)" }}>
                <RollingDigit final="5" between={["2","4","1"]} dir="from-below" delay={200} triggered={triggered} />
                <RollingDigit final="9" between={["5","3","7"]} dir="from-above" delay={250} triggered={triggered} />
                <span className="mb-2 inline-flex items-center text-4xl opacity-70">%</span>
              </div>
              <div className="text-lg opacity-60 max-w-[210px] leading-snug pb-2">faster time to market for new product initiatives</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          CLUSTER 3 — cinematic color switch to black + stacked card deck
          =================================================================== */}
      <div
        ref={cluster3Ref}
        style={{
          backgroundColor: c3InView ? "#0a0a0a" : "#112817",
          transition: "background-color 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Section header */}
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-24 md:pt-36 pb-16 md:pb-20 text-center">
          <p className="mb-4 inline-flex items-center gap-2.5 text-sm font-semibold tracking-widest uppercase text-white/40">
            <span className="size-1.5 rounded-full bg-orange-500 inline-block" />
            Softree Platform
          </p>
          <h2
            className="font-medium leading-[1.06] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)" }}
          >
            One platform to build, deploy,<br className="hidden sm:block" /> and scale your AI workforce.
          </h2>
        </div>

        {/* ── Card stack scroll container ── */}
        {/* 300vh gives ~100vh per card for scroll breathing room */}
        <div ref={stackRef} className="relative" style={{ height: "300vh" }}>
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">

            {/* Counter label */}
            <div className="mb-6 md:mb-8 flex items-center gap-3 z-40 relative">
              {CARDS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: activeCard === i ? "2.5rem" : "0.5rem",
                    backgroundColor: activeCard === i ? CARDS[i].accent : "#ffffff20",
                  }}
                />
              ))}
            </div>

            {/* Stack of cards */}
            <div className="relative w-full max-w-[1060px]" style={{ height: "clamp(340px, 55vh, 540px)" }}>
              {CARDS.map((card, i) => {
                const isActive = i === activeCard
                const isPast   = i < activeCard
                const offset   = i - activeCard          // positive = behind

                const stackTranslateY = isPast ? -90 : isActive ? 0 : offset * 18
                const scale           = isPast ? 0.88 : isActive ? 1 : 1 - offset * 0.04
                const opacity         = isPast ? 0 : isActive ? 1 : 1 - offset * 0.18
                const zIndex          = isPast ? 5 : isActive ? 30 : 30 - offset * 10

                const { Visual } = card

                return (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
                    style={{
                      transform: `translateY(${stackTranslateY}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out",
                      transformOrigin: "top center",
                    }}
                  >
                    {/* Card: white left + dark visual right */}
                    <div className="flex h-full w-full">

                      {/* Left — text panel */}
                      <div className="flex w-[44%] flex-col justify-between bg-white p-8 md:p-10 shrink-0">
                        <div>
                          <span
                            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase"
                            style={{ backgroundColor: card.accent + "18", color: card.accent }}
                          >
                            {card.badge}
                          </span>
                          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-[#0a0a0a] leading-tight">
                            {card.heading}
                          </h3>
                          <p className="mt-4 text-base text-[#444] leading-relaxed">
                            {card.body}
                          </p>
                        </div>

                        <div>
                          {/* Highlight stat */}
                          <div className="mb-6 border-l-2 pl-4" style={{ borderColor: card.accent }}>
                            <p className="text-2xl md:text-3xl font-bold tracking-tight text-[#0a0a0a]">{card.stat}</p>
                            <p className="mt-0.5 text-sm text-[#666]">{card.statLabel}</p>
                          </div>
                          <Link
                            href={card.href}
                            className="group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                            style={{ color: card.accent }}
                          >
                            Learn more
                            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* Right — visual panel */}
                      <div className="relative flex-1 bg-[#fafafa] flex items-center justify-center p-4 overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 60% 50%, ${card.accent}0d 0%, transparent 70%)` }} />
                        <Visual />
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* Scroll hint (only on first card) */}
            <p
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-white/25 transition-opacity duration-500"
              style={{ opacity: activeCard === 0 ? 1 : 0 }}
            >
              Scroll to explore
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-28 md:pb-36 flex flex-col items-center text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-7 py-3.5 text-sm font-semibold text-orange-400 transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300 group"
          >
            Explore the full platform
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

    </section>
  )
}
