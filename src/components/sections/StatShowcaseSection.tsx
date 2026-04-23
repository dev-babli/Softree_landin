"use client"

import { useEffect, useRef, useState } from "react"

// ─── Rolling digit ────────────────────────────────────────────────────────────
// Exact mechanism from ReflexAI:
//   "from-below" → flex-col-reverse column, starts translateY(+300%), ends at 0
//   "from-above" → flex-col column, starts at translateY(0), ends translateY(-300%)
// Ghost opacity-0 span sets the slot dimensions; column is absolute inset-0.
function RollingDigit({
  final: finalDigit,
  between,
  dir = "from-below",
  delay = 0,
  triggered,
}: {
  final: string
  between: string[]       // intermediate digits shown during the roll
  dir?: "from-below" | "from-above"
  delay?: number
  triggered: boolean
}) {
  const n   = between.length + 1  // total items in column
  const pct = (n - 1) * 100       // e.g. 3 intermediates → 300%

  const startY = dir === "from-below" ? `${pct}%`  : "0%"
  const endY   = dir === "from-below" ? "0%"        : `-${pct}%`

  // DOM order: [between..., final]
  // flex-col-reverse makes final appear at top  (from-below)
  // flex-col        keeps final at bottom       (from-above)
  const items = [...between, finalDigit]

  return (
    <span
      className="rolling-number relative inline-flex items-center overflow-hidden"
      style={{ verticalAlign: "baseline" }}
    >
      {/* Ghost — sizes the slot */}
      <span className="opacity-0">{finalDigit}</span>

      {/* Animated column */}
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

// ─── Rolling stat pill ────────────────────────────────────────────────────────
function RollingStatPill({ triggered }: { triggered: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full pl-3 pr-3 md:pl-6 md:pr-[0.9375rem] py-1.5 align-middle"
      style={{ backgroundColor: "#1a3020" }}
    >
      {/* Numbers */}
      <span
        className="rolling-stat whitespace-nowrap leading-[1] font-[550] tracking-[0em] text-white"
        style={{ fontSize: "clamp(1rem, 1.125vw, 1.125rem)" }}
      >
        {/* "9" rolls from below (flex-col-reverse, +300% → 0) */}
        <RollingDigit final="9" between={["2","6","4"]} dir="from-below" delay={0}   triggered={triggered} />
        {/* "4" rolls from above (flex-col, 0 → -300%) */}
        <RollingDigit final="4" between={["7","1","8"]} dir="from-above" delay={80}  triggered={triggered} />
        {/* % — slight clip trick for baseline alignment */}
        <span className="-mb-3 inline-flex items-center overflow-hidden pb-3">%</span>
      </span>

      {/* Green dots — 5 total, last has inner dark circle */}
      <span className="flex items-center gap-px">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="relative block size-3 rounded-full"
            style={{ backgroundColor: "#5cb85c" }}
          >
            {i === 4 && (
              <span
                className="absolute inset-1 rounded-full"
                style={{ backgroundColor: "#1a3020" }}
              />
            )}
          </span>
        ))}
      </span>
    </span>
  )
}

