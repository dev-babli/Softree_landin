"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const STATS = [
  { value: "200+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4", label: "Global delivery hubs" },
]

const PILLARS = [
  {
    tag: "01",
    title: "Enterprise-First\nEngineering",
    body: "Every engagement is architected for scale, security, and longevity — not just the MVP. We build what your enterprise can actually run.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="14" rx="2" stroke="rgba(251,100,36,0.7)" strokeWidth="1.2" fill="none"/>
        <rect x="9" y="3" width="10" height="7" rx="1.5" stroke="rgba(251,100,36,0.5)" strokeWidth="1" fill="none"/>
        <path d="M9 15h10M9 19h6" stroke="rgba(251,100,36,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: "02",
    title: "Microsoft Stack\nSpecialists",
    body: "SharePoint, Power Platform, Azure, Teams, Fabric — we hold deep expertise across the full Microsoft ecosystem, not just surface-level integrations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="1" fill="#f25022" fillOpacity="0.8"/>
        <rect x="15" y="3" width="10" height="10" rx="1" fill="#7fba00" fillOpacity="0.8"/>
        <rect x="3" y="15" width="10" height="10" rx="1" fill="#00a4ef" fillOpacity="0.8"/>
        <rect x="15" y="15" width="10" height="10" rx="1" fill="#ffb900" fillOpacity="0.8"/>
      </svg>
    ),
  },
  {
    tag: "03",
    title: "AI-Native\nDelivery",
    body: "From GPT-4o to Claude and Gemini — we design, train, and deploy AI agents, RAG pipelines, and document intelligence into production workflows.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke="rgba(251,100,36,0.9)" strokeWidth="1.2" fill="none"/>
        {[0,60,120,180,240,300].map((deg, i) => {
          const r = 10, cx2 = 14 + r * Math.cos(deg * Math.PI / 180), cy2 = 14 + r * Math.sin(deg * Math.PI / 180)
          return <line key={i} x1="14" y1="14" x2={cx2} y2={cy2} stroke="rgba(251,100,36,0.35)" strokeWidth="0.8"/>
        })}
        <circle cx="14" cy="14" r="1.8" fill="rgba(251,100,36,0.9)"/>
      </svg>
    ),
  },
  {
    tag: "04",
    title: "Global Delivery,\nZero Handoffs",
    body: "Unified teams across UK, US, India, and the Middle East. One PM, one process, one quality bar — no fragmented offshore chaos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="rgba(251,100,36,0.5)" strokeWidth="1" fill="none"/>
        <ellipse cx="14" cy="14" rx="4.5" ry="10" stroke="rgba(251,100,36,0.4)" strokeWidth="0.8" fill="none"/>
        <line x1="4" y1="14" x2="24" y2="14" stroke="rgba(251,100,36,0.35)" strokeWidth="0.8"/>
        <circle cx="14" cy="14" r="2" fill="#fb6424"/>
      </svg>
    ),
  },
]

export function LCGlobalShowcase() {
  return (
    <section className="relative w-full bg-[#F3F0EE] overflow-hidden">

      <div className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, #fb6424 40%, #fa520f 100%)" }} />

      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[400px]"
        style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(251,100,36,0.10) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[300px]"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(251,100,36,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 md:px-6 py-24">

        <div className="flex items-center gap-2 mb-8">
          <div className="size-[5.82px] bg-[#141413]" />
          <span className="font-mono text-sm text-[#141413] leading-normal tracking-[-0.28px]">YOUR TRUSTED GLOBAL PARTNER</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-[56px] font-bold text-[#141413] leading-[1.05] tracking-tight max-w-[580px]">
            Built for enterprises.<br />
            <span style={{ background: "linear-gradient(90deg, #fb6424 0%, #fa520f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Delivered globally.
            </span>
          </h2>
          <p className="text-[#696969] text-base md:text-lg leading-relaxed max-w-[420px] lg:text-right">
            Softree is a technology delivery partner trusted by enterprise teams across the UK, Middle East, and Asia — turning strategy into production-grade software.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 border border-[#D1CDC7] mb-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {STATS.map((s, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-8 px-4 bg-[#FCFBFA] ${i < STATS.length - 1 ? "border-r border-[#D1CDC7]" : ""}`}>
              <span className="font-mono text-3xl md:text-4xl font-bold text-[#141413] mb-1"
                style={{ background: "linear-gradient(135deg, #fbd5c0 0%, #fb6424 60%, #fa520f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </span>
              <span className="font-mono text-[10px] text-[#696969] uppercase tracking-widest text-center">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="hidden lg:flex h-[27px] w-full">
          {[191, 138, 245, 109, 191, 119, 181].map((w, i) => (
            <div key={i} className="h-full shrink-0 border border-[#D1CDC7] bg-[#F3F0EE]" style={{ width: `${w}px` }} />
          ))}
          <div className="h-full min-w-0 flex-1 border border-[#D1CDC7] bg-[#F3F0EE]" />
        </div>

        <div className="flex flex-col lg:flex-row">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              className={`group relative flex-1 border border-[#D1CDC7] p-6 md:p-8 flex flex-col gap-4 transition-colors duration-300 hover:border-[#fb6424]/40 hover:bg-[#FCFBFA] ${i > 0 ? "lg:-ml-px" : ""} ${i > 0 ? "-mt-px lg:mt-0" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent 10%, #fb6424 50%, transparent 90%)" }} />

              <div className="flex items-start justify-between">
                <div className="p-2 border border-[#D1CDC7] bg-[#FCFBFA]">
                  {p.icon}
                </div>
                <span className="font-mono text-[10px] text-[#141413]/20 tracking-widest">{p.tag}</span>
              </div>

              <h3 className="text-[#141413] font-semibold text-lg leading-snug whitespace-pre-line">{p.title}</h3>
              <p className="text-[#696969] text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex h-[27px] w-full">
          {[124, 259, 124, 191, 191, 124, 88].map((w, i) => (
            <div key={i} className="h-full shrink-0 border border-[#D1CDC7] bg-[#F3F0EE]" style={{ width: `${w}px` }} />
          ))}
          <div className="h-full min-w-0 flex-1 border border-[#D1CDC7] bg-[#F3F0EE]" />
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm text-white font-bold tracking-tight transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #f5b99a 0%, #ff6b35 50%, #ff4500 100%)" }}>
            Book a discovery call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/services"
            className="flex items-center justify-center bg-[#FCFBFA] border border-[#D1CDC7] px-6 py-3 font-mono text-sm text-[#141413]/70 hover:text-[#141413] hover:bg-[#F3F0EE] transition-all">
            View our services
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default LCGlobalShowcase