// ─── SVG geometric background & cards ──────────────────────────────────────────
function WorkflowCanvas() {
  return (
    <div
      className="relative w-full overflow-visible"
      style={{ aspectRatio: "1290/582" }}
    >
      {/* Background SVG — Concentric jagged polygons */}
      <svg
        viewBox="-400 -250 800 500"
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <g stroke="#cfd7c7" fill="none" strokeWidth="1" strokeDasharray="4 4" strokeLinejoin="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="45s"
            repeatCount="indefinite"
          />
          {/* Outer Ring */}
          <polygon points="0,-240 220,-160 380,20 280,240 0,280 -280,220 -380,50 -200,-180" />
          {/* Middle Ring */}
          <polygon points="0,-160 150,-100 280,10 180,160 0,200 -180,150 -260,30 -140,-120" />
          {/* Inner Ring */}
          <polygon points="0,-80 80,-40 160,0 120,80 0,110 -100,80 -140,20 -70,-60" />
        </g>
        
        {/* Filled blob — smooth irregular polygon using thick stroke for rounded corners */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 0 0"
            to="0 0 0"
            dur="65s"
            repeatCount="indefinite"
          />
          <path
            d="M 50,-130 L 150,-20 L 320,150 L 120,290 L -180,310 L -300,160 L -150,-50 Z"
            fill="#e9ebe1"
            stroke="#e9ebe1"
            strokeWidth="60"
            strokeLinejoin="round"
          />

          {/* Decorative dots on the filled blob */}
          <g fill="#8f9c84">
            <rect x="-100" y="-120" width="4" height="4" rx="1" />
            <rect x="180" y="-80" width="4" height="4" rx="1" />
            <rect x="230" y="50" width="4" height="4" rx="1" />
            <rect x="280" y="210" width="4" height="4" rx="1" />
            <rect x="80" y="240" width="4" height="4" rx="1" />
            <rect x="-160" y="220" width="4" height="4" rx="1" />
            <rect x="-105" y="4" width="4" height="4" rx="1" />
          </g>
        </g>
      </svg>

      {/* Floating Card 1: Roleplay */}
      <div 
        className="absolute top-[28%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 rounded-[16px] bg-white p-3 pr-6 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] max-w-[340px]"
      >
        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#dcf5a3] text-[#4d7319]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            <path d="M14 2h2v2h-2z" fill="currentColor" stroke="none" />
            <path d="M19 5h2v2h-2z" fill="currentColor" stroke="none" />
            <path d="M20 2h2v2h-2z" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <p className="text-[14px] leading-[1.4] tracking-tight">
          <span className="font-semibold text-[#28381c]">Enterprise-scale architecture, </span>
          <span className="text-[#6c7860]">designed for global resilience.</span>
        </p>
      </div>

      {/* Floating Card 2: QA */}
      <div 
        className="absolute bottom-[28%] right-[25%] translate-x-1/2 translate-y-1/2 flex items-center gap-4 rounded-[16px] bg-white p-3 pr-6 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] max-w-[340px]"
      >
        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#b1f2b6] text-[#1c4d22]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <p className="text-[14px] leading-[1.4] tracking-tight">
          <span className="font-semibold text-[#28381c]">Security-first design, </span>
          <span className="text-[#6c7860]">trusted by the world&apos;s highest-stakes industries.</span>
        </p>
      </div>
    </div>
  )
}



// ─── Main section ─────────────────────────────────────────────────────────────
export default function StatShowcaseSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  // Trigger rolling animation on scroll into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-16 md:pt-36"
      style={{ backgroundColor: "#f5f2ec" }}
    >
      <div className="mx-auto max-w-[1290px] px-6 text-center">

        {/* ── Heading ── */}
        <h2
          className="font-sans font-[550] leading-[1.05] tracking-[-0.02em] text-[#0d1a0d]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)" }}
        >
          {/* Word 1 */}
          <span className="inline-block">Software</span>

          {/* Inline: circular image + rolling stat pill */}
          <span className="inline-flex items-center gap-2 pl-[0.05em] align-middle">
            {/* Circular avatar — same size trick as ReflexAI (0.7em relative to heading) */}
            <span
              className="relative inline-block overflow-hidden rounded-full"
              style={{
                width: "0.7em",
                height: "0.7em",
                backgroundColor: "#2d5a1b",
                verticalAlign: "middle",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=132&h=132&fit=crop&crop=face&q=85"
                alt="AI agent"
                className="h-full w-full object-cover"
              />
            </span>

            {/* Stat pill */}
            <RollingStatPill triggered={triggered} />
          </span>{" "}

          {/* Word 2 */}
          <span className="inline-block">and Systems</span>

          {/* Bottom line */}
          <span className="block">that scale globally</span>
        </h2>

        {/* ── Canvas ── */}
        <div className="relative mx-auto mt-12 w-full max-w-[1290px] md:mt-24">
          <WorkflowCanvas />
        </div>

      </div>
    </section>
  )
}
